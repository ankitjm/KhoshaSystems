import React from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X, Cloud, IndianRupee, Zap, Package, Smartphone, BarChart3 } from 'lucide-react';
import { FAQSection } from '../components/FAQSection';
import { retailerOSvsIQmetrixFAQs } from '../components/StructuredData';

const comparisonRows = [
  { feature: "India Market Focus", retaileros: "Built for Indian telecom retail from day one", iqmetrix: "North America only (US & Canada)", winner: "retaileros" },
  { feature: "GST-Compliant Billing", retaileros: "Native GST invoicing with HSN codes", iqmetrix: "US/Canada tax systems only", winner: "retaileros" },
  { feature: "IMEI Tracking", retaileros: "Auto-capture via barcode, camera, or manual entry", iqmetrix: "Available but depends on manual entry", winner: "retaileros" },
  { feature: "Brand Scheme Management", retaileros: "Native scheme, cashback & exchange offer engine", iqmetrix: "Not a core feature", winner: "retaileros" },
  { feature: "Pricing Transparency", retaileros: "Clear SaaS pricing, no sales calls needed", iqmetrix: "Opaque enterprise pricing, demo required", winner: "retaileros" },
  { feature: "Setup Time", retaileros: "Cloud-native, go live in days", iqmetrix: "Enterprise deployment with professional services", winner: "retaileros" },
  { feature: "WhatsApp Notifications", retaileros: "Built-in WhatsApp customer alerts", iqmetrix: "Not available", winner: "retaileros" },
  { feature: "Platform Architecture", retaileros: "One unified cloud platform", iqmetrix: "Six separate modules (Transact, Activate, Fulfill, Operate, Unify, Connect)", winner: "retaileros" },
  { feature: "Carrier Integrations", retaileros: "Indian telecom operators & distributors", iqmetrix: "US/Canadian carriers (AT&T, Verizon, T-Mobile, Bell, Rogers)", winner: "tie" },
  { feature: "AI-Powered Insights", retaileros: "Demand forecasting, slow-moving SKU alerts, smart reorder", iqmetrix: "General analytics and reporting", winner: "retaileros" },
  { feature: "Market Presence", retaileros: "Growing in India", iqmetrix: "27 years, 20,000+ stores in North America", winner: "iqmetrix" },
  { feature: "Distributor Portal", retaileros: "Brand & distributor sell-through visibility", iqmetrix: "Carrier-focused portal", winner: "retaileros" },
];

const whySwitch = [
  { icon: IndianRupee, title: "Built for India, Not Retrofitted", desc: "iQmetrix was built for AT&T and Verizon stores. RetailerOS was built for the Indian telecom retailer — GST, IMEI management, brand schemes, and WhatsApp notifications are native, not afterthoughts." },
  { icon: Zap, title: "One Platform, Not Six Modules", desc: "iQmetrix requires you to navigate Transact, Activate, Fulfill, Operate, Unify, and Connect. RetailerOS is one unified system that does it all without the enterprise complexity." },
  { icon: Cloud, title: "Start in Days, Not Months", desc: "iQmetrix deployments require professional services and enterprise onboarding. RetailerOS is cloud-native and designed for rapid deployment — go live in days." },
  { icon: Package, title: "Scheme Management That Works", desc: "Indian telecom retail runs on brand schemes and cashbacks. RetailerOS tracks Samsung, Vivo, Oppo, and Xiaomi schemes automatically. iQmetrix doesn't have this capability." },
  { icon: Smartphone, title: "Smart Automation vs Manual Entry", desc: "iQmetrix reviewers report dependency on manual entry for inventory accuracy. RetailerOS uses IMEI auto-capture and AI-powered automation to eliminate human error." },
  { icon: BarChart3, title: "Transparent Pricing", desc: "No need to sit through a demo and wait for a quote. RetailerOS offers clear, affordable SaaS pricing that a single-store retailer can understand and afford." },
];

export const RetailerOSvsIQmetrixPage: React.FC = () => {
  return (
    <div>
      <PageHero
        backLink={{ label: "RetailerOS", href: "/products/retaileros" }}
        label="Comparison"
        title={<>RetailerOS vs iQmetrix: <span className="bronze-gradient-text">The India-First Alternative</span></>}
        subtitle="iQmetrix powers 20,000+ stores across North America. But if you're a telecom or electronics retailer in India, you need software built for your market — GST billing, IMEI tracking, brand scheme management, and affordable pricing."
        backgroundImage="/images/retaileros-page-hero.jpg"
      >
        <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-bronze-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-500 transition-colors rounded group">
          Try RetailerOS Free <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </PageHero>

      {/* Quick Summary */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">Why Indian Retailers Choose RetailerOS</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">iQmetrix is a powerful platform — for North American telecom retail. For Indian retailers, RetailerOS delivers what matters: GST compliance, brand scheme tracking, and pricing that works for your business.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "100%", label: "India-Focused", desc: "GST billing, Indian carrier integrations, WhatsApp notifications" },
              { value: "1/10th", label: "The Cost", desc: "Affordable SaaS pricing vs enterprise contracts" },
              { value: "Days", label: "Not Months", desc: "Cloud-native setup vs enterprise deployment cycles" },
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
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">See how RetailerOS stacks up against iQmetrix for Indian telecom and electronics retail.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-300">
                  <th className="text-left py-4 px-4 text-sm font-medium text-stone-500 uppercase tracking-wider">Feature</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-bronze-600 uppercase tracking-wider">RetailerOS</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-stone-500 uppercase tracking-wider">iQmetrix</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <motion.tr key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                    className="border-b border-stone-200 hover:bg-white transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-stone-900">{row.feature}</td>
                    <td className="py-4 px-4 text-sm text-stone-700">
                      <div className="flex items-start gap-2">
                        {row.winner === "retaileros" && <Check size={16} className="text-green-600 mt-0.5 shrink-0" />}
                        {row.winner === "tie" && <span className="text-stone-500 mt-0.5 shrink-0">—</span>}
                        {row.winner === "iqmetrix" && <span className="text-stone-500 mt-0.5 shrink-0">—</span>}
                        <span>{row.retaileros}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-stone-500">
                      <div className="flex items-start gap-2">
                        {row.winner === "iqmetrix" && <Check size={16} className="text-green-600 mt-0.5 shrink-0" />}
                        {row.winner === "retaileros" && <X size={16} className="text-red-400 mt-0.5 shrink-0" />}
                        {row.winner === "tie" && <span className="text-stone-500 mt-0.5 shrink-0">—</span>}
                        <span>{row.iqmetrix}</span>
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
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">Why RetailerOS Over iQmetrix?</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">If you're running a telecom or electronics retail business in India, here's why RetailerOS is the better choice.</p>
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

      {/* Who is iQmetrix for? (fair comparison) */}
      <Section className="bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">When Does iQmetrix Make Sense?</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-8">We believe in honest comparisons. iQmetrix is a solid choice if:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-stone-200 rounded-lg">
              <h3 className="font-medium text-stone-900 mb-4">Choose iQmetrix if you...</h3>
              <ul className="space-y-3 text-sm text-stone-500">
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-500 mt-0.5 shrink-0" /> Operate stores in the US or Canada</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-500 mt-0.5 shrink-0" /> Need integrations with AT&T, Verizon, or T-Mobile</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-500 mt-0.5 shrink-0" /> Have a large IT team for enterprise deployment</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-500 mt-0.5 shrink-0" /> Want a platform with 27 years of North American market experience</li>
              </ul>
            </div>
            <div className="p-6 bg-bronze-50 border border-bronze-200 rounded-lg">
              <h3 className="font-medium text-stone-900 mb-4">Choose RetailerOS if you...</h3>
              <ul className="space-y-3 text-sm text-stone-700">
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Operate in India or plan to expand in India</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Need GST-compliant billing and Indian carrier support</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Want to manage brand schemes and cashbacks natively</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Need affordable pricing without enterprise sales cycles</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <FAQSection
        faqs={retailerOSvsIQmetrixFAQs}
        title="RetailerOS vs iQmetrix — Frequently Asked Questions"
        subtitle="Common questions about switching from iQmetrix to RetailerOS."
      />

      {/* CTA */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Ready to Try the India-First Alternative?</h2>
          <p className="text-stone-500 mb-8">Join retailers across India who switched from legacy systems to RetailerOS. GST-compliant, scheme-aware, and cloud-native from day one.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded group">
            Schedule a Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Section>

      <Contact />
    </div>
  );
};
