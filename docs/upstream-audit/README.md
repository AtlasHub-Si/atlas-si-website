# PRIMEIRA ENTREGA — Índice

Documentos desta entrega (auditoria upstream, sem alterações de código):

1. [UPSTREAM_AUDIT.md](./UPSTREAM_AUDIT.md) — relatório do repositório original
2. [LICENSE_MATRIX.md](./LICENSE_MATRIX.md) — matriz de licenças e permissões
3. [ARCHITECTURE_PROPOSAL.md](./ARCHITECTURE_PROPOSAL.md) — proposta de arquitetura
4. [RECONSTRUCT_VS_INTEGRATE.md](./RECONSTRUCT_VS_INTEGRATE.md) — reconstruir vs integrar
5. [VISUAL_IDENTITY_PLAN.md](./VISUAL_IDENTITY_PLAN.md) — plano de identidade visual
6. [MODELS_PLAN.md](./MODELS_PLAN.md) — plano de modelos de IA
7. [PHASE_ESTIMATES.md](./PHASE_ESTIMATES.md) — estimativa das fases

## Achado principal
Upstream atual (0.19.0) é **PolyForm Noncommercial** (uso comercial proibido).
Última versão comercialmente utilizável: **0.1.11, Apache-2.0** (commit
`a6fe2402`, 20 ago 2026), confirmada pelo README e pelo histórico do repo.

## Recomendação
Fork da 0.1.11 num repo próprio (`atlas-ai-workforce`, privado), camada AtlasHub
por cima; landing atual mantém-se. Licença comercial do 0.19.0 a negociar em
paralelo se quisermos as funcionalidades novas sem as reconstruir.
