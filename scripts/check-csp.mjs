// Checks that every inline <script> in the prerendered pages is allowed by its sha256 hash
// in the Content-Security-Policy in nginx.conf. Editing an inline script (e.g. the Google
// Analytics consent snippet in index.html) changes its hash; this check fails until the
// new hash is added to nginx.conf.
// Usage: node scripts/check-csp.mjs  (after npm run build)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const dist = path.resolve('dist');
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const pages = walk(dist).filter(f => f.endsWith('.html') && !f.includes(`${path.sep}server${path.sep}`));
const nginx = fs.readFileSync('nginx.conf', 'utf-8');

const needed = new Map();
for (const f of pages) {
  const html = fs.readFileSync(f, 'utf-8');
  // Inline scripts that execute: no src, and not JSON-LD data blocks.
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*ld\+json)[^>]*>([\s\S]*?)<\/script>/g)) {
    const hash = 'sha256-' + crypto.createHash('sha256').update(m[1], 'utf8').digest('base64');
    if (!needed.has(hash)) needed.set(hash, path.relative(dist, f));
  }
}
const missing = [...needed].filter(([h]) => !nginx.includes(`'${h}'`));
console.log(`${pages.length} pages, ${needed.size} distinct inline script(s), ${missing.length} not allowed by the CSP`);
for (const [h, f] of missing) console.log(`  add '${h}' to script-src in nginx.conf (first seen in ${f})`);
process.exit(missing.length ? 1 : 0);
