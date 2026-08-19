import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type Variants,
  type MotionValue,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductStat {
  value: string;
  label: string;
}

interface ProductItem {
  name: string;
  slug: string;
  category: string;
  description: string;
  /** `scale` lets each product's square crop be tuned independently — some source photos have slack to zoom into (crops out baked-in margins), others are already a tight object-fit:cover fit and would overflow awkwardly if zoomed further. */
  image: { src: string; alt: string; position?: string; scale?: number };
  stats: ProductStat[];
}

const products: ProductItem[] = [
  {
    name: "RetailerOS",
    slug: "/products/retaileros",
    category: "Built for Telecom & Electronics Retail",
    description: "A retail management platform for mobile and electronics retailers — IMEI tracking, scheme management, and GST billing, unified in one system.",
    image: { src: "/images/retaileros-hero-mockup.png", alt: "RetailerOS retail operations dashboard on laptop and mobile" },
    stats: [
      { value: "40%", label: "Faster Checkout" },
      { value: "3x", label: "Inventory Accuracy" },
      { value: "60%", label: "Less Manual Work" },
    ],
  },
  {
    name: "Real Desk",
    slug: "/products/real-desk",
    category: "The Connected Sales Suite",
    description: "A connected sales suite for real estate developers and brokers — landing pages, lead capture, and bookings, all writing to one CRM.",
    image: { src: "/images/realdesk/realdesk-landingpage.webp", alt: "RealDesk landing page and lead capture on laptop and mobile", position: 'left center', scale: 1 },
    stats: [
      { value: "09", label: "Connected Products" },
      { value: "05", label: "Lead Capture Points" },
      { value: "01", label: "Source of Truth" },
    ],
  },
  {
    name: "AI Automation",
    slug: "/services",
    category: "AI That Works While You Don't",
    description: "Custom AI automation for business operations — workflow, support, and document processing, built around the systems you already use.",
    image: { src: "/images/services-architecture.jpg", alt: "AI automation workflow diagram" },
    stats: [
      { value: "Custom", label: "Built Around Your Workflow" },
      { value: "24/7", label: "Always-On Automation" },
      { value: "Any Stack", label: "Works With What You Have" },
    ],
  },
  {
    name: "Passage",
    slug: "/products/canada-immigration",
    category: "Immigration Practice, Simplified.",
    description: "A case-management platform for Canada-focused immigration consultancies — track applicants, manage documents, and keep every case moving from one dashboard.",
    image: { src: "/images/work-immigration.png", alt: "Passage immigration case management dashboard", position: '80% center' },
    stats: [
      { value: "11", label: "Case Pipelines" },
      { value: "56-Day", label: "Job Bank Tracking" },
      { value: "100%", label: "Document Control" },
    ],
  },
];

const stageVariants: Variants = {
  initial: { opacity: 0, y: 12, scale: 0.985 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, scale: 0.985, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

/** Measures the real fixed header (topbar + nav) height so the sticky stage can start right below it instead of a guessed offset. The nav shrinks slightly once the page scrolls past 50px, so re-measure on scroll too, throttled to one check per frame. */
const useHeaderHeight = () => {
  const [height, setHeight] = useState(96);
  useLayoutEffect(() => {
    let frame = 0;
    const measure = () => {
      const nav = document.querySelector('nav[aria-label="Main navigation"]');
      if (nav) setHeight(Math.ceil(nav.getBoundingClientRect().bottom));
    };
    const onScrollOrResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('resize', onScrollOrResize);
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onScrollOrResize);
      window.removeEventListener('scroll', onScrollOrResize);
    };
  }, []);
  return height;
};

const ProductStats: React.FC<{ stats: ProductStat[] }> = ({ stats }) => (
  <div className="grid grid-cols-3 max-w-[440px] gap-x-3 sm:gap-x-5 gap-y-2 mb-4 min-h-[52px]">
    {stats.map((stat) => (
      <div key={stat.label}>
        <div className="text-lg sm:text-xl font-serif font-bold text-bronze-600 leading-none">{stat.value}</div>
        <div className="text-[10px] text-stone-400 uppercase tracking-wide mt-1 leading-tight">{stat.label}</div>
      </div>
    ))}
  </div>
);

const ProductCTAs: React.FC<{ product: ProductItem }> = ({ product }) => (
  <div className="flex flex-wrap items-center gap-3">
    <Link
      to="/contact"
      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-stone-900 text-white text-xs font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded-md group"
    >
      Get a Demo <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
    </Link>
    <Link
      to={product.slug}
      className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-stone-300 text-xs uppercase tracking-wider rounded-md overflow-hidden transition-colors duration-300 hover:border-bronze-600"
    >
      <span className="absolute inset-0 bg-bronze-600 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
      <span className="relative z-10 font-medium text-stone-700 transition-all duration-300 group-hover:font-bold group-hover:text-white">
        Explore {product.name}
      </span>
      <ArrowRight size={14} className="relative z-10 text-stone-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
    </Link>
  </div>
);

const ProductInfo: React.FC<{ product: ProductItem; index: number; className?: string }> = ({ product, index, className = '' }) => (
  <div className={className}>
    <span className="block text-bronze-600 text-[11px] sm:text-xs font-medium uppercase tracking-wide mb-2">{product.category}</span>
    <div className="flex items-baseline gap-2.5 mb-3">
      <span className="text-base sm:text-lg font-serif font-semibold text-bronze-500 leading-none">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-tight">{product.name}</h3>
    </div>
    <p className="text-stone-500 text-sm sm:text-[15px] leading-relaxed max-w-[580px] mb-5">{product.description}</p>
    <ProductStats stats={product.stats} />
    <ProductCTAs product={product} />
  </div>
);

/** `square` renders the compact desktop split composition — a single 1:1 frame where the artwork fills edge-to-edge via object-fit:cover (no inner mat, no distortion). Each product's `image.scale` tunes how much extra zoom (beyond cover's own crop) is applied — some source photos have slack to zoom into and crop out baked-in margins; others (like Real Desk's already-tight landscape source) have none, and forcing a uniform zoom pushed past the laptop's edge. Defaulting to 1.08 preserves that look for the products that need it; each product overrides only if its own source requires a different value. */
const ProductVisual: React.FC<{ product: ProductItem; square?: boolean }> = ({ product, square }) => {
  const scale = product.image.scale ?? 1.08;
  return (
    <div
      className={`relative border border-stone-200 bg-white shadow-sm overflow-hidden group flex-shrink-0 ${
        square ? 'w-[clamp(385px,min(30vw,48vh),425px)] aspect-square rounded-2xl' : 'w-full h-[clamp(200px,30vh,280px)] mb-5 rounded-xl'
      }`}
    >
      <img
        src={product.image.src}
        alt={product.image.alt}
        style={{
          objectPosition: product.image.position || 'center',
          ...(square ? { '--img-scale': scale, '--img-scale-hover': scale + 0.04 } as React.CSSProperties : {}),
        }}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
          square ? 'scale-[var(--img-scale)] group-hover:scale-[var(--img-scale-hover)]' : 'group-hover:scale-[1.02]'
        }`}
      />
    </div>
  );
};

const ProductPanelContent: React.FC<{ product: ProductItem; index: number; layout?: 'stacked' | 'split' }> = ({ product, index, layout = 'stacked' }) => {
  if (layout === 'split') {
    return (
      <div className="w-full flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-6">
        <ProductVisual product={product} square />
        <ProductInfo product={product} index={index} className="flex-1 min-w-0" />
      </div>
    );
  }
  return (
    <div className="w-full">
      <ProductVisual product={product} />
      <ProductInfo product={product} index={index} />
    </div>
  );
};

const ProductNav: React.FC<{ activeIndex: number; onSelect: (i: number) => void; progress: MotionValue<number> }> = ({ activeIndex, onSelect, progress }) => {
  const lineHeight = useTransform(progress, [0, 1], ['0%', '100%']);
  return (
    <nav aria-label="Products" className="relative">
      <div className="absolute left-[5px] top-2 bottom-2 w-px bg-stone-200" />
      <motion.div className="absolute left-[5px] top-2 w-px bg-bronze-500 origin-top" style={{ height: lineHeight }} />
      <ol className="relative space-y-7 lg:space-y-8">
        {products.map((product, i) => (
          <li key={product.name}>
            <button
              type="button"
              onClick={() => onSelect(i)}
              className="group flex items-start gap-3 text-left w-full"
            >
              <span
                className={`relative z-10 mt-[4px] w-[11px] h-[11px] rounded-full flex-shrink-0 transition-all duration-300 ${
                  i === activeIndex ? 'bg-bronze-500 scale-110' : 'bg-stone-50 border border-stone-300 group-hover:border-bronze-300'
                }`}
              />
              <span>
                <span className={`block text-[10px] font-medium tracking-wide transition-colors duration-300 ${i === activeIndex ? 'text-bronze-500' : 'text-stone-400'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`block text-sm transition-all duration-300 ${i === activeIndex ? 'text-stone-900 font-semibold' : 'text-stone-400 font-normal group-hover:text-stone-500'}`}>
                  {product.name}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};

const TOP_GAP = 16;
const BOTTOM_GAP = 20;

const DesktopShowcase: React.FC = () => {
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const headerHeight = useHeaderHeight();
  const { scrollYProgress } = useScroll({ target: pinRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(products.length - 1, Math.max(0, Math.floor(v * products.length)));
    setActiveIndex((prev) => (prev !== idx ? idx : prev));
  });

  const scrollToIndex = (i: number) => {
    const el = pinRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const elTop = window.scrollY + rect.top;
    const scrollableRange = el.offsetHeight - window.innerHeight;
    if (scrollableRange <= 0) {
      el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const targetProgress = (i + 0.5) / products.length;
    window.scrollTo({ top: elTop + targetProgress * scrollableRange, behavior: 'smooth' });
  };

  return (
    <div ref={pinRef} className="hidden lg:block relative" style={{ height: `${products.length * 90}vh` }}>
      <div
        className="sticky flex items-center justify-center"
        style={{ top: headerHeight + TOP_GAP, height: `calc(100vh - ${headerHeight + TOP_GAP + BOTTOM_GAP}px)` }}
      >
        <div className="w-full max-w-[1280px] mx-auto">
          <div className="grid grid-cols-[210px_1fr] gap-4 lg:gap-5 items-center">
            <ProductNav activeIndex={activeIndex} onSelect={scrollToIndex} progress={scrollYProgress} />
            <div className="grid">
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeIndex}
                  variants={stageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="[grid-area:1/1]"
                >
                  <ProductPanelContent product={products[activeIndex]} index={activeIndex} layout="split" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileShowcase: React.FC = () => (
  <div className="lg:hidden space-y-14">
    {products.map((product, i) => (
      <motion.div
        key={product.name}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ProductPanelContent product={product} index={i} />
      </motion.div>
    ))}
  </div>
);

export const ProductsShowcase: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="products" className="bg-stone-50 relative py-16 sm:py-20 md:py-24 px-5 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-4"
        >
          Our Products
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6"
        >
          SaaS Products That <span className="bronze-gradient-text">Ship Results.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-stone-500 text-base sm:text-lg max-w-2xl mx-auto"
        >
          Battle-tested SaaS products built from real-world problems. Ready to deploy, designed to scale.
        </motion.p>
      </div>

      {prefersReducedMotion ? (
        <div className="max-w-3xl mx-auto space-y-14">
          {products.map((product, i) => (
            <ProductPanelContent key={product.name} product={product} index={i} />
          ))}
        </div>
      ) : (
        <>
          <DesktopShowcase />
          <MobileShowcase />
        </>
      )}

      {/* Coming Soon */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 sm:mt-28 max-w-6xl mx-auto text-center p-8 sm:p-12 border border-dashed border-stone-300 rounded-lg bg-white/50"
      >
        <span className="text-[11px] sm:text-xs font-semibold text-bronze-600 uppercase tracking-widest block mb-3">More Products Coming Soon</span>
        <h3 className="text-xl sm:text-2xl font-serif text-stone-900 mb-4">We're Building More.</h3>
        <p className="text-stone-500 text-sm sm:text-base max-w-lg mx-auto mb-6">
          New products are in development across logistics, healthcare, and education verticals.
          Want early access?
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-bronze-600 hover:text-bronze-700 font-medium text-sm group"
        >
          Join the waitlist <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </section>
  );
};
