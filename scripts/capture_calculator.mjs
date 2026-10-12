import puppeteer from 'puppeteer';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\HP Laptop\\.gemini\\antigravity-ide\\brain\\54e80f3f-e1fe-4289-a6f2-8cb2f1eda41b';

(async () => {
  console.log('Launching Puppeteer browser for Calculator test...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => {
    if (msg.type() === 'error') console.log(`BROWSER CONSOLE ERROR: ${msg.text()}`);
  });

  try {
    console.log('Navigating to http://localhost:5173/calculator...');
    await page.goto('http://localhost:5173/calculator', { waitUntil: 'networkidle2', timeout: 20000 });

    // 1. Initial Calculator View Screenshot
    let imgPath = path.join(ARTIFACT_DIR, 'calculator_initial_view.png');
    await page.screenshot({ path: imgPath, fullPage: true });
    console.log(`Saved screenshot: ${imgPath}`);

    // 2. Select Family Route Tab & Add Dependents
    console.log('Switching to Family tab...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const familyBtn = buttons.find(b => b.textContent?.includes('Family Dependent'));
      if (familyBtn) familyBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    imgPath = path.join(ARTIFACT_DIR, 'calculator_family_route.png');
    await page.screenshot({ path: imgPath, fullPage: true });
    console.log(`Saved screenshot: ${imgPath}`);

    console.log('All Calculator screenshots captured successfully!');
  } catch (err) {
    console.error('Error taking calculator screenshots:', err);
  } finally {
    await browser.close();
  }
})();
