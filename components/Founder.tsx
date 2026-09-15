import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export const Founder: React.FC = () => {
  return (
    <section id="founder" className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="/images/founder-bg.webp" type="image/webp" />
          <img
            src="/images/founder-bg.jpg"
            alt="Khosha Systems leadership and architecture background"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/85 via-stone-900/80 to-stone-900/90" />
      </div>
      <div className="absolute inset-0 pattern-diagonal z-[1] pointer-events-none" />

      <div className="relative z-10 py-16 sm:py-20 md:py-24 px-5 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center relative">
          <Quote className="absolute -top-6 sm:-top-10 left-1/2 -translate-x-1/2 text-white/10 w-16 h-16 sm:w-20 sm:h-20" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-bronze-400 text-[11px] sm:text-xs uppercase tracking-widest font-semibold block mb-4">Leadership</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-white mb-8 sm:mb-10 relative z-10">
              Built Through Experience.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex flex-nowrap items-center justify-center gap-2 sm:gap-4 md:gap-6 mb-6 sm:mb-8"
          >
            <div className="w-12 h-12 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden border sm:border-2 border-bronze-400 p-0.5 sm:p-1 bg-stone-800 shrink-0">
              <img src="/images/founder-photo.jpg" alt="Khosha Systems team member" className="w-full h-full object-cover object-top rounded-full" />
            </div>
            <div className="w-12 h-12 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden border sm:border-2 border-bronze-400 p-0.5 sm:p-1 bg-stone-800 shrink-0">
              <img src="/images/leadership-nischal-image.png" alt="Khosha Systems team member" className="w-full h-full object-cover object-top rounded-full" />
            </div>
            <div className="w-12 h-12 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden border sm:border-2 border-bronze-400 p-0.5 sm:p-1 bg-stone-800 shrink-0">
              <img src="/images/leadership-keerthan-image.png" alt="Khosha Systems team member" className="w-full h-full object-cover object-top rounded-full" />
            </div>
            <div className="w-12 h-12 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden border sm:border-2 border-bronze-400 p-0.5 sm:p-1 bg-stone-800 shrink-0">
              <img src="/images/leadership-ai-agent-image01.webp" alt="Khosha Systems team member" className="w-full h-full object-cover object-top rounded-full" />
            </div>
            <div className="w-12 h-12 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden border sm:border-2 border-bronze-400 p-0.5 sm:p-1 bg-stone-800 shrink-0">
              <img src="/images/leadership-ai-agent-image02.webp" alt="Khosha Systems team member" className="w-full h-full object-cover object-top rounded-full" />
            </div>
            <div className="w-12 h-12 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden border sm:border-2 border-bronze-400 p-0.5 sm:p-1 bg-stone-800 shrink-0">
              <img src="/images/leadership-veda-image.jpeg" alt="Khosha Systems team member" className="w-full h-full object-cover object-top rounded-full" />
            </div>
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-white/70 font-light italic leading-relaxed mb-6 sm:mb-8 px-4"
          >
            "We're a team of six engineers, designers, and strategists building systems together. Every engagement has taught us that lasting transformation isn't about technology alone. <span className="text-bronze-400 not-italic font-normal">It's about architecting systems that outlive the people who built them."</span>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mb-8"
          >
            <div className="text-white font-semibold tracking-widest uppercase text-sm">Khosha Team</div>
            <div className="text-white/40 text-xs sm:text-sm mt-1">Khosha Systems</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
