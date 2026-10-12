const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  const routes = ['/property-visa', '/golden-visa', '/family-visa'];

  for (const route of routes) {
    console.log(`\nNavigating to ${route}...`);
    try {
      await page.goto(`http://localhost:5173${route}`);
      await new Promise(r => setTimeout(r, 2000));
      
      const title = await page.$eval('h1', el => el.textContent).catch(() => 'NO H1');
      console.log(`Loaded ${route}: H1 is "${title}"`);
    } catch(e) {
      console.error(`Error on ${route}:`, e.message);
    }
  }
  
  await browser.close();
})();
