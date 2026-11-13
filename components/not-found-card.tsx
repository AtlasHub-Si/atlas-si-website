"use client";

/*
 * Localized 404 card. The not-found boundary cannot read route params, so the
 * locale is derived from the pathname; it reuses the join-card styling for a
 * look consistent with the rest of the site.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppLogo } from "@/components/brand";
import { defaultLocale, isLocale, localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export function NotFoundCard() {
  const pathname = usePathname() || "/";
  const raw = pathname.split("/")[1];
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <main className="join-page">
      <Link className="landing-brand join-page-brand" href={localePath(locale, "/")} aria-label={dict.nav.home}>
        <AppLogo variant="production" className="landing-brand-logo" ariaLabel={dict.brand.animate} />
        <span>AtlasBot</span>
      </Link>

      <section className="join-card" aria-labelledby="not-found-title">
        <div className="join-card-signal" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>
        <AppLogo variant="production" animation="blink" className="join-card-logo" ariaLabel={dict.brand.animate} />
        <p className="join-card-eyebrow">404</p>
        <h1 id="not-found-title">{dict.notFound.title}</h1>
        <p className="join-card-copy">{dict.notFound.message}</p>
        <div className="join-card-actions">
          <Link className="landing-button landing-button-primary landing-button-lg" href={localePath(locale, "/")}>
            {dict.notFound.back}
          </Link>
        </div>
      </section>
    </main>
  );
}
