/** Opens a share link (SHR-02): read-only result with "Save to my device". */
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { ResultView } from '../components/ResultView.tsx';
import { useT } from '../i18n/index.ts';
import { defaults } from '../lib/defaults.ts';
import { displayName, newId, type StoredScenario } from '../lib/scenario.ts';
import { decodeShare } from '../lib/share.ts';
import { saveScenario } from '../lib/storage.ts';
import { useCalculation } from '../lib/useCalculation.ts';

export default function SharedPage() {
  const { t } = useT();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [s, setS] = useState<StoredScenario | null | 'invalid'>(null);

  useEffect(() => {
    const code = new URLSearchParams(hash.slice(1)).get('s');
    if (!code) { setS('invalid'); return; }
    void decodeShare(code).then((p) => {
      if (!p) { setS('invalid'); return; }
      const now = new Date().toISOString();
      setS({
        id: newId(), schemaVersion: 1, name: p.name, vehicle: p.vehicle, inputs: p.inputs,
        categoryAuto: false, defaultsVersion: defaults.version, createdAt: now, updatedAt: now,
      });
    });
  }, [hash]);

  const { result } = useCalculation(s && s !== 'invalid' ? s : null);

  if (s === null) return <div className="h-64 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900" />;
  if (s === 'invalid' || !result) {
    return (
      <div className="card space-y-4">
        <p>{t('share.invalid')}</p>
        <Link to="/new" className="btn-primary">{t('home.start')}</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="card flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">{displayName(s)}</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">{t('share.sharedIntro')}</p>
        </div>
        <button type="button" className="btn-primary" onClick={() => {
          void saveScenario({ ...s, lastCostPerMonth: result.costPerMonth }).then(() => navigate(`/s/${s.id}`));
        }}>{t('share.saveToDevice')}</button>
      </div>
      <ResultView result={result} />
    </div>
  );
}
