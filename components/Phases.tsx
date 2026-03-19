import React from 'react';
import { motion } from 'framer-motion';

const phases = [
  {
    phase: "Phase I",
    title: "Assessment",
    tagline: "Understanding the landscape",
    description: "We audit your existing systems, map dependencies, and identify the highest-leverage opportunities for transformation.",
    accent: false,
    highlight: false,
  },
  {
    phase: "Phase II",
    title: "Architecture",
    tagline: "Engineering the foundation",
    description: "We design the target architecture, build core systems, and begin automating workflows. Measurable results start flowing.",
    accent: true,
    highlight: false,
  },
  {
    phase: "Phase III",
    title: "Scale",
    tagline: "Designed for growth",
    description: "The system runs autonomously. You focus on strategy while the architecture adapts and scales with demand.",
    accent: true,
    highlight: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export const Phases: React.FC = () => {
  return (
    <div className="py-16 sm:py-20 bg-stone-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
         <motion.h2
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center text-2xl sm:text-3xl md:text-5xl font-serif text-stone-900 mb-10 sm:mb-16"
         >
           The Evolution Path
         </motion.h2>

         <motion.div
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-50px" }}
           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
         >
            {phases.map((p) => (
              <motion.div
                key={p.phase}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className={`group p-6 sm:p-8 border rounded-lg relative overflow-hidden ${
                  p.highlight
                    ? 'border-bronze-300 bg-gradient-to-b from-bronze-50/30 to-white shadow-sm'
                    : p.accent
                    ? 'border-bronze-200 bg-white'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                } transition-colors`}
              >
                {p.accent && !p.highlight && <div className="absolute top-0 left-0 w-full h-1 bg-bronze-400" />}
                <div className={`text-[11px] sm:text-xs font-semibold uppercase tracking-widest mb-3 sm:mb-4 flex items-center gap-2 ${
                  p.highlight ? 'text-bronze-500' : p.accent ? 'text-bronze-600' : 'text-stone-400'
                }`}>
                  {p.phase}
                  {p.highlight && <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 bg-bronze-500 rounded-full" />}
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-stone-900 mb-2">{p.title}</h3>
                <div className={`h-1 w-12 mb-4 sm:mb-6 group-hover:w-16 transition-all duration-300 ${
                  p.highlight ? 'bg-bronze-500' : p.accent ? 'bg-bronze-400' : 'bg-stone-200 group-hover:bg-stone-400'
                }`} />
                <p className={`italic mb-3 sm:mb-4 text-sm ${p.accent ? 'text-bronze-600' : 'text-stone-500'}`}>"{p.tagline}"</p>
                <p className={`text-sm leading-relaxed ${p.highlight ? 'text-stone-600' : 'text-stone-400'}`}>{p.description}</p>
              </motion.div>
            ))}
         </motion.div>
      </div>
    </div>
  );
};
