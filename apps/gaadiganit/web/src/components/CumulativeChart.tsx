/** Cumulative cost over months (UI-04). Lazy-loaded so Recharts stays out of the first bundle. */
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { CalculationResult } from '@gaadiganit/engine';
import { useT } from '../i18n/index.ts';
import { formatCompactINR, formatINR } from '../lib/format.ts';

export default function CumulativeChart({ result }: { result: CalculationResult }) {
  const { t, lang } = useT();
  const data = [
    { m: 0, value: result.upfront.cashUpfront },
    ...result.months.map((row) => ({ m: row.m, value: row.cumulative })),
  ];
  const yearTicks = data.filter((d) => d.m % 12 === 0).map((d) => d.m);

  return (
    <div className="h-64 w-full" role="img" aria-label={t('result.cumulativeTitle')}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
          <defs>
            <linearGradient id="gg-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d9488" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#0d9488" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="currentColor" strokeOpacity={0.1} />
          <XAxis dataKey="m" type="number" domain={[0, 'dataMax']} ticks={yearTicks} tick={{ fontSize: 12, fill: 'currentColor' }} tickLine={false} axisLine={false} />
          <YAxis width={72} tick={{ fontSize: 12, fill: 'currentColor' }} tickFormatter={(v: number) => formatCompactINR(v, lang)} tickLine={false} axisLine={false} />
          <Tooltip
            formatter={(v) => [formatINR(Number(v), lang), t('result.cumulativeTitle')]}
            labelFormatter={(m) => t('result.month', { m: String(m) })}
            contentStyle={{ borderRadius: 8, fontSize: 13 }}
          />
          <Area type="stepAfter" dataKey="value" stroke="#0f766e" strokeWidth={2} fill="url(#gg-fill)" isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
