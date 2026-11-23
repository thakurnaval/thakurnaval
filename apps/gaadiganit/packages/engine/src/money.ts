import type { Paise } from './schemas.ts';

/** Round to the nearest whole paisa, halves away from zero (SPEC §4.7). */
export function roundPaise(x: number): Paise {
  const r = x >= 0 ? Math.floor(x + 0.5) : -Math.floor(-x + 0.5);
  return r === 0 ? 0 : r; // normalise -0
}

/** Rupees → paise. Convenience for tests and UI parsing. */
export function rupees(r: number): Paise {
  return roundPaise(r * 100);
}
