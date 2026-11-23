/** v2: model catalogue picker, my models, my fuel prices. */
import { afterEach, describe, expect, it } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import { calculate } from '@gaadiganit/engine';
import { defaults } from '../lib/defaults.ts';
import { MY_PRICES_SOURCE, withMyPrices } from '../lib/effectiveDefaults.ts';
import { applyModel, catalogue, modelFromScenario } from '../lib/catalogue.ts';
import { newScenario, toCalculationInput } from '../lib/scenario.ts';
import { updateSettings } from '../lib/settings.ts';
import { listModels, listScenarios, saveModel, saveScenario } from '../lib/storage.ts';
import QuickEstimate from './QuickEstimate.tsx';
import ScenarioPage from './ScenarioPage.tsx';
import Settings from './Settings.tsx';

const T = { timeout: 4000 };
afterEach(() => updateSettings({ myPrices: {} }));

function renderAt(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/new" element={<QuickEstimate />} />
        <Route path="/s/:id" element={<ScenarioPage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </MemoryRouter>,
  );
  return userEvent.setup();
}

describe('catalogue helpers', () => {
  const swift = catalogue.models.find((m) => m.id === 'maruti-swift')!;

  it('applies a model option to a scenario', () => {
    const s = applyModel(newScenario('delhi'), swift, swift.options[1]!);
    expect(s.vehicle).toMatchObject({ make: 'Maruti Suzuki', model: 'Swift', category: 'hatchback', fuelType: 'cng', exShowroom: 720_000_00 });
    expect(s.inputs.usage.mileage).toEqual({ primary: 32.85 });
    expect(s.categoryAuto).toBe(false);
  });

  it('round-trips a scenario into a saved model', () => {
    const s = { ...newScenario('delhi'), vehicle: { ...newScenario('delhi').vehicle, make: 'Tata', model: 'Old Nano' } };
    const m = modelFromScenario(s, calculate(toCalculationInput(s), defaults));
    expect(m).toMatchObject({ make: 'Tata', model: 'Old Nano', mine: true, source: 'You', verified: true });
    expect(m.options[0]!.priceLakh).toEqual([8, 8]);
    expect(applyModel(newScenario('delhi'), m, m.options[0]!).vehicle.exShowroom).toBe(s.vehicle.exShowroom);
  });
});

describe('my prices (v2)', () => {
  it('overrides city prices and labels the source', () => {
    const pack = withMyPrices(defaults, { petrolPerLitre: 10_000 }, '2026-11-23');
    expect(pack.cities.mumbai!.fuelPrices.value.petrolPerLitre).toBe(10_000);
    expect(pack.cities.mumbai!.fuelPrices.value.dieselPerLitre).toBe(defaults.cities.mumbai!.fuelPrices.value.dieselPerLitre);
    expect(pack.cities.mumbai!.fuelPrices.source).toBe(MY_PRICES_SOURCE);
    expect(withMyPrices(defaults, {}, undefined)).toBe(defaults);
  });

  it('flows into every calculation once set in Settings', async () => {
    const s = { ...newScenario('delhi'), name: 'Priced' };
    await saveScenario(s);
    updateSettings({ myPrices: { petrolPerLitre: 12_000 }, myPricesAsOf: '2026-11-23' });
    renderAt(`/s/${s.id}`);
    await screen.findByText(/This car costs you/, undefined, T);
    expect(screen.getAllByText(/your prices in Settings/).length).toBeGreaterThan(0);
    expect(screen.getAllByText('₹120.00/L').length).toBeGreaterThan(0);
  });

  it('can be entered and cleared on the Settings page', async () => {
    const user = renderAt('/settings');
    const petrol = await screen.findByLabelText('Petrol price (₹ per litre)');
    await user.type(petrol, '101.5');
    await user.click(screen.getByRole('button', { name: 'Clear my prices' }));
    expect(screen.queryByRole('button', { name: 'Clear my prices' })).toBeNull();
  });
});

describe('model picker (v2)', () => {
  it('fills price, body type and mileage in the quick estimate', async () => {
    const user = renderAt('/new');
    const box = await screen.findByRole('combobox', { name: 'Model' });
    await user.type(box, 'nexon ev');
    const option = (await screen.findAllByRole('option')).find((o) => /Tata Nexon EV/.test(o.textContent ?? '') && /Electric/.test(o.textContent ?? ''))!;
    await user.click(option);
    expect((screen.getByLabelText('Ex-showroom price') as HTMLInputElement).value).toBe('12,49,000');
    expect((screen.getByLabelText('Fuel type') as HTMLSelectElement).value).toBe('ev');
    expect(screen.getByText(/Filled in from Tata Nexon EV/)).toBeTruthy();
  });

  it('supports the keyboard', async () => {
    const user = renderAt('/new');
    const box = await screen.findByRole('combobox', { name: 'Model' });
    await user.type(box, 'creta');
    await screen.findAllByRole('option');
    await user.keyboard('{ArrowDown}{Enter}');
    expect((screen.getByLabelText('Fuel type') as HTMLSelectElement).value).toBe('diesel');
  });

  it('saves a calculation as my model and offers it first', async () => {
    const s = { ...newScenario('delhi'), name: 'Mine', vehicle: { ...newScenario('delhi').vehicle, make: 'Maruti Suzuki', model: 'Swift Dzire Old' } };
    await saveScenario(s);
    const user = renderAt(`/s/${s.id}`);
    await screen.findByText(/This car costs you/, undefined, T);
    await user.click(screen.getByRole('button', { name: 'Save to my models' }));
    expect(await screen.findByText(/Saved to my models/)).toBeTruthy();
    await waitFor(async () => expect((await listModels()).some((m) => m.model === 'Swift Dzire Old')).toBe(true));
  });

  it('lists and deletes my models in Settings', async () => {
    const s = newScenario('delhi');
    const m = modelFromScenario({ ...s, vehicle: { ...s.vehicle, make: 'Kia', model: 'Test Seltos' } }, calculate(toCalculationInput(s), defaults));
    await saveModel(m);
    const user = renderAt('/settings');
    expect(await screen.findByText('Kia Test Seltos')).toBeTruthy();
    const confirm = window.confirm;
    window.confirm = () => true;
    await user.click(screen.getByRole('button', { name: 'Delete: Kia Test Seltos' }));
    window.confirm = confirm;
    await waitFor(() => expect(screen.queryByText('Kia Test Seltos')).toBeNull());
  });
});

describe('commercial vehicles in the catalogue', () => {
  it('opens a truck in commercial mode with truck mileage and a road-tax note', async () => {
    const user = renderAt('/new');
    const box = await screen.findByRole('combobox', { name: 'Model' });
    await user.type(box, 'bada dost');
    const option = (await screen.findAllByRole('option')).find((o) => /Bada Dost/.test(o.textContent ?? ''))!;
    expect(option.textContent).toMatch(/Commercial/);
    expect(option.textContent).toMatch(/Light truck/);
    await user.click(option);
    expect(screen.getByText(/switched to commercial use/)).toBeTruthy();
    // No earnings yet: cost headline plus a prompt, not a "loses money" headline.
    expect(screen.getByText(/This car costs you/)).toBeTruthy();
    expect(screen.getByText(/Add earnings in the Earnings section/)).toBeTruthy();
    expect(screen.getByText(/Road tax for trucks and buses/)).toBeTruthy();
  });

  it('finds buses and minibuses', async () => {
    const user = renderAt('/new');
    const box = await screen.findByRole('combobox', { name: 'Model' });
    await user.type(box, 'starbus');
    const picked = () => within(screen.getByRole('listbox')).getAllByRole('option');
    await waitFor(() => expect(picked()).toHaveLength(2));
    await user.clear(box);
    await user.type(box, 'traveller');
    await waitFor(() => expect(picked()[0]!.textContent).toMatch(/Minibus/));
  });
});

describe('changing assumptions from the quick estimate', () => {
  it('shows what-if sliders and Change buttons on the quick estimate', async () => {
    renderAt('/new');
    expect(await screen.findByRole('heading', { name: 'What if?' }, T)).toBeTruthy();
    expect(screen.getByLabelText('Distance per month')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Try what-ifs ↓' })).toBeTruthy();
    expect(screen.getAllByRole('button', { name: /^Change: / }).length).toBeGreaterThan(5);
  });

  it('saves and opens the editor at the field when Change is tapped', async () => {
    const user = renderAt('/new');
    await user.click(await screen.findByRole('button', { name: 'Change: Tyres, cost per set' }, T));
    const field = await screen.findByLabelText('Tyres, cost per set', undefined, T);
    await waitFor(() => expect(field.closest('[hidden]')).toBeNull());
    expect((await listScenarios()).length).toBeGreaterThan(0);
  });
});
