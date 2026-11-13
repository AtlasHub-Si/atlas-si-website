// Round 1 visual check: hero (new logo + orbit), family strip, preview with
// the moving workflow, join page. Saves to scripts/shots-round1/.
import { chromium } from '../node_modules/playwright-core/index.mjs';

const CHROME =
  process.env.CHROME_PATH || '/home/z/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome';
const BASE = process.argv[2] || 'http://127.0.0.1:3200';
const OUT = new URL('./shots-round1/', import.meta.url).pathname;

const browser = await chromium.launch({ args: ['--no-sandbox'], executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const shots = [
  ['pt-hero', '/pt', 0],
  ['pt-family', '/pt', '.landing-family'],
  ['pt-pricing', '/pt', '.landing-pricing'],
  ['pt-preview', '/pt', '.landing-preview'],
  ['join', '/pt/join', 0],
];

for (const [name, path, target] of shots) {
  await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(target ? 2200 : 3000);
  if (target) {
    await page.evaluate((sel) => document.querySelector(sel)?.scrollIntoView({ block: 'center' }), target);
    await page.waitForTimeout(1400);
  }
  await page.screenshot({ path: OUT + name + '.png' });
  console.log('shot:', name);
}

await browser.close();
console.log('done');
