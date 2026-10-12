const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1600 }); // Make it tall to see the achievements

  console.log('Navigating to /...');
  await page.goto('http://localhost:5173/');
  await new Promise(r => setTimeout(r, 3000));
  
  await page.screenshot({ path: 'debug_home_achievements_screenshot.png', fullPage: true });
  console.log('Screenshot saved for home');
  
  await browser.close();
})();
