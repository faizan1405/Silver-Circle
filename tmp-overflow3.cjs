const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  for (const vp of [360, 390, 430]) {
    await page.setViewportSize({ width: vp, height: 900 });
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout;
    
    const data = await page.evaluate(() => {
      // Check body and html styles
      const html = document.documentElement;
      const body = document.body;
      const htmlStyle = window.getComputedStyle(html);
      const bodyStyle = window.getComputedStyle(body);
      
      // Check ALL ancestors of the overflowing section to find the cause
      const section = document.querySelector('section');
      if (!section) return { error: 'no section found' };
      
      let el = section;
      const chain = [];
      while (el && el !== document.documentElement) {
        const cs = window.getComputedStyle(el);
        chain.push({
          tag: el.tagName.toLowerCase(),
          cls: el.className.toString().substring(0, 60),
          width: el.getBoundingClientRect().width,
          clientWidth: el.clientWidth,
          scrollWidth: el.scrollWidth,
          paddingL: cs.paddingLeft,
          paddingR: cs.paddingRight,
          marginL: cs.marginLeft,
          marginR: cs.marginRight,
          boxSizing: cs.boxSizing,
          display: cs.display,
          position: cs.position,
          overflow: cs.overflow,
          minWidth: cs.minWidth,
          maxWidth: cs.maxWidth,
        });
        el = el.parentElement;
      }
      
      return {
        html: {
          width: htmlStyle.width,
          clientWidth: html.clientWidth,
          scrollWidth: html.scrollWidth,
          overflowX: htmlStyle.overflowX,
          minWidth: htmlStyle.minWidth,
        },
        body: {
          width: bodyStyle.width,
          clientWidth: body.clientWidth,
          scrollWidth: body.scrollWidth,
          overflowX: bodyStyle.overflowX,
          minWidth: bodyStyle.minWidth,
        },
        chain: chain,
      };
    });
    
    console.log(`\n=== ${vp}px ===`);
    console.log('HTML:', data.html);
    console.log('Body:', data.body);
    console.log('Ancestor chain (first 8):');
    data.chain.slice(0, 8).forEach(c => {
      console.log(`  ${c.tag}.${c.cls}: w=${c.width} cw=${c.clientWidth} sw=${c.scrollWidth} pwL=${c.paddingL} pwR=${c.paddingR}`);
    });
  }
  
  await browser.close();
})();
