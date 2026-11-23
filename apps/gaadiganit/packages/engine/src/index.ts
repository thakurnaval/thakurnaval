export * from './schemas.ts';
export * from './result.ts';
export { roundPaise, rupees } from './money.ts';
export { emi, amortise, type Amortisation, type LoanMonth } from './loan.ts';
export {
  resolveInputs, inferCategory, roadTaxRate, retainedFraction,
  type ResolvedInputs, type EnergyPart, type EnergyLabel,
} from './resolve.ts';
export { calculate, validateInput, breakdownTotal, EngineInputError, ENGINE_VERSION } from './calculate.ts';
export {
  compare, breakEvenKm, breakEvenMonth, sensitivity, winners, withKm,
  type ComparisonResult, type BreakEvenKm, type BreakEvenMonth, type Sensitivity, type Metric,
} from './compare.ts';

export {
  CatalogueSchema, CatalogueModelSchema, CatalogueOptionSchema, parseCatalogue, searchCatalogue, lakhToPaise,
  type Catalogue, type CatalogueModel, type CatalogueOption,
} from './catalogue.ts';

import { DefaultsPackSchema, type DefaultsPack } from './schemas.ts';

/** Validate a raw defaults pack (e.g. imported JSON). Throws on invalid data (NFR-07). */
export function parseDefaults(raw: unknown): DefaultsPack {
  return DefaultsPackSchema.parse(raw);
}
