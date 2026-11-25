// Serves dist/ the way nginx.conf does, for the Playwright tests:
//   try_files $uri $uri/index.html =404;  error_page 404 /404.html;
// (vite preview instead falls back to the home page's HTML for /some/page, which breaks hydration.)
// Usage: node scripts/serve-dist.mjs [port]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const port = Number(process.argv[2] ?? 4173);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.xml': 'application/xml', '.txt': 'text/plain', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon', '.pdf': 'application/pdf',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.tf': 'text/plain', '.bicep': 'text/plain', '.yml': 'text/yaml',
};

const fileAt = rel => {
  const f = path.join(root, rel);
  if (!f.startsWith(root)) return null;
  try { return fs.statSync(f).isFile() ? f : null; } catch { return null; }
};

http.createServer((req, res) => {
  let uri;
  try { uri = decodeURIComponent(new URL(req.url, 'http://x').pathname); } catch { uri = '/'; }
  if (/^\/(gg|gaadiganit)(\/.*)?$/.test(uri)) {
    res.writeHead(301, { Location: 'https://gg.nthakur.com' }).end();
    return;
  }
  const file = fileAt(uri) ?? fileAt(path.join(uri, 'index.html'));
  const status = file ? 200 : 404;
  const body = file ?? path.join(root, '404.html');
  res.writeHead(status, { 'Content-Type': TYPES[path.extname(body)] ?? 'application/octet-stream' });
  fs.createReadStream(body).pipe(res);
}).listen(port, () => console.log(`Serving dist/ on http://localhost:${port}`));
