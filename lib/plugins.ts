/*
 * Plugin listing constants, ported from apps/auth-api/src/lib/plugins.ts.
 */

export const PLUGINS_TITLE = "Plugins — OpenBot";
export const PLUGINS_DESCRIPTION =
  "Plugins connect OpenBot agents to the services you already use. Browse the catalog, see what each plugin can do, and try one of its starter prompts.";

export const SKILL_CATEGORY_LABELS: Record<string, string> = {
  coding: "Coding",
  design: "Design",
  "data-analytics": "Data & Analytics",
  documents: "Documents",
  productivity: "Productivity",
  research: "Research",
  automation: "Automation",
  other: "Other",
};

export function pluginTagFilters(plugins: readonly { category: string }[]): string[] {
  return [...new Set(plugins.map((plugin) => plugin.category))].sort();
}
