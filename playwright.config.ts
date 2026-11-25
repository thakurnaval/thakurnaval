import { defineConfig, devices } from '@playwright/test';

/**
 * Smoke tests against the built, prerendered site (`npm run build` first).
 * Run with `npm run test:e2e`. Lead-capture and analytics requests are intercepted
 * in the tests, so nothing is sent to the Google Apps Script or GA.
 */
const PORT = 4173;

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    // Serves dist/ with the same file resolution and 404 handling as nginx.conf.
    command: `node scripts/serve-dist.mjs ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
