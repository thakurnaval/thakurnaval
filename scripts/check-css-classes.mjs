// Checks that every class used in the prerendered HTML has a rule in the built CSS.
// Usage: node scripts/check-css-classes.mjs  (after npm run build)
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const files = walk(dist);
const css = files.filter(f => f.endsWith('.css')).map(f => fs.readFileSync(f, 'utf-8')).join('\n');
const html = files.filter(f => f.endsWith('.html'));
const tokens = new Map();
for (const f of html) {
  const s = fs.readFileSync(f, 'utf-8');
  for (const m of s.matchAll(/class="([^"]*)"/g)) {
    for (const t of m[1].split(/\s+/).filter(Boolean)) if (!tokens.has(t)) tokens.set(t, path.relative(dist, f));
  }
}
// Marker classes that intentionally have no CSS of their own.
const IGNORE = new Set([
  'group', 'peer', 'dark', 'sr-only-focusable', 'recharts-responsive-container',
  // Known no-ops that also did nothing under the old CDN: the typography plugin was never
  // loaded (prose*), and primary-light is not a defined colour.
  'prose', 'prose-slate', 'dark:prose-invert', 'lg:prose-lg', 'not-prose', 'dark:text-primary-light',
]);
const esc = t => t.replace(/&amp;/g, '&').replace(/[^a-zA-Z0-9_-]/g, c => '\\' + c).replace(/^(\d)/, d => '\\3' + d + ' ');
// lucide-* are icon marker classes; animate-in/slide-in-* come from a plugin the site never loaded (no effect before either).
const isMarker = t => t === 'lucide' || t.startsWith('lucide-') || t === 'animate-in' || /^(slide|fade|zoom)-(in|out)/.test(t);
const missing = [...tokens].filter(([t]) => !IGNORE.has(t) && !isMarker(t) && !t.startsWith('group/') && !css.includes('.' + esc(t)));
console.log(`${html.length} pages, ${tokens.size} distinct classes, ${missing.length} without CSS`);
for (const [t, f] of missing.slice(0, 40)) console.log(`  ${t}  (first seen in ${f})`);
process.exit(missing.length ? 1 : 0);
