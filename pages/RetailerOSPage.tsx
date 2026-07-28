import React from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Check, ExternalLink, BarChart3, Package, Receipt, Wallet, Percent, Wrench, MessageCircle, Quote, Star } from 'lucide-react';
import { FAQSection } from '../components/FAQSection';
import { retailerOSFAQs } from '../components/StructuredData';

const dayOneImpact = [
  { value: "11 hrs", label: "Saved Weekly", desc: "on counter reconciliation and manual IMEI matching" },
  { value: "0.4s", label: "Bill to WhatsApp", desc: "from print to the customer's phone, automatically" },
  { value: "97%", label: "Fewer IMEI Mismatches", desc: "at stock audits, versus manual tracking" },
  { value: "3 hrs", label: "Earlier Closing", desc: "6 PM close instead of 9 PM, most nights" },
];

const modules = [
  {
    image: "/images/Retailerosimg/inventory.png",
    icon: Package,
    title: "Inventory",
    desc: "Live IMEI ledger. Every phone tracked from scan to sale, across every store.",
  },
  {
    image: "/images/Retailerosimg/khaata.png",
    icon: Wallet,
    title: "Khaata",
    desc: "From notebook to system. Partial payments, reminders, and a full audit trail — khaata that doesn't break.",
  },
  {
    image: "/images/Retailerosimg/billing.png",
    icon: Receipt,
    title: "Billing",
    desc: "Scan, sell, print thermal, send on WhatsApp. GST and IMEI captured automatically on every bill.",
  },
  {
    image: "/images/Retailerosimg/Reports.png",
    icon: BarChart3,
    title: "Schemes, Service & Reports",
    desc: "Brand cashback applied automatically at billing, repair status sent on WhatsApp, and daily sales, stock, and profit reports — without spreadsheets.",
  },
];

const moduleCategories = [
  { n: "01", name: "Selling", items: ["Sales Desk", "Schemes", "Pricing", "Invoices"] },
  { n: "02", name: "Inventory", items: ["Inventory", "IMEI Tracker", "Purchase Orders", "Stores"] },
  { n: "03", name: "Customers", items: ["Clients (CRM)", "Marketing", "Help / Inquiries"] },
  { n: "04", name: "Service", items: ["Repairs", "Claims"] },
  { n: "05", name: "Operations", items: ["Cash Register", "Expenses", "Staff"] },
  { n: "06", name: "Finance", items: ["Finance", "Reports"] },
  { n: "07", name: "Platform", items: ["Onboarding", "Launcher", "Settings", "Integrations", "Marketplace"] },
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

const connectedSteps = [
  { icon: Package, label: "Inventory", desc: "IMEI marked sold instantly" },
  { icon: Percent, label: "Schemes", desc: "Brand cashback queued automatically" },
  { icon: Wallet, label: "Khaata", desc: "Customer ledger updated in real time" },
  { icon: MessageCircle, label: "WhatsApp", desc: "Receipt delivered in 0.4 seconds" },
  { icon: BarChart3, label: "Reports", desc: "Daily numbers updated — billed amount, bill count, week-on-week trend" },
];

const testimonials = [
  {
    quote: "We saved 11 hours every week that used to go into manually matching IMEI numbers against paper stock registers.",
    author: "Suresh Patel",
    role: "Mobile Retailer, 2 Counters",
  },
  {
    quote: "Every WhatsApp receipt has gone through for 9 months straight — 100% delivered, zero complaints from customers waiting on a bill.",
    author: "Rakesh Verma",
    role: "Mobile Retailer, 1 Counter",
  },
  {
    quote: "We now bill over ₹2 crore a month across four counters, with every brand scheme applied automatically. No more chasing distributors for cashback.",
    author: "Mohammed Iqbal",
    role: "Electronics Retailer, 4 Counters",
  },
];

export const RetailerOSPage: React.FC = () => {
  return (
    <div>
      <PageHero
        backLink={{ label: "All Products", href: "/products" }}
        label="RetailerOS"
        title={<>The Operating System for <span className="bronze-gradient-text">Your Retail Counter</span></>}
        subtitle="Billing, inventory, schemes, repairs, customer credit, and WhatsApp receipts — one system that quietly runs everything behind the counter. Built for mobile phone retailers, consumer electronics stores, and telecom distributors."
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

      {/* GEO: Entity definition block — quotable by AI search engines */}
      <Section className="bg-white border-b border-stone-100">
        <div className="max-w-3xl mx-auto text-center" data-speakable="true">
          <p className="text-lg sm:text-xl text-stone-700 leading-relaxed">
            <strong>RetailerOS</strong> is a retail management platform by Khosha Systems, built specifically for Indian telecom retailers, mobile phone shops, and consumer electronics stores. It combines IMEI-level inventory tracking, automated brand scheme management, GST-compliant billing, and multi-store synchronization into a single cloud-native system — serving retailers across India since 2024.
          </p>
        </div>
      </Section>

      {/* Day One Impact */}
      <Section className="bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-3">Day One Impact</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900">What Changes on <span className="bronze-gradient-text">Day One</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {dayOneImpact.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-6 sm:p-8 bg-stone-50 rounded-lg border border-stone-200">
                <div className="text-3xl sm:text-4xl font-bold text-stone-900 mb-2">{stat.value}</div>
                <div className="text-bronze-600 font-medium text-xs sm:text-sm uppercase tracking-wider mb-2">{stat.label}</div>
                <p className="text-stone-400 text-xs sm:text-sm">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Product in Action */}
      <Section className="bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 pattern-diagonal z-0 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-bronze-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center relative z-10">
          <div>
            <span className="text-bronze-400 font-semibold tracking-widest uppercase text-sm block mb-3">See It Live</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white mb-4">One Login. <span className="bronze-gradient-text">Your Whole Shop.</span></h2>
            <p className="text-white/60 mb-8 leading-relaxed">The counter view your staff actually uses — one screen carries the whole transaction, from scan to scheme payout.</p>
            <div className="space-y-3">
              {[
                "Live billing ticket updates as items are scanned",
                "IMEI auto-captured per line item — no manual entry",
                "Brand scheme cashback applied automatically at checkout",
                "GST breakdown (CGST/SGST) calculated in real time",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <Check size={16} className="text-bronze-400 mt-0.5 shrink-0" />
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden glow-bronze">
            <img src="/images/retaileros-hero-mockup.png" alt="RetailerOS billing dashboard shown on a laptop and phone" className="w-full h-auto" loading="lazy" />
          </motion.div>
        </div>
      </Section>

      {/* Modules — visual showcase */}
      <Section className="bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-3">The Modules</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 mb-4">Six Modules. <span className="bronze-gradient-text">One Counter.</span></h2>
            <p className="text-stone-500 max-w-2xl mx-auto">From the first scan to the last WhatsApp receipt — everything runs through one system.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {modules.map((mod, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white border border-stone-200 rounded-lg overflow-hidden hover:border-bronze-300 hover:shadow-sm transition-all">
                <img src={mod.image} alt={`RetailerOS ${mod.title} screen`} className="w-full h-auto" loading="lazy" />
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <mod.icon size={18} className="text-bronze-500" />
                    <h3 className="text-stone-900 font-medium text-base">{mod.title}</h3>
                  </div>
                  <p className="text-stone-500 text-sm leading-relaxed">{mod.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* 23 Modules across 7 categories */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-3">Full Platform</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 mb-4">23 Modules Across <span className="bronze-gradient-text">Every Function</span></h2>
            <p className="text-stone-500 max-w-2xl mx-auto">Not just billing — the entire back-of-shop, connected.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {moduleCategories.map((cat, i) => (
              <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="p-5 bg-stone-50 border border-stone-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-bronze-400 font-serif font-bold text-sm">{cat.n}</span>
                  <h3 className="text-stone-900 font-medium text-sm">{cat.name}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <span key={item} className="text-[11px] text-stone-600 bg-white border border-stone-200 rounded-full px-2.5 py-1">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section className="bg-stone-50">
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
            <picture>
              <source srcSet="/images/retaileros-inline.webp" type="image/webp" />
              <img src="/images/retaileros-inline.png" alt="RetailerOS inventory management dashboard" className="w-full h-full object-cover" loading="lazy" />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <ShoppingCart size={24} className="mb-1 text-bronze-400" />
              <div className="text-[11px] uppercase tracking-widest text-white/70">RetailerOS Dashboard</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Connected Systems */}
      <Section className="bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 pattern-diagonal z-0 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-bronze-400 font-semibold tracking-widest uppercase text-sm block mb-3">Connected By Default</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white mb-4">One Bill. <span className="bronze-gradient-text">Every System Updated.</span></h2>
            <p className="text-white/60 max-w-xl mx-auto">No double-entry. Ever. Here's what happens the moment your staff prints one receipt.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {connectedSteps.map((step, i) => (
              <motion.div key={step.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-5 bg-white/5 border border-white/10 rounded-lg glow-bronze">
                <step.icon size={20} className="text-bronze-400 mb-3" />
                <h3 className="text-white font-medium text-sm mb-1">{step.label}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Comparison */}
      <Section className="bg-white">
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

      {/* Testimonials */}
      <Section className="bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-3">From the Counter</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900">What <span className="bronze-gradient-text">Retailers</span> Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white p-6 sm:p-7 border border-stone-200 hover:border-bronze-300 transition-all rounded-lg relative glow-bronze">
                <Quote size={24} className="text-bronze-200 absolute top-4 right-4" />
                <div className="flex gap-1 text-bronze-500 mb-4">
                  {[...Array(5)].map((_, si) => <Star key={si} size={13} fill="currentColor" />)}
                </div>
                <p className="text-stone-600 mb-5 leading-relaxed text-sm italic">"{t.quote}"</p>
                <div className="border-t border-stone-100 pt-4">
                  <div className="text-stone-900 font-serif text-sm font-medium">{t.author}</div>
                  <div className="text-[11px] text-bronze-600 uppercase tracking-widest">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Explore More */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-800 mb-8 text-center">Explore RetailerOS</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Pricing', desc: 'Plans from ₹1,999/store/month', href: '/pricing' },
              { label: 'Features', desc: 'Detailed feature walkthroughs', href: '/features' },
              { label: 'Use Cases', desc: 'Real results from retailers', href: '/use-cases' },
              { label: 'Getting Started', desc: 'Go live in 48 hours', href: '/getting-started' },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="bg-white border border-stone-200 rounded-lg p-5 hover:border-bronze-400 hover:shadow-sm transition-all group"
              >
                <h3 className="font-medium text-stone-800 text-sm mb-1 group-hover:text-bronze-600 transition-colors flex items-center gap-1">
                  {link.label} <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-stone-500 text-xs">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Also from Khosha */}
      <Section className="bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-800 mb-8 text-center">Also from Khoshà Systems</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Real Estate CRM', desc: 'Lead management for developers & brokers', href: '/products/real-estate-crm' },
              { label: 'Visitor Management', desc: 'Digital check-in for offices & sites', href: '/products/visitor-management' },
              { label: 'Success Stories', desc: 'Results from retailers across India', href: '/success-stories' },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="bg-white border border-stone-200 rounded-lg p-5 hover:border-bronze-400 hover:shadow-sm transition-all group"
              >
                <h3 className="font-medium text-stone-800 text-sm mb-1 group-hover:text-bronze-600 transition-colors flex items-center gap-1">
                  {link.label} <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-stone-500 text-xs">{link.desc}</p>
              </Link>
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

      {/* Related Resources for internal linking */}
      <Section className="bg-stone-50 border-t border-stone-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-stone-900 mb-6">Learn More</h2>
          <ul className="space-y-3">
            <li><Link to="/blog/retail-management-software-telecom-electronics-india" className="text-amber-700 hover:text-amber-800 underline">Why Telecom & Electronics Retailers Need Purpose-Built Software</Link></li>
            <li><Link to="/blog/how-to-choose-retail-management-software" className="text-amber-700 hover:text-amber-800 underline">How to Choose Retail Management Software: Complete Guide</Link></li>
            <li><Link to="/blog/scheme-management-simple-telecom-retailers" className="text-amber-700 hover:text-amber-800 underline">Scheme Management Made Simple for Telecom Retailers</Link></li>
            <li><Link to="/blog/imei-tracking-reduces-shrinkage-telecom-retail" className="text-amber-700 hover:text-amber-800 underline">How IMEI Tracking Reduces Shrinkage in Telecom Retail</Link></li>
            <li><Link to="/compare/retaileros-vs-shopify" className="text-amber-700 hover:text-amber-800 underline">RetailerOS vs Shopify POS</Link></li>
            <li><Link to="/compare/retaileros-vs-square" className="text-amber-700 hover:text-amber-800 underline">RetailerOS vs Square POS</Link></li>
          </ul>
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
