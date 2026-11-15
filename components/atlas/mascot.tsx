export const characters = ["guide", "creator", "builder", "analyst", "flow", "shield"] as const;
export type Character = typeof characters[number];
type Props = { character: Character; className?: string; decorative?: boolean; priority?: boolean; state?: "static" | "idle" | "thinking" | "working" | "success"; sizes?: string; motionEnabled?: false };
/** All states intentionally resolve to the verified static render until motion is homologated. */
export function AtlasMascot({ character, className = "", decorative = false, priority = false, state = "static", sizes, motionEnabled = false }: Props) {
  return <img className={"a-mascot " + className} src={"/media/atlas-si/v2/mascots/" + character + "-320.webp"}
    srcSet={[320, 640, 960].map(w => "/media/atlas-si/v2/mascots/" + character + "-" + w + ".webp " + w + "w").join(", ")}
    sizes={sizes ?? (priority ? "(max-width: 700px) 70vw, 32vw" : "(max-width: 700px) 28vw, 13vw")}
    width={character === "creator" ? 1326 : 1254} height={character === "creator" ? 1187 : 1254}
    alt={decorative ? "" : character[0].toUpperCase() + character.slice(1)} aria-hidden={decorative || undefined}
    loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding={character === "guide" ? "sync" : "async"}
    data-motion-enabled={motionEnabled} data-state={state} />;
}
