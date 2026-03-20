import React from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X, Shield, IndianRupee, Smartphone, Building2, MessageSquare, Clock } from 'lucide-react';
import { FAQSection } from '../components/FAQSection';
import { vmsVsEnvoyFAQs } from '../components/StructuredData';

const comparisonRows = [
  { feature: "Pricing", khosha: "INR pricing, affordable for Indian SMBs", envoy: "$4,345+/location/year (USD only) — Rs.3.6 lakh+ per location", winner: "khosha" },
  { feature: "India Compliance", khosha: "RERA-compliant visitor logs and Indian data residency", envoy: "GDPR, SOC 2, CCPA — no Indian compliance standards", winner: "khosha" },
  { feature: "Notifications", khosha: "WhatsApp + SMS notifications (India-first)", envoy: "Slack, Teams, Email, SMS — no WhatsApp", winner: "khosha" },
  { feature: "Hardware Requirements", khosha: "Works on Android tablets (affordable)", envoy: "iPad-centric (expensive in India)", winner: "khosha" },
  { feature: "Indian ID Verification", khosha: "Aadhaar, PAN, Driving License support", envoy: "Generic ID scanning — no Indian ID formats", winner: "khosha" },
  { feature: "Real Estate Use Case", khosha: "Purpose-built for site visits with CRM-linked conversion tracking", envoy: "Generic corporate visitor management", winner: "khosha" },
  { feature: "Local Support", khosha: "India-based team, IST support hours", envoy: "San Francisco HQ — 13.5 hour time zone gap", winner: "khosha" },
  { feature: "Low-Connectivity Mode", khosha: "Works in low-connectivity environments (construction sites)", envoy: "Cloud-dependent — requires stable internet", winner: "khosha" },
  { feature: "Badge Printing", khosha: "Badge printing with visitor details", envoy: "Professional badge printing with branding", winner: "tie" },
  { feature: "Access Control Integrations", khosha: "Basic access control integration", envoy: "100+ integrations (Okta, Brivo, Lenel S2)", winner: "envoy" },
  { feature: "Emergency Management", khosha: "Basic emergency notifications", envoy: "Full emergency management with two-way safety confirmation", winner: "envoy" },
  { feature: "Market Presence", khosha: "Growing in Indian market", envoy: "16,000+ workplaces globally (Disney, NVIDIA, Ford)", winner: "envoy" },
];

const whySwitch = [
  { icon: IndianRupee, title: "Enterprise Power, India Pricing", desc: "Envoy's Premium plan costs $4,345/location/year — Rs.3.6 lakh per location. For 5 locations, that's Rs.18+ lakh/year. Khosha VMS delivers the same core capabilities at a fraction of the cost, billed in INR." },
  { icon: Shield, title: "Built for India, Not Adapted for India", desc: "Envoy was built for Silicon Valley offices. Khosha VMS is built for Indian workplaces — WhatsApp notifications, RERA compliance, Aadhaar verification, and support in your time zone." },
  { icon: Building2, title: "Real Estate Visitor Intelligence", desc: "Envoy doesn't understand real estate site visits. Khosha VMS tracks visitor-to-buyer conversion, links with your CRM, and provides insights specific to real estate sales — a use case Envoy completely ignores." },
  { icon: Smartphone, title: "No iPad Tax", desc: "Envoy's check-in experience is built around iPads. In India, Android tablets cost a fraction of the price. Khosha VMS works beautifully on affordable Android hardware." },
  { icon: MessageSquare, title: "WhatsApp-First Alerts", desc: "In India, WhatsApp is the dominant business communication channel. Khosha VMS sends instant visitor alerts via WhatsApp — not Slack or Teams, which most Indian offices don't use." },
  { icon: Clock, title: "Support in Your Time Zone", desc: "When something goes wrong at 11 AM IST, Envoy's SF team is asleep. Khosha VMS has an India-based support team available during Indian business hours." },
];

export const VMSvsEnvoyPage: React.FC = () => {
  return (
    <div>
      <PageHero
        backLink={{ label: "Visitor Management", href: "/products/visitor-management" }}
        label="Comparison"
        title={<>Khosha VMS vs Envoy: <span className="bronze-gradient-text">India Pricing, India Compliance</span></>}
        subtitle="Envoy powers 16,000+ workplaces globally. But at $4,345+ per location per year with no Indian compliance, WhatsApp support, or local team — Indian businesses deserve a visitor management system built for their needs."
        backgroundImage="/images/vms-page-hero.jpg"
      >
        <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-bronze-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-500 transition-colors rounded group">
          Try Khosha VMS Free <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </PageHero>

      {/* Quick Summary */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">Why Indian Businesses Choose Khosha VMS</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">Envoy is a great product — for US corporate offices. For Indian workplaces, construction sites, and real estate offices, you need something built for your reality.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "1/5th", label: "The Cost", desc: "INR pricing vs $4,345+/location/year in USD" },
              { value: "100%", label: "India-Compliant", desc: "RERA, Aadhaar, and Indian data residency built in" },
              { value: "90%", label: "Faster Check-In", desc: "Digital QR check-in replaces paper registers in seconds" },
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
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">See how Khosha VMS compares to Envoy for Indian businesses and real estate operations.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-300">
                  <th className="text-left py-4 px-4 text-sm font-medium text-stone-500 uppercase tracking-wider">Feature</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-bronze-600 uppercase tracking-wider">Khosha VMS</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-stone-500 uppercase tracking-wider">Envoy</th>
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
                        {row.winner === "envoy" && <span className="text-stone-500 mt-0.5 shrink-0">—</span>}
                        <span>{row.khosha}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-stone-500">
                      <div className="flex items-start gap-2">
                        {row.winner === "envoy" && <Check size={16} className="text-green-600 mt-0.5 shrink-0" />}
                        {row.winner === "khosha" && <X size={16} className="text-red-400 mt-0.5 shrink-0" />}
                        {row.winner === "tie" && <span className="text-stone-500 mt-0.5 shrink-0">—</span>}
                        <span>{row.envoy}</span>
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
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">Why Khosha VMS Over Envoy?</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">For Indian offices, real estate sites, and co-working spaces that want enterprise features without the enterprise price.</p>
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
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">When Does Envoy Make Sense?</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-8">We believe in honest comparisons. Envoy is an excellent choice for certain scenarios.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-stone-200 rounded-lg">
              <h3 className="font-medium text-stone-900 mb-4">Choose Envoy if you...</h3>
              <ul className="space-y-3 text-sm text-stone-500">
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-500 mt-0.5 shrink-0" /> Have offices primarily in the US, UK, or Europe</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-500 mt-0.5 shrink-0" /> Need 100+ access control integrations (Okta, Brivo)</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-500 mt-0.5 shrink-0" /> Require GDPR, SOC 2, or ITAR compliance</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-500 mt-0.5 shrink-0" /> Want a full workplace platform (desks, rooms, parking, deliveries)</li>
              </ul>
            </div>
            <div className="p-6 bg-bronze-50 border border-bronze-200 rounded-lg">
              <h3 className="font-medium text-stone-900 mb-4">Choose Khosha VMS if you...</h3>
              <ul className="space-y-3 text-sm text-stone-700">
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Operate in India and need INR pricing</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Need RERA compliance and Indian ID verification</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Want WhatsApp-based visitor notifications</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Manage real estate sites and need CRM-linked visitor tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <FAQSection
        faqs={vmsVsEnvoyFAQs}
        title="Khosha VMS vs Envoy — Frequently Asked Questions"
        subtitle="Common questions about choosing Khosha VMS over Envoy for Indian businesses."
      />

      {/* CTA */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Ready for Visitor Management Built for India?</h2>
          <p className="text-stone-500 mb-8">Enterprise-grade visitor management at Indian pricing. RERA-compliant, WhatsApp-enabled, and Android-ready — Khosha VMS is built for how Indian businesses actually work.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded group">
            Schedule a Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Section>

      <Contact />
    </div>
  );
};
