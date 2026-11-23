/**
 * Cumulative cost (UI-04) or cumulative profit with the payback month (UI-12).
 * Lazy-loaded so Recharts stays out of the first bundle.
 */
import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { CalculationResult } from '@gaadiganit/engine';
import { useT } from '../i18n/index.ts';
import { formatCompactINR, formatINR } from '../lib/format.ts';

export default function CumulativeChart({ result, mode = 'cost' }: { result: CalculationResult; mode?: 'cost' | 'profit' }) {
  const { t, lang } = useT();
  const profit = mode === 'profit';
  const data = profit
    ? [{ m: 0, value: 0 }, ...result.months.map((row) => ({ m: row.m, value: row.cumulativeProfit }))]
    : [{ m: 0, value: result.upfront.cashUpfront }, ...result.months.map((row) => ({ m: row.m, value: row.cumulative }))];
  const yearTicks = data.filter((d) => d.m % 12 === 0).map((d) => d.m);
  const title = t(profit ? 'result.profitChartTitle' : 'result.cumulativeTitle');
  const payback = result.commercial?.paybackMonth ?? null;
  const upfront = result.commercial?.upfrontInvestment ?? 0;

  return (
    <div className="h-64 w-full" role="img" aria-label={title}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 16, right: 8, bottom: 0, left: 8 }}>
          <defs>
            <linearGradient id={`gg-fill-${mode}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d9488" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#0d9488" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="currentColor" strokeOpacity={0.1} />
          <XAxis dataKey="m" type="number" domain={[0, 'dataMax']} ticks={yearTicks} tick={{ fontSize: 12, fill: 'currentColor' }} tickLine={false} axisLine={false} />
          <YAxis width={72} tick={{ fontSize: 12, fill: 'currentColor' }} tickFormatter={(v: number) => formatCompactINR(v, lang)} tickLine={false} axisLine={false} />
          <Tooltip
            formatter={(v) => [formatINR(Number(v), lang), title]}
            labelFormatter={(m) => t('result.month', { m: String(m) })}
            contentStyle={{ borderRadius: 8, fontSize: 13 }}
          />
          {profit ? (
            <ReferenceLine y={upfront} stroke="#b45309" strokeDasharray="4 4" label={{ value: t('result.upfrontLine'), position: 'insideTopLeft', fontSize: 12, fill: '#b45309' }} />
          ) : null}
          {profit && payback !== null ? (
            <ReferenceLine x={payback} stroke="#0f766e" label={{ value: t('result.paybackValue', { m: payback }), position: 'top', fontSize: 12, fill: '#0f766e' }} />
          ) : null}
          <Area type={profit ? 'linear' : 'stepAfter'} dataKey="value" stroke="#0f766e" strokeWidth={2} fill={`url(#gg-fill-${mode})`} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
