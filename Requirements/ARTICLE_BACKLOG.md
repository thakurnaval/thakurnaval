# Article Backlog
*Created: 25 November 2026*

Future long-form articles for nthakur.com, in the order to write them. At 2 articles a month (AUTHORITY_PLAN.md, Section 4.1) this covers about a year.

**How to use this file**
- Write from the top. When an article goes live, move its row to **Published** at the bottom and tick it in MASTER_ACTION_PLAN.md Section 3.
- Alternate domains month to month. Don't publish two from the same domain in a row.
- Every article targets one search query (AUTHORITY_PLAN.md, Section 4.1) and links to at least one assessment, guide or toolkit on the site.
- Write with `ARTICLE_TEMPLATE.md`, then publish with `node scripts/generate-article.mjs`.
- **Needs from Naval** is the real example or number that makes the article yours. Without it, the article reads like generic content.
- Rows marked **NL** become newsletter issues, and rows marked **Book** feed a DevOpsism chapter.

---

## Now: Dec 2026 – Feb 2027
These fill the gaps the plans name: CognitiveOps and SecOps, plus newsletter issues 1, 2, 3 and 5.

| # | Title | Domain | Search target | Links to | Reuse | Needs from Naval |
|---|-------|--------|---------------|----------|-------|------------------|
| 1 | From DevOps to CognitiveOps: What Changes, Really? | CognitiveOps | cognitiveops maturity model | /cognitiveops, /cognitiveops/assessment, /talks/devops-to-cognitiveops | NL 1 · CFP talk · Book ch 3 | One team you saw move from automated to intelligent |
| 2 | Cognitive DevSecOps: Security That Reasons, Not Just Scans | SecOps | cognitive devsecops | /secops/cognitive-devsecops, /secops/devsecops-playbook, /secops/assessment | Book ch 6 | A pipeline security finding that a rules-only scan would have missed |
| 3 | Why Most FinOps Efforts Fail After the First Savings Win | FinOps | finops practitioner guide | /finops/culture, /finops/30-day-guide, /explore/toolkits/finops-cost-review | NL 2 · Book ch 5 · case study | What happened after the first savings at SLB ($600K+ story) |
| 4 | How to Measure DevOps Maturity Without Gaming the Metrics | DevOps | devops maturity model enterprise | /devops/maturity, /devops/assessment, /devops/roadmap-guide | NL 3 | A metric you saw gamed, and what replaced it |
| 5 | What Enterprise Teams Get Wrong About GenAI in Operations | GenAI | genai enterprise operations | /genai/adoption-framework, /genai/assessment, /talks/genai-enterprise-operations-patterns | NL 5 · Book ch 7 | A GenAI pilot that stalled, and why |
| 6 | Your Layer Is Not Where You Think It Is: 5 CognitiveOps Misdiagnoses | CognitiveOps | ai ops maturity | /cognitiveops/assessment, /cognitiveops/playbook | LinkedIn "Layer Check" series | Patterns from people who took the assessment |

## Next: Mar – May 2027

| # | Title | Domain | Search target | Links to | Reuse | Needs from Naval |
|---|-------|--------|---------------|----------|-------|------------------|
| 7 | The Hidden Cost of "Good Enough" Cloud Architecture | Architecture | cloud architecture best practices | /architecture/cloud-architecture, /architecture/assessment | NL 4 | A shortcut that became expensive a year later |
| 8 | Threat Modelling in a Sprint: STRIDE Without the Ceremony | SecOps | shift left security framework | /secops/threat-modeling, /secops/assessment | — | A threat model you ran in under a day |
| 9 | LLMOps in Practice: Versioning, Evaluating and Rolling Back Models | GenAI | llmops framework | /genai/llmops, /ai-sdlc/deployment | — | How you'd handle (or did handle) a bad model release |
| 10 | Unit Economics for Engineers: Picking the One Cost Metric That Matters | FinOps | unit economics cloud | /finops/unit-economics, /finops/assessment | — | A unit cost you defined and what decision it changed |
| 11 | The Real ROI of Well-Architected Reviews | Architecture | well-architected review | /architecture/assessment, /explore/toolkits/reviews-and-meetings | NL 6 | Findings from a review and what they saved |
| 12 | Moving from Layer 2 to Layer 3: What It Actually Takes | CognitiveOps | devops maturity layers | /cognitiveops, /cognitiveops/assessment | Book ch 3 | Time, people and tools a Layer 2 → 3 move needed |

## Later: Jun 2027 onwards
Rough order. Reprioritise each quarter from Search Console queries and which assessments get the most leads (MEASUREMENT.md).

| # | Title | Domain | Search target | Links to | Reuse |
|---|-------|--------|---------------|----------|-------|
| 13 | Tagging Strategy: The Boring Work That Decides Every FinOps Number | FinOps | cloud cost allocation tagging | /finops/cost-visibility | — |
| 14 | RAG or Not: When Retrieval Is the Wrong Answer | GenAI | rag architecture enterprise | /genai/rag | — |
| 15 | Least Privilege in Practice: How Cloud IAM Actually Fails | SecOps | cloud iam least privilege | /secops/cloud-security | — |
| 16 | AI in the SDLC: Where It Pays Off First | AI-SDLC | ai in sdlc | /ai-sdlc/field-guide, /ai-sdlc/code-review | — |
| 17 | What Breaks at Scale That Worked in the Pilot | DevOps | devops transformation framework | /devops/practices, /explore/toolkits/incident-review | Book ch 9 ("honest debrief") |
| 18 | SAST and DAST Triage Without Drowning | SecOps | sast vs dast | /secops/sast-dast | — |
| 19 | AI Agents in the Enterprise: Guardrails, Tool Use and Trust | GenAI | ai agents enterprise | /genai/agents, /explore/toolkits/ai-use-case-selection | — |
| 20 | Why Enterprise Agile Transformations Fail Above the Team | Agile | enterprise agile transformation | /agile/assessment, /talks/enterprise-wide-agility | Book ch 4 |
| 21 | Reserved Instances vs Savings Plans: A Decision Framework | FinOps | savings plans vs reserved instances | /finops/optimization, /finops/cert-prep | — |
| 22 | Writing a GenAI Policy That Enables Instead of Blocks | GenAI | genai governance policy | /genai/governance | — |
| 23 | Seven Habits of Highly Effective DevOps Teams | DevOps | high performing devops teams | /talks/seven-habits-devops-teams, /explore/toolkits/team-health-check | Book ch 8 |
| 24 | Building a Cloud Centre of Excellence That Isn't a Committee | FinOps / Architecture | cloud centre of excellence | /finops/framework, /architecture/it-governance | — |
| 25 | The 7 Cs, One at a Time (series, one C per article) | DevOps | 7 cs of devops | /devops/7cs, /talks/7cs-of-devops | LinkedIn carousels |

## AI-native engineering: proposed 25 Nov 2026
These titles respond to two practitioners: Matt Pocock's agent skills (github.com/mattpocock/skills, "Skills For Real Engineers") and Andrej Karpathy's move from "vibe coding" (Feb 2025) to "agentic engineering" (Feb 2026). They are commentary written from Naval's own practice, not summaries. Credit and link the originals in each article. **Suggested slots:** write #26 in the Now block (in place of #6, which moves to Next), put #27 and #28 in Next, and treat the rest as Later.

| # | Title | Built on | Search target | Links to | Needs from Naval |
|---|-------|----------|---------------|----------|------------------|
| 26 | The Autonomy Slider: How Much Should Your Coding Agent Decide? | Karpathy's "autonomy slider" and partial-autonomy apps (Software 3.0 talk, 2025), mapped onto the CognitiveOps layers Manual → Automated → Intelligent → Autonomous | ai coding agent autonomy | /cognitiveops, /ai-sdlc/field-guide, /cognitiveops/assessment | Where you set the slider for different kinds of work, and why |
| 27 | Grill Before You Build: AI Coding Starts With an Interview, Not a Prompt | Pocock's `grill-me` / `grill-with-docs`: the agent questions you until the design is settled, before any code | ai requirements gathering | /ai-sdlc/requirements, /explore/toolkits/architecture-decisions | A time an agent confidently built the wrong thing |
| 28 | Keep the Agent on a Leash: The Generation–Verification Loop | Karpathy: small increments, keep the human verify step fast. Also the verification bottleneck now that agents write most of the code | ai code review | /ai-sdlc/code-review, /ai-sdlc/testing | How your team reviews agent-written PRs; what slipped through |
| 29 | Spec-Kit or Small Skills? How Much Process to Give Your Coding Agent | Pocock argues that process-heavy frameworks (Spec-Kit, BMAD, GSD) "take away your control"; you use Spec-Kit in your own projects | spec driven development ai | /ai-sdlc/field-guide, /ai-sdlc/requirements | Your honest experience of both: where Spec-Kit helped and where it got in the way |
| 30 | TDD Is Back: Why Agents Need Red-Green-Refactor More Than People Do | Pocock's `tdd` skill and feedback-loop principle: tests are the agent's eyes | tdd with ai agents | /ai-sdlc/testing, /devops/practices | A bug that a failing test would have stopped the agent from shipping |
| 31 | From Vibe Coding to Agentic Engineering: What Actually Changed | Karpathy coined "vibe coding" (Feb 2025), then said by Jan 2026 he wrote ~80% of his code with agents and called the practice "agentic engineering" | agentic engineering | /ai-sdlc/field-guide, /genai/agents | Your own before/after split, and what it means for hiring and juniors |
| 32 | Context Engineering: The Core Skill in the AI-Native SDLC | Karpathy's "context engineering" (2025), plus Pocock's shared glossary (GLOSSARY.md) and `writing-for-agents`: what goes in CLAUDE.md/AGENTS.md | context engineering | /ai-sdlc/coding, /genai/prompt-engineering | What's in your own CLAUDE.md files and why |

## AI tooling ecosystems and tokenomics: proposed 25 Nov 2026
These cover the community-curated lists: **github/awesome-copilot** (GitHub's own repo of Copilot instructions, prompts, agents and skills) and **hesreallyhim/awesome-claude-code** (skills, hooks, slash commands, orchestrators and plugins). Don't just re-list them; say what to adopt, what to skip and how to govern it. Tokenomics here means the cost of LLM tokens, not crypto. Make that clear in the first line, because the word also ranks for crypto. **Suggested slots:** #37 in Next (it is FinOps and GenAI at once, and nobody owns the angle yet), #36 straight after #28, and the rest as Later.

| # | Title | Domain | Search target | Links to | Needs from Naval |
|---|-------|--------|---------------|----------|------------------|
| 33 | Inside awesome-copilot: The Instructions, Prompts and Agents Worth Adopting | AI-SDLC | awesome copilot | /ai-sdlc/coding, /ai-sdlc/field-guide | The 5 entries you'd actually roll out to a team, and why |
| 34 | Inside awesome-claude-code: Skills, Hooks and Commands for Real Teams | AI-SDLC | awesome claude code | /ai-sdlc/coding, /ai-sdlc/code-review | What you run in your own setup (skills, hooks, CLAUDE.md) |
| 35 | Copilot or Claude Code? Reading Two Ecosystems Through Their Awesome Lists | AI-SDLC | copilot vs claude code | /ai-sdlc/field-guide, /genai/assessment | Where each one fits in an enterprise you've worked in |
| 36 | Community Skills Are Supply Chain: Governing Third-Party Prompts, Hooks and MCP Servers | SecOps | ai agent supply chain security | /secops/devsecops-playbook, /secops/continuous-security, /genai/governance | An allow-list or review rule you'd set for a team |
| 37 | Tokenomics: The FinOps of LLMs | FinOps / GenAI | llm cost optimization | /finops/unit-economics, /genai/llmops, /explore/toolkits/finops-cost-review | Real numbers: cost per task before and after caching or model routing |
| 38 | What Does an AI Coding Agent Really Cost? Seats, Tokens and Outcomes | FinOps / AI-SDLC | ai coding assistant cost | /finops/unit-economics, /ai-sdlc/field-guide | Your team's monthly spend set against what it delivered |

**Tokenomics (#37) outline idea:** start from tokens (input vs output vs cached), move to cost per task, then cost per outcome. Cover the levers: prompt caching, model routing (small model first), context trimming, batch processing and output limits. Then the FinOps practice: tagging LLM spend by team and use case, budgets and alerts, and showback. Close with the CognitiveOps link: autonomous agents make token spend a runtime cost, not a seat licence.

**Case studies** (SLB FinOps, DevSecOps transformation, GenAI adoption) are tracked separately in MASTER_ACTION_PLAN.md Section 8. They need real engagement details and don't follow the article template.

---

## Published
Already live, so don't propose these again.

| Article | Domain | Published |
|---------|--------|-----------|
| Becoming a FinOps Certified Practitioner | FinOps | before Jul 2026 |
| Cloud Computing Fundamentals | Architecture | before Jul 2026 |
| Gamifying the DevOps Pipeline | DevOps | before Jul 2026 |
| SecOps: Bridging the Gap | SecOps | before Jul 2026 |
| Blameless Incident Review | DevOps | Nov 2026 |
| Architecture Decision Records | Architecture | Nov 2026 |
| Platform Engineering Strategy | DevOps | Nov 2026 |
| Better Technical Reviews and Meetings | Ways of working | Nov 2026 |
| Monthly FinOps Cost Review | FinOps | Nov 2026 |
| Choosing AI Use Cases | GenAI | Nov 2026 |
| Team Health Check | Ways of working | Nov 2026 |
