import React from 'react';
import { Hero } from '../components/Hero';
import { Clients } from '../components/Clients';
import { Philosophy } from '../components/Philosophy';
import { Services } from '../components/Services';
import { Products } from '../components/Products';
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
      <Products />
      <Services />
      <CTAStrip />
      <Testimonials />
      <Founder />
      <FAQ />
      <Contact />
    </>
  );
};
