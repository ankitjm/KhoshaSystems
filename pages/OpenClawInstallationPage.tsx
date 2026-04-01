import React from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Server, MessageCircle, Bot, Shield, Headphones } from 'lucide-react';

const deliverables = [
  { icon: Server, label: "VPS Server Setup", desc: "Dedicated cloud server provisioned and configured with your OpenClaw instance, secured and optimized for production use." },
  { icon: MessageCircle, label: "Telegram Integration", desc: "Telegram bot account created and connected to your OpenClaw instance for seamless agent-to-user communication." },
  { icon: Bot, label: "WhatsApp Integration", desc: "WhatsApp Business API integration so your AI agents can interact with customers on WhatsApp directly." },
  { icon: Shield, label: "Security & SSL", desc: "Full SSL encryption, firewall configuration, and security hardening to keep your data and communications safe." },
  { icon: Headphones, label: "Post-Install Support", desc: "30 days of post-installation support to help you configure agents, troubleshoot issues, and get the most out of OpenClaw." },
];

const inclusions = [
  "Dedicated VPS server provisioned and configured",
  "OpenClaw platform installed and running",
  "Telegram bot account setup and linked",
  "WhatsApp Business API integration",
  "SSL certificate and domain configuration",
  "Firewall and server security hardening",
  "Initial agent configuration walkthrough",
  "30 days post-install support",
  "Documentation and admin access handover",
  "Backup and recovery setup",
];

const steps = [
  { step: "1", title: "Discovery Call", desc: "We understand your use case, preferred channels, and how many agents you need." },
  { step: "2", title: "Server Provisioning", desc: "We spin up a dedicated VPS, install dependencies, and deploy your OpenClaw instance." },
  { step: "3", title: "Channel Setup", desc: "Telegram bot and WhatsApp Business API accounts are created and integrated." },
  { step: "4", title: "Configuration & Testing", desc: "We configure your first agents, run end-to-end tests, and hand over admin credentials." },
  { step: "5", title: "Go Live & Support", desc: "Your instance goes live with 30 days of included support for tuning and troubleshooting." },
];

const audiences = [
  { title: "Startups & SMBs", desc: "Deploy AI agents without hiring a DevOps team. Get a production-ready OpenClaw setup in days, not weeks." },
  { title: "Agencies & Consultants", desc: "Offer AI-powered automation to your clients. We handle the infrastructure so you can focus on strategy." },
  { title: "Enterprise Teams", desc: "Run OpenClaw on your own infrastructure with full control. We handle the initial setup and security hardening." },
];

export const OpenClawInstallationPage: React.FC = () => {
  return (
    <div>
      <PageHero
        backLink={{ label: "All Services", href: "/services" }}
        label="OpenClaw Installation Service"
        title={<>Get Your AI Agent Platform <span className="bronze-gradient-text">Up and Running</span></>}
        subtitle="We install, configure, and deploy OpenClaw on your own server — complete with Telegram, WhatsApp integration, and 30 days of support. All for ₹25,000."
        backgroundImage="/images/services-hero.jpg"
      >
        <div className="flex flex-wrap gap-3">
          <a href="https://wa.me/919845040677?text=Hi%2C%20I%27m%20interested%20in%20the%20OpenClaw%20installation%20service" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-bronze-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-500 transition-colors rounded group">
            Get Started — ₹25,000 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white text-sm font-medium uppercase tracking-wider hover:bg-white/10 transition-colors rounded group">
            Contact Us <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </PageHero>

      {/* Pricing stats */}
      <Section className="bg-white border-b border-stone-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-8 bg-stone-50 rounded-lg border border-stone-200">
              <div className="text-4xl font-bold text-stone-900 mb-2">₹25,000</div>
              <div className="text-bronze-600 font-medium text-sm uppercase tracking-wider mb-2">One-Time Fee</div>
              <p className="text-stone-400 text-sm">Complete installation, no recurring charges for setup</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="p-8 bg-stone-50 rounded-lg border border-stone-200">
              <div className="text-4xl font-bold text-stone-900 mb-2">3–5 Days</div>
              <div className="text-bronze-600 font-medium text-sm uppercase tracking-wider mb-2">Setup Time</div>
              <p className="text-stone-400 text-sm">From discovery call to live deployment</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="p-8 bg-stone-50 rounded-lg border border-stone-200">
              <div className="text-4xl font-bold text-stone-900 mb-2">30 Days</div>
              <div className="text-bronze-600 font-medium text-sm uppercase tracking-wider mb-2">Post-Install Support</div>
              <p className="text-stone-400 text-sm">Hands-on support for configuration and troubleshooting</p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* What You Get */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mb-8 text-center">What You Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-6 bg-stone-50 rounded-lg border border-stone-200">
                <d.icon className="text-bronze-600 mb-3" size={28} />
                <h3 className="font-medium text-stone-900 mb-2">{d.label}</h3>
                <p className="text-stone-500 text-sm">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Full Inclusion Checklist */}
      <Section className="bg-stone-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mb-8 text-center">Everything Included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {inclusions.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="flex items-start gap-3 p-3">
                <Check className="text-bronze-600 mt-0.5 flex-shrink-0" size={18} />
                <span className="text-stone-700 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* How It Works — 5 Steps */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mb-10 text-center">How It Works</h2>
          <div className="space-y-6">
            {steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-5 p-5 bg-stone-50 rounded-lg border border-stone-200">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-bronze-600 text-white font-bold text-lg flex-shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-medium text-stone-900 mb-1">{s.title}</h3>
                  <p className="text-stone-500 text-sm">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Target Audience */}
      <Section className="bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mb-8 text-center">Who This Is For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {audiences.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 bg-white rounded-lg border border-stone-200 text-center">
                <h3 className="font-medium text-stone-900 text-lg mb-3">{a.title}</h3>
                <p className="text-stone-500 text-sm">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-stone-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-serif mb-4">Ready to Deploy Your AI Agents?</h2>
          <p className="text-stone-400 mb-8 text-sm sm:text-base">
            Get OpenClaw installed on your own server in 3–5 days. One-time ₹25,000 fee. No lock-in. Full control.
          </p>
          <a
            href="https://wa.me/919845040677?text=Hi%2C%20I%27m%20interested%20in%20the%20OpenClaw%20installation%20service"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-bronze-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-500 transition-colors rounded group"
          >
            WhatsApp Us to Get Started <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </Section>

      <Contact />
    </div>
  );
};
