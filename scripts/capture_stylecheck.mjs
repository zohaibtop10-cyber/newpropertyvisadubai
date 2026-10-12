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

  page.on('console', msg => {
    if (msg.type() === 'error') console.log(`BROWSER CONSOLE ERROR: ${msg.text()}`);
  });

  try {
    console.log('Navigating to http://localhost:5173/style-check...');
    await page.goto('http://localhost:5173/style-check', { waitUntil: 'networkidle2', timeout: 20000 });

    const viewports = [
      { name: '1440px_desktop', width: 1440, height: 900 },
      { name: '1024px_tablet_lg', width: 1024, height: 800 },
      { name: '768px_tablet_sm', width: 768, height: 800 },
      { name: '375px_mobile', width: 375, height: 800 },
    ];

    // 1. Dark Mode Screenshots
    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      const imgPath = path.join(ARTIFACT_DIR, `stylecheck_dark_${vp.name}.png`);
      await page.screenshot({ path: imgPath, fullPage: true });
      console.log(`Saved screenshot: ${imgPath}`);
    }

    // 2. Toggle Theme to Light Mode
    console.log('Toggling to Light Mode...');
    await page.evaluate(() => {
      const toggleBtn = document.querySelector('button[aria-label*="Switch to"]');
      if (toggleBtn) toggleBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    // 3. Light Mode Screenshots
    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      const imgPath = path.join(ARTIFACT_DIR, `stylecheck_light_${vp.name}.png`);
      await page.screenshot({ path: imgPath, fullPage: true });
      console.log(`Saved screenshot: ${imgPath}`);
    }

    console.log('All StyleCheck screenshots captured successfully!');
  } catch (err) {
    console.error('Error taking screenshots:', err);
  } finally {
    await browser.close();
  }
})();
