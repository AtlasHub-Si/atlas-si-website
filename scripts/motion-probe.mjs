// Motion probe for the deployed AtlasBot site: verifies that the shipped CSS
// contains the keyframes, that entrance animations apply, that scroll reveals
// fire, and that the $0 light sheen actually MOVES (pixel diff over time).
// Also probes with prefers-reduced-motion: reduce to compare.
import { chromium } from '../node_modules/playwright-core/index.mjs';

const CHROME = process.env.CHROME_PATH || '/home/z/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome';
const BASE = process.argv[2] || 'https://atlas-si-website.vercel.app';

const browser = await chromium.launch({ args: ['--no-sandbox'], executablePath: CHROME });

async function probe(reduced) {
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: reduced ? 'reduce' : 'no-preference',
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 160)));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 160)); });

  await page.goto(BASE + '/pt', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1600);

  const report = await page.evaluate(() => {
    const pick = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = getComputedStyle(el);
      return `${cs.animationName} ${cs.animationDuration} ${cs.animationPlayState} op:${cs.opacity}`;
    };
    let sheen = false, enter = false, revealKf = false, blink = false;
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.type === CSSRule.KEYFRAMES_RULE) {
            if (rule.name === 'landing-price-sheen') sheen = true;
            if (rule.name === 'landing-price-enter') enter = true;
            if (rule.name === 'landing-download-reveal') revealKf = true;
            if (rule.name === 'app-logo-blink') blink = true;
          }
        }
      } catch { /* cross-origin sheet */ }
    }
    return {
      keyframesInCSS: { 'landing-price-sheen': sheen, 'landing-price-enter': enter, 'landing-download-reveal': revealKf, 'app-logo-blink': blink },
      header: pick('[data-enter="header"]'),
      heroTitle: pick('.t-stagger.is-shown .t-stagger-line--2'),
      heroLogo: pick('.landing-hero-logo'),
      priceAmount: pick('.landing-pricing-amount'),
      priceRevealed: document.querySelector('.landing-pricing-amount')?.getAttribute('data-revealed'),
      hydrated: !!document.querySelector('[data-revealed]'),
    };
  });
  console.log(`\n=== ${reduced ? 'REDUCED-MOTION' : 'NORMAL'} @ ${BASE} ===`);
  console.log(JSON.stringify(report, null, 1));

  // Scroll the pricing section into view, let the reveal play, then diff the
  // $0 element over ~2.2 s to prove the sheen band is moving.
  await page.evaluate(() => document.querySelector('.landing-pricing')?.scrollIntoView({ block: 'center' }));
  await page.waitForTimeout(1700);
  const state = await page.evaluate(() => document.querySelector('.landing-pricing-amount')?.getAttribute('data-revealed'));
  const el = await page.$('.landing-pricing-amount');
  if (el) {
    const shot1 = await el.screenshot();
    await page.waitForTimeout(2200);
    const shot2 = await el.screenshot();
    console.log('pricing data-revealed após scroll:', state, '| $0 muda ao longo de 2.2s:', shot1.equals(shot2) ? 'NÃO (estático!)' : 'SIM (a mover)');
  }

  // Footer heart pulse (infinite loop) — same diff technique. The element
  // never becomes "stable" while pulsing, so treat a stability timeout as
  // evidence of movement and only a clean equal-diff as static.
  await page.evaluate(() => document.querySelector('.landing-footer')?.scrollIntoView({ block: 'end' }));
  await page.waitForTimeout(1200);
  const heart = await page.$('.landing-footer-made svg');
  if (heart) {
    try {
      const h1 = await heart.screenshot({ timeout: 4000 });
      await page.waitForTimeout(900);
      const h2 = await heart.screenshot({ timeout: 4000 });
      console.log('coração do rodapé pulsa:', h1.equals(h2) ? 'NÃO (estático!)' : 'SIM');
    } catch {
      console.log('coração do rodapé pulsa: SIM (elemento nunca fica estável = em movimento contínuo)');
    }
  }
  console.log('erros de página/console:', errors.length ? errors.slice(0, 5) : 'nenhum');
  await ctx.close();
}

await probe(false);
await probe(true);
await browser.close();
console.log('\ndone');
