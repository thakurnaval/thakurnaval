import { describe, expect, it } from 'vitest';
import { calculate } from '@gaadiganit/engine';
import { buildCsv } from './csv.ts';
import { defaults } from './defaults.ts';
import { newScenario, toCalculationInput } from './scenario.ts';
import { decodeShare, encodeShare, slug } from './share.ts';

describe('share links (SHR-02)', () => {
  it('round-trips a scenario through a compressed code', async () => {
    const s = { ...newScenario('mumbai'), name: 'Dad’s SUV — टेस्ट' };
    s.inputs = { ...s.inputs, finance: { annualRate: 0.09 } };
    const code = await encodeShare(s);
    expect(code[0]).toBe('z');
    expect(code).toMatch(/^[\w-]+$/);
    const back = await decodeShare(code);
    expect(back).toEqual({ v: 1, name: s.name, vehicle: s.vehicle, inputs: s.inputs });
  });

  it('rejects broken codes', async () => {
    expect(await decodeShare('zzzz')).toBeNull();
    expect(await decodeShare('q123')).toBeNull();
    expect(await decodeShare(`j${btoa('{"v":2}')}`)).toBeNull();
  });

  it('makes file-safe names', () => {
    expect(slug('Dad’s New SUV!')).toBe('dad-s-new-suv');
    expect(slug('हिन्दी')).toBe('gaadiganit');
  });
});

describe('CSV export (SHR-04)', () => {
  const s = { ...newScenario('delhi'), name: 'Swift, "VXi"' };
  const r = calculate(toCalculationInput(s), defaults);
  const csv = buildCsv(s.name, r);
  const lines = csv.split('\r\n');

  it('starts with a BOM and escapes commas and quotes', () => {
    expect(csv.charCodeAt(0)).toBe(0xfeff);
    expect(lines[0]).toBe('﻿GaadiGanit,"Swift, ""VXi"""');
  });

  it('has one schedule row per month in rupees', () => {
    const header = lines.findIndex((l) => l.startsWith('month,km,'));
    expect(lines.slice(header + 1).filter(Boolean)).toHaveLength(r.months.length);
    expect(lines[header + 1]!.split(',')[6]).toBe((r.months[0]!.energy / 100).toFixed(2));
  });

  it('lists assumptions with sources', () => {
    expect(csv).toMatch(/usage\.fuelPrice\.primary,\d+\.\d{2},Rs\/litre,[^,\n]+,2026-11-23/);
  });
});
