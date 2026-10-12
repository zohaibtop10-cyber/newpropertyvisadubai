import puppeteer from 'puppeteer';

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  console.log('Navigating to https://propertyvisadubai.netlify.app...');
  try {
    await page.goto('https://propertyvisadubai.netlify.app', { waitUntil: 'networkidle2', timeout: 20000 });
    console.log('Taking screenshot...');
    await page.screenshot({ path: 'target_website_screenshot.png', fullPage: true });
    console.log('Screenshot saved as target_website_screenshot.png');
  } catch (error) {
    console.error('Error during navigation or screenshot:', error);
  } finally {
    await browser.close();
  }
})();
