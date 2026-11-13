"use client";

/*
 * The join page, ported from JoinPage.tsx: the private-invitation card that
 * deep-links into the desktop app (openbot://), with platform detection and
 * the same fallbacks. Without a valid invite query the link is not built, so
 * the card explains itself instead.
 */

import { useEffect, useState } from "react";
import { AppLogo } from "@/components/brand";
import { detectDownloadPlatform, OPENBOT_DOWNLOAD_LINKS } from "@/lib/site";

function toOpenBotInviteUrl(canonical: string): string {
  const url = new URL(canonical);
  const invite = url.searchParams.get("invite");
  if (!invite) throw new Error("missing invite");
  return `openbot://join?invite=${encodeURIComponent(invite)}`;
}

export default function JoinPage() {
  const [openUrl, setOpenUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string>(OPENBOT_DOWNLOAD_LINKS.macos);
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
      setOpenUrl(toOpenBotInviteUrl(canonicalUrl.toString()));
    } catch {
      validInvite = false;
      setInvalid(true);
    }
    if (detectDownloadPlatform(window.navigator) === "windows") setDownloadUrl(OPENBOT_DOWNLOAD_LINKS.windows);
  }, []);

  return (
    <main className="join-page">
      <a className="landing-brand join-page-brand" href="/" aria-label="OpenBot home">
        <AppLogo variant="production" className="landing-brand-logo" />
        <span>OpenBot</span>
      </a>

      <section className="join-card" aria-labelledby="join-title">
        <div className="join-card-signal" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>
        <AppLogo variant="production" animation="blink" className="join-card-logo" />
        <p className="join-card-eyebrow">Private invitation</p>
        <h1 id="join-title">Connect to an OpenBot host</h1>
        <p className="join-card-copy">
          Open this invitation in OpenBot. The app will verify the host and ask for confirmation before it connects.
        </p>

        {invalid ? (
          <p className="join-card-error">This invitation link is invalid or incomplete. Ask the host for a new invitation.</p>
        ) : (
          <div className="join-card-actions">
            {openUrl ? (
              <a className="landing-button landing-button-primary landing-button-lg" href={openUrl} data-icon="open">
                Open OpenBot
              </a>
            ) : (
              <span className="landing-button landing-button-primary landing-button-lg join-card-disabled">
                Open OpenBot
              </span>
            )}
            {!mobile && (
              <a className="landing-button landing-button-secondary landing-button-lg" href={downloadUrl} data-icon="download">
                Download OpenBot
              </a>
            )}
          </div>
        )}

        {mobile && (
          <p className="join-card-note">
            If OpenBot is installed, tap Open OpenBot. You can also paste this link into Add server in the app.
          </p>
        )}
        <p className="join-card-note">
          This link grants access to a host. Share it only with people you want to invite. OpenBot shows its expiry
          before you join.
        </p>
      </section>
    </main>
  );
}
