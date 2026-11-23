/**
 * Turns a vehicle + partial inputs into a complete, resolved set of values,
 * recording where each value came from (ENG-02).
 */
import { roundPaise } from './money.ts';
import type { Assumption, EngineWarning, Provenance } from './result.ts';
import type {
  AmountOrRate, Category, DefaultsPack, FuelType, Paise, ParsedInputs, Rate, Vehicle,
} from './schemas.ts';

export type EnergyLabel = 'petrol' | 'diesel' | 'cng' | 'electricity_home' | 'electricity_public';

export interface EnergyPart {
  label: EnergyLabel;
  /** Share of km driven on this part, 0–1. */
  share: Rate;
  /** km per unit after the real-world factor. */
  effectiveMileage: number;
  /** Paise per litre / kg / kWh. */
  price: Paise;
}

export interface ResolvedInputs {
  vehicle: Vehicle;
  stateCode: string;
  cityId: string;
  roadTax: Paise;
  insuranceYear1: Paise;
  accessories: Paise;
  discounts: Paise;
  finance: null | {
    downPayment: AmountOrRate;
    annualRate: Rate;
    tenureMonths: number;
    processingFee: Paise;
  };
  ownershipMonths: number;
  kmPerMonth: number;
  energyParts: EnergyPart[];
  fuelInflation: number;
  service: { cost: Paise; intervalKm: number; intervalMonths: number };
  tyres: { costPerSet: Paise; lifeKm: number };
  battery12v: { cost: Paise; intervalMonths: number };
  insuranceRenewal: { kind: 'decline'; rate: Rate } | { kind: 'fixed'; perYear: Paise };
  parkingTollsCleaningPerMonth: Paise;
  repairsBufferPerYear: Paise;
  custom: { name: string; amount: Paise; frequency: 'once' | 'monthly' | 'yearly' }[];
  resale: Paise;
  opportunityCost: null | { fdRate: Rate };
  /** v1.2 commercial mode; null for personal use. */
  commercial: null | {
    earnings:
      | { kind: 'per_km'; value: Paise }
      | { kind: 'per_trip'; value: Paise; tripsPerWorkingDay: number }
      | { kind: 'per_month'; value: Paise };
    driverSalaryPerMonth: Paise;
    permitsPerYear: Paise;
    platformCommission: Rate;
    idleDaysPerMonth: number;
    fleetSize: number;
  };
  assumptions: Assumption[];
  warnings: EngineWarning[];
}

interface Src { source: string; asOf: string }

/** Default category from price when the user hasn't picked one (IN-02). */
export function inferCategory(exShowroom: Paise, defaults: DefaultsPack): Category {
  const { hatchbackMax, compactSuvMax } = defaults.categoryInference.value;
  if (exShowroom < hatchbackMax) return 'hatchback';
  if (exShowroom <= compactSuvMax) return 'compact_suv';
  return 'suv';
}

/** Road-tax rate for a state, fuel and price (SPEC §4.1). */
export function roadTaxRate(defaults: DefaultsPack, stateCode: string, fuel: FuelType, exShowroom: Paise): Rate {
  const bands = defaults.states[stateCode]!.roadTax.value;
  // The schema guarantees the last band is open-ended, so a band always matches.
  const band = bands.find((b) => b.maxExShowroom === null || exShowroom <= b.maxExShowroom)!;
  return band.rateByFuel[fuel] ?? band.rateByFuel.default;
}

/** Retained fraction of ex-showroom at `months` of age, linear between yearly points (SPEC §4.6). */
export function retainedFraction(curve: number[], months: number): { fraction: number; extrapolated: boolean } {
  const years = months / 12;
  if (years >= curve.length) return { fraction: curve.at(-1)!, extrapolated: years > curve.length };
  const lo = Math.floor(years);
  const from = lo === 0 ? 1 : curve[lo - 1]!;
  const to = curve[lo]!;
  return { fraction: from + (to - from) * (years - lo), extrapolated: false };
}

export function resolveInputs(vehicle: Vehicle, inputs: ParsedInputs, defaults: DefaultsPack): ResolvedInputs {
  const assumptions: Assumption[] = [];
  const warnings: EngineWarning[] = [];

  const note = (path: string, value: Assumption['value'], provenance: Provenance, unit?: string) => {
    assumptions.push(unit === undefined ? { path, value, provenance } : { path, value, unit, provenance });
  };
  /** Use the user's value if given, otherwise the default; record either way. */
  function take<T extends number | string | boolean>(path: string, user: T | undefined, fallback: T, src: Src, unit?: string): T {
    if (user !== undefined) {
      note(path, user, { kind: 'user' }, unit);
      return user;
    }
    note(path, fallback, { kind: 'default', source: src.source, asOf: src.asOf }, unit);
    return fallback;
  }
  const dflt = (s: Src): Provenance => ({ kind: 'default', source: s.source, asOf: s.asOf });

  const { fuelType: fuel, category, exShowroom } = vehicle;
  const packSrc: Src = { source: `defaults pack ${defaults.version}`, asOf: defaults.asOf };

  // ── Location ──────────────────────────────────────────────────────────────
  let cityId: string;
  let cityProv: Provenance;
  if (inputs.cityId !== undefined && defaults.cities[inputs.cityId]) {
    cityId = inputs.cityId;
    cityProv = { kind: 'user' };
  } else {
    if (inputs.cityId !== undefined) {
      warnings.push({ code: 'UNKNOWN_CITY', message: `No defaults for city "${inputs.cityId}"; using ${defaults.cities[defaults.fallbackCityId]!.name}.` });
    }
    const stateKnown = inputs.stateCode !== undefined && defaults.states[inputs.stateCode] !== undefined;
    if (inputs.stateCode !== undefined && !stateKnown) {
      warnings.push({ code: 'UNKNOWN_STATE', message: `No defaults for state "${inputs.stateCode}"; using ${defaults.states[defaults.fallbackStateCode]!.name}.` });
    }
    const inState = stateKnown
      ? Object.entries(defaults.cities).find(([, c]) => c.stateCode === inputs.stateCode)?.[0]
      : undefined;
    if (inState !== undefined) {
      cityId = inState;
      cityProv = { kind: 'derived', from: `first city in ${inputs.stateCode}` };
    } else {
      cityId = defaults.fallbackCityId;
      cityProv = dflt(packSrc);
    }
  }
  const city = defaults.cities[cityId]!;
  const stateCode = city.stateCode;
  note('location.cityId', cityId, cityProv);

  // ── Purchase ──────────────────────────────────────────────────────────────
  const stateRoadTax = defaults.states[stateCode]!.roadTax;
  let roadTax: Paise;
  if (inputs.purchase.roadTax?.kind === 'amount') {
    roadTax = inputs.purchase.roadTax.value;
    note('purchase.roadTax', roadTax, { kind: 'user' }, 'paise');
  } else {
    const rate = take('purchase.roadTax.rate', inputs.purchase.roadTax?.value, roadTaxRate(defaults, stateCode, fuel, exShowroom), stateRoadTax, 'rate');
    roadTax = roundPaise(exShowroom * rate);
  }

  const insSrc = defaults.insurance;
  let insuranceYear1: Paise;
  if (inputs.purchase.insuranceYear1?.kind === 'amount') {
    insuranceYear1 = inputs.purchase.insuranceYear1.value;
    note('purchase.insuranceYear1', insuranceYear1, { kind: 'user' }, 'paise');
  } else {
    const rate = take('purchase.insuranceYear1.rate', inputs.purchase.insuranceYear1?.value, insSrc.value.year1RateByCategory[category], insSrc, 'rate');
    insuranceYear1 = roundPaise(exShowroom * rate);
  }

  const accessories = take('purchase.accessories', inputs.purchase.accessories, 0, packSrc, 'paise');
  const discounts = take('purchase.discounts', inputs.purchase.discounts, 0, packSrc, 'paise');

  // ── Finance ───────────────────────────────────────────────────────────────
  let finance: ResolvedInputs['finance'] = null;
  if (inputs.finance) {
    const f = defaults.finance;
    const dp = inputs.finance.downPayment;
    let downPayment: AmountOrRate;
    if (dp) {
      downPayment = dp;
      note(`finance.downPayment.${dp.kind}`, dp.value, { kind: 'user' }, dp.kind === 'amount' ? 'paise' : 'rate');
    } else {
      downPayment = { kind: 'rate', value: f.value.downPaymentRate };
      note('finance.downPayment.rate', f.value.downPaymentRate, dflt(f), 'rate');
    }
    finance = {
      downPayment,
      annualRate: take('finance.annualRate', inputs.finance.annualRate, f.value.annualRate, f, 'rate'),
      tenureMonths: take('finance.tenureMonths', inputs.finance.tenureMonths, f.value.tenureMonths, f, 'months'),
      processingFee: take('finance.processingFee', inputs.finance.processingFee, f.value.processingFee, f, 'paise'),
    };
  }

  // ── Usage and energy ──────────────────────────────────────────────────────
  const u = inputs.usage;
  const ownershipMonths = u.ownershipMonths;
  const kmPerMonth = u.kmPerMonth;
  note('usage.ownershipMonths', ownershipMonths, { kind: 'user' }, 'months');
  note('usage.kmPerMonth', kmPerMonth, { kind: 'user' }, 'km');

  const usageSrc = defaults.usage;
  const fuelInflation = take('usage.fuelInflation', u.fuelInflation, usageSrc.value.fuelInflation, usageSrc, 'rate');

  const typical = defaults.typicalMileage;
  const isClaimed = u.mileage?.isClaimed ?? true;
  const factor = isClaimed
    ? take('usage.realWorldFactor', u.realWorldFactor, defaults.realWorldFactor.value[fuel], defaults.realWorldFactor, 'rate')
    : 1;
  const primaryMileage = take('usage.mileage.primary', u.mileage?.primary, typical.value[fuel].primary, typical, mileageUnit(fuel));

  const prices = city.fuelPrices;
  const price = (path: string, user: Paise | undefined, fallback: Paise, unit: string) =>
    take(path, user, fallback, prices, unit);

  let energyParts: EnergyPart[];
  if (fuel === 'dual_petrol_cng') {
    const cngShare = take('usage.cngShare', u.cngShare, usageSrc.value.cngShare, usageSrc, 'rate');
    const cngMileage = take('usage.mileage.secondary', u.mileage?.secondary, typical.value.dual_petrol_cng.secondary ?? typical.value.cng.primary, typical, 'km/kg');
    energyParts = [
      { label: 'petrol', share: 1 - cngShare, effectiveMileage: primaryMileage * factor, price: price('usage.fuelPrice.primary', u.fuelPrice?.primary, prices.value.petrolPerLitre, 'paise/litre') },
      { label: 'cng', share: cngShare, effectiveMileage: cngMileage * factor, price: price('usage.fuelPrice.secondary', u.fuelPrice?.secondary, prices.value.cngPerKg, 'paise/kg') },
    ];
  } else if (fuel === 'ev') {
    const home = take('usage.evHomeShare', u.evHomeShare, usageSrc.value.evHomeShare, usageSrc, 'rate');
    const eff = primaryMileage * factor;
    energyParts = [
      { label: 'electricity_home', share: home, effectiveMileage: eff, price: price('usage.fuelPrice.primary', u.fuelPrice?.primary, prices.value.electricityHomePerKwh, 'paise/kWh') },
      { label: 'electricity_public', share: 1 - home, effectiveMileage: eff, price: price('usage.fuelPrice.secondary', u.fuelPrice?.secondary, prices.value.electricityPublicPerKwh, 'paise/kWh') },
    ];
  } else {
    const single = {
      petrol: { label: 'petrol', unitPrice: prices.value.petrolPerLitre, unit: 'paise/litre' },
      strong_hybrid: { label: 'petrol', unitPrice: prices.value.petrolPerLitre, unit: 'paise/litre' },
      diesel: { label: 'diesel', unitPrice: prices.value.dieselPerLitre, unit: 'paise/litre' },
      cng: { label: 'cng', unitPrice: prices.value.cngPerKg, unit: 'paise/kg' },
    } as const satisfies Record<string, { label: EnergyLabel; unitPrice: Paise; unit: string }>;
    const s = single[fuel];
    energyParts = [
      { label: s.label, share: 1, effectiveMileage: primaryMileage * factor, price: price('usage.fuelPrice.primary', u.fuelPrice?.primary, s.unitPrice, s.unit) },
    ];
  }

  // ── Maintenance ───────────────────────────────────────────────────────────
  const m = inputs.maintenance;
  const svcSrc = defaults.service;
  const svcSpec = svcSrc.value[category][fuel] ?? svcSrc.value[category].default;
  const service = {
    cost: take('maintenance.service.cost', m.service?.cost, svcSpec.cost, svcSrc, 'paise'),
    intervalKm: take('maintenance.service.intervalKm', m.service?.intervalKm, svcSpec.intervalKm, svcSrc, 'km'),
    intervalMonths: take('maintenance.service.intervalMonths', m.service?.intervalMonths, svcSpec.intervalMonths, svcSrc, 'months'),
  };

  const tyreSrc = defaults.tyres;
  const tyres = {
    costPerSet: take('maintenance.tyres.costPerSet', m.tyres?.costPerSet, tyreSrc.value[category].costPerSet, tyreSrc, 'paise'),
    lifeKm: take('maintenance.tyres.lifeKm', m.tyres?.lifeKm, tyreSrc.value[category].lifeKm, tyreSrc, 'km'),
  };

  const batSrc = defaults.battery12v;
  const battery12v = {
    cost: take('maintenance.battery12v.cost', m.battery12v?.cost, batSrc.value.cost, batSrc, 'paise'),
    intervalMonths: take('maintenance.battery12v.intervalMonths', m.battery12v?.intervalMonths, batSrc.value.intervalMonths, batSrc, 'months'),
  };

  let insuranceRenewal: ResolvedInputs['insuranceRenewal'];
  if (m.insuranceRenewal?.kind === 'fixed') {
    insuranceRenewal = { kind: 'fixed', perYear: m.insuranceRenewal.perYear };
    note('maintenance.insuranceRenewal.perYear', m.insuranceRenewal.perYear, { kind: 'user' }, 'paise');
  } else {
    insuranceRenewal = {
      kind: 'decline',
      rate: take('maintenance.insuranceRenewal.rate', m.insuranceRenewal?.rate, insSrc.value.renewalDecline, insSrc, 'rate'),
    };
  }

  const otherSrc = defaults.other;
  const parkingTollsCleaningPerMonth = take('maintenance.parkingTollsCleaningPerMonth', m.parkingTollsCleaningPerMonth, otherSrc.value.parkingTollsCleaningPerMonth, otherSrc, 'paise');
  const repairsBufferPerYear = take('maintenance.repairsBufferPerYear', m.repairsBufferPerYear, otherSrc.value.repairsBufferPerYearByCategory[category], otherSrc, 'paise');
  const custom = m.custom ?? [];

  // ── Exit value ────────────────────────────────────────────────────────────
  const r = inputs.exit.resale;
  let resale: Paise;
  if (r?.kind === 'amount') {
    resale = r.value;
    note('exit.resale', r.value, { kind: 'user' }, 'paise');
  } else if (r?.kind === 'rate') {
    resale = roundPaise(exShowroom * r.value);
    note('exit.resale.rate', r.value, { kind: 'user' }, 'rate');
  } else {
    const dep = defaults.depreciation;
    const { fraction, extrapolated } = retainedFraction(dep.value[fuel], ownershipMonths);
    resale = roundPaise(exShowroom * fraction);
    note('exit.resale.rate', fraction, dflt(dep), 'rate');
    if (extrapolated) {
      warnings.push({ code: 'RESALE_EXTRAPOLATED', message: `Resale curve ends at ${dep.value[fuel].length} years; the last value is used beyond that.` });
    }
  }

  // ── Opportunity cost ──────────────────────────────────────────────────────
  let opportunityCost: ResolvedInputs['opportunityCost'] = null;
  if (inputs.opportunityCost?.enabled) {
    const oc = defaults.opportunityCost;
    opportunityCost = { fdRate: take('opportunityCost.fdRate', inputs.opportunityCost.fdRate, oc.value.fdRate, oc, 'rate') };
  }

  // ── Warnings ──────────────────────────────────────────────────────────────
  if (fuel === 'diesel' && stateCode === 'DL' && ownershipMonths > 120) {
    warnings.push({ code: 'DIESEL_NCR_10Y', message: 'Diesel vehicles older than 10 years cannot be driven in Delhi-NCR.' });
  }
  // ── Commercial (SPEC §4.8) ────────────────────────────────────────────────
  let commercial: ResolvedInputs['commercial'] = null;
  if (vehicle.useType === 'commercial') {
    const c = inputs.commercial;
    if (!c) {
      warnings.push({ code: 'COMMERCIAL_NO_EARNINGS', message: 'Add earnings to see profit and payback; only costs are shown.' });
    } else {
      const cs = defaults.commercial;
      note(`commercial.earnings.${c.earnings.kind}`, c.earnings.value, { kind: 'user' }, 'paise');
      commercial = {
        earnings: c.earnings,
        driverSalaryPerMonth: take('commercial.driverSalaryPerMonth', c.driverSalaryPerMonth, 0, packSrc, 'paise'),
        permitsPerYear: take('commercial.permitsPerYear', c.permitsPerYear, cs.value.permitsPerYearByCategory[category] ?? 0, cs, 'paise'),
        platformCommission: take('commercial.platformCommission', c.platformCommission, 0, packSrc, 'rate'),
        idleDaysPerMonth: take('commercial.idleDaysPerMonth', c.idleDaysPerMonth, cs.value.idleDaysPerMonth, cs, 'days'),
        fleetSize: c.fleetSize ?? 1,
      };
    }
  }

  return {
    vehicle, stateCode, cityId,
    roadTax, insuranceYear1, accessories, discounts,
    finance,
    ownershipMonths, kmPerMonth, energyParts, fuelInflation,
    service, tyres, battery12v, insuranceRenewal,
    parkingTollsCleaningPerMonth, repairsBufferPerYear, custom,
    resale, opportunityCost, commercial,
    assumptions, warnings,
  };
}

function mileageUnit(fuel: FuelType): string {
  if (fuel === 'ev') return 'km/kWh';
  if (fuel === 'cng') return 'km/kg';
  return 'km/litre';
}
