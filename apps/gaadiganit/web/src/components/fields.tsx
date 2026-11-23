/**
 * Form fields. Each shows its default as a placeholder and, when a default is
 * in use, a "based on" note from the engine's assumptions (IN-04).
 */
import { useEffect, useId, useState, type ReactNode } from 'react';
import type { AmountOrRate, Assumption } from '@gaadiganit/engine';
import { useT } from '../i18n/index.ts';
import { formatINR, formatNumber, moneyInputText, parseMoney, parseNumber, type Lang } from '../lib/format.ts';

interface Common {
  label: string;
  error?: string | undefined;
  hint?: ReactNode;
  assumption?: Assumption | undefined;
}

function Shell({ id, label, error, hint, assumption, children }: Common & { id: string; children: ReactNode }) {
  const { t } = useT();
  const usingDefault = assumption && assumption.provenance.kind !== 'user';
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      {children}
      {error ? (
        <p id={`${id}-err`} role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}
      {hint ? <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{hint}</div> : null}
      {usingDefault && !error ? (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          <span className="sr-only">{t('editor.info')}: </span>
          <SourceNote assumption={assumption} />
        </p>
      ) : null}
    </div>
  );
}

export function SourceNote({ assumption }: { assumption: Assumption }) {
  const { t, lang } = useT();
  const p = assumption.provenance;
  if (p.kind === 'derived') return <>{t('result.derived', { from: p.from })}</>;
  if (p.kind !== 'default') return null;
  const source = p.source === 'PLACEHOLDER' ? t('result.placeholderSource') : p.source;
  const date = new Date(`${p.asOf}T00:00:00`).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  return <>{source} · {t('result.asOf', { date })}</>;
}

/** Re-sync local text when the value changes from outside (e.g. unit switch). */
function useSyncedText(external: string): [string, (s: string) => void] {
  const [text, setText] = useState(external);
  const [last, setLast] = useState(external);
  if (external !== last) {
    setLast(external);
    setText(external);
  }
  return [text, setText];
}

export function MoneyField({ value, onChange, placeholder, required, ...common }: Common & {
  value: number | undefined;
  onChange: (paise: number | undefined) => void;
  placeholder?: number | undefined;
  required?: boolean;
}) {
  const id = useId();
  const { t, lang } = useT();
  const [text, setText] = useSyncedText(moneyInputText(value, lang));
  const [bad, setBad] = useState(false);
  const error = bad ? t('error.money') : common.error;
  return (
    <Shell id={id} {...common} error={error}>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-500">₹</span>
        <input
          id={id}
          className="input pl-7"
          inputMode="decimal"
          autoComplete="off"
          required={required}
          value={text}
          placeholder={placeholder !== undefined ? moneyInputText(placeholder, lang) : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          onChange={(e) => {
            setText(e.target.value);
            const p = parseMoney(e.target.value);
            setBad(p === null);
            if (p !== null) onChange(p);
          }}
          onBlur={() => {
            if (!bad) setText(moneyInputText(value, lang));
          }}
        />
      </div>
    </Shell>
  );
}

export function NumberField({ value, onChange, placeholder, min, max, step, suffix, ...common }: Common & {
  value: number | undefined;
  onChange: (n: number | undefined) => void;
  placeholder?: number | undefined;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}) {
  const id = useId();
  const { t, lang } = useT();
  const [text, setText] = useSyncedText(value === undefined ? '' : String(value));
  const [bad, setBad] = useState(false);
  const error = bad ? t('error.number') : common.error;
  return (
    <Shell id={id} {...common} error={error}>
      <div className="relative">
        <input
          id={id}
          className={`input ${suffix ? 'pr-10' : ''}`}
          inputMode="decimal"
          autoComplete="off"
          min={min}
          max={max}
          step={step}
          value={text}
          placeholder={placeholder !== undefined ? formatNumber(placeholder, lang, 2) : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          onChange={(e) => {
            setText(e.target.value);
            const n = parseNumber(e.target.value);
            setBad(n === null);
            if (n !== null) onChange(n);
          }}
        />
        {suffix ? <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">{suffix}</span> : null}
      </div>
    </Shell>
  );
}

/** A rate (0–1) edited as a percentage. */
export function PercentField({ value, onChange, placeholder, ...common }: Common & {
  value: number | undefined;
  onChange: (rate: number | undefined) => void;
  placeholder?: number | undefined;
}) {
  return (
    <NumberField
      {...common}
      suffix="%"
      value={value === undefined ? undefined : round(value * 100)}
      placeholder={placeholder === undefined ? undefined : round(placeholder * 100)}
      onChange={(n) => onChange(n === undefined ? undefined : n / 100)}
    />
  );
}

const round = (n: number) => Math.round(n * 10_000) / 10_000;

/**
 * Amount-or-rate field with a ₹ / % toggle (IN-06). `base` (paise) converts
 * between the two so switching units keeps the value.
 */
export function AmountOrRateField({ value, onChange, base, defaultRate, ...common }: Common & {
  value: AmountOrRate | undefined;
  onChange: (v: AmountOrRate | undefined) => void;
  base: number;
  defaultRate?: number | undefined;
}) {
  const { t } = useT();
  const [unit, setUnit] = useState<AmountOrRate['kind']>(value?.kind ?? 'rate');
  useEffect(() => {
    if (value) setUnit(value.kind);
  }, [value]);

  const switchTo = (next: AmountOrRate['kind']) => {
    setUnit(next);
    if (!value || value.kind === next) return;
    if (next === 'amount') onChange({ kind: 'amount', value: Math.round(value.value * base) });
    else onChange({ kind: 'rate', value: base > 0 ? Math.min(1, value.value / base) : 0 });
  };

  const toggle = (
    <div role="group" aria-label={common.label} className="mt-1 inline-flex overflow-hidden rounded-md border border-slate-300 text-xs dark:border-slate-700">
      {(['rate', 'amount'] as const).map((k) => (
        <button
          key={k}
          type="button"
          aria-pressed={unit === k}
          onClick={() => switchTo(k)}
          className={`min-h-8 px-3 ${unit === k ? 'bg-brand-700 text-white' : 'bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300'}`}
        >
          {t(k === 'rate' ? 'unit.rate' : 'unit.amount')}
        </button>
      ))}
    </div>
  );

  return unit === 'rate' ? (
    <PercentField
      {...common}
      hint={toggle}
      value={value?.kind === 'rate' ? value.value : undefined}
      placeholder={defaultRate}
      onChange={(r) => onChange(r === undefined ? undefined : { kind: 'rate', value: r })}
    />
  ) : (
    <MoneyField
      {...common}
      hint={toggle}
      value={value?.kind === 'amount' ? value.value : undefined}
      placeholder={defaultRate !== undefined ? Math.round(defaultRate * base) : undefined}
      onChange={(p) => onChange(p === undefined ? undefined : { kind: 'amount', value: p })}
    />
  );
}

export function SelectField<T extends string>({ value, onChange, options, ...common }: Common & {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  const id = useId();
  return (
    <Shell id={id} {...common}>
      <select id={id} className="input" value={value} onChange={(e) => onChange(e.target.value as T)}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </Shell>
  );
}

export function TextField({ value, onChange, placeholder, required, ...common }: Common & {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  const id = useId();
  return (
    <Shell id={id} {...common}>
      <input
        id={id}
        className="input"
        value={value}
        required={required}
        placeholder={placeholder}
        aria-invalid={common.error ? true : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
    </Shell>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  const id = useId();
  return (
    <div className="flex min-h-11 items-center gap-3">
      <input id={id} type="checkbox" className="size-5 accent-brand-700" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <label htmlFor={id} className="text-sm">{label}</label>
    </div>
  );
}

/** Format an assumption's value for display, using its unit. */
export function formatAssumption(a: Assumption, lang: Lang): string {
  if (typeof a.value !== 'number') return String(a.value);
  switch (a.unit) {
    case 'paise': return formatINR(a.value, lang);
    case 'paise/litre': return `${formatINR(a.value, lang, 2)}/L`;
    case 'paise/kg': return `${formatINR(a.value, lang, 2)}/kg`;
    case 'paise/kWh': return `${formatINR(a.value, lang, 2)}/kWh`;
    case 'rate': return `${formatNumber(a.value * 100, lang, 2)}%`;
    case 'km': return `${formatNumber(a.value, lang, 0)} km`;
    case 'months': return `${formatNumber(a.value, lang, 0)}`;
    default: return `${formatNumber(a.value, lang, 2)}${a.unit ? ` ${a.unit}` : ''}`;
  }
}
