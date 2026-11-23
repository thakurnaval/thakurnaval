/** UI tests for v1.1 (compare, what-if, change links) and v1.2 (commercial). */
import { describe, expect, it } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import { newScenario, type StoredScenario } from '../lib/scenario.ts';
import { getScenario, listScenarios, saveScenario } from '../lib/storage.ts';
import { encodeShare } from '../lib/share.ts';
import ComparePage from './ComparePage.tsx';
import Home from './Home.tsx';
import ScenarioPage from './ScenarioPage.tsx';
import SharedPage from './SharedPage.tsx';

const T = { timeout: 10_000 };

function scenario(name: string, patch: (s: StoredScenario) => StoredScenario = (s) => s): StoredScenario {
  return patch({ ...newScenario('delhi'), name });
}

function renderAt(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/s/:id" element={<ScenarioPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/shared" element={<SharedPage />} />
      </Routes>
    </MemoryRouter>,
  );
  return userEvent.setup();
}

describe('Compare (UI-10)', () => {
  it('picks scenarios on Home and opens the comparison', async () => {
    const a = scenario('Petrol car');
    const b = scenario('EV car', (s) => ({ ...s, vehicle: { ...s.vehicle, fuelType: 'ev', exShowroom: 1_400_000_00 } }));
    await saveScenario(a);
    await saveScenario(b);
    const user = renderAt('/');
    await user.click(await screen.findByRole('button', { name: 'Compare' }));
    await user.click(screen.getByLabelText('Select Petrol car'));
    await user.click(screen.getByLabelText('Select EV car'));
    await user.click(screen.getByRole('button', { name: 'Compare 2' }));
    expect(await screen.findByRole('heading', { name: 'Comparison' }, T)).toBeTruthy();
    const table = screen.getByRole('table');
    expect(within(table).getByText('Cost per month')).toBeTruthy();
    expect(within(table).getAllByLabelText('Lowest').length).toBeGreaterThan(0);
    expect(screen.getByText(/km a month, (Petrol car|EV car) costs less/)).toBeTruthy();
  });

  it('asks for two when fewer are found', async () => {
    renderAt('/compare?ids=nope,gone');
    expect(await screen.findByText(/aren’t on this device/, undefined, T)).toBeTruthy();
  });
});

describe('Scenario page extras', () => {
  it('jumps to a field from its assumption (UI-05)', async () => {
    const s = scenario('Jump');
    await saveScenario(s);
    const user = renderAt(`/s/${s.id}`);
    await screen.findByText(/This car costs you/, undefined, T);
    expect(screen.getByLabelText('Tyres, cost per set').closest('[hidden]')).not.toBeNull();
    await user.click(screen.getByRole('button', { name: 'Change: Tyres, cost per set' }));
    await waitFor(() => expect(screen.getByLabelText('Tyres, cost per set').closest('[hidden]')).toBeNull());
  });

  it('tries what-ifs without changing the plan, then saves a copy (UI-11)', async () => {
    const s = scenario('Base plan');
    await saveScenario(s);
    renderAt(`/s/${s.id}`);
    await screen.findByText(/This car costs you/, undefined, T);
    const slider = screen.getByLabelText('Distance per month');
    const { fireEvent } = await import('@testing-library/react');
    fireEvent.change(slider, { target: { value: '3000' } });
    expect(await screen.findByText(/more than your plan/)).toBeTruthy();
    expect((await getScenario(s.id))!.inputs.usage.kmPerMonth).toBe(1000);
    fireEvent.click(screen.getByRole('button', { name: 'Save as a new calculation' }));
    await waitFor(async () => {
      const all = await listScenarios();
      expect(all.some((x) => x.name === 'Base plan (what-if)' && x.inputs.usage.kmPerMonth === 3000)).toBe(true);
    }, T);
  });

  it('shows the sensitivity table and share tools', async () => {
    const s = scenario('Share me');
    await saveScenario(s);
    renderAt(`/s/${s.id}`);
    expect(await screen.findByText('What moves the total most', undefined, T)).toBeTruthy();
    for (const name of ['Share link', 'WhatsApp card', 'Save as PDF', 'Download CSV']) {
      expect(screen.getByRole('button', { name })).toBeTruthy();
    }
  });

  it('shows profit and payback in commercial mode (UI-12)', async () => {
    const s = scenario('Cab', (x) => ({
      ...x,
      vehicle: { ...x.vehicle, fuelType: 'cng', category: 'sedan', useType: 'commercial', exShowroom: 750_000_00 },
      inputs: { ...x.inputs, usage: { ownershipMonths: 48, kmPerMonth: 6500 }, finance: {}, commercial: { earnings: { kind: 'per_km', value: 1600 }, platformCommission: 0.25 } },
    }));
    await saveScenario(s);
    renderAt(`/s/${s.id}`);
    expect(await screen.findByText(/earns you ₹[\d,]+ a month after all costs, and pays back its upfront cost in month \d+/, undefined, T)).toBeTruthy();
    expect(screen.getByText('Return on upfront')).toBeTruthy();
    expect(screen.getByText('Driver and permits')).toBeTruthy();
    expect(screen.getByRole('button', { name: /Earnings/ })).toBeTruthy();
  });
});

describe('Shared link page (SHR-02)', () => {
  it('opens a shared calculation read-only and saves it', async () => {
    const s = scenario('From a friend');
    const code = await encodeShare(s);
    const user = renderAt(`/shared#s=${code}`);
    expect(await screen.findByText('From a friend', undefined, T)).toBeTruthy();
    expect(screen.getByText(/This car costs you/)).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Save to my device' }));
    await waitFor(async () => expect((await listScenarios()).some((x) => x.name === 'From a friend')).toBe(true), T);
  });

  it('explains a broken link', async () => {
    renderAt('/shared#s=zBROKEN');
    expect(await screen.findByText(/broken or incomplete/, undefined, T)).toBeTruthy();
  });
});
