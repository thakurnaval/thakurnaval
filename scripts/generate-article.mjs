#!/usr/bin/env node
// Turns a filled-in Requirements/ARTICLE_TEMPLATE.md into a published article:
// creates pages/articles/<Name>.tsx and wires it into AppContent.tsx,
// constants.ts (FEATURED_ARTICLES), and vite.config.ts (SITEMAP_ROUTES).
//
// Usage: node scripts/generate-article.mjs path/to/article.md

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pickIcon } from './icon-map.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const KNOWN_TAGS = ['GenAI', 'DevOps', 'SecOps', 'FinOps', 'Career'];

function fail(msg) {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
}

// Repo files are checked out CRLF (core.autocrlf=true on Windows). Writing
// plain LF turns every untouched line into a diff noise line, so normalize
// before every write.
function toCRLF(s) {
  return s.replace(/\r\n/g, '\n').replace(/\n/g, '\r\n');
}
function writeFile(filePath, content) {
  fs.writeFileSync(filePath, toCRLF(content), 'utf-8');
}
// Read + normalize to LF so every regex below only has to think about '\n',
// never '\r\n' — toCRLF() restores CRLF when the file is written back out.
function readFileLF(filePath) {
  return fs.readFileSync(filePath, 'utf-8').replace(/\r\n/g, '\n');
}
// Apply a replace() and fail loudly if the anchor pattern didn't actually
// match, instead of silently no-op'ing (which is what a missed CRLF/LF
// mismatch used to do here).
function replaceOrFail(content, pattern, replacement, description) {
  const next = content.replace(pattern, replacement);
  if (next === content) fail(`Could not find the expected anchor to wire in ${description} — the target file may have changed shape.`);
  return next;
}

const inputPath = process.argv[2];
if (!inputPath) fail('Usage: node scripts/generate-article.mjs path/to/article.md');
const raw = fs.readFileSync(path.resolve(inputPath), 'utf-8');

// ---------- Frontmatter ----------
const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
if (!fmMatch) fail('Missing frontmatter (expected --- ... --- block at the top of the file).');
const [, fmBlock, bodyRaw] = fmMatch;

const fm = {};
for (const line of fmBlock.split('\n')) {
  const m = line.match(/^([a-zA-Z]+):\s*(.*)$/);
  if (m) fm[m[1].trim()] = m[2].trim();
}
for (const req of ['title', 'subtitle', 'slug', 'tag', 'date']) {
  if (!fm[req]) fail(`Frontmatter is missing required field: ${req}`);
}
if (!KNOWN_TAGS.includes(fm.tag)) {
  console.warn(`⚠ tag "${fm.tag}" isn't one of ${KNOWN_TAGS.join(', ')} — it won't match a filter chip on /articles.`);
}
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(fm.slug)) fail(`slug "${fm.slug}" must be lowercase-and-hyphenated.`);

const componentName = fm.slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('');
const route = `/articles/${fm.slug}`;
const keywords = (fm.keywords || '').split(',').map(s => s.trim()).filter(Boolean);

// ---------- Inline formatting ----------
function esc(s) {
  return s.replace(/`/g, "'");
}
function inline(text) {
  let t = esc(text);
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-secondary hover:underline">$1</a>');
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return t;
}

// ---------- Trailing pull-quote ----------
let body = bodyRaw.trim();
let closingQuote = null;
const quoteMatch = body.match(/\n?>\s?(.+)\s*$/);
if (quoteMatch && quoteMatch.index !== undefined) {
  const before = body.slice(0, quoteMatch.index).trimEnd();
  // Only treat as the closing quote if it's the last thing in the file.
  if (quoteMatch.index + quoteMatch[0].length >= body.length - 1) {
    closingQuote = quoteMatch[1].trim();
    body = before;
  }
}

// ---------- Sections ----------
const sections = [];
let current = null;
for (const line of body.split('\n')) {
  const h = line.match(/^##\s+(.+)$/);
  if (h) {
    if (current) sections.push(current);
    const dirMatch = h[1].trim().match(/^(.*?)\s*\{(\w+)\}\s*$/);
    current = dirMatch
      ? { heading: dirMatch[1].trim(), directive: dirMatch[2], lines: [] }
      : { heading: h[1].trim(), directive: 'prose', lines: [] };
  } else if (current) {
    current.lines.push(line);
  }
}
if (current) sections.push(current);
if (sections.length === 0) fail('No "## Heading" sections found in the body.');

function parseBullets(text) {
  const bullets = [];
  const intro = [];
  for (const line of text.split('\n')) {
    const b = line.match(/^-\s+\*\*(.+?):\*\*\s*(.+)$/);
    if (b) bullets.push({ label: b[1].trim(), text: b[2].trim() });
    else if (line.trim() && bullets.length === 0) intro.push(line.trim());
  }
  return { intro: intro.join(' '), bullets };
}

function paragraphs(text) {
  return text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
}

const usedIcons = new Set();
const bodyLines = [];
const faqEntries = [];

for (const section of sections) {
  const content = section.lines.join('\n').trim();
  if (!content) continue;

  if (section.directive === 'faq') {
    const pairs = [...content.matchAll(/Q:\s*(.+)\r?\nA:\s*([\s\S]*?)(?=\r?\nQ:|$)/g)];
    for (const [, q, a] of pairs) faqEntries.push({ q: esc(q.trim()), a: esc(a.trim().replace(/\s+/g, ' ')) });
    continue; // FAQ feeds schema only, matching the site's existing articles.
  }

  bodyLines.push('        <section' + (section.directive === 'callout'
    ? ' className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800"'
    : '') + '>');
  bodyLines.push(`          <h2 className="text-2xl font-bold text-primary dark:text-white mb-${section.directive === 'prose' ? '4' : '6'}">${esc(section.heading)}</h2>`);

  if (section.directive === 'prose') {
    for (const p of paragraphs(content)) {
      bodyLines.push(`          <p className="leading-relaxed">${inline(p)}</p>`);
    }
  } else if (section.directive === 'grid') {
    const { bullets } = parseBullets(content);
    bodyLines.push('          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">');
    for (const { label, text } of bullets) {
      const icon = pickIcon(label);
      usedIcons.add(icon);
      bodyLines.push('            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">');
      bodyLines.push(`              <${icon} className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />`);
      bodyLines.push(`              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">${esc(label)}</h3>`);
      bodyLines.push(`              <p className="text-sm">${inline(text)}</p>`);
      bodyLines.push('            </div>');
    }
    bodyLines.push('          </div>');
  } else if (section.directive === 'checklist') {
    const { bullets } = parseBullets(content);
    bodyLines.push('          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">');
    for (const { label, text } of bullets) {
      const icon = pickIcon(label);
      usedIcons.add(icon);
      bodyLines.push('            <div className="flex items-start">');
      bodyLines.push(`              <${icon} className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />`);
      bodyLines.push('              <div>');
      bodyLines.push(`                <h4 className="font-bold text-slate-900 dark:text-white">${esc(label)}</h4>`);
      bodyLines.push(`                <p className="text-sm">${inline(text)}</p>`);
      bodyLines.push('              </div>');
      bodyLines.push('            </div>');
    }
    bodyLines.push('          </div>');
  } else if (section.directive === 'callout') {
    const { intro, bullets } = parseBullets(content);
    bodyLines.push('          <div className="space-y-4">');
    if (intro) bodyLines.push(`            <p>${inline(intro)}</p>`);
    bodyLines.push('            <ul className="list-disc list-inside space-y-3">');
    for (const { label, text } of bullets) {
      bodyLines.push(`              <li><strong>${esc(label)}:</strong> ${inline(text)}</li>`);
    }
    bodyLines.push('            </ul>');
    bodyLines.push('          </div>');
  } else {
    fail(`Unknown section directive "{${section.directive}}" on heading "${section.heading}".`);
  }

  bodyLines.push('        </section>');
  bodyLines.push('');
}

if (closingQuote) {
  bodyLines.push('        <section className="border-t border-slate-200 dark:border-slate-800 pt-8">');
  bodyLines.push(`          <p className="italic">${inline(closingQuote)}</p>`);
  bodyLines.push('        </section>');
}

// ---------- Schema ----------
const schemaGraph = [
  {
    '@type': 'Article',
    headline: fm.title,
    description: fm.subtitle,
    author: { '@type': 'Person', name: 'Naval Thakur', url: 'https://nthakur.com/about', jobTitle: 'Practice Manager, SLB' },
    publisher: { '@type': 'Person', name: 'Naval Thakur', url: 'https://nthakur.com' },
    datePublished: fm.date,
    dateModified: fm.date,
    url: `https://nthakur.com${route}`,
    image: 'https://nthakur.com/assets/img/profile.jpg',
    keywords: keywords.join(', '),
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://nthakur.com${route}` },
  },
  {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nthakur.com' },
      { '@type': 'ListItem', position: 2, name: 'Articles', item: 'https://nthakur.com/articles' },
      { '@type': 'ListItem', position: 3, name: fm.title, item: `https://nthakur.com${route}` },
    ],
  },
];
if (faqEntries.length) {
  schemaGraph.push({
    '@type': 'FAQPage',
    mainEntity: faqEntries.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  });
}
const schema = { '@context': 'https://schema.org', '@graph': schemaGraph };

// ---------- Assemble file ----------
const iconImport = usedIcons.size ? `import { ${[...usedIcons].sort().join(', ')} } from 'lucide-react';\n` : '';
const fileLines = [
  '',
  "import React from 'react';",
  "import SimplePage from '../../components/SimplePage';",
  iconImport.trimEnd(),
  '',
  `const SCHEMA = ${JSON.stringify(schema, null, 2).replace(/^/gm, '').replace(/\n/g, '\n')};`,
  '',
  `const ${componentName}: React.FC = () => {`,
  '  return (',
  `    <SimplePage`,
  `      title="${esc(fm.title)}"`,
  `      subtitle="${esc(fm.subtitle)}"`,
  '      structuredData={SCHEMA}',
  '    >',
  '      <div className="space-y-10">',
  ...bodyLines,
  '      </div>',
  '    </SimplePage>',
  '  );',
  '};',
  '',
  `export default ${componentName};`,
  '',
].filter((l, i, arr) => !(l === '' && arr[i - 1] === '')); // collapse accidental double blanks

const articlePath = path.join(ROOT, 'pages', 'articles', `${componentName}.tsx`);
if (fs.existsSync(articlePath)) fail(`${articlePath} already exists — pick a different slug or delete it first.`);
writeFile(articlePath, fileLines.join('\n'));
console.log(`✓ wrote pages/articles/${componentName}.tsx`);

// ---------- Wire into AppContent.tsx ----------
const appContentPath = path.join(ROOT, 'AppContent.tsx');
let appContent = readFileLF(appContentPath);
const importLine = `import ${componentName} from './pages/articles/${componentName}';`;
if (appContent.includes(importLine)) fail(`AppContent.tsx already imports ${componentName}.`);
appContent = replaceOrFail(
  appContent,
  /(import BecomingFinOpsCertifiedPractitioner from '\.\/pages\/articles\/BecomingFinOpsCertifiedPractitioner';\n)/,
  `$1${importLine}\n`,
  'the article import in AppContent.tsx'
);
const routeLine = `        <Route path="${route}" element={<${componentName} />} />`;
appContent = replaceOrFail(
  appContent,
  /(\s*<Route path="\/articles\/finops-certified-practitioner" element=\{<BecomingFinOpsCertifiedPractitioner \/>\} \/>\n)/,
  `$1${routeLine}\n`,
  'the article route in AppContent.tsx'
);
writeFile(appContentPath, appContent);
console.log('✓ wired route + import into AppContent.tsx');

// ---------- Wire into constants.ts (FEATURED_ARTICLES) ----------
const constantsPath = path.join(ROOT, 'constants.ts');
let constants = readFileLF(constantsPath);
const entry = `  {\n    title: "${esc(fm.title)}",\n    summary: "${esc(fm.subtitle)}",\n    tag: "${esc(fm.tag)}",\n    link: "${route}"\n  }`;
constants = replaceOrFail(
  constants,
  /(export const FEATURED_ARTICLES: ArticleProps\[\] = \[[\s\S]*?)\n\];/,
  (full, listBody) => `${listBody},\n${entry}\n];`,
  'FEATURED_ARTICLES in constants.ts'
);
writeFile(constantsPath, constants);
console.log('✓ appended entry to FEATURED_ARTICLES in constants.ts');

// ---------- Wire into vite.config.ts (SITEMAP_ROUTES) ----------
const viteConfigPath = path.join(ROOT, 'vite.config.ts');
let viteConfig = readFileLF(viteConfigPath);
const sitemapLine = `  { path: '${route}',   priority: 0.8, changefreq: 'monthly' },\n`;
viteConfig = replaceOrFail(
  viteConfig,
  /(\s*\{ path: '\/articles\/finops-certified-practitioner',  priority: 0\.8, changefreq: 'monthly' \},\n)/,
  `$1${sitemapLine}`,
  'SITEMAP_ROUTES in vite.config.ts'
);
writeFile(viteConfigPath, viteConfig);
console.log('✓ appended entry to SITEMAP_ROUTES in vite.config.ts');

console.log(`\n✓ Published: ${route}\n  Run "npm run lint" to typecheck, then "npm run dev" to preview.\n`);
