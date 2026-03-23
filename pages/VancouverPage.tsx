import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Globe, Cpu, Code2, Clock, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { PageHero } from '../components/PageHero';
import { Contact } from '../components/Contact';
import { FAQ } from '../components/FAQ';

const services = [
  { icon: Code2, title: "Custom Web & SaaS Development", desc: "Full-stack web applications, SaaS platforms, and enterprise dashboards built with React, Node.js, and cloud-native architecture." },
  { icon: Cpu, title: "AI Transformation & Automation", desc: "AI agents, workflow automation, LLM integration, and intelligent data pipelines for Vancouver businesses ready to modernize." },
  { icon: Globe, title: "Mobile App Development", desc: "Cross-platform and native mobile apps. React Native, progressive web apps, and enterprise mobility solutions." },
  { icon: Shield, title: "Digital Transformation", desc: "Legacy system modernization, cloud migration, process automation, and technology roadmaps for established businesses." },
];

const advantages = [
  { icon: Clock, title: "Timezone Advantage", desc: "Vancouver (PST) and Bangalore (IST) overlap during your morning and our evening — daily syncs are easy, and you get overnight development cycles." },
  { icon: Users, title: "Local + Global Team", desc: "Vancouver-based associates for in-person meetings, backed by a senior engineering team in Bangalore with 15+ years of enterprise experience." },
  { icon: Shield, title: "Proven Track Record", desc: "Three production SaaS products (RetailerOS, Real Estate CRM, Visitor Management System) built and running. We ship, not just consult." },
  { icon: Globe, title: "Cost-Effective Quality", desc: "Senior Bangalore engineers at a fraction of Vancouver rates, without sacrificing quality. Your budget goes 3-4x further." },
];

export const VancouverPage: React.FC = () => {
  return (
    <div>
      <PageHero
        title="Software Development in Vancouver"
        subtitle="Khoshà Systems brings 15+ years of enterprise software experience to Vancouver. Custom web apps, SaaS products, AI transformation, and digital solutions — built by a senior team with local presence."
        backgroundImage="/images/vancouver-hero.jpg"
      />

      {/* Vancouver + Bangalore */}
      <Section className="bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 bg-bronze-50 border border-bronze-200 rounded-full mb-4">
              <span className="text-[11px] uppercase tracking-widest text-bronze-600 font-medium">Vancouver, BC + Bangalore, India</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-4">
              Your Vancouver Software Partner
            </h2>
            <p className="text-stone-500 text-base sm:text-lg max-w-2xl mx-auto">
              We're not an offshore body shop. Khoshà Systems is a product company that also builds for clients.
              We've shipped three SaaS products of our own — so we understand what it takes to build software that works in production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advantages.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border border-stone-200 rounded-lg hover:border-bronze-300 transition-colors"
              >
                <item.icon size={20} className="text-bronze-500 mb-3" />
                <h3 className="text-stone-900 font-semibold mb-2">{item.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-4">
              What We Build for Vancouver Clients
            </h2>
            <p className="text-stone-500 text-base max-w-2xl mx-auto">
              From early-stage startups to established enterprises — we build software that scales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white border border-stone-200 rounded-lg"
              >
                <service.icon size={20} className="text-bronze-500 mb-3" />
                <h3 className="text-stone-900 font-semibold mb-2">{service.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Products showcase */}
      <Section className="bg-stone-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            Our Own Products — Proof We Ship
          </h2>
          <p className="text-stone-400 text-base max-w-2xl mx-auto mb-10">
            We don't just build for clients. We've built and run three production SaaS products serving businesses across India.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: "RetailerOS", desc: "Retail management platform for telecom and electronics stores — IMEI tracking, scheme management, billing, analytics.", link: "/products/retaileros" },
              { name: "Real Estate CRM", desc: "Purpose-built for Indian real estate — lead management, site visits, channel partner portal.", link: "/products/real-estate-crm" },
              { name: "Visitor Management", desc: "Digital check-ins, instant alerts, visitor analytics, and compliance for offices and sites.", link: "/products/visitor-management" },
            ].map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-6 bg-stone-800/50 border border-stone-700/50 rounded-lg text-left"
              >
                <h3 className="text-white font-semibold mb-2">{product.name}</h3>
                <p className="text-stone-400 text-sm leading-relaxed mb-4">{product.desc}</p>
                <Link to={product.link} className="text-bronze-400 text-sm font-medium inline-flex items-center gap-1 hover:text-bronze-300 transition-colors">
                  Learn more <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-stone-400 mb-4">
            <MapPin size={14} className="text-bronze-500" />
            <span className="text-sm">Serving Vancouver, BC and the Greater Vancouver Area</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-4">
            Let's Build Something Great Together
          </h2>
          <p className="text-stone-500 text-base mb-8">
            Whether you're a Vancouver startup looking for a technical co-founder or an established business ready for digital transformation — we'd love to chat.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded-md group">
              Schedule a Call <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="mailto:ankit@khoshasystems.com" className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 text-stone-700 text-sm font-medium uppercase tracking-wider hover:border-bronze-400 transition-colors rounded-md">
              ankit@khoshasystems.com
            </a>
          </div>
        </div>
      </Section>

      <Contact />
      <FAQ />
    </div>
  );
};
