/** Settings (UI-08): language, default city, my fuel prices, my models, defaults pack version. */
import { MoneyField, SelectField } from '../components/fields.tsx';
import { setLanguage, useT } from '../i18n/index.ts';
import type { MessageKey } from '../i18n/en.ts';
import { useMyModels } from '../lib/catalogue.ts';
import { cityIds, defaults } from '../lib/defaults.ts';
import { formatNumber, type Lang } from '../lib/format.ts';
import { PRICE_KEYS, updateSettings, useSettings, type PriceKey } from '../lib/settings.ts';
import { deleteModel } from '../lib/storage.ts';

const PRICE_LABEL: Record<PriceKey, MessageKey> = {
  petrolPerLitre: 'price.petrol',
  dieselPerLitre: 'price.diesel',
  cngPerKg: 'price.cng',
  electricityHomePerKwh: 'price.electricity_home',
  electricityPublicPerKwh: 'price.electricity_public',
};

export default function Settings() {
  const { t, lang } = useT();
  const settings = useSettings();
  const { models, reload } = useMyModels();
  const date = new Date(`${defaults.asOf}T00:00:00`).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const cityPrices = defaults.cities[settings.cityId]!.fuelPrices.value;

  const setPrice = (k: PriceKey, v: number | undefined) => {
    const myPrices = { ...settings.myPrices };
    if (v === undefined) delete myPrices[k];
    else myPrices[k] = Math.min(50_000, Math.max(100, Math.round(v)));
    updateSettings({ myPrices, myPricesAsOf: new Date().toISOString().slice(0, 10) });
  };
  const anyPrice = PRICE_KEYS.some((k) => settings.myPrices[k] !== undefined);

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <section className="card space-y-5" aria-labelledby="settings-title">
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
      </section>

      <section className="card space-y-4" aria-labelledby="myprices-title">
        <div>
          <h2 id="myprices-title" className="text-lg font-semibold">{t('myprices.title')}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">{t('myprices.intro')}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {PRICE_KEYS.map((k) => (
            <MoneyField key={k} label={t(PRICE_LABEL[k])} value={settings.myPrices[k]} placeholder={cityPrices[k]} onChange={(v) => setPrice(k, v)} />
          ))}
        </div>
        {anyPrice ? (
          <button type="button" className="btn-secondary" onClick={() => updateSettings({ myPrices: {} })}>{t('myprices.clear')}</button>
        ) : null}
      </section>

      <section className="card space-y-3" aria-labelledby="mymodels-title">
        <h2 id="mymodels-title" className="text-lg font-semibold">{t('mymodels.title')}</h2>
        {models.length === 0 ? (
          <p className="text-sm text-slate-600 dark:text-slate-400">{t('mymodels.empty')}</p>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {models.map((m) => {
              const o = m.options[0]!;
              const name = `${m.make} ${m.model}`;
              return (
                <li key={m.id} className="flex flex-wrap items-center justify-between gap-3 py-2 text-sm">
                  <span>
                    <span className="font-medium">{name}</span>
                    <span className="block text-slate-500 dark:text-slate-400">
                      {t(`fuel.${o.fuelType}`)} · ₹{formatNumber(o.priceLakh[0], lang, 2)} {lang === 'hi' ? 'लाख' : 'lakh'} · {formatNumber(o.mileage, lang, 2)}
                    </span>
                  </span>
                  <button type="button" className="btn-secondary" aria-label={`${t('mymodels.delete')}: ${name}`} onClick={() => {
                    if (window.confirm(t('mymodels.deleteConfirm', { name }))) void deleteModel(m.id).then(reload);
                  }}>{t('mymodels.delete')}</button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="card space-y-3">
        <div>
          <h2 className="label">{t('settings.defaults')}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">{t('settings.defaultsInfo', { version: defaults.version, date })}</p>
        </div>
        <p className="rounded-lg bg-brand-50 p-3 text-sm text-brand-900 dark:bg-brand-900/30 dark:text-brand-100">{t('settings.privacy')}</p>
      </section>
    </div>
  );
}
