import React from 'react';
import { Section } from './Section';
import { AudioWaveform, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const Philosophy: React.FC = () => {
  return (
    <Section id="philosophy" className="bg-stone-50 border-b border-stone-100 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 sm:space-y-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-stone-400">
            Most businesses run on <span className="text-stone-700 line-through decoration-stone-300">duct tape.</span>
          </h2>
          <p className="text-stone-500 text-base sm:text-lg leading-relaxed">
            Disconnected tools, manual processes, spreadsheet chaos. Businesses bleed time and capital on infrastructure that wasn't designed for growth.
            This is <strong className="text-stone-700">technical debt</strong>.
          </p>
          <div className="p-5 sm:p-6 border border-stone-200 bg-white rounded-lg">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 text-stone-400">
               <Activity className="animate-pulse" size={18} />
               <span className="uppercase tracking-widest text-[11px] sm:text-xs">Fragmented Operations</span>
            </div>
            <div className="h-14 sm:h-16 flex items-end gap-1">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${15 + Math.random() * 85}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.03 }}
                      className="bg-stone-200 w-full rounded-t-sm"
                    />
                ))}
            </div>
          </div>
          {/* Image: data chaos */}
          <div className="rounded-lg overflow-hidden border border-stone-200">
            <img
              src="/images/fragmented-ops.jpg"
              alt="Fragmented operations — overwhelming dashboards and disconnected tools"
              className="w-full h-40 sm:h-48 object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 sm:space-y-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900">
            We build <span className="text-bronze-600">clarity.</span>
          </h2>
          <p className="text-stone-500 text-base sm:text-lg leading-relaxed">
            Through intelligent architecture, modern products, and AI-powered systems, we replace chaos with coherence. Every component purposefully designed, every workflow optimized.
          </p>
          <div className="p-5 sm:p-6 border border-bronze-200/50 bg-white rounded-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-bronze-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center gap-3 sm:gap-4 mb-4 text-bronze-600">
               <AudioWaveform size={18} />
               <span className="uppercase tracking-widest text-[11px] sm:text-xs">Unified System Architecture</span>
            </div>
            <div className="h-14 sm:h-16 flex items-center justify-center relative">
                <div className="absolute w-full h-[1px] bg-stone-100"></div>
                <svg viewBox="0 0 500 100" className="w-full h-full text-bronze-500 fill-none stroke-current stroke-2">
                    <motion.path
                      d="M0,50 C100,50 150,15 250,50 C350,85 400,50 500,50"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </svg>
            </div>
          </div>
          <blockquote className="border-l-2 border-bronze-400 pl-5 sm:pl-6 py-2 italic text-stone-600 text-sm sm:text-base">
            "Your technology stack should be an asset, not a liability. We engineer systems that compound in value over time."
          </blockquote>
          {/* Image: clean architecture */}
          <div className="rounded-lg overflow-hidden border border-bronze-200/50 glow-bronze">
            <img
              src="/images/unified-architecture.jpg"
              alt="Unified system architecture — clean dashboard with connected operations"
              className="w-full h-40 sm:h-48 object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </Section>
  );
};
