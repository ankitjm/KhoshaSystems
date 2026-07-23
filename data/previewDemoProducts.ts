export type Industry = 'Telecom' | 'Real Estate' | 'Immigration' | 'AI Automation';

export interface ProductEntry {
  name: string;
  industry: Industry;
  slug: string;
  /** Placeholder copy — draft only, replace with approved product copy. */
  description: string;
  /** Placeholder until real logo files are supplied. */
  logo: null;
  /** Logo Status = "Done" in the tracker — the two most launch-ready products. */
  flagship?: boolean;
  tagline?: string;
  highlights?: string[];
}

// Source: Khosha Systems Products List.pdf (2026-07-23).
// "Tele Calling (TBD)" excluded — not yet a defined product/industry.
export const PRODUCTS: ProductEntry[] = [
  // Telecom
  {
    name: 'Retailer OS',
    industry: 'Telecom',
    slug: 'retailer-os',
    description: 'A full-stack retail management platform for mobile phone and electronics retailers. IMEI tracking, scheme management, brand analytics, and GST billing in one system.',
    logo: null,
    flagship: true,
    tagline: 'Built for Telecom & Electronics Retail',
    highlights: [
      'IMEI tracking across every SKU',
      'Brand scheme & cashback automation',
      'Real-time margin analytics',
      'Cloud-native — scales store to store',
    ],
  },
  {
    name: 'Brand OS',
    industry: 'Telecom',
    slug: 'brand-os',
    description: 'A brand-side operations console for telecom OEMs and distributors. Track dealer schemes, cashbacks, and sell-through performance across the entire channel.',
    logo: null,
  },
  {
    name: 'Distribution Mgmt',
    industry: 'Telecom',
    slug: 'distribution-mgmt',
    description: 'Distributor management system for telecom supply chains. Stock movement, dealer credit limits, and order tracking, unified across every warehouse.',
    logo: null,
  },
  {
    name: 'Delivery',
    industry: 'Telecom',
    slug: 'delivery',
    description: 'Last-mile delivery and logistics management for retail fulfillment. Route optimization, live driver tracking, and digital proof of delivery.',
    logo: null,
  },
  {
    name: 'Warehouse',
    industry: 'Telecom',
    slug: 'warehouse',
    description: 'Warehouse management system for multi-location inventory. Putaway, picking, and stock accuracy, built for high-SKU electronics distribution.',
    logo: null,
  },

  // Real Estate
  {
    name: 'Concorde Association App',
    industry: 'Real Estate',
    slug: 'concorde-association-app',
    description: 'A resident association app for Concorde communities. Maintenance requests, notices, and payments, handled digitally for residents and management alike.',
    logo: null,
  },
  {
    name: 'CP App',
    industry: 'Real Estate',
    slug: 'cp-app',
    description: 'A channel partner app for real estate brokers. Manage leads, track bookings, and follow commission payouts from a single mobile dashboard.',
    logo: null,
  },
  {
    name: 'CRM',
    industry: 'Real Estate',
    slug: 'real-estate-crm',
    description: 'Purpose-built CRM for developers and brokers. Capture leads, track site visits, automate follow-ups, and close deals the way Indian real estate actually works.',
    logo: null,
  },
  {
    name: 'Embassy Chat Bot',
    industry: 'Real Estate',
    slug: 'embassy-chat-bot',
    description: 'An AI chatbot for Embassy Group homebuyers. Instant answers on project details, pricing, and booking status, any time of day.',
    logo: null,
  },
  {
    name: 'Embassy Citadel',
    industry: 'Real Estate',
    slug: 'embassy-citadel',
    description: 'A project microsite for Embassy Citadel. Brochure, amenities, and a guided booking journey for prospective homebuyers.',
    logo: null,
  },
  {
    name: 'Embassy ONE',
    industry: 'Real Estate',
    slug: 'embassy-one',
    description: 'A project microsite for Embassy ONE. Integrated township information, a unit explorer, and enquiry capture in one flow.',
    logo: null,
  },
  {
    name: 'EOI',
    industry: 'Real Estate',
    slug: 'eoi',
    description: 'A digital Expression of Interest platform for new launches. Online EOI collection, payment, and allotment tracking, replacing paper forms.',
    logo: null,
  },
  {
    name: 'GRE',
    industry: 'Real Estate',
    slug: 'gre',
    description: 'A digital sales platform for the GRE project. Unit selection, EOI submission, and live booking status in a single guided flow.',
    logo: null,
  },
  {
    name: 'GRE The Universe',
    industry: 'Real Estate',
    slug: 'gre-the-universe',
    description: 'A phase-specific booking microsite for GRE The Universe. Tower-wise availability, pricing, and enquiry capture for the project.',
    logo: null,
  },
  {
    name: 'Highland Mayfields',
    industry: 'Real Estate',
    slug: 'highland-mayfields',
    description: 'A project microsite for Highland Mayfields. Floor plans, pricing, and virtual tours built for prospective buyers researching the project.',
    logo: null,
  },
  {
    name: 'Living Tree',
    industry: 'Real Estate',
    slug: 'living-tree',
    description: 'A project microsite for Living Tree. A sustainability-focused residential launch with enquiry capture and site-visit scheduling.',
    logo: null,
  },
  {
    name: 'Post Sales',
    industry: 'Real Estate',
    slug: 'post-sales',
    description: 'A post-sales customer portal for homebuyers. Possession updates, documentation, and support ticketing after the booking is done.',
    logo: null,
  },
  {
    name: 'Project Landing Page',
    industry: 'Real Estate',
    slug: 'project-landing-page',
    description: 'A templated landing-page system for new project launches. Fast-to-ship marketing pages with built-in lead capture, per project.',
    logo: null,
  },
  {
    name: 'Sales Studio',
    industry: 'Real Estate',
    slug: 'sales-studio',
    description: 'A digital sales-office tool for on-site teams. Live inventory, pricing, and offer presentation during a customer walk-in.',
    logo: null,
  },
  {
    name: 'Svamitha',
    industry: 'Real Estate',
    slug: 'svamitha',
    description: 'A project microsite for Svamitha. Plans, amenities, and a guided booking enquiry for the development.',
    logo: null,
  },
  {
    name: 'Universe Sales Studio',
    industry: 'Real Estate',
    slug: 'universe-sales-studio',
    description: 'A Sales Studio variant tailored to the Universe project. Live unit availability and pricing built for on-site visits.',
    logo: null,
  },

  // Immigration
  {
    name: 'Case Mgmt for RCIC (Passage)',
    industry: 'Immigration',
    slug: 'passage',
    description: 'A case management system for Canadian immigration consultants (RCICs). Client intake, document tracking, and application status in one workspace.',
    logo: null,
  },

  // AI Automation
  {
    name: 'Chatbot',
    industry: 'AI Automation',
    slug: 'chatbot',
    description: 'A general-purpose AI chatbot for business websites. Trained on your own content to answer customer questions instantly, day or night.',
    logo: null,
  },
  {
    name: 'Engram',
    industry: 'AI Automation',
    slug: 'engram',
    description: 'An AI memory layer for teams. Captures, organizes, and recalls institutional knowledge scattered across your everyday tools.',
    logo: null,
    flagship: true,
    tagline: "Your Team's AI Memory Layer",
    highlights: [
      'Captures knowledge from everyday tools',
      'Organizes it into searchable context',
      'Recalls the right answer on demand',
      'Keeps institutional knowledge from walking out the door',
    ],
  },
  {
    name: 'KAI',
    industry: 'AI Automation',
    slug: 'kai',
    description: 'A conversational AI assistant that automates repetitive workflows. Surfaces the right insight at the right moment, on demand.',
    logo: null,
  },
];

export const INDUSTRIES: Industry[] = ['Telecom', 'Real Estate', 'Immigration', 'AI Automation'];

export const productsByIndustry = (industry: Industry) => PRODUCTS.filter((p) => p.industry === industry);

export const flagshipProducts = () => PRODUCTS.filter((p) => p.flagship);
