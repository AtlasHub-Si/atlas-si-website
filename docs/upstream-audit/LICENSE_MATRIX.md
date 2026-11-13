# MATRIZ DE LICENÇAS E PERMISSÕES

## 1. Licença do upstream por período

| Período | Versão | Licença | Uso comercial | Modificar | Distribuir |
|---|---|---|---|---|---|
| 12–20 ago 2026 (até commit `a6fe2402`) | **0.1.11** | **Apache-2.0** | ✅ sim (com condições) | ✅ | ✅ com LICENSE+NOTICE |
| desde `5f733c89` (20 ago 2026) até HEAD `288d3bfb` | 0.1.12 → **0.19.0** | **PolyForm Noncommercial 1.0.0** | ❌ **não** | ✅ só uso não comercial | ✅ só não comercial |
| HEAD atual | 0.19.0 | PolyForm NC | ❌ requer licença comercial paga do titular | — | — |

**Prova:** README do upstream, secção "License and attribution":
> "Licensed under the PolyForm Noncommercial License 1.0.0. … Commercial use
> requires a separate license from the copyright owner. **Versions up to and
> including 0.1.11 remain available under Apache-2.0.**"

Verificado no histórico: `git show a6fe2402:LICENSE` → Apache License 2.0;
`git show 5f733c89:LICENSE` → PolyForm NC; `package.json` de 0.1.11 →
`"license": "Apache-2.0"`.

## 2. Implicações para a AtlasHub

| Cenário | Veredicto |
|---|---|
| Fork do HEAD (0.19.0) + branding AtlasHub + uso comercial | ❌ **Proibido** pela PolyForm NC |
| Fork do HEAD para uso interno não comercial | ✅ permitido (com avisos) |
| Fork da **0.1.11** (Apache-2.0) + extensões próprias + comercial | ✅ **permitido** |
| Copiar ficheiros/código de commits pós-`5f733c89` para o nosso fork | ❌ proibido (código PolyForm NC) |
| Pedir licença comercial ao titular | 🟡 caminho legítimo e recomendado em paralelo |

### Obrigações Apache-2.0 (0.1.11)
1. Manter `LICENSE` (Apache-2.0) e `NOTICE` (copyright Norbert Bodziony 2026).
2. Declarar ficheiros modificados.
3. Incluir cópia da licença em distribuições.
4. Concessão de patentes incluída; sem garantias.
5. Não usar marcas do titular (OpenBot) como endorsement.

## 3. Dependências de terceiros (amostra relevante)

| Pacote | Licença típica | Nota |
|---|---|---|
| solid-js / @solidjs/* | MIT | UI reativa |
| electron / electron-builder | MIT | runtime/app |
| @anthropic-ai/* SDKs | MIT (SDK) | APIs do fornecedor têm termos próprios |
| @modelcontextprotocol/sdk | MIT | protocolo MCP |
| @agentclientprotocol/sdk | MIT | ACP |
| tailwindcss | MIT | estilo |
| @kobalte/core | MIT | componentes |
| lucide-solid | ISC | ícones |
| blobatar 0.2.0 (via NOTICE) | ver NOTICE | avatar/blobs |
| @paper-design/shaders | MIT (verificar versão) | shaders (só no HEAD) |

⚠️ **A verificar por versão exata** antes de distribuição: `@paper-design/shaders`,
`@novnc/novnc` (0.1.11), fontes (`@fontsource-variable/inter` — OFL) e
quaisquer binários vendorizados (`vendor/`, `native-runtime.lock.json`).
Runtimes Codex/Claude/Grok são descarregados do fornecedor em runtime e **não**
fazem parte do pacote (ver NOTICE).

## 4. Recomendação de licenciamento

1. **Base técnica = 0.1.11 (Apache-2.0)**, commit `a6fe2402`, preservando LICENSE+NOTICE.
2. Repo separado para o produto (ver ARCHITECTURE_PROPOSAL), com
   `PROVENANCE.md` a registar origem e commit exato.
3. **Nunca** trazer código de commits ≥ `5f733c89` para o fork comercial.
4. Abrir conversa com o titular para licença comercial do 0.19.0 — só ganha
   sentido se o produto precisar de funcionalidades pós-0.1.11.
5. Landing `atlas-si-website` mantém-se 100% código próprio.
