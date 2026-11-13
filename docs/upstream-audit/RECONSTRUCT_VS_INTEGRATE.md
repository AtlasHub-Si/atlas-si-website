# RECONSTRUIR vs INTEGRAR O UPSTREAM

## Comparação

| Critério | Reconstruir do zero (atual) | Integrar upstream 0.1.11 (Apache-2.0) | Fork 0.19.0 (exige licença comercial) |
|---|---|---|---|
| Legitimidade | ✅ total | ✅ total | 🟡 só com contrato |
| Esforço até protótipo | 🔴 alto (produto inteiro) | 🟡 médio (adaptar app existente) | 🟢 baixo |
| Esforço até produto | 🔴 muito alto | 🟡 médio-alto (gap de 0.1.11→0.19.0) | 🟢 baixo |
| Funcionalidades à data | só o que construirmos | 0.1.11 (base sólida: multiagente, canais, marketplaces iniciais) | 0.19.0 completo |
| Fidelidade visual | 🟡 recriada | 🟢 real | 🟢 real |
| Dívida técnica herdada | nenhuma | baixa-média (stack Electron/SolidJS) | média |
| Atualizações futuras | nossas | manuais (upstream fechou) | automáticas se licenciado |
| Risco legal | 🟢 nenhum | 🟢 nenhum (Apache-2.0 + NOTICE) | 🟡 contratual |
| Tempo estimado (MVP com identidade) | 3–5 meses equipa pequena | 6–10 semanas | 2–4 semanas |

## Recomendação

**Integrar a 0.1.11 + camada AtlasHub**, mantendo a reconstrução como landing.
Razões: base funcional real, licença limpa, esforço muito menor, e a
experiência/arquitetura do OpenBot é exatamente o que o brief quer aproveitar.

**Riscos a aceitar:** (1) gap funcional 0.1.11→0.19.0 tem de ser reconstruído
por nós; (2) stack Electron/SolidJS exige competências específicas; (3)
atualizações do upstream já não são incorporáveis (licença mudou).

## Caminho híbrido sugerido

1. Fork 0.1.11 → repo `atlas-ai-workforce` (privado).
2. Validar build/testes da 0.1.11 na nossa máquina.
3. Camada de tema/identidade AtlasHub (tokens + componentes).
4. Reconstruir por prioridade as funcionalidades que o brief exige e a 0.1.11
   não tem (comparar com 0.19.0 como referência de produto, sem copiar código).
5. Em paralelo: contacto com o titular para orçamento de licença comercial —
   se aceitável, encurta meses de trabalho.
