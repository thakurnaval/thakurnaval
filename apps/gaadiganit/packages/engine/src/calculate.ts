/**
 * calculate(input, defaults) → CalculationResult (ENG-01).
 * Pure and synchronous: no I/O, no clock, no randomness.
 */
import type { z } from 'zod';
import { amortise, type LoanMonth } from './loan.ts';
import { roundPaise } from './money.ts';
import { resolveInputs } from './resolve.ts';
import type { CalculationResult, MonthRow } from './result.ts';
import { CalculationInputSchema, type CalculationInput, type DefaultsPack, type Paise } from './schemas.ts';

export const ENGINE_VERSION = '0.2.0';

/** Thrown when inputs fail validation. `issues` follows Zod's issue shape. */
export class EngineInputError extends Error {
  readonly issues: { path: PropertyKey[]; message: string }[];
  constructor(issues: { path: PropertyKey[]; message: string }[]) {
    super(issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; '));
    this.name = 'EngineInputError';
    this.issues = issues;
  }
}

export function validateInput(input: unknown): z.ZodSafeParseResult<z.output<typeof CalculationInputSchema>> {
  return CalculationInputSchema.safeParse(input);
}

export function calculate(input: CalculationInput, defaults: DefaultsPack): CalculationResult {
  const parsed = CalculationInputSchema.safeParse(input);
  if (!parsed.success) {
    throw new EngineInputError(parsed.error.issues.map((i) => ({ path: i.path, message: i.message })));
  }
  const { vehicle, inputs } = parsed.data;
  const r = resolveInputs(vehicle, inputs, defaults);
  const N = r.ownershipMonths;

  // ── Upfront (SPEC §4.1) ───────────────────────────────────────────────────
  const onRoad = vehicle.exShowroom + r.roadTax + r.insuranceYear1 + r.accessories - r.discounts;
  if (onRoad <= 0) {
    throw new EngineInputError([{ path: ['inputs', 'purchase', 'discounts'], message: 'Discounts cannot exceed the on-road price' }]);
  }

  let downPayment = onRoad;
  let loanPrincipal = 0;
  let processingFee = 0;
  let loanMonths: LoanMonth[] = [];
  let loan: CalculationResult['loan'] = null;
  if (r.finance) {
    const dp = r.finance.downPayment;
    downPayment = dp.kind === 'amount' ? dp.value : roundPaise(onRoad * dp.value);
    if (downPayment > onRoad) {
      throw new EngineInputError([{ path: ['inputs', 'finance', 'downPayment'], message: 'Down payment cannot exceed the on-road price' }]);
    }
    loanPrincipal = onRoad - downPayment;
    processingFee = r.finance.processingFee;
    const schedule = amortise(loanPrincipal, r.finance.annualRate, r.finance.tenureMonths);
    loanMonths = schedule.months;
    loan = { emi: schedule.emi, annualRate: r.finance.annualRate, tenureMonths: r.finance.tenureMonths };
  }
  const cashUpfront = downPayment + processingFee;

  // ── Month by month ────────────────────────────────────────────────────────
  const months: MonthRow[] = [];
  let cumulative = cashUpfront;
  let cumKm = 0;
  let kmSinceService = 0;
  let monthsSinceService = 0;
  let renewals = 0;
  let cumulativeProfit = 0;
  let paybackMonth: number | null = null;
  const sums = { energy: 0, service: 0, tyres: 0, other: 0, operating: 0, interest: 0, principal: 0, earnings: 0, commission: 0 };
  const com = r.commercial;

  for (let m = 1; m <= N; m++) {
    const km = r.kmPerMonth;
    const prevKm = cumKm;
    cumKm += km;

    // Energy (§4.2): first price step lands in month 13.
    const inflation = (1 + r.fuelInflation) ** Math.floor((m - 1) / 12);
    const energy = roundPaise(
      r.energyParts.reduce((acc, p) => acc + ((km * p.share) / p.effectiveMileage) * p.price * inflation, 0),
    );

    // Service (§4.4): km counter keeps the remainder (services follow the odometer);
    // a time-triggered service resets it.
    kmSinceService += km;
    monthsSinceService += 1;
    let serviceCount = 0;
    if (kmSinceService >= r.service.intervalKm) {
      serviceCount = Math.floor(kmSinceService / r.service.intervalKm);
      kmSinceService -= serviceCount * r.service.intervalKm;
      monthsSinceService = 0;
    } else if (monthsSinceService >= r.service.intervalMonths) {
      serviceCount = 1;
      kmSinceService = 0;
      monthsSinceService = 0;
    }
    const service = serviceCount * r.service.cost;

    // Tyres (§4.4): one set per crossing of a multiple of tyre life.
    const tyreSets = Math.floor(cumKm / r.tyres.lifeKm) - Math.floor(prevKm / r.tyres.lifeKm);
    const tyres = tyreSets * r.tyres.costPerSet;

    // Insurance renewals (§4.5): months 13, 25, …
    let insurance = 0;
    if (m > 1 && (m - 1) % 12 === 0) {
      const policyYear = (m - 1) / 12 + 1;
      insurance = r.insuranceRenewal.kind === 'fixed'
        ? r.insuranceRenewal.perYear
        : roundPaise(r.insuranceYear1 * (1 - r.insuranceRenewal.rate) ** (policyYear - 1));
    }
    renewals += insurance;

    // Other (§4.7): monthly running costs, yearly items in months 12, 24, …
    const yearEnd = m % 12 === 0;
    let other = r.parkingTollsCleaningPerMonth;
    if (yearEnd) other += r.repairsBufferPerYear;
    if (m % r.battery12v.intervalMonths === 0) other += r.battery12v.cost;
    for (const c of r.custom) {
      if (c.frequency === 'monthly' || (c.frequency === 'once' && m === 1) || (c.frequency === 'yearly' && yearEnd)) {
        other += c.amount;
      }
    }

    // Commercial (§4.8): driver monthly, permits yearly in months 1, 13, …
    let operating = 0;
    let earnings = 0;
    let commission = 0;
    if (com) {
      operating = com.driverSalaryPerMonth + ((m - 1) % 12 === 0 ? com.permitsPerYear : 0);
      const workingDays = 30 - com.idleDaysPerMonth;
      const e = com.earnings;
      earnings = e.kind === 'per_km'
        ? roundPaise(e.value * km)
        : e.kind === 'per_trip'
          ? roundPaise(e.value * e.tripsPerWorkingDay * workingDays)
          : e.value;
      commission = roundPaise(earnings * com.platformCommission);
    }

    const lm = loanMonths[m - 1];
    const emiPaid = lm?.payment ?? 0;
    const total = emiPaid + energy + service + tyres + insurance + other + operating;
    cumulative += total;
    const netProfit = earnings - commission - total;
    cumulativeProfit += netProfit;
    if (com && paybackMonth === null && cumulativeProfit >= cashUpfront) paybackMonth = m;

    sums.energy += energy;
    sums.service += service;
    sums.tyres += tyres;
    sums.other += other;
    sums.operating += operating;
    sums.earnings += earnings;
    sums.commission += commission;
    sums.interest += lm?.interest ?? 0;
    sums.principal += lm?.principal ?? 0;

    months.push({
      m, km,
      emi: emiPaid,
      interest: lm?.interest ?? 0,
      principal: lm?.principal ?? 0,
      loanBalance: lm?.balance ?? 0,
      energy, service, tyres, insurance, other, operating,
      total, cumulative,
      earnings, commission, netProfit,
      cumulativeProfit: com ? cumulativeProfit : 0,
    });
  }

  // ── Exit and totals (§4.7) ────────────────────────────────────────────────
  const loanOutstanding = loanPrincipal - sums.principal;
  const opportunityCost = r.opportunityCost
    ? roundPaise(cashUpfront * ((1 + r.opportunityCost.fdRate / 12) ** N - 1))
    : 0;

  const tco = cumulative + loanOutstanding - r.resale + opportunityCost;

  const breakdown = {
    vehicle: onRoad - r.insuranceYear1 - r.resale,
    interest: sums.interest + processingFee,
    energy: sums.energy,
    service: sums.service,
    tyres: sums.tyres,
    insurance: r.insuranceYear1 + renewals,
    other: sums.other,
    operating: sums.operating,
    opportunityCost,
  };

  let commercial: CalculationResult['commercial'] = null;
  if (com) {
    const upfrontInvestment = cashUpfront;
    const netProfitTotal = cumulativeProfit;
    const n = com.fleetSize;
    commercial = {
      earningsTotal: sums.earnings,
      commissionTotal: sums.commission,
      netProfitTotal,
      netProfitPerMonth: roundPaise(netProfitTotal / N),
      upfrontInvestment,
      roiPercent: upfrontInvestment > 0
        ? ((netProfitTotal + r.resale - loanOutstanding - upfrontInvestment) / upfrontInvestment) * 100
        : null,
      paybackMonth,
      fleetSize: n,
      fleet: { tco: tco * n, netProfitTotal: netProfitTotal * n, upfrontInvestment: upfrontInvestment * n },
    };
  }

  const totalKm = cumKm;
  return {
    engineVersion: ENGINE_VERSION,
    defaultsVersion: defaults.version,
    months,
    upfront: {
      exShowroom: vehicle.exShowroom,
      roadTax: r.roadTax,
      insuranceYear1: r.insuranceYear1,
      accessories: r.accessories,
      discounts: r.discounts,
      onRoad,
      downPayment,
      loanPrincipal,
      processingFee,
      cashUpfront,
    },
    loan,
    exit: { resale: r.resale, loanOutstanding },
    breakdown,
    tco,
    costPerMonth: roundPaise(tco / N),
    costPerKm: totalKm > 0 ? roundPaise(tco / totalKm) : null,
    totalKm,
    ownershipMonths: N,
    depreciation: onRoad - r.resale,
    interestPaid: sums.interest,
    location: { stateCode: r.stateCode, cityId: r.cityId },
    commercial,
    assumptions: r.assumptions,
    warnings: r.warnings,
  };
}

/** Sum of breakdown buckets; equals `tco` by construction (ENG-16). */
export function breakdownTotal(b: CalculationResult['breakdown']): Paise {
  return b.vehicle + b.interest + b.energy + b.service + b.tyres + b.insurance + b.other + b.operating + b.opportunityCost;
}
