import React from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Zap, Database, Network, Sparkles } from 'lucide-react';

const suiteStats = [
  { value: "09", label: "Connected Products" },
  { value: "05", label: "Lead Capture Points" },
  { value: "01", label: "Source of Truth — the CRM" },
];

const products = [
  {
    name: "Project Landing Page",
    tagline: "Capture attention. Spark interest.",
    image: "/images/realdesk/realdesk-landingpage.webp",
    description: "The most built-out product in the suite: three complete design directions — Astera (warm, architectural), Velora (elevated, photographic), Novelle (cool, systematic) — each with its own capture, targeting, and analytics machinery underneath.",
    depth: ["3 complete design directions, not a shared template", "25 built-in capabilities across 5 stages: Capture, Target, Optimise, Nurture, Measure"],
    capturePoint: "Web Enquiry",
    feeds: "Feeds the CRM — a web enquiry",
  },
  {
    name: "QR WebForm",
    tagline: "Capture leads instantly.",
    image: "/images/realdesk/realdesk-qr-webform.webp",
    description: "A real scannable code that lives on four physical surfaces a buyer actually stands in front of — turning a crowded expo floor into a lead capture point with no app and no typing.",
    depth: ["Lives on 4 surfaces: Expo Pillar, Sales Gallery, Property Expo, Event Registration"],
    capturePoint: "QR Scan",
    feeds: "Feeds the CRM — a QR scan",
  },
  {
    name: "GRE Reception",
    tagline: "Welcome and start the journey.",
    image: "/images/realdesk/realdesk-gre-reception.webp",
    description: "The only product that feeds two others at once — a guest-relations executive logs the visit for the CRM, and in the same motion sets up the presentation Sales Studio runs next.",
    depth: null,
    capturePoint: "Walk-In",
    feeds: "Feeds the CRM and Sales Studio — a walk-in",
  },
  {
    name: "CRM",
    tagline: "Own the pipeline. Never miss out.",
    image: "/images/realdesk/realdesk-crm.webp",
    description: "The hub. Every other product writes here; it writes to none of them — eight incoming lines, zero outgoing.",
    depth: null,
    capturePoint: null,
    feeds: "The single source of truth for every lead, scan, walk-in, EOI, and referral.",
    isHub: true,
  },
  {
    name: "Sales Studio",
    tagline: "Present inventory visually. Sell smarter. Win more.",
    image: "/images/realdesk/realdesk-sales-studio.webp",
    description: "The only two-hop story in the suite: a visit becomes a presentation, and a presentation becomes a recorded unit shortlist — reaching the CRM by way of GRE Reception.",
    depth: null,
    capturePoint: null,
    feeds: "Feeds the CRM via GRE Reception — recorded interest",
  },
  {
    name: "EOI Engine",
    tagline: "Launch-day control. Zero chaos.",
    image: "/images/realdesk/realdesk-eoi-engine.webp",
    description: "Built for the one day a project's demand arrives all at once, so an expression-of-interest surge doesn't turn into a spreadsheet crisis.",
    depth: null,
    capturePoint: "EOI Form",
    feeds: "Feeds the CRM — an EOI form",
  },
  {
    name: "Booking Engine",
    tagline: "Lock the unit. Seal the deal.",
    image: "/images/realdesk/realdesk-booking-enginee.webp",
    description: "The moment a unit is confirmed, the product that presents inventory has to know before it's shown again — so it writes to Sales Studio as well as the CRM.",
    depth: null,
    capturePoint: null,
    feeds: "Feeds the CRM and Sales Studio — a unit blocked",
  },
  {
    name: "CP App",
    tagline: "Channel visibility. Partner performance.",
    image: "/images/realdesk/realdesk-cp-app.webp",
    description: "Broker-sourced demand lands in the same pipeline as direct demand — not in a spreadsheet beside it. Every referral is visible, every partner's performance measurable.",
    depth: null,
    capturePoint: "Channel Partner",
    feeds: "Feeds the CRM — a channel-partner referral",
  },
  {
    name: "Post Sales",
    tagline: "From booking to handover and beyond.",
    image: "/images/realdesk/realdedesk-post-sales.webp",
    description: "The far end of the journey the suite promises — from a booked unit through construction updates to final possession, still writing to the same pipeline it started in.",
    depth: null,
    capturePoint: null,
    feeds: "Feeds the CRM — possession tracking",
  },
];

export const RealDeskPage: React.FC = () => {
  return (
    <div>
      <PageHero
        backLink={{ label: "All Products", href: "/products" }}
        label="RealDesk"
        title={<>The <span className="bronze-gradient-text">Connected</span> Sales Suite</>}
        subtitle="Nine products for the real estate buyer's journey — landing pages, lead capture, sales presentation, bookings, and post-sales — all writing to one CRM. Not nine tools. One system."
        backgroundImage="/images/realestate-page-hero.jpg"
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-bronze-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-500 transition-colors rounded group">
            Schedule a Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </PageHero>

      {/* GEO: Entity definition block — quotable by AI search engines */}
      <Section className="bg-white border-b border-stone-100">
        <div className="max-w-3xl mx-auto text-center" data-speakable="true">
          <p className="text-lg sm:text-xl text-stone-700 leading-relaxed">
            <strong>RealDesk</strong> is a connected sales suite by Khoshà Systems for real estate developers and brokers. Nine products — each owning one step of the buyer's journey — write to a single CRM, so every enquiry, scan, walk-in, EOI, and channel-partner referral lands in one pipeline instead of nine disconnected tools.
          </p>
        </div>
      </Section>

      {/* Suite stats */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {suiteStats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-8 bg-stone-50 rounded-lg border border-stone-200">
                <div className="text-4xl sm:text-5xl font-bold text-stone-900 mb-2">{stat.value}</div>
                <div className="text-bronze-600 font-medium text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Why one system */}
      <Section className="bg-stone-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Layers className="text-bronze-500 mb-4" size={28} />
            <h3 className="text-stone-900 font-medium text-lg mb-2">One System, Not Nine Brochures</h3>
            <p className="text-stone-500 text-sm leading-relaxed">Every product hands off the thing that actually moves — a web enquiry, a QR scan, a booked unit — to the CRM or the product downstream of it. Nothing sits in a spreadsheet waiting to be re-entered.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Database className="text-bronze-500 mb-4" size={28} />
            <h3 className="text-stone-900 font-medium text-lg mb-2">The CRM Is the Hub</h3>
            <p className="text-stone-500 text-sm leading-relaxed">Every other product writes to the CRM; the CRM writes to none of them. Direct enquiries and channel-partner referrals land in the same pipeline — not side by side in separate systems.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Zap className="text-bronze-500 mb-4" size={28} />
            <h3 className="text-stone-900 font-medium text-lg mb-2">From First Enquiry to Possession</h3>
            <p className="text-stone-500 text-sm leading-relaxed">The suite covers the full buyer's journey — five lead capture points, sales presentation, booking, and post-sales handover — so nothing falls through the gaps between teams.</p>
          </motion.div>
        </div>
      </Section>

      {/* The nine products */}
      <Section className="bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-4">The Suite</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Nine Products. One Pipeline.</h2>
            <p className="text-stone-500">Each one owns a step of the buyer's journey — and hands off directly to the next.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.div key={product.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 * i }}
                className={`rounded-lg overflow-hidden transition-all flex flex-col hover:-translate-y-1 ${
                  product.isHub
                    ? 'bg-gradient-to-br from-bronze-500 via-bronze-600 to-bronze-800 shadow-lg shadow-bronze-900/20 ring-1 ring-bronze-300/40'
                    : 'bg-white border border-stone-200 hover:border-bronze-300 hover:shadow-md'
                }`}>
                <div className={`relative h-40 flex items-center justify-center p-6 ${product.isHub ? 'bg-black/10' : 'bg-gradient-to-b from-stone-50 to-white border-b border-stone-100'}`}>
                  <span className={`absolute top-3 left-3 font-serif font-bold text-sm ${product.isHub ? 'text-white/50' : 'text-stone-300'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {product.capturePoint && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[9px] uppercase tracking-widest font-semibold text-bronze-600 bg-bronze-50 border border-bronze-200 px-2 py-1 rounded-full">
                      <Sparkles size={10} /> {product.capturePoint}
                    </span>
                  )}
                  <img src={product.image} alt={`${product.name} — RealDesk`} className="max-h-full max-w-full object-contain" loading="lazy" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className={`font-serif font-medium text-lg ${product.isHub ? 'text-white' : 'text-stone-900'}`}>{product.name}</h3>
                    {product.isHub && (
                      <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest font-semibold text-white bg-white/15 px-2 py-1 rounded-full">
                        <Network size={10} /> The Hub
                      </span>
                    )}
                  </div>
                  <p className={`text-xs uppercase tracking-wider font-medium mb-3 ${product.isHub ? 'text-bronze-100' : 'text-bronze-600'}`}>{product.tagline}</p>
                  <p className={`text-sm leading-relaxed mb-3 ${product.isHub ? 'text-white/80' : 'text-stone-500'}`}>{product.description}</p>
                  {product.depth && (
                    <ul className="space-y-1.5 mb-3">
                      {product.depth.map((d, j) => (
                        <li key={j} className="text-xs text-stone-500 flex items-start gap-2">
                          <span className="text-bronze-400 mt-0.5">—</span> {d}
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className={`text-xs mt-auto pt-3 border-t ${product.isHub ? 'border-white/20 text-bronze-100' : 'border-stone-200 text-stone-400'}`}>{product.feeds}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-stone-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">See RealDesk on Your Projects</h2>
          <p className="text-stone-500 mb-8">One connected suite, from the first web enquiry to handover. Let's walk through it on your own inventory.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded group">
              Schedule a Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 border border-stone-300 text-stone-700 text-sm font-medium uppercase tracking-wider hover:border-bronze-400 transition-colors rounded group">
              Explore Other Products <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </Section>

      <Contact />
    </div>
  );
};
