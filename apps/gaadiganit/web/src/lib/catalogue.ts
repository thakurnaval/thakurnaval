/**
 * Model catalogue (v2): the curated file plus models the user saved.
 */
import { useCallback, useEffect, useState } from 'react';
import {
  lakhToPaise, parseCatalogue,
  type CatalogueModel, type CatalogueOption, type CalculationResult, type ScenarioInputs,
} from '@gaadiganit/engine';
import raw from '../../../defaults/catalogue.json';
import { defaults } from './defaults.ts';
import { newId, setIn, type StoredScenario } from './scenario.ts';
import { listModels, saveModel } from './storage.ts';

export const catalogue = parseCatalogue(raw);

/** A model the user saved: one fuel option with their exact price and mileage. */
export interface StoredModel extends CatalogueModel {
  mine: true;
  /** Whether the saved mileage is the brochure figure (real-world factor applies). */
  isClaimed: boolean;
  createdAt: string;
}

export type AnyModel = CatalogueModel | StoredModel;
export const isMine = (m: AnyModel): m is StoredModel => 'mine' in m && m.mine === true;

/** Fill a scenario's vehicle and mileage from a model option. */
export function applyModel(s: StoredScenario, m: AnyModel, o: CatalogueOption): StoredScenario {
  const exShowroom = lakhToPaise(o.priceLakh[0]);
  const fuelChanged = o.fuelType !== s.vehicle.fuelType;
  let inputs = setIn(s.inputs, ['usage', 'mileage'], {
    primary: o.mileage,
    ...(o.mileageSecondary !== undefined ? { secondary: o.mileageSecondary } : {}),
    ...(isMine(m) && !m.isClaimed ? { isClaimed: false } : {}),
  }) as ScenarioInputs;
  // Prices are per litre / kg / kWh, so they don't carry across fuel types.
  if (fuelChanged) inputs = setIn(inputs, ['usage', 'fuelPrice'], undefined) as ScenarioInputs;
  // Commercial models open in commercial mode, ready for earnings.
  const useType = m.use ?? s.vehicle.useType;
  if (useType === 'commercial' && !inputs.commercial) {
    inputs = setIn(inputs, ['commercial'], { earnings: { kind: 'per_km', value: 0 } }) as ScenarioInputs;
  }
  return {
    ...s,
    vehicle: { ...s.vehicle, make: m.make, model: m.model, category: m.category, fuelType: o.fuelType, exShowroom, useType },
    categoryAuto: false,
    inputs,
  };
}

/** Make a "my model" from the current scenario and its result. */
export function modelFromScenario(s: StoredScenario, r: CalculationResult): StoredModel {
  const v = s.vehicle;
  const num = (path: string) => {
    const x = r.assumptions.find((a) => a.path === path)?.value;
    return typeof x === 'number' ? x : undefined;
  };
  const lakh = Math.round((v.exShowroom / lakhToPaise(1)) * 100) / 100;
  const secondary = num('usage.mileage.secondary');
  const now = new Date().toISOString();
  return {
    id: `my-${newId()}`,
    make: v.make.trim() || '—',
    model: v.model.trim() || v.nickname?.trim() || 'My car',
    category: v.category,
    options: [{
      fuelType: v.fuelType,
      priceLakh: [lakh, lakh],
      mileage: num('usage.mileage.primary') ?? defaults.typicalMileage.value[v.fuelType].primary,
      ...(v.fuelType === 'dual_petrol_cng' && secondary !== undefined ? { mileageSecondary: secondary } : {}),
    }],
    source: 'You',
    asOf: now.slice(0, 10),
    verified: true,
    mine: true,
    isClaimed: s.inputs.usage.mileage?.isClaimed ?? true,
    createdAt: now,
  };
}

export async function saveScenarioAsModel(s: StoredScenario, r: CalculationResult): Promise<StoredModel> {
  const m = modelFromScenario(s, r);
  await saveModel(m);
  return m;
}

/** The user's saved models, with a reload function. */
export function useMyModels() {
  const [models, setModels] = useState<StoredModel[]>([]);
  const reload = useCallback(() => listModels().then(setModels).catch(() => setModels([])), []);
  useEffect(() => { void reload(); }, [reload]);
  return { models, reload };
}
