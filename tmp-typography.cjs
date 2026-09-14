const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const viewports = [360, 390, 430, 768, 1024, 1440];
  
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp, height: 900 });
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout;
    
    const data = await page.evaluate(() => {
      const results = {};
      
      // H1 - Hero
      const h1 = document.querySelector('h1');
      if (h1) {
        const s = window.getComputedStyle(h1);
        results.h1 = {
          fontSize: s.fontSize,
          fontFamily: s.fontFamily,
          fontWeight: s.fontWeight,
          letterSpacing: s.letterSpacing,
          lineHeight: s.lineHeight,
          width: h1.getBoundingClientRect().width,
          height: h1.getBoundingClientRect().height,
        };
      }
      
      // H2 - Section titles
      const h2s = document.querySelectorAll('h2');
      if (h2s.length > 0) {
        const s = window.getComputedStyle(h2s[0]);
        results.h2_first = {
          fontSize: s.fontSize,
          fontFamily: s.fontFamily,
          width: h2s[0].getBoundingClientRect().width,
        };
        if (h2s.length > 1) {
          const s2 = window.getComputedStyle(h2s[1]);
          results.h2_second = {
            fontSize: s2.fontSize,
            fontFamily: s2.fontFamily,
          };
        }
      }
      
      // H3 - Cards
      const h3s = document.querySelectorAll('h3');
      if (h3s.length > 0) {
        const s = window.getComputedStyle(h3s[0]);
        results.h3 = {
          fontSize: s.fontSize,
          fontFamily: s.fontFamily,
        };
      }
      
      // Body text
      const body = document.querySelector('p.text-muted-foreground');
      if (body) {
        const s = window.getComputedStyle(body);
        results.body = {
          fontSize: s.fontSize,
          lineHeight: s.lineHeight,
        };
      }
      
      // Button
      const btn = document.querySelector('.btn-base');
      if (btn) {
        const s = window.getComputedStyle(btn);
        results.button = {
          fontSize: s.fontSize,
          fontWeight: s.fontWeight,
          fontFamily: s.fontFamily,
        };
      }
      
      // Nav link
      const nav = document.querySelector('nav a');
      if (nav) {
        const s = window.getComputedStyle(nav);
        results.nav = {
          fontSize: s.fontSize,
          fontFamily: s.fontFamily,
        };
      }
      
      return results;
    });
    
    console.log(`\n=== ${vp}px ===`);
    if (data.h1) console.log('H1:', data.h1.fontSize, 'font:', data.h1.fontFamily.split(',')[0].trim());
    if (data.h2_first) console.log('H2:', data.h2_first.fontSize, 'font:', data.h2_first.fontFamily.split(',')[0].trim());
    if (data.h2_second) console.log('H2(2nd):', data.h2_second.fontSize);
    if (data.h3) console.log('H3:', data.h3.fontSize, 'font:', data.h3.fontFamily.split(',')[0].trim());
    if (data.body) console.log('Body:', data.body.fontSize);
    if (data.button) console.log('Button:', data.button.fontSize, 'weight:', data.button.fontWeight);
    if (data.nav) console.log('Nav:', data.nav.fontSize);
  }
  
  await browser.close();
})();
