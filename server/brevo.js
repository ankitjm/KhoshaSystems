/**
 * Brevo (formerly Sendinblue) integration for Khosha Systems.
 *
 * Handles:
 * - Adding/updating contacts with segmentation
 * - Triggering the 3-email welcome nurture sequence
 *
 * List IDs:
 *   4 = Khosha - All Leads
 *   5 = Khosha - RetailerOS Leads
 *   6 = Khosha - Real Estate CRM Leads
 *   7 = Khosha - VMS Leads
 *   8 = Khosha - General Leads
 *
 * Template IDs:
 *   11 = khosha-nurture-1-welcome (Day 0)
 *   12 = khosha-nurture-2-education (Day 3)
 *   13 = khosha-nurture-3-social-proof (Day 7)
 */

if (!process.env.BREVO_API_KEY) {
  throw new Error('BREVO_API_KEY environment variable is required. Set it in .env or PM2 ecosystem config.');
}
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3';

const LIST_ALL_LEADS = 4;
const LIST_RETAILEROS = 5;
const LIST_CRM = 6;
const LIST_VMS = 7;
const LIST_GENERAL = 8;

const TEMPLATE_WELCOME = 11;
const TEMPLATE_EDUCATION = 12;
const TEMPLATE_SOCIAL_PROOF = 13;

/**
 * Determine product vertical from form goal/source fields.
 */
function detectVertical(goal, source) {
  const text = `${goal} ${source}`.toLowerCase();
  if (text.includes('retaileros') || text.includes('retail') || text.includes('telecom') || text.includes('imei') || text.includes('roi-calculator')) {
    return 'retaileros';
  }
  if (text.includes('real estate') || text.includes('crm') || text.includes('rera') || text.includes('property')) {
    return 'crm';
  }
  if (text.includes('visitor') || text.includes('vms') || text.includes('check-in')) {
    return 'vms';
  }
  return 'general';
}

/**
 * Get the segment-specific list ID for a vertical.
 */
function getSegmentListId(vertical) {
  switch (vertical) {
    case 'retaileros': return LIST_RETAILEROS;
    case 'crm': return LIST_CRM;
    case 'vms': return LIST_VMS;
    default: return LIST_GENERAL;
  }
}

/**
 * Make a request to the Brevo API.
 */
async function brevoRequest(method, path, body) {
  const res = await fetch(`${BREVO_API_URL}${path}`, {
    method,
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // 201 = created, 204 = no content (update success)
  if (res.status === 204) return {};
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(`Brevo API error: ${res.status} ${data.message || JSON.stringify(data)}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

/**
 * Create or update a contact in Brevo and add to appropriate lists.
 * Returns the contact info or throws on error.
 */
async function addContact({ name, company, email, goal, source }) {
  const firstName = (name || '').split(' ')[0] || '';
  const lastName = (name || '').split(' ').slice(1).join(' ') || '';
  const vertical = detectVertical(goal, source);
  const segmentListId = getSegmentListId(vertical);

  const listIds = [LIST_ALL_LEADS, segmentListId];

  await brevoRequest('POST', '/contacts', {
    email,
    attributes: {
      FIRSTNAME: firstName,
      LASTNAME: lastName,
      COMPANY: company || '',
      PRODUCT_INTEREST: vertical,
      LEAD_SOURCE: source || 'Contact Page Form',
      GOAL: goal || '',
    },
    listIds,
    updateEnabled: true, // update if contact already exists
  });

  return { email, vertical, listIds };
}

/**
 * Send an email immediately via Brevo transactional API.
 */
async function sendEmail({ name, email, templateId }) {
  const firstName = (name || '').split(' ')[0] || 'there';
  await brevoRequest('POST', '/smtp/email', {
    templateId,
    to: [{ email, name: name || '' }],
    params: { FIRSTNAME: firstName },
  });
}

// --- Server-side email scheduling via SQLite ---

let _db = null;

/**
 * Initialize the scheduled_emails table. Must be called with the SQLite db instance.
 */
function initScheduler(db) {
  _db = db;
  db.exec(`
    CREATE TABLE IF NOT EXISTS scheduled_emails (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      name TEXT DEFAULT '',
      template_id INTEGER NOT NULL,
      send_at DATETIME NOT NULL,
      sent INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  // Check for due emails every 30 minutes
  setInterval(() => processDueEmails(), 30 * 60 * 1000);
  // Also run once on startup after a short delay
  setTimeout(() => processDueEmails(), 10_000);
}

/**
 * Process all due scheduled emails.
 */
async function processDueEmails() {
  if (!_db) return;
  const due = _db.prepare(
    "SELECT * FROM scheduled_emails WHERE sent = 0 AND send_at <= datetime('now')"
  ).all();

  for (const row of due) {
    try {
      await sendEmail({ name: row.name, email: row.email, templateId: row.template_id });
      _db.prepare('UPDATE scheduled_emails SET sent = 1 WHERE id = ?').run(row.id);
      console.log(`Brevo scheduler: sent template ${row.template_id} to ${row.email}`);
    } catch (err) {
      console.error(`Brevo scheduler: failed to send template ${row.template_id} to ${row.email}:`, err.message);
    }
  }
  if (due.length > 0) {
    console.log(`Brevo scheduler: processed ${due.length} due emails`);
  }
}

/**
 * Send the 3-email nurture sequence:
 *   Day 0: Welcome + Value (immediate)
 *   Day 3: Education + Pain Point (scheduled via Brevo API)
 *   Day 7: Social Proof + Demo CTA (scheduled via SQLite + server)
 *
 * Brevo limits transactional scheduling to 3 days, so Day 7 is handled server-side.
 */
async function sendNurtureSequence({ name, email }) {
  const now = new Date();

  // Day 0 — send immediately
  await sendEmail({ name, email, templateId: TEMPLATE_WELCOME });

  // Day 3 — schedule via Brevo API (within 3-day limit)
  const day3 = new Date(now);
  day3.setDate(day3.getDate() + 3);
  day3.setUTCHours(4, 30, 0, 0); // 10:00 AM IST
  await brevoRequest('POST', '/smtp/email', {
    templateId: TEMPLATE_EDUCATION,
    to: [{ email, name: name || '' }],
    params: { FIRSTNAME: (name || '').split(' ')[0] || 'there' },
    scheduledAt: day3.toISOString(),
  });

  // Day 7 — schedule via server-side SQLite (beyond Brevo's 3-day limit)
  if (_db) {
    const day7 = new Date(now);
    day7.setDate(day7.getDate() + 7);
    day7.setUTCHours(4, 30, 0, 0); // 10:00 AM IST
    _db.prepare(
      'INSERT INTO scheduled_emails (email, name, template_id, send_at) VALUES (?, ?, ?, ?)'
    ).run(email, name || '', TEMPLATE_SOCIAL_PROOF, day7.toISOString());
  }
}

/**
 * Main entry point: add lead to Brevo and trigger nurture sequence.
 * Called from the /api/leads endpoint. Runs async, does not block response.
 */
async function syncLeadToBrevo(lead) {
  try {
    const result = await addContact(lead);
    console.log(`Brevo: contact synced — ${lead.email} → ${result.vertical} (lists: ${result.listIds.join(',')})`);

    await sendNurtureSequence(lead);
    console.log(`Brevo: nurture sequence scheduled for ${lead.email} (Day 0 sent, Day 3 & Day 7 scheduled)`);

    return result;
  } catch (err) {
    console.error(`Brevo sync error for ${lead.email}:`, err.message);
    // Don't throw — Brevo errors should not break lead capture
  }
}

export {
  syncLeadToBrevo,
  initScheduler,
  addContact,
  sendNurtureSequence,
  detectVertical,
  LIST_ALL_LEADS,
  LIST_RETAILEROS,
  LIST_CRM,
  LIST_VMS,
  LIST_GENERAL,
  TEMPLATE_WELCOME,
  TEMPLATE_EDUCATION,
  TEMPLATE_SOCIAL_PROOF,
};
