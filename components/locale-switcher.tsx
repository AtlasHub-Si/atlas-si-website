"use client";

/*
 * Header language switcher. Builds the same path under every locale from the
 * current pathname (which always starts with /<locale>), so switching language
 * keeps the visitor on the equivalent page.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_LABELS, locales } from "@/lib/i18n/config";

export function LocaleSwitcher({ aria }: { aria: string }) {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/");
  const active = segments[1];
  const rest = segments.slice(2).filter(Boolean).join("/");

  return (
    <div className="landing-lang" role="group" aria-label={aria}>
      {locales.map((locale) => {
        const href = `/${locale}${rest ? `/${rest}` : ""}`;
        return (
          <Link
            key={locale}
            href={href}
            className="landing-lang-link"
            aria-current={active === locale ? "true" : undefined}
            hrefLang={locale}
          >
            {LOCALE_LABELS[locale]}
          </Link>
        );
      })}
    </div>
  );
}
