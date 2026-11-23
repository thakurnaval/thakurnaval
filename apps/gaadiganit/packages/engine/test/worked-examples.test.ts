/**
 * Worked examples W1–W4 (SPEC §8), pinned to the paisa.
 *
 * They run against a frozen copy of defaults pack 2026.11.2, so updating
 * defaults/india.json does not move them. W1–W3 were checked line by line
 * (every month, every bucket) against an independent Python implementation
 * of SPEC §4: tools/verify/reference_tco.py.
 */
import { describe, expect, it } from 'vitest';
import raw from './fixtures/defaults-2026.11.2.json' with { type: 'json' };
import {
  breakdownTotal, breakEvenKm, calculate, parseDefaults, rupees, type CalculationInput,
} from '../src/index.ts';

const pack = parseDefaults(raw);

const W1: CalculationInput = {
  vehicle: { id: 'w1', make: 'Example', model: 'W1', category: 'hatchback', fuelType: 'petrol', useType: 'personal', exShowroom: rupees(650_000) },
  inputs: { cityId: 'delhi', usage: { ownershipMonths: 60, kmPerMonth: 1000, mileage: { primary: 20 } } },
};
const W2: CalculationInput = {
  vehicle: { id: 'w2', make: 'Example', model: 'W2', category: 'suv', fuelType: 'diesel', useType: 'personal', exShowroom: rupees(1_600_000) },
  inputs: {
    cityId: 'mumbai',
    usage: { ownershipMonths: 60, kmPerMonth: 1500, mileage: { primary: 17 } },
    finance: { downPayment: { kind: 'rate', value: 0.2 }, annualRate: 0.09, tenureMonths: 60 },
  },
};
const W3: CalculationInput = {
  vehicle: { id: 'w3', make: 'Example', model: 'W3', category: 'sedan', fuelType: 'cng', useType: 'commercial', exShowroom: rupees(750_000) },
  inputs: {
    cityId: 'bengaluru',
    usage: { ownershipMonths: 48, kmPerMonth: 250 * 26 }, // 250 km a day, 26 working days
    finance: { downPayment: { kind: 'rate', value: 0.2 }, annualRate: 0.095, tenureMonths: 48 },
    commercial: {
      earnings: { kind: 'per_km', value: rupees(14) },
      platformCommission: 0.25,
      driverSalaryPerMonth: rupees(18_000),
      idleDaysPerMonth: 4,
    },
  },
};
const w4 = (fuelType: 'petrol' | 'ev', exShowroom: number, mileage: number): CalculationInput => ({
  vehicle: { id: `w4-${fuelType}`, make: 'Example', model: 'W4', category: 'compact_suv', fuelType, useType: 'personal', exShowroom },
  inputs: { cityId: 'delhi', usage: { ownershipMonths: 84, kmPerMonth: 1000, mileage: { primary: mileage } } },
});

describe('W1 petrol hatchback, cash, Delhi', () => {
  const r = calculate(W1, pack);
  it('matches the reference to the paisa', () => {
    expect(r.upfront.onRoad).toBe(71_825_000);
    expect(r.exit.resale).toBe(32_500_000);
    expect(r.breakdown).toEqual({
      vehicle: 37_050_000, interest: 0, energy: 43_373_520, service: 2_700_000, tyres: 1_600_000,
      insurance: 9_316_353, other: 2_100_000, operating: 0, opportunityCost: 0,
    });
    expect(r.tco).toBe(96_139_873); // ₹9,61,398.73
    expect(breakdownTotal(r.breakdown)).toBe(r.tco);
  });
});

describe('W2 diesel SUV on loan, Mumbai', () => {
  const r = calculate(W2, pack);
  it('matches the reference to the paisa', () => {
    expect(r.upfront.onRoad).toBe(187_200_000);
    expect(r.loan!.emi).toBe(3_108_771);
    expect(r.exit).toEqual({ resale: 76_800_000, loanOutstanding: 0 });
    expect(r.breakdown).toEqual({
      vehicle: 105_600_000, interest: 36_766_279, energy: 73_326_012, service: 9_000_000, tyres: 4_000_000,
      insurance: 19_656_480, other: 4_100_000, operating: 0, opportunityCost: 0,
    });
    expect(r.tco).toBe(252_448_771); // ₹25,24,487.71
  });
});

describe('W3 commercial CNG cab, Bengaluru', () => {
  const r = calculate(W3, pack);
  it('matches the reference to the paisa', () => {
    expect(r.upfront.onRoad).toBe(89_130_000);
    expect(r.loan!.emi).toBe(1_791_380);
    expect(r.tco).toBe(362_420_401);
    expect(r.breakdown.operating).toBe(91_200_000);
    expect(r.commercial).toMatchObject({
      earningsTotal: 436_800_000,
      commissionTotal: 109_200_000,
      netProfitTotal: -57_494_401,
      paybackMonth: null,
    });
    expect(r.commercial!.roiPercent).toBeCloseTo(-195.3349, 4);
  });
  it('loses money with a hired driver at ₹14/km and 25% commission', () => {
    expect(r.commercial!.netProfitTotal).toBeLessThan(0);
  });
});

describe('W4 petrol vs EV break-even, Delhi', () => {
  const be = breakEvenKm(w4('petrol', rupees(1_000_000), 16), w4('ev', rupees(1_500_000), 7), pack);
  it('crosses between 500 and 3,000 km/month, petrol cheaper below', () => {
    expect(be.cheaperBelow).toBe('a');
    expect(be.km).toBeGreaterThan(500);
    expect(be.km).toBeLessThan(3000);
    expect(be.km).toBe(781); // the EV is cheaper above 781 km a month
  });
});
