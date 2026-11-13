# ESTIMATIVA DAS FASES DE IMPLEMENTAÇÃO

> Base: equipa pequena (1 dev sénior full-time + apoio pontual de design).
> Estimativas indicativas, sem compromisso; dependem de validação da 0.1.11.

| Fase | Conteúdo | Duração | Bloqueio |
|---|---|---|---|
| 1. Upstream audit + licenças | este relatório | ✅ concluída | — |
| 2. Arquitetura de integração | criar repo `atlas-ai-workforce`, fork 0.1.11, CI, provenance | 3–5 dias | decisão vossa sobre repo |
| 3. Benchmark de modelos | pré-requisito: chaves NIM/Google | 2–3 dias | chaves de API |
| 4. Atlas Design System + identidade 3D | tokens, temas, logo 3D, avatares | 3–5 semanas | imagens de referência |
| 5. Integração funcional | build/testes da 0.1.11 na nossa máquina; primeiro arranque | 2–3 semanas | — |
| 6. Personalização e extensões | reconstruir gap 0.1.11→0.19.0 por prioridade; camada Atlas | 6–10 semanas | — |
| 7. QA e testes | matriz de testes, a11y, performance, multi-OS | 2–3 semanas | — |
| 8. Preparação para distribuição | assinatura/notarização, auto-update, licenças, docs | 2–3 semanas | decisão de distribuição |

**Total indicativo:** ~4–6 meses até beta distribuível; ~2–3 semanas até
protótipo com identidade sobre a 0.1.11.

## Caminhos que encurtam
- Licença comercial do 0.19.0: remove a Fase 6 quase toda (poupança ~6–8 semanas).
- Identidade 3D simplificada (Lottie + renders em vez de tempo real): corta
  ~2 semanas da Fase 4.

## Riscos de calendário
- Stack Electron/SolidJS pouco familiar → +20–30% nas fases 5–6.
- Notarização Apple e assinatura Windows requerem contas/certificados (custos).
- Builds multi-OS precisam de CI dedicado (runner macOS pago).
