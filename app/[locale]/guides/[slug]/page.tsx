import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/content/article-page";
import { GUIDES_COLLECTION } from "@/content/guides";
import { GUIDES_TITLES, localizeEntry } from "@/lib/i18n/articles";
import { alternateLanguages, isLocale, localePath, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => GUIDES_COLLECTION.articles.map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = GUIDES_COLLECTION.articles.find((entry) => entry.slug === slug);
  if (!article || !isLocale(locale)) return {};
  const loc = localizeEntry(article, GUIDES_TITLES, locale);
  const path = `/guides/${slug}`;
  return {
    title: loc.title,
    description: loc.description,
    alternates: {
      canonical: localePath(locale, path),
      languages: alternateLanguages(locale, path),
    },
  };
}

export default async function GuidesArticleRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const article = GUIDES_COLLECTION.articles.find((entry) => entry.slug === slug);
  if (!article) notFound();

  const dict = getDictionary(locale);
  const meta = dict.collections.guides;
  const loc = localizeEntry(article, GUIDES_TITLES, locale);

  const more = GUIDES_COLLECTION.articles
    .filter((entry) => entry.slug !== slug)
    .map((entry) => {
      const moreLoc = localizeEntry(entry, GUIDES_TITLES, locale);
      return {
        slug: entry.slug,
        title: moreLoc.title,
        description: moreLoc.description,
        publishedAt: entry.publishedAt,
        author: entry.author,
      };
    });

  return (
    <ArticlePage
      locale={locale}
      dict={dict}
      collection={{
        name: meta.name,
        indexRoute: localePath(locale, "/guides"),
        imageEyebrow: meta.eyebrow,
        backLabel: meta.backLabel,
        moreTitle: meta.moreTitle,
      }}
      article={{
        slug: article.slug,
        title: loc.title,
        description: loc.description,
        publishedAt: article.publishedAt,
        author: article.author,
      }}
      more={more}
      bodyNotice={dict.collections.article.notice || undefined}
    >
      <article.body />
    </ArticlePage>
  );
}
