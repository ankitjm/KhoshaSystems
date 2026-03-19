import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CTAStrip: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/why-partner-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/80 to-stone-900/90" />
      </div>
      <div className="absolute inset-0 pattern-diagonal z-[1] pointer-events-none" />

      <div className="relative z-10 py-16 sm:py-20 px-5 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-bronze-400 text-[11px] sm:text-xs uppercase tracking-widest font-semibold block mb-3">Why Partner With Us</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">
                Engineering That <br className="hidden sm:block" />
                <span className="text-bronze-400">Compounds in Value.</span>
              </h2>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
                We don't just write code — we architect systems designed for longevity. Every decision we make
                considers scalability, maintainability, and the real-world pressures your business faces.
              </p>
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-bronze-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-500 transition-colors rounded group">
                Start a Conversation <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { number: "99%", label: "Client Retention", desc: "Long-term partnerships" },
                { number: "15+", label: "Years Experience", desc: "Enterprise-grade delivery" },
                { number: "50+", label: "Products Shipped", desc: "Across 7 industries" },
                { number: "24h", label: "Response Time", desc: "Dedicated support" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="p-4 sm:p-5 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm"
                >
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-bronze-400 mb-1">{item.number}</div>
                  <div className="text-white text-xs sm:text-sm font-medium mb-0.5">{item.label}</div>
                  <div className="text-white/40 text-[10px] sm:text-xs">{item.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
