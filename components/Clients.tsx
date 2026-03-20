import React from 'react';
import { motion } from 'framer-motion';

const clients = [
  "PHYGITAL STUDIO", "ARROWHEAD COMMUNICATIONS", "UNHIVE VENTURES", "MI1K.CO",
  "PRESTIGE CONSTRUCTIONS", "NOTHING", "HONORABLE"
];

export const Clients: React.FC = () => {
  return (
    <div className="bg-white border-y border-stone-200 py-7 sm:py-9 overflow-hidden relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-5 sm:px-6 mb-4 sm:mb-6 text-center"
      >
        <span className="text-[10px] sm:text-xs font-medium tracking-widest text-stone-500 uppercase">Trusted By Industry Leaders</span>
      </motion.div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12 sm:gap-16 md:gap-24 px-8">
          {[...clients, ...clients, ...clients].map((logo, i) => (
            <span key={i} className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-stone-200 uppercase tracking-tighter hover:text-bronze-400 transition-colors duration-300 cursor-default select-none">
              {logo}
            </span>
          ))}
        </div>
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-12 sm:gap-16 md:gap-24 px-8">
          {[...clients, ...clients, ...clients].map((logo, i) => (
            <span key={i} className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-stone-200 uppercase tracking-tighter hover:text-bronze-400 transition-colors duration-300 cursor-default select-none">
              {logo}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .animate-marquee { animation: marquee 35s linear infinite; }
        .animate-marquee2 { animation: marquee2 35s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-100%); } }
        @keyframes marquee2 { 0% { transform: translateX(100%); } 100% { transform: translateX(0%); } }
      `}</style>
    </div>
  );
};
