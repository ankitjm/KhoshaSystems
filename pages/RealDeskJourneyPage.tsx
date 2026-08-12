import React from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, Network, Sparkles } from 'lucide-react';

const journey = [
  {
    n: "01",
    name: "Project Landing Page",
    tagline: "Capture attention. Spark interest.",
    image: "/images/realdesk/realdesk-landingpage.webp",
    capturePoint: "Web Enquiry",
    description: "The first touchpoint in the journey, built as three complete design directions — Astera (warm, architectural), Velora (elevated, photographic), and Novelle (cool, systematic) — so a developer picks the page that matches their project, not a shared template forced to fit.",
    depth: ["3 complete design directions", "25 built-in capabilities across 5 stages: Capture, Target, Optimise, Nurture, Measure", "Remarketing pixels, A/B testing, heat maps, and DPDP-compliant consent — all native"],
    feeds: "Hands the CRM a web enquiry.",
  },
  {
    n: "02",
    name: "QR WebForm",
    tagline: "Capture leads instantly.",
    image: "/images/realdesk/realdesk-qr-webform.webp",
    capturePoint: "QR Scan",
    description: "A lead captured from a physical surface — no app, no typing. The same scannable code lives everywhere a prospect actually stands: on the expo pillar, in the sales gallery, at a property expo booth, or on an event registration desk.",
    depth: ["Lives on 4 physical surfaces: Expo Pillar, Sales Gallery, Property Expo, Event Registration", "Guarantees: instant capture, accurate & secure, actionable insights, connected ecosystem"],
    feeds: "Hands the CRM a QR scan.",
  },
  {
    n: "03",
    name: "GRE Reception",
    tagline: "Welcome and start the journey.",
    image: "/images/realdesk/realdesk-gre-reception.webp",
    capturePoint: "Walk-In",
    description: "The only product in the suite that feeds two others at once — a guest-relations executive logs the visit for the CRM, and in the same motion sets up the presentation that Sales Studio runs next.",
    depth: null,
    feeds: "Hands the CRM a walk-in, and hands Sales Studio the presentation setup.",
  },
  {
    n: "04",
    name: "CRM",
    tagline: "Own the pipeline. Never miss out.",
    image: "/images/realdesk/realdesk-crm.webp",
    capturePoint: null,
    description: "The hub. Every other product in the suite writes here; it writes to none of them. Eight incoming lines, zero outgoing — the architectural claim of the entire suite in a single fact.",
    depth: null,
    feeds: "The single source of truth for every lead, scan, walk-in, EOI, and referral.",
    isHub: true,
  },
  {
    n: "05",
    name: "Sales Studio",
    tagline: "Present inventory visually. Sell smarter. Win more.",
    image: "/images/realdesk/realdesk-sales-studio.webp",
    capturePoint: null,
    description: "The only two-hop story in the suite: a visit becomes a presentation, and a presentation becomes a recorded preference — reaching the CRM by way of GRE Reception, not directly.",
    depth: null,
    feeds: "Hands the CRM a recorded unit shortlist, via GRE Reception.",
  },
  {
    n: "06",
    name: "EOI Engine",
    tagline: "Launch-day control. Zero chaos.",
    image: "/images/realdesk/realdesk-eoi-engine.webp",
    capturePoint: "EOI Form",
    description: "Built for the one day a project's demand arrives all at once — the launch — so an expression-of-interest surge doesn't turn into a spreadsheet crisis.",
    depth: null,
    feeds: "Hands the CRM an EOI form.",
  },
  {
    n: "07",
    name: "Booking Engine",
    tagline: "Lock the unit. Seal the deal.",
    image: "/images/realdesk/realdesk-booking-enginee.webp",
    capturePoint: null,
    description: "The moment a unit is confirmed, the product that presents inventory has to know before it's ever shown again — so Booking Engine writes to Sales Studio as well as the CRM.",
    depth: null,
    feeds: "Hands the CRM and Sales Studio a blocked unit.",
  },
  {
    n: "08",
    name: "CP App",
    tagline: "Channel visibility. Partner performance.",
    image: "/images/realdesk/realdesk-cp-app.webp",
    capturePoint: "Channel Partner",
    description: "Broker-sourced demand lands in the same pipeline as direct demand — not in a spreadsheet beside it. Every referral is visible, and every partner's performance is measurable.",
    depth: null,
    feeds: "Hands the CRM a channel-partner referral.",
  },
  {
    n: "09",
    name: "Post Sales",
    tagline: "From booking to handover and beyond.",
    image: "/images/realdesk/realdedesk-post-sales.webp",
    capturePoint: null,
    description: "The far end of the journey the suite promises — from a booked unit through construction updates to final possession, still writing to the same pipeline it started in.",
    depth: null,
    feeds: "Hands the CRM possession tracking.",
  },
];

export const RealDeskJourneyPage: React.FC = () => {
  return (
    <div>
      <PageHero
        backLink={{ label: "All Products", href: "/products" }}
        label="RealDesk — The Journey"
        title={<>One Buyer's Journey, <span className="bronze-gradient-text">Nine Steps</span></>}
        subtitle="Follow a single lead from the first landing page to final possession — the exact order RealDesk's nine products hand off to each other, and to the one CRM every one of them feeds."
        backgroundImage="/images/realestate-page-hero.jpg"
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-bronze-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-500 transition-colors rounded group">
            Schedule a Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </PageHero>

      <Section className="bg-white border-b border-stone-100">
        <div className="max-w-3xl mx-auto text-center" data-speakable="true">
          <p className="text-lg sm:text-xl text-stone-700 leading-relaxed">
            <strong>RealDesk</strong> is a connected sales suite by Khosha Systems for real estate developers and brokers — nine products, each owning one step of the buyer's journey, all writing to a single CRM from first enquiry to possession.
          </p>
        </div>
      </Section>

      <Section className="bg-stone-50 !py-10 sm:!py-12 md:!py-14">
        <div className="max-w-3xl mx-auto">
          {journey.map((step, i) => (
            <div key={step.n}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4 }}
                className={step.isHub
                  ? "bg-stone-900 rounded-xl p-6 sm:p-8 relative overflow-hidden glow-bronze"
                  : "bg-white border border-stone-200 rounded-xl p-4 sm:p-5 hover:border-bronze-300 transition-colors"
                }
              >
                {step.isHub && (
                  <div className="absolute inset-0 pattern-diagonal opacity-40 pointer-events-none" />
                )}
                <div className={`relative grid grid-cols-1 ${step.isHub ? '' : 'sm:grid-cols-[auto,1fr]'} gap-3 sm:gap-5 items-center`}>
                  <div className={`flex ${step.isHub ? 'flex-row items-center gap-4' : 'items-center gap-3 sm:gap-4'}`}>
                    <span className={`font-serif font-bold text-2xl flex-shrink-0 ${step.isHub ? 'text-bronze-400' : 'text-stone-300'}`}>{step.n}</span>
                    <div className={`${step.isHub ? 'w-16 h-14' : 'w-24 h-20 sm:w-28 sm:h-24'} flex items-center justify-center flex-shrink-0`}>
                      <img src={step.image} alt={step.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <h3 className={`font-serif text-lg sm:text-xl ${step.isHub ? 'text-white' : 'text-stone-900'}`}>{step.name}</h3>
                      {step.isHub && (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-semibold text-bronze-400 bg-bronze-900/30 border border-bronze-700/40 px-2 py-0.5 rounded-full">
                          <Network size={11} /> The Hub
                        </span>
                      )}
                      {step.capturePoint && (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-semibold text-bronze-600 bg-bronze-50 border border-bronze-200 px-2 py-0.5 rounded-full">
                          <Sparkles size={11} /> {step.capturePoint}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs uppercase tracking-wider font-medium mb-1.5 ${step.isHub ? 'text-bronze-300' : 'text-bronze-600'}`}>{step.tagline}</p>
                    <p className={`text-sm leading-relaxed mb-1.5 ${step.isHub ? 'text-stone-300' : 'text-stone-600'}`}>{step.description}</p>
                    {step.depth && (
                      <ul className="space-y-1 mb-1.5">
                        {step.depth.map((d, j) => (
                          <li key={j} className="text-xs text-stone-500 flex items-start gap-2">
                            <span className="text-bronze-400 mt-0.5">—</span> {d}
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className={`text-xs pt-1.5 border-t ${step.isHub ? 'border-stone-700 text-bronze-300' : 'border-stone-100 text-stone-400'}`}>{step.feeds}</p>
                  </div>
                </div>
              </motion.div>
              {i < journey.length - 1 && (
                <div className="flex justify-center py-0.5">
                  <ArrowDown size={16} className="text-bronze-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-white !py-10 sm:!py-12 md:!py-14">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Nine Steps. One Pipeline.</h2>
          <p className="text-stone-500 mb-8">Every step above is a real product. Every handoff above is a real write to the same CRM.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded group">
              Schedule a Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/products/real-desk" className="inline-flex items-center gap-2 px-8 py-4 border border-stone-300 text-stone-700 text-sm font-medium uppercase tracking-wider hover:border-bronze-400 transition-colors rounded group">
              See the Overview <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </Section>

      <Contact />
    </div>
  );
};
