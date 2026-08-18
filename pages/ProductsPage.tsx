import React from 'react';
import { Products } from '../components/Products';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { CTAStrip } from '../components/CTAStrip';
import { FAQSection } from '../components/FAQSection';
import { productsPageFAQs } from '../components/StructuredData';

export const ProductsPage: React.FC = () => {
  return (
    <div>
      <PageHero
        label="Product Suite"
        title={<>Built to <span className="bronze-gradient-text">Solve</span>, Shipped to <span className="bronze-gradient-text">Scale</span></>}
        subtitle="SaaS products born from 15+ years of solving real business problems across retail, real estate, and enterprise operations."
        backgroundImage="/images/services-network.jpg"
        size="lg"
        overlay="bronze"
      />
      <Products />
      <FAQSection
        faqs={productsPageFAQs}
        title="Frequently Asked Questions"
        subtitle="Common questions about our product suite and how we work."
      />
      <CTAStrip />
      <Contact />
    </div>
  );
};
