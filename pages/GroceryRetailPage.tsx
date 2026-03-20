import React from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Timer, ScanBarcode, ShoppingCart, Scale, Thermometer, BarChart3, ArrowRight, Check } from 'lucide-react';
import { FAQSection } from '../components/FAQSection';
import { groceryRetailFAQs } from '../components/StructuredData';

const features = [
  { icon: Thermometer, label: "Perishable Inventory Management", desc: "Track expiry dates, batch numbers, and shelf life across all products. Get automatic alerts before items expire so you can markdown or clear stock in time." },
  { icon: ScanBarcode, label: "High-Speed Barcode Billing", desc: "Handle high-volume transactions with rapid barcode scanning, weight-based pricing, and loose-item billing. Built for peak-hour grocery checkout speed." },
  { icon: Scale, label: "Weight-Based Pricing", desc: "Sell by weight, by piece, or by pack. Integrated weighing scale support for fruits, vegetables, pulses, and dry goods with accurate per-gram billing." },
  { icon: ShoppingCart, label: "Smart Reorder & Purchase", desc: "Automated purchase orders based on sell-through velocity, minimum stock levels, and supplier lead times. Never run out of fast-moving staples." },
  { icon: Timer, label: "Expiry & Batch Tracking", desc: "FIFO-based inventory with batch-level traceability. Know exactly which batch is on which shelf and when it expires — critical for FSSAI compliance." },
  { icon: BarChart3, label: "Category & Margin Analytics", desc: "Track margins by category — dairy, FMCG, fresh produce, packaged goods. Identify your highest-margin categories and optimize shelf space." },
];

const benefits = [
  "Expiry date and batch tracking",
  "High-speed barcode scanning checkout",
  "Weight-based and loose-item billing",
  "GST-compliant invoicing",
  "Automated reorder and purchase orders",
  "Multi-store inventory synchronization",
  "FMCG scheme and offer tracking",
  "Supplier and distributor management",
  "WhatsApp-based customer receipts",
  "Category-wise margin analysis",
];

const stats = [
  { value: "2x", label: "Faster Checkout", desc: "High-speed barcode scanning and quick-bill modes for peak hours" },
  { value: "30%", label: "Less Wastage", desc: "Expiry alerts and batch tracking reduce spoilage and write-offs" },
  { value: "45%", label: "Smarter Purchasing", desc: "Automated reorders based on sell-through patterns prevent stockouts" },
];

export const GroceryRetailPage: React.FC = () => {
  return (
    <div>
      <PageHero
        backLink={{ label: "RetailerOS", href: "/products/retaileros" }}
        label="RetailerOS for Grocery"
        title={<>Retail Management for <span className="bronze-gradient-text">Grocery & Supermarkets</span></>}
        subtitle="Handle perishable inventory, high-volume billing, weight-based pricing, and expiry tracking — all from one cloud-native platform built for Indian grocery retail, from kirana stores to modern supermarkets."
        backgroundImage="/images/retaileros-page-hero.jpg"
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-bronze-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-500 transition-colors rounded group">
            Get a Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/products/retaileros" className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white text-sm font-medium uppercase tracking-wider hover:bg-white/10 transition-colors rounded group">
            Learn About RetailerOS <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
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
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">Built for Grocery & Supermarket Retail</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">Everything a grocery store or supermarket needs — from perishable inventory and batch tracking to high-volume billing and supplier management.</p>
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
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Purpose-Built for Grocery Retail in India</h2>
            <p className="text-stone-500 mb-8">Generic retail software doesn't understand expiry dates, batch numbers, or weight-based pricing. RetailerOS is built for the realities of grocery retail — fast checkout, perishable management, supplier coordination, and FSSAI-ready batch traceability.</p>
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
              <img src="/images/retaileros-inline.png" alt="RetailerOS grocery store management dashboard" className="w-full h-full object-cover" loading="lazy" />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <ShoppingCart size={24} className="mb-1 text-bronze-400" />
              <div className="text-[11px] uppercase tracking-widest text-white/70">Grocery Retail Dashboard</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Comparison */}
      <Section className="bg-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">RetailerOS vs Traditional Grocery Software</h2>
          <p className="text-stone-500 mb-12 max-w-2xl mx-auto">Legacy billing software and Tally-based setups weren't built for perishable inventory, batch tracking, or high-volume supermarket operations. RetailerOS is.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-6 bg-white border border-stone-200 rounded-lg">
              <h3 className="font-medium text-stone-900 mb-4">Traditional Grocery Software</h3>
              <ul className="space-y-3 text-sm text-stone-500">
                <li>No expiry tracking — spoilage discovered on shelves</li>
                <li>Manual weight-based pricing calculations</li>
                <li>Slow checkout during peak hours</li>
                <li>Paper-based supplier orders and PO tracking</li>
                <li>No category-wise margin visibility</li>
              </ul>
            </div>
            <div className="p-6 bg-bronze-50 border border-bronze-200 rounded-lg">
              <h3 className="font-medium text-stone-900 mb-4">RetailerOS for Grocery</h3>
              <ul className="space-y-3 text-sm text-stone-700">
                <li>Automated expiry alerts with batch-level tracking</li>
                <li>Integrated weighing scale with per-gram billing</li>
                <li>High-speed barcode scanning for peak throughput</li>
                <li>Automated purchase orders and supplier management</li>
                <li>Real-time category and margin analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <FAQSection
        faqs={groceryRetailFAQs}
        title="Grocery Retail — Frequently Asked Questions"
        subtitle="Common questions about RetailerOS for grocery stores and supermarkets."
      />

      {/* CTA */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Ready to Modernize Your Grocery Operations?</h2>
          <p className="text-stone-500 mb-8">Whether you run a neighborhood kirana store or a multi-location supermarket, RetailerOS scales with your business.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded group">
              Schedule a Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/products/retaileros" className="inline-flex items-center gap-2 px-8 py-4 border border-stone-300 text-stone-700 text-sm font-medium uppercase tracking-wider hover:border-bronze-400 transition-colors rounded group">
              Explore RetailerOS <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </Section>

      <Contact />
    </div>
  );
};
