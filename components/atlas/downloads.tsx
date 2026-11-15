"use client";
import { useEffect, useState } from "react";
import { detectDownloadPlatform } from "@/lib/site";
import { unavailableDownloads, type DownloadState, type Platform } from "@/lib/download-types";
let pending: Promise<Record<Platform, DownloadState>> | null = null;
export function useDownloadStatus() {
  const [status, setStatus] = useState(unavailableDownloads);
  useEffect(() => {
    let active = true;
    pending ??= fetch("/api/downloads", { cache: "no-store" }).then(r => r.ok ? r.json() : null)
      .then(data => data?.platforms ?? unavailableDownloads()).catch(() => unavailableDownloads());
    pending.then(value => { if (active) setStatus(value); });
    return () => { active = false; };
  }, []);
  return status;
}
export function AtlasDownload({ soon, download, choose }: { soon: string; download: string; choose: string }) {
  const status = useDownloadStatus();
  const [platform, setPlatform] = useState<Platform>("windows");
  useEffect(() => { const detected = detectDownloadPlatform(navigator); if (detected) setPlatform(detected); }, []);
  const current = status[platform];
  return <div className="a-download-selector" data-platform={platform}>
    <label className="a-sr" htmlFor="atlas-platform">{choose}</label>
    <select id="atlas-platform" value={platform} onChange={e => setPlatform(e.target.value as Platform)}>
      <option value="windows">Windows</option><option value="macos">macOS</option><option value="linux">Linux</option>
    </select>
    {current.available && current.href === "/download/" + platform
      ? <a className="a-button a-primary" href={current.href}>{download} ↓</a>
      : <button type="button" className="a-button a-primary" disabled data-download-state="coming-soon">{soon}</button>}
  </div>;
}
