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
  '/blog': {
    title: 'Blog | Software Development, AI & Digital Transformation Insights | Khoshà Systems',
    description: 'Insights on software development, AI, retail tech & digital transformation from Khoshà Systems, Bangalore.',
    keywords: 'software development blog India, AI transformation insights, retail technology blog, real estate CRM guide India, digital transformation articles, SaaS development blog Bangalore, enterprise software insights'
  }
};

export const SEOHead: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const config = seoConfig[path] || seoConfig['/'];
    const canonicalUrl = `${BASE_URL}${path === '/' ? '' : path}`;
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

    // Update canonical — create if missing
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = canonicalUrl;
    } else {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = canonicalUrl;
      document.head.appendChild(canonical);
    }
  }, [location.pathname]);

  return null;
};
