import React from 'react';
import { Section } from '../components/Section';
import { Services } from '../components/Services';
import { Phases } from '../components/Phases';
import { Contact } from '../components/Contact';
import { CTAStrip } from '../components/CTAStrip';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';

export const ServicesPage: React.FC = () => {
  return (
    <div>
      <PageHero
        label="What We Do"
        title="Our Services"
        subtitle="Web apps, websites, AI transformation, mobile apps, and full digital services — built for scale and designed for impact."
        backgroundImage="/images/services-hero.jpg"
      />

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
