# PLANO DE MODELOS DE IA E BENCHMARK

## 1. Pré-requisito de acesso

O benchmark exige chaves que ainda não tenho: **NVIDIA NIM** (para DeepSeek
Flash/GLM Flash) e/ou chaves próprias de cada fornecedor. Sem elas, o benchmark
fica bloqueado nesta fase; peço as chaves quando autorizares o arranque da
FASE 3.

## 2. Modelos a testar (conforme brief)

| Modelo | Via | Estado |
|---|---|---|
| DeepSeek V4.1 Flash | NVIDIA NIM / API DeepSeek | a validar disponibilidade |
| Gemini 3.8 Flash | Google AI / Vertex | requer chave Google |
| GLM 5.3 Flash | NVIDIA NIM / Zhipu | a validar |
| Outros multimodais/coding | NVIDIA NIM | catálogo a listar |

Nota: endpoints compatíveis com OpenAI são suportados pelo OpenBot via
configuração de provider; validar no fork 0.1.11 (`packages/`/provider config).

## 3. Tarefas do benchmark (mesmas 6 do brief)

1. Análise de repositório (mapa de arquitetura de `atlas-ai-workforce`).
2. Refactoring multi-ficheiro (5 ficheiros, teste a passar no fim).
3. Implementação de componente visual (card de agente com estados).
4. Interpretação de imagem (as duas referências de marca).
5. Execução de ferramentas (ler/escrever ficheiros, shell, diff).
6. Correção de erros de build (introduzir bug controlado, pedir fix).

## 4. Método e métricas

- 3 repetições por tarefa, prompts idênticos, temperatura fixa.
- Métricas: sucesso binário, nº de iterações, tokens, latência, custo.
- Critério de escolha: **qualidade primeiro**, depois custo/latência.
- Resultados em `MODEL_BENCHMARK.md` com tabela e veredicto por tarefa.

## 5. Segurança

- Não alterar a configuração de produção do OpenBot sem validação prévia.
- Testes em ambiente isolado do fork; chaves guardadas no Vault, nunca no repo.
