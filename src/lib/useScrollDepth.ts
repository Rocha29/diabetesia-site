import { useEffect } from 'react';
import { track } from './analytics';

const THRESHOLDS = [25, 50, 75, 100];

export function useScrollDepth(): void {
  useEffect(() => {
    const reached = new Set<number>();
    function onScroll() {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const viewport = window.innerHeight;
      const full = doc.scrollHeight - viewport;
      if (full <= 0) return;
      const pct = (scrollTop / full) * 100;
      for (const t of THRESHOLDS) {
        if (pct >= t && !reached.has(t)) {
          reached.add(t);
          track('scroll_depth', { percent: t });
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}
