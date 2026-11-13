# Atlas SI — Public Launch V0.1

Public pre-launch website of **Atlas Harness**, an AI-native enterprise architecture initiative led by AtlasHub.SI.

- Website: https://www.atlas-si.com
- Canonical architecture: https://github.com/AtlasHub-Si/Atlas-Harness
- Status: **V0.1 early access / architecture preview**, not a commercially released Desktop installer
- Languages: Portuguese, English, French, Spanish
- Runtime: Next.js 15 / React 19 / Vercel, with four localized entry pages

## What is public

The home page is an original Atlas SI composition describing the architecture, its modules and the early-access status. No public AtlasBot installer is represented as available. `/download/windows`, `/download/macos` and `/download/linux` deliberately return `503 not_released`. Legacy news, guides, plugins, join and preview paths temporarily redirect to the launch page.

## Engineering

```bash
bun install --frozen-lockfile
bun run build
bun run dev
```

Use the linked Vercel project `atlas-si-website`. Domains `atlas-si.com` (redirects to www) and `www.atlas-si.com` are configured there.

### Source provenance and distribution gate

This repository previously adapted and reproduced material from the public OpenBot website for technical visual evaluation. Legacy components/styles/assets remain in the codebase pending dedicated provenance review and removal. **Their presence does not grant permission to redistribute third-party visual content.** The V0.1 homepage uses `app/[locale]/page.tsx` and `styles/atlas-launch.css` rather than the former copied page composition.

`Atlas-Bot-Desktop` references `nightly-labs/openbot`, licensed under PolyForm Noncommercial 1.0.0. Creating an independent GitHub repository does not change upstream copyright or authorize commercial activity, hosting as a service, or client distribution. Before building publicly downloadable Atlas binaries, obtain appropriate rights or implement an independently licensed runtime.

### Next gates

1. Verify desktop and remote-server builds and checksums.
2. Validate trademark/branding, copyright, license and asset provenance.
3. Connect an authorized installer release manifest.
4. Review Cloudflare Account API + Signal + TURN and commercial deployment architecture.
5. Replace the remaining unused legacy content and assets; set a dedicated Atlas OG graphic.

## Development principle

Product copy must distinguish implemented capabilities, private lab tests, roadmap and public releases. Do not infer availability from source repositories alone.
