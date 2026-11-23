/**
 * Per-device preferences in localStorage. Every access is guarded: storage can
 * be unavailable (private mode, blocked site data) and the app must still work.
 */
import { useSyncExternalStore } from 'react';
import type { Lang } from './format.ts';
import { defaults } from './defaults.ts';

export interface Settings {
  lang: Lang;
  cityId: string;
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
  const fallback: Settings = { lang: initialLang(), cityId: defaults.fallbackCityId };
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Partial<Settings> | null;
    return {
      lang: parsed?.lang === 'hi' || parsed?.lang === 'en' ? parsed.lang : fallback.lang,
      cityId: parsed?.cityId && defaults.cities[parsed.cityId] ? parsed.cityId : fallback.cityId,
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
