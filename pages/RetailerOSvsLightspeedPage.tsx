import React from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X, IndianRupee, Zap, Package, Shield, BarChart3, Cloud } from 'lucide-react';
import { FAQSection } from '../components/FAQSection';
import { retailerOSvsLightspeedFAQs } from '../components/StructuredData';

const comparisonRows = [
  { feature: "Telecom-Specific Workflows", retaileros: "Purpose-built for telecom retail — IMEI tracking, scheme management, carrier integrations", lightspeed: "Generic retail POS with a cellphone store landing page but no telecom-specific features", winner: "retaileros" },
  { feature: "IMEI / Serial Tracking", retaileros: "Auto-capture via barcode, camera, or manual entry with purchase-to-sale audit trail", lightspeed: "Basic serial number field available but not purpose-built for IMEI workflows", winner: "retaileros" },
  { feature: "Brand Scheme Management", retaileros: "Native engine for Samsung, Vivo, Oppo, Xiaomi schemes, cashbacks, and exchange offers", lightspeed: "Not available — no concept of brand schemes or promotional tracking", winner: "retaileros" },
  { feature: "GST-Compliant Billing", retaileros: "Native GST invoicing with HSN codes, reverse charge, and credit notes", lightspeed: "Designed for US/Canadian tax systems — not built for Indian GST", winner: "retaileros" },
  { feature: "Pricing Transparency", retaileros: "Clear SaaS pricing, no long-term contracts required", lightspeed: "Starts at $89/mo — but users report aggressive price increases and forced payment processor lock-in", winner: "retaileros" },
  { feature: "Payment Processor Freedom", retaileros: "Works with any payment processor", lightspeed: "Must use Lightspeed Payments or face 2-3x higher subscription cost", winner: "retaileros" },
  { feature: "Product Catalog", retaileros: "Focused on electronics and telecom inventory categories", lightspeed: "Preloaded catalog with 8M+ items across all retail categories", winner: "lightspeed" },
  { feature: "Contract Requirements", retaileros: "No long-term contracts — quarterly+ billing with flexibility", lightspeed: "1-3 year contracts that are expensive to cancel", winner: "retaileros" },
  { feature: "WhatsApp Notifications", retaileros: "Built-in WhatsApp alerts for customers and staff", lightspeed: "Not available", winner: "retaileros" },
  { feature: "AI-Powered Insights", retaileros: "Demand forecasting, slow-moving SKU alerts, smart reorder suggestions", lightspeed: "Advanced analytics available but only on Core plan ($149/mo) and above", winner: "retaileros" },
  { feature: "E-Commerce Integration", retaileros: "Focused on in-store operations", lightspeed: "Built-in e-commerce with omnichannel capabilities", winner: "lightspeed" },
  { feature: "Customer Support", retaileros: "Dedicated support with quick response times", lightspeed: "Users report long wait times and inconsistent follow-up", winner: "retaileros" },
];

const whySwitch = [
  { icon: Package, title: "Purpose-Built for Telecom Retail", desc: "Lightspeed markets a 'cellphone store POS' page, but it's the same generic retail platform. RetailerOS is built from the ground up for mobile phone shops — IMEI tracking, scheme management, and carrier workflows are core features." },
  { icon: IndianRupee, title: "No Price Trap", desc: "Lightspeed users report aggressive price increases — sometimes $40/month without clear notification. RetailerOS offers stable, transparent pricing without surprise hikes or forced payment processor lock-in." },
  { icon: Shield, title: "No Payment Processor Lock-In", desc: "Lightspeed forces you to use Lightspeed Payments or pay 2-3x higher subscription fees. RetailerOS works with any payment processor you choose — your business, your terms." },
  { icon: Zap, title: "No Long-Term Contracts", desc: "Lightspeed locks you into 1-3 year contracts that are expensive to cancel. RetailerOS offers flexible quarterly+ billing — no long-term commitments, no cancellation penalties." },
  { icon: BarChart3, title: "All Features Included", desc: "Lightspeed gates advanced analytics behind the $149/month Core plan and loyalty behind the $289/month Plus plan. RetailerOS includes all features in one price — no tiered upselling." },
  { icon: Cloud, title: "GST-Ready, India-First", desc: "Lightspeed is built for US and Canadian tax systems. RetailerOS handles HSN codes, GST invoicing, reverse charge, and credit notes natively — built for Indian compliance from day one." },
];

export const RetailerOSvsLightspeedPage: React.FC = () => {
  return (
    <div>
      <PageHero
        backLink={{ label: "RetailerOS", href: "/products/retaileros" }}
        label="Comparison"
        title={<>RetailerOS vs Lightspeed: <span className="bronze-gradient-text">No Lock-In, No Surprises</span></>}
        subtitle="Lightspeed Retail starts affordable but escalates quickly — forced payment processors, annual contracts, and gated features. For telecom retailers in India, RetailerOS offers purpose-built features at a transparent price."
        backgroundImage="/images/retaileros-page-hero.jpg"
      >
        <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-bronze-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-500 transition-colors rounded group">
          Try RetailerOS Free <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </PageHero>

      {/* Quick Summary */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">Why Telecom Retailers Switch from Lightspeed</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">Lightspeed is a capable generic retail POS. But for telecom and electronics retailers in India, it lacks the telecom-specific features you need — and the pricing model comes with strings attached.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "2-3x", label: "Higher Without Their Processor", desc: "Lightspeed charges up to 3x more if you don't use Lightspeed Payments" },
              { value: "$89+", label: "Per Month Starting", desc: "And that's the Basic plan — analytics and loyalty cost $149-$289/mo" },
              { value: "0", label: "Lock-In with RetailerOS", desc: "No forced payment processors, no long-term contracts, no surprise price hikes" },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-8 bg-stone-50 rounded-lg border border-stone-200">
                <div className="text-4xl sm:text-5xl font-bold text-stone-900 mb-2">{stat.value}</div>
                <div className="text-bronze-600 font-medium text-sm uppercase tracking-wider mb-2">{stat.label}</div>
                <p className="text-stone-400 text-sm">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Feature Comparison Table */}
      <Section className="bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">Feature-by-Feature Comparison</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">See how RetailerOS compares to Lightspeed Retail for telecom and electronics stores.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-300">
                  <th className="text-left py-4 px-4 text-sm font-medium text-stone-500 uppercase tracking-wider">Feature</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-bronze-600 uppercase tracking-wider">RetailerOS</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-stone-500 uppercase tracking-wider">Lightspeed</th>
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
                        {row.winner === "tie" && <span className="text-stone-400 mt-0.5 shrink-0">—</span>}
                        {row.winner === "lightspeed" && <span className="text-stone-400 mt-0.5 shrink-0">—</span>}
                        <span>{row.retaileros}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-stone-500">
                      <div className="flex items-start gap-2">
                        {row.winner === "lightspeed" && <Check size={16} className="text-green-600 mt-0.5 shrink-0" />}
                        {row.winner === "retaileros" && <X size={16} className="text-red-400 mt-0.5 shrink-0" />}
                        {row.winner === "tie" && <span className="text-stone-400 mt-0.5 shrink-0">—</span>}
                        <span>{row.lightspeed}</span>
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
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">Why RetailerOS Over Lightspeed?</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">If you're running a telecom or electronics retail business, here's why RetailerOS is the better choice.</p>
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

      {/* Fair comparison */}
      <Section className="bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">When Does Lightspeed Make Sense?</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-8">We believe in honest comparisons. Lightspeed is a solid choice if:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-stone-200 rounded-lg">
              <h3 className="font-medium text-stone-900 mb-4">Choose Lightspeed if you...</h3>
              <ul className="space-y-3 text-sm text-stone-500">
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-400 mt-0.5 shrink-0" /> Run a general retail store (clothing, sports, home goods)</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-400 mt-0.5 shrink-0" /> Need a preloaded catalog with millions of items</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-400 mt-0.5 shrink-0" /> Want integrated e-commerce and omnichannel selling</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-400 mt-0.5 shrink-0" /> Operate in the US or Canada with Lightspeed Payments</li>
              </ul>
            </div>
            <div className="p-6 bg-bronze-50 border border-bronze-200 rounded-lg">
              <h3 className="font-medium text-stone-900 mb-4">Choose RetailerOS if you...</h3>
              <ul className="space-y-3 text-sm text-stone-700">
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Run a telecom or electronics retail store</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Need IMEI tracking and brand scheme management</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Want transparent pricing without processor lock-in</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Need GST-compliant billing for Indian operations</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <FAQSection
        faqs={retailerOSvsLightspeedFAQs}
        title="RetailerOS vs Lightspeed — Frequently Asked Questions"
        subtitle="Common questions about choosing RetailerOS over Lightspeed for telecom retail."
      />

      {/* CTA */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Ready for Transparent, Telecom-First Retail Software?</h2>
          <p className="text-stone-500 mb-8">No forced payment processors. No surprise price hikes. No feature gating. Just purpose-built telecom retail software at a fair price.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded group">
            Schedule a Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Section>

      <Contact />
    </div>
  );
};
