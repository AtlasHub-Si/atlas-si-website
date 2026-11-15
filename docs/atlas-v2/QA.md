# QA de aceitação — Atlas-SI V2

Build Next.js 15.5.29: PASS, 86 páginas geradas. TypeScript: PASS. Testes de segurança de releases: 9/9 grupos PASS. Auditoria npm de produção: 0 vulnerabilidades após PostCSS 8.5.33.

Chrome em Windows, local e preview Vercel: PASS. 52 verificações de rotas por execução; menus, formulário mailto, play/pause/restart/step, gate de aprovação humana e ativação futura simulada da UI: PASS. Todos os downloads reais permanecem indisponíveis.

| Largura | Overflow horizontal | Imagens quebradas | Estado |
|---|---|---|---|
| 1440 | Não | 0 | PASS |
| 1086 | Não | 0 | PASS |
| 1024 | Não | 0 | PASS |
| 768 | Não | 0 | PASS |
| 390 | Não | 0 | PASS |

PT/EN/FR/ES testados em 390 e 1440 px; canonical e cinco alternates corretos.

axe WCAG A/AA/2.1 AA: 0 violações nas verificações de 1440 e 390 px, tanto local como no preview. Isto não equivale a certificação WCAG ou teste completo com leitor de ecrã.

Primeiro carregamento local desktop observado: LCP 1564 ms, 860 KiB transferidos, CLS 0.00038. Medições sintéticas sem throttling; as larguras seguintes e o preview reutilizam cache. Não são dados de campo.

Comparação visual: [referência à esquerda / implementação à direita](qa/reference-vs-v2.jpg). Diferenças intencionais em IMPLEMENTATION.md. Todas as capturas foram inspecionadas; a Guide e a arte empresarial aparecem corretamente, sem texto rasterizado da maquete nos painéis.

[Relatório local](qa/local.json) · [Relatório do preview](qa/preview.json)

Edge: PASS nos mesmos cinco viewports, quatro idiomas, 52 rotas, 14 verificações de interação e axe sem violações. [Relatório Edge](qa/edge-preview.json). Safari/iOS real não disponível; não foi testado. A confirmação de produção é registada no relatório final da execução, após deployment e smoke no domínio público.
