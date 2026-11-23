/**
 * v1.1: comparison, break-even and sensitivity (ENG-17..20, SPEC §4.9).
 */
import { calculate } from './calculate.ts';
import { roundPaise } from './money.ts';
import type { CalculationResult } from './result.ts';
import type { CalculationInput, DefaultsPack, Paise } from './schemas.ts';

export type Metric = 'tco' | 'costPerMonth' | 'costPerKm' | 'upfront';

export interface BreakEvenKm {
  a: number;
  b: number;
  /** km/month where the two cost the same per month; null if they don't cross in 0–20,000. */
  km: number | null;
  /** Index of the cheaper scenario below `km` (or overall when km is null). */
  cheaperBelow: number | null;
  reason?: 'NO_CROSSING';
}

export interface BreakEvenMonth {
  a: number;
  b: number;
  /** First month the cumulative-spend order flips; null if it never does. */
  month: number | null;
}

export interface Sensitivity {
  fuelPrice: { minus20: Paise; base: Paise; plus20: Paise };
  kmPerMonth: { minus20: Paise; base: Paise; plus20: Paise };
  resale: { minus20: Paise; base: Paise; plus20: Paise };
}

export interface ComparisonResult {
  results: CalculationResult[];
  /** Indexes of the best (lowest) scenario per metric; several = a tie (ENG-17). */
  winners: Record<Metric, number[]>;
  breakEvenKmPerMonth: BreakEvenKm[];
  breakEvenMonth: BreakEvenMonth[];
}

const MAX_KM = 20_000;
const SCAN_STEP = 100;

export function withKm(input: CalculationInput, kmPerMonth: number): CalculationInput {
  return { ...input, inputs: { ...input.inputs, usage: { ...input.inputs.usage, kmPerMonth } } };
}

function metricValue(r: CalculationResult, m: Metric): number | null {
  switch (m) {
    case 'tco': return r.tco;
    case 'costPerMonth': return r.costPerMonth;
    case 'costPerKm': return r.costPerKm;
    case 'upfront': return r.upfront.cashUpfront;
  }
}

export function winners(results: CalculationResult[]): Record<Metric, number[]> {
  const out = {} as Record<Metric, number[]>;
  for (const m of ['tco', 'costPerMonth', 'costPerKm', 'upfront'] as const) {
    const vals = results.map((r) => metricValue(r, m));
    const valid = vals.filter((v): v is number => v !== null);
    const best = valid.length ? Math.min(...valid) : null;
    out[m] = best === null ? [] : vals.flatMap((v, i) => (v === best ? [i] : []));
  }
  return out;
}

/**
 * km/month at which A and B cost the same per month (TCO ÷ months, so
 * different ownership periods compare fairly). Coarse scan, then bisection
 * to ±1 km, because service and tyre events make the curve step-wise.
 */
export function breakEvenKm(a: CalculationInput, b: CalculationInput, defaults: DefaultsPack): { km: number | null; cheaperBelow: 'a' | 'b' | null } {
  const diff = (k: number) => {
    const ra = calculate(withKm(a, k), defaults);
    const rb = calculate(withKm(b, k), defaults);
    return ra.tco / ra.ownershipMonths - rb.tco / rb.ownershipMonths;
  };
  const sign = (x: number) => (x > 0 ? 1 : x < 0 ? -1 : 0);
  const d0 = diff(0);
  const s0 = sign(d0);
  if (s0 === 0) return { km: 0, cheaperBelow: null };
  const cheaperBelow = s0 < 0 ? 'a' : 'b';

  let lo = 0;
  for (let k = SCAN_STEP; k <= MAX_KM; k += SCAN_STEP) {
    const s = sign(diff(k));
    if (s !== s0) {
      let hi = k;
      while (hi - lo > 1) {
        const mid = Math.floor((lo + hi) / 2);
        if (sign(diff(mid)) === s0) lo = mid;
        else hi = mid;
      }
      return { km: hi, cheaperBelow };
    }
    lo = k;
  }
  return { km: null, cheaperBelow };
}

/** First month the cumulative-spend order of two results flips (month 0 = upfront). */
export function breakEvenMonth(ra: CalculationResult, rb: CalculationResult): number | null {
  const series = (r: CalculationResult) => [r.upfront.cashUpfront, ...r.months.map((m) => m.cumulative)];
  const sa = series(ra);
  const sb = series(rb);
  const n = Math.min(sa.length, sb.length);
  let start = 0;
  while (start < n && sa[start] === sb[start]) start++;
  if (start >= n) return null;
  const first = Math.sign(sa[start]! - sb[start]!);
  for (let m = start + 1; m < n; m++) {
    const s = Math.sign(sa[m]! - sb[m]!);
    if (s !== 0 && s !== first) return m;
  }
  return null;
}

/** TCO when fuel price, km/month or resale move by ±20% (ENG-20). */
export function sensitivity(input: CalculationInput, defaults: DefaultsPack, base = calculate(input, defaults)): Sensitivity {
  const tco = (i: CalculationInput) => calculate(i, defaults).tco;
  const price = (path: string) => {
    const v = base.assumptions.find((x) => x.path === path)?.value;
    return typeof v === 'number' ? v : undefined;
  };
  const p1 = price('usage.fuelPrice.primary');
  const p2 = price('usage.fuelPrice.secondary');
  const scaleFuel = (f: number): CalculationInput => ({
    ...input,
    inputs: {
      ...input.inputs,
      usage: {
        ...input.inputs.usage,
        fuelPrice: {
          ...(p1 !== undefined ? { primary: Math.max(100, roundPaise(p1 * f)) } : {}),
          ...(p2 !== undefined ? { secondary: Math.max(100, roundPaise(p2 * f)) } : {}),
        },
      },
    },
  });
  const km = input.inputs.usage.kmPerMonth;
  const scaleResale = (f: number): CalculationInput => ({
    ...input,
    inputs: { ...input.inputs, exit: { resale: { kind: 'amount', value: roundPaise(base.exit.resale * f) } } },
  });
  return {
    fuelPrice: { minus20: tco(scaleFuel(0.8)), base: base.tco, plus20: tco(scaleFuel(1.2)) },
    kmPerMonth: { minus20: tco(withKm(input, km * 0.8)), base: base.tco, plus20: tco(withKm(input, Math.min(MAX_KM, km * 1.2))) },
    resale: { minus20: tco(scaleResale(0.8)), base: base.tco, plus20: tco(scaleResale(1.2)) },
  };
}

/** Compare 2–4 scenarios (ENG-17..19). */
export function compare(inputs: CalculationInput[], defaults: DefaultsPack): ComparisonResult {
  if (inputs.length < 2 || inputs.length > 4) throw new RangeError('compare() takes 2 to 4 scenarios');
  const results = inputs.map((i) => calculate(i, defaults));
  const breakEvenKmPerMonth: BreakEvenKm[] = [];
  const breakEvenMonthList: BreakEvenMonth[] = [];
  for (let a = 0; a < inputs.length; a++) {
    for (let b = a + 1; b < inputs.length; b++) {
      const be = breakEvenKm(inputs[a]!, inputs[b]!, defaults);
      const cheaperBelow = be.cheaperBelow === 'a' ? a : be.cheaperBelow === 'b' ? b : null;
      breakEvenKmPerMonth.push(be.km === null
        ? { a, b, km: null, cheaperBelow, reason: 'NO_CROSSING' }
        : { a, b, km: be.km, cheaperBelow });
      breakEvenMonthList.push({ a, b, month: breakEvenMonth(results[a]!, results[b]!) });
    }
  }
  return { results, winners: winners(results), breakEvenKmPerMonth, breakEvenMonth: breakEvenMonthList };
}
