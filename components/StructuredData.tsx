import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

const BASE_URL = 'https://khoshasystems.com';
const SCRIPT_ID = 'dynamic-structured-data';

const organizationSchema = {
  '@type': 'Organization',
  name: 'Khoshà Systems',
  alternateName: 'Khosha Systems',
  url: BASE_URL,
  logo: `${BASE_URL}/og-icon.png`,
  founder: { '@type': 'Person', name: 'Ankit Mehta', jobTitle: 'Founder & Chief Architect' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Indiranagar',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    postalCode: '560038',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@khoshasystems.com',
    contactType: 'sales',
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: ['https://www.linkedin.com/company/khoshasystems'],
};

// Breadcrumb definitions per route
const breadcrumbMap: Record<string, Array<{ name: string; path: string }>> = {
  '/': [{ name: 'Home', path: '' }],
  '/products': [
    { name: 'Home', path: '' },
    { name: 'Products', path: '/products' },
  ],
  '/products/retaileros': [
    { name: 'Home', path: '' },
    { name: 'Products', path: '/products' },
    { name: 'RetailerOS', path: '/products/retaileros' },
  ],
  '/products/real-estate-crm': [
    { name: 'Home', path: '' },
    { name: 'Products', path: '/products' },
    { name: 'Real Estate CRM', path: '/products/real-estate-crm' },
  ],
  '/products/visitor-management': [
    { name: 'Home', path: '' },
    { name: 'Products', path: '/products' },
    { name: 'Visitor Management', path: '/products/visitor-management' },
  ],
  '/services': [
    { name: 'Home', path: '' },
    { name: 'Services', path: '/services' },
  ],
  '/work': [
    { name: 'Home', path: '' },
    { name: 'Work', path: '/work' },
  ],
  '/philosophy': [
    { name: 'Home', path: '' },
    { name: 'About', path: '/philosophy' },
  ],
  '/contact': [
    { name: 'Home', path: '' },
    { name: 'Contact', path: '/contact' },
  ],
  '/blog': [
    { name: 'Home', path: '' },
    { name: 'Blog', path: '/blog' },
  ],
  '/vancouver': [
    { name: 'Home', path: '' },
    { name: 'Vancouver', path: '/vancouver' },
  ],
  '/solutions/fashion-retail': [
    { name: 'Home', path: '' },
    { name: 'Products', path: '/products' },
    { name: 'RetailerOS', path: '/products/retaileros' },
    { name: 'Fashion & Apparel Retail', path: '/solutions/fashion-retail' },
  ],
  '/solutions/grocery': [
    { name: 'Home', path: '' },
    { name: 'Products', path: '/products' },
    { name: 'RetailerOS', path: '/products/retaileros' },
    { name: 'Grocery & Supermarket', path: '/solutions/grocery' },
  ],
  '/solutions/electronics': [
    { name: 'Home', path: '' },
    { name: 'Products', path: '/products' },
    { name: 'RetailerOS', path: '/products/retaileros' },
    { name: 'Electronics & Mobile', path: '/solutions/electronics' },
  ],
  '/compare/retaileros-vs-iqmetrix': [
    { name: 'Home', path: '' },
    { name: 'Products', path: '/products' },
    { name: 'RetailerOS', path: '/products/retaileros' },
    { name: 'RetailerOS vs iQmetrix', path: '/compare/retaileros-vs-iqmetrix' },
  ],
  '/compare/real-estate-crm-vs-selldo': [
    { name: 'Home', path: '' },
    { name: 'Products', path: '/products' },
    { name: 'Real Estate CRM', path: '/products/real-estate-crm' },
    { name: 'CRM vs Sell.Do', path: '/compare/real-estate-crm-vs-selldo' },
  ],
  '/compare/vms-vs-envoy': [
    { name: 'Home', path: '' },
    { name: 'Products', path: '/products' },
    { name: 'Visitor Management', path: '/products/visitor-management' },
    { name: 'VMS vs Envoy', path: '/compare/vms-vs-envoy' },
  ],
  '/compare/retaileros-vs-shopify': [
    { name: 'Home', path: '' },
    { name: 'Products', path: '/products' },
    { name: 'RetailerOS', path: '/products/retaileros' },
    { name: 'RetailerOS vs Shopify POS', path: '/compare/retaileros-vs-shopify' },
  ],
  '/compare/retaileros-vs-lightspeed': [
    { name: 'Home', path: '' },
    { name: 'Products', path: '/products' },
    { name: 'RetailerOS', path: '/products/retaileros' },
    { name: 'RetailerOS vs Lightspeed', path: '/compare/retaileros-vs-lightspeed' },
  ],
  '/compare/retaileros-vs-square': [
    { name: 'Home', path: '' },
    { name: 'Products', path: '/products' },
    { name: 'RetailerOS', path: '/products/retaileros' },
    { name: 'RetailerOS vs Square', path: '/compare/retaileros-vs-square' },
  ],
};

// FAQ data for product pages
export const retailerOSFAQs = [
  {
    question: 'What types of retailers is RetailerOS built for?',
    answer: 'RetailerOS is built specifically for mobile phone shops, multi-brand electronics stores, telecom distributors, and consumer electronics retailers in India. It handles IMEI-based inventory, brand scheme tracking, and GST billing workflows unique to this segment.',
  },
  {
    question: 'Does RetailerOS support IMEI and serial number tracking?',
    answer: 'Yes. IMEI and serial number capture is integrated directly into the billing flow — through barcode scan, manual entry, or camera capture. Every device is tracked individually from purchase to sale, with full audit trail.',
  },
  {
    question: 'How does the brand scheme management work?',
    answer: 'RetailerOS automatically tracks active brand schemes from Samsung, Vivo, Oppo, Xiaomi, and other brands. It auto-applies eligible schemes at billing, maintains a running tally of pending claims and approved payouts, and alerts you to expiring schemes.',
  },
  {
    question: 'Can RetailerOS handle multiple store locations?',
    answer: 'Yes. RetailerOS supports multi-store operations with serial-level inventory tracking across locations, inter-store transfer management, centralized analytics, and role-based access for store managers and staff.',
  },
  {
    question: 'Is RetailerOS GST-compliant?',
    answer: 'Fully GST-compliant with HSN code support, proper tax invoicing, reverse charge handling, and return/credit note workflows. Built for Indian tax requirements from the ground up.',
  },
];

export const realEstateCRMFAQs = [
  {
    question: 'Does the CRM integrate with 99acres, MagicBricks, and Housing.com?',
    answer: 'Yes. Our Real Estate CRM automatically captures leads from 99acres, MagicBricks, Housing.com, Facebook Ads, Google Ads, website forms, walk-ins, and referrals — all into one unified dashboard with deduplication.',
  },
  {
    question: 'Is the CRM RERA-compliant?',
    answer: 'Yes. The CRM includes RERA-compliant documentation, audit trails, visitor logs, and secure document storage. All data is maintained with proper timestamps and access controls for regulatory compliance.',
  },
  {
    question: 'Can brokers and channel partners access the system?',
    answer: 'Yes. The CRM includes a dedicated Channel Partner Portal where brokers get their own dashboard with deal tracking, commission visibility, real-time inventory access, and lead attribution.',
  },
  {
    question: 'How does the automated follow-up system work?',
    answer: 'The CRM triggers automated SMS, WhatsApp, and email follow-up sequences based on lead behavior and pipeline stage. You set the rules — the system ensures no lead falls through the cracks, achieving 85% follow-up rates.',
  },
  {
    question: 'Can I manage multiple real estate projects in one CRM?',
    answer: 'Yes. The CRM supports multi-project portfolio management with separate pipelines, inventory, and analytics per project, while giving you a consolidated view across your entire portfolio.',
  },
];

export const retailerOSvsIQmetrixFAQs = [
  {
    question: 'Is RetailerOS a good alternative to iQmetrix for Indian retailers?',
    answer: 'Yes. While iQmetrix is built for the North American market (US & Canada carriers like AT&T, Verizon, T-Mobile), RetailerOS is purpose-built for Indian telecom and electronics retail with native GST billing, IMEI tracking, brand scheme management, and WhatsApp notifications.',
  },
  {
    question: 'How does RetailerOS pricing compare to iQmetrix?',
    answer: 'iQmetrix uses opaque enterprise pricing that requires a sales demo — typically expensive with long-term contracts. RetailerOS offers transparent, affordable SaaS pricing designed for Indian retailers, from single-store owners to multi-city chains.',
  },
  {
    question: 'Can RetailerOS handle brand scheme tracking like Samsung, Vivo, and Oppo offers?',
    answer: 'Yes. RetailerOS has a native scheme and offer engine that automatically tracks active brand schemes, applies eligible offers at billing, tracks pending claims, and alerts you to expiring schemes. This is not available in iQmetrix.',
  },
  {
    question: 'Does RetailerOS support GST-compliant billing?',
    answer: 'Yes. RetailerOS is fully GST-compliant with HSN code support, proper tax invoicing, reverse charge handling, and return/credit note workflows — built specifically for Indian tax requirements.',
  },
  {
    question: 'How long does it take to set up RetailerOS vs iQmetrix?',
    answer: 'RetailerOS is cloud-native and can be set up in days. iQmetrix typically requires professional services, enterprise onboarding, and deployment across their six separate modules, which can take weeks to months.',
  },
];

export const crmVsSellDoFAQs = [
  {
    question: 'Is Khosha CRM a good alternative to Sell.Do for real estate?',
    answer: 'Yes. While Sell.Do offers 50+ feature modules, many developers find it overly complex. Khosha CRM focuses on the features that drive revenue — lead management, site visit tracking, automated follow-ups, and channel partner management — at a lower price point.',
  },
  {
    question: 'How does Khosha CRM pricing compare to Sell.Do?',
    answer: 'Sell.Do charges Rs.3,499/user/month, which scales to Rs.4.2 lakh/year for just 10 users. Khosha CRM offers flat-rate pricing that does not penalize you for growing your team, making it significantly more affordable for most developers.',
  },
  {
    question: 'Does Khosha CRM integrate with 99acres, MagicBricks, and Housing.com?',
    answer: 'Yes. Khosha CRM deeply integrates with all major Indian property portals including 99acres, MagicBricks, Housing.com, as well as Facebook Ads, Google Ads, and website forms — with automatic lead deduplication.',
  },
  {
    question: 'Will Khosha CRM work in Tier-2 and Tier-3 cities with slow internet?',
    answer: 'Yes. Unlike Sell.Do which users report has performance issues on slower connections, Khosha CRM is built with a lightweight UI that works smoothly even in areas with variable internet connectivity — important for construction sites and smaller cities.',
  },
  {
    question: 'Can I migrate my data from Sell.Do to Khosha CRM?',
    answer: 'Yes. We provide assisted migration from Sell.Do including leads, contacts, pipeline data, and historical records. Our onboarding team handles the migration to ensure zero data loss and minimal disruption.',
  },
];

export const vmsVsEnvoyFAQs = [
  {
    question: 'Is Khosha VMS a good alternative to Envoy for Indian offices?',
    answer: 'Yes. Envoy is designed for US corporate offices with iPad-centric check-in and Slack/Teams notifications. Khosha VMS is built for Indian workplaces with WhatsApp notifications, RERA compliance, Aadhaar verification, Android tablet support, and INR pricing.',
  },
  {
    question: 'How much does Khosha VMS cost compared to Envoy?',
    answer: 'Envoy Premium costs $4,345/location/year (approximately Rs.3.6 lakh per location). For 5 locations, that is Rs.18+ lakh/year. Khosha VMS offers the same core capabilities at a fraction of the cost, billed in Indian Rupees.',
  },
  {
    question: 'Does Khosha VMS work on Android tablets?',
    answer: 'Yes. Unlike Envoy which is iPad-centric, Khosha VMS works on affordable Android tablets — significantly reducing hardware costs for Indian businesses setting up visitor check-in kiosks.',
  },
  {
    question: 'Can Khosha VMS send WhatsApp notifications to hosts?',
    answer: 'Yes. The moment a visitor checks in, their host receives instant WhatsApp and SMS notifications with visitor details. WhatsApp is the primary notification channel, reflecting how Indian businesses actually communicate.',
  },
  {
    question: 'Does Khosha VMS support RERA compliance?',
    answer: 'Yes. Khosha VMS maintains RERA-compliant visitor logs with photo capture, Indian ID verification (Aadhaar, PAN, Driving License), and timestamped records. All data is exportable and audit-ready.',
  },
  {
    question: 'Can Khosha VMS work at construction sites with poor internet?',
    answer: 'Yes. Khosha VMS is designed to work in low-connectivity environments typical of construction sites and locations in Tier-2/3 cities, unlike Envoy which is fully cloud-dependent and requires stable internet.',
  },
];

export const retailerOSvsShopifyFAQs = [
  {
    question: 'Does Shopify POS support IMEI or serial number tracking?',
    answer: 'No. Shopify POS has no native serial number or IMEI tracking. Merchants must use manual spreadsheets, order notes, or paid third-party apps like SKUSavvy. RetailerOS has native IMEI capture via barcode, camera, or manual entry with a full audit trail from purchase to sale.',
  },
  {
    question: 'How does RetailerOS pricing compare to Shopify POS?',
    answer: 'Shopify POS Lite is included with Shopify plans (starting at $39/month), but advanced features like staff permissions, smart inventory, and detailed analytics require POS Pro at $89/month per location. RetailerOS includes all features in one transparent price — no tiered upselling.',
  },
  {
    question: 'Can Shopify POS handle brand scheme management?',
    answer: 'No. Shopify POS has no concept of brand schemes, cashbacks, or exchange offers. RetailerOS has a built-in engine that tracks active schemes from Samsung, Vivo, Oppo, Xiaomi, and other brands — auto-applying eligible offers at billing and tracking pending claims.',
  },
  {
    question: 'Is Shopify POS suitable for Indian telecom retailers?',
    answer: 'Shopify POS is designed for general retail and e-commerce, primarily in North American and European markets. It lacks GST-compliant billing, IMEI tracking, brand scheme management, and WhatsApp notifications — all of which are native to RetailerOS.',
  },
  {
    question: 'Can RetailerOS match Shopify for e-commerce?',
    answer: 'RetailerOS is focused on in-store telecom retail operations — IMEI tracking, billing, scheme management, and multi-store inventory. If your primary need is online selling with a POS add-on, Shopify excels there. If your primary need is in-store telecom retail, RetailerOS is the better choice.',
  },
];

export const retailerOSvsLightspeedFAQs = [
  {
    question: 'Does Lightspeed force you to use their payment processor?',
    answer: 'Yes. Lightspeed requires merchants to use Lightspeed Payments or face significantly higher subscription costs — reportedly 2-3x the standard rate. RetailerOS works with any payment processor you choose, with no lock-in or price penalties.',
  },
  {
    question: 'How does RetailerOS pricing compare to Lightspeed?',
    answer: 'Lightspeed starts at $89/month for Basic, $149/month for Core (with analytics), and $289/month for Plus (with loyalty). These are typically annual contracts. RetailerOS offers all features at one transparent price with quarterly+ billing and no long-term contracts.',
  },
  {
    question: 'Does Lightspeed support telecom-specific features?',
    answer: 'Lightspeed markets a "cellphone store POS" page, but it is the same generic retail platform without telecom-specific workflows. It lacks native scheme management, carrier activation support, and purpose-built IMEI workflows. RetailerOS is built specifically for telecom retail.',
  },
  {
    question: 'Can I cancel Lightspeed without penalties?',
    answer: 'Lightspeed typically requires 1-3 year contracts that are expensive to cancel. Users report difficulty breaking free from these commitments. RetailerOS offers flexible quarterly+ billing with no long-term lock-in.',
  },
  {
    question: 'Does Lightspeed work for Indian retail?',
    answer: 'Lightspeed is designed for US and Canadian markets with tax systems built for those regions. It does not support GST-compliant billing, HSN codes, or Indian carrier integrations. RetailerOS is purpose-built for Indian telecom and electronics retail.',
  },
];

export const retailerOSvsSquareFAQs = [
  {
    question: 'Does Square for Retail support IMEI or serial number tracking?',
    answer: 'No. Square for Retail has no serial number tracking and does not even have a dedicated barcode field — merchants must enter barcodes in the SKU field as a workaround. RetailerOS has native IMEI tracking with barcode scan, camera capture, and manual entry.',
  },
  {
    question: 'Is Square for Retail really free?',
    answer: 'Square offers a free tier, but it includes basic features only. Advanced retail reports require Plus ($49/month per location), and cross-location features require Premium ($149/month per location). Plus, all transactions incur a 2.6% + $0.10 processing fee that adds up fast for high-volume electronics stores.',
  },
  {
    question: 'Does Square freeze merchant funds?',
    answer: 'Square is known for freezing and holding merchant funds without warning, particularly for newer accounts or high-value transactions. RetailerOS does not process payments directly — you use your preferred payment processor and maintain full control of your funds.',
  },
  {
    question: 'Can Square handle GST billing for Indian businesses?',
    answer: 'No. Square is built for the US market with US tax systems. It does not support GST invoicing, HSN codes, reverse charge, or Indian tax compliance. RetailerOS is fully GST-compliant and built for Indian tax requirements from the ground up.',
  },
  {
    question: 'Is Square good enough for a mobile phone shop?',
    answer: 'Square works well for simple retail — coffee shops, clothing stores, general merchandise. But mobile phone shops need IMEI tracking, serial inventory, brand scheme management, and GST billing — features Square was never designed to provide. RetailerOS is purpose-built for this use case.',
  },
];

export const fashionRetailFAQs = [
  {
    question: 'Can RetailerOS handle size-color-style inventory for fashion stores?',
    answer: 'Yes. RetailerOS supports a full size-color-style matrix so you can track inventory at the variant level — for example, "Blue Polo T-shirt, Size L" — across all your stores. No more creating separate SKUs for each variant.',
  },
  {
    question: 'Does RetailerOS help with seasonal and festive demand planning?',
    answer: 'Yes. RetailerOS uses historical sell-through data to help you plan seasonal buys — Diwali, wedding season, summer collections, and end-of-season sales. AI-driven alerts flag slow movers early so you can markdown before stock piles up.',
  },
  {
    question: 'Can I manage multiple fashion store locations?',
    answer: 'Yes. RetailerOS supports multi-store operations with real-time inventory sync, inter-store stock transfers, centralized analytics, and role-based access for store managers and staff.',
  },
  {
    question: 'Is RetailerOS suitable for boutique stores or only large chains?',
    answer: 'RetailerOS works for both. Whether you run a single boutique or a multi-city apparel chain, the platform scales with your business. Start small and add stores as you grow — no infrastructure changes needed.',
  },
  {
    question: 'Does RetailerOS support exchange and return management for apparel?',
    answer: 'Yes. Handle size exchanges, style swaps, and returns with automated inventory adjustments. The system updates stock counts in real time across all locations so your inventory stays accurate.',
  },
];

export const groceryRetailFAQs = [
  {
    question: 'Does RetailerOS track expiry dates and batch numbers for grocery items?',
    answer: 'Yes. RetailerOS tracks expiry dates and batch numbers at the item level. You get automatic alerts before products expire, enabling timely markdowns or clearance — reducing wastage and FSSAI compliance risk.',
  },
  {
    question: 'Can RetailerOS handle weight-based pricing for fruits, vegetables, and pulses?',
    answer: 'Yes. RetailerOS supports weight-based, piece-based, and pack-based pricing. It integrates with electronic weighing scales for accurate per-gram billing of loose items like fruits, vegetables, pulses, and dry goods.',
  },
  {
    question: 'Is RetailerOS fast enough for high-volume grocery checkout?',
    answer: 'Yes. RetailerOS is optimized for grocery-speed checkout with rapid barcode scanning, quick-bill modes, and support for multiple billing counters. Even during peak hours, your checkout lines keep moving.',
  },
  {
    question: 'Can RetailerOS manage supplier orders and purchase workflows?',
    answer: 'Yes. RetailerOS generates automated purchase orders based on sell-through velocity, minimum stock levels, and supplier lead times. Track PO status, manage multiple suppliers per category, and ensure fast-moving staples never run out.',
  },
  {
    question: 'Does RetailerOS work for kirana stores or only supermarkets?',
    answer: 'RetailerOS works for both. From small kirana stores to large multi-location supermarkets, the platform scales with your needs. Start with basic billing and inventory, and enable advanced features like batch tracking and analytics as your business grows.',
  },
];

export const electronicsRetailFAQs = [
  {
    question: 'How does IMEI tracking work in RetailerOS?',
    answer: 'IMEI and serial number capture is integrated directly into the billing flow — via barcode scan, camera capture, or manual entry. Every device is tracked individually from purchase to sale with a full audit trail, eliminating spreadsheet-based tracking.',
  },
  {
    question: 'Can RetailerOS manage brand schemes from Samsung, Vivo, Oppo, and Xiaomi?',
    answer: 'Yes. RetailerOS has a native scheme and offer engine that tracks active brand schemes, auto-applies eligible cashbacks and exchange offers at billing, maintains a running tally of pending claims and approved payouts, and alerts you to expiring schemes.',
  },
  {
    question: 'Does RetailerOS handle warranty registration?',
    answer: 'Yes. Warranties are registered at the point of sale. RetailerOS tracks warranty periods, manages claims, and lets customers check warranty status via WhatsApp — no more paper warranty cards or filing cabinets.',
  },
  {
    question: 'Can RetailerOS handle device trade-ins and exchanges?',
    answer: 'Yes. RetailerOS supports device trade-ins with condition grading, fair-value estimation, and instant credit toward new purchases. Refurbished and second-hand inventory is tracked separately from new stock.',
  },
  {
    question: 'Is RetailerOS suitable for single mobile shops or only large chains?',
    answer: 'RetailerOS works for both. Whether you run a single mobile phone shop or a multi-city electronics chain, the platform scales with you. Cloud-native architecture means no infrastructure headaches as you grow.',
  },
];

export const vmsFAQs = [
  {
    question: 'How does the digital check-in work?',
    answer: 'Visitors check in via QR code scan or tablet-based registration. The process takes seconds — capturing visitor details, photo, and ID — replacing paper registers with a professional digital experience.',
  },
  {
    question: 'Does the system send notifications to hosts?',
    answer: 'Yes. The moment a visitor checks in, their host receives instant SMS and WhatsApp notifications with visitor details. No more reception desk phone calls or manual paging.',
  },
  {
    question: 'Is the Visitor Management System RERA-compliant?',
    answer: 'Yes. The system maintains RERA-compliant visitor logs with photo capture, ID verification, and timestamped records. All data is exportable and audit-ready at all times.',
  },
  {
    question: 'Can I use it across multiple locations?',
    answer: 'Yes. The VMS includes a multi-location dashboard where you can manage visitor check-ins, view analytics, and generate reports across all your offices, sites, or co-working spaces from one place.',
  },
  {
    question: 'What industries can use this visitor management system?',
    answer: 'The VMS works for real estate construction sites, corporate offices, co-working spaces, manufacturing facilities, and warehouses. Each industry gets customized check-in workflows and compliance features.',
  },
];

function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}

function buildFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

function buildProductSchema(product: {
  name: string;
  description: string;
  url: string;
  features: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: product.url,
    description: product.description,
    ...(product.image && { image: `${BASE_URL}${product.image}` }),
    offers: { '@type': 'Offer', category: 'SaaS' },
    author: { '@type': 'Organization', name: 'Khoshà Systems' },
    featureList: product.features,
  };
}

function buildArticleSchema(post: {
  title: string;
  description: string;
  date: string;
  slug: string;
  coverImage: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: `${BASE_URL}${post.coverImage}`,
    datePublished: post.date,
    dateModified: post.date,
    url: `${BASE_URL}/blog/${post.slug}`,
    author: {
      '@type': 'Organization',
      name: 'Khoshà Systems',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Khoshà Systems',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/og-icon.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
    },
  };
}

function getSchemasForPath(pathname: string): object[] {
  const schemas: object[] = [];

  // Breadcrumbs for all pages
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '');
    const post = blogPosts.find((p) => p.slug === slug);
    schemas.push(
      buildBreadcrumbSchema([
        { name: 'Home', path: '' },
        { name: 'Blog', path: '/blog' },
        { name: post?.title || 'Article', path: pathname },
      ])
    );
  } else if (breadcrumbMap[pathname]) {
    schemas.push(buildBreadcrumbSchema(breadcrumbMap[pathname]));
  }

  // Page-specific schemas
  switch (pathname) {
    case '/':
      schemas.push({ '@context': 'https://schema.org', ...organizationSchema });
      break;

    case '/products/retaileros':
      schemas.push(
        buildProductSchema({
          name: 'RetailerOS',
          description:
            'A retail management platform built for telecom retailers, mobile phone shops, and consumer electronics stores. IMEI tracking, scheme management, brand analytics, GST billing, and multi-store inventory — unified in one cloud-native system.',
          url: 'https://retaileros.in',
          features:
            'IMEI Tracking, Scheme Management, Brand Analytics, Real-Time Inventory, GST Billing, Multi-Store Sync, Cloud-Native, Barcode Scanning, Staff Performance Tracking',
          image: '/images/product-retaileros.png',
        })
      );
      schemas.push(buildFAQSchema(retailerOSFAQs));
      break;

    case '/products/real-estate-crm':
      schemas.push(
        buildProductSchema({
          name: 'Real Estate CRM by Khoshà Systems',
          description:
            'Purpose-built CRM for Indian real estate developers and brokers. Manage leads from 99acres, MagicBricks, Housing.com. Track site visits, automate follow-ups, and close deals faster.',
          url: `${BASE_URL}/products/real-estate-crm`,
          features:
            'Lead Management, Channel Partner Portal, Document Vault, Sales Pipeline, Site Visit Tracking, Automated Follow-Ups, RERA Compliance, Multi-Project Management',
          image: '/images/product-crm.png',
        })
      );
      schemas.push(buildFAQSchema(realEstateCRMFAQs));
      break;

    case '/products/visitor-management':
      schemas.push(
        buildProductSchema({
          name: 'Visitor Management System by Khoshà Systems',
          description:
            'Modern visitor management for real estate sites, corporate offices, and co-working spaces. Digital check-ins, WhatsApp notifications, visitor analytics, and RERA-compliant visitor logs.',
          url: `${BASE_URL}/products/visitor-management`,
          features:
            'Digital Check-In, Instant Alerts, Visitor Analytics, Compliance Ready, QR Code Check-In, Multi-Location Dashboard, Badge Printing, Pre-Registration',
          image: '/images/product-vms.png',
        })
      );
      schemas.push(buildFAQSchema(vmsFAQs));
      break;

    case '/solutions/fashion-retail':
      schemas.push(buildFAQSchema(fashionRetailFAQs));
      break;

    case '/solutions/grocery':
      schemas.push(buildFAQSchema(groceryRetailFAQs));
      break;

    case '/solutions/electronics':
      schemas.push(buildFAQSchema(electronicsRetailFAQs));
      break;

    case '/compare/retaileros-vs-iqmetrix':
      schemas.push(buildFAQSchema(retailerOSvsIQmetrixFAQs));
      break;

    case '/compare/real-estate-crm-vs-selldo':
      schemas.push(buildFAQSchema(crmVsSellDoFAQs));
      break;

    case '/compare/vms-vs-envoy':
      schemas.push(buildFAQSchema(vmsVsEnvoyFAQs));
      break;

    case '/compare/retaileros-vs-shopify':
      schemas.push(buildFAQSchema(retailerOSvsShopifyFAQs));
      break;

    case '/compare/retaileros-vs-lightspeed':
      schemas.push(buildFAQSchema(retailerOSvsLightspeedFAQs));
      break;

    case '/compare/retaileros-vs-square':
      schemas.push(buildFAQSchema(retailerOSvsSquareFAQs));
      break;
  }

  // Blog post Article schema
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '');
    const post = blogPosts.find((p) => p.slug === slug);
    if (post) {
      schemas.push(buildArticleSchema(post));
    }
  }

  return schemas;
}

export const StructuredData: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Remove previous dynamic scripts
    document.querySelectorAll(`script[data-sd="dynamic"]`).forEach((el) => el.remove());

    const schemas = getSchemasForPath(location.pathname);

    schemas.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-sd', 'dynamic');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll(`script[data-sd="dynamic"]`).forEach((el) => el.remove());
    };
  }, [location.pathname]);

  return null;
};
