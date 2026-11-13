# PROPOSTA DE ARQUITETURA DE INTEGRAÇÃO

## 1. Decisão de repositórios (com vantagens e implicações)

### Opção A — Tudo em `atlas-si-website` (monorepo)
- ✅ um só repo, um só pipeline.
- ❌ mistura landing pública com produto Electron; histórico de licenças
  diferentes no mesmo repo (Apache-2.0 vs nosso); builds pesados (Electron,
  mobile) atrasam o deploy do site; risco de vazar código indevidamente.

### Opção B — Dois repos (recomendada)
- `AtlasHub-Si/atlas-si-website` → landing/institucional (Astro, atual, intacto).
- `AtlasHub-Si/atlas-ai-workforce` → produto, fork Apache-2.0 do upstream 0.1.11.
- ✅ licenças isoladas, CI/CD independentes, histórico de proveniência claro,
  permissões de acesso diferentes (produto pode ser privado).
- ❌ dois pipelines, sincronização de design tokens a gerir.

### Opção C — Fork no GitHub + submodule
- ✅ atualização controlada do upstream via remote.
- ❌ submodule complica CI e Vercel; Git LFS/binários; mais fricção para equipas.

**Recomendação: Opção B.** O nome `atlas-ai-workforce` é adequado, mas a
decisão final é vossa (implica criar repo novo e permissões).

## 2. Estrutura proposta do repo de produto

```
atlas-ai-workforce/
├── upstream/                  # espelho 0.1.11 (Apache-2.0) — NÃO editar
│   └── PROVENANCE.md          # origem, commit a6fe2402, data, licença
├── atlas/                     # camada AtlasHub (nossas extensões)
│   ├── design-system/         # tokens, tema, componentes próprios
│   ├── brand/                 # logo 3D, avatares, animações
│   └── features/              # funcionalidades próprias
├── docs/
└── scripts/
```

- **Upstream preservado**: cópia em `upstream/` ou branch `upstream/0.1.11`.
- **Branch de integração**: `atlas/main`; releases `atlas/vX`.
- **Separação**: regra de lint/CI que impede editar `upstream/` exceto por
  script de atualização.
- **Atualização controlada**: `scripts/sync-upstream.sh` aplica patches e
  registra diff em `docs/upstream-diff/`.
- **Proveniência**: cada ficheiro derivado tem cabeçalho ou entrada em
  `PROVENANCE.md`.

## 3. Alternativa de integração sem fork (se licença comercial for obtida)

Com licença comercial do 0.19.0: fork direto do HEAD, com temas/plugins
AtlasHub por cima — muito menos trabalho, mas custo de licença e dependência
do fornecedor.

## 4. O que NÃO fazer

- Não apagar nem substituir a reconstrução atual (`RECONSTRUCTION_PLAN.md` continua válido).
- Não publicar a app com marca "OpenBot" nem sugerir parceria não confirmada.
- Não fazer merge de código PolyForm NC no repo comercial.
