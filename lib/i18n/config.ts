/*
 * Locale configuration for the AtlasBot site. The default locale (pt) is also
 * the target of the "/" redirect performed by middleware.ts.
 */

export const locales = ["pt", "en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const LOCALE_LABELS: Record<Locale, string> = {
  pt: "PT",
  en: "EN",
  fr: "FR",
  es: "ES",
};

/* The value rendered into <html lang="…">. */
export const LOCALE_HTML_LANG: Record<Locale, string> = {
  pt: "pt-PT",
  en: "en",
  fr: "fr",
  es: "es",
};

/* BCP 47 tags used for Intl date formatting and hreflang alternates. */
export const LOCALE_INTL_TAG: Record<Locale, string> = {
  pt: "pt-PT",
  en: "en-GB",
  fr: "fr-FR",
  es: "es-ES",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/* Parse an ISO date ("2026-09-14") or ISO timestamp ("2026-09-14T22:10:00Z"). */
function parseIso(iso: string): Date {
  return new Date(iso.includes("T") ? iso : `${iso}T00:00:00Z`);
}

/* Locale-aware short date, e.g. "14 set 2026" / "14 Sept 2026". */
export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(LOCALE_INTL_TAG[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(parseIso(iso));
}

/* Locale-aware long date, e.g. "14 de Setembro de 2026" (plugin catalog). */
export function formatLongDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(LOCALE_INTL_TAG[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parseIso(iso));
}

/* Prefix a site path with the locale segment ("/news" → "/pt/news"). */
export function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized === "/" ? "" : normalized}`;
}

/* hreflang map for a path: every locale + x-default (pt). */
export function alternateLanguages(locale: Locale, path: string): Record<string, string> {
  return {
    ...Object.fromEntries(locales.map((l) => [LOCALE_HTML_LANG[l], localePath(l, path)])),
    "x-default": localePath(defaultLocale, path),
  };
}
