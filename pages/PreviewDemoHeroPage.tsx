import React from 'react';
import { DemoHero } from '../components/preview-demo/DemoHero';
import { Contact } from '../components/Contact';

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-stone-800 text-white text-center py-3 text-xs uppercase tracking-widest">
    {children}
  </div>
);

/**
 * Temporary review page — Hero alignment variants only. Not linked from navigation.
 */
export const PreviewDemoHeroPage: React.FC = () => {
  return (
    <div>
      <SectionLabel>Hero — Centered (default)</SectionLabel>
      <DemoHero />
      <SectionLabel>Hero — Left aligned</SectionLabel>
      <DemoHero align="left" />
      <SectionLabel>Hero — Right aligned</SectionLabel>
      <DemoHero align="right" />

      <Contact />
    </div>
  );
};
