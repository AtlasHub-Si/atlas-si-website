const {test}=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const get=(p)=>fs.readFileSync(p,"utf8");

// Static safeguard only: no original operator code/download links in Atlas V2 runtime paths.
const publicPaths=[
  "lib/atlasbot-releases.ts",
  "app/download/[platform]/route.ts",
  "app/api/downloads/route.ts",
  "components/atlas/downloads.tsx",
  "components/atlas/atlas-landing.tsx",
  "components/join-card.tsx",
  "lib/site.ts",
  "app/[locale]/page.tsx",
];
const originDestinations=/https?:\/\/(?:[^/"']+\.)?openbot\.run(?:\/|["'\s])|https:\/\/github\.com\/nightly-labs\/openbot|ghcr\.io\/nightly-labs\/openbot|https:\/\/x\.com\/OpenBot_/i;
test("No original operator download, runtime or product destination in Atlas-SI V2",()=>{
  for(const path of publicPaths) {
    assert.doesNotMatch(get(path),originDestinations,path+": inherited product destination");
  }
});

test("Distribution gate remains Atlas-owned and fail-closed",()=>{
  const resolver=get("lib/atlasbot-releases.ts");
  const route=get("app/download/[platform]/route.ts");
  const links=get("lib/site.ts");
  assert.match(resolver,/ATLASBOT_REPOSITORY="AtlasHub-Si\/Atlas-Bot-Desktop"/);
  assert.match(resolver,/homologated:true/);
  assert.match(resolver,/signatureVerified:true/);
  assert.match(resolver,/updaterVerified:true/);
  assert.match(resolver,/validateAssetUrl/);
  assert.match(route,/status: supported \? 503 : 404/);
  assert.match(links,/https:\/\/github\.com\/AtlasHub-Si\/Atlas-Bot-Desktop\/releases/);
});

test("Original terms and copyright remain attributed only as original sources",()=>{
  const terms=get("app/[locale]/terms/page.tsx");
  const credits=get("app/[locale]/credits/page.tsx");
  assert.match(terms,/https:\/\/openbot\.run\/terms/);
  assert.match(terms,/https:\/\/openbot\.run\/privacy/);
  assert.match(terms,/não constituem automaticamente|not automatically/);
  assert.match(credits,/https:\/\/github\.com\/nightly-labs\/openbot/);
  assert.match(credits,/ATLAS|AtlasBot/);
});

test("README explicitly marks obsolete deployment notes as historical",()=>{
  const readme=get("README.md");
  assert.match(readme,/Documentação anterior e proveniência \(histórico\)/);
  assert.match(readme,/Arquivo histórico — não utilizar como instruções operacionais/);
  assert.match(readme,/docs\/atlas-v2\/DOWNLOADS\.md/);
});
