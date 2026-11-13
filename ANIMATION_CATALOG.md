# ANIMATION_CATALOG.md — catálogo de animações observadas (openbot.run)

> Nomes originais listados como evidência; implementação Atlas usa nomes
> `atlas-*` com código próprio.

## Header / navegação
| Nome observado | Comportamento inferido | Recriação Atlas |
|---|---|---|
| `site-nav-panel-enter` | mega-panel dropdown ao abrir submenu | `atlas-panel-in` — opacity+translateY(-6px→0), 180ms ease-out |
| `site-nav-panel-leave` | fecho do panel | `atlas-panel-out` — 140ms ease-in |
| `landing-header-enter` | header entra no load | `atlas-header-in` — translateY(-100%→0), 240ms |

## Hero
| `landing-hero-in` | H1 e subheadings entram sequencialmente | `atlas-hero-in` — opacity 0→1 + translateY(24px→0), 600ms, delay 80ms por elemento |
| `landing-typing` | texto digitado no preview | `atlas-typing` — width via steps(), caret piscando |
| `landing-network-word` | palavras trocam no hero | `atlas-word-swap` — rotação de palavras 2s |

## Workflow (diagrama animado)
| `landing-workflow-draw` | linhas do diagrama desenhadas | `atlas-wf-draw` — stroke-dashoffset 800→0, 1s |
| `landing-workflow-active/running/progress/spin/port/pop/press/rise/out` | estados do nó ativo, pulso, rotação, pop | `atlas-wf-*` equivalentes (pulse scale 1→1.06, spin 1.2s linear) |

## Cards / preço
| `landing-price-enter` | cards de preço entram | `atlas-price-in` — translateY(16px→0)+opacity, 300ms |
| `landing-price-sheen` | brilho desliza no card "best value" | `atlas-sheen` — gradiente 120% translateX -100%→200%, 2.4s loop 4s |
| `landing-marquee` | faixa rolante | `atlas-marquee` — translateX 0→-50%, linear, ~30s |

## Mascote / logo
| `app-logo-blink/look-around/surprised/wink-*/party-*` | olhos do mascote piscam, olham, festa | `atlas-mascot-blink/look/party` — keyframes em transform de elementos de olho (own SVG) |

## Outros
| `landing-download-reveal/menu-enter` | menu de plataformas | `atlas-menu-in` |
| `landing-footer-reveal` | footer revela ao scroll | `atlas-reveal` via IntersectionObserver (threshold 0.15) |
| `landing-footer-heart`, `landing-lock-click`, `t-skel-pulse` | microinterações | `atlas-*` equivalentes |

## Parâmetros base medidos
- durations: fast 120ms, toast 340ms; ease global `ease-in-out`; `--reveal-ease`.
- Scroll-triggered: seções abaixo do fold com reveal on-scroll.
- Hover: superfícies `#ffffff0f`, 160ms color transitions.
