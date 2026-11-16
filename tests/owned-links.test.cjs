const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

const read = path => fs.readFileSync(path, "utf8");

const runtime = [
  "lib/site.ts",
  "lib/atlasbot-releases.ts",
  "app/download/[platform]/route.ts",
  "app/api/downloads/route.ts",
  "components/atlas/atlas-landing.tsx",
  "components/atlas/downloads.tsx",
];

test("Public Atlas-SI runtime does not promote original-operator downloads or social endpoints", () => {
  for (const file of runtime) {
    const text = read(file);
    assert.doesNotMatch(text, /nightly-labs\/openbot/i, file + ": original release source");
    assert.doesNotMatch(text, /https?:\/\/(?:[a-z0-9-]+\.)*openbot\.run/i, file + ": original service destination");
    assert.doesNotMatch(text, /openbot\.site/i, file + ": original publishing site");
  }
});

test("Atlas-owned repo and fail-closed distribution remain canonical", () => {
  const links = read("lib/site.ts");
  const resolver = read("lib/atlasbot-releases.ts");
  const handler = read("app/download/[platform]/route.ts");
  assert.match(links, /github\.com\/AtlasHub-Si\/Atlas-Bot-Desktop/);
  assert.ok(!links.includes("Atlas-Bot-Desktop/blob/main/PRIVACY.md"), "Do not present inherited privacy as AtlasBot policy");
  assert.ok(links.includes("https://www.atlas-si.com/pt/terms"), "Atlas legal terms must explain scope");
  assert.match(resolver, /homologated:true/);
  assert.match(resolver, /signatureVerified:true/);
  assert.match(resolver, /updaterVerified:true/);
  assert.match(handler, /status: supported \? 503 : 404/);
});

test("Editorial statements do not claim approved installers or inherited Atlas service privacy", () => {
  const guides = read("content/guides.tsx");
  const news = read("content/news.tsx");
  assert.match(guides, /installers are currently unavailable for public distribution/);
  assert.match(guides, /AtlasBot-specific account and service privacy terms have not yet been published/);
  assert.match(news, /AtlasBot-specific service privacy terms are not yet published/);
});

test("Legal attribution remains explicit and separate from institutional privacy", () => {
  const terms = read("app/[locale]/terms/page.tsx");
  const privacy = read("app/[locale]/privacy/page.tsx");
  assert.match(terms, /https:\/\/openbot\.run\/terms/);
  assert.match(terms, /https:\/\/openbot\.run\/privacy/);
  assert.match(terms, /not automatically|não constituem automaticamente/i);
  assert.match(privacy, /provenance\[locale\]/);
});
