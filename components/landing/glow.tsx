"use client";

/*
 * The closing aurora, ported from LandingGlow.tsx: nine blurred bars under a
 * shared gradient whose scaleY follows scroll progress, with the same easing,
 * peaks and idle-return behaviour as the original.
 */

import { useCallback, useEffect, useRef, useState } from "react";

const VIEWBOX_WIDTH = 1271;
const VIEWBOX_HEIGHT = 599;
const BAR_COUNT = 9;
const BLUR = 15;
const PEAK = 0.98;
const VALLEY = 0.55;
const RISE_MS = 1100;
const RETURN_DELAY_MS = 450;

const GLOW_STOPS: readonly { offset: number; color: string; opacity?: number }[] = [
  { offset: 0, color: "var(--openbot-logo-production)" },
  { offset: 0.22, color: "var(--openbot-logo-production)" },
  { offset: 0.42, color: "var(--openbot-logo-dev)" },
  { offset: 0.62, color: "var(--openbot-logo-preview)" },
  { offset: 0.82, color: "var(--openbot-logo-production)" },
  { offset: 1, color: "var(--openbot-logo-production)", opacity: 0 },
];

function glowHeights(): number[] {
  const midpoint = (BAR_COUNT - 1) / 2;
  return Array.from({ length: BAR_COUNT }, (_, index) => {
    const distance = midpoint === 0 ? 0 : Math.abs(index - midpoint) / midpoint;
    const eased = 1 - distance ** 1.24;
    return PEAK * VIEWBOX_HEIGHT * (VALLEY + (1 - VALLEY) * eased);
  });
}

function glowProgress(top: number, height: number, viewportHeight: number): number {
  return Math.max(0, Math.min(1, (viewportHeight - top) / (height || viewportHeight || 1)));
}

export function LandingGlow() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [rise, setRise] = useState(0);
  const [gradientId] = useState(() => `glow-gradient-${Math.random().toString(36).slice(2, 9)}`);
  const [blurId] = useState(() => `glow-blur-${Math.random().toString(36).slice(2, 9)}`);

  const measure = useCallback(() => {
    const element = rootRef.current;
    if (!element || !element.isConnected) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setRise(1);
      return;
    }
    const bounds = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    setRise(glowProgress(bounds.top, bounds.height, viewportHeight));
  }, []);

  useEffect(() => {
    let frameId: number | undefined;
    let ticking = false;

    const scheduleMeasure = () => {
      if (ticking) return;
      ticking = true;
      frameId = window.requestAnimationFrame(() => {
        ticking = false;
        measure();
      });
    };

    measure();
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);
    return () => {
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, [measure]);

  const heights = glowHeights();
  const columnWidth = VIEWBOX_WIDTH / BAR_COUNT;

  return (
    <div ref={rootRef} className="landing-glow" aria-hidden="true" data-slot="landing-glow">
      <div
        className="landing-glow-rise"
        style={{
          transform: `scaleY(${rise})`,
          willChange: rise > 0 && rise < 1 ? "transform" : "auto",
          "--landing-glow-rise-ms": `${RISE_MS}ms`,
        } as React.CSSProperties}
      >
        <svg
          className="landing-glow-svg"
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="1" x2="0" y2="0">
              {GLOW_STOPS.map((stop) => (
                <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} stopOpacity={stop.opacity ?? 1} />
              ))}
            </linearGradient>
            <filter id={blurId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={BLUR} />
            </filter>
          </defs>
          {heights.map((height, index) => (
            <g key={index} filter={`url(#${blurId})`}>
              <rect
                x={index * columnWidth}
                y={VIEWBOX_HEIGHT - height}
                width={columnWidth * 1.23}
                height={height}
                fill={`url(#${gradientId})`}
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
