import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JoinCard } from "@/components/join-card";
import { alternateLanguages, isLocale, localePath, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.join.title,
    description: dict.join.copy,
    alternates: {
      canonical: localePath(locale, "/join"),
      languages: alternateLanguages(locale, "/join"),
    },
  };
}

export default async function JoinRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <JoinCard locale={locale} dict={getDictionary(locale)} />;
}
