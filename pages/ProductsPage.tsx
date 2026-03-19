import React from 'react';
import { Products } from '../components/Products';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';

export const ProductsPage: React.FC = () => {
  return (
    <div>
      <PageHero
        label="Product Suite"
        title={<>Built to <span className="bronze-gradient-text">Solve</span>, Shipped to <span className="bronze-gradient-text">Scale</span></>}
        subtitle="SaaS products born from 15+ years of solving real business problems across retail, real estate, and enterprise operations."
        backgroundImage="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=75"
      />
      <Products />
      <Contact />
    </div>
  );
};
