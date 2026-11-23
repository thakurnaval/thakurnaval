# GaadiGanit — Detailed Spec

- **Status:** v0.2, 2026-11-23. Open questions answered (§10).
- **Source:** [INTENT.md](INTENT.md). This spec adds detailed requirements, acceptance criteria, types and defaults on top of it. Where they differ, the spec wins, and the difference is listed in [§9 Changes to the intent](#9-changes-to-the-intent).
- **Scope:** It covers every phase so the data model doesn't need reworking later, but the **v1 MVP** is the build target. Each requirement is tagged **[v1]**, **[v1.1]**, **[v1.2]** or **[later]**.

Requirement IDs (`ENG-03`, `UI-12`, …) are used in tests and PRs. "Must" means required for its phase.

---

## 1. Product summary

GaadiGanit works out the **total cost of ownership (TCO)** of a vehicle in India over an ownership period. It reports the result as **₹ per month** and **₹ per km**. Later phases add comparison across vehicles and **ROI and payback** for commercial use. It is an offline-first PWA at `gg.nthakur.com` with no login.

### v1 MVP in one line

A single vehicle (personal use), quick estimate plus detailed editor, a result screen with cost breakdown and cumulative chart, scenarios saved on the device, Indian number formatting, and English and Hindi.

---

## 2. Glossary

| Term | Meaning |
| --- | --- |
| Ex-showroom | Dealer list price including GST, before road tax and insurance |
| On-road | Ex-showroom + road tax/registration + year-1 insurance + accessories − discounts |
| N | Ownership period in months |
| m | Month index, 1…N |
| Paise | ₹1 = 100 paise. All engine money is an integer number of paise |
| Rate | A decimal fraction in the engine (`0.09` = 9%). The UI shows percent |
| Claimed mileage | ARAI/MIDC figure from the brochure |
| Real-world factor | Multiplier on claimed mileage (default 0.75 for ICE) |
| IDV | Insured Declared Value; drives insurance renewal decline |
| Defaults pack | Versioned JSON of Indian default values ([../defaults/india.json](../defaults/india.json)) |
| Provenance | Where a resolved value came from: `user`, `default` (with source + as-of) or `derived` |

---

## 3. Functional requirements

### 3.1 Vehicle and scenario input

| ID | Phase | Requirement | Acceptance criteria |
| --- | --- | --- | --- |
| IN-01 | v1 | Quick estimate takes exactly 5 fields: model (free text), fuel type, ex-showroom price, km per month, ownership months | With only these 5 fields filled, a full result shows on the same screen. No other field is required |
| IN-02 | v1 | Quick estimate infers category | Category defaults to `hatchback` under ₹8 lakh, `compact_suv` from ₹8–15 lakh and `suv` above that. The user can change it in the detailed editor. The inferred value shows with provenance `derived` |
| IN-03 | v1 | Detailed editor has sections Vehicle, Purchase, Finance, Usage, Maintenance, Resale (plus Commercial in v1.2) | Each section collapses and shows its subtotal in ₹ for the ownership period while collapsed. Switching sections keeps entered values |
| IN-04 | v1 | Every optional field shows its default as a placeholder, with a "based on" note | Hovering or tapping the info icon shows the source and as-of date from the defaults pack. Clearing a field returns it to the default |
| IN-05 | v1 | Money inputs accept Indian formats | `1250000`, `12,50,000`, `12.5 lakh`, `12.5L`, `1.25 cr` all parse to ₹12,50,000. The field shows `₹12,50,000` on blur |
| IN-06 | v1 | Fields with a `₹ or %` choice (road tax, down payment, resale) have a unit toggle | Switching the unit converts the current value and doesn't lose it |
| IN-07 | v1 | Distance can be entered per month or as per day × days per month | Both produce `kmPerMonth`. The per-day form defaults to 30 days/month for personal use |
| IN-08 | v1 | City/state picker sets road-tax and fuel-price defaults | Changing city updates every value still on its default. User-overridden values stay as they are |
| IN-09 | v1 | Mileage can be entered as claimed or real-world | A toggle sets whether the real-world factor applies. Default is claimed (factor applies) |
| IN-10 | v1 | Dual fuel (petrol + CNG) asks for both mileages and the % of km on CNG | Default 80% on CNG. Hidden for other fuel types |
| IN-11 | v1 | EV asks for the home vs public charging split | Default 80% home. Hidden for non-EV |
| IN-12 | v1 | Custom line items: name, amount, frequency (`once`, `monthly`, `yearly`) | Up to 20 items. Each shows in the breakdown under its own name |
| IN-13 | v1 | Validation rejects impossible values with a clear message, in place | See §5.4 for ranges. The result keeps showing the last valid calculation while a field is invalid |
| IN-14 | v1.2 | Commercial section: earnings (per km / per trip / per month), driver salary, permits/fitness/commercial insurance, platform commission %, idle days | Shown only when use type = commercial |
| IN-15 | v1.2 | Fleet of N identical vehicles | Totals scale by N. Per-vehicle figures stay per vehicle |

### 3.2 Calculation engine

| ID | Phase | Requirement | Acceptance criteria |
| --- | --- | --- | --- |
| ENG-01 | v1 | `calculate(scenario, defaults) → CalculationResult` is pure and synchronous | Same input gives deeply equal output. No I/O, no `Date.now()`, no randomness. The package imports nothing from UI code |
| ENG-02 | v1 | Resolve inputs before calculating | `resolveInputs(scenario, defaults)` returns every value the engine uses, each with provenance. `result.assumptions` lists them |
| ENG-03 | v1 | Integer paise throughout | Every `Paise` field in the result is a safe integer. Rounding is half-away-from-zero at each monthly line item (see §4.7) |
| ENG-04 | v1 | Month-by-month schedule | `result.months` has N rows. Each row has every cost line, its cumulative total and loan balance. Its totals equal the summary totals exactly (to the paisa) |
| ENG-05 | v1 | Upfront cost per §4.1 | Unit tests cover discounts larger than accessories, zero road tax (EV-exempt states) and a % vs ₹ road tax override |
| ENG-06 | v1 | Energy cost per §4.2, including dual fuel and EV split | Tests: petrol, diesel, CNG, strong hybrid, EV (home/public split), dual fuel. Inflation steps up at months 13, 25, … |
| ENG-07 | v1 | EMI and amortisation per §4.3 | EMI matches the standard formula within ₹1. The sum of principal parts equals the loan amount exactly. A zero interest rate gives principal ÷ n |
| ENG-08 | v1 | Loan tenure longer than ownership | The outstanding balance at month N is added as a lump sum (it is paid off at sale). Test: 84-month loan, 60-month ownership |
| ENG-09 | v1 | Loan tenure shorter than ownership | EMI stops after the tenure. Later months show zero EMI |
| ENG-10 | v1 | Service events per §4.4 (whichever of km or months comes first) | Test: 10,000 km / 12 months interval at 1,500 km/month gives services at months 7, 14, 20, … |
| ENG-11 | v1 | Tyre replacement per §4.4 | A replacement is charged in the month cumulative km crosses each multiple of tyre life. No charge at exit for partial wear |
| ENG-12 | v1 | Insurance renewals per §4.5 | Year 1 is in on-road. Renewals fall at months 13, 25, … and decline yearly by the decline rate |
| ENG-13 | v1 | Resale per §4.6 | Resale at month N is interpolated linearly between yearly curve points. A user ₹ or % override wins |
| ENG-14 | v1 | Derived metrics: cost/month, cost/km, depreciation, interest paid | Cost per km is `null` (shown as "—") when total km = 0 |
| ENG-15 | v1 | Opportunity cost (optional, off by default) | When on, interest lost on the upfront cash at the FD rate, compounded monthly, shows as its own line and is included in TCO |
| ENG-16 | v1 | Cost breakdown buckets | `result.breakdown` has: vehicle (on-road − year-1 insurance − resale), interest (loan interest + processing fee), energy, service, tyres, insurance (year 1 + renewals), other (12V battery, parking/tolls, repairs buffer, custom), opportunity cost. Buckets sum to TCO exactly |
| ENG-17 | v1.1 | `compare(scenarios[], defaults) → ComparisonResult` | Winner per metric. Ties are reported as ties |
| ENG-18 | v1.1 | Break-even km/month between two scenarios | Bisection over 0–20,000 km/month to ±1 km. Returns `null` with a reason when the two TCO curves don't cross in range |
| ENG-19 | v1.1 | Break-even month | The first month the cumulative cost order flips. `null` if it never flips |
| ENG-20 | v1.1 | Sensitivity ±20% on fuel price, km/month and resale | Returns TCO at −20%, 0, +20% for each driver |
| ENG-21 | v1.2 | Commercial ROI and payback per §4.8 | Payback month is `null` when never reached within N. ROI % is `null` when upfront investment is 0 |
| ENG-22 | v1 | Engine coverage | 100% line and branch coverage (Vitest). The 3 worked examples (§8) pass as fixtures |

### 3.3 Screens and output

| ID | Phase | Requirement | Acceptance criteria |
| --- | --- | --- | --- |
| UI-01 | v1 | Home lists saved scenarios (and comparisons in v1.1), newest first, with a "New calculation" button | Empty state explains the app in one sentence and opens quick estimate |
| UI-02 | v1 | The result headline reads like "This car costs you ₹18,400 a month, or ₹18.4 per km, over 5 years." | Per-month is rounded to ₹100 and per-km to ₹0.1. The period is in years when N is a multiple of 12, otherwise in months. Translated in Hindi |
| UI-03 | v1 | Breakdown chart: where the money goes | A horizontal bar per bucket from ENG-16. Resale shows as a negative bar. Values and % of TCO label each bar |
| UI-04 | v1 | Cumulative cost chart over months | One line, with the upfront step at month 0. Hover/tap shows month and ₹ |
| UI-05 | v1 | Key assumptions list | Shows every value with provenance `default` or `derived`, each with source and as-of. Tapping one jumps to its field |
| UI-06 | v1 | Live recalculation | The result updates within 100 ms of an input change on a mid-range Android phone (Moto G-class), debounced 150 ms while typing |
| UI-07 | v1 | Indian number formatting everywhere | `₹12,34,567`. Amounts of ₹1 lakh or more may show as `₹12.3 lakh` in headlines and charts; tables show full digits |
| UI-08 | v1 | Settings: language (English / हिन्दी), default city, defaults pack version (read-only) | Language switch applies without reload and is remembered |
| UI-09 | v1 | Mobile first | Usable from 360 px wide. Inputs are at least 44 px tall. No horizontal scroll |
| UI-10 | v1.1 | Compare 2–4 scenarios side by side | Winner per metric is highlighted. A cumulative chart has one line per scenario with crossover points marked |
| UI-11 | v1.1 | What-if sliders: km/month, fuel price, ownership months, resale % | Sliders don't change the saved scenario unless the user taps "Save as new" |
| UI-12 | v1.2 | Commercial result: monthly net profit, ROI %, payback month, cumulative profit chart with payback marked | Shown instead of the personal headline when use type = commercial |

### 3.4 Persistence, sharing and export

| ID | Phase | Requirement | Acceptance criteria |
| --- | --- | --- | --- |
| DATA-01 | v1 | Scenarios saved on the device in IndexedDB | Survive reload and going offline. Autosave 1 s after the last edit |
| DATA-02 | v1 | Each saved scenario records the defaults pack version it was calculated with | When a newer pack ships, the scenario shows "Defaults updated, recalculate?" and does not recalculate silently |
| DATA-03 | v1 | Delete and duplicate a scenario | Delete asks for confirmation. Duplicate opens the copy |
| DATA-04 | v1 | Schema versioning | Stored records carry `schemaVersion`. Migrations run on load and are unit-tested |
| SHR-01 | v1.1 | One-page PDF summary | Generated on the device. Includes headline, breakdown, chart and assumptions. Under 500 KB |
| SHR-02 | v1.1 | Share link | The scenario is encoded in the URL fragment (`#s=…`, compressed), so no server is needed. Opening it loads a read-only copy with "Save to my device" |
| SHR-03 | v1.1 | WhatsApp card image | 1080 × 1080 PNG with the headline numbers, shared through the Web Share API, falling back to download |
| SHR-04 | v1.1 | CSV export | Inputs and the monthly schedule. Amounts in rupees with 2 decimals, UTF-8 with BOM so Excel shows ₹ correctly |

### 3.5 Non-functional

| ID | Phase | Requirement | Acceptance criteria |
| --- | --- | --- | --- |
| NFR-01 | v1 | Offline-first PWA | After the first visit, the app loads and calculates with the network off. Installable (manifest + service worker) |
| NFR-02 | v1 | Performance | Lighthouse mobile performance ≥ 90. Initial JS ≤ 200 KB gzip. Charts lazy-loaded |
| NFR-03 | v1 | Accessibility | WCAG 2.2 AA. Every chart has a table alternative. Fully usable by keyboard |
| NFR-04 | v1 | i18n | All UI strings in message catalogues (English, Hindi). No string concatenation for sentences. Numbers and currency formatted with `Intl` using `en-IN` / `hi-IN`. Structure ready for ta, te, mr, bn |
| NFR-05 | v1 | Privacy | No account and no personal data leaves the device. No analytics or tracking scripts in v1 (D5) |
| NFR-06 | v1 | Browser support | Last 2 versions of Chrome Android, Samsung Internet, Safari iOS, and desktop Chrome, Edge and Firefox |
| NFR-07 | v1 | Defaults are data | No fuel price, tax rate, GST slab or curve is hard-coded in engine or UI code. CI fails if `defaults/india.json` doesn't validate against its Zod schema |
| NFR-08 | later | Two-wheelers | Adding `scooter`/`motorcycle` categories needs only new enum values and defaults, with no engine change |

---

## 4. Calculation rules

Notation: all money in paise, all rates as decimal fractions, m = 1…N.

### 4.1 Upfront

```
RoadTax      = override ₹, or (override % or state default % for fuel type and price band) × ExShowroom
Insurance1   = override ₹, or category default rate × ExShowroom
OnRoad       = ExShowroom + RoadTax + Insurance1 + Accessories − Discounts
CashUpfront  = OnRoad − LoanPrincipal + ProcessingFee      (cash purchase: LoanPrincipal = 0)
LoanPrincipal = OnRoad − DownPayment                       (default: 80% of on-road, D1)
```

`OnRoad` is never below `ExShowroom − Discounts`. Discounts larger than everything else are a validation error.

### 4.2 Energy

For each fuel part p (one part for single-fuel vehicles; two for dual fuel and for EV home/public):

```
EffectiveMileage_p = Mileage_p × (RealWorldFactor_p if mileage is claimed, else 1)
Energy_m = Σ_p  (km_m × share_p ÷ EffectiveMileage_p) × Price_p × (1 + i)^floor((m − 1) / 12)
```

- Dual fuel: shares are CNG % and 1 − CNG %, with CNG and petrol mileage and prices.
- EV: a single mileage (km/kWh) and two prices (home and public tariffs) split by the home %.
- Strong hybrid: petrol, with its own real-world factor.
- `floor((m − 1) / 12)` makes months 1–12 use the base price, and the first increase lands at month 13.

### 4.3 Loan

```
r = annual rate ÷ 12,  n = tenure months
EMI = P × r(1+r)^n / ((1+r)^n − 1)         (r = 0 → P ÷ n)
```

- The EMI is rounded to paise. The last instalment absorbs the rounding remainder so principal parts sum to P exactly.
- Each month splits into interest (`balance × r`, rounded) and principal (`EMI − interest`).
- If n > N, `LoanOutstanding_N` (balance after month N) is paid at exit and counts as principal.

### 4.4 Service and tyres

- **Service:** a service falls due in month m when km since the last service ≥ interval km, **or** months since the last service ≥ interval months. A km-triggered service keeps the km remainder, so services follow the odometer (10,000, 20,000, 30,000 km…). A time-triggered service resets the km counter. Either one resets the month counter. If a month covers several intervals, several services are charged. EV and hybrid use their own service cost and interval.
- **Tyres:** a new set is charged in the month cumulative km first reaches k × tyre life (k = 1, 2, …). Several crossings in one month charge several sets.
- **12V battery:** charged every `batteryIntervalMonths`. EV traction-battery cost is **not modelled in v1** (D4) and is left for a later phase.

### 4.5 Insurance renewals

```
Renewal_y = Insurance1 × (1 − decline)^(y − 1)    for policy year y = 2, 3, …
```

It is charged in month 12(y − 1) + 1, that is months 13, 25, 37, …. A user can instead enter a fixed ₹ per year.

### 4.6 Resale and depreciation

```
Resale_N = ExShowroom × RetainedFraction(ageYears = N / 12, fuelType)
```

`RetainedFraction` interpolates linearly between the yearly points in the defaults pack. Age 0 = 1.0. Beyond the last point it extrapolates flat at the last value. A user ₹ or % override replaces it.

`Depreciation = OnRoad − Resale_N` (shown as information; it isn't a separate TCO line).

### 4.7 TCO and derived metrics

```
TCO = CashUpfront
    + Σ_m (EMI_m + Energy_m + Service_m + Tyres_m + InsuranceRenewal_m + Other_m)
    + LoanOutstanding_N
    − Resale_N
    + OpportunityCost        (only when enabled)

OpportunityCost = CashUpfront × ((1 + fdRate/12)^N − 1)

CostPerMonth = TCO ÷ N
CostPerKm    = TCO ÷ (Σ_m km_m)        (null if 0 km)
InterestPaid = Σ_m interest_m
```

`Other_m` = parking/tolls/cleaning (monthly) + repairs buffer (yearly, charged in months 12, 24, …) + custom items (once at month 1, monthly, or yearly at months 12, 24, …).

Rounding: each line item in each month is rounded to whole paise when computed. Sums are integer additions. Ratios (`CostPerMonth`, `CostPerKm`) are rounded to whole paise at the end.

### 4.8 Commercial ROI [v1.2]

```
WorkingDays_m   = 30 − IdleDays
km_m            = kmPerWorkingDay × WorkingDays_m         (or kmPerMonth if entered directly)
Earnings_m      = per km × km_m  |  per trip × trips_m  |  fixed per month
NetProfit_m     = Earnings_m − Commission% × Earnings_m − Driver_m − RunningCost_m − EMI_m − Permits_m
UpfrontInvest   = CashUpfront
ROI%            = (Σ NetProfit_m + Resale_N − LoanOutstanding_N − UpfrontInvest) ÷ UpfrontInvest × 100
PaybackMonth    = min m such that Σ_{k≤m} NetProfit_k ≥ UpfrontInvest
```

`RunningCost_m` = energy + service + tyres + insurance renewal + other for that month. Permits are charged yearly at months 1, 13, 25, ….

### 4.9 Break-even [v1.1]

- **Break-even km/month:** find k in [0, 20000] where `TCO_A(k) − TCO_B(k)` changes sign, by bisection to ±1 km, with all other inputs fixed. The function is nearly linear in k; discrete tyre and service steps can add small kinks, so the search scans 100 km steps first and then bisects the first sign change.
- **Break-even month:** the first m where the order of the two cumulative-cost series flips.

---

## 5. Types

These types go in the engine package (`packages/engine/src/types.ts`). Zod schemas mirror them one to one, and the TypeScript types are inferred from the schemas (`z.infer`) so the two can't drift.

### 5.1 Primitives and enums

```ts
/** Integer number of paise. ₹1 = 100. */
export type Paise = number;
/** Decimal fraction: 0.09 = 9%. */
export type Rate = number;
/** ISO date, YYYY-MM-DD. */
export type IsoDate = string;

export type FuelType = 'petrol' | 'diesel' | 'cng' | 'strong_hybrid' | 'ev' | 'dual_petrol_cng';
export type Category =
  | 'hatchback' | 'sedan' | 'compact_suv' | 'suv' | 'mpv'
  | 'pickup' | 'van' | 'mini_truck' | 'bus';
export type UseType = 'personal' | 'commercial';
export type Frequency = 'once' | 'monthly' | 'yearly';

/** Either an absolute amount or a rate of a base the field defines. */
export type AmountOrRate =
  | { kind: 'amount'; value: Paise }
  | { kind: 'rate'; value: Rate };
```

### 5.2 Stored entities

```ts
export interface Vehicle {
  id: string;                 // uuid
  nickname?: string;
  make: string;
  model: string;
  variant?: string;
  category: Category;
  fuelType: FuelType;
  useType: UseType;
  exShowroom: Paise;
}

/** Everything optional falls back to the defaults pack. */
export interface ScenarioInputs {
  stateCode?: string;                 // 'DL', 'MH', 'KA', …
  cityId?: string;                    // 'delhi', 'mumbai', …

  purchase: {
    roadTax?: AmountOrRate;           // rate of ex-showroom
    insuranceYear1?: AmountOrRate;    // rate of ex-showroom
    accessories?: Paise;              // incl. extended warranty, FASTag, handling
    discounts?: Paise;
  };

  finance?: {                         // absent = cash purchase
    downPayment?: AmountOrRate;       // rate of on-road; default 20%, so the loan is 80% of on-road (D1)
    annualRate?: Rate;
    tenureMonths?: number;
    processingFee?: Paise;
  };

  usage: {
    ownershipMonths: number;
    kmPerMonth: number;
    mileage?: { primary?: number; secondary?: number; isClaimed?: boolean };
    fuelPrice?: { primary?: Paise; secondary?: Paise };   // per litre / kg / kWh
    fuelInflation?: Rate;             // per year
    cngShare?: Rate;                  // dual fuel only
    evHomeShare?: Rate;               // EV only: secondary price = public charging
  };

  maintenance: {
    service?: { cost?: Paise; intervalKm?: number; intervalMonths?: number };
    tyres?: { costPerSet?: Paise; lifeKm?: number };
    battery12v?: { cost?: Paise; intervalMonths?: number };
    insuranceRenewal?: { kind: 'decline'; rate?: Rate } | { kind: 'fixed'; perYear: Paise };
    parkingTollsCleaningPerMonth?: Paise;
    repairsBufferPerYear?: Paise;
    custom?: { name: string; amount: Paise; frequency: Frequency }[];
  };

  exit: {
    resale?: AmountOrRate;            // rate of ex-showroom
  };

  opportunityCost?: { enabled: boolean; fdRate?: Rate };

  commercial?: {                      // v1.2
    earnings: { kind: 'per_km'; value: Paise }
            | { kind: 'per_trip'; value: Paise; tripsPerWorkingDay: number }
            | { kind: 'per_month'; value: Paise };
    driverSalaryPerMonth?: Paise;
    permitsPerYear?: Paise;
    platformCommission?: Rate;
    idleDaysPerMonth?: number;
    fleetSize?: number;
  };
}

export interface Scenario {
  id: string;
  schemaVersion: 1;
  name: string;
  vehicle: Vehicle;                   // a snapshot, so a scenario is self-contained
  inputs: ScenarioInputs;
  defaultsVersion: string;            // pack version used for the last calculation
  createdAt: string;                  // ISO timestamp, set by the app, not the engine
  updatedAt: string;
}

export interface Comparison {         // v1.1
  id: string;
  schemaVersion: 1;
  name: string;
  scenarioIds: [string, string] | [string, string, string] | [string, string, string, string];
  createdAt: string;
  updatedAt: string;
}
```

### 5.3 Defaults pack

```ts
export interface Sourced<T> {
  value: T;
  source: string;        // human-readable source or URL; 'PLACEHOLDER' until verified
  asOf: IsoDate;
}

export interface RoadTaxBand {
  maxExShowroom: Paise | null;        // null = no upper limit
  rateByFuel: Partial<Record<FuelType, Rate>> & { default: Rate };
}

export interface DefaultsPack {
  version: string;                    // semver of the data, e.g. '2026.11.0'
  asOf: IsoDate;
  currency: 'INR';
  changelog: { version: string; date: IsoDate; change: string }[];
  // Keys starting with '_' ('_notes', '_note') are comments for editors; the schema strips them.
  states: Record<string, { name: string; roadTax: Sourced<RoadTaxBand[]> }>;
  cities: Record<string, {
    name: string;
    stateCode: string;
    fuelPrices: Sourced<{
      petrolPerLitre: Paise;
      dieselPerLitre: Paise;
      cngPerKg: Paise;
      electricityHomePerKwh: Paise;
      electricityPublicPerKwh: Paise;
    }>;
  }>;
  fallbackStateCode: string;
  fallbackCityId: string;
  finance: Sourced<{ downPaymentRate: Rate; annualRate: Rate; tenureMonths: number; processingFee: Paise }>;
  usage: Sourced<{ ownershipMonths: number; kmPerMonth: number; fuelInflation: Rate; cngShare: Rate; evHomeShare: Rate }>;
  realWorldFactor: Sourced<Record<FuelType, Rate>>;
  typicalMileage: Sourced<Record<FuelType, { primary: number; secondary?: number }>>;  // claimed; used when the user gives none
  insurance: Sourced<{ year1RateByCategory: Record<Category, Rate>; renewalDecline: Rate }>;
  service: Sourced<Record<Category, Partial<Record<FuelType, { cost: Paise; intervalKm: number; intervalMonths: number }>> & {
    default: { cost: Paise; intervalKm: number; intervalMonths: number };
  }>>;
  tyres: Sourced<Record<Category, { costPerSet: Paise; lifeKm: number }>>;
  battery12v: Sourced<{ cost: Paise; intervalMonths: number }>;
  other: Sourced<{ repairsBufferPerYearByCategory: Record<Category, Paise>; parkingTollsCleaningPerMonth: Paise }>;
  depreciation: Sourced<Record<FuelType, number[]>>;   // retained fraction at end of year 1, 2, …
  opportunityCost: Sourced<{ fdRate: Rate }>;
  gstInfo: Sourced<{ rule: string; ev: Rate; small: Rate; large: Rate }>;  // shown only, never used in maths
  commercial: Sourced<{ idleDaysPerMonth: number; permitsPerYearByCategory: Partial<Record<Category, Paise>> }>;
  categoryInference: Sourced<{ hatchbackMax: Paise; compactSuvMax: Paise }>;
}
```

### 5.4 Validation ranges

| Field | Allowed |
| --- | --- |
| Ex-showroom | ₹1 lakh – ₹5 crore |
| Ownership months | 1 – 240 |
| km per month | 0 – 20,000 |
| Mileage | 1 – 60 km/l · 1 – 60 km/kg · 2 – 15 km/kWh |
| Fuel price | ₹1 – ₹500 per unit |
| Rates (tax, insurance, down payment, commission, shares, resale) | 0 – 100% |
| Loan rate | 0 – 30% p.a. |
| Loan tenure | 1 – 120 months |
| Fuel inflation | −10% – 20% per year |
| Service / tyre interval | > 0 |
| Idle days | 0 – 29 |

### 5.5 Result

```ts
export type Provenance =
  | { kind: 'user' }
  | { kind: 'default'; source: string; asOf: IsoDate }
  | { kind: 'derived'; from: string };   // e.g. 'category inferred from price'

export interface Assumption {
  path: string;          // 'usage.fuelPrice.primary'
  value: number | string | boolean;
  unit?: string;         // 'paise/litre', 'rate', 'km'
  provenance: Provenance;
}

export interface MonthRow {
  m: number;
  km: number;
  emi: Paise; interest: Paise; principal: Paise; loanBalance: Paise;
  energy: Paise; service: Paise; tyres: Paise; insurance: Paise; other: Paise;
  total: Paise;          // sum of the cash lines this month
  cumulative: Paise;     // CashUpfront + Σ totals so far
  earnings?: Paise; netProfit?: Paise; cumulativeProfit?: Paise;   // commercial
}

export interface CalculationResult {
  engineVersion: string;
  defaultsVersion: string;
  months: MonthRow[];
  upfront: { exShowroom: Paise; roadTax: Paise; insuranceYear1: Paise; accessories: Paise;
             discounts: Paise; onRoad: Paise; loanPrincipal: Paise; processingFee: Paise; cashUpfront: Paise };
  exit: { resale: Paise; loanOutstanding: Paise };
  breakdown: { vehicle: Paise; interest: Paise; energy: Paise; service: Paise; tyres: Paise;
               insurance: Paise; other: Paise; opportunityCost: Paise };
  tco: Paise;
  costPerMonth: Paise;
  costPerKm: Paise | null;
  totalKm: number;
  depreciation: Paise;
  interestPaid: Paise;
  commercial?: { netProfitTotal: Paise; roiPercent: number | null; paybackMonth: number | null };
  assumptions: Assumption[];
  warnings: { code: string; message: string }[];   // e.g. 'DIESEL_NCR_10Y', 'RESALE_EXTRAPOLATED'
}

export interface ComparisonResult {   // v1.1
  results: CalculationResult[];
  winners: Record<'tco' | 'costPerMonth' | 'costPerKm' | 'upfront', number[]>;   // indexes; >1 = tie
  breakEvenKmPerMonth: { a: number; b: number; km: number | null; reason?: string }[];
  breakEvenMonth: { a: number; b: number; month: number | null }[];
  sensitivity?: Record<'fuelPrice' | 'kmPerMonth' | 'resale', { minus20: Paise; base: Paise; plus20: Paise }[]>;
}
```

---

## 6. Defaults

All defaults are in [../defaults/india.json](../defaults/india.json), validated against `DefaultsPack`. In pack `2026.11.2`, fuel prices, road tax and the loan rate were checked against news reports and bank rates; each group's `source` says where. Every other group is still a placeholder (`source: "PLACEHOLDER"`): approximate figures from general knowledge that must be checked against official sources. Seeded so far: states DL, MH, KA; cities Delhi, Mumbai, Pune, Bengaluru. This is the v1 launch set (D2).

Sources to verify against before launch:

| Group | Where to check |
| --- | --- |
| Fuel prices | Oil marketing company daily prices (IOCL, BPCL, HPCL); CNG from city gas distributors (IGL, MGL, BGL) |
| Electricity tariffs | State electricity regulator residential tariff orders; public DC tariffs from major CPOs |
| Road tax | State transport department / Parivahan schedules |
| GST | [Razorpay](https://razorpay.com/learn/gst-on-cars/), [Business Standard](https://www.business-standard.com/economy/news/gst-rationalisation-to-boost-auto-demand-small-cars-suvs-tyres-125090400227_1.html) (already cited in INTENT.md) |
| Insurance, service, tyres, depreciation | Insurer premium calculators, manufacturer service price lists, tyre retailer prices, IRDAI IDV depreciation slabs |
| Loan rate | Published car-loan rates of large banks |

Pack updates are a data release: bump `version`, update `asOf` on each changed group, and add a line to the pack's `changelog`.

---

## 7. Architecture constraints

- **Engine package** (`packages/engine`): pure TypeScript with no runtime dependencies except Zod. It is published inside this app's npm workspace. It must also run in Node, for future API or WhatsApp-bot use.
- **Web app** (`web/`): React + TypeScript + Vite + Tailwind, Recharts (lazy), React Hook Form + Zod, an IndexedDB wrapper (`idb`), a PWA plugin (`vite-plugin-pwa`) and an i18n library (`i18next` or similar; chosen in PLAN.md).
- **Hosting:** a static build served by nginx on Cloud Run, deployed by `/.github/workflows/deploy-gaadiganit.yml`, at `gg.nthakur.com` (ADR-003).
- The engine never imports from `web/`. `web/` imports the engine only through its public entry point.

---

## 8. Worked examples (acceptance fixtures)

These scenarios were checked against an independent Python implementation of §4 (`tools/verify/reference_tco.py`) instead of a spreadsheet. They are then committed as engine test fixtures with expected totals to the paisa. The inputs are fixed now so the engine is built against them.

| # | Scenario | Key inputs |
| --- | --- | --- |
| W1 | Petrol hatchback, cash, Delhi | Ex-showroom ₹6,50,000 · 1,000 km/month · 60 months · claimed 20 km/l · defaults otherwise |
| W2 | Diesel SUV on loan, Mumbai | Ex-showroom ₹16,00,000 · 1,500 km/month · 60 months · claimed 17 km/l · 20% down · 9% p.a. · 60 months tenure |
| W3 | Commercial CNG cab, Bengaluru [v1.2] | Ex-showroom ₹7,50,000 · 250 km/working day · 4 idle days · ₹14/km earnings · 25% commission · driver ₹18,000/month · 20% down · 9.5% p.a. · 48 months tenure · 48 months ownership |
| W4 | Petrol vs EV break-even [v1.1] | Petrol compact SUV ₹10,00,000 at 16 km/l vs EV compact SUV ₹15,00,000 at 7 km/kWh, Delhi, 84 months · expected: break-even km/month exists between 500 and 3,000 |

The results of W1 and W2 are checked first. Their monthly schedules, exported as CSV (SHR-04 format), are what the spreadsheet comparison uses.

---

## 9. Changes to the intent

| Intent says | Spec does | Why |
| --- | --- | --- |
| Energy inflation exponent `floor(m/12)` | `floor((m − 1)/12)` | With m starting at 1, `floor(m/12)` would raise prices in month 12, not month 13 |
| `TCO = DownPayment + UpfrontOther + …` | `TCO = CashUpfront + …` where CashUpfront = OnRoad − LoanPrincipal + ProcessingFee | Makes it explicit what is paid in cash on day 1 and avoids double-counting road tax and insurance |
| ROI % = (Σ net profit + resale − upfront) ÷ upfront | Also subtracts `LoanOutstanding_N` | When the loan outlives ownership, the balance is owed at sale and reduces the return |
| Break-even km "solve numerically" | Coarse 100 km scan, then bisection | Service and tyre events make TCO step-wise; a plain bisection could miss the first crossing |
| Quick estimate has no mileage field | Mileage defaults to a typical claimed figure per fuel type (`typicalMileage` in the defaults pack) | The engine needs a mileage, and v1 has no model catalogue |
| Quick estimate fields include "model" | Category is inferred from price (IN-02) | 5 fields don't include category, but insurance, service and tyre defaults depend on it |

---

## 10. Decisions on the open questions

Answered 2026-11-23.

| # | Question | Decision |
| --- | --- | --- |
| D1 | Loan basis | The loan covers **80% of the on-road price** by default (20% down payment of on-road). Both stay editable |
| D2 | Cities for v1 | Delhi, Mumbai, Pune and Bengaluru (states DL, MH, KA). Other locations fall back to Delhi |
| D3 | Hindi | The owner is a native speaker and writes or reviews the Hindi strings. Claude drafts `hi` catalogues, and the owner reviews them before release |
| D4 | EV battery | Not in v1. No EV traction-battery reserve or replacement cost |
| D5 | Analytics | None in v1. No GA4 or other tracking scripts |
