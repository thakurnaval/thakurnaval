/**
 * Accessibility checks (NFR-03): axe-core on every screen, in English and Hindi.
 * jsdom has no layout, so colour contrast is left to a browser audit.
 */
import { afterAll, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import axe from 'axe-core';
import { setLanguage } from '../i18n/index.ts';
import { newScenario } from '../lib/scenario.ts';
import { saveScenario } from '../lib/storage.ts';
import ComparePage from './ComparePage.tsx';
import Home from './Home.tsx';
import QuickEstimate from './QuickEstimate.tsx';
import ScenarioPage from './ScenarioPage.tsx';
import Settings from './Settings.tsx';

async function violations() {
  const r = await axe.run(document.body, {
    rules: { 'color-contrast': { enabled: false }, region: { enabled: false } },
  });
  return r.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.map((n) => n.target.join(' ')).join(', ')})`);
}

async function renderAt(path: string) {
  const a = { ...newScenario('delhi'), name: 'Car A' };
  const b = { ...newScenario('mumbai'), name: 'Car B' };
  await saveScenario(a);
  await saveScenario(b);
  const url = path.replace(':a', a.id).replace(':b', b.id);
  render(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<QuickEstimate />} />
        <Route path="/s/:id" element={<ScenarioPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </MemoryRouter>,
  );
}

const SCREENS: [string, string, RegExp][] = [
  ['home', '/', /Car A/],
  ['quick estimate', '/new', /This car costs you|यह गाड़ी/],
  ['scenario', '/s/:a', /This car costs you|यह गाड़ी/],
  ['compare', '/compare?ids=:a,:b', /Car A/],
  ['settings', '/settings', /.+/],
];

for (const lang of ['en', 'hi'] as const) {
  describe(`accessibility (${lang})`, () => {
    afterAll(() => setLanguage('en'));
    for (const [name, path, ready] of SCREENS) {
      it(`${name} has no axe violations`, async () => {
        setLanguage(lang);
        await renderAt(path);
        await screen.findAllByText(ready, undefined, { timeout: 10_000 });
        expect(await violations()).toEqual([]);
      });
    }
  });
}
