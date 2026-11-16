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
  assert.match(resolver, /homologated:true/);
  assert.match(resolver, /signatureVerified:true/);
  assert.match(resolver, /updaterVerified:true/);
  assert.match(handler, /status: supported \? 503 : 404/);
});

test("Legal attribution remains explicit and separate from institutional privacy", () => {
  const terms = read("app/[locale]/terms/page.tsx");
  const privacy = read("app/[locale]/privacy/page.tsx");
  assert.match(terms, /https:\/\/openbot\.run\/terms/);
  assert.match(terms, /https:\/\/openbot\.run\/privacy/);
  assert.match(terms, /not automatically|não constituem automaticamente/i);
  assert.match(privacy, /provenance\[locale\]/);
});
