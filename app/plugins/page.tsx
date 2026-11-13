import type { Metadata } from "next";
import { LandingFooter, LandingHeader } from "@/components/chrome";
import { PluginsIndex } from "@/components/content/plugins-index";
import catalogJson from "@/content/plugin-catalog.json";
import { PLUGINS_TITLE, PLUGINS_DESCRIPTION } from "@/lib/plugins";

export const metadata: Metadata = {
  title: PLUGINS_TITLE,
  description: PLUGINS_DESCRIPTION,
};

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

export default function PluginsPage() {
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
      <LandingHeader />
      <main className="post-main">
        <div className="post-container">
          <div className="plugin-intro" data-enter="post-copy">
            <h1 className="plugin-intro-title">Plugins — OpenBot</h1>
            <p className="post-article-standfirst" style={{ marginTop: 14 }}>
              {PLUGINS_DESCRIPTION}
            </p>
          </div>
          <PluginsIndex plugins={plugins} updatedAt={catalogIndex.updatedAt} />
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
