import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Code2, Cpu, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { value: "15+", label: "Years" },
  { value: "50+", label: "Products" },
  { value: "7+", label: "Industries" },
];

const capabilities = [
  "Web Applications",
  "SaaS Products",
  "AI Transformation",
  "Mobile Apps",
  "System Architecture",
  "Legacy Modernization",
];

const AnimatedStat: React.FC<{ value: string; label: string; delay: number }> = ({ value, label, delay }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white">{value}</div>
      <div className="text-[9px] sm:text-[10px] text-white/50 uppercase tracking-widest mt-0.5">{label}</div>
    </motion.div>
  );
};

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <header ref={containerRef} role="banner" aria-label="Khoshà Systems - Web Apps, SaaS Products & AI Transformation" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pb-20 sm:pb-24">
      {/* Background image with parallax */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 z-0"
      >
        <picture>
          <source srcSet="/images/hero-bg.webp" type="image/webp" />
          <img
            src="/images/hero-bg.jpg"
            alt="Khoshà Systems workspace — software development and AI transformation"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/70 to-stone-900/90" />
      </motion.div>

      {/* Diagonal pattern overlay */}
      <div className="absolute inset-0 pattern-diagonal z-[1] pointer-events-none" />

      {/* Floating icons */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-[10%] text-white/10 hidden lg:block z-[2]"
      >
        <Code2 size={48} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/4 right-[12%] text-bronze-400/20 hidden lg:block z-[2]"
      >
        <Cpu size={44} />
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/3 right-[8%] text-white/10 hidden lg:block z-[2]"
      >
        <Globe size={40} />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 text-center max-w-5xl px-5 sm:px-6 pt-20 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center mb-5 sm:mb-6"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-bronze-400 rounded-full"
            />
            <span className="text-[10px] sm:text-xs font-medium tracking-widest text-white/80 uppercase">
              Bangalore-Born. Globally Delivered.
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white mb-4 sm:mb-6 leading-[0.95]"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We Build
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bronze-gradient-text"
          >
            Products
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            That Scale.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-5 sm:mb-6 font-light leading-relaxed px-2"
        >
          Web apps, SaaS products, AI transformation, and end-to-end digital services.
          From <strong className="text-white font-medium">Bangalore's tech corridor</strong> to
          businesses worldwide.
        </motion.p>

        {/* Capability tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8 px-2"
        >
          {capabilities.map((cap, i) => (
            <span key={i} className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/40 px-2.5 py-1 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
              {cap}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center items-center px-4 sm:px-0"
        >
          <Link to="/contact"
            className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-3.5 bg-bronze-600 text-white font-medium uppercase tracking-widest text-xs sm:text-sm hover:bg-bronze-500 transition-colors duration-300 rounded text-center">
            <span className="flex items-center justify-center gap-2">
              Start a Project <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link to="/products"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 border border-white/30 text-white font-medium uppercase tracking-widest text-xs sm:text-sm hover:border-bronze-400 hover:bg-white/10 transition-all duration-300 rounded text-center backdrop-blur-sm">
            Explore Products
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 mt-8 sm:mt-10 w-[calc(100%-2.5rem)] sm:w-auto max-w-md sm:max-w-none mx-auto"
      >
        <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-14 px-5 sm:px-8 py-2.5 sm:py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} value={stat.value} label={stat.label} delay={1.2 + i * 0.15} />
          ))}
        </div>
      </motion.div>
    </header>
  );
};
