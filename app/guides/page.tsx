import type { Metadata } from "next";
import { CollectionIndexPage } from "@/components/content/collection-page";
import { GUIDES_COLLECTION } from "@/content/guides";

export const metadata: Metadata = {
  title: GUIDES_COLLECTION.indexTitle,
  description: GUIDES_COLLECTION.indexDescription,
};

function toCards() {
  return GUIDES_COLLECTION.articles.map(({ slug, title, description, publishedAt, author }) => ({
    slug,
    title,
    description,
    publishedAt,
    author,
  }));
}

export default function GuidesIndexPage() {
  return (
    <CollectionIndexPage
      collection={{
        name: GUIDES_COLLECTION.name,
        indexRoute: GUIDES_COLLECTION.indexRoute,
        indexDescription: GUIDES_COLLECTION.indexDescription,
        imageEyebrow: GUIDES_COLLECTION.imageEyebrow,
        backLabel: GUIDES_COLLECTION.backLabel,
        moreTitle: GUIDES_COLLECTION.moreTitle,
        articles: toCards(),
      }}
    />
  );
}
