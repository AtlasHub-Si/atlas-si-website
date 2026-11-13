"use client";

/*
 * The landing page, ported from LandingPage.tsx + PricingSection.tsx +
 * DownloadSection.tsx. The hero plays the stagger entrance on mount exactly
 * like the original (remove is-shown, force reflow, add is-shown). Copy comes
 * from the locale dictionary.
 */

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { AppLogo, PlatformLogo, ProviderLogo } from "@/components/brand";
import { ATLAS_FAMILY, AtlasCharacter } from "@/components/characters";
import { LandingIcon } from "@/components/icons";
import { LandingFooter, LandingHeader } from "@/components/chrome";
import { useLandingReveal } from "@/components/reveal";
import { HeroDownloadSelector } from "@/components/landing/download-selector";
import { LandingAppPreview } from "@/components/landing/app-preview";
import { LandingGlow } from "@/components/landing/glow";
import { DOWNLOAD_PLATFORMS, ATLASBOT_LINKS, EXTERNAL_LINK_REL } from "@/lib/site";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

function PricingSection({ dict }: { dict: Dictionary }) {
  const { ref, revealed } = useLandingReveal<HTMLElement>();
  const revealState = revealed ? "true" : "false";

  return (
    <section ref={ref} className="landing-pricing" aria-labelledby="pricing-title">
      <div className="landing-pricing-inner">
        <h2 id="pricing-title" className="landing-pricing-eyebrow" data-revealed={revealState}>
          {dict.pricing.eyebrow}
        </h2>
        <p className="landing-pricing-amount" data-amount="$0" data-revealed={revealState}>
          $0
        </p>
        <p className="landing-pricing-note" data-revealed={revealState}>
          {dict.pricing.note}
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

function DownloadSection({ dict }: { dict: Dictionary }) {
  const { ref, revealed } = useLandingReveal<HTMLElement>();
  const revealState = revealed ? "true" : "false";
  const platforms = [DOWNLOAD_PLATFORMS.macos, DOWNLOAD_PLATFORMS.windows, DOWNLOAD_PLATFORMS.linux];

  return (
    <section ref={ref} id="download" className="landing-download" aria-labelledby="download-title">
      <div className="landing-download-inner">
        <header className="landing-download-heading" data-revealed={revealState}>
          <h2 id="download-title">{dict.download.title}</h2>
          <p>{dict.download.subtitle}</p>
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
                status={platform.status === "available" ? dict.download.statusAvailable : dict.download.statusComingSoon}
                title={platform.label}
                description={platform.description}
                action={dict.download.actions[platform.id]}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FamilySection({ dict }: { dict: Dictionary }) {
  const { ref, revealed } = useLandingReveal<HTMLElement>();
  const revealState = revealed ? "true" : "false";
  return (
    <section ref={ref} className="landing-family" aria-labelledby="family-title">
      <div className="landing-family-inner">
        <p className="landing-family-eyebrow" data-revealed={revealState}>
          {dict.family.eyebrow}
        </p>
        <h2 id="family-title" className="landing-family-title" data-revealed={revealState}>
          {dict.family.title}
        </h2>
        <p className="landing-family-note" data-revealed={revealState}>
          {dict.family.note}
        </p>
        <div className="landing-family-row">
          {ATLAS_FAMILY.map((member, index) => (
            <div
              key={member.id}
              className="landing-family-card"
              data-revealed={revealState}
              style={{ "--family-index": index } as CSSProperties}
            >
              <AtlasCharacter role={member.id} className="landing-family-avatar" />
              <strong className="landing-family-name">{member.name}</strong>
              <span className="landing-family-role">{dict.family.roles[member.id]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
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
      <LandingHeader locale={locale} dict={dict} />

      <main>
        <section className="landing-hero" aria-labelledby="landing-title">
          <div className="landing-hero-grid" data-slot="hero-grid" aria-hidden="true" />
          <div
            ref={heroRef}
            className={["landing-hero-copy", "t-stagger", mounted ? "is-shown" : ""].filter(Boolean).join(" ")}
          >
            <p className="landing-availability t-stagger-line t-stagger-line--1">
              <span className="landing-availability-new">{dict.hero.availabilityNew}</span>
              <span className="landing-availability-copy">{dict.hero.availableOn}</span>
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
              <span>{dict.hero.titleLine1}</span>
              <AppLogo
                variant="production"
                animation="blink"
                interactive
                orbit
                className="landing-hero-logo"
                ariaLabel={dict.brand.animate}
              />
              <span>AtlasBot</span>
            </h1>

            <p className="landing-description t-stagger-line t-stagger-line--3">
              {dict.hero.descriptionBefore}
              <span className="landing-provider">
                <ProviderLogo provider="codex" className="landing-provider-logo" />
                Codex
              </span>
              ,{" "}
              <span className="landing-provider">
                <ProviderLogo provider="claude" className="landing-provider-logo" />
                Claude
              </span>{" "}
              {dict.hero.descriptionAnd}{" "}
              <span className="landing-provider">
                <ProviderLogo provider="grok" className="landing-provider-logo" />
                Grok
              </span>
              {dict.hero.descriptionAfter}
            </p>

            <div className="landing-actions t-stagger-line t-stagger-line--4">
              <HeroDownloadSelector dict={dict} />
              <a
                className="landing-button landing-button-glass landing-button-lg"
                href={ATLASBOT_LINKS.contact}
                target="_blank"
                rel={EXTERNAL_LINK_REL}
                data-icon="contact"
              >
                {dict.nav.contact}
              </a>
            </div>
          </div>

          <LandingAppPreview dict={dict} />
        </section>
        <FamilySection dict={dict} />
        <PricingSection dict={dict} />
        <DownloadSection dict={dict} />
      </main>
      <LandingFooter locale={locale} dict={dict} />
      <LandingGlow />
    </div>
  );
}
