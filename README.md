# Atlas-SI Website V2.0

Next.js 15 / React 19, PT/EN/FR/ES. Identidade Atlas, seis mascotes estáticas, demonstração de workflows e downloads oficiais protegidos por aprovação de release.

- Produção: https://www.atlas-si.com
- [Implementação, fontes e rollback](docs/atlas-v2/IMPLEMENTATION.md)
- [Homologação e ativação dos downloads](docs/atlas-v2/DOWNLOADS.md)
- `npm ci`, `npm test`, `npm run typecheck`, `npm run build`, `npm start`
- QA: `node scripts/qa-atlas-v2.cjs http://127.0.0.1:3000 local` (Chrome/Edge; capturas em `.qa/`)

Os masters não foram modificados. O formulário prepara um e-mail localmente; não existe envio transacional nem CRM configurado. Os downloads permanecem Em breve sem ATLASBOT_RELEASE_APPROVAL.

## Estado canónico e proveniência

- **Identidade:** Atlas-SI / AtlasBot, ATLAS GLOBAL TECH LTD; quatro idiomas na landing V2.0.
- **Downloads:** apenas releases oficiais de `AtlasHub-Si/Atlas-Bot-Desktop` explicitamente homologadas; `ATLASBOT_RELEASE_APPROVAL` é obrigatório. Sem aprovação, o endpoint mantém o estado *Em breve* e devolve HTTP 503.
- **Servidor e aplicações:** não assumir que a API, o website ou um instalador histórico substituem os hosts AtlasBot, Signal/TURN ou as verificações de assinatura.
- **Licença e autoria:** código AtlasBot com [licença MIT](https://github.com/AtlasHub-Si/Atlas-Bot-Desktop/blob/main/LICENSE); respeitar [NOTICE e atribuições de terceiros](https://github.com/AtlasHub-Si/Atlas-Bot-Desktop/blob/main/NOTICE). A origem técnica histórica permanece documentada sem ser apresentada como produto Atlas ativo.
- **Referências legais:** a página de termos separa claramente os documentos da operação original e os documentos Atlas; não remove nem atribui a terceiros responsabilidade pela operação Atlas.
- **Arquivo:** [README histórico e referências do protótipo](docs/atlas-v2/HISTORICAL_README.md) — exclusivamente para proveniência. Links antigos para `openbot.run`, `nightly-labs/openbot` ou redes sociais de origem não são instruções de implementação.

## Controlo de publicação

Nenhuma alteração ao código deste website é automaticamente uma autorização de deploy ou de comercialização do instalador. Rever as verificações e documentação de [downloads](docs/atlas-v2/DOWNLOADS.md) antes de alterar variáveis, rotas ou DNS.
