/**
 * Contact form emails via Resend (https://resend.com).
 *
 * - Thank-you note to the person who filled the form
 * - Internal notification to the Khosha team
 *
 * Requires RESEND_API_KEY in the server environment. All lead fields passed in
 * are expected to be HTML-escaped already (see sanitizeHtml in index.js).
 */

import { wrapEmailHtml, textToEmailHtml, SITE_URL } from './email-template.js';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.RESEND_FROM || 'Khosha Systems <hello@khoshasystems.com>';
const REPLY_TO = 'veda@khoshasystems.com';
const TEAM_RECIPIENTS = [
  'veda@khoshasystems.com',
  'ankit@khoshasystems.com',
  'nischal@khoshasystems.com',
];

if (!RESEND_API_KEY) {
  console.warn('WARNING: RESEND_API_KEY not set — contact form emails disabled');
}

async function sendEmail(payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM, ...payload }),
  });
  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

function customerEmail({ name, goal }) {
  const firstName = (name || '').split(' ')[0] || 'there';
  const text = [
    `Hi ${firstName},`,
    `Thank you for contacting Khosha Systems${goal ? ` about <strong>${goal}</strong>` : ''}. We've received your message and someone from our team will get back to you within 24 hours.`,
    `If you'd like to add anything in the meantime, just reply to this email.`,
    `Warm regards,\nTeam Khosha Systems\nKumara Park, Seshadripuram, Bangalore`,
  ].join('\n\n');

  return {
    subject: 'Thank you for contacting Khosha Systems',
    html: wrapEmailHtml({
      body: textToEmailHtml(text),
      preheader: "We've received your message and will be in touch within 24 hours.",
      utmCampaign: 'contact-thank-you',
    }),
  };
}

function teamEmail({ name, company, email, goal, message, source }) {
  const row = (label, value) => `
    <tr>
      <td style="padding: 6px 12px 6px 0; color: #6b7280; font-size: 13px; white-space: nowrap; vertical-align: top;">${label}</td>
      <td style="padding: 6px 0; color: #1f2937; font-size: 14px;">${value || '—'}</td>
    </tr>`;

  const body = `
    <p style="margin: 0 0 16px 0;"><strong>${name || 'Someone'}</strong>${company ? ` from <strong>${company}</strong>` : ''} has contacted Khosha Systems through the website.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 16px;">
      ${row('Name', name)}
      ${row('Company', company)}
      ${row('Email', `<a href="mailto:${email}" style="color: #b8860b;">${email}</a>`)}
      ${row('Interested in', goal)}
      ${row('Message', (message || '').replace(/\n/g, '<br>'))}
      ${row('Source', source)}
    </table>
    <p style="margin: 0;">Reply to this email to respond to them directly, or view all leads in the <a href="${SITE_URL}/admin" style="color: #b8860b;">admin dashboard</a>.</p>`;

  return {
    subject: `New enquiry: ${name || email}${company ? ` (${company})` : ''}`,
    html: wrapEmailHtml({ body, showProductLinks: false, utmCampaign: 'contact-notification' }),
  };
}

/**
 * Send the thank-you note and the team notification. Never throws — failures
 * are logged so the lead submission itself is never affected.
 * `rawEmail` is the unescaped address used as the actual recipient.
 */
async function sendContactEmails(lead, rawEmail) {
  if (!RESEND_API_KEY) return;

  const results = await Promise.allSettled([
    sendEmail({ to: [rawEmail], reply_to: REPLY_TO, ...customerEmail(lead) }),
    sendEmail({ to: TEAM_RECIPIENTS, reply_to: rawEmail, ...teamEmail(lead) }),
  ]);

  const [customer, team] = results;
  if (customer.status === 'rejected') console.error('Resend thank-you email failed:', customer.reason.message);
  if (team.status === 'rejected') console.error('Resend team notification failed:', team.reason.message);
  if (customer.status === 'fulfilled' && team.status === 'fulfilled') {
    console.log(`Contact emails sent for ${rawEmail}`);
  }
}

export { sendContactEmails };
