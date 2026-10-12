const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const routes = ['property-visa', 'golden-visa', 'family-visa'];

  for (const route of routes) {
    console.log(`Navigating to /${route}...`);
    await page.goto(`http://localhost:5173/${route}`);
    await new Promise(r => setTimeout(r, 2000));
    
    await page.screenshot({ path: `debug_${route}_screenshot.png`, fullPage: false });
    console.log(`Screenshot saved for ${route}`);
  }
  
  await browser.close();
})();
