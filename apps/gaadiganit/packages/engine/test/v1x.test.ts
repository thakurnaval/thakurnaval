/** v1.1 comparison/break-even/sensitivity and v1.2 commercial ROI. */
import { describe, expect, it } from 'vitest';
import {
  breakdownTotal, breakEvenKm, breakEvenMonth, calculate, compare, rupees, sensitivity, winners,
  type CalculationInput, type CalculationResult,
} from '../src/index.ts';
import { defaults, input, quiet } from './helpers.ts';

const petrol = input({
  vehicle: { category: 'compact_suv', fuelType: 'petrol', exShowroom: rupees(1_000_000) },
  inputs: { cityId: 'delhi', usage: { ownershipMonths: 84, kmPerMonth: 1000, mileage: { primary: 16 } } },
});
const ev = input({
  vehicle: { category: 'compact_suv', fuelType: 'ev', exShowroom: rupees(1_500_000) },
  inputs: { cityId: 'delhi', usage: { ownershipMonths: 84, kmPerMonth: 1000, mileage: { primary: 7 } } },
});

describe('break-even km/month (ENG-18, W4)', () => {
  const be = breakEvenKm(petrol, ev, defaults);

  it('finds a crossing between 500 and 3,000 km/month', () => {
    expect(be.km).not.toBeNull();
    expect(be.km!).toBeGreaterThan(500);
    expect(be.km!).toBeLessThan(3000);
    expect(be.cheaperBelow).toBe('a'); // petrol is cheaper at low km
  });

  it('is accurate to 1 km', () => {
    const perMonth = (i: CalculationInput, k: number) => {
      const r = calculate({ ...i, inputs: { ...i.inputs, usage: { ...i.inputs.usage, kmPerMonth: k } } }, defaults);
      return r.tco / r.ownershipMonths;
    };
    expect(perMonth(petrol, be.km! - 1)).toBeLessThan(perMonth(ev, be.km! - 1));
    expect(perMonth(petrol, be.km!)).toBeGreaterThanOrEqual(perMonth(ev, be.km!));
  });

  it('returns null when one is cheaper at every distance', () => {
    const pricier = { ...petrol, vehicle: { ...petrol.vehicle, exShowroom: rupees(2_000_000) } };
    const r = breakEvenKm(petrol, pricier, defaults);
    expect(r).toEqual({ km: null, cheaperBelow: 'a' });
  });

  it('returns 0 for identical scenarios', () => {
    expect(breakEvenKm(petrol, petrol, defaults)).toEqual({ km: 0, cheaperBelow: null });
  });

  it('reports B as cheaper below when it is', () => {
    expect(breakEvenKm(ev, petrol, defaults).cheaperBelow).toBe('b');
  });
});

describe('break-even month (ENG-19)', () => {
  const at = (k: number) => [calculate({ ...petrol, inputs: { ...petrol.inputs, usage: { ...petrol.inputs.usage, kmPerMonth: k } } }, defaults),
    calculate({ ...ev, inputs: { ...ev.inputs, usage: { ...ev.inputs.usage, kmPerMonth: k } } }, defaults)] as const;

  it('finds when a pricier EV overtakes on cumulative spend', () => {
    const [p, e] = at(3000);
    const m = breakEvenMonth(p, e)!;
    expect(m).toBeGreaterThan(1);
    expect(p.months[m - 1]!.cumulative).toBeGreaterThan(e.months[m - 1]!.cumulative);
    expect(p.months[m - 2]!.cumulative).toBeLessThanOrEqual(e.months[m - 2]!.cumulative);
  });

  it('is null when the order never flips, or the series are identical', () => {
    const [p, e] = at(100);
    expect(breakEvenMonth(p, e)).toBeNull();
    expect(breakEvenMonth(p, p)).toBeNull();
  });

  it('skips leading equal months', () => {
    const fake = (vals: number[]) => ({ upfront: { cashUpfront: vals[0]! }, months: vals.slice(1).map((v) => ({ cumulative: v })) }) as unknown as CalculationResult;
    expect(breakEvenMonth(fake([5, 5, 6, 9]), fake([5, 5, 8, 8]))).toBe(3);
  });
});

describe('compare (ENG-17)', () => {
  it('compares 2–4 scenarios with winners and pairwise break-evens', () => {
    const c = compare([petrol, ev, petrol], defaults);
    expect(c.results).toHaveLength(3);
    expect(c.winners.upfront).toEqual([0, 2]); // a tie
    expect(c.breakEvenKmPerMonth.map((x) => [x.a, x.b])).toEqual([[0, 1], [0, 2], [1, 2]]);
    expect(c.breakEvenKmPerMonth[0]!.cheaperBelow).toBe(0);
    expect(c.breakEvenKmPerMonth[1]).toEqual({ a: 0, b: 2, km: 0, cheaperBelow: null });
    expect(c.breakEvenKmPerMonth[2]!.cheaperBelow).toBe(2);
    expect(c.breakEvenMonth).toHaveLength(3);
  });

  it('marks no crossing', () => {
    const pricier = { ...petrol, vehicle: { ...petrol.vehicle, exShowroom: rupees(2_000_000) } };
    const c = compare([pricier, petrol], defaults);
    expect(c.breakEvenKmPerMonth[0]).toEqual({ a: 0, b: 1, km: null, cheaperBelow: 1, reason: 'NO_CROSSING' });
  });

  it('rejects fewer than 2 or more than 4', () => {
    expect(() => compare([petrol], defaults)).toThrow(RangeError);
    expect(() => compare([petrol, ev, petrol, ev, petrol], defaults)).toThrow(RangeError);
  });

  it('leaves cost-per-km winners empty when no scenario drives', () => {
    const still = input({ inputs: { usage: { ownershipMonths: 12, kmPerMonth: 0 } } });
    const w = winners([calculate(still, defaults), calculate(still, defaults)]);
    expect(w.costPerKm).toEqual([]);
    expect(w.tco).toEqual([0, 1]);
  });
});

describe('sensitivity (ENG-20)', () => {
  it('moves TCO the right way for each driver', () => {
    const s = sensitivity(petrol, defaults);
    expect(s.fuelPrice.minus20).toBeLessThan(s.fuelPrice.base);
    expect(s.fuelPrice.plus20).toBeGreaterThan(s.fuelPrice.base);
    expect(s.kmPerMonth.plus20).toBeGreaterThan(s.kmPerMonth.base);
    expect(s.resale.plus20).toBeLessThan(s.resale.base); // more resale, lower cost
  });

  it('scales both prices for dual fuel and EV', () => {
    for (const fuelType of ['dual_petrol_cng', 'ev'] as const) {
      const s = sensitivity(input({ vehicle: { fuelType } }), defaults);
      expect(s.fuelPrice.plus20).toBeGreaterThan(s.fuelPrice.base);
    }
  });

  it('handles a scenario with no fuel price assumptions', () => {
    const base = calculate(petrol, defaults);
    const stripped = { ...base, assumptions: [] };
    const s = sensitivity(petrol, defaults, stripped);
    expect(s.fuelPrice.minus20).toBe(s.fuelPrice.plus20);
  });
});

describe('commercial ROI (ENG-21, v1.2)', () => {
  const cab = input({
    vehicle: { category: 'sedan', fuelType: 'cng', useType: 'commercial', exShowroom: rupees(750_000) },
    inputs: {
      cityId: 'bengaluru',
      usage: { ownershipMonths: 48, kmPerMonth: 6500 },
      finance: { annualRate: 0.095, tenureMonths: 48 },
      commercial: {
        // Owner-driven aggregator cab: ₹16/km, 25% platform commission
        earnings: { kind: 'per_km', value: 1600 },
        platformCommission: 0.25,
        driverSalaryPerMonth: 0,
        idleDaysPerMonth: 4,
      },
    },
  });
  const r = calculate(cab, defaults);

  it('keeps the invariants with operating costs', () => {
    expect(breakdownTotal(r.breakdown)).toBe(r.tco);
    for (const m of r.months) {
      expect(m.total).toBe(m.emi + m.energy + m.service + m.tyres + m.insurance + m.other + m.operating);
      expect(m.netProfit).toBe(m.earnings - m.commission - m.total);
    }
  });

  it('computes earnings, commission, driver and permits', () => {
    const m1 = r.months[0]!;
    expect(m1.earnings).toBe(rupees(16 * 6500));
    expect(m1.commission).toBe(rupees(16 * 6500 * 0.25));
    const permits = defaults.commercial.value.permitsPerYearByCategory.sedan!;
    expect(m1.operating).toBe(permits);
    expect(r.months[1]!.operating).toBe(0);
    expect(r.months[12]!.operating).toBe(permits);
    const paid = calculate({ ...cab, inputs: { ...cab.inputs, commercial: { ...cab.inputs.commercial!, driverSalaryPerMonth: rupees(18_000) } } }, defaults);
    expect(paid.months[1]!.operating).toBe(rupees(18_000));
  });

  it('reports ROI and payback', () => {
    const c = r.commercial!;
    expect(c.netProfitTotal).toBe(r.months.at(-1)!.cumulativeProfit);
    expect(c.upfrontInvestment).toBe(r.upfront.cashUpfront);
    expect(c.paybackMonth).not.toBeNull();
    const pm = c.paybackMonth!;
    expect(r.months[pm - 1]!.cumulativeProfit).toBeGreaterThanOrEqual(c.upfrontInvestment);
    if (pm > 1) expect(r.months[pm - 2]!.cumulativeProfit).toBeLessThan(c.upfrontInvestment);
    expect(c.roiPercent).toBeCloseTo(((c.netProfitTotal + r.exit.resale - r.exit.loanOutstanding - c.upfrontInvestment) / c.upfrontInvestment) * 100);
    expect(c.fleetSize).toBe(1);
  });

  it('pays by trip or a fixed monthly amount, and scales a fleet', () => {
    const trip = calculate({ ...cab, inputs: { ...cab.inputs, commercial: { earnings: { kind: 'per_trip', value: rupees(300), tripsPerWorkingDay: 10 }, idleDaysPerMonth: 5, fleetSize: 3 } } }, defaults);
    expect(trip.months[0]!.earnings).toBe(rupees(300 * 10 * 25));
    expect(trip.commercial!.fleet.tco).toBe(trip.tco * 3);
    expect(trip.commercial!.fleet.netProfitTotal).toBe(trip.commercial!.netProfitTotal * 3);
    const fixed = calculate({ ...cab, inputs: { ...cab.inputs, commercial: { earnings: { kind: 'per_month', value: rupees(40_000) } } } }, defaults);
    expect(fixed.months[5]!.earnings).toBe(rupees(40_000));
    expect(fixed.assumptions.find((a) => a.path === 'commercial.idleDaysPerMonth')!.provenance.kind).toBe('default');
  });

  it('has no payback when it never earns back, and no ROI with nothing upfront', () => {
    const poor = calculate({ ...cab, inputs: { ...cab.inputs, commercial: { earnings: { kind: 'per_km', value: 100 } } } }, defaults);
    expect(poor.commercial!.paybackMonth).toBeNull();
    const zero = calculate({ ...cab, inputs: { ...cab.inputs, finance: { downPayment: { kind: 'rate', value: 0 } } } }, defaults);
    expect(zero.commercial!.upfrontInvestment).toBe(0);
    expect(zero.commercial!.roiPercent).toBeNull();
    expect(zero.commercial!.paybackMonth).toBe(1);
  });

  it('uses 0 permits for a category without a default', () => {
    const pack = JSON.parse(JSON.stringify(defaults)) as typeof defaults;
    delete pack.commercial.value.permitsPerYearByCategory.sedan;
    const x = calculate({ ...cab, inputs: { ...cab.inputs, ...quiet } }, pack);
    expect(x.months[0]!.operating).toBe(0);
  });

  it('warns when commercial use has no earnings', () => {
    const noEarn = calculate({ ...cab, inputs: { ...cab.inputs, commercial: undefined } }, defaults);
    expect(noEarn.commercial).toBeNull();
    expect(noEarn.warnings.map((w) => w.code)).toContain('COMMERCIAL_NO_EARNINGS');
  });
});
