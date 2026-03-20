import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'fs';
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
  // Additional pages
  '/success-stories',
  '/help',
  // 404 page (prerendered so nginx can serve it with proper 404 status)
  '/404',
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
  },
  '/success-stories': {
    title: 'Customer Success Stories | Real Results with Khoshà Systems Software',
    description: 'See how businesses across India use RetailerOS, Real Estate CRM, and Visitor Management to grow revenue and cut costs.',
    keywords: 'customer success stories, RetailerOS case studies, real estate CRM success, software ROI India, Khosha Systems customers'
  },
  '/help': {
    title: 'Knowledge Base | RetailerOS Help & Documentation | Khoshà Systems',
    description: 'Get help with RetailerOS, Real Estate CRM, and Visitor Management. Guides, FAQs, and documentation from Khoshà Systems.',
    keywords: 'RetailerOS help, RetailerOS documentation, Khosha Systems knowledge base, RetailerOS FAQ, retail software help India'
  },
  '/404': {
    title: 'Page Not Found | Khoshà Systems',
    description: 'The page you are looking for does not exist or has been moved.',
    keywords: ''
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

  return new Promise((resolve, reject) => {
    server.on('error', reject);
    server.listen(PORT, () => resolve(server));
  });
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

// Breadcrumb definitions for JSON-LD injection (mirrors StructuredData.tsx)
const breadcrumbMap = {
  '/': [{ name: 'Home', path: '' }],
  '/products': [{ name: 'Home', path: '' }, { name: 'Products', path: '/products' }],
  '/products/retaileros': [{ name: 'Home', path: '' }, { name: 'Products', path: '/products' }, { name: 'RetailerOS', path: '/products/retaileros' }],
  '/products/real-estate-crm': [{ name: 'Home', path: '' }, { name: 'Products', path: '/products' }, { name: 'Real Estate CRM', path: '/products/real-estate-crm' }],
  '/products/visitor-management': [{ name: 'Home', path: '' }, { name: 'Products', path: '/products' }, { name: 'Visitor Management', path: '/products/visitor-management' }],
  '/services': [{ name: 'Home', path: '' }, { name: 'Services', path: '/services' }],
  '/work': [{ name: 'Home', path: '' }, { name: 'Work', path: '/work' }],
  '/philosophy': [{ name: 'Home', path: '' }, { name: 'About', path: '/philosophy' }],
  '/contact': [{ name: 'Home', path: '' }, { name: 'Contact', path: '/contact' }],
  '/blog': [{ name: 'Home', path: '' }, { name: 'Blog', path: '/blog' }],
  '/compare/retaileros-vs-shopify': [{ name: 'Home', path: '' }, { name: 'Products', path: '/products' }, { name: 'RetailerOS', path: '/products/retaileros' }, { name: 'RetailerOS vs Shopify POS', path: '/compare/retaileros-vs-shopify' }],
  '/compare/retaileros-vs-lightspeed': [{ name: 'Home', path: '' }, { name: 'Products', path: '/products' }, { name: 'RetailerOS', path: '/products/retaileros' }, { name: 'RetailerOS vs Lightspeed', path: '/compare/retaileros-vs-lightspeed' }],
  '/compare/retaileros-vs-square': [{ name: 'Home', path: '' }, { name: 'Products', path: '/products' }, { name: 'RetailerOS', path: '/products/retaileros' }, { name: 'RetailerOS vs Square', path: '/compare/retaileros-vs-square' }],
  '/compare/retaileros-vs-iqmetrix': [{ name: 'Home', path: '' }, { name: 'Products', path: '/products' }, { name: 'RetailerOS', path: '/products/retaileros' }, { name: 'RetailerOS vs iQmetrix', path: '/compare/retaileros-vs-iqmetrix' }],
  '/compare/real-estate-crm-vs-selldo': [{ name: 'Home', path: '' }, { name: 'Products', path: '/products' }, { name: 'Real Estate CRM', path: '/products/real-estate-crm' }, { name: 'CRM vs Sell.Do', path: '/compare/real-estate-crm-vs-selldo' }],
  '/compare/vms-vs-envoy': [{ name: 'Home', path: '' }, { name: 'Products', path: '/products' }, { name: 'Visitor Management', path: '/products/visitor-management' }, { name: 'VMS vs Envoy', path: '/compare/vms-vs-envoy' }],
  '/solutions/fashion-retail': [{ name: 'Home', path: '' }, { name: 'Products', path: '/products' }, { name: 'RetailerOS', path: '/products/retaileros' }, { name: 'Fashion & Apparel Retail', path: '/solutions/fashion-retail' }],
  '/solutions/grocery': [{ name: 'Home', path: '' }, { name: 'Products', path: '/products' }, { name: 'RetailerOS', path: '/products/retaileros' }, { name: 'Grocery & Supermarket', path: '/solutions/grocery' }],
  '/solutions/electronics': [{ name: 'Home', path: '' }, { name: 'Products', path: '/products' }, { name: 'RetailerOS', path: '/products/retaileros' }, { name: 'Electronics & Mobile', path: '/solutions/electronics' }],
  '/success-stories': [{ name: 'Home', path: '' }, { name: 'Products', path: '/products' }, { name: 'RetailerOS', path: '/products/retaileros' }, { name: 'Customer Success Stories', path: '/success-stories' }],
  '/help': [{ name: 'Home', path: '' }, { name: 'Products', path: '/products' }, { name: 'RetailerOS', path: '/products/retaileros' }, { name: 'Knowledge Base', path: '/help' }],
};

// FAQ data for comparison pages (mirrors StructuredData.tsx exports)
const faqMap = {
  '/compare/retaileros-vs-shopify': [
    { question: 'Does Shopify POS support IMEI or serial number tracking?', answer: 'No. Shopify POS has no native serial number or IMEI tracking. RetailerOS has native IMEI capture via barcode, camera, or manual entry with a full audit trail.' },
    { question: 'How does RetailerOS pricing compare to Shopify POS?', answer: 'Shopify POS Pro costs $89/month per location for advanced features. RetailerOS includes all features in one transparent price with no tiered upselling.' },
    { question: 'Can Shopify POS handle brand scheme management?', answer: 'No. Shopify POS has no concept of brand schemes or cashbacks. RetailerOS has a built-in engine that tracks schemes from Samsung, Vivo, Oppo, Xiaomi, and other brands.' },
    { question: 'Is Shopify POS suitable for Indian telecom retailers?', answer: 'Shopify POS is designed for general retail and e-commerce. It lacks GST-compliant billing, IMEI tracking, brand scheme management, and WhatsApp notifications — all native to RetailerOS.' },
    { question: 'Can RetailerOS match Shopify for e-commerce?', answer: 'RetailerOS is focused on in-store telecom retail — IMEI tracking, billing, scheme management, and multi-store inventory. If your primary need is in-store telecom retail, RetailerOS is the better choice.' },
  ],
  '/compare/retaileros-vs-lightspeed': [
    { question: 'Does Lightspeed force you to use their payment processor?', answer: 'Yes. Lightspeed requires merchants to use Lightspeed Payments or face significantly higher subscription costs. RetailerOS works with any payment processor.' },
    { question: 'How does RetailerOS pricing compare to Lightspeed?', answer: 'Lightspeed starts at $89/month for Basic, $149 for Core, $289 for Plus — typically annual contracts. RetailerOS offers all features at one transparent price.' },
    { question: 'Does Lightspeed support telecom-specific features?', answer: 'No. Lightspeed is a general retail POS without IMEI tracking, brand scheme management, or GST billing. RetailerOS is purpose-built for Indian telecom retail.' },
    { question: 'Can I switch from Lightspeed to RetailerOS?', answer: 'Yes. RetailerOS has no long-term contracts. We provide assisted migration from Lightspeed including inventory, product catalog, and customer data.' },
    { question: 'Does RetailerOS lock you into a payment processor?', answer: 'No. RetailerOS works with any payment processor or gateway you choose, with no lock-in or pricing penalties.' },
  ],
  '/compare/retaileros-vs-square': [
    { question: 'Does Square for Retail support IMEI or serial number tracking?', answer: 'No. Square has no native serial number or IMEI tracking capability. RetailerOS has native IMEI capture via barcode, camera, or manual entry.' },
    { question: 'How does RetailerOS pricing compare to Square?', answer: 'Square Free plan has basic features; Plus at $60/month/location. RetailerOS includes all features — IMEI, schemes, GST, analytics — in one plan.' },
    { question: 'Is Square suitable for Indian telecom retail?', answer: 'Square is not available in India and lacks GST billing, IMEI tracking, brand scheme management, and WhatsApp notifications. RetailerOS is purpose-built for Indian telecom retail.' },
    { question: 'Does Square handle brand scheme management?', answer: 'No. Square has no brand scheme or cashback tracking. RetailerOS auto-tracks schemes from Samsung, Vivo, Oppo, Xiaomi, and applies them at billing.' },
    { question: 'Can RetailerOS work offline?', answer: 'RetailerOS is cloud-native with offline-resilient features for billing continuity. Square also supports offline payments but lacks the telecom-specific workflows.' },
  ],
  '/compare/retaileros-vs-iqmetrix': [
    { question: 'Is RetailerOS a good alternative to iQmetrix for Indian retailers?', answer: 'Yes. iQmetrix is built for the North American market. RetailerOS is purpose-built for Indian telecom with native GST billing, IMEI tracking, and brand scheme management.' },
    { question: 'How does RetailerOS pricing compare to iQmetrix?', answer: 'iQmetrix uses opaque enterprise pricing with long-term contracts. RetailerOS offers transparent, affordable SaaS pricing for Indian retailers.' },
    { question: 'Does RetailerOS support GST-compliant billing?', answer: 'Yes. Fully GST-compliant with HSN codes, tax invoicing, reverse charge handling, and return/credit note workflows.' },
  ],
  '/compare/real-estate-crm-vs-selldo': [
    { question: 'Is Khosha CRM a good alternative to Sell.Do?', answer: 'Yes. Khosha CRM focuses on features that drive revenue — lead management, site visit tracking, automated follow-ups — at a lower price point than Sell.Do.' },
    { question: 'How does pricing compare to Sell.Do?', answer: 'Sell.Do charges Rs.3,499/user/month. Khosha CRM offers flat-rate pricing that does not penalize you for growing your team.' },
    { question: 'Does Khosha CRM integrate with Indian property portals?', answer: 'Yes. Integrates with 99acres, MagicBricks, Housing.com, Facebook Ads, Google Ads, and website forms with automatic lead deduplication.' },
  ],
  '/compare/vms-vs-envoy': [
    { question: 'Is Khosha VMS a good alternative to Envoy?', answer: 'Yes. Khosha VMS is built for Indian workplaces with WhatsApp notifications, RERA compliance, Android tablet support, and INR pricing.' },
    { question: 'How much does Khosha VMS cost compared to Envoy?', answer: 'Envoy Premium costs $4,345/location/year. Khosha VMS offers the same core capabilities at a fraction of the cost, billed in INR.' },
    { question: 'Does Khosha VMS work on Android tablets?', answer: 'Yes. Unlike Envoy which is iPad-centric, Khosha VMS works on affordable Android tablets.' },
  ],
};

function buildBreadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.path === '' ? BASE_URL : `${BASE_URL}${item.path}`,
    })),
  };
}

function buildFAQJsonLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

function getJsonLdScripts(route) {
  const scripts = [];
  if (breadcrumbMap[route]) {
    scripts.push(JSON.stringify(buildBreadcrumbJsonLd(breadcrumbMap[route])));
  }
  if (faqMap[route]) {
    scripts.push(JSON.stringify(buildFAQJsonLd(faqMap[route])));
  }
  return scripts.map(s => `<script type="application/ld+json">${s}</script>`).join('\n');
}

// Lightweight fallback: inject per-route meta tags + JSON-LD into built index.html
// Doesn't render React content but ensures crawlers see correct SEO metadata and structured data
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

    // Inject JSON-LD structured data (breadcrumbs, FAQ schemas)
    const jsonLd = getJsonLdScripts(route);
    if (jsonLd) {
      html = html.replace('</head>', `${jsonLd}\n</head>`);
    }

    // Inject noscript fallback with page title and description for crawlers
    if (config) {
      html = html.replace(
        '<div id="root">',
        `<div id="root"><noscript><h1>${config.title}</h1><p>${config.description}</p></noscript>`
      );
    }

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

  // Copy 404/index.html to 404.html at dist root for nginx error_page directive
  const notFoundSrc = join(DIST, '404', 'index.html');
  const notFoundDest = join(DIST, '404.html');
  if (existsSync(notFoundSrc)) {
    copyFileSync(notFoundSrc, notFoundDest);
    console.log('  ✓ Copied 404/index.html → 404.html');
  }
}

prerender().catch(err => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
