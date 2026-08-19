import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Lightbulb,
  Boxes,
  LayoutTemplate,
  Rocket,
  AppWindow,
  FileText,
  Plug,
  Cloud,
  Database,
  User,
  LayoutGrid,
  CreditCard,
  MessageCircle,
  BarChart3,
  Globe,
  Box,
  Code2,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

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

/** Icon badge with a caption below — the flow-stage nodes in 01 and the system nodes in 03. */
const IconNode: React.FC<{
  icon: LucideIcon;
  label: string;
  variants: Variants;
  shape?: 'circle' | 'square';
  accent?: boolean;
  size?: 'md' | 'sm';
}> = ({ icon: Icon, label, variants, shape = 'circle', accent = false, size = 'md' }) => {
  const dim = size === 'md' ? 'w-14 h-14 sm:w-16 sm:h-16' : 'w-9 h-9 sm:w-11 sm:h-11';
  const iconSize = size === 'md' ? 22 : 15;
  return (
    <motion.div variants={variants} className="flex flex-col items-center gap-1.5 sm:gap-2">
      <div
        className={`flex items-center justify-center border ${dim} ${
          shape === 'circle' ? 'rounded-full' : 'rounded-lg'
        } ${accent ? 'border-bronze-300 bg-bronze-50 text-bronze-600' : 'border-stone-200 bg-stone-50 text-stone-500'}`}
      >
        <Icon size={iconSize} strokeWidth={1.5} />
      </div>
      <span
        className={`text-[7.5px] sm:text-[9px] font-semibold tracking-wide text-center leading-tight ${
          accent ? 'text-bronze-700' : 'text-stone-600'
        }`}
      >
        {label}
      </span>
    </motion.div>
  );
};

/** Icon + label pill — the before/after items, integration outcome, and cloud infrastructure tiers. */
const IconPill: React.FC<{
  icon: LucideIcon;
  label: string;
  variants: Variants;
  accent?: boolean;
  className?: string;
}> = ({ icon: Icon, label, variants, accent = false, className = '' }) => (
  <motion.div
    variants={variants}
    className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-md border px-2 sm:px-2.5 py-1.5 sm:py-2 ${
      accent ? 'border-bronze-200 bg-bronze-50 text-bronze-700' : 'border-stone-200 bg-stone-50 text-stone-600'
    } ${className}`}
  >
    <span
      className={`flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded shrink-0 border ${
        accent ? 'border-bronze-200 bg-white/70 text-bronze-600' : 'border-stone-200 bg-white text-stone-500'
      }`}
    >
      <Icon size={12} strokeWidth={1.75} />
    </span>
    <span className="text-[8px] sm:text-[10px] font-semibold tracking-wide leading-tight">{label}</span>
  </motion.div>
);

/** 01 — IDEA pops in, its line fades, ARCHITECTURE pops in, and so on through to the accented PRODUCTION stage. */
const ProductEngineeringVisual: React.FC = () => {
  const reduce = !!useReducedMotion();
  const stages = [
    { label: 'IDEA', icon: Lightbulb },
    { label: 'ARCHITECTURE', icon: Boxes },
    { label: 'PRODUCT', icon: LayoutTemplate },
    { label: 'PRODUCTION', icon: Rocket },
  ];
  const node = popVariants(reduce);
  const line = fadeVariants(reduce);

  return (
    <motion.div
      variants={stagger(reduce, 0.16)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="flex items-start justify-between px-1 sm:px-3"
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
  );
};

/** 02 — each before/after row cascades in (legacy pill, dashed arrow, modern pill), one row after another. */
const ModernizationVisual: React.FC = () => {
  const reduce = !!useReducedMotion();
  const rows = [
    { before: { label: 'Legacy App', icon: AppWindow }, after: { label: 'Modern Application', icon: AppWindow } },
    { before: { label: 'Old Database', icon: Database }, after: { label: 'APIs', icon: Plug } },
    { before: { label: 'Manual Process', icon: FileText }, after: { label: 'Cloud / Data', icon: Cloud } },
  ];
  const pill = popVariants(reduce);
  const arrow = fadeVariants(reduce);

  return (
    <motion.div
      variants={stagger(reduce, 0.2)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
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
    { label: 'CRM', icon: User },
    { label: 'ERP', icon: LayoutGrid },
    { label: 'PAYMENTS', icon: CreditCard },
    { label: 'WHATSAPP', icon: MessageCircle },
    { label: 'ANALYTICS', icon: BarChart3 },
  ];
  const node = popVariants(reduce);
  const line = fadeVariants(reduce);
  const pill = popVariants(reduce);

  return (
    <motion.div
      variants={stagger(reduce, 0.14)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col items-center"
    >
      {/* Tier 1 — the individual systems, each with its own connector */}
      <motion.div variants={stagger(reduce, 0.05)} className="grid grid-cols-5 gap-1 sm:gap-1.5 w-full">
        {nodes.map((n) => (
          <div key={n.label} className="flex flex-col items-center">
            <IconNode variants={node} icon={n.icon} label={n.label} shape="square" size="sm" />
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
      <IconPill variants={pill} icon={Globe} label="CONNECTED ECOSYSTEM" accent className="mt-1" />
    </motion.div>
  );
};

/** 04 — application, then cloud infrastructure, fans out to database/API/storage, and converges back into monitoring + backups. */
const CloudVisual: React.FC = () => {
  const reduce = !!useReducedMotion();
  const layers = [
    { label: 'DATABASE', icon: Database },
    { label: 'API', icon: Code2 },
    { label: 'STORAGE', icon: Database },
  ];
  const pill = popVariants(reduce);
  const line = fadeVariants(reduce);

  return (
    <motion.div
      variants={stagger(reduce, 0.14)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col items-center"
    >
      {/* Tier 1 — the application */}
      <IconPill variants={pill} icon={Box} label="APPLICATION" />

      <DashLine variants={line} className="h-2 sm:h-2.5 my-0.5" />

      {/* Tier 2 — the cloud infrastructure layer */}
      <IconPill variants={pill} icon={Cloud} label="CLOUD INFRASTRUCTURE" accent className="w-[74%] sm:w-2/3 justify-center" />

      <DashLine variants={line} className="h-2 sm:h-2.5 my-0.5" />

      {/* fans out to database / api / storage */}
      <DashBus variants={line} />

      <motion.div variants={stagger(reduce, 0.06)} className="grid grid-cols-3 gap-1.5 sm:gap-2 w-full">
        {layers.map((l) => (
          <div key={l.label} className="flex flex-col items-center">
            <DashLine variants={line} className="h-2 mb-0.5" />
            <IconPill variants={pill} icon={l.icon} label={l.label} className="w-full justify-center" />
            <DashLine variants={line} className="h-2 mt-0.5" />
          </div>
        ))}
      </motion.div>

      {/* database / api / storage converge back into one line */}
      <DashBus variants={line} />

      <DashLine variants={line} className="h-2 sm:h-2.5 my-0.5" />

      {/* Tier 3 — monitoring + backups */}
      <IconPill variants={pill} icon={ShieldCheck} label="MONITORING & BACKUPS" className="mt-0.5" />
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
    capabilities: ['Cloud Infrastructure', 'Deployment & CI/CD', 'Monitoring', 'Performance Optimization', 'Security & Backups'],
    Visual: CloudVisual,
  },
];

const ServiceRow: React.FC<{ service: Service }> = ({ service }) => {
  const reduce = !!useReducedMotion();
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
        <div className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
          <Visual />
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
          className="mb-10 sm:mb-14 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-140px', amount: 0.15 }}
        >
          <motion.span
            variants={fadeUpVariants(reduce, 12, 0.5)}
            className="text-sm font-semibold tracking-[0.2em] text-bronze-600 uppercase mb-3 sm:mb-4 block"
          >
            Our Services
          </motion.span>
          <motion.h2
            variants={fadeUpVariants(reduce, 22, 0.6)}
            className="text-[clamp(1.75rem,5.2vw,3.25rem)] font-serif font-bold text-stone-900 mb-4"
          >
            End-to-End Digital Transformation
          </motion.h2>
          <motion.div
            variants={fadeUpVariants(reduce, 10, 0.5)}
            className="w-12 h-0.5 bg-bronze-400 mx-auto"
          />
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
