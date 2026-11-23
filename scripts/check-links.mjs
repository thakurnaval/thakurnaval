// Checks every internal link in the prerendered site: the target page must exist,
// and a #fragment must match an element id on that page.
// Usage: node scripts/check-links.mjs  (after npm run build)
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const htmlFiles = walk(dist).filter(f => f.endsWith('.html') && !f.includes(`${path.sep}server${path.sep}`));

const routeOf = f => {
  const rel = path.relative(dist, f).split(path.sep).join('/');
  return rel === 'index.html' ? '/' : '/' + rel.replace(/\/?index\.html$/, '').replace(/\.html$/, '');
};
const pages = new Map(htmlFiles.map(f => [routeOf(f), fs.readFileSync(f, 'utf-8')]));
const idsOf = new Map([...pages].map(([r, html]) => [r, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]))]));

// Files served as-is (images, PDFs, sitemap, etc.).
const fileExists = p => {
  const f = path.join(dist, decodeURIComponent(p));
  return fs.existsSync(f) && fs.statSync(f).isFile();
};
// Paths handled by nginx redirects rather than pages.
const REDIRECTS = [/^\/gg(\/|$)/, /^\/gaadiganit(\/|$)/];

const problems = [];
let checked = 0;
for (const [route, html] of pages) {
  for (const m of html.matchAll(/\shref="([^"]+)"/g)) {
    const href = m[1].replace(/&amp;/g, '&');
    if (!href.startsWith('/') || href.startsWith('//')) {
      // Same-page fragment
      if (href.startsWith('#') && href.length > 1 && !idsOf.get(route).has(decodeURIComponent(href.slice(1)))) {
        problems.push(`${route} → ${href} (no element with that id)`);
      }
      continue;
    }
    checked++;
    const [pathAndQuery, fragment] = href.split('#');
    const target = pathAndQuery.split('?')[0].replace(/\/$/, '') || '/';
    if (REDIRECTS.some(r => r.test(target))) continue;
    if (pages.has(target)) {
      if (fragment && !idsOf.get(target).has(decodeURIComponent(fragment))) problems.push(`${route} → ${href} (no element with that id)`);
    } else if (!fileExists(target)) {
      problems.push(`${route} → ${href} (no such page or file)`);
    }
  }
}

const unique = [...new Set(problems)];
console.log(`${pages.size} pages, ${checked} internal links checked, ${unique.length} broken`);
for (const p of unique.slice(0, 50)) console.log('  ' + p);
process.exit(unique.length ? 1 : 0);
