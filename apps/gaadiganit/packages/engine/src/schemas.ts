/**
 * Zod schemas for every GaadiGanit entity. TypeScript types are inferred from
 * these schemas, so validation and types cannot drift (SPEC §5).
 *
 * Conventions: money is integer paise (Rs 1 = 100), rates are decimal fractions.
 */
import { z } from 'zod';

// ── Primitives ──────────────────────────────────────────────────────────────

const LAKH = 100_000 * 100; // paise in Rs 1 lakh
const CRORE = 100 * LAKH;

export const PaiseSchema = z.number().int().nonnegative();
export const RateSchema = z.number().min(0).max(1);
export const IsoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected YYYY-MM-DD');

export const FUEL_TYPES = ['petrol', 'diesel', 'cng', 'strong_hybrid', 'ev', 'dual_petrol_cng'] as const;
export const CATEGORIES = [
  'hatchback', 'sedan', 'compact_suv', 'suv', 'mpv',
  // Commercial: small (≤ 3.5 t) to heavy (≥ 19 t GVW), and passenger
  'pickup', 'van', 'mini_truck', 'light_truck', 'truck', 'heavy_truck', 'minibus', 'bus',
] as const;

/** Categories that are normally used commercially (cabs, goods, passengers). */
export const COMMERCIAL_CATEGORIES: readonly Category[] = ['pickup', 'mini_truck', 'light_truck', 'truck', 'heavy_truck', 'minibus', 'bus'];

export const FuelTypeSchema = z.enum(FUEL_TYPES);
export const CategorySchema = z.enum(CATEGORIES);
export const UseTypeSchema = z.enum(['personal', 'commercial']);
export const FrequencySchema = z.enum(['once', 'monthly', 'yearly']);

export const AmountOrRateSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('amount'), value: PaiseSchema }),
  z.object({ kind: z.literal('rate'), value: RateSchema }),
]);

// ── Stored entities (SPEC §5.2) ─────────────────────────────────────────────

export const VehicleSchema = z.object({
  id: z.string().min(1),
  nickname: z.string().max(80).optional(),
  make: z.string().max(60),
  /** Labels only; the maths never reads them, so an empty model is allowed. */
  model: z.string().max(80),
  variant: z.string().max(60).optional(),
  category: CategorySchema,
  fuelType: FuelTypeSchema,
  useType: UseTypeSchema,
  exShowroom: PaiseSchema.min(LAKH, 'Price must be at least ₹1 lakh').max(5 * CRORE, 'Price must be at most ₹5 crore'),
});

const MileageValue = z.number().min(0.5).max(60);
const FuelPriceValue = PaiseSchema.min(100).max(50_000); // Rs 1 – Rs 500 per unit

export const ScenarioInputsSchema = z.object({
  stateCode: z.string().min(2).max(3).optional(),
  cityId: z.string().min(1).optional(),

  purchase: z.object({
    roadTax: AmountOrRateSchema.optional(),
    insuranceYear1: AmountOrRateSchema.optional(),
    accessories: PaiseSchema.optional(),
    discounts: PaiseSchema.optional(),
  }).default({}),

  finance: z.object({
    downPayment: AmountOrRateSchema.optional(),
    annualRate: z.number().min(0).max(0.3).optional(),
    tenureMonths: z.number().int().min(1).max(120).optional(),
    processingFee: PaiseSchema.optional(),
  }).optional(),

  usage: z.object({
    ownershipMonths: z.number().int().min(1).max(240),
    kmPerMonth: z.number().min(0).max(20_000),
    mileage: z.object({
      primary: MileageValue.optional(),
      secondary: MileageValue.optional(),
      isClaimed: z.boolean().optional(),
    }).optional(),
    /** Share of claimed mileage achieved on the road (applies only when mileage is claimed). */
    realWorldFactor: z.number().min(0.3).max(1).optional(),
    fuelPrice: z.object({
      primary: FuelPriceValue.optional(),
      secondary: FuelPriceValue.optional(),
    }).optional(),
    fuelInflation: z.number().min(-0.1).max(0.2).optional(),
    cngShare: RateSchema.optional(),
    evHomeShare: RateSchema.optional(),
  }),

  maintenance: z.object({
    service: z.object({
      cost: PaiseSchema.optional(),
      intervalKm: z.number().positive().optional(),
      intervalMonths: z.number().int().positive().optional(),
    }).optional(),
    tyres: z.object({
      costPerSet: PaiseSchema.optional(),
      lifeKm: z.number().positive().optional(),
    }).optional(),
    battery12v: z.object({
      cost: PaiseSchema.optional(),
      intervalMonths: z.number().int().positive().optional(),
    }).optional(),
    insuranceRenewal: z.discriminatedUnion('kind', [
      z.object({ kind: z.literal('decline'), rate: RateSchema.optional() }),
      z.object({ kind: z.literal('fixed'), perYear: PaiseSchema }),
    ]).optional(),
    parkingTollsCleaningPerMonth: PaiseSchema.optional(),
    repairsBufferPerYear: PaiseSchema.optional(),
    custom: z.array(z.object({
      name: z.string().min(1).max(60),
      amount: PaiseSchema,
      frequency: FrequencySchema,
    })).max(20).optional(),
  }).default({}),

  exit: z.object({
    resale: AmountOrRateSchema.optional(),
  }).default({}),

  opportunityCost: z.object({
    enabled: z.boolean(),
    fdRate: z.number().min(0).max(0.2).optional(),
  }).optional(),

  /** v1.2 — accepted and stored, not yet calculated. */
  commercial: z.object({
    earnings: z.discriminatedUnion('kind', [
      z.object({ kind: z.literal('per_km'), value: PaiseSchema }),
      z.object({ kind: z.literal('per_trip'), value: PaiseSchema, tripsPerWorkingDay: z.number().positive() }),
      z.object({ kind: z.literal('per_month'), value: PaiseSchema }),
    ]),
    driverSalaryPerMonth: PaiseSchema.optional(),
    permitsPerYear: PaiseSchema.optional(),
    platformCommission: RateSchema.optional(),
    idleDaysPerMonth: z.number().int().min(0).max(29).optional(),
    fleetSize: z.number().int().min(1).max(1000).optional(),
  }).optional(),
});

/** What the engine needs: a vehicle and its inputs. */
export const CalculationInputSchema = z.object({
  vehicle: VehicleSchema,
  inputs: ScenarioInputsSchema,
}).superRefine((s, ctx) => {
  const fuel = s.vehicle.fuelType;
  const m = s.inputs.usage.mileage;
  // EV buses and trucks run at about 1 km per kWh; cars at 5–12.
  if (fuel === 'ev' && m?.primary !== undefined && (m.primary < 0.5 || m.primary > 15)) {
    ctx.addIssue({ code: 'custom', path: ['inputs', 'usage', 'mileage', 'primary'], message: 'EV efficiency must be 0.5–15 km per kWh' });
  }
  if (fuel !== 'dual_petrol_cng' && m?.secondary !== undefined) {
    ctx.addIssue({ code: 'custom', path: ['inputs', 'usage', 'mileage', 'secondary'], message: 'A second mileage applies only to dual fuel (petrol + CNG)' });
  }
});

export const ScenarioSchema = z.object({
  id: z.string().min(1),
  schemaVersion: z.literal(1),
  name: z.string().max(80),
  vehicle: VehicleSchema,
  inputs: ScenarioInputsSchema,
  defaultsVersion: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ComparisonSchema = z.object({
  id: z.string().min(1),
  schemaVersion: z.literal(1),
  name: z.string().max(80),
  scenarioIds: z.array(z.string()).min(2).max(4),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// ── Defaults pack (SPEC §5.3) ───────────────────────────────────────────────

const sourced = <T extends z.ZodType>(value: T) =>
  z.object({ value, source: z.string().min(1), asOf: IsoDateSchema });

const byCategory = <T extends z.ZodType>(value: T) => z.record(CategorySchema, value);
const byFuel = <T extends z.ZodType>(value: T) => z.record(FuelTypeSchema, value);

const ServiceSpec = z.object({
  cost: PaiseSchema,
  intervalKm: z.number().positive(),
  intervalMonths: z.number().int().positive(),
});

const RoadTaxBandSchema = z.object({
  maxExShowroom: PaiseSchema.nullable(),
  rateByFuel: z.object({
    default: RateSchema,
    petrol: RateSchema.optional(),
    diesel: RateSchema.optional(),
    cng: RateSchema.optional(),
    strong_hybrid: RateSchema.optional(),
    ev: RateSchema.optional(),
    dual_petrol_cng: RateSchema.optional(),
  }),
});

export const DefaultsPackSchema = z.object({
  version: z.string().min(1),
  asOf: IsoDateSchema,
  currency: z.literal('INR'),
  changelog: z.array(z.object({ version: z.string(), date: IsoDateSchema, change: z.string() })),
  fallbackStateCode: z.string(),
  fallbackCityId: z.string(),
  states: z.record(z.string(), z.object({
    name: z.string(),
    roadTax: sourced(z.array(RoadTaxBandSchema).min(1).refine(
      (bands) => bands.at(-1)?.maxExShowroom === null,
      'The last road-tax band must have maxExShowroom = null',
    )),
  })),
  cities: z.record(z.string(), z.object({
    name: z.string(),
    stateCode: z.string(),
    fuelPrices: sourced(z.object({
      petrolPerLitre: PaiseSchema,
      dieselPerLitre: PaiseSchema,
      cngPerKg: PaiseSchema,
      electricityHomePerKwh: PaiseSchema,
      electricityPublicPerKwh: PaiseSchema,
    })),
  })),
  finance: sourced(z.object({
    downPaymentRate: RateSchema,
    annualRate: RateSchema,
    tenureMonths: z.number().int().positive(),
    processingFee: PaiseSchema,
  })),
  usage: sourced(z.object({
    ownershipMonths: z.number().int().positive(),
    kmPerMonth: z.number().nonnegative(),
    fuelInflation: z.number(),
    cngShare: RateSchema,
    evHomeShare: RateSchema,
  })),
  realWorldFactor: sourced(byFuel(RateSchema)),
  typicalMileage: sourced(byFuel(z.object({ primary: z.number().positive(), secondary: z.number().positive().optional() }))),
  /** Overrides typicalMileage for categories far from a car's figures (trucks, buses). */
  typicalMileageByCategory: sourced(z.partialRecord(CategorySchema, z.partialRecord(FuelTypeSchema, z.number().positive()))).optional(),
  insurance: sourced(z.object({
    year1RateByCategory: byCategory(RateSchema),
    renewalDecline: RateSchema,
  })),
  service: sourced(byCategory(z.object({
    default: ServiceSpec,
    petrol: ServiceSpec.optional(),
    diesel: ServiceSpec.optional(),
    cng: ServiceSpec.optional(),
    strong_hybrid: ServiceSpec.optional(),
    ev: ServiceSpec.optional(),
    dual_petrol_cng: ServiceSpec.optional(),
  }))),
  tyres: sourced(byCategory(z.object({ costPerSet: PaiseSchema, lifeKm: z.number().positive() }))),
  battery12v: sourced(z.object({ cost: PaiseSchema, intervalMonths: z.number().int().positive() })),
  other: sourced(z.object({
    repairsBufferPerYearByCategory: byCategory(PaiseSchema),
    parkingTollsCleaningPerMonth: PaiseSchema,
  })),
  depreciation: sourced(byFuel(z.array(RateSchema).min(1))),
  opportunityCost: sourced(z.object({ fdRate: RateSchema })),
  gstInfo: sourced(z.object({ rule: z.string(), ev: RateSchema, small: RateSchema, large: RateSchema })),
  commercial: sourced(z.object({
    idleDaysPerMonth: z.number().int().min(0).max(29),
    permitsPerYearByCategory: z.partialRecord(CategorySchema, PaiseSchema),
  })),
  categoryInference: sourced(z.object({ hatchbackMax: PaiseSchema, compactSuvMax: PaiseSchema })),
}).superRefine((pack, ctx) => {
  if (!pack.states[pack.fallbackStateCode]) {
    ctx.addIssue({ code: 'custom', path: ['fallbackStateCode'], message: `Unknown state ${pack.fallbackStateCode}` });
  }
  if (!pack.cities[pack.fallbackCityId]) {
    ctx.addIssue({ code: 'custom', path: ['fallbackCityId'], message: `Unknown city ${pack.fallbackCityId}` });
  }
  for (const [id, city] of Object.entries(pack.cities)) {
    if (!pack.states[city.stateCode]) {
      ctx.addIssue({ code: 'custom', path: ['cities', id, 'stateCode'], message: `Unknown state ${city.stateCode}` });
    }
  }
});

// ── Inferred types ──────────────────────────────────────────────────────────

export type Paise = number;
export type Rate = number;
export type FuelType = z.infer<typeof FuelTypeSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type UseType = z.infer<typeof UseTypeSchema>;
export type Frequency = z.infer<typeof FrequencySchema>;
export type AmountOrRate = z.infer<typeof AmountOrRateSchema>;
export type Vehicle = z.infer<typeof VehicleSchema>;
export type ScenarioInputs = z.input<typeof ScenarioInputsSchema>;
export type CalculationInput = z.input<typeof CalculationInputSchema>;
export type Scenario = z.infer<typeof ScenarioSchema>;
export type Comparison = z.infer<typeof ComparisonSchema>;
export type DefaultsPack = z.infer<typeof DefaultsPackSchema>;

/** Parsed (defaults applied) inputs, as the engine sees them. */
export type ParsedInputs = z.output<typeof ScenarioInputsSchema>;
