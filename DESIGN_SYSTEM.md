# DESIGN_SYSTEM.md — tokens extraídos de openbot.run (uso de referência)

> Valores **medidos** (computed styles, 13 nov 2026, desktop 1280×715).
> Nomes de variáveis Atlas escolhidos para não copiar a marcação da OpenBot.

## Cores observadas

| Token Atlas | Valor medido | Onde |
|---|---|---|
| `--atlas-bg` | `rgb(26,26,26)` = #1a1a1a | body |
| `--atlas-bg-raised` | `#141414` (sheets/painéis) | variável de root |
| `--atlas-text` | `rgb(255,255,255)` | body |
| `--atlas-text-muted` | `rgb(151,151,151)` | links/CTA secundários |
| `--atlas-text-placeholder` | `#bfbfbf` | placeholders |
| `--atlas-accent` | `#007cf7` | accent (soft `#007cf729`, strong `#007cf757`) |
| `--atlas-danger` | `#fd2f3b` (text `#ff6069`) | erros |
| `--atlas-hover` | `#ffffff0f` | hover de superfície |
| `--atlas-border` | `#14141424` | bordas on-light |
| `--atlas-series-grok` | `#6bc7d9` | cor de série de gráfico |
| `--atlas-price-sheen` | `#96c4ffeb` | brilho de card de preço |

## Tipografia

- Fonte: **Inter Variable** (100–900) + fallback de sistema. Mono: ui-monospace stack.
- Body: 16px / 24px line-height / weight 400.
- H1 desktop: **~101px / 97px line-height / weight 500 / letter-spacing −6.578px** (~−6.5%).
- CTA/nav: 13px, weight 500, tracking −0.13px.
- Tokens de texto do sistema: `--text-md 13px`, `--text-xl 16px`, `tracking-wide .02em`.

## Forma e dimensões

- CTA pílula: `border-radius 999px`.
- Controle padrão: 40px (`control-xl`).
- Scrollbar: 8px. Escala de espaço: 2px base (`space-0-5`).
- Durações de movimento: fast `120ms`, toast-enter `340ms`, ease `ease-in-out`.

## Seções da home (ordem observada, 11.249px de altura)

1. Header (logo, News, Guides, Compare, Plugins, Resources▾, For Teams, Pricing, idioma▾, Download/App)
2. Hero "Meet OpenBot" (H1 gigante, sublinhado de modelos, CTA de download por plataforma + Contact)
3. Preview interativo do app (mockup com sidebar, agentes, chat, tasks)
4. Blocos "What OpenBot does" (3×)
5. "Free for personal use"
6. "OpenBot for Teams" (4 cards)
7. "Questions" (FAQ)
8. Download (macOS/Windows/Linux/iPhone/Android)
9. Footer 4 colunas + redes

## Animações (catálogo de nomes reais; recriação própria)

`landing-hero-in`, `landing-header-enter`, `landing-typing`, `landing-marquee`,
`landing-workflow-draw/active/running/out/pop/press/rise/progress`,
`landing-download-reveal/menu-enter`, `landing-price-enter/sheen`,
`landing-footer-reveal/heart`, `landing-network-word`,
`app-logo-blink/look-around/surprised/wink-left/right/party-*` (mascote),
`site-nav-panel-enter/leave`, `teams-pill-turn/hop/sheen`,
`teams-timeline-fill/spark-x`, `teams-step-pop`, `t-skel-pulse`.

Implementação Atlas: CSS keyframes próprios com nomes `atlas-*`, gatilhos por
IntersectionObserver, durações 120–340ms base e eases `ease-in-out`/`cubic-bezier`.
