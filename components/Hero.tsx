import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Code2, Cpu, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DemoBookingModal } from './DemoBookingModal';

const stats = [
  { value: "15+", label: "Years" },
  { value: "50+", label: "Projects Delivered" },
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

const heroProducts = [
  { name: "RetailerOS", tagline: "Built for Telecom & Electronics Retail" },
  { name: "Real Desk", tagline: "The Connected Sales Suite" },
  { name: "AI Automation", tagline: "AI That Works While You Don't" },
  { name: "Passage", tagline: "Immigration Practice, Simplified" },
];

const ProductsRow: React.FC = () => {
  const doubled = [...heroProducts, ...heroProducts];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.45, ease: 'easeOut' }}
      className="hero-marquee-wrap sm:hidden mt-6 overflow-hidden [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className="hero-marquee-track flex items-center w-max">
        {doubled.map((product, i) => {
          const isDup = i >= heroProducts.length;
          return (
            <div
              key={`${product.name}-${i}`}
              aria-hidden={isDup}
              className={`marquee-item flex items-center whitespace-nowrap mx-5 ${isDup ? 'marquee-dup' : ''}`}
            >
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/55">{product.name}</span>
                <span className="text-[9px] text-white/30 italic mt-0.5">{product.tagline}</span>
              </div>
              <span className="ml-5 text-bronze-400/30 text-[8px]">●</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

const AnimatedStat: React.FC<{ value: string; label: string; delay: number; isFirst: boolean }> = ({ value, label, delay, isFirst }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={`text-center ${isFirst ? '' : 'border-l border-white/10 pl-3'}`}
    >
      <div className="text-sm font-serif font-semibold text-bronze-300/90">{value}</div>
      <div className="text-[8px] text-white/40 uppercase tracking-widest mt-0.5">{label}</div>
    </motion.div>
  );
};

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
    <header ref={containerRef} role="banner" aria-label="Khosha Systems - Web Apps, SaaS Products & AI Transformation" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pb-20 sm:pb-24">
      {/* Background image with parallax */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 z-0"
      >
        <picture>
          <source srcSet="/images/hero-bg.webp" type="image/webp" />
          <img
            src="/images/hero-bg.jpg"
            alt="Khosha Systems workspace — software development and AI transformation"
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

      <motion.div style={{ opacity }} className="relative z-10 text-center w-full sm:w-auto max-w-5xl px-5 sm:px-6 pt-32 sm:pt-28">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-6xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white mb-4 sm:mb-6 leading-[0.95]"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We Build
          </motion.span>
          <br className="sm:hidden" />{" "}
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
          className="sm:hidden text-sm text-white/60 max-w-2xl mx-auto mb-5 font-light leading-relaxed px-2"
        >
          Digital products and technology solutions built to scale — from{" "}
          <strong className="text-bronze-300 font-medium">Bangalore</strong> to businesses worldwide.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden sm:block text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-5 sm:mb-6 font-light leading-relaxed px-2"
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
          className="hidden sm:flex flex-wrap justify-center gap-2 mb-6 sm:mb-8 px-2"
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
          <button type="button" onClick={() => setDemoOpen(true)}
            className="w-full sm:w-auto group px-6 sm:px-8 py-4 sm:py-3.5 bg-bronze-600 text-white font-medium uppercase tracking-widest text-xs sm:text-sm hover:bg-bronze-500 transition-colors duration-300 rounded-xl sm:rounded text-center">
            <span className="flex items-center justify-center gap-2">
              Start a Conversation
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <Link to="/products"
            className="group w-full sm:w-auto px-0 py-1 sm:py-1 border-0 text-bronze-300 sm:text-white font-medium uppercase tracking-widest text-xs sm:text-sm sm:hover:text-bronze-300 transition-all duration-300 text-center">
            <span className="inline-flex items-center gap-2 border-b border-bronze-400/60 sm:border-white/40 pb-0.5">
              See Our Work
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>

        <ProductsRow />
      </motion.div>

      {/* Stats bar — mobile: flat inline row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="sm:hidden relative z-10 mt-6 w-[calc(100%-4rem)] mx-auto"
      >
        <div className="flex items-center justify-center gap-0 px-4 py-2.5 bg-transparent border-0 rounded-xl">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex-1">
              <AnimatedStat value={stat.value} label={stat.label} delay={1.2 + i * 0.15} isFirst={i === 0} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stats bar — desktop: single compact box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="hidden sm:flex relative z-10 items-center justify-center gap-6 md:gap-8 mt-8 mx-auto px-6 md:px-7 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md w-fit"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center ${i !== 0 ? 'border-l border-white/10 pl-6 md:pl-8' : ''}`}
          >
            <div className="text-center">
              <div className="text-lg md:text-xl font-serif font-bold text-white leading-none">{stat.value}</div>
              <div className="text-[9px] uppercase tracking-widest text-white/50 mt-1">{stat.label}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </header>
    <DemoBookingModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
};
