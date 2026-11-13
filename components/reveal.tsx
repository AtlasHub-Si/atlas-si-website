"use client";

/*
 * Scroll reveal, ported from createLandingReveal.ts: an IntersectionObserver
 * with a bottom rootMargin so a section reveals as it climbs out of the lower
 * 40% of the viewport, honouring prefers-reduced-motion.
 */

import { useEffect, useRef, useState } from "react";

export interface LandingRevealOptions {
  rootMargin?: string;
}

export function useLandingReveal<T extends HTMLElement = HTMLElement>(options: LandingRevealOptions = {}) {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!element || reducedMotion || !("IntersectionObserver" in globalThis)) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setRevealed(true);
        observer.disconnect();
      },
      { threshold: 0, rootMargin: options.rootMargin ?? "0px 0px -40% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, revealed };
}
