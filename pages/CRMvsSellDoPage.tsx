import React from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X, Users, IndianRupee, Zap, Building2, MessageSquare, Globe } from 'lucide-react';
import { FAQSection } from '../components/FAQSection';
import { crmVsSellDoFAQs } from '../components/StructuredData';

const comparisonRows = [
  { feature: "Pricing Model", khosha: "Flat-rate pricing that doesn't penalize team growth", selldo: "Rs.3,499/user/month — costs scale with every hire", winner: "khosha" },
  { feature: "Complexity", khosha: "Focused on what matters: leads, pipeline, site visits, follow-ups", selldo: "50+ feature modules including call center ops, GPS tracking, post-sales accounting", winner: "khosha" },
  { feature: "Setup & Onboarding", khosha: "Go live in days with guided onboarding", selldo: "Claims 7-day deployment, but enterprise features mean longer real adoption", winner: "khosha" },
  { feature: "Portal Integrations", khosha: "Deep integration with 99acres, MagicBricks, Housing.com", selldo: "Portal integrations available as part of massive platform", winner: "tie" },
  { feature: "WhatsApp Communication", khosha: "WhatsApp-first follow-ups and notifications", selldo: "WhatsApp campaigns available but telephony issues reported", winner: "khosha" },
  { feature: "Performance on Slow Internet", khosha: "Lightweight, fast UI — works in Tier-2/3 cities", selldo: "Performance issues on slower connections reported by users", winner: "khosha" },
  { feature: "Channel Partner Portal", khosha: "Simple broker portal with deal tracking and commissions", selldo: "Complex partner management with ladder incentives", winner: "tie" },
  { feature: "Site Visit Tracking", khosha: "Built-in site visit scheduling and tracking", selldo: "GPS-based field force management (overkill for most developers)", winner: "khosha" },
  { feature: "Post-Sales Features", khosha: "Focused on pre-sales and sales — integrates with your existing accounting", selldo: "Demand letters, GST accounting, customer ledgers (duplicates existing tools)", winner: "khosha" },
  { feature: "RERA Compliance", khosha: "RERA-compliant documentation and audit trails", selldo: "RERA compliance available", winner: "tie" },
  { feature: "Market Presence", khosha: "Growing in Indian real estate market", selldo: "1,000+ clients, 50M+ leads managed since 2011", winner: "selldo" },
  { feature: "Multi-Project Management", khosha: "Multi-project portfolio with consolidated view", selldo: "Multi-project management available", winner: "tie" },
];

const whySwitch = [
  { icon: IndianRupee, title: "Your CRM Shouldn't Cost More Than Site Office Rent", desc: "At Rs.3,499/user/month, Sell.Do costs Rs.4.2 lakh/year for just 10 users — before add-ons. Khosha CRM's flat-rate pricing means your cost doesn't grow with every sales hire." },
  { icon: Zap, title: "Stop Paying for Features You'll Never Use", desc: "Post-sales accounting, GPS field tracking, call center tools — most developers already have separate systems for these. Khosha CRM focuses on what drives revenue: leads, follow-ups, and closings." },
  { icon: Globe, title: "Works Where Your Sites Are", desc: "Sell.Do users report performance issues on slower connections. Khosha CRM is built lightweight — it works smoothly in Tier-2 and Tier-3 cities where your construction sites actually are." },
  { icon: Building2, title: "Go Live This Week, Not Next Quarter", desc: "Enterprise platforms with 50+ modules take months to fully adopt. Khosha CRM gets your team productive in days with a focused feature set they can learn fast." },
  { icon: MessageSquare, title: "WhatsApp-First Communication", desc: "In Indian real estate, WhatsApp is how business happens. Khosha CRM puts WhatsApp at the center of your follow-up workflows — not as an afterthought buried in a marketing module." },
  { icon: Users, title: "Built for Builders Who Build", desc: "Sell.Do's enterprise complexity requires dedicated IT support. Khosha CRM is designed for real estate teams that want to sell properties, not manage software." },
];

export const CRMvsSellDoPage: React.FC = () => {
  return (
    <div>
      <PageHero
        backLink={{ label: "Real Estate CRM", href: "/products/real-estate-crm" }}
        label="Comparison"
        title={<>Khosha Real Estate CRM vs Sell.Do: <span className="bronze-gradient-text">Simpler, More Affordable</span></>}
        subtitle="Sell.Do has served 1,000+ real estate companies since 2011. But if you're a developer or broker who wants a CRM that's focused, affordable, and fast to deploy — without paying for features you'll never use — there's a better option."
        backgroundImage="/images/realestate-page-hero.jpg"
      >
        <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-bronze-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-500 transition-colors rounded group">
          Try Khosha CRM Free <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </PageHero>

      {/* Quick Summary */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">Why Developers Are Switching</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">Sell.Do is feature-rich — sometimes too rich. For real estate teams that want to focus on selling, not navigating complex software, Khosha CRM is the smarter choice.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "60%", label: "Lower Cost", desc: "Flat-rate pricing vs per-user fees that scale with every hire" },
              { value: "3 Days", label: "To Go Live", desc: "Focused onboarding vs weeks of enterprise setup" },
              { value: "85%", label: "Follow-Up Rate", desc: "Automated WhatsApp and SMS sequences that actually work" },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-8 bg-stone-50 rounded-lg border border-stone-200">
                <div className="text-4xl sm:text-5xl font-bold text-stone-900 mb-2">{stat.value}</div>
                <div className="text-bronze-600 font-medium text-sm uppercase tracking-wider mb-2">{stat.label}</div>
                <p className="text-stone-500 text-sm">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Feature Comparison Table */}
      <Section className="bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">Feature-by-Feature Comparison</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">See how Khosha Real Estate CRM compares to Sell.Do across the features that matter most.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-300">
                  <th className="text-left py-4 px-4 text-sm font-medium text-stone-500 uppercase tracking-wider">Feature</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-bronze-600 uppercase tracking-wider">Khosha CRM</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-stone-500 uppercase tracking-wider">Sell.Do</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <motion.tr key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                    className="border-b border-stone-200 hover:bg-white transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-stone-900">{row.feature}</td>
                    <td className="py-4 px-4 text-sm text-stone-700">
                      <div className="flex items-start gap-2">
                        {row.winner === "khosha" && <Check size={16} className="text-green-600 mt-0.5 shrink-0" />}
                        {row.winner === "tie" && <span className="text-stone-500 mt-0.5 shrink-0">—</span>}
                        {row.winner === "selldo" && <span className="text-stone-500 mt-0.5 shrink-0">—</span>}
                        <span>{row.khosha}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-stone-500">
                      <div className="flex items-start gap-2">
                        {row.winner === "selldo" && <Check size={16} className="text-green-600 mt-0.5 shrink-0" />}
                        {row.winner === "khosha" && <X size={16} className="text-red-400 mt-0.5 shrink-0" />}
                        {row.winner === "tie" && <span className="text-stone-500 mt-0.5 shrink-0">—</span>}
                        <span>{row.selldo}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Why Switch */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">Why Khosha CRM Over Sell.Do?</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">For real estate developers and brokers who want results without the complexity tax.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whySwitch.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1 }}
                className="p-6 sm:p-8 bg-stone-50 border border-stone-200 rounded-lg hover:border-bronze-300 hover:shadow-sm transition-all">
                <item.icon size={24} className="text-bronze-500 mb-4" />
                <h3 className="text-stone-900 font-medium text-lg mb-2">{item.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Fair Comparison */}
      <Section className="bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">When Does Sell.Do Make Sense?</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-8">We believe in honest comparisons. Sell.Do is a solid choice for certain use cases.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-stone-200 rounded-lg">
              <h3 className="font-medium text-stone-900 mb-4">Choose Sell.Do if you...</h3>
              <ul className="space-y-3 text-sm text-stone-500">
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-500 mt-0.5 shrink-0" /> Run a large development company with 50+ sales reps</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-500 mt-0.5 shrink-0" /> Need built-in call center operations</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-500 mt-0.5 shrink-0" /> Want post-sales accounting and demand letter generation in the CRM</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-500 mt-0.5 shrink-0" /> Have a dedicated IT team to manage complex software</li>
              </ul>
            </div>
            <div className="p-6 bg-bronze-50 border border-bronze-200 rounded-lg">
              <h3 className="font-medium text-stone-900 mb-4">Choose Khosha CRM if you...</h3>
              <ul className="space-y-3 text-sm text-stone-700">
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Are a small-to-mid developer managing 1-10 projects</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Want a CRM your team can learn in hours, not weeks</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Need affordable pricing that doesn't scale per-user</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Have sites in Tier-2/3 cities with variable internet</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <FAQSection
        faqs={crmVsSellDoFAQs}
        title="Khosha CRM vs Sell.Do — Frequently Asked Questions"
        subtitle="Common questions about switching from Sell.Do to Khosha Real Estate CRM."
      />

      {/* CTA */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Ready for a CRM That Lets You Focus on Selling?</h2>
          <p className="text-stone-500 mb-8">Join real estate developers across India who chose simplicity over bloat. Khosha CRM — purpose-built for Indian real estate, without the enterprise price tag.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded group">
            Schedule a Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Section>

      <Contact />
    </div>
  );
};
