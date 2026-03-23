import React from 'react';
import { motion } from 'framer-motion';

const clients = [
  { name: "Phygital Studio", logo: "/images/clients/phygital-studio-logo.png" },
  { name: "Arrowhead Communications", logo: "/images/clients/arrowhead.jpg" },
  { name: "Unhive Ventures", logo: "/images/clients/unhive-ventures.png" },
  { name: "MI1K.CO", logo: "/images/clients/milk-logo.png" },
  { name: "Prestige Constructions", logo: "/images/clients/prestige-group.png" },
  { name: "Nothing", logo: "/images/clients/nothing-logo.webp" },
];

export const Clients: React.FC = () => {
  const items = [...clients, ...clients];

  const logoRow = items.map((client, i) => (
    <div key={i} className="w-24 sm:w-28 md:w-32 h-8 sm:h-10 md:h-12 flex-shrink-0 flex items-center justify-center">
      <img
        src={client.logo}
        alt={client.name}
        className="max-w-full max-h-full object-contain opacity-40 hover:opacity-70 transition-opacity duration-300 select-none grayscale"
        draggable={false}
      />
    </div>
  ));

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

      <div className="flex overflow-x-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-12 sm:gap-16 md:gap-24 pr-12 sm:pr-16 md:pr-24">
          {logoRow}
        </div>
        <div className="animate-marquee flex shrink-0 items-center gap-12 sm:gap-16 md:gap-24 pr-12 sm:pr-16 md:pr-24" aria-hidden="true">
          {logoRow}
        </div>
      </div>

      <style>{`
        .animate-marquee { animation: marquee 35s linear infinite; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
      `}</style>
    </div>
  );
};
