# Naval Thakur — Master Action Plan
*Last updated: April 2026*

This is the single source of truth for all outstanding action items across the website, LinkedIn, content, assessments, and newsletter. Check items off as they're completed.

---

## Quick Status

| Area | Status |
|------|--------|
| Website — core platform | ✅ Complete |
| Website — social proof | 🔲 Testimonials outstanding |
| Website — assessments | 🔄 1 of 5+ built (DevOps/CognitiveOps) |
| Website — newsletter archive | 🔲 Not started |
| LinkedIn — tagline & About | ✅ Content ready — apply manually |
| LinkedIn — Featured section | 🔲 Not updated |
| Content publishing | 🔲 No articles published yet |
| Newsletter issues | 🔲 6 draft topics identified — none written |
| Conference CFP | 🔲 Not submitted |

---

## 1 — Website: Remaining Build Work

### P0 — Real Testimonials
- [ ] Collect 3–5 written quotes from colleagues, mentees, or C-suite peers
  - Target: one senior peer (director/VP level), one team member, one mentee
  - Suggested ask: "3 sentences on working together and one specific result"
- [ ] Replace placeholder entries in `pages/home/Testimonials.tsx`

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

### P3 — Assessment Engine: Additional Assessments
Four assessments from the Digital Product Plan remain to be built. The CognitiveOps Assessment engine (`pages/devops/DevOpsAssessment.tsx`) is the reference implementation.

| Assessment | Route | Status | Notes |
|------------|-------|--------|-------|
| CognitiveOps Maturity (DevOps+SecOps+FinOps+GenAI) | `/cognitiveops/assessment` | ✅ Built | Email gate, PDF, 13 questions |
| Agile Maturity Assessment | `/agile/assessment` | 🔲 Not started | |
| Project Management Assessment | `/projects/assessment` | 🔲 Not started | |
| Well-Architected Framework Assessment | `/architecture/assessment` | 🔲 Not started | |
| FinOps Maturity Assessment | `/finops/assessment` | 🔲 Not started | |
| Cloud Security / SecOps Assessment | `/secops/assessment` | 🔲 Not started | |
| GenAI Readiness Assessment | `/genai/assessment` | 🔲 Not started | |

**Design constraints for each new assessment:**
- Reuse the 7-screen state machine pattern from `DevOpsAssessment.tsx`
- 10–15 scored questions per pillar, 4 maturity layers, email gate before results
- PDF generation via `window.open()` + `document.write()` + `window.print()` (no new deps)
- Each assessment should serve as a lead magnet and consultation funnel

---

## 2 — LinkedIn: Manual Actions

### Immediate (this week)
- [ ] Apply the new tagline: *"Transforming Enterprises Through DevSecOps, FinOps & GenAI | Practice Manager, SLB | Thought Leader & Practitioner | 39+ Certifications | 3,500+ Followers | nThakur.com"*
- [ ] Apply the new About section (rewritten version from April 2026 session)
- [ ] Update LinkedIn Featured section with:
  - Link to `/cognitiveops`
  - Link to best published article on nthakur.com
  - Link to speaker kit PDF

### Testimonials / Social Proof
- [ ] DM 5–8 former colleagues requesting a written LinkedIn recommendation
  - Targets: SLB peers, Genpact leadership, mentees with career outcomes to cite

---

## 3 — Content Publishing

### Month 1 Goal: First Practitioner Article
- [ ] Write and publish one long-form article (1,500+ words) on nthakur.com
  - Suggested angle: *"Here's what I saw when I ran FinOps at a $50B energy company"*
  - Or: *"From DevOps to CognitiveOps: What the Next 5 Years Look Like"*
  - Publish to `/insights` or a new `/articles` section

### Ongoing Content Cadence

| Format | Frequency | Platform | Owner |
|--------|-----------|----------|-------|
| Long-form article | 2x / month | nthakur.com | Naval |
| LinkedIn post | 3x / week | LinkedIn | Naval |
| Newsletter issue | Bi-weekly | Email list | Naval |
| YouTube (screen-record or whiteboard) | 1x / month | YouTube | Naval |

**LinkedIn post rhythm:**
- **Monday** — Practitioner insight ("Here's what I learned doing X at SLB...")
- **Wednesday** — Framework or visual (repurpose site content as carousel)
- **Friday** — Community/mentorship ("I reviewed 20 DevOps CVs this month. Here's what I keep seeing...")

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

## Completed — Do Not Revisit

These items are done. Listed here for context only.

| Item | Completed |
|------|-----------|
| Hero headline — "Most enterprises have automated their pipelines..." | Apr 2026 |
| Impact bar — $600K+, 18+ years, 35+ projects | Apr 2026 |
| Newsletter rebrand to "The CognitiveOps Brief" | Apr 2026 |
| CognitiveOps Maturity Assessment (email gate, PDF, 13 questions) | Apr 2026 |
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
