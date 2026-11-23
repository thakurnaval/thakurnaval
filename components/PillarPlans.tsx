import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flag, ListChecks, TrendingUp } from 'lucide-react';

/** What to do next for one pillar at one maturity layer. */
export interface PillarPlan {
  /** What this layer usually looks like in practice. */
  now: string;
  /** Two or three concrete next actions. */
  actions: string[];
  /** The signal that you have reached the next layer (or, at the top layer, how to stretch). */
  next: string;
  /** A page on nthakur.com that helps with this step. */
  resource?: { label: string; to: string };
}

export type Layer = 1 | 2 | 3 | 4;
export type PlanBook = Record<string, Record<Layer, PillarPlan>>;

interface Score { key: string; score: number; layer: number }

const order = (scores: Score[]) => [...scores].sort((a, b) => a.score - b.score);

const asLayer = (n: number): Layer => (n <= 1 ? 1 : n >= 4 ? 4 : (n as Layer));

/** Pillar-by-pillar plan on the results screen, weakest pillar first. */
export const PillarPlans: React.FC<{ scores: Score[]; plans: PlanBook; layerNames: Record<number, string> }> = ({ scores, plans, layerNames }) => {
  const sorted = order(scores);
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
        <ListChecks className="w-5 h-5 text-secondary-dark dark:text-secondary" /> Your pillar-by-pillar plan
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Specific next steps for each pillar at the layer you scored, weakest first.</p>
      <div className="space-y-6">
        {sorted.map((s, i) => {
          const layer = asLayer(s.layer);
          const plan = plans[s.key]?.[layer];
          if (!plan) return null;
          const top = layer === 4;
          return (
            <section key={s.key} className="border-l-4 border-primary/70 dark:border-secondary/70 pl-4">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-900 dark:text-white">{s.key}</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  Layer {layer} · {layerNames[layer]}
                </span>
                {i === 0 && sorted.length > 1 && sorted[0].score < sorted[sorted.length - 1].score ? (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 inline-flex items-center gap-1">
                    <Flag size={11} /> Start here
                  </span>
                ) : null}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{plan.now}</p>
              <ol className="space-y-2 mb-3">
                {plan.actions.map((a, j) => (
                  <li key={j} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center mt-0.5">{j + 1}</span>
                    {a}
                  </li>
                ))}
              </ol>
              <p className="text-sm text-slate-600 dark:text-slate-400 flex gap-2">
                <TrendingUp size={15} className="shrink-0 mt-0.5 text-green-600 dark:text-green-400" />
                <span><strong className="text-slate-800 dark:text-slate-200">{top ? 'Stretch: ' : `You've reached Layer ${layer + 1} when: `}</strong>{plan.next}</span>
              </p>
              {plan.resource ? (
                <Link to={plan.resource.to} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary dark:text-secondary hover:underline">
                  {plan.resource.label} <ArrowRight size={13} />
                </Link>
              ) : null}
            </section>
          );
        })}
      </div>
    </div>
  );
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** The same plan as an HTML block for the printable PDF report. */
export function pillarPlansHTML(scores: Score[], plans: PlanBook, layerNames: Record<number, string>): string {
  const blocks = order(scores).map(s => {
    const layer = asLayer(s.layer);
    const plan = plans[s.key]?.[layer];
    if (!plan) return '';
    const actions = plan.actions.map((a, i) => `<li style="margin:4px 0;color:#374151;font-size:12.5px;line-height:1.6"><strong style="color:#271789">${i + 1}.</strong> ${esc(a)}</li>`).join('');
    const label = layer === 4 ? 'Stretch' : `You've reached Layer ${layer + 1} when`;
    const resource = plan.resource ? `<div style="font-size:11.5px;color:#271789;margin-top:4px">More: nthakur.com${esc(plan.resource.to)} (${esc(plan.resource.label)})</div>` : '';
    return `<div style="margin:0 0 18px;padding-left:12px;border-left:3px solid #271789;page-break-inside:avoid">
<div style="font-size:14px;font-weight:700;color:#0f172a">${esc(s.key)} <span style="font-size:11px;font-weight:700;color:#475569;background:#f1f5f9;border-radius:10px;padding:2px 8px;margin-left:6px">Layer ${layer} · ${esc(layerNames[layer] ?? '')}</span></div>
<p style="font-size:12.5px;color:#475569;margin:6px 0">${esc(plan.now)}</p>
<ol style="list-style:none;padding:0;margin:0">${actions}</ol>
<p style="font-size:12px;color:#166534;margin-top:6px"><strong>${label}:</strong> ${esc(plan.next)}</p>${resource}</div>`;
  }).join('');
  return `<div style="border:1px solid #e2e8f0;border-top:none;padding:28px 40px"><h2 style="font-size:13px;font-weight:700;color:#271789;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:6px">Your Pillar-by-Pillar Plan</h2><p style="font-size:12px;color:#64748b;margin-bottom:16px">Specific next steps for each pillar at the layer you scored, weakest first.</p>${blocks}</div>`;
}
