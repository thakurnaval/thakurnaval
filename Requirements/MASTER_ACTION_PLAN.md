# Naval Thakur — Master Action Plan
*Last updated: April 2026*

This is the single source of truth for all outstanding action items across the website, LinkedIn, content, assessments, and newsletter. Check items off as they're completed.

---

## Quick Status

| Area | Status |
|------|--------|
| Website — core platform | ✅ Complete |
| Website — social proof | ✅ Testimonials complete |
| Website — assessments | ✅ All 8 built + hub page at `/assessments` |
| Website — assessment separation | ✅ DevOps standalone · CognitiveOps standalone at `/cognitiveops/assessment` |
| Website — SEO/AEO | ✅ FAQPage + Article JSON-LD on all 4 articles · HowTo on 2 articles |
| Website — nav & discoverability | ✅ Assessment CTAs on all section pages + nav dropdown |
| Website — newsletter archive | ✅ Newsletter page built at `/newsletter` · 6 upcoming issues listed |
| Website — Sessionize integration | ✅ Added to Talks page + WorkWithMe page |
| LinkedIn — tagline & About | ✅ Content ready — apply manually |
| LinkedIn — Featured section | 🔲 Not updated |
| Content publishing | ✅ 4 articles live — cadence ongoing |
| Newsletter issues | 🔲 6 draft topics identified — none written |
| Conference CFP | 🔲 Not submitted |
| Speaker profile (Sessionize) | ✅ Profile live + `SpeakerProfile.md` created |
| SPEC_KIT.md | ✅ Created — full technical spec for the project |

---

## 1 — Website: Remaining Build Work

### P0 — Real Testimonials ✅ COMPLETE
- [x] Collect 3–5 written quotes from colleagues, mentees, or C-suite peers
  - Target: one senior peer (director/VP level), one team member, one mentee
  - Suggested ask: "3 sentences on working together and one specific result"
- [x] Replace placeholder entries in `pages/home/Testimonials.tsx`

### P2 — Project Logos (BookEx + TrueNorth)
- [ ] Drop `BookEx` logo image into `public/assets/img/gallery/`
- [ ] Drop `TrueNorth` logo image into `public/assets/img/gallery/`
- [ ] Wire filenames into `PROJECTS` array in `constants.ts` with `image` field
  - Estimated effort: 10 minutes once files are available

### P3 — Newsletter Archive Page
- [ ] Create `/newsletter` route and page (`pages/Newsletter.tsx`)
- [ ] Add 6 published issue entries (see Section 4 for topics)
- [ ] Define repeatable issue layout for site display
- [ ] Add route to `App.tsx` and navigation if appropriate

### P3 — Assessment Engine ✅ COMPLETE
All 8 assessments built and live. Hub page at `/assessments` added to nav. DevOps and CognitiveOps are now separate standalone assessments.

| Assessment | Route | Status | Notes |
|------------|-------|--------|-------|
| CognitiveOps Maturity (DevOps+SecOps+FinOps+GenAI) | `/cognitiveops/assessment` | ✅ Built | Flagship 4-domain assessment. Email gate, PDF, 13 questions, Manual→Cognitive layers |
| DevOps Maturity Assessment | `/devops/assessment` | ✅ Built | DevOps-only. 4 pillars × 4 questions, 16 total, Reactive→Elite layers |
| Agile Maturity Assessment | `/agile/assessment` | ✅ Built | 4 pillars × 4 questions, 16 total |
| FinOps Maturity Assessment | `/finops/assessment` | ✅ Built | 4 pillars × 4 questions, 16 total |
| Cloud Security / SecOps Assessment | `/secops/assessment` | ✅ Built | 4 pillars × 4 questions, 16 total |
| GenAI Readiness Assessment | `/genai/assessment` | ✅ Built | 4 pillars × 4 questions, 16 total |
| Well-Architected Framework Assessment | `/architecture/assessment` | ✅ Built | 5 pillars × 3 questions, 15 total |
| Project Management Assessment | `/pm/assessment` | ✅ Built | 4 pillars × 4 questions, 16 total |
| Assessments Hub | `/assessments` | ✅ Built | 8-card grid, nav link, section CTAs |

---

## 2 — LinkedIn: Manual Actions

### Immediate (this week)
- [x] Apply the new tagline: *"Transforming Enterprises Through DevSecOps, FinOps & GenAI | Practice Manager, SLB | Thought Leader & Practitioner | 39+ Certifications | 3,500+ Followers | nThakur.com"*
- [x] Apply the new About section (rewritten version from April 2026 session)
- [ ] Update LinkedIn Featured section with:
  - Link to `/cognitiveops`
  - Link to best published article on nthakur.com
  - Link to `/assessments` (new — good lead gen hook: "Find your maturity layer")
  - Link to speaker kit PDF

### Testimonials / Social Proof
- [ ] DM 5–8 former colleagues requesting a written LinkedIn recommendation
  - Targets: SLB peers, Genpact leadership, mentees with career outcomes to cite

---

## 3 — Content Publishing

### Articles — 4 Published ✅
- BecomingFinOpsCertifiedPractitioner
- CloudComputingFundamentals
- GamifyingDevOpsPipeline
- SecOpsBridgingTheGap

### Next Articles — Keep the Cadence
- [ ] Article 5 — next piece to write and publish to `/articles`

### Ongoing Content Cadence

| Format | Frequency | Platform | Owner |
|--------|-----------|----------|-------|
| Long-form article | 2x / month | nthakur.com | Naval |
| LinkedIn post | 3x / week | LinkedIn | Naval |
| X (Twitter) post | 1x / day | X @nthakur_dot_com | Naval |
| Newsletter issue | Bi-weekly | Email list | Naval |
| YouTube video | 2x / month | YouTube @nthakur | Naval |

**LinkedIn post rhythm:**
- **Monday** — Practitioner insight ("Here's what I learned doing X at SLB...")
- **Wednesday** — Framework or visual (repurpose site content as carousel)
- **Friday** — Community/mentorship ("I reviewed 20 DevOps CVs this month. Here's what I keep seeing...")

**X post rhythm:**
- Short-form takes on DevOps, FinOps, GenAI, and CognitiveOps
- Repurpose LinkedIn posts as threads (split into 3–5 tweets)
- Engage with FinOps Foundation, CNCF, and DevOps community accounts
- Pin thread: CognitiveOps Maturity Model overview → link to nthakur.com/cognitiveops

**YouTube rhythm (2x / month):**
- **Format A — Screen-record explainer** (8–12 min): Walk through a topic with slides or the website open. E.g., "How to use the CognitiveOps Maturity Model in your org"
- **Format B — Whiteboard / talking head** (5–8 min): One concept, no slides. E.g., "Why FinOps fails after the first savings win"
- **Repurpose cadence**: Each newsletter issue → YouTube explainer → LinkedIn clip → X thread
- **SEO hook**: Title cards as "[Topic] Explained for Engineering Leaders" — targets the same AEO/SEO keywords as nthakur.com pages
- **Playlist structure**: CognitiveOps Series · DevOps Maturity · FinOps Practitioner · GenAI in the Enterprise
- **CTA in every video**: Subscribe + link to free assessment at nthakur.com/assessments

---

## 4 — Newsletter: The CognitiveOps Brief

Six draft topics are ready. The goal is one issue every 2 weeks, under 5 minutes to read.

### Draft Issues
- [ ] **Issue 1** — From DevOps to CognitiveOps: What Changes, Really?
- [ ] **Issue 2** — Why Most FinOps Efforts Fail After the First Savings Win
- [ ] **Issue 3** — How to Measure DevOps Maturity Without Gaming the Metrics
- [ ] **Issue 4** — The Hidden Cost of "Good Enough" Cloud Architecture
- [ ] **Issue 5** — What Enterprise Teams Get Wrong About GenAI in Operations
- [ ] **Issue 6** — The Real ROI of Well-Architected Reviews

**Issue template:**
1. Subject line
2. Short framing intro
3. 3–5 practical takeaways
4. One example or lesson from the field
5. One CTA (reply, subscribe, or book time)

**Build tasks:**
- [ ] Write all 6 issues as drafts (Word/Notion/anywhere)
- [ ] Publish to email list via existing Google Apps Script setup
- [ ] Add newsletter archive page to site (see Section 1 P3)

---

## 5 — Speaking & Conference CFPs

### Sessionize Profile
- ✅ Profile live at https://sessionize.com/nthakur/
- ✅ Link added to Talks page and WorkWithMe page on nthakur.com
- ✅ 8 sessions catalogued in `Requirements/SpeakerProfile.md`

### Target Events (pick 1–2 this year)
- [ ] **FinOps X** — FinOps practitioner community, high fit for cloud cost angle
- [ ] **DevOps Enterprise Summit** — transformation + CognitiveOps narrative
- [ ] **KubeCon India / CNCF local chapters** — GenAI + DevOps intersection
- [ ] **Google Cloud Next** — GenAI Leader cert is a strong credential anchor

**Suggested CFP angle:** *"From DevOps to CognitiveOps: What the Next 5 Years Look Like"*  
This positions Naval as ahead of the industry conversation rather than reporting on it.

---

## 6 — Digital Products (Revenue / Lead Gen)

Ordered by effort-to-impact. Build Tier 1 first — these come directly from existing site content.

### Tier 1 — Build from existing content (low effort)
- [ ] **CognitiveOps Playbook** — Compile `/cognitiveops` + assessment content into a 20-page PDF. Gate with email. Free lead magnet.
- [ ] **30 Days of FinOps Guide** — Compile FinOps pages into daily challenge PDF. Email gate.
- [ ] **DevOps Roadmap PDF** — Visual one-page version of the DevOps maturity content. Email gate.
- [ ] **FinOps Cert Prep Pack** — Compile FinOps exam-relevant content into study pack. Email gate.
- [ ] **7 Cs of DevOps Mini-Guide** — Based on the 2018 internal session. Short, shareable PDF.

### Tier 2 — Medium effort
- [ ] **Premium CognitiveOps Assessment Report** — Enhanced version of the existing assessment with team scoring, benchmarking, and a detailed PDF. Priced at $199–$499 per report.
- [ ] **DevSecOps Playbook** — Combine DevOps + SecOps content into a practitioner-focused guide.
- [ ] **GenAI Adoption Framework for Enterprise Teams** — Based on existing GenAI content + CognitiveOps model.
- [ ] **IaC Starter Templates** — Terraform/Bicep templates for the most common architectures in the portfolio.

### Tier 3 — Courses (high effort, recurring revenue)
- [ ] **CognitiveOps Foundations** ($99–$199)
- [ ] **FinOps for Engineers** ($149–$249)
- [ ] **DevSecOps in Practice** ($149–$299)
- [ ] **GenAI for Engineering Leaders** ($199–$299)

### Tier 4 — Subscription / Community (ongoing)
- [ ] **CognitiveOps Brief — Paid tier** ($10–$20/month) — Premium issues with deeper case studies
- [ ] **Monthly Office Hours** ($29–$49/month) — Small group Q&A
- [ ] **Private Slack / Discord community** ($15–$25/month)

**Recommended sequence:** Playbook → 30 Days of FinOps → FinOps Cert Prep → Premium Report → Paid Newsletter

---

## 7 — Book: DevOpsism

A practitioner-first book on DevOps culture, philosophy, and execution — written for engineering leaders who are tired of frameworks that work in theory but fail in production.

### Working Title
**DevOpsism** — *The Practitioner's Manifesto for Modern Engineering Organisations*

### Core Premise
DevOps is not a toolchain. It is not a job title. It is an operating philosophy — and most organisations have bought the tools without adopting the philosophy. DevOpsism is the honest practitioner's guide to what DevOps actually requires, what it actually looks like when it works, and how to get there without lying to yourself about your current state.

### Target Audience
- Engineering managers and directors making the transition from tactical to strategic leadership
- Senior DevOps practitioners who want to lead transformation, not just implement pipelines
- CTOs and VPs evaluating whether their organisation is genuinely agile or performing agility

### Outline (Draft)

| # | Chapter | Core Idea |
|---|---------|-----------|
| 1 | The Philosophy Before the Pipeline | DevOps is a culture first. Tools are the output, not the input. |
| 2 | The 7 Cs in Practice | Continuous Integration through Continuous Feedback — what each C actually costs to do right |
| 3 | The CognitiveOps Maturity Model | The four layers: Manual → Automated → Intelligent → Autonomous. Where you are and how to move. |
| 4 | Why Enterprise Agile Transformations Fail | Structural and incentive mismatches that guarantee failure above the team level |
| 5 | FinOps by Design | Cloud cost accountability built into engineering culture, not bolted on by finance |
| 6 | Security as a First-Class Concern | DevSecOps without the security theatre |
| 7 | GenAI in the Engineering Organisation | What actually changes, what stays the same, and how to avoid the hype traps |
| 8 | Seven Habits of Highly Effective DevOps Teams | The behavioural patterns that separate high-performing teams from firefighting teams |
| 9 | The Honest Debrief | What doesn't work, what I got wrong, and what I'd tell my earlier self |
| 10 | The Practitioner's Manifesto | A closing statement of principles — written to be argued with, not followed blindly |

### Action Items

- [ ] Write a one-page book proposal (audience, premise, differentiation, why now)
- [ ] Draft Chapter 1 — "The Philosophy Before the Pipeline" (3,000–5,000 words)
- [ ] Draft Chapter 3 — CognitiveOps chapter (can pull from existing site content)
- [ ] Draft Chapter 8 — Seven Habits (can pull from PUNKS-2019 session notes)
- [ ] Decide: self-publish (Amazon KDP) vs. traditional publisher (Wiley, O'Reilly, Packt)
- [ ] Research comparable titles (The Phoenix Project, Team Topologies, Accelerate) for positioning
- [ ] Write sample chapter for O'Reilly or Packt submission if going traditional
- [ ] Register nthakur.com/devopsism page once manuscript is underway

### Notes
- Draw heavily from the SpeakerProfile.md abstracts — each session abstract is essentially a chapter outline
- The CognitiveOps Maturity Model is the intellectual centrepiece; the book should make it the canonical reference
- Tone: practitioner-first, honest, no consulting-speak, willing to name failures

---

## Completed — Do Not Revisit

These items are done. Listed here for context only.

| Item | Completed |
|------|-----------|
| Hero headline — "Most enterprises have automated their pipelines..." | Apr 2026 |
| Impact bar — $600K+, 18+ years, 35+ projects | Apr 2026 |
| Newsletter rebrand to "The CognitiveOps Brief" | Apr 2026 |
| CognitiveOps Maturity Assessment — moved to `/cognitiveops/assessment` (standalone) | Apr 2026 |
| DevOps Maturity Assessment — rebuilt as standalone at `/devops/assessment` (16 questions, Reactive→Elite) | Apr 2026 |
| Assessments hub updated to 8 cards; CognitiveOps flagged as flagship | Apr 2026 |
| SEO/AEO — FAQPage + Article JSON-LD schemas on all 4 published articles | Apr 2026 |
| SEO/AEO — HowTo schemas on FinOps cert article and Gamifying DevOps article | Apr 2026 |
| SEO/AEO — SimplePage.tsx extended with `structuredData` and `type` props | Apr 2026 |
| SEO/AEO — Projects.tsx SEO component added (was missing entirely) | Apr 2026 |
| SPEC_KIT.md created — full 15-section technical specification | Apr 2026 |
| Gallery — 24 real event photos, all stock removed | Apr 2026 |
| Talks page — 20+ real appearances with venues and audiences | Apr 2026 |
| Certifications page — 39+ certs with badges and Credly links | Apr 2026 |
| Book Summaries — 13 books with real cover images | Apr 2026 |
| Image path fix — all `/explore/*` and `/about` assets | Apr 2026 |
| LinkedIn About section rewrite | Apr 2026 |
| LinkedIn tagline (content ready — apply manually) | Apr 2026 |
| BrowserRouter — all 50+ URLs real and indexable | Apr 2026 |
| Structured data — JSON-LD on home and key pages | Apr 2026 |
| WCAG contrast fix — secondary-dark on all light backgrounds | Apr 2026 |
| Agile Maturity Assessment (`/agile/assessment`) | Apr 2026 |
| FinOps Maturity Assessment (`/finops/assessment`) | Apr 2026 |
| Cloud Security Assessment (`/secops/assessment`) | Apr 2026 |
| GenAI Readiness Assessment (`/genai/assessment`) | Apr 2026 |
| Well-Architected Assessment (`/architecture/assessment`) | Apr 2026 |
| Project Management Assessment (`/pm/assessment`) | Apr 2026 |
| Assessments hub page (`/assessments`) + nav link | Apr 2026 |
| Assessment CTAs added to DevOps, FinOps, SecOps, GenAI, Architecture pages | Apr 2026 |
| Sessionize URL added to Talks + WorkWithMe pages | Apr 2026 |
| SpeakerProfile.md created with 8 session abstracts | Apr 2026 |
| Real testimonials collected and wired into Testimonials.tsx | Apr 2026 |
| Project logos (bookex.png + TrueNorth.png) wired into constants.ts | Apr 2026 |
| Newsletter page built at `/newsletter` — hero, 6 issue cards, "every issue includes" grid, CTAs | Apr 2026 |
| CognitiveOps Playbook lead magnet page built at `/cognitiveops/playbook` — email gate + client-side PDF | Apr 2026 |
| Talks page — Speaking Topics + Past Appearances converted to 2-column grid layout | Apr 2026 |
| Book Summaries — converted to 3-column vertical card grid | Apr 2026 |
| Mental Models — converted to 3-column grid | Apr 2026 |
| Speaking removed from main nav (covered under Insights > Talks & Webinars) | Apr 2026 |
| sitemap.xml auto-generation — Vite plugin in vite.config.ts regenerates on every build/dev start | Apr 2026 |
