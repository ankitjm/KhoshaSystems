import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Star, ArrowRight, Cloud, Folder, TrendingUp, TrendingDown, Gauge, AlertTriangle, Check } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

// ---- Layout: every position below is authored in a 1000 x 1320 unit box,
// expressed as percentages so the same numbers work at any breakpoint. ----
const notePos = {
  spreadsheets: { left: 0.8, top: 0.45, width: 29.2, height: 18.94 },
  manualHandoffs: { left: 37.2, top: 2.12, width: 21.4, height: 15.53 },
  crm: { left: 0.8, top: 20.45, width: 27.6, height: 18.94 },
  slack: { left: 33.0, top: 21.21, width: 31.2, height: 17.42 },
  tasks: { left: 0.8, top: 40.45, width: 28.6, height: 18.94 },
  reports: { left: 32.0, top: 41.21, width: 22.3, height: 17.42 },
  waitingApprovals: { left: 0.8, top: 61.67, width: 21.2, height: 15.53 },
  files: { left: 24.6, top: 60.0, width: 27.3, height: 18.94 },
  invoices: { left: 54.5, top: 61.29, width: 25.1, height: 16.29 },
  analytics: { left: 0.8, top: 80.0, width: 35.2, height: 18.94 },
  latestVersion: { left: 38.6, top: 81.74, width: 19.9, height: 15.53 },
  hub: { left: 70.0, top: 35.83, width: 28.0, height: 22.27 },
} as const;

const ARROWS = [
  { d: 'M 308 130 L 364 130', tip: [364, 130] },
  { d: 'M 594 130 C 734 130 552 545 692 545', tip: [692, 545] },
  { d: 'M 292 395 L 322 395', tip: [322, 395] },
  { d: 'M 650 395 C 720 395 622 585 692 585', tip: [692, 585] },
  { d: 'M 551 659 C 630 659 613 620 692 620', tip: [692, 620] },
  { d: 'M 670 801 C 670 731 622 660 692 660', tip: [692, 660] },
  { d: 'M 593 1181 C 748 1181 537 700 692 700', tip: [692, 700] },
] as const;

const EXIT_ARROW = { d: 'M 988 620 L 1064 620', tip: [1064, 620] as [number, number] };

const panelItems = [
  {
    num: 1,
    title: 'Unified Data',
    description: 'Real-time sync across systems and source of truth.',
    icon: '/images/philosophy-icon-unified-data-v2.webp',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  {
    num: 2,
    title: 'Automation Flows',
    description: 'Workflows that run, adapt, and scale.',
    icon: '/images/philosophy-icon-automation-flows-v2.webp',
    badge: 'bg-violet-100 text-violet-700',
  },
  {
    num: 3,
    title: 'Team Workspace',
    description: 'Aligned teams, shared context, work that moves forward.',
    icon: '/images/philosophy-icon-team-workspace-v2.webp',
    badge: 'bg-sky-100 text-sky-700',
  },
  {
    num: 4,
    title: 'Customer Experience',
    description: 'Seamless experiences that delight and retain.',
    icon: '/images/philosophy-icon-customer-experience-v2.webp',
    badge: 'bg-orange-100 text-orange-700',
  },
];

const stats = [
  { label: 'Revenue', value: '+28%', icon: TrendingUp, tone: 'text-emerald-600' },
  { label: 'Ops Efficiency', value: '92%', icon: Gauge, tone: 'text-emerald-600' },
  { label: 'Cycle Time', value: '-32%', icon: TrendingDown, tone: 'text-sky-600' },
  { label: 'Alerts', value: '2', sub: 'requiring attention', icon: AlertTriangle, tone: 'text-amber-500' },
];

function useVariants(reduce: boolean) {
  const t = (v: number) => (reduce ? Math.min(v * 0.12, 0.4) : v);

  const popIn = (delay: number): Variants =>
    reduce
      ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.25, delay: t(delay), ease: EASE } } }
      : { hidden: { opacity: 0, scale: 0.72 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.42, delay, ease: EASE } } };

  const drawIn = (delay: number): Variants =>
    reduce
      ? { hidden: { opacity: 0, pathLength: 1 }, visible: { opacity: 1, pathLength: 1, transition: { duration: 0.2, delay: t(delay) } } }
      : {
          hidden: { opacity: 0, pathLength: 0 },
          visible: { opacity: 1, pathLength: 1, transition: { pathLength: { duration: 0.42, delay, ease: EASE }, opacity: { duration: 0.12, delay } } },
        };

  const headIn = (delay: number): Variants =>
    reduce
      ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.15, delay: t(delay) } } }
      : { hidden: { opacity: 0, scale: 0.6 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.2, delay, ease: EASE } } };

  const riseIn = (delay: number): Variants =>
    reduce
      ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.25, delay: t(delay) } } }
      : { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.38, delay, ease: EASE } } };

  return { popIn, drawIn, headIn, riseIn };
}

const NoteBox: React.FC<{ pos: { left: number; top: number; width: number; height: number }; variants: Variants; className?: string; children: React.ReactNode }> = ({
  pos,
  variants,
  className = '',
  children,
}) => (
  <motion.div
    variants={variants}
    className={`absolute ${className}`}
    style={{ left: `${pos.left}%`, top: `${pos.top}%`, width: `${pos.width}%`, aspectRatio: `${pos.width} / ${pos.height}` }}
  >
    {children}
  </motion.div>
);

const shadow = '[filter:drop-shadow(0_1px_1px_rgb(28_25_23/0.06))_drop-shadow(0_3px_6px_rgb(28_25_23/0.07))]';

const Connector: React.FC<{ d: string; tip: readonly [number, number]; lineVariants: Variants; headVariants: Variants }> = ({ d, tip, lineVariants, headVariants }) => (
  <>
    <motion.path variants={lineVariants} d={d} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    <motion.path
      variants={headVariants}
      d={`M ${tip[0] - 9} ${tip[1] - 6} L ${tip[0]} ${tip[1]} L ${tip[0] - 9} ${tip[1] + 6}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </>
);

export const Philosophy: React.FC = () => {
  const reduceMotion = !!useReducedMotion();
  const { popIn, drawIn, headIn, riseIn } = useVariants(reduceMotion);

  return (
    <section id="philosophy" className="bg-bronze-50 border-b border-stone-100 py-14 sm:py-16 md:py-20 px-5 sm:px-6 md:px-12 lg:px-24 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-start">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-5 lg:pt-2"
          >
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
              Most businesses run on{' '}
              <span className="relative inline-block text-stone-700">
                duct tape.
                <svg
                  viewBox="0 0 200 14"
                  preserveAspectRatio="none"
                  className="absolute left-[-3%] w-[106%] h-[0.5em] top-[0.56em] -translate-y-1/2 overflow-visible pointer-events-none"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M4,8 C 40,3 70,11 100,6 C 130,2 165,10 196,5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    className="text-bronze-500"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: reduceMotion ? 0.3 : 0.6, delay: reduceMotion ? 0 : 0.8, ease: 'easeOut' }}
                  />
                </svg>
              </span>
            </h2>
            <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
              Disconnected tools, manual processes, spreadsheet chaos. Businesses bleed time and capital on infrastructure that wasn't designed for growth. This is{' '}
              <strong className="text-stone-700">technical debt</strong>.
            </p>
            <blockquote className="border-l-2 border-bronze-400 pl-4 py-1.5 italic text-stone-600 text-sm">
              "Your technology stack should be an asset, not a liability. We engineer systems that compound in value over time."
            </blockquote>
          </motion.div>

          {/* Diagram */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px', amount: 0.15 }}
            className="border border-stone-200 bg-white rounded-2xl p-5 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-[1fr_1.05fr] gap-8 md:gap-10 relative overflow-visible"
          >
            {/* Chaos canvas: 11 notes + hub + connecting arrows, one shared coordinate system */}
            <div className="relative w-full overflow-visible" style={{ aspectRatio: '1000 / 1320' }} aria-hidden="true">
              <svg viewBox="0 0 1000 1320" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none text-stone-300" aria-hidden="true">
                {ARROWS.map((a, i) => (
                  <Connector key={i} d={a.d} tip={a.tip} lineVariants={drawIn(1.4 + i * 0.09)} headVariants={headIn(1.4 + i * 0.09 + 0.32)} />
                ))}
                <g className="hidden md:block">
                  <Connector d={EXIT_ARROW.d} tip={EXIT_ARROW.tip} lineVariants={drawIn(2.38)} headVariants={headIn(2.68)} />
                </g>
              </svg>

              <NoteBox pos={notePos.spreadsheets} variants={popIn(0.32)} className="z-10">
                <img src="/images/philosophy-chaos-note-spreadsheets-v2.webp" alt="" aria-hidden="true" className={`w-full h-full object-contain ${shadow}`} loading="lazy" decoding="async" />
              </NoteBox>

              <NoteBox pos={notePos.manualHandoffs} variants={popIn(0.395)} className="z-10">
                <div className={`w-full h-full rounded-lg bg-amber-100 p-2 flex flex-col justify-between ${shadow}`}>
                  <span className="text-[10px] font-medium text-stone-700 leading-tight">Manual Handoffs</span>
                  <ArrowRight size={12} className="text-stone-500" />
                </div>
              </NoteBox>

              <NoteBox pos={notePos.crm} variants={popIn(0.47)} className="z-10">
                <img src="/images/philosophy-chaos-note-crm-v2.webp" alt="" aria-hidden="true" className={`w-full h-full object-contain ${shadow}`} loading="lazy" decoding="async" />
              </NoteBox>

              <NoteBox pos={notePos.slack} variants={popIn(0.545)} className="z-10">
                <img src="/images/philosophy-chaos-note-slack-v2.webp" alt="" aria-hidden="true" className={`w-full h-full object-contain ${shadow}`} loading="lazy" decoding="async" />
              </NoteBox>

              <NoteBox pos={notePos.tasks} variants={popIn(0.62)} className="z-10">
                <div className={`w-full h-full rounded-lg bg-white border border-stone-100 p-2 flex flex-col gap-1 ${shadow}`}>
                  <span className="text-[10px] font-semibold text-stone-800 mb-0.5">Tasks</span>
                  {['Follow up', 'Data cleanup', 'Send update'].map((t) => (
                    <div key={t} className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 flex items-center justify-center shrink-0">
                        <Check size={7} className="text-white" strokeWidth={3} />
                      </span>
                      <span className="text-[8px] text-stone-500 truncate">{t}</span>
                    </div>
                  ))}
                </div>
              </NoteBox>

              <NoteBox pos={notePos.reports} variants={popIn(0.695)} className="z-10">
                <div className={`w-full h-full rounded-lg bg-white border border-stone-100 p-2 flex flex-col ${shadow}`}>
                  <span className="text-[10px] font-semibold text-stone-800 mb-1">Reports</span>
                  <div className="flex items-end gap-1 flex-1">
                    {[35, 55, 45, 75, 60].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-emerald-300 to-emerald-500" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </NoteBox>

              <NoteBox pos={notePos.waitingApprovals} variants={popIn(0.77)} className="z-10">
                <div className={`w-full h-full rounded-lg bg-rose-100 p-2 flex flex-col justify-between ${shadow}`}>
                  <span className="text-[10px] font-medium text-stone-700 leading-tight">Waiting on Approvals</span>
                  <ArrowRight size={12} className="text-stone-500" />
                </div>
              </NoteBox>

              <NoteBox pos={notePos.files} variants={popIn(0.845)} className="z-10">
                <div className={`w-full h-full rounded-lg bg-white border border-stone-100 p-2 flex flex-col ${shadow}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-semibold text-stone-800">Files</span>
                    <Cloud size={11} className="text-stone-300" />
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-1.5">
                    <Folder size={20} className="text-amber-400" fill="currentColor" fillOpacity={0.25} />
                    <Folder size={20} className="text-amber-400" fill="currentColor" fillOpacity={0.25} />
                  </div>
                </div>
              </NoteBox>

              <NoteBox pos={notePos.invoices} variants={popIn(0.92)} className="z-10">
                <div className={`w-full h-full rounded-lg bg-white border border-stone-100 p-2 flex flex-col justify-between ${shadow}`}>
                  <span className="text-[10px] font-semibold text-stone-800">Invoices</span>
                  <span className="text-[11px] font-bold text-stone-800">INV-1024</span>
                  <span className="self-start text-[8px] font-medium text-rose-600 bg-rose-50 rounded px-1.5 py-0.5">Overdue</span>
                </div>
              </NoteBox>

              <NoteBox pos={notePos.analytics} variants={popIn(0.995)} className="z-10">
                <div className={`w-full h-full rounded-lg bg-white border border-stone-100 p-2 flex flex-col ${shadow}`}>
                  <span className="text-[10px] font-semibold text-stone-800 mb-1">Analytics</span>
                  <svg viewBox="0 0 100 40" className="flex-1 w-full text-sky-500" preserveAspectRatio="none">
                    <polyline points="2,32 22,20 40,26 60,10 80,16 98,4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </NoteBox>

              <NoteBox pos={notePos.latestVersion} variants={popIn(1.07)} className="z-10">
                <div className={`w-full h-full rounded-lg bg-emerald-50 p-2 flex items-center ${shadow}`}>
                  <span className="text-[10px] italic text-stone-700 leading-tight">Where is the latest version?</span>
                </div>
              </NoteBox>

              <NoteBox pos={notePos.hub} variants={popIn(0)} className="z-20">
                <img src="/images/philosophy-hub-badge-v2.webp" alt="KAI AI OS" className={`w-full h-full object-contain ${shadow}`} loading="lazy" decoding="async" />
              </NoteBox>
            </div>

            {/* System panel */}
            <div>
              <motion.div variants={riseIn(2.5)} className="flex items-center gap-2 mb-4 text-bronze-600">
                <Star size={14} fill="currentColor" />
                <span className="uppercase tracking-widest text-[11px] font-medium">Your Customer Operating System</span>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {panelItems.map((item, i) => (
                  <motion.div key={item.num} variants={popIn(2.66 + i * 0.09)} className="border border-stone-100 rounded-lg p-3 bg-bronze-50/40">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-6 h-6 rounded-md text-[11px] font-semibold flex items-center justify-center shrink-0 ${item.badge}`}>{item.num}</span>
                      <span className="text-xs font-semibold text-stone-800">{item.title}</span>
                    </div>
                    <img src={item.icon} alt="" aria-hidden="true" className="w-full h-auto mb-2" loading="lazy" decoding="async" />
                    <p className="text-[11px] text-stone-500 leading-snug">{item.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={popIn(2.66 + 4 * 0.09)} className="mt-3 border border-stone-100 rounded-lg p-3 bg-bronze-50/40">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-md text-[11px] font-semibold flex items-center justify-center shrink-0 bg-bronze-100 text-bronze-700">5</span>
                  <span className="text-xs font-semibold text-stone-800">Control &amp; Insights</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                  {stats.map((s) => (
                    <div key={s.label} className="rounded-md border border-stone-200 bg-white p-2 flex flex-col">
                      <div className="flex items-start gap-1 text-stone-400 mb-1 min-h-[22px]">
                        <s.icon size={11} className={`${s.tone} mt-[1px] shrink-0`} />
                        <span className="text-[9px] uppercase tracking-wide leading-tight">{s.label}</span>
                      </div>
                      <div className="text-sm font-semibold text-stone-800">{s.value}</div>
                      <div className="text-[9px] text-stone-400 leading-tight min-h-[11px]">{s.sub ?? ''}</div>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-stone-500 leading-snug">Real-time visibility. Confident decisions. Measurable outcomes.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
