import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import webpush from 'web-push';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import { syncLeadToBrevo, initScheduler } from './brevo.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3007;

// --- VAPID Keys for Web Push ---
const VAPID_PUBLIC = 'BOJiJxR8DMf1j-bXjnOFF_v6ge4LqLivLgFqpZkWeTkRZ6NjCRuUqHPD_rJD78A9J1Y3DkWPikWCFp2_q3POfm8';
const VAPID_PRIVATE = 'WO0HFIM9g9lXR2qqMHxI53ORHAE5cfoskssu4nGht94';
webpush.setVapidDetails('mailto:hello@khoshasystems.com', VAPID_PUBLIC, VAPID_PRIVATE);

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
      url: 'https://khoshasystems.com/api/leads?key=khosha2026',
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
    const { name, company, email, goal, message, source } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    const result = insertLead.run(name || '', company || '', email, goal || '', message || '', source || '');
    console.log(`NEW LEAD #${result.lastInsertRowid}: ${name} <${email}> — ${company} — ${goal}`);
    // Fire push notification asynchronously (don't block response)
    notifyNewLead({ name: name || '', company: company || '', goal: goal || '' });
    // Sync lead to Brevo for email nurture sequence (async, non-blocking)
    syncLeadToBrevo({ name: name || '', company: company || '', email, goal: goal || '', source: source || '' });
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    console.error('Lead insert error:', err.message);
    res.status(500).json({ error: 'Failed to save lead' });
  }
});

app.get('/api/leads', (req, res) => {
  try {
    const key = req.query.key;
    if (key !== 'khosha2026') return res.status(401).json({ error: 'Unauthorized' });
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
    if (key !== 'khosha2026') return res.status(401).json({ error: 'Unauthorized' });
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
    if (key !== 'khosha2026') return res.status(401).json({ error: 'Unauthorized' });
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
    if (req.query.key !== 'khosha2026') return res.status(401).json({ error: 'Unauthorized' });
    const subs = db.prepare('SELECT * FROM push_subscriptions ORDER BY created_at DESC').all();
    res.json(subs);
  } catch (err) {
    console.error('Push fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
});

app.post('/api/push/send', async (req, res) => {
  try {
    if (req.query.key !== 'khosha2026') return res.status(401).json({ error: 'Unauthorized' });
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
