import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingFooter, LandingHeader } from "@/components/chrome";
import { PluginsIndex } from "@/components/content/plugins-index";
import catalogJson from "@/content/plugin-catalog.json";
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
    title: dict.plugins.title,
    description: dict.plugins.description,
    alternates: {
      canonical: localePath(locale, "/plugins"),
      languages: alternateLanguages(locale, "/plugins"),
    },
  };
}

interface JsonPrompt {
  id: string;
  text: string;
}

interface JsonDetail {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  creatorName: string;
  iconUrl?: string;
  version: string;
  prompts: JsonPrompt[];
  apps: unknown[];
}

interface JsonIndex {
  schemaVersion: number;
  catalogVersion: string;
  updatedAt: string;
  plugins: { slug: string; version: string; featured: boolean }[];
}

const { catalogIndex, catalogDetails } = catalogJson as unknown as {
  catalogIndex: JsonIndex;
  catalogDetails: Record<string, JsonDetail>;
};

export default async function PluginsRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const plugins = catalogIndex.plugins
    .flatMap((entry) => {
      const detail = catalogDetails[entry.slug];
      return detail ? [{ ...detail, featured: entry.featured }] : [];
    })
    .map((detail) => ({
      slug: detail.slug,
      name: detail.name,
      tagline: detail.tagline,
      description: detail.description,
      category: detail.category,
      creatorName: detail.creatorName,
      iconUrl: detail.iconUrl,
      version: detail.version,
      featured: detail.featured,
      prompts: detail.prompts.map((prompt) => ({ id: prompt.id, text: prompt.text })),
      shareUrl: `https://openbot.site/plugin/${detail.slug}`,
    }));

  return (
    <div className="landing-page post-index">
      <LandingHeader locale={locale} dict={dict} />
      <main className="post-main">
        <div className="post-container">
          <div className="plugin-intro" data-enter="post-copy">
            <h1 className="plugin-intro-title">{dict.plugins.title}</h1>
            <p className="post-article-standfirst" style={{ marginTop: 14 }}>
              {dict.plugins.description}
            </p>
          </div>
          <PluginsIndex plugins={plugins} updatedAt={catalogIndex.updatedAt} locale={locale} dict={dict} />
        </div>
      </main>
      <LandingFooter locale={locale} dict={dict} />
    </div>
  );
}
