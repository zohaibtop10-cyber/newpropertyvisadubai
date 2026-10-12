import puppeteer from 'puppeteer';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\HP Laptop\\.gemini\\antigravity-ide\\brain\\54e80f3f-e1fe-4289-a6f2-8cb2f1eda41b';

(async () => {
  console.log('Launching Puppeteer browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => {
    if (msg.type() === 'error') console.log(`BROWSER CONSOLE ERROR: ${msg.text()}`);
  });

  const pagesToCapture = [
    { route: '/property-visa', name: 'property_visa_page' },
    { route: '/golden-visa', name: 'golden_visa_page' },
    { route: '/family-visa', name: 'family_visa_page' },
  ];

  try {
    for (const item of pagesToCapture) {
      console.log(`Navigating to http://localhost:5173${item.route}...`);
      await page.goto(`http://localhost:5173${item.route}`, { waitUntil: 'networkidle2', timeout: 20000 });
      const imgPath = path.join(ARTIFACT_DIR, `${item.name}.png`);
      await page.screenshot({ path: imgPath, fullPage: true });
      console.log(`Saved screenshot: ${imgPath}`);
    }

    console.log('All Visa pages screenshots captured successfully!');
  } catch (err) {
    console.error('Error taking visa page screenshots:', err);
  } finally {
    await browser.close();
  }
})();
