import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface PageHeroProps {
  title: React.ReactNode;
  subtitle?: string;
  label?: string;
  backgroundImage: string;
  backLink?: { label: string; href: string };
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, label, backgroundImage, backLink, children }) => {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/75 to-stone-900/90" />
      </div>
      <div className="absolute inset-0 pattern-diagonal z-[1] pointer-events-none" />

      <div className="relative z-10 pt-28 sm:pt-32 pb-14 sm:pb-20 px-5 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          {backLink && (
            <Link to={backLink.href} className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-bronze-400 transition-colors mb-6 sm:mb-8">
              <ArrowLeft size={16} /> {backLink.label}
            </Link>
          )}
          {label && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-3 sm:mb-4"
            >
              <span className="text-bronze-400 font-semibold tracking-widest uppercase text-sm">{label}</span>
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white mb-4 sm:mb-6 leading-tight"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 sm:mt-8"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
