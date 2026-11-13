# AtlasBot — catálogo de animações (princípio REA)

> **REA = "Reverse Engineer Anything"** (github.com/morluto/rea): ver uma feature,
> perceber como funciona ao nível mais baixo — inspecionar, traçar, recolher
> evidência, explicar e só então reconstruir. Este catálogo segue esse princípio:
> cada efeito tem a **evidência** no código do site original
> (`openbot.run/apps/auth-api/src/styles.css`), a **decomposição** (camadas,
> timing, easing, gatilhos) e a **reconstrução** neste repo, com os pontos
> exatos onde cada valor se altera.

Todas as durações/easings abaixo são os valores medidos no original e mantidos
1:1 na reconstrução.

---

## 1. O feixe de luz no Hero — `$0` metálico com sheen

**Evidência (original):** `styles.css` ≈ L1013–1105. O comentário do autor:
*"The figure is three stacked copies of the same two glyphs: a blurred glow
behind, the clipped metal gradient in the middle, and a hairline rim on top."*

**Decomposição:**

| Camada | Construção |
|---|---|
| Glow (trás) | `::before` com `content: attr(data-amount)`, `z-index: -1`, `filter: blur(clamp(24px, 4vw, 56px))`, cor `--atlasbot-price-glow` |
| Corpo (meio) | `color: transparent` + duas gradientes verticais com `background-clip: text` — a de cima é a **banda de luz** (`background-size: 100% 200%`, ocupa 13% da altura, ≈ ¼ do glifo) |
| Relevo (cima) | `--price-bevel = drop-shadow(0 -1px 0 rim) drop-shadow(0 1px 0 rim-under)` — bevel a partir da silhueta renderizada (não `-webkit-text-stroke`, que partia o `$`) |

**Animação (2 fases que se juntam sem salto):**

```css
animation:
  landing-price-enter 1200ms cubic-bezier(0.22, 1, 0.36, 1) 60ms backwards,   /* entrada */
  landing-price-sheen 14s ease-in-out 1260ms infinite alternate;              /* loop    */
```

- `landing-price-enter`: opacity 0→1, `scale(0.94) translateY(16px)`, `blur(16px)→0.001px`, `background-position 0 0% → 0 42%` — **termina exatamente onde o loop começa**.
- `landing-price-sheen`: desliza só a camada da banda (`background-position 0 42% → 0 58%`), 14s ease-in-out, alternado — o corpo metálico por baixo nunca se move. É este o "feixe de luz em movimento".
- A entrada anima `filter`; por isso o bevel vive na variável `--price-bevel` (um keyframe que definisse só `blur()` deixaria cair o relevo durante a entrada).

**Reconstrução:** `styles/landing.css` → `.landing-pricing-amount` (+ `::before`, `--price-bevel`) e os keyframes `landing-price-enter` / `landing-price-sheen` no fim do ficheiro. Gatilho: `data-revealed="true"` via `useLandingReveal` (`components/reveal.tsx`), `data-amount="$0"` em `components/landing/landing-page.tsx` (`PricingSection`).

**Como alterar:**
- Valor do preço: texto em `landing-page.tsx` **e** atributo `data-amount` (têm de ser iguais).
- Tamanho do glifo: `font-size: clamp(8rem, 30vw, 22rem)` em `.landing-pricing-amount`.
- Velocidade/comprimento do feixe: duração no bloco `animation` e as percentagens `42%/58%` em `landing-price-sheen` (o intervalo define o trajeto do feixe).
- Cores do metal e da luz: tokens `--atlasbot-price-*` em `styles/tokens.css`.

---

## 2. Aurora de fecho — `.landing-glow`

**Evidência:** `styles.css` L1314–1330 (`.landing-glow`, `.landing-glow-rise`, `transition: transform var(--landing-glow-rise-ms, 1100ms) cubic-bezier(0.16, 1, 0.3, 1)`).

**Decomposição:** nove barras desfocadas sob uma gradiente partilhada (violeta → azul → verde → violeta, paragens `GLOW_STOPS`); a altura de cada barra segue `1 - distância_normalizada^1.24` entre `VALLEY` (0,55) e `PEAK` (0,98) do viewport do SVG (1271×599, blur 15). O `scaleY` do grupo segue o **progresso de scroll** (`(viewport - top) / height`), com subida de 1100ms e regressão ao repouso após 450ms sem scroll.

**Reconstrução:** `components/landing/glow.tsx` (constantes no topo do ficheiro: `BAR_COUNT`, `BLUR`, `PEAK`, `VALLEY`, `RISE_MS`, `RETURN_DELAY_MS`, `GLOW_STOPS`) + `.landing-glow*` em `styles/landing.css` L1163–1185.

**Como alterar:** número de barras, cores e velocidade nas constantes de `glow.tsx`; máscara/posição no CSS.

---

## 3. Sistema de reveal por scroll — `data-revealed`

**Evidência:** `createLandingReveal.ts` (original) — IntersectionObserver com `rootMargin: "0px 0px -40% 0px"`, `threshold: 0`, dispara uma única vez; `prefers-reduced-motion` revela tudo imediatamente.

**Reconstrução:** `components/reveal.tsx` (`useLandingReveal`) — hook cliente usado por header/footer/pricing/download/cards/CTA. Secções começam com `data-revealed="false"` (opacity 0) e o CSS anima quando passa a `"true"`.

**Como alterar:** a janela de disparo é o `rootMargin` em `reveal.tsx` (mais negativo = revela mais tarde).

---

## 4. Entrada dos cards — sweep por índice

**Evidência:** `landing-download-reveal 760ms cubic-bezier(0.22, 1, 0.36, 1) backwards` (L982, 1089, 1991, 2366, 2793 — cards, eyebrow, nota, colunas) e `landing-download-reveal 720ms` nas variantes mais recentes; atraso da nota de preço: `320ms` (L1089+320).

**Decomposição:** `opacity 0 + blur(6px) + translateY(10px) → visível`. O **stagger** dos grids não vem da animação — vem de `transition-delay: calc(var(--post-card-index) * 70ms)` no CSS (`.post-card`, `.plugin-card`, `.landing-download-card`), índice passado como style inline pelo componente.

**Reconstrução:** keyframes `landing-download-reveal` em `styles/landing.css` L1200; stagger em `.post-card`/`.plugin-card` (procura `--post-card-index`); índices em `collection-page.tsx` / `plugins-index.tsx`.

**Como alterar:** velocidade nos blocos `animation`, ritmo do stagger no `calc(... * 70ms)`.

---

## 5. Rodapé — reveal + coração a bater

**Evidência:** `landing-footer-reveal 900ms cubic-bezier(0.22, 1, 0.36, 1) backwards` (L1303) e `landing-footer-heart 1.8s ease-in-out infinite` (L1295) — o coração escala `1 → 0.84 → 1`.

**Reconstrução:** keyframes L1186/L1248 em `landing.css`; JSX em `components/chrome.tsx` (`LandingFooter`), gatilho `useLandingReveal` no `<footer>`.

**Como alterar:** o texto "Feito com ♥ no Brasil" está nos dicionários (`lib/i18n/dictionaries.ts` → `footer.madeBefore` / `footer.madeAfter`).

---

## 6. Header + hero — entradas em cascata

**Evidência:** `landing-header-enter` (`translateY(10px) → 0`) e `landing-enter` (`opacity + translateY(10px)`), ambas `var(--atlasbot-duration-overlay)`/`var(--atlasbot-ease-out)`.

**Decomposição:** o hero usa `t-stagger` com 4 linhas (`t-stagger-line--1…4`: availability, título, descrição, ações); o componente **re-dispara** a cascata em cada montagem removendo `is-shown`, forçando reflow (`void hero.offsetHeight`) e voltando a adicionar — igual ao original Solid.

**Reconstrução:** `components/landing/landing-page.tsx` (`useEffect` do hero) + `.t-stagger*` e keyframes L1271–1292 em `landing.css`; tokens `--atlasbot-duration-*`/`--atlasbot-ease-*` em `tokens.css`.

---

## 7. Menu de descarga (split-button)

**Evidência:** `landing-download-menu-enter`: `opacity 0, translate(-50%, -4px) → translate(-50%, 0)`, `var(--atlasbot-duration-normal) var(--atlasbot-ease-out) both` (L701). Gera-se a 300ms depois do primeiro paint estável (2× rAF), dá handshake postMessage (`atlasbot:landing-preview-ready` → reveal → `atlasbot:landing-preview-start`) e funde blur entre skeleton e iframe. O menu tem navegação completa por teclado (↑↓ Home End Esc).

**Reconstrução:** `components/landing/download-selector.tsx` + keyframe L1293 em `landing.css`.

---

## 8. Preview interativo (iframe) — skeleton, handshake, caret

**Evidência:** `t-skel-pulse` (opacidade `1 → var(--pulse-min) → 1`), handshake postMessage (no original `openbot:…`, aqui `atlasbot:landing-preview-ready` / `atlasbot:landing-preview-start`), `preview-caret-blink`.

**Reconstrução:** `components/landing/app-preview.tsx` (landing) + `app/[locale]/app-preview/page.tsx` (cena interior: agentes, workstreams, composer que escreve sozinho a 55ms/caracter) + keyframes em `styles/tokens.css` L207 e `styles/preview.css` L262.

**Como alterar:** o texto escrito no composer é `FULL_TEXT` na página do preview; os agentes/workstreams estão nas constantes `AGENTS`/`WORKSTREAMS` do mesmo ficheiro.

---

## 9. Logótipo vivo — blink, olhos que seguem, wink, party

**Evidência:** `packages/brand/src` do original; keyframes `app-logo-blink`, `app-logo-wink-left/right`, `app-logo-party-colors/left/right` (tokens.css L207–300).

**Decomposição:**
- **Blink:** as duas polylines (olhos) comprimem-se verticalmente em ciclo.
- **Eye tracking:** `pointermove` normaliza o cursor para `-1…1` e define `--app-logo-eye-x/y` (`x*2.4%`, `y*1.8%`) no SVG.
- **Wink on click:** `data-click-reaction="wink"` por 360ms.
- **Party easter egg:** 5 cliques em <900ms → `data-easter-egg="party"` por 1200ms (olhos mudam de cor alternadamente).

**Reconstrução:** `components/brand.tsx` (`AppLogo`) — o desenho são duas `<polyline>` com pontos fixos; a cor do quadrado/olhos vem de `data-variant` (`production` roxo, `dev`, `preview` — tokens `--atlasbot-logo-*`).

**Como alterar:** forma do olho = editar os `points` das polylines (viewBox 240×240); cores = tokens; easter egg = limiar `rapidClicks.length < 5` e janela 900ms em `brand.tsx`.

---

## 10. Gradientes dos artigos/cards — aurora determinística

**Evidência:** o original usava um canvas WebGL por artigo; a reconstrução reproduz o efeito com CSS puro: `post-gradient-drift` (`styles/post.css` L269) desloca uma aurora em `background-position`.

**Decomposição:** `titleHues(title)` faz hash determinístico do título → 3 matizes (`h, h+42, h+205`) com saturações fixas (42/55/45%) → variáveis `--gradient-a/b/c`. Mesmo título = mesmo gradiente, em todas as páginas.

**Reconstrução:** `components/content/article-media.tsx` (`PostGradient`) + `.post-gradient`/`.post-card-art` em `styles/post.css`.

**Como alterar:** paleta em `PALETTE_SATURATIONS`; velocidade em `post-gradient-drift`; dimensionamento dos cards em `.post-card` (grid + `aspect-ratio`).

---

## 11. Diálogo de plugin (reservado)

`plugin-dialog-enter` (`scale(0.97) translateY(6px) → none`, `--atlasbot-duration-overlay`) está portado em `landing.css` L1293+ mas ainda sem rota que o use — disponível para futuras fichas de plugin.

---

## Movimento reduzido

`app/globals.css` desliga globalmente animações/transições sob `prefers-reduced-motion: reduce` (0.01ms); `reveal.tsx`, `glow.tsx`, `brand.tsx`, `article-media.tsx` e o handshake do preview respeitam a media query individualmente e entregam o estado final imediatamente.
