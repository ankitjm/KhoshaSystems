import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
  type MotionValue,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUpVariants = (reduce: boolean, distance = 24, duration = 0.5): Variants =>
  reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.25 } } }
    : { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0, transition: { duration, ease: EASE } } };

/** Scroll-progress window for a row's visual: 0 as it enters the lower viewport, 1 as it clears the upper viewport. */
const useVisualProgress = (ref: React.RefObject<HTMLDivElement>) =>
  useScroll({ target: ref, offset: ['start 0.9', 'end 0.3'] }).scrollYProgress;

/** 01 — a bronze fill line grows through the 3 connectors as you scroll past the stage chips. */
const ProductEngineeringVisual: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => {
  const reduce = !!useReducedMotion();
  const stages = ['IDEA', 'ARCHITECTURE', 'PRODUCT', 'PRODUCTION'];
  const fill0 = useTransform(progress, [0.05, 0.35], [0, 1]);
  const fill1 = useTransform(progress, [0.35, 0.65], [0, 1]);
  const fill2 = useTransform(progress, [0.65, 0.95], [0, 1]);
  const fills = [fill0, fill1, fill2];

  return (
    <div className="flex items-center overflow-x-auto">
      {stages.map((stage, i) => (
        <React.Fragment key={stage}>
          {i > 0 && (
            <span className="relative h-px w-4 sm:flex-1 shrink-0 mx-1.5 sm:mx-2 bg-stone-200 overflow-hidden">
              <motion.span
                style={{ scaleX: reduce ? 1 : fills[i - 1], transformOrigin: 'left' }}
                className="absolute inset-0 bg-bronze-400"
              />
            </span>
          )}
          <div
            className={`shrink-0 rounded-lg border px-2.5 sm:px-3 py-2 text-center text-[10px] sm:text-[11px] font-semibold tracking-wide ${
              i === stages.length - 1
                ? 'border-bronze-300 bg-bronze-50 text-bronze-700'
                : 'border-stone-200 bg-stone-50 text-stone-600'
            }`}
          >
            {stage}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

/** 02 — a bronze bar fills beneath the before/after stacks, reading as legacy migrating to modern. */
const ModernizationVisual: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => {
  const reduce = !!useReducedMotion();
  const fill = useTransform(progress, [0.1, 0.9], [0, 1]);
  const before = ['Legacy App', 'Old Database', 'Manual Process'];
  const after = ['Modern Application', 'APIs', 'Cloud / Data'];

  return (
    <div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
        <div className="space-y-1.5 sm:space-y-2">
          <span className="block text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-1.5">
            Before
          </span>
          {before.map((item) => (
            <div
              key={item}
              className="rounded-md border border-dashed border-stone-300 bg-stone-50 px-2 sm:px-2.5 py-2 text-[10px] sm:text-[11px] text-stone-500"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center text-stone-400">
          <ArrowRight size={16} />
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <span className="block text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-bronze-600 mb-1.5">
            After
          </span>
          {after.map((item) => (
            <div
              key={item}
              className="rounded-md border border-bronze-200 bg-bronze-50 px-2 sm:px-2.5 py-2 text-[10px] sm:text-[11px] font-medium text-bronze-700"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="relative h-1 rounded-full bg-stone-200 overflow-hidden mt-4 sm:mt-5">
        <motion.div
          style={{ scaleX: reduce ? 1 : fill, transformOrigin: 'left' }}
          className="absolute inset-0 bg-bronze-400"
        />
      </div>
    </div>
  );
};

/**
 * Shared architecture-diagram primitives for 03 and 04, so both diagrams read as one visual system.
 * Structure (cards, labels, track lines) is always fully rendered — only the bronze "fill" on top of
 * each gray track animates with scroll, so the diagram is complete and legible even with zero motion.
 */
const VConnector: React.FC<{ fill: MotionValue<number>; reduce: boolean; className?: string }> = ({
  fill,
  reduce,
  className = '',
}) => (
  <span className={`relative w-px h-2 sm:h-2.5 bg-stone-200 overflow-hidden ${className}`}>
    <motion.span
      style={{ scaleY: reduce ? 1 : fill, transformOrigin: 'top' }}
      className="absolute inset-0 bg-bronze-400"
    />
  </span>
);

const HBus: React.FC<{ fill: MotionValue<number>; reduce: boolean; className?: string }> = ({
  fill,
  reduce,
  className = '',
}) => (
  <div className={`relative w-full h-1.5 ${className}`}>
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-stone-200 overflow-hidden">
      <motion.div
        style={{ scaleX: reduce ? 1 : fill, transformOrigin: 'center' }}
        className="absolute inset-0 bg-bronze-300"
      />
    </div>
    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-bronze-400" />
  </div>
);

/** 03 — 5 systems each drop a straight connector into one shared bus, which feeds a single line into the integration layer, then the connected ecosystem. */
const IntegrationVisual: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => {
  const reduce = !!useReducedMotion();
  const nodes = ['CRM', 'ERP', 'PAYMENTS', 'WHATSAPP', 'ANALYTICS'];

  const s0 = useTransform(progress, [0.05, 0.22], [0, 1]);
  const s1 = useTransform(progress, [0.08, 0.25], [0, 1]);
  const s2 = useTransform(progress, [0.11, 0.28], [0, 1]);
  const s3 = useTransform(progress, [0.14, 0.31], [0, 1]);
  const s4 = useTransform(progress, [0.17, 0.34], [0, 1]);
  const stubFills = [s0, s1, s2, s3, s4];

  const busFill = useTransform(progress, [0.32, 0.5], [0, 1]);
  const toLayer = useTransform(progress, [0.5, 0.64], [0, 1]);
  const toEco = useTransform(progress, [0.76, 0.92], [0, 1]);

  return (
    <div className="flex flex-col items-center">
      {/* Tier 1 — the individual systems, each with its own connector */}
      <div className="grid grid-cols-5 gap-1 sm:gap-1.5 w-full">
        {nodes.map((n, i) => (
          <div key={n} className="flex flex-col items-center">
            <span className="w-full text-center rounded-md border border-stone-200 bg-stone-50 px-0.5 sm:px-1.5 py-1.5 text-[7.5px] sm:text-[9px] font-semibold tracking-wide text-stone-600 whitespace-nowrap overflow-hidden">
              {n}
            </span>
            <VConnector fill={stubFills[i]} reduce={reduce} />
          </div>
        ))}
      </div>

      {/* every system converges into one shared bus */}
      <HBus fill={busFill} reduce={reduce} />

      {/* one connector from the bus into the integration layer */}
      <VConnector fill={toLayer} reduce={reduce} className="mt-0.5" />

      {/* Tier 2 — the integration layer */}
      <div className="w-[70%] sm:w-3/5 rounded-md border border-bronze-200 bg-bronze-50 py-2 flex items-center justify-center mt-1">
        <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-bronze-700">
          Integration Layer
        </span>
      </div>

      {/* connector: integration layer -> connected ecosystem */}
      <VConnector fill={toEco} reduce={reduce} className="mt-1" />

      {/* Tier 3 — the outcome */}
      <span className="mt-1 rounded-md border border-bronze-300 bg-bronze-50 px-3 py-2 text-[9px] sm:text-[10px] font-semibold tracking-wide text-bronze-700">
        CONNECTED ECOSYSTEM
      </span>
    </div>
  );
};

/** 04 — application sits on cloud infrastructure, which fans out to database/API/storage and converges back into monitoring + backups. */
const CloudVisual: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => {
  const reduce = !!useReducedMotion();
  const layers = ['DATABASE', 'API', 'STORAGE'];

  const toCloud = useTransform(progress, [0.04, 0.16], [0, 1]);
  const toBranch = useTransform(progress, [0.16, 0.26], [0, 1]);
  const fanBus = useTransform(progress, [0.24, 0.36], [0, 1]);

  const d0 = useTransform(progress, [0.33, 0.43], [0, 1]);
  const d1 = useTransform(progress, [0.36, 0.46], [0, 1]);
  const d2 = useTransform(progress, [0.39, 0.49], [0, 1]);
  const downFills = [d0, d1, d2];

  const m0 = useTransform(progress, [0.55, 0.65], [0, 1]);
  const m1 = useTransform(progress, [0.58, 0.68], [0, 1]);
  const m2 = useTransform(progress, [0.61, 0.71], [0, 1]);
  const mergeFills = [m0, m1, m2];

  const mergeBus = useTransform(progress, [0.7, 0.82], [0, 1]);
  const toMonitoring = useTransform(progress, [0.8, 0.92], [0, 1]);

  return (
    <div className="flex flex-col items-center">
      {/* Tier 1 — the application */}
      <span className="rounded-md border border-stone-200 bg-stone-50 px-3 py-1.5 text-[9px] sm:text-[10px] font-semibold tracking-wide text-stone-600">
        APPLICATION
      </span>

      <VConnector fill={toCloud} reduce={reduce} className="mt-0.5" />

      {/* Tier 2 — the cloud infrastructure layer */}
      <div className="w-[74%] sm:w-2/3 rounded-lg border border-bronze-300 bg-bronze-50 py-2 flex items-center justify-center">
        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-bronze-700">
          Cloud Infrastructure
        </span>
      </div>

      <VConnector fill={toBranch} reduce={reduce} className="mt-0.5" />

      {/* fans out to database / api / storage */}
      <HBus fill={fanBus} reduce={reduce} />

      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 w-full">
        {layers.map((l, i) => (
          <div key={l} className="flex flex-col items-center">
            <VConnector fill={downFills[i]} reduce={reduce} />
            <span className="w-full text-center rounded-md border border-stone-200 bg-stone-50 px-1 sm:px-1.5 py-1.5 text-[8px] sm:text-[9px] font-semibold tracking-wide text-stone-600 whitespace-nowrap overflow-hidden mt-0.5">
              {l}
            </span>
            <VConnector fill={mergeFills[i]} reduce={reduce} className="mt-0.5" />
          </div>
        ))}
      </div>

      {/* database / api / storage converge back into one line */}
      <HBus fill={mergeBus} reduce={reduce} />

      <VConnector fill={toMonitoring} reduce={reduce} className="mt-0.5" />

      {/* Tier 3 — monitoring + backups */}
      <span className="mt-1 inline-flex items-center gap-1.5 rounded-md border border-stone-200 bg-white px-3 py-1.5 text-[9px] sm:text-[10px] font-semibold tracking-wide text-stone-600">
        <span className="w-1.5 h-1.5 rounded-full bg-bronze-500" />
        MONITORING & BACKUPS
      </span>
    </div>
  );
};

interface Service {
  number: string;
  category: string;
  title: string;
  description: string;
  capabilities: string[];
  Visual: React.FC<{ progress: MotionValue<number> }>;
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
    capabilities: ['Cloud Infrastructure', 'Deployment & CI/CD', 'Monitoring', 'Performance Optimization', 'Security & Backups'],
    Visual: CloudVisual,
  },
];

const ServiceRow: React.FC<{ service: Service }> = ({ service }) => {
  const reduce = !!useReducedMotion();
  const visualRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useVisualProgress(visualRef);
  const { number, category, title, description, capabilities, Visual } = service;

  return (
    <motion.div
      variants={fadeUpVariants(reduce)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px', amount: 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6 lg:gap-12 items-center py-10 sm:py-12"
    >
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
        <p className="text-stone-500 text-sm sm:text-base leading-relaxed max-w-sm">
          {description}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-2 mb-5">
          {capabilities.map((cap) => (
            <span
              key={cap}
              className="inline-flex items-center rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600"
            >
              {cap}
            </span>
          ))}
        </div>
        <div ref={visualRef} className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
          <Visual progress={scrollYProgress} />
        </div>
      </div>
    </motion.div>
  );
};

export const ServicesShowcase: React.FC = () => {
  const reduce = !!useReducedMotion();

  return (
    <section id="capabilities" className="bg-stone-50 py-14 sm:py-16 md:py-20 px-5 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-4 sm:mb-6 max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-140px', amount: 0.15 }}
        >
          <motion.span
            variants={fadeUpVariants(reduce, 12, 0.5)}
            className="text-sm font-semibold tracking-[0.2em] text-bronze-600 uppercase mb-3 sm:mb-4 block"
          >
            Capabilities
          </motion.span>
          <motion.h2
            variants={fadeUpVariants(reduce, 22, 0.6)}
            className="text-[clamp(1.75rem,5.2vw,3.25rem)] font-serif font-bold text-stone-900 mb-3"
          >
            Four ways we build, modernize and connect technology.
          </motion.h2>
          <motion.p
            variants={fadeUpVariants(reduce, 18, 0.55)}
            className="text-stone-500 text-base sm:text-lg leading-relaxed"
          >
            From building new digital products to modernizing existing systems, we engineer technology around the way your business works.
          </motion.p>
        </motion.div>

        <div className="divide-y divide-stone-200">
          {services.map((service) => (
            <ServiceRow key={service.number} service={service} />
          ))}
        </div>

        <motion.div
          variants={fadeUpVariants(reduce, 10, 0.4)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-10"
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
