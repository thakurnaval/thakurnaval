# Content review pack

Everything added to nthakur.com in November 2026, for review: 6 new pages and all 80 pillar plans shown in the five assessment results. The plans only appear after someone completes an assessment, so this file is the easiest way to read them all.

Generated from the plan files in the repo. To change a plan, edit the file named under each assessment; the results screens and PDF reports pick it up on the next deploy.

## Contents

- [New guides and pages](#new-guides-and-pages)
- [DevOps](#devops)
- [FinOps](#finops)
- [Cloud Security (SecOps)](#cloud-security-secops)
- [GenAI Readiness](#genai-readiness)
- [CognitiveOps](#cognitiveops)

## New guides and pages

| Page | Link | Format | What's in it |
| --- | --- | --- | --- |
| **AI-Native SDLC Field Guide** | [nthakur.com/ai-sdlc/field-guide](https://nthakur.com/ai-sdlc/field-guide) | 7-page PDF, plus a 12-question readiness check on the page | Original guide in your voice: 5-level ladder across 6 SDLC stages, advise / enforce / approve controls, metrics, 90-day plan. Credits the Anthropic playbook as further reading. |
| **DevSecOps Playbook** | [nthakur.com/secops/devsecops-playbook](https://nthakur.com/secops/devsecops-playbook) | 6-page PDF | Six pipeline stages with controls, example tools, gates and metrics; a Rego starter rule; finding SLAs; securing AI-assisted development; 90-day rollout. |
| **GenAI Adoption Framework** | [nthakur.com/genai/adoption-framework](https://nthakur.com/genai/adoption-framework) | 5-page PDF | Explore, Experiment, Embed, Scale, Lead; six dimensions; use-case scoring; risk tiers; operating model; 90-day plan. |
| **Terraform & Bicep Starter Templates** | [nthakur.com/architecture/iac-templates](https://nthakur.com/architecture/iac-templates) | 5 templates, copy and download on the page | GCP Cloud Run with keyless GitHub deploys; Azure baseline with enforced tags; AWS state backend; Bicep Container App; Terraform plan workflow. |
| **DevOpsism** | [nthakur.com/devopsism](https://nthakur.com/devopsism) | Book page and early-reader list | Premise, audience and the 10-chapter draft outline from your action plan. No publication date promised. |
| **Premium CognitiveOps Report** | [nthakur.com/cognitiveops/premium-report](https://nthakur.com/cognitiveops/premium-report) | Register-interest page | Records demand. Also shown as a card under the free CognitiveOps results. |

## DevOps

Take it: [nthakur.com/devops/assessment](https://nthakur.com/devops/assessment) · Edit: `pages/devops/devopsPlans.ts`

### Delivery Pipeline

| Layer | What it looks like | Next actions | Next layer reached when… | Links to |
| --- | --- | --- | --- | --- |
| **L1** Reactive | Builds and releases depend on a few people and manual steps; every release is an event. | 1. Put every service under one CI pipeline that builds and runs unit tests on each commit to main.<br>2. Write the release steps down, then script the first three of them. Pick the steps that cause the most failed releases. | every change to main is built and tested automatically, and anyone on the team can release. | [DevOps Maturity Roadmap](https://nthakur.com/devops/roadmap-guide) |
| **L2** Repeatable | CI exists, but deploying to production is still a separate, partly manual process. | 1. Extend the pipeline to deploy to a test environment automatically, then promote the same artifact to production.<br>2. Start measuring lead time and deployment frequency, the first two DORA metrics, from pipeline data. | one artifact flows from commit to production through the pipeline, with lead time measured in days, not weeks. | [DevOps practices](https://nthakur.com/devops/practices) |
| **L3** Accelerating | Continuous delivery works; releases are frequent but still carry risk when they go wrong. | 1. Introduce progressive delivery for your riskiest service: feature flags or canary releases with automatic rollback.<br>2. Make rollback a single, rehearsed command and test it monthly in staging. | releases are routine, small and reversible, and change failure rate stays under 15%. | [AI-Native SDLC Field Guide](https://nthakur.com/ai-sdlc/field-guide) |
| **L4** Elite | Deploying on demand is normal and the pipeline is a product with its own owners. | 1. Add AI-assisted steps where judgement is needed: build-failure triage, changelog drafting, first-pass PR review.<br>2. Publish pipeline health metrics (queue time, flaky-test rate) and treat regressions as incidents. | **Stretch:** let agents prepare releases end to end up to a human-authorised production gate. | [AI-Native SDLC Field Guide](https://nthakur.com/ai-sdlc/field-guide) |

### Infrastructure & Platform

| Layer | What it looks like | Next actions | Next layer reached when… | Links to |
| --- | --- | --- | --- | --- |
| **L1** Reactive | Environments are built by hand and drift apart; nobody is sure production matches staging. | 1. Capture one environment in Terraform or Bicep, starting with the network and the most-changed resources.<br>2. Store state remotely with locking and stop all manual changes to that environment. | a new environment can be created from code in hours, and drift is the exception. | [Platform engineering](https://nthakur.com/devops/platform-engineering) |
| **L2** Repeatable | Infrastructure is mostly in code, but each team writes its own and reviews are inconsistent. | 1. Extract shared modules (network, compute, database) with sensible, secure defaults.<br>2. Run plan output and policy checks (cost, tagging, security) on every infrastructure pull request. | teams compose infrastructure from shared modules and policy failures block merges. | [Platform engineering](https://nthakur.com/devops/platform-engineering) |
| **L3** Accelerating | Shared modules and pipelines exist; teams still wait on a platform team for new services. | 1. Build a golden path: a template that creates a repo, pipeline, environment and dashboards in one step.<br>2. Measure time from "new service" request to first production deploy, and make it a platform-team goal. | a team can launch a production-ready service on its own in under a day. | [Platform engineering](https://nthakur.com/devops/platform-engineering) |
| **L4** Elite | A self-service internal platform exists and is treated as a product. | 1. Survey platform users quarterly and publish a roadmap driven by their friction points.<br>2. Add drift detection and automated, policy-checked remediation for low-risk resources. | **Stretch:** let developers describe intent ("a queue with a dead-letter topic") and have the platform generate reviewed IaC. | [Terraform/Bicep starter templates](https://nthakur.com/architecture/iac-templates) |

### Observability & Reliability

| Layer | What it looks like | Next actions | Next layer reached when… | Links to |
| --- | --- | --- | --- | --- |
| **L1** Reactive | You find out about outages from users; logs are scattered and alerts are noise. | 1. Centralise logs and basic metrics for your most important service.<br>2. Add a synthetic check on the main user journey and route its alert to whoever is on call. | the team usually knows about an incident before customers report it. | [SRE practices](https://nthakur.com/devops/sre) |
| **L2** Repeatable | Dashboards and alerts exist, but alerting is threshold-based and on-call is tiring. | 1. Define two or three SLOs per critical service (availability, latency) with an error budget.<br>2. Delete or downgrade any alert nobody acted on in the last month. | paging is driven by SLO burn rate and most pages need action. | [SRE practices](https://nthakur.com/devops/sre) |
| **L3** Accelerating | SLOs and tracing are in place; incidents are handled well but lessons do not always stick. | 1. Run blameless post-mortems for every SEV1/SEV2 and track actions to completion.<br>2. Use error budgets in planning: when a budget is spent, reliability work comes first. | repeat incidents of the same class are rare and error budgets shape the roadmap. | [Chaos engineering](https://nthakur.com/devops/chaos-engineering) |
| **L4** Elite | Reliability is engineered and measured; incidents are rare and recoveries fast. | 1. Run game days and controlled chaos experiments on critical paths each quarter.<br>2. Let an agent diagnose read-only when an SLO breaches and draft the post-mortem for review. | **Stretch:** turn every incident into a regression check so the same failure cannot ship twice. | [AI-Native SDLC Field Guide](https://nthakur.com/ai-sdlc/field-guide) |

### Culture & Collaboration

| Layer | What it looks like | Next actions | Next layer reached when… | Links to |
| --- | --- | --- | --- | --- |
| **L1** Reactive | Dev and Ops work in separate queues and hand work over through tickets. | 1. Put one operations engineer in a product team for a quarter and share the on-call rota.<br>2. Hold a monthly blameless review of one failed release with both groups in the room. | teams that build a service also share responsibility for running it. | [The 7 Cs of DevOps](https://nthakur.com/devops/7cs) |
| **L2** Repeatable | Collaboration happens, but it depends on goodwill rather than shared goals. | 1. Give product teams shared outcome metrics: DORA plus one customer metric.<br>2. Make post-mortems and design docs open by default across teams. | teams plan against shared metrics and learning moves between teams without being pushed. | [The 7 Cs of DevOps](https://nthakur.com/devops/7cs) |
| **L3** Accelerating | Teams own their services end to end and improve continuously. | 1. Fund a community of practice with time, not just a Slack channel: one afternoon a fortnight.<br>2. Track developer experience (survey plus cycle time) and act on the worst friction point each quarter. | improvement is part of every team's plan, not a side project. | [Seven habits of DevOps teams](https://nthakur.com/talks/seven-habits-devops-teams) |
| **L4** Elite | High-trust, learning culture; teams experiment freely and share what they learn. | 1. Coach other parts of the organisation (security, finance, data) using the same practices.<br>2. Pair engineers with AI agents deliberately: agree team norms for plan-first work and review. | **Stretch:** extend DevOps ways of working into FinOps, SecOps and GenAI: the CognitiveOps model. | [CognitiveOps Model](https://nthakur.com/cognitiveops) |

## FinOps

Take it: [nthakur.com/finops/assessment](https://nthakur.com/finops/assessment) · Edit: `pages/finops/finopsPlans.ts`

### Visibility & Tagging

| Layer | What it looks like | Next actions | Next layer reached when… | Links to |
| --- | --- | --- | --- | --- |
| **L1** Crawl | You see one bill per account or subscription and cannot say which product or team spent what. | 1. Agree a minimum tagging standard of four tags: owner, product, environment, cost centre.<br>2. Enforce it on new resources with policy (Azure Policy, AWS SCP/Tag Policies, GCP org policy), and report untagged spend weekly. | at least 80% of spend is allocated to an owner and a product. | [Cost visibility](https://nthakur.com/finops/cost-visibility) |
| **L2** Walk | Most spend is tagged; reports exist but are built by hand and arrive late. | 1. Automate a daily cost dashboard per team from billing exports, with no spreadsheets in the loop.<br>2. Allocate shared costs (networking, platform, support) with a simple, published rule. | every team sees its own costs daily without asking finance. | [Cost visibility](https://nthakur.com/finops/cost-visibility) |
| **L3** Run | Allocation is accurate and timely; costs are visible but not yet tied to business value. | 1. Define one unit cost per product, such as cost per customer, transaction or GB processed.<br>2. Show unit cost next to the product's business KPIs in its regular review. | product decisions are discussed in unit-cost terms, not just total spend. | [Unit economics](https://nthakur.com/finops/unit-economics) |
| **L4** Fly | Unit economics are tracked and understood across products. | 1. Add anomaly detection on unit cost, not just total spend, with alerts routed to owners.<br>2. Estimate the cost impact of architecture changes on the pull request. | **Stretch:** make cost a design-time input: every significant spec carries a cost estimate. | [AI-Native SDLC Field Guide](https://nthakur.com/ai-sdlc/field-guide) |

### Accountability & Culture

| Layer | What it looks like | Next actions | Next layer reached when… | Links to |
| --- | --- | --- | --- | --- |
| **L1** Crawl | Cloud cost is "finance's problem"; engineers rarely see the bill. | 1. Name a cost owner for every product and share a monthly one-page cost summary with them.<br>2. Run a 60-minute FinOps basics session for engineering leads. | every product has an owner who can explain its cost trend. | [FinOps culture](https://nthakur.com/finops/culture) |
| **L2** Walk | Owners exist, but cost conversations happen only when bills spike. | 1. Hold a monthly cost review per product: trend, top three drivers, one action.<br>2. Celebrate savings publicly, credited to the team that made them. | teams act on cost without being asked, and savings are visible. | [FinOps culture](https://nthakur.com/finops/culture) |
| **L3** Run | Teams manage their own cost; finance, engineering and product collaborate regularly. | 1. Give teams budgets with forecasts they own, and review the variance together.<br>2. Include cost efficiency in engineering objectives alongside reliability and speed. | cost is one of the standard trade-offs teams weigh in planning. | [30 Days of FinOps](https://nthakur.com/finops/30-day-guide) |
| **L4** Fly | FinOps is part of how the organisation works, not a separate programme. | 1. Train a FinOps champion in every engineering team; certification helps.<br>2. Share benchmarks and practices with peers in the FinOps community. | **Stretch:** connect cost, carbon and value: report emissions per unit alongside cost per unit. | [FinOps certification prep](https://nthakur.com/finops/cert-prep) |

### Optimisation

| Layer | What it looks like | Next actions | Next layer reached when… | Links to |
| --- | --- | --- | --- | --- |
| **L1** Crawl | Resources are sized once and left running; idle and oversized resources are common. | 1. Schedule non-production environments to shut down outside working hours.<br>2. Act on the top 10 rightsizing recommendations from your cloud provider's advisor. | obvious waste (idle, unattached, oversized) is cleaned up routinely. | [Optimisation strategies](https://nthakur.com/finops/optimization) |
| **L2** Walk | Waste is cleaned up periodically; commitments are bought ad hoc. | 1. Build a commitment strategy (savings plans or reserved instances) based on steady-state usage, and review it monthly.<br>2. Track optimisation recommendations as tickets with owners and due dates. | commitment coverage and utilisation are measured and above 70%. | [Optimisation strategies](https://nthakur.com/finops/optimization) |
| **L3** Run | Optimisation is continuous and commitments are well managed. | 1. Move from resource tuning to architecture: storage tiering, autoscaling, managed services, spot for tolerant workloads.<br>2. Automate low-risk actions such as deleting unattached disks and old snapshots. | most savings now come from architecture and automation, not manual clean-ups. | [Optimisation strategies](https://nthakur.com/finops/optimization) |
| **L4** Fly | Optimisation is automated and engineered in. | 1. Use ML-based commitment and rightsizing tools, with human approval for large changes.<br>2. Add cost and efficiency checks to the platform's golden paths so new services start optimised. | **Stretch:** let agents propose optimisation PRs within guardrails you set. | [CognitiveOps Model](https://nthakur.com/cognitiveops) |

### Forecasting & Planning

| Layer | What it looks like | Next actions | Next layer reached when… | Links to |
| --- | --- | --- | --- | --- |
| **L1** Crawl | Budgets are set annually from last year's bill; forecasts are rare or absent. | 1. Produce a simple monthly run-rate forecast per product from the last 90 days.<br>2. Agree budget alert thresholds (50/80/100%) with owners. | every product has a forecast and nobody is surprised by the monthly bill. | [Forecasting](https://nthakur.com/finops/forecasting) |
| **L2** Walk | Forecasts exist but are trend-based and miss business changes. | 1. Add business drivers (users, transactions, launches) to the forecast for your top products.<br>2. Review forecast accuracy monthly and record why it missed. | forecasts land within 10–15% of actuals for the main products. | [Forecasting](https://nthakur.com/finops/forecasting) |
| **L3** Run | Driver-based forecasts are accurate and used in planning. | 1. Model scenarios for big decisions: a new region, a migration, a pricing change.<br>2. Tie commitments and capacity planning to the forecast, not to last month. | investment decisions include a cloud cost scenario as standard. | [Unit economics](https://nthakur.com/finops/unit-economics) |
| **L4** Fly | Forecasting is driver-based, continuous and trusted by finance. | 1. Automate rolling forecasts with ML, keeping driver assumptions visible and editable.<br>2. Feed forecasts into pricing and margin discussions with product leadership. | **Stretch:** forecast unit cost by feature so product can price new capabilities before building them. | [Unit economics](https://nthakur.com/finops/unit-economics) |

## Cloud Security (SecOps)

Take it: [nthakur.com/secops/assessment](https://nthakur.com/secops/assessment) · Edit: `pages/secops/secopsPlans.ts`

### Identity & Access

| Layer | What it looks like | Next actions | Next layer reached when… | Links to |
| --- | --- | --- | --- | --- |
| **L1** Reactive | Shared accounts, long-lived keys and broad admin rights are common. | 1. Enforce MFA for every human identity and remove shared admin accounts.<br>2. Find and rotate long-lived access keys; replace pipeline secrets with workload identity (OIDC) where possible. | every action traces to a named identity, and no human uses standing admin rights day to day. | [Cloud security](https://nthakur.com/secops/cloud-security) |
| **L2** Proactive | MFA and SSO are in place, but permissions are broad and rarely reviewed. | 1. Run a quarterly access review for privileged roles, with owners attesting.<br>2. Introduce just-in-time elevation for production admin access. | privileged access is time-bound and reviewed, and unused permissions are removed. | [Security principles](https://nthakur.com/secops/principles) |
| **L3** Predictive | Least privilege is the norm and privileged access is controlled. | 1. Use access analysers to right-size roles automatically from actual usage.<br>2. Apply zero-trust policies: device posture and context in access decisions. | permissions shrink continuously to what is used, without manual effort. | [Zero trust for cloud native](https://nthakur.com/talks/zero-trust-cloud-native) |
| **L4** Autonomous | Identity is the perimeter; access is contextual and continuously verified. | 1. Give AI agents their own identities with scoped, short-lived credentials and no self-approval.<br>2. Detect anomalous identity behaviour and revoke sessions automatically. | **Stretch:** treat every non-human identity (pipelines, agents, services) with the same rigour as people. | [AI-Native SDLC Field Guide](https://nthakur.com/ai-sdlc/field-guide) |

### Threat Detection

| Layer | What it looks like | Next actions | Next layer reached when… | Links to |
| --- | --- | --- | --- | --- |
| **L1** Reactive | Logs are not centralised; attacks would likely be found by accident. | 1. Turn on cloud-native threat detection (GuardDuty, Defender for Cloud, Security Command Center) in every account.<br>2. Centralise audit logs in an account nobody can tamper with. | security alerts reach a named team, and audit logs are complete and protected. | [Continuous security](https://nthakur.com/secops/continuous-security) |
| **L2** Proactive | Detection tools run, but alerts are noisy and triage is manual. | 1. Tune the top 20 alert rules by volume and suppress known-benign patterns.<br>2. Write runbooks for your five most common alert types. | most alerts are actionable and triaged within agreed times. | [Security automation](https://nthakur.com/secops/automation) |
| **L3** Predictive | Detection is tuned and triage is consistent. | 1. Map detections to MITRE ATT&CK and close coverage gaps for your threat model.<br>2. Automate enrichment (asset owner, exposure, recent changes) on every alert. | coverage is measured against known techniques and enrichment is automatic. | [Threat modelling](https://nthakur.com/secops/threat-modeling) |
| **L4** Autonomous | Detection is broad, enriched and partly automated. | 1. Use AI to correlate weak signals across sources into incidents, with analysts confirming.<br>2. Run purple-team exercises quarterly to test detections. | **Stretch:** let an agent produce the first investigation summary for every high-severity alert. | [Security automation](https://nthakur.com/secops/automation) |

### Compliance & Policy

| Layer | What it looks like | Next actions | Next layer reached when… | Links to |
| --- | --- | --- | --- | --- |
| **L1** Reactive | Compliance is a yearly audit scramble; policies live in documents. | 1. Pick one framework (CIS benchmark, ISO 27001 or SOC 2) and baseline your cloud against it with a posture tool.<br>2. Fix the critical findings and record exceptions with owners and expiry dates. | you know your posture score and every exception has an owner. | [Cloud security](https://nthakur.com/secops/cloud-security) |
| **L2** Proactive | Posture is measured, but fixes depend on people chasing teams. | 1. Express your top policies as code (Azure Policy, OPA, Sentinel) and enforce them in pipelines.<br>2. Scan IaC and container images in CI and block critical findings. | violations are blocked before deployment, not found afterwards. | [DevSecOps practices](https://nthakur.com/secops/devsecops-practices) |
| **L3** Predictive | Policy-as-code is enforced and evidence is mostly automatic. | 1. Generate audit evidence continuously from pipelines and posture tools.<br>2. Produce an SBOM for every build and track vulnerable dependencies to fix. | audits use continuously collected evidence instead of a scramble. | [SAST and DAST](https://nthakur.com/secops/sast-dast) |
| **L4** Autonomous | Compliance is continuous and largely automated. | 1. Map controls across frameworks once and reuse the evidence for each audit.<br>2. Encode security standards as agent skills so AI-written code follows them by default. | **Stretch:** auto-remediate low-risk policy drift and route the rest to owners with a proposed fix. | [DevSecOps Playbook](https://nthakur.com/secops/devsecops-playbook) |

### Incident Response

| Layer | What it looks like | Next actions | Next layer reached when… | Links to |
| --- | --- | --- | --- | --- |
| **L1** Reactive | There is no tested incident plan; response depends on who is available. | 1. Write a one-page incident response plan: roles, severity levels, contacts, first steps.<br>2. Run a tabletop exercise for a credential-leak scenario. | everyone knows their role in an incident and the plan has been rehearsed once. | [Continuous security](https://nthakur.com/secops/continuous-security) |
| **L2** Proactive | A plan exists and has been tested, but containment is slow and manual. | 1. Automate the first containment steps (disable keys, isolate instance, snapshot disk) as runbooks.<br>2. Hold blameless post-incident reviews with tracked actions. | containment for common incidents starts within minutes. | [Security automation](https://nthakur.com/secops/automation) |
| **L3** Predictive | Response is practised, measured and partly automated. | 1. Measure time to detect and time to contain, and set targets for both.<br>2. Run quarterly exercises covering cloud, identity and supply-chain scenarios. | detection and containment times are tracked and improving. | [Container security](https://nthakur.com/secops/container-security) |
| **L4** Autonomous | Response is fast, automated where safe and continuously improved. | 1. Let an agent assemble the incident timeline and draft the report while responders act.<br>2. Feed every incident back into detections, policies and training. | **Stretch:** pre-approved automated containment for well-understood incident types, with humans approving the rest. | [Cognitive DevSecOps](https://nthakur.com/secops/cognitive-devsecops) |

## GenAI Readiness

Take it: [nthakur.com/genai/assessment](https://nthakur.com/genai/assessment) · Edit: `pages/genai/genaiPlans.ts`

### Foundation & Data

| Layer | What it looks like | Next actions | Next layer reached when… | Links to |
| --- | --- | --- | --- | --- |
| **L1** Exploring | There is no approved way to use AI models, and data is not ready for AI use. | 1. Provide one approved, enterprise-grade AI tool with data-protection terms, so people stop using personal accounts.<br>2. Identify one high-value document set (policies, runbooks, product docs) and check its quality and ownership. | staff have a sanctioned tool and you know which data is usable for AI. | [GenAI fundamentals](https://nthakur.com/genai/fundamentals) |
| **L2** Experimenting | Approved tools exist; data for AI use cases is gathered by hand for each project. | 1. Build one retrieval (RAG) service over a curated document set with access controls carried through.<br>2. Set up an evaluation set of 30–50 real questions with expected answers. | one production AI use case runs on governed data with measured answer quality. | [RAG architecture](https://nthakur.com/genai/rag) |
| **L3** Scaling | A reusable AI platform (models, retrieval, evaluation) supports several use cases. | 1. Add LLMOps basics: prompt and model versioning, cost tracking per use case, regression evals on change.<br>2. Classify data for AI use and enforce it in the retrieval layer. | new use cases launch on the shared platform in weeks, with cost and quality visible. | [LLMOps](https://nthakur.com/genai/llmops) |
| **L4** Leading | The AI platform is mature and governed, and data is AI-ready by design. | 1. Expose platform capabilities to agents through managed tools (MCP or similar) with allowlists.<br>2. Track model and provider choices against cost, latency and quality, and switch when it pays. | **Stretch:** make new data products AI-ready by default: documented, classified and retrievable. | [AI agents](https://nthakur.com/genai/agents) |

### Team & Skills

| Layer | What it looks like | Next actions | Next layer reached when… | Links to |
| --- | --- | --- | --- | --- |
| **L1** Exploring | Interest is high but skills are uneven and learning is self-directed. | 1. Run hands-on sessions on prompting and the approved tool, with examples from each function.<br>2. Find 5–10 enthusiasts and give them time to build and share use cases. | most people have used the approved tool on real work, and champions exist. | [Prompt engineering](https://nthakur.com/genai/prompt-engineering) |
| **L2** Experimenting | Champions exist and individuals are productive, but teams have not changed how they work. | 1. Pick one team and redesign one workflow end to end with AI, measuring before and after.<br>2. Create a shared library of prompts and patterns that work, owned by the champions. | at least one team has measurably changed a workflow, not just sped up individuals. | [GenAI as a new team member](https://nthakur.com/talks/genai-new-team-member) |
| **L3** Scaling | Several teams work AI-first; engineering uses agents for real delivery work. | 1. Train engineers in plan-first agent workflows, review of AI output and context files.<br>2. Add AI fluency to role expectations and onboarding. | AI-assisted work is the default way teams operate, with agreed norms. | [AI-Native SDLC Field Guide](https://nthakur.com/ai-sdlc/field-guide) |
| **L4** Leading | AI fluency is widespread and teams design workflows around agents. | 1. Develop agent-orchestration skills: building, evaluating and monitoring AI workflows.<br>2. Share what works externally to attract talent. | **Stretch:** people spend their time on judgement and orchestration while agents do the routine work. | [AI agents](https://nthakur.com/genai/agents) |

### Governance & Risk

| Layer | What it looks like | Next actions | Next layer reached when… | Links to |
| --- | --- | --- | --- | --- |
| **L1** Exploring | No AI policy; usage is invisible to risk and security. | 1. Publish a one-page acceptable-use policy: approved tools, data that must not be shared, human review required.<br>2. Inventory current AI use, including shadow use. | people know the rules and you know where AI is being used. | [AI governance](https://nthakur.com/genai/governance) |
| **L2** Experimenting | A policy exists, but enforcement and review are informal. | 1. Create a lightweight review for new AI use cases: data, risk tier, human oversight, evaluation.<br>2. Log prompts and outputs for production use cases, with retention rules. | every production AI use case has a risk tier, an owner and logs. | [AI governance](https://nthakur.com/genai/governance) |
| **L3** Scaling | Use cases are reviewed and tiered; controls are partly technical. | 1. Enforce guardrails technically: data-loss prevention, output filters, tool allowlists for agents.<br>2. Run red-team tests on high-risk use cases before launch and after major changes. | controls for high-risk AI are enforced by systems, not just policy. | [AI governance](https://nthakur.com/genai/governance) |
| **L4** Leading | AI governance is embedded, technical and proportionate to risk. | 1. Align with emerging regulation (EU AI Act, ISO/IEC 42001) using your existing evidence.<br>2. Monitor production AI continuously for drift, abuse and quality regressions. | **Stretch:** let agents act autonomously only inside tiered, auditable limits that you can tighten in config. | [AI-Native SDLC Field Guide](https://nthakur.com/ai-sdlc/field-guide) |

### Adoption & Value

| Layer | What it looks like | Next actions | Next layer reached when… | Links to |
| --- | --- | --- | --- | --- |
| **L1** Exploring | Pilots are driven by curiosity; value is anecdotal. | 1. Choose three use cases with a clear baseline (time, cost, quality) and a named business owner.<br>2. Define success criteria before starting each pilot. | each pilot ends with a measured result and a go/no-go decision. | [GenAI in enterprise operations](https://nthakur.com/talks/genai-enterprise-operations-patterns) |
| **L2** Experimenting | Some pilots show value, but few reach production. | 1. Create a path to production for pilots: platform, security review, support model.<br>2. Kill pilots that miss their success criteria and reinvest. | at least two use cases run in production with measured benefit. | [LLMOps](https://nthakur.com/genai/llmops) |
| **L3** Scaling | A portfolio of AI use cases delivers measured value. | 1. Manage AI as a portfolio: value, cost and risk per use case, reviewed quarterly.<br>2. Redesign whole processes around AI, not just individual tasks. | AI value is reported to leadership like any other investment. | [CognitiveOps Model](https://nthakur.com/cognitiveops) |
| **L4** Leading | AI is a core capability that shapes products and operations. | 1. Look for AI-native products and services, not only efficiency gains.<br>2. Measure customer outcomes from AI features, not just usage. | **Stretch:** build products that would not be possible without AI. | [CognitiveOps Playbook](https://nthakur.com/cognitiveops/playbook) |

## CognitiveOps

Take it: [nthakur.com/cognitiveops/assessment](https://nthakur.com/cognitiveops/assessment) · Edit: `pages/cognitiveops/cognitiveopsPlans.ts`

### DevOps

| Layer | What it looks like | Next actions | Next layer reached when… | Links to |
| --- | --- | --- | --- | --- |
| **L1** Manual | Delivery is manual and depends on a few people. | 1. Automate build and test on every commit for your main services.<br>2. Measure deployment frequency and lead time so you have a baseline. | every change is built, tested and deployable by pipeline. | [DevOps assessment](https://nthakur.com/devops/assessment) |
| **L2** Automated | Pipelines automate delivery; quality and recovery still rely on people. | 1. Add SLOs and automated rollback for your critical services.<br>2. Introduce AI code review as a first pass on every pull request. | releases are frequent and reversible, and reviews start within minutes. | [DevOps Maturity Roadmap](https://nthakur.com/devops/roadmap-guide) |
| **L3** Intelligent | AI assists delivery: code review, test generation and build triage. | 1. Adopt plan-first agent workflows with repo context files and enforced guardrails (hooks, branch protection).<br>2. Track first-pass merge rate and change failure rate for agent-written changes. | agents deliver routine changes end to end, and people review plans and outcomes. | [AI-Native SDLC Field Guide](https://nthakur.com/ai-sdlc/field-guide) |
| **L4** Cognitive | Delivery is agent-driven inside governed gates. | 1. Let production signals (SLO breaches, CI failure rates) trigger agent diagnosis that lands as new work.<br>2. Keep an eval suite for your agent configuration and add every incident to it. | **Stretch:** the delivery loop closes itself, with people governing above it. | [AI-Native SDLC Field Guide](https://nthakur.com/ai-sdlc/field-guide) |

### SecOps

| Layer | What it looks like | Next actions | Next layer reached when… | Links to |
| --- | --- | --- | --- | --- |
| **L1** Manual | Security is checked late and manually. | 1. Add dependency, secret and IaC scanning to every pipeline.<br>2. Enforce MFA and remove long-lived credentials. | basic security checks run on every change automatically. | [SecOps assessment](https://nthakur.com/secops/assessment) |
| **L2** Automated | Security checks are automated in pipelines but tuned by hand. | 1. Express your key policies as code and block violations before deploy.<br>2. Centralise detections and write runbooks for common alerts. | policy violations are blocked, not found later. | [DevSecOps Playbook](https://nthakur.com/secops/devsecops-playbook) |
| **L3** Intelligent | AI helps with triage, threat modelling and remediation suggestions. | 1. Use AI to enrich and summarise alerts, with analysts deciding.<br>2. Encode security standards as agent skills, backed by hooks that block unsafe actions. | AI-written code meets your standards by default, and triage time is falling. | [Cognitive DevSecOps](https://nthakur.com/secops/cognitive-devsecops) |
| **L4** Cognitive | Security is continuous, AI-assisted and largely self-enforcing. | 1. Pre-approve automated containment for well-understood incident types.<br>2. Give every agent and pipeline its own scoped identity and audit trail. | **Stretch:** security becomes a property of the platform rather than a team you queue for. | [Cognitive DevSecOps](https://nthakur.com/secops/cognitive-devsecops) |

### FinOps

| Layer | What it looks like | Next actions | Next layer reached when… | Links to |
| --- | --- | --- | --- | --- |
| **L1** Manual | Cloud cost is visible only on the monthly bill. | 1. Tag resources by owner and product and enforce it with policy.<br>2. Give every product owner a monthly cost summary. | most spend is allocated to an owner who can explain it. | [FinOps assessment](https://nthakur.com/finops/assessment) |
| **L2** Automated | Costs are allocated and reviewed; optimisation is periodic and manual. | 1. Automate daily cost dashboards and anomaly alerts per team.<br>2. Run a commitment strategy reviewed monthly. | teams act on cost without being asked. | [30 Days of FinOps](https://nthakur.com/finops/30-day-guide) |
| **L3** Intelligent | ML-driven recommendations and forecasts guide decisions. | 1. Track unit cost per product next to business KPIs.<br>2. Estimate the cost of architecture changes on the pull request. | cost is a design-time input, not a month-end surprise. | [Unit economics](https://nthakur.com/finops/unit-economics) |
| **L4** Cognitive | Cost optimisation is continuous and partly autonomous. | 1. Let agents propose optimisation changes as PRs within budget guardrails.<br>2. Report cost and carbon per unit to leadership. | **Stretch:** every significant spec carries a cost and carbon estimate. | [CognitiveOps Playbook](https://nthakur.com/cognitiveops/playbook) |

### GenAI

| Layer | What it looks like | Next actions | Next layer reached when… | Links to |
| --- | --- | --- | --- | --- |
| **L1** Manual | AI use is individual and ungoverned. | 1. Provide an approved AI tool and a one-page usage policy.<br>2. Pick three use cases with measurable baselines. | AI use is sanctioned, visible and measured. | [GenAI assessment](https://nthakur.com/genai/assessment) |
| **L2** Automated | Pilots run with governance, but few reach production. | 1. Build a shared platform: retrieval, evaluation, logging and cost tracking.<br>2. Create a review path from pilot to production. | at least two AI use cases run in production with measured value. | [LLMOps](https://nthakur.com/genai/llmops) |
| **L3** Intelligent | AI is embedded in several workflows and operations. | 1. Redesign whole processes around agents with tiered autonomy.<br>2. Enforce AI guardrails technically, not just through policy. | AI changes how teams work, not just how fast individuals type. | [AI agents](https://nthakur.com/genai/agents) |
| **L4** Cognitive | AI is a core, governed capability across the organisation. | 1. Run AI as a portfolio of value, cost and risk, reviewed with leadership.<br>2. Connect AI with DevOps, SecOps and FinOps signals into one operating loop. | **Stretch:** the four domains operate as one cognitive system: the CognitiveOps model in full. | [CognitiveOps Playbook](https://nthakur.com/cognitiveops/playbook) |
