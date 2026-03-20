import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const Alchemy: React.FC = () => {
  return (
    <div className="w-full py-12 sm:py-16 bg-white border border-stone-200 rounded-lg overflow-hidden relative">
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6">
        <h3 className="text-center text-xl sm:text-2xl font-serif text-stone-900 mb-8 sm:mb-12 uppercase tracking-widest">The Process</h3>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12">
          {/* Stage 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center gap-3 sm:gap-4 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-20 h-20 sm:w-24 sm:h-24 relative flex items-center justify-center"
            >
               <svg viewBox="0 0 100 100" className="w-full h-full text-stone-300 fill-none stroke-current stroke-2">
                  <path d="M20,50 Q30,20 40,50 T60,50 T80,50" className="animate-pulse" style={{ animationDuration: '3s' }} />
                  <path d="M15,40 Q35,70 45,40 T65,40 T85,60" className="opacity-70" />
                  <path d="M25,60 Q45,30 55,60 T75,60 T95,40" className="opacity-70" />
               </svg>
            </motion.div>
            <span className="text-stone-600 font-serif text-base sm:text-lg">Challenge</span>
            <span className="text-[11px] sm:text-xs text-stone-500 uppercase tracking-wider">Complexity & Debt</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <ArrowRight className="text-stone-300 hidden md:block" size={28} />
          </motion.div>

          {/* Stage 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col items-center gap-3 sm:gap-4 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-24 h-24 sm:w-28 sm:h-28 relative flex items-center justify-center bg-stone-50 border border-stone-200 shadow-sm rounded-lg"
            >
               <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-16 sm:h-16 text-stone-700 fill-none stroke-current stroke-[3]">
                  <path d="M50,15 L85,35 L85,75 L50,95 L15,75 L15,35 Z" />
                  <path d="M15,35 L50,55 L85,35" />
                  <path d="M50,55 L50,95" />
               </svg>
            </motion.div>
            <span className="text-stone-800 font-serif text-base sm:text-lg">Framework</span>
            <span className="text-[11px] sm:text-xs text-stone-500 uppercase tracking-wider">Architecture</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <ArrowRight className="text-stone-300 hidden md:block" size={28} />
          </motion.div>

          {/* Stage 3 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col items-center gap-3 sm:gap-4 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-20 h-20 sm:w-24 sm:h-24 relative flex items-center justify-center"
            >
               <div className="absolute inset-0 bg-bronze-200/30 blur-xl rounded-full" />
               <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 text-bronze-500 fill-bronze-100 stroke-current stroke-2">
                  <path d="M50,5 L85,35 L50,95 L15,35 Z" />
                  <path d="M15,35 L85,35" />
                  <path d="M50,5 L50,95" />
               </svg>
            </motion.div>
            <span className="text-bronze-600 font-serif text-base sm:text-lg">System</span>
            <span className="text-[11px] sm:text-xs text-bronze-400 uppercase tracking-wider">Living Asset</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-10 sm:mt-16 text-center"
        >
          <p className="text-xl sm:text-2xl font-serif text-stone-800">
            Complexity becomes <span className="text-bronze-600 underline decoration-1 underline-offset-4">clarity</span>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
