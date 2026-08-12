import React from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { FAQSection } from '../components/FAQSection';
import { retailerOSFAQs } from '../components/StructuredData';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ExternalLink, Quote, Smartphone, ShoppingBag, Radio,
  Store, BarChart3, Shield,
} from 'lucide-react';

const dataPoints = [
  { value: "<0.5%", label: "Shrinkage", desc: "down from 3–5%" },
  { value: "85–95%", label: "Scheme Recovery", desc: "of brand cashback claimed" },
  { value: "1–2 hrs", label: "GST Time / Week", desc: "down from 8–10 hours" },
  { value: "2–3 min", label: "Billing Speed", desc: "down from 5–7 minutes" },
];

const moduleTiles = [
  { image: "/images/Retailerosimg/inventory.png", title: "Inventory", desc: "Live IMEI ledger. Every phone tracked from scan to sale." },
  { image: "/images/Retailerosimg/khaata.png", title: "Khaata", desc: "Partial payments, reminders, and a full audit trail." },
  { image: "/images/Retailerosimg/billing.png", title: "Billing", desc: "Scan, sell, print, WhatsApp — GST and IMEI captured automatically." },
  { image: "/images/Retailerosimg/Reports.png", title: "Schemes, Service & Reports", desc: "Cashback, repair status, and daily numbers — automatically." },
];

const categoryTiles = [
  { name: "Selling", items: ["Sales Desk", "Schemes", "Pricing", "Invoices"] },
  { name: "Inventory", items: ["Inventory", "IMEI Tracker", "Purchase Orders", "Stores"] },
  { name: "Customers", items: ["Clients (CRM)", "Marketing", "Help / Inquiries"] },
  { name: "Service", items: ["Repairs", "Claims"] },
  { name: "Operations", items: ["Cash Register", "Expenses", "Staff"] },
  { name: "Finance", items: ["Finance", "Reports"] },
  { name: "Platform", items: ["Onboarding", "Launcher", "Settings", "Integrations", "Marketplace"] },
];

const personas = [
  { icon: Smartphone, label: "Mobile Phone Shops", desc: "IMEI capture, warranty tracking, and trade-in schemes in one flow." },
  { icon: ShoppingBag, label: "Electronics Stores", desc: "Multi-brand inventory and margin analysis across every category." },
  { icon: Radio, label: "Telecom Distributors", desc: "Sell-through visibility and scheme utilization across every store." },
];

const plans = [
  { icon: Store, name: "General Trade", price: "₹2,999", period: "/store/mo", desc: "Single-store operators", highlight: false },
  { icon: BarChart3, name: "Multi-Store Chain", price: "₹7,499", period: "/store/mo", desc: "Chains with 2+ locations", highlight: true },
  { icon: Shield, name: "Enterprise", price: "Custom", period: "volume pricing", desc: "Chains with 15+ stores", highlight: false },
];

const tileClass = "rounded-lg border border-stone-200 bg-white hover:border-bronze-300 glow-bronze transition-all duration-300";
const creamTileClass = "rounded-lg border border-[#E0CCAD]/60 bg-[#FAF6F1] transition-all duration-300";

export const RetailerOSBentoPage: React.FC = () => {
  return (
    <div>
      <PageHero
        backLink={{ label: "All Products", href: "/products" }}
        label="RetailerOS"
        title={<>Your Whole Shop. <span className="bronze-gradient-text">One Dashboard.</span></>}
        subtitle="Billing, inventory, schemes, khaata, repairs, and reports — organized the way a dashboard should be: everything visible, nothing buried in a menu."
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

      {/* Overview bento — explainer tile + data-point tiles, one wall */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-3">What Is RetailerOS</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 mb-4">The Overview <span className="bronze-gradient-text">Dashboard.</span></h2>
            <p className="text-stone-500 max-w-2xl mx-auto">One screen for everything behind the counter — and the numbers to prove it works.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className={`col-span-2 lg:col-span-2 lg:row-span-2 p-6 sm:p-8 flex flex-col justify-between ${tileClass}`}>
              <div>
                <h3 className="text-stone-900 font-medium text-lg sm:text-xl mb-3">Built for Indian retail counters</h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-4">
                  RetailerOS is a cloud-based retail management platform for mobile phone shops, electronics stores, and telecom distributors. It runs in the browser on any device — replacing the notebook, the spreadsheet, and the three disconnected apps most counters stitch together.
                </p>
                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                  Billing, IMEI inventory, schemes, khaata, repairs, and reports — one login, updated in real time.
                </p>
              </div>
              <div className="mt-6 rounded-lg overflow-hidden border border-stone-200">
                <img src="/images/retaileros-hero-mockup.png" alt="RetailerOS dashboard on laptop and phone" className="w-full h-auto" loading="lazy" />
              </div>
            </motion.div>
            {dataPoints.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`p-5 sm:p-6 flex flex-col justify-center text-center ${creamTileClass}`}>
                <div className="text-2xl sm:text-3xl font-bold text-stone-900 mb-1">{stat.value}</div>
                <div className="text-bronze-600 font-medium text-[10px] sm:text-xs uppercase tracking-wider mb-1">{stat.label}</div>
                <p className="text-stone-400 text-[10px] sm:text-xs">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Modules — 4 real screens, uniform size, no aspect-ratio mismatch */}
      <Section className="bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-3">Inside RetailerOS</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 mb-4">The Modules You'll <span className="bronze-gradient-text">Use Every Day.</span></h2>
            <p className="text-stone-500 max-w-2xl mx-auto">The counter-facing core — everything else runs quietly behind it.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {moduleTiles.map((mod, i) => (
              <motion.div key={mod.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`overflow-hidden col-span-2 sm:col-span-1 ${tileClass}`}>
                <img src={mod.image} alt={`RetailerOS ${mod.title} screen`} className="w-full h-auto" loading="lazy" />
                <div className="p-4 sm:p-5">
                  <h4 className="text-stone-900 font-medium text-sm mb-1">{mod.title}</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">{mod.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Full 23-module category wall — separate, uniform tiles, no mismatch with photos */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-3">The Full Platform</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 mb-4">23 Modules, <span className="bronze-gradient-text">Seven Categories.</span></h2>
            <p className="text-stone-500 max-w-2xl mx-auto">Verified against retaileros.in — the complete system beyond the daily counter view.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryTiles.map((cat, i) => (
              <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className={`p-4 sm:p-5 ${creamTileClass}`}>
                <h4 className="text-bronze-600 text-[10px] uppercase tracking-widest mb-2 font-medium">{cat.name}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <span key={item} className="text-[10px] text-stone-600 bg-white border border-stone-200 rounded-full px-2 py-0.5">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Personas + testimonial, one wall */}
      <Section className="bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-3">Built For</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 mb-4">Whichever Counter <span className="bronze-gradient-text">You Run.</span></h2>
            <p className="text-stone-500 max-w-2xl mx-auto">Retailers across every category run RetailerOS the same way — one system, three kinds of counters.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {personas.map((p, i) => (
              <motion.div key={p.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`p-5 sm:p-6 text-center ${tileClass}`}>
                <div className="w-12 h-12 rounded-lg bg-bronze-50 border border-bronze-200 flex items-center justify-center mx-auto mb-4">
                  <p.icon size={22} className="text-bronze-600" />
                </div>
                <h4 className="text-stone-900 font-medium mb-2">{p.label}</h4>
                <p className="text-stone-500 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className={`mt-4 p-6 sm:p-8 text-center max-w-2xl mx-auto ${creamTileClass}`}>
            <Quote size={24} className="text-bronze-400 mx-auto mb-4" />
            <p className="text-stone-700 text-base italic leading-relaxed mb-4">"We bill over ₹2 crore a month across four counters, with every scheme applied automatically. No more chasing distributors for cashback."</p>
            <div className="text-stone-900 font-medium text-sm">Mohammed Iqbal</div>
            <div className="text-bronze-600 text-xs uppercase tracking-widest">Electronics Retailer, 4 Counters</div>
          </motion.div>
        </div>
      </Section>

      {/* Subscription packs */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-3">Subscription Packs</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 mb-4">Pick Your Pack.</h2>
            <p className="text-stone-500 max-w-xl mx-auto">Every pack ships with the full feature set for that tier — see the complete breakdown on our <Link to="/pricing" className="text-bronze-600 underline hover:text-bronze-700">pricing page</Link>.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`p-6 flex flex-col relative ${plan.highlight ? 'border-2 border-bronze-400' : ''} ${tileClass}`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-bronze-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <plan.icon size={20} className="text-bronze-600 mb-3" />
                <h3 className="text-stone-900 font-medium text-base mb-1">{plan.name}</h3>
                <p className="text-stone-500 text-xs mb-4">{plan.desc}</p>
                <div className="mb-5">
                  <span className="text-2xl font-bold text-stone-900">{plan.price}</span>
                  <span className="text-stone-500 text-xs ml-1">{plan.period}</span>
                </div>
                <Link to="/pricing" className="mt-auto block text-center py-2.5 rounded text-xs font-medium uppercase tracking-wider bg-stone-900 text-white hover:bg-bronze-600 transition-colors">
                  See Plan Details
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <FAQSection
        faqs={retailerOSFAQs}
        title="RetailerOS — Frequently Asked Questions"
        subtitle="Common questions about our retail management platform for telecom and electronics retailers."
      />

      {/* CTA — single light bento tile */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className={`p-8 sm:p-12 text-center ${creamTileClass}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 mb-4">Ready to Run Your Shop <span className="bronze-gradient-text">on One Screen?</span></h2>
            <p className="text-stone-600 mb-8 max-w-xl mx-auto">Whether it's one counter or fifty, RetailerOS scales with you.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-bronze-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-700 transition-colors rounded group">
                Schedule a Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="https://retaileros.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 border border-stone-300 text-stone-700 text-sm font-medium uppercase tracking-wider hover:border-bronze-400 transition-colors rounded group">
                Visit RetailerOS.in <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </Section>

      <Contact />
    </div>
  );
};
