import { NextResponse } from "next/server";

/*
 * Download resolver, ported from apps/auth-api/src/server/latest-download.ts:
 * find the newest GitHub release asset for the platform and 302 to it. Falls
 * back to the releases page when the API is unreachable or yields nothing.
 */

const REPO = "nightly-labs/openbot";

const PLATFORMS = {
  macos: { asset: /\.dmg$/i, label: "macOS" },
  windows: { asset: /x64\.exe$/i, label: "Windows" },
  linux: { asset: /x86_64\.AppImage$/i, label: "Linux" },
} as const;

type Platform = keyof typeof PLATFORMS;

export async function GET(_request: Request, context: { params: Promise<{ platform: string }> }) {
  const { platform } = await context.params;
  if (!(platform in PLATFORMS)) {
    return NextResponse.redirect(`https://github.com/${REPO}/releases`, 302);
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "atlasbot-site" },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (response.ok) {
      const release = (await response.json()) as {
        assets?: { name: string; browser_download_url: string }[];
      };
      const asset = release.assets?.find((entry) => PLATFORMS[platform as Platform].asset.test(entry.name));
      if (asset) return NextResponse.redirect(asset.browser_download_url, 302);
    }
  } catch {
    // Fall through to the releases page.
  }

  return NextResponse.redirect(`https://github.com/${REPO}/releases/latest`, 302);
}
