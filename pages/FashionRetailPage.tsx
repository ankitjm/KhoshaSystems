import React from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Palette, Layers, TrendingUp, Store, BarChart3, RefreshCw, ArrowRight, Check } from 'lucide-react';
import { FAQSection } from '../components/FAQSection';
import { fashionRetailFAQs } from '../components/StructuredData';

const features = [
  { icon: Layers, label: "Size & Color Matrix", desc: "Track inventory across sizes, colors, and styles. Know exactly what's in stock at each store — no more overselling or missed sales." },
  { icon: Palette, label: "Seasonal Collection Planning", desc: "Plan seasonal buys with historical sell-through data. Identify trending styles and slow movers before they pile up as dead stock." },
  { icon: Store, label: "Multi-Store Management", desc: "Manage flagship stores, outlets, and franchise locations from one dashboard. Transfer stock between stores in a few clicks." },
  { icon: TrendingUp, label: "Sales & Margin Analytics", desc: "Track brand-wise, category-wise, and store-wise margins in real time. Know which styles and brands drive profit, not just revenue." },
  { icon: RefreshCw, label: "Exchange & Returns", desc: "Handle size exchanges, style swaps, and returns with automated inventory adjustments. Keep your stock counts accurate without manual effort." },
  { icon: BarChart3, label: "Smart Reorder Alerts", desc: "Get AI-driven reorder suggestions based on sell-through velocity, seasonality, and upcoming festive demand patterns." },
];

const benefits = [
  "Size-color-style inventory matrix",
  "Seasonal and festive demand planning",
  "Multi-store stock transfer and sync",
  "GST-compliant billing and invoicing",
  "Barcode scanning for fast checkout",
  "Brand-wise margin and sell-through analysis",
  "Exchange and return management",
  "Staff performance and incentive tracking",
  "WhatsApp-based customer notifications",
  "Dead stock alerts and markdowns",
];

const stats = [
  { value: "35%", label: "Less Dead Stock", desc: "AI-driven reorder and seasonal planning reduces unsold inventory" },
  { value: "3x", label: "Faster Billing", desc: "Barcode scanning and preset size matrices speed up checkout" },
  { value: "50%", label: "Better Visibility", desc: "Real-time stock levels across sizes, colors, and locations" },
];

export const FashionRetailPage: React.FC = () => {
  return (
    <div>
      <PageHero
        backLink={{ label: "RetailerOS", href: "/products/retaileros" }}
        label="RetailerOS for Fashion"
        title={<>Retail Management for <span className="bronze-gradient-text">Fashion & Apparel Stores</span></>}
        subtitle="Manage inventory across sizes, colors, and styles. Plan seasonal collections, track sell-through by brand, and run multi-store operations — all from one cloud-native platform built for Indian fashion retail."
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
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">Built for Fashion Retail</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">Everything a fashion or apparel retailer needs — from size-color inventory to seasonal planning and multi-store analytics.</p>
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
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Purpose-Built for Fashion & Apparel Retail in India</h2>
            <p className="text-stone-500 mb-8">Generic POS systems don't understand size matrices, seasonal collections, or style-based inventory. RetailerOS is built from the ground up for fashion retailers who manage hundreds of SKUs across sizes, colors, and brands — with GST compliance baked in.</p>
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
              <img src="/images/retaileros-inline.png" alt="RetailerOS fashion retail inventory dashboard" className="w-full h-full object-cover" loading="lazy" />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <Palette size={24} className="mb-1 text-bronze-400" />
              <div className="text-[11px] uppercase tracking-widest text-white/70">Fashion Retail Dashboard</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Comparison */}
      <Section className="bg-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">RetailerOS vs Generic Fashion POS</h2>
          <p className="text-stone-500 mb-12 max-w-2xl mx-auto">Most POS systems treat a shirt like a packet of chips. RetailerOS understands that a shirt comes in 5 sizes, 4 colors, and 3 fits — and tracks each one.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-6 bg-white border border-stone-200 rounded-lg">
              <h3 className="font-medium text-stone-900 mb-4">Generic POS Software</h3>
              <ul className="space-y-3 text-sm text-stone-500">
                <li>No size-color matrix — each variant is a separate SKU</li>
                <li>No seasonal planning or sell-through analysis</li>
                <li>Manual stock counts across stores</li>
                <li>No dead stock alerts or markdown suggestions</li>
                <li>Limited brand-wise margin reporting</li>
              </ul>
            </div>
            <div className="p-6 bg-bronze-50 border border-bronze-200 rounded-lg">
              <h3 className="font-medium text-stone-900 mb-4">RetailerOS for Fashion</h3>
              <ul className="space-y-3 text-sm text-stone-700">
                <li>Native size-color-style matrix with grouped views</li>
                <li>AI-driven seasonal planning and demand forecasting</li>
                <li>Real-time multi-store inventory sync</li>
                <li>Automated dead stock alerts and markdown triggers</li>
                <li>Brand, category, and style-level margin analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <FAQSection
        faqs={fashionRetailFAQs}
        title="Fashion Retail — Frequently Asked Questions"
        subtitle="Common questions about RetailerOS for fashion and apparel stores."
      />

      {/* CTA */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Ready to Modernize Your Fashion Retail Operations?</h2>
          <p className="text-stone-500 mb-8">Whether you run a single boutique or a multi-city apparel chain, RetailerOS scales with your collections and your ambition.</p>
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
