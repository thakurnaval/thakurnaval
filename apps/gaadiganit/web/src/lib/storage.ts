/**
 * IndexedDB persistence (DATA-01..04). One object store, keyed by scenario id.
 */
import { openDB, type IDBPDatabase } from 'idb';
import type { StoredScenario } from './scenario.ts';
import type { StoredModel } from './catalogue.ts';

const DB_NAME = 'gaadiganit';
const DB_VERSION = 2;
const STORE = 'scenarios';
const MODELS = 'models';
export const CURRENT_SCHEMA = 1;

let dbPromise: Promise<IDBPDatabase> | null = null;

function db() {
  dbPromise ??= openDB(DB_NAME, DB_VERSION, {
    upgrade(d) {
      if (!d.objectStoreNames.contains(STORE)) {
        d.createObjectStore(STORE, { keyPath: 'id' }).createIndex('updatedAt', 'updatedAt');
      }
      // v2: models the user saved ("my models")
      if (!d.objectStoreNames.contains(MODELS)) d.createObjectStore(MODELS, { keyPath: 'id' });
    },
  });
  return dbPromise;
}

/**
 * Bring a stored record up to the current schema. Each step upgrades one
 * version; add a step here whenever StoredScenario changes shape (DATA-04).
 */
export function migrate(record: Record<string, unknown>): StoredScenario {
  const r = { ...record };
  if (r.schemaVersion === undefined) {
    // Pre-release drafts had no version or categoryAuto flag.
    r.schemaVersion = 1;
    r.categoryAuto ??= false;
  }
  return r as unknown as StoredScenario;
}

export async function listScenarios(): Promise<StoredScenario[]> {
  const all = await (await db()).getAll(STORE);
  return all.map(migrate).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getScenario(id: string): Promise<StoredScenario | undefined> {
  const r = await (await db()).get(STORE, id);
  return r ? migrate(r) : undefined;
}

export async function saveScenario(s: StoredScenario): Promise<void> {
  await (await db()).put(STORE, s);
}

export async function deleteScenario(id: string): Promise<void> {
  await (await db()).delete(STORE, id);
}

/** For tests: drop the cached connection. */
export function _resetDbForTests() {
  dbPromise = null;
}

// -- My models (v2) ----------------------------------------------------------

export async function listModels(): Promise<StoredModel[]> {
  const all = (await (await db()).getAll(MODELS)) as StoredModel[];
  return all.sort((a, b) => (a.make + ' ' + a.model).localeCompare(b.make + ' ' + b.model));
}

export async function saveModel(m: StoredModel): Promise<void> {
  await (await db()).put(MODELS, m);
}

export async function deleteModel(id: string): Promise<void> {
  await (await db()).delete(MODELS, id);
}
