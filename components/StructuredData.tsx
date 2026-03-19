import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

const BASE_URL = 'https://www.khoshasystems.com';
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
