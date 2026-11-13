"use client";

/*
 * The plugin grid with category filter switches, ported from
 * PluginsIndexPage.tsx: pressed filter fills like a primary button, cards
 * sweep in per index, and the mark sits straight on the card gradient.
 * Category names and chrome copy come from the locale dictionary; plugin
 * descriptions stay in English (catalog data).
 */

import { useMemo, useState } from "react";
import { useLandingReveal } from "@/components/reveal";
import { pluginTagFilters } from "@/lib/plugins";
import { formatLongDate, type Locale } from "@/lib/i18n/config";
import type { CategoryKey, Dictionary } from "@/lib/i18n/dictionaries";

export interface PluginCardData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  creatorName: string;
  iconUrl?: string;
  version: string;
  featured: boolean;
  prompts: { id: string; text: string }[];
  shareUrl: string;
}

function PluginLogo({ plugin }: { plugin: PluginCardData }) {
  const [broken, setBroken] = useState(false);

  if (plugin.iconUrl && !broken) {
    return (
      // Remote marks are decoration on top of the card gradient.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="plugin-card-icon"
        src={plugin.iconUrl}
        alt=""
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setBroken(true)}
      />
    );
  }

  return (
    <div className="plugin-card-logo plugin-logo" aria-hidden="true">
      <span className="plugin-logo-letter">{plugin.name.charAt(0).toUpperCase()}</span>
    </div>
  );
}

export function PluginsIndex({
  plugins,
  updatedAt,
  locale,
  dict,
}: {
  plugins: PluginCardData[];
  updatedAt: string;
  locale: Locale;
  dict: Dictionary;
}) {
  const [active, setActive] = useState<string | undefined>(undefined);
  const { ref, revealed } = useLandingReveal<HTMLElement>({ rootMargin: "0px" });

  const tags = useMemo(() => pluginTagFilters(plugins), [plugins]);
  const visible = useMemo(
    () => (active ? plugins.filter((plugin) => plugin.category === active) : plugins),
    [plugins, active],
  );

  return (
    <>
      <div className="plugin-filters" role="group" aria-label={dict.plugins.filtersAria}>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className="plugin-tag-button"
            aria-pressed={active === tag ? "true" : "false"}
            onClick={() => setActive(active === tag ? undefined : tag)}
          >
            {dict.plugins.categories[tag as CategoryKey] ?? tag}
          </button>
        ))}
      </div>

      <section ref={ref} className="plugin-grid-section" data-revealed={revealed ? "true" : "false"} aria-label="Plugins">
        {visible.length === 0 ? (
          <p className="plugin-empty">{dict.plugins.empty}</p>
        ) : (
          <div className="plugin-grid">
            {visible.map((plugin, index) => (
              <a
                key={plugin.slug}
                className="plugin-card"
                href={plugin.shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ "--post-card-index": index } as React.CSSProperties}
              >
                <div className="plugin-card-art post-gradient-host">
                  <div
                    className="post-gradient"
                    style={
                      {
                        "--gradient-a": "hsl(268 42% 58%)",
                        "--gradient-b": "hsl(212 55% 62%)",
                        "--gradient-c": "hsl(154 45% 55%)",
                      } as React.CSSProperties
                    }
                  />
                  <PluginLogo plugin={plugin} />
                </div>
                <div className="plugin-card-meta">
                  <span className="plugin-card-publisher">{plugin.creatorName}</span>
                  <span className="plugin-card-version">v{plugin.version}</span>
                </div>
                <div className="plugin-card-headline">
                  <h2 className="plugin-card-title">{plugin.name}</h2>
                  <span className="plugin-card-tagline">{plugin.tagline}</span>
                </div>
                <div className="plugin-card-tags">
                  <span className="plugin-tag">{dict.plugins.categories[plugin.category as CategoryKey] ?? plugin.category}</span>
                  {plugin.featured && <span className="plugin-tag">{dict.plugins.featured}</span>}
                </div>
              </a>
            ))}
          </div>
        )}
        <p className="plugin-card-meta" style={{ marginTop: 24 }}>
          {dict.plugins.catalogUpdated} {formatLongDate(updatedAt, locale)}
        </p>
      </section>
    </>
  );
}
