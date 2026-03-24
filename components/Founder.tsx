import React from 'react';
import { Quote, MapPin, Award, Globe } from 'lucide-react';
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
            alt="Khoshà Systems leadership and architecture background"
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
            className="relative inline-block"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 mx-auto mb-6 sm:mb-8 rounded-full overflow-hidden border-2 border-bronze-400 p-1 bg-stone-800">
              <img src="/images/founder-photo.jpg" alt="Ankit Mehta - Founder & Chief Architect" className="w-full h-full object-cover object-top rounded-full" />
            </div>
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-white/70 font-light italic leading-relaxed mb-6 sm:mb-8 px-4"
          >
            "I've spent 15 years building systems across continents — from Canada to India. Every engagement taught me that lasting transformation isn't about technology alone. <br className="hidden sm:block"/><br className="hidden sm:block"/>
            <span className="text-bronze-400 not-italic font-normal">It's about architecting systems that outlive the people who built them."</span>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mb-8"
          >
            <div className="text-white font-semibold tracking-widest uppercase text-sm">Ankit Mehta</div>
            <div className="text-white/40 text-xs sm:text-sm mt-1">Founder & Chief Architect, Khoshà Systems</div>
          </motion.div>

          {/* Credentials strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
          >
            {[
              { icon: Globe, text: "Canada → India" },
              { icon: Award, text: "15+ Years" },
              { icon: MapPin, text: "Bangalore HQ" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                <item.icon size={12} className="text-bronze-400" />
                <span className="text-white/50 text-[10px] sm:text-xs uppercase tracking-wider">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
