import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Section } from './Section';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,
  title = 'Frequently Asked Questions',
  subtitle,
  className = 'bg-stone-50',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section className={className}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4 text-center">{title}</h2>
        {subtitle && (
          <p className="text-stone-500 text-center max-w-2xl mx-auto mb-12">{subtitle}</p>
        )}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-stone-200 rounded-lg bg-white overflow-hidden">
              <button
                id={`faq-section-button-${i}`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-section-panel-${i}`}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-stone-50 transition-colors"
              >
                <span className="text-stone-900 font-medium text-sm sm:text-base pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-stone-500 shrink-0 transition-transform duration-200 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    id={`faq-section-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-section-button-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 text-stone-500 text-sm leading-relaxed border-t border-stone-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
