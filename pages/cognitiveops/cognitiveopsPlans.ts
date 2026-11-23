import type { PlanBook, PillarPlan } from '../../components/PillarPlans';

const p = (now: string, actions: string[], next: string, resource?: [string, string]): PillarPlan =>
  ({ now, actions, next, resource: resource ? { label: resource[0], to: resource[1] } : undefined });

/** Per-domain, per-layer next steps for the CognitiveOps assessment (Manual → Cognitive). */
export const COGNITIVEOPS_PLANS: PlanBook = {
  DevOps: {
    1: p('Delivery is manual and depends on a few people.',
      ['Automate build and test on every commit for your main services.', 'Measure deployment frequency and lead time so you have a baseline.'],
      'every change is built, tested and deployable by pipeline.', ['DevOps assessment', '/devops/assessment']),
    2: p('Pipelines automate delivery; quality and recovery still rely on people.',
      ['Add SLOs and automated rollback for your critical services.', 'Introduce AI code review as a first pass on every pull request.'],
      'releases are frequent and reversible, and reviews start within minutes.', ['DevOps Maturity Roadmap', '/devops/roadmap-guide']),
    3: p('AI assists delivery: code review, test generation and build triage.',
      ['Adopt plan-first agent workflows with repo context files and enforced guardrails (hooks, branch protection).', 'Track first-pass merge rate and change failure rate for agent-written changes.'],
      'agents deliver routine changes end to end, and people review plans and outcomes.', ['AI-Native SDLC Field Guide', '/ai-sdlc/field-guide']),
    4: p('Delivery is agent-driven inside governed gates.',
      ['Let production signals (SLO breaches, CI failure rates) trigger agent diagnosis that lands as new work.', 'Keep an eval suite for your agent configuration and add every incident to it.'],
      'the delivery loop closes itself, with people governing above it.', ['AI-Native SDLC Field Guide', '/ai-sdlc/field-guide']),
  },
  SecOps: {
    1: p('Security is checked late and manually.',
      ['Add dependency, secret and IaC scanning to every pipeline.', 'Enforce MFA and remove long-lived credentials.'],
      'basic security checks run on every change automatically.', ['SecOps assessment', '/secops/assessment']),
    2: p('Security checks are automated in pipelines but tuned by hand.',
      ['Express your key policies as code and block violations before deploy.', 'Centralise detections and write runbooks for common alerts.'],
      'policy violations are blocked, not found later.', ['DevSecOps Playbook', '/secops/devsecops-playbook']),
    3: p('AI helps with triage, threat modelling and remediation suggestions.',
      ['Use AI to enrich and summarise alerts, with analysts deciding.', 'Encode security standards as agent skills, backed by hooks that block unsafe actions.'],
      'AI-written code meets your standards by default, and triage time is falling.', ['Cognitive DevSecOps', '/secops/cognitive-devsecops']),
    4: p('Security is continuous, AI-assisted and largely self-enforcing.',
      ['Pre-approve automated containment for well-understood incident types.', 'Give every agent and pipeline its own scoped identity and audit trail.'],
      'security becomes a property of the platform rather than a team you queue for.', ['Cognitive DevSecOps', '/secops/cognitive-devsecops']),
  },
  FinOps: {
    1: p('Cloud cost is visible only on the monthly bill.',
      ['Tag resources by owner and product and enforce it with policy.', 'Give every product owner a monthly cost summary.'],
      'most spend is allocated to an owner who can explain it.', ['FinOps assessment', '/finops/assessment']),
    2: p('Costs are allocated and reviewed; optimisation is periodic and manual.',
      ['Automate daily cost dashboards and anomaly alerts per team.', 'Run a commitment strategy reviewed monthly.'],
      'teams act on cost without being asked.', ['30 Days of FinOps', '/finops/30-day-guide']),
    3: p('ML-driven recommendations and forecasts guide decisions.',
      ['Track unit cost per product next to business KPIs.', 'Estimate the cost of architecture changes on the pull request.'],
      'cost is a design-time input, not a month-end surprise.', ['Unit economics', '/finops/unit-economics']),
    4: p('Cost optimisation is continuous and partly autonomous.',
      ['Let agents propose optimisation changes as PRs within budget guardrails.', 'Report cost and carbon per unit to leadership.'],
      'every significant spec carries a cost and carbon estimate.', ['CognitiveOps Playbook', '/cognitiveops/playbook']),
  },
  GenAI: {
    1: p('AI use is individual and ungoverned.',
      ['Provide an approved AI tool and a one-page usage policy.', 'Pick three use cases with measurable baselines.'],
      'AI use is sanctioned, visible and measured.', ['GenAI assessment', '/genai/assessment']),
    2: p('Pilots run with governance, but few reach production.',
      ['Build a shared platform: retrieval, evaluation, logging and cost tracking.', 'Create a review path from pilot to production.'],
      'at least two AI use cases run in production with measured value.', ['LLMOps', '/genai/llmops']),
    3: p('AI is embedded in several workflows and operations.',
      ['Redesign whole processes around agents with tiered autonomy.', 'Enforce AI guardrails technically, not just through policy.'],
      'AI changes how teams work, not just how fast individuals type.', ['AI agents', '/genai/agents']),
    4: p('AI is a core, governed capability across the organisation.',
      ['Run AI as a portfolio of value, cost and risk, reviewed with leadership.', 'Connect AI with DevOps, SecOps and FinOps signals into one operating loop.'],
      'the four domains operate as one cognitive system: the CognitiveOps model in full.', ['CognitiveOps Playbook', '/cognitiveops/playbook']),
  },
};
