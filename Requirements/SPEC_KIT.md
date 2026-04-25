# nThakur.com — Project Spec Kit
*Last updated: April 2026 · Owner: Naval Thakur · navalthakur@gmail.com*

---

## 1. Project Overview

**nthakur.com** is a personal authority website for Naval Thakur — Practice Manager at SLB, enterprise cloud transformation practitioner, speaker, and author. The site serves four audiences simultaneously:

| Audience | Goal |
|----------|------|
| Conference organisers & event hosts | Discover Naval as a speaker, download kit, book via Sessionize |
| Enterprise engineering leaders | Consume practitioner knowledge across DevOps, FinOps, SecOps, GenAI, Architecture |
| Prospective consulting / coaching clients | Understand depth, assess trust, convert to contact |
| Practitioners & learners | Take free maturity assessments, read articles, explore frameworks |

**Primary KPIs:** Contact form submissions · Assessment completions · Speaker kit downloads · Newsletter signups · Organic search impressions

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| UI Framework | React | 18.2.0 |
| Language | TypeScript | 5.2.2 |
| Build Tool | Vite | 7.0.0 |
| Routing | React Router DOM | 6.22.3 |
| Styling | Tailwind CSS | CDN (runtime) |
| Animation | Motion (Framer Motion) | 12.34.3 |
| Charts | Recharts | 2.12.2 |
| Icons | Lucide React | 0.344.0 |
| Analytics | Google Analytics 4 | G-2T36Y7QSN6 |
| Data storage | Google Sheets via Apps Script | — |
| Containerisation | Docker + Nginx | — |
| Hosting | Google Cloud Run | asia-south1 |
| CI/CD | GitHub Actions | — |

**Runtime config note:** Tailwind CSS is loaded via CDN with an inline theme configuration in `index.html`. There is no `tailwind.config.js` file — the theme is defined in a `<script>` block in the HTML entry point.

---

## 3. Design System

### Colour Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#271789` | Hero backgrounds, headings, nav, primary buttons |
| `secondary` | `#00f1d4` | Accent highlights, active states |
| `secondary-dark` | `#008577` | Text links on light backgrounds (WCAG contrast compliant) |
| `secondary-hover` | `#00c2ab` | Button hover state |
| `surface` | `#f8fafc` | Page backgrounds (Slate 50) |
| `highlight` | `#ffff00` | Emphasis text (use sparingly) |

Dark mode: class-based (`dark:` prefix). Toggle managed in `Layout.tsx` via `localStorage` persistence.

### Typography

- **Font:** Inter (Google Fonts, loaded via `<link>` preconnect in `index.html`)
- **Scale:** Tailwind defaults (no custom scale)
- **Headings:** `font-bold`, sizes `text-2xl` → `text-5xl` depending on context
- **Body:** `text-slate-600 dark:text-slate-300`, `leading-relaxed`

### Spacing & Layout

- **Container:** `container mx-auto px-4 sm:px-6 lg:px-8`
- **Section padding:** `py-16` to `py-24` depending on section weight
- **Card radius:** `rounded-xl` (primary), `rounded-lg` (secondary)
- **Sticky nav offset:** `top-24` for sticky sidebar elements

---

## 4. Application Architecture

```
nthakur.com
├── index.html              # Entry point, Tailwind CDN, GA4, font preconnect
├── index.tsx               # React 18 root mount, StrictMode
├── App.tsx                 # BrowserRouter, all 111 routes, Layout wrapper
├── types.ts                # All shared TypeScript interfaces
├── constants.ts            # All site data arrays (NAV_ITEMS, PROJECTS, etc.)
│
├── components/             # 8 shared components
│   ├── Layout.tsx          # Nav, theme toggle, mobile menu, scroll-to-top
│   ├── SEO.tsx             # Meta tags, OG, Twitter card, JSON-LD injection
│   ├── Section.tsx         # Reusable section wrapper (white/gray/navy bg)
│   ├── SimplePage.tsx      # Hero + Section wrapper for content-only pages
│   ├── SDLCPhasePage.tsx   # Template for AI-SDLC phase pages
│   ├── ProjectCard.tsx     # Animated project card with GitHub/live links
│   ├── NewsletterSignup.tsx # Email capture → Google Apps Script
│   └── Testimonials.tsx    # 3-column testimonial grid
│
└── pages/                  # 18 top-level pages + 11 subdirectories
    ├── [18 top-level pages]
    ├── devops/             # 9 subpages
    ├── secops/             # 10 subpages + SecOpsAssessment
    ├── finops/             # 6 subpages + FinOpsAssessment
    ├── genai/              # 6 subpages + GenAIAssessment
    ├── architecture/       # 13 subpages + WellArchitectedAssessment
    ├── ai-sdlc/            # 6 subpages
    ├── explore/            # BookSummaries, Certifications, MentalModels
    ├── articles/           # 4 long-form articles
    ├── talks/              # 5 talk detail pages
    ├── agile/              # AgileAssessment
    └── pm/                 # PMAssessment
```

**Routing strategy:** `BrowserRouter` (all URLs are real, indexable). No hash routing. Netlify `_redirects` and Cloud Run serve the SPA shell for all routes.

---

## 5. Route Map (111 routes)

### Core Pages
| Path | Component | Notes |
|------|-----------|-------|
| `/` | Home | Hero, impact bar, CognitiveOps overview, testimonials, newsletter |
| `/cognitiveops` | CognitiveOps | CognitiveOps Maturity Model — the intellectual centrepiece |
| `/about` | About | Bio, certifications summary, timeline |
| `/projects` | Projects | Searchable/filterable project grid (8 projects) |
| `/case-studies` | CaseStudies | Enterprise engagement case studies |
| `/talks` | Talks | Speaking topics, past appearances, speaker kit download |
| `/articles` | Articles | Article grid (4 published) |
| `/gallery` | Gallery | Event photo gallery (24 photos) |
| `/community` | Community | Mentorship and community involvement |
| `/assessments` | Assessments | Hub page — all 7 assessments |
| `/work-with-me` | WorkWithMe | Services, pricing tiers, Sessionize link |
| `/contact` | Contact | Contact form → Google Apps Script |

### Domain Pillar Pages
| Path | Component |
|------|-----------|
| `/devops` | DevOps |
| `/secops` | SecOps |
| `/finops` | FinOps |
| `/genai` | GenAI |
| `/architecture` | Architecture |
| `/ai-sdlc` | AIinSDLC |

### Assessment Routes (7 total)
| Path | Component | Questions | Pillars |
|------|-----------|-----------|---------|
| `/devops/assessment` | DevOpsAssessment | 13 | 4 (DevOps, SecOps, FinOps, GenAI) |
| `/agile/assessment` | AgileAssessment | 16 | 4 |
| `/finops/assessment` | FinOpsAssessment | 16 | 4 |
| `/secops/assessment` | SecOpsAssessment | 16 | 4 |
| `/genai/assessment` | GenAIAssessment | 16 | 4 |
| `/architecture/assessment` | WellArchitectedAssessment | 15 | 5 |
| `/pm/assessment` | PMAssessment | 16 | 4 |

### DevOps Subpages (9)
`/devops/frameworks` · `/devops/maturity` · `/devops/practices` · `/devops/tools` · `/devops/sre` · `/devops/platform-engineering` · `/devops/chaos-engineering` · `/devops/roadmap`

### SecOps Subpages (10)
`/secops/cognitive-devsecops` · `/secops/practices` · `/secops/devsecops-practices` · `/secops/principles` · `/secops/automation` · `/secops/threat-modeling` · `/secops/continuous-security` · `/secops/cloud-security` · `/secops/sast-dast` · `/secops/container-security`

### FinOps Subpages (6)
`/finops/framework` · `/finops/cost-visibility` · `/finops/optimization` · `/finops/unit-economics` · `/finops/forecasting` · `/finops/culture`

### GenAI Subpages (6)
`/genai/fundamentals` · `/genai/llmops` · `/genai/rag` · `/genai/agents` · `/genai/governance` · `/genai/prompt-engineering`

### Architecture Subpages (13)
`/architecture/design-patterns` · `/architecture/solid-principles` · `/architecture/system-design-process` · `/architecture/cloud-architecture` · `/architecture/data-architecture` · `/architecture/microservices` · `/architecture/api-design` · `/architecture/system-security` · `/architecture/twelve-factor` · `/architecture/coding-standards` · `/architecture/togaf` · `/architecture/it-governance` · `/architecture/software-engineering`

### AI in SDLC Subpages (6)
`/ai-sdlc/coding` · `/ai-sdlc/testing` · `/ai-sdlc/requirements` · `/ai-sdlc/code-review` · `/ai-sdlc/deployment` · `/ai-sdlc/monitoring`

### Article Routes (4)
| Path | Article |
|------|---------|
| `/articles/cloud-computing-fundamentals` | Cloud Computing Fundamentals |
| `/articles/gamifying-devops-pipeline` | Fun with DevOps: Gamifying the Pipeline |
| `/articles/secops-bridging-the-gap` | SecOps: Bridging the Gap |
| `/articles/finops-certified-practitioner` | Becoming a FinOps Certified Practitioner |

### Talk Detail Routes (5)
`/talks/scaling-devsecops-enterprise` · `/talks/financial-impact-cloud-native` · `/talks/genai-new-team-member` · `/talks/cultural-transformation-devops` · `/talks/zero-trust-cloud-native`

### Explore Routes (3)
`/explore/books` · `/explore/certifications` · `/explore/mental-models`

---

## 6. Data Layer

All site data is hardcoded in `constants.ts`. There is no database or CMS. Content changes require a code edit and redeploy.

### Data Structures

**NAV_ITEMS** — Navigation tree
```ts
NavItem { label: string; path?: string; children?: NavItem[] }
```
6 top-level items. "Expertise" and "Insights" have nested children rendered as dropdowns.

**PROJECTS** — 8 projects
```ts
ProjectProps { title, description, technologies[], githubUrl?, liveUrl?, image? }
```
Projects: TrueNorth, BookEx, GenAI for Beginners, AI Agents for Beginners, 90 Days of DevOps, 30 Days of FinOps, Azure Orphan Resources, ML for Beginners

**RECENT_TALKS** — 5 speaking topic cards on `/talks`
```ts
TalkProps { title, description, tags[], audience?, duration?, link? }
```

**FEATURED_ARTICLES** — 4 articles surfaced on the Home page and Articles list
```ts
ArticleProps { title, summary, tag, link }
```

**SPEAKING_APPEARANCES** — 25 past appearances on `/talks`
```ts
SpeakingAppearance { event, topic, year, location, type, audience?, recordingUrl?, photoUrl?, flyerUrl? }
// type: 'Conference' | 'Webinar' | 'Workshop' | 'Panel' | 'Internal'
```

**GALLERY_IMAGES** — 24 event photos on `/gallery`
```ts
GalleryImage { id, title, location, imgId?, src? }
```

**FINOPS_DATA** — 4 quarterly cost/savings data points for the FinOps charts
```ts
FinOpsChartData { name: string; cost: number; savings: number }
```

**PROFILE_IMAGE_URL** — `/assets/img/profile.jpg`

---

## 7. Component Reference

### Layout.tsx
Wraps all pages. Renders:
- Fixed top navigation with logo, nav items, dark mode toggle
- Mobile hamburger menu
- Scroll-to-top on route change
- Footer

Nav data source: `NAV_ITEMS` from `constants.ts`
Theme: reads/writes `localStorage` key `theme`, applies `dark` class to `<html>`
Keyboard shortcut: `Cmd/Ctrl+K` opens search UI (cosmetic — no search backend)

### SEO.tsx
Props: `{ title, description, type?, structuredData?, image? }`
Injects into `document.head` on mount, cleans up on unmount:
- `<title>`, `meta[name=description]`, `<link rel=canonical>`
- OG: title, description, url, type, image, site_name
- Twitter: card, site, creator, title, description, image
- JSON-LD `<script type="application/ld+json">` when `structuredData` is provided

Site URL constant: `https://nthakur.com`
Twitter handle: `@nthakur_dot_com`

### SimplePage.tsx
Props: `{ title, subtitle, children, structuredData?, type? }`
Template used by all article pages and most content subpages. Renders:
- `<SEO>` with auto-generated title (`{title} | Naval Thakur`) and truncated subtitle as description
- Dark hero band with `h1` title and subtitle
- `<Section>` wrapper with `max-w-4xl mx-auto` content area

### Section.tsx
Props: `{ id?, className?, children, bg? }`
`bg` options: `'white'` (default) | `'gray'` | `'navy'`
Standard vertical padding: `py-16 md:py-24`

### SDLCPhasePage.tsx
Props: `{ title, subtitle, icon, content, benefits[] }`
Template for all 6 `/ai-sdlc/*` subpages.

### ProjectCard.tsx
Props: `ProjectProps`
Uses `motion.div` with `whileInView` animation. Shows GitHub and live URL buttons if present.

### NewsletterSignup.tsx
Stateful. Submits email + source to Google Apps Script. States: idle → submitting → success/error.

### Testimonials.tsx
No props. Inline data (3 testimonials). Renders a 3-column responsive grid.

---

## 8. Assessment Engine

All 7 assessments share the same state machine pattern:

```
Step 0: Welcome screen
Steps 1..N: One pillar per step (questions rendered as 0–3 radio scale)
Step N+1: Email gate (POST to Google Apps Script, mode: no-cors)
Step N+2: Results (per-pillar scores, overall layer, recommendations)
          + PDF download via window.open() → document.write(HTML) → print()
```

**Scoring:**
- Each question: 0 (Never) → 3 (Always)
- Pillar average: < 1.5 = L1 · < 2.5 = L2 · < 3.5 = L3 · ≥ 3.5 = L4
- Layer labels vary by assessment type (e.g. Initial/Managed/Defined/Optimised for PM)

**Email submission payload (FormData):**
- `email`, `type` (assessment name), `scores` (JSON), `layer` (overall result)
- All assessments use the same Google Apps Script URL

**PDF generation:** Browser-native print dialog. No server-side PDF. Content is a full HTML page written into a new window.

---

## 9. External Integrations

### Google Apps Script (Data Collection)
**Endpoint:** `https://script.google.com/macros/s/AKfycbx03K6mwLMtq6X5q8JIAHKQ4qSxCk9LEavNeO0IWo1jg9IxhzFoxvZM0DwKtgMegKDz1Q/exec`

Used by:
| Source | Fields |
|--------|--------|
| Contact form (`/contact`) | name, email, phone, topic, message |
| Newsletter signup (`NewsletterSignup.tsx`) | email, source |
| All 7 assessments | email, type, scores, layer |

**Mode:** `no-cors` — response is opaque; frontend always assumes success if no network error thrown. Backend failures are invisible to the user.

**Storage:** Google Sheet linked to the Apps Script deployment. All form types write to the same sheet (separate tabs if the script routes by `type` field).

### Google Analytics 4
**Measurement ID:** `G-2T36Y7QSN6`
Script injected in `index.html`. Custom event tracking available via `src/services/analytics.ts` (`trackEvent(category, action, label?, value?)`).

### Sessionize
Speaker profile: `https://sessionize.com/nthakur/`
Linked from `/talks` and `/work-with-me`. Not embedded — external link only.

### Google Fonts
Inter font loaded via `<link rel="preconnect">` + stylesheet in `index.html`.

---

## 10. SEO & AEO Setup

### Meta Tags (per-page, injected by SEO.tsx)
- `<title>` — dynamic per page
- `meta[name=description]` — dynamic per page
- `<link rel=canonical>` — `https://nthakur.com{pathname}`
- Full Open Graph suite (title, description, url, type, image, site_name)
- Full Twitter Card suite (summary_large_image)

### Structured Data (JSON-LD)
| Page | Schema Types |
|------|-------------|
| Home (`/`) | WebSite, Person |
| About (`/about`) | Person (with sameAs: LinkedIn, GitHub, Twitter, YouTube) |
| Case Studies | ItemList |
| Projects (`/projects`) | CollectionPage, BreadcrumbList |
| All 4 articles | Article, BreadcrumbList, FAQPage |
| FinOps article | + HowTo (8-week study plan) |
| Gamifying article | + HowTo (Deployment League) |

### Static SEO Files
- `public/robots.txt` — crawl rules
- `public/sitemap.xml` — all indexable routes

### AEO (Answer Engine Optimization)
FAQPage schemas on all article pages target direct-answer surfaces (Perplexity, ChatGPT, Gemini). HowTo schemas on how-to articles target step-by-step query formats. BreadcrumbList on all article and project pages improves SERP rich snippets.

---

## 11. Deployment & Infrastructure

### Build
```bash
npm run build    # vite build → dist/
npm run dev      # vite --port 3000 --host 0.0.0.0
npm run lint     # tsc --noEmit (type check only, no eslint)
npm run preview  # vite preview
```
Output: `dist/` — static files served by Nginx inside Docker container.

### Containerisation
- `Dockerfile` — Node.js build stage → Nginx serve stage
- `nginx.conf` — SPA fallback: all routes → `index.html` (required for BrowserRouter)
- `.dockerignore` — excludes `node_modules`, `dist`, `.git`
- Container port: `8080`

### CI/CD (GitHub Actions — `.github/workflows/deploy.yml`)
**Trigger:** Push to `main` · Manual `workflow_dispatch`

**Pipeline steps:**
1. Checkout source
2. Authenticate to GCP via Workload Identity Federation (OIDC — no long-lived credentials)
3. Setup Cloud SDK
4. Configure Docker for Artifact Registry (`asia-south1-docker.pkg.dev`)
5. Build Docker image
6. Push with two tags: `latest` + git SHA
7. Deploy to Cloud Run

**Cloud Run config:**
- Memory: 256Mi · CPU: 1
- Min instances: 0 (scales to zero when idle)
- Max instances: 3
- Unauthenticated access: allowed
- Region: `asia-south1`

### Custom Domain
- `public/CNAME` — custom domain file for DNS routing to `nthakur.com`
- `public/_redirects` — Netlify-style redirect rules (also handled by `nginx.conf` for Cloud Run)

---

## 12. Asset Inventory

**Location:** `public/assets/img/`

| Asset | Path | Notes |
|-------|------|-------|
| Profile photo | `/assets/img/profile.jpg` | Used in navbar, SEO default OG image, Talks sidebar, About page |
| Profile favicon | `/assets/img/profile.png` | Browser tab icon |
| Gallery images | `/assets/img/gallery/*.{jpg,png,webp}` | 140+ files: event photos, cert badges, logos, diagrams |
| DevOpsism intro video | `/assets/img/gallery/devopsism-intro.mp4` | Book teaser video asset |

**Gallery categories (within `/assets/img/gallery/`):**
- Event photos (SLB, Accenture, conferences, bootcamps)
- Certification badges (Azure, GCP, OCI, FinOps, CKA, ITIL, Blockchain, TOGAF)
- Brand assets (nThakur logo variants)
- Technical diagrams (DevOps, SecOps, cloud architecture)
- Book covers (Book Summaries page)
- Mentorship and educational materials

---

## 13. Known Limitations & Technical Debt

| Issue | Impact | Notes |
|-------|--------|-------|
| Tailwind via CDN | Build size, no purging | Runtime Tailwind includes all utilities. Switch to PostCSS build plugin to eliminate unused CSS. |
| No-cors form submissions | Silent failures | If the Apps Script errors, users see success. Consider adding a server-side proxy or switching to a form backend (Formspree, Netlify Forms) that returns a real response. |
| Google Apps Script URL hardcoded | 9 files | The same URL string appears in 9 components. Should be extracted to a single constant in `constants.ts`. |
| No ESLint config | Code quality | `npm run lint` runs `tsc --noEmit` only. No linting rules enforced. |
| Sitemap.xml is static | Stale URLs | Must be manually updated when routes are added. No auto-generation. |
| PDF reports are print-dialog-based | UX quality | Assessment PDF reports use `window.print()`. No formatting guarantees across browsers/OS. |
| No image optimisation pipeline | Performance | 140+ gallery images are raw JPEGs/PNGs with no resize, compression, or WebP conversion pipeline. |
| Content in `.tsx` files | Authoring friction | All article and subpage content is hardcoded in React components. No CMS or markdown pipeline. |

---

## 14. Content Inventory

### Published Articles (4)
| Title | Route | Schemas |
|-------|-------|---------|
| Cloud Computing Fundamentals | `/articles/cloud-computing-fundamentals` | Article, FAQPage, BreadcrumbList |
| Fun with DevOps: Gamifying the Pipeline | `/articles/gamifying-devops-pipeline` | Article, HowTo, FAQPage, BreadcrumbList |
| SecOps: Bridging the Gap | `/articles/secops-bridging-the-gap` | Article, FAQPage, BreadcrumbList |
| Becoming a FinOps Certified Practitioner | `/articles/finops-certified-practitioner` | Article, HowTo, FAQPage, BreadcrumbList |

### Talk Detail Pages (5)
These are long-form write-ups linked from the `RECENT_TALKS` constant, not the speaking appearances list.
- Scaling DevSecOps in the Enterprise
- The Financial Impact of Cloud Native
- GenAI: The New Team Member
- Cultural Transformation through DevOps
- Zero Trust in Cloud Native Environments

### Assessments (7)
| Assessment | Route | Layer Terminology |
|-----------|-------|-------------------|
| CognitiveOps Maturity | `/devops/assessment` | L1 Reactive → L4 Autonomous |
| Agile Maturity | `/agile/assessment` | Initial → Optimising |
| FinOps Maturity | `/finops/assessment` | Crawl → Run |
| Cloud Security | `/secops/assessment` | Reactive → Proactive |
| GenAI Readiness | `/genai/assessment` | Exploring → Leading |
| Well-Architected | `/architecture/assessment` | Foundational → Exemplary |
| Project Management | `/pm/assessment` | Initial → Optimised |

---

## 15. Environment & Local Development

**Prerequisites:** Node.js 18+ · npm

```bash
# Install
npm install

# Dev server (http://localhost:3000)
npm run dev

# Type check
npm run lint

# Production build
npm run build

# Preview production build locally
npm run preview
```

No `.env` file required. No environment variables in use — all configuration (API URLs, GA ID) is hardcoded in source files.

**Docker local test:**
```bash
docker build -t nthakur-local .
docker run -p 8080:8080 nthakur-local
# Open http://localhost:8080
```
