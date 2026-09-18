import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type Variants,
  type MotionValue,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Boxes,
  Globe,
  type LucideIcon,
} from 'lucide-react';
import { useReelStack, reelCardInitialStyle, reelStageHeight, reelTrackHeightVh } from '../hooks/useReelStack';
import { useMeasuredHeight } from '../hooks/useMeasuredHeight';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Real tool/brand logos for the architecture-diagram nodes below (see public/images/service-section-icons). */
const ICONS = {
  microsoft: '/images/service-section-icons/01_microsoft.png',
  oracle: '/images/service-section-icons/02_oracle.png',
  excel: '/images/service-section-icons/03_excel.png',
  salesforce: '/images/service-section-icons/04_salesforce.png',
  sap: '/images/service-section-icons/05_sap.png',
  stripe: '/images/service-section-icons/06_stripe.png',
  whatsapp: '/images/service-section-icons/07_whatsapp.png',
  powerBi: '/images/service-section-icons/08_power_bi.png',
  docker: '/images/service-section-icons/09_docker.png',
  azure: '/images/service-section-icons/10_azure.png',
  postgresql: '/images/service-section-icons/11_postgresql.png',
  postman: '/images/service-section-icons/12_postman.png',
  awsS3: '/images/service-section-icons/13_aws_s3.png',
  grafana: '/images/service-section-icons/14_grafana.png',
} as const;

const fadeUpVariants = (reduce: boolean, distance = 24, duration = 0.5): Variants =>
  reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.25 } } }
    : { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0, transition: { duration, ease: EASE } } };

/** A container that reveals its children one at a time — the whole sequence lands in ~1–1.5s once it scrolls into view. */
const stagger = (reduce: boolean, amount = 0.12, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: reduce ? 0 : amount, delayChildren: reduce ? 0 : delay } },
});

/** A node (icon badge / pill) popping into place. */
const popVariants = (reduce: boolean): Variants =>
  reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.25 } } }
    : { hidden: { opacity: 0, scale: 0.85, y: 6 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: EASE } } };

/** A connector line fading in right after the node it leads from. */
const fadeVariants = (reduce: boolean): Variants =>
  reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3, ease: EASE } } };

/** Every diagram reveals itself piece-by-piece the first time it mounts on screen — the row layout
 * and mobile reel get this via ordinary page scroll; the desktop pinned showcase gets it fresh on
 * every service change too, since `AnimatePresence` mounts a new instance of the panel (and so a new
 * `Visual`) each time `activeIndex` changes, re-triggering the stagger right alongside the panel's
 * own crossfade. */
const revealTrigger = (amount = 0.3) =>
  ({ initial: 'hidden' as const, whileInView: 'visible' as const, viewport: { once: true, amount } });

/**
 * Shared architecture-diagram primitives for all 4 services, so every diagram reads as one visual
 * system and animates the same way: each piece pops in in sequence as the diagram scrolls into view.
 */
const DashLine: React.FC<{ variants: Variants; dir?: 'v' | 'h'; className?: string }> = ({
  variants,
  dir = 'v',
  className = '',
}) => (
  <motion.span
    variants={variants}
    className={`block border-dashed border-stone-300 ${dir === 'v' ? 'w-px border-l' : 'h-px border-t'} ${className}`}
  />
);

const DashBus: React.FC<{ variants: Variants; className?: string }> = ({ variants, className = '' }) => (
  <motion.div variants={variants} className={`relative w-full h-1.5 ${className}`}>
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-dashed border-stone-300" />
    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-bronze-400" />
  </motion.div>
);

/** Bare icon with a caption below — the flow-stage nodes in 01 and the system nodes in 03. One fixed
 * size everywhere (no mobile/desktop split) so every node in the section reads at the same scale. */
const IconNode: React.FC<{
  icon: LucideIcon | string;
  label: string;
  variants: Variants;
  accent?: boolean;
  compact?: boolean;
  size?: number;
  labelSizeClassName?: string;
}> = ({ icon, label, variants, accent = false, compact = false, size = 56, labelSizeClassName = 'text-[7.5px] sm:text-[9px]' }) => {
  const isImage = typeof icon === 'string';
  const Icon = icon as LucideIcon;
  return (
    <motion.div variants={variants} className="flex flex-col items-center gap-1.5 sm:gap-2">
      <div
        style={{ width: size, height: size }}
        className={`flex items-center justify-center transition-transform duration-300 motion-safe:hover:scale-110 ${
          accent ? 'text-bronze-600' : 'text-stone-500'
        }`}
      >
        {isImage ? (
          <img src={icon} alt="" className="w-full h-full object-contain" />
        ) : (
          <Icon size={Math.round(size / 2)} strokeWidth={1.5} />
        )}
      </div>
      <span
        className={`${labelSizeClassName} font-semibold tracking-wide text-center leading-tight ${
          compact ? 'w-14 break-words' : ''
        } ${accent ? 'text-bronze-700' : 'text-stone-600'}`}
      >
        {label}
      </span>
    </motion.div>
  );
};

/** Icon + label pill — the before/after items, integration outcome, and cloud infrastructure tiers. */
const IconPill: React.FC<{
  icon: LucideIcon | string;
  label: string;
  variants: Variants;
  accent?: boolean;
  className?: string;
  iconSize?: number;
  mobileIconSize?: number;
  tight?: boolean;
  mobileTight?: boolean;
}> = ({ icon, label, variants, accent = false, className = '', iconSize, mobileIconSize, tight = false, mobileTight = false }) => {
  const isImage = typeof icon === 'string';
  const Icon = icon as LucideIcon;
  const resolvedIconSize = iconSize ?? (isImage ? 36 : 28);
  const resolvedMobileIconSize = mobileIconSize ?? resolvedIconSize;
  const gapPad = tight
    ? mobileTight
      ? 'gap-0.5 px-0.5 py-0.5 sm:gap-1.5 sm:px-1.5 sm:py-1.5'
      : 'gap-1 px-1 py-1 sm:gap-1.5 sm:px-1.5 sm:py-1.5'
    : 'gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-1.5 sm:py-2';
  return (
    <motion.div
      variants={variants}
      className={`inline-flex items-center rounded-md border ${gapPad} ${
        accent ? 'border-bronze-200 bg-bronze-50 text-bronze-700' : 'border-stone-200 bg-stone-50 text-stone-600'
      } ${className}`}
    >
      {isImage ? (
        mobileIconSize !== undefined ? (
          <>
            <img
              src={icon}
              alt=""
              style={{ width: resolvedMobileIconSize, height: resolvedMobileIconSize }}
              className="object-contain shrink-0 sm:hidden transition-transform duration-300 motion-safe:hover:scale-110"
            />
            <img
              src={icon}
              alt=""
              style={{ width: resolvedIconSize, height: resolvedIconSize }}
              className="object-contain shrink-0 hidden sm:block transition-transform duration-300 motion-safe:hover:scale-110"
            />
          </>
        ) : (
          <img
            src={icon}
            alt=""
            style={{ width: resolvedIconSize, height: resolvedIconSize }}
            className="object-contain shrink-0 transition-transform duration-300 motion-safe:hover:scale-110"
          />
        )
      ) : (
        <Icon
          size={resolvedIconSize}
          strokeWidth={1.75}
          className={`shrink-0 transition-transform duration-300 motion-safe:hover:scale-110 ${accent ? 'text-bronze-600' : 'text-stone-500'}`}
        />
      )}
      <span className="min-w-0 break-words text-[8px] sm:text-[10px] font-semibold tracking-wide leading-tight">{label}</span>
    </motion.div>
  );
};

/** 01 — IDEA pops in, its line fades, ARCHITECTURE pops in, and so on through to the accented PRODUCTION stage. */
const ProductEngineeringVisual: React.FC = () => {
  const reduce = !!useReducedMotion();
  const stages = [
    { label: 'IDEA', icon: '/images/services-01-icons/idea.png' },
    { label: 'ARCHITECTURE', icon: '/images/services-01-icons/architecture.png' },
    { label: 'PRODUCT', icon: '/images/services-01-icons/product.png' },
    { label: 'PRODUCTION', icon: '/images/services-01-icons/production.png' },
  ];
  const node = popVariants(reduce);
  const line = fadeVariants(reduce);

  return (
    <>
      {/* Mobile only: vertical top-to-bottom flow. This is the one service diagram called out for
          extra visual weight on mobile — larger icons, a slightly bigger label, and taller connectors
          than a plain scaled-down version of the desktop flow would give it, so it reads as the
          section's intentional opening beat rather than a cropped-down horizontal row. Services 2–4
          are untouched. */}
      <motion.div
        variants={stagger(reduce, 0.16)}
        {...revealTrigger(0.4)}
        className="flex md:hidden flex-col items-center"
      >
        {stages.map((s, i) => (
          <React.Fragment key={s.label}>
            {i > 0 && (
              <DashLine variants={line} dir="v" className="h-3" />
            )}
            <IconNode
              variants={node}
              icon={s.icon}
              label={s.label}
              accent={i === stages.length - 1}
              size={44}
              labelSizeClassName="text-[10px]"
            />
          </React.Fragment>
        ))}
      </motion.div>

      {/* Tablet/desktop: original horizontal flow */}
      <motion.div
        variants={stagger(reduce, 0.16)}
        {...revealTrigger(0.4)}
        className="hidden md:flex items-start justify-between px-1 sm:px-3"
      >
        {stages.map((s, i) => (
          <React.Fragment key={s.label}>
            {i > 0 && (
              <DashLine variants={line} dir="h" className="flex-1 mt-7 sm:mt-8 mx-1 sm:mx-2" />
            )}
            <IconNode variants={node} icon={s.icon} label={s.label} accent={i === stages.length - 1} />
          </React.Fragment>
        ))}
      </motion.div>
    </>
  );
};

/** 02 — each before/after row cascades in (legacy pill, dashed arrow, modern pill), one row after another. */
const ModernizationVisual: React.FC = () => {
  const reduce = !!useReducedMotion();
  const rows = [
    { before: { label: 'Legacy App', icon: ICONS.microsoft }, after: { label: 'Modern Application', icon: ICONS.docker } },
    { before: { label: 'Old Database', icon: ICONS.oracle }, after: { label: 'APIs', icon: ICONS.postman } },
    { before: { label: 'Manual Process', icon: ICONS.excel }, after: { label: 'Cloud / Data', icon: ICONS.azure } },
  ];
  const pill = popVariants(reduce);
  const arrow = fadeVariants(reduce);

  return (
    <motion.div
      variants={stagger(reduce, 0.2)}
      {...revealTrigger()}
      className="space-y-2 sm:space-y-2.5"
    >
      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 sm:gap-3">
        <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-stone-400">
          Before
        </span>
        <span />
        <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-bronze-600">
          After
        </span>
      </div>
      {rows.map((row) => (
        <motion.div
          key={row.before.label}
          variants={stagger(reduce, 0.09)}
          className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3"
        >
          <IconPill variants={pill} icon={row.before.icon} label={row.before.label} className="w-full" />
          <motion.div variants={arrow} className="flex items-center gap-0.5 text-bronze-400">
            <span className="w-2.5 sm:w-3 border-t border-dashed border-bronze-300" />
            <ArrowRight size={11} />
          </motion.div>
          <IconPill variants={pill} icon={row.after.icon} label={row.after.label} accent className="w-full" />
        </motion.div>
      ))}
    </motion.div>
  );
};

/** 03 — the 5 systems cascade in, drop into a shared bus, then feed a single line into the integration layer and the connected ecosystem. */
const IntegrationVisual: React.FC = () => {
  const reduce = !!useReducedMotion();
  const nodes = [
    { label: 'CRM', icon: ICONS.salesforce },
    { label: 'ERP', icon: ICONS.sap },
    { label: 'PAYMENTS', icon: ICONS.stripe },
    { label: 'WHATSAPP', icon: ICONS.whatsapp },
    { label: 'ANALYTICS', icon: ICONS.powerBi },
  ];
  const node = popVariants(reduce);
  const line = fadeVariants(reduce);
  const pill = popVariants(reduce);

  return (
    <motion.div
      variants={stagger(reduce, 0.14)}
      {...revealTrigger()}
      className="flex flex-col items-center"
    >
      {/* Tier 1 — the individual systems, each with its own connector */}
      <motion.div variants={stagger(reduce, 0.05)} className="grid grid-cols-5 gap-1 sm:gap-1.5 w-full">
        {nodes.map((n) => (
          <div key={n.label} className="flex flex-col items-center">
            <IconNode variants={node} icon={n.icon} label={n.label} compact />
            <DashLine variants={line} className="h-2 sm:h-2.5 mt-1" />
          </div>
        ))}
      </motion.div>

      {/* every system converges into one shared bus */}
      <DashBus variants={line} />

      {/* one connector from the bus into the integration layer */}
      <DashLine variants={line} className="h-2 sm:h-2.5 mt-0.5" />

      {/* Tier 2 — the integration layer */}
      <motion.div
        variants={pill}
        className="w-[70%] sm:w-3/5 rounded-md border border-bronze-200 bg-bronze-50 py-2 flex items-center justify-center mt-1"
      >
        <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-bronze-700">
          Integration Layer
        </span>
      </motion.div>

      {/* connector: integration layer -> connected ecosystem */}
      <DashLine variants={line} className="h-2 sm:h-2.5 mt-1" />

      {/* Tier 3 — the outcome */}
      <IconPill variants={pill} icon={Globe} label="CONNECTED ECOSYSTEM" accent className="mt-1" iconSize={20} />
    </motion.div>
  );
};

/** 04 — application, then cloud infrastructure, fans out to database/API/storage, and converges back into monitoring + backups. */
const CloudVisual: React.FC = () => {
  const reduce = !!useReducedMotion();
  const layers = [
    { label: 'DATABASE', icon: ICONS.postgresql },
    { label: 'API', icon: ICONS.postman },
    { label: 'STORAGE', icon: ICONS.awsS3 },
  ];
  const pill = popVariants(reduce);
  const line = fadeVariants(reduce);

  return (
    <motion.div
      variants={stagger(reduce, 0.14)}
      {...revealTrigger()}
      className="flex flex-col items-center"
    >
      {/* Tier 1 — the application */}
      <IconPill variants={pill} icon={ICONS.docker} label="APPLICATION" mobileIconSize={28} />

      <DashLine variants={line} className="h-1.5 sm:h-2.5 my-0.5" />

      {/* Tier 2 — the cloud infrastructure layer */}
      <IconPill variants={pill} icon={ICONS.azure} label="CLOUD INFRASTRUCTURE" accent className="w-[90%] sm:w-2/3 justify-center" iconSize={32} mobileIconSize={26} />

      <DashLine variants={line} className="h-1.5 sm:h-2.5 my-0.5" />

      {/* fans out to database / api / storage */}
      <DashBus variants={line} />

      <motion.div variants={stagger(reduce, 0.06)} className="grid grid-cols-3 gap-1 sm:gap-1.5 w-full">
        {layers.map((l) => {
          const isDatabase = l.label === 'DATABASE';
          return (
            <div key={l.label} className="flex flex-col items-center">
              <DashLine variants={line} className="h-2 mb-0.5" />
              <IconPill
                variants={pill}
                icon={l.icon}
                label={l.label}
                className="w-full justify-center"
                iconSize={32}
                mobileIconSize={isDatabase ? 29 : undefined}
                tight
                mobileTight={isDatabase}
              />
              <DashLine variants={line} className="h-2 mt-0.5" />
            </div>
          );
        })}
      </motion.div>

      {/* database / api / storage converge back into one line */}
      <DashBus variants={line} />

      <DashLine variants={line} className="h-1.5 sm:h-2.5 my-0.5" />

      {/* Tier 3 — monitoring + backups */}
      <IconPill variants={pill} icon={ICONS.grafana} label="MONITORING & BACKUPS" className="mt-0.5 w-[90%] sm:w-auto justify-center" mobileIconSize={28} />
    </motion.div>
  );
};

interface Service {
  number: string;
  category: string;
  title: string;
  description: string;
  capabilities: string[];
  Visual: React.FC;
}

const services: Service[] = [
  {
    number: '01',
    category: 'PRODUCT ENGINEERING',
    title: 'Digital Product Engineering',
    description: 'Design, build and launch production-ready digital products around the way your business works.',
    capabilities: ['SaaS Platforms', 'Web Applications', 'Customer Portals', 'APIs & Backend Systems'],
    Visual: ProductEngineeringVisual,
  },
  {
    number: '02',
    category: 'TECHNOLOGY MODERNIZATION',
    title: 'Technology Modernization',
    description: 'Transform aging technology into modern, scalable systems without disrupting the business behind it.',
    capabilities: ['Legacy Application Modernization', 'Cloud Migration', 'Database Modernization', 'Process Digitization'],
    Visual: ModernizationVisual,
  },
  {
    number: '03',
    category: 'SYSTEMS INTEGRATION',
    title: 'Systems Integration',
    description: 'Connect the platforms, data and workflows your business already depends on into one operational ecosystem.',
    capabilities: ['CRM & ERP Integration', 'Payment Integration', 'WhatsApp & Communication Systems', 'API & Data Integration'],
    Visual: IntegrationVisual,
  },
  {
    number: '04',
    category: 'CLOUD & INFRASTRUCTURE',
    title: 'Cloud & Infrastructure Services',
    description: 'Deploy, monitor and scale the infrastructure that keeps your digital systems secure, reliable and ready to grow.',
    capabilities: ['Cloud Infrastructure', 'Deployment & CI/CD', 'Performance Optimization', 'Security & Backups'],
    Visual: CloudVisual,
  },
];

/** The number/category/title/description/capabilities + diagram content shared by the default
 * stacked row, the mobile reel card, and the pinned desktop showcase panel below — one definition
 * so all three presentations render identical service content. */
const ServicePanelContent: React.FC<{ service: Service; instant?: boolean }> = ({ service, instant = false }) => {
  const { number, category, title, description, capabilities, Visual } = service;
  return (
    <div className="@container">
      {/* The text/diagram split needs real width to breathe — a plain `lg:` breakpoint doesn't
          account for the pinned desktop showcase's own nav column already eating into that width,
          so it used to switch to two columns before there was actually room, cramping the title,
          capability pills, and diagram icons. `@container` measures this panel's own rendered
          width directly, so the split only happens once there's genuinely space for it — on any
          screen, in both the pinned showcase and the plain stacked row below it. */}
      <div className={`grid grid-cols-1 @[780px]:grid-cols-[2fr_3fr] items-center @[780px]:gap-12 ${instant ? 'gap-3' : 'gap-6'}`}>
      <div>
        <span className="block font-serif font-bold text-stone-300 text-4xl sm:text-5xl leading-none mb-4">
          {number}
        </span>
        <span className="block text-bronze-600 text-xs font-semibold uppercase tracking-widest mb-2">
          {category}
        </span>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-3 leading-tight">
          {title}
        </h3>
        <p className="text-stone-500 text-sm sm:text-base leading-relaxed max-w-sm mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {capabilities.map((cap) => (
            <span
              key={cap}
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600"
            >
              <span className="w-1 h-1 rounded-full bg-bronze-400 shrink-0" />
              {cap}
            </span>
          ))}
        </div>
      </div>

      <div>
        {/* Padding shrinks only in the desktop pinned showcase's stacked state (narrow container,
            `instant` layout path) — that's the one place text-above-diagram has to fit inside a
            fixed `100vh`-ish sticky stage, and Cloud & Infrastructure's 4-tier diagram was tall
            enough to spill past its bottom edge there. Once that same container is wide enough to
            go side-by-side (`@[780px]`), padding returns to the original size — matching the row
            layout below, which was never the problem and stays untouched either way. Purely a
            layout concern now — the diagram's own reveal animation always plays the same way
            regardless, so this doesn't affect how `Visual` animates. */}
        <div className={`rounded-xl border border-stone-200 bg-white @[780px]:p-6 ${instant ? 'p-3' : 'p-5 sm:p-6'}`}>
          <Visual />
        </div>
      </div>
      </div>
    </div>
  );
};

const ServiceRow: React.FC<{ service: Service }> = ({ service }) => {
  const reduce = !!useReducedMotion();

  return (
    <motion.div
      variants={fadeUpVariants(reduce)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px', amount: 0.2 }}
      className="py-10 sm:py-12"
    >
      <ServicePanelContent service={service} />
    </motion.div>
  );
};

const stageVariants: Variants = {
  initial: { opacity: 0, y: 12, scale: 0.985 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, scale: 0.985, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

/** Measures the real fixed header (topbar + nav) height so the sticky stage can start right below it
 * instead of a guessed offset — same measurement used by the Products desktop showcase. */
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

const ServicesNav: React.FC<{ activeIndex: number; onSelect: (i: number) => void; progress: MotionValue<number> }> = ({
  activeIndex,
  onSelect,
  progress,
}) => {
  const lineHeight = useTransform(progress, [0, 1], ['0%', '100%']);
  return (
    <nav aria-label="Services" className="relative">
      <div className="absolute left-[5px] top-2 bottom-2 w-px bg-stone-200" />
      <motion.div className="absolute left-[5px] top-2 w-px bg-bronze-500 origin-top" style={{ height: lineHeight }} />
      <ol className="relative space-y-7 lg:space-y-8">
        {services.map((service, i) => (
          <li key={service.number}>
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
                  {service.number}
                </span>
                <span className={`block text-sm transition-all duration-300 ${i === activeIndex ? 'text-stone-900 font-semibold' : 'text-stone-400 font-normal group-hover:text-stone-500'}`}>
                  {service.title}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};

const SERVICES_TOP_GAP = 16;

/** Desktop-only (lg+): pins the section and drives an active service through a left progress nav,
 * cross-fading the content panel on scroll — same pinned-scroll pattern as the Products desktop
 * showcase (DesktopShowcase in ProductsShowcase.tsx), reused here so both sections animate alike. */
const ServicesDesktopShowcase: React.FC = () => {
  const pinRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const headerHeight = useHeaderHeight();
  const stickyTop = headerHeight + SERVICES_TOP_GAP;
  // Same fix as the Products desktop showcase (see DesktopShowcase in ProductsShowcase.tsx): the
  // sticky box is sized to its real content (no forced min-height), so `position: sticky` actually
  // releases once its bottom scrolls up to `stickyTop + contentHeight` — well before the pinned
  // track's bottom reaches the viewport's bottom edge, which is what Framer's default "end end"
  // progress treats as v=1. Anchoring "end" to the real release point keeps the two in sync.
  const contentHeight = useMeasuredHeight(stickyRef, 340);
  const releasePoint = stickyTop + contentHeight;
  const scrollOffset = useMemo(() => ["start start", `end ${releasePoint}px`] as const, [releasePoint]);
  const { scrollYProgress } = useScroll({ target: pinRef, offset: scrollOffset });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(services.length - 1, Math.max(0, Math.floor(v * services.length)));
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
    const targetProgress = (i + 0.5) / services.length;
    window.scrollTo({ top: elTop + targetProgress * scrollableRange, behavior: 'smooth' });
  };

  return (
    <div ref={pinRef} className="hidden lg:block relative" style={{ height: `${services.length * 55}vh` }}>
      <div
        ref={stickyRef}
        className="sticky flex items-center justify-center"
        style={{ top: stickyTop }}
      >
        <div className="w-full">
          <div className="grid grid-cols-[210px_1fr] gap-4 lg:gap-10 items-center">
            <ServicesNav activeIndex={activeIndex} onSelect={scrollToIndex} progress={scrollYProgress} />
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
                  <ServicePanelContent service={services[activeIndex]} instant />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Same card content as the row layout below, just extracted so both the default row and the
 * mobile reel stack render identical service content without duplicating it. Deterministic-fit
 * layout (mirrors ProductReelCardContent): the outer box is exactly the stage's height — no
 * `overflow-y-auto` scroll trap. The number/title/description/pills are fixed-size; the diagram gets
 * whatever's left (`flex-1`, top-aligned) so it's what adapts across device heights instead of the
 * page silently clipping the CTA/last node. */
const ServicesReelCardContent: React.FC<{ service: Service }> = ({ service }) => {
  const { number, title, description, capabilities, Visual } = service;
  return (
    <div className="h-full flex flex-col overflow-hidden bg-stone-50 px-5 pt-5 pb-5">
      <div className="shrink-0">
        <div className="flex items-baseline gap-2.5 mb-2">
          <span className="text-lg font-serif font-semibold text-bronze-500 leading-none">{number}</span>
          <h3 className="text-lg font-serif font-bold text-stone-900 leading-tight">{title}</h3>
        </div>
        <p className="text-stone-500 text-[13px] leading-snug mb-3">{description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {capabilities.map((cap) => (
            <span
              key={cap}
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-[11px] font-medium text-stone-600"
            >
              <span className="w-1 h-1 rounded-full bg-bronze-400 shrink-0" />
              {cap}
            </span>
          ))}
        </div>
      </div>
      {/* The one adaptive element: absorbs whatever room the stage's real (viewport-driven) height
          leaves after the fixed header block above. Top-aligned (with a little breathing room of its
          own) so the diagram sits close under the header instead of floating in the middle of a large
          empty zone on cards with a shorter diagram (Product Engineering, Modernization, Integration) —
          any real leftover slack just becomes extra space below it. */}
      <div className="flex-1 min-h-[80px] overflow-hidden flex items-start justify-center pt-2">
        <div className="w-full">
          <Visual />
        </div>
      </div>
    </div>
  );
};

const REEL_STAGE_TOP = 92; // px — clears the fixed mobile topbar + nav
// Ideal clearance below the stage for the floating WhatsApp button (bottom-20 offset + 48px circle).
// Used in full when the viewport can afford it; shrunk (see reelStageHeight) on short viewports so it
// never starves the card's own content, which always wins.
const REEL_DESIRED_BOTTOM_GAP = 132; // px
const REEL_MIN_BOTTOM_GAP = 16; // px — smallest page-bottom margin we'll shrink down to
// The real minimum card height with zero slack: worst-case header block (number+title+desc+
// capability pills) + the *natural* (unshrunk) height of that card's own diagram + the card's own
// vertical padding, each measured at the narrowest target width (320px). "Cloud & Infrastructure
// Services" is the tallest combination. The diagram can't be shrunk to fit a smaller box the way the
// product image can (object-fit on an <img> vs. arbitrary icon/label DOM) — and its sizing is shared
// with the desktop pinned panel, which must not change — so this floor has to fit its true size, not
// an arbitrary CSS min-height. Measured, not guessed.
const REEL_CONTENT_FLOOR = 560; // px
// No ceiling: the whole point of this stage is to BE the usable mobile viewport (minus the WhatsApp
// safe area), not a smaller card floating inside a taller section — so the stage should grow with the
// device, with the diagram's flex-1 wrapper above absorbing that extra room.
const REEL_STAGE_MAX_HEIGHT = Number.POSITIVE_INFINITY;
// Minimal backdrop band around each card — just enough for a peek of the receded card behind and a
// deliberate edge margin, without eating into the viewport the active service gets to use.
const REEL_PEEK_TOP = 14; // px
const REEL_PEEK_SIDE = 4; // px

/** Hero/Home-only mobile presentation: pins a "stage" and drives each card's transform/opacity/blur
 * directly off scroll position via `useReelStack` (rAF-throttled, no React re-renders) so the next
 * card rises up and snaps into focus while receded cards stay faintly stacked behind it — not a
 * crossfade or an index swap. Isolated behind the `mobileReels` prop so ServicesPage is completely
 * unaffected. */
const ServicesReelStack: React.FC<{ services: Service[]; labelHeight: number }> = ({ services, labelHeight }) => {
  const reduce = !!useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stageTop = REEL_STAGE_TOP + labelHeight;

  // The real, currently-visible viewport (accounts for mobile browser chrome showing/hiding), not a
  // blind `100vh` — re-measured on resize so the stage always matches the actual available space
  // below the header and above the WhatsApp button's reserved area.
  const [viewportHeight, setViewportHeight] = useState(() => (typeof window !== 'undefined' ? window.innerHeight : 800));
  useLayoutEffect(() => {
    // Mobile browsers show/hide their address bar in direct response to scrolling, which fires
    // `resize` with a new `window.innerHeight` mid-gesture — right as the user scrolls through the
    // reel. Applying that change immediately shifts `stageHeight` (and so `total`/`progress` inside
    // `useReelStack`) with no user input, which reads as the reel snapping/auto-scrolling away from
    // wherever it was a moment ago. Debounce so the stage only resyncs once the viewport has
    // genuinely stopped changing (a real resize/orientation change), not on every chrome
    // collapse/expand tick while still scrolling.
    let resizeTimer: number | null = null;
    const onResize = () => {
      if (resizeTimer != null) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => setViewportHeight(window.innerHeight), 300);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (resizeTimer != null) window.clearTimeout(resizeTimer);
    };
  }, []);
  const stageHeight = reelStageHeight(viewportHeight, stageTop, {
    desiredBottomGap: REEL_DESIRED_BOTTOM_GAP,
    minBottomGap: REEL_MIN_BOTTOM_GAP,
    contentFloor: REEL_CONTENT_FLOOR,
    maxHeight: REEL_STAGE_MAX_HEIGHT,
  });

  // Kept in a ref (not just a variable) so the scroll-driven `useReelStack` loop below always reads
  // the latest measured stage height without resubscribing its listeners on every resize.
  const stageHeightRef = useRef(stageHeight);
  useLayoutEffect(() => {
    stageHeightRef.current = stageHeight;
  }, [stageHeight]);

  useReelStack(trackRef, cardRefs, services.length, reduce, stageHeightRef);

  // The stage (unlike the Products reel) is shorter than the viewport once the header offset and the
  // WhatsApp-button bottom gap are subtracted, so the track only needs to reserve a tail equal to the
  // stage's own height plus a breathing cushion — not a flat 100vh guess — or the section stays
  // pinned on the already-settled last card for a long stretch of dead scroll before it releases.
  // That cushion has to be generous enough to actually function as a cushion, though: `total` (the
  // sticky stage's full pin travel) works out to `transitionsPx + cushion`, and progress only reaches
  // "last card fully settled" in that final `cushion`-px sliver — so a too-small cushion (this used to
  // be 32px) means the instant the last card looks settled, the scroll position is already sitting at
  // the pin's release edge. Any further scroll at all then blows straight past it in one step, un-
  // pinning the stage and letting the rest of the page reveal itself at full, unresisted speed — which
  // reads as an abrupt jump away from the card the user was just reading, not a natural continuation.
  const REEL_TAIL_BREATHING_PX = 220;
  const tailVh = viewportHeight > 0
    ? ((stageHeight + REEL_TAIL_BREATHING_PX) / viewportHeight) * 100
    : undefined;

  if (reduce) {
    return (
      <div className="md:hidden space-y-5">
        {services.map((service) => (
          <ServicesReelCardContent key={service.number} service={service} />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={trackRef}
      data-testid="services-reel-track"
      className="md:hidden relative"
      style={{ height: `${reelTrackHeightVh(services.length, tailVh)}vh` }}
    >
      <div
        data-testid="services-reel-stage"
        className="sticky overflow-hidden bg-stone-50"
        style={{ top: stageTop, height: stageHeight }}
      >
        {services.map((service, i) => (
          <div
            key={service.number}
            data-testid="services-reel-card"
            data-index={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="absolute origin-top rounded-xl overflow-hidden"
            style={{
              top: REEL_PEEK_TOP,
              right: REEL_PEEK_SIDE,
              bottom: REEL_PEEK_SIDE,
              left: REEL_PEEK_SIDE,
              zIndex: i,
              ...reelCardInitialStyle(i === 0),
            }}
          >
            <ServicesReelCardContent service={service} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const ServicesShowcase: React.FC<{ mobileReels?: boolean }> = ({ mobileReels = false }) => {
  const reduce = !!useReducedMotion();
  const labelRef = useRef<HTMLDivElement>(null);
  const labelHeight = useMeasuredHeight(labelRef, 34);

  return (
    <section id="capabilities" className="bg-stone-50 py-14 sm:py-16 md:py-20 lg:pt-14 lg:pb-8 px-5 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Only this small label stays pinned on mobile — its sticky range spans this whole
              wrapper (label + heading/divider + reel track), not just the intro block, so it stays
              visible through the entire service sequence instead of scrolling away with the
              heading. The heading/divider below it are normal flow and scroll past it. */}
          <div
            ref={labelRef}
            className={
              mobileReels
                ? 'sticky md:static top-[92px] md:top-auto z-20 md:z-auto text-center bg-stone-50/95 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none py-1.5 md:py-0'
                : 'text-center'
            }
          >
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold tracking-[0.2em] text-bronze-600 uppercase block"
            >
              Our Services
            </motion.span>
          </div>

          <motion.div
            className="mb-10 sm:mb-14 lg:mb-14 mt-3 md:mt-0 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-140px', amount: 0.15 }}
          >
            <motion.h2
              variants={fadeUpVariants(reduce, 22, 0.6)}
              className="text-[clamp(1.75rem,5.2vw,3.25rem)] font-serif font-bold text-stone-900 mb-4"
            >
              End-to-End Digital Transformation
            </motion.h2>
            <motion.p
              variants={fadeUpVariants(reduce, 12, 0.5)}
              className="text-stone-500 text-base sm:text-lg max-w-2xl mx-auto mb-6"
            >
              Full-stack engineering services built around your existing systems — from new products to legacy modernization, delivered end-to-end.
            </motion.p>
            <motion.div
              variants={fadeUpVariants(reduce, 10, 0.5)}
              className="w-12 h-0.5 bg-bronze-400 mx-auto"
            />
          </motion.div>

          <div className={`divide-y divide-stone-200 ${mobileReels ? 'hidden md:block' : ''} ${reduce ? '' : 'lg:hidden'}`}>
            {services.map((service) => (
              <ServiceRow key={service.number} service={service} />
            ))}
          </div>
          {!reduce && <ServicesDesktopShowcase />}
          {mobileReels && <ServicesReelStack services={services} labelHeight={labelHeight} />}
        </div>

        <motion.div
          variants={fadeUpVariants(reduce, 10, 0.4)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          // `lg:mt-24` only (mobile/tablet spacing untouched): on desktop this link sits right
          // after the pinned showcase's full scroll track, and the moment that pin releases (right
          // after service 04, whose diagram nearly fills the pinned stage) there's barely any
          // buffer before this link scrolls into the same space — reading as it landing on top of
          // the diagram. The extra margin only applies once the pin is actually in play (`lg:`).
          className={`text-center mt-8 sm:mt-10 lg:mt-24 ${mobileReels ? 'hidden md:block' : ''}`}
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 text-stone-500 hover:text-bronze-600 text-sm transition-colors"
          >
            <span className="relative">
              Not sure which one fits? Let's talk it through
              <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-bronze-400 transition-[width] duration-300 ease-out group-hover:w-full" />
            </span>
            <ArrowRight size={15} className="transition-transform duration-300 motion-safe:group-hover:translate-x-1.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
