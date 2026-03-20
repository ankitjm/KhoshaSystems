/**
 * Email Monitoring Service for Khosha Systems.
 *
 * Connects to khosha.tech mailboxes via IMAP, reads new emails,
 * classifies them, generates draft replies, and captures leads.
 *
 * Env vars required:
 *   IMAP_HOST        — Hostinger IMAP server (default: imap.hostinger.com)
 *   IMAP_PORT        — IMAP port (default: 993)
 *   IMAP_USER        — mailbox email (e.g. hello@khosha.tech)
 *   IMAP_PASS        — mailbox password
 *   SMTP_HOST        — Hostinger SMTP server (default: smtp.hostinger.com)
 *   SMTP_PORT        — SMTP port (default: 465)
 *   SMTP_USER        — SMTP user (defaults to IMAP_USER)
 *   SMTP_PASS        — SMTP password (defaults to IMAP_PASS)
 */

import Imap from 'imap';
import { simpleParser } from 'mailparser';
import nodemailer from 'nodemailer';

// --- Configuration ---

const IMAP_CONFIG = {
  host: process.env.IMAP_HOST || 'imap.hostinger.com',
  port: parseInt(process.env.IMAP_PORT || '993', 10),
  user: process.env.IMAP_USER || '',
  password: process.env.IMAP_PASS || '',
  tls: true,
  tlsOptions: { rejectUnauthorized: true },
  connTimeout: 30000,
  authTimeout: 15000,
};

const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || process.env.IMAP_USER || '',
    pass: process.env.SMTP_PASS || process.env.IMAP_PASS || '',
  },
};

// --- Email Classification ---

const CLASSIFICATION_RULES = [
  {
    category: 'lead_inquiry',
    keywords: [
      'demo', 'pricing', 'quote', 'interested', 'learn more', 'trial',
      'consultation', 'proposal', 'partnership', 'services', 'cost',
      'retaileros', 'real estate', 'crm', 'vms', 'visitor management',
      'web app', 'saas', 'ai automation', 'pos', 'point of sale',
    ],
  },
  {
    category: 'support',
    keywords: [
      'help', 'issue', 'problem', 'error', 'bug', 'not working',
      'broken', 'fix', 'support', 'trouble', 'urgent', 'down',
    ],
  },
  {
    category: 'newsletter',
    keywords: [
      'unsubscribe', 'newsletter', 'mailing list', 'weekly digest',
      'email preference', 'opt out',
    ],
  },
  {
    category: 'spam',
    keywords: [
      'viagra', 'lottery', 'winner', 'nigerian prince', 'act now',
      'limited time', 'click here', 'free money', 'guaranteed',
      'no obligation', 'risk free', 'dear friend', 'congratulations',
    ],
  },
];

/**
 * Classify an email by subject + body content.
 * Returns: 'lead_inquiry' | 'support' | 'spam' | 'newsletter' | 'other'
 */
function classifyEmail(subject, bodyText) {
  const text = `${subject || ''} ${bodyText || ''}`.toLowerCase();

  // Score each category
  let bestCategory = 'other';
  let bestScore = 0;

  for (const rule of CLASSIFICATION_RULES) {
    let score = 0;
    for (const keyword of rule.keywords) {
      if (text.includes(keyword)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestCategory = rule.category;
    }
  }

  return bestCategory;
}

/**
 * Extract contact info from email for lead capture.
 */
function extractContactInfo(parsed) {
  const from = parsed.from?.value?.[0] || {};
  const bodyText = (parsed.text || '').substring(0, 2000);

  // Try to extract phone numbers
  const phoneMatch = bodyText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/);
  // Try to extract company name from signature or body
  const companyPatterns = [
    /(?:company|organization|firm):\s*(.+)/i,
    /(?:from|at|@)\s+([A-Z][A-Za-z\s&.]+(?:Ltd|LLC|Inc|Corp|Pvt|Limited|Systems|Solutions|Technologies|Tech))/,
  ];
  let company = '';
  for (const pattern of companyPatterns) {
    const match = bodyText.match(pattern);
    if (match) { company = match[1].trim(); break; }
  }

  return {
    name: from.name || '',
    email: from.address || '',
    phone: phoneMatch ? phoneMatch[0] : '',
    company,
    message: bodyText.substring(0, 500),
  };
}

// --- Draft Reply Templates ---

const REPLY_TEMPLATES = {
  lead_inquiry: (name) => ({
    subject: 'Re: Your Inquiry — Khosha Systems',
    body: `Hi ${name || 'there'},

Thank you for reaching out to Khosha Systems! We've received your inquiry and are excited to learn more about how we can help.

Our team will review your message and get back to you within 24 hours with detailed information tailored to your needs.

In the meantime, feel free to explore our solutions at https://khoshasystems.com/products

Best regards,
Khosha Systems Team
hello@khosha.tech`,
  }),

  support: (name) => ({
    subject: 'Re: Support Request Received — Khosha Systems',
    body: `Hi ${name || 'there'},

Thank you for contacting Khosha Systems support. We've received your request and our team is looking into it.

We'll get back to you as soon as possible with a resolution. If this is urgent, please reply to this email with "URGENT" in the subject line.

Best regards,
Khosha Systems Support
hello@khosha.tech`,
  }),
};

/**
 * Generate a draft reply for an email based on its classification.
 * Returns { subject, body } or null if no reply needed.
 */
function generateDraftReply(classification, senderName, originalSubject) {
  const template = REPLY_TEMPLATES[classification];
  if (!template) return null;

  const draft = template(senderName);
  // Preserve original subject thread if available
  if (originalSubject && !draft.subject.includes(originalSubject)) {
    draft.subject = `Re: ${originalSubject.replace(/^Re:\s*/i, '')}`;
  }
  return draft;
}

// --- IMAP Operations ---

let _db = null;
let _checkInterval = null;

/**
 * Initialize the email monitor with database and create tables.
 */
function initEmailMonitor(db) {
  _db = db;

  // Create emails table
  db.exec(`
    CREATE TABLE IF NOT EXISTS emails (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      message_id TEXT UNIQUE,
      mailbox TEXT NOT NULL,
      from_name TEXT DEFAULT '',
      from_email TEXT DEFAULT '',
      to_email TEXT DEFAULT '',
      subject TEXT DEFAULT '',
      body_text TEXT DEFAULT '',
      body_html TEXT DEFAULT '',
      classification TEXT DEFAULT 'other',
      is_read INTEGER DEFAULT 0,
      is_replied INTEGER DEFAULT 0,
      needs_reply INTEGER DEFAULT 0,
      lead_captured INTEGER DEFAULT 0,
      received_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create draft replies table
  db.exec(`
    CREATE TABLE IF NOT EXISTS email_drafts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email_id INTEGER NOT NULL,
      to_email TEXT NOT NULL,
      to_name TEXT DEFAULT '',
      subject TEXT DEFAULT '',
      body TEXT DEFAULT '',
      status TEXT DEFAULT 'draft',
      sent_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (email_id) REFERENCES emails(id)
    )
  `);

  console.log('Email monitor: tables initialized');
}

/**
 * Start periodic email checking.
 * @param {number} intervalMs — check interval (default: 5 minutes)
 */
function startEmailMonitor(intervalMs = 5 * 60 * 1000) {
  if (!IMAP_CONFIG.user || !IMAP_CONFIG.password) {
    console.warn('Email monitor: IMAP credentials not configured — monitoring disabled');
    return;
  }

  // Run once on startup after a short delay
  setTimeout(() => checkNewEmails(), 15_000);

  // Then run periodically
  _checkInterval = setInterval(() => checkNewEmails(), intervalMs);
  console.log(`Email monitor: started (checking every ${intervalMs / 1000}s)`);
}

/**
 * Stop the email monitor.
 */
function stopEmailMonitor() {
  if (_checkInterval) {
    clearInterval(_checkInterval);
    _checkInterval = null;
    console.log('Email monitor: stopped');
  }
}

const MAX_EMAIL_SIZE = 25 * 1024 * 1024; // 25 MB per email
let _isChecking = false;

/**
 * Connect to IMAP and fetch new unseen emails.
 */
function checkNewEmails() {
  if (!_db) {
    console.error('Email monitor: database not initialized');
    return Promise.resolve([]);
  }

  if (_isChecking) {
    console.warn('Email monitor: previous check still in progress, skipping');
    return Promise.resolve([]);
  }

  _isChecking = true;

  return new Promise((resolve) => {
    const imap = new Imap(IMAP_CONFIG);
    const fetchedEmails = [];

    function cleanup(results) {
      _isChecking = false;
      try { imap.end(); } catch (_) { /* already closed */ }
      resolve(results);
    }

    imap.once('ready', () => {
      imap.openBox('INBOX', true, (err) => {
        if (err) {
          console.error('Email monitor: failed to open INBOX:', err.message);
          cleanup([]);
          return;
        }

        imap.search(['UNSEEN'], (err, uids) => {
          if (err) {
            console.error('Email monitor: search error:', err.message);
            cleanup([]);
            return;
          }

          if (!uids || uids.length === 0) {
            console.log('Email monitor: no new emails');
            cleanup([]);
            return;
          }

          console.log(`Email monitor: found ${uids.length} new email(s)`);

          const fetch = imap.fetch(uids, {
            bodies: '',
            struct: true,
            markSeen: false,
          });

          let messagesToProcess = uids.length;
          let messagesProcessed = 0;

          fetch.on('message', (msg) => {
            const chunks = [];
            let bufferSize = 0;
            let oversized = false;

            msg.on('body', (stream) => {
              stream.on('data', (chunk) => {
                bufferSize += chunk.length;
                if (bufferSize > MAX_EMAIL_SIZE) {
                  if (!oversized) {
                    console.warn(`Email monitor: email exceeds ${MAX_EMAIL_SIZE / 1024 / 1024}MB limit, skipping`);
                    oversized = true;
                  }
                  return;
                }
                chunks.push(chunk);
              });
            });

            msg.once('end', () => {
              if (oversized) {
                messagesProcessed++;
                if (messagesProcessed === messagesToProcess) cleanup(fetchedEmails);
                return;
              }
              const rawBuffer = Buffer.concat(chunks);
              simpleParser(rawBuffer)
                .then((parsed) => {
                  try {
                    const result = processEmail(parsed);
                    if (result) fetchedEmails.push(result);
                  } catch (processErr) {
                    console.error('Email monitor: processing error:', processErr.message);
                  }
                })
                .catch((parseErr) => {
                  console.error('Email monitor: parse error:', parseErr.message);
                })
                .finally(() => {
                  messagesProcessed++;
                  if (messagesProcessed === messagesToProcess) cleanup(fetchedEmails);
                });
            });
          });

          fetch.once('error', (fetchErr) => {
            console.error('Email monitor: fetch error:', fetchErr.message);
            cleanup(fetchedEmails);
          });
        });
      });
    });

    imap.once('error', (err) => {
      console.error('Email monitor: IMAP connection error:', err.message);
      _isChecking = false;
      resolve([]);
    });

    imap.once('end', () => {
      // Connection ended
    });

    imap.connect();
  });
}

/**
 * Process a parsed email: classify, store, generate draft reply, capture lead.
 */
function processEmail(parsed) {
  if (!_db) return null;

  const messageId = parsed.messageId || `gen-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const from = parsed.from?.value?.[0] || {};
  const to = parsed.to?.value?.[0] || {};
  const subject = (parsed.subject || '').substring(0, 500);
  const bodyText = (parsed.text || '').substring(0, 10000);
  const bodyHtml = (parsed.html || '').substring(0, 50000);
  const receivedAt = parsed.date ? parsed.date.toISOString() : new Date().toISOString();

  // Skip if already stored
  const existing = _db.prepare('SELECT id FROM emails WHERE message_id = ?').get(messageId);
  if (existing) return null;

  // Classify
  const classification = classifyEmail(subject, bodyText);
  const needsReply = classification === 'lead_inquiry' || classification === 'support' ? 1 : 0;

  // Store email
  const insertEmail = _db.prepare(`
    INSERT INTO emails (message_id, mailbox, from_name, from_email, to_email, subject, body_text, body_html, classification, needs_reply, received_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = insertEmail.run(
    messageId,
    IMAP_CONFIG.user,
    from.name || '',
    from.address || '',
    to.address || '',
    subject,
    bodyText,
    bodyHtml,
    classification,
    needsReply,
    receivedAt
  );

  const emailId = result.lastInsertRowid;
  console.log(`Email monitor: stored email #${emailId} from ${from.address} — classified as "${classification}"`);

  // Generate draft reply if needed
  if (needsReply) {
    const draft = generateDraftReply(classification, from.name, subject);
    if (draft) {
      _db.prepare(`
        INSERT INTO email_drafts (email_id, to_email, to_name, subject, body, status)
        VALUES (?, ?, ?, ?, ?, 'draft')
      `).run(emailId, from.address || '', from.name || '', draft.subject, draft.body);
      console.log(`Email monitor: draft reply generated for email #${emailId}`);
    }
  }

  // Capture lead if it's a lead inquiry
  if (classification === 'lead_inquiry') {
    captureLead(parsed, emailId);
  }

  return {
    id: emailId,
    from: from.address,
    subject,
    classification,
    needsReply: !!needsReply,
  };
}

/**
 * Capture a lead from an email classified as lead_inquiry.
 */
function captureLead(parsed, emailId) {
  if (!_db) return;

  const contact = extractContactInfo(parsed);
  if (!contact.email) return;

  // Check if lead already exists
  const existingLead = _db.prepare('SELECT id FROM leads WHERE email = ?').get(contact.email);
  if (existingLead) {
    // Mark email as lead_captured but don't duplicate
    _db.prepare('UPDATE emails SET lead_captured = 1 WHERE id = ?').run(emailId);
    console.log(`Email monitor: lead already exists for ${contact.email}, skipped capture`);
    return;
  }

  // Insert new lead
  try {
    _db.prepare(
      'INSERT INTO leads (name, company, email, goal, message, source) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(
      contact.name,
      contact.company,
      contact.email,
      'Email Inquiry',
      contact.message,
      'Email Inbox'
    );
    _db.prepare('UPDATE emails SET lead_captured = 1 WHERE id = ?').run(emailId);
    console.log(`Email monitor: new lead captured from email — ${contact.name} <${contact.email}>`);
  } catch (err) {
    console.error(`Email monitor: lead capture error for ${contact.email}:`, err.message);
  }
}

// --- Send Draft Reply (manual trigger) ---

/**
 * Send a draft reply via SMTP. Only sends drafts with status 'approved'.
 */
async function sendDraftReply(draftId) {
  if (!_db) throw new Error('Database not initialized');

  const draft = _db.prepare('SELECT * FROM email_drafts WHERE id = ? AND status = ?').get(draftId, 'approved');
  if (!draft) throw new Error('Draft not found or not approved');

  const transporter = nodemailer.createTransport(SMTP_CONFIG);

  await transporter.sendMail({
    from: `"Khosha Systems" <${SMTP_CONFIG.auth.user}>`,
    to: draft.to_email,
    subject: draft.subject,
    text: draft.body,
  });

  _db.prepare('UPDATE email_drafts SET status = ?, sent_at = datetime(?) WHERE id = ?')
    .run('sent', new Date().toISOString(), draftId);
  _db.prepare('UPDATE emails SET is_replied = 1 WHERE id = ?').run(draft.email_id);

  console.log(`Email monitor: sent reply to ${draft.to_email} (draft #${draftId})`);
  return { success: true, to: draft.to_email };
}

// --- Status / Query Functions ---

/**
 * Get inbox status summary for the ops watchdog.
 */
function getInboxStatus() {
  if (!_db) return { error: 'not initialized' };

  const total = _db.prepare('SELECT COUNT(*) as count FROM emails').get();
  const unread = _db.prepare('SELECT COUNT(*) as count FROM emails WHERE is_read = 0').get();
  const needsReply = _db.prepare('SELECT COUNT(*) as count FROM emails WHERE needs_reply = 1 AND is_replied = 0').get();
  const newLeads = _db.prepare("SELECT COUNT(*) as count FROM emails WHERE lead_captured = 1 AND created_at >= datetime('now', '-24 hours')").get();
  const pendingDrafts = _db.prepare("SELECT COUNT(*) as count FROM email_drafts WHERE status = 'draft'").get();
  const todayEmails = _db.prepare("SELECT COUNT(*) as count FROM emails WHERE created_at >= datetime('now', '-24 hours')").get();

  const byClassification = _db.prepare(
    'SELECT classification, COUNT(*) as count FROM emails GROUP BY classification ORDER BY count DESC'
  ).all();

  return {
    totalEmails: total.count,
    unreadEmails: unread.count,
    needsReply: needsReply.count,
    newLeadsFromEmail: newLeads.count,
    pendingDrafts: pendingDrafts.count,
    todayEmails: todayEmails.count,
    byClassification,
    imapConfigured: !!(IMAP_CONFIG.user && IMAP_CONFIG.password),
    lastChecked: new Date().toISOString(),
  };
}

export {
  initEmailMonitor,
  startEmailMonitor,
  stopEmailMonitor,
  checkNewEmails,
  sendDraftReply,
  getInboxStatus,
  classifyEmail,
  extractContactInfo,
  generateDraftReply,
};
