import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import webpush from 'web-push';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import { syncLeadToBrevo, initScheduler } from './brevo.js';
import { initEmailMonitor, startEmailMonitor, checkNewEmails, sendDraftReply, getInboxStatus } from './email-monitor.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3007;

// --- VAPID Keys for Web Push ---
const VAPID_PUBLIC = process.env.VAPID_PUBLIC_KEY || 'BOJiJxR8DMf1j-bXjnOFF_v6ge4LqLivLgFqpZkWeTkRZ6NjCRuUqHPD_rJD78A9J1Y3DkWPikWCFp2_q3POfm8';
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY;
if (!VAPID_PRIVATE) {
  console.warn('WARNING: VAPID_PRIVATE_KEY not set — web push notifications disabled');
} else {
  webpush.setVapidDetails('mailto:hello@khoshasystems.com', VAPID_PUBLIC, VAPID_PRIVATE);
}

// --- Admin API Key ---
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'khosha2026';

// --- Database Setup ---
const db = new Database(join(__dirname, 'kosha.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    company TEXT,
    email TEXT,
    goal TEXT,
    message TEXT DEFAULT '',
    source TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS visitors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT UNIQUE,
    ip_address TEXT,
    user_agent TEXT,
    referrer TEXT,
    pages_viewed TEXT DEFAULT '[]',
    page_count INTEGER DEFAULT 1,
    first_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
    time_on_site INTEGER DEFAULT 0,
    qualified INTEGER DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS push_subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    endpoint TEXT UNIQUE,
    keys_p256dh TEXT,
    keys_auth TEXT,
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

console.log('Database initialized at', join(__dirname, 'kosha.db'));

// Initialize Brevo email scheduler with the database
initScheduler(db);

// Initialize email monitor (IMAP inbox checking)
initEmailMonitor(db);
startEmailMonitor();

// --- Express App ---
const app = express();

// Hide X-Powered-By header (don't reveal Express)
app.disable('x-powered-by');

app.use(cors({ origin: ['https://www.khoshasystems.com', 'https://khoshasystems.com', 'http://localhost:3000'] }));
app.use(express.json());

// --- Security Headers ---
app.use((_req, res, next) => {
  // HSTS: enforce HTTPS for 1 year, include subdomains, allow preload list
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  // Prevent MIME-type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Referrer policy: send origin on cross-origin, full URL on same-origin
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Permissions policy: disable unused browser features
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  // Content Security Policy
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com",
    "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com https://region1.google-analytics.com https://generativelanguage.googleapis.com https://api.emailjs.com",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; '));
  next();
});

// --- Rate Limiting for /api/leads ---
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max requests per window per IP
const rateLimitMap = new Map(); // ip -> { count, resetAt }

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 5 * 60 * 1000);

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

// --- Email Validation ---
function isValidEmail(email) {
  // RFC 5322 simplified: local@domain.tld
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === 'string' && email.length <= 254 && re.test(email);
}

// --- Input Sanitization ---
function sanitizeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// --- Lead Endpoints ---

// Migrate: add message column if missing (existing DBs)
try {
  db.exec("ALTER TABLE leads ADD COLUMN message TEXT DEFAULT ''");
  console.log('Migrated: added message column to leads');
} catch (_) { /* column already exists */ }

const insertLead = db.prepare(
  'INSERT INTO leads (name, company, email, goal, message, source) VALUES (?, ?, ?, ?, ?, ?)'
);

// Send push notification to all subscribers when a new lead arrives
async function notifyNewLead(lead) {
  try {
    const subs = db.prepare('SELECT * FROM push_subscriptions').all();
    if (subs.length === 0) return;
    const payload = JSON.stringify({
      title: `New Lead: ${lead.name}`,
      body: `${lead.company} — ${lead.goal}`,
      url: 'https://khoshasystems.com/admin',
    });
    for (const sub of subs) {
      try {
        await webpush.sendNotification({
          endpoint: sub.endpoint,
          keys: { p256dh: sub.keys_p256dh, auth: sub.keys_auth }
        }, payload);
      } catch (err) {
        if (err.statusCode === 410 || err.statusCode === 404) {
          db.prepare('DELETE FROM push_subscriptions WHERE id = ?').run(sub.id);
        }
      }
    }
  } catch (err) {
    console.error('Push notify error:', err.message);
  }
}

app.post('/api/leads', (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: 'Invalid request body' });
    }
    const { name, company, email, goal, message, source } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    if (!isValidEmail(email)) return res.status(400).json({ error: 'Invalid email format' });

    const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip;
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({ error: 'Too many submissions. Please try again later.' });
    }
    const safeName = sanitizeHtml(name || '');
    const safeCompany = sanitizeHtml(company || '');
    const safeGoal = sanitizeHtml(goal || '');
    const safeMessage = sanitizeHtml(message || '');
    const safeSource = sanitizeHtml(source || '');
    const result = insertLead.run(safeName, safeCompany, email, safeGoal, safeMessage, safeSource);
    console.log(`NEW LEAD #${result.lastInsertRowid}: ${safeName} <${email}> — ${safeCompany} — ${safeGoal}`);
    // Fire push notification asynchronously (don't block response)
    notifyNewLead({ name: safeName, company: safeCompany, goal: safeGoal });
    // Sync lead to Brevo for email nurture sequence (async, non-blocking)
    syncLeadToBrevo({ name: safeName, company: safeCompany, email, goal: safeGoal, source: safeSource });
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    console.error('Lead insert error:', err.message);
    res.status(500).json({ error: 'Failed to save lead' });
  }
});

app.get('/api/leads', (req, res) => {
  try {
    const key = req.query.key;
    if (key !== ADMIN_API_KEY) return res.status(401).json({ error: 'Unauthorized' });
    const leads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
    res.json(leads);
  } catch (err) {
    console.error('Lead fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// --- Visitor Endpoints ---
const upsertVisitor = db.prepare(`
  INSERT INTO visitors (session_id, ip_address, user_agent, referrer, pages_viewed, page_count, time_on_site, qualified)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(session_id) DO UPDATE SET
    pages_viewed = excluded.pages_viewed,
    page_count = excluded.page_count,
    last_seen = CURRENT_TIMESTAMP,
    time_on_site = excluded.time_on_site,
    qualified = excluded.qualified
`);

app.post('/api/visitors', (req, res) => {
  try {
    const { sessionId, ip, userAgent, referrer, pagesViewed, timeOnSite, qualified } = req.body;
    if (!sessionId) return res.status(400).json({ error: 'sessionId required' });
    const pagesJson = JSON.stringify(pagesViewed || []);
    upsertVisitor.run(
      sessionId, ip || '', userAgent || '', referrer || '',
      pagesJson, (pagesViewed || []).length, timeOnSite || 0, qualified ? 1 : 0
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Visitor upsert error:', err.message);
    res.status(500).json({ error: 'Failed to save visitor' });
  }
});

app.get('/api/visitors', (req, res) => {
  try {
    const key = req.query.key;
    if (key !== ADMIN_API_KEY) return res.status(401).json({ error: 'Unauthorized' });
    const visitors = db.prepare('SELECT * FROM visitors ORDER BY last_seen DESC LIMIT 200').all();
    res.json(visitors);
  } catch (err) {
    console.error('Visitor fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch visitors' });
  }
});

// --- Stats Endpoint ---
app.get('/api/stats', (req, res) => {
  try {
    const key = req.query.key;
    if (key !== ADMIN_API_KEY) return res.status(401).json({ error: 'Unauthorized' });
    const totalLeads = db.prepare('SELECT COUNT(*) as count FROM leads').get();
    const totalVisitors = db.prepare('SELECT COUNT(*) as count FROM visitors').get();
    const qualifiedVisitors = db.prepare('SELECT COUNT(*) as count FROM visitors WHERE qualified = 1').get();
    const todayLeads = db.prepare("SELECT COUNT(*) as count FROM leads WHERE date(created_at) = date('now')").get();
    const sources = db.prepare('SELECT source, COUNT(*) as count FROM leads GROUP BY source ORDER BY count DESC').all();
    const pushSubscribers = db.prepare('SELECT COUNT(*) as count FROM push_subscriptions').get();
    res.json({
      totalLeads: totalLeads.count,
      totalVisitors: totalVisitors.count,
      qualifiedVisitors: qualifiedVisitors.count,
      todayLeads: todayLeads.count,
      pushSubscribers: pushSubscribers.count,
      sources,
    });
  } catch (err) {
    console.error('Stats error:', err.message);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// --- Push Subscription Endpoints ---
const insertSub = db.prepare(
  'INSERT INTO push_subscriptions (endpoint, keys_p256dh, keys_auth, user_agent) VALUES (?, ?, ?, ?) ON CONFLICT(endpoint) DO UPDATE SET keys_p256dh = excluded.keys_p256dh, keys_auth = excluded.keys_auth, user_agent = excluded.user_agent'
);

app.get('/api/push/vapid-key', (_req, res) => {
  res.json({ publicKey: VAPID_PUBLIC });
});

app.post('/api/push/subscribe', (req, res) => {
  try {
    const { subscription, userAgent } = req.body;
    if (!subscription?.endpoint || !subscription?.keys) {
      return res.status(400).json({ error: 'Invalid subscription' });
    }
    insertSub.run(subscription.endpoint, subscription.keys.p256dh, subscription.keys.auth, userAgent || '');
    res.json({ success: true });
  } catch (err) {
    console.error('Push subscribe error:', err.message);
    res.status(500).json({ error: 'Failed to save subscription' });
  }
});

app.get('/api/push/subscribers', (req, res) => {
  try {
    if (req.query.key !== ADMIN_API_KEY) return res.status(401).json({ error: 'Unauthorized' });
    const subs = db.prepare('SELECT * FROM push_subscriptions ORDER BY created_at DESC').all();
    res.json(subs);
  } catch (err) {
    console.error('Push fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
});

app.post('/api/push/send', async (req, res) => {
  try {
    if (req.query.key !== ADMIN_API_KEY) return res.status(401).json({ error: 'Unauthorized' });
    const { title, body, url, image, icon } = req.body;
    if (!title || !body) return res.status(400).json({ error: 'title and body required' });

    const subs = db.prepare('SELECT * FROM push_subscriptions').all();
    const payload = JSON.stringify({ title, body, url: url || 'https://khoshasystems.com', image: image || undefined, icon: icon || undefined });
    let sent = 0, failed = 0;

    for (const sub of subs) {
      try {
        await webpush.sendNotification({
          endpoint: sub.endpoint,
          keys: { p256dh: sub.keys_p256dh, auth: sub.keys_auth }
        }, payload);
        sent++;
      } catch (err) {
        failed++;
        if (err.statusCode === 410 || err.statusCode === 404) {
          db.prepare('DELETE FROM push_subscriptions WHERE id = ?').run(sub.id);
        }
      }
    }
    res.json({ success: true, sent, failed, total: subs.length });
  } catch (err) {
    console.error('Push send error:', err.message);
    res.status(500).json({ error: 'Failed to send notifications' });
  }
});

// --- Email Monitor Endpoints ---

// Inbox status (for ops watchdog and admin)
app.get('/api/email/status', (req, res) => {
  try {
    if (req.query.key !== ADMIN_API_KEY) return res.status(401).json({ error: 'Unauthorized' });
    res.json(getInboxStatus());
  } catch (err) {
    console.error('Email status error:', err.message);
    res.status(500).json({ error: 'Failed to get email status' });
  }
});

// List emails with optional filters
app.get('/api/email/messages', (req, res) => {
  try {
    if (req.query.key !== ADMIN_API_KEY) return res.status(401).json({ error: 'Unauthorized' });
    const { classification, needs_reply, limit } = req.query;
    let sql = 'SELECT id, message_id, mailbox, from_name, from_email, to_email, subject, classification, is_read, is_replied, needs_reply, lead_captured, received_at, created_at FROM emails';
    const conditions = [];
    const params = [];
    if (classification) { conditions.push('classification = ?'); params.push(classification); }
    if (needs_reply === '1') { conditions.push('needs_reply = 1 AND is_replied = 0'); }
    if (conditions.length > 0) sql += ' WHERE ' + conditions.join(' AND ');
    sql += ' ORDER BY received_at DESC LIMIT ?';
    const safeLimit = Math.min(Math.max(1, parseInt(limit) || 50), 1000);
    params.push(safeLimit);
    const emails = db.prepare(sql).all(...params);
    res.json(emails);
  } catch (err) {
    console.error('Email list error:', err.message);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
});

// Get single email with full body
app.get('/api/email/messages/:id', (req, res) => {
  try {
    if (req.query.key !== ADMIN_API_KEY) return res.status(401).json({ error: 'Unauthorized' });
    const email = db.prepare('SELECT * FROM emails WHERE id = ?').get(req.params.id);
    if (!email) return res.status(404).json({ error: 'Email not found' });
    // Mark as read
    if (!email.is_read) {
      db.prepare('UPDATE emails SET is_read = 1 WHERE id = ?').run(req.params.id);
      email.is_read = 1;
    }
    // Fetch associated drafts
    const drafts = db.prepare('SELECT * FROM email_drafts WHERE email_id = ?').all(req.params.id);
    res.json({ ...email, drafts });
  } catch (err) {
    console.error('Email detail error:', err.message);
    res.status(500).json({ error: 'Failed to fetch email' });
  }
});

// List draft replies
app.get('/api/email/drafts', (req, res) => {
  try {
    if (req.query.key !== ADMIN_API_KEY) return res.status(401).json({ error: 'Unauthorized' });
    const { status } = req.query;
    let sql = 'SELECT d.*, e.subject as original_subject, e.from_email as original_from FROM email_drafts d JOIN emails e ON d.email_id = e.id';
    if (status) {
      sql += ' WHERE d.status = ?';
      const drafts = db.prepare(sql + ' ORDER BY d.created_at DESC').all(status);
      return res.json(drafts);
    }
    const drafts = db.prepare(sql + ' ORDER BY d.created_at DESC').all();
    res.json(drafts);
  } catch (err) {
    console.error('Drafts list error:', err.message);
    res.status(500).json({ error: 'Failed to fetch drafts' });
  }
});

// Approve a draft reply (changes status from 'draft' to 'approved')
app.post('/api/email/drafts/:id/approve', (req, res) => {
  try {
    if (req.query.key !== ADMIN_API_KEY) return res.status(401).json({ error: 'Unauthorized' });
    const draft = db.prepare('SELECT * FROM email_drafts WHERE id = ?').get(req.params.id);
    if (!draft) return res.status(404).json({ error: 'Draft not found' });
    if (draft.status !== 'draft') return res.status(400).json({ error: `Draft is already ${draft.status}` });
    db.prepare("UPDATE email_drafts SET status = 'approved' WHERE id = ?").run(req.params.id);
    res.json({ success: true, status: 'approved' });
  } catch (err) {
    console.error('Draft approve error:', err.message);
    res.status(500).json({ error: 'Failed to approve draft' });
  }
});

// Send an approved draft reply
app.post('/api/email/drafts/:id/send', async (req, res) => {
  try {
    if (req.query.key !== ADMIN_API_KEY) return res.status(401).json({ error: 'Unauthorized' });
    const result = await sendDraftReply(parseInt(req.params.id));
    res.json(result);
  } catch (err) {
    console.error('Draft send error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to send draft' });
  }
});

// Edit a draft reply before approving
app.patch('/api/email/drafts/:id', (req, res) => {
  try {
    if (req.query.key !== ADMIN_API_KEY) return res.status(401).json({ error: 'Unauthorized' });
    const draft = db.prepare('SELECT * FROM email_drafts WHERE id = ?').get(req.params.id);
    if (!draft) return res.status(404).json({ error: 'Draft not found' });
    if (draft.status !== 'draft') return res.status(400).json({ error: `Cannot edit — draft is ${draft.status}` });
    const { subject, body } = req.body;
    if (subject) db.prepare('UPDATE email_drafts SET subject = ? WHERE id = ?').run(subject, req.params.id);
    if (body) db.prepare('UPDATE email_drafts SET body = ? WHERE id = ?').run(body, req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error('Draft edit error:', err.message);
    res.status(500).json({ error: 'Failed to edit draft' });
  }
});

// Create a new draft reply (for composing replies to emails without auto-drafts)
app.post('/api/email/drafts', (req, res) => {
  try {
    if (req.query.key !== ADMIN_API_KEY) return res.status(401).json({ error: 'Unauthorized' });
    const { email_id, to_email, to_name, subject, body } = req.body;
    if (!email_id || !to_email || !subject || !body) {
      return res.status(400).json({ error: 'Missing required fields: email_id, to_email, subject, body' });
    }
    // Verify the email exists
    const email = db.prepare('SELECT id FROM emails WHERE id = ?').get(email_id);
    if (!email) return res.status(404).json({ error: 'Email not found' });
    const result = db.prepare(
      "INSERT INTO email_drafts (email_id, to_email, to_name, subject, body, status) VALUES (?, ?, ?, ?, ?, 'draft')"
    ).run(email_id, to_email, to_name || '', subject, body);
    res.json({ success: true, id: Number(result.lastInsertRowid) });
  } catch (err) {
    console.error('Draft create error:', err.message);
    res.status(500).json({ error: 'Failed to create draft' });
  }
});

// Trigger manual email check
app.post('/api/email/check', async (req, res) => {
  try {
    if (req.query.key !== ADMIN_API_KEY) return res.status(401).json({ error: 'Unauthorized' });
    const results = await checkNewEmails();
    res.json({ success: true, newEmails: results.length, emails: results });
  } catch (err) {
    console.error('Email check error:', err.message);
    res.status(500).json({ error: 'Failed to check emails' });
  }
});

// --- Serve static frontend ---
const distPath = join(__dirname, '..', 'dist');
if (existsSync(distPath)) {
  // Static assets with long cache (Vite hashed filenames enable cache-busting)
  app.use('/assets', express.static(join(distPath, 'assets'), {
    maxAge: '1y',
    immutable: true
  }));
  // Other static files with moderate cache
  app.use(express.static(distPath, {
    maxAge: '1h',
    setHeaders: (res, path) => {
      // Images, fonts — cache longer
      if (path.match(/\.(png|jpg|jpeg|webp|svg|ico|woff2?|ttf|eot)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
      }
    }
  }));
  // SPA fallback — no cache on HTML
  app.get('/{*splat}', (_req, res) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.sendFile(join(distPath, 'index.html'));
  });
}

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Khosha API running on http://127.0.0.1:${PORT}`);
});
