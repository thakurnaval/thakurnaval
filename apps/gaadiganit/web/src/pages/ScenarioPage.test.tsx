import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import { newScenario } from '../lib/scenario.ts';
import { getScenario, saveScenario } from '../lib/storage.ts';
import ScenarioPage from './ScenarioPage.tsx';

async function open(mutate = (s: ReturnType<typeof newScenario>) => s) {
  const s = mutate({ ...newScenario('delhi'), name: 'Test car' });
  await saveScenario(s);
  render(
    <MemoryRouter initialEntries={[`/s/${s.id}`]}>
      <Routes><Route path="/s/:id" element={<ScenarioPage />} /></Routes>
    </MemoryRouter>,
  );
  await screen.findByText(/This car costs you/, undefined, { timeout: 4000 });
  return { s, user: userEvent.setup() };
}

describe('Scenario page (IN-03, DATA-01, DATA-02)', () => {
  it('shows every editor section with subtotals', async () => {
    await open();
    for (const title of ['Vehicle', 'Purchase', 'Loan', 'Usage and fuel', 'Running costs', 'Resale and extras']) {
      expect(screen.getByRole('button', { name: new RegExp(title) })).toBeTruthy();
    }
  });

  it('adds loan interest when buying on a loan, and autosaves', async () => {
    const { s, user } = await open();
    await user.click(screen.getByRole('button', { name: /Loan/ }));
    await user.click(screen.getByLabelText('Buying on a loan'));
    expect(await screen.findByText('Loan interest and fees')).toBeTruthy();
    expect(screen.getByText('EMI')).toBeTruthy();
    await waitFor(async () => expect((await getScenario(s.id))?.inputs.finance).toEqual({}), { timeout: 3000 });
    expect(screen.getByText('Saved on this device')).toBeTruthy();
  });

  it('offers to recalculate when the defaults pack changed', async () => {
    await open((s) => ({ ...s, defaultsVersion: '2020.1.0' }));
    expect(screen.getByText(/Default values have been updated/)).toBeTruthy();
  });

  it('says so when the scenario is not on this device', async () => {
    render(
      <MemoryRouter initialEntries={['/s/nope']}>
        <Routes><Route path="/s/:id" element={<ScenarioPage />} /></Routes>
      </MemoryRouter>,
    );
    expect(await screen.findByText(/isn’t saved on this device/)).toBeTruthy();
  });
});
