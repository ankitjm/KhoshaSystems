import React from 'react';
import { Section } from '../components/Section';
import { Work } from '../components/Work';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const WorkPage: React.FC = () => {
  return (
    <div>
      <PageHero
        title="Our Work"
        subtitle="Real transformations for real businesses — from Prestige Constructions to early-stage startups."
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=75"
      />

      <Work />

      <Section className="bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center border border-stone-200 p-8 sm:p-12 bg-stone-50 rounded-lg"
        >
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mb-3 sm:mb-4">Ready to transform your business?</h2>
          <p className="text-stone-500 mb-6 sm:mb-8 text-sm sm:text-base">We take on a limited number of projects each quarter to ensure quality and focus.</p>
          <Link to="/contact" className="inline-block px-7 sm:px-8 py-3.5 sm:py-4 bg-stone-900 text-white font-medium uppercase tracking-widest hover:bg-bronze-600 transition-colors rounded text-sm">
            Start a Conversation
          </Link>
        </motion.div>
      </Section>

      <Contact />
    </div>
  );
};
