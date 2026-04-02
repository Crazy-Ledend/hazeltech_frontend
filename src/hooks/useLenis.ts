import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

let lenis: Lenis | null = null;

/**
 * Initialises Lenis smooth scroll once for the lifetime of the app.
 * Also scrolls to the top on every route change (respecting smooth scroll).
 */
export function useLenis() {
  const { pathname } = useLocation();

  useEffect(() => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    function raf(time: number) {
      lenis!.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);
}
