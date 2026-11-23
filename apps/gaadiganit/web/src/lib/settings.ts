/**
 * Per-device preferences in localStorage. Every access is guarded: storage can
 * be unavailable (private mode, blocked site data) and the app must still work.
 */
import { useSyncExternalStore } from 'react';
import type { Lang } from './format.ts';
import { defaults } from './defaults.ts';

/** Personal fuel and electricity prices in paise, applied to every calculation (v2). */
export const PRICE_KEYS = ['petrolPerLitre', 'dieselPerLitre', 'cngPerKg', 'electricityHomePerKwh', 'electricityPublicPerKwh'] as const;
export type PriceKey = (typeof PRICE_KEYS)[number];
export type MyPrices = Partial<Record<PriceKey, number>>;

export interface Settings {
  lang: Lang;
  cityId: string;
  myPrices: MyPrices;
  /** When the user last changed their prices (YYYY-MM-DD). */
  myPricesAsOf?: string;
}

const KEY = 'gaadiganit.settings';
const listeners = new Set<() => void>();

function initialLang(): Lang {
  try {
    return navigator.language?.toLowerCase().startsWith('hi') ? 'hi' : 'en';
  } catch {
    return 'en';
  }
}

function read(): Settings {
  const fallback: Settings = { lang: initialLang(), cityId: defaults.fallbackCityId, myPrices: {} };
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Partial<Settings> | null;
    const myPrices: MyPrices = {};
    for (const k of PRICE_KEYS) {
      const v = parsed?.myPrices?.[k];
      if (typeof v === 'number' && Number.isInteger(v) && v >= 100 && v <= 50_000) myPrices[k] = v;
    }
    return {
      lang: parsed?.lang === 'hi' || parsed?.lang === 'en' ? parsed.lang : fallback.lang,
      cityId: parsed?.cityId && defaults.cities[parsed.cityId] ? parsed.cityId : fallback.cityId,
      myPrices,
      ...(typeof parsed?.myPricesAsOf === 'string' ? { myPricesAsOf: parsed.myPricesAsOf } : {}),
    };
  } catch {
    return fallback;
  }
}

let current = read();

export function getSettings(): Settings {
  return current;
}

export function updateSettings(patch: Partial<Settings>) {
  current = { ...current, ...patch };
  try {
    localStorage.setItem(KEY, JSON.stringify(current));
  } catch {
    // Not persisted; the in-memory value still applies for this session.
  }
  listeners.forEach((l) => l());
}

export function useSettings(): Settings {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => current,
  );
}
