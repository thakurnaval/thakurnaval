import { describe, expect, it } from 'vitest';
import raw from '../../../defaults/catalogue.json' with { type: 'json' };
import { calculate, lakhToPaise, parseCatalogue, rupees, searchCatalogue, type CatalogueModel } from '../src/index.ts';
import { defaults } from './helpers.ts';

const cat = parseCatalogue(raw);

describe('model catalogue (v2)', () => {
  it('validates the shipped file', () => {
    expect(cat.models.length).toBeGreaterThanOrEqual(40);
    expect(cat.models.every((m) => m.verified === false)).toBe(true);
  });

  it('gives every option a price and mileage the engine accepts', () => {
    for (const m of cat.models) {
      for (const o of m.options) {
        const r = calculate({
          vehicle: { id: m.id, make: m.make, model: m.model, category: m.category, fuelType: o.fuelType, useType: m.use ?? 'personal', exShowroom: lakhToPaise(o.priceLakh[0]) },
          inputs: { usage: { ownershipMonths: 60, kmPerMonth: 1000, mileage: { primary: o.mileage } } },
        }, defaults);
        expect(r.tco).toBeGreaterThan(0);
      }
    }
  });

  it('rejects bad entries', () => {
    const bad = (patch: Partial<CatalogueModel> & { options?: unknown }) => () => parseCatalogue({
      version: 'x', asOf: '2026-11-23',
      models: [{ id: 'a', make: 'A', model: 'B', category: 'sedan', source: 's', asOf: '2026-11-23', verified: false, options: [{ fuelType: 'petrol', priceLakh: [5, 6], mileage: 20 }], ...patch }],
    });
    expect(bad({ options: [{ fuelType: 'petrol', priceLakh: [7, 6], mileage: 20 }] })).toThrow(/Lowest price/);
    expect(bad({ options: [{ fuelType: 'ev', priceLakh: [7, 9], mileage: 30 }] })).toThrow(/Mileage must be 0.5–15/);
    expect(bad({ options: [{ fuelType: 'petrol', priceLakh: [5, 6], mileage: 20 }, { fuelType: 'petrol', priceLakh: [5, 6], mileage: 20 }] })).toThrow(/Repeated fuel/);
    expect(() => parseCatalogue({ version: 'x', asOf: '2026-11-23', models: [cat.models[0], cat.models[0]] })).toThrow(/Duplicate id/);
  });

  it('converts lakh to paise', () => {
    expect(lakhToPaise(5.79)).toBe(rupees(579_000));
  });
});

describe('searchCatalogue', () => {
  const names = (q: string, fuel?: Parameters<typeof searchCatalogue>[2]) => searchCatalogue(cat.models, q, fuel).map((m) => m.model);

  it('matches model and make words', () => {
    expect(names('swift')).toEqual(['Swift']);
    expect(names('nexon ev')[0]).toBe('Nexon EV');
    expect(names('tata p')).toEqual(['Punch', 'Punch EV']);
    expect(names('grand')).toEqual(expect.arrayContaining(['Grand i10 Nios', 'Grand Vitara']));
  });

  it('ignores case, spaces and hyphens', () => {
    expect(names('XUV3XO')).toEqual(['XUV 3XO']);
    expect(names('scorpio n')).toEqual(['Scorpio-N']);
  });

  it('ranks models with the wanted fuel first', () => {
    expect(names('nexon', 'ev')[0]).toBe('Nexon EV');
    expect(names('nexon', 'diesel')[0]).toBe('Nexon');
  });

  it('returns everything for an empty query and nothing for nonsense', () => {
    expect(names('')).toHaveLength(cat.models.length);
    expect(names('zzzz')).toEqual([]);
  });

  it('works on plain make/model records (user models)', () => {
    expect(searchCatalogue([{ make: 'My', model: 'Old Car' }], 'old')).toHaveLength(1);
  });
});

describe('commercial vehicles', () => {
  it('covers trucks, buses, minibuses and small commercial vehicles', () => {
    const cats = new Set(cat.models.map((m) => m.category));
    for (const c of ['mini_truck', 'pickup', 'light_truck', 'truck', 'heavy_truck', 'minibus', 'bus', 'mpv'] as const) expect(cats.has(c)).toBe(true);
    expect(cat.models.filter((m) => m.category === 'bus').every((m) => m.use === 'commercial')).toBe(true);
  });

  it('uses category mileage defaults for trucks and buses', () => {
    const truck = calculate({
      vehicle: { id: 't', make: 'Tata', model: 'Signa', category: 'heavy_truck', fuelType: 'diesel', useType: 'commercial', exShowroom: lakhToPaise(55) },
      inputs: { usage: { ownershipMonths: 60, kmPerMonth: 8000 } },
    }, defaults);
    const m = truck.assumptions.find((a) => a.path === 'usage.mileage.primary')!;
    expect(m.value).toBe(defaults.typicalMileageByCategory!.value.heavy_truck!.diesel);
    expect(truck.warnings.map((w) => w.code)).toContain('COMMERCIAL_NO_EARNINGS');
    // Petrol hatchbacks still use the fuel-wide default.
    const car = calculate({
      vehicle: { id: 'c', make: '', model: '', category: 'hatchback', fuelType: 'petrol', useType: 'personal', exShowroom: lakhToPaise(6) },
      inputs: { usage: { ownershipMonths: 60, kmPerMonth: 1000 } },
    }, defaults);
    expect(car.assumptions.find((a) => a.path === 'usage.mileage.primary')!.value).toBe(defaults.typicalMileage.value.petrol.primary);
  });

  it('accepts EV buses at about 1 km per kWh', () => {
    const bus = calculate({
      vehicle: { id: 'b', make: '', model: 'e-bus', category: 'bus', fuelType: 'ev', useType: 'commercial', exShowroom: lakhToPaise(150) },
      inputs: { usage: { ownershipMonths: 120, kmPerMonth: 6000 } },
    }, defaults);
    expect(bus.assumptions.find((a) => a.path === 'usage.mileage.primary')!.value).toBe(1);
  });

  it('finds commercial models by name', () => {
    expect(searchCatalogue(cat.models, 'ace').map((m) => m.model)).toEqual(expect.arrayContaining(['Ace Gold', 'Ace EV']));
    expect(searchCatalogue(cat.models, 'starbus').length).toBe(2);
    expect(searchCatalogue(cat.models, 'traveller')[0]!.category).toBe('minibus');
  });
});
