/**
 * Detailed editor (IN-03): collapsible sections, each showing its subtotal.
 */
import { useId, useState, type ReactNode } from 'react';
import {
  CATEGORIES, FUEL_TYPES, inferCategory,
  type CalculationResult, type Category, type FuelType, type ScenarioInputs,
} from '@gaadiganit/engine';
import { useT } from '../i18n/index.ts';
import type { MessageKey } from '../i18n/en.ts';
import { cityIds, defaults } from '../lib/defaults.ts';
import { formatCompactINR } from '../lib/format.ts';
import { getIn, setIn, type StoredScenario } from '../lib/scenario.ts';
import {
  AmountOrRateField, MoneyField, NumberField, PercentField, SelectField, TextField, Toggle,
} from './fields.tsx';

type Update = (fn: (s: StoredScenario) => StoredScenario) => void;

export interface EditorProps {
  scenario: StoredScenario;
  result: CalculationResult | null;
  errors: Record<string, string>;
  onChange: Update;
}

export function Section({ title, subtotal, children, defaultOpen = false }: {
  title: string; subtotal?: string | undefined; children: ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <section className="card p-0 sm:p-0">
      <h2>
        <button
          type="button"
          className="flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left sm:px-6"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
        >
          <span className="text-base font-semibold">{title}</span>
          <span className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            {subtotal ? <span className="tabular-nums">{subtotal}</span> : null}
            <span aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
          </span>
        </button>
      </h2>
      <div id={id} hidden={!open} className="grid gap-4 border-t border-slate-100 px-4 py-4 sm:grid-cols-2 sm:px-6 dark:border-slate-800">
        {children}
      </div>
    </section>
  );
}

const MILEAGE_UNIT: Record<FuelType, 'km/litre' | 'km/kg' | 'km/kWh'> = {
  petrol: 'km/litre', diesel: 'km/litre', strong_hybrid: 'km/litre', dual_petrol_cng: 'km/litre', cng: 'km/kg', ev: 'km/kWh',
};
const PRICE_LABEL: Record<FuelType, [MessageKey, MessageKey?]> = {
  petrol: ['price.petrol'], strong_hybrid: ['price.petrol'], diesel: ['price.diesel'], cng: ['price.cng'],
  dual_petrol_cng: ['price.petrol', 'price.cng'], ev: ['price.electricity_home', 'price.electricity_public'],
};

export function ScenarioEditor({ scenario, result, errors, onChange }: EditorProps) {
  const { t, lang } = useT();
  const v = scenario.vehicle;
  const inp = scenario.inputs;
  const a = (path: string) => result?.assumptions.find((x) => x.path === path);
  const num = (path: string) => {
    const x = a(path)?.value;
    return typeof x === 'number' ? x : undefined;
  };
  const set = (path: string, value: unknown) =>
    onChange((s) => ({ ...s, inputs: setIn(s.inputs, path.split('.'), value) as ScenarioInputs }));
  const get = <T,>(path: string) => getIn(inp, path.split('.')) as T | undefined;
  const err = (path: string) => errors[path];
  const money = (n: number | undefined) => (n === undefined ? undefined : formatCompactINR(n, lang));

  const setVehicle = <K extends keyof StoredScenario['vehicle']>(key: K, value: StoredScenario['vehicle'][K]) =>
    onChange((s) => {
      const vehicle = { ...s.vehicle, [key]: value };
      if (key === 'exShowroom' && s.categoryAuto && typeof value === 'number') vehicle.category = inferCategory(value, defaults);
      return { ...s, vehicle, categoryAuto: key === 'category' ? false : s.categoryAuto };
    });

  const b = result?.breakdown;
  const renewals = result ? result.breakdown.insurance - result.upfront.insuranceYear1 : undefined;
  const onRoad = result?.upfront.onRoad ?? v.exShowroom;
  const fuel = v.fuelType;
  const [price1, price2] = PRICE_LABEL[fuel];

  // km per day × days (IN-07) is a view over kmPerMonth.
  const [perDay, setPerDay] = useState(false);
  const [days, setDays] = useState(30);

  return (
    <div className="space-y-3">
      <Section title={t('section.vehicle')} subtotal={formatCompactINR(v.exShowroom, lang)} defaultOpen>
        <TextField label={t('editor.name')} value={scenario.name} onChange={(name) => onChange((s) => ({ ...s, name }))} />
        <TextField label={t('fields.vehicle.nickname')} value={v.nickname ?? ''} onChange={(x) => setVehicle('nickname', x || undefined)} />
        <TextField label={t('fields.vehicle.make')} value={v.make} onChange={(x) => setVehicle('make', x)} />
        <TextField label={t('fields.vehicle.model')} value={v.model} onChange={(x) => setVehicle('model', x)} error={err('vehicle.model')} />
        <TextField label={t('fields.vehicle.variant')} value={v.variant ?? ''} onChange={(x) => setVehicle('variant', x || undefined)} />
        <MoneyField label={t('fields.vehicle.exShowroom')} value={v.exShowroom} onChange={(p) => p !== undefined && setVehicle('exShowroom', p)} error={err('vehicle.exShowroom')} required />
        <SelectField<FuelType>
          label={t('fields.vehicle.fuelType')}
          value={fuel}
          onChange={(f) => onChange((s) => ({
            ...s,
            vehicle: { ...s.vehicle, fuelType: f },
            // Mileage and prices mean different units per fuel, so reset them.
            inputs: setIn(setIn(s.inputs, ['usage', 'mileage'], undefined), ['usage', 'fuelPrice'], undefined) as ScenarioInputs,
          }))}
          options={FUEL_TYPES.map((f) => ({ value: f, label: t(`fuel.${f}`) }))}
        />
        <SelectField<Category>
          label={t('fields.vehicle.category')}
          value={v.category}
          hint={scenario.categoryAuto ? t('category.auto') : undefined}
          onChange={(c) => setVehicle('category', c)}
          options={CATEGORIES.map((c) => ({ value: c, label: t(`category.${c}`) }))}
        />
        <SelectField<string>
          label={t('fields.location.cityId')}
          value={inp.cityId ?? defaults.fallbackCityId}
          onChange={(c) => set('cityId', c)}
          options={cityIds.map((c) => ({ value: c, label: defaults.cities[c]!.name }))}
        />
      </Section>

      <Section title={t('section.purchase')} subtotal={money(result?.upfront.onRoad)}>
        <AmountOrRateField label={t('fields.purchase.roadTax')} value={inp.purchase?.roadTax} base={v.exShowroom} defaultRate={num('purchase.roadTax.rate')} assumption={a('purchase.roadTax.rate')} onChange={(x) => set('purchase.roadTax', x)} />
        <AmountOrRateField label={t('fields.purchase.insuranceYear1')} value={inp.purchase?.insuranceYear1} base={v.exShowroom} defaultRate={num('purchase.insuranceYear1.rate')} assumption={a('purchase.insuranceYear1.rate')} onChange={(x) => set('purchase.insuranceYear1', x)} />
        <MoneyField label={t('fields.purchase.accessories')} value={get('purchase.accessories')} placeholder={0} onChange={(x) => set('purchase.accessories', x)} />
        <MoneyField label={t('fields.purchase.discounts')} value={get('purchase.discounts')} placeholder={0} error={err('inputs.purchase.discounts') ?? err('purchase.discounts')} onChange={(x) => set('purchase.discounts', x)} />
      </Section>

      <Section title={t('section.finance')} subtotal={inp.finance ? money(b?.interest) : undefined}>
        <div className="sm:col-span-2">
          <Toggle label={t('fields.finance.onLoan')} checked={!!inp.finance} onChange={(on) => set('finance', on ? {} : undefined)} />
        </div>
        {inp.finance ? (
          <>
            <AmountOrRateField label={t('fields.finance.downPayment')} value={inp.finance.downPayment} base={onRoad} defaultRate={num('finance.downPayment.rate') ?? defaults.finance.value.downPaymentRate} assumption={a('finance.downPayment.rate')} error={err('inputs.finance.downPayment') ?? err('finance.downPayment')} onChange={(x) => set('finance.downPayment', x)} />
            <PercentField label={t('fields.finance.annualRate')} value={inp.finance.annualRate} placeholder={num('finance.annualRate')} assumption={a('finance.annualRate')} error={err('finance.annualRate')} onChange={(x) => set('finance.annualRate', x)} />
            <NumberField label={t('fields.finance.tenureMonths')} value={inp.finance.tenureMonths} placeholder={num('finance.tenureMonths')} assumption={a('finance.tenureMonths')} error={err('finance.tenureMonths')} onChange={(x) => set('finance.tenureMonths', x)} />
            <MoneyField label={t('fields.finance.processingFee')} value={inp.finance.processingFee} placeholder={num('finance.processingFee')} assumption={a('finance.processingFee')} onChange={(x) => set('finance.processingFee', x)} />
          </>
        ) : null}
      </Section>

      <Section title={t('section.usage')} subtotal={money(b?.energy)} defaultOpen>
        <NumberField label={t('fields.usage.ownershipMonths')} value={inp.usage.ownershipMonths} error={err('usage.ownershipMonths')} onChange={(x) => set('usage.ownershipMonths', x ?? 0)} />
        <div>
          {perDay ? (
            <div className="grid grid-cols-2 gap-3">
              <NumberField label={t('fields.usage.kmPerDay')} value={Math.round((inp.usage.kmPerMonth / days) * 10) / 10} onChange={(x) => set('usage.kmPerMonth', Math.round((x ?? 0) * days))} />
              <NumberField label={t('fields.usage.daysPerMonth')} value={days} onChange={(x) => {
                const d = Math.min(31, Math.max(1, x ?? 30));
                set('usage.kmPerMonth', Math.round((inp.usage.kmPerMonth / days) * d));
                setDays(d);
              }} />
            </div>
          ) : (
            <NumberField label={t('fields.usage.kmPerMonth')} value={inp.usage.kmPerMonth} error={err('usage.kmPerMonth')} onChange={(x) => set('usage.kmPerMonth', x ?? 0)} />
          )}
          <div role="group" className="mt-1 inline-flex overflow-hidden rounded-md border border-slate-300 text-xs dark:border-slate-700">
            {[false, true].map((d) => (
              <button key={String(d)} type="button" aria-pressed={perDay === d} onClick={() => setPerDay(d)}
                className={`min-h-8 px-3 ${perDay === d ? 'bg-brand-700 text-white' : 'bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300'}`}>
                {t(d ? 'unit.perDay' : 'unit.perMonth')}
              </button>
            ))}
          </div>
        </div>
        <NumberField label={t(`mileage.${MILEAGE_UNIT[fuel]}`)} value={inp.usage.mileage?.primary} placeholder={num('usage.mileage.primary')} assumption={a('usage.mileage.primary')} error={err('usage.mileage.primary')} onChange={(x) => set('usage.mileage.primary', x)} />
        {fuel === 'dual_petrol_cng' ? (
          <NumberField label={t('fields.usage.mileage.secondary')} value={inp.usage.mileage?.secondary} placeholder={num('usage.mileage.secondary')} assumption={a('usage.mileage.secondary')} error={err('usage.mileage.secondary')} onChange={(x) => set('usage.mileage.secondary', x)} />
        ) : null}
        <div className="sm:col-span-2">
          <Toggle label={t('fields.usage.mileage.isClaimed')} checked={inp.usage.mileage?.isClaimed ?? true} onChange={(c) => set('usage.mileage.isClaimed', c ? undefined : false)} />
        </div>
        <MoneyField label={t(price1)} value={inp.usage.fuelPrice?.primary} placeholder={num('usage.fuelPrice.primary')} assumption={a('usage.fuelPrice.primary')} error={err('usage.fuelPrice.primary')} onChange={(x) => set('usage.fuelPrice.primary', x)} />
        {price2 ? (
          <MoneyField label={t(price2)} value={inp.usage.fuelPrice?.secondary} placeholder={num('usage.fuelPrice.secondary')} assumption={a('usage.fuelPrice.secondary')} error={err('usage.fuelPrice.secondary')} onChange={(x) => set('usage.fuelPrice.secondary', x)} />
        ) : null}
        {fuel === 'dual_petrol_cng' ? (
          <PercentField label={t('fields.usage.cngShare')} value={inp.usage.cngShare} placeholder={num('usage.cngShare')} assumption={a('usage.cngShare')} onChange={(x) => set('usage.cngShare', x)} />
        ) : null}
        {fuel === 'ev' ? (
          <PercentField label={t('fields.usage.evHomeShare')} value={inp.usage.evHomeShare} placeholder={num('usage.evHomeShare')} assumption={a('usage.evHomeShare')} onChange={(x) => set('usage.evHomeShare', x)} />
        ) : null}
        <PercentField label={t('fields.usage.fuelInflation')} value={inp.usage.fuelInflation} placeholder={num('usage.fuelInflation')} assumption={a('usage.fuelInflation')} error={err('usage.fuelInflation')} onChange={(x) => set('usage.fuelInflation', x)} />
      </Section>

      <Section title={t('section.maintenance')} subtotal={b && renewals !== undefined ? money(b.service + b.tyres + b.other + renewals) : undefined}>
        <MoneyField label={t('fields.maintenance.service.cost')} value={get('maintenance.service.cost')} placeholder={num('maintenance.service.cost')} assumption={a('maintenance.service.cost')} onChange={(x) => set('maintenance.service.cost', x)} />
        <div className="grid grid-cols-2 gap-3">
          <NumberField label={t('fields.maintenance.service.intervalKm')} value={get('maintenance.service.intervalKm')} placeholder={num('maintenance.service.intervalKm')} onChange={(x) => set('maintenance.service.intervalKm', x)} error={err('maintenance.service.intervalKm')} />
          <NumberField label={t('fields.maintenance.service.intervalMonths')} value={get('maintenance.service.intervalMonths')} placeholder={num('maintenance.service.intervalMonths')} onChange={(x) => set('maintenance.service.intervalMonths', x)} error={err('maintenance.service.intervalMonths')} />
        </div>
        <MoneyField label={t('fields.maintenance.tyres.costPerSet')} value={get('maintenance.tyres.costPerSet')} placeholder={num('maintenance.tyres.costPerSet')} assumption={a('maintenance.tyres.costPerSet')} onChange={(x) => set('maintenance.tyres.costPerSet', x)} />
        <NumberField label={t('fields.maintenance.tyres.lifeKm')} value={get('maintenance.tyres.lifeKm')} placeholder={num('maintenance.tyres.lifeKm')} assumption={a('maintenance.tyres.lifeKm')} error={err('maintenance.tyres.lifeKm')} onChange={(x) => set('maintenance.tyres.lifeKm', x)} />
        <PercentField label={t('fields.maintenance.insuranceRenewal.rate')} value={get<{ kind: string; rate?: number }>('maintenance.insuranceRenewal')?.rate} placeholder={num('maintenance.insuranceRenewal.rate')} assumption={a('maintenance.insuranceRenewal.rate')} onChange={(x) => set('maintenance.insuranceRenewal', x === undefined ? undefined : { kind: 'decline', rate: x })} />
        <MoneyField label={t('fields.maintenance.battery12v.cost')} value={get('maintenance.battery12v.cost')} placeholder={num('maintenance.battery12v.cost')} assumption={a('maintenance.battery12v.cost')} onChange={(x) => set('maintenance.battery12v.cost', x)} />
        <MoneyField label={t('fields.maintenance.parkingTollsCleaningPerMonth')} value={get('maintenance.parkingTollsCleaningPerMonth')} placeholder={num('maintenance.parkingTollsCleaningPerMonth')} onChange={(x) => set('maintenance.parkingTollsCleaningPerMonth', x)} />
        <MoneyField label={t('fields.maintenance.repairsBufferPerYear')} value={get('maintenance.repairsBufferPerYear')} placeholder={num('maintenance.repairsBufferPerYear')} assumption={a('maintenance.repairsBufferPerYear')} onChange={(x) => set('maintenance.repairsBufferPerYear', x)} />
        <CustomCosts items={inp.maintenance?.custom ?? []} onChange={(items) => set('maintenance.custom', items.length ? items : undefined)} />
      </Section>

      <Section title={t('section.resale')} subtotal={result ? `−${formatCompactINR(result.exit.resale, lang)}` : undefined}>
        <AmountOrRateField label={t('fields.exit.resale')} value={inp.exit?.resale} base={v.exShowroom} defaultRate={num('exit.resale.rate')} assumption={a('exit.resale.rate')} onChange={(x) => set('exit.resale', x)} />
        <div className="space-y-3">
          <Toggle label={t('fields.opportunityCost.enabled')} checked={!!inp.opportunityCost?.enabled} onChange={(on) => set('opportunityCost', on ? { enabled: true } : undefined)} />
          {inp.opportunityCost?.enabled ? (
            <PercentField label={t('fields.opportunityCost.fdRate')} value={inp.opportunityCost.fdRate} placeholder={num('opportunityCost.fdRate')} assumption={a('opportunityCost.fdRate')} onChange={(x) => set('opportunityCost.fdRate', x)} />
          ) : null}
        </div>
      </Section>
    </div>
  );
}

type Custom = NonNullable<NonNullable<ScenarioInputs['maintenance']>['custom']>[number];

function CustomCosts({ items, onChange }: { items: Custom[]; onChange: (items: Custom[]) => void }) {
  const { t } = useT();
  const update = (i: number, patch: Partial<Custom>) => onChange(items.map((it, j) => (j === i ? { ...it, ...patch } : it)));
  return (
    <fieldset className="space-y-3 sm:col-span-2">
      <legend className="label">{t('fields.maintenance.custom')}</legend>
      {items.map((it, i) => (
        <div key={i} className="grid grid-cols-2 items-end gap-3 rounded-lg border border-slate-200 p-3 sm:grid-cols-[2fr_1fr_1fr_auto] dark:border-slate-800">
          <TextField label={t('editor.costName')} value={it.name} onChange={(name) => update(i, { name })} />
          <MoneyField label={t('editor.costAmount')} value={it.amount} onChange={(amount) => update(i, { amount: amount ?? 0 })} />
          <SelectField<Custom['frequency']>
            label={t('editor.costFrequency')}
            value={it.frequency}
            onChange={(frequency) => update(i, { frequency })}
            options={(['once', 'monthly', 'yearly'] as const).map((f) => ({ value: f, label: t(`freq.${f}`) }))}
          />
          <button type="button" className="btn-secondary" onClick={() => onChange(items.filter((_, j) => j !== i))}>{t('editor.remove')}</button>
        </div>
      ))}
      {items.length < 20 ? (
        <button type="button" className="btn-secondary" onClick={() => onChange([...items, { name: t('fields.maintenance.custom'), amount: 0, frequency: 'monthly' }])}>
          + {t('editor.addCost')}
        </button>
      ) : null}
    </fieldset>
  );
}
