"use client";

/*
 * The landing page, ported from LandingPage.tsx + PricingSection.tsx +
 * DownloadSection.tsx. The hero plays the stagger entrance on mount exactly
 * like the original (remove is-shown, force reflow, add is-shown).
 */

import { useEffect, useRef, useState } from "react";
import { AppLogo, PlatformLogo, ProviderLogo } from "@/components/brand";
import { LandingIcon } from "@/components/icons";
import { LandingFooter, LandingHeader } from "@/components/chrome";
import { useLandingReveal } from "@/components/reveal";
import { HeroDownloadSelector } from "@/components/landing/download-selector";
import { LandingAppPreview } from "@/components/landing/app-preview";
import { LandingGlow } from "@/components/landing/glow";
import { DOWNLOAD_PLATFORMS, EXTERNAL_LINK_REL, OPENBOT_LINKS } from "@/lib/site";

function PricingSection() {
  const { ref, revealed } = useLandingReveal<HTMLElement>();
  const revealState = revealed ? "true" : "false";

  return (
    <section ref={ref} className="landing-pricing" aria-labelledby="pricing-title">
      <div className="landing-pricing-inner">
        <h2 id="pricing-title" className="landing-pricing-eyebrow" data-revealed={revealState}>
          What it costs
        </h2>
        <p className="landing-pricing-amount" data-amount="$0" data-revealed={revealState}>
          $0
        </p>
        <p className="landing-pricing-note" data-revealed={revealState}>
          OpenBot is free. No hidden fees. No locked features.
        </p>
      </div>
    </section>
  );
}

interface DownloadCardContentProps {
  action?: string;
  description: string;
  platform: "macos" | "windows" | "linux";
  status: string;
  title: string;
}

function DownloadCardContent({ action, description, platform, status, title }: DownloadCardContentProps) {
  return (
    <>
      <div className="landing-download-card-top">
        <PlatformLogo platform={platform} className="landing-download-platform-logo" />
        <span className="landing-download-status">{status}</span>
      </div>
      <div className="landing-download-card-copy">
        <h3>{title}</h3>
        <p>{description}</p>
        {action && (
          <span className="landing-download-action">
            {action}
            <LandingIcon name="arrow-up-right" className="landing-download-arrow" />
          </span>
        )}
      </div>
    </>
  );
}

function DownloadSection() {
  const { ref, revealed } = useLandingReveal<HTMLElement>();
  const revealState = revealed ? "true" : "false";
  const platforms = [DOWNLOAD_PLATFORMS.macos, DOWNLOAD_PLATFORMS.windows, DOWNLOAD_PLATFORMS.linux];

  return (
    <section ref={ref} id="download" className="landing-download" aria-labelledby="download-title">
      <div className="landing-download-inner">
        <header className="landing-download-heading" data-revealed={revealState}>
          <h2 id="download-title">Download OpenBot</h2>
          <p>Choose your platform. Run Codex, Claude, and Grok side by side from one desktop app.</p>
        </header>

        <div className="landing-download-grid">
          {platforms.map((platform) => (
            <a
              key={platform.id}
              className="landing-download-card"
              href={platform.href}
              data-download-platform={platform.id}
              data-state="available"
              data-revealed={revealState}
            >
              <DownloadCardContent
                platform={platform.id}
                status={platform.status}
                title={platform.label}
                description={platform.description}
                action={platform.action}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (hero) {
      hero.classList.remove("is-shown");
      void hero.offsetHeight;
      hero.classList.add("is-shown");
    }
    setMounted(true);
  }, []);

  return (
    <div className="landing-page">
      <LandingHeader />

      <main>
        <section className="landing-hero" aria-labelledby="landing-title">
          <div className="landing-hero-grid" data-slot="hero-grid" aria-hidden="true" />
          <div
            ref={heroRef}
            className={["landing-hero-copy", "t-stagger", mounted ? "is-shown" : ""].filter(Boolean).join(" ")}
          >
            <p className="landing-availability t-stagger-line t-stagger-line--1">
              <span className="landing-availability-new">NEW</span>
              <span className="landing-availability-copy">Available on</span>
              <span className="landing-availability-platform">
                <PlatformLogo platform="macos" />
                macOS
              </span>
              <span className="landing-availability-separator" aria-hidden="true">
                ·
              </span>
              <span className="landing-availability-platform">
                <PlatformLogo platform="windows" />
                Windows
              </span>
            </p>

            <h1 id="landing-title" className="landing-title t-stagger-line t-stagger-line--2">
              <span>Meet</span>
              <AppLogo variant="production" animation="blink" interactive className="landing-hero-logo" />
              <span>OpenBot</span>
            </h1>

            <p className="landing-description t-stagger-line t-stagger-line--3">
              Persistent AI teammates for real work. Run{" "}
              <span className="landing-provider">
                <ProviderLogo provider="codex" className="landing-provider-logo" />
                Codex
              </span>
              ,{" "}
              <span className="landing-provider">
                <ProviderLogo provider="claude" className="landing-provider-logo" />
                Claude
              </span>{" "}
              and{" "}
              <span className="landing-provider">
                <ProviderLogo provider="grok" className="landing-provider-logo" />
                Grok
              </span>{" "}
              side by side, each with its own workspace, queue, and context.
            </p>

            <div className="landing-actions t-stagger-line t-stagger-line--4">
              <HeroDownloadSelector />
              <a
                className="landing-button landing-button-glass landing-button-lg"
                href={OPENBOT_LINKS.contact}
                target="_blank"
                rel={EXTERNAL_LINK_REL}
                data-icon="contact"
              >
                Contact
              </a>
            </div>
          </div>

          <LandingAppPreview />
        </section>
        <PricingSection />
        <DownloadSection />
      </main>
      <LandingFooter />
      <LandingGlow />
    </div>
  );
}
