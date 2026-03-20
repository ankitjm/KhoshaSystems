import React, { useState } from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronDown,
  Rocket,
  HelpCircle,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  CreditCard,
  Settings,
  Smartphone,
  FileText,
  MessageCircle,
  Shield,
} from 'lucide-react';

/* ---------- Getting Started Steps ---------- */
const gettingStartedSteps = [
  {
    step: 1,
    title: 'Create Your Account',
    time: '10–15 minutes',
    description:
      'Sign up at retaileros.in with your mobile number or email. Add your business name, address, and GST number — RetailerOS auto-pulls your GST details to save time. Add all your store locations from day one.',
    tip: 'Keep your GST certificate handy. It makes this step faster.',
  },
  {
    step: 2,
    title: 'Import Your Data',
    time: '15–30 minutes',
    description:
      'Upload your existing inventory via CSV or Excel — including bulk IMEI imports. Bring in your customer list and supplier details. Moving from another software? Our team handles the migration for you.',
    tip: 'Even a handwritten register photo works. Share what you have and we handle the rest.',
  },
  {
    step: 3,
    title: 'Configure Billing & Inventory',
    time: '20–30 minutes',
    description:
      'Verify your GSTIN, select HSN codes (pre-loaded for telecom and electronics), choose an invoice template with your logo, and enable payment methods. Then scan IMEIs and organize products by brand and category.',
    tip: 'Start with your best-selling products. You can always add more items later.',
  },
  {
    step: 4,
    title: 'Add Your Team',
    time: '10 minutes',
    description:
      'Invite staff by mobile number or email. Assign roles — sales staff, store manager, or owner — each with appropriate permissions. Have each team member do one practice billing transaction to get comfortable.',
    tip: 'Our support team can do a free 15-minute training call with your staff.',
  },
  {
    step: 5,
    title: 'Go Live',
    time: '5 minutes for your first sale',
    description:
      'Open the billing screen, scan or search the product, add the customer, apply schemes or discounts, select payment method, and generate your first invoice. Share it via print, WhatsApp, or SMS.',
    tip: 'Keep your old billing method available for the first day, just in case. By day two, you will not need it.',
  },
];

/* ---------- FAQ Entries ---------- */
const faqEntries = [
  {
    question: 'How much does RetailerOS cost?',
    answer:
      'RetailerOS offers transparent SaaS pricing designed for Indian retailers — from single-store owners to multi-city chains. Contact us for current pricing or start with a 14-day free trial. No credit card required.',
  },
  {
    question: 'How long does it take to set up?',
    answer:
      'Most stores go live within 48 hours. RetailerOS is cloud-native — no hardware installation, no on-premise servers. Our onboarding team handles data migration from your existing software, Excel sheets, or even paper records.',
  },
  {
    question: 'Can I migrate from my current billing software?',
    answer:
      'Yes. We provide assisted migration from Tally, Marg, Busy, Excel, and most other billing software. Our team handles inventory, customer data, supplier lists, and historical records. Zero data loss, minimal disruption.',
  },
  {
    question: 'Does RetailerOS work on my phone?',
    answer:
      'Yes. RetailerOS works on any modern browser — phone, tablet, or desktop. Bookmark it on your home screen for quick access. The mobile experience is fully functional for checking sales, stock, and alerts on the go.',
  },
  {
    question: 'What integrations does RetailerOS support?',
    answer:
      'RetailerOS integrates with barcode scanners, electronic weighing scales, thermal receipt printers, and UPI payment systems. Brand scheme data from Samsung, Vivo, Oppo, Xiaomi, and other brands is loaded automatically.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes. RetailerOS uses industry-standard encryption, regular automated backups, and role-based access controls. Your data is stored securely in the cloud with 99.9% uptime. Only authorized users can access your store information.',
  },
  {
    question: 'Can I use RetailerOS for multiple stores?',
    answer:
      'Yes. RetailerOS supports multi-store operations with serial-level inventory tracking across locations, inter-store transfer management, centralized analytics, and role-based access for store managers and staff.',
  },
  {
    question: 'What support do you offer?',
    answer:
      'WhatsApp support (fastest), phone, email, and live chat inside the app. We typically respond within 15 minutes during business hours. New customers get a dedicated onboarding manager for the first 7 days.',
  },
  {
    question: 'Is RetailerOS GST-compliant?',
    answer:
      'Fully compliant — HSN code support, proper CGST/SGST breakdowns, reverse charge handling, return/credit note workflows, and e-invoice readiness. Built for Indian tax requirements from the ground up.',
  },
  {
    question: 'What happens if my internet goes down?',
    answer:
      'RetailerOS is designed to handle intermittent connectivity. Critical billing functions continue to work, and data syncs automatically when the connection is restored. Your business does not stop because of a network hiccup.',
  },
];

/* ---------- Feature Guides ---------- */
const featureGuides = [
  {
    icon: ShoppingCart,
    title: 'Point of Sale (POS)',
    description:
      'Fast scan-to-bill checkout with IMEI capture, auto scheme application, GST-compliant invoicing, and multiple payment mode support. Handle 200+ transactions daily without slowdowns.',
    features: ['Barcode & IMEI scanning', 'Auto GST calculation', 'Multi-payment support', 'WhatsApp invoice sharing'],
  },
  {
    icon: Package,
    title: 'Inventory Management',
    description:
      'Track every item from purchase to sale — by IMEI, serial number, batch, or SKU. Real-time stock levels across all locations with automated reorder alerts and inter-store transfer management.',
    features: ['IMEI-level tracking', 'Multi-store sync', 'Expiry & batch tracking', 'Smart reorder alerts'],
  },
  {
    icon: CreditCard,
    title: 'Scheme Management',
    description:
      'Automatically track active brand schemes from Samsung, Vivo, Oppo, Xiaomi, and more. Auto-apply eligible offers at billing, log claims, and get alerts before schemes expire.',
    features: ['Auto scheme detection', 'Claim tracking dashboard', 'Expiry alerts', 'Payout reconciliation'],
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description:
      'Real-time dashboards for sales, inventory, margins, and staff performance. Drill down by store, brand, category, or time period. Export reports for your accountant in one click.',
    features: ['Sales & margin analytics', 'Brand-wise performance', 'Staff tracking', 'Custom report exports'],
  },
  {
    icon: Users,
    title: 'CRM & Customer Management',
    description:
      'Build customer profiles with purchase history, warranty records, and communication preferences. Send WhatsApp notifications for new arrivals, offers, and warranty reminders.',
    features: ['Customer purchase history', 'Warranty tracking', 'WhatsApp notifications', 'Loyalty tracking'],
  },
  {
    icon: Settings,
    title: 'Multi-Store Operations',
    description:
      'Manage all your locations from one dashboard. Track inventory, sales, and staff across stores. Handle inter-store transfers with approval workflows and complete audit trails.',
    features: ['Centralized dashboard', 'Inter-store transfers', 'Role-based access', 'Per-store analytics'],
  },
];

/* ---------- Support Channels ---------- */
const supportChannels = [
  { icon: MessageCircle, channel: 'WhatsApp', detail: 'Message us anytime — fastest response' },
  { icon: Smartphone, channel: 'Phone', detail: 'Call our support line during business hours' },
  { icon: FileText, channel: 'Email', detail: 'Write to support@retaileros.in' },
  { icon: Shield, channel: 'Live Chat', detail: 'Click the chat icon inside RetailerOS' },
];

/* ---------- Collapsible FAQ Item ---------- */
const FAQItem: React.FC<{
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}> = ({ faq, isOpen, onToggle }) => (
  <div className="border border-stone-200 rounded-lg bg-white overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-5 text-left hover:bg-stone-50 transition-colors"
    >
      <span className="text-stone-900 font-medium text-sm sm:text-base pr-4">{faq.question}</span>
      <ChevronDown
        size={18}
        className={`text-stone-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-5 pb-5 text-stone-500 text-sm leading-relaxed border-t border-stone-100 pt-4">
            {faq.answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/* ---------- Page Component ---------- */
export const KnowledgeBasePage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div>
      <PageHero
        backLink={{ label: 'RetailerOS', href: '/products/retaileros' }}
        label="Knowledge Base"
        title={
          <>
            RetailerOS <span className="bronze-gradient-text">Help Center</span>
          </>
        }
        subtitle="Everything you need to get started, troubleshoot issues, and make the most of RetailerOS. From onboarding to advanced features — we have got you covered."
        backgroundImage="/images/retaileros-page-hero.jpg"
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="#getting-started"
            className="inline-flex items-center gap-2 px-8 py-4 bg-bronze-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-500 transition-colors rounded group"
          >
            Getting Started{' '}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#faq"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white text-sm font-medium uppercase tracking-wider hover:bg-white/10 transition-colors rounded group"
          >
            View FAQ{' '}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </PageHero>

      {/* Quick Links */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Rocket, label: 'Getting Started', desc: '5-step onboarding guide', href: '#getting-started' },
              { icon: HelpCircle, label: 'FAQ', desc: 'Top 10 questions answered', href: '#faq' },
              { icon: Package, label: 'Feature Guides', desc: 'Module-by-module reference', href: '#features' },
            ].map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-stone-50 border border-stone-200 rounded-lg hover:border-bronze-300 hover:shadow-sm transition-all text-center"
              >
                <link.icon size={24} className="text-bronze-500 mx-auto mb-3" />
                <h3 className="text-stone-900 font-medium text-lg mb-1">{link.label}</h3>
                <p className="text-stone-500 text-sm">{link.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </Section>

      {/* Getting Started */}
      <Section id="getting-started" className="bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">
            Getting Started with RetailerOS
          </h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">
            Most store owners go live in under 48 hours. Follow these 5 steps and you will be billing
            your first customer on RetailerOS.
          </p>
          <div className="space-y-6">
            {gettingStartedSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 sm:gap-6"
              >
                <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-bronze-600 text-white flex items-center justify-center font-bold text-lg">
                  {step.step}
                </div>
                <div className="flex-1 pb-6 border-b border-stone-200 last:border-0">
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <h3 className="text-stone-900 font-medium text-lg">{step.title}</h3>
                    <span className="text-bronze-600 text-xs font-medium uppercase tracking-wider">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-stone-500 text-sm leading-relaxed mb-2">{step.description}</p>
                  <p className="text-stone-500 text-xs italic">Tip: {step.tip}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">
            Quick answers to the most common questions about RetailerOS.
          </p>
          <div className="space-y-3">
            {faqEntries.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openFAQ === i}
                onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Feature Guides */}
      <Section id="features" className="bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">
            Feature Guides
          </h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">
            Quick-reference guides for every core module in RetailerOS.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureGuides.map((guide, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="p-6 sm:p-8 bg-white border border-stone-200 rounded-lg hover:border-bronze-300 hover:shadow-sm transition-all"
              >
                <guide.icon size={24} className="text-bronze-500 mb-4" />
                <h3 className="text-stone-900 font-medium text-lg mb-2">{guide.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">{guide.description}</p>
                <ul className="space-y-1.5">
                  {guide.features.map((feat, j) => (
                    <li key={j} className="text-stone-500 text-xs flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-bronze-400 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Support */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">
            Need Help? We Are Here.
          </h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">
            We typically respond within 15 minutes during business hours. New customers get a
            dedicated onboarding manager for the first 7 days.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportChannels.map((ch, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 bg-stone-50 border border-stone-200 rounded-lg text-center"
              >
                <ch.icon size={24} className="text-bronze-500 mx-auto mb-3" />
                <h3 className="text-stone-900 font-medium text-sm mb-1">{ch.channel}</h3>
                <p className="text-stone-500 text-xs">{ch.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-stone-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-stone-500 mb-8">
            Start your 14-day free trial today. No credit card required. Go live in under 48 hours.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded group"
            >
              Schedule a Demo{' '}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/products/retaileros"
              className="inline-flex items-center gap-2 px-8 py-4 border border-stone-300 text-stone-700 text-sm font-medium uppercase tracking-wider hover:border-bronze-400 transition-colors rounded group"
            >
              Explore RetailerOS{' '}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </Section>

      <Contact />
    </div>
  );
};
