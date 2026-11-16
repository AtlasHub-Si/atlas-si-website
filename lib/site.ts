/*
 * Shared site constants, ported from apps/auth-api/src/lib/landing-links.ts,
 * download-platforms.ts and site-metadata.ts. Only structure lives here —
 * visitor-facing copy lives in lib/i18n/dictionaries.ts.
 */

import type { PlatformLogoVariant } from "@/components/brand";

export type { PlatformLogoVariant };

export const EXTERNAL_LINK_REL = "noopener noreferrer";

export const ATLASBOT_LINKS = {
  contact: "mailto:sergiomonteiro@atlashub.si",
  download: "#download",
  downloadFromOtherPage: "/#download",
  news: "/news",
  guides: "/guides",
  plugins: "/plugins",
  releases: "https://github.com/AtlasHub-Si/Atlas-Bot-Desktop/releases",
  repository: "https://github.com/AtlasHub-Si/Atlas-Bot-Desktop",
  license: "https://github.com/AtlasHub-Si/Atlas-Bot-Desktop/blob/main/LICENSE",
  // AtlasBot account privacy is not published; link to the explicit legal scope notice.
  privacy: "https://www.atlas-si.com/pt/terms",
  documentation: "https://github.com/AtlasHub-Si/Atlas-Bot-Desktop#readme",
  troubleshooting: "https://github.com/AtlasHub-Si/Atlas-Bot-Desktop/blob/main/docs/TROUBLESHOOTING.md",
  architecture: "https://github.com/AtlasHub-Si/Atlas-Bot-Desktop#architecture",
  contributing: "https://github.com/AtlasHub-Si/Atlas-Bot-Desktop/blob/main/CONTRIBUTING.md",
  codex: "https://learn.chatgpt.com/docs/app-server",
  claude: "https://code.claude.com/docs/en/overview",
} as const;

export const ATLASBOT_DOWNLOAD_LINKS = {
  macos: "/download/macos",
  windows: "/download/windows",
  linux: "/download/linux",
} as const;

export interface DownloadPlatformDetails {
  action: string;
  available: boolean;
  description: string;
  href: string;
  id: PlatformLogoVariant;
  label: string;
  status: "available" | "coming-soon";
}

export const DOWNLOAD_PLATFORMS: Record<PlatformLogoVariant, DownloadPlatformDetails> = {
  macos: {
    id: "macos",
    label: "macOS",
    status: "coming-soon",
    description: "macOS 13+ · Apple silicon",
    action: "Download for macOS",
    available: false,
    href: ATLASBOT_DOWNLOAD_LINKS.macos,
  },
  windows: {
    id: "windows",
    label: "Windows",
    status: "coming-soon",
    description: "Windows 10+ · x64",
    action: "Download for Windows",
    available: false,
    href: ATLASBOT_DOWNLOAD_LINKS.windows,
  },
  linux: {
    id: "linux",
    label: "Linux",
    status: "coming-soon",
    description: "x64 · AppImage",
    action: "Download for Linux",
    available: false,
    href: ATLASBOT_DOWNLOAD_LINKS.linux,
  },
};

export const DOWNLOAD_PLATFORM_ORDER: readonly PlatformLogoVariant[] = ["macos", "windows", "linux"];

export function detectDownloadPlatform(source: {
  platform?: string;
  userAgent?: string;
  userAgentData?: { platform?: string };
}): PlatformLogoVariant | undefined {
  const platform =
    `${source.userAgentData?.platform ?? ""} ${source.platform ?? ""} ${source.userAgent ?? ""}`.toLowerCase();

  if (/android|iphone|ipad|ipod|cros/.test(platform)) return undefined;
  if (/windows|win32|win64/.test(platform)) return "windows";
  if (/mac|darwin/.test(platform)) return "macos";
  if (/linux|x11|ubuntu|debian|fedora/.test(platform)) return "linux";
  return undefined;
}
