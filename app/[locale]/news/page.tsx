import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionIndexPage } from "@/components/content/collection-page";
import { NEWS_COLLECTION } from "@/content/news";
import { localizeEntry, NEWS_TITLES } from "@/lib/i18n/articles";
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
    title: dict.collections.news.indexTitle,
    description: dict.collections.news.indexDescription,
    alternates: {
      canonical: localePath(locale, "/news"),
      languages: alternateLanguages(locale, "/news"),
    },
  };
}

export default async function NewsIndexRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const meta = dict.collections.news;

  return (
    <CollectionIndexPage
      locale={locale}
      dict={dict}
      collection={{
        name: meta.name,
        indexRoute: localePath(locale, "/news"),
        indexDescription: meta.indexDescription,
        imageEyebrow: meta.eyebrow,
        backLabel: meta.backLabel,
        moreTitle: meta.moreTitle,
        articles: NEWS_COLLECTION.articles.map((entry) => {
          const loc = localizeEntry(entry, NEWS_TITLES, locale);
          return {
            slug: entry.slug,
            title: loc.title,
            description: loc.description,
            publishedAt: entry.publishedAt,
            author: entry.author,
          };
        }),
      }}
    />
  );
}
