import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import {
  Check,
  X,
  ArrowRight,
  Shield,
  Zap,
  Store,
  BarChart3,
  Smartphone,
  Quote,
} from 'lucide-react';

interface PlanFeature {
  name: string;
  general: boolean | string;
  multiStore: boolean | string;
}

const features: PlanFeature[] = [
  { name: 'IMEI & serial number tracking', general: true, multiStore: true },
  { name: 'Barcode/QR scanning', general: true, multiStore: true },
  { name: 'Camera IMEI capture', general: true, multiStore: true },
  { name: 'Low-stock alerts', general: true, multiStore: true },
  { name: 'Exchange & buyback workflows', general: true, multiStore: true },
  { name: 'Warranty registration', general: true, multiStore: true },
  { name: 'Inter-store transfers with serial tracking', general: false, multiStore: true },
  { name: 'Stock rebalancing recommendations', general: false, multiStore: true },
  { name: 'Slow-moving SKU alerts', general: false, multiStore: true },
  { name: 'GST-compliant invoicing (HSN codes)', general: true, multiStore: true },
  { name: 'E-invoicing (IRN) generation', general: true, multiStore: true },
  { name: 'Cash, UPI, card, split payments', general: true, multiStore: true },
  { name: 'Auto-load brand schemes', general: true, multiStore: true },
  { name: 'Cashback & payout tracking', general: true, multiStore: true },
  { name: 'Scheme utilization reporting for distributors', general: false, multiStore: true },
  { name: 'Real-time inventory sync across locations', general: false, multiStore: true },
  { name: 'Centralized analytics with per-store drill-down', general: false, multiStore: true },
  { name: 'Role-based access', general: 'Basic', multiStore: 'Advanced' },
  { name: 'Unauthorized discount detection', general: false, multiStore: true },
  { name: 'AI demand forecasting', general: false, multiStore: true },
  { name: 'Smart reorder suggestions', general: false, multiStore: true },
  { name: 'Brand-wise margin analysis', general: 'Basic', multiStore: 'Cross-portfolio' },
  { name: 'Staff performance tracking', general: false, multiStore: true },
  { name: 'API access', general: false, multiStore: true },
  { name: 'Phone + dedicated account manager', general: false, multiStore: true },
];

const testimonials = [
  {
    quote: 'Shrinkage dropped by 92%. We recovered ₹4.7 lakh in brand scheme payouts in 6 months — that\'s 26x what we pay for RetailerOS annually.',
    name: 'Rajesh Reddy',
    title: 'Owner, Digi World Electronics, Hyderabad — 3 Stores',
  },
  {
    quote: 'We claimed ₹1.8 lakh in additional scheme payouts in just 4 months. Zero GST errors. Billing time went from 7 minutes to 2.5 minutes per sale.',
    name: 'Priya Kulkarni',
    title: 'Owner, Mobile Junction, Pune',
  },
  {
    quote: 'Inter-store transfer discrepancies dropped to zero. We saved ₹2.1 lakh in the first quarter through better inventory optimization alone.',
    name: 'Vikram Hegde',
    title: 'Owner, TrendSet Fashion, Bangalore — 5 Stores',
  },
];

const faqs = [
  {
    q: "What's included in the free trial?",
    a: 'Full access to every feature in your chosen plan for 14 days. No credit card required. No feature restrictions. Import your existing inventory, test the billing, try scheme tracking — everything works.',
  },
  {
    q: 'What happens after the trial ends?',
    a: 'Your data is preserved for 30 days. Choose a billing plan to continue, or export your data. No pressure, no auto-charge.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Yes. Upgrade from General Trade to Multi-Store Chain at any time — your data carries over seamlessly.',
  },
  {
    q: 'Is there a setup fee or onboarding cost?',
    a: 'No setup fee. We provide free onboarding assistance including data migration help and a guided walkthrough. Enterprise plans include dedicated onboarding at no extra cost.',
  },
  {
    q: 'How long does setup take?',
    a: 'Most single-store retailers are live within 2 hours. Multi-store chains with existing data typically take 1–2 days for full migration and training.',
  },
  {
    q: 'Can I cancel anytime?',
    a: "Yes. No lock-in contracts. Cancel before your next billing cycle and you won't be charged again. Your data is available for export for 30 days after cancellation.",
  },
  {
    q: 'Is my data secure?',
    a: 'RetailerOS uses bank-grade encryption (AES-256) for data at rest and TLS 1.3 for data in transit. Data is hosted on AWS India (Mumbai region) for data localization compliance.',
  },
  {
    q: 'Do I need special hardware?',
    a: 'No. RetailerOS runs in your browser on any device — desktop, tablet, or phone. Use your existing barcode scanner or phone camera for IMEI capture.',
  },
];

export const PricingPage: React.FC = () => {
  return (
    <>
      <PageHero
        title="Simple, Transparent Pricing"
        subtitle="One platform. Every feature. No hidden charges. Whether you run a single shop or a 50-store chain, RetailerOS gives you the tools to track every IMEI, capture every scheme payout, and bill GST-compliant — all from day one."
        label="RetailerOS Pricing"
        backgroundImage="/images/hero-products.jpg"
      >
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-bronze-600 text-white px-6 py-3 rounded text-sm font-medium hover:bg-bronze-700 transition-colors"
        >
          Start 14-Day Free Trial <ArrowRight size={16} />
        </Link>
      </PageHero>

      {/* Pricing Cards */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* General Trade */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg border border-stone-200 p-6 lg:p-8 flex flex-col"
            >
              <div className="mb-6">
                <Store size={24} className="text-bronze-600 mb-3" />
                <h3 className="text-xl font-serif font-bold text-stone-800 mb-1">General Trade</h3>
                <p className="text-sm text-stone-500">For independent retailers and single-store operators</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold text-stone-900">₹1,999</span>
                <span className="text-stone-500 text-sm">/store/month</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'IMEI & serial number tracking',
                  'GST-compliant invoicing with HSN codes',
                  'E-invoicing (IRN) generation',
                  'Brand scheme auto-loading & tracking',
                  'Inventory management with low-stock alerts',
                  'Cash, UPI, card, and split payments',
                  'Sales dashboards and daily reports',
                  'Exchange and buyback workflows',
                  'Email and chat support',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-stone-600">
                    <Check size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="block text-center bg-stone-900 text-white py-3 rounded text-sm font-medium hover:bg-bronze-600 transition-colors"
              >
                Start Free Trial
              </Link>
            </motion.div>

            {/* Multi-Store Chain */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg border-2 border-bronze-500 p-6 lg:p-8 flex flex-col relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-bronze-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                Most Popular
              </div>
              <div className="mb-6">
                <BarChart3 size={24} className="text-bronze-600 mb-3" />
                <h3 className="text-xl font-serif font-bold text-stone-800 mb-1">Multi-Store Chain</h3>
                <p className="text-sm text-stone-500">For retail chains with 2+ locations</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold text-stone-900">₹2,999</span>
                <span className="text-stone-500 text-sm">/store/month</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Everything in General Trade, plus:',
                  'Multi-store real-time inventory sync',
                  'Inter-store transfer management',
                  'Centralized analytics with per-store drill-down',
                  'Role-based access (owner, manager, staff)',
                  'AI-powered demand forecasting',
                  'Smart reorder suggestions',
                  'Unauthorized discount detection',
                  'Brand & distributor sell-through portal',
                  'API access for custom integrations',
                  'Priority phone + dedicated account manager',
                ].map((f, i) => (
                  <li key={f} className={`flex items-start gap-2 text-sm ${i === 0 ? 'text-bronze-700 font-medium' : 'text-stone-600'}`}>
                    {i > 0 && <Check size={16} className="text-green-600 mt-0.5 flex-shrink-0" />}
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="block text-center bg-bronze-600 text-white py-3 rounded text-sm font-medium hover:bg-bronze-700 transition-colors"
              >
                Start Free Trial
              </Link>
            </motion.div>

            {/* Enterprise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg border border-stone-200 p-6 lg:p-8 flex flex-col"
            >
              <div className="mb-6">
                <Shield size={24} className="text-bronze-600 mb-3" />
                <h3 className="text-xl font-serif font-bold text-stone-800 mb-1">Enterprise</h3>
                <p className="text-sm text-stone-500">For chains with 15+ stores</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold text-stone-900">Custom</span>
                <span className="text-stone-500 text-sm block mt-1">Volume discounts available</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Everything in Multi-Store Chain, plus:',
                  'Volume discount pricing',
                  'Dedicated onboarding and data migration',
                  'Custom integration support',
                  'SLA with guaranteed uptime',
                  'On-site training available',
                ].map((f, i) => (
                  <li key={f} className={`flex items-start gap-2 text-sm ${i === 0 ? 'text-bronze-700 font-medium' : 'text-stone-600'}`}>
                    {i > 0 && <Check size={16} className="text-green-600 mt-0.5 flex-shrink-0" />}
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="block text-center bg-stone-900 text-white py-3 rounded text-sm font-medium hover:bg-bronze-600 transition-colors"
              >
                Talk to Sales
              </Link>
            </motion.div>
          </div>

          {/* Billing Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-stone-50 rounded-lg p-6 lg:p-8"
          >
            <h3 className="text-xl font-serif font-bold text-stone-800 mb-6 text-center">Pay Less When You Commit</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="text-left py-3 px-4 text-stone-500 font-medium">Billing Cycle</th>
                    <th className="text-center py-3 px-4 text-stone-500 font-medium">General Trade</th>
                    <th className="text-center py-3 px-4 text-stone-500 font-medium">Multi-Store Chain</th>
                    <th className="text-center py-3 px-4 text-stone-500 font-medium">You Save</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-stone-100">
                    <td className="py-3 px-4 font-medium text-stone-700">Quarterly</td>
                    <td className="py-3 px-4 text-center text-stone-600">₹1,999/store/mo</td>
                    <td className="py-3 px-4 text-center text-stone-600">₹2,999/store/mo</td>
                    <td className="py-3 px-4 text-center text-green-600 font-medium">5% off</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-3 px-4 font-medium text-stone-700">Half-Yearly</td>
                    <td className="py-3 px-4 text-center text-stone-600">₹1,899/store/mo</td>
                    <td className="py-3 px-4 text-center text-stone-600">₹2,849/store/mo</td>
                    <td className="py-3 px-4 text-center text-green-600 font-medium">10% off</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-stone-700">Yearly</td>
                    <td className="py-3 px-4 text-center text-stone-600">₹1,599/store/mo</td>
                    <td className="py-3 px-4 text-center text-stone-600">₹2,399/store/mo</td>
                    <td className="py-3 px-4 text-center text-green-600 font-medium">20% off</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ROI Numbers */}
      <Section className="bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">The Numbers Speak for Themselves</h2>
          <p className="text-white/60 text-lg mb-10">109x–210x ROI — Our average customer saves ₹2.17L–₹4.20L per store per month.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { metric: '<0.5%', label: 'Inventory shrinkage (down from 3–5%)' },
              { metric: '85–95%', label: 'Brand scheme recovery rate' },
              { metric: '1–2 hrs/wk', label: 'GST compliance time (down from 8–10)' },
              { metric: '2–3 min', label: 'Billing speed per sale (down from 5–7)' },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 rounded-lg p-5">
                <div className="text-2xl font-bold text-bronze-400 mb-2">{s.metric}</div>
                <div className="text-sm text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Feature Comparison */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-stone-800 mb-8 text-center">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-stone-200">
                  <th className="text-left py-3 px-4 text-stone-500 font-medium">Feature</th>
                  <th className="text-center py-3 px-4 text-stone-500 font-medium">General Trade</th>
                  <th className="text-center py-3 px-4 text-stone-500 font-medium">Multi-Store Chain</th>
                </tr>
              </thead>
              <tbody>
                {features.map((f) => (
                  <tr key={f.name} className="border-b border-stone-100">
                    <td className="py-2.5 px-4 text-stone-700">{f.name}</td>
                    <td className="py-2.5 px-4 text-center">
                      {f.general === true ? (
                        <Check size={16} className="text-green-600 mx-auto" />
                      ) : f.general === false ? (
                        <X size={16} className="text-stone-300 mx-auto" />
                      ) : (
                        <span className="text-stone-500 text-xs">{f.general}</span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      {f.multiStore === true ? (
                        <Check size={16} className="text-green-600 mx-auto" />
                      ) : f.multiStore === false ? (
                        <X size={16} className="text-stone-300 mx-auto" />
                      ) : (
                        <span className="text-stone-500 text-xs">{f.multiStore}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-stone-800 mb-10 text-center">Trusted by Retailers Across India</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 border border-stone-200"
              >
                <Quote size={20} className="text-bronze-400 mb-3" />
                <p className="text-stone-600 text-sm leading-relaxed mb-4">{t.quote}</p>
                <div>
                  <div className="font-medium text-stone-800 text-sm">{t.name}</div>
                  <div className="text-stone-500 text-xs">{t.title}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-stone-800 mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-stone-200 pb-6">
                <h3 className="font-medium text-stone-800 mb-2">{faq.q}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-stone-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Ready to Stop Losing Money?</h2>
          <p className="text-white/60 text-lg mb-8">
            Start your 14-day free trial — no credit card required. Most stores go live in under 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-bronze-600 text-white px-6 py-3 rounded text-sm font-medium hover:bg-bronze-700 transition-colors"
            >
              Start Free Trial <ArrowRight size={16} />
            </Link>
            <Link
              to="/tools/roi-calculator"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded text-sm font-medium hover:bg-white/20 transition-colors"
            >
              Calculate Your ROI
            </Link>
          </div>
        </div>
      </Section>

      <Contact />
    </>
  );
};

export default PricingPage;
