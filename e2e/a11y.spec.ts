import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Automated accessibility checks (axe-core, WCAG 2.1 A and AA rules) on the pages people
 * land on most, in light and dark mode, on desktop and mobile. axe catches roughly a third
 * of real issues; keyboard and screen-reader checks still need a person.
 */
const PAGES = [
  '/',
  '/secops/devsecops-playbook',
  '/devops/assessment',
  '/explore/mental-models',
  '/articles/choosing-ai-use-cases',
  '/devops/sre',
  '/this-page-does-not-exist',
];

for (const theme of ['light', 'dark'] as const) {
  for (const path of PAGES) {
    test(`${path} has no WCAG A/AA violations (${theme})`, async ({ page }) => {
      await page.route(/script\.google\.com|googletagmanager\.com|google-analytics\.com/, r => r.abort());
      await page.addInitScript(t => {
        try {
          window.localStorage.setItem('nthakur.consent', 'denied');
          window.localStorage.setItem('theme', t);
        } catch { /* ignore */ }
      }, theme);
      await page.goto(path, { waitUntil: 'networkidle' });
      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      const summary = violations.map(v => `${v.id} (${v.impact}): ${v.help} — ${v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(' | ')}${v.nodes.length > 3 ? ` +${v.nodes.length - 3} more` : ''}`);
      expect(summary).toEqual([]);
    });
  }
}
