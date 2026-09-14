const fs = require('fs');
const os = require('os');
const path = require('path');

const savedFile = path.join(os.tmpdir(), 'rendered-styles.css');
const css = fs.readFileSync(savedFile, 'utf8');

// The Vite CSS module has the CSS as an escaped string in __vite__css = "..."
const startMarker = '__vite__css = ';
const startIdx = css.indexOf(startMarker);
if (startIdx === -1) {
  console.log('Marker not found');
  process.exit(1);
}

// The string starts after = "
const strStart = css.indexOf('"', startIdx + startMarker.length);
if (strStart === -1) {
  console.log('String start not found');
  process.exit(1);
}

// Extract the entire string (ends with \";)
let raw = css.substring(strStart + 1);
let endIdx = raw.lastIndexOf('";');
if (endIdx === -1) {
  endIdx = raw.lastIndexOf('"');
}
raw = raw.substring(0, endIdx);

// Unescape Vite's JSON-escaped content
let unescaped = raw
  .replace(/\\n/g, '\n')
  .replace(/\\t/g, '\t')
  .replace(/\\"/g, '"')
  .replace(/\\'/g, "'")
  .replace(/\\\\/g, '\\');

// Extract base theme font-size variables
console.log('=== Base font-size variables ===');
const baseRe = /--text-(5xl|6xl|7xl|8xl|4xl|3xl|2xl|lg):\s*([^;}\n]+)/g;
let bm;
while ((bm = baseRe.exec(unescaped)) !== null) {
  console.log('  --' + bm[1] + ': ' + bm[2].trim());
}

// Extract media query font-size overrides
console.log('\n=== Media query font-size overrides ===');
const mediaRe = /@media\s*\(([^)]+)\)\s*\{/g;
let m2;
while ((m2 = mediaRe.exec(unescaped)) !== null) {
  const media = m2[1];
  const blockStart = m2.index + m2[0].length;
  let depth = 1;
  let bp = blockStart;
  while (depth > 0 && bp < unescaped.length) {
    if (unescaped[bp] === '{') depth++;
    else if (unescaped[bp] === '}') depth--;
    bp++;
  }
  const block = unescaped.substring(blockStart, bp - 1);

  const sizes = {};
  for (const cls of ['text-5xl','text-6xl','text-7xl','text-8xl','text-4xl','text-3xl','text-2xl','text-lg']) {
    const clsRe = new RegExp('\\\\.' + cls + '[^{]*\\{([^}]+)\\}');
    const clsMatch = block.match(clsRe);
    if (clsMatch) {
      const fsMatch = clsMatch[1].match(/font-size:([^;]+)/);
      if (fsMatch) sizes[cls] = fsMatch[1].trim();
    }
  }
  if (Object.keys(sizes).length > 0) {
    console.log('@media (' + media + '):', JSON.stringify(sizes));
  }
}

// Also look for @theme blocks inside @media
console.log('\n=== @theme blocks with text-size overrides ===');
const themeInMedia = /@media\s*\([^)]+\)\s*\{[^}]*@theme\s*\{[^}]*\}[^}]*\}/gs;
let tm;
while ((tm = themeInMedia.exec(unescaped)) !== null) {
  const block = tm[0];
  const vars = block.match(/--text-(5xl|6xl|7xl|8xl|4xl|3xl|2xl|lg):\s*([^;]+)/g);
  if (vars && vars.length > 0) {
    const mediaMatch = block.match(/@media\s*\(([^)]+)\)/);
    console.log('  @media (' + (mediaMatch ? mediaMatch[1] : 'unknown') + '):');
    vars.forEach(v => console.log('    ' + v));
  }
}
