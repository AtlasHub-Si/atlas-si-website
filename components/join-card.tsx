"use client";

/*
 * The join card, ported from JoinPage.tsx: the private-invitation card that
 * deep-links into the desktop app (atlasbot://), with platform detection and
 * the same fallbacks. Without a valid invite query the link is not built, so
 * the card explains itself instead. All copy comes from the locale dictionary.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppLogo } from "@/components/brand";
import { detectDownloadPlatform, ATLASBOT_DOWNLOAD_LINKS } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

function toAtlasBotInviteUrl(canonical: string): string {
  const url = new URL(canonical);
  const invite = url.searchParams.get("invite");
  if (!invite) throw new Error("missing invite");
  return `atlasbot://join?invite=${encodeURIComponent(invite)}`;
}

export function JoinCard({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [openUrl, setOpenUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string>(ATLASBOT_DOWNLOAD_LINKS.macos);
  const [mobile, setMobile] = useState(false);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setMobile(
      /android|iphone|ipad|ipod/iu.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    );
    let validInvite = true;
    try {
      const pageUrl = new URL(window.location.href);
      const canonicalUrl = new URL(`${pageUrl.pathname}${pageUrl.search}`, window.location.origin);
      setOpenUrl(toAtlasBotInviteUrl(canonicalUrl.toString()));
    } catch {
      validInvite = false;
      setInvalid(true);
    }
    if (detectDownloadPlatform(window.navigator) === "windows") setDownloadUrl(ATLASBOT_DOWNLOAD_LINKS.windows);
  }, []);

  return (
    <main className="join-page">
      <Link className="landing-brand join-page-brand" href={localePath(locale, "/")} aria-label={dict.nav.home}>
        <AppLogo variant="production" className="landing-brand-logo" ariaLabel={dict.brand.animate} />
        <span>AtlasBot</span>
      </Link>

      <section className="join-card" aria-labelledby="join-title">
        <div className="join-card-signal" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>
        <AppLogo variant="production" animation="blink" className="join-card-logo" ariaLabel={dict.brand.animate} />
        <p className="join-card-eyebrow">{dict.join.eyebrow}</p>
        <h1 id="join-title">{dict.join.title}</h1>
        <p className="join-card-copy">{dict.join.copy}</p>

        {invalid ? (
          <p className="join-card-error">{dict.join.error}</p>
        ) : (
          <div className="join-card-actions">
            {openUrl ? (
              <a className="landing-button landing-button-primary landing-button-lg" href={openUrl} data-icon="open">
                {dict.join.open}
              </a>
            ) : (
              <span className="landing-button landing-button-primary landing-button-lg join-card-disabled">
                {dict.join.open}
              </span>
            )}
            {!mobile && (
              <a
                className="landing-button landing-button-secondary landing-button-lg"
                href={downloadUrl}
                data-icon="download"
              >
                {dict.join.download}
              </a>
            )}
          </div>
        )}

        {mobile && <p className="join-card-note">{dict.join.noteMobile}</p>}
        <p className="join-card-note">{dict.join.noteShare}</p>
      </section>
    </main>
  );
}
