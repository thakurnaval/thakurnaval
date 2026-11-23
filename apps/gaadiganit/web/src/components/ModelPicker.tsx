/**
 * Model search (v2): an ARIA combobox over the curated catalogue and the
 * user's saved models. Typing is still free text; picking a row fills the
 * vehicle's make, body type, fuel, price and mileage.
 */
import { useId, useMemo, useState } from 'react';
import { searchCatalogue, type CatalogueOption, type FuelType } from '@gaadiganit/engine';
import { useT } from '../i18n/index.ts';
import { catalogue, isMine, type AnyModel, type StoredModel } from '../lib/catalogue.ts';
import { formatNumber } from '../lib/format.ts';

export interface PickedModel { model: AnyModel; option: CatalogueOption }

const MAX_ROWS = 8;
const UNIT: Record<FuelType, string> = { petrol: 'km/l', diesel: 'km/l', strong_hybrid: 'km/l', dual_petrol_cng: 'km/l', cng: 'km/kg', ev: 'km/kWh' };

export function ModelPicker({ value, onTextChange, onPick, fuel, myModels, error }: {
  value: string;
  onTextChange: (text: string) => void;
  onPick: (p: PickedModel) => void;
  fuel?: FuelType;
  myModels: StoredModel[];
  error?: string | undefined;
}) {
  const { t, lang } = useT();
  const id = useId();
  const listId = `${id}-list`;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [note, setNote] = useState('');

  const rows = useMemo<PickedModel[]>(() => {
    if (!open || value.trim() === '') return [];
    const models: AnyModel[] = [...searchCatalogue(myModels, value, fuel), ...searchCatalogue(catalogue.models, value, fuel)];
    const flat = models.flatMap((m) => {
      const opts = [...m.options].sort((a, b) => (a.fuelType === fuel ? -1 : b.fuelType === fuel ? 1 : 0));
      return opts.map((option) => ({ model: m, option }));
    });
    return flat.slice(0, MAX_ROWS);
  }, [open, value, fuel, myModels]);

  const lakh = (n: number) => formatNumber(n, lang, 2);
  const range = (o: CatalogueOption) => (o.priceLakh[0] === o.priceLakh[1]
    ? `₹${lakh(o.priceLakh[0])} ${lang === 'hi' ? 'लाख' : 'lakh'}`
    : `₹${lakh(o.priceLakh[0])}–${lakh(o.priceLakh[1])} ${lang === 'hi' ? 'लाख' : 'lakh'}`);

  const pick = (p: PickedModel) => {
    onPick(p);
    setOpen(false);
    const name = `${p.model.make} ${p.model.model}`;
    const label = `${name} (${t(`fuel.${p.option.fuelType}`)})`;
    setNote(isMine(p.model)
      ? t('picker.appliedMine', { name })
      : p.model.use === 'commercial'
        ? t('picker.appliedCommercial', { name: label, range: range(p.option) })
        : t('picker.applied', { name: label, range: range(p.option) }));
  };

  const date = new Date(`${catalogue.asOf}T00:00:00`).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { month: 'short', year: 'numeric' });

  return (
    <div className="relative sm:col-span-2" data-field="vehicle.model">
      <label htmlFor={id} className="label">{t('picker.label')}</label>
      <input
        id={id}
        className="input"
        role="combobox"
        aria-expanded={rows.length > 0}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={rows.length > 0 ? `${listId}-${active}` : undefined}
        aria-invalid={error ? true : undefined}
        autoComplete="off"
        placeholder={t('picker.placeholder')}
        value={value}
        onChange={(e) => { onTextChange(e.target.value); setOpen(true); setActive(0); setNote(''); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (!rows.length) return;
          if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => (a + 1) % rows.length); }
          else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => (a - 1 + rows.length) % rows.length); }
          else if (e.key === 'Enter') { e.preventDefault(); pick(rows[active]!); }
          else if (e.key === 'Escape') setOpen(false);
        }}
      />
      {rows.length > 0 ? (
        <ul id={listId} role="listbox" className="absolute z-20 mt-1 max-h-80 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          {rows.map((r, i) => (
            <li
              key={`${r.model.id}-${r.option.fuelType}`}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              className={`flex cursor-pointer flex-wrap items-baseline justify-between gap-x-3 px-3 py-2 text-sm ${i === active ? 'bg-brand-50 dark:bg-brand-900/40' : ''}`}
              onMouseDown={(e) => { e.preventDefault(); pick(r); }}
              onMouseEnter={() => setActive(i)}
            >
              <span>
                <span className="font-medium">{r.model.make} {r.model.model}</span>
                <span className="text-slate-500 dark:text-slate-400"> · {t(`fuel.${r.option.fuelType}`)}</span>
                {isMine(r.model) ? <span className="ml-2 rounded bg-brand-100 px-1.5 py-0.5 text-xs text-brand-800 dark:bg-brand-900 dark:text-brand-100">{t('picker.mine')}</span> : null}
                {r.model.use === 'commercial' ? <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-900 dark:bg-amber-900 dark:text-amber-100">{t('picker.commercial')}</span> : null}
                <span className="block text-xs text-slate-500 dark:text-slate-400">{t(`category.${r.model.category}`)}{r.model.note ? ` · ${r.model.note}` : ''}</span>
              </span>
              <span className="tabular-nums text-slate-600 dark:text-slate-300">{range(r.option)} · {formatNumber(r.option.mileage, lang, 2)} {UNIT[r.option.fuelType]}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {error ? <p role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p> : null}
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400" aria-live="polite">
        {note || `${t('picker.hint')} ${t('picker.approx', { date })}`}
      </p>
    </div>
  );
}
