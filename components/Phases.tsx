import React from 'react';
import { motion } from 'framer-motion';

const phases = [
  {
    phase: "Phase I",
    title: "Assessment",
    tagline: "Understanding the landscape",
    description: "We audit your existing systems, map dependencies, and identify the highest-leverage opportunities for transformation.",
    highlight: false,
  },
  {
    phase: "Phase II",
    title: "Architecture",
    tagline: "Engineering the foundation",
    description: "We design the target architecture, build core systems, and begin automating workflows. Measurable results start flowing.",
    highlight: false,
  },
  {
    phase: "Phase III",
    title: "Scale",
    tagline: "Designed for growth",
    description: "The system runs autonomously. You focus on strategy while the architecture adapts and scales with demand.",
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
    <div className="py-16 sm:py-20 bg-stone-900 relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
         <motion.h2
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-white mb-10 sm:mb-16"
         >
           The Evolution Path
         </motion.h2>

         <motion.div
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-50px" }}
           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden"
         >
            {phases.map((p) => (
              <motion.div
                key={p.phase}
                variants={cardVariants}
                className={`p-6 sm:p-8 relative ${
                  p.highlight
                    ? 'bg-gradient-to-b from-bronze-900/30 to-stone-800'
                    : 'bg-stone-800'
                }`}
              >
                <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest mb-3 sm:mb-4 flex items-center gap-2 text-bronze-400">
                  {p.phase}
                  {p.highlight && <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 bg-bronze-400 rounded-full" />}
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-white mb-2">{p.title}</h3>
                <p className="italic mb-3 sm:mb-4 text-sm text-bronze-300">"{p.tagline}"</p>
                <p className="text-sm leading-relaxed text-white/50">{p.description}</p>
              </motion.div>
            ))}
         </motion.div>
      </div>
    </div>
  );
};
