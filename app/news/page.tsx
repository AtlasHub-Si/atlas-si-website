import type { Metadata } from "next";
import { CollectionIndexPage } from "@/components/content/collection-page";
import { NEWS_COLLECTION } from "@/content/news";

export const metadata: Metadata = {
  title: NEWS_COLLECTION.indexTitle,
  description: NEWS_COLLECTION.indexDescription,
};

function toCards() {
  return NEWS_COLLECTION.articles.map(({ slug, title, description, publishedAt, author }) => ({
    slug,
    title,
    description,
    publishedAt,
    author,
  }));
}

export default function NewsIndexPage() {
  return (
    <CollectionIndexPage
      collection={{
        name: NEWS_COLLECTION.name,
        indexRoute: NEWS_COLLECTION.indexRoute,
        indexDescription: NEWS_COLLECTION.indexDescription,
        imageEyebrow: NEWS_COLLECTION.imageEyebrow,
        backLabel: NEWS_COLLECTION.backLabel,
        moreTitle: NEWS_COLLECTION.moreTitle,
        articles: toCards(),
      }}
    />
  );
}
