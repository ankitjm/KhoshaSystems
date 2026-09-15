import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Star, ArrowRight, Cloud, Folder, Check, ArrowDown } from 'lucide-react';

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

const EXIT_ARROW = { d: 'M 950 620 L 1026 620', tip: [1026, 620] as [number, number] };

const panelItems = [
  {
    num: 1,
    title: 'Unified Data',
    description: 'Real-time sync across systems and source of truth.',
    icon: '/images/philosophy-icon-unified-data-v4.webp',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  {
    num: 2,
    title: 'Automation Flows',
    description: 'Workflows that run, adapt, and scale.',
    icon: '/images/philosophy-icon-automation-flows-v3.webp',
    badge: 'bg-violet-100 text-violet-700',
  },
  {
    num: 3,
    title: 'Team Workspace',
    description: 'Aligned teams, shared context, work that moves forward.',
    icon: '/images/philosophy-icon-team-workspace-v3.webp',
    badge: 'bg-sky-100 text-sky-700',
  },
  {
    num: 4,
    title: 'Customer Experience',
    description: 'Seamless experiences that delight and retain.',
    icon: '/images/philosophy-icon-customer-experience-v3.webp',
    badge: 'bg-orange-100 text-orange-700',
  },
];

// Shorter copy for the narrow mobile row layout only — desktop keeps panelItems[].description as-is.
const MOBILE_DESCRIPTIONS: Record<number, string> = {
  1: 'Real-time sync, one source of truth.',
  2: 'Workflows that run, adapt, and scale.',
  3: 'Aligned teams with shared context.',
  4: 'Seamless experiences that delight and retain.',
};

const stats = [
  { label: 'Revenue', icon: '/images/philosophy-stat-revenue.webp' },
  { label: 'Ops Efficiency', icon: '/images/philosophy-stat-ops-efficiency.webp' },
  { label: 'Cycle Time', icon: '/images/philosophy-stat-cycle-time.webp' },
  { label: 'Alerts', icon: '/images/philosophy-stat-alerts.webp' },
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

  // Plain opacity fade — for dotted/dashed strokes, where drawIn's pathLength
  // animation would otherwise override the custom strokeDasharray.
  const fadeIn = (delay: number): Variants => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: reduce ? 0.2 : 0.35, delay: t(delay) } },
  });

  return { popIn, drawIn, headIn, riseIn, fadeIn };
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

const Connector: React.FC<{ d: string; tip: readonly [number, number]; lineVariants: Variants; headVariants: Variants; headDir?: 'right' | 'down' }> = ({
  d,
  tip,
  lineVariants,
  headVariants,
  headDir = 'right',
}) => {
  const head =
    headDir === 'down'
      ? `M ${tip[0] - 6} ${tip[1] - 9} L ${tip[0]} ${tip[1]} L ${tip[0] + 6} ${tip[1] - 9}`
      : `M ${tip[0] - 9} ${tip[1] - 6} L ${tip[0]} ${tip[1]} L ${tip[0] - 9} ${tip[1] + 6}`;
  return (
    <>
      <motion.path variants={lineVariants} d={d} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <motion.path variants={headVariants} d={head} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
};

/** The KAI OS badge — used small (desktop-adjacent) and large (mobile Hub stage centerpiece), sized via prop. */
const PhilosophyKaiBadge: React.FC<{ size?: number }> = ({ size = 96 }) => (
  <div className="relative shrink-0" style={{ width: size, height: size }} aria-hidden="true">
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full text-bronze-200 pointer-events-none overflow-visible">
      <circle cx="100" cy="100" r="99" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.55" strokeDasharray="3 4" />
      <circle cx="100" cy="100" r="112" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="2 5" />
    </svg>
    <div className="absolute inset-2 rounded-full bg-white border border-bronze-100 shadow-lg flex flex-col items-center justify-center gap-0.5 px-1">
      <img src="/images/philosophy-hub-k-glyph.webp" alt="" style={{ width: size * 0.29 }} className="h-auto" loading="lazy" decoding="async" />
      <span className="font-bold text-stone-900 leading-none whitespace-nowrap" style={{ fontSize: Math.max(9, size * 0.09) }}>
        KAI OS
      </span>
    </div>
  </div>
);

/** Card 1 of the reel: heading, subtitle and the chaos cluster — nothing else, so it reads as one
 * cohesive 100vh composition instead of text-above/graphic-below. `contentRef` lets PhilosophyReelStack
 * imperatively dissolve this whole group (opacity/blur/scale) as the Hub card rises over it. */
const PhilosophyChaosCard: React.FC<{ contentRef?: React.RefObject<HTMLDivElement> }> = ({ contentRef }) => {
  const reduce = !!useReducedMotion();
  const fallbackRef = useRef<HTMLDivElement>(null);
  const ref = contentRef ?? fallbackRef;
  return (
    <div className="h-full w-full flex flex-col items-center justify-start bg-bronze-50 px-2 py-4 overflow-y-auto">
      <div ref={ref} className="w-full flex flex-col items-center gap-6">
        <div className="text-center px-2">
          <h2 className="text-[32px] font-serif font-bold text-stone-900 leading-tight">
            Most businesses run on{' '}
            <span className="relative inline-block text-stone-700">
              duct tape.
              <svg
                viewBox="0 0 200 14"
                preserveAspectRatio="none"
                className="absolute left-[-3%] w-[106%] h-[0.5em] top-[0.56em] -translate-y-1/2 overflow-visible pointer-events-none"
                aria-hidden="true"
              >
                <path
                  d="M4,8 C 40,3 70,11 100,6 C 130,2 165,10 196,5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  className="text-bronze-500"
                />
              </svg>
            </span>
          </h2>
          <p className="mt-2.5 text-stone-500 text-base leading-snug">
            Disconnected tools create <strong className="text-stone-700">technical debt</strong>.
          </p>
        </div>
        <img
          src="/images/philosophy-chaos-blended.webp"
          alt="Spreadsheets, CRM, Tasks, Reports, Files and Invoices scattered across disconnected tools"
          className="block w-full h-auto"
          loading="lazy"
          decoding="async"
        />
        {/* Fills the remaining breathing room with a purposeful cue rather than empty space — this
            section is scroll-driven, not click-driven, so it points down instead of being a button. */}
        <div className="flex flex-col items-center gap-1 text-bronze-400 shrink-0">
          <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
          <ArrowDown size={18} strokeWidth={2} className={reduce ? undefined : 'animate-bounce'} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

/** Card 2 of the reel: the pivot stage — bronze-50 field, one large centered KAI OS badge that
 * emerges from the grain (PhilosophyReelStack drives this wrapper's opacity/scale via `logoRef`), with
 * a small understated line underneath that fades in just after the logo settles, then fades back out
 * (via `subtitleRef`) the moment the Organized card begins rising over this stage. */
const PhilosophyHubCard: React.FC<{ logoRef?: React.RefObject<HTMLDivElement>; subtitleRef?: React.RefObject<HTMLParagraphElement> }> = ({
  logoRef,
  subtitleRef,
}) => {
  const fallbackLogoRef = useRef<HTMLDivElement>(null);
  const fallbackSubtitleRef = useRef<HTMLParagraphElement>(null);
  const ref = logoRef ?? fallbackLogoRef;
  const subRef = subtitleRef ?? fallbackSubtitleRef;
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-3 bg-bronze-50">
      <div ref={ref} className="opacity-0">
        <PhilosophyKaiBadge size={176} />
      </div>
      <p ref={subRef} className="opacity-0 text-stone-400 text-[11px] tracking-wide">
        one source, one truth
      </p>
    </div>
  );
};

// ---- Grain / sand transition: a lightweight canvas particle system, driven entirely by the pinned
// stage's own scroll progress (no independent scroll listener) — see PhilosophyReelStack's update(). ----
type GrainParticle = { hx: number; hy: number; tx: number; ty: number; size: number; phase: number; color: string; wobbleSeed: number };

// Mostly warm bronze dust (matches the section's own palette), with a minority tinted in the same
// green/purple/blue/orange accents the Organized panel's badges use — a small foreshadow that the
// chaos is sorting itself into that color-coded system, without introducing any new colors.
const GRAIN_BRONZE = ['212,184,150', '201,168,124', '180,135,94'];
const GRAIN_ACCENTS = ['16,185,129', '139,92,246', '14,165,233', '249,115,22'];

function makeGrainParticles(count: number): GrainParticle[] {
  const particles: GrainParticle[] = [];
  for (let i = 0; i < count; i++) {
    const useAccent = Math.random() < 0.16;
    const palette = useAccent ? GRAIN_ACCENTS : GRAIN_BRONZE;
    particles.push({
      hx: 0.08 + Math.random() * 0.84,
      hy: 0.08 + Math.random() * 0.66,
      tx: 0.5 + (Math.random() - 0.5) * 0.06,
      ty: 0.5 + (Math.random() - 0.5) * 0.06,
      size: 1 + Math.random() * 2.2,
      phase: Math.random(),
      color: palette[Math.floor(Math.random() * palette.length)],
      wobbleSeed: Math.random() * Math.PI * 2,
    });
  }
  return particles;
}

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Triangular envelope over the chaos→hub segment: rises as chaos dissolves, holds mid-transition,
// falls away before the logo settles solid — sells "the logo emerges from the particles."
const grainAlphaEnvelope = (local1: number) => {
  if (local1 <= 0 || local1 >= 0.9) return 0;
  if (local1 < 0.3) return local1 / 0.3;
  if (local1 < 0.65) return 1;
  return 1 - (local1 - 0.65) / 0.25;
};

// Staggered reveal for the mobile Organized card's 5 rows: one row settles in, then — after a beat —
// the remaining four follow one by one. Driven by the `revealed` flag PhilosophyReelStack flips once
// this card has fully slid into place, not by further scroll distance, so the user can keep scrolling
// through the sequence instead of having it gate their scroll.
const organizedListVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.55, delayChildren: 0.2 } },
};

const organizedRowVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
};

const organizedRowVariantsReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
};

// justify-center intentionally omitted here: the text column has a fixed width and the visual column
// is flex-1, so every row's number/title/description column anchors to the same left position and the
// visual column always occupies the same remaining width — one shared grid instead of per-row centering
// that used to drift left/right depending on each icon's intrinsic width.
const organizedRowClass = 'flex items-center gap-2.5 rounded-xl border border-bronze-100/50 bg-white/40 p-2';
// Capped width keeps the copy compact (wraps up to 2 lines) so the artwork — the visual standout of
// each row, not a decorative icon — gets most of the row's width.
const organizedTextClass = 'w-[38%] shrink-0 min-w-0';
const organizedBadgeClass = (badge: string) => `w-5 h-5 rounded text-[10px] font-semibold flex items-center justify-center shrink-0 ${badge}`;
const organizedTitleClass = 'text-[13px] font-semibold text-stone-800 leading-snug';
const organizedDescClass = 'text-[10px] text-stone-500 leading-snug line-clamp-2';
// These are full illustrations (~2:1 landscape), not square icons — the standout visual of each row —
// so they're sized well above icon scale, but on a FIXED height (not flex-driven width) so 5 rows have
// a predictable total height and reliably fit the pinned 100vh card instead of pushing it taller.
// flex-1 + centered: the visual column always fills the same remaining width and centers its content
// within it, regardless of that row's icon/graphic's own intrinsic width — the shared "right column".
const organizedIconWrapClass = 'flex-1 min-w-0 flex items-center justify-center';
const organizedIconClass = 'h-20 w-auto max-w-full object-contain';

/** Mobile-only stack of the same 5 "Customer Operating System" sections the desktop panel shows,
 * reusing its icons/copy but laid out as compact full-width rows instead of a 2-column grid, so the
 * whole thing fits inside the pinned reel card and can reveal one row at a time.
 * Row 1 (Unified Data) is static — always visible, no reveal animation — the remaining four rows
 * stagger in once `revealed` flips true. */
const PhilosophyOrganizedMobilePanel: React.FC<{ revealed: boolean }> = ({ revealed }) => {
  const reduce = !!useReducedMotion();
  const rowVariants = reduce ? organizedRowVariantsReduced : organizedRowVariants;
  const [firstItem, ...restItems] = panelItems;

  return (
    <div className="w-full flex flex-col gap-2.5">
      <div className={organizedRowClass}>
        <div className={organizedTextClass}>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className={organizedBadgeClass(firstItem.badge)}>{firstItem.num}</span>
            <span className={organizedTitleClass}>{firstItem.title}</span>
          </div>
          <p className={organizedDescClass}>{MOBILE_DESCRIPTIONS[firstItem.num] ?? firstItem.description}</p>
        </div>
        <div className={organizedIconWrapClass}>
          <img src={firstItem.icon} alt="" aria-hidden="true" className={organizedIconClass} loading="lazy" decoding="async" />
        </div>
      </div>

      <motion.div
        variants={organizedListVariants}
        initial="hidden"
        animate={reduce || revealed ? 'visible' : 'hidden'}
        className="w-full flex flex-col gap-2.5"
      >
        {restItems.map((item) => (
          <motion.div key={item.num} variants={rowVariants} className={organizedRowClass}>
            <div className={organizedTextClass}>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className={organizedBadgeClass(item.badge)}>{item.num}</span>
                <span className={organizedTitleClass}>{item.title}</span>
              </div>
              <p className={organizedDescClass}>{MOBILE_DESCRIPTIONS[item.num] ?? item.description}</p>
            </div>
            <div className={organizedIconWrapClass}>
              <img src={item.icon} alt="" aria-hidden="true" className={organizedIconClass} loading="lazy" decoding="async" />
            </div>
          </motion.div>
        ))}

        <motion.div variants={rowVariants} className={organizedRowClass}>
          <div className={organizedTextClass}>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className={organizedBadgeClass('bg-bronze-100 text-bronze-700')}>5</span>
              <span className={organizedTitleClass}>Control &amp; Insights</span>
            </div>
            <p className={organizedDescClass}>Real-time visibility, confident decisions.</p>
          </div>
          <div className={organizedIconWrapClass}>
            {/* 2x2 stack (not a single row of 4) so each stat reads clearly instead of shrinking to fit */}
            <div className="grid grid-cols-2 gap-1.5 justify-items-center items-center">
              {stats.map((s) => (
                <img key={s.label} src={s.icon} alt={s.label} className="h-10 w-auto object-contain" loading="lazy" decoding="async" />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

/** Card 3 of the reel: the organized system. Top-aligned (not vertically centered) so a short, punchy
 * payoff line — the answer to "Most businesses run on duct tape." — sits right at the top and the
 * reclaimed center/bottom of the viewport goes to the 5 sections, revealed one by one via
 * PhilosophyOrganizedMobilePanel once this card is in place. */
const PhilosophyOrganizedCard: React.FC<{ revealed: boolean }> = ({ revealed }) => (
  <div className="h-full w-full flex flex-col items-stretch gap-3 px-3 pt-4 pb-5 bg-bronze-50 overflow-y-auto">
    <div className="shrink-0 flex items-start gap-1.5">
      <Star size={14} className="text-bronze-500 shrink-0 mt-0.5" fill="currentColor" aria-hidden="true" />
      <div>
        <h3 className="text-[19px] font-serif font-bold text-stone-900 leading-tight">
          One system. <span className="text-bronze-600">Everything connected.</span>
        </h3>
        <p className="mt-0.5 text-stone-500 text-[11px] leading-snug">From scattered operations to one source of truth.</p>
      </div>
    </div>
    <PhilosophyOrganizedMobilePanel revealed={revealed} />
  </div>
);

const PHILOSOPHY_REEL_STAGE_TOP = 84; // px — clears the fixed mobile topbar + nav (matches ProductsShowcase's clearance)
const PHILOSOPHY_REEL_STAGE_BOTTOM_GAP = 8; // px

// Local copy of the easing curve used elsewhere for reel snapping (useReelStack.ts has its own
// private copy too — kept separate rather than shared so this file's snap behavior can't be
// perturbed by unrelated changes to that hook, and vice versa).
const reelEaseOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
// How long (ms) the scroll has to sit still before snapping to the nearest stage.
const REEL_SETTLE_DELAY = 220;
// Duration (ms) of the manual snap tween.
const REEL_SNAP_DURATION = 240;

/** Mobile-only: pins a 3-card "stage" — Chaos → Hub (grain + KAI OS) → Organized — and drives every
 * card's motion directly off scroll position via refs (no re-renders per frame). `count = 2.2` gives
 * each stage its own scroll segment: [0,1) Chaos dissolves into grain and the Hub logo forms and holds,
 * [1,2) Organized physically slides up over the Hub (the same proven cover mechanic the 2-stage version
 * already used), [2,2.2) a short settle cushion so the stagger reveal finishes and the section doesn't
 * hand off into the next one mid-motion. Once the user stops scrolling inside this range, an eased
 * `scrollTo` pulls the page the rest of the way to whichever of the three resting states (0, 1, 2) is
 * nearest — the same settle-to-nearest-card mechanic already proven on the Products/Services reels —
 * so a scroll can never end stranded mid-transition between two cards. */
const PhilosophyReelStack: React.FC = () => {
  const reduce = !!useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const chaosContentRef = useRef<HTMLDivElement>(null);
  const hubCardRef = useRef<HTMLDivElement>(null);
  const hubLogoRef = useRef<HTMLDivElement>(null);
  const hubSubtitleRef = useRef<HTMLParagraphElement>(null);
  const organizedCardRef = useRef<HTMLDivElement>(null);
  const grainCanvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<GrainParticle[] | null>(null);
  const local1Ref = useRef(0);
  const rafRef = useRef<number | null>(null);
  const grainRafRef = useRef<number | null>(null);
  const grainRunningRef = useRef(false);
  const organizedRevealedRef = useRef(false);
  const [organizedRevealed, setOrganizedRevealed] = React.useState(false);
  // Was 3 (a full extra 100vh reserved at the end with nothing animating in it — pure dead scroll).
  // 2.2 keeps only a short settle cushion after the Organized card fully arrives, so the two real
  // transitions (Chaos→Hub, Hub→Organized) each need substantially less physical scroll distance.
  const count = 2.2;

  useEffect(() => {
    if (reduce) return;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;
    const ctx = grainCanvasRef.current?.getContext('2d') ?? null;
    let settleTimer: number | null = null;
    let snapRafId: number | null = null;

    // The site sets `scroll-behavior: smooth` globally (for anchor-link nav), which makes the native
    // `window.scrollBy({behavior:'smooth'})` unreliable here since this same scroll listener mutates
    // styles every frame and Chromium cuts a smooth-scroll animation short when it detects that kind
    // of per-frame churn during it. Driving the snap with our own rAF + `scrollTo` sidesteps that.
    const cancelSnap = () => {
      if (snapRafId != null) {
        cancelAnimationFrame(snapRafId);
        snapRafId = null;
      }
    };

    const animateScrollBy = (delta: number) => {
      cancelSnap();
      const startY = window.scrollY;
      const targetY = startY + delta;
      const startTime = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - startTime) / REEL_SNAP_DURATION, 1);
        const eased = reelEaseOutCubic(t);
        window.scrollTo({ top: startY + (targetY - startY) * eased, left: 0, behavior: 'auto' });
        snapRafId = t < 1 ? requestAnimationFrame(step) : null;
      };
      snapRafId = requestAnimationFrame(step);
    };

    const scheduleSettle = (total: number, scrolled: number) => {
      if (settleTimer != null) window.clearTimeout(settleTimer);
      // Only snap while genuinely inside the pinned range — leave the natural page boundaries
      // (scrolling into/out of the section) alone.
      if (total <= 0 || scrolled <= 0 || scrolled >= total) return;

      settleTimer = window.setTimeout(() => {
        const progress = (scrolled / total) * count;
        // Snap targets are the three resting states — Chaos (0), Hub held (1), Organized settled
        // (2) — never the trailing settle cushion, so releasing scroll anywhere past the Organized
        // card's arrival always lands cleanly on it rather than on the dead buffer past it.
        const targetIndex = Math.max(0, Math.min(2, Math.round(progress)));
        const targetScrolled = (targetIndex / count) * total;
        const delta = targetScrolled - scrolled;
        if (Math.abs(delta) > 1) {
          animateScrollBy(delta);
        }
      }, REEL_SETTLE_DELAY);
    };

    const resizeCanvas = () => {
      const canvas = grainCanvasRef.current;
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = stage.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawGrain = (time: number) => {
      if (!ctx) return;
      const { width, height } = stage.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      const local1 = local1Ref.current;
      const alpha = grainAlphaEnvelope(local1);
      if (alpha <= 0) return;
      if (!particlesRef.current) particlesRef.current = makeGrainParticles(130);
      for (const p of particlesRef.current) {
        const t = Math.min(Math.max((local1 - p.phase * 0.3) / (1 - p.phase * 0.3), 0), 1);
        const te = easeInOutCubic(t);
        const wobble = Math.sin(time * 0.0016 + p.wobbleSeed) * 2 * (1 - te);
        const x = (p.hx + (p.tx - p.hx) * te) * width + wobble;
        const y = (p.hy + (p.ty - p.hy) * te) * height + wobble * 0.6;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color},${alpha * 0.85})`;
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // A small dedicated rAF loop, started/stopped as needed — keeps the grain's idle wobble alive
    // even while the user isn't actively scrolling, without burning cycles outside its visible window.
    const grainTick = (time: number) => {
      drawGrain(time);
      const local1 = local1Ref.current;
      if (local1 > 0 && local1 < 0.92) {
        grainRafRef.current = requestAnimationFrame(grainTick);
      } else {
        grainRunningRef.current = false;
        grainRafRef.current = null;
      }
    };

    const update = () => {
      rafRef.current = null;
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 0));
      const progress = total > 0 ? (scrolled / total) * count : 0;

      const local1 = Math.min(Math.max(progress, 0), 1);
      const local2 = Math.min(Math.max(progress - 1, 0), 1);
      local1Ref.current = local1;

      // Card 0 (Chaos) dissolves — opacity/blur/scale — as the Hub rises over it. Left unset (not
      // "blur(0px)"/"scale(1)") at rest so no filter/transform compositing layer is forced on the
      // image before the user ever scrolls — a real, not just headless-screenshot, paint cost.
      if (chaosContentRef.current) {
        const d = Math.min(local1 / 0.45, 1);
        const eased = 1 - Math.pow(1 - d, 2);
        chaosContentRef.current.style.opacity = String(1 - eased);
        chaosContentRef.current.style.transform = eased > 0 ? `scale(${1 - eased * 0.06})` : '';
        chaosContentRef.current.style.filter = eased > 0.001 ? `blur(${eased * 6}px)` : '';
      }

      // Card 1 (Hub) physically rises over Card 0; its logo fades/settles on its own curve, holding
      // fully formed from local1≈0.7→1 — the "brief hold" costs no extra scroll track.
      if (hubCardRef.current) {
        hubCardRef.current.style.transform = `translateY(${(1 - local1) * 100}%)`;
      }
      if (hubLogoRef.current) {
        const d = Math.min(Math.max((local1 - 0.35) / 0.35, 0), 1);
        const eased = d * d * (3 - 2 * d);
        hubLogoRef.current.style.opacity = String(eased);
        hubLogoRef.current.style.transform = `scale(${0.85 + eased * 0.15})`;
      }
      // Subtitle follows just behind the logo (starts settling a beat later) and fades back out the
      // moment the Organized card begins rising over this stage — never competes with the logo.
      if (hubSubtitleRef.current) {
        const dIn = Math.min(Math.max((local1 - 0.5) / 0.35, 0), 1);
        const easedIn = dIn * dIn * (3 - 2 * dIn);
        hubSubtitleRef.current.style.opacity = String(easedIn * (1 - local2));
      }

      if (local1 > 0 && local1 < 0.92 && !grainRunningRef.current) {
        grainRunningRef.current = true;
        grainRafRef.current = requestAnimationFrame(grainTick);
      }

      // Card 2 (Organized) rises over the Hub — identical mechanic to the old 2-card version.
      if (organizedCardRef.current) {
        organizedCardRef.current.style.transform = `translateY(${(1 - local2) * 100}%)`;
      }
      if (local2 >= 0.98 && !organizedRevealedRef.current) {
        organizedRevealedRef.current = true;
        setOrganizedRevealed(true);
      }

      return { total, scrolled };
    };

    const onScroll = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(() => {
          const result = update();
          if (result) scheduleSettle(result.total, result.scrolled);
        });
      }
    };
    const onResize = () => {
      resizeCanvas();
      onScroll();
    };

    resizeCanvas();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      if (grainRafRef.current != null) cancelAnimationFrame(grainRafRef.current);
      if (settleTimer != null) window.clearTimeout(settleTimer);
      cancelSnap();
      grainRunningRef.current = false;
    };
  }, [reduce]);

  if (reduce) {
    return (
      <div className="md:hidden space-y-6">
        <div className="h-[70vh]">
          <PhilosophyChaosCard />
        </div>
        <div className="h-[40vh] flex flex-col items-center justify-center gap-3 bg-bronze-50">
          <PhilosophyKaiBadge size={140} />
          <p className="text-stone-400 text-[11px] tracking-wide">one source, one truth</p>
        </div>
        <div className="h-[70vh]">
          <PhilosophyOrganizedCard revealed />
        </div>
      </div>
    );
  }

  return (
    <div ref={trackRef} data-testid="philosophy-reel-track" className="md:hidden relative" style={{ height: `${count * 100}vh` }}>
      <div
        ref={stageRef}
        data-testid="philosophy-reel-stage"
        className="sticky overflow-hidden -mx-3"
        style={{ top: PHILOSOPHY_REEL_STAGE_TOP, height: `calc(100vh - ${PHILOSOPHY_REEL_STAGE_TOP + PHILOSOPHY_REEL_STAGE_BOTTOM_GAP}px)` }}
      >
        <div data-testid="philosophy-reel-card" data-index={0} className="absolute inset-0" style={{ zIndex: 0 }}>
          <PhilosophyChaosCard contentRef={chaosContentRef} />
        </div>

        <div
          ref={hubCardRef}
          data-testid="philosophy-reel-card"
          data-index={1}
          className="absolute inset-0"
          style={{ zIndex: 1, transform: 'translateY(100%)', willChange: 'transform' }}
        >
          <PhilosophyHubCard logoRef={hubLogoRef} subtitleRef={hubSubtitleRef} />
        </div>

        <canvas ref={grainCanvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }} aria-hidden="true" />

        <div
          ref={organizedCardRef}
          data-testid="philosophy-reel-card"
          data-index={2}
          className="absolute inset-0"
          style={{ zIndex: 3, transform: 'translateY(100%)', willChange: 'transform' }}
        >
          <PhilosophyOrganizedCard revealed={organizedRevealed} />
        </div>
      </div>
    </div>
  );
};

export const Philosophy: React.FC = () => {
  const reduceMotion = !!useReducedMotion();
  const { popIn, drawIn, headIn, riseIn } = useVariants(reduceMotion);

  return (
    <section id="philosophy" className="bg-bronze-50 border-b border-stone-100 py-14 sm:py-16 md:py-20 px-5 sm:px-6 md:px-12 lg:px-24 relative">
      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 lg:gap-12 items-start">
          {/* Text (desktop only — mobile gets its own compact heading inside the pinned Chaos card) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden md:block space-y-4 sm:space-y-5 lg:pt-2"
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
            className="grid grid-cols-1 md:grid-cols-[0.85fr_1.35fr] gap-10 md:gap-12 relative overflow-visible"
          >
            {/* Chaos canvas (desktop, frozen): 11 notes + hub + connecting arrows, one shared coordinate system */}
            <div className="relative w-full overflow-visible hidden md:block" style={{ aspectRatio: '1000 / 1320' }} aria-hidden="true">
              <svg viewBox="0 0 1000 1320" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none text-bronze-400" aria-hidden="true">
                {ARROWS.map((a, i) => (
                  <Connector key={i} d={a.d} tip={a.tip} lineVariants={drawIn(1.4 + i * 0.09)} headVariants={headIn(1.4 + i * 0.09 + 0.32)} />
                ))}
                <g className="hidden md:block">
                  <Connector d={EXIT_ARROW.d} tip={EXIT_ARROW.tip} lineVariants={drawIn(2.38)} headVariants={headIn(2.68)} />
                </g>
              </svg>

              <NoteBox pos={notePos.spreadsheets} variants={popIn(0.32)} className="z-10">
                <img src="/images/philosophy-chaos-note-spreadsheets-v3.webp" alt="" aria-hidden="true" className={`w-full h-full object-contain ${shadow}`} loading="lazy" decoding="async" />
              </NoteBox>

              <NoteBox pos={notePos.manualHandoffs} variants={popIn(0.395)} className="z-10">
                <div className={`w-full h-full rounded-lg bg-amber-100 p-2 flex flex-col justify-between ${shadow}`}>
                  <span className="text-[10px] font-medium text-stone-700 leading-tight">Manual Handoffs</span>
                  <ArrowRight size={12} className="text-stone-500" />
                </div>
              </NoteBox>

              <NoteBox pos={notePos.crm} variants={popIn(0.47)} className="z-10">
                <img src="/images/philosophy-chaos-note-crm-v3.webp" alt="" aria-hidden="true" className={`w-full h-full object-contain ${shadow}`} loading="lazy" decoding="async" />
              </NoteBox>

              <NoteBox pos={notePos.slack} variants={popIn(0.545)} className="z-10">
                <img src="/images/philosophy-chaos-note-slack-v3.webp" alt="" aria-hidden="true" className={`w-full h-full object-contain ${shadow}`} loading="lazy" decoding="async" />
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
                <img src="/images/philosophy-chaos-note-analytics-v3.webp" alt="" aria-hidden="true" className={`w-full h-full object-contain ${shadow}`} loading="lazy" decoding="async" />
              </NoteBox>

              <NoteBox pos={notePos.latestVersion} variants={popIn(1.07)} className="z-10">
                <div className={`w-full h-full rounded-lg bg-emerald-50 p-2 flex items-center ${shadow}`}>
                  <span className="text-[10px] italic text-stone-700 leading-tight">Where is the latest version?</span>
                </div>
              </NoteBox>

              <NoteBox pos={notePos.hub} variants={popIn(0)} className="z-20">
                <img src="/images/philosophy-hub-badge-v4.webp" alt="KAI OS" className="w-full h-full object-contain" loading="lazy" decoding="async" />
              </NoteBox>
            </div>

            {/* Chaos → Grain → KAI OS → Organized (mobile only): scroll-driven reel — see PhilosophyReelStack above */}
            <PhilosophyReelStack />

            {/* System panel (desktop, frozen) */}
            <div className="hidden md:block">
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
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-2">
                  {stats.map((s) => (
                    <img key={s.label} src={s.icon} alt={s.label} className="w-full h-auto md:scale-110 md:origin-center" loading="lazy" decoding="async" />
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
