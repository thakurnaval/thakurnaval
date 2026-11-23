/**
 * Indian number formatting and parsing (UI-07, IN-05).
 * Engine values are paise; everything here converts at the edge.
 */
export type Lang = 'en' | 'hi';

const locale = (lang: Lang) => (lang === 'hi' ? 'hi-IN' : 'en-IN');

const LAKH = 100_000;
const CRORE = 10_000_000;

/** ₹12,34,567 (whole rupees). */
export function formatINR(paise: number, lang: Lang = 'en', fractionDigits = 0): string {
  return new Intl.NumberFormat(locale(lang), {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
    numberingSystem: 'latn',
  }).format(paise / 100);
}

/** ₹12.3 lakh / ₹1.25 crore for amounts ≥ ₹1 lakh; full digits below. */
export function formatCompactINR(paise: number, lang: Lang = 'en'): string {
  const rupees = paise / 100;
  const abs = Math.abs(rupees);
  const num = (n: number, digits: number) =>
    new Intl.NumberFormat(locale(lang), { maximumFractionDigits: digits, numberingSystem: 'latn' }).format(n);
  if (abs >= CRORE) return `₹${num(rupees / CRORE, 2)} ${lang === 'hi' ? 'करोड़' : 'crore'}`;
  if (abs >= LAKH) return `₹${num(rupees / LAKH, 1)} ${lang === 'hi' ? 'लाख' : 'lakh'}`;
  return formatINR(paise, lang);
}

export function formatNumber(n: number, lang: Lang = 'en', maxDigits = 1): string {
  return new Intl.NumberFormat(locale(lang), { maximumFractionDigits: maxDigits, numberingSystem: 'latn' }).format(n);
}

/** 0.075 → "7.5%" */
export function formatRate(rate: number, lang: Lang = 'en'): string {
  return `${formatNumber(rate * 100, lang, 2)}%`;
}

/**
 * Parse an Indian money string to paise.
 * Accepts 1250000 · 12,50,000 · ₹12,50,000 · 12.5 lakh · 12.5L · 12.5 lac · 1.25 cr · 1.25 crore · 45k
 * Returns null when the text isn't a valid amount. Empty text → undefined.
 */
export function parseMoney(text: string): number | null | undefined {
  const t = text.trim().toLowerCase().replace(/[₹,\s]/g, '').replace(/^rs\.?/, '');
  if (t === '') return undefined;
  const m = /^(\d+(?:\.\d+)?)(lakhs?|lacs?|l|लाख|crores?|cr|करोड़|करोड|k|thousand|हज़ार|हजार)?$/.exec(t);
  if (!m) return null;
  const n = Number(m[1]);
  const unit = m[2] ?? '';
  let mult = 1;
  if (/^(lakhs?|lacs?|l|लाख)$/.test(unit)) mult = LAKH;
  else if (/^(crores?|cr|करोड़|करोड)$/.test(unit)) mult = CRORE;
  else if (/^(हज़ार|हजार)$/.test(unit)) mult = 1000;
  else if (/^(k|thousand)$/.test(unit)) mult = 1000;
  return Math.round(n * mult * 100);
}

/** Plain decimal number; empty → undefined, invalid → null. */
export function parseNumber(text: string): number | null | undefined {
  const t = text.trim().replace(/,/g, '');
  if (t === '') return undefined;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

/** Text shown in a money input after blur: 12,50,000 (no ₹; the field shows it). */
export function moneyInputText(paise: number | undefined, lang: Lang = 'en'): string {
  if (paise === undefined) return '';
  return new Intl.NumberFormat(locale(lang), { maximumFractionDigits: 2, numberingSystem: 'latn' }).format(paise / 100);
}
