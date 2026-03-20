import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const PORT = 4173;
const BASE_URL = 'https://khoshasystems.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-icon.png`;

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
  '/blog/imei-tracking-reduces-shrinkage-telecom-retail',
  '/blog/5-signs-real-estate-business-needs-crm',
  '/blog/indian-telecom-retailers-switching-digital-billing',
  '/blog/digital-visitor-management-roi-indian-corporates',
  '/blog/retaileros-vs-manual-billing-comparison',
  '/blog/scheme-management-simple-telecom-retailers',
  '/blog/case-study-pune-retailer-saved-40-percent-billing-time',
  // Solutions (vertical landing pages)
  '/solutions/fashion-retail',
  '/solutions/grocery',
  '/solutions/electronics',
  // Comparison pages
  '/compare/retaileros-vs-iqmetrix',
  '/compare/real-estate-crm-vs-selldo',
  '/compare/vms-vs-envoy',
  '/compare/retaileros-vs-shopify',
  '/compare/retaileros-vs-lightspeed',
  '/compare/retaileros-vs-square',
  // Tools
  '/tools/roi-calculator',
];

// SEO config mirrored from components/SEOHead.tsx — keep in sync
const seoConfig = {
  '/': {
    title: 'Khoshà Systems | Software Development & AI Transformation Company | Bangalore',
    description: 'Khoshà Systems builds web apps, SaaS products & AI solutions from Bangalore. RetailerOS, Real Estate CRM, Visitor Management. 15+ years experience.',
    keywords: 'software development company Bangalore, web application development company Bangalore, SaaS product development company India, AI transformation services Bangalore, custom software development Bangalore, digital transformation company Bangalore, RetailerOS, real estate CRM India, visitor management system India, legacy modernization services India, software company Bengaluru, IT company Indiranagar Bangalore'
  },
  '/products': {
    title: 'SaaS Products | RetailerOS, Real Estate CRM & Visitor Management | Khoshà Systems',
    description: 'Production-ready SaaS: RetailerOS for retail, Real Estate CRM for Indian developers, Visitor Management for offices. Built in Bangalore.',
    keywords: 'RetailerOS telecom retail management software India, mobile phone shop billing software, IMEI tracking software, consumer electronics retail software, scheme management software retail, real estate CRM software India, CRM for real estate developers India, visitor management system India, digital visitor management software, inventory management software retailers India, brand scheme tracking software retailers'
  },
  '/products/retaileros': {
    title: 'RetailerOS | Telecom & Electronics Retail Management Software India | Khoshà Systems',
    description: 'RetailerOS — retail management for mobile & electronics stores. IMEI tracking, scheme management, GST billing. Built by Khoshà Systems.',
    keywords: 'RetailerOS, telecom retail management software India, mobile phone shop billing software, IMEI tracking software retailers, consumer electronics retail software, scheme management software retail, telecom distributor software India, mobile retail POS India, electronics store inventory management, brand scheme tracking software, cashback management software retailers, GST-compliant retail billing software, multi-store retail management software, retail SaaS platform India, retaileros.in'
  },
  '/products/real-estate-crm': {
    title: 'Real Estate CRM India | Lead Management for Developers & Brokers | Khoshà Systems',
    description: 'CRM for Indian real estate. Capture leads from 99acres, MagicBricks, Housing.com. Track site visits, automate follow-ups. RERA-compliant.',
    keywords: 'real estate CRM software India, CRM for real estate developers India, real estate lead management software, property CRM India, CRM for builders and developers, real estate broker CRM India, 99acres lead management CRM, MagicBricks CRM integration, RERA-compliant CRM software, real estate channel partner management, site visit tracking software real estate, real estate follow-up automation India, real estate sales CRM Bangalore'
  },
  '/products/visitor-management': {
    title: 'Visitor Management System India | Digital Check-In & Analytics | Khoshà Systems',
    description: 'Visitor management for offices & real estate sites. QR check-in, WhatsApp alerts, analytics, RERA-compliant logs. 90% faster check-in.',
    keywords: 'visitor management system India, digital visitor management software, visitor check-in system offices, visitor management system real estate, contactless visitor management, QR code visitor check-in system, visitor tracking software India, office visitor management system, co-working space visitor management, RERA-compliant visitor log system, WhatsApp visitor notification system, visitor analytics software'
  },
  '/services': {
    title: 'Web Development, AI Integration & Digital Transformation Services | Khoshà Systems Bangalore',
    description: 'Custom web apps, AI transformation, mobile apps, website design & legacy modernization. Full-stack services from Bangalore, India.',
    keywords: 'web application development company Bangalore, custom web app development Bangalore, React development company Bangalore, AI integration company Bangalore, AI agent development services, mobile app development company Bangalore, website design company Bangalore, landing page design services India, system architecture consulting Bangalore, digital transformation consulting Bangalore, legacy system modernization India, cloud migration services Bangalore, SaaS platform development company India, enterprise web application development India'
  },
  '/work': {
    title: 'Our Work | Software Projects & Case Studies | Khoshà Systems Bangalore',
    description: 'Portfolio: web apps, SaaS products & digital transformation for Prestige Constructions, Arrowhead Communications & more.',
    keywords: 'software development case studies Bangalore, digital transformation success stories India, enterprise software portfolio, web application projects, AI integration case studies, custom software development portfolio, Prestige Constructions technology partner'
  },
  '/philosophy': {
    title: 'About Khoshà Systems | Architect-Led Software Company | 15+ Years | Bangalore',
    description: 'Founded by Ankit Mehta in Bangalore. 15+ years building enterprise software across continents. Architect-led, quality-first approach.',
    keywords: 'about Khoshà Systems, Khosha Systems Bangalore, Ankit Mehta founder, software company Indiranagar Bangalore, technology consulting India, architect-led software company, best software company Bangalore for startups, tech company Indiranagar, software company Bengaluru'
  },
  '/contact': {
    title: 'Contact Khoshà Systems | Software Company in Indiranagar, Bangalore',
    description: 'Get in touch for web apps, SaaS, AI or digital transformation. Indiranagar, Bangalore. Email: hello@khoshasystems.com',
    keywords: 'contact software company Bangalore, hire web developers Bangalore, software development quote India, digital transformation consultation Bangalore, Indiranagar tech company contact, software outsourcing company Bangalore, startup tech partner Bangalore'
  },
  '/vancouver': {
    title: 'Software Development Company Vancouver | AI & SaaS Development | Khoshà Systems',
    description: 'Khoshà Systems Vancouver — custom web apps, SaaS & AI transformation. 15+ years experience, senior team with local presence.',
    keywords: 'software development company Vancouver, custom software development Vancouver BC, AI transformation services Vancouver, SaaS development Canada, web development company Vancouver, digital transformation Vancouver, offshore development partner Canada, Vancouver software development'
  },
  '/solutions/fashion-retail': {
    title: 'Fashion Retail POS & Inventory Software India | RetailerOS | Khoshà Systems',
    description: 'RetailerOS for fashion & apparel stores. Size-color inventory matrix, seasonal planning, multi-store management, and GST billing. Built for Indian fashion retail.',
    keywords: 'fashion retail POS India, apparel inventory management software, clothing store software India, fashion store billing software, size color inventory management, garment shop POS, multi-store fashion retail software, seasonal inventory planning retail, apparel retail management India, fashion boutique POS software'
  },
  '/solutions/grocery': {
    title: 'Grocery Store & Supermarket POS Software India | RetailerOS | Khoshà Systems',
    description: 'RetailerOS for grocery stores & supermarkets. Perishable inventory, expiry tracking, weight-based billing, barcode scanning. Built for Indian grocery retail.',
    keywords: 'grocery POS system India, supermarket billing software, grocery store management software, kirana store POS, supermarket inventory management India, barcode billing software grocery, expiry tracking software retail, weight based billing software, grocery store software India, FMCG retail management software'
  },
  '/solutions/electronics': {
    title: 'Electronics & Mobile Shop POS Software India | RetailerOS | Khoshà Systems',
    description: 'RetailerOS for electronics & mobile stores. IMEI tracking, warranty management, brand scheme automation, exchange workflows. Purpose-built for Indian electronics retail.',
    keywords: 'electronics store POS India, mobile shop billing software, IMEI tracking software, mobile phone shop POS India, electronics retail management software, warranty management software retail, brand scheme management electronics, mobile store inventory software, consumer electronics POS India, cellphone store software India'
  },
  '/compare/retaileros-vs-iqmetrix': {
    title: 'RetailerOS vs iQmetrix | India-First Telecom Retail Software Alternative | Khoshà Systems',
    description: 'Compare RetailerOS vs iQmetrix for telecom retail. RetailerOS offers GST billing, IMEI tracking, brand scheme management built for Indian retailers at affordable pricing.',
    keywords: 'RetailerOS vs iQmetrix, iQmetrix alternative India, telecom retail software India, RetailerOS alternative iQmetrix, mobile shop billing software vs iQmetrix, IMEI tracking software India, best retail POS India telecom, iQmetrix India pricing, telecom retail management comparison'
  },
  '/compare/real-estate-crm-vs-selldo': {
    title: 'Khosha Real Estate CRM vs Sell.Do | Simpler & More Affordable CRM | Khoshà Systems',
    description: 'Compare Khosha Real Estate CRM vs Sell.Do. Simpler, more affordable CRM for Indian developers and brokers. Flat-rate pricing, WhatsApp-first, works in Tier-2/3 cities.',
    keywords: 'Sell.Do alternative India, real estate CRM vs Sell.Do, best real estate CRM India affordable, Sell.Do pricing comparison, CRM for real estate developers India, property CRM alternative Sell.Do, real estate lead management software India, Sell.Do competitors India'
  },
  '/compare/vms-vs-envoy': {
    title: 'Khosha VMS vs Envoy | India Pricing & Compliance | Visitor Management | Khoshà Systems',
    description: 'Compare Khosha VMS vs Envoy Visitors. India pricing, RERA compliance, WhatsApp alerts, Android tablet support. Enterprise visitor management at a fraction of Envoy cost.',
    keywords: 'Envoy alternative India, visitor management system vs Envoy, VMS India pricing, Envoy visitors alternative affordable, visitor management system India, RERA compliant visitor management, WhatsApp visitor notification system, Envoy competitors India, digital visitor management India'
  },
  '/compare/retaileros-vs-shopify': {
    title: 'RetailerOS vs Shopify POS | Telecom Retail Software with IMEI Tracking | Khoshà Systems',
    description: 'Compare RetailerOS vs Shopify POS for telecom retail. RetailerOS offers native IMEI tracking, brand scheme management, and GST billing — features Shopify POS lacks.',
    keywords: 'RetailerOS vs Shopify POS, Shopify POS alternative telecom, Shopify POS IMEI tracking, mobile phone shop POS alternative Shopify, telecom retail software vs Shopify, Shopify POS India GST, electronics store POS India, Shopify POS serial number tracking, best POS for mobile phone shop India'
  },
  '/compare/retaileros-vs-lightspeed': {
    title: 'RetailerOS vs Lightspeed | No Lock-In Telecom Retail POS | Khoshà Systems',
    description: 'Compare RetailerOS vs Lightspeed Retail for telecom stores. No forced payment processors, no long-term contracts, no surprise price hikes. Purpose-built for Indian telecom retail.',
    keywords: 'RetailerOS vs Lightspeed, Lightspeed alternative India, Lightspeed POS alternative telecom, Lightspeed Retail pricing comparison, cellphone store POS vs Lightspeed, telecom retail software India, Lightspeed payment processor lock-in, electronics store POS India, best retail POS without lock-in'
  },
  '/compare/retaileros-vs-square': {
    title: 'RetailerOS vs Square for Retail | Beyond Basic POS for Telecom | Khoshà Systems',
    description: 'Compare RetailerOS vs Square for Retail. Square lacks IMEI tracking, serial numbers, and GST billing. RetailerOS is purpose-built for telecom and electronics retail in India.',
    keywords: 'RetailerOS vs Square for Retail, Square POS alternative telecom, Square POS IMEI tracking, mobile phone shop POS vs Square, telecom retail software vs Square, Square POS India, electronics store POS alternative Square, Square for Retail serial number, best POS mobile phone shop India'
  },
  '/blog': {
    title: 'Blog | Software Development, AI & Digital Transformation Insights | Khoshà Systems',
    description: 'Insights on software development, AI, retail tech & digital transformation from Khoshà Systems, Bangalore.',
    keywords: 'software development blog India, AI transformation insights, retail technology blog, real estate CRM guide India, digital transformation articles, SaaS development blog Bangalore, enterprise software insights'
  },
  '/tools/roi-calculator': {
    title: 'ROI Calculator | Estimate Your Software Investment Returns | Khoshà Systems',
    description: 'Calculate the return on investment for RetailerOS, Real Estate CRM, or Visitor Management System. Free ROI calculator by Khoshà Systems.',
    keywords: 'ROI calculator software, RetailerOS ROI, real estate CRM ROI, visitor management ROI, software investment calculator India'
  }
};

// Simple static file server for Puppeteer mode
function startServer() {
  const mimeTypes = {
    '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
    '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml',
    '.txt': 'text/plain',
  };

  const server = createServer((req, res) => {
    let filePath = join(DIST, req.url === '/' ? '/index.html' : req.url);
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

// Full prerender with Puppeteer (best quality — includes rendered React content)
async function prerenderWithPuppeteer() {
  const puppeteer = await import('puppeteer');
  console.log('Pre-rendering with Puppeteer (full HTML)...');
  const server = await startServer();

  const browser = await puppeteer.default.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  for (const route of ROUTES) {
    const page = await browser.newPage();
    const url = `http://localhost:${PORT}${route}`;
    console.log(`  Rendering ${route}...`);

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForSelector('#root > *', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 500));

    let html = await page.content();
    html = html.replace('<div id="root">', '<div id="root" data-prerendered="true">');

    const outDir = join(DIST, route === '/' ? '' : route);
    if (route !== '/') mkdirSync(outDir, { recursive: true });
    const outFile = route === '/' ? join(DIST, 'index.html') : join(outDir, 'index.html');
    writeFileSync(outFile, html);
    console.log(`  ✓ ${outFile}`);

    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`\nPre-rendered ${ROUTES.length} routes with Puppeteer.`);
}

// Lightweight fallback: inject per-route meta tags into built index.html
// Doesn't render React content but ensures crawlers see correct SEO metadata
function prerenderMetaOnly() {
  console.log('Pre-rendering with meta-tag injection (Puppeteer unavailable)...');
  const templateHtml = readFileSync(join(DIST, 'index.html'), 'utf8');

  for (const route of ROUTES) {
    const config = seoConfig[route];
    // Blog posts don't have static seo config (set dynamically); copy template with canonical fix
    const canonicalUrl = route === '/' ? BASE_URL : `${BASE_URL}${route}`;
    const ogImage = (config && config.ogImage) || DEFAULT_OG_IMAGE;

    let html = templateHtml;

    if (config) {
      // Replace title
      html = html.replace(
        /<title>[^<]*<\/title>/,
        `<title>${config.title}</title>`
      );
      // Replace meta description
      html = html.replace(
        /<meta name="description" content="[^"]*" \/>/,
        `<meta name="description" content="${config.description}" />`
      );
      // Replace meta keywords
      html = html.replace(
        /<meta name="keywords" content="[^"]*" \/>/,
        `<meta name="keywords" content="${config.keywords}" />`
      );
      // Replace OG tags
      html = html.replace(
        /<meta property="og:title" content="[^"]*" \/>/,
        `<meta property="og:title" content="${config.title}" />`
      );
      html = html.replace(
        /<meta property="og:description" content="[^"]*" \/>/,
        `<meta property="og:description" content="${config.description}" />`
      );
      html = html.replace(
        /<meta property="og:image" content="[^"]*" \/>/,
        `<meta property="og:image" content="${ogImage}" />`
      );
      // Replace Twitter tags
      html = html.replace(
        /<meta name="twitter:title" content="[^"]*" \/>/,
        `<meta name="twitter:title" content="${config.title}" />`
      );
      html = html.replace(
        /<meta name="twitter:description" content="[^"]*" \/>/,
        `<meta name="twitter:description" content="${config.description}" />`
      );
    }

    // Always fix canonical URL and og:url for every route
    html = html.replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );
    html = html.replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );

    // Write the file
    const outDir = join(DIST, route === '/' ? '' : route);
    if (route !== '/') mkdirSync(outDir, { recursive: true });
    const outFile = route === '/' ? join(DIST, 'index.html') : join(outDir, 'index.html');
    writeFileSync(outFile, html);
    console.log(`  ✓ ${route}`);
  }

  console.log(`\nPre-rendered ${ROUTES.length} routes with meta-tag injection.`);
}

async function prerender() {
  console.log('Starting pre-render...');

  try {
    await prerenderWithPuppeteer();
  } catch (err) {
    console.log(`\nPuppeteer failed: ${err.message}`);
    console.log('Falling back to meta-tag injection...\n');
    prerenderMetaOnly();
  }
}

prerender().catch(err => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
