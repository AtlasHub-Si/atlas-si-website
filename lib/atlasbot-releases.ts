import { PLATFORMS, unavailableDownloads, type Platform, type DownloadState } from "./download-types";
export { PLATFORMS, type Platform } from "./download-types";
type ApprovedAsset={id:number;name:string;sha256:string;signatureVerified:true;updaterVerified:true};
type Approval={repository:"AtlasHub-Si/Atlas-Bot-Desktop";releaseId:number;tag:string;homologated:true;assets:Partial<Record<Platform,ApprovedAsset>>};
export const ATLASBOT_REPOSITORY="AtlasHub-Si/Atlas-Bot-Desktop";
const extension: Record<Platform, RegExp> = { windows: /\.exe$/i, macos: /\.dmg$/i, linux: /\.AppImage$/i };
export function parseApproval(raw?: string): Approval | null {
  if (!raw || raw.length > 10000) return null;
  try {
    const value = JSON.parse(raw);
    if (value.repository !== ATLASBOT_REPOSITORY || value.homologated !== true ||
        !Number.isSafeInteger(value.releaseId) || value.releaseId <= 0 ||
        typeof value.tag !== "string" || !/^v?\d+\.\d+\.\d+$/.test(value.tag) ||
        !value.assets || typeof value.assets !== "object" || Array.isArray(value.assets)) return null;
    for (const [platform, asset] of Object.entries(value.assets)) {
      const a = asset as ApprovedAsset;
      if (!PLATFORMS.includes(platform as Platform) || !a || !Number.isSafeInteger(a.id) || a.id <= 0 ||
          typeof a.name !== "string" || !/^AtlasBot[-_]/i.test(a.name) || a.name.includes("/") || a.name.includes("\\") ||
          !extension[platform as Platform].test(a.name) || !/^[a-f0-9]{64}$/.test(a.sha256) ||
          a.signatureVerified !== true || a.updaterVerified !== true ||
          /canary|nightly|internal|unsigned|alpha|beta|preview|rc\d/i.test(a.name)) return null;
    }
    return value as Approval;
  } catch { return null; }
}
export function validateAssetUrl(raw: unknown, tag: string, name: string): string | null {
  if (typeof raw !== "string") return null;
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:" || u.hostname !== "github.com" || u.port || u.username || u.password || u.search || u.hash) return null;
    const parts = u.pathname.split("/").slice(1).map(decodeURIComponent);
    if (parts.length !== 6 || parts[0] !== "AtlasHub-Si" || parts[1] !== "Atlas-Bot-Desktop" ||
        parts[2] !== "releases" || parts[3] !== "download" || parts[4] !== tag || parts[5] !== name) return null;
    return u.toString();
  } catch { return null; }
}
type Resolution = { status: Record<Platform, DownloadState>; targets: Partial<Record<Platform, string>> };
export async function resolveAtlasDownloads(
  raw: string | undefined = process.env.ATLASBOT_RELEASE_APPROVAL,
  fetcher: typeof fetch = fetch,
): Promise<Resolution> {
  const result: Resolution = { status: unavailableDownloads(), targets: {} };
  const approval = parseApproval(raw);
  if (!approval || Object.keys(approval.assets).length === 0) return result;
  try {
    const response = await fetcher("https://api.github.com/repos/" + ATLASBOT_REPOSITORY + "/releases/tags/" + encodeURIComponent(approval.tag), {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "Atlas-SI-release-resolver" },
      cache: "no-store", redirect: "error", signal: AbortSignal.timeout(6000),
    });
    if (!response.ok) return result;
    const release = await response.json();
    if (release.id !== approval.releaseId || release.tag_name !== approval.tag ||
        release.draft !== false || release.prerelease !== false ||
        !release.published_at || /canary|nightly|internal|unsigned/i.test(release.name ?? "") || !Array.isArray(release.assets)) return result;
    for (const platform of PLATFORMS) {
      const expected = approval.assets[platform];
      if (!expected) continue;
      const matches = release.assets.filter((a: { id?: number; name?: string }) => a.id === expected.id && a.name === expected.name);
      if (matches.length !== 1) continue;
      const asset = matches[0];
      if (asset.state !== "uploaded" || !(asset.size > 0) || asset.digest !== "sha256:" + expected.sha256) continue;
      const target = validateAssetUrl(asset.browser_download_url, approval.tag, expected.name);
      if (!target) continue;
      result.targets[platform] = target;
      result.status[platform] = { available: true, href: "/download/" + platform, version: approval.tag };
    }
  } catch { /* API errors, invalid JSON, timeout: keep all affected platforms unavailable. */ }
  return result;
}
