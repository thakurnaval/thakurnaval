import fs from 'node:fs';
import path from 'node:path';
import { test, expect, type Page } from '@playwright/test';

/**
 * Loads every prerendered page with the site's Content-Security-Policy *enforced*
 * (the exact policy from nginx.conf, whatever header name it is under there) and
 * fails on any violation. This is the check that has to pass before nginx.conf
 * moves the policy from report-only to enforcing, and it keeps guarding it afterwards.
 */
const NGINX = fs.readFileSync(path.resolve('nginx.conf'), 'utf-8');
const CSP = NGINX.match(/add_header\s+Content-Security-Policy(?:-Report-Only)?\s+"([^"]+)"/)?.[1];

const ROUTES = [...fs.readFileSync(path.resolve('dist/sitemap.xml'), 'utf-8')
  .matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map(m => m[1] || '/');

/** Analytics hits and lead capture never leave the test; gtag.js itself may load so its CSP needs are checked. */
const BLOCK = /script\.google\.com|google-analytics\.com|analytics\.google\.com|doubleclick\.net|google\.com\/(ccm|g)\//;

async function withEnforcedCsp(page: Page, consent: 'denied' | 'granted') {
  const violations: string[] = [];
  await page.exposeFunction('__cspViolation', (v: string) => violations.push(v));
  await page.addInitScript(([c]) => {
    try { window.localStorage.setItem('nthakur.consent', c); } catch { /* ignore */ }
    document.addEventListener('securitypolicyviolation', e => {
      (window as any).__cspViolation(`${e.violatedDirective} blocked ${e.blockedURI || '(inline)'}${e.sample ? ` "${e.sample.slice(0, 60)}"` : ''}`);
    });
  }, [consent]);
  await page.route('**/*', async route => {
    const req = route.request();
    if (BLOCK.test(req.url())) return route.abort();
    if (req.resourceType() !== 'document') return route.fallback();
    const response = await route.fetch();
    return route.fulfill({ response, headers: { ...response.headers(), 'content-security-policy': CSP! } });
  });
  return violations;
}

test.describe('Content-Security-Policy', () => {
  // One browser is enough for policy checks.
  test.skip(({ browserName, isMobile }) => browserName !== 'chromium' || isMobile, 'desktop Chrome only');

  test('policy is present in nginx.conf', () => {
    expect(CSP, 'no Content-Security-Policy header found in nginx.conf').toBeTruthy();
    expect(ROUTES.length).toBeGreaterThan(100);
  });

  // Each page also has to hydrate cleanly: a mismatch with the prerendered HTML throws
  // (React #418/#423) and React re-renders the whole page, which delays the largest paint.
  for (const route of ROUTES) {
    test(`no violations or hydration errors on ${route}`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', e => errors.push(e.message));
      const violations = await withEnforcedCsp(page, 'denied');
      await page.goto(route, { waitUntil: 'networkidle' });
      expect(violations).toEqual([]);
      expect(errors).toEqual([]);
    });
  }

  // With analytics accepted, gtag.js loads, so its script and connections are checked too.
  for (const route of ['/', '/devops/assessment', '/explore/mental-models']) {
    test(`no violations on ${route} with analytics accepted`, async ({ page }) => {
      const violations = await withEnforcedCsp(page, 'granted');
      await page.goto(route, { waitUntil: 'networkidle' });
      expect(violations).toEqual([]);
    });
  }

  // The printable guide opens in a popup that inherits the page's CSP.
  test('printable guide popup has no violations', async ({ page, context }) => {
    const violations = await withEnforcedCsp(page, 'denied');
    await page.route(/script\.google\.com/, r => r.fulfill({ status: 200, body: 'ok' }));
    await page.goto('/secops/devsecops-playbook');
    await page.locator('#gate-email').fill('csp-test@example.com');
    await page.locator('form').filter({ has: page.locator('#gate-email') }).getByRole('button').last().click();
    const popupErrors: string[] = [];
    context.on('page', p => p.on('console', m => { if (/Content Security Policy/i.test(m.text())) popupErrors.push(m.text()); }));
    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('button', { name: 'Open & Save PDF' }).click(),
    ]);
    await popup.waitForLoadState('load');
    await popup.waitForTimeout(1000);
    expect(await popup.locator('body').innerText()).toMatch(/DevSecOps/i);
    expect(violations).toEqual([]);
    expect(popupErrors).toEqual([]);
  });

  test('the unknown-URL page has no violations', async ({ page }) => {
    const violations = await withEnforcedCsp(page, 'denied');
    await page.goto('/this-page-does-not-exist', { waitUntil: 'networkidle' });
    expect(violations).toEqual([]);
  });
});
