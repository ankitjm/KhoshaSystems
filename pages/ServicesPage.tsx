import React from 'react';
import { Section } from '../components/Section';
import { Services } from '../components/Services';
import { Phases } from '../components/Phases';
import { Contact } from '../components/Contact';
import { CTAStrip } from '../components/CTAStrip';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  return (
    <div>
      <PageHero
        label="What We Do"
        title="Our Services"
        subtitle="Web apps, websites, AI transformation, mobile apps, and full digital services — built for scale and designed for impact."
        backgroundImage="/images/services-hero.jpg"
      />

      {/* Featured: OpenClaw Installation */}
      <Section className="bg-stone-900 text-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-8 p-8 bg-stone-800 rounded-xl border border-stone-700"
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-bronze-600/20 flex items-center justify-center">
                <Bot className="text-bronze-500" size={32} />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="text-bronze-500 text-xs uppercase tracking-widest mb-1">New Service</div>
              <h3 className="text-xl font-serif mb-2">OpenClaw Installation — ₹25,000</h3>
              <p className="text-stone-400 text-sm">
                We install and configure the OpenClaw AI agent platform on your own server — complete with Telegram, WhatsApp integration, and 30 days of support.
              </p>
            </div>
            <Link
              to="/services/openclaw-installation"
              className="inline-flex items-center gap-2 px-6 py-3 bg-bronze-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-500 transition-colors rounded whitespace-nowrap group"
            >
              Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </Section>

      <Services />
      <Phases />

      <Section className="bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mb-4 sm:mb-6">Why Work With Us?</h2>
            <p className="text-stone-500 mb-3 sm:mb-4 text-sm sm:text-base">
              Markets shift. Technology evolves. Your competitors move fast. A rigid system becomes a liability the moment conditions change.
            </p>
            <p className="text-stone-500 text-sm sm:text-base">
              Our adaptive approach means your systems flex with demand — scaling infrastructure, adjusting workflows, and incorporating new capabilities without rewrites. 15+ years of building across industries, from Bangalore to the world.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-52 sm:h-64 md:h-96 relative overflow-hidden rounded-lg border border-stone-200 group"
          >
            <picture>
              <source srcSet="/images/services-craft.webp" type="image/webp" />
              <img
                src="/images/services-craft.jpg"
                alt="Focused workspace — engineering craft in action"
                className="w-full h-full object-cover img-zoom"
                loading="lazy"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
            <div className="absolute bottom-4 left-4 z-10">
              <div className="text-white text-4xl sm:text-5xl font-bold">15+</div>
              <div className="text-white/70 text-[11px] uppercase tracking-widest">Years of Engineering</div>
            </div>
          </motion.div>
        </div>
      </Section>
      <CTAStrip />
      <Contact />
    </div>
  );
};
