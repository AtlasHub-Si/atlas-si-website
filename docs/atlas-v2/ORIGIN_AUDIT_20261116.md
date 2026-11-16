# Atlas-SI V2 — registo de resíduos e fronteiras de proveniência

**Data:** 2026-11-16  
**Repositório:** `AtlasHub-Si/atlas-si-website`  
**Estado:** auditoria estática de código e documentação, sem deploy nem publicação de instaladores.

## Decisão editorial

O website institucional **Atlas-SI V2** é o ponto público oficial da
**ATLAS GLOBAL TECH LTD**. A origem histórica do código pode ser atribuída
com transparência, mas não pode determinar os links de produto, distribuições
binárias, operadores, credenciais ou Termos do AtlasBot.

## Evidências recolhidas nos ficheiros atuais

| Área | Ficheiro | Verificação |
| --- | --- | --- |
| Downloads | `lib/atlasbot-releases.ts` | Apenas `AtlasHub-Si/Atlas-Bot-Desktop`, aprovação `ATLASBOT_RELEASE_APPROVAL`, identidade do asset, SHA-256, verificação declarada de assinatura e updater; falha fechada |
| Download HTTP | `app/download/[platform]/route.ts` | 503 para plataformas suportadas sem release homologada; 404 para plataforma desconhecida |
| Landing V2 | `components/atlas/atlas-landing.tsx` / `components/atlas/downloads.tsx` | Identidade Atlas; seleção de plataforma subordinada à aprovação de release |
| Links de produto | `lib/site.ts` | Repository e releases Atlas; não usa releases do operador original como destino de instalação |
| Convites | `components/join-card.tsx` | O protocolo `atlasbot://` está documentado como contrato futuro; os links de abrir a app ficam dependentes da disponibilidade do instalador |
| SEO V2 | `app/[locale]/layout.tsx` | Metadados Atlas e imagem social própria `/og.png` |
| Créditos | `app/[locale]/credits/page.tsx` | Atribuição explícita da origem OpenBot/nightly-labs; os URLs da origem são fontes históricas, não páginas de download |
| Termos | `app/[locale]/terms/page.tsx` | Links originais para referência legal, explicitamente separados de condições de conta Atlas |
| Documentação | `README.md` | Secção antiga marcada **Arquivo histórico**; não a executar nem utilizar como configuração V2 |

## Regressões automatizadas neste PR

`tests/origin-guard.test.cjs` verifica que os caminhos operacionais selecionados
não apontam para `openbot.run`, releases `nightly-labs/openbot`, imagem Docker
de origem ou conta X original. Verifica também que o gate de release continua
fechado por defeito e que as páginas de créditos/Termos preservam atribuição
histórica. É incluído automaticamente em `npm test` pelo script
`node --test tests/*.test.cjs`.

**Limite:** isto é um guard estático sobre ficheiros selecionados, não uma
varredura binária completa, monitorização de tráfego, teste de instalador ou
certificação de licenças.

## Pendências que não devemos resolver com substituições automáticas

1. Conteúdos de notícias/guias portados do projeto original: rever autoria, evidência
   de produto, expectativas sobre funcionalidades ainda não publicadas e imagens
   licenciadas, antes de os usar comercialmente.
2. Os documentos `PRIVACY.md`, `NOTICE`, `LICENSE` e os direitos das
   dependências não são substituídos pelos termos do website institucional.
3. O website Atlas V2 oferece apenas downloads com aprovação documentada:
   não integrar um instalador original como se fosse Atlas, nem anunciar
   disponibilidade porque um artefacto interno foi compilado.
4. Assinatura/notarização, atualização, migração dos perfis, egress real,
   Android/iOS e os serviços remotos dependem de testes adicionais.
5. As referências `openbot.run` nos **termos e créditos de origem** devem
   permanecer diferenciadas e não devem ser escondidas de modo a apagar autoria.
6. A secção antiga do README contém menções a rotas, estratégias de build,
   redes sociais e imagens de gerações anteriores; é **histórico**, não configuração.

## Estado de entrega

- [x] V2 distinguida de notas legadas no README.
- [x] Testes de guard para destinos executáveis e atribuições originais.
- [ ] Resultado CI `website-v2.yml` no commit final deste PR.
- [ ] Revisão editorial e jurídica dos artigos/guias e das respectivas artes.
- [ ] Testes de distribuição e tráfego reais antes de qualquer publicação.

**Não inclui merge, alteração em produção, AWS, Cloudflare ou releases.**
