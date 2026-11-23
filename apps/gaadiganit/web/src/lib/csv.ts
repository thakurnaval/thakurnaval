/**
 * CSV export (SHR-04): assumptions, then the monthly schedule.
 * Amounts in rupees with 2 decimals; UTF-8 with BOM so Excel shows ₹ correctly.
 */
import type { CalculationResult } from '@gaadiganit/engine';

const cell = (v: string | number) => {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const row = (cells: (string | number)[]) => cells.map(cell).join(',');
const rs = (paise: number) => (paise / 100).toFixed(2);

function assumptionValue(value: number | string | boolean, unit?: string): string {
  if (typeof value !== 'number') return String(value);
  if (unit?.startsWith('paise')) return rs(value);
  return String(value);
}

export function buildCsv(name: string, r: CalculationResult): string {
  const lines: string[] = [];
  lines.push(row(['GaadiGanit', name]));
  lines.push(row(['Engine', r.engineVersion, 'Defaults pack', r.defaultsVersion]));
  lines.push('');
  lines.push(row(['Summary', 'Rs']));
  lines.push(row(['Total cost of ownership', rs(r.tco)]));
  lines.push(row(['Cost per month', rs(r.costPerMonth)]));
  lines.push(row(['Cost per km', r.costPerKm === null ? '' : rs(r.costPerKm)]));
  lines.push(row(['On-road price', rs(r.upfront.onRoad)]));
  lines.push(row(['Paid upfront', rs(r.upfront.cashUpfront)]));
  lines.push(row(['Resale value', rs(r.exit.resale)]));
  if (r.commercial) {
    lines.push(row(['Net profit per month', rs(r.commercial.netProfitPerMonth)]));
    lines.push(row(['ROI %', r.commercial.roiPercent === null ? '' : r.commercial.roiPercent.toFixed(1)]));
    lines.push(row(['Payback month', r.commercial.paybackMonth ?? '']));
  }
  lines.push('');
  lines.push(row(['Input', 'Value', 'Unit', 'Source', 'As of']));
  for (const a of r.assumptions) {
    const p = a.provenance;
    const source = p.kind === 'user' ? 'you' : p.kind === 'default' ? p.source : `derived: ${p.from}`;
    const unit = a.unit?.startsWith('paise') ? a.unit.replace('paise', 'Rs') : a.unit ?? '';
    lines.push(row([a.path, assumptionValue(a.value, a.unit), unit, source, p.kind === 'default' ? p.asOf : '']));
  }
  lines.push('');
  const cols = ['month', 'km', 'emi', 'interest', 'principal', 'loan_balance', 'energy', 'service', 'tyres', 'insurance', 'other', 'operating', 'total', 'cumulative'];
  if (r.commercial) cols.push('earnings', 'commission', 'net_profit', 'cumulative_profit');
  lines.push(row(cols));
  for (const m of r.months) {
    const base = [m.m, m.km, rs(m.emi), rs(m.interest), rs(m.principal), rs(m.loanBalance), rs(m.energy), rs(m.service), rs(m.tyres), rs(m.insurance), rs(m.other), rs(m.operating), rs(m.total), rs(m.cumulative)];
    if (r.commercial) base.push(rs(m.earnings), rs(m.commission), rs(m.netProfit), rs(m.cumulativeProfit));
    lines.push(row(base));
  }
  return `﻿${lines.join('\r\n')}\r\n`;
}
