/** A saved scenario: detailed editor + live result, autosaved (DATA-01, DATA-02). */
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';
import { ResultView } from '../components/ResultView.tsx';
import { ScenarioEditor, type EditorProps } from '../components/ScenarioEditor.tsx';
import { ShareBar } from '../components/ShareBar.tsx';
import { WhatIf } from '../components/WhatIf.tsx';
import { useT } from '../i18n/index.ts';
import { defaults } from '../lib/defaults.ts';
import { displayName, type StoredScenario } from '../lib/scenario.ts';
import { getScenario, saveScenario } from '../lib/storage.ts';
import { useCalculation } from '../lib/useCalculation.ts';

const AUTOSAVE_MS = 1000;

export default function ScenarioPage() {
  const { id = '' } = useParams();
  const { t } = useT();
  const navigate = useNavigate();
  const [s, setS] = useState<StoredScenario | null | 'missing'>(null);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [params] = useSearchParams();
  // Arriving from the quick estimate's "Change" button opens that field.
  const [focus, setFocus] = useState<EditorProps['focus']>(() => {
    const path = params.get('focus');
    return path ? { path, n: 1 } : null;
  });
  const dirty = useRef(false);

  useEffect(() => {
    let alive = true;
    dirty.current = false;
    setS(null);
    void getScenario(id).then((r) => alive && setS(r ?? 'missing'));
    return () => { alive = false; };
  }, [id]);

  const scenario = s && s !== 'missing' ? s : null;
  const { result, errors, stale } = useCalculation(scenario);

  // Autosave 1 s after the last edit; only valid results update the list figure.
  useEffect(() => {
    if (!scenario || !dirty.current) return;
    setSaveState('saving');
    const handle = setTimeout(() => {
      const record: StoredScenario = {
        ...scenario,
        updatedAt: new Date().toISOString(),
        ...(result && !stale ? { lastCostPerMonth: result.costPerMonth } : {}),
      };
      void saveScenario(record).then(() => setSaveState('saved'));
    }, AUTOSAVE_MS);
    return () => clearTimeout(handle);
  }, [scenario, result, stale]);

  if (s === null) return <div className="h-64 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900" />;
  if (s === 'missing') {
    return (
      <div className="card space-y-4">
        <p>{t('editor.notFound')}</p>
        <Link to="/" className="btn-secondary">{t('editor.back')}</Link>
      </div>
    );
  }

  const update = (fn: (x: StoredScenario) => StoredScenario) => {
    dirty.current = true;
    setS((prev) => (prev && prev !== 'missing' ? fn(prev) : prev));
  };
  const outdated = s.defaultsVersion !== defaults.version;

  return (
    <div className="space-y-4">
      <h1 className="hidden text-2xl font-bold print:block">{displayName(s)}</h1>
      {outdated ? (
        <div className="card flex flex-wrap items-center justify-between gap-3 border-amber-300 bg-amber-50 print:hidden dark:border-amber-800 dark:bg-amber-950">
          <p className="text-sm">{t('editor.defaultsUpdated')}</p>
          <button type="button" className="btn-secondary" onClick={() => update((x) => ({ ...x, defaultsVersion: defaults.version }))}>
            {t('editor.useNewDefaults')}
          </button>
        </div>
      ) : null}
      <p className="text-right text-xs text-slate-500 print:hidden dark:text-slate-400" aria-live="polite">
        {saveState === 'saving' ? t('editor.saving') : saveState === 'saved' ? t('editor.saved') : ''}
      </p>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
        <div className="order-2 print:hidden lg:order-none">
          <ScenarioEditor scenario={s} result={result} errors={errors} onChange={update} focus={focus} />
        </div>
        <div className="order-1 space-y-4 lg:order-none lg:sticky lg:top-4 lg:h-fit">
          {result ? (
            <>
              <ResultView result={result} stale={stale} category={s.vehicle.category} whatIfId={stale ? undefined : 'whatif'} onEditAssumption={(path) => setFocus((f) => ({ path, n: (f?.n ?? 0) + 1 }))} />
              {!stale ? <WhatIf key={`${s.id}-${result.tco}`} scenario={s} base={result} onSaveAsNew={(copy) => {
                void saveScenario(copy).then(() => navigate(`/s/${copy.id}`));
              }} /> : null}
              {!stale ? <ShareBar scenario={s} result={result} /> : null}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
