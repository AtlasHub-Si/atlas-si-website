export const PLATFORMS = ["windows", "macos", "linux"] as const;
export type Platform = typeof PLATFORMS[number];
export type DownloadState = { available: boolean; href: string | null; version?: string };
export const unavailableDownloads = (): Record<Platform, DownloadState> => ({
 windows:{available:false,href:null},macos:{available:false,href:null},linux:{available:false,href:null}
});
