import { useMemo, useRef } from 'react';
import { calculate, EngineInputError, type CalculationResult } from '@gaadiganit/engine';
import { defaults } from './defaults.ts';
import { toCalculationInput, type StoredScenario } from './scenario.ts';

export interface CalcState {
  result: CalculationResult | null;
  /** Field errors keyed by dotted input path, e.g. 'usage.kmPerMonth'. */
  errors: Record<string, string>;
  /** True when `result` is from an earlier, valid set of inputs (IN-13). */
  stale: boolean;
}

/** Recalculates on every change; keeps the last valid result while inputs are invalid. */
export function useCalculation(scenario: StoredScenario | null): CalcState {
  const lastGood = useRef<CalculationResult | null>(null);
  return useMemo(() => {
    if (!scenario) return { result: null, errors: {}, stale: false };
    try {
      const result = calculate(toCalculationInput(scenario), defaults);
      lastGood.current = result;
      return { result, errors: {}, stale: false };
    } catch (e) {
      if (!(e instanceof EngineInputError)) throw e;
      const errors: Record<string, string> = {};
      for (const issue of e.issues) {
        const [root, ...rest] = issue.path.map(String);
        const key = root === 'vehicle' ? `vehicle.${rest.join('.')}` : rest.join('.');
        errors[key] ??= issue.message;
      }
      return { result: lastGood.current, errors, stale: lastGood.current !== null };
    }
  }, [scenario]);
}
