import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
}

const BASE_URL = 'https://khoshasystems.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-icon.png`;

const seoConfig: Record<string, SEOConfig> = {
  '/': {
    title: 'Khoshà Systems | Software Development & AI Transformation Company | Bangalore',
    description: 'Khoshà Systems builds web apps, SaaS products & AI solutions from Bangalore. RetailerOS, Real Estate CRM, Visitor Management. 15+ years experience.',
    keywords: 'software development company Bangalore, web application development company Bangalore, SaaS product development company India, AI transformation services Bangalore, custom software development Bangalore, digital transformation company Bangalore, RetailerOS, real estate CRM India, visitor management system India, legacy modernization services India, software company Bengaluru, IT company Kumara Park Bangalore'
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
    keywords: 'about Khoshà Systems, Khosha Systems Bangalore, Ankit Mehta founder, software company Kumara Park Bangalore, technology consulting India, architect-led software company, best software company Bangalore for startups, tech company Kumara Park, software company Bengaluru'
  },
  '/contact': {
    title: 'Contact Khoshà Systems | Software Company in Kumara Park, Bangalore',
    description: 'Get in touch for web apps, SaaS, AI or digital transformation. Kumara Park West, Bangalore. Email: ankit@khoshasystems.com',
    keywords: 'contact software company Bangalore, hire web developers Bangalore, software development quote India, digital transformation consultation Bangalore, Kumara Park tech company contact, software outsourcing company Bangalore, startup tech partner Bangalore'
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
    title: 'Customer Success Stories | RetailerOS Results for Indian Retailers | Khoshà Systems',
    description: 'See how retailers across India benefit from RetailerOS — from recovering lakhs in missed scheme payouts to eliminating inventory shrinkage. Representative scenarios from telecom, electronics, fashion, and grocery retail.',
    keywords: 'RetailerOS success stories, retail software case studies India, telecom retail results, electronics store software ROI, fashion retail POS results, grocery store software India, RetailerOS customer stories, retail management software benefits'
  },
  '/help': {
    title: 'RetailerOS Knowledge Base & Help Center | Getting Started Guide | Khoshà Systems',
    description: 'RetailerOS help center — getting started guide, FAQ, feature guides for POS, inventory, scheme management, analytics, and multi-store operations. Go live in 48 hours.',
    keywords: 'RetailerOS help center, RetailerOS getting started, RetailerOS FAQ, retail software guide India, RetailerOS onboarding, RetailerOS knowledge base, POS software help, inventory management guide, scheme management help'
  },
  '/pricing': {
    title: 'RetailerOS Pricing — Telecom Retail Management Software | Khoshà Systems',
    description: 'RetailerOS pricing starts at ₹1,999/store/month. IMEI tracking, GST billing, scheme management, and multi-store analytics. 14-day free trial, no credit card required.',
    keywords: 'RetailerOS pricing, telecom retail software pricing India, mobile shop billing software cost, IMEI tracking software pricing, retail management software India pricing, GST billing software mobile shops'
  },
  '/use-cases': {
    title: 'RetailerOS Use Cases — Real Results from Indian Retailers | Khoshà Systems',
    description: 'See how Indian retailers use RetailerOS for IMEI tracking, scheme recovery, and multi-store management. Real use cases from electronics, telecom, and fashion retail.',
    keywords: 'RetailerOS use cases, retail software use cases India, telecom retail case study, electronics store software results, IMEI tracking use case, scheme management results, multi-store retail India'
  },
  '/features': {
    title: 'RetailerOS Features — IMEI Tracking, GST Billing, Scheme Management | Khoshà Systems',
    description: 'Detailed feature walkthroughs for RetailerOS: IMEI tracking, GST-compliant billing, multi-store dashboard, AI analytics, and brand scheme management for Indian retailers.',
    keywords: 'RetailerOS features, IMEI tracking software features, GST billing software India, multi-store dashboard retail, brand scheme management software, retail analytics India, RetailerOS feature list'
  },
  '/getting-started': {
    title: 'Getting Started with RetailerOS — Onboarding Guide | Khoshà Systems',
    description: 'Step-by-step onboarding guide for RetailerOS. Go live in under 48 hours. Account setup, data import, billing configuration, inventory, team setup, and brand schemes.',
    keywords: 'RetailerOS onboarding, RetailerOS setup guide, getting started RetailerOS, retail software onboarding India, RetailerOS data migration, RetailerOS training'
  }
};

// Match dynamic routes that aren't exact keys in seoConfig
function resolveConfig(path: string): SEOConfig | null {
  // Exact match
  if (seoConfig[path]) return seoConfig[path];
  // Blog post pages get their meta from BlogPostPage component directly
  if (path.startsWith('/blog/')) return null;
  // Fallback to home
  return seoConfig['/'];
}

export const SEOHead: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const config = resolveConfig(path);
    const canonicalUrl = `${BASE_URL}${path === '/' ? '' : path}`;

    // Always update canonical URL regardless of config match
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = canonicalUrl;
    } else {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = canonicalUrl;
      document.head.appendChild(canonical);
    }

    // Skip meta updates for blog posts — BlogPostPage handles its own meta
    if (!config) return;

    const ogImage = config.ogImage || DEFAULT_OG_IMAGE;

    document.title = config.title;

    const updateMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (meta) {
        meta.content = content;
      } else {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    updateMeta('description', config.description);
    updateMeta('keywords', config.keywords);
    updateMeta('og:title', config.title, true);
    updateMeta('og:description', config.description, true);
    updateMeta('og:url', canonicalUrl, true);
    updateMeta('og:image', ogImage, true);
    updateMeta('twitter:title', config.title);
    updateMeta('twitter:description', config.description);
    updateMeta('twitter:image', ogImage);
  }, [location.pathname]);

  return null;
};
