import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import {
  ArrowRight,
  Smartphone,
  ShoppingBag,
  Cpu,
  Quote,
  TrendingDown,
  DollarSign,
  Clock,
  Eye,
} from 'lucide-react';

interface UseCaseData {
  icon: React.ElementType;
  vertical: string;
  location: string;
  title: string;
  profile: string;
  challenges: string[];
  solutions: string[];
  results: { metric: string; label: string }[];
  quote: string;
  quoteAttrib: string;
  cta: string;
}

const useCases: UseCaseData[] = [
  {
    icon: Cpu,
    vertical: 'Electronics Retail',
    location: 'Hyderabad',
    title: 'Digi World Electronics: From IMEI Nightmares to Full Inventory Control',
    profile: '3-store electronics chain carrying Samsung, Vivo, Oppo, Xiaomi, OnePlus, and Realme — roughly 2,800 active IMEIs.',
    challenges: [
      'Shrinkage was bleeding money — 14 devices worth ₹3.2 lakh unaccounted for in a single quarterly audit.',
      'Brand scheme payouts slipping through the cracks — ₹1.4 lakh lost to expired claims in one quarter.',
      'No real-time visibility — owner spent Sundays visiting each store to reconcile stock manually.',
    ],
    solutions: [
      'Every IMEI scanned at purchase, transfer, and sale. No device moves without a tracked transfer request.',
      'Brand schemes loaded automatically. Qualifying sales trigger instant claim logging with 7-day expiry alerts.',
      'Multi-store dashboard provides real-time stock levels, sales, and scheme claim status from a single phone view.',
    ],
    results: [
      { metric: '92%', label: 'Reduction in inventory shrinkage' },
      { metric: '₹4.7L', label: 'Brand scheme payouts recovered in 6 months' },
      { metric: '35%', label: 'Faster staff billing speed' },
      { metric: '0', label: 'Sunday reconciliation trips needed' },
    ],
    quote: 'I was losing more money to missed schemes every quarter than RetailerOS costs me in a year. The IMEI tracking alone would have justified it — the scheme recovery was a bonus I did not expect.',
    quoteAttrib: 'Rajesh R., Owner, Digi World Electronics, Hyderabad',
    cta: 'Running multiple electronics stores? Start your 14-day free trial and see every IMEI across every location — in real time.',
  },
  {
    icon: Smartphone,
    vertical: 'Telecom Multi-Brand',
    location: 'Pune',
    title: 'Mobile Junction: One Store, Eight Brands, Zero Missed Schemes',
    profile: 'Single-store multi-brand mobile shop stocking 8 brands with 180–220 handset sales per month and a 4-person team.',
    challenges: [
      'Eight brands running 12+ overlapping schemes — 2–3 missed claims per month worth ₹15,000–₹20,000.',
      'GST billing errors: 23 invoices flagged with incorrect tax breakdowns in a single quarter.',
      'Manual billing took 6–8 minutes per sale, causing long queues during festive seasons.',
    ],
    solutions: [
      'RetailerOS auto-loads active schemes from all eight brands and applies them at billing automatically.',
      'GST-compliant invoicing with pre-loaded HSN codes eliminated invoice corrections entirely.',
      'Scan-to-bill with auto scheme application reduced billing to under 3 minutes per sale.',
    ],
    results: [
      { metric: '₹1.8L', label: 'Scheme payouts recovered in 4 months' },
      { metric: '0', label: 'GST compliance errors since switching' },
      { metric: '60%', label: 'Faster billing per transaction' },
      { metric: '8 hrs/wk', label: 'Freed from manual reconciliation' },
    ],
    quote: 'I used to track schemes in a diary and hope I did not miss any. Now RetailerOS tells me exactly what is pending, what is expiring, and what I have already claimed.',
    quoteAttrib: 'Priya K., Owner, Mobile Junction, Pune',
    cta: 'Running a multi-brand mobile shop? Book a free demo and see how RetailerOS handles scheme tracking for every brand you carry.',
  },
  {
    icon: ShoppingBag,
    vertical: 'Fashion & Accessories',
    location: 'Bangalore',
    title: 'TrendSet Fashion: Five Stores, One Dashboard, Complete Control',
    profile: '5-store fashion chain covering Commercial Street, Indiranagar, Koramangala, Whitefield, and Jayanagar — ₹1.8 crore in stock.',
    challenges: [
      'Inter-store transfers were a black hole — ₹4.6 lakh worth of "in transit" inventory logged weeks late or not at all.',
      'No stock visibility across locations — overstocking at one store while another was sold out was a weekly occurrence.',
      'Staff accountability was nonexistent — unauthorized discounts suspected but no data to prove it.',
    ],
    solutions: [
      'Every inter-store transfer requires a digital request, approval, and confirmation on receipt.',
      'Multi-store dashboard gives a single view of stock, sales, and transfers across all 5 locations.',
      'Role-based access means every sale, discount, and transfer is tied to a person. Only the owner can approve discounts above 15%.',
    ],
    results: [
      { metric: '0', label: 'Inter-store transfer discrepancies' },
      { metric: '70%', label: 'Improvement in stock rebalancing' },
      { metric: '₹2.1L', label: 'Saved in first quarter' },
      { metric: '60%', label: 'Fewer stockouts at individual stores' },
    ],
    quote: 'I thought I needed a retail ERP that cost ₹10–15 lakh to set up. RetailerOS gave me everything I needed at ₹1,999 per store per month.',
    quoteAttrib: 'Vikram H., Founder, TrendSet Fashion, Bangalore',
    cta: 'Growing beyond a single store? Start your 14-day free trial and get multi-store visibility from day one.',
  },
];

export const UseCasesPage: React.FC = () => {
  return (
    <>
      <PageHero
        title="RetailerOS Use Cases"
        subtitle="Real patterns from hundreds of Indian retailers. The names are illustrative, but the problems — and the numbers — are not."
        label="Use Cases"
        backgroundImage="/images/hero-products.jpg"
        backLink={{ label: 'Back to Products', href: '/products/retaileros' }}
      />

      {useCases.map((uc, idx) => (
        <Section key={uc.title} className={idx % 2 === 1 ? 'bg-stone-50' : ''}>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <uc.icon size={20} className="text-bronze-600" />
                <span className="text-sm text-bronze-600 font-medium uppercase tracking-wider">{uc.vertical} — {uc.location}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-800 mb-3">{uc.title}</h2>
              <p className="text-stone-500 mb-8">{uc.profile}</p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-medium text-stone-800 mb-3 flex items-center gap-2">
                    <TrendingDown size={16} className="text-red-500" /> The Challenge
                  </h3>
                  <ul className="space-y-3">
                    {uc.challenges.map((c) => (
                      <li key={c} className="text-sm text-stone-600 leading-relaxed pl-4 border-l-2 border-red-200">{c}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-stone-800 mb-3 flex items-center gap-2">
                    <Eye size={16} className="text-green-600" /> The Solution
                  </h3>
                  <ul className="space-y-3">
                    {uc.solutions.map((s) => (
                      <li key={s} className="text-sm text-stone-600 leading-relaxed pl-4 border-l-2 border-green-200">{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {uc.results.map((r) => (
                  <div key={r.label} className="bg-white border border-stone-200 rounded-lg p-4 text-center">
                    <div className="text-xl font-bold text-bronze-600">{r.metric}</div>
                    <div className="text-xs text-stone-500 mt-1">{r.label}</div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="bg-white border border-stone-200 rounded-lg p-6 mb-6">
                <Quote size={18} className="text-bronze-400 mb-2" />
                <p className="text-stone-600 text-sm leading-relaxed italic mb-3">"{uc.quote}"</p>
                <p className="text-stone-500 text-xs">— {uc.quoteAttrib}</p>
              </div>

              <p className="text-stone-600 text-sm">
                {uc.cta}{' '}
                <Link to="/contact" className="text-bronze-600 hover:text-bronze-700 font-medium inline-flex items-center gap-1">
                  Get started <ArrowRight size={14} />
                </Link>
              </p>
            </motion.div>
          </div>
        </Section>
      ))}

      {/* CTA */}
      <Section className="bg-stone-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">See RetailerOS in Action</h2>
          <p className="text-white/60 text-lg mb-8">
            Start your 14-day free trial — no credit card required. Go live across all your locations in under a week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-bronze-600 text-white px-6 py-3 rounded text-sm font-medium hover:bg-bronze-700 transition-colors"
            >
              Book a Free Demo <ArrowRight size={16} />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded text-sm font-medium hover:bg-white/20 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </Section>

      <Contact />
    </>
  );
};

export default UseCasesPage;
