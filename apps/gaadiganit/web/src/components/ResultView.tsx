import { lazy, Suspense, useState } from 'react';
import { COMMERCIAL_CATEGORIES, type CalculationResult, type Category } from '@gaadiganit/engine';
import { useT } from '../i18n/index.ts';
import type { MessageKey } from '../i18n/en.ts';
import { defaults } from '../lib/defaults.ts';
import { formatCompactINR, formatINR, formatNumber } from '../lib/format.ts';
import { formatAssumption, SourceNote } from './fields.tsx';

const CumulativeChart = lazy(() => import('./CumulativeChart.tsx'));

type Bucket = keyof CalculationResult['breakdown'];
export const BUCKETS: Bucket[] = ['vehicle', 'energy', 'interest', 'insurance', 'operating', 'service', 'tyres', 'other', 'opportunityCost'];

/** ₹18,400 (rounded to ₹100) and ₹18.4 (rounded to ₹0.1), per UI-02. */
export function headlineParts(r: CalculationResult) {
  const perMonth = Math.round(r.costPerMonth / 10_000) * 10_000;
  const perKm = r.costPerKm === null ? null : Math.round(r.costPerKm / 10) * 10;
  return { perMonth, perKm };
}

/** Commercial figures only once some earnings are entered; until then show costs. */
export function withEarnings(r: CalculationResult) {
  return r.commercial && r.commercial.earningsTotal > 0 ? r.commercial : null;
}

export function usePeriod() {
  const { t } = useT();
  return (n: number) => (n % 12 === 0 ? t('period.years', { count: n / 12 }) : t('period.months', { count: n }));
}

export function Headline({ result }: { result: CalculationResult }) {
  const { t, lang } = useT();
  const period = usePeriod()(result.ownershipMonths);
  const c = withEarnings(result);
  let text: string;
  if (c) {
    const profit = Math.round(c.netProfitPerMonth / 10_000) * 10_000;
    text = profit < 0
      ? t('result.commercialLoss', { loss: formatINR(-profit, lang) })
      : c.paybackMonth !== null
        ? t('result.commercialHeadline', { profit: formatINR(profit, lang), month: c.paybackMonth })
        : t('result.commercialNoPayback', { profit: formatINR(profit, lang), period });
  } else {
    const { perMonth, perKm } = headlineParts(result);
    const vars = { perMonth: formatINR(perMonth, lang), perKm: perKm === null ? '' : formatINR(perKm, lang, 1), period };
    text = t(perKm === null ? 'result.headlineNoKm' : 'result.headline', vars);
  }
  return <p className="text-xl font-semibold leading-snug text-balance sm:text-2xl" aria-live="polite">{text}</p>;
}

export function ResultView({ result, stale, onEditAssumption, category, whatIfId }: {
  result: CalculationResult;
  /** Element id of the what-if panel; shows a "Try what-ifs" link to it. */
  whatIfId?: string;
  /** Vehicle category, to flag road-tax rules that differ for trucks and buses. */
  category?: Category;
  stale?: boolean;
  /** When given, each assumption gets a "Change" button that calls it with the input path. */
  onEditAssumption?: (path: string) => void;
}) {
  const { t, lang } = useT();
  const total = result.tco;
  const shown = BUCKETS.filter((b) => result.breakdown[b] !== 0);
  const max = Math.max(...shown.map((b) => Math.abs(result.breakdown[b])), 1);
  const defaultsUsed = result.assumptions.filter((a) => a.provenance.kind !== 'user');
  const c = withEarnings(result);

  return (
    <div className={`space-y-4 transition-opacity ${stale ? 'opacity-60' : ''}`}>
      <section className="card space-y-4">
        {stale ? <p className="text-sm text-amber-700 dark:text-amber-400">{t('result.lastValid')}</p> : null}
        <Headline result={result} />
        {whatIfId ? (
          <a href={`#${whatIfId}`} className="inline-block text-sm font-medium text-brand-700 underline underline-offset-2 print:hidden dark:text-brand-500"
            onClick={(e) => { e.preventDefault(); document.getElementById(whatIfId)?.scrollIntoView?.({ behavior: 'smooth', block: 'start' }); }}>
            {t('whatif.jump')}
          </a>
        ) : null}
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {c ? (
            <>
              <Stat label={t('result.netProfit')} value={formatINR(c.netProfitPerMonth, lang)} />
              <Stat label={t('result.roi')} value={c.roiPercent === null ? '—' : `${formatNumber(c.roiPercent, lang, 0)}%`} />
              <Stat label={t('result.payback')} value={c.paybackMonth === null ? t('result.never') : t('result.paybackValue', { m: c.paybackMonth })} />
              <Stat label={t('result.upfront')} value={formatCompactINR(c.upfrontInvestment, lang)} />
            </>
          ) : (
            <>
              <Stat label={t('result.tco')} value={formatCompactINR(result.tco, lang)} />
              <Stat label={t('result.onRoad')} value={formatCompactINR(result.upfront.onRoad, lang)} />
              {result.loan
                ? <Stat label={t('result.emi')} value={formatINR(result.loan.emi, lang)} />
                : <Stat label={t('result.upfront')} value={formatCompactINR(result.upfront.cashUpfront, lang)} />}
              <Stat label={t('result.resale')} value={formatCompactINR(result.exit.resale, lang)} />
            </>
          )}
        </dl>
        {c && c.fleetSize > 1 ? (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t('result.fleet', { count: c.fleetSize, profit: formatCompactINR(c.fleet.netProfitTotal, lang), upfront: formatCompactINR(c.fleet.upfrontInvestment, lang) })}
          </p>
        ) : null}
        {(() => {
          const roadTaxDefault = result.assumptions.some((a) => a.path === 'purchase.roadTax.rate' && a.provenance.kind === 'default');
          const codes = [...result.warnings.map((w) => w.code as string),
            ...(category && COMMERCIAL_CATEGORIES.includes(category) && roadTaxDefault ? ['ROAD_TAX_COMMERCIAL'] : []),
            ...(result.commercial && !c ? ['COMMERCIAL_NO_EARNINGS'] : [])];
          return codes.length > 0 ? (
            <ul className="space-y-1 rounded-lg bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-200">
              {codes.map((c) => <li key={c}>{t(`warning.${c}` as MessageKey)}</li>)}
            </ul>
          ) : null;
        })()}
      </section>

      {c ? (
        <section className="card" aria-labelledby="profit-title">
          <h2 id="profit-title" className="mb-1 text-lg font-semibold">{t('result.profitChartTitle')}</h2>
          <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">{t('result.profitChartNote')}</p>
          <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />}>
            <CumulativeChart result={result} mode="profit" />
          </Suspense>
        </section>
      ) : null}

      <section className="card" aria-labelledby="breakdown-title">
        <h2 id="breakdown-title" className="mb-1 text-lg font-semibold">{t('result.breakdownTitle')}</h2>
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">{t('result.breakdownNote')}</p>
        <ul className="space-y-3">
          {shown.map((b) => {
            const v = result.breakdown[b];
            const pct = total > 0 ? (v / total) * 100 : 0;
            return (
              <li key={b}>
                <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
                  <span>{t(`bucket.${b}` as MessageKey)}</span>
                  <span className="tabular-nums font-medium">
                    {formatCompactINR(v, lang)} <span className="text-slate-500 dark:text-slate-400">· {formatNumber(pct, lang, 0)}%</span>
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800" aria-hidden="true">
                  <div className="h-2.5 rounded-full bg-brand-600" style={{ width: `${(Math.abs(v) / max) * 100}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="card" aria-labelledby="cumulative-title">
        <h2 id="cumulative-title" className="mb-1 text-lg font-semibold">{t('result.cumulativeTitle')}</h2>
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">{t('result.cumulativeNote')}</p>
        <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />}>
          <CumulativeChart result={result} />
        </Suspense>
        <MonthlyTable result={result} />
      </section>

      {defaultsUsed.length > 0 ? (
        <section className="card" aria-labelledby="assumptions-title">
          <h2 id="assumptions-title" className="mb-1 text-lg font-semibold">{t('result.assumptionsTitle')}</h2>
          <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">{t('result.assumptionsIntro')}{onEditAssumption ? ` ${t('result.changeHint')}` : ''}</p>
          <dl className="divide-y divide-slate-100 text-sm dark:divide-slate-800">
            {defaultsUsed.map((a) => {
              const label = t(`fields.${a.path}` as MessageKey, { defaultValue: a.path });
              return (
                <div key={a.path} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2">
                  <dt className="min-w-0 flex-1">{label}</dt>
                  <dd className="flex items-center gap-3 text-right">
                    <span>
                      <span className="font-medium tabular-nums">{a.path === 'location.cityId' ? (defaults.cities[String(a.value)]?.name ?? String(a.value)) : formatAssumption(a, lang)}</span>
                      <span className="block text-xs text-slate-500 dark:text-slate-400"><SourceNote assumption={a} /></span>
                    </span>
                    {onEditAssumption ? (
                      <button type="button" className="min-h-9 rounded-md px-2 text-sm font-medium text-brand-700 underline underline-offset-2 dark:text-brand-500 print:hidden"
                        aria-label={`${t('editor.change')}: ${label}`} onClick={() => onEditAssumption(a.path)}>
                        {t('editor.change')}
                      </button>
                    ) : null}
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
      <dt className="text-xs text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className="mt-0.5 text-base font-semibold tabular-nums">{value}</dd>
    </div>
  );
}

/** Table alternative for the chart (NFR-03), one row per year end. */
function MonthlyTable({ result }: { result: CalculationResult }) {
  const { t, lang } = useT();
  const [open, setOpen] = useState(false);
  const rows = result.months.filter((m) => m.m % 12 === 0 || m.m === result.months.length);
  return (
    <div className="mt-3">
      <button type="button" className="text-sm font-medium text-brand-700 underline underline-offset-2 dark:text-brand-500 print:hidden" aria-expanded={open} onClick={() => setOpen(!open)}>
        {t(open ? 'result.hideTable' : 'result.showTable')}
      </button>
      {open ? (
        <table className="mt-2 w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 dark:text-slate-400">
              <th className="py-1 font-medium">{t('result.monthShort')}</th>
              <th className="py-1 text-right font-medium">{t('result.cumulativeTitle')}</th>
              {result.commercial ? <th className="py-1 text-right font-medium">{t('result.profitChartTitle')}</th> : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.m} className="border-t border-slate-100 dark:border-slate-800">
                <td className="py-1">{m.m}</td>
                <td className="py-1 text-right tabular-nums">{formatINR(m.cumulative, lang)}</td>
                {result.commercial ? <td className="py-1 text-right tabular-nums">{formatINR(m.cumulativeProfit, lang)}</td> : null}
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}
