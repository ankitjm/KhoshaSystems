import React from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Smartphone,
  ShoppingBag,
  Cpu,
  Store,
  TrendingUp,
  Clock,
  Shield,
  Quote,
} from 'lucide-react';

interface CaseStudy {
  icon: React.ElementType;
  vertical: string;
  title: string;
  location: string;
  profile: string;
  challenge: string[];
  solution: string[];
  results: { metric: string; label: string }[];
  quote: string;
  quoteAttrib: string;
}

const caseStudies: CaseStudy[] = [
  {
    icon: Smartphone,
    vertical: 'Telecom Retail',
    title: 'Multi-Brand Mobile Store Recovers ₹1.8 Lakh in Missed Scheme Payouts',
    location: 'Pune',
    profile:
      'A single-store multi-brand mobile shop stocking 8 brands with 180–220 handset sales per month and a 4-person team.',
    challenge: [
      'Eight brands running 12+ overlapping schemes at any time, tracked manually in a diary and WhatsApp groups — resulting in 2–3 missed claims per month worth ₹15,000–₹20,000.',
      'GST billing errors: 23 invoices flagged with incorrect tax breakdowns in a single quarter, taking 12 hours to fix.',
      'Manual billing took 6–8 minutes per sale, causing long queues during festive seasons.',
    ],
    solution: [
      'RetailerOS auto-loads active schemes from all eight brands and applies them at billing automatically. Claims are logged without manual intervention.',
      'GST-compliant invoicing with pre-loaded HSN codes eliminated invoice corrections entirely.',
      'Scan-to-bill with auto scheme application reduced billing to under 3 minutes per sale.',
    ],
    results: [
      { metric: '₹1.8L', label: 'Scheme payouts recovered in 4 months' },
      { metric: '0', label: 'GST compliance errors since switching' },
      { metric: '60%', label: 'Faster billing per transaction' },
      { metric: '8 hrs/wk', label: 'Freed from manual reconciliation' },
    ],
    quote:
      'RetailerOS tells me exactly what is pending, what is expiring, and what I have already claimed. Last month I claimed every single scheme payout for the first time ever.',
    quoteAttrib: 'Owner, Multi-Brand Mobile Store, Pune',
  },
  {
    icon: Cpu,
    vertical: 'Electronics Retail',
    title: 'Electronics Chain Eliminates 92% Shrinkage Across 3 Stores',
    location: 'Hyderabad',
    profile:
      'A 3-store electronics chain carrying Samsung, Vivo, Oppo, Xiaomi, OnePlus, and Realme — roughly 2,800 active IMEIs across locations.',
    challenge: [
      'IMEI tracking via Excel sheets led to 14 unaccounted devices worth ₹3.2 lakh in a single quarterly audit.',
      'Brand scheme payouts slipping through manual tracking — ₹1.4 lakh lost to expired claims in one quarter.',
      'No real-time visibility: the owner spent Sundays visiting each store to reconcile stock manually.',
    ],
    solution: [
      'Every IMEI scanned at purchase, transfer, and sale. No device moves without a tracked transfer request.',
      'Brand schemes loaded automatically — qualifying sales trigger instant claim logging with expiry alerts 7 days before deadline.',
      'Multi-store dashboard provides real-time stock levels, daily sales, and scheme claim status from a single phone view.',
    ],
    results: [
      { metric: '92%', label: 'Reduction in inventory shrinkage' },
      { metric: '₹4.7L', label: 'Brand scheme payouts recovered in 6 months' },
      { metric: '35%', label: 'Faster staff billing speed' },
      { metric: '5 hrs/wk', label: 'Saved from eliminating Sunday reconciliation' },
    ],
    quote:
      'I was losing more money to missed schemes every quarter than RetailerOS costs me in a year. The IMEI tracking alone would have justified it.',
    quoteAttrib: 'Owner, Electronics Chain, Hyderabad',
  },
  {
    icon: ShoppingBag,
    vertical: 'Fashion & Accessories',
    title: 'Fashion Retailer Gains Complete Multi-Store Visibility Across 5 Locations',
    location: 'Bangalore',
    profile:
      'A 5-store fashion and accessories chain with ₹1.8 crore in inventory across branded fashion wear, watches, sunglasses, and bags.',
    challenge: [
      'Inter-store transfers tracked via WhatsApp — ₹4.6 lakh of "in transit" inventory unaccounted for in one quarter.',
      'No cross-store stock visibility: answering "how many of this item do we have?" required calling five managers.',
      'No staff accountability across 22 employees — unauthorized discounts suspected but impossible to prove.',
    ],
    solution: [
      'Digital transfer requests with approval workflows. Both stores update automatically — no WhatsApp, no ghost inventory.',
      'Single dashboard for stock levels, sales, and transfers across all 5 locations with drill-down by store, category, or SKU.',
      'Role-based access ties every sale, discount, and transfer to an individual. Owner-only approval for discounts above 15%.',
    ],
    results: [
      { metric: '0', label: 'Transfer discrepancies after implementation' },
      { metric: '60%', label: 'Reduction in individual store stockouts' },
      { metric: '₹2.1L', label: 'Saved in first quarter from better stock utilization' },
      { metric: '80%', label: 'Fewer weekly store visits needed' },
    ],
    quote:
      'RetailerOS gave me everything I needed at a fraction of what I expected. The multi-store dashboard changed how I run my business.',
    quoteAttrib: 'Founder, Fashion Retail Chain, Bangalore',
  },
  {
    icon: Store,
    vertical: 'Grocery & Supermarket',
    title: 'Supermarket Cuts Wastage by 40% with Expiry Tracking and Smart Reorders',
    location: 'Chennai',
    profile:
      'A 2-location supermarket carrying 4,000+ SKUs across FMCG, fresh produce, dairy, and household items with 300+ daily transactions.',
    challenge: [
      'Perishable inventory wastage averaging ₹45,000 per month — items expiring on shelves before staff noticed.',
      'Stockouts on fast-moving staples (rice, oil, dal) happening 3–4 times per month, driving customers to competitors.',
      'Weight-based billing for loose items (fruits, vegetables, pulses) done manually, causing checkout delays and pricing errors.',
    ],
    solution: [
      'Batch-level expiry tracking with automated alerts 14 days before expiry enables timely markdowns and clearance.',
      'AI-driven reorder suggestions based on sell-through velocity and supplier lead times ensure staples never run out.',
      'Electronic scale integration for accurate per-gram billing of loose items — no more manual price calculations.',
    ],
    results: [
      { metric: '40%', label: 'Reduction in perishable wastage' },
      { metric: '₹54K/mo', label: 'Saved from wastage reduction alone' },
      { metric: '85%', label: 'Fewer stockouts on fast-moving items' },
      { metric: '2x', label: 'Faster checkout for weight-based items' },
    ],
    quote:
      'We used to throw away expired stock every week. Now RetailerOS alerts us two weeks ahead, and we markdown or push items before they expire. The savings paid for the software in the first month.',
    quoteAttrib: 'Owner, Supermarket Chain, Chennai',
  },
];

const highlights = [
  { icon: TrendingUp, value: '₹9+ Lakh', label: 'Combined revenue recovered across retailers' },
  { icon: Clock, value: '48 hrs', label: 'Average time to go live' },
  { icon: Shield, value: '92%', label: 'Average shrinkage reduction' },
];

export const SuccessStoriesPage: React.FC = () => {
  return (
    <div>
      <PageHero
        backLink={{ label: 'Products', href: '/products' }}
        label="Customer Success"
        title={
          <>
            See How Retailers Like You{' '}
            <span className="bronze-gradient-text">Benefit from RetailerOS</span>
          </>
        }
        subtitle="Representative scenarios based on real patterns we see across hundreds of Indian retailers. The challenges, solutions, and results reflect typical outcomes for stores in each vertical."
        backgroundImage="/images/retaileros-page-hero.jpg"
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-bronze-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-500 transition-colors rounded group"
          >
            Request a Demo{' '}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/products/retaileros"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white text-sm font-medium uppercase tracking-wider hover:bg-white/10 transition-colors rounded group"
          >
            Explore RetailerOS{' '}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </PageHero>

      {/* Highlights */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 bg-stone-50 rounded-lg border border-stone-200"
              >
                <stat.icon size={24} className="text-bronze-500 mx-auto mb-3" />
                <div className="text-4xl sm:text-5xl font-bold text-stone-900 mb-2">{stat.value}</div>
                <p className="text-stone-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Case Studies */}
      {caseStudies.map((cs, idx) => (
        <Section key={idx} className={idx % 2 === 0 ? 'bg-stone-50' : 'bg-white'}>
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <cs.icon size={24} className="text-bronze-500" />
                <span className="text-bronze-600 font-semibold tracking-widest uppercase text-sm">
                  {cs.vertical} — {cs.location}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-3">{cs.title}</h2>
              <p className="text-stone-500 max-w-3xl">{cs.profile}</p>
            </motion.div>

            {/* Challenge / Solution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 bg-white border border-stone-200 rounded-lg"
              >
                <h3 className="font-medium text-stone-900 mb-4 text-lg">The Challenge</h3>
                <ul className="space-y-4">
                  {cs.challenge.map((item, i) => (
                    <li key={i} className="text-stone-500 text-sm leading-relaxed pl-4 border-l-2 border-stone-200">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 bg-bronze-50 border border-bronze-200 rounded-lg"
              >
                <h3 className="font-medium text-stone-900 mb-4 text-lg">The Solution</h3>
                <ul className="space-y-4">
                  {cs.solution.map((item, i) => (
                    <li key={i} className="text-stone-700 text-sm leading-relaxed pl-4 border-l-2 border-bronze-300">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {cs.results.map((result, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-5 bg-white border border-stone-200 rounded-lg"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-stone-900 mb-1">{result.metric}</div>
                  <p className="text-stone-400 text-xs sm:text-sm">{result.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-6 sm:p-8 bg-white border border-stone-200 rounded-lg"
            >
              <Quote size={24} className="text-bronze-300 mb-3" />
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed italic mb-4">
                "{cs.quote}"
              </p>
              <footer className="text-stone-400 text-sm">— {cs.quoteAttrib}</footer>
            </motion.blockquote>
          </div>
        </Section>
      ))}

      {/* Disclaimer + CTA */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-stone-400 text-xs mb-8">
            These success stories represent typical outcomes based on patterns observed across RetailerOS
            customers. Specific results vary depending on store size, product mix, and operational
            practices. No real company names or identifying details are used.
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">
            Ready to Write Your Own Success Story?
          </h2>
          <p className="text-stone-500 mb-8">
            Whether you run a single store or a multi-city chain, RetailerOS scales with your business.
            Most stores go live in under 48 hours.
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
              to="/tools/roi-calculator"
              className="inline-flex items-center gap-2 px-8 py-4 border border-stone-300 text-stone-700 text-sm font-medium uppercase tracking-wider hover:border-bronze-400 transition-colors rounded group"
            >
              Calculate Your ROI{' '}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </Section>

      <Contact />
    </div>
  );
};
