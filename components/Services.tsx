import React from 'react';
import {
  Layers, Sparkles, TrendingUp, Globe, Smartphone, AppWindow, LucideIcon,
  Cloud, LayoutDashboard, Webhook, Building2, Filter, FileText, Component,
  MonitorSmartphone, Search, Bot, Workflow, MessageSquare, Building, CloudCog,
  Link2, RefreshCw, CloudUpload, Settings2, ArrowRight,
} from 'lucide-react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Detail {
  label: string;
  icon: LucideIcon;
}

interface Capability {
  title: string;
  tagline: string;
  icon: LucideIcon;
  details: Detail[];
}

interface Group {
  label: string;
  word: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
  accent: 'bronze' | 'stone';
  items: Capability[];
}

const groups: Group[] = [
  {
    label: 'What We Build',
    word: 'BUILD',
    description: "From idea to production. Digital products engineered for performance and scale.",
    image: "/images/services-build.jpg",
    imageAlt: "Code editor on a monitor at a dark desk, representing Khosha Systems' build work",
    imagePosition: "50% center",
    accent: 'bronze',
    items: [
      {
        title: "Web Applications",
        tagline: "Custom apps built with modern frameworks, from MVPs to enterprise platforms.",
        icon: Globe,
        details: [
          { label: "SaaS", icon: Cloud },
          { label: "Dashboards", icon: LayoutDashboard },
          { label: "APIs", icon: Webhook },
        ]
      },
      {
        title: "Websites & Landing Pages",
        tagline: "High-converting sites with performance and SEO built in.",
        icon: AppWindow,
        details: [
          { label: "Corporate", icon: Building2 },
          { label: "Funnels", icon: Filter },
          { label: "CMS", icon: FileText },
        ]
      },
      {
        title: "Mobile Applications",
        tagline: "Cross-platform and native apps for iOS and Android.",
        icon: Smartphone,
        details: [
          { label: "React Native", icon: Component },
          { label: "PWAs", icon: MonitorSmartphone },
          { label: "App Store", icon: Search },
        ]
      },
    ]
  },
  {
    label: 'What We Transform',
    word: 'TRANSFORM',
    description: "Modernize, integrate, and optimize what already powers your business.",
    image: "/images/services-transform.jpg",
    imageAlt: "Laptop with an analytics dashboard surrounded by a network graphic, representing Khosha Systems' transformation work",
    imagePosition: "62% center",
    accent: 'stone',
    items: [
      {
        title: "AI Transformation",
        tagline: "AI integrated into existing workflows — chatbots, document processing, predictive analytics.",
        icon: Sparkles,
        details: [
          { label: "AI Agents", icon: Bot },
          { label: "Automation", icon: Workflow },
          { label: "LLMs", icon: MessageSquare },
        ]
      },
      {
        title: "System Architecture",
        tagline: "We design for where you're headed, not just where you are.",
        icon: Layers,
        details: [
          { label: "Enterprise", icon: Building },
          { label: "Cloud-Native", icon: CloudCog },
          { label: "Integrations", icon: Link2 },
        ]
      },
      {
        title: "Digital Transformation",
        tagline: "Legacy modernization, cloud migration, and process digitization.",
        icon: TrendingUp,
        details: [
          { label: "Modernization", icon: RefreshCw },
          { label: "Migration", icon: CloudUpload },
          { label: "Automation", icon: Settings2 },
        ]
      },
    ]
  }
];

const accentStyles = {
  bronze: {
    dash: 'bg-bronze-400',
    word: 'text-bronze-400',
    badgeBg: 'bg-bronze-50',
    badgeText: 'text-bronze-600',
    chipShadow: 'group-hover:shadow-[0_2px_10px_rgba(180,135,94,0.2)]',
    imageTint: 'bg-bronze-900/55',
  },
  stone: {
    dash: 'bg-stone-400',
    word: 'text-stone-300',
    badgeBg: 'bg-stone-100',
    badgeText: 'text-stone-700',
    chipShadow: 'group-hover:shadow-[0_2px_10px_rgba(120,113,108,0.18)]',
    imageTint: 'bg-stone-900/40',
  },
};

// Per-capability hover micro-interaction (see .svc-icon-* in global.css)
const iconDecor: Record<string, string> = {
  'Web Applications': 'svc-icon-sweep',
  'Websites & Landing Pages': 'svc-icon-ring',
  'Mobile Applications': 'svc-icon-vbar',
  'AI Transformation': 'svc-icon-pulse',
  'System Architecture': 'svc-icon-layers',
};

const EASE = [0.16, 1, 0.3, 1] as const;

export const Services: React.FC = () => {
  const reduce = useReducedMotion();

  // Simple fade for headline/paragraph/CTA — direction + distance vary, timing is orchestrated via delay.
  const fadeUp = (delay: number, distance = 20, duration = 0.55): Variants =>
    reduce
      ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.25 } } }
      : {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0, transition: { duration, ease: EASE, delay } },
        };

  // Image panel: soft zoom-out, with a bronze glow that resolves as it settles.
  // No y-offset here — this element also carries the rounded/clipped image box, and translating
  // it away from rest briefly exposes the outer card's white background above it (see #architecture bug).
  const imageVariants = (delay: number): Variants =>
    reduce
      ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.25 } } }
      : {
          hidden: { opacity: 0.75, scale: 1.025, boxShadow: '0 0 0 rgba(180,135,94,0)' },
          visible: {
            opacity: 1,
            scale: 1,
            boxShadow: '0 0 0 1px rgba(180,135,94,0.1), 0 4px 24px rgba(180,135,94,0.08)',
            transition: { duration: 0.5, ease: EASE, delay },
          },
        };

  // Hairline "activation" sweep that draws across the row just ahead of the cards.
  const lineVariants = (delay: number): Variants =>
    reduce
      ? { hidden: { opacity: 0 }, visible: { opacity: 0 } }
      : {
          hidden: { scaleX: 0, opacity: 0 },
          visible: {
            scaleX: 1,
            opacity: [0, 0.6, 0.3],
            transition: { duration: 0.65, ease: EASE, delay },
          },
        };

  // Orchestrates the 3 cards in a row — each card leaves its own transition undefined
  // so Framer computes its delay from staggerChildren/delayChildren.
  const cardsContainerVariants = (delay: number): Variants => ({
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : delay } },
  });

  const cardVariants: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.25 } } }
    : {
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
      };

  return (
    <section id="architecture" className="bg-stone-50 py-14 sm:py-16 md:py-20 px-5 sm:px-6 md:px-12 lg:px-24">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="mb-12 sm:mb-16">
          <motion.span
            variants={fadeUp(0, 12, 0.5)}
            className="text-sm font-semibold tracking-[0.2em] text-bronze-600 uppercase mb-3 sm:mb-4 block"
          >
            Capabilities
          </motion.span>
          <motion.h2
            variants={fadeUp(0, 22, 0.6)}
            className="whitespace-nowrap text-[clamp(1.375rem,5.2vw,3.75rem)] font-serif font-bold text-stone-900 mb-2 sm:mb-3"
          >
            Two Ways We Work With You.
          </motion.h2>
          <motion.p
            variants={fadeUp(0.1, 18, 0.55)}
            className="max-w-2xl text-stone-500 text-base sm:text-lg leading-relaxed"
          >
            Some engagements start from a blank page. Others start with a system that already exists and needs to work harder. We're set up for both.
          </motion.p>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
          {groups.map((group, groupIndex) => {
            const accent = accentStyles[group.accent];
            const rowDelay = groupIndex === 0 ? 0.15 : 0.35;
            return (
              <div
                key={group.label}
                className="grid grid-cols-1 lg:grid-cols-[340px_1fr] border border-stone-200 rounded-xl overflow-hidden bg-white"
              >
                {/* Image panel — animates in first */}
                <motion.div
                  variants={imageVariants(rowDelay)}
                  whileHover={
                    reduce
                      ? undefined
                      : {
                          scale: 1.02,
                          boxShadow: '0 0 0 1px rgba(180,135,94,0.18), 0 10px 34px rgba(180,135,94,0.14)',
                          transition: { duration: 0.7, ease: 'easeOut' },
                        }
                  }
                  className="relative h-72 lg:h-auto overflow-hidden"
                >
                  <picture>
                    <source srcSet={group.image.replace(/\.jpg$/, '.webp')} type="image/webp" />
                    <img
                      src={group.image}
                      alt={group.imageAlt}
                      className="absolute inset-0 w-full h-full object-cover grayscale-[35%] contrast-[1.05]"
                      style={{ objectPosition: group.imagePosition }}
                      loading="lazy"
                    />
                  </picture>
                  <div className={`absolute inset-0 mix-blend-color ${accent.imageTint}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
                  <div className="relative h-full p-6 sm:p-8 flex flex-col justify-end">
                    <span className={`w-8 h-0.5 mb-3 ${accent.dash}`} />
                    <span className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-1 block">
                      What We
                    </span>
                    <h3 className={`text-2xl sm:text-3xl font-serif font-extrabold mb-2.5 leading-none tracking-tight ${accent.word}`}>
                      {group.word}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                      {group.description}
                    </p>
                  </div>
                </motion.div>

                {/* Capability grid — cascades in shortly after the image starts settling, not after it */}
                <motion.div
                  variants={cardsContainerVariants(rowDelay + 0.18)}
                  className="relative grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-stone-100"
                >
                  <motion.span
                    variants={lineVariants(rowDelay + 0.05)}
                    style={{ transformOrigin: 'left' }}
                    className={`hidden sm:block absolute top-0 left-0 right-0 h-px ${accent.dash}`}
                  />
                  {group.items.map((item) => (
                    <motion.div
                      key={item.title}
                      variants={cardVariants}
                      className="group relative p-6 sm:p-7 flex flex-col items-center text-center border border-transparent hover:border-stone-200 transition duration-300 motion-safe:hover:-translate-y-[3px] motion-reduce:transition-none"
                    >
                      <div
                        className={`svc-icon-badge ${iconDecor[item.title] ?? ''} relative w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto transition-transform duration-300 motion-safe:group-hover:scale-[1.05] ${accent.badgeBg} ${accent.badgeText}`}
                      >
                        <item.icon
                          size={20}
                          className={item.title === 'Digital Transformation' ? 'transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5' : ''}
                        />
                      </div>
                      <h4 className="min-h-[48px] flex items-center justify-center text-base font-serif font-bold text-stone-900 mb-1.5">{item.title}</h4>
                      <p className="min-h-[58px] sm:min-h-[68px] text-stone-500 text-xs sm:text-sm leading-relaxed mb-3 transition-colors duration-300 group-hover:text-stone-600">{item.tagline}</p>
                      <div className="grid grid-cols-3 gap-2 w-full">
                        {item.details.map((detail) => (
                          <div
                            key={detail.label}
                            className={`flex flex-col items-center gap-1.5 rounded-lg px-1.5 py-2.5 transition-shadow duration-300 motion-reduce:transition-none ${accent.badgeBg} ${accent.chipShadow}`}
                          >
                            <detail.icon size={15} className={`shrink-0 ${accent.badgeText}`} />
                            <span className={`text-[10px] sm:text-[11px] font-medium leading-tight text-center ${accent.badgeText}`}>
                              {detail.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>

        <motion.div variants={fadeUp(1.15, 10, 0.4)} className="text-center mt-8 sm:mt-10">
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
      </motion.div>
    </section>
  );
};
