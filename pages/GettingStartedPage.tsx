import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import {
  ArrowRight,
  UserPlus,
  Upload,
  Receipt,
  Package,
  Users,
  Tags,
  Rocket,
  HelpCircle,
  Lightbulb,
  Check,
} from 'lucide-react';

interface Step {
  icon: React.ElementType;
  number: number;
  title: string;
  time: string;
  description: string;
  items: string[];
  tip: string;
}

const steps: Step[] = [
  {
    icon: UserPlus,
    number: 1,
    title: 'Account Setup',
    time: '10–15 minutes',
    description: 'Getting started is simple.',
    items: [
      'Sign up at retaileros.in using your mobile number or email.',
      'Add your business details — business name, address, phone number, and email.',
      'Enter your GST number — RetailerOS will automatically pull your GST details.',
      'Add your store locations — running more than one store? Add all of them now.',
    ],
    tip: 'Keep your GST certificate handy. It makes this step faster.',
  },
  {
    icon: Upload,
    number: 2,
    title: 'Import Your Data',
    time: '15–30 minutes',
    description: 'No need to start from scratch. Bring your existing data into RetailerOS easily.',
    items: [
      'Inventory — Upload your stock list using a CSV or Excel file. We support bulk IMEI imports.',
      'Customer data — Import your customer list so you never lose track of relationships.',
      'Supplier list — Add your distributors and suppliers for smoother purchase orders.',
    ],
    tip: "Don't worry about formatting. Our support team will help you prepare and upload your files — even a handwritten register photo works.",
  },
  {
    icon: Receipt,
    number: 3,
    title: 'Configure Billing',
    time: '10–15 minutes',
    description: 'Set up your billing so every invoice is GST-compliant from day one.',
    items: [
      'Verify GST details — Confirm your GSTIN, business type, and tax preferences.',
      'Add HSN codes — RetailerOS comes with pre-loaded HSN codes for common products.',
      'Choose your invoice template — Pick a professional template. Add your logo and store details.',
      'Set up payment methods — Enable cash, UPI, card, and credit payment tracking.',
    ],
    tip: 'Preview a sample invoice before your first sale. Make sure your details look correct.',
  },
  {
    icon: Package,
    number: 4,
    title: 'Set Up Inventory',
    time: '20–30 minutes',
    description: 'This is where RetailerOS truly shines.',
    items: [
      'Scan IMEIs — Use your phone camera or a barcode scanner. Each IMEI is tracked from purchase to sale.',
      'Organize by brand and category — Group products by brand and category.',
      'Set reorder points — Get automatic alerts so you never miss a sale due to stockouts.',
      'Review your dashboard — Check that all imported and scanned items show up correctly.',
    ],
    tip: 'Start with your best-selling products. You can always add more items later.',
  },
  {
    icon: Users,
    number: 5,
    title: 'Add Your Team',
    time: '10 minutes',
    description: 'Get your staff on board so everyone can work together.',
    items: [
      'Invite team members — Add staff by mobile number or email.',
      'Set roles: Sales staff (bills + inventory), Store manager (stock, returns, reports), Owner (full access).',
      'Quick training — Have each team member do one practice billing transaction. Takes 5 minutes.',
    ],
    tip: 'Our support team can do a free 15-minute training call with your staff. Just ask.',
  },
  {
    icon: Tags,
    number: 6,
    title: 'Connect Brand Schemes',
    time: '5–10 minutes',
    description: 'Stop tracking brand schemes on paper. Let RetailerOS do it for you.',
    items: [
      'Browse available schemes from Samsung, Vivo, Oppo, Xiaomi, Realme, and more.',
      'Activate the ones relevant to your store.',
      'Every eligible sale is matched to the right scheme automatically.',
      'View your scheme earnings in real time from your dashboard.',
    ],
    tip: 'Review your scheme dashboard weekly to ensure no claims are pending.',
  },
  {
    icon: Rocket,
    number: 7,
    title: 'Go Live',
    time: '5 minutes for your first sale',
    description: "You're ready. Make your first sale on RetailerOS.",
    items: [
      'Open the billing screen and search for the product or scan the IMEI.',
      'Add the customer — search existing or add a new one.',
      'Apply any discounts or schemes if applicable.',
      'Select payment method and confirm.',
      'Generate the invoice — share it via print, WhatsApp, or SMS.',
    ],
    tip: 'Keep your old billing method available for the first day, just in case. By day two, you will not need it.',
  },
];

const proTips = [
  {
    title: 'Use the mobile app daily',
    desc: 'RetailerOS works on your phone browser. Bookmark it on your home screen to check sales, stock, and alerts even away from the store.',
  },
  {
    title: 'Review your dashboard every morning',
    desc: "Spend 2 minutes checking yesterday's sales, low-stock alerts, and pending scheme claims. This small habit gives you full control.",
  },
  {
    title: 'Collect customer phone numbers with every sale',
    desc: 'The more customer data you have, the better RetailerOS can help with repeat business, warranty tracking, and targeted promotions.',
  },
  {
    title: 'Set up reorder alerts for your top 20 products',
    desc: 'Stockouts cost you money. Let RetailerOS alert you before you run out.',
  },
  {
    title: 'Explore analytics after your first week',
    desc: "Once you have a few days of data, the analytics dashboard shows which products sell fastest, which days are busiest, and where margins are strongest.",
  },
];

export const GettingStartedPage: React.FC = () => {
  return (
    <>
      <PageHero
        title="Getting Started with RetailerOS"
        subtitle="Most store owners go live in under 48 hours. Our support team is with you at every step — on WhatsApp, phone, email, or live chat."
        label="Onboarding Guide"
        backgroundImage="/images/hero-products.jpg"
        backLink={{ label: 'Back to RetailerOS', href: '/products/retaileros' }}
      />

      {/* Steps */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-12">
            {steps.map((step) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-bronze-100 flex items-center justify-center">
                    <step.icon size={20} className="text-bronze-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-medium text-bronze-600 uppercase tracking-wider">Step {step.number}</span>
                      <span className="text-xs text-stone-400">•</span>
                      <span className="text-xs text-stone-400">{step.time}</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-stone-800 mb-2">{step.title}</h3>
                    <p className="text-stone-600 text-sm mb-4">{step.description}</p>

                    <ol className="space-y-2 mb-4">
                      {step.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-stone-100 text-stone-500 text-xs flex items-center justify-center mt-0.5">
                            {i + 1}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ol>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                      <Lightbulb size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-amber-800"><strong>Tip:</strong> {step.tip}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Support Channels */}
      <Section className="bg-stone-50">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle size={24} className="text-bronze-600" />
            <h2 className="text-2xl font-serif font-bold text-stone-800">Getting Help</h2>
          </div>
          <p className="text-stone-600 mb-6">You are never on your own. We typically respond within 15 minutes during business hours.</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {[
              { channel: 'WhatsApp', detail: 'Message us anytime — fastest response' },
              { channel: 'Phone', detail: 'Call our support line during business hours' },
              { channel: 'Email', detail: 'Write to support@retaileros.in' },
              { channel: 'Live Chat', detail: 'Click the chat icon inside RetailerOS' },
            ].map((c) => (
              <div key={c.channel} className="bg-white border border-stone-200 rounded-lg p-4">
                <div className="font-medium text-stone-800 text-sm mb-1">{c.channel}</div>
                <div className="text-stone-500 text-xs">{c.detail}</div>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Video tutorials — short, practical walkthroughs for every feature',
              'Help center — searchable guides and FAQs',
              'Community — WhatsApp group of 1000+ store owners',
              'Dedicated onboarding manager for your first 7 days',
            ].map((r) => (
              <div key={r} className="flex items-start gap-2 text-sm text-stone-600">
                <Check size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                {r}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Pro Tips */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-stone-800 mb-8 text-center">Pro Tips — First 30 Days</h2>
          <div className="space-y-4">
            {proTips.map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-start gap-4 bg-white border border-stone-200 rounded-lg p-4"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-bronze-100 text-bronze-600 text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-medium text-stone-800 text-sm mb-1">{tip.title}</h3>
                  <p className="text-stone-500 text-xs leading-relaxed">{tip.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-stone-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">You Have Got This</h2>
          <p className="text-white/60 text-lg mb-8">
            Thousands of retail store owners across India are already running their businesses on RetailerOS. Within 48 hours, you will be one of them.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-bronze-600 text-white px-6 py-3 rounded text-sm font-medium hover:bg-bronze-700 transition-colors"
          >
            Start Your Free Trial <ArrowRight size={16} />
          </Link>
        </div>
      </Section>

      <Contact />
    </>
  );
};

export default GettingStartedPage;
