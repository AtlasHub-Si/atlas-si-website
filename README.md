# Atlas-SI Website V2.0

**Produto:** Atlas-SI.com — portal institucional AtlasHub.SI / AtlasBot / Atlas-Harness  
**Organização:** ATLAS GLOBAL TECH LTD  
**Framework:** Next.js 15.5.29, React 19, TypeScript  
**Idiomas:** PT / EN / FR / ES  
**Website indicado como produção:** https://www.atlas-si.com

> **Contrato operacional atual.** A documentação do website original encontra-se preservada em
> [docs/archive/ATLAS_WEBSITE_LEGACY_README_20261116.md](docs/archive/ATLAS_WEBSITE_LEGACY_README_20261116.md).
> Comandos, nomes de serviços e URLs dessa versão histórica **não devem ser utilizados em produção**.

## O que está implementado

- Landing Atlas-SI V2 com seis mascotes estáticas, apresentação da arquitetura Atlas, demonstração de workflows e navegação localizada.
- A marca, imagens e masters aprovados são geridos separadamente; não substituir artes com conteúdo herdado sem validação.
- Página de downloads AtlasBot controlada por um **registo de aprovação explícito de release**, sem fallback para a distribuição do projeto original.
- Referências legais separadas: `/pt/terms` (e EN/FR/ES) distingue documentos do operador de origem de termos próprios Atlas; `/pt/privacy` cobre **somente o website institucional e a demonstração**.
- O formulário de contacto abre a aplicação de email do visitante; não constitui um serviço CRM nem entrega transacional automática.

## Operação e desenvolvimento

```sh
npm ci
npm test
npm run typecheck
npm run build
npm run dev
```

Para testar a build de produção localmente: `npm start`. A aplicação de QA está em `scripts/qa-atlas-v2.cjs`; a documentação de homologação e evidência encontra-se em `docs/atlas-v2/`.

## Distribuição oficial AtlasBot — fail closed

- Sem `ATLASBOT_RELEASE_APPROVAL`, `/api/downloads` apresenta Windows/macOS/Linux indisponíveis e `/download/{windows|macos|linux}` devolve HTTP 503 em vez de um instalador.
- A release deve pertencer exclusivamente a `AtlasHub-Si/Atlas-Bot-Desktop`, estar publicada como estável e conter assets exatos, SHA-256 e evidências de assinatura e atualização previamente aprovadas.
- O website confirma dados da release contra a GitHub API, mas **não executa a assinatura de código nem certifica a cadeia de proveniência**.
- Não aprovar binários apenas porque o GitHub Actions produziu um artefacto; nenhum build Canary, interno ou não assinado deve ficar disponível publicamente.
- Nenhuma página Atlas deve enviar visitantes para downloads, suporte ou perfis sociais do operador original, salvo links históricos **explicitamente atribuídos nas páginas legais**.

**Referência vinculativa:** [docs/atlas-v2/DOWNLOADS.md](docs/atlas-v2/DOWNLOADS.md), `lib/atlasbot-releases.ts`, `app/download/[platform]/route.ts` e `tests/downloads.test.cjs`.

## Organização principal

| Localização | Responsabilidade |
| --- | --- |
| `components/atlas/`, `styles/atlas-v2.css` | Interface V2 e identidade institucional |
| `lib/i18n/atlas-v2.ts` | Conteúdo V2 localizado |
| `lib/site.ts` | Links públicos Atlas e plataforma de downloads |
| `lib/atlasbot-releases.ts` | Aprovação e resolução estrita de releases AtlasBot |
| `app/download/[platform]/route.ts` | Redirecionar apenas para uma release aprovada; negar por omissão |
| `app/[locale]/terms`, `privacy`, `credits` | Delimitação jurídica, privacidade do website e atribuições |
| `tests/` | Regressões de downloads, URLs e atribuição |

## Limites de responsabilidade

Este repositório **não** cria o instalador AtlasBot nem gere AWS AtlasCloud, contas GWD, Signal/TURN ou o runtime Hermes. São sistemas separados, com gates específicos de segurança, orçamento, licenciamento, testes e autorização de deploy.

Não interpretar avaliações antigas, previews ou relatórios históricos como prova de readiness atual. Os relatórios em `docs/atlas-v2/QA.md` correspondem à build, ambiente e data neles indicados.

## Documentação

- [Implementação, arquitetura visual e rollback](docs/atlas-v2/IMPLEMENTATION.md)
- [Homologação e ativação dos downloads](docs/atlas-v2/DOWNLOADS.md)
- [QA de aceitação](docs/atlas-v2/QA.md)
- [Proveniência e especificações herdadas — arquivo](docs/archive/ATLAS_WEBSITE_LEGACY_README_20261116.md)
