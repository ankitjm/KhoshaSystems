import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';

const phases = [
  {
    number: "01",
    title: "Assessment",
    description: "We evaluate your current systems, processes, and goals to uncover opportunities and define the right path forward.",
    image: "/images/services-assessment.jpg",
    imageAlt: "Magnifying glass icon representing the assessment phase",
  },
  {
    number: "02",
    title: "Architecture",
    description: "We design scalable, secure, and future-ready architecture tailored to your business needs and technology landscape.",
    image: "/images/services-architecture.jpg",
    imageAlt: "Connected system nodes representing the architecture phase",
  },
  {
    number: "03",
    title: "Scale",
    description: "We implement, optimize, and evolve the system so it scales with your business — driving sustainable growth and impact.",
    image: "/images/services-scale.jpg",
    imageAlt: "Ascending growth chart representing the scale phase",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export const Phases: React.FC = () => {
  const reduce = useReducedMotion();

  const fadeUp = (delay: number, distance = 12, duration = 0.55): Variants =>
    reduce
      ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.25 } } }
      : {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0, transition: { duration, ease: EASE, delay } },
        };

  const bgVariants: Variants = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } } };

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 0.2 } },
  };

  const cardVariants: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.25 } } }
    : { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: EASE } } };

  return (
    <div className="py-16 sm:py-20 bg-stone-900 relative overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={bgVariants}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 blueprint-grid" />
        <div className="absolute -top-24 -right-16 w-[560px] h-[560px] rounded-full bg-bronze-400/8 blur-[130px]" />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10"
      >
        <motion.span
          variants={fadeUp(0, 10, 0.5)}
          className="block text-center text-bronze-400 font-semibold tracking-widest uppercase text-sm mb-3 sm:mb-4"
        >
          Our Approach
        </motion.span>
        <motion.h2
          variants={fadeUp(0, 12, 0.55)}
          className="text-center text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-white mb-4 sm:mb-5"
        >
          The Evolution Path
        </motion.h2>
        <motion.p
          variants={fadeUp(0.1, 12, 0.55)}
          className="text-center text-white/50 text-sm sm:text-base max-w-xl mx-auto mb-10 sm:mb-16"
        >
          We partner with you at every stage — assessing, architecting, and scaling solutions that grow with your business.
        </motion.p>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {phases.map((p) => (
            <motion.div
              key={p.number}
              variants={cardVariants}
              className="group rounded-xl border border-[rgba(180,125,65,0.16)] bg-[rgba(18,17,16,0.78)] overflow-hidden transition duration-300 motion-safe:hover:-translate-y-[2px] hover:border-[rgba(180,125,65,0.32)] motion-reduce:transition-none"
            >
              <div className="relative w-full aspect-[4/3] bg-stone-900 overflow-hidden">
                <picture>
                  <source srcSet={p.image.replace(/\.jpg$/, '.webp')} type="image/webp" />
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </picture>
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
                  style={{ background: 'radial-gradient(circle at 50% 40%, rgba(180,135,94,0.14), transparent 65%)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-800/70" />
                <div className="absolute top-4 left-5 text-xs font-semibold uppercase tracking-widest">
                  <span className="text-bronze-400 transition-colors duration-300 group-hover:text-bronze-300">{p.number}</span>
                  <span className="text-white/40 transition-colors duration-300 group-hover:text-white/55"> / 03</span>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-5 sm:pt-6">
                <h3 className="text-xl sm:text-2xl font-serif text-white mb-2.5">{p.title}</h3>
                <p className="text-sm leading-relaxed text-white/50">{p.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
