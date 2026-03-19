import React from 'react';
import { Section } from './Section';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Khoshà Systems didn't just build software. They understood our real estate operations inside-out and delivered a visitor management system that transformed how we run our sites.",
    author: "Senior Director",
    role: "Prestige Constructions",
    stars: 5
  },
  {
    quote: "Honest, direct, and deeply technical. They took our fragmented digital presence and turned it into a cohesive system that actually drives results. No fluff, just execution.",
    author: "Founder",
    role: "Phygital Studio",
    stars: 5
  },
  {
    quote: "Their AI integration transformed how we evaluate deals. We went from spreadsheets and gut feel to real-time intelligence and data-driven decisions overnight.",
    author: "Managing Partner",
    role: "Unhive Ventures",
    stars: 5
  }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

export const Testimonials: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/home-workspace.jpg"
          alt=""
          className="w-full h-full object-cover opacity-[0.04]"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-stone-50 z-0" style={{ opacity: 0.95 }} />

      <div className="relative z-10 py-14 sm:py-16 md:py-20 px-5 sm:px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-3"
              >
                Testimonials
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-5xl font-serif text-stone-900"
              >
                What Our <span className="text-bronze-600">Partners</span> Say
              </motion.h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="bg-white p-6 sm:p-8 border border-stone-200 hover:border-bronze-300 transition-all rounded-lg relative glow-bronze"
                >
                  <Quote size={28} className="text-bronze-200 absolute top-4 right-4" />
                  <div className="flex gap-1 text-bronze-500 mb-5 sm:mb-6">
                    {[...Array(t.stars)].map((_, si) => (
                      <motion.div
                        key={si}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + si * 0.05 }}
                      >
                        <Star size={14} fill="currentColor" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-stone-600 mb-5 sm:mb-6 leading-relaxed text-sm sm:text-base italic">"{t.quote}"</p>
                  <div className="border-t border-stone-100 pt-4">
                    <div className="text-stone-900 font-serif text-sm sm:text-base font-medium">{t.author}</div>
                    <div className="text-[11px] sm:text-xs text-bronze-600 uppercase tracking-widest">{t.role}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
