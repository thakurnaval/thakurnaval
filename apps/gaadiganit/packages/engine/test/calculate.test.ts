import { describe, expect, it } from 'vitest';
import {
  breakdownTotal, calculate, EngineInputError, rupees, validateInput, type CalculationResult,
} from '../src/index.ts';
import { defaults, input, quiet } from './helpers.ts';

/** Invariants every result must satisfy (ENG-04, ENG-16). */
function checkInvariants(r: CalculationResult) {
  expect(breakdownTotal(r.breakdown)).toBe(r.tco);
  const last = r.months.at(-1)!;
  expect(r.tco).toBe(last.cumulative + r.exit.loanOutstanding - r.exit.resale + r.breakdown.opportunityCost);
  for (const m of r.months) {
    expect(m.total).toBe(m.emi + m.energy + m.service + m.tyres + m.insurance + m.other);
    expect(m.emi).toBe(m.interest + m.principal);
  }
  const principalPaid = r.months.reduce((a, m) => a + m.principal, 0);
  expect(principalPaid + r.exit.loanOutstanding).toBe(r.upfront.loanPrincipal);
  for (const v of [r.tco, r.costPerMonth, ...Object.values(r.breakdown)]) expect(Number.isSafeInteger(v)).toBe(true);
}

describe('calculate — cash purchase (W1 shape)', () => {
  const r = calculate(input(), defaults);

  it('satisfies the invariants', () => checkInvariants(r));

  it('builds the on-road price (SPEC §4.1)', () => {
    // ₹6.5 lakh in Delhi: road tax 7% (₹6–10 lakh band), insurance 3.5% (hatchback)
    expect(r.upfront.roadTax).toBe(rupees(45_500));
    expect(r.upfront.insuranceYear1).toBe(rupees(22_750));
    expect(r.upfront.onRoad).toBe(rupees(718_250));
    expect(r.upfront.cashUpfront).toBe(r.upfront.onRoad);
    expect(r.loan).toBeNull();
  });

  it('has N month rows and derived metrics', () => {
    expect(r.months).toHaveLength(60);
    expect(r.totalKm).toBe(60_000);
    expect(r.costPerMonth).toBe(Math.round(r.tco / 60));
    expect(r.costPerKm).toBe(Math.round(r.tco / 60_000));
    expect(r.depreciation).toBe(r.upfront.onRoad - r.exit.resale);
  });

  it('records provenance for every default it used (ENG-02)', () => {
    const price = r.assumptions.find((a) => a.path === 'usage.fuelPrice.primary')!;
    expect(price.value).toBe(defaults.cities.delhi!.fuelPrices.value.petrolPerLitre);
    expect(price.provenance).toEqual({ kind: 'default', source: 'PLACEHOLDER', asOf: '2026-11-23' });
    expect(r.assumptions.find((a) => a.path === 'location.cityId')!.provenance).toEqual({ kind: 'user' });
  });

  it('is deterministic (ENG-01)', () => {
    expect(calculate(input(), defaults)).toEqual(r);
  });
});

describe('calculate — loan (W2 shape)', () => {
  const w2 = input({
    vehicle: { category: 'suv', fuelType: 'diesel', exShowroom: rupees(1_600_000) },
    inputs: {
      cityId: 'mumbai',
      usage: { ownershipMonths: 60, kmPerMonth: 1500, mileage: { primary: 17 } },
      finance: { annualRate: 0.09, tenureMonths: 60 },
    },
  });
  const r = calculate(w2, defaults);

  it('satisfies the invariants', () => checkInvariants(r));

  it('finances 80% of on-road by default (D1)', () => {
    expect(r.upfront.downPayment).toBe(Math.round(r.upfront.onRoad * 0.2));
    expect(r.upfront.loanPrincipal).toBe(r.upfront.onRoad - r.upfront.downPayment);
    expect(r.exit.loanOutstanding).toBe(0);
    expect(r.interestPaid).toBeGreaterThan(0);
    expect(r.breakdown.interest).toBe(r.interestPaid);
  });

  it('carries an outstanding balance when tenure > ownership (ENG-08)', () => {
    const long = calculate(input({ inputs: { usage: { ownershipMonths: 60, kmPerMonth: 1000 }, finance: { tenureMonths: 84 } } }), defaults);
    checkInvariants(long);
    expect(long.exit.loanOutstanding).toBe(long.months.at(-1)!.loanBalance);
    expect(long.exit.loanOutstanding).toBeGreaterThan(0);
  });

  it('stops EMI after a short tenure (ENG-09)', () => {
    const short = calculate(input({ inputs: { usage: { ownershipMonths: 60, kmPerMonth: 1000 }, finance: { tenureMonths: 24, processingFee: rupees(5000) } } }), defaults);
    checkInvariants(short);
    expect(short.months[23]!.emi).toBeGreaterThan(0);
    expect(short.months[24]!.emi).toBe(0);
    expect(short.upfront.cashUpfront).toBe(short.upfront.downPayment + rupees(5000));
    expect(short.breakdown.interest).toBe(short.interestPaid + rupees(5000));
  });

  it('accepts a down payment as an amount', () => {
    const r2 = calculate(input({ inputs: { usage: { ownershipMonths: 36, kmPerMonth: 800 }, finance: { downPayment: { kind: 'amount', value: rupees(200_000) } } } }), defaults);
    expect(r2.upfront.downPayment).toBe(rupees(200_000));
  });

  it('accepts a down payment as a rate', () => {
    const r2 = calculate(input({ inputs: { usage: { ownershipMonths: 36, kmPerMonth: 800 }, finance: { downPayment: { kind: 'rate', value: 0.5 } } } }), defaults);
    expect(r2.upfront.downPayment).toBe(Math.round(r2.upfront.onRoad * 0.5));
    expect(r2.assumptions.find((a) => a.path === 'finance.downPayment.rate')!.provenance).toEqual({ kind: 'user' });
  });

  it('rejects a down payment above on-road', () => {
    expect(() => calculate(input({ inputs: { usage: { ownershipMonths: 36, kmPerMonth: 800 }, finance: { downPayment: { kind: 'amount', value: rupees(5_000_000) } } } }), defaults))
      .toThrow(/Down payment cannot exceed/);
  });
});

describe('calculate — energy (ENG-06)', () => {
  const base = { ...quiet, exit: { resale: { kind: 'amount', value: 0 } } } as const;

  it('applies the real-world factor and steps inflation at month 13', () => {
    const r = calculate(input({ inputs: { ...base, usage: { ownershipMonths: 25, kmPerMonth: 1500, mileage: { primary: 20 }, fuelPrice: { primary: 10_000 }, fuelInflation: 0.1 } } }), defaults);
    // 1,500 km ÷ (20 × 0.75) = 100 litres × ₹100
    expect(r.months[0]!.energy).toBe(rupees(10_000));
    expect(r.months[11]!.energy).toBe(rupees(10_000));
    expect(r.months[12]!.energy).toBe(rupees(11_000));
    expect(r.months[24]!.energy).toBe(rupees(12_100));
  });

  it('skips the factor for real-world mileage', () => {
    const r = calculate(input({ inputs: { ...base, usage: { ownershipMonths: 1, kmPerMonth: 1500, mileage: { primary: 15, isClaimed: false }, fuelPrice: { primary: 10_000 } } } }), defaults);
    expect(r.months[0]!.energy).toBe(rupees(10_000));
    expect(r.assumptions.some((a) => a.path === 'usage.realWorldFactor')).toBe(false);
  });

  it('splits dual fuel by CNG share', () => {
    const r = calculate(input({
      vehicle: { fuelType: 'dual_petrol_cng' },
      inputs: { ...base, usage: { ownershipMonths: 1, kmPerMonth: 1000, cngShare: 0.5, mileage: { primary: 20, secondary: 25, isClaimed: false }, fuelPrice: { primary: 10_000, secondary: 8_000 } } },
    }), defaults);
    // 500 km ÷ 20 × ₹100 + 500 km ÷ 25 × ₹80 = ₹2,500 + ₹1,600
    expect(r.months[0]!.energy).toBe(rupees(4_100));
  });

  it('uses typical dual-fuel mileage and city prices by default', () => {
    const r = calculate(input({ vehicle: { fuelType: 'dual_petrol_cng' } }), defaults);
    checkInvariants(r);
    expect(r.assumptions.find((a) => a.path === 'usage.mileage.secondary')!.value).toBe(26);
    expect(r.assumptions.find((a) => a.path === 'usage.cngShare')!.value).toBe(0.8);
  });

  it('falls back to CNG mileage when the pack has no dual-fuel CNG figure', () => {
    const pack = JSON.parse(JSON.stringify(defaults)) as typeof defaults;
    delete pack.typicalMileage.value.dual_petrol_cng.secondary;
    const r = calculate(input({ vehicle: { fuelType: 'dual_petrol_cng' } }), pack);
    expect(r.assumptions.find((a) => a.path === 'usage.mileage.secondary')!.value).toBe(pack.typicalMileage.value.cng.primary);
  });

  it('splits EV charging between home and public', () => {
    const r = calculate(input({
      vehicle: { fuelType: 'ev' },
      inputs: { ...base, usage: { ownershipMonths: 1, kmPerMonth: 1000, evHomeShare: 0.75, mileage: { primary: 5, isClaimed: false }, fuelPrice: { primary: 800, secondary: 2000 } } },
    }), defaults);
    // 750 ÷ 5 × ₹8 + 250 ÷ 5 × ₹20 = ₹1,200 + ₹1,000
    expect(r.months[0]!.energy).toBe(rupees(2_200));
  });

  it('prices diesel, CNG and hybrid from the city', () => {
    const delhi = defaults.cities.delhi!.fuelPrices.value;
    const cases = [['diesel', delhi.dieselPerLitre], ['cng', delhi.cngPerKg], ['strong_hybrid', delhi.petrolPerLitre]] as const;
    for (const [fuelType, expected] of cases) {
      const r = calculate(input({ vehicle: { fuelType } }), defaults);
      checkInvariants(r);
      expect(r.assumptions.find((a) => a.path === 'usage.fuelPrice.primary')!.value).toBe(expected);
    }
  });

  it('gives null cost per km for zero km (ENG-14)', () => {
    const r = calculate(input({ inputs: { usage: { ownershipMonths: 12, kmPerMonth: 0 } } }), defaults);
    expect(r.costPerKm).toBeNull();
    expect(r.breakdown.energy).toBe(0);
  });
});

describe('calculate — maintenance', () => {
  const months = (r: CalculationResult, key: 'service' | 'tyres' | 'insurance' | 'other') =>
    r.months.filter((m) => m[key] > 0).map((m) => m.m);

  it('schedules km-based services on the odometer (ENG-10)', () => {
    const r = calculate(input({ inputs: { usage: { ownershipMonths: 24, kmPerMonth: 1500 }, maintenance: { service: { cost: 100, intervalKm: 10_000, intervalMonths: 12 } } } }), defaults);
    expect(months(r, 'service')).toEqual([7, 14, 20]);
  });

  it('schedules time-based services for low mileage', () => {
    const r = calculate(input({ inputs: { usage: { ownershipMonths: 36, kmPerMonth: 300 }, maintenance: { service: { cost: 100, intervalKm: 10_000, intervalMonths: 12 } } } }), defaults);
    expect(months(r, 'service')).toEqual([12, 24, 36]);
  });

  it('charges several services when one month covers several intervals', () => {
    const r = calculate(input({ inputs: { usage: { ownershipMonths: 1, kmPerMonth: 20_000 }, maintenance: { service: { cost: 100, intervalKm: 10_000, intervalMonths: 12 } } } }), defaults);
    expect(r.months[0]!.service).toBe(200);
  });

  it('replaces tyres at each multiple of tyre life (ENG-11)', () => {
    const r = calculate(input({ inputs: { usage: { ownershipMonths: 60, kmPerMonth: 1500 }, maintenance: { tyres: { costPerSet: 100, lifeKm: 40_000 } } } }), defaults);
    // 40,000 km at month 27 (40,500), 80,000 km at month 54 (81,000)
    expect(months(r, 'tyres')).toEqual([27, 54]);
  });

  it('declines insurance renewals yearly (ENG-12)', () => {
    const r = calculate(input({ inputs: { usage: { ownershipMonths: 37, kmPerMonth: 1000 }, purchase: { insuranceYear1: { kind: 'amount', value: rupees(20_000) } }, maintenance: { insuranceRenewal: { kind: 'decline', rate: 0.1 } } } }), defaults);
    expect(months(r, 'insurance')).toEqual([13, 25, 37]);
    expect(r.months[12]!.insurance).toBe(rupees(18_000));
    expect(r.months[24]!.insurance).toBe(rupees(16_200));
    expect(r.breakdown.insurance).toBe(rupees(20_000 + 18_000 + 16_200 + 14_580));
  });

  it('accepts a fixed insurance renewal', () => {
    const r = calculate(input({ inputs: { usage: { ownershipMonths: 24, kmPerMonth: 1000 }, maintenance: { insuranceRenewal: { kind: 'fixed', perYear: rupees(9_000) } } } }), defaults);
    expect(r.months[12]!.insurance).toBe(rupees(9_000));
  });

  it('charges other costs on their schedule', () => {
    const r = calculate(input({
      inputs: {
        usage: { ownershipMonths: 24, kmPerMonth: 1000 },
        maintenance: {
          ...quiet.maintenance,
          battery12v: { cost: 1000, intervalMonths: 18 },
          repairsBufferPerYear: 500,
          parkingTollsCleaningPerMonth: 10,
          custom: [
            { name: 'Seat covers', amount: 3, frequency: 'once' },
            { name: 'Wash', amount: 2, frequency: 'monthly' },
            { name: 'PUC', amount: 7, frequency: 'yearly' },
          ],
        },
      },
    }), defaults);
    expect(r.months[0]!.other).toBe(10 + 3 + 2);
    expect(r.months[1]!.other).toBe(10 + 2);
    expect(r.months[11]!.other).toBe(10 + 2 + 500 + 7);
    expect(r.months[17]!.other).toBe(10 + 2 + 1000);
    checkInvariants(r);
  });
});

describe('calculate — purchase, resale and extras', () => {
  it('accepts road tax and insurance as amounts or rates', () => {
    const r = calculate(input({ inputs: { usage: { ownershipMonths: 12, kmPerMonth: 1000 }, purchase: { roadTax: { kind: 'amount', value: rupees(10_000) }, insuranceYear1: { kind: 'rate', value: 0.02 }, accessories: rupees(5_000), discounts: rupees(2_000) } } }), defaults);
    expect(r.upfront.roadTax).toBe(rupees(10_000));
    expect(r.upfront.insuranceYear1).toBe(rupees(13_000));
    expect(r.upfront.onRoad).toBe(rupees(650_000 + 10_000 + 13_000 + 5_000 - 2_000));
    const pct = calculate(input({ inputs: { usage: { ownershipMonths: 12, kmPerMonth: 1000 }, purchase: { roadTax: { kind: 'rate', value: 0.1 } } } }), defaults);
    expect(pct.upfront.roadTax).toBe(rupees(65_000));
  });

  it('rejects discounts that wipe out the price', () => {
    expect(() => calculate(input({ inputs: { usage: { ownershipMonths: 12, kmPerMonth: 1000 }, purchase: { roadTax: { kind: 'amount', value: 0 }, insuranceYear1: { kind: 'amount', value: 0 }, discounts: rupees(650_000) } } }), defaults))
      .toThrow(EngineInputError);
  });

  it('uses resale overrides (ENG-13)', () => {
    const amt = calculate(input({ inputs: { usage: { ownershipMonths: 60, kmPerMonth: 1000 }, exit: { resale: { kind: 'amount', value: rupees(300_000) } } } }), defaults);
    expect(amt.exit.resale).toBe(rupees(300_000));
    const pct = calculate(input({ inputs: { usage: { ownershipMonths: 60, kmPerMonth: 1000 }, exit: { resale: { kind: 'rate', value: 0.4 } } } }), defaults);
    expect(pct.exit.resale).toBe(rupees(260_000));
  });

  it('uses the depreciation curve and warns past its end', () => {
    const five = calculate(input(), defaults);
    expect(five.exit.resale).toBe(rupees(650_000 * 0.5));
    const long = calculate(input({ inputs: { usage: { ownershipMonths: 132, kmPerMonth: 500 } } }), defaults);
    expect(long.warnings.map((w) => w.code)).toContain('RESALE_EXTRAPOLATED');
  });

  it('adds opportunity cost only when enabled (ENG-15)', () => {
    const off = calculate(input(), defaults);
    const on = calculate(input({ inputs: { usage: { ownershipMonths: 60, kmPerMonth: 1000 }, opportunityCost: { enabled: true, fdRate: 0.06 } } }), defaults);
    checkInvariants(on);
    expect(off.breakdown.opportunityCost).toBe(0);
    expect(on.breakdown.opportunityCost).toBe(Math.round(on.upfront.cashUpfront * ((1 + 0.005) ** 60 - 1)));
    expect(on.tco - off.tco).toBe(on.breakdown.opportunityCost);
    const disabled = calculate(input({ inputs: { usage: { ownershipMonths: 60, kmPerMonth: 1000 }, opportunityCost: { enabled: false } } }), defaults);
    expect(disabled.breakdown.opportunityCost).toBe(0);
  });
});

describe('calculate — location and warnings', () => {
  it('derives the city from a state', () => {
    const r = calculate(input({ inputs: { cityId: undefined, stateCode: 'KA', usage: { ownershipMonths: 12, kmPerMonth: 1000 } } }), defaults);
    expect(r.location).toEqual({ stateCode: 'KA', cityId: 'bengaluru' });
    expect(r.assumptions.find((a) => a.path === 'location.cityId')!.provenance.kind).toBe('derived');
  });

  it('falls back to Delhi with no location', () => {
    const r = calculate(input({ inputs: { cityId: undefined, usage: { ownershipMonths: 12, kmPerMonth: 1000 } } }), defaults);
    expect(r.location.cityId).toBe('delhi');
    expect(r.warnings).toEqual([]);
  });

  it('warns about unknown cities and states', () => {
    const r = calculate(input({ inputs: { cityId: 'chennai', stateCode: 'TN', usage: { ownershipMonths: 12, kmPerMonth: 1000 } } }), defaults);
    expect(r.location.cityId).toBe('delhi');
    expect(r.warnings.map((w) => w.code)).toEqual(['UNKNOWN_CITY', 'UNKNOWN_STATE']);
  });

  it('warns about the Delhi-NCR diesel limit and unsupported commercial mode', () => {
    const r = calculate(input({
      vehicle: { fuelType: 'diesel' },
      inputs: { usage: { ownershipMonths: 121, kmPerMonth: 500 }, commercial: { earnings: { kind: 'per_km', value: 1400 } } },
    }), defaults);
    expect(r.warnings.map((w) => w.code)).toEqual(expect.arrayContaining(['DIESEL_NCR_10Y', 'COMMERCIAL_NOT_SUPPORTED']));
  });
});

describe('validation (IN-13)', () => {
  it('rejects impossible prices with a readable message', () => {
    expect(() => calculate(input({ vehicle: { exShowroom: rupees(50_000) } }), defaults)).toThrow(/at least ₹1 lakh/);
  });

  it('checks EV efficiency range and stray secondary mileage', () => {
    const ev = validateInput(input({ vehicle: { fuelType: 'ev' }, inputs: { usage: { ownershipMonths: 12, kmPerMonth: 100, mileage: { primary: 30 } } } }));
    expect(ev.success).toBe(false);
    expect(ev.error!.issues[0]!.message).toMatch(/2–15 km per kWh/);
    const stray = validateInput(input({ inputs: { usage: { ownershipMonths: 12, kmPerMonth: 100, mileage: { secondary: 20 } } } }));
    expect(stray.error!.issues[0]!.message).toMatch(/only to dual fuel/);
    expect(validateInput(input({ vehicle: { fuelType: 'ev' }, inputs: { usage: { ownershipMonths: 12, kmPerMonth: 100, mileage: { primary: 7 } } } })).success).toBe(true);
  });

  it('exposes structured issues on EngineInputError', () => {
    try {
      calculate(input({ inputs: { usage: { ownershipMonths: 0, kmPerMonth: 1000 } } }), defaults);
      expect.unreachable();
    } catch (e) {
      expect(e).toBeInstanceOf(EngineInputError);
      expect((e as EngineInputError).issues[0]!.path).toEqual(['inputs', 'usage', 'ownershipMonths']);
    }
  });
});
