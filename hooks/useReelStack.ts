import { useEffect, type CSSProperties, type MutableRefObject, type RefObject } from 'react';

// Cubic ease-out — used for the "next card rises into focus" entrance.
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// How many cards back a receded card keeps receding before its depth is clamped.
const RECEDE_LEVELS = 3;
// Fraction of the entering card's rise (0-1, in eased-t terms) over which it fades in from
// transparent, rather than appearing at full opacity the instant its top edge crosses into view.
// Past this point it's fully opaque for the rest of its entrance, same as before.
const ENTER_FADE_FRACTION = 0.35;
// How long (ms) the scroll has to sit still before we snap to the nearest card. Long enough to
// not misfire on the natural gaps between discrete wheel ticks or short touch-flick segments,
// short enough that the snap still feels immediate once the user has genuinely stopped.
const SETTLE_DELAY = 220;
// Duration (ms) of the manual snap tween.
const SNAP_DURATION = 240;
// Scroll distance (vh) reserved per transition between cards, and one viewport so the last card
// gets to rest fully on-screen. Kept close to a single normal flick's worth of scroll (rather than
// the 2-4 flicks a much larger value would demand) so the scroll-to-progress ratio doesn't lurch the
// moment the user enters a reel — a mismatch that reads as the page "stopped listening" right as
// they start scrolling through cards, even though nothing about their scrolling actually changed.
const VH_PER_TRANSITION = 135;
const VH_VIEWPORT = 100;
// The sticky stage's own `top` offset means the browser starts actually releasing the pin some
// pixels *before* `scrolled` reaches the literal `total` (the offset eats into the track's
// reserved travel). Auto-settling the last card exactly onto `total` can therefore land the user
// already inside that releasing zone with zero input from them — read as the page auto-scrolling
// itself away right as the card finishes settling. Landing short by more than that top offset (both
// current callers pin in the ~85-120px range for their fixed mobile topbar) keeps the auto-snap
// inside pinned territory with margin to spare, regardless of which caller's offset applies.
const LAST_CARD_SETTLE_MARGIN = 160;

/** Scroll-track height (in vh) for `itemCount` cards. There are only `itemCount - 1` transitions
 * (1→2, 2→3, ...) — the last card is a resting state, not another transition — so the track must
 * NOT reserve a full extra segment for it, or the stack keeps receding/scrolling past the final
 * item with nothing left to show. `tailVh` is the reserved space (in vh) held for the sticky stage's
 * own box past the last transition — default assumes a near-full-viewport stage (the Products reel);
 * callers whose stage is measurably shorter than the viewport can pass the real value so the track
 * doesn't reserve more tail than the stage actually needs. */
export function reelTrackHeightVh(itemCount: number, tailVh: number = VH_VIEWPORT): number {
  return Math.max(itemCount - 1, 1) * VH_PER_TRANSITION + tailVh;
}

// A faint bronze ring only — no dark drop-shadow term. Any near-black shadow reads as a visible
// grey/dark edge against the page's light stone background (most noticeable mid-transition, while a
// card is entering at full shadow intensity), which is exactly the "separate dark panel" look the
// card should NOT have. The ring alone is enough to read as a card, not a box sitting on the page.
const activeShadow = (intensity: number) => `0 0 0 1px rgba(180, 135, 94, ${(0.06 * intensity).toFixed(3)})`;

/** Static style shared by the pre-JS (first paint) card markup and the JS-driven update loop below,
 * so there's no flash between the two. `isActive` is only ever true for card index 0, since the
 * stack always starts resting on the first card. */
export function reelCardInitialStyle(isActive: boolean): CSSProperties {
  return {
    transform: isActive ? 'translateY(0%) scale(1)' : 'translateY(100%) scale(0.92)',
    opacity: isActive ? 1 : 0,
    pointerEvents: isActive ? 'auto' : 'none',
    boxShadow: isActive ? activeShadow(1) : 'none',
    willChange: 'transform, opacity, filter, box-shadow',
  };
}

export interface ReelStageSizing {
  desiredBottomGap: number;
  minBottomGap: number;
  contentFloor: number;
  maxHeight: number;
}

/** Height for the pinned mobile stage. Uses the full desired bottom clearance (e.g. the floating
 * WhatsApp button's safe area) when the viewport can afford it, but shrinks that clearance — never
 * the content — on short/narrow viewports where the full clearance would starve the card below what
 * its content actually needs. `contentFloor` must be the real measured minimum (fixed text blocks +
 * padding + the flexible element's own CSS min-height), not a guess — a floor that's actually smaller
 * than the content's true minimum just forces `overflow-hidden` to silently clip it. */
export function reelStageHeight(viewportHeight: number, stageTop: number, opts: ReelStageSizing): number {
  const { desiredBottomGap, minBottomGap, contentFloor, maxHeight } = opts;
  const gapForFloor = viewportHeight - stageTop - contentFloor;
  const bottomGap = Math.max(minBottomGap, Math.min(desiredBottomGap, gapForFloor));
  return Math.min(Math.max(viewportHeight - stageTop - bottomGap, contentFloor), maxHeight);
}

/** Given d = progress - cardIndex (continuous, signed), writes the transform/opacity/blur/shadow
 * for that card directly to the DOM. The card being scrolled TOWARD rises and scales in, fading
 * from transparent over its earliest rise (`ENTER_FADE_FRACTION`) rather than appearing at full
 * strength the instant its top edge crosses into view — a card popping in fully sharp and legible
 * while still mostly below the fold read as a second, competing card rather than a depth cue. Once
 * past that fade window it's fully opaque, the dominant element on screen, same as before. The card
 * being scrolled AWAY FROM recedes — it shrinks, drifts up a little, and fades toward near-invisible
 * with enough blur that any residual sliver reads as a soft out-of-focus hint, not legible content.
 * `isNearest` (whichever card index is closest to the current continuous progress, decided by the
 * caller) drives interactivity on its own — a tight distance-from-`d` check used to gate clicks here
 * directly, and across a wide stretch of scroll where the outgoing card had already faded past that
 * distance but the incoming card hadn't yet reached it, *neither* card was clickable at all, even
 * though one of them visually read as fully arrived. Exactly one card is ever the nearest, so this
 * closes that gap without changing how anything looks. */
function applyReelCardStyle(el: HTMLDivElement, d: number, isNearest: boolean) {
  let translateY: number;
  let scale: number;
  let opacity: number;
  let blur: number;
  let shadow: number;

  if (d <= -1) {
    translateY = 100;
    scale = 0.92;
    opacity = 0;
    blur = 0;
    shadow = 0;
  } else if (d < 0) {
    const t = easeOutCubic(d + 1);
    const reveal = Math.min(t / ENTER_FADE_FRACTION, 1);
    translateY = 100 * (1 - t);
    scale = 0.92 + 0.08 * t;
    opacity = reveal;
    blur = (1 - reveal) * 2;
    shadow = reveal;
  } else {
    const depth = Math.min(d, RECEDE_LEVELS);
    translateY = -depth * 3;
    scale = 1 - depth * 0.055;
    opacity = Math.max(1 - depth * 0.82, 0.05);
    blur = Math.min(depth * 2.5, 6);
    shadow = Math.max(1 - depth * 1.2, 0);
  }

  el.style.transform = `translateY(${translateY}%) scale(${scale})`;
  el.style.opacity = String(opacity);
  el.style.filter = blur > 0 ? `blur(${blur}px)` : '';
  el.style.boxShadow = shadow > 0.02 ? activeShadow(shadow) : 'none';
  el.style.pointerEvents = isNearest ? 'auto' : 'none';
}

/** Drives a "stacked parallax" reel: pins a scroll track and, on every scroll frame, moves each
 * card by how far the scroll position is from that card's own slot (rAF-throttled, no React
 * re-renders). Once the user stops scrolling inside the pinned range, it eases the page the rest
 * of the way to the nearest card so the stack always settles cleanly on one product/service
 * instead of stopping mid-transition. Progress is scaled over `itemCount - 1` transitions (not
 * `itemCount`) so the sequence ends with the last card at rest, not receding into a transition
 * that doesn't exist. */
export function useReelStack(
  trackRef: RefObject<HTMLDivElement>,
  cardRefs: MutableRefObject<(HTMLDivElement | null)[]>,
  itemCount: number,
  reduce: boolean,
  // The sticky stage's real current height (px), read live so a resize is picked up without
  // resubscribing. Defaults to `window.innerHeight` — the same approximation used before this was
  // added — so callers that don't pass it (the Products reel) keep their exact existing behavior.
  // Passing the real, measured stage height (which can be shorter than the viewport once header/
  // bottom-gap offsets are subtracted) makes `total` below match the actual point where the sticky
  // stage unpins, instead of assuming it fills the full viewport and leaving a stretch of frozen
  // scroll between "last card settled" and "section actually releases".
  pinnedHeightRef?: MutableRefObject<number>,
) {
  useEffect(() => {
    if (reduce || itemCount === 0) return;
    const track = trackRef.current;
    if (!track) return;

    const transitions = Math.max(itemCount - 1, 1);
    let rafId: number | null = null;
    let settleTimer: number | null = null;
    let snapRafId: number | null = null;

    // The site sets `scroll-behavior: smooth` globally (for anchor-link nav), which makes the
    // native `window.scrollBy({behavior:'smooth'})` unreliable here: this same scroll listener
    // mutates card styles on every animation frame, and Chromium cuts a smooth-scroll animation
    // short as soon as it detects that kind of per-frame churn during it — the page barely moves
    // before the animation stops dead. Driving the snap with our own rAF + `scrollTo` sidesteps
    // the browser's smooth-scroll machinery entirely, so it can't get cancelled that way.
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
        const t = Math.min((now - startTime) / SNAP_DURATION, 1);
        const eased = easeOutCubic(t);
        // `behavior: 'auto'` here is deliberate — each call already lands exactly where this
        // frame's easing says to be, so letting the browser layer its OWN smooth animation on
        // top of ours would just fight it (the same conflict this tween exists to avoid).
        window.scrollTo({ top: startY + (targetY - startY) * eased, left: 0, behavior: 'auto' });
        snapRafId = t < 1 ? requestAnimationFrame(step) : null;
      };
      snapRafId = requestAnimationFrame(step);
    };

    const update = () => {
      rafId = null;
      const rect = track.getBoundingClientRect();
      const pinnedHeight = pinnedHeightRef?.current ?? window.innerHeight;
      const total = rect.height - pinnedHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 0));
      const progress = total > 0 ? (scrolled / total) * transitions : 0;
      const nearestIndex = Math.min(Math.max(Math.round(progress), 0), itemCount - 1);

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        applyReelCardStyle(el, progress - i, i === nearestIndex);
      });

      return { total, scrolled };
    };

    const scheduleSettle = (total: number, scrolled: number) => {
      if (settleTimer != null) window.clearTimeout(settleTimer);
      // Only snap while genuinely inside the pinned range — leave the natural
      // page boundaries (before/after the stack) alone.
      if (total <= 0 || scrolled <= 0 || scrolled >= total) return;

      settleTimer = window.setTimeout(() => {
        const progress = (scrolled / total) * transitions;
        const targetIndex = Math.max(0, Math.min(itemCount - 1, Math.round(progress)));
        const rawTargetScrolled = (targetIndex / transitions) * total;
        const targetScrolled = targetIndex === itemCount - 1
          ? Math.max(0, rawTargetScrolled - LAST_CARD_SETTLE_MARGIN)
          : rawTargetScrolled;
        const delta = targetScrolled - scrolled;
        if (Math.abs(delta) > 1) {
          animateScrollBy(delta);
        }
      }, SETTLE_DELAY);
    };

    const onScroll = () => {
      if (rafId != null) return;
      rafId = requestAnimationFrame(() => {
        const result = update();
        if (result) scheduleSettle(result.total, result.scrolled);
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId != null) cancelAnimationFrame(rafId);
      if (settleTimer != null) window.clearTimeout(settleTimer);
      cancelSnap();
    };
  }, [reduce, itemCount, trackRef, cardRefs, pinnedHeightRef]);
}
