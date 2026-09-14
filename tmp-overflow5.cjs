const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const viewports = [360, 390, 430, 640, 768];
  
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp, height: 1200 });
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout;
    
    const data = await page.evaluate(() => {
      const sections = document.querySelectorAll('section');
      const overflowData = [];
      
      for (const section of sections) {
        const cls = section.className.toString().substring(0, 60);
        if (section.scrollWidth > section.clientWidth + 2) {
          const cs = window.getComputedStyle(section);
          overflowData.push({
            cls,
            width: section.getBoundingClientRect().width,
            sw: section.scrollWidth,
            cw: section.clientWidth,
            pL: cs.paddingLeft,
            pR: cs.paddingRight,
          });
        }
      }
      
      // Check the marquee issue
      const marquee = document.querySelector('.marquee-wrap');
      if (marquee) {
        const cs = window.getComputedStyle(marquee);
        overflowData.push({
          cls: 'MARQUEE',
          width: marquee.getBoundingClientRect().width,
          sw: marquee.scrollWidth,
          cw: marquee.clientWidth,
          overflow: cs.overflow,
        });
      }
      
      // Check container widths
      const containers = document.querySelectorAll('.mx-auto');
      const containerData = [];
      for (const c of containers) {
        const rect = c.getBoundingClientRect();
        if (rect.width > 0) {
          containerData.push({
            cls: c.className.toString().substring(0, 60),
            width: rect.width,
            parentWidth: c.parentElement.getBoundingClientRect().width,
            diff: rect.width - c.parentElement.getBoundingClientRect().width,
          });
        }
      }
      
      return {
        vpWidth: window.innerWidth,
        docScroll: document.documentElement.scrollWidth,
        docClient: document.documentElement.clientWidth,
        overflowSections: overflowData,
        containerData: containerData.slice(0, 10),
      };
    });
    
    console.log(`\n=== ${vp}px ===`);
    console.log(`Doc: ${data.docScroll}px vs ${data.docClient}px (overflow: ${data.docScroll - data.docClient}px)`);
    console.log('Overflowing sections:');
    data.overflowSections.forEach(s => {
      console.log(`  ${s.cls}: sw=${s.sw} cw=${s.cw} pad=${s.pL}+${s.pR}`);
    });
    console.log('Container widths (top 5):');
    data.containerData.slice(0, 5).forEach(c => {
      if (Math.abs(c.diff) > 1) {
        console.log(`  ${c.cls}: width=${c.width} parent=${c.parentWidth} diff=${c.diff}`);
      }
    });
  }
  
  await browser.close();
})();
