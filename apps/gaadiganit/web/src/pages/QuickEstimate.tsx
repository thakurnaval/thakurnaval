/** Quick estimate (IN-01): five fields, answer on the same screen. */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FUEL_TYPES, inferCategory, type FuelType } from '@gaadiganit/engine';
import { MoneyField, NumberField, SelectField } from '../components/fields.tsx';
import { ModelPicker } from '../components/ModelPicker.tsx';
import { applyModel, useMyModels } from '../lib/catalogue.ts';
import { ResultView } from '../components/ResultView.tsx';
import { useT } from '../i18n/index.ts';
import { defaults } from '../lib/defaults.ts';
import { newScenario, type StoredScenario } from '../lib/scenario.ts';
import { getSettings } from '../lib/settings.ts';
import { saveScenario } from '../lib/storage.ts';
import { useCalculation } from '../lib/useCalculation.ts';

export default function QuickEstimate() {
  const { t } = useT();
  const navigate = useNavigate();
  const [s, setS] = useState<StoredScenario>(() => newScenario(getSettings().cityId));
  const { result, errors, stale } = useCalculation(s);
  const [saving, setSaving] = useState(false);
  const { models: myModels } = useMyModels();

  const setUsage = (key: 'kmPerMonth' | 'ownershipMonths', value: number | undefined) =>
    setS((p) => ({ ...p, inputs: { ...p.inputs, usage: { ...p.inputs.usage, [key]: value ?? 0 } } }));

  const save = async () => {
    setSaving(true);
    const now = new Date().toISOString();
    const record: StoredScenario = { ...s, updatedAt: now, lastCostPerMonth: result?.costPerMonth };
    await saveScenario(record);
    navigate(`/s/${record.id}`);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <section className="card h-fit space-y-4" aria-labelledby="quick-title">
        <div>
          <h1 id="quick-title" className="text-2xl font-bold">{t('quick.title')}</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t('quick.intro')}</p>
        </div>
        <ModelPicker
          value={s.vehicle.model}
          fuel={s.vehicle.fuelType}
          myModels={myModels}
          onTextChange={(model) => setS((p) => ({ ...p, vehicle: { ...p.vehicle, model } }))}
          onPick={({ model, option }) => setS((p) => applyModel(p, model, option))}
        />
        <SelectField<FuelType>
          label={t('fields.vehicle.fuelType')}
          value={s.vehicle.fuelType}
          onChange={(fuelType) => setS((p) => ({
            ...p,
            vehicle: { ...p.vehicle, fuelType },
            // Mileage and prices are per litre / kg / kWh, so they don't carry across fuels.
            inputs: { ...p.inputs, usage: { ownershipMonths: p.inputs.usage.ownershipMonths, kmPerMonth: p.inputs.usage.kmPerMonth } },
          }))}
          options={FUEL_TYPES.map((f) => ({ value: f, label: t(`fuel.${f}`) }))}
        />
        <MoneyField
          label={t('fields.vehicle.exShowroom')}
          value={s.vehicle.exShowroom}
          required
          error={errors['vehicle.exShowroom']}
          onChange={(p) => p !== undefined && setS((prev) => ({
            ...prev,
            vehicle: { ...prev.vehicle, exShowroom: p, category: prev.categoryAuto ? inferCategory(p, defaults) : prev.vehicle.category },
          }))}
        />
        <NumberField label={t('fields.usage.kmPerMonth')} value={s.inputs.usage.kmPerMonth} error={errors['usage.kmPerMonth']} onChange={(n) => setUsage('kmPerMonth', n)} />
        <NumberField label={t('fields.usage.ownershipMonths')} value={s.inputs.usage.ownershipMonths} error={errors['usage.ownershipMonths']} onChange={(n) => setUsage('ownershipMonths', n)} />
        <button type="button" className="btn-primary w-full" disabled={!result || stale || saving} onClick={save}>
          {t('quick.save')}
        </button>
      </section>
      <div>
        {result ? <ResultView result={result} stale={stale} /> : <p className="card text-slate-600">{t('quick.fillIn')}</p>}
      </div>
    </div>
  );
}
