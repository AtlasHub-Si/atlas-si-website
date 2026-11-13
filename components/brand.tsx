"use client";

/*
 * The AtlasBot brand marks, ported from packages/brand/src (Solid → React).
 * AppLogo keeps every behaviour of the original: blink, eye tracking,
 * wink on click and the rapid-click party easter egg.
 */

import { useCallback, useEffect, useRef, useState } from "react";

export type AppLogoAnimation = "none" | "blink";
export type AppLogoVariant = "production" | "dev" | "preview";

export interface AppLogoProps {
  variant?: AppLogoVariant;
  animation?: AppLogoAnimation;
  interactive?: boolean;
  /** The board's "Energia" expression: a light streak travelling an orbit ring. */
  orbit?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function AppLogo({
  variant = "production",
  animation = "none",
  interactive = false,
  orbit = false,
  className,
  ariaLabel,
}: AppLogoProps) {
  const logoRef = useRef<SVGSVGElement>(null);
  const [clickReaction, setClickReaction] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);
  const rapidClicks = useRef<number[]>([]);
  const clickTimer = useRef<number | undefined>(undefined);
  const eggTimer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      window.clearTimeout(clickTimer.current);
      window.clearTimeout(eggTimer.current);
    },
    [],
  );

  const setEyePosition = useCallback((x: number, y: number) => {
    logoRef.current?.style.setProperty("--app-logo-eye-x", `${x * 2.4}%`);
    logoRef.current?.style.setProperty("--app-logo-eye-y", `${y * 1.8}%`);
  }, []);

  const resetEyePosition = useCallback(() => setEyePosition(0, 0), [setEyePosition]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<SVGSVGElement>) => {
      if (!interactive) return;
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
      if (event.pointerType && event.pointerType !== "mouse") return;
      const bounds = logoRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left - bounds.width / 2) / (bounds.width / 2)));
      const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top - bounds.height / 2) / (bounds.height / 2)));
      setEyePosition(x, y);
    },
    [interactive, setEyePosition],
  );

  const triggerClickReaction = useCallback(() => {
    if (!interactive) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    window.clearTimeout(clickTimer.current);
    setClickReaction(false);
    void logoRef.current?.getBoundingClientRect();
    setClickReaction(true);
    clickTimer.current = window.setTimeout(() => setClickReaction(false), 360);
  }, [interactive]);

  const registerRapidClick = useCallback(() => {
    if (!interactive) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const now = performance.now();
    rapidClicks.current = [...rapidClicks.current.filter((time) => now - time < 900), now];
    if (rapidClicks.current.length < 5) return;

    rapidClicks.current = [];
    window.clearTimeout(eggTimer.current);
    setEasterEgg(false);
    void logoRef.current?.getBoundingClientRect();
    setEasterEgg(true);
    eggTimer.current = window.setTimeout(() => setEasterEgg(false), 1200);
  }, [interactive]);

  const handleClick = useCallback(() => {
    triggerClickReaction();
    registerRapidClick();
  }, [triggerClickReaction, registerRapidClick]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<SVGSVGElement>) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      triggerClickReaction();
    },
    [triggerClickReaction],
  );

  return (
    <svg
      ref={logoRef}
      className={["app-logo", className].filter(Boolean).join(" ")}
      data-animation={animation}
      data-click-reaction={clickReaction ? "wink" : undefined}
      data-easter-egg={easterEgg ? "party" : undefined}
      data-interactive={interactive ? "true" : undefined}
      data-variant={variant}
      viewBox="0 0 240 240"
      aria-hidden={interactive ? undefined : "true"}
      aria-label={interactive ? (ariaLabel ?? "Animate the AtlasBot logo") : undefined}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onPointerLeave={resetEyePosition}
      onPointerMove={handlePointerMove}
    >
      <defs>
        {/* The board's brand gradient: blue deepening into cyan on the edges. */}
        <linearGradient id="app-logo-glyph" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4a9dff" />
          <stop offset="0.55" stopColor="#2f7bff" />
          <stop offset="1" stopColor="#41c9ff" />
        </linearGradient>
      </defs>
      <rect className="app-logo-background" width="240" height="240" rx="50" ry="50" />
      {orbit && (
        <g className="app-logo-orbit" aria-hidden="true">
          <ellipse className="app-logo-orbit-ring" cx="120" cy="116" rx="100" ry="30" />
          <ellipse className="app-logo-orbit-streak" cx="120" cy="116" rx="100" ry="30" />
        </g>
      )}
      {/* The Core mark: the rounded triangle "A" with its bottom notch. */}
      <path
        className="app-logo-glyph"
        fillRule="evenodd"
        d="M113.8 47.8 A13 13 0 0 1 126.2 47.8 L195.4 183.2 A13 13 0 0 1 184.1 196 L55.9 196 A13 13 0 0 1 44.6 183.2 Z M120 114 L139.2 189.4 A6.5 6.5 0 0 1 132.9 196 L107.1 196 A6.5 6.5 0 0 1 100.8 189.4 Z"
      />
      <g className="app-logo-eye-motion">
        <path
          className="app-logo-eye app-logo-eye-left"
          d="M89 112 Q97 121 105 112"
          fill="none"
        />
      </g>
      <g className="app-logo-eye-motion">
        <path
          className="app-logo-eye app-logo-eye-right"
          d="M135 112 Q143 121 151 112"
          fill="none"
        />
      </g>
    </svg>
  );
}

export type PlatformLogoVariant = "linux" | "macos" | "windows";

const APPLE_PATH =
  "M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.978 4.45z";
const WINDOWS_PATH = "M2 3h9v8H2V3Zm11 0h9v8h-9V3ZM2 13h9v8H2v-8Zm11 0h9v8h-9v-8Z";
const LINUX_PATH =
  "M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 0 0-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 0 0-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139z";

export function PlatformLogo({ platform, className }: { platform: PlatformLogoVariant; className?: string }) {
  const path = platform === "macos" ? APPLE_PATH : platform === "windows" ? WINDOWS_PATH : LINUX_PATH;
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-platform={platform}>
      <path d={path} />
    </svg>
  );
}

export type ProviderLogoVariant = "codex" | "claude" | "grok";

const CODEX_PATH =
  "M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z";

const CLAUDE_PATH =
  "M52.4285 162.873L98.7844 136.879L99.5485 134.602L98.7844 133.334H96.4921L88.7237 132.862L62.2346 132.153L39.3113 131.207L17.0249 130.026L11.4214 128.844L6.2 121.873L6.7094 118.447L11.4214 115.257L18.171 115.847L33.0711 116.911L55.485 118.447L71.6586 119.392L95.728 121.873H99.5485L100.058 120.337L98.7844 119.392L97.7656 118.447L74.5877 102.732L49.4995 86.1905L36.3823 76.62L29.3779 71.7757L25.8121 67.2858L24.2839 57.3608L30.6515 50.2716L39.3113 50.8623L41.4763 51.4531L50.2636 58.1879L68.9842 72.7209L93.4357 90.6804L97.0015 93.6343L98.4374 92.6652L98.6571 91.9801L97.0015 89.2625L83.757 65.2772L69.621 40.8192L63.2534 30.6579L61.5978 24.632C60.9565 22.1032 60.579 20.0111 60.579 17.4246L67.8381 7.49965L71.9133 6.19995L81.7193 7.49965L85.7946 11.0443L91.9074 24.9865L101.714 46.8451L116.996 76.62L121.453 85.4816L123.873 93.6343L124.764 96.1155H126.292V94.6976L127.566 77.9197L129.858 57.3608L132.15 30.8942L132.915 23.4505L136.608 14.4708L143.994 9.62643L149.725 12.344L154.437 19.0788L153.8 23.4505L150.998 41.6463L145.522 70.1215L141.957 89.2625H143.994L146.414 86.7813L156.093 74.0206L172.266 53.698L179.398 45.6635L187.803 36.802L193.152 32.5484H203.34L210.726 43.6549L207.415 55.1159L196.972 68.3492L188.312 79.5739L175.896 96.2095L168.191 109.585L168.882 110.689L170.738 110.53L198.755 104.504L213.91 101.787L231.994 98.7149L240.144 102.496L241.036 106.395L237.852 114.311L218.495 119.037L195.826 123.645L162.07 131.592L161.696 131.893L162.137 132.547L177.36 133.925L183.855 134.279H199.774L229.447 136.524L237.215 141.605L241.8 147.867L241.036 152.711L229.065 158.737L213.019 154.956L175.45 145.977L162.587 142.787H160.805V143.85L171.502 154.366L191.242 172.089L215.82 195.011L217.094 200.682L213.91 205.172L210.599 204.699L188.949 188.394L180.544 181.069L161.696 165.118H160.422V166.772L164.752 173.152L187.803 207.771L188.949 218.405L187.294 221.832L181.308 223.959L174.813 222.777L161.187 203.754L147.305 182.486L136.098 163.345L134.745 164.2L128.075 235.42L125.019 239.082L117.887 241.8L111.902 237.31L108.718 229.984L111.902 215.452L115.722 196.547L118.779 181.541L121.58 162.873L123.291 156.636L123.14 156.219L121.773 156.449L107.699 175.752L86.304 204.699L69.3663 222.777L65.291 224.431L58.2867 220.768L58.9235 214.27L62.8713 208.48L86.304 178.705L100.44 160.155L109.551 149.507L109.462 147.967L108.959 147.924L46.6977 188.512L35.6182 189.93L30.7788 185.44L31.4156 178.115L33.7079 175.752L52.4285 162.873Z";

export function ProviderLogo({ provider, className }: { provider: ProviderLogoVariant; className?: string }) {
  const viewBox = provider === "grok" ? "0 0 24 24" : provider === "claude" ? "0 0 248 248" : "0 0 256 260";
  return (
    <svg className={className} viewBox={viewBox} aria-hidden="true" data-provider={provider}>
      {provider === "grok" ? (
        <>
          <path d="M9.26905 15.284 17.2479 9.36086c.3912-.29039.9502-.17712 1.1366.27392.981 2.37872.5427 5.23732-1.409 7.20012-1.9517 1.9627-4.6673 2.3931-7.1494 1.4128L7.1146 19.5102c3.8891 2.6732 8.6117 2.0121 11.5628-.9577 2.3408-2.354 3.0658-5.5628 2.3879-8.4564l.0061.0062c-.983-4.25087.2417-5.94997 2.7504-9.424387L24 .428711l-3.3013 3.319949v-.0103L9.267 15.2861" />
          <path d="M7.62249 16.7237c-2.79136-2.6815-2.31009-6.8315.07168-9.22465 1.76124-1.77119 4.64683-2.49408 7.16583-1.43137l2.7053-1.2563c-.4874-.35424-1.112-.73525-1.8288-1.00299-3.2399-1.34075-7.1187-.67347-9.75237 1.97302-2.53332 2.54763-3.32998 6.46489-1.96194 9.80749 1.02193 2.4982-.6533 4.2652-2.34082 6.0488C1.08337 22.2699.483318 22.9022 0 23.5716l7.62045-6.8459" />
        </>
      ) : (
        <path d={provider === "claude" ? CLAUDE_PATH : CODEX_PATH} />
      )}
    </svg>
  );
}
