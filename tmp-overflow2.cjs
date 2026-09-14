const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 360, height: 900 });
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout;
  
  const data = await page.evaluate(() => {
    // Check body styles
    const body = document.body;
    const bodyStyle = window.getComputedStyle(body);
    
    // Find ALL elements that overflow
    const all = document.querySelectorAll('*');
    const overflowEls = [];
    for (const el of all) {
      const cs = window.getComputedStyle(el);
      if (el.scrollWidth > el.clientWidth + 2) {
        overflowEls.push({
          tag: el.tagName.toLowerCase(),
          cls: el.className.toString().substring(0, 80),
          scrollW: el.scrollWidth,
          clientW: el.clientWidth,
          marginL: cs.marginLeft,
          marginR: cs.marginRight,
          paddingL: cs.paddingLeft,
          paddingR: cs.paddingRight,
          borderL: cs.borderLeftWidth,
          borderR: cs.borderRightWidth,
        });
      }
    }
    
    return {
      body: {
        width: bodyStyle.width,
        maxWidth: bodyStyle.maxWidth,
        padding: bodyStyle.padding,
        margin: bodyStyle.margin,
        overflowX: bodyStyle.overflowX,
      },
      overflowCount: overflowEls.length,
      overflowElements: overflowEls.slice(0, 20),
    };
  });
  
  console.log('Body styles:', data.body);
  console.log('\nOverflow elements:', data.overflowCount);
  data.overflowElements.forEach(el => {
    console.log(`  ${el.tag}.${el.cls}`);
    console.log(`    scrollW=${el.scrollW} clientW=${el.clientW} mL=${el.marginL} mR=${el.marginR} pL=${el.paddingL} pR=${el.paddingR}`);
  });
  
  await browser.close();
})();
