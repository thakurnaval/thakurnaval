import { describe, expect, it } from 'vitest';
import {
  amortise, emi, inferCategory, parseDefaults, retainedFraction, roadTaxRate, roundPaise, rupees,
} from '../src/index.ts';
import { defaults, rawPack } from './helpers.ts';

describe('money', () => {
  it('rounds halves away from zero', () => {
    expect(roundPaise(2.5)).toBe(3);
    expect(roundPaise(2.4)).toBe(2);
    expect(roundPaise(-2.5)).toBe(-3);
    expect(roundPaise(-2.4)).toBe(-2);
  });
  it('never returns -0', () => {
    expect(Object.is(roundPaise(-0.2), 0)).toBe(true);
  });
  it('converts rupees to paise', () => {
    expect(rupees(18.4)).toBe(1840);
    expect(rupees(12_34_567)).toBe(123_456_700);
  });
});

describe('defaults pack', () => {
  it('validates the shipped pack (NFR-07)', () => {
    expect(defaults.version).toBe('2026.11.2');
    expect(Object.keys(defaults.cities)).toEqual(['delhi', 'mumbai', 'pune', 'bengaluru']);
  });
  it('strips comment keys', () => {
    expect('_notes' in defaults).toBe(false);
  });
  it('rejects an unknown fallback state or city', () => {
    const p = rawPack();
    p.fallbackStateCode = 'XX';
    p.fallbackCityId = 'nowhere';
    expect(() => parseDefaults(p)).toThrow(/Unknown state XX[\s\S]*Unknown city nowhere/);
  });
  it('rejects a city in an unknown state', () => {
    const p = rawPack() as { cities: Record<string, { stateCode: string }> };
    p.cities.delhi!.stateCode = 'ZZ';
    expect(() => parseDefaults(p)).toThrow(/Unknown state ZZ/);
  });
  it('rejects road-tax bands without an open-ended last band', () => {
    const p = rawPack() as { states: { DL: { roadTax: { value: { maxExShowroom: number | null }[] } } } };
    p.states.DL.roadTax.value.at(-1)!.maxExShowroom = 1;
    expect(() => parseDefaults(p)).toThrow(/maxExShowroom = null/);
  });
});

describe('loan', () => {
  it('matches the standard EMI formula (ENG-07)', () => {
    // ₹10 lakh at 9% for 60 months → ₹20,758.36
    expect(emi(rupees(1_000_000), 0.09, 60)).toBe(2_075_836);
  });
  it('has principal parts that sum exactly to the loan', () => {
    const P = rupees(1_234_567.89);
    const s = amortise(P, 0.095, 47);
    expect(s.months.reduce((a, m) => a + m.principal, 0)).toBe(P);
    expect(s.months.at(-1)!.balance).toBe(0);
    for (const m of s.months.slice(0, -1)) expect(m.payment).toBe(s.emi);
  });
  it('splits a zero-rate loan evenly', () => {
    const s = amortise(1000, 0, 3);
    expect(s.emi).toBe(333);
    expect(s.months.map((m) => m.payment)).toEqual([333, 333, 334]);
    expect(s.months.every((m) => m.interest === 0)).toBe(true);
  });
  it('handles a zero principal', () => {
    const s = amortise(0, 0.09, 12);
    expect(s.emi).toBe(0);
    expect(s.months.every((m) => m.payment === 0)).toBe(true);
  });
});

describe('resolve helpers', () => {
  it('infers category from price (IN-02)', () => {
    expect(inferCategory(rupees(799_999), defaults)).toBe('hatchback');
    expect(inferCategory(rupees(800_000), defaults)).toBe('compact_suv');
    expect(inferCategory(rupees(1_500_000), defaults)).toBe('compact_suv');
    expect(inferCategory(rupees(1_500_001), defaults)).toBe('suv');
  });
  it('picks the road-tax band and fuel rate', () => {
    expect(roadTaxRate(defaults, 'DL', 'petrol', rupees(600_000))).toBe(0.04);
    expect(roadTaxRate(defaults, 'DL', 'diesel', rupees(800_000))).toBe(0.0875);
    expect(roadTaxRate(defaults, 'DL', 'ev', rupees(2_000_000))).toBe(0);
    expect(roadTaxRate(defaults, 'MH', 'strong_hybrid', rupees(1_500_000))).toBe(0.12);
  });
  it('interpolates the resale curve', () => {
    const curve = [0.8, 0.7];
    expect(retainedFraction(curve, 0)).toEqual({ fraction: 1, extrapolated: false });
    expect(retainedFraction(curve, 6).fraction).toBeCloseTo(0.9);
    expect(retainedFraction(curve, 18).fraction).toBeCloseTo(0.75);
    expect(retainedFraction(curve, 24)).toEqual({ fraction: 0.7, extrapolated: false });
    expect(retainedFraction(curve, 30)).toEqual({ fraction: 0.7, extrapolated: true });
  });
});
