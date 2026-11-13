# ASSET_INVENTORY.md — inventário de assets do site de referência

> Política: **nenhum ficheiro da OpenBot é copiado** para este repo.
> Cada item de terceiros tem um equivalente criado do zero na mesma posição,
> dimensão e função. Screenshots de referência ficam fora do repo (público).

| # | Asset observado | Tipo | Licença | Decisão Atlas |
|---|---|---|---|---|
| 1 | Logo mascote (SVG animado: blink, wink, party) | SVG | © OpenBot | Recriado como SVG próprio (atlas-logo) com animações equivalentes |
| 2 | Ícones de plugins (`/plugins/icon/<slug>`, 180×180) | PNG remoto | © terceiros | Não reusados; ícones genéricos próprios |
| 3 | Fonte Inter Variable | Fonte | **OFL (open source)** | ✅ Reutilizável — self-host via @fontsource/inter |
| 4 | Screenshots/mockup do app na home | SVG/HTML | © OpenBot | Recriado como mockup HTML próprio (estrutura igual, conteúdo placeholder) |
| 5 | Ícones utilitários (setas, chevrons, check) | SVG | funcionais | Recriados (formas simples, sem proteção) |
| 6 | Imagens de secções/news (cards) | PNG | © OpenBot | Placeholders próprios nas mesmas posições |
| 7 | Marquee de logos parceiros | SVG | © terceiros | Marquee próprio com nomes de texto |

## Fontes

- `document.fonts` / @font-face: "Inter Variable" (100–900) — Open Font License.
- Todo o resto: sem `@font-face` custom.

## Notas de licenciamento

- openbot.run: código-fonte público em `nightly-labs/openbot`; site e assets
  protegidos por © — reuso exige autorização.
- Repos de referência (morluto/rea, REAP, agency-agents): MIT — sem problema.
- Qualquer asset de terceiros só entra em repo **privado** após confirmação de
  licença (ver RECONSTRUCTION_PLAN.md §Restrições).
