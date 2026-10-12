import puppeteer from 'puppeteer';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\HP Laptop\\.gemini\\antigravity-ide\\brain\\54e80f3f-e1fe-4289-a6f2-8cb2f1eda41b';

(async () => {
  console.log('Launching Puppeteer browser for Admin Auth test...');
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
    console.log('Navigating to http://localhost:5173/admin/login...');
    await page.goto('http://localhost:5173/admin/login', { waitUntil: 'networkidle2', timeout: 20000 });

    const imgPath = path.join(ARTIFACT_DIR, 'admin_login_screen.png');
    await page.screenshot({ path: imgPath, fullPage: true });
    console.log(`Saved screenshot: ${imgPath}`);

    console.log('Admin Auth screenshots captured successfully!');
  } catch (err) {
    console.error('Error taking admin login screenshots:', err);
  } finally {
    await browser.close();
  }
})();
