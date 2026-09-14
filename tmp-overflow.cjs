const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Focus on mobile viewports where overflow was detected
  const viewports = [360, 390, 430];
  
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp, height: 900 });
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout;
    
    const data = await page.evaluate(() => {
      const results = {};
      
      // Check scrollWidth vs clientWidth
      results.scrollWidth = document.documentElement.scrollWidth;
      results.clientWidth = document.documentElement.clientWidth;
      results.overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth;
      
      // Find elements causing overflow
      const allElements = document.querySelectorAll('*');
      const overflowEls = [];
      for (const el of allElements) {
        if (el.scrollWidth > el.clientWidth + 1) {
          overflowEls.push({
            tag: el.tagName.toLowerCase(),
            class: el.className,
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
          });
        }
      }
      results.overflowElements = overflowEls.slice(0, 10);
      
      // Hero section
      const hero = document.querySelector('section');
      if (hero) {
        results.hero = {
          scrollWidth: hero.scrollWidth,
          clientWidth: hero.clientWidth,
          overflow: hero.scrollWidth > hero.clientWidth + 1,
        };
      }
      
      // H1 details
      const h1 = document.querySelector('h1');
      if (h1) {
        const rect = h1.getBoundingClientRect();
        const parent = h1.parentElement;
        const parentRect = parent.getBoundingClientRect();
        results.h1 = {
          fontSize: window.getComputedStyle(h1).fontSize,
          width: rect.width,
          height: rect.height,
          parentWidth: parentRect.width,
          parentLeft: parentRect.left,
          h1Left: rect.left,
        };
      }
      
      // Check the sticky hero container
      const sticky = document.querySelector('.sticky');
      if (sticky) {
        const rect = sticky.getBoundingClientRect();
        results.sticky = {
          width: rect.width,
          left: rect.left,
          scrollWidth: sticky.scrollWidth,
        };
      }
      
      return results;
    });
    
    console.log(`\n=== ${vp}px ===`);
    console.log('Document overflow:', data.overflow, `(${data.scrollWidth}px vs ${data.clientWidth}px)`);
    console.log('H1:', data.h1);
    console.log('Sticky:', data.sticky);
    console.log('Overflow elements (first 5):');
    if (data.overflowElements) {
      data.overflowElements.slice(0, 5).forEach(el => {
        console.log(`  ${el.tag}.${el.class}: ${el.scrollWidth}px vs ${el.clientWidth}px`);
      });
    }
  }
  
  await browser.close();
})();
