# AtlasBot — downloads oficiais e aprovação de releases
A correção da PR #7 foi integrada (três commits preservados), com um gate adicional de homologação. O website nunca consulta o OpenBot original para resolver instaladores.

## Estado desta publicação
Sem ATLASBOT_RELEASE_APPROVAL configurado, /api/downloads devolve três plataformas indisponíveis; a interface mostra Em breve (localizado) e não cria links de instalação. A rota direta devolve página amigável HTTP 503, sem Location. Plataforma desconhecida: 404.
Não se consulta GitHub nem se escolhe uma release por inferência quando falta a aprovação.

## Ativação futura sem reimplementar a landing
A equipa de releases deve publicar uma release **pública, estável e homologada** em AtlasHub-Si/Atlas-Bot-Desktop. Antes da aprovação:
- Confirmar assinatura de código/notarização ou assinatura de distribuição aplicável à plataforma e identidade do editor.
- Confirmar checksum SHA-256 dos bytes, identidade do asset e digest sha256 devolvido pela API GitHub.
- Validar os mecanismos de atualização da aplicação para esse binário e essa plataforma.
- Confirmar que não se trata de Canary, nightly, artefacto Actions, build interno ou release de origem.

Configurar **ATLASBOT_RELEASE_APPROVAL** no ambiente de produção Vercel (valor JSON aprovado pela equipa de releases). Exemplo de estrutura, NÃO uma aprovação real:

{
  "repository": "AtlasHub-Si/Atlas-Bot-Desktop",
  "releaseId": 123456,
  "tag": "v1.2.3",
  "homologated": true,
  "assets": {
    "windows": {
      "id": 789012,
      "name": "AtlasBot-1.2.3-x64.exe",
      "sha256": "<64 caracteres hexadecimais do checksum verificado>",
      "signatureVerified": true,
      "updaterVerified": true
    }
  }
}

Repetir por macos (.dmg) e linux (.AppImage) apenas quando homologados. Ausência de uma plataforma mantém apenas essa plataforma indisponível.
Os booleanos de assinatura/atualizador são um registo de verificação externa pela equipa de releases, **não** uma verificação de Authenticode/notarização executada pelo website.
A API do website confirma que os IDs, tag, nome, estado uploaded, tamanho, digest e URL correspondem exatamente ao registo aprovado. Não há fallback.
Variáveis Vercel entram em vigor num novo deployment; redeploy com a configuração aprovada, sem nova implementação da landing. Para revogar: remover a configuração e redeploy. Se a release/asset for retirada ou a API falhar, a resolução falha fechada.

## URLs autorizados
Apenas HTTPS, hostname github.com, sem credenciais, porta não padrão, query ou fragmento, caminho exato:
https://github.com/AtlasHub-Si/Atlas-Bot-Desktop/releases/download/{tag}/{asset}
O destino público do botão continua /download/{windows|macos|linux}; só o servidor conhece o redirecionamento validado.
Nenhum token GitHub ou chave de API é necessário para uma release pública.

## Evidência
tests/downloads.test.cjs testa disponibilidade sem aprovação, release homologada, três plataformas, assinatura/updater, checksum, ID/nome/estado/tamanho, duplicados, prerelease/draft/Canary, URL maliciosa, erros/limites da API e ausência de fallback.
scripts/qa-atlas-v2.cjs testa o estado indisponível real e a ativação futura da interface com uma resposta API simulada. Esse mock não publica nem descarrega um instalador.
