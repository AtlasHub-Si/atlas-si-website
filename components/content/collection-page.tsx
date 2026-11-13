"use client";

/*
 * Collection index page (featured article + card grid + closing CTA), ported
 * from CollectionIndexPage.tsx / FeaturedArticle / ArticleCard /
 * ContentCallToAction. Cards sweep in per index when the grid reveals.
 */

import Link from "next/link";
import { useLandingReveal } from "@/components/reveal";
import { LandingFooter, LandingHeader } from "@/components/chrome";
import { PostGradient } from "@/components/content/article-media";

export interface ArticleCardData {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  author: string;
}

export interface CollectionIndexData {
  name: string;
  indexRoute: string;
  indexDescription: string;
  imageEyebrow: string;
  backLabel: string;
  moreTitle: string;
  articles: readonly ArticleCardData[];
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function RevealGroup({
  className,
  slot,
  children,
}: {
  className: string;
  slot: "grid" | "more" | "cta";
  children: React.ReactNode;
}) {
  const { ref, revealed } = useLandingReveal<HTMLElement>({ rootMargin: slot === "grid" ? "0px" : undefined });
  return (
    <section
      ref={ref}
      className={className}
      aria-labelledby={`${slot}-title`}
      data-revealed={revealed ? "true" : "false"}
      data-slot={slot}
    >
      {children}
    </section>
  );
}

export function ArticleCard({
  article,
  eyebrow,
  basePath,
  index,
}: {
  article: ArticleCardData;
  eyebrow: string;
  basePath: string;
  index: number;
}) {
  return (
    <Link
      href={`${basePath}/${article.slug}`}
      className="post-card"
      style={{ "--post-card-index": index } as React.CSSProperties}
    >
      <div className="post-card-art">
        <PostGradient title={article.title} />
        <p className="post-card-art-title" aria-hidden="true">
          {article.title}
        </p>
      </div>
      <span className="post-meta post-byline post-card-byline">
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        <span>{article.author}</span>
      </span>
      <h3 className="post-card-title">{article.title}</h3>
      <span className="landing-visually-hidden">{eyebrow}</span>
    </Link>
  );
}

export function ContentCallToAction() {
  return (
    <RevealGroup className="post-cta" slot="cta">
      <h2 className="post-cta-title" id="cta-title" style={{ opacity: undefined }}>
        Put your agents to work
      </h2>
      <p className="post-cta-description">
        OpenBot is free and local-first. Download the app, create your first agent, and give it a job that outlives the
        chat.
      </p>
      <div className="post-cta-actions">
        <a className="landing-button landing-button-primary landing-button-lg" href="/#download" data-icon="download">
          Download OpenBot
        </a>
        <Link className="landing-button landing-button-secondary landing-button-lg" href="/guides/openbot-101">
          Read OpenBot 101
        </Link>
      </div>
    </RevealGroup>
  );
}

export function CollectionIndexPage({ collection }: { collection: CollectionIndexData }) {
  const featured = collection.articles[0];
  const rest = collection.articles.slice(1);

  return (
    <div className="landing-page post-index">
      <LandingHeader />

      <main className="post-main">
        <div className="post-container">
          <h1 className="landing-visually-hidden">{collection.name}</h1>

          {featured && (
            <article className="post-featured">
              <div className="post-featured-copy" data-enter="post-copy">
                <p className="post-featured-eyebrow">{collection.imageEyebrow}</p>
                <h2 className="post-featured-title">
                  <Link href={`${collection.indexRoute}/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p className="post-featured-description">{featured.description}</p>
                <p className="post-meta post-byline">
                  <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
                  <span>{featured.author}</span>
                </p>
                <div className="post-featured-action">
                  <span className="landing-button landing-button-secondary landing-button-sm" data-icon="arrow-right">
                    Read the article
                  </span>
                </div>
              </div>
              <Link
                href={`${collection.indexRoute}/${featured.slug}`}
                className="post-featured-art"
                data-enter="post-art"
                aria-hidden="true"
                tabIndex={-1}
              >
                <PostGradient title={featured.title} />
                <p className="post-featured-art-title">{featured.title}</p>
              </Link>
            </article>
          )}

          {rest.length > 0 && (
            <RevealGroup className="post-grid-section" slot="grid">
              <h2 className="landing-visually-hidden" id="grid-title">
                {collection.moreTitle}
              </h2>
              <div className="post-grid">
                {rest.map((article, index) => (
                  <ArticleCard
                    key={article.slug}
                    article={article}
                    eyebrow={collection.imageEyebrow}
                    basePath={collection.indexRoute}
                    index={index}
                  />
                ))}
              </div>
            </RevealGroup>
          )}
        </div>

        <div className="post-container">
          <ContentCallToAction />
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
