/*
 * Shared site constants, ported from apps/auth-api/src/lib/landing-links.ts,
 * download-platforms.ts and site-metadata.ts. Only structure lives here —
 * visitor-facing copy lives in lib/i18n/dictionaries.ts.
 */

import type { PlatformLogoVariant } from "@/components/brand";

export type { PlatformLogoVariant };

export const EXTERNAL_LINK_REL = "noopener noreferrer";

export const ATLASBOT_LINKS = {
  contact: "https://x.com/OpenBot_",
  download: "#download",
  downloadFromOtherPage: "/#download",
  news: "/news",
  guides: "/guides",
  plugins: "/plugins",
  releases: "https://github.com/nightly-labs/openbot/releases",
  repository: "https://github.com/nightly-labs/openbot",
  license: "https://github.com/nightly-labs/openbot/blob/main/LICENSE",
  privacy: "https://github.com/nightly-labs/openbot/blob/main/PRIVACY.md",
  documentation: "https://github.com/nightly-labs/openbot#readme",
  troubleshooting: "https://github.com/nightly-labs/openbot/blob/main/docs/TROUBLESHOOTING.md",
  architecture: "https://github.com/nightly-labs/openbot#architecture",
  contributing: "https://github.com/nightly-labs/openbot/blob/main/CONTRIBUTING.md",
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
    status: "available",
    description: "macOS 13+ · Apple silicon",
    action: "Download for macOS",
    available: true,
    href: ATLASBOT_DOWNLOAD_LINKS.macos,
  },
  windows: {
    id: "windows",
    label: "Windows",
    status: "available",
    description: "Windows 10+ · x64",
    action: "Download for Windows",
    available: true,
    href: ATLASBOT_DOWNLOAD_LINKS.windows,
  },
  linux: {
    id: "linux",
    label: "Linux",
    status: "available",
    description: "x64 · AppImage",
    action: "Download for Linux",
    available: true,
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

  if (/windows|win32|win64/.test(platform)) return "windows";
  if (/mac|iphone|ipad|ipod|darwin/.test(platform)) return "macos";
  if (/linux|cros|x11|ubuntu|debian|fedora/.test(platform)) return "linux";
  return undefined;
}
