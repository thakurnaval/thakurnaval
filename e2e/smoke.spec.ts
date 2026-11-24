import { test, expect, type Page } from '@playwright/test';

/** Requests that must never leave the test: lead capture and analytics. */
const LEAD_ENDPOINT = /script\.google\.com/;
const ANALYTICS = /googletagmanager\.com|google-analytics\.com/;

/**
 * Stub lead capture (records each POST so tests can assert on it), block analytics,
 * collect page errors, and pre-set the consent choice unless the test wants the banner.
 */
async function prepare(page: Page, opts: { showConsent?: boolean } = {}) {
  const leads: string[] = [];
  const analytics: string[] = [];
  const errors: string[] = [];
  await page.route(LEAD_ENDPOINT, route => {
    leads.push(route.request().postData() ?? '');
    return route.fulfill({ status: 200, body: 'ok' });
  });
  await page.route(ANALYTICS, route => {
    analytics.push(route.request().url());
    return route.abort();
  });
  page.on('pageerror', e => errors.push(e.message));
  if (!opts.showConsent) {
    await page.addInitScript(() => {
      try { window.localStorage.setItem('nthakur.consent', 'denied'); } catch { /* ignore */ }
    });
  }
  return { leads, analytics, errors };
}

test.describe('pages render', () => {
  const pages: [string, RegExp][] = [
    ['/', /Naval Thakur/i],
    ['/devops', /DevOps/i],
    ['/genai', /AI/i],
    ['/explore/mental-models', /Mental Models/i],
    ['/explore/toolkits/finops-cost-review', /FinOps Cost Review/i],
    ['/articles', /Articles|Insights/i],
    ['/articles/choosing-ai-use-cases', /AI Use Cases/i],
    ['/assessments', /Assessment/i],
    ['/privacy', /Privacy/i],
  ];
  for (const [path, heading] of pages) {
    test(`${path} renders with a heading and no errors`, async ({ page }) => {
      const { errors } = await prepare(page);
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator('h1').first()).toContainText(heading);
      await expect(page.locator('footer')).toBeVisible();
      expect(errors).toEqual([]);
    });
  }

  test('home shows the 4 latest articles', async ({ page }) => {
    await prepare(page);
    await page.goto('/');
    const insights = page.locator('section', { has: page.getByRole('heading', { name: 'Latest Insights' }) });
    await expect(insights.locator('a[href^="/articles/"], a[href^="/secops/"]')).toHaveCount(4);
  });
});

test('consent banner: declining hides it and loads no analytics', async ({ page }) => {
  const { analytics } = await prepare(page, { showConsent: true });
  await page.goto('/');
  const banner = page.getByRole('dialog', { name: /consent/i });
  await expect(banner).toBeVisible();
  await banner.getByRole('button', { name: 'Decline' }).click();
  await expect(banner).toBeHidden();
  await page.reload();
  await expect(page.getByRole('dialog', { name: /consent/i })).toBeHidden();
  expect(analytics).toEqual([]);
});

test('DevOps assessment runs through to results', async ({ page }) => {
  const { leads, errors } = await prepare(page);
  await page.goto('/devops/assessment');
  await page.getByRole('button', { name: /Start Assessment/ }).click();

  // Answer every question on each pillar, then move on.
  for (let pillar = 0; pillar < 10; pillar++) {
    const next = page.getByRole('button', { name: /Next Pillar|Get My Results/ });
    if (!(await next.isVisible().catch(() => false))) break;
    const questions = page.locator('div.shadow-sm', { has: page.locator('p', { hasText: /^Q\d+\./ }) });
    const n = await questions.count();
    expect(n).toBeGreaterThan(0);
    for (let i = 0; i < n; i++) await questions.nth(i).locator('button').nth(1).click();
    const label = (await next.textContent()) ?? '';
    await expect(next).toBeEnabled();
    await next.click();
    if (/Get My Results/.test(label)) break;
  }

  await page.getByPlaceholder('you@company.com').fill('smoke-test@example.com');
  await page.getByRole('button', { name: /View My Results/ }).click();
  await expect(page.getByText('Score by Pillar')).toBeVisible();
  expect(leads.length).toBe(1);
  expect(leads[0]).toContain('smoke-test@example.com');
  expect(errors).toEqual([]);
});

test('gated guide unlocks after email', async ({ page }) => {
  const { leads, errors } = await prepare(page);
  await page.goto('/secops/devsecops-playbook');
  await page.locator('#gate-email').fill('smoke-test@example.com');
  await page.locator('form').filter({ has: page.locator('#gate-email') }).getByRole('button').last().click();
  await expect(page.getByRole('button', { name: /Open|Save|Download/i }).first()).toBeVisible();
  expect(leads.length).toBe(1);
  expect(errors).toEqual([]);
});
