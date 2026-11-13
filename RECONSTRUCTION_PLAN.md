# RECONSTRUCTION_PLAN.md — Atlas-SI (réplica de referência do openbot.run)

> Laboratório de referência. **Não é o produto final.** Nada de assets/textos
> protegidos da OpenBot é copiado: estrutura, layout, tokens e animações são
> recriados; textos usam placeholders posicionais `[REF]` até a fase de adaptação.
> Ver LICENSE_AND_ATTRIBUTION.md.

## Papéis (execução multiagente via passos sequenciais — só a Helena existe hoje)

| Papel | Status | Entrega |
|---|---|---|
| Web Researcher | ✅ rodada 1 | CLONE_SPEC.md, extração de rotas e conteúdo |
| UX Architect | ✅ rodada 1 | NAVIGATION_MAP.md, mapa de seções |
| UI Designer | 🔄 em curso | DESIGN_SYSTEM.md |
| Frontend Developer | 🔄 em curso | Home + layout global |
| Animation Specialist | 🔄 em curso | ANIMATION_CATALOG.md |
| QA Engineer | ⬜ | VISUAL_QA.md (lado a lado) |
| Project Manager | Helena-Atlas | coordenação |

## Fases

- **FASE 1 — Deep research** ✅ parcial: rotas mapeadas (CLONE_SPEC.md), home
  dissecada (seções, variáveis CSS, keyframes, tipografia). Falta: captura
  desktop+mobile por página (screenshots ficam fora do repo, que está público).
- **FASE 2 — Asset discovery** ✅ v1: ASSET_INVENTORY.md. Sem reuso de assets
  OpenBot; equivalentes criados do zero.
- **FASE 3 — Design system extraction** ✅ v1: DESIGN_SYSTEM.md.
- **FASE 4 — Reconstruction** 🔄: ordem = Home → navegação global → Teams →
  Pricing → Providers → Marketplace → Guides/News → Compare → Download/Contact.
- **FASE 5 — Visual QA** ⬜.

## Restrições registradas

- Repo público: **nenhum asset/texto OpenBot entra no repo**; screenshots de
  referência ficam no ambiente local apenas. Para fase com assets de terceiros,
  tornar o repo privado (requer permissão de Administração no token GitHub —
  hoje só tenho Contents read/write).
- Deploy atual fica no preview `atlas-si-website.vercel.app`; domínio definitivo
  só após revisão de licenciamento.
