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

- **Status:** Proposed. [INTENT.md](INTENT.md) suggests an offline-first PWA: React + TypeScript + Vite + Tailwind, Recharts, React Hook Form + Zod, a standalone TS calculation engine tested with Vitest, IndexedDB storage, and English + Hindi i18n. This gets confirmed or changed when SPEC.md is written.
