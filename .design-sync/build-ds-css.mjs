import { readFileSync, writeFileSync } from 'node:fs';
const css = readFileSync('src/app/globals.css', 'utf8');

// Extract a brace-balanced block starting at a header regex (first match).
function block(re) {
  const m = re.exec(css);
  if (!m) throw new Error('not found: ' + re);
  let i = css.indexOf('{', m.index);
  let depth = 0, end = i;
  for (; end < css.length; end++) {
    if (css[end] === '{') depth++;
    else if (css[end] === '}') { depth--; if (depth === 0) { end++; break; } }
  }
  return css.slice(m.index, end);
}

const theme = block(/@theme inline\s*/);
const dark = block(/\n\.dark\s*\{/).trim();
// main :root — first ":root {" that is NOT ":root:root"
const rootRe = /\n:root\s*\{/g; let rm, rootStart = -1;
while ((rm = rootRe.exec(css))) { rootStart = rm.index + 1; break; }
let i = css.indexOf('{', rootStart), depth = 0, end = i;
for (; end < css.length; end++) { if (css[end]==='{') depth++; else if (css[end]==='}'){depth--; if(!depth){end++;break;}} }
const root = css.slice(rootStart, end);
const base = block(/@layer base\s*\{/);

const out = `/* Barefoot Digital DS — standalone stylesheet (generated from src/app/globals.css) */
@import "tailwindcss" source(none);
@source "../src/components/ui";
@source "../.design-sync/previews";

@custom-variant dark (&:is(.dark, .dark *));

${theme}

${root}

${dark}

${base}

/* Standalone font stack — the Next app binds these via next/font; ship a stack so text isn't browser-default */
:root { --font-inter: 'Inter'; --font-jetbrains-mono: 'JetBrains Mono'; }
body { font-family: var(--font-sans); }
`;
writeFileSync('dist-css/ds-input.css', out);
console.log('wrote dist-css/ds-input.css', out.length, 'bytes');
console.log('blocks: theme', theme.length, 'root', root.length, 'dark', dark.length, 'base', base.length);
