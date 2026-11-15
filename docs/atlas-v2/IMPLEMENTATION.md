# Atlas-SI Website V2.0 — implementação
Missão #8 e GO explícito de produção do proprietário em 2026-11-15.

## Implementado
- Landing React real: Hero, Cosmos/Earth, família de seis mascotes, workflow com play/pause/restart/step/aprovação humana, conversas e dashboard, soluções, possibilidades de integração, Harness, princípios, CTA, downloads e contacto.
- As seis mascotes são estáticas. AtlasMascot mantém estados futuros mas motionEnabled só aceita false.
- Masters e maquete intactos. 6/6 fontes verificadas; A transparente verificado por SHA. WebP locais; nenhum Drive/GitHub privado/CDN temporário em runtime.
- Recorte artístico da cena empresarial derivado da maquete, sem texto/UI no recorte. Atmosfera/energia PNG candidatas não utilizadas: efeitos CSS controlados e estáticos; Earth com máscara para excluir pixels soltos.
- Referência atual e PR #5 têm bytes diferentes, mas comparação RGB normalizada deu diferença 0 (1086×1448).
- PT/EN/FR/ES, navegação mobile, rotas editoriais, plugins e convites preservados. Instalação e deep links indisponíveis enquanto não há aprovação.
- Formulário prepara mailto localmente, com validação e confirmação. Não há entrega transacional ou armazenamento de leads; isto é indicado na interface.
- Canonical/hreflang no domínio www.atlas-si.com, Open Graph, favicon, sitemap e robots. Preview /[locale]/v2-preview noindex.
- Sem testemunhos fictícios, números de clientes sem evidência ou integrações apresentadas como já ativas.
- Segurança de downloads da PR #7 integrada e reforçada. PR #5 do website revista; staging substituído por integração direta dos mesmos masters verificados.

## Dependências e build
Next.js 15.5.29 fixado; npm ci usa package-lock. PostCSS 8.5.33 via override corrige as vulnerabilidades transitivas detetadas. Nenhuma migração de framework major.
O build reduz paralelismo a um worker e usa webpackMemoryOptimizations, compatível com o ambiente Windows de 8 GB e com CI/Vercel.
npm test, npm run typecheck, npm run build e npm audit --omit=dev são as verificações reprodutíveis. A CI repete os checks sem segredos.
scripts/qa-atlas-v2.cjs testa browser real, responsividade, quatro idiomas, navegação, workflow, contacto, rotas e downloads.
As capturas longas são montadas a partir de screenshots de viewports reais consecutivos para evitar omissões de texturas transparentes no screenshot fullPage do Chromium. O conteúdo não é alterado.

## Diferenças intencionais da maquete
- Navbar com idiomas e alvos funcionais, áreas de toque/legibilidade maiores.
- CTAs direcionam à demonstração/contacto; downloads explicitamente Em breve.
- Dashboard/workflows rotulados demonstração; dados determinísticos, sem alegação de execução produtiva.
- Prova social fictícia substituída por princípios verificáveis.
- Secções funcionais de downloads/contacto e rodapé adicionadas.
- Mobile é adaptação responsiva: não existia maquete mobile homologada.
- Não se declara equivalência pixel a pixel.

## Pendências de produto
- Instaladores públicos homologados e registo ATLASBOT_RELEASE_APPROVAL.
- Rotação terrestre física e motion de personagens (fora da primeira versão estática).
- Agentes/workflows produtivos, conectores efetivos e integrações com backend dependem de projetos próprios.
- Envio transacional do contacto/CRM não configurado; fluxo mailto funcional é o modo atual.
- Safari/iOS real não disponível no ambiente de validação; não declarar teste executado.

## Publicação e rollback
Projeto Vercel verificado: prj_WcDhAZMv04Bgf8qA4mxoOhAmSzEz, equipa team_suBx0K2u8eAk3uAGPzJmhQOg.
atlas-si.com redireciona 308 para www.atlas-si.com, ambos no projeto existente. Não houve alteração de DNS nem criação de outro projeto.
Vercel preview permanece protegido; testes usam acesso temporário, sem desligar a proteção.
Checkpoint de segurança independente: fe39749 (após os três commits da PR #7).
O antigo deployment dpl_FiZSoXpHSrfwXxUYSUns3tVnSywg ainda contém o resolver upstream: não fazer rollback cego para essa versão. Numa reversão visual, preservar o resolver/estado indisponível deste checkpoint e validar antes de promover.
O relatório final de execução regista deployment, SHA efetivo, URL e testes pós-publicação; este documento não é prova de publicação por si só.
