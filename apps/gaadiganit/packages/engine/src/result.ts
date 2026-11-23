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
    | 'COMMERCIAL_NOT_SUPPORTED';
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
  /** Sum of this month's cash lines: emi + energy + service + tyres + insurance + other. */
  total: Paise;
  /** Cash upfront + all totals so far. */
  cumulative: Paise;
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
  assumptions: Assumption[];
  warnings: EngineWarning[];
}
