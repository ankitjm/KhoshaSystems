import React from 'react';
import { ServicesHero } from '../components/ServicesHero';
import { Services } from '../components/Services';
import { Phases } from '../components/Phases';
import { ServicesWork } from '../components/ServicesWork';
import { ServicesPitch } from '../components/ServicesPitch';
import { FAQSection } from '../components/FAQSection';
import { Contact } from '../components/Contact';

const servicesFAQs = [
  {
    question: "How long does a typical project take?",
    answer: "Websites and landing pages: 2–4 weeks. Web applications: 6–16 weeks depending on complexity. Full digital transformation: phased over 3–6 months.",
  },
  {
    question: "Do you work with startups or only enterprises?",
    answer: "Both. Whether you're a seed-stage startup building your first product or an established enterprise modernizing operations, we adapt our approach to your stage, budget, and ambition.",
  },
  {
    question: "What does a typical engagement cost?",
    answer: "It depends on scope — a landing page and a full platform build aren't priced the same. We give a fixed-scope quote after a short discovery call, not a generic rate card.",
  },
  {
    question: "Do you sign NDAs before scoping calls?",
    answer: "Yes — happy to sign yours or ours before any discovery call that involves sensitive details.",
  },
];

export const ServicesPage: React.FC = () => {
  return (
    <div>
      <ServicesHero />
      <Services />
      <Phases />
      <ServicesWork />
      <ServicesPitch />
      <FAQSection
        faqs={servicesFAQs}
        title="Before You Reach Out"
        subtitle="The things most people ask on the first call, answered before the first call."
        className="bg-stone-50"
      />
      <Contact />
    </div>
  );
};
