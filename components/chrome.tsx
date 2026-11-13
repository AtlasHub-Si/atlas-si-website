"use client";

/*
 * Landing chrome (header + footer), ported from LandingPage.tsx and
 * LandingFooter.tsx. Shared by the landing page and the collection pages.
 * All copy comes from the locale dictionary; internal links are
 * locale-prefixed so the language survives navigation.
 */

import Link from "next/link";
import { AppLogo } from "@/components/brand";
import { LandingIcon } from "@/components/icons";
import { useLandingReveal } from "@/components/reveal";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ATLASBOT_LINKS, EXTERNAL_LINK_REL } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary, FooterLinkKey } from "@/lib/i18n/dictionaries";

export function LandingHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <header className="landing-header" data-enter="header">
      <Link className="landing-brand" href={localePath(locale, "/")} aria-label={dict.nav.home}>
        <AppLogo variant="production" className="landing-brand-logo" ariaLabel={dict.brand.animate} />
        <span>AtlasBot</span>
      </Link>

      <nav className="landing-navigation" aria-label={dict.nav.aria}>
        <Link className="landing-header-link" href={localePath(locale, "/news")}>
          {dict.nav.news}
        </Link>
        <Link className="landing-header-link" href={localePath(locale, "/guides")}>
          {dict.nav.guides}
        </Link>
        <Link className="landing-header-link" href={localePath(locale, "/plugins")}>
          {dict.nav.plugins}
        </Link>
        <a
          className="landing-button landing-button-secondary landing-button-sm landing-header-contact"
          href={ATLASBOT_LINKS.contact}
          target="_blank"
          rel={EXTERNAL_LINK_REL}
          data-icon="contact"
        >
          {dict.nav.contact}
        </a>
        <Link
          className="landing-button landing-button-secondary landing-button-sm"
          href={localePath(locale, "/app-preview")}
          data-icon="arrow-right"
        >
          {dict.nav.app}
        </Link>
        <LocaleSwitcher aria={dict.lang.aria} />
        <a
          className="landing-button landing-button-primary landing-button-sm"
          href={ATLASBOT_LINKS.download}
          data-icon="download"
        >
          {dict.nav.download}
        </a>
      </nav>
    </header>
  );
}

const SOCIALS = [
  {
    label: "GitHub",
    href: ATLASBOT_LINKS.repository,
    path: "M12 .7C5.7.7.8 5.6.8 11.9c0 5 3.2 9.3 7.6 10.8.6.1.8-.3.8-.6v-2.2c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.5-.3-5.1-1.2-5.1-5.6 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.5.1-3 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.7 6 18.8 6.3 18.8 6.3c.6 1.5.2 2.7.1 3 .8.8 1.2 1.8 1.2 3 0 4.4-2.6 5.3-5.1 5.6.4.4.8 1.1.8 2.1v3.2c0 .3.2.7.8.6a11.2 11.2 0 0 0 7.6-10.8C23.2 5.6 18.3.7 12 .7Z",
  },
  {
    label: "X",
    href: ATLASBOT_LINKS.contact,
    path: "M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.5L4.7 21H1.5l7.5-8.5L1.1 3h6.5l4.5 6 5.4-6Zm-1.1 16h1.8L7.6 4.9H5.7L16.4 19Z",
  },
] as const;

/* Internal footer destinations (locale-prefixed at render time). */
const INTERNAL_FOOTER_LINKS: Partial<Record<FooterLinkKey, string>> = {
  download: "/#download",
  news: "/news",
  guides: "/guides",
  plugins: "/plugins",
};

const EXTERNAL_FOOTER_LINKS: Partial<Record<FooterLinkKey, string>> = {
  releases: ATLASBOT_LINKS.releases,
  source: ATLASBOT_LINKS.repository,
  license: ATLASBOT_LINKS.license,
  privacy: ATLASBOT_LINKS.privacy,
  documentation: ATLASBOT_LINKS.documentation,
  troubleshooting: ATLASBOT_LINKS.troubleshooting,
  architecture: ATLASBOT_LINKS.architecture,
  contributing: ATLASBOT_LINKS.contributing,
  codex: ATLASBOT_LINKS.codex,
  claude: ATLASBOT_LINKS.claude,
};

function FooterNavLink({ locale, linkKey, label }: { locale: Locale; linkKey: FooterLinkKey; label: string }) {
  const internal = INTERNAL_FOOTER_LINKS[linkKey];
  if (internal) {
    return <Link href={localePath(locale, internal)}>{label}</Link>;
  }
  return (
    <a href={EXTERNAL_FOOTER_LINKS[linkKey]} target="_blank" rel={EXTERNAL_LINK_REL}>
      {label}
    </a>
  );
}

export function LandingFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { ref, revealed } = useLandingReveal<HTMLElement>();
  const revealState = revealed ? "true" : "false";
  const currentYear = new Date().getFullYear();

  return (
    <footer ref={ref} className="landing-footer" data-slot="landing-footer">
      <div className="landing-footer-inner">
        <div className="landing-footer-grid">
          <div className="landing-footer-brand" data-revealed={revealState}>
            <Link className="landing-footer-lockup" href={localePath(locale, "/")} aria-label={dict.nav.home}>
              <AppLogo variant="production" className="landing-footer-logo" ariaLabel={dict.brand.animate} />
              <span>AtlasBot</span>
            </Link>

            <p className="landing-footer-description">{dict.footer.description}</p>

            <Link className="landing-footer-cta" href={localePath(locale, "/#download")}>
              <span>{dict.footer.cta}</span>
              <LandingIcon name="download" />
            </Link>

            <div className="landing-footer-socials">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  className="landing-footer-social"
                  href={social.href}
                  target="_blank"
                  rel={EXTERNAL_LINK_REL}
                  aria-label={social.label}
                >
                  <span className="landing-visually-hidden">{social.label}</span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <nav className="landing-footer-columns" aria-label={dict.footer.navAria} data-revealed={revealState}>
            {dict.footer.columns.map((column) => (
              <div className="landing-footer-column" key={column.title}>
                <h2>{column.title}</h2>
                <ul>
                  {column.links.map((linkKey) => (
                    <li key={linkKey}>
                      <FooterNavLink locale={locale} linkKey={linkKey} label={dict.footer.links[linkKey]} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="landing-footer-bottom" data-revealed={revealState}>
          <p>
            &copy; {currentYear} AtlasBot. {dict.footer.rights}
          </p>
          <div className="landing-footer-meta">
            <Link href={localePath(locale, "/#download")}>
              <span className="landing-footer-availability" aria-hidden="true" />
              {dict.footer.availability}
            </Link>
            <p className="landing-footer-made">
              {dict.footer.madeBefore}
              <LandingIcon name="heart" label="love" />
              {dict.footer.madeAfter}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
