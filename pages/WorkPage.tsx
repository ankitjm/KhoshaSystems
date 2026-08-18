import React from 'react';
import { Section } from '../components/Section';
import { Work } from '../components/Work';
import { WorkTestimonials } from '../components/WorkTestimonials';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { FAQSection } from '../components/FAQSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const workStats = [
  { n: '15+', l: 'Years Engineering' },
  { n: '7', l: 'Industries Served' },
  { n: '50+', l: 'Projects Delivered' },
];

const workFAQs = [
  {
    question: "How do you measure the results shown here?",
    answer: "Every stat on this page is client-reported, comparing performance before and after implementation — not a projection or an industry benchmark.",
  },
  {
    question: "Can I talk to a reference client before signing?",
    answer: "Yes, for engagements at that stage — happy to arrange a call with a past client where they're comfortable doing so.",
  },
  {
    question: "Do you publish a case study for every client?",
    answer: "No — only for clients who've given us consent to share their name and numbers publicly. Several engagements stay private at the client's request.",
  },
];

export const WorkPage: React.FC = () => {
  return (
    <div>
      <PageHero
        title="Our Work"
        subtitle="Real transformations for real businesses — from established enterprises to early-stage startups."
        backgroundImage="/images/work-bg.jpg"
        size="lg"
      />

      <div className="bg-white py-8 sm:py-10 px-5 sm:px-6 md:px-12 lg:px-24 border-b border-stone-100">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-4">
          {workStats.map((stat) => (
            <div key={stat.l} className="text-center">
              <div className="font-serif font-extrabold text-2xl sm:text-3xl text-stone-900">{stat.n}</div>
              <div className="text-xs text-stone-500 mt-0.5">{stat.l}</div>
            </div>
          ))}
        </div>
      </div>

      <Work />

      <WorkTestimonials />

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

      <FAQSection
        faqs={workFAQs}
        title="Questions About Our Work"
        subtitle="What people usually ask after reading these case studies."
        className="bg-stone-50"
      />

      <Contact />
    </div>
  );
};
