/** Settings (UI-08): language, default city, defaults pack version. */
import { SelectField } from '../components/fields.tsx';
import { setLanguage, useT } from '../i18n/index.ts';
import { cityIds, defaults } from '../lib/defaults.ts';
import type { Lang } from '../lib/format.ts';
import { updateSettings, useSettings } from '../lib/settings.ts';

export default function Settings() {
  const { t, lang } = useT();
  const settings = useSettings();
  const date = new Date(`${defaults.asOf}T00:00:00`).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <section className="card mx-auto max-w-xl space-y-5" aria-labelledby="settings-title">
      <h1 id="settings-title" className="text-2xl font-bold">{t('settings.title')}</h1>
      <SelectField<Lang>
        label={t('settings.language')}
        value={settings.lang}
        onChange={(l) => { updateSettings({ lang: l }); setLanguage(l); }}
        options={[{ value: 'en', label: 'English' }, { value: 'hi', label: 'हिन्दी' }]}
      />
      <SelectField<string>
        label={t('settings.city')}
        value={settings.cityId}
        onChange={(cityId) => updateSettings({ cityId })}
        options={cityIds.map((c) => ({ value: c, label: defaults.cities[c]!.name }))}
      />
      <div>
        <h2 className="label">{t('settings.defaults')}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">{t('settings.defaultsInfo', { version: defaults.version, date })}</p>
      </div>
      <p className="rounded-lg bg-brand-50 p-3 text-sm text-brand-900 dark:bg-brand-900/30 dark:text-brand-100">{t('settings.privacy')}</p>
    </section>
  );
}
