import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { isLocale, LOCALE_HTML_LANG, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import "../globals.css";

/* Self-hosted Inter Variable, matching the original @fontsource import. */
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

/* Production metadata base: set NEXT_PUBLIC_SITE_URL (or VERCEL_URL, set
   automatically by Vercel) to the deployed origin; falls back to localhost. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.site.title,
      template: "%s — AtlasBot",
    },
    description: dict.site.description,
    alternates: {
      languages: {
        pt: "/pt",
        en: "/en",
        fr: "/fr",
        es: "/es",
        "x-default": "/pt",
      },
    },
    openGraph: {
      type: "website",
      siteName: "AtlasBot",
      title: dict.site.title,
      description: dict.site.description,
      url: `/${locale}`,
      locale: LOCALE_HTML_LANG[locale],
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "AtlasBot" }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.site.title,
      description: dict.site.description,
      images: ["/og.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "pt");
  return (
    <html lang={LOCALE_HTML_LANG[isLocale(locale) ? locale : "pt"]} className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
