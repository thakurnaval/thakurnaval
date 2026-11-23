import raw from '../../../defaults/india.json' with { type: 'json' };
import { parseDefaults, rupees, type CalculationInput, type DefaultsPack } from '../src/index.ts';

export const defaults: DefaultsPack = parseDefaults(raw);

/** Deep clone of the raw pack, for tests that mutate defaults. */
export function rawPack(): Record<string, unknown> {
  return structuredClone(raw) as Record<string, unknown>;
}

type Overrides = {
  vehicle?: Partial<CalculationInput['vehicle']>;
  inputs?: Partial<CalculationInput['inputs']>;
};

/** A petrol hatchback in Delhi, cash, 1,000 km/month for 60 months. */
export function input(o: Overrides = {}): CalculationInput {
  return {
    vehicle: {
      id: 'v1',
      make: 'Maruti Suzuki',
      model: 'Swift',
      category: 'hatchback',
      fuelType: 'petrol',
      useType: 'personal',
      exShowroom: rupees(650_000),
      ...o.vehicle,
    },
    inputs: {
      cityId: 'delhi',
      usage: { ownershipMonths: 60, kmPerMonth: 1000 },
      ...o.inputs,
    },
  };
}

/** Inputs that zero out every cost except the one a test is looking at. */
export const quiet = {
  maintenance: {
    service: { cost: 0, intervalKm: 1_000_000, intervalMonths: 1000 },
    tyres: { costPerSet: 0, lifeKm: 1_000_000 },
    battery12v: { cost: 0, intervalMonths: 1000 },
    insuranceRenewal: { kind: 'fixed', perYear: 0 },
    repairsBufferPerYear: 0,
    parkingTollsCleaningPerMonth: 0,
  },
} as const;
