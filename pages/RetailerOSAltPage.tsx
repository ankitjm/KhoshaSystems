import React from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ExternalLink, Store, BarChart3, Shield, Smartphone, Radio, ShoppingBag, Quote } from 'lucide-react';
import { FAQSection } from '../components/FAQSection';
import { retailerOSFAQs } from '../components/StructuredData';

const trustChips = [
  "1,000+ retailers trust RetailerOS",
  "4.8/5 average rating",
  "GST-compliant on every plan",
];

const dataPoints = [
  { value: "<0.5%", label: "Inventory Shrinkage", desc: "down from the industry-typical 3–5%" },
  { value: "85–95%", label: "Scheme Recovery Rate", desc: "of brand cashback actually claimed, not lost to paperwork" },
  { value: "1–2 hrs", label: "GST Compliance / Week", desc: "down from 8–10 hours of manual reconciliation" },
  { value: "2–3 min", label: "Billing Speed", desc: "per sale, down from 5–7 minutes with legacy tools" },
];

const plans = [
  {
    icon: Store,
    name: "General Trade",
    price: "₹1,999",
    period: "/store/month",
    desc: "For independent retailers and single-store operators",
    features: ["IMEI & serial number tracking", "GST-compliant invoicing", "Brand scheme auto-loading", "Exchange & buyback workflows"],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    icon: BarChart3,
    name: "Multi-Store Chain",
    price: "₹2,999",
    period: "/store/month",
    desc: "For retail chains with 2+ locations",
    features: ["Everything in General Trade", "Multi-store inventory sync", "AI-powered demand forecasting", "API access & dedicated manager"],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    icon: Shield,
    name: "Enterprise",
    price: "Custom",
    period: "volume pricing",
    desc: "For chains with 15+ stores",
    features: ["Everything in Multi-Store", "Dedicated onboarding", "SLA with guaranteed uptime", "On-site training available"],
    cta: "Talk to Sales",
    highlight: false,
  },
];

const personas = [
  { icon: Smartphone, label: "Mobile Phone Shops", desc: "IMEI capture at billing, warranty tracking, and trade-in schemes handled without a second system." },
  { icon: ShoppingBag, label: "Electronics Stores", desc: "Multi-brand inventory, serial-level stock, and margin analysis across every category you carry." },
  { icon: Radio, label: "Telecom Distributors", desc: "Sell-through visibility for brand partners, scheme utilization tracking, and multi-store rollups." },
];

const replaces = [
  "The notebook and the khaata ledger",
  "Excel sheets for scheme and stock tracking",
  "Three or four disconnected apps at the counter",
];

const moduleCategories = [
  { n: "01", name: "Selling", items: ["Sales Desk", "Schemes", "Pricing", "Invoices"] },
  { n: "02", name: "Inventory", items: ["Inventory", "IMEI Tracker", "Purchase Orders", "Stores"] },
  { n: "03", name: "Customers", items: ["Clients (CRM)", "Marketing", "Help / Inquiries"] },
  { n: "04", name: "Service", items: ["Repairs", "Claims"] },
  { n: "05", name: "Operations", items: ["Cash Register", "Expenses", "Staff"] },
  { n: "06", name: "Finance", items: ["Finance", "Reports"] },
  { n: "07", name: "Platform", items: ["Auth / Onboarding", "Launcher", "Settings", "Integrations", "Marketplace"] },
];

const moduleShowcase = [
  {
    image: "/images/Retailerosimg/billing.png",
    title: "Billing",
    desc: "Scan, sell, print thermal, send on WhatsApp. GST and IMEI captured automatically on every bill — most sales close in under a minute.",
  },
  {
    image: "/images/Retailerosimg/inventory.png",
    title: "Inventory",
    desc: "Live IMEI ledger. Every phone tracked from scan to sale, across every store, with low-stock alerts before you run out.",
  },
  {
    image: "/images/Retailerosimg/khaata.png",
    title: "Khaata",
    desc: "From notebook to system. Partial payments, reminders, and a full audit trail — khaata that doesn't break at month-end.",
  },
  {
    image: "/images/Retailerosimg/Reports.png",
    title: "Schemes, Service & Reports",
    desc: "Brand cashback applied automatically, repair status sent on WhatsApp, and daily sales/stock/profit numbers — without spreadsheets.",
  },
];

export const RetailerOSAltPage: React.FC = () => {
  return (
    <div>
      <PageHero
        backLink={{ label: "All Products", href: "/products" }}
        label="RetailerOS"
        title={<>One Shop. One Price. <span className="bronze-gradient-text">Every Feature.</span></>}
        subtitle="No feature gates, no surprise add-ons. RetailerOS gives every plan the full toolkit — billing, IMEI tracking, schemes, khaata, and reports — priced by store, not by feature."
        backgroundImage="/images/retaileros-page-hero.jpg"
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-bronze-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-500 transition-colors rounded group">
            Start Free Trial <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="https://retaileros.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white text-sm font-medium uppercase tracking-wider hover:bg-white/10 transition-colors rounded group">
            Visit RetailerOS.in <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </PageHero>

      {/* Trust bar — cream tint, no dark section */}
      <div className="bg-[#FAF6F1] border-b border-[#E0CCAD]/40 py-4 px-5 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-2">
          {trustChips.map((chip) => (
            <span key={chip} className="text-xs sm:text-sm text-stone-600 font-medium">{chip}</span>
          ))}
        </div>
      </div>

      {/* What is RetailerOS — product explainer before any stats or pricing */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-3">What Is RetailerOS</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 mb-4">The System Behind <span className="bronze-gradient-text">the Counter.</span></h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              RetailerOS is a cloud-based retail management platform built for India's mobile phone shops, consumer electronics stores, and telecom distributors. It runs in the browser on any device — no special hardware, no on-premise server.
            </p>
            <p className="text-stone-500 leading-relaxed text-sm">
              Billing, IMEI-level inventory, brand scheme tracking, customer credit (khaata), repair status, and daily reports all live in one login — updated in real time, across every store you run.
            </p>
          </div>
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-6 lg:p-8">
            <h3 className="text-stone-900 font-medium text-sm uppercase tracking-wider mb-4">What It Replaces</h3>
            <div className="space-y-3">
              {replaces.map((item) => (
                <div key={item} className="flex items-center gap-3 text-stone-500 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-300 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-5 pt-5 border-t border-stone-200 text-bronze-700 font-medium text-sm">
              <ArrowRight size={16} /> One system, one login, one bill.
            </div>
          </div>
        </div>
      </Section>

      {/* Data Points — real ROI numbers before any pitch for money */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-3">What The Numbers Say</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900">Results, <span className="bronze-gradient-text">Not Promises.</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {dataPoints.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-6 sm:p-8 bg-stone-50 rounded-lg border border-stone-200">
                <div className="text-3xl sm:text-4xl font-bold text-stone-900 mb-2">{stat.value}</div>
                <div className="text-bronze-600 font-medium text-xs sm:text-sm uppercase tracking-wider mb-2">{stat.label}</div>
                <p className="text-stone-400 text-xs sm:text-sm">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Built for who you are — persona segments */}
      <Section className="bg-[#FAF6F1]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-3">Built For</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900">Whichever Counter <span className="bronze-gradient-text">You Run.</span></h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {personas.map((p, i) => (
              <motion.div key={p.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-lg border border-[#E0CCAD]/60 p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-bronze-50 border border-bronze-200 flex items-center justify-center mx-auto mb-4">
                  <p.icon size={22} className="text-bronze-600" />
                </div>
                <h3 className="text-stone-900 font-medium mb-2">{p.label}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Modules — alternating zig-zag showcase of daily-use modules */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 sm:mb-16">
            <span className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-3">Inside RetailerOS</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 mb-4">The Modules You'll <span className="bronze-gradient-text">Use Every Day.</span></h2>
            <p className="text-stone-500 max-w-2xl mx-auto">The counter-facing core — everything else runs quietly behind it.</p>
          </div>
          <div className="space-y-16 sm:space-y-20">
            {moduleShowcase.map((mod, i) => (
              <motion.div key={mod.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
                <div className={`rounded-lg overflow-hidden border border-stone-200 ${i % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                  <img src={mod.image} alt={`RetailerOS ${mod.title} screen`} className="w-full h-auto" loading="lazy" />
                </div>
                <div className={i % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                  <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 mb-3">{mod.title}</h3>
                  <p className="text-stone-500 text-base leading-relaxed">{mod.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Full 23-module directory — everything behind the daily-use core */}
      <Section className="bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-3">The Full Platform</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 mb-4">23 Modules, <span className="bronze-gradient-text">Seven Categories.</span></h2>
            <p className="text-stone-500 max-w-2xl mx-auto">Verified against retaileros.in — the complete system beyond the counter.</p>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
              {moduleCategories.map((cat) => (
                <div key={cat.name}>
                  <div className="flex items-baseline gap-2 mb-3 pb-2 border-b border-stone-100">
                    <span className="text-bronze-400 font-serif font-bold text-xs">{cat.n}</span>
                    <h3 className="text-stone-900 font-medium text-sm uppercase tracking-wider">{cat.name}</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {cat.items.map((item) => (
                      <li key={item} className="text-stone-500 text-sm">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Single pull-quote testimonial */}
      <Section className="bg-[#F0E6D6]/40">
        <div className="max-w-3xl mx-auto text-center">
          <Quote size={32} className="text-bronze-400 mx-auto mb-6" />
          <p className="text-xl sm:text-2xl font-serif text-stone-800 leading-relaxed mb-6">
            "We now bill over ₹2 crore a month across four counters, with every brand scheme applied automatically. No more chasing distributors for cashback."
          </p>
          <div className="text-stone-900 font-medium">Mohammed Iqbal</div>
          <div className="text-bronze-600 text-sm uppercase tracking-widest">Electronics Retailer, 4 Counters</div>
        </div>
      </Section>

      {/* Subscription Packs — after the case has been made */}
      <Section className="bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-3">Subscription Packs</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 mb-4">Pick Your Pack. <span className="bronze-gradient-text">Nothing Held Back.</span></h2>
            <p className="text-stone-500 max-w-2xl mx-auto">Every pack ships with the full feature set for that tier — see the complete breakdown on our <Link to="/pricing" className="text-bronze-600 underline hover:text-bronze-700">pricing page</Link>.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`rounded-lg p-6 lg:p-8 flex flex-col relative ${plan.highlight ? 'bg-white border-2 border-bronze-500' : 'bg-stone-50 border border-stone-200'}`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-bronze-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <plan.icon size={22} className="text-bronze-600 mb-3" />
                <h3 className="text-lg font-serif font-bold text-stone-900 mb-1">{plan.name}</h3>
                <p className="text-xs text-stone-500 mb-4">{plan.desc}</p>
                <div className="mb-5">
                  <span className="text-2xl font-bold text-stone-900">{plan.price}</span>
                  <span className="text-stone-500 text-xs ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs sm:text-sm text-stone-600">
                      <Check size={14} className="text-bronze-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/pricing" className={`block text-center py-2.5 rounded text-xs sm:text-sm font-medium uppercase tracking-wider transition-colors ${plan.highlight ? 'bg-bronze-600 text-white hover:bg-bronze-700' : 'bg-stone-900 text-white hover:bg-bronze-600'}`}>
                  {plan.cta}
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

      {/* CTA — light, not dark */}
      <Section className="bg-bronze-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Ready to Pick Your Pack?</h2>
          <p className="text-stone-600 mb-8">Start free for 14 days — no credit card required. Most stores go live in under 48 hours.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-bronze-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-700 transition-colors rounded group">
              Start Free Trial <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/pricing" className="inline-flex items-center gap-2 px-8 py-4 border border-stone-300 text-stone-700 text-sm font-medium uppercase tracking-wider hover:border-bronze-400 transition-colors rounded group">
              See Full Pricing <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </Section>

      <Contact />
    </div>
  );
};
