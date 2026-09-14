const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const viewports = [
    { name: '360px', width: 360, height: 800 },
    { name: '390px', width: 390, height: 844 },
    { name: '430px', width: 430, height: 932 },
    { name: '640px', width: 640, height: 900 },
    { name: '768px', width: 768, height: 900 },
    { name: '1024px', width: 1024, height: 900 },
    { name: '1440px', width: 1440, height: 900 },
    { name: '1920px', width: 1920, height: 900 },
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait for fonts
    await page.waitForTimeout;
    
    const data = await page.evaluate(() => {
      const results = {};
      
      // Hero H1
      const heroH1 = document.querySelector('h1');
      if (heroH1) {
        const s = window.getComputedStyle(heroH1);
        results.heroH1 = {
          fontSize: s.fontSize,
          fontFamily: s.fontFamily,
          fontWeight: s.fontWeight,
          lineHeight: s.lineHeight,
          letterSpacing: s.letterSpacing,
          width: heroH1.getBoundingClientRect().width,
          height: heroH1.getBoundingClientRect().height,
        };
      }
      
      // Section H2 (from SectionIntro component)
      const sections = document.querySelectorAll('h2');
      if (sections.length > 1) {
        const s = window.getComputedStyle(sections[1]);
        results.sectionH2 = {
          fontSize: s.fontSize,
          fontFamily: s.fontFamily,
          fontWeight: s.fontWeight,
          lineHeight: s.lineHeight,
          letterSpacing: s.letterSpacing,
        };
      }
      
      // Eyebrow label
      const eyebrow = document.querySelector('p.label-eyebrow');
      if (eyebrow) {
        const s = window.getComputedStyle(eyebrow);
        results.eyebrow = {
          fontSize: s.fontSize,
          fontWeight: s.fontWeight,
          letterSpacing: s.letterSpacing,
          textTransform: s.textTransform,
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
      
      // Body paragraph
      const bodyText = document.querySelector('p.text-lg');
      if (bodyText) {
        const s = window.getComputedStyle(bodyText);
        results.bodyText = {
          fontSize: s.fontSize,
          lineHeight: s.lineHeight,
        };
      }
      
      // Navigation link
      const navLink = document.querySelector('nav a');
      if (navLink) {
        const s = window.getComputedStyle(navLink);
        results.navLink = {
          fontSize: s.fontSize,
          fontWeight: s.fontWeight,
          fontFamily: s.fontFamily,
        };
      }
      
      // Card H3
      const cardH3 = document.querySelector('article h3, .interactive-card h3');
      if (cardH3) {
        const s = window.getComputedStyle(cardH3);
        results.cardH3 = {
          fontSize: s.fontSize,
          fontFamily: s.fontFamily,
        };
      }
      
      // Form label (contact page)
      const formLabel = document.querySelector('form label span');
      if (formLabel) {
        const s = window.getComputedStyle(formLabel);
        results.formLabel = {
          fontSize: s.fontSize,
          fontWeight: s.fontWeight,
          textTransform: s.textTransform,
          letterSpacing: s.letterSpacing,
        };
      }
      
      // H3 in about principles
      const aboutH3 = document.querySelector('h2');
      // Check for overflow
      results.hasOverflow = document.documentElement.scrollWidth > window.innerWidth;
      results.viewportWidth = window.innerWidth;
      
      return results;
    });
    
    console.log(`\n=== ${vp.name} ===`);
    console.log('Hero H1:', data.heroH1 ? `${data.heroH1.fontSize} (${data.heroH1.width}px wide)` : 'N/A');
    console.log('Section H2:', data.sectionH2 ? data.sectionH2.fontSize : 'N/A');
    console.log('Eyebrow:', data.eyebrow ? `${data.eyebrow.fontSize}, weight:${data.eyebrow.fontWeight}` : 'N/A');
    console.log('Button:', data.button ? `${data.button.fontSize}` : 'N/A');
    console.log('Body text:', data.bodyText ? `${data.bodyText.fontSize}` : 'N/A');
    console.log('Overflow:', data.hasOverflow);
  }
  
  await browser.close();
})();
