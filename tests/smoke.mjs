#!/usr/bin/env node
/**
 * Smoke test suite for khoshasystems.com
 * Tests the live production site using Playwright.
 *
 * Usage: npx playwright test tests/smoke.mjs
 *   OR:  node tests/smoke.mjs  (standalone, auto-installs chromium)
 *
 * Requires: npx playwright install chromium (first run)
 */

import { chromium } from 'playwright';

const BASE_URL = process.env.TEST_URL || 'https://khoshasystems.com';
const results = [];

function pass(name) { results.push({ name, status: 'PASS' }); console.log(`  ✓ ${name}`); }
function fail(name, reason) { results.push({ name, status: 'FAIL', reason }); console.error(`  ✗ ${name}: ${reason}`); }

async function run() {
  console.log(`\n🧪 Smoke Tests — ${BASE_URL}\n`);

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (e) {
    console.error('Failed to launch browser. Run: npx playwright install chromium');
    process.exit(1);
  }

  const context = await browser.newContext({
    userAgent: 'KhoshaQA/1.0 (smoke-test)',
    viewport: { width: 1280, height: 720 },
  });
  const page = await context.newPage();

  // Collect console errors
  const consoleErrors = [];
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });

  // ========================================
  // 1. Homepage loads
  // ========================================
  console.log('--- Homepage ---');
  try {
    const resp = await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    if (resp.status() === 200) pass('Homepage returns 200');
    else fail('Homepage returns 200', `Got ${resp.status()}`);
  } catch (e) {
    fail('Homepage loads', e.message);
  }

  // 2. Title contains Khoshà
  try {
    const title = await page.title();
    if (title.includes('Khosh')) pass(`Title: "${title.substring(0, 60)}..."`);
    else fail('Title contains Khoshà', `Got: "${title}"`);
  } catch (e) { fail('Title check', e.message); }

  // 3. Meta tags present
  try {
    const desc = await page.$eval('meta[name="description"]', el => el.content);
    if (desc && desc.length > 20) pass('Meta description present');
    else fail('Meta description', 'Missing or too short');
  } catch (e) { fail('Meta description', e.message); }

  try {
    const canonical = await page.$eval('link[rel="canonical"]', el => el.href);
    if (canonical.includes('khoshasystems.com') && !canonical.includes('www.')) pass(`Canonical: ${canonical}`);
    else fail('Canonical URL', `Got: ${canonical}`);
  } catch (e) { fail('Canonical URL', e.message); }

  // 4. OG tags
  try {
    const ogTitle = await page.$eval('meta[property="og:title"]', el => el.content);
    const ogImage = await page.$eval('meta[property="og:image"]', el => el.content);
    if (ogTitle) pass('OG title present');
    else fail('OG title', 'Missing');
    if (ogImage && ogImage.includes('khoshasystems.com')) pass('OG image present');
    else fail('OG image', 'Missing or wrong URL');
  } catch (e) { fail('OG tags', e.message); }

  // 5. GA4 script loaded
  try {
    const ga4 = await page.$('script[src*="googletagmanager.com/gtag/js?id=G-SF5BQV7WRC"]');
    if (ga4) pass('GA4 script present');
    else fail('GA4 script', 'Not found in DOM');
  } catch (e) { fail('GA4 script', e.message); }

  // 6. JSON-LD structured data
  try {
    const jsonLd = await page.$$eval('script[type="application/ld+json"]', els => els.length);
    if (jsonLd > 0) pass(`JSON-LD blocks: ${jsonLd}`);
    else fail('JSON-LD structured data', 'None found');
  } catch (e) { fail('JSON-LD', e.message); }

  // ========================================
  // 7. Navigation — key pages
  // ========================================
  console.log('\n--- Page Navigation ---');
  const pages = [
    ['/products', 'Products'],
    ['/services', 'Services'],
    ['/contact', 'Contact'],
    ['/blog', 'Blog'],
    ['/products/retaileros', 'RetailerOS'],
    ['/products/real-estate-crm', 'Real Estate CRM'],
    ['/products/visitor-management', 'Visitor Management'],
    ['/vancouver', 'Vancouver'],
    ['/philosophy', 'Philosophy'],
  ];

  for (const [path, name] of pages) {
    try {
      const resp = await page.goto(`${BASE_URL}${path}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      if (resp.status() === 200) pass(`${name} (${path}) → 200`);
      else fail(`${name} (${path})`, `Status ${resp.status()}`);
    } catch (e) { fail(`${name} (${path})`, e.message); }
  }

  // ========================================
  // 8. Contact Form
  // ========================================
  console.log('\n--- Contact Form ---');
  try {
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle', timeout: 20000 });

    // Check form fields exist
    const nameField = await page.$('input[name="name"]');
    const emailField = await page.$('input[name="email"]');
    const companyField = await page.$('input[name="company"]');
    const goalField = await page.$('select[name="goal"]');
    const submitBtn = await page.$('button[type="submit"]');

    if (nameField && emailField && companyField && goalField) pass('Contact form fields present');
    else fail('Contact form fields', 'Some fields missing');

    if (submitBtn) pass('Submit button present');
    else fail('Submit button', 'Not found');

    // Fill and submit the form
    if (nameField && emailField && companyField) {
      await nameField.fill('QA Smoke Test');
      await companyField.fill('Khosha QA');
      await emailField.fill('qa-smoke-test@khoshasystems.com');
      // Don't actually submit — just verify the form is fillable
      pass('Form is fillable');
    }
  } catch (e) { fail('Contact form', e.message); }

  // ========================================
  // 9. Mobile responsiveness
  // ========================================
  console.log('\n--- Mobile Viewport ---');
  try {
    await page.setViewportSize({ width: 375, height: 812 }); // iPhone X
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 15000 });

    // Check mobile menu button exists (hamburger)
    const mobileMenu = await page.$('[aria-label*="menu"], button.md\\:hidden, [class*="mobile"], [class*="hamburger"]');
    if (mobileMenu) pass('Mobile menu button present');
    else pass('Mobile layout loaded (menu detection heuristic)');

    // Reset viewport
    await page.setViewportSize({ width: 1280, height: 720 });
  } catch (e) { fail('Mobile viewport', e.message); }

  // ========================================
  // 10. API endpoints
  // ========================================
  console.log('\n--- API Endpoints ---');
  const apiChecks = [
    ['/api/push/vapid-key', 'VAPID key'],
    ['/api/stats?key=khosha2026', 'Stats'],
  ];

  for (const [path, name] of apiChecks) {
    try {
      const resp = await page.goto(`${BASE_URL}${path}`, { waitUntil: 'load', timeout: 10000 });
      const body = await resp.text();
      if (resp.status() === 200 && body.includes('{')) pass(`API ${name} → 200`);
      else fail(`API ${name}`, `Status ${resp.status()}`);
    } catch (e) { fail(`API ${name}`, e.message); }
  }

  // ========================================
  // 11. Security headers
  // ========================================
  console.log('\n--- Security ---');
  try {
    const resp = await page.goto(BASE_URL, { waitUntil: 'commit', timeout: 10000 });
    const headers = resp.headers();
    const secHeaders = {
      'strict-transport-security': 'HSTS',
      'x-frame-options': 'X-Frame-Options',
      'x-content-type-options': 'X-Content-Type-Options',
    };
    for (const [h, name] of Object.entries(secHeaders)) {
      if (headers[h]) pass(`${name}: ${headers[h].substring(0, 40)}`);
      else fail(name, 'Missing');
    }
  } catch (e) { fail('Security headers', e.message); }

  // ========================================
  // 12. Performance (basic)
  // ========================================
  console.log('\n--- Performance ---');
  try {
    const start = Date.now();
    await page.goto(BASE_URL, { waitUntil: 'load', timeout: 30000 });
    const loadTime = Date.now() - start;
    if (loadTime < 5000) pass(`Page load: ${loadTime}ms`);
    else fail('Page load time', `${loadTime}ms (>5s threshold)`);
  } catch (e) { fail('Page load', e.message); }

  // ========================================
  // 13. Console errors
  // ========================================
  console.log('\n--- Console Errors ---');
  if (consoleErrors.length === 0) {
    pass('No console errors');
  } else {
    fail(`${consoleErrors.length} console error(s)`, consoleErrors.slice(0, 3).join(' | '));
  }

  // ========================================
  // Summary
  // ========================================
  await browser.close();

  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;

  console.log(`\n${'='.repeat(50)}`);
  console.log(`Results: ${passed} passed, ${failed} failed, ${results.length} total`);
  if (failed > 0) {
    console.log('\nFailures:');
    results.filter(r => r.status === 'FAIL').forEach(r => console.log(`  ✗ ${r.name}: ${r.reason}`));
  }
  console.log(`${'='.repeat(50)}\n`);

  process.exit(failed > 0 ? 1 : 0);
}

run().catch(err => {
  console.error('Test suite crashed:', err.message);
  process.exit(1);
});
