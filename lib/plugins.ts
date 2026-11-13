/*
 * Plugin listing helpers, ported from apps/auth-api/src/lib/plugins.ts.
 * Category labels moved to the locale dictionaries (lib/i18n/dictionaries.ts).
 */

export function pluginTagFilters(plugins: readonly { category: string }[]): string[] {
  return [...new Set(plugins.map((plugin) => plugin.category))].sort();
}
