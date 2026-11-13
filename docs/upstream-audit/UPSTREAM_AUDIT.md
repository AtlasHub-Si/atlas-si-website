# RELATÓRIO DO REPOSITÓRIO ORIGINAL (UPSTREAM AUDIT)

> Fonte: clone de `https://github.com/wunitb/openbot.run` (auditado 13 nov 2026).
> Nenhuma alteração foi feita ao upstream nem à reconstrução atual.

## 1. Estado do repositório

| Item | Valor |
|---|---|
| HEAD | `288d3bfb` — 23 set 2026 — "Improve mobile chat attachments, previews, and generated images (#742)" |
| Versão | **0.19.0** |
| Commits | 648 (histórico público inicia em 12 ago 2026, commit `e6b7be70`) |
| Tags/releases Git | nenhuma tag no clone; versões marcadas por commits `release: prepare vX.Y.Z` |
| Licença atual | **PolyForm Noncommercial 1.0.0** |
| Nome do pacote | `openbot` |
| Runtime | Node 24 (`.nvmrc`), Bun (`bun.lock`), npm scripts |

## 2. Stack técnica (HEAD 0.19.0)

- **Electron + electron-vite + electron-builder** — app desktop macOS/Windows/Linux.
- **SolidJS** (`solid-js`, `@solidjs/web`, `@solidjs/signals`) + **Tailwind CSS** + Kobalte UI.
- **TypeScript**, Biome (lint/format), Storybook, Vitest, Playwright.
- **Monorepo workspaces**: `apps/auth-api`, `apps/mobile` (React Native/Expo, 64 deps), `apps/site-router`, `packages/*` (`@openbot/ui`, `contracts`, `i18n`, `logging`, `brand`, `team-client`, `user-errors`).
- **Integrações**: MCP SDK, ACP (Agent Client Protocol), Claude Agent SDK, Anthropic SDK, Electron auto-update, WebSocket (`ws`), YAML, Zod.
- **Assets de UI**: `@paper-design/shaders` (shaders GL), `@fontsource-variable/inter`, `lucide-solid`.
- **Diretórios**: `src/`, `packages/`, `apps/`, `marketplace/`, `native-runtime.lock.json`, `vendor/`, `remote/` (deploy remoto), `plans/`, `docs/`.

## 3. Funcionalidades mapeadas (por estrutura e docs do repo)

- Workspace persistente de agentes (multi-provider: Claude, Codex, Gemini, Grok, modelos locais).
- Agentes com personalidade/identidade, modelos por agente, canais partilhados, threads.
- Colaboração multiagente (handoffs, subagentes), tarefas, rotinas/cron.
- Marketplace de plugins (agents/skills/apps).
- App móvel companion; auth-api; site-router (website próprio do produto).
- i18n; temas; onboarding; atualizações automáticas.

## 4. Comparação com a nossa reconstrução atual

| Dimensão | Upstream 0.19.0 | `atlas-si-website` (nosso) |
|---|---|---|
| Tipo | App desktop Electron (produto) | Site estático Astro (marketing) |
| Stack | SolidJS + Tailwind + Electron | Astro + Tailwind |
| Escopo | Produto completo (~648 commits) | Landing v1 (9 secções) |
| Licença | PolyForm NC (não comercial) | Código nosso, MIT-able |
| Papel | Base de produto a integrar | Landing/institucional |

**Conclusão:** não são alternativas — são camadas diferentes. A reconstrução deve
ficar como landing; o produto deve partir do upstream, num repo próprio.

## 5. Limitações desta auditoria

- Histórico público parece reescrito ("Prepare repository for public release",
  `b74d7d28`), logo não há versões anteriores a 12 ago 2026 no repo.
- Não foi executado build/test do upstream (auditoria estática).
- Sem tags Git, a correspondência versão→commit é feita por `package.json`.
