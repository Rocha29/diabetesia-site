import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';

const CHROME = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = `http://localhost:${process.env.DEMO_PORT ?? 5180}`;
const OUT = new URL('./out/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--window-size=390,844'],
});

async function newPage() {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.log('[console error]', msg.text());
  });
  page.on('pageerror', (err) => console.log('[pageerror]', err.message));
  return page;
}

async function shoot(page, name) {
  await page.screenshot({ path: `${OUT}${name}.png` });
  console.log('saved', name);
}

async function goto(page, path) {
  await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle0', timeout: 30000 });
}

// ---- login (logged out) ----
{
  const page = await newPage();
  await goto(page, '/?demo=loggedout');
  await page.waitForSelector('text/Entrar com Google', { timeout: 10000 }).catch(() => {});
  await new Promise((r) => setTimeout(r, 500));
  await shoot(page, 'login');
  await page.close();
}

// ---- home ----
{
  const page = await newPage();
  await goto(page, '/home');
  await page.waitForSelector('[class*="greeting"]', { timeout: 10000 }).catch(() => {});
  await new Promise((r) => setTimeout(r, 600));
  await shoot(page, 'home');
  await page.close();
}

// Helpers for the screens below.
async function clickButton(page, pattern) {
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await b.evaluate((el) => el.textContent || '');
    if (pattern.test(text)) {
      await b.click();
      return true;
    }
  }
  return false;
}

async function scrollToHeading(page, pattern, offset = 70) {
  await page.evaluate(
    (src, off) => {
      const re = new RegExp(src, 'i');
      const el = [...document.querySelectorAll('h1,h2,h3,span,strong')].find((n) => re.test(n.textContent || ''));
      if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - off);
    },
    pattern.source,
    offset,
  );
  await new Promise((r) => setTimeout(r, 300));
}

// ---- home: Alimentação de hoje with the meals open ----
{
  const page = await newPage();
  await goto(page, '/home');
  await new Promise((r) => setTimeout(r, 800));
  await clickButton(page, /Ver refeições/i);
  await new Promise((r) => setTimeout(r, 300));
  await scrollToHeading(page, /Alimentação de hoje/, 60);
  await shoot(page, 'nutrition');
  await page.close();
}

// ---- glucose form (floating label + photo tips) ----
{
  const page = await newPage();
  await goto(page, '/glucose/register');
  await new Promise((r) => setTimeout(r, 400));
  const valueInput = await page.$('input[inputmode="decimal"]');
  if (valueInput) {
    await valueInput.click({ clickCount: 3 });
    await valueInput.type('142');
  }
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
  await new Promise((r) => setTimeout(r, 400));
  await shoot(page, 'glucose');
  await page.close();
}

// ---- food: "Estimar carboidratos e calorias" → Conferir porções ----
{
  const page = await newPage();
  await goto(page, '/food/register');
  await new Promise((r) => setTimeout(r, 400));
  const textarea = await page.$('textarea');
  if (textarea) {
    await textarea.click();
    await textarea.type('2 pães com manteiga e café com leite');
  }
  await clickButton(page, /Estimar carboidratos/i);
  await new Promise((r) => setTimeout(r, 1500));
  await scrollToHeading(page, /^Café com leite$/, 40);
  await shoot(page, 'food');
  await page.close();
}

// ---- medication ----
{
  const page = await newPage();
  await goto(page, '/medication/register');
  await new Promise((r) => setTimeout(r, 400));
  const inputs = await page.$$('input[type="text"], input:not([type])');
  if (inputs[0]) {
    await inputs[0].click();
    await inputs[0].type('Metformina');
  }
  if (inputs[1]) {
    await inputs[1].click();
    await inputs[1].type('500');
  }
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
  await new Promise((r) => setTimeout(r, 400));
  await shoot(page, 'medication');
  await page.close();
}

// ---- blood pressure (history + chart) ----
{
  const page = await newPage();
  await goto(page, '/pressure');
  await new Promise((r) => setTimeout(r, 1000));
  await shoot(page, 'pressure');
  await page.close();
}

// ---- prescription ----
{
  const page = await newPage();
  await goto(page, '/prescription');
  await new Promise((r) => setTimeout(r, 800));
  await shoot(page, 'prescription');
  await page.close();
}

// ---- chat (ready-made questions, before the first message) ----
{
  const page = await newPage();
  await goto(page, '/ai');
  await new Promise((r) => setTimeout(r, 800));
  await shoot(page, 'chat');
  await page.close();
}

// ---- report ----
{
  const page = await newPage();
  await goto(page, '/report');
  await new Promise((r) => setTimeout(r, 800));
  await shoot(page, 'report');
  await page.close();
}

// ---- tracking (week: summary, chart with target band) ----
{
  const page = await newPage();
  await goto(page, '/report/tracking');
  await new Promise((r) => setTimeout(r, 1000));
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 200));
  await shoot(page, 'tracking');
  await page.close();
}

// ---- Minha jornada ----
{
  const page = await newPage();
  await goto(page, '/journey');
  await new Promise((r) => setTimeout(r, 1000));
  await shoot(page, 'journey');
  await page.close();
}

// ---- profile: Minhas metas + Aparência ----
{
  const page = await newPage();
  await goto(page, '/profile');
  await new Promise((r) => setTimeout(r, 1000));
  await scrollToHeading(page, /Minhas metas/, 20);
  await shoot(page, 'profile');
  await page.close();
}

// ---- checkin ----
{
  const page = await newPage();
  await goto(page, '/checkin');
  await new Promise((r) => setTimeout(r, 800));
  await shoot(page, 'checkin');
  await page.close();
}

// ---- WebP conversion (done in Chrome itself: load each PNG into a canvas
// and re-encode with canvas.toDataURL('image/webp', 0.85), no sharp needed) ----
{
  const { readFileSync, writeFileSync, readdirSync } = await import('node:fs');
  const page = await newPage();
  const pngFiles = readdirSync(OUT).filter((f) => f.endsWith('.png'));
  for (const file of pngFiles) {
    const base64Png = readFileSync(`${OUT}${file}`).toString('base64');
    const webpDataUrl = await page.evaluate(async (b64) => {
      const img = new Image();
      const loaded = new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      img.src = `data:image/png;base64,${b64}`;
      await loaded;
      const canvas = document.createElement('canvas');
      canvas.width = 780;
      canvas.height = 1688;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, 780, 1688);
      return canvas.toDataURL('image/webp', 0.85);
    }, base64Png);
    const webpBase64 = webpDataUrl.replace(/^data:image\/webp;base64,/, '');
    const webpName = file.replace(/\.png$/, '.webp');
    writeFileSync(`${OUT}${webpName}`, Buffer.from(webpBase64, 'base64'));
    console.log('webp', webpName);
  }
  await page.close();
}

await browser.close();
console.log('DONE');
