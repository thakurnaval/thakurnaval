# GaadiGanit — Build Plan

Scope: the **[v1]** requirements in [SPEC.md](SPEC.md). Compare, what-if and sharing (v1.1) and commercial ROI (v1.2) come later, but the types already support them.

## Layout

```
apps/gaadiganit/                 npm workspace root (self-contained, extractable)
├── package.json                 workspaces: packages/*, web
├── defaults/india.json          defaults pack (data)
├── packages/engine/             @gaadiganit/engine — pure TS + Zod, no UI deps
│   ├── src/schemas.ts           Zod schemas → all types (z.infer)
│   ├── src/resolve.ts           scenario + defaults → resolved inputs + assumptions
│   ├── src/loan.ts              EMI + amortisation in paise
│   ├── src/calculate.ts         month-by-month TCO
│   └── test/                    Vitest, 100% coverage target
└── web/                         React + Vite + Tailwind PWA (imports engine)
```

## Workstreams and order

| # | Workstream | Depends on | Status |
| --- | --- | --- | --- |
| 1 | Engine: schemas, resolve, loan, calculate, tests | — | Done: 54 tests, 100% coverage |
| 2 | Defaults pack: schema validation in CI, verify placeholder values | 1 (schema) | Schema validated in tests; values still placeholders |
| 3 | Web shell: Vite, Tailwind, routing, i18n (en + hi), Indian formatting, PWA | 1 (types) | Done |
| 4 | Quick estimate + detailed editor, Zod validation | 1, 3 | Done |
| 5 | Result screen: headline, breakdown, cumulative chart, assumptions | 1, 3 | Done |
| 6 | Persistence (IndexedDB, autosave, schema migrations) | 1, 3 | Done |
| 7 | Deploy: Dockerfile, nginx, `deploy-gaadiganit.yml`, gg.nthakur.com mapping | 3 | Next; needs GCP secrets and DNS |

Merge order: 1 → 3 → (4, 5, 6 in parallel) → 7. Workstream 2 runs alongside.

## Verification

- Engine invariants are tested on every run: buckets sum to TCO, the monthly schedule matches the totals, and principal sums to the loan.
- Worked examples W1 and W2 (SPEC §8) are hand-checked in a spreadsheet, then pinned as fixtures.
- The owner reviews the Hindi catalogue (`hi`) before release (SPEC D3).

## Still open for v1

- Owner review of the Hindi strings in `web/src/i18n/hi.ts` (D3). Engine validation messages are English-only for now.
- Verify the placeholder defaults (SPEC §6) and hand-check W1/W2 in a spreadsheet, then pin them as fixtures.
- Lighthouse and accessibility pass on a real phone (NFR-02, NFR-03).

## v1.1 and v1.2 (built 2026-11-23)

| # | Workstream | Status |
| --- | --- | --- |
| 8 | Engine: `compare`, break-even km/month and month, ±20% sensitivity | Done |
| 9 | Engine: commercial ROI (earnings, commission, driver, permits, payback, fleet) | Done |
| 10 | Compare screen: pick 2–4 on Home, metrics table with winners, break-even sentences, multi-line chart | Done |
| 11 | What-if sliders and sensitivity table on the scenario page | Done |
| 12 | Sharing: link (URL fragment), WhatsApp card (PNG), PDF (print), CSV | Done |
| 13 | Commercial section in the editor; profit, ROI and payback in the result | Done |
| 14 | "Change" links from assumptions to their field (UI-05); editable real-world mileage factor | Done |

## v2 (built 2026-11-23)

| # | Workstream | Status |
| --- | --- | --- |
| 15 | Curated model catalogue (`defaults/catalogue.json`, 43 models) with schema and search in the engine | Done; data unverified |
| 16 | Model picker (combobox) in the quick estimate and editor; fills make, body type, fuel, price, mileage | Done |
| 17 | "My models": save a calculation's vehicle, shown first in search, managed in Settings | Done |
| 18 | "My fuel prices" in Settings, applied to every calculation through the defaults | Done |

Dropped from v2 by the owner (ADR-006): Android app, login and sync, live fuel-price feed.

## Still open

- Verify catalogue prices and mileage against maker sites, then set `verified: true` per entry.
- Verify the placeholder defaults pack; hand-check W1–W4 in a spreadsheet and pin them as fixtures.
- Owner review of Hindi strings.
