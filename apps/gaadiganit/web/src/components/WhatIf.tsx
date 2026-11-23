/**
 * What-if sliders (UI-11) and ±20% sensitivity (ENG-20). Nothing here changes
 * the saved scenario unless the user taps "Save as a new calculation".
 */
import { useId, useMemo, useState } from 'react';
import { calculate, sensitivity, type CalculationResult, type ScenarioInputs } from '@gaadiganit/engine';
import { useT } from '../i18n/index.ts';
import { defaults } from '../lib/defaults.ts';
import { formatCompactINR, formatINR, formatNumber } from '../lib/format.ts';
import { displayName, newId, toCalculationInput, type StoredScenario } from '../lib/scenario.ts';
import { headlineParts } from './ResultView.tsx';

interface Knobs { km: number; fuel: number; months: number; resale: number }

function Slider({ label, value, min, max, step, display, onChange }: {
  label: string; value: number; min: number; max: number; step: number; display: string; onChange: (v: number) => void;
}) {
  const id = useId();
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium">{label}</label>
        <output htmlFor={id} className="text-sm tabular-nums text-slate-600 dark:text-slate-300">{display}</output>
      </div>
      <input id={id} type="range" className="w-full accent-brand-700" min={min} max={max} step={step} value={value}
        aria-valuetext={display} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}

/** Apply the knobs to a scenario's inputs, using the base result for resolved fuel prices. */
export function applyKnobs(s: StoredScenario, base: CalculationResult, k: Knobs): StoredScenario {
  const price = (p: string) => {
    const v = base.assumptions.find((a) => a.path === p)?.value;
    return typeof v === 'number' ? v : undefined;
  };
  const p1 = price('usage.fuelPrice.primary');
  const p2 = price('usage.fuelPrice.secondary');
  const scale = (p: number | undefined) => (p === undefined ? undefined : Math.min(50_000, Math.max(100, Math.round(p * k.fuel))));
  const fuelPrice = k.fuel === 1 ? s.inputs.usage.fuelPrice : {
    ...(p1 !== undefined ? { primary: scale(p1) } : {}),
    ...(p2 !== undefined ? { secondary: scale(p2) } : {}),
  };
  const baseResale = base.exit.resale / s.vehicle.exShowroom;
  const inputs: ScenarioInputs = {
    ...s.inputs,
    usage: { ...s.inputs.usage, kmPerMonth: k.km, ownershipMonths: k.months, ...(fuelPrice ? { fuelPrice } : {}) },
    // Untouched resale slider → keep the user's setting or the age-based curve.
    exit: Math.abs(k.resale - baseResale) < 0.0006
      ? s.inputs.exit
      : { resale: { kind: 'rate', value: k.resale } },
  };
  return { ...s, inputs };
}

export function WhatIf({ scenario, base, onSaveAsNew }: {
  scenario: StoredScenario;
  base: CalculationResult;
  onSaveAsNew: (s: StoredScenario) => void;
}) {
  const { t, lang } = useT();
  const initial: Knobs = {
    km: scenario.inputs.usage.kmPerMonth,
    fuel: 1,
    months: scenario.inputs.usage.ownershipMonths,
    resale: Math.round((base.exit.resale / scenario.vehicle.exShowroom) * 1000) / 1000,
  };
  const [k, setK] = useState<Knobs>(initial);
  const set = (patch: Partial<Knobs>) => setK((p) => ({ ...p, ...patch }));
  const changed = JSON.stringify(k) !== JSON.stringify(initial);

  const tried = useMemo(() => applyKnobs(scenario, base, k), [scenario, base, k]);
  const result = useMemo(() => {
    try { return calculate(toCalculationInput(tried), defaults); } catch { return null; }
  }, [tried]);
  const sens = useMemo(() => {
    try { return sensitivity(toCalculationInput(scenario), defaults, base); } catch { return null; }
  }, [scenario, base]);

  const delta = result ? headlineParts(result).perMonth - headlineParts(base).perMonth : 0;
  const deltaText = delta === 0 ? t('whatif.same') : t(delta > 0 ? 'whatif.more' : 'whatif.less', { delta: formatINR(Math.abs(delta), lang) });
  const maxKm = Math.max(5000, Math.ceil((initial.km * 2) / 500) * 500);

  return (
    <section className="card space-y-5 print:hidden" aria-labelledby="whatif-title">
      <div>
        <h2 id="whatif-title" className="text-lg font-semibold">{t('whatif.title')}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">{t('whatif.intro')}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Slider label={t('whatif.km')} value={k.km} min={0} max={Math.min(20_000, maxKm)} step={50} display={`${formatNumber(k.km, lang, 0)} km`} onChange={(km) => set({ km })} />
        <Slider label={t('whatif.fuel')} value={k.fuel} min={0.5} max={1.5} step={0.05} display={`${k.fuel >= 1 ? '+' : '−'}${formatNumber(Math.abs(k.fuel - 1) * 100, lang, 0)}%`} onChange={(fuel) => set({ fuel })} />
        <Slider label={t('whatif.months')} value={k.months} min={12} max={180} step={6} display={usePeriodLabel(k.months)} onChange={(months) => set({ months })} />
        <Slider label={t('whatif.resale')} value={k.resale} min={0} max={1} step={0.01} display={`${formatNumber(k.resale * 100, lang, 0)}%`} onChange={(resale) => set({ resale })} />
      </div>
      {result ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-brand-50 p-4 dark:bg-brand-900/30" aria-live="polite">
          <div>
            <p className="text-xl font-semibold tabular-nums">{t('whatif.result', { perMonth: formatINR(headlineParts(result).perMonth, lang) })}</p>
            <p className={`text-sm ${delta > 0 ? 'text-red-700 dark:text-red-400' : delta < 0 ? 'text-brand-800 dark:text-brand-100' : 'text-slate-600'}`}>{deltaText}</p>
          </div>
          <div className="flex gap-2">
            <button type="button" className="btn-secondary" disabled={!changed} onClick={() => setK(initial)}>{t('whatif.reset')}</button>
            <button type="button" className="btn-primary" disabled={!changed} onClick={() => {
              const now = new Date().toISOString();
              onSaveAsNew({ ...tried, id: newId(), name: t('whatif.copyName', { name: displayName(scenario) }), createdAt: now, updatedAt: now, lastCostPerMonth: result.costPerMonth });
            }}>{t('whatif.saveAsNew')}</button>
          </div>
        </div>
      ) : null}

      {sens ? (
        <div>
          <h3 className="font-semibold">{t('whatif.sensitivityTitle')}</h3>
          <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">{t('whatif.sensitivityIntro')}</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 dark:text-slate-400">
                <th className="py-1 font-medium" />
                <th className="py-1 text-right font-medium">{t('whatif.minus20')}</th>
                <th className="py-1 text-right font-medium">{t('whatif.plus20')}</th>
              </tr>
            </thead>
            <tbody>
              {([['fuelPrice', 'whatif.fuelPrice'], ['kmPerMonth', 'whatif.kmPerMonth'], ['resaleValue', 'whatif.resaleValue']] as const).map(([key, label]) => {
                const row = sens[key === 'resaleValue' ? 'resale' : key];
                const fmt = (v: number) => `${v - row.base >= 0 ? '+' : '−'}${formatCompactINR(Math.abs(v - row.base), lang)}`;
                return (
                  <tr key={key} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="py-1.5">{t(label)}</td>
                    <td className="py-1.5 text-right tabular-nums">{fmt(row.minus20)}</td>
                    <td className="py-1.5 text-right tabular-nums">{fmt(row.plus20)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

function usePeriodLabel(n: number) {
  const { t } = useT();
  return n % 12 === 0 ? t('period.years', { count: n / 12 }) : t('period.months', { count: n });
}
