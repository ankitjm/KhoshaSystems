import React from 'react';
import { Hero } from '../components/Hero';
import { Clients } from '../components/Clients';
import { Philosophy } from '../components/Philosophy';
import { ServicesShowcase } from '../components/ServicesShowcase';
import { ProductsShowcase } from '../components/ProductsShowcase';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { Founder } from '../components/Founder';
import { Contact } from '../components/Contact';
import { CTAStrip } from '../components/CTAStrip';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Clients />
      <Philosophy />
      <ProductsShowcase />
      <ServicesShowcase />
      <CTAStrip />
      <Testimonials />
      <Founder />
      <FAQ />
      <Contact />
    </>
  );
};
