const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const viewports = [360, 390, 430];
  
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp, height: 900 });
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout;
    
    const data = await page.evaluate(() => {
      const main = document.querySelector('main');
      const children = main.children;
      const overflowEls = [];
      
      for (const child of children) {
        if (child.scrollWidth > child.clientWidth + 2) {
          const cs = window.getComputedStyle(child);
          overflowEls.push({
            tag: child.tagName.toLowerCase(),
            cls: child.className.toString().substring(0, 100),
            width: child.getBoundingClientRect().width,
            scrollW: child.scrollWidth,
            clientW: child.clientWidth,
            pL: cs.paddingLeft,
            pR: cs.paddingRight,
            mL: cs.marginLeft,
            mR: cs.marginRight,
            overflow: cs.overflow,
          });
        }
      }
      
      // Also check all elements with overflow
      const all = document.querySelectorAll('*');
      const wideEls = [];
      for (const el of all) {
        const cs = window.getComputedStyle(el);
        const sw = el.scrollWidth;
        const cw = el.clientWidth;
        if (sw > cw + 3) {
          // Skip html, body, main
          if (['html','body','main'].includes(el.tagName.toLowerCase())) continue;
          // Only report elements with meaningful class names
          const cls = el.className.toString();
          if (cls.length > 2) {
            wideEls.push({
              tag: el.tagName.toLowerCase(),
              cls: cls.substring(0, 80),
              sw, cw,
              diff: sw - cw,
            });
          }
        }
      }
      
      return {
        mainScroll: main.scrollWidth,
        mainClient: main.clientWidth,
        childOverflow: overflowEls,
        wideElements: wideEls.slice(0, 20),
      };
    });
    
    console.log(`\n=== ${vp}px ===`);
    console.log('Main:', data.mainScroll, 'vs', data.mainClient);
    console.log('Children overflowing:');
    data.childOverflow.forEach(el => {
      console.log(`  ${el.tag}.${el.cls}`);
      console.log(`    w=${el.width} sw=${el.scrollW} cw=${el.clientW} p=${el.pL}+${el.pR} m=${el.mL}+${el.mR}`);
    });
    console.log('Other wide elements:');
    data.wideElements.forEach(el => {
      console.log(`  ${el.tag}.${el.cls}: +${el.diff}px`);
    });
  }
  
  await browser.close();
})();
