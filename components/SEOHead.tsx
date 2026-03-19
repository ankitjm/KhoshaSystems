import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
}

const seoConfig: Record<string, SEOConfig> = {
  '/': {
    title: 'Khoshà Systems | Software Development & AI Transformation Company | Bangalore',
    description: 'Khoshà Systems builds web applications, SaaS products, and AI-powered solutions from Bangalore (Bengaluru). RetailerOS, Real Estate CRM, Visitor Management & custom software development. 15+ years experience.',
    keywords: 'software development company Bangalore, web application development company Bangalore, SaaS product development company India, AI transformation services Bangalore, custom software development Bangalore, digital transformation company Bangalore, RetailerOS, real estate CRM India, visitor management system India, legacy modernization services India, software company Bengaluru, IT company Indiranagar Bangalore'
  },
  '/products': {
    title: 'SaaS Products | RetailerOS, Real Estate CRM & Visitor Management | Khoshà Systems',
    description: 'Production-ready SaaS products built in Bangalore. RetailerOS for telecom and electronics retail management, Real Estate CRM for Indian developers and brokers, and Visitor Management System for offices and construction sites.',
    keywords: 'RetailerOS telecom retail management software India, mobile phone shop billing software, IMEI tracking software, consumer electronics retail software, scheme management software retail, real estate CRM software India, CRM for real estate developers India, visitor management system India, digital visitor management software, inventory management software retailers India, brand scheme tracking software retailers'
  },
  '/products/retaileros': {
    title: 'RetailerOS | Telecom & Electronics Retail Management Software India | Khoshà Systems',
    description: 'RetailerOS is a retail management platform built for mobile phone retailers, consumer electronics stores, and telecom distributors. IMEI tracking, scheme management, brand analytics, GST billing. Visit retaileros.in',
    keywords: 'RetailerOS, telecom retail management software India, mobile phone shop billing software, IMEI tracking software retailers, consumer electronics retail software, scheme management software retail, telecom distributor software India, mobile retail POS India, electronics store inventory management, brand scheme tracking software, cashback management software retailers, GST-compliant retail billing software, multi-store retail management software, retail SaaS platform India, retaileros.in'
  },
  '/products/real-estate-crm': {
    title: 'Real Estate CRM India | Lead Management for Developers & Brokers | Khoshà Systems',
    description: 'Purpose-built CRM for Indian real estate. Capture leads from 99acres, MagicBricks, Housing.com. Track site visits, automate follow-ups, manage channel partners. RERA-compliant. 2x lead conversion.',
    keywords: 'real estate CRM software India, CRM for real estate developers India, real estate lead management software, property CRM India, CRM for builders and developers, real estate broker CRM India, 99acres lead management CRM, MagicBricks CRM integration, RERA-compliant CRM software, real estate channel partner management, site visit tracking software real estate, real estate follow-up automation India, real estate sales CRM Bangalore'
  },
  '/products/visitor-management': {
    title: 'Visitor Management System India | Digital Check-In & Analytics | Khoshà Systems',
    description: 'Modern visitor management for real estate sites, offices, and co-working spaces. QR code check-in, WhatsApp notifications, visitor analytics, and RERA-compliant logs. 90% faster check-in.',
    keywords: 'visitor management system India, digital visitor management software, visitor check-in system offices, visitor management system real estate, contactless visitor management, QR code visitor check-in system, visitor tracking software India, office visitor management system, co-working space visitor management, RERA-compliant visitor log system, WhatsApp visitor notification system, visitor analytics software'
  },
  '/services': {
    title: 'Web Development, AI Integration & Digital Transformation Services | Khoshà Systems Bangalore',
    description: 'Custom web applications, AI transformation, mobile apps, website design, system architecture, and legacy modernization. Full-stack software services from Bangalore (Bengaluru), India for startups and enterprises.',
    keywords: 'web application development company Bangalore, custom web app development Bangalore, React development company Bangalore, AI integration company Bangalore, AI agent development services, mobile app development company Bangalore, website design company Bangalore, landing page design services India, system architecture consulting Bangalore, digital transformation consulting Bangalore, legacy system modernization India, cloud migration services Bangalore, SaaS platform development company India, enterprise web application development India'
  },
  '/work': {
    title: 'Our Work | Software Projects & Case Studies | Khoshà Systems Bangalore',
    description: 'Explore our portfolio of web applications, SaaS products, AI integrations, and digital transformation projects delivered for Prestige Constructions, Arrowhead Communications, Unhive Ventures, and more.',
    keywords: 'software development case studies Bangalore, digital transformation success stories India, enterprise software portfolio, web application projects, AI integration case studies, custom software development portfolio, Prestige Constructions technology partner'
  },
  '/philosophy': {
    title: 'About Khoshà Systems | Architect-Led Software Company | 15+ Years | Bangalore',
    description: 'Founded by Ankit Mehta in Indiranagar, Bangalore (Bengaluru). 15+ years building enterprise software across continents from Canada to India. Architect-led, quality-first, long-term partnerships.',
    keywords: 'about Khoshà Systems, Khosha Systems Bangalore, Ankit Mehta founder, software company Indiranagar Bangalore, technology consulting India, architect-led software company, best software company Bangalore for startups, tech company Indiranagar, software company Bengaluru'
  },
  '/contact': {
    title: 'Contact Khoshà Systems | Software Company in Indiranagar, Bangalore',
    description: 'Get in touch for web applications, SaaS products, AI integration, or digital transformation. Based in Indiranagar, Bangalore (Bengaluru). Email: hello@khoshasystems.com',
    keywords: 'contact software company Bangalore, hire web developers Bangalore, software development quote India, digital transformation consultation Bangalore, Indiranagar tech company contact, software outsourcing company Bangalore, startup tech partner Bangalore'
  },
  '/vancouver': {
    title: 'Software Development Company Vancouver | AI & SaaS Development | Khoshà Systems',
    description: 'Khoshà Systems brings 15+ years of enterprise software experience to Vancouver. Custom web apps, SaaS products, AI transformation, and digital solutions — built by a senior team with local presence.',
    keywords: 'software development company Vancouver, custom software development Vancouver BC, AI transformation services Vancouver, SaaS development Canada, web development company Vancouver, digital transformation Vancouver, offshore development partner Canada, Vancouver software development'
  },
  '/blog': {
    title: 'Blog | Software Development, AI & Digital Transformation Insights | Khoshà Systems',
    description: 'Expert insights on software development, AI transformation, retail technology, real estate CRM, and digital transformation from Khoshà Systems, Bangalore.',
    keywords: 'software development blog India, AI transformation insights, retail technology blog, real estate CRM guide India, digital transformation articles, SaaS development blog Bangalore, enterprise software insights'
  }
};

export const SEOHead: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Match exact path or fall back to parent path or home
    const path = location.pathname;
    const config = seoConfig[path] || seoConfig['/'];

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
    updateMeta('og:url', `https://www.khoshasystems.com${path === '/' ? '' : path}`, true);
    updateMeta('twitter:title', config.title);
    updateMeta('twitter:description', config.description);

    // Update canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = `https://www.khoshasystems.com${path === '/' ? '' : path}`;
    }
  }, [location.pathname]);

  return null;
};
