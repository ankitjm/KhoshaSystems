import React from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X, IndianRupee, Zap, Package, Smartphone, BarChart3, Shield } from 'lucide-react';
import { FAQSection } from '../components/FAQSection';
import { retailerOSvsSquareFAQs } from '../components/StructuredData';

const comparisonRows = [
  { feature: "IMEI / Serial Number Tracking", retaileros: "Native IMEI capture via barcode, camera, or manual entry with full audit trail", square: "No serial number tracking at all — not even a barcode field (must use SKU workaround)", winner: "retaileros" },
  { feature: "Telecom Scheme Management", retaileros: "Built-in engine for brand schemes, cashbacks, and exchange offers", square: "Not available — designed for general retail and food service", winner: "retaileros" },
  { feature: "GST-Compliant Billing", retaileros: "Native GST invoicing with HSN codes, reverse charge, and credit notes", square: "US-focused tax system — no GST support for Indian businesses", winner: "retaileros" },
  { feature: "Free Tier", retaileros: "Full-featured trial — no crippled free tier that locks you in", square: "Free tier available but with basic features and 2.6% + $0.10 processing fees", winner: "tie" },
  { feature: "Fund Security", retaileros: "Standard payment processing — your funds are your funds", square: "Known for freezing and holding merchant funds without warning", winner: "retaileros" },
  { feature: "Per-Store Pricing", retaileros: "Different pricing rules per store location", square: "Uniform pricing — cross-location features only on Premium ($149/mo)", winner: "retaileros" },
  { feature: "WhatsApp Notifications", retaileros: "Built-in WhatsApp alerts for customers and staff", square: "Not available", winner: "retaileros" },
  { feature: "Inventory Management", retaileros: "Serial-level inventory with IMEI tracking, inter-store transfers, and AI reorder suggestions", square: "Basic inventory counts — not suited for serialized or complex inventory", winner: "retaileros" },
  { feature: "AI-Powered Insights", retaileros: "Demand forecasting, slow-moving SKU alerts, smart reorder suggestions", square: "Basic sales reporting — advanced retail reports only on Plus ($49/mo)", winner: "retaileros" },
  { feature: "Payment Hardware", retaileros: "Works with standard barcode scanners and printers", square: "Free Square Reader for new users, proprietary hardware ecosystem", winner: "tie" },
  { feature: "Ease of Setup", retaileros: "Cloud-native with guided onboarding for telecom retail", square: "Very easy setup for basic retail — designed for simplicity", winner: "tie" },
  { feature: "Phone Support", retaileros: "Dedicated support team", square: "No phone support on free plan — email response times are slow", winner: "retaileros" },
];

const whySwitch = [
  { icon: Smartphone, title: "Serialized Inventory, Not SKU Counts", desc: "Square for Retail doesn't even have a barcode field — let alone IMEI tracking. Merchants must enter barcodes in the SKU spot as a workaround. RetailerOS tracks every device individually from purchase to sale." },
  { icon: IndianRupee, title: "No Free-Tier Lock-In", desc: "Square's free plan hooks you with basic features, then charges $49-$149/month per location for the features you actually need. Plus, 2.6% processing fees on every transaction add up fast for high-volume stores." },
  { icon: Shield, title: "Your Funds Stay Yours", desc: "Square is notorious for freezing and holding merchant funds without warning. RetailerOS doesn't process payments — you use your own processor and keep full control of your money." },
  { icon: Package, title: "Scheme Management Built In", desc: "Indian telecom retail runs on brand schemes and cashbacks. RetailerOS tracks Samsung, Vivo, Oppo, and Xiaomi schemes automatically. Square has no concept of promotional scheme tracking." },
  { icon: Zap, title: "GST-Compliant From Day One", desc: "Square is built for US tax systems. RetailerOS handles HSN codes, GST invoicing, reverse charge, and credit notes natively — designed for Indian compliance requirements." },
  { icon: BarChart3, title: "AI-Powered Operations", desc: "RetailerOS uses AI for demand forecasting, slow-moving SKU detection, and smart reorder suggestions. Square's reporting is basic — advanced retail reports are locked behind the $49/month Plus plan." },
];

export const RetailerOSvsSquarePage: React.FC = () => {
  return (
    <div>
      <PageHero
        backLink={{ label: "RetailerOS", href: "/products/retaileros" }}
        label="Comparison"
        title={<>RetailerOS vs Square for Retail: <span className="bronze-gradient-text">Beyond Basic POS</span></>}
        subtitle="Square for Retail is simple and free to start. But for telecom and electronics retailers who need IMEI tracking, brand scheme management, and GST billing, simple isn't enough — you need purpose-built."
        backgroundImage="/images/retaileros-page-hero.jpg"
      >
        <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-bronze-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-500 transition-colors rounded group">
          Try RetailerOS Free <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </PageHero>

      {/* Quick Summary */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">Why Telecom Retailers Outgrow Square</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">Square is designed for simplicity — coffee shops, clothing stores, general retail. Telecom and electronics retail needs serialized inventory, scheme tracking, and compliance features that Square was never built to handle.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "0", label: "Serial Number Support", desc: "Square has no IMEI or serial tracking — not even a barcode field" },
              { value: "2.6%", label: "Per Transaction", desc: "Square's processing fees add up fast for high-volume electronics stores" },
              { value: "100%", label: "Fund Control", desc: "No fund freezes — RetailerOS doesn't hold your money hostage" },
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
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">See how RetailerOS compares to Square for Retail for telecom and electronics stores.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-300">
                  <th className="text-left py-4 px-4 text-sm font-medium text-stone-500 uppercase tracking-wider">Feature</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-bronze-600 uppercase tracking-wider">RetailerOS</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-stone-500 uppercase tracking-wider">Square for Retail</th>
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
                        {row.winner === "square" && <span className="text-stone-500 mt-0.5 shrink-0">—</span>}
                        <span>{row.retaileros}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-stone-500">
                      <div className="flex items-start gap-2">
                        {row.winner === "square" && <Check size={16} className="text-green-600 mt-0.5 shrink-0" />}
                        {row.winner === "retaileros" && <X size={16} className="text-red-400 mt-0.5 shrink-0" />}
                        {row.winner === "tie" && <span className="text-stone-500 mt-0.5 shrink-0">—</span>}
                        <span>{row.square}</span>
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
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">Why RetailerOS Over Square for Retail?</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">Square is great for getting started. But telecom retailers need more than a basic POS. Here's why RetailerOS is the upgrade.</p>
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
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">When Does Square for Retail Make Sense?</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-8">We believe in honest comparisons. Square for Retail is a solid choice if:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-stone-200 rounded-lg">
              <h3 className="font-medium text-stone-900 mb-4">Choose Square if you...</h3>
              <ul className="space-y-3 text-sm text-stone-500">
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-500 mt-0.5 shrink-0" /> Run a general retail store (not electronics/telecom)</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-500 mt-0.5 shrink-0" /> Want to start free and don't need advanced features</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-500 mt-0.5 shrink-0" /> Operate in the US with low transaction volumes</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-500 mt-0.5 shrink-0" /> Need the simplest possible POS setup</li>
              </ul>
            </div>
            <div className="p-6 bg-bronze-50 border border-bronze-200 rounded-lg">
              <h3 className="font-medium text-stone-900 mb-4">Choose RetailerOS if you...</h3>
              <ul className="space-y-3 text-sm text-stone-700">
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Run a mobile phone shop or electronics store</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Need IMEI tracking and serialized inventory management</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Track brand schemes and cashbacks from Samsung, Vivo, Oppo</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Need GST-compliant billing for Indian tax requirements</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <FAQSection
        faqs={retailerOSvsSquareFAQs}
        title="RetailerOS vs Square for Retail — Frequently Asked Questions"
        subtitle="Common questions about choosing RetailerOS over Square for telecom retail."
      />

      {/* CTA */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Ready to Graduate From Basic POS?</h2>
          <p className="text-stone-500 mb-8">Square got you started. RetailerOS takes you further — with IMEI tracking, scheme management, GST billing, and AI-powered insights purpose-built for telecom retail.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded group">
            Schedule a Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Section>

      <Contact />
    </div>
  );
};
