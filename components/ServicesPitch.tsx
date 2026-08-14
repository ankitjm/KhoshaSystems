import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const stats = [
  { value: "Long-Term", label: "Client Relationships", desc: "Most clients return for repeat projects" },
  { value: "15+", label: "Years Experience", desc: "Enterprise-grade delivery" },
  { value: "50+", label: "Projects Delivered", desc: "Across 7 industries" },
  { value: "24h", label: "Response Time", desc: "Dedicated support" },
];

export const ServicesPitch: React.FC = () => {
  return (
    <section className="bg-stone-900 py-16 sm:py-20 px-5 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-bronze-400 font-semibold tracking-widest uppercase text-sm block mb-3 sm:mb-4">
            Why Partner With Us
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-4 sm:mb-6">
            Engineering that compounds in value.
          </h2>
          <p className="text-white/50 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed max-w-md">
            Markets shift. Technology evolves. Your competitors move fast. A rigid system becomes a liability the moment conditions change. Our adaptive approach means your systems flex with demand instead of needing a rewrite.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-bronze-700 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded group"
          >
            Start a Conversation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 gap-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="p-4 sm:p-5 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-serif font-bold text-bronze-400 mb-1">{stat.value}</div>
              <div className="text-white text-xs sm:text-sm font-medium mb-0.5">{stat.label}</div>
              <div className="text-white/40 text-[10px] sm:text-xs">{stat.desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
