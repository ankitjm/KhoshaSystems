import React from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Network } from 'lucide-react';

const hubGrid = [
  { name: "Project Landing Page", image: "/images/realdesk/realdesk-landingpage.webp", feeds: "Feeds CRM" },
  { name: "QR WebForm", image: "/images/realdesk/realdesk-qr-webform.webp", feeds: "Feeds CRM" },
  { name: "GRE Reception", image: "/images/realdesk/realdesk-gre-reception.webp", feeds: "Feeds CRM + Sales Studio" },
  { name: "CP App", image: "/images/realdesk/realdesk-cp-app.webp", feeds: "Feeds CRM" },
  null, // center — CRM hub
  { name: "Sales Studio", image: "/images/realdesk/realdesk-sales-studio.webp", feeds: "Feeds CRM via GRE Reception" },
  { name: "Post Sales", image: "/images/realdesk/realdedesk-post-sales.webp", feeds: "Feeds CRM" },
  { name: "Booking Engine", image: "/images/realdesk/realdesk-booking-enginee.webp", feeds: "Feeds CRM + Sales Studio" },
  { name: "EOI Engine", image: "/images/realdesk/realdesk-eoi-engine.webp", feeds: "Feeds CRM" },
];

const closerLook = [
  {
    name: "Project Landing Page",
    tagline: "Capture attention. Spark interest.",
    image: "/images/realdesk/realdesk-landingpage.webp",
    description: "The deepest-built product in the suite: three complete design directions, not a shared template. Astera runs warm and architectural, Velora is elevated and photographic, Novelle is cool and systematic — each with its own phone-width page, not a crop of the desktop version.",
    depth: ["3 complete design directions (Astera, Velora, Novelle)", "25 built-in capabilities across 5 stages — Capture, Target, Optimise, Nurture, Measure", "Remarketing pixels, A/B testing, Core Web Vitals, heat maps, DPDP consent"],
    big: true,
  },
  {
    name: "QR WebForm",
    tagline: "Capture leads instantly.",
    image: "/images/realdesk/realdesk-qr-webform.webp",
    description: "A real scannable code that lives on four physical surfaces a buyer actually stands in front of — turning a crowded expo floor or a sales gallery wall into a lead capture point with no app and no typing.",
    depth: ["Expo Pillar, Sales Gallery, Property Expo, Event Registration", "Instant capture, accurate & secure, actionable insights, connected ecosystem"],
    big: true,
  },
  { name: "GRE Reception", tagline: "Welcome and start the journey.", image: "/images/realdesk/realdesk-gre-reception.webp", description: "Logs the walk-in and sets up the presentation that follows it — the only product feeding two others at once.", depth: null, big: false },
  { name: "Sales Studio", tagline: "Present inventory visually. Sell smarter. Win more.", image: "/images/realdesk/realdesk-sales-studio.webp", description: "Turns a visit into a recorded unit shortlist, reaching the CRM by way of GRE Reception — the only two-hop story in the suite.", depth: null, big: false },
  { name: "EOI Engine", tagline: "Launch-day control. Zero chaos.", image: "/images/realdesk/realdesk-eoi-engine.webp", description: "Built for the one day demand arrives all at once, so a launch doesn't turn into a spreadsheet crisis.", depth: null, big: false },
  { name: "Booking Engine", tagline: "Lock the unit. Seal the deal.", image: "/images/realdesk/realdesk-booking-enginee.webp", description: "Confirms a booking and tells Sales Studio immediately — the moment a unit is taken, inventory reflects it.", depth: null, big: false },
  { name: "CP App", tagline: "Channel visibility. Partner performance.", image: "/images/realdesk/realdesk-cp-app.webp", description: "Broker-sourced demand lands in the same pipeline as direct demand — visible, and measurable per partner.", depth: null, big: false },
  { name: "Post Sales", tagline: "From booking to handover and beyond.", image: "/images/realdesk/realdedesk-post-sales.webp", description: "The far end of the journey — booking through construction updates to final possession.", depth: null, big: false },
];

export const RealDeskHubPage: React.FC = () => {
  return (
    <div>
      <PageHero
        backLink={{ label: "All Products", href: "/products" }}
        label="RealDesk — The Hub"
        title={<>Eight Products. <span className="bronze-gradient-text">One Hub.</span></>}
        subtitle="RealDesk's own home screen draws this exact shape: every product on a ring around the CRM, feeding it directly or in one hop. Here's that architecture, laid out."
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
            <strong>RealDesk</strong> is a connected sales suite by Khosha Systems for real estate developers and brokers. Eight products surround one CRM — every one of them writes to it, and it writes to none of them.
          </p>
        </div>
      </Section>

      {/* Hub diagram */}
      <Section className="bg-stone-900 relative overflow-hidden !py-10 sm:!py-12 md:!py-14">
        <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 pattern-diagonal opacity-30 pointer-events-none" />
        <div className="max-w-2xl mx-auto relative">
          <div className="text-center mb-6 sm:mb-8">
            <span className="text-bronze-400 font-semibold tracking-widest uppercase text-sm block mb-2">The Architecture</span>
            <h2 className="text-xl sm:text-2xl font-serif text-white">Every Line Leads to the CRM.</h2>
          </div>
          <div className="relative max-w-sm sm:max-w-md mx-auto">
            {/* Radial glow behind the hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] rounded-full bg-bronze-400/35 blur-3xl pointer-events-none" />

            {/* Rotating dashed ring around the hub */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-[calc(33.333%+1rem)] h-[calc(33.333%+1rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-bronze-400/40 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />

            {/* Connector lines from each product to the hub */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 3 3" preserveAspectRatio="none">
              {hubGrid.map((item, i) => {
                if (!item) return null;
                const col = i % 3, row = Math.floor(i / 3);
                return (
                  <line key={i} x1={col + 0.5} y1={row + 0.5} x2={1.5} y2={1.5}
                    stroke="#d4b896" strokeOpacity="0.55" strokeWidth="0.025" strokeLinecap="round" />
                );
              })}
              {hubGrid.map((item, i) => {
                if (!item) return null;
                const col = i % 3, row = Math.floor(i / 3);
                return <circle key={`n-${i}`} cx={col + 0.5} cy={row + 0.5} r="0.04" fill="#d4b896" fillOpacity="0.7" />;
              })}
              <circle cx="1.5" cy="1.5" r="0.05" fill="#e0ccad" />
            </svg>

            <div className="relative grid grid-cols-3 gap-1.5 sm:gap-2">
              {hubGrid.map((item, i) => {
                if (!item) {
                  return (
                    <motion.div key="hub"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                      viewport={{ once: true }}
                      className="relative bg-gradient-to-br from-bronze-400 via-bronze-600 to-bronze-800 rounded-lg flex flex-col items-center justify-center text-center p-2 sm:p-3 aspect-square shadow-[0_0_0_1px_rgba(180,135,94,0.3),0_8px_32px_rgba(139,101,66,0.5)] ring-1 ring-bronze-200/50 z-10">
                      <Network size={20} className="text-white mb-1 drop-shadow" />
                      <div className="text-white font-serif font-bold text-xs sm:text-sm drop-shadow">CRM</div>
                      <div className="text-white/80 text-[8px] sm:text-[9px] uppercase tracking-widest mt-0.5">The Hub</div>
                    </motion.div>
                  );
                }
                return (
                  <motion.div key={item.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                    className="relative z-10 bg-gradient-to-br from-stone-800 to-stone-900 border border-stone-700 rounded-lg p-2 sm:p-2.5 aspect-square flex flex-col items-center justify-center text-center gap-1 hover:border-bronze-500/60 hover:-translate-y-0.5 transition-all">
                    <div className="w-full h-7 sm:h-8 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                    </div>
                    <div className="text-white text-[9px] sm:text-[10px] font-medium leading-tight">{item.name}</div>
                    <div className="text-bronze-400 text-[7px] sm:text-[8px] uppercase tracking-wider">{item.feeds}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* Closer look */}
      <Section className="bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-4">A Closer Look</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Some of These Run Deep.</h2>
            <p className="text-stone-500">The Landing Page and QR WebForm are the two most built-out products in the suite today — sized here to match.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {closerLook.map((product, i) => (
              <motion.div key={product.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.04 * i }}
                className={`bg-stone-50 border border-stone-200 rounded-xl overflow-hidden hover:border-bronze-300 hover:shadow-sm transition-all ${product.big ? 'sm:col-span-2' : ''}`}>
                <div className={`flex ${product.big ? 'flex-col sm:flex-row sm:items-start' : 'flex-col'}`}>
                  <div className={`bg-white border-b sm:border-b-0 ${product.big ? 'sm:w-48' : ''} border-stone-100 flex items-center justify-center p-4 ${product.big ? 'h-40 sm:h-auto sm:max-h-64' : 'h-40'}`}>
                    <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                  </div>
                  <div className={`p-6 flex-1 ${product.big ? 'sm:border-l sm:border-stone-100' : ''}`}>
                    <h3 className="text-stone-900 font-serif text-lg mb-1">{product.name}</h3>
                    <p className="text-bronze-600 text-xs uppercase tracking-wider font-medium mb-3">{product.tagline}</p>
                    <p className="text-stone-600 text-sm leading-relaxed mb-3">{product.description}</p>
                    {product.depth && (
                      <ul className="space-y-1.5">
                        {product.depth.map((d, j) => (
                          <li key={j} className="text-xs text-stone-500 flex items-start gap-2">
                            <span className="text-bronze-400 mt-0.5">—</span> {d}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-stone-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">See the Architecture on Your Projects</h2>
          <p className="text-stone-500 mb-8">One CRM, every product feeding it. Let's walk through it on your own inventory.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded group">
              Schedule a Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/products/real-desk-journey" className="inline-flex items-center gap-2 px-8 py-4 border border-stone-300 text-stone-700 text-sm font-medium uppercase tracking-wider hover:border-bronze-400 transition-colors rounded group">
              See the Journey <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </Section>

      <Contact />
    </div>
  );
};
