import { describe, expect, it } from 'vitest';
import { newScenario, setIn } from './scenario.ts';
import { deleteScenario, getScenario, listScenarios, migrate, saveScenario } from './storage.ts';

describe('storage (DATA-01, DATA-03, DATA-04)', () => {
  it('saves, lists newest first, reads and deletes', async () => {
    const a = { ...newScenario('delhi'), name: 'A', updatedAt: '2026-01-01T00:00:00.000Z' };
    const b = { ...newScenario('mumbai'), name: 'B', updatedAt: '2026-02-01T00:00:00.000Z' };
    await saveScenario(a);
    await saveScenario(b);
    expect((await listScenarios()).map((s) => s.name)).toEqual(['B', 'A']);
    expect((await getScenario(a.id))?.inputs.cityId).toBe('delhi');
    await deleteScenario(a.id);
    expect(await getScenario(a.id)).toBeUndefined();
  });

  it('migrates unversioned records', () => {
    const { schemaVersion: _v, categoryAuto: _c, ...old } = newScenario('delhi');
    const m = migrate(old as Record<string, unknown>);
    expect(m.schemaVersion).toBe(1);
    expect(m.categoryAuto).toBe(false);
  });
});

describe('setIn', () => {
  it('sets nested values immutably and deletes on undefined', () => {
    const o = { a: { b: 1, c: 2 } };
    const set = setIn(o, ['a', 'd', 'e'], 3);
    expect(set).toEqual({ a: { b: 1, c: 2, d: { e: 3 } } });
    expect(o).toEqual({ a: { b: 1, c: 2 } });
    expect(setIn(o, ['a', 'b'], undefined)).toEqual({ a: { c: 2 } });
  });
});
