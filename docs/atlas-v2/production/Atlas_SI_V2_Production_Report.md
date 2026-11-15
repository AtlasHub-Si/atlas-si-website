# Atlas-SI.com V2.0 — relatório de produção

**PRODUÇÃO PUBLICADA — 15 novembro 2026.**

Website funcional: https://www.atlas-si.com/pt . https://atlas-si.com redireciona para www por HTTP 308.

## Publicação efetiva

| Campo | Valor |
|---|---|
| Repositório existente | AtlasHub-Si/atlas-si-website |
| Branch publicada | main |
| Commit publicado | af45df4a78f418d377522c0eb9952a47ec8207ef |
| Branch de implementação | feat/atlas-si-immersive-v2-work |
| Head da implementação | d8c63d7c9f5812664748d8fe9ffe8e288c17d437 |
| PR integrada | https://github.com/AtlasHub-Si/atlas-si-website/pull/9 |
| Projeto Vercel existente | atlas-si-website — prj_WcDhAZMv04Bgf8qA4mxoOhAmSzEz |
| Deployment de produção | dpl_HyUtJ8nY6JrN9rVXPd7EkTxgDcye — READY |
| Inspeção Vercel | https://vercel.com/atlas-hub1/atlas-si-website/HyUtJ8nY6JrN9rVXPd7EkTxgDcye |
| URL do deployment | https://atlas-si-website-3hr6qbq9u-atlas-hub1.vercel.app |
| CI no commit main | https://github.com/AtlasHub-Si/atlas-si-website/actions/runs/43683913820 — SUCCESS |

O deployment Vercel associa explicitamente este SHA à branch main e aos aliases atlas-si.com e www.atlas-si.com. A homepage pública devolveu HTTP 200 com marcador visual 2.0.0. Projeto, variáveis e domínio foram verificados antes da publicação. Não houve alteração de DNS, credenciais ou políticas de proteção. Os acessos temporários de preview foram revogados.

## Implementação entregue

- Landing Next.js/React com hero, cosmos/Terra, família, workflows, dashboard, conversas, soluções, integrações, Atlas Harness, princípios, CTA, downloads, contacto e rodapé.
- Seis mascotes e marca aprovadas estáticas; masters preservados. Fontes 6/6 verificadas, WebP responsivos locais, sem dependências de URLs privadas/temporárias no runtime.
- Textos, painéis, gráficos, cartões e workflows são componentes HTML/React/SVG independentes. A maquete não é usada como screenshot de fundo do site inteiro.
- Workflow demonstrativo determinístico com iniciar/pausar/avançar/reiniciar e aprovação humana. Não chama agentes de produção.
- PT/EN/FR/ES, navegação mobile por teclado, CTAs funcionais, guias/notícias/plugins/convites preservados.
- SEO: canonical/hreflang, Open Graph, favicon aprovado, robots e sitemap. Preview separado noindex.
- Contacto com validação e preparação de e-mail local (mailto); a interface explica que não envia nem guarda dados no website.
- Segurança da PR #7 integralmente integrada e reforçada; dependências de produção auditadas.

## Fidelidade visual e estado dos ingredientes

Referência vertical 1086×1448 e Visual Reference Kit verificados; os bytes de duas cópias diferiam, mas a comparação RGB normalizada resultou em diferença zero. Fontes e derivados estão mapeados em docs/atlas-v2/assets-manifest.json, com dimensões, hashes, origem e estado.

A composição, paleta azul/ciano/violeta, hierarquia AtlasBot/Atlas Harness, seis identidades e ordem das secções foram mantidas. A comparação referência/implementação encontra-se no pacote de evidências. Não se declara equivalência pixel a pixel.

Diferenças deliberadas: legibilidade e espaçamento acessível; idiomas na navegação; rotulagem DEMONSTRAÇÃO; prova social fictícia substituída por princípios; secções funcionais de contacto/download; adaptação mobile própria. Não existia maquete mobile homologada.

Os fundos candidatos não foram promovidos artisticamente a FINAL. Atmosfera e energia PNG com alterações necessárias não entram em produção: usam efeitos CSS estáticos documentados. Terra usa poster estático com máscara para excluir pixels soltos. Cena Harness deriva de recorte da maquete sem texto/painéis rasterizados. Não há vídeo, rotação terrestre física ou animação de mascote nesta versão.

## Testes realizados

| Verificação | Resultado |
|---|---|
| Build Next.js 15.5.29 | PASS — 86 páginas |
| TypeScript | PASS |
| Testes de segurança dos downloads | PASS — 9/9 grupos |
| npm audit --omit=dev | 0 vulnerabilidades |
| CI do commit de produção | SUCCESS |
| Chrome local e preview Vercel | PASS |
| Edge preview Vercel | PASS |
| Chrome no domínio público | PASS, 2026-11-15 06:10–06:11 UTC |
| Larguras | 1440, 1086, 1024, 768 e 390 px |
| Idiomas | PT/EN/FR/ES em 390 e 1440 px |
| Rotas no domínio público | 52 verificações PASS |
| Interações no domínio público | 14 verificações PASS |
| Overflow horizontal / imagens quebradas / erros JS | Nenhum detetado |
| axe WCAG A/AA/2.1 AA, 1440 e 390 px | 0 violações detetadas |

Navegação, Escape/foco do menu, etapas/play/pause/restart, checkpoint humano, formulário validado sem envio, indisponibilidade real e ativação futura simulada da UI passaram. O mock de ativação não publicou nem descarregou instaladores.

Primeiro carregamento desktop público observado: LCP 1392 ms, CLS 0, transferência 886191 bytes (~865 KiB). Medição sintética sem throttling; os viewports seguintes reutilizam cache. Não equivale a Core Web Vitals de campo nem a auditoria Lighthouse completa. A análise axe não constitui certificação WCAG ou teste completo de leitor de ecrã. Safari/iOS real e dispositivos físicos não estavam disponíveis e não foram testados.

## Auditoria dos downloads

**Nenhum botão de download utiliza o OpenBot original. Nenhum instalador interno ou artefacto GitHub Actions foi publicado.**

O repositório oficial não devolveu releases públicas na consulta final. ATLASBOT_RELEASE_APPROVAL está ausente em produção. O Canary AtlasBot-0.70.0-x64.exe continua fora do website.

| URL pública auditada | Resultado atual | Location |
|---|---|---|
| https://www.atlas-si.com/api/downloads | Windows/macOS/Linux indisponíveis | Nenhuma URL de binário |
| https://www.atlas-si.com/download/windows | HTTP 503, página amigável | Ausente |
| https://www.atlas-si.com/download/macos | HTTP 503, página amigável | Ausente |
| https://www.atlas-si.com/download/linux | HTTP 503, página amigável | Ausente |
| https://www.atlas-si.com/download/plan9 | HTTP 404 | Ausente |

A interface deteta Windows/macOS/Linux, permite seleção e mostra Em breve sem iniciar download. Não há fallback para nightly-labs/openbot, builds não assinados, Actions ou links quebrados de binários.

Única origem de binários autorizada: https://github.com/AtlasHub-Si/Atlas-Bot-Desktop/releases/download/{tag}/{asset}

O servidor valida HTTPS, github.com, ausência de credenciais/porta imprópria/query/fragmento e caminho exato do repositório oficial. Exige release ID/tag homologados, pública/estável/publicada, asset ID/nome exatos, upload concluído, tamanho positivo e digest SHA-256 esperado. Bloqueia drafts/prereleases/Canary, substituição de assets, URL externa e erro/timeout/rate limit da API. Sem aprovação não consulta GitHub.

## Ativação futura preparada

1. A equipa AtlasBot publica uma release pública estável e homologada no repositório oficial.
2. Verifica externamente assinatura/notarização, identidade do editor, bytes/checksum e atualização da aplicação por plataforma.
3. Regista em ATLASBOT_RELEASE_APPROVAL no Vercel o repositório, releaseId, tag, homologated:true e assets com id, name, sha256, signatureVerified:true e updaterVerified:true.
4. Faz redeploy para aplicar a configuração. A landing não exige nova implementação. Plataformas sem aprovação continuam indisponíveis.
5. O resolver confirma os metadados na API oficial e ativa apenas o link local /download/{platform} correspondente. Mudança ou falha de API mantém o comportamento fechado.

Os flags de assinatura/updater registam validação externa; o website não executa Authenticode/notarização. O mecanismo foi testado com dados de releases aprovadas e cenários de rejeição, não com um instalador público real ainda inexistente. Instruções completas e revogação: docs/atlas-v2/DOWNLOADS.md.

## Pendências e limites

- Instaladores públicos homologados e respetivo registo de aprovação.
- Backend real de agentes, workflows e conectores; o que se vê hoje são demonstrações rotuladas e possibilidades de integração.
- Envio transacional/CRM do contacto; hoje prepara e-mail na aplicação do visitante.
- Motion de personagens e rotação terrestre física, adiados.
- Validação adicional em Safari/iOS real e eventual aprovação artística final dos fundos candidatos.

## Rollback seguro

Não promover cegamente o antigo deployment que contém o resolver upstream. Preservar as proteções de downloads; checkpoint de segurança independente fe39749. Reverter a camada visual mantendo o resolver seguro, validar preview/build/testes e só depois promover. Não alterar os masters.

## Evidências incluídas

Capturas finais públicas desktop/mobile e demais larguras, relatório JSON de produção, relatórios local/preview/Edge, comparação visual, manifesto de assets e documentação técnica. Capturas longas montadas apenas a partir de screenshots consecutivos do navegador para evitar omissão de texturas no fullPage Chromium; o conteúdo não foi editado.

Os ficheiros de entrega têm dimensões/formato/SHA-256 em delivery-manifest.json. O ZIP inclui a versão exata deste relatório e as evidências, sem tokens ou ficheiros de autenticação.
