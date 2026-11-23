import {
  inferCategory, type CalculationInput, type ScenarioInputs, type Vehicle,
} from '@gaadiganit/engine';
import { defaults } from './defaults.ts';

/** A scenario as stored on the device (DATA-01, DATA-04). */
export interface StoredScenario {
  id: string;
  schemaVersion: 1;
  name: string;
  vehicle: Vehicle;
  inputs: ScenarioInputs;
  /** True while the body type is still the price-based guess (IN-02). */
  categoryAuto: boolean;
  defaultsVersion: string;
  /** Last calculated cost per month, for the home list. */
  lastCostPerMonth?: number;
  createdAt: string;
  updatedAt: string;
}

export function newId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function newScenario(cityId: string): StoredScenario {
  const now = new Date().toISOString();
  const exShowroom = 800_000_00;
  return {
    id: newId(),
    schemaVersion: 1,
    name: '',
    vehicle: {
      id: newId(),
      make: '',
      model: '',
      category: inferCategory(exShowroom, defaults),
      fuelType: 'petrol',
      useType: 'personal',
      exShowroom,
    },
    inputs: {
      cityId,
      usage: { ownershipMonths: defaults.usage.value.ownershipMonths, kmPerMonth: defaults.usage.value.kmPerMonth },
    },
    categoryAuto: true,
    defaultsVersion: defaults.version,
    createdAt: now,
    updatedAt: now,
  };
}

export function toCalculationInput(s: StoredScenario): CalculationInput {
  return { vehicle: s.vehicle, inputs: s.inputs };
}

/** Display name: the user's name, else the model, else a generic label. */
export function displayName(s: StoredScenario): string {
  return s.name.trim() || [s.vehicle.make, s.vehicle.model].filter(Boolean).join(' ').trim() || 'GaadiGanit';
}

type Obj = Record<string, unknown>;

/**
 * Immutable set by path. `undefined` deletes the key (so the engine falls back
 * to its default), and empty parent objects are kept.
 */
export function setIn<T extends object>(obj: T, path: (string | number)[], value: unknown): T {
  const [head, ...rest] = path;
  if (head === undefined) return value as T;
  const src = (obj ?? {}) as Obj;
  const copy: Obj = Array.isArray(src) ? ([...src] as unknown as Obj) : { ...src };
  if (rest.length === 0) {
    if (value === undefined) delete copy[head];
    else copy[head] = value;
  } else {
    copy[head] = setIn((src[head] ?? {}) as object, rest, value);
  }
  return copy as T;
}

export function getIn(obj: unknown, path: (string | number)[]): unknown {
  return path.reduce<unknown>((o, k) => (o == null ? undefined : (o as Obj)[k]), obj);
}
