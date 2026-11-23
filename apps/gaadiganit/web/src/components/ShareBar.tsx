/** Share link, WhatsApp card, PDF (print) and CSV (SHR-01..04). */
import { useState } from 'react';
import type { CalculationResult } from '@gaadiganit/engine';
import { useT } from '../i18n/index.ts';
import type { MessageKey } from '../i18n/en.ts';
import { drawCard } from '../lib/card.ts';
import { buildCsv } from '../lib/csv.ts';
import { formatINR } from '../lib/format.ts';
import { displayName, type StoredScenario } from '../lib/scenario.ts';
import { downloadBlob, shareUrl, slug } from '../lib/share.ts';
import { BUCKETS, headlineParts, usePeriod } from './ResultView.tsx';

export function ShareBar({ scenario, result }: { scenario: StoredScenario; result: CalculationResult }) {
  const { t, lang } = useT();
  const period = usePeriod()(result.ownershipMonths);
  const [note, setNote] = useState('');
  const name = displayName(scenario);

  const shareText = t('share.text', { name, perMonth: formatINR(headlineParts(result).perMonth, lang), period });

  const shareLink = async () => {
    const url = await shareUrl(scenario);
    if (navigator.share) {
      try { await navigator.share({ title: name, text: shareText, url }); return; } catch { /* cancelled */ }
    }
    try {
      await navigator.clipboard.writeText(url);
      setNote(t('share.copied'));
    } catch {
      window.prompt(t('share.link'), url);
    }
  };

  const card = async () => {
    const blob = await drawCard(result, {
      name,
      perMonthLabel: t('share.perMonth'),
      perKmLabel: t('share.perKm'),
      over: t('share.over', { period }),
      footer: t('share.cardFooter'),
      breakdown: BUCKETS.map((b) => ({ label: t(`bucket.${b}` as MessageKey), value: result.breakdown[b] })),
    }, lang);
    if (!blob) return;
    const file = new File([blob], `${slug(name)}.png`, { type: 'image/png' });
    if (navigator.canShare?.({ files: [file] })) {
      try { await navigator.share({ files: [file], text: shareText }); return; } catch { /* cancelled */ }
    }
    downloadBlob(blob, file.name);
  };

  const csv = () => downloadBlob(new Blob([buildCsv(name, result)], { type: 'text/csv;charset=utf-8' }), `${slug(name)}.csv`);

  return (
    <section className="card print:hidden" aria-labelledby="share-title">
      <h2 id="share-title" className="mb-3 text-lg font-semibold">{t('share.title')}</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button type="button" className="btn-secondary" onClick={() => void shareLink()}>{t('share.link')}</button>
        <button type="button" className="btn-secondary" onClick={() => void card()}>{t('share.whatsapp')}</button>
        <button type="button" className="btn-secondary" onClick={() => window.print()}>{t('share.pdf')}</button>
        <button type="button" className="btn-secondary" onClick={csv}>{t('share.csv')}</button>
      </div>
      <p className="mt-2 min-h-5 text-sm text-brand-700 dark:text-brand-500" aria-live="polite">{note}</p>
    </section>
  );
}
