import React from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, Users, Globe, Shield, BarChart3, ArrowRight, Check, Smartphone, Zap } from 'lucide-react';

const features = [
  { icon: Users, label: "Lead Management", desc: "Capture leads automatically from 99acres, MagicBricks, Housing.com, and Facebook Ads. No more manual entry, no more lost inquiries." },
  { icon: Globe, label: "Channel Partner Portal", desc: "Give your brokers their own dashboard with deal tracking, commission visibility, and real-time inventory access." },
  { icon: Shield, label: "Document Vault", desc: "Secure, organized storage for agreements, KYC documents, project approvals, and RERA compliance paperwork." },
  { icon: BarChart3, label: "Sales Pipeline", desc: "Visual pipeline with stage-based conversion tracking. Know exactly where every deal stands and what needs attention." },
  { icon: Smartphone, label: "Site Visit Tracking", desc: "Schedule, track, and follow up on site visits with automated reminders. Know which properties your prospects visited and when." },
  { icon: Zap, label: "Automated Follow-Ups", desc: "Never miss a follow-up. Automated SMS, WhatsApp, and email sequences triggered by lead behavior and pipeline stage." },
];

const benefits = [
  "RERA-compliant documentation and audit trails", "Lead deduplication across all sources",
  "Custom fields for Indian real estate workflows", "Automated lead scoring and prioritization",
  "Multi-project portfolio management", "Commission tracking and payouts",
  "Integration with Indian property portals", "WhatsApp Business API integration",
];

const stats = [
  { value: "2x", label: "Lead Conversion", desc: "Structured follow-ups and lead scoring double your conversion rates" },
  { value: "85%", label: "Follow-up Rate", desc: "Automated sequences ensure no lead falls through the cracks" },
  { value: "50%", label: "Faster Closings", desc: "Streamlined pipeline and document management accelerate deal velocity" },
];

export const RealEstateCRMPage: React.FC = () => {
  return (
    <div>
      <PageHero
        backLink={{ label: "All Products", href: "/products" }}
        label="Real Estate CRM"
        title={<>Close Deals <span className="bronze-gradient-text">Faster</span>. Manage <span className="bronze-gradient-text">Smarter</span>.</>}
        subtitle="Purpose-built for Indian real estate developers and brokers. Manage leads from 99acres, MagicBricks, and Housing.com. Track site visits, automate follow-ups, and close deals — all from one platform designed for how real estate actually works in India."
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=75"
      >
        <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-bronze-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-500 transition-colors rounded group">
          Get a Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </PageHero>

      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
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

      <Section className="bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">Built for Indian Real Estate</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">Not a generic CRM adapted for real estate. Purpose-built from day one for developers, brokers, and channel partners in the Indian market.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}
                className="p-6 bg-white border border-stone-200 rounded-lg hover:border-bronze-300 hover:shadow-sm transition-all">
                <feature.icon size={24} className="text-bronze-500 mb-4" />
                <h3 className="text-stone-900 font-medium text-lg mb-2">{feature.label}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Why Real Estate Teams Switch to Our CRM</h2>
            <p className="text-stone-500 mb-8">Generic CRMs like Salesforce or Zoho don't understand Indian real estate — RERA compliance, channel partner dynamics, property portal integrations, or site visit workflows. Ours does.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((benefit, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-start gap-2">
                  <Check size={16} className="text-bronze-500 mt-0.5 shrink-0" />
                  <span className="text-stone-600 text-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="h-64 md:h-96 relative overflow-hidden rounded-lg border border-stone-200">
            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=640w=800&q=80q=70" alt="Modern apartment building" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <Building2 size={24} className="mb-1 text-bronze-400" />
              <div className="text-[11px] uppercase tracking-widest text-white/70">CRM Dashboard</div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Capture Leads from Every Channel</h2>
          <p className="text-stone-500 mb-12 max-w-2xl mx-auto">Automatic lead capture from India's top property portals and advertising platforms. Every inquiry lands in one place.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["99acres", "MagicBricks", "Housing.com", "Facebook Ads", "Google Ads", "Website Forms", "Walk-ins", "Referrals"].map((source, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="p-4 bg-white border border-stone-200 rounded-lg text-stone-700 text-sm font-medium">{source}</motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Ready to Transform Your Real Estate Sales?</h2>
          <p className="text-stone-500 mb-8">Whether you're a developer managing multiple projects or a broker closing 50+ deals a month, our CRM scales with your business.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded group">
            Schedule a Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Section>

      <Contact />
    </div>
  );
};
