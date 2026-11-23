/** Cumulative spend, one line per scenario, crossover months marked (UI-10). */
import { CartesianGrid, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { ComparisonResult } from '@gaadiganit/engine';
import { useT } from '../i18n/index.ts';
import { formatCompactINR, formatINR } from '../lib/format.ts';

// Distinguishable in light and dark, and for common colour-vision deficiencies.
const COLORS = ['#0f766e', '#c2410c', '#4338ca', '#a16207'];

export default function CompareChart({ cmp, names }: { cmp: ComparisonResult; names: string[] }) {
  const { t, lang } = useT();
  const maxN = Math.max(...cmp.results.map((r) => r.ownershipMonths));
  const data = Array.from({ length: maxN + 1 }, (_, m) => {
    const row: Record<string, number | null> = { m };
    cmp.results.forEach((r, i) => {
      row[`s${i}`] = m === 0 ? r.upfront.cashUpfront : (r.months[m - 1]?.cumulative ?? null);
    });
    return row;
  });
  const ticks = data.filter((d) => (d.m as number) % 12 === 0).map((d) => d.m as number);
  const crossovers = [...new Set(cmp.breakEvenMonth.map((x) => x.month).filter((m): m is number => m !== null))];

  return (
    <div className="h-72 w-full" role="img" aria-label={t('compare.chartTitle')}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 16, right: 8, bottom: 0, left: 8 }}>
          <CartesianGrid vertical={false} stroke="currentColor" strokeOpacity={0.1} />
          <XAxis dataKey="m" type="number" domain={[0, 'dataMax']} ticks={ticks} tick={{ fontSize: 12, fill: 'currentColor' }} tickLine={false} axisLine={false} />
          <YAxis width={72} tick={{ fontSize: 12, fill: 'currentColor' }} tickFormatter={(v: number) => formatCompactINR(v, lang)} tickLine={false} axisLine={false} />
          <Tooltip
            formatter={(v, key) => [formatINR(Number(v), lang), names[Number(String(key).slice(1))]]}
            labelFormatter={(m) => t('result.month', { m: String(m) })}
            contentStyle={{ borderRadius: 8, fontSize: 13 }}
          />
          <Legend formatter={(key: string) => names[Number(key.slice(1))]} wrapperStyle={{ fontSize: 13 }} />
          {crossovers.map((m) => (
            <ReferenceLine key={m} x={m} stroke="currentColor" strokeOpacity={0.4} strokeDasharray="4 4"
              label={{ value: t('result.month', { m }), position: 'top', fontSize: 11, fill: 'currentColor' }} />
          ))}
          {cmp.results.map((_, i) => (
            <Line key={i} type="stepAfter" dataKey={`s${i}`} stroke={COLORS[i]} strokeWidth={2} dot={false} isAnimationActive={false} connectNulls={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
