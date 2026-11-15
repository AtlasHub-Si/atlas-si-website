import { NextResponse } from "next/server";

/**
 * AtlasBot-owned download resolver.
 *
 * Never resolve AtlasBot downloads from the original OpenBot release repository.
 * Until there is an explicitly published AtlasBot release, return unavailable
 * instead of presenting upstream binaries as if they were branded Atlas builds.
 */
const REPO = "AtlasHub-Si/Atlas-Bot-Desktop";

const PLATFORMS = {
  macos: { asset: /\.dmg$/i },
  windows: { asset: /x64\.exe$/i },
  linux: { asset: /x86_64\.AppImage$/i },
} as const;

type Platform = keyof typeof PLATFORMS;

const unavailable = (platform: string) =>
  NextResponse.json(
    {
      error: "atlasbot_release_unavailable",
      message: "O instalador AtlasBot ainda não está publicado. Consulte a página oficial para novidades.",
      platform,
    },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );

export async function GET(_request: Request, context: { params: Promise<{ platform: string }> }) {
  const { platform } = await context.params;

  if (!Object.prototype.hasOwnProperty.call(PLATFORMS, platform)) {
    return NextResponse.json({ error: "unsupported_platform" }, { status: 404 });
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "atlasbot-site" },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (response.ok) {
      const release = (await response.json()) as {
        draft?: boolean;
        prerelease?: boolean;
        assets?: { name: string; browser_download_url: string }[];
      };
      if (!release.draft && !release.prerelease) {
        const asset = release.assets?.find((entry) => PLATFORMS[platform as Platform].asset.test(entry.name));
        if (asset) {
          const url = new URL(asset.browser_download_url);
          if (
            url.protocol === "https:" &&
            url.hostname === "github.com" &&
            url.pathname.startsWith(`/${REPO}/releases/download/`)
          ) {
            return NextResponse.redirect(url, 302);
          }
        }
      }
    }
  } catch {
    // Release may be unavailable. Never fall back to an upstream repository.
  }

  return unavailable(platform);
}
