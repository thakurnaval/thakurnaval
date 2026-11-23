/**
 * IndexedDB persistence (DATA-01..04). One object store, keyed by scenario id.
 */
import { openDB, type IDBPDatabase } from 'idb';
import type { StoredScenario } from './scenario.ts';

const DB_NAME = 'gaadiganit';
const DB_VERSION = 1;
const STORE = 'scenarios';
export const CURRENT_SCHEMA = 1;

let dbPromise: Promise<IDBPDatabase> | null = null;

function db() {
  dbPromise ??= openDB(DB_NAME, DB_VERSION, {
    upgrade(d) {
      if (!d.objectStoreNames.contains(STORE)) {
        d.createObjectStore(STORE, { keyPath: 'id' }).createIndex('updatedAt', 'updatedAt');
      }
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
