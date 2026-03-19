import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const PORT = 4173;

const ROUTES = [
  '/',
  '/products',
  '/services',
  '/work',
  '/philosophy',
  '/contact',
  '/blog',
  '/products/retaileros',
  '/products/real-estate-crm',
  '/products/visitor-management',
  '/vancouver',
  // Blog posts (dynamic routes need prerendering for SEO)
  '/blog/retail-management-software-telecom-electronics-india',
  '/blog/how-to-choose-real-estate-crm-india',
  '/blog/legacy-modernization-checklist-indian-enterprises',
  '/blog/ai-integration-guide-mid-size-companies-india',
  '/blog/why-vancouver-startups-partner-with-bangalore-teams',
  // Comparison pages
  '/compare/retaileros-vs-iqmetrix',
  '/compare/real-estate-crm-vs-selldo',
  '/compare/vms-vs-envoy',
  // Tools
  '/tools/roi-calculator',
];

// Simple static file server
function startServer() {
  const mimeTypes = {
    '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
    '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml',
    '.txt': 'text/plain',
  };

  const server = createServer((req, res) => {
    let filePath = join(DIST, req.url === '/' ? '/index.html' : req.url);
    // SPA fallback
    if (!existsSync(filePath) || !filePath.includes('.')) {
      filePath = join(DIST, 'index.html');
    }
    try {
      const content = readFileSync(filePath);
      const ext = '.' + filePath.split('.').pop();
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  return new Promise(resolve => server.listen(PORT, () => resolve(server)));
}

async function prerender() {
  console.log('Starting pre-render...');
  const server = await startServer();

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  for (const route of ROUTES) {
    const page = await browser.newPage();
    const url = `http://localhost:${PORT}${route}`;
    console.log(`  Rendering ${route}...`);

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for React to render
    await page.waitForSelector('#root > *', { timeout: 10000 });
    // Small extra wait for animations to settle
    await new Promise(r => setTimeout(r, 500));

    let html = await page.content();

    // Inject a marker so React knows to hydrate, not re-render
    html = html.replace('<div id="root">', '<div id="root" data-prerendered="true">');

    // Write the pre-rendered HTML
    const outDir = join(DIST, route === '/' ? '' : route);
    if (route !== '/') {
      mkdirSync(outDir, { recursive: true });
    }
    const outFile = route === '/' ? join(DIST, 'index.html') : join(outDir, 'index.html');
    writeFileSync(outFile, html);
    console.log(`  ✓ ${outFile}`);

    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`\nPre-rendered ${ROUTES.length} routes.`);
}

prerender().catch(err => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
