# GaadiGanit

> Status: **spec v0.2, build started.** Product intent: [docs/INTENT.md](docs/INTENT.md). Detailed spec: [docs/SPEC.md](docs/SPEC.md). Placeholder defaults: [defaults/india.json](defaults/india.json). App code comes next.

GaadiGanit ("vehicle maths") is a vehicle cost-of-ownership and ROI calculator for Indian buyers. It turns "is this car worth it?" into one number per month and per km.

It is a standalone app that lives inside the `thakurnaval` repo for now. It sits next to the nthakur.com portfolio site but is not part of it. Like Tackl, BookEx and TrueNorth, it runs as its own Cloud Run service on its own subdomain.

## URLs

| URL | What it does |
| --- | --- |
| **https://gg.nthakur.com** | Serves the app (canonical) |
| https://nthakur.com/gg | Redirects to gg.nthakur.com, keeping the path |
| https://nthakur.com/gaadiganit | Redirects to gg.nthakur.com, keeping the path |

The redirects are in the portfolio's root `nginx.conf`. See ADR-003 in [docs/DECISIONS.md](docs/DECISIONS.md) for why only one URL serves the app.

**One-time domain setup** (after the first deploy), the same as Tackl:

```bash
gcloud beta run domain-mappings create --service=gaadiganit --domain=gg.nthakur.com \
  --region=asia-southeast1 --project=navalthakur
```

Then add the DNS record it prints (`gg` CNAME → `ghs.googlehosted.com.`). Google issues the TLS certificate once DNS has propagated.

## Ground rules (so it can move to its own repo later)

This folder must work as if it were the root of its own repository:

1. **Self-contained.** It has its own `package.json`, lockfile, `node_modules`, `tsconfig`, `Dockerfile`, `.env.example` and docs. It never imports from the portfolio site (`../../components`, `../../constants.ts` and so on), and the portfolio never imports from it.
2. **Relative paths only** within this folder. Nothing may assume the repo root is `../..`.
3. **Own build context.** Docker builds run with `apps/gaadiganit` as the context, not the repo root.
4. **Own deploy pipeline.** CI is path-filtered to `apps/gaadiganit/**` and deploys a separate Cloud Run service. The portfolio pipeline ignores `apps/**`.
5. **Own config and secrets.** Use GitHub secrets prefixed `GAADIGANIT_` so they can be copied to a new repo unchanged.

## Layout

```
apps/gaadiganit/
├── README.md            ← this file
├── CLAUDE.md            ← working notes for AI-assisted development
├── .gitignore           ← app-local ignores (moves with the app)
├── .dockerignore        ← app-local Docker build ignores
├── docs/
│   ├── INTENT.md        ← product intent (copy of the Claude Doc)
│   ├── SPEC.md          ← detailed requirements, written from INTENT.md
│   ├── DECISIONS.md     ← architecture decision log
│   └── EXTRACTION.md    ← how to split this into its own repo
├── defaults/
│   └── india.json       ← versioned default values (data, not code)
└── (app source, package.json, Dockerfile, … added once the stack is chosen)
```

The deploy workflow will be at `/.github/workflows/deploy-gaadiganit.yml` at the repo root, because GitHub only runs workflows from there. [docs/EXTRACTION.md](docs/EXTRACTION.md) covers moving it when the app gets its own repo.

## Running locally

To be added once the stack is set up. All commands will run from this folder:

```bash
cd apps/gaadiganit
npm install
npm run dev
```
