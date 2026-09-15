import { useEffect, useState, type RefObject } from 'react';

/** Tracks an element's rendered height via ResizeObserver — used for layout math that depends on
 * dynamic content (e.g. reserving space below a pinned section intro whose height varies with
 * copy length / line wrapping across breakpoints). */
export function useMeasuredHeight(ref: RefObject<HTMLElement>, fallback = 0): number {
  const [height, setHeight] = useState(fallback);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    setHeight(el.getBoundingClientRect().height);
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setHeight(entry.contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return height;
}
