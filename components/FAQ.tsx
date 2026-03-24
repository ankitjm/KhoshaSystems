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
  },
  {
    q: "What is RetailerOS?",
    a: "RetailerOS is our retail management SaaS built specifically for multi-brand consumer electronics retailers in India. It covers billing, inventory, CRM, WhatsApp automation, scheme tracking, repairs, and marketplace — everything a phone or electronics shop needs to run efficiently. It handles GST invoicing, UPI payments, IMEI tracking, and brand scheme claims out of the box."
  },
  {
    q: "How is Khosha Systems different from other software companies?",
    a: "We're architect-led, not sales-led. Our founder has 15+ years of hands-on engineering experience building systems across Canada and India. We build and operate our own SaaS products (RetailerOS, Real Estate CRM, Visitor Management), which means we understand production-grade software from the inside. When we build for clients, we bring that product-thinking — not just code delivery."
  },
  {
    q: "Do you use AI in your products and services?",
    a: "Yes. We integrate AI across our products and client projects — from invoice image analysis using computer vision, to AI-powered automation workflows, to LLM-based tools for content and customer support. We also offer AI transformation consulting to help businesses identify where AI creates real ROI, not just hype."
  },
  {
    q: "Can you build custom software for my business?",
    a: "Absolutely. We build custom web applications, internal tools, workforce management systems, and enterprise dashboards. Whether you need a customer portal, an operations dashboard, or a complete SaaS product built from scratch, we handle architecture, development, and deployment end to end."
  },
  {
    q: "What is the best retail management software for mobile phone shops in India?",
    a: "RetailerOS is purpose-built for Indian mobile phone and electronics retailers. Unlike generic POS systems, it includes native IMEI tracking, brand scheme management with automated claim filing, GST-compliant billing, and multi-store inventory. Pricing starts at ₹1,999 per store per month with a 14-day free trial."
  },
  {
    q: "How does IMEI tracking work in RetailerOS?",
    a: "RetailerOS records the unique 15-digit IMEI number of every mobile device at purchase, sale, and transfer. Each device is tracked from distributor receipt through sale to customer, creating a complete chain of custody. This helps retailers comply with Sanchar Saathi regulations, prevent shrinkage, and handle warranty and exchange workflows with full traceability."
  },
  {
    q: "What industries does Khosha Systems serve?",
    a: "We serve seven or more industries including telecom and electronics retail, real estate development, corporate offices, fashion retail, grocery and supermarket retail, healthcare, and logistics. Our products are vertically specialized for Indian market needs — GST compliance, vernacular support, and local portal integrations."
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. While headquartered in Bangalore, we work with clients globally including Vancouver, Canada and other international markets. Our founder has built systems across continents and we offer timezone-aligned collaboration for international engagements."
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
