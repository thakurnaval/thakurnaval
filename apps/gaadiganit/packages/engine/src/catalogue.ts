/**
 * v2 model catalogue: curated make/model entries with price ranges and
 * claimed mileage per fuel option. Data, not code (NFR-07).
 */
import { z } from 'zod';
import { CategorySchema, FuelTypeSchema, IsoDateSchema, type FuelType, type Paise } from './schemas.ts';

const LAKH_PAISE = 100_000 * 100;

export const CatalogueOptionSchema = z.object({
  fuelType: FuelTypeSchema,
  /** Ex-showroom range in lakh rupees: [lowest variant, highest variant]. */
  priceLakh: z.tuple([z.number().min(1).max(500), z.number().min(1).max(500)]),
  /** Claimed mileage: km/l, km/kg (CNG) or km/kWh (EV). */
  mileage: z.number().positive(),
  /** Dual fuel only: CNG km/kg. */
  mileageSecondary: z.number().positive().optional(),
}).superRefine((o, ctx) => {
  if (o.priceLakh[0] > o.priceLakh[1]) ctx.addIssue({ code: 'custom', path: ['priceLakh'], message: 'Lowest price is above highest price' });
  const [lo, hi] = o.fuelType === 'ev' ? [2, 15] : [1, 60];
  if (o.mileage < lo || o.mileage > hi) ctx.addIssue({ code: 'custom', path: ['mileage'], message: `Mileage must be ${lo}–${hi}` });
});

export const CatalogueModelSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  make: z.string().min(1),
  model: z.string().min(1),
  category: CategorySchema,
  options: z.array(CatalogueOptionSchema).min(1),
  source: z.string().min(1),
  asOf: IsoDateSchema,
  verified: z.boolean(),
});

export const CatalogueSchema = z.object({
  version: z.string().min(1),
  asOf: IsoDateSchema,
  models: z.array(CatalogueModelSchema),
}).superRefine((c, ctx) => {
  const seen = new Set<string>();
  c.models.forEach((m, i) => {
    if (seen.has(m.id)) ctx.addIssue({ code: 'custom', path: ['models', i, 'id'], message: `Duplicate id ${m.id}` });
    seen.add(m.id);
    const fuels = m.options.map((o) => o.fuelType);
    if (new Set(fuels).size !== fuels.length) ctx.addIssue({ code: 'custom', path: ['models', i, 'options'], message: `Repeated fuel type in ${m.id}` });
  });
});

export type CatalogueOption = z.infer<typeof CatalogueOptionSchema>;
export type CatalogueModel = z.infer<typeof CatalogueModelSchema>;
export type Catalogue = z.infer<typeof CatalogueSchema>;

export function parseCatalogue(raw: unknown): Catalogue {
  return CatalogueSchema.parse(raw);
}

export const lakhToPaise = (lakh: number): Paise => Math.round(lakh * LAKH_PAISE);

/** Normalised search key: lower case, no spaces, hyphens or dots. */
const norm = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[\s\-_.]/g, '');

/**
 * Search models by make/model words. Every query word must match the start
 * of the make, the model, or a word inside them ("nexon ev", "swift", "tata p").
 */
export function searchCatalogue<T extends Pick<CatalogueModel, 'make' | 'model'>>(models: T[], query: string, fuel?: FuelType): T[] {
  const words = query.toLowerCase().split(/\s+/).map(norm).filter(Boolean);
  const scored = models.flatMap((m) => {
    const hay = `${m.make} ${m.model}`.toLowerCase().split(/\s+/).map(norm);
    const joined = norm(`${m.make}${m.model}`);
    const modelKey = norm(m.model);
    if (!words.every((w) => hay.some((h) => h.startsWith(w)) || joined.includes(w))) return [];
    const score = (words.length && modelKey.startsWith(words.join('')) ? 0 : 1)
      + (fuel && 'options' in m && !(m as unknown as CatalogueModel).options.some((o) => o.fuelType === fuel) ? 2 : 0);
    return [{ m, score }];
  });
  return scored.sort((a, b) => a.score - b.score || a.m.make.localeCompare(b.m.make) || a.m.model.localeCompare(b.m.model)).map((x) => x.m);
}
