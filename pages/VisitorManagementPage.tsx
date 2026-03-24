import React from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Smartphone, Zap, BarChart3, Shield, ArrowRight, Check } from 'lucide-react';
import { FAQSection } from '../components/FAQSection';
import { vmsFAQs } from '../components/StructuredData';

const features = [
  { icon: Smartphone, label: "Digital Check-In", desc: "QR code and tablet-based visitor registration. No paper registers, no illegible handwriting. Professional first impression, every time." },
  { icon: Zap, label: "Instant Alerts", desc: "SMS and WhatsApp notifications to hosts the moment a visitor checks in. No more reception desk phone calls or manual paging." },
  { icon: BarChart3, label: "Visitor Analytics", desc: "Track footfall patterns, peak hours, visit duration, and conversion rates. Turn visitor data into actionable business intelligence." },
  { icon: Shield, label: "Compliance Ready", desc: "RERA-compliant visitor logs with photo capture, ID verification, and timestamped records. Audit-ready at all times." },
];

const useCases = [
  { title: "Real Estate Sites", desc: "Track prospect visits to construction sites and model apartments. Link visitor data to your CRM for conversion tracking." },
  { title: "Corporate Offices", desc: "Pre-register guests, manage vendor check-ins, and maintain security compliance with badge printing and NDA workflows." },
  { title: "Co-Working Spaces", desc: "Manage member guests, delivery check-ins, and meeting room visitors with automated host notifications." },
  { title: "Manufacturing & Warehouses", desc: "Safety compliance check-ins, contractor management, vehicle tracking, and zone-based access control." },
];

const benefits = [
  "Contactless QR code check-in", "WhatsApp and SMS host notifications",
  "Photo capture and ID verification", "Pre-registration for expected visitors",
  "Custom check-in workflows per location", "Badge and pass printing",
  "Multi-location dashboard", "Exportable visitor logs and reports",
];

const stats = [
  { value: "90%", label: "Faster Check-In", desc: "Digital registration takes seconds instead of minutes of paper forms" },
  { value: "100%", label: "Digital Records", desc: "Every visit logged, timestamped, and searchable — no more paper registers" },
  { value: "35%", label: "Better Conversion", desc: "For real estate sites, visitor analytics drive smarter follow-up strategies" },
];

export const VisitorManagementPage: React.FC = () => {
  return (
    <div>
      <PageHero
        backLink={{ label: "All Products", href: "/products" }}
        label="Visitor Management"
        title={<>First Impressions, <span className="bronze-gradient-text">Digitized</span>.</>}
        subtitle="A modern visitor management platform for real estate sites, corporate offices, and co-working spaces. Digital check-ins, automated notifications, visitor analytics, and compliance — replacing outdated paper registers with intelligent visitor tracking."
        backgroundImage="/images/vms-page-hero.jpg"
      >
        <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-bronze-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-500 transition-colors rounded group">
          Get a Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </PageHero>

      {/* GEO: Entity definition block — quotable by AI search engines */}
      <Section className="bg-white border-b border-stone-100">
        <div className="max-w-3xl mx-auto text-center" data-speakable="true">
          <p className="text-lg sm:text-xl text-stone-700 leading-relaxed">
            <strong>Khosha Visitor Management System</strong> is a digital visitor tracking platform by Khosha Systems, designed for Indian real estate sites, corporate offices, and co-working spaces. It replaces paper registers with QR-code check-ins, sends instant WhatsApp notifications to hosts, captures visitor photos and IDs for compliance, and provides footfall analytics — all while maintaining RERA-compliant audit trails.
          </p>
        </div>
      </Section>

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
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">Smart Visitor Tracking</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">More than just a digital register. A complete visitor intelligence platform that improves security, compliance, and business outcomes.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1 }}
                className="p-6 sm:p-8 bg-white border border-stone-200 rounded-lg hover:border-bronze-300 hover:shadow-sm transition-all">
                <feature.icon size={24} className="text-bronze-500 mb-4" />
                <h3 className="text-stone-900 font-medium text-lg mb-2">{feature.label}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">Works Wherever People Visit</h2>
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">Flexible enough for any industry, specific enough to solve real problems out of the box.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {useCases.map((useCase, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1 }}
                className="p-6 border border-stone-200 rounded-lg bg-stone-50">
                <h3 className="text-stone-900 font-medium text-lg mb-2">{useCase.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{useCase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-stone-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="h-64 md:h-96 relative overflow-hidden rounded-lg border border-stone-200">
            <picture>
              <source srcSet="/images/vms-inline.webp" type="image/webp" />
              <img src="/images/vms-inline.png" alt="Visitor Management System analytics dashboard" className="w-full h-full object-cover" loading="lazy" />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <Users size={24} className="mb-1 text-bronze-400" />
              <div className="text-[11px] uppercase tracking-widest text-white/70">Visitor Dashboard</div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Everything You Need</h2>
            <p className="text-stone-500 mb-8">From contactless check-in to compliance reporting, every feature is designed for real-world operations in India.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((benefit, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-start gap-2">
                  <Check size={16} className="text-bronze-500 mt-0.5 shrink-0" />
                  <span className="text-stone-600 text-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Explore More */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-800 mb-8 text-center">Also from Khoshà Systems</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'RetailerOS', desc: 'Retail management for telecom & electronics stores', href: '/products/retaileros' },
              { label: 'Real Estate CRM', desc: 'Lead management for developers & brokers', href: '/products/real-estate-crm' },
              { label: 'Our Work', desc: 'Case studies and client results', href: '/work' },
              { label: 'Compare vs Envoy', desc: 'See how we stack up', href: '/compare/vms-vs-envoy' },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="bg-stone-50 border border-stone-200 rounded-lg p-5 hover:border-bronze-400 hover:shadow-sm transition-all group"
              >
                <h3 className="font-medium text-stone-800 text-sm mb-1 group-hover:text-bronze-600 transition-colors flex items-center gap-1">
                  {link.label} <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-stone-500 text-xs">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <FAQSection
        faqs={vmsFAQs}
        title="Visitor Management — Frequently Asked Questions"
        subtitle="Common questions about our digital visitor management system for offices and real estate sites."
      />

      <Section className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Upgrade from Paper Registers Today</h2>
          <p className="text-stone-500 mb-8">Join hundreds of offices and real estate sites across India that have gone digital with our visitor management system.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded group">
              Schedule a Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/compare/vms-vs-envoy" className="inline-flex items-center gap-2 px-8 py-4 border border-stone-300 text-stone-700 text-sm font-medium uppercase tracking-wider hover:border-bronze-400 transition-colors rounded group">
              Compare vs Envoy <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </Section>

      <Contact />
    </div>
  );
};
