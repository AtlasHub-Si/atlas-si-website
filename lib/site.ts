"use client";

/*
 * Shared site constants, ported from apps/auth-api/src/lib/landing-links.ts,
 * download-platforms.ts and site-metadata.ts.
 */

import type { PlatformLogoVariant } from "@/components/brand";

export type { PlatformLogoVariant };

export const EXTERNAL_LINK_REL = "noopener noreferrer";

export const OPENBOT_SITE_TITLE = "OpenBot: AI teammates for real work";
export const OPENBOT_SITE_DESCRIPTION =
  "Run Codex and Claude side by side as persistent AI teammates, each with its own workspace, queue, and context.";

export const OPENBOT_LINKS = {
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

export const OPENBOT_DOWNLOAD_LINKS = {
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
  status: "Available" | "Coming soon";
}

export const DOWNLOAD_PLATFORMS: Record<PlatformLogoVariant, DownloadPlatformDetails> = {
  macos: {
    id: "macos",
    label: "macOS",
    status: "Available",
    description: "macOS 13+ · Apple silicon",
    action: "Download for macOS",
    available: true,
    href: OPENBOT_DOWNLOAD_LINKS.macos,
  },
  windows: {
    id: "windows",
    label: "Windows",
    status: "Available",
    description: "Windows 10+ · x64",
    action: "Download for Windows",
    available: true,
    href: OPENBOT_DOWNLOAD_LINKS.windows,
  },
  linux: {
    id: "linux",
    label: "Linux",
    status: "Available",
    description: "x64 · AppImage",
    action: "Download for Linux",
    available: true,
    href: OPENBOT_DOWNLOAD_LINKS.linux,
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

/* Footer navigation, ported from FOOTER_COLUMNS. */
export type FooterLink =
  | { label: string; external: true; href: string }
  | { label: string; external: false; to: "/" | "/news" | "/guides" | "/plugins"; hash?: string };

export interface FooterColumn {
  title: string;
  links: readonly FooterLink[];
}

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Download", external: false, to: "/", hash: "download" },
      { label: "News", external: false, to: "/news" },
      { label: "Guides", external: false, to: "/guides" },
      { label: "Plugins", external: false, to: "/plugins" },
      { label: "Releases", external: true, href: OPENBOT_LINKS.releases },
      { label: "Source code", external: true, href: OPENBOT_LINKS.repository },
      { label: "License", external: true, href: OPENBOT_LINKS.license },
      { label: "Privacy", external: true, href: OPENBOT_LINKS.privacy },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", external: true, href: OPENBOT_LINKS.documentation },
      { label: "Troubleshooting", external: true, href: OPENBOT_LINKS.troubleshooting },
      { label: "Architecture", external: true, href: OPENBOT_LINKS.architecture },
      { label: "Contributing", external: true, href: OPENBOT_LINKS.contributing },
      { label: "Codex", external: true, href: OPENBOT_LINKS.codex },
      { label: "Claude Code", external: true, href: OPENBOT_LINKS.claude },
    ],
  },
];
