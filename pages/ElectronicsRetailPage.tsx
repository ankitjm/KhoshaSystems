import React from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Smartphone, Shield, Cpu, Tag, BarChart3, Zap, ArrowRight, Check, ExternalLink } from 'lucide-react';
import { FAQSection } from '../components/FAQSection';
import { electronicsRetailFAQs } from '../components/StructuredData';

const features = [
  { icon: Smartphone, label: "IMEI & Serial Number Tracking", desc: "Track every device by IMEI or serial number from purchase to sale. Barcode scan, camera capture, or manual entry — with full audit trail per unit." },
  { icon: Shield, label: "Warranty Management", desc: "Register warranties at the point of sale. Track warranty periods, manage claims, and give customers instant warranty status lookups via WhatsApp." },
  { icon: Tag, label: "Scheme & Offer Engine", desc: "Manage brand schemes from Samsung, Vivo, Oppo, Xiaomi, and others. Auto-apply eligible cashbacks, exchange offers, and combo deals at billing." },
  { icon: Cpu, label: "Accessory & Combo Billing", desc: "Bundle phones with cases, screen guards, and chargers. Create combo offers, track accessory margins separately, and suggest upsells at checkout." },
  { icon: BarChart3, label: "Brand-Wise Analytics", desc: "Track sales, margins, and sell-through by brand and model. Know which brands drive profit and which models are gathering dust." },
  { icon: Zap, label: "Exchange & Buyback", desc: "Handle device trade-ins with condition grading, fair-value estimation, and instant credit toward new purchases. Track refurbished inventory separately." },
];

const benefits = [
  "IMEI and serial number tracking",
  "Warranty registration and claims",
  "Brand scheme and cashback management",
  "Multi-store inventory synchronization",
  "Barcode and QR code scanning",
  "Exchange and buyback workflows",
  "GST-compliant billing and invoicing",
  "Accessory combo and upsell tracking",
  "WhatsApp-based customer notifications",
  "Model-wise margin and inventory analysis",
];

const stats = [
  { value: "40%", label: "Faster Checkout", desc: "IMEI auto-capture and barcode scanning speed up every transaction" },
  { value: "3x", label: "Inventory Accuracy", desc: "Serial-level tracking eliminates stock discrepancies across stores" },
  { value: "60%", label: "Less Manual Work", desc: "Scheme tracking, warranty registration, and reorders run on autopilot" },
];

export const ElectronicsRetailPage: React.FC = () => {
  return (
    <div>
      <PageHero
        backLink={{ label: "RetailerOS", href: "/products/retaileros" }}
        label="RetailerOS for Electronics"
        title={<>Retail Management for <span className="bronze-gradient-text">Electronics & Mobile Stores</span></>}
        subtitle="IMEI tracking, warranty management, brand scheme automation, and exchange workflows — purpose-built for mobile phone shops, multi-brand electronics stores, and telecom distributors across India."
        backgroundImage="/images/retaileros-page-hero.jpg"
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
                <p className="text-stone-500 text-sm">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section className="bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">Built for Electronics & Mobile Retail</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">Everything an electronics or mobile retailer needs — from IMEI tracking and warranty management to brand scheme automation and exchange workflows.</p>
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
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Purpose-Built for Electronics & Mobile Retail in India</h2>
            <p className="text-stone-500 mb-8">Generic POS systems don't understand IMEI tracking, brand scheme claims, or warranty registration. RetailerOS is built from the ground up for mobile phone shops, consumer electronics stores, and telecom distributors — with Indian GST compliance baked in.</p>
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
            <picture>
              <source srcSet="/images/retaileros-inline.webp" type="image/webp" />
              <img src="/images/retaileros-inline.png" alt="RetailerOS electronics store management dashboard" className="w-full h-full object-cover" loading="lazy" />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <Smartphone size={24} className="mb-1 text-bronze-400" />
              <div className="text-[11px] uppercase tracking-widest text-white/70">Electronics Retail Dashboard</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Comparison */}
      <Section className="bg-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">RetailerOS vs Legacy Electronics Software</h2>
          <p className="text-stone-500 mb-12 max-w-2xl mx-auto">Desktop-based billing, Excel IMEI sheets, and paper scheme registers weren't built for modern electronics retail. RetailerOS replaces all of them.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-6 bg-white border border-stone-200 rounded-lg">
              <h3 className="font-medium text-stone-900 mb-4">Legacy Electronics Software</h3>
              <ul className="space-y-3 text-sm text-stone-500">
                <li>IMEI tracked in spreadsheets or notebooks</li>
                <li>Brand schemes managed on paper or WhatsApp groups</li>
                <li>Warranty details stored in filing cabinets</li>
                <li>No real-time inventory across locations</li>
                <li>Separate tools for billing, inventory, and analytics</li>
              </ul>
            </div>
            <div className="p-6 bg-bronze-50 border border-bronze-200 rounded-lg">
              <h3 className="font-medium text-stone-900 mb-4">RetailerOS for Electronics</h3>
              <ul className="space-y-3 text-sm text-stone-700">
                <li>Native IMEI tracking with barcode scan and camera capture</li>
                <li>Automated scheme tracking with claim management</li>
                <li>Digital warranty registration at point of sale</li>
                <li>Real-time multi-store serial-level inventory</li>
                <li>Unified platform — billing, inventory, schemes, analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <FAQSection
        faqs={electronicsRetailFAQs}
        title="Electronics & Mobile Retail — Frequently Asked Questions"
        subtitle="Common questions about RetailerOS for electronics and mobile phone stores."
      />

      {/* CTA */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Ready to Modernize Your Electronics Store?</h2>
          <p className="text-stone-500 mb-8">Whether you run a single mobile shop or a multi-city electronics chain, RetailerOS scales with your ambition.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded group">
              Schedule a Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="https://retaileros.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 border border-stone-300 text-stone-700 text-sm font-medium uppercase tracking-wider hover:border-bronze-400 transition-colors rounded group">
              Visit RetailerOS.in <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link to="/compare/retaileros-vs-shopify" className="inline-flex items-center gap-2 px-8 py-4 border border-stone-300 text-stone-700 text-sm font-medium uppercase tracking-wider hover:border-bronze-400 transition-colors rounded group">
              Compare vs Shopify POS <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </Section>

      <Contact />
    </div>
  );
};
