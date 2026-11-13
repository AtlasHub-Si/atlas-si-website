# AtlasBot — sítio multilingue (PT · EN · FR · ES)

Sítio público do **AtlasBot**, construído em **Next.js 15 (App Router) + React 19**,
com o sistema de design, as animações e as páginas portados 1:1 do site original
de onde o projeto derivou (`openbot.run`), rebrandizados e estendidos com
**i18n em 4 línguas**, `og:` banner próprio e catálogo REA das animações.

- Rotas: `/pt` (predefinição), `/en`, `/fr`, `/es` → landing, news (8 artigos),
  guides (3 guias), plugins (catálogo de 14), join, app-preview interativo.
- `/` redireciona para `/pt` (ou o idioma do visitante, via `Accept-Language`/cookie).
- `/download/macos|windows|linux` resolve a release mais recente (rota de API, sem locale).

## Arrancar

```bash
bun install
bun run dev      # http://localhost:3000
bun run build && bun start
```

Node 20+ (`.nvmrc` fixa 22). O lockfile é o `bun.lock` — a Vercel usa Bun
automaticamente por causa dele.

## Deploy (Vercel)

O `vercel.json` fixa tudo o que a Vercel precisa — não há configuração manual:

```json
{ "framework": "nextjs", "installCommand": "bun install", "buildCommand": "next build" }
```

Importar o repo na Vercel e fazer Deploy. Variável opcional:
`NEXT_PUBLIC_SITE_URL=https://<domínio>` (canonical/`og:`; sem ela a Vercel
fornece `VERCEL_URL` automaticamente).

---

## Mapa do repositório

```
app/
  [locale]/                  # TODAS as páginas, sob prefixo de idioma
    layout.tsx               # <html lang>, metadados globais, hreflang, og
    page.tsx                 # landing (hero + preview + $0 + download)
    news/page.tsx            # índice de notícias (featured + cards)
    news/[slug]/page.tsx     # artigo (título/descrição traduzidos, corpo EN)
    guides/…                 # índice + 3 guias (mesma mecânica)
    plugins/page.tsx         # catálogo + filtros
    join/page.tsx            # convite privado (deep-link atlasbot://)
    app-preview/page.tsx     # cena interativa dentro do iframe da landing
    not-found.tsx            # 404 localizado
  download/[platform]/route.ts  # API: resolve release no GitHub (302)
  globals.css                # reset + importa os 5 ficheiros de estilos
middleware.ts                # redirect / → /<idioma>; cookie ATLASBOT_LOCALE
components/
  chrome.tsx                 # header (nav + switcher PT/EN/FR/ES) + footer
  locale-switcher.tsx        # seletor de idioma (mantém a página atual)
  brand.tsx                  # AppLogo (blink/olhos/wink/party) + logos SO/providers
  reveal.tsx                 # useLandingReveal (IntersectionObserver -40%)
  not-found-card.tsx         # 404 (deriva o locale do pathname)
  join-card.tsx              # cartão de convite (cliente)
  landing/
    landing-page.tsx         # hero, pricing ($0), download cards
    download-selector.tsx    # split-button + menu de plataformas
    app-preview.tsx          # skeleton + handshake + iframe
    glow.tsx                 # aurora de fecho (9 barras, scroll-driven)
  content/
    collection-page.tsx      # índices: featured + cards + CTA
    article-page.tsx         # página de artigo (byline, arte, prosa, "mais")
    plugins-index.tsx        # grelha de plugins + filtros
    article-media.tsx        # PostGradient (aurora por título), imagens/vídeo
content/
  news.tsx                   # 8 artigos (corpos em EN)
  guides.tsx                 # 3 guias (corpos em EN)
  plugin-catalog.json        # catálogo real de plugins
lib/
  site.ts                    # links, plataformas de descarga, deteção de SO
  plugins.ts                 # pluginTagFilters
  i18n/
    config.ts                # locales, formatDate/formatLongDate, localePath, hreflang
    dictionaries.ts          # TODAS as strings de UI em PT/EN/FR/ES
    articles.ts              # títulos/descrições traduzidos por slug
styles/
  tokens.css                 # design tokens (--atlasbot-*) + keyframes do logo
  landing.css                # landing, header, footer, cards, keyframes de entrada
  post.css                   # artigos, cards de conteúdo, grelhas
  preview.css                # cena do app-preview
  i18n.css                   # switcher de idioma + aviso de conteúdo EN
docs/ANIMATIONS.md           # catálogo REA: evidência → decomposição → reconstrução
public/
  og.png                     # banner social 1200×630 (gerado)
  media/guides/<slug>/       # imagens/mp4/gif dos guias
app/icon.svg                 # favicon (marca do logo)
```

---

## Onde estão os elementos visuais e como os alterar

### Logo e marca

| Elemento | Ficheiro | Como alterar |
|---|---|---|
| Logótipo animado (olhos) | `components/brand.tsx` → `AppLogo` | A forma do olho são as duas `<polyline>` (`points`, viewBox 240×240); cores por variante em `styles/tokens.css` (`--atlasbot-logo-production/dev/preview`). Tamanho: quem usa o componente passa `className` (ex.: `.landing-brand-logo`, `.landing-hero-logo`). |
| Palavra "AtlasBot" no header/footer/hero | `components/chrome.tsx`, `components/landing/landing-page.tsx` | Texto `<span>AtlasBot</span>` junto ao `AppLogo`. |
| Favicon | `app/icon.svg` | SVG autónomo (quadrado `rx=50` + olhos); substituir o ficheiro por um novo `icon.svg` para mudar. |
| Banner social `og:` | `public/og.png` (1200×630) | Regenerar com `python3 /home/z/my-project/scripts/atlasbot-brand-assets.py` (edita textos/cores nesse script). Referenciado em `app/[locale]/layout.tsx`. |
| Logótipo dentro do preview | `app/[locale]/app-preview/page.tsx` | SVG inline duplicado na cena. |

### Cores e design tokens

Tudo começa em `styles/tokens.css` — variáveis `--atlasbot-*` (fundo, texto,
botões, sheen do `$0`, glow, logo, durações `--atlasbot-duration-*` e easings
`--atlasbot-ease-*`). Alterar um token muda o site inteiro; nada de cores
hardcoded fora de `--gradient-*` (aurora dos artigos, gerada do título em
`components/content/article-media.tsx`).

### Hero (topo da landing)

`components/landing/landing-page.tsx` + `.landing-hero*` em `styles/landing.css`:

- Chip "NOVO · Disponível em macOS/Windows" — `landing-availability*`.
- Título "Apresentamos ◉ AtlasBot" — `<h1>` com o logo inline (tamanho da
  palavra em `.landing-title`, do logo em `.landing-hero-logo`).
- Descrição com logos dos providers (Codex/Claude/Grok) — chips `.landing-provider`.
- Botões — `HeroDownloadSelector` (split-button com menu) + Contacto.

### Feixe de luz no `$0` (pricing)

Decomposição completa no ponto 1 de **docs/ANIMATIONS.md**. Resumo:
`styles/landing.css` → `.landing-pricing-amount` (3 camadas + `--price-bevel`)
e keyframes `landing-price-enter` (1200ms) / `landing-price-sheen` (14s loop).
Valor do preço: texto + `data-amount` em `PricingSection`. Cores: `--atlasbot-price-*`.

### Cards (download, artigos, plugins)

- **Download:** `.landing-download-card*` (landing.css) — conteúdo em
  `DownloadCardContent`; estado "DISPONÍVEL" do dicionário.
- **Artigos/guias:** `.post-card*` (post.css) + arte `PostGradient` (cor do
  gradiente = hash do título). Entrada em cascata: `--post-card-index × 70ms`.
- **Plugins:** `.plugin-card*` (post.css) — grelha em `plugins-index.tsx`.
- Dimensões: cada grelha define `grid-template-columns` e `aspect-ratio` no CSS
  respetivo.

### Rodapé

`components/chrome.tsx` → `LandingFooter`: colunas/labels/CTA/redes sociais
(paths SVG inline) e **"Feito com ♥ no Brasil"** (`footer.madeBefore/madeAfter`
em `lib/i18n/dictionaries.ts`). Links externos: `ATLASBOT_LINKS` em `lib/site.ts`.

### Idiomas (PT · EN · FR · ES)

- **Strings de UI:** `lib/i18n/dictionaries.ts` (um objeto por língua, tipado).
- **Títulos de artigos/guias:** `lib/i18n/articles.ts` (`NEWS_TITLES`/`GUIDES_TITLES`
  por slug; corpo fica em EN e o aviso `collections.article.notice` aparece em
  pt/fr/es acima da prosa).
- **Adicionar uma língua:** (1) acrescentar ao `locales` em `lib/i18n/config.ts`
  + `LOCALE_LABELS`/`LOCALE_HTML_LANG`/`LOCALE_INTL_TAG`; (2) criar o dicionário
  em `dictionaries.ts`; (3) nada mais — páginas/`generateStaticParams`/switcher/
  middleware/hreflang derivam automaticamente.
- **Roteamento:** `middleware.ts` redireciona `/x` → `/pt/x` (cookie
  `ATLASBOT_LOCALE` memoriza a escolha; `Accept-Language` como fallback).
- **SEO:** hreflang + canonical por página (`alternateLanguages()` em config.ts),
  `<html lang>` por locale, datas formatadas com `Intl`.

### Conteúdos

- Artigos/guias: `content/news.tsx`, `content/guides.tsx` (corpos JSX em EN;
  a mídia vive em `public/media/guides/<slug>/` e muda com o slug).
- Plugins: `content/plugin-catalog.json` (extraído do catálogo real com
  `scripts/extract-plugin-catalog.mjs`).

### Endpoints funcionais herdados (manter ou trocar)

- Downloads (`app/download/[platform]/route.ts`): `REPO = "nightly-labs/openbot"`
  — trocar para o repositório próprio quando o AtlasBot tiver releases.
- Convites (`components/join-card.tsx`): esquema `atlasbot://join?invite=…`
  — alinhar com o protocolo da app desktop.
- Contacto/X: `https://x.com/OpenBot_` em `lib/site.ts`.
- Plugins partilham para `https://openbot.site/plugin/<slug>` (catálogo real).

---

## Animações

Catálogo completo com evidência, decomposição e pontos de alteração:
**[docs/ANIMATIONS.md](docs/ANIMATIONS.md)** (princípio REA — Reverse Engineer
Anything). Resumo: feixe de luz no `$0`, aurora scroll-driven, stagger do hero,
reveal por scroll (IntersectionObserver −40%), sweep dos cards por índice,
coração do rodapé, menu de descarga, handshake do preview com caret a escrever,
logo vivo (blink/eye-tracking/wink/party easter egg), aurora determinística dos
artigos. Tudo respeita `prefers-reduced-motion` — com **exceção ambient** para
os loops de baixa amplitude (feixe do `$0`, coração, blink do logo, drift da
gradiente), que continuam mesmo nesse modo (ver fim de `landing.css`,
`tokens.css` e `post.css`; detalhe em `docs/ANIMATIONS.md`).

**Se o site parecer não animar:** verifica primeiro a definição do sistema
*reduzir movimento* (Windows: *Efeitos de animação*; macOS/iOS: *Reduzir
movimento*) — ela desliga entradas e scroll por acessibilidade — e força um
recarregamento (Ctrl+Shift+R). Para prova objetiva no site publicado:
`node scripts/motion-probe.mjs https://<domínio>` (verifica keyframes no CSS,
`data-revealed` no scroll e movimento real do `$0`/coração por diff de píxeis,
em modo normal e reduzido).

**Round 1 (maquete "Dual-Ecosystem AI Vision"):** logo redesenhado como
triângulo-"A" com gradiente da paleta (expressões Core/Living) e **anel
orbital "Energia"** no hero; **família de 6 personagens** (Guide, Creator,
Builder, Analyst, Flow, Shield) numa nova faixa entre hero e pricing;
**workflows em movimento** no preview (pulso sequencial dos agentes +
pipeline Evidence→Review→Release); paleta em navy profundo com acento
`#2f7bff` + ciano/âmbar. Detalhe em `docs/ANIMATIONS.md`.

## Verificação visual

`scripts/shot-atlas.mjs` (Playwright) captura as páginas chave para
`scripts/shots-atlas/` contra `bunx next start -p 3200`.
