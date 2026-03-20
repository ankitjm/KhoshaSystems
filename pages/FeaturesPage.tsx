import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import {
  ArrowRight,
  Package,
  Receipt,
  LayoutDashboard,
  BarChart3,
  Tags,
  Check,
} from 'lucide-react';

interface Feature {
  icon: React.ElementType;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  benefits: string[];
  cta: string;
}

const features: Feature[] = [
  {
    icon: Package,
    title: 'Inventory Management & IMEI Tracking',
    tagline: 'You have 4,000 IMEIs across three stores. Do you know exactly where each one is right now?',
    problem: 'Indian electronics retailers lose 3-5% of inventory value to shrinkage every year. For a store doing ₹50 lakh in monthly revenue, that is ₹1.5-2.5 lakh vanishing every month. Most retailers manage IMEI tracking with Excel sheets and paper registers — leading to missing stock, disputed warranty claims, and failed audits.',
    solution: 'RetailerOS tracks every IMEI from the second it enters your ecosystem. When stock arrives, staff scan each device — barcode scanner, phone camera, or manual entry. Every movement is logged. Inter-store transfers are tracked at the serial level with automatic discrepancy alerts. At the point of sale, the IMEI is automatically captured during billing.',
    benefits: [
      'Reduces inventory shrinkage from 3-5% to under 0.5%',
      'Full audit trail for every device: purchase, transfer, sale, return',
      'Inter-store transfers tracked at individual serial number level',
      'Barcode scan, camera capture, or manual entry — works with any hardware',
      'Distributor return reconciliation in seconds, not hours',
      'Go live in under 48 hours with existing inventory imported',
    ],
    cta: 'Ready to stop losing stock to spreadsheet gaps?',
  },
  {
    icon: Receipt,
    title: 'POS & GST-Compliant Billing',
    tagline: '"GST notice" — two words that keep Indian retailers up at night. They do not have to.',
    problem: 'Every invoice needs the correct HSN code, proper CGST/SGST/IGST breakdowns, and e-invoicing compliance. Most retail billing software treats GST as an afterthought. One retailer in Hyderabad told us he spends 6 hours every week just fixing billing errors before filing GST returns.',
    solution: 'RetailerOS was built for Indian tax compliance from the ground up. Every product is mapped to its correct HSN code. Tax calculations happen automatically. The IMEI auto-capture feature cuts checkout time by 40%. Returns follow proper credit note workflows. E-invoicing integration generates IRN-compliant invoices directly from billing.',
    benefits: [
      'Native HSN code mapping for every telecom and electronics SKU',
      'Automatic CGST/SGST/IGST calculation based on transaction type',
      '40% faster checkout through IMEI barcode auto-capture',
      'Proper return and credit note workflows for clean GST filings',
      'E-invoicing (IRN) generation built into the billing flow',
      'Works offline during internet outages with automatic sync',
    ],
    cta: 'Stop spending hours fixing invoices.',
  },
  {
    icon: LayoutDashboard,
    title: 'Multi-Store Dashboard',
    tagline: 'Running three stores from one WhatsApp group? That is not management — that is chaos.',
    problem: 'The moment a retailer opens a second store, operational complexity multiplies by ten. Most multi-store retailers cobble together phone calls, WhatsApp messages, and end-of-day Excel reports. The real cost is the decisions you cannot make because you do not have the data.',
    solution: 'RetailerOS gives you a single dashboard with live data from every location — inventory levels, sales, transfers, returns, scheme utilization — updated as transactions happen. Inter-store transfers are initiated and tracked from the dashboard with scan-based confirmation at both ends.',
    benefits: [
      'Real-time inventory sync across all locations',
      'Centralized analytics with per-store, per-brand, and per-SKU drill-down',
      'Inter-store transfer tracking with scan-based confirmation',
      'Role-based access control for store managers and billing staff',
      'Alerts for low stock, transfer discrepancies, and performance anomalies',
      'Works for 2 stores or 20 — scales as you grow',
    ],
    cta: 'See every store in one screen.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    tagline: 'Your gut feeling is not a business strategy. Your data should be.',
    problem: 'Most Indian retailers make buying decisions based on habit, distributor pressure, or gut instinct. Meanwhile, slow-moving SKUs tie up lakhs in working capital. Monthly reporting takes days of spreadsheet work. Indian retail runs on thin margins — one wrong purchasing decision can wipe out quarterly profit.',
    solution: 'RetailerOS replaces gut-feeling decisions with AI-powered demand forecasting based on your sales patterns — seasonality, brand trends, local demand shifts. Slow-moving SKU alerts flag products sitting too long. Smart reorder suggestions factor in stock, sale velocity, and lead times.',
    benefits: [
      'AI-powered demand forecasting based on actual sales data',
      'Automatic slow-moving SKU alerts with actionable options',
      'Smart reorder suggestions factoring stock, velocity, and lead times',
      'Brand-wise and model-wise margin analysis — real profitability',
      '60% reduction in time spent on manual reporting',
      'Export to Excel, PDF, or Tally-compatible formats',
    ],
    cta: 'Stop guessing. Start knowing.',
  },
  {
    icon: Tags,
    title: 'Brand Scheme Management',
    tagline: 'Last quarter, you left ₹47,000 in brand scheme payouts on the table. You just did not know it.',
    problem: 'Every brand runs different schemes every quarter — cashbacks, exchange bonuses, combo deals, EMI subventions. Most retailers track these in notebooks, WhatsApp groups, or memory. Missed claims across a quarter can easily reach ₹40,000-60,000 for a mid-sized retailer.',
    solution: 'RetailerOS automatically loads active schemes from Samsung, Vivo, Oppo, Xiaomi, OnePlus, Realme, and Apple. At the point of sale, staff are alerted when a transaction qualifies for a scheme. A live dashboard tracks every claim — filed, pending, approved, paid, and expired.',
    benefits: [
      'Auto-loaded schemes from all major brands — updated as offers launch',
      'Real-time billing alerts when a sale qualifies for an active scheme',
      'Live claim tracking: filed, pending, approved, paid, and expired',
      'Deadline alerts so you never miss a claim window',
      '10-15% more scheme payouts recovered versus manual tracking',
      'Pending payout reports for monthly financial planning',
    ],
    cta: 'Stop leaving brand money on the table.',
  },
];

export const FeaturesPage: React.FC = () => {
  return (
    <>
      <PageHero
        title="RetailerOS Features"
        subtitle="Five core capabilities that help store owners stop bleeding money, stay compliant, and run tighter operations across every location. Starting at ₹1,999/month per store."
        label="Feature Walkthroughs"
        backgroundImage="/images/hero-products.jpg"
        backLink={{ label: 'Back to RetailerOS', href: '/products/retaileros' }}
      >
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-bronze-600 text-white px-6 py-3 rounded text-sm font-medium hover:bg-bronze-700 transition-colors"
        >
          Start 14-Day Free Trial <ArrowRight size={16} />
        </Link>
      </PageHero>

      {features.map((f, idx) => (
        <Section key={f.title} className={idx % 2 === 1 ? 'bg-stone-50' : ''}>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-bronze-100 flex items-center justify-center">
                  <f.icon size={20} className="text-bronze-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-800">{f.title}</h2>
              </div>

              <p className="text-lg text-stone-600 italic mb-6">{f.tagline}</p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-medium text-stone-800 mb-3 text-sm uppercase tracking-wider">The Problem</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{f.problem}</p>
                </div>
                <div>
                  <h3 className="font-medium text-stone-800 mb-3 text-sm uppercase tracking-wider">How RetailerOS Solves It</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{f.solution}</p>
                </div>
              </div>

              <div className="bg-white border border-stone-200 rounded-lg p-6 mb-6">
                <h3 className="font-medium text-stone-800 mb-4">Key Benefits</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {f.benefits.map((b) => (
                    <div key={b} className="flex items-start gap-2 text-sm text-stone-600">
                      <Check size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-stone-600 text-sm">
                {f.cta}{' '}
                <Link to="/contact" className="text-bronze-600 hover:text-bronze-700 font-medium inline-flex items-center gap-1">
                  Start your 14-day free trial <ArrowRight size={14} />
                </Link>
              </p>
            </motion.div>
          </div>
        </Section>
      ))}

      {/* CTA */}
      <Section className="bg-stone-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">See Every Feature in Action</h2>
          <p className="text-white/60 text-lg mb-8">
            14-day free trial. No credit card. No lock-in. Plans from ₹1,999/month per store.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-bronze-600 text-white px-6 py-3 rounded text-sm font-medium hover:bg-bronze-700 transition-colors"
            >
              Book a Free Demo <ArrowRight size={16} />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded text-sm font-medium hover:bg-white/20 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </Section>

      <Contact />
    </>
  );
};

export default FeaturesPage;
