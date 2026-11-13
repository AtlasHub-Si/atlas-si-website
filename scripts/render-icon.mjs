// Renders app/icon.svg to public/icon-240.png (transparent background).
// Lives inside the repo so `playwright-core` resolves from its node_modules.
import { chromium } from '../node_modules/playwright-core/index.mjs';

const CHROME =
  process.env.CHROME_PATH || '/home/z/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome';

const browser = await chromium.launch({ args: ['--no-sandbox'], executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 240, height: 240 } });
await page.goto(new URL('../app/icon.svg', import.meta.url).href);
await page.screenshot({ path: new URL('../public/icon-240.png', import.meta.url).pathname, omitBackground: true });
await browser.close();
console.log('icon-240.png rendered');
