# GaadiGanit — Decision Log

Short records of significant technical decisions. Newest at the bottom.

---

## ADR-001 — Host inside `thakurnaval` repo under `apps/gaadiganit/`

- **Date:** 2026-11-23
- **Status:** Accepted
- **Context:** GaadiGanit is a new app. Tackl, BookEx and TrueNorth each have their own repo, but for now it is simpler to start GaadiGanit next to the portfolio site.
- **Decision:** Keep it in `apps/gaadiganit/` as a fully self-contained project with its own dependencies, build and deploy pipeline. The portfolio site and the app don't share any code.
- **Consequences:**
  - The app can move to its own repo with history intact (see [EXTRACTION.md](EXTRACTION.md)).
  - The root portfolio pipeline ignores `apps/**`, so changes to the app don't redeploy nthakur.com, and the reverse holds too.
  - The root `.dockerignore` excludes `apps/`, so the portfolio image never contains app code.

## ADR-003 — URLs: `gg.nthakur.com` is canonical; paths redirect

- **Date:** 2026-11-23
- **Status:** Accepted
- **Context:** The app should be reachable at `gg.nthakur.com`, `nthakur.com/gg` and `nthakur.com/gaadiganit`. Saved data (IndexedDB) and the PWA service worker are tied to an origin, so serving the app on two origins would split users' saved scenarios.
- **Decision:**
  - `gg.nthakur.com` serves the app: a Cloud Run domain mapping onto the GaadiGanit service, the same setup as Tackl.
  - `nthakur.com/gg/*` and `nthakur.com/gaadiganit/*` redirect to `gg.nthakur.com/*`, keeping the subpath and query string. The rule is in the portfolio's root `nginx.conf`.
  - The app is built for base path `/`.
- **Consequences:** There is one origin for data, install and SEO, and both short links keep working. The redirect is a 302 until `gg.nthakur.com` is live, then becomes a 301. The redirect lives in the portfolio, so it stays in place even after GaadiGanit moves to its own repo.

## ADR-002 — Tech stack

- **Status:** Accepted 2026-11-23, with the changes in ADR-004. Originally proposed: [INTENT.md](INTENT.md) suggests an offline-first PWA: React + TypeScript + Vite + Tailwind, Recharts, React Hook Form + Zod, a standalone TS calculation engine tested with Vitest, IndexedDB storage, and English + Hindi i18n. This gets confirmed or changed when SPEC.md is written.

## ADR-004 — Web app choices for v1

- **Date:** 2026-11-23
- **Status:** Accepted
- **Decision:**
  - React 19, React Router, Vite 8, Tailwind 4, Recharts (lazy-loaded), i18next, `idb`, `vite-plugin-pwa`. These are the current majors, so there's no early upgrade debt.
  - **No React Hook Form.** The form is controlled state, and the engine's own Zod schema validates it on every change, which already gives live results and per-field errors (IN-13). A second validation layer would duplicate the schema.
  - **The engine is consumed as TypeScript source** through the npm workspace (`exports: ./src/index.ts`). There's no separate build step; Vite compiles it with the app.
  - **Breakdown bars are plain HTML/CSS.** Only the cumulative chart uses Recharts, which keeps the first load small (~144 KB gzip JS against a 200 KB budget).
  - **Settings (language, default city) live in `localStorage`; scenarios live in IndexedDB.** Both are wrapped so the app still works when storage is blocked.

## ADR-005 — v1.1 sharing and comparison choices

- **Date:** 2026-11-23
- **Status:** Accepted
- **Decision:**
  - **Comparisons are URL-based** (`/compare?ids=a,b,c`) rather than stored `Comparison` records. Picking on Home is quick, and nothing goes stale when a scenario is deleted. The `Comparison` type stays in the engine for a later "saved comparisons" feature.
  - **Break-even km/month compares cost per month** (TCO ÷ months), so vehicles kept for different periods compare fairly.
  - **Share links carry the scenario in the URL fragment**, deflate-compressed (`#s=z…`, plain base64 `j…` where `CompressionStream` is missing). The fragment never reaches the server, so sharing needs no backend and logs nothing.
  - **"Save as PDF" uses the browser's print dialog** with a print stylesheet, instead of bundling a PDF library. It's smaller and works offline; the trade-off is that the user picks "Save as PDF" in the dialog.
  - **The WhatsApp card is drawn on a canvas** (1080 × 1080 PNG) and shared with the Web Share API, falling back to a download.
  - **Commercial driver and permit costs count towards TCO** (an `operating` bucket), so cost per km is the full operating cost. Net profit = earnings − commission − all monthly costs, including EMI.

## ADR-006 — v2 scope: curated catalogue, my models, my prices

- **Date:** 2026-11-23
- **Status:** Accepted (owner)
- **Context:** Two users to begin with. The intent's v2 listed a model catalogue, live fuel prices, an Android app, and login and sync.
- **Decision:**
  - **No Android app, no login or sync.** The PWA installs on Android from the browser, and data stays on each device.
  - **Model catalogue = a curated JSON file in the repo** (`defaults/catalogue.json`), validated by `CatalogueSchema` in CI. Each entry has a price range in lakh, claimed mileage per fuel, a source and `verified`. The app prefills the lowest variant's price, and the user corrects it to their variant.
  - **"My models"** are saved on the device (IndexedDB store `models`, DB version 2) and searched first.
  - **No live fuel-price feed.** Instead, users set **"My fuel prices"** once in Settings (stored with the other settings). They are laid over every city's prices in an effective defaults pack, so every calculation, comparison and what-if uses them. A price set inside a calculation still wins. The source shows as "your prices in Settings".
- **Consequences:** No backend and no running cost. The catalogue and defaults need a manual refresh every few months (bump `version`, update `asOf`).

## ADR-007 — Commercial vehicles: trucks, buses, minibuses

- **Date:** 2026-11-23
- **Status:** Accepted
- **Decision:**
  - **Four new categories:** `light_truck` (3.5–7.5 t GVW), `truck` (7.5–19 t), `heavy_truck` (19 t and above) and `minibus` (tempo travellers). They sit next to `pickup`, `van`, `mini_truck` and `bus`. Every category-keyed default (insurance, service, tyres, repairs, permits) has values for them, as placeholders like the rest of the pack.
  - **`typicalMileageByCategory`** in the defaults pack overrides the fuel-wide typical mileage for categories far from a car (e.g. heavy truck 3.8 km/l, bus 4.5 km/l, EV bus 1 km/kWh).
  - **The EV efficiency range is now 0.5–15 km/kWh** (was 2–15), so electric buses and trucks validate.
  - **Catalogue entries carry `use`** (`commercial` for goods and passenger vehicles) and an optional `note` (e.g. "chassis price; body extra"). Picking a commercial model switches the scenario to commercial use. Until earnings are entered, the result shows costs and a prompt to add earnings, not a loss.
  - **Road tax stays a % of ex-showroom.** Many states tax commercial vehicles by weight, quarterly, so the result shows a note for commercial categories while road tax is on the default.
- **Catalogue:** 71 models: 43 cars, plus MPVs, minibuses, small commercial vehicles and pickups, light, medium and heavy trucks, and buses. Truck and bus mileage figures are typical approximations; none are verified.
