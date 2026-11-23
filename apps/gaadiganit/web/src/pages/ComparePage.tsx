/** Compare 2–4 saved scenarios side by side (UI-10, ENG-17..19). */
import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { compare, type ComparisonResult, type Metric } from '@gaadiganit/engine';
import { useT } from '../i18n/index.ts';
import { defaults } from '../lib/defaults.ts';
import { formatCompactINR, formatINR, formatNumber } from '../lib/format.ts';
import { displayName, toCalculationInput, type StoredScenario } from '../lib/scenario.ts';
import { getScenario } from '../lib/storage.ts';
import { usePeriod } from '../components/ResultView.tsx';

const CompareChart = lazy(() => import('../components/CompareChart.tsx'));

export default function ComparePage() {
  const { t, lang } = useT();
  const period = usePeriod();
  const [params] = useSearchParams();
  const ids = (params.get('ids') ?? '').split(',').filter(Boolean).slice(0, 4);
  const [items, setItems] = useState<StoredScenario[] | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let alive = true;
    void Promise.all(ids.map((id) => getScenario(id))).then((rs) => {
      if (!alive) return;
      setMissing(rs.some((r) => !r));
      setItems(rs.filter((r): r is StoredScenario => !!r));
    });
    return () => { alive = false; };
  }, [params.get('ids')]); // eslint-disable-line react-hooks/exhaustive-deps

  const cmp: ComparisonResult | null = useMemo(() => {
    if (!items || items.length < 2) return null;
    try { return compare(items.map(toCalculationInput), defaults); } catch { return null; }
  }, [items]);

  if (items === null) return <div className="h-64 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900" />;
  if (!cmp) {
    return (
      <div className="card space-y-4">
        <p>{missing ? t('compare.notFound') : t('compare.needTwo')}</p>
        <Link to="/" className="btn-secondary">{t('editor.back')}</Link>
      </div>
    );
  }

  const names = items.map(displayName);
  const rows: { key: Metric | 'onRoad' | 'resale' | 'period'; label: string; value: (i: number) => string; best?: number[] }[] = [
    { key: 'costPerMonth', label: t('compare.costPerMonth'), value: (i) => formatINR(cmp.results[i]!.costPerMonth, lang), best: cmp.winners.costPerMonth },
    { key: 'costPerKm', label: t('compare.costPerKm'), value: (i) => { const v = cmp.results[i]!.costPerKm; return v === null ? '—' : formatINR(v, lang, 1); }, best: cmp.winners.costPerKm },
    { key: 'tco', label: t('compare.tco'), value: (i) => formatCompactINR(cmp.results[i]!.tco, lang), best: cmp.winners.tco },
    { key: 'upfront', label: t('compare.upfront'), value: (i) => formatCompactINR(cmp.results[i]!.upfront.cashUpfront, lang), best: cmp.winners.upfront },
    { key: 'onRoad', label: t('compare.onRoad'), value: (i) => formatCompactINR(cmp.results[i]!.upfront.onRoad, lang) },
    { key: 'resale', label: t('compare.resale'), value: (i) => formatCompactINR(cmp.results[i]!.exit.resale, lang) },
    { key: 'period', label: t('compare.period'), value: (i) => period(cmp.results[i]!.ownershipMonths) },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{t('compare.title')}</h1>

      <section className="card overflow-x-auto">
        <table className="w-full min-w-[32rem] text-sm">
          <thead>
            <tr className="text-left">
              <th className="py-2 pr-3 font-medium text-slate-500 dark:text-slate-400">{t('compare.metric')}</th>
              {items.map((s, i) => (
                <th key={s.id} className="py-2 pr-3 text-right font-semibold">
                  <Link to={`/s/${s.id}`} className="hover:underline">{names[i]}</Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} className="border-t border-slate-100 dark:border-slate-800">
                <th scope="row" className="py-2 pr-3 text-left font-normal">{r.label}</th>
                {items.map((s, i) => {
                  const best = r.best?.includes(i) && items.length > (r.best?.length ?? 0);
                  return (
                    <td key={s.id} className={`py-2 pr-3 text-right tabular-nums ${best ? 'font-semibold text-brand-700 dark:text-brand-500' : ''}`}>
                      {r.value(i)}{best ? <span className="ml-1" aria-label={t('compare.lowest')}>✓</span> : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card space-y-3" aria-labelledby="be-title">
        <h2 id="be-title" className="text-lg font-semibold">{t('compare.breakEvenTitle')}</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm">
          {cmp.breakEvenKmPerMonth.map((be) => {
            const [a, b] = [names[be.a]!, names[be.b]!];
            let text: string;
            if (be.km === null) {
              const cheaper = be.cheaperBelow === be.a ? a : b;
              text = t('compare.beNever', { cheaper, other: cheaper === a ? b : a });
            } else if (be.km === 0 && be.cheaperBelow === null) {
              text = t('compare.beSame', { a, b });
            } else {
              const below = be.cheaperBelow === be.a ? a : b;
              text = t('compare.beKm', { km: formatNumber(be.km, lang, 0), below, above: below === a ? b : a });
            }
            return <li key={`km-${be.a}-${be.b}`}>{text}</li>;
          })}
          {cmp.breakEvenMonth.filter((x) => x.month !== null).map((x) => {
            const ra = cmp.results[x.a]!;
            const rb = cmp.results[x.b]!;
            const m = x.month!;
            const lower = ra.months[m - 1]!.cumulative < rb.months[m - 1]!.cumulative ? names[x.a] : names[x.b];
            return <li key={`m-${x.a}-${x.b}`}>{t('compare.monthFlip', { name: lower, month: m })}</li>;
          })}
        </ul>
      </section>

      <section className="card" aria-labelledby="cmp-chart-title">
        <h2 id="cmp-chart-title" className="mb-3 text-lg font-semibold">{t('compare.chartTitle')}</h2>
        <Suspense fallback={<div className="h-72 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />}>
          <CompareChart cmp={cmp} names={names} />
        </Suspense>
      </section>
    </div>
  );
}
