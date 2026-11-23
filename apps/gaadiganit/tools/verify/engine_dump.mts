/** Prints the engine's results for W1–W3 (SPEC §8) as JSON, for reference_tco.py to compare. */
import raw from '../../packages/engine/test/fixtures/defaults-2026.11.2.json' with { type: 'json' };
import { calculate, parseDefaults, rupees } from '../../packages/engine/src/index.ts';
const d = parseDefaults(raw);
const W1 = { vehicle: { id: 'w1', make: 'x', model: 'W1', category: 'hatchback', fuelType: 'petrol', useType: 'personal', exShowroom: rupees(650000) },
  inputs: { cityId: 'delhi', usage: { ownershipMonths: 60, kmPerMonth: 1000, mileage: { primary: 20 } } } };
const W2 = { vehicle: { id: 'w2', make: 'x', model: 'W2', category: 'suv', fuelType: 'diesel', useType: 'personal', exShowroom: rupees(1600000) },
  inputs: { cityId: 'mumbai', usage: { ownershipMonths: 60, kmPerMonth: 1500, mileage: { primary: 17 } },
    finance: { downPayment: { kind: 'rate', value: 0.2 }, annualRate: 0.09, tenureMonths: 60 } } };
const W3 = { vehicle: { id: 'w3', make: 'x', model: 'W3', category: 'sedan', fuelType: 'cng', useType: 'commercial', exShowroom: rupees(750000) },
  inputs: { cityId: 'bengaluru', usage: { ownershipMonths: 48, kmPerMonth: 250 * 26 },
    finance: { downPayment: { kind: 'rate', value: 0.2 }, annualRate: 0.095, tenureMonths: 48 },
    commercial: { earnings: { kind: 'per_km', value: rupees(14) }, platformCommission: 0.25, driverSalaryPerMonth: rupees(18000), idleDaysPerMonth: 4 } } };
const out = {};
for (const [k, w] of Object.entries({ W1, W2, W3 })) {
  const r = calculate(w as any, d);
  out[k] = { tco: r.tco, upfront: r.upfront, breakdown: r.breakdown, exit: r.exit, emi: r.loan?.emi ?? null, commercial: r.commercial,
    months: r.months.map((m) => [m.emi, m.interest, m.energy, m.service, m.tyres, m.insurance, m.other]) };
}
console.log(JSON.stringify(out));
