"use client";

/*
 * The app preview, ported from LandingAppPreview.tsx: a skeleton with a cold
 * pulse, a late-loaded iframe, the postMessage handshake with /app-preview
 * (ready → reveal → start) and the blur cross-fade between the two.
 */

import { useEffect, useRef, useState } from "react";

const LANDING_PREVIEW_READY_MESSAGE = "openbot:landing-preview-ready";
const LANDING_PREVIEW_START_MESSAGE = "openbot:landing-preview-start";
const LANDING_PREVIEW_URL = "/app-preview";
const LANDING_PREVIEW_LOAD_DELAY_MS = 300;

export function LandingAppPreview() {
  const rootRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [src, setSrc] = useState("");
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let loadTimer: number | undefined;
    let startTimer: number | undefined;
    let firstPaintFrame: number | undefined;
    let stablePaintFrame: number | undefined;

    const start = () => {
      const previewWindow = iframeRef.current?.contentWindow;
      if (!previewWindow) return;
      setStarted(true);
      previewWindow.postMessage({ type: LANDING_PREVIEW_START_MESSAGE }, window.location.origin);
    };

    const reveal = () => {
      setReady(true);
      const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
      const styles = getComputedStyle(document.documentElement);
      const raw = styles.getPropertyValue("--reveal-dur").trim();
      const parsed = Number.parseFloat(raw);
      const delay = reducedMotion
        ? 0
        : Number.isFinite(parsed)
          ? raw.endsWith("s") && !raw.endsWith("ms")
            ? parsed * 1000
            : parsed
          : 240;
      if (delay === 0) start();
      else startTimer = window.setTimeout(start, delay);
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== iframeRef.current?.contentWindow) return;
      if ((event.data as { type?: string } | null)?.type !== LANDING_PREVIEW_READY_MESSAGE) return;
      reveal();
    };

    window.addEventListener("message", handleMessage);
    firstPaintFrame = window.requestAnimationFrame(() => {
      stablePaintFrame = window.requestAnimationFrame(() => {
        loadTimer = window.setTimeout(() => setSrc(LANDING_PREVIEW_URL), LANDING_PREVIEW_LOAD_DELAY_MS);
      });
    });

    return () => {
      if (firstPaintFrame !== undefined) window.cancelAnimationFrame(firstPaintFrame);
      if (stablePaintFrame !== undefined) window.cancelAnimationFrame(stablePaintFrame);
      if (loadTimer) window.clearTimeout(loadTimer);
      if (startTimer) window.clearTimeout(startTimer);
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className={["landing-preview", "landing-app-preview", "t-skel", ready ? "is-revealed" : ""]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby="app-preview-title"
      data-enter="preview"
      data-preview-state={started ? "shown" : ready ? "ready" : "idle"}
    >
      <h2 id="app-preview-title" className="landing-visually-hidden">
        Interactive OpenBot application preview
      </h2>
      <span className="landing-preview-window-controls" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <div
        className="landing-preview-placeholder t-skel-skeleton is-pulsing"
        role="status"
        aria-label="Loading OpenBot preview"
      />
      <div className="landing-preview-stage t-skel-content">
        <iframe
          ref={iframeRef}
          src={src || undefined}
          title="Interactive OpenBot application preview"
          sandbox="allow-forms allow-same-origin allow-scripts"
        />
      </div>
    </section>
  );
}
