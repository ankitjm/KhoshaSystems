import React from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X, Smartphone, IndianRupee, Zap, Package, BarChart3, Shield } from 'lucide-react';
import { FAQSection } from '../components/FAQSection';
import { retailerOSvsShopifyFAQs } from '../components/StructuredData';

const comparisonRows = [
  { feature: "IMEI / Serial Number Tracking", retaileros: "Native IMEI capture via barcode, camera, or manual entry with full audit trail", shopify: "No native serial tracking — requires third-party apps like SKUSavvy or manual spreadsheets", winner: "retaileros" },
  { feature: "Telecom Scheme Management", retaileros: "Built-in engine for brand schemes, cashbacks, and exchange offers from Samsung, Vivo, Oppo, Xiaomi", shopify: "Not available — no concept of brand schemes or carrier promotions", winner: "retaileros" },
  { feature: "GST-Compliant Billing", retaileros: "Native GST invoicing with HSN codes, reverse charge, and credit notes", shopify: "Basic tax support — not built for Indian GST compliance", winner: "retaileros" },
  { feature: "Per-Store Pricing", retaileros: "Different pricing rules per store location", shopify: "Uniform pricing across all locations", winner: "retaileros" },
  { feature: "E-Commerce Integration", retaileros: "Focused on in-store retail operations", shopify: "Industry-leading online store with omnichannel selling", winner: "shopify" },
  { feature: "WhatsApp Notifications", retaileros: "Built-in WhatsApp alerts for customers and staff", shopify: "Not available natively", winner: "retaileros" },
  { feature: "AI-Powered Insights", retaileros: "Demand forecasting, slow-moving SKU alerts, smart reorder suggestions", shopify: "Basic sales reports — advanced analytics only on POS Pro ($89/mo extra)", winner: "retaileros" },
  { feature: "Setup Complexity", retaileros: "Cloud-native, go live in days with guided onboarding", shopify: "Quick setup for basic POS, but hardware disconnects reported frequently", winner: "retaileros" },
  { feature: "Pricing Transparency", retaileros: "Clear SaaS pricing with quarterly+ billing options", shopify: "Base plan from $39/mo + POS Pro at $89/location/mo + processing fees", winner: "retaileros" },
  { feature: "Distributor Portal", retaileros: "Brand and distributor sell-through visibility built in", shopify: "Not available", winner: "retaileros" },
  { feature: "Global App Ecosystem", retaileros: "Focused feature set for telecom retail", shopify: "Thousands of third-party apps in the Shopify App Store", winner: "shopify" },
  { feature: "Offline Mode", retaileros: "Works reliably in low-connectivity environments", shopify: "Offline mode available but reported as unreliable by users", winner: "retaileros" },
];

const whySwitch = [
  { icon: Smartphone, title: "Built for Telecom, Not Generic Retail", desc: "Shopify POS is built for general retail and e-commerce. RetailerOS is purpose-built for mobile phone shops, electronics stores, and telecom distributors — IMEI tracking, scheme management, and brand analytics are native features, not afterthoughts." },
  { icon: IndianRupee, title: "No Hidden Cost Escalation", desc: "Shopify's free POS Lite locks you into basic features. Advanced inventory, staff permissions, and analytics require POS Pro at $89/location/month. RetailerOS includes everything in one transparent price." },
  { icon: Package, title: "Native IMEI Tracking", desc: "Shopify has no built-in serial number tracking. Merchants resort to spreadsheets, order notes, or expensive third-party apps. RetailerOS captures IMEI at every step — purchase, transfer, and sale — with full audit trail." },
  { icon: Shield, title: "Scheme Management That Works", desc: "Indian telecom retail runs on brand schemes and cashbacks. RetailerOS tracks Samsung, Vivo, Oppo, and Xiaomi schemes automatically. Shopify doesn't even have this concept." },
  { icon: Zap, title: "GST-Ready From Day One", desc: "RetailerOS handles HSN codes, GST invoicing, reverse charge, and credit notes natively. Shopify's tax system is designed for US/Canada markets and requires workarounds for Indian compliance." },
  { icon: BarChart3, title: "AI That Understands Retail", desc: "RetailerOS uses AI for demand forecasting, slow-moving SKU alerts, and smart reorder suggestions. Shopify's analytics are basic unless you pay extra for POS Pro." },
];

export const RetailerOSvsShopifyPage: React.FC = () => {
  return (
    <div>
      <PageHero
        backLink={{ label: "RetailerOS", href: "/products/retaileros" }}
        label="Comparison"
        title={<>RetailerOS vs Shopify POS: <span className="bronze-gradient-text">The Telecom Retail Alternative</span></>}
        subtitle="Shopify POS is great for general retail and e-commerce. But if you run a mobile phone shop or electronics store in India, you need IMEI tracking, brand scheme management, and GST billing — features Shopify simply doesn't have."
        backgroundImage="/images/retaileros-page-hero.jpg"
      >
        <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-bronze-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-500 transition-colors rounded group">
          Try RetailerOS Free <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </PageHero>

      {/* Quick Summary */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">Why Telecom Retailers Choose RetailerOS Over Shopify</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">Shopify dominates e-commerce. But for brick-and-mortar telecom and electronics retail in India, RetailerOS delivers what Shopify can't — IMEI tracking, scheme management, and GST compliance out of the box.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "0", label: "Shopify IMEI Apps", desc: "No native serial number tracking — spreadsheets or paid third-party apps required" },
              { value: "₹0", label: "Extra for Features", desc: "All features included — no POS Pro upsell at $89/location/month" },
              { value: "100%", label: "GST-Compliant", desc: "HSN codes, GST invoicing, and Indian tax compliance built in" },
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
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">See how RetailerOS compares to Shopify POS for telecom and electronics retail.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-300">
                  <th className="text-left py-4 px-4 text-sm font-medium text-stone-500 uppercase tracking-wider">Feature</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-bronze-600 uppercase tracking-wider">RetailerOS</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-stone-500 uppercase tracking-wider">Shopify POS</th>
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
                        {row.winner === "shopify" && <span className="text-stone-500 mt-0.5 shrink-0">—</span>}
                        <span>{row.retaileros}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-stone-500">
                      <div className="flex items-start gap-2">
                        {row.winner === "shopify" && <Check size={16} className="text-green-600 mt-0.5 shrink-0" />}
                        {row.winner === "retaileros" && <X size={16} className="text-red-400 mt-0.5 shrink-0" />}
                        {row.winner === "tie" && <span className="text-stone-500 mt-0.5 shrink-0">—</span>}
                        <span>{row.shopify}</span>
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
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">Why RetailerOS Over Shopify POS?</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">Shopify is excellent for e-commerce. But for in-store telecom and electronics retail, here's why RetailerOS is the better choice.</p>
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
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">When Does Shopify POS Make Sense?</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-8">We believe in honest comparisons. Shopify POS is a solid choice if:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-stone-200 rounded-lg">
              <h3 className="font-medium text-stone-900 mb-4">Choose Shopify POS if you...</h3>
              <ul className="space-y-3 text-sm text-stone-500">
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-500 mt-0.5 shrink-0" /> Primarily sell online and need a POS add-on</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-500 mt-0.5 shrink-0" /> Sell general retail products (not serialized inventory)</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-500 mt-0.5 shrink-0" /> Need a massive third-party app ecosystem</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-stone-500 mt-0.5 shrink-0" /> Want buy-online-pickup-in-store (BOPIS) workflows</li>
              </ul>
            </div>
            <div className="p-6 bg-bronze-50 border border-bronze-200 rounded-lg">
              <h3 className="font-medium text-stone-900 mb-4">Choose RetailerOS if you...</h3>
              <ul className="space-y-3 text-sm text-stone-700">
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Run a mobile phone shop or electronics store</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Need IMEI and serial number tracking at every step</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Track brand schemes from Samsung, Vivo, Oppo, Xiaomi</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-bronze-500 mt-0.5 shrink-0" /> Need GST-compliant billing with HSN codes</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <FAQSection
        faqs={retailerOSvsShopifyFAQs}
        title="RetailerOS vs Shopify POS — Frequently Asked Questions"
        subtitle="Common questions about choosing RetailerOS over Shopify POS for telecom retail."
      />

      {/* CTA */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Ready for a POS Built for Telecom Retail?</h2>
          <p className="text-stone-500 mb-8">Stop using workarounds for IMEI tracking and scheme management. RetailerOS gives you everything a telecom retailer needs — built in, not bolted on.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded group">
            Schedule a Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Section>

      <Contact />
    </div>
  );
};
