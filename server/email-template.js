/**
 * Shared HTML email template for Khosha Systems campaign emailers.
 *
 * Provides a branded wrapper with:
 * - Khosha Systems logo header (clickable → homepage)
 * - Product links section
 * - Social/contact footer
 *
 * Used by email-monitor.js (draft replies) and brevo.js (transactional emails).
 */

const SITE_URL = 'https://khoshasystems.com';
const LOGO_URL = `${SITE_URL}/logo.png`;

const PRODUCT_LINKS = [
  { name: 'RetailerOS', url: `${SITE_URL}/retaileros`, description: 'Telecom Retail Management' },
  { name: 'Real Estate CRM', url: `${SITE_URL}/realestate-crm`, description: 'CRM for Real Estate' },
  { name: 'VMS', url: `${SITE_URL}/vms`, description: 'Visitor Management System' },
];

const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/company/khoshasystems',
  twitter: 'https://twitter.com/khoshasystems',
};

/**
 * Wrap email body content in a branded HTML template.
 *
 * @param {object} options
 * @param {string} options.body        — HTML body content (the main email text)
 * @param {string} [options.preheader] — Preview text shown in inbox (hidden in email)
 * @param {boolean} [options.showProductLinks] — Show product links section (default: true)
 * @param {string} [options.utmCampaign] — UTM campaign tag for link tracking
 * @returns {string} Complete HTML email
 */
function wrapEmailHtml({ body, preheader = '', showProductLinks = true, utmCampaign = 'email-campaign' }) {
  const utm = (url, content) =>
    `${url}${url.includes('?') ? '&' : '?'}utm_source=email&utm_medium=campaign&utm_campaign=${utmCampaign}&utm_content=${content}`;

  const productLinksHtml = showProductLinks
    ? `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 24px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        <tr>
          <td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #6b7280; padding-bottom: 12px; font-weight: 600;">
            Our Products
          </td>
        </tr>
        ${PRODUCT_LINKS.map(
          (p) => `
        <tr>
          <td style="padding-bottom: 8px;">
            <a href="${utm(p.url, `footer-${p.name.toLowerCase().replace(/\s+/g, '-')}`)}" style="color: #b8860b; text-decoration: none; font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 600;">${p.name}</a>
            <span style="color: #9ca3af; font-family: Arial, Helvetica, sans-serif; font-size: 13px;"> — ${p.description}</span>
          </td>
        </tr>`
        ).join('')}
      </table>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Khosha Systems</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: Arial, Helvetica, sans-serif;">
  ${preheader ? `<div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #f3f4f6;">${preheader}</div>` : ''}

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 24px 16px;">

        <!-- Email container -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">

          <!-- Logo Header -->
          <tr>
            <td style="padding: 24px 32px; background-color: #ffffff; border-bottom: 2px solid #b8860b;">
              <a href="${utm(SITE_URL, 'header-logo')}" target="_blank" style="text-decoration: none;">
                <img src="${LOGO_URL}" alt="Khosha Systems" width="180" style="display: block; max-width: 180px; height: auto; border: 0;" />
              </a>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; color: #1f2937;">
              ${body}
              ${productLinksHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #6b7280; line-height: 1.5;">
                    <strong style="color: #1f2937;">Khosha Systems</strong><br>
                    Purpose-built software for Indian businesses<br>
                    Kumara Park West, Bangalore
                  </td>
                  <td align="right" valign="top" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px;">
                    <a href="${utm(SITE_URL, 'footer-website')}" style="color: #b8860b; text-decoration: none;">Website</a>
                    &nbsp;·&nbsp;
                    <a href="${utm(SITE_URL + '/contact', 'footer-contact')}" style="color: #b8860b; text-decoration: none;">Contact Us</a>
                    ${SOCIAL_LINKS.linkedin ? `&nbsp;·&nbsp;<a href="${SOCIAL_LINKS.linkedin}" style="color: #b8860b; text-decoration: none;">LinkedIn</a>` : ''}
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 16px; font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #9ca3af;">
                    © ${new Date().getFullYear()} Khosha Systems. All rights reserved.<br>
                    <a href="${SITE_URL}/contact" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a> · <a href="${SITE_URL}/privacy" style="color: #9ca3af; text-decoration: underline;">Privacy Policy</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Convert plain text email body to simple HTML paragraphs.
 * Preserves line breaks and wraps in paragraph tags.
 */
function textToEmailHtml(text) {
  return text
    .split('\n\n')
    .map((para) => `<p style="margin: 0 0 16px 0;">${para.replace(/\n/g, '<br>')}</p>`)
    .join('');
}

export {
  wrapEmailHtml,
  textToEmailHtml,
  SITE_URL,
  LOGO_URL,
  PRODUCT_LINKS,
  SOCIAL_LINKS,
};
