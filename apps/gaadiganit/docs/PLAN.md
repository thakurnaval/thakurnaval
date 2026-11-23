# GaadiGanit — Build Plan (v1 MVP)

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
| 3 | Web shell: Vite, Tailwind, routing, i18n (en + hi), Indian formatting, PWA | 1 (types) | Next |
| 4 | Quick estimate + detailed editor, Zod validation | 1, 3 | |
| 5 | Result screen: headline, breakdown, cumulative chart, assumptions | 1, 3 | |
| 6 | Persistence (IndexedDB, autosave, schema migrations) | 1, 3 | |
| 7 | Deploy: Dockerfile, nginx, `deploy-gaadiganit.yml`, gg.nthakur.com mapping | 3 | |

Merge order: 1 → 3 → (4, 5, 6 in parallel) → 7. Workstream 2 runs alongside.

## Verification

- Engine invariants are tested on every run: buckets sum to TCO, the monthly schedule matches the totals, and principal sums to the loan.
- Worked examples W1 and W2 (SPEC §8) are hand-checked in a spreadsheet, then pinned as fixtures.
- The owner reviews the Hindi catalogue (`hi`) before release (SPEC D3).
