"use client";

/*
 * Landing chrome (header + footer), ported from LandingPage.tsx and
 * LandingFooter.tsx. Shared by the landing page and the collection pages.
 */

import Link from "next/link";
import { AppLogo } from "@/components/brand";
import { LandingIcon } from "@/components/icons";
import { useLandingReveal } from "@/components/reveal";
import { EXTERNAL_LINK_REL, FOOTER_COLUMNS, OPENBOT_LINKS, type FooterLink } from "@/lib/site";

export function LandingHeader() {
  return (
    <header className="landing-header" data-enter="header">
      <Link className="landing-brand" href="/" aria-label="OpenBot home">
        <AppLogo variant="production" className="landing-brand-logo" />
        <span>OpenBot</span>
      </Link>

      <nav className="landing-navigation" aria-label="Primary navigation">
        <Link className="landing-header-link" href="/news">
          News
        </Link>
        <Link className="landing-header-link" href="/guides">
          Guides
        </Link>
        <Link className="landing-header-link" href="/plugins">
          Plugins
        </Link>
        <a
          className="landing-button landing-button-secondary landing-button-sm landing-header-contact"
          href={OPENBOT_LINKS.contact}
          target="_blank"
          rel={EXTERNAL_LINK_REL}
          data-icon="contact"
        >
          Contact
        </a>
        <Link
          className="landing-button landing-button-secondary landing-button-sm"
          href="/app-preview"
          data-icon="arrow-right"
        >
          App
        </Link>
        <a
          className="landing-button landing-button-primary landing-button-sm"
          href={OPENBOT_LINKS.download}
          data-icon="download"
        >
          Download
        </a>
      </nav>
    </header>
  );
}

const FOOTER_DESCRIPTION =
  "Persistent AI teammates for real work. Run Codex, Claude, and Grok side by side, each with its own workspace, queue, and context.";

const SOCIALS = [
  {
    label: "GitHub",
    href: OPENBOT_LINKS.repository,
    path: "M12 .7C5.7.7.8 5.6.8 11.9c0 5 3.2 9.3 7.6 10.8.6.1.8-.3.8-.6v-2.2c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.5-.3-5.1-1.2-5.1-5.6 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.5.1-3 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.7 6 18.8 6.3 18.8 6.3c.6 1.5.2 2.7.1 3 .8.8 1.2 1.8 1.2 3 0 4.4-2.6 5.3-5.1 5.6.4.4.8 1.1.8 2.1v3.2c0 .3.2.7.8.6a11.2 11.2 0 0 0 7.6-10.8C23.2 5.6 18.3.7 12 .7Z",
  },
  {
    label: "X",
    href: OPENBOT_LINKS.contact,
    path: "M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.5L4.7 21H1.5l7.5-8.5L1.1 3h6.5l4.5 6 5.4-6Zm-1.1 16h1.8L7.6 4.9H5.7L16.4 19Z",
  },
] as const;

function FooterNavLink({ link }: { link: FooterLink }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel={EXTERNAL_LINK_REL}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={{ pathname: link.to, hash: link.hash }}>
      {link.label}
    </Link>
  );
}

export function LandingFooter() {
  const { ref, revealed } = useLandingReveal<HTMLElement>();
  const revealState = revealed ? "true" : "false";
  const currentYear = new Date().getFullYear();

  return (
    <footer ref={ref} className="landing-footer" data-slot="landing-footer">
      <div className="landing-footer-inner">
        <div className="landing-footer-grid">
          <div className="landing-footer-brand" data-revealed={revealState}>
            <Link className="landing-footer-lockup" href="/" aria-label="OpenBot home">
              <AppLogo variant="production" className="landing-footer-logo" />
              <span>OpenBot</span>
            </Link>

            <p className="landing-footer-description">{FOOTER_DESCRIPTION}</p>

            <Link className="landing-footer-cta" href="/#download">
              <span>Download OpenBot</span>
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

          <nav className="landing-footer-columns" aria-label="Footer navigation" data-revealed={revealState}>
            {FOOTER_COLUMNS.map((column) => (
              <div className="landing-footer-column" key={column.title}>
                <h2>{column.title}</h2>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterNavLink link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="landing-footer-bottom" data-revealed={revealState}>
          <p>&copy; {currentYear} OpenBot. All rights reserved.</p>
          <div className="landing-footer-meta">
            <Link href="/#download">
              <span className="landing-footer-availability" aria-hidden="true" />
              Available for macOS and Windows
            </Link>
            <p className="landing-footer-made">
              Made with
              <LandingIcon name="heart" label="love" />
              in Poland
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
