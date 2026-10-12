import puppeteer from 'puppeteer';

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  console.log('Navigating to http://localhost:5173...');
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2', timeout: 15000 });
    
    // Check for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') console.log(`BROWSER ERROR: ${msg.text()}`);
    });

    console.log('Taking screenshot...');
    await page.screenshot({ path: 'debug_ui_screenshot.png', fullPage: true });
    console.log('Screenshot saved as debug_ui_screenshot.png');
  } catch (error) {
    console.error('Error during navigation or screenshot:', error);
  } finally {
    await browser.close();
  }
})();
