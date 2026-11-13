import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/content/article-page";
import { NEWS_COLLECTION } from "@/content/news";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return NEWS_COLLECTION.articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const article = NEWS_COLLECTION.articles.find((entry) => entry.slug === slug);
  if (!article) return {};
  return { title: `${article.title} — OpenBot`, description: article.description };
}

export default async function NewsArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = NEWS_COLLECTION.articles.find((entry) => entry.slug === slug);
  if (!article) notFound();

  const Body = article.body;
  const more = NEWS_COLLECTION.articles
    .filter((entry) => entry.slug !== slug)
    .slice(0, 4)
    .map(({ slug: entrySlug, title, description, publishedAt, author }) => ({
      slug: entrySlug,
      title,
      description,
      publishedAt,
      author,
    }));

  return (
    <ArticlePage
      collection={{
        name: NEWS_COLLECTION.name,
        indexRoute: NEWS_COLLECTION.indexRoute,
        imageEyebrow: NEWS_COLLECTION.imageEyebrow,
        backLabel: NEWS_COLLECTION.backLabel,
        moreTitle: NEWS_COLLECTION.moreTitle,
      }}
      article={{ slug: article.slug, title: article.title, description: article.description, publishedAt: article.publishedAt, author: article.author }}
      more={more}
    >
      <Body />
    </ArticlePage>
  );
}
