import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/content/article-page";
import { GUIDES_COLLECTION } from "@/content/guides";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return GUIDES_COLLECTION.articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const article = GUIDES_COLLECTION.articles.find((entry) => entry.slug === slug);
  if (!article) return {};
  return { title: `${article.title} — OpenBot`, description: article.description };
}

export default async function GuidesArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = GUIDES_COLLECTION.articles.find((entry) => entry.slug === slug);
  if (!article) notFound();

  const Body = article.body;
  const more = GUIDES_COLLECTION.articles
    .filter((entry) => entry.slug !== slug)
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
        name: GUIDES_COLLECTION.name,
        indexRoute: GUIDES_COLLECTION.indexRoute,
        imageEyebrow: GUIDES_COLLECTION.imageEyebrow,
        backLabel: GUIDES_COLLECTION.backLabel,
        moreTitle: GUIDES_COLLECTION.moreTitle,
      }}
      article={{ slug: article.slug, title: article.title, description: article.description, publishedAt: article.publishedAt, author: article.author }}
      more={more}
    >
      <Body />
    </ArticlePage>
  );
}
