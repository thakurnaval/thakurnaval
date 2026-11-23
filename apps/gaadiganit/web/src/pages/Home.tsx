/** Home (UI-01): saved scenarios, newest first; pick 2–4 to compare (UI-10). */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useT } from '../i18n/index.ts';
import { formatINR } from '../lib/format.ts';
import { displayName, newId, type StoredScenario } from '../lib/scenario.ts';
import { deleteScenario, listScenarios, saveScenario } from '../lib/storage.ts';

export default function Home() {
  const { t, lang } = useT();
  const navigate = useNavigate();
  const [items, setItems] = useState<StoredScenario[] | null>(null);
  const [selecting, setSelecting] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);

  const reload = () => listScenarios().then(setItems).catch(() => setItems([]));
  useEffect(() => { void reload(); }, []);

  if (items === null) return <div className="h-48 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900" />;

  if (items.length === 0) {
    return (
      <section className="card mx-auto max-w-xl space-y-4 text-center">
        <h1 className="text-2xl font-bold text-balance">{t('home.emptyTitle')}</h1>
        <p className="text-slate-600 dark:text-slate-400">{t('home.emptyBody')}</p>
        <Link to="/new" className="btn-primary">{t('home.start')}</Link>
      </section>
    );
  }

  const duplicate = async (s: StoredScenario) => {
    const now = new Date().toISOString();
    const copy: StoredScenario = { ...s, id: newId(), name: t('home.copyOf', { name: displayName(s) }), createdAt: now, updatedAt: now };
    await saveScenario(copy);
    navigate(`/s/${copy.id}`);
  };
  const remove = async (s: StoredScenario) => {
    if (!window.confirm(t('home.deleteConfirm', { name: displayName(s) }))) return;
    await deleteScenario(s.id);
    setPicked((p) => p.filter((id) => id !== s.id));
    await reload();
  };
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length < 4 ? [...p, id] : p));
  const dateFmt = new Intl.DateTimeFormat(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">{t('home.saved')}</h1>
        <div className="flex flex-wrap gap-2">
          {items.length >= 2 ? (
            selecting ? (
              <>
                <button type="button" className="btn-secondary" onClick={() => { setSelecting(false); setPicked([]); }}>{t('home.cancel')}</button>
                <button type="button" className="btn-primary" disabled={picked.length < 2} onClick={() => navigate(`/compare?ids=${picked.join(',')}`)}>
                  {t('home.compareSelected', { count: picked.length })}
                </button>
              </>
            ) : (
              <button type="button" className="btn-secondary" onClick={() => setSelecting(true)}>{t('home.compare')}</button>
            )
          ) : null}
          {!selecting ? <Link to="/new" className="btn-primary">+ {t('nav.new')}</Link> : null}
        </div>
      </div>
      {selecting ? <p className="text-sm text-slate-600 dark:text-slate-400">{t('home.compareHint')}</p> : null}
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((s) => {
          const on = picked.includes(s.id);
          const body = (
            <>
              <p className="font-semibold group-hover:underline">{displayName(s)}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t(`fuel.${s.vehicle.fuelType}`)} · {dateFmt.format(new Date(s.updatedAt))}
              </p>
              {s.lastCostPerMonth !== undefined ? (
                <p className="mt-2 text-lg font-semibold tabular-nums text-brand-700 dark:text-brand-500">
                  {t('home.perMonth', { amount: formatINR(Math.round(s.lastCostPerMonth / 10_000) * 10_000, lang) })}
                </p>
              ) : null}
            </>
          );
          return (
            <li key={s.id} className={`card flex flex-col gap-3 ${on ? 'ring-2 ring-brand-600' : ''}`}>
              {selecting ? (
                <label className="flex cursor-pointer items-start gap-3">
                  <input type="checkbox" className="mt-1 size-5 accent-brand-700" checked={on} onChange={() => toggle(s.id)}
                    aria-label={t('home.select', { name: displayName(s) })} disabled={!on && picked.length >= 4} />
                  <span>{body}</span>
                </label>
              ) : (
                <Link to={`/s/${s.id}`} className="group">{body}</Link>
              )}
              {!selecting ? (
                <div className="mt-auto flex gap-2">
                  <button type="button" className="btn-secondary flex-1" onClick={() => void duplicate(s)}>{t('home.duplicate')}</button>
                  <button type="button" className="btn-secondary flex-1" onClick={() => void remove(s)}>{t('home.delete')}</button>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
