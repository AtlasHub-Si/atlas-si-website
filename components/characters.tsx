/*
 * The AtlasBot character family, drawn after the "Atlas: Dual-Ecosystem AI
 * Vision" brand board: six chubby rounded-triangle companions — Guide,
 * Creator, Builder, Analyst, Flow and Shield — each in its ecosystem colour
 * with a role badge on the belly. Guide and Creator wear headphones, like the
 * mascots on the board. Static by design; motion stays with the page (hover
 * tilt comes from CSS, reduced-motion honours the global switch).
 */

import type { CSSProperties, ReactNode } from "react";

export type AtlasCharacterRole = "guide" | "creator" | "builder" | "analyst" | "flow" | "shield";

type BadgeKind = "guide" | "creator" | "builder" | "analyst" | "flow" | "shield";

interface CharacterSpec {
  from: string;
  to: string;
  iconColor: string;
  headphones: boolean;
  badge: BadgeKind;
}

const CHARACTERS: Record<AtlasCharacterRole, CharacterSpec> = {
  guide: { from: "#4a9dff", to: "#1f5fe0", iconColor: "#ffffff", headphones: true, badge: "guide" },
  creator: { from: "#a97dff", to: "#7233e0", iconColor: "#ffffff", headphones: true, badge: "creator" },
  builder: { from: "#ffc043", to: "#f5820b", iconColor: "#ffffff", headphones: false, badge: "builder" },
  analyst: { from: "#43e08c", to: "#149a52", iconColor: "#ffffff", headphones: false, badge: "analyst" },
  flow: { from: "#ff77b0", to: "#e6337f", iconColor: "#ffffff", headphones: false, badge: "flow" },
  shield: { from: "#f2f6ff", to: "#b9c6dc", iconColor: "#233150", headphones: false, badge: "shield" },
};

/* Role badges, each drawn inside a 24×24 box centred on (60, 84). */
const BADGES: Record<BadgeKind, ReactNode> = {
  guide: (
    <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M55 92 L60 76 L65 92" />
      <path d="M57 86.5 L63 86.5" />
    </g>
  ),
  creator: <path d="M56.5 77.5 L67 84.5 L56.5 91.5 Z" fill="currentColor" />,
  builder: (
    <path
      d="M62.5 75.5 L53.5 86 L59 86 L56.5 92.5 L66.5 81.5 L60.5 81.5 Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  ),
  analyst: (
    <g fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round">
      <path d="M53 92 L53 85" />
      <path d="M60 92 L60 78" />
      <path d="M67 92 L67 88" />
    </g>
  ),
  flow: (
    <path
      d="M60 92.5 C57 89.8 51.8 86 51.8 82 C51.8 79.4 53.8 77.6 56.3 77.6 C57.8 77.6 59.3 78.5 60 79.8 C60.7 78.5 62.2 77.6 63.7 77.6 C66.2 77.6 68.2 79.4 68.2 82 C68.2 86 63 89.8 60 92.5 Z"
      fill="currentColor"
    />
  ),
  shield: (
    <path
      d="M60 75.5 L68.5 78.6 L68.5 84.6 C68.5 89.8 64.9 93.3 60 95 C55.1 93.3 51.5 89.8 51.5 84.6 L51.5 78.6 Z"
      fill="currentColor"
    />
  ),
};

export function AtlasCharacter({
  role,
  className,
}: {
  role: AtlasCharacterRole;
  className?: string;
}) {
  const spec = CHARACTERS[role];
  const gradientId = `atlas-character-${role}`;
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      role="img"
      aria-label={`${role[0].toUpperCase()}${role.slice(1)}, AtlasBot character`}
      style={{ "--character-icon": spec.iconColor } as CSSProperties}
    >
      <defs>
        <linearGradient id={gradientId} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor={spec.from} />
          <stop offset="1" stopColor={spec.to} />
        </linearGradient>
      </defs>

      {/* Chubby rounded-triangle body. */}
      <path
        d="M60 16 C63.4 16 66.5 17.9 68.2 20.9 L100.7 80.4 C104 86.5 103.8 93.9 100.2 99.9 C96.5 105.9 90.2 109.5 83.3 109.5 L36.7 109.5 C29.8 109.5 23.5 105.9 19.8 99.9 C16.2 93.9 16 86.5 19.3 80.4 L51.8 20.9 C53.5 17.9 56.6 16 60 16 Z"
        fill={`url(#${gradientId})`}
      />

      {/* Headphones sit in front, as ear pads hugging the triangle's sides. */}
      {spec.headphones && (
        <g className="atlas-character-headphones">
          <path
            d="M27 56 C30 34.5 44 24.5 60 24.5 C76 24.5 90 34.5 93 56"
            fill="none"
            stroke="#1b2a4a"
            strokeWidth="6.5"
            strokeLinecap="round"
            opacity="0.92"
          />
          <rect x="20" y="50" width="12" height="19" rx="6" fill="#1b2a4a" />
          <rect x="88" y="50" width="12" height="19" rx="6" fill="#1b2a4a" />
        </g>
      )}

      {/* Happy closed eyes, the mascot face from the board. */}
      <g fill="none" stroke="#ffffff" strokeWidth="5.2" strokeLinecap="round">
        <path d="M39 57 Q46.5 65.5 54 57" />
        <path d="M66 57 Q73.5 65.5 81 57" />
      </g>

      {/* Role badge on the belly. */}
      <circle cx="60" cy="84" r="16.5" fill="rgba(255,255,255,0.22)" />
      <g fill={spec.iconColor} color={spec.iconColor}>
        {BADGES[spec.badge]}
      </g>
    </svg>
  );
}

export const ATLAS_FAMILY: readonly { id: AtlasCharacterRole; name: string }[] = [
  { id: "guide", name: "Guide" },
  { id: "creator", name: "Creator" },
  { id: "builder", name: "Builder" },
  { id: "analyst", name: "Analyst" },
  { id: "flow", name: "Flow" },
  { id: "shield", name: "Shield" },
] as const;
