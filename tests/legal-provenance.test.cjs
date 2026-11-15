const {test}=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");

const page=fs.readFileSync("app/[locale]/terms/page.tsx","utf8");
const privacy=fs.readFileSync("app/[locale]/privacy/page.tsx","utf8");
const footer=fs.readFileSync("components/atlas/atlas-landing.tsx","utf8");
const downloads=fs.readFileSync("lib/atlasbot-releases.ts","utf8");

test("Legal provenance uses original first-party policy URLs without impersonation",()=>{
  for(const path of ["https://openbot.run/terms","https://openbot.run/privacy"])assert.ok(page.includes(path));
  for(const lang of ["pt:","en:","fr:","es:"])assert.ok(page.includes(lang));
  assert.match(page,/not automatically|não constituem automaticamente/i);
  assert.match(page,/ATLAS GLOBAL TECH LTD/);
});
test("Website privacy remains Atlas-only, with original third party attribution",()=>{
  assert.match(privacy,/https:\/\/openbot\.run\/privacy/);
  assert.match(privacy,/\bVercel\b/);
  assert.match(privacy,/provenance\[locale\]/);
});
test("Legal links accessible and official downloads remain fail closed",()=>{
  assert.match(footer,/localePath\(locale,"\/terms"\)/);
  assert.match(footer,/localePath\(locale,"\/privacy"\)/);
  assert.match(downloads,/homologated:true/);
  assert.match(downloads,/signatureVerified:true/);
  assert.match(downloads,/updaterVerified:true/);
});
