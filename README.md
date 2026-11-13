# OpenBot — openbot.run rebuilt in Next.js

A faithful Next.js (App Router) rebuild of the **https://openbot.run** website, ported
from the original Solid/TanStack Start app in `apps/auth-api` of the
`nightly-labs/openbot` repository. Every page, the full design-token system and all
of the site's animations are reproduced.

## Run it

```bash
npm install
npm run build
npm start        # → http://localhost:3000
# or for development:
npm run dev
```

Node 20+ recommended (built with Node 24, Next 15, React 19).

## Deploy on Vercel

The repository root **is** the Next.js app, so Vercel auto-detects everything:

1. Import the repository in Vercel (framework preset **Next.js** is detected).
2. Build command `next build` and output defaults — no extra configuration.
3. Optional environment variable: `NEXT_PUBLIC_SITE_URL=https://<your-domain>`
   (used for canonical/`og:` URLs; `VERCEL_URL` is picked up automatically when
   it is not set).

```bash
# or from the CLI:
vercel --prod
```

## What is included

| Route | Original | Notes |
| --- | --- | --- |
| `/` | Landing page | Hero stagger entrance, animated blinking logo (eye tracking, wink on click, rapid-click easter egg), grid backdrop, skeleton→iframe preview handshake, `$0` metal-gradient price with sheen loop, download split-button with keyboard-navigable menu, per-card reveal, footer reveal + beating heart, scroll-driven aurora glow |
| `/app-preview` | `/app-preview` | The interactive preview shown inside the landing's iframe, with the same `openbot:landing-preview-ready` / `-start` postMessage handshake |
| `/news`, `/news/[slug]` | News collection | All 8 real articles ported with their full text |
| `/guides`, `/guides/[slug]` | Guides collection | All 3 real guides with the real screenshots/video from the repo (`public/media/guides/`), mounts, captions, pause controls |
| `/plugins` | Plugin catalog | The real catalog (14 plugins, extracted from `plugin-catalog.generated.ts`) with real icons, category filter switches and reveal sweep |
| `/join` | Invitation page | Deep link card (`openbot://join?invite=…`) with platform detection |
| `/download/[platform]` | Download resolver | Resolves the latest GitHub release asset (`.dmg` / `x64.exe` / `x86_64.AppImage`) and 302s to it |

## Animations ported

- `t-stagger` hero entrance (opacity + translateY + blur, per-line delays)
- `data-enter` header/preview/article entrance choreography
- Scroll reveals via IntersectionObserver (`0px 0px -40% 0px`, reduced-motion aware)
- `landing-download-reveal` cards sweep (90 ms / 180 ms delays), post cards (80 ms per index)
- `landing-price-enter` + 14 s `landing-price-sheen` loop on the metal `$0`
- Footer reveal + `landing-footer-heart` pulse
- App logo: `app-logo-blink` (4.8 s), pointer eye-tracking, wink reaction, party easter egg
- Glow: nine blurred SVG bars, `scaleY` driven by scroll progress (1100 ms quintic ease)
- All hover states (cards lift, glass buttons, link colours) and `prefers-reduced-motion` handling

## Deviations from the original

- The original article/plugin artwork uses WebGL shaders (`@paper-design/shaders`);
  here the gradients are CSS auroras deterministically derived from the article
  title, with a slow drift animation.
- The `/app` in-browser workspace is not part of the public site's static rebuild;
  the header's *App* button points at `/app-preview`.
- The `/join` card builds its deep link from the `?invite=` query parameter; without
  one it shows the original's invalid-invitation state.
- Analytics calls from the original are intentionally omitted.

## Structure

```
app/                 # routes (App Router)
  layout.tsx         # Inter (next/font, self-hosted) + metadata
  page.tsx           # landing
  app-preview/       # iframe scene
  news/ guides/      # collection indexes + SSG article pages
  plugins/ join/
  download/[platform]/route.ts
components/          # brand marks, icons, chrome, landing, content
content/             # article collections + plugin-catalog.json
lib/                 # site links/platforms, plugins helpers
styles/              # tokens.css, landing.css, post.css, preview.css
public/media/guides/ # real screenshots/video from the repo
```

Content and design are © OpenBot (Norbert Bodziony) — PolyForm Noncommercial license
upstream; this rebuild is for demonstration purposes.
