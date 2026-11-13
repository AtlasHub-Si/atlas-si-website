"use client";

/*
 * Article page chrome, ported from the article route of the original:
 * back link, eyebrow, title, standfirst, byline, artwork, prose, "more" cards
 * and the closing CTA — with the same data-enter motion sequence.
 */

import Link from "next/link";
import { LandingFooter, LandingHeader } from "@/components/chrome";
import { PostGradient } from "@/components/content/article-media";
import { ArticleCard, ContentCallToAction, RevealGroup, type ArticleCardData } from "@/components/content/collection-page";

export interface ArticlePageData {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  author: string;
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function ArticlePage({
  collection,
  article,
  more,
  children,
}: {
  collection: { name: string; indexRoute: string; imageEyebrow: string; backLabel: string; moreTitle: string };
  article: ArticlePageData;
  more: readonly ArticleCardData[];
  children: React.ReactNode;
}) {
  return (
    <div className="landing-page post-index">
      <LandingHeader />

      <main className="post-main">
        <div className="post-container">
          <article className="post-article-body">
            <header className="post-article-header" data-enter="post-copy">
              <Link className="post-article-back" href={collection.indexRoute}>
                {collection.backLabel}
              </Link>
              <p className="post-article-eyebrow" style={{ marginTop: 18 }}>
                {collection.imageEyebrow}
              </p>
              <h1 className="post-article-title">{article.title}</h1>
              <p className="post-article-standfirst">{article.description}</p>
              <p className="post-meta post-byline post-article-byline">
                <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                <span>{article.author}</span>
              </p>
            </header>

            <div className="post-article-art" data-enter="post-art" aria-hidden="true">
              <PostGradient title={article.title} />
              <p className="post-featured-art-title">{article.title}</p>
            </div>

            <div className="post-prose" data-enter="post-prose">
              {children}
            </div>
          </article>

          {more.length > 0 && (
            <RevealGroup className="post-more" slot="more">
              <h2 className="post-more-title" id="more-title">
                More from OpenBot
              </h2>
              <div className="post-grid">
                {more.map((entry, index) => (
                  <ArticleCard
                    key={entry.slug}
                    article={entry}
                    eyebrow={collection.imageEyebrow}
                    basePath={collection.indexRoute}
                    index={index}
                  />
                ))}
              </div>
            </RevealGroup>
          )}

          <ContentCallToAction />
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
