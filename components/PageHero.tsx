import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface PageHeroProps {
  title: React.ReactNode;
  subtitle?: string;
  label?: string;
  backgroundImage: string;
  backgroundAlt?: string;
  /** Optional portrait-cropped variant swapped in below the sm breakpoint, for source photos whose landscape framing crops badly on tall/narrow hero boxes. */
  mobileBackgroundImage?: string;
  backLink?: { label: string; href: string };
  children?: React.ReactNode;
  /** 'lg' matches ServicesHero's taller padding, for pages that should read at the same size as /services. Defaults to the standard, more compact size used everywhere else. */
  size?: 'default' | 'lg';
  /** 'bronze' matches ServicesHero's golden-brown tint. Defaults to the neutral stone overlay used everywhere else. */
  overlay?: 'dark' | 'bronze';
}

export const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, label, backgroundImage, backgroundAlt = 'Page section background', mobileBackgroundImage, backLink, children, size = 'default', overlay = 'dark' }) => {
  const paddingClass = size === 'lg'
    ? 'pt-32 sm:pt-40 pb-20 sm:pb-28'
    : 'pt-28 sm:pt-32 pb-14 sm:pb-20';
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {mobileBackgroundImage ? (
          <picture>
            <source media="(max-width: 639px)" srcSet={mobileBackgroundImage.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
            <source media="(max-width: 639px)" srcSet={mobileBackgroundImage} />
            <source srcSet={backgroundImage.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
            <img
              src={backgroundImage}
              alt={backgroundAlt}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </picture>
        ) : (
          <picture>
            <source srcSet={backgroundImage.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
            <img
              src={backgroundImage}
              alt={backgroundAlt}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </picture>
        )}
        <div className={`absolute inset-0 ${overlay === 'bronze' ? 'overlay-bronze' : 'bg-gradient-to-b from-stone-900/80 via-stone-900/75 to-stone-900/90'}`} />
      </div>
      <div className="absolute inset-0 pattern-diagonal z-[1] pointer-events-none" />

      <div className={`relative z-10 ${paddingClass} px-5 sm:px-6 md:px-12 lg:px-24`}>
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
