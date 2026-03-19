import React from 'react';
import { Contact } from '../components/Contact';
import { FAQ } from '../components/FAQ';
import { PageHero } from '../components/PageHero';

export const ContactPage: React.FC = () => {
  return (
    <div>
      <PageHero
        title="Get in Touch"
        subtitle="Let's discuss how we can help build your next product or transform your business."
        backgroundImage="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=75"
      />
      <Contact />
      <FAQ />
    </div>
  );
};
