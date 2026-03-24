import React, { useState } from 'react';
import { Section } from './Section';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: "What do you build?",
    a: "Web applications, SaaS products, websites, landing pages, mobile apps, and AI-powered tools. We also offer full digital transformation services — from legacy modernization to cloud migration. If it's digital, we build it."
  },
  {
    q: "Who do you work with — startups or enterprises?",
    a: "Both. Whether you're a seed-stage startup building your first product or an enterprise like Prestige Constructions modernizing operations, we adapt our approach to your stage, budget, and ambition."
  },
  {
    q: "What products do you offer?",
    a: "We have three production-ready products: RetailerOS (retail management), a Real Estate CRM, and a Visitor Management System. More products are in development across logistics and healthcare."
  },
  {
    q: "How long does a typical project take?",
    a: "Websites and landing pages: 2-4 weeks. Web applications: 6-16 weeks depending on complexity. Full digital transformation: phased over 3-6 months. We move fast — no year-long consulting engagements."
  },
  {
    q: "Are you based in Bangalore (Bengaluru)?",
    a: "Yes — headquartered in Kumara Park, Seshadripuram, Bangalore. We work with clients across India and globally. Our founder Ankit Mehta has 15+ years of experience building systems across continents, from Canada to India."
  },
  {
    q: "Do you offer ongoing support after delivery?",
    a: "Yes. We offer partnership retainers for ongoing optimization, feature development, monitoring, and scaling. The products we build are designed to grow with your business."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section className="bg-stone-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-8 sm:mb-12 text-center"
        >
          Common Questions
        </motion.h2>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border border-stone-200 bg-white rounded-lg overflow-hidden"
            >
              <button
                id={`faq-button-${index}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-panel-${index}`}
                className="w-full flex justify-between items-center p-5 sm:p-6 text-left hover:bg-stone-50 transition-colors"
              >
                <span className={`font-medium text-sm sm:text-base ${openIndex === index ? 'text-bronze-600' : 'text-stone-700'}`}>
                  {faq.q}
                </span>
                {openIndex === index ? <Minus size={18} className="text-bronze-500 shrink-0 ml-4" /> : <Plus size={18} className="text-stone-400 shrink-0 ml-4" />}
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-stone-500 leading-relaxed text-sm sm:text-base border-t border-stone-100">
                      <div className="pt-4">{faq.a}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
