import React from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, BarChart3, Smartphone, Zap, Cloud, ArrowRight, Check, Cpu, Package, Radio, ExternalLink } from 'lucide-react';

const features = [
  { icon: BarChart3, label: "Real-Time Analytics", desc: "Live sales dashboards, IMEI/serial tracking, inventory levels, and margin analysis updated in real time across all your stores." },
  { icon: Radio, label: "Telecom & Electronics Ready", desc: "IMEI management, serial number tracking, warranty registration, and scheme/offer management built for telecom and electronics retail." },
  { icon: Zap, label: "AI-Powered Insights", desc: "Demand forecasting, slow-moving SKU alerts, smart reorder suggestions, and brand-wise performance analysis." },
  { icon: Cloud, label: "Cloud-Native", desc: "Scale from 1 store to 100 without infrastructure headaches. Automatic backups, zero downtime updates." },
  { icon: Package, label: "Scheme & Offer Engine", desc: "Manage brand schemes, cashbacks, exchange offers, and combo deals. Track scheme claims and pending payouts automatically." },
  { icon: Cpu, label: "Brand & Distributor Portal", desc: "Give your brand partners and distributors visibility into sell-through data, scheme utilization, and inventory levels." },
];

const benefits = [
  "IMEI and serial number tracking",
  "GST-compliant billing and invoicing",
  "Brand scheme and cashback management",
  "Multi-store inventory synchronization",
  "Barcode and QR code scanning",
  "Warranty registration and tracking",
  "Exchange and buyback workflows",
  "WhatsApp-based customer notifications",
  "Staff performance and incentive tracking",
  "Detailed brand-wise margin analysis",
];

const stats = [
  { value: "40%", label: "Faster Checkout", desc: "Streamlined billing with IMEI auto-capture reduces queue time" },
  { value: "3x", label: "Inventory Accuracy", desc: "Serial-level tracking eliminates stock discrepancies across stores" },
  { value: "60%", label: "Less Manual Work", desc: "Scheme tracking, reorders, and notifications run on autopilot" },
];

export const RetailerOSPage: React.FC = () => {
  return (
    <div>
      <PageHero
        backLink={{ label: "All Products", href: "/products" }}
        label="RetailerOS"
        title={<>The Operating System for <span className="bronze-gradient-text">Telecom & Electronics Retail</span></>}
        subtitle="A full-stack retail management platform built for mobile phone retailers, consumer electronics stores, and telecom distributors. IMEI tracking, scheme management, brand analytics, and GST billing — unified in one intelligent system."
        backgroundImage="https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=1200&q=75"
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-bronze-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-500 transition-colors rounded group">
            Get a Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="https://retaileros.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white text-sm font-medium uppercase tracking-wider hover:bg-white/10 transition-colors rounded group">
            Visit RetailerOS.in <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </PageHero>

      {/* Stats */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-8 bg-stone-50 rounded-lg border border-stone-200">
                <div className="text-4xl sm:text-5xl font-bold text-stone-900 mb-2">{stat.value}</div>
                <div className="text-bronze-600 font-medium text-sm uppercase tracking-wider mb-2">{stat.label}</div>
                <p className="text-stone-400 text-sm">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section className="bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">Core Capabilities</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">Everything a telecom or electronics retailer needs — from IMEI tracking and scheme management to multi-store analytics.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1 }}
                className="p-6 sm:p-8 bg-white border border-stone-200 rounded-lg hover:border-bronze-300 hover:shadow-sm transition-all">
                <feature.icon size={24} className="text-bronze-500 mb-4" />
                <h3 className="text-stone-900 font-medium text-lg mb-2">{feature.label}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Built for Telecom & Electronics Retail in India</h2>
            <p className="text-stone-500 mb-8">RetailerOS isn't a generic POS. It's built from the ground up for mobile phone shops, multi-brand electronics stores, and telecom distributors — IMEI tracking, scheme management, GST compliance, and the workflows your staff already understands.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((benefit, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-start gap-2">
                  <Check size={16} className="text-bronze-500 mt-0.5 shrink-0" />
                  <span className="text-stone-600 text-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="h-64 md:h-96 relative overflow-hidden rounded-lg border border-stone-200">
            <img src="https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=640&q=70" alt="Mobile phone and electronics retail store" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <ShoppingCart size={24} className="mb-1 text-bronze-400" />
              <div className="text-[11px] uppercase tracking-widest text-white/70">RetailerOS Dashboard</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Comparison */}
      <Section className="bg-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">RetailerOS vs Legacy Retail Software</h2>
          <p className="text-stone-500 mb-12 max-w-2xl mx-auto">Traditional tools like Gofrugal, Ginesys, or Tally weren't built for IMEI-based retail, brand scheme tracking, or cloud-first operations. RetailerOS is.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-6 bg-white border border-stone-200 rounded-lg">
              <h3 className="font-medium text-stone-900 mb-4">Legacy Retail Software</h3>
              <ul className="space-y-3 text-sm text-stone-500">
                <li>Desktop-first, requires on-premise servers</li>
                <li>No IMEI/serial tracking or manual spreadsheets</li>
                <li>Brand schemes tracked in Excel or on paper</li>
                <li>Separate tools for POS, inventory, and analytics</li>
                <li>Expensive per-store licensing</li>
              </ul>
            </div>
            <div className="p-6 bg-bronze-50 border border-bronze-200 rounded-lg">
              <h3 className="font-medium text-stone-900 mb-4">RetailerOS</h3>
              <ul className="space-y-3 text-sm text-stone-700">
                <li>Cloud-native, works from any device</li>
                <li>Built-in IMEI/serial tracking per transaction</li>
                <li>Automated scheme tracking and claim management</li>
                <li>Unified platform — POS, inventory, schemes, analytics</li>
                <li>Simple SaaS pricing that scales with you</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Ready to Modernize Your Retail Operations?</h2>
          <p className="text-stone-500 mb-8">Whether you run a single mobile shop or a multi-city electronics chain, RetailerOS scales with your ambition.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded group">
              Schedule a Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="https://retaileros.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 border border-stone-300 text-stone-700 text-sm font-medium uppercase tracking-wider hover:border-bronze-400 transition-colors rounded group">
              Visit RetailerOS.in <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </Section>

      <Contact />
    </div>
  );
};
