import type { Paise } from './schemas.ts';

export type Provenance =
  | { kind: 'user' }
  | { kind: 'default'; source: string; asOf: string }
  | { kind: 'derived'; from: string };

export interface Assumption {
  /** Dotted input path, e.g. 'usage.fuelPrice.primary'. */
  path: string;
  value: number | string | boolean;
  /** e.g. 'paise', 'paise/litre', 'rate', 'km', 'months'. */
  unit?: string;
  provenance: Provenance;
}

export interface EngineWarning {
  code:
    | 'UNKNOWN_CITY'
    | 'UNKNOWN_STATE'
    | 'RESALE_EXTRAPOLATED'
    | 'DIESEL_NCR_10Y'
    | 'COMMERCIAL_NO_EARNINGS';
  message: string;
}

export interface MonthRow {
  m: number;
  km: number;
  emi: Paise;
  interest: Paise;
  principal: Paise;
  loanBalance: Paise;
  energy: Paise;
  service: Paise;
  tyres: Paise;
  insurance: Paise;
  other: Paise;
  /** Commercial: driver salary and permits (0 for personal use). */
  operating: Paise;
  /** Sum of this month's cash costs: emi + energy + service + tyres + insurance + other + operating. */
  total: Paise;
  /** Cash upfront + all totals so far. */
  cumulative: Paise;
  /** Commercial only (0 otherwise): gross earnings, platform commission, earnings − commission − total. */
  earnings: Paise;
  commission: Paise;
  netProfit: Paise;
  cumulativeProfit: Paise;
}

export interface CalculationResult {
  engineVersion: string;
  defaultsVersion: string;
  months: MonthRow[];
  upfront: {
    exShowroom: Paise;
    roadTax: Paise;
    insuranceYear1: Paise;
    accessories: Paise;
    discounts: Paise;
    onRoad: Paise;
    downPayment: Paise;
    loanPrincipal: Paise;
    processingFee: Paise;
    cashUpfront: Paise;
  };
  loan: { emi: Paise; annualRate: number; tenureMonths: number } | null;
  exit: { resale: Paise; loanOutstanding: Paise };
  /** Buckets sum to `tco` exactly (ENG-16). */
  breakdown: {
    /** On-road price excluding year-1 insurance, minus resale. */
    vehicle: Paise;
    /** Loan interest + processing fee. */
    interest: Paise;
    energy: Paise;
    service: Paise;
    tyres: Paise;
    /** Year-1 insurance + renewals. */
    insurance: Paise;
    /** 12V battery, parking/tolls/cleaning, repairs buffer, custom items. */
    other: Paise;
    /** Commercial: driver salary and permits. */
    operating: Paise;
    opportunityCost: Paise;
  };
  tco: Paise;
  costPerMonth: Paise;
  costPerKm: Paise | null;
  totalKm: number;
  ownershipMonths: number;
  depreciation: Paise;
  interestPaid: Paise;
  location: { stateCode: string; cityId: string };
  /** v1.2 commercial ROI (SPEC §4.8); null for personal use or when no earnings were given. */
  commercial: null | {
    earningsTotal: Paise;
    commissionTotal: Paise;
    netProfitTotal: Paise;
    netProfitPerMonth: Paise;
    upfrontInvestment: Paise;
    /** null when upfront investment is 0. */
    roiPercent: number | null;
    /** First month cumulative net profit covers the upfront investment; null if never within N. */
    paybackMonth: number | null;
    fleetSize: number;
    fleet: { tco: Paise; netProfitTotal: Paise; upfrontInvestment: Paise };
  };
  assumptions: Assumption[];
  warnings: EngineWarning[];
}
