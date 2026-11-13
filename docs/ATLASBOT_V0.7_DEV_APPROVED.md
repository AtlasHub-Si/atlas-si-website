# AtlasBot Website — DEV-APPROVED V0.7 asset integration

**New A approved by owner 2026-11-13.** This supersedes the approximate V0.6 `app/icon.svg` draft (PR #4 closed, never merged).

Source: [AtlasBot V0.7 owner approval / hashes](https://github.com/AtlasHub-Si/atlas-brand-system/blob/main/studio/approved-dev/ATLASBOT_V0.7_APPROVAL.json) (private).

## Required assets

- [V0.7 ZIP / logos, favicons, hero, motion](https://drive.google.com/file/d/1vPg8qi02qOTU3UpUZut9PH0DEFcBse2c/view)
- [New A approved square master](https://drive.google.com/file/d/1yfWYAbkQAGM72Mq1kDcY2rVvZD3hH7jb/view)
- [New A approved transparent master](https://drive.google.com/file/d/1MGekNldObJz7I9RJ4q9aST9xirHt9iQm/view)
- [Motion wide](https://drive.google.com/file/d/1DXmMkciczEOsECWSJd7lj9kaWy1XnJag/view) and [motion vertical](https://drive.google.com/file/d/1dbBZ1669nqVZ_mepnJaMFsvewHswTYe-/view)
- [Web QA contact](https://drive.google.com/file/d/1nHFuo2Cm2YJW0dH0tYDvd6kP0a3hrdJl/view)

## Staging

To install the **approved-for-dev PNG & other media** into a versioned public directory in a local clone:
```bash
python3 scripts/branding/stage-atlasbot-web-v07.py --archive /absolute/path/ATLASBOT_DevApproved_Assets_V0.7.zip
python3 scripts/branding/stage-atlasbot-web-v07.py --archive /absolute/path/ATLASBOT_DevApproved_Assets_V0.7.zip --apply
```
The second command copies only verified V0.7 assets under `public/brand/atlasbot/v0.7/`; it does not modify `app/icon.svg`, metadata, routes, or the current deployment.

## Next.js final integration (separate code PR after browser QA)

1. From the **owner-approved raster square icon**, use `app/icon.png` at 256 or 512px; replace the older `app/icon.svg` only when approving the new route. Avoid two conflicting app-icon metadata files.
2. Use `apple-touch-icon.png`, `favicon.ico`, `site.webmanifest` / PWA asset paths under public. Confirm the generated manifest has correct URLs for the chosen path.
3. Update locale metadata and OG to use the approved media; verify `pt/en/fr/es` routes.
4. Homepage may use Guide character and A energy intro from V0.6/V0.7. Use a poster and `prefers-reduced-motion` fallback. Do not autoplay sound.
5. Test LCP, layout shift, mobile Safari/Chrome, 16px/32px favicon legibility, and actual Vercel Preview build. Coordinate with Z.AI maintaining the landing page before merge.

**Note:** we have DEV approval, not commercial redistribution clearance for the inherited OpenBot code. Source logo is approved **raster**, no mathematical SVG vector master is claimed. No DNS, deploy, or production changes in this PR.
