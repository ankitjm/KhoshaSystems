import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
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
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { saveLead } from '../db/turso';
import { DemoBookingModal } from './DemoBookingModal';
import { useReelStack, reelCardInitialStyle, reelStageHeight, reelTrackHeightVh } from '../hooks/useReelStack';
import { useMeasuredHeight } from '../hooks/useMeasuredHeight';

interface ProductStat {
  value: string;
  label: string;
}

interface ProductItem {
  name: string;
  slug: string;
  category: string;
  description: string;
  image: { src: string; alt: string };
  /** Wordmark logo shown in place of the plain-text product name in the heading row, when set. */
  logoSrc?: string;
  stats: ProductStat[];
  /** Short, single-word business areas this product touches — used for the mobile capability pills. */
  tags: string[];
}

const products: ProductItem[] = [
  {
    name: "RetailerOS",
    slug: "/products/retaileros",
    category: "Built for Telecom & Electronics Retail",
    description: "A retail management platform for mobile and electronics retailers — IMEI tracking, scheme management, and GST billing, unified in one system.",
    image: { src: "/images/retaileros-hero-mockup.png", alt: "RetailerOS retail operations dashboard on laptop and mobile" },
    logoSrc: "/images/Retailerosimg/logo-retaileros.png",
    stats: [
      { value: "40%", label: "Faster Checkout" },
      { value: "3x", label: "Inventory Accuracy" },
      { value: "60%", label: "Less Manual Work" },
    ],
    tags: ["Inventory", "IMEI", "GST", "Billing"],
  },
  {
    name: "Real Desk",
    slug: "/products/real-desk",
    category: "The Connected Sales Suite",
    description: "A connected sales suite for real estate developers and brokers — landing pages, lead capture, and bookings, all writing to one CRM.",
    image: { src: "/images/real-desk-products-page-img.png", alt: "RealDesk dashboard on laptop with the mobile app and project renders" },
    logoSrc: "/images/realdesk/logo-realdesk.png",
    stats: [
      { value: "09", label: "Connected Products" },
      { value: "05", label: "Lead Capture Points" },
      { value: "01", label: "Source of Truth" },
    ],
    tags: ["CRM", "Leads", "Bookings", "Listings"],
  },
  {
    name: "AI Automation",
    slug: "/services",
    category: "AI That Works While You Don't",
    description: "Custom AI automation for business operations — workflow, support, and document processing, built around the systems you already use.",
    image: { src: "/images/product-ai-automation.png", alt: "Khosha Automation Hub dashboard on laptop with connected workflow icons" },
    stats: [
      { value: "Custom", label: "Built Around Your Workflow" },
      { value: "24/7", label: "Always-On Automation" },
      { value: "Any Stack", label: "Works With What You Have" },
    ],
    tags: ["Workflow", "Support", "Documents", "Automation"],
  },
  {
    name: "Passage",
    slug: "/products/canada-immigration",
    category: "Immigration Practice, Simplified.",
    description: "A case-management platform for Canada-focused immigration consultancies — track applicants, manage documents, and keep every case moving from one dashboard.",
    image: { src: "/images/product-immigration-page.png", alt: "Passage case management dashboard on laptop" },
    stats: [
      { value: "11", label: "Case Pipelines" },
      { value: "56-Day", label: "Job Bank Tracking" },
      { value: "100%", label: "Document Control" },
    ],
    tags: ["Cases", "Applicants", "Documents", "Compliance"],
  },
];

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
  <div className="grid grid-cols-3 divide-x divide-stone-200/70 max-w-[440px] rounded-xl border border-stone-200/70 bg-white/50 backdrop-blur-sm shadow-[0_2px_10px_-4px_rgba(120,90,60,0.14)] px-1 py-2 mb-4 min-h-[52px]">
    {stats.map((stat) => (
      <div key={stat.label} className="px-2 text-center">
        <div className="text-sm sm:text-base font-serif font-bold text-bronze-600 leading-none">{stat.value}</div>
        <div className="text-[9px] text-stone-400 tracking-wide mt-1 leading-tight">{stat.label}</div>
      </div>
    ))}
  </div>
);

const ProductCTAs: React.FC<{ product: ProductItem; onDemoClick: () => void }> = ({ product, onDemoClick }) => (
  <div className="flex flex-wrap items-center gap-3">
    <button
      type="button"
      onClick={onDemoClick}
      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-bronze-600 text-white text-xs font-medium uppercase tracking-wider hover:bg-bronze-700 transition-colors rounded-md group"
    >
      Get a Demo <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
    </button>
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

/** When `motionConfig` is passed, the category/title/description/metrics/tags/CTA transition
 * independently of each other (staggered) instead of as one flat block — used by the desktop sticky
 * showcase so text content feels like it's transitioning on its own, separately from the product
 * image next to it. Without it (the reduced-motion fallback list's only caller), this renders exactly
 * as before — plain, unanimated markup. */
const ProductInfo: React.FC<{
  product: ProductItem;
  index: number;
  className?: string;
  onDemoClick: () => void;
  showTags?: boolean;
  motionConfig?: { container: Variants; item: Variants };
}> = ({ product, index, className = '', onDemoClick, showTags = false, motionConfig }) => {
  const numberRow = (
    <div className={`flex gap-2.5 mb-3 ${product.logoSrc ? 'items-center' : 'items-baseline'}`}>
      <span className="text-base sm:text-lg font-serif font-semibold text-bronze-500 leading-none">
        {String(index + 1).padStart(2, '0')}
      </span>
      {product.logoSrc ? (
        <img src={product.logoSrc} alt={product.name} className="h-6 sm:h-7 w-auto object-contain" />
      ) : (
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-tight">{product.name}</h3>
      )}
    </div>
  );
  const tagsRow = showTags && (
    <div className="flex flex-wrap gap-1.5 mb-4">
      {product.tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-stone-600"
        >
          <span className="w-1 h-1 rounded-full bg-bronze-400 shrink-0" />
          {tag}
        </span>
      ))}
    </div>
  );

  if (motionConfig) {
    const { container, item } = motionConfig;
    return (
      <motion.div variants={container} initial="initial" animate="animate" exit="exit" className={className}>
        <motion.span variants={item} className="block text-bronze-600 text-[11px] sm:text-xs font-medium uppercase tracking-wide mb-2">
          {product.category}
        </motion.span>
        <motion.div variants={item}>{numberRow}</motion.div>
        <motion.p variants={item} className="text-stone-500 text-sm sm:text-[15px] leading-relaxed max-w-[580px] mb-5">
          {product.description}
        </motion.p>
        <motion.div variants={item}>
          <ProductStats stats={product.stats} />
        </motion.div>
        {tagsRow && <motion.div variants={item}>{tagsRow}</motion.div>}
        <motion.div variants={item}>
          <ProductCTAs product={product} onDemoClick={onDemoClick} />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className={className}>
      <span className="block text-bronze-600 text-[11px] sm:text-xs font-medium uppercase tracking-wide mb-2">{product.category}</span>
      {numberRow}
      <p className="text-stone-500 text-sm sm:text-[15px] leading-relaxed max-w-[580px] mb-5">{product.description}</p>
      <ProductStats stats={product.stats} />
      {tagsRow}
      <ProductCTAs product={product} onDemoClick={onDemoClick} />
    </div>
  );
};

/** `square` renders the compact desktop split composition — a single responsive 1:1 frame, the artwork filling it
 * edge-to-edge via object-fit:cover (crops to the frame, never letterboxed). `heightClassName` overrides the
 * default stacked-layout image height (used by the mobile reel card to size the image slightly larger). */
const ProductVisual: React.FC<{ product: ProductItem; square?: boolean; heightClassName?: string }> = ({ product, square, heightClassName }) => (
  <div
    className={`relative overflow-hidden group flex-shrink-0 ${
      // The bigger size only kicks in once the showcase is wide enough to lay out image+text
      // side by side (`@[620px]:flex-row`, see the wrapping `@container` below) — that's also
      // exactly the width where there's room to spare. Below that threshold the layout stacks
      // image-above-text inside a much shorter, viewport-height-constrained sticky stage, where
      // this same bigger size previously pushed the CTA row past the bottom of the screen.
      square ? 'w-[clamp(320px,min(30vw,46vh),460px)] @[620px]:w-[clamp(380px,min(34vw,54vh),560px)] aspect-square rounded-2xl' : `w-full ${heightClassName ?? 'h-[clamp(200px,30vh,280px)]'} mb-5 rounded-xl`
    }`}
  >
    <picture>
      <source srcSet={product.image.src.replace(/\.(png|jpe?g)$/i, '.webp')} type="image/webp" />
      <img
        src={product.image.src}
        alt={product.image.alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      />
    </picture>
  </div>
);

const ProductPanelContent: React.FC<{ product: ProductItem; index: number; onDemoClick: () => void }> = ({ product, index, onDemoClick }) => (
  <div className="w-full">
    <ProductVisual product={product} />
    <ProductInfo product={product} index={index} onDemoClick={onDemoClick} />
  </div>
);

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

// The image and text transition independently (different durations/eases), rather than as one
// crossfading block — the image gets a touch more travel/time since it's the visually heavier
// element; the text stagger keeps each line's movement small (8–16px) per the "editorial, not
// flashy" brief.
const desktopImageVariants: Variants = {
  initial: { opacity: 0, scale: 0.96, y: 18 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.96, y: -18, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};
const desktopTextContainerVariants: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};
const desktopTextItemVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
};

const DesktopShowcase: React.FC<{ onDemoClick: () => void }> = ({ onDemoClick }) => {
  const pinRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const headerHeight = useHeaderHeight();
  const stickyTop = headerHeight + TOP_GAP;
  // The sticky box is sized to its real content now (no forced min-height), so it's noticeably more
  // compact than a viewport-filling panel — but the browser only releases `position: sticky` once
  // the box's bottom edge scrolls up to `stickyTop + contentHeight`, which happens *well* before the
  // pinned track's own bottom reaches the viewport's bottom edge. Framer's default "end end" progress
  // treats the latter as v=1, so without this the two fall out of sync: progress keeps reporting <100%
  // (box stuck at the header) for a stretch of scroll after CSS has already let go. Anchoring the
  // "end" of the progress range to the actual release point keeps v=1 and the real release the same
  // scroll position, regardless of how tall the content is.
  const contentHeight = useMeasuredHeight(stickyRef, 520);
  const releasePoint = stickyTop + contentHeight;
  const scrollOffset = useMemo(() => ["start start", `end ${releasePoint}px`] as const, [releasePoint]);
  const { scrollYProgress } = useScroll({ target: pinRef, offset: scrollOffset });

  // Restrained depth cue: the image and text drift a few px in slightly different amounts across the
  // whole pinned range (the nav stays put, the "background" is just the section's flat fill) — a hint
  // of parallax, not an effect. Independent of the per-product crossfade below.
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const textParallaxY = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(products.length - 1, Math.max(0, Math.floor(v * products.length)));
    setActiveIndex((prev) => (prev !== idx ? idx : prev));
  });

  const scrollToIndex = (i: number) => {
    const el = pinRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const elTop = window.scrollY + rect.top;
    const scrollableRange = el.offsetHeight - releasePoint;
    if (scrollableRange <= 0) {
      el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const targetProgress = (i + 0.5) / products.length;
    window.scrollTo({ top: elTop + targetProgress * scrollableRange, behavior: 'smooth' });
  };

  return (
    <div ref={pinRef} className="hidden lg:block relative" style={{ height: `${products.length * 55}vh` }}>
      <div
        ref={stickyRef}
        className="sticky flex items-center justify-center"
        style={{ top: stickyTop }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[1280px] mx-auto"
        >
          <div className="grid grid-cols-[210px_1fr] gap-6 lg:gap-10 items-center">
            <ProductNav activeIndex={activeIndex} onSelect={scrollToIndex} progress={scrollYProgress} />
            {/* Row layout (image + text side by side) needs real width to breathe. A viewport-width
                breakpoint here is a guess — it doesn't account for the nav column already eating
                into that width, and guesses are wrong on e.g. an unmaximized window or a scaled
                display. `@container` measures this column's own rendered width directly, so the
                row layout turns on exactly when there's room for it, on any screen. */}
            <div className="@container">
              <div className="flex flex-col @[620px]:flex-row @[620px]:items-center gap-8 @[620px]:gap-10 @[900px]:gap-14">
                <motion.div style={{ y: imageParallaxY }} className="grid shrink-0">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={activeIndex}
                      variants={desktopImageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="[grid-area:1/1]"
                    >
                      <ProductVisual product={products[activeIndex]} square />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
                <motion.div style={{ y: textParallaxY }} className="grid flex-1 min-w-0">
                  <AnimatePresence initial={false}>
                    <ProductInfo
                      key={activeIndex}
                      product={products[activeIndex]}
                      index={activeIndex}
                      className="[grid-area:1/1] min-w-0"
                      onDemoClick={onDemoClick}
                      showTags
                      motionConfig={{ container: desktopTextContainerVariants, item: desktopTextItemVariants }}
                    />
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/** Card content for the mobile reel stack. Deterministic-fit layout: the outer box is exactly the
 * stage's height (no measuring, no clamping, no `overflow-y-auto` scroll trap — a sticky-pinned card
 * that scrolls internally is a UX dead end, since the outer page scroll is what drives the reel).
 * Everything except the product image is a fixed-size flex block; the image is the one flexible
 * element (`flex-1`, bounded by min/max), so it's what absorbs the difference between a tall and a
 * short device — exactly the "recompose around the real viewport" approach, never a uniform shrink
 * and never a silently-clipped bottom. */
const ProductReelCardContent: React.FC<{ product: ProductItem; index: number; onDemoClick: () => void }> = ({ product, index, onDemoClick }) => (
  <div className="h-full flex flex-col overflow-hidden bg-stone-50 px-5 pt-5 pb-5">
    <div className="shrink-0">
      <span className="block text-bronze-600 text-[11px] font-medium uppercase tracking-wide mb-1.5">{product.category}</span>
      <div className={`flex gap-2.5 ${product.logoSrc ? 'items-center' : 'items-baseline'}`}>
        <span className="text-base font-serif font-semibold text-bronze-500 leading-none">
          {String(index + 1).padStart(2, '0')}
        </span>
        {product.logoSrc ? (
          <img src={product.logoSrc} alt={product.name} className="h-6 w-auto object-contain" />
        ) : (
          <h3 className="text-xl font-serif font-bold text-stone-900 leading-tight">{product.name}</h3>
        )}
      </div>
    </div>

    {/* One of two adaptive elements sharing the stage's real (viewport-driven) leftover height with
        the content block below — weighted so the image still gets the larger portion (`flex-[1.4]`
        vs. the content block's `flex-1`), and once it hits its cap on a very tall phone the rest of
        the slack flows on to the content block instead of collecting as dead space beneath the card. */}
    <div className="relative flex-[1.4] min-h-[70px] max-h-[640px] my-5 rounded-xl overflow-hidden">
      <picture>
        <source srcSet={product.image.src.replace(/\.(png|jpe?g)$/i, '.webp')} type="image/webp" />
        <img
          src={product.image.src}
          alt={product.image.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </picture>
    </div>

    {/* The other adaptive element: `justify-between` turns any leftover slack this block receives
        into extra breathing room between the description/metrics/tags/CTA groups themselves, rather
        than it collecting as blank space below the CTAs. `gap-3` is the floor when there's no slack
        to distribute. */}
    <div className="flex-1 flex flex-col justify-between gap-3">
      <p className="text-stone-500 text-sm leading-relaxed">{product.description}</p>

      <div className="rounded-xl border border-stone-200/70 bg-white/50 backdrop-blur-sm shadow-[0_2px_10px_-4px_rgba(120,90,60,0.14)] px-1 py-1.5 max-w-[440px]">
        <div className="grid grid-cols-3 divide-x divide-stone-200/70">
          {product.stats.map((stat) => (
            <div key={stat.label} className="px-2 text-center">
              <div className="text-xs font-serif font-bold text-bronze-600 leading-none">{stat.value}</div>
              <div className="text-[7px] text-stone-400 tracking-wide mt-1 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {product.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-stone-600"
          >
            <span className="w-1 h-1 rounded-full bg-bronze-400 shrink-0" />
            {tag}
          </span>
        ))}
      </div>

      <ProductCTAs product={product} onDemoClick={onDemoClick} />
    </div>
  </div>
);

const PRODUCT_REEL_STAGE_TOP = 86; // px — clears the fixed mobile topbar + nav
// Ideal clearance below the stage for the floating WhatsApp button (bottom-20 offset + 48px circle).
// Used in full when the viewport can afford it; shrunk (see reelStageHeight) on short viewports so it
// never starves the card's own content, which always wins.
const PRODUCT_REEL_DESIRED_BOTTOM_GAP = 132; // px
const PRODUCT_REEL_MIN_BOTTOM_GAP = 16; // px — smallest page-bottom margin we'll shrink down to
// The real minimum card height with zero slack: worst-case fixed text block (category+title+desc+
// stats+tags+CTAs, measured at the narrowest target width, 320px) + the card's own vertical padding
// and image margins + the image's own CSS min-height floor + the metrics panel's glass-treatment
// padding/border. Measured, not guessed — a floor smaller than this just moves the clipping from
// "looks broken" to "silently short by a few px".
const PRODUCT_REEL_CONTENT_FLOOR = 552; // px
// No ceiling: the whole point of this stage is to BE the usable mobile viewport (minus the WhatsApp
// safe area), not a smaller card floating inside a taller section — so the stage should grow with the
// device, with the product image (the one flex-1 element above) absorbing that extra room.
const PRODUCT_REEL_STAGE_MAX_HEIGHT = Number.POSITIVE_INFINITY;
// Minimal backdrop band around each card — just enough for a peek of the receded card behind and a
// deliberate edge margin, without eating into the viewport the active product gets to use.
const PRODUCT_REEL_PEEK_TOP = 14; // px
const PRODUCT_REEL_PEEK_SIDE = 4; // px

/** Mobile-only presentation: pins a "stage" and drives each card's transform/opacity/blur directly
 * off scroll position via `useReelStack` (rAF-throttled, no React re-renders) so the next product
 * rises up and snaps into focus while receded products stay faintly stacked behind it — shared with
 * the Services mobile reel (ServicesReelStack in ServicesShowcase.tsx). Desktop is untouched — this
 * whole tree is `lg:hidden`. */
const ProductReelStack: React.FC<{ onDemoClick: () => void; labelHeight: number }> = ({ onDemoClick, labelHeight }) => {
  const reduce = !!useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stageTop = PRODUCT_REEL_STAGE_TOP + labelHeight;

  // The real, currently-visible viewport (accounts for mobile browser chrome showing/hiding), not a
  // blind `100vh` — re-measured on resize so the stage always matches the actual available space
  // below the header and above the WhatsApp button's reserved area.
  const [viewportHeight, setViewportHeight] = useState(() => (typeof window !== 'undefined' ? window.innerHeight : 800));
  useLayoutEffect(() => {
    const onResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const stageHeight = reelStageHeight(viewportHeight, stageTop, {
    desiredBottomGap: PRODUCT_REEL_DESIRED_BOTTOM_GAP,
    minBottomGap: PRODUCT_REEL_MIN_BOTTOM_GAP,
    contentFloor: PRODUCT_REEL_CONTENT_FLOOR,
    maxHeight: PRODUCT_REEL_STAGE_MAX_HEIGHT,
  });

  useReelStack(trackRef, cardRefs, products.length, reduce);

  if (reduce) {
    return (
      <div className="lg:hidden space-y-5">
        {products.map((product, i) => (
          <ProductReelCardContent key={product.name} product={product} index={i} onDemoClick={onDemoClick} />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={trackRef}
      data-testid="products-reel-track"
      className="lg:hidden relative"
      style={{ height: `${reelTrackHeightVh(products.length)}vh` }}
    >
      <div
        data-testid="products-reel-stage"
        className="sticky overflow-hidden bg-stone-50"
        style={{ top: stageTop, height: stageHeight }}
      >
        {products.map((product, i) => (
          <div
            key={product.name}
            data-testid="products-reel-card"
            data-index={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="absolute origin-top rounded-xl overflow-hidden"
            style={{
              top: PRODUCT_REEL_PEEK_TOP,
              right: PRODUCT_REEL_PEEK_SIDE,
              bottom: PRODUCT_REEL_PEEK_SIDE,
              left: PRODUCT_REEL_PEEK_SIDE,
              zIndex: i,
              ...reelCardInitialStyle(i === 0),
            }}
          >
            <ProductReelCardContent product={product} index={i} onDemoClick={onDemoClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProductsShowcase: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [demoOpen, setDemoOpen] = useState(false);
  const labelRef = useRef<HTMLDivElement>(null);
  const labelHeight = useMeasuredHeight(labelRef, 38);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('SUBMITTING');
    const result = await saveLead({
      name: '',
      company: '',
      email: newsletterEmail,
      goal: 'Newsletter',
      source: 'Products Newsletter Signup',
    });
    if (result.success) {
      setNewsletterStatus('SUCCESS');
      setNewsletterEmail('');
    } else {
      setNewsletterStatus('ERROR');
    }
  };

  return (
    <section id="products" className="bg-stone-50 relative py-16 sm:py-20 md:py-24 lg:py-16 px-5 sm:px-6 md:px-12 lg:px-24">
      <div className="relative">
        {/* Only this small label stays pinned on mobile — its sticky range spans this whole
            wrapper (label + heading/description + reel track), not just the intro block, so it
            stays visible through the entire product sequence instead of scrolling away with the
            heading. The heading/description below it are normal flow and scroll past it. */}
        <div
          ref={labelRef}
          className="sticky lg:static top-[86px] lg:top-auto z-20 lg:z-auto max-w-3xl mx-auto text-center bg-stone-50/95 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none py-1.5 lg:py-0"
        >
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block"
          >
            Our Products
          </motion.span>
        </div>

        <div className="max-w-3xl mx-auto text-center mt-4 mb-10 sm:mb-14 lg:mb-10 lg:mt-0">
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
              <ProductPanelContent key={product.name} product={product} index={i} onDemoClick={() => setDemoOpen(true)} />
            ))}
          </div>
        ) : (
          <>
            <DesktopShowcase onDemoClick={() => setDemoOpen(true)} />
            <ProductReelStack onDemoClick={() => setDemoOpen(true)} labelHeight={labelHeight} />
          </>
        )}
      </div>

      {/* Coming Soon */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 sm:mt-28 lg:mt-14 max-w-6xl mx-auto text-center p-8 sm:p-12 border border-dashed border-stone-300 rounded-lg bg-white/50"
      >
        <span className="text-[11px] sm:text-xs font-semibold text-bronze-600 uppercase tracking-widest block mb-3">More Products Coming Soon</span>
        <h3 className="text-xl sm:text-2xl font-serif text-stone-900 mb-4">We're Building More.</h3>
        <p className="text-stone-500 text-sm sm:text-base max-w-lg mx-auto mb-6">
          New products are in development across logistics, healthcare, and education verticals.
        </p>
        <p className="text-stone-900 font-medium text-sm sm:text-base mb-4">
          Receive our newsletter
        </p>
        {newsletterStatus === 'SUCCESS' ? (
          <div className="flex items-center justify-center gap-2 text-emerald-600 text-sm font-medium max-w-sm mx-auto">
            <CheckCircle size={18} />
            <span>Thanks — you're subscribed.</span>
          </div>
        ) : (
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-3 max-w-sm mx-auto"
          >
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="you@company.com"
              aria-label="Email address"
              className="flex-1 bg-white border border-stone-300 rounded-md px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-bronze-500 transition-colors"
            />
            <button
              type="submit"
              disabled={newsletterStatus === 'SUBMITTING'}
              className="inline-flex items-center justify-center gap-2 bg-bronze-600 text-white font-medium text-sm px-5 py-2.5 rounded-md hover:bg-bronze-700 transition-colors disabled:opacity-50 group whitespace-nowrap"
            >
              {newsletterStatus === 'SUBMITTING' ? 'Submitting...' : 'Subscribe'}
              {newsletterStatus !== 'SUBMITTING' && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        )}
        {newsletterStatus === 'ERROR' && (
          <p className="text-red-500 text-xs mt-3">Something went wrong. Please try again.</p>
        )}
      </motion.div>

      <DemoBookingModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </section>
  );
};
