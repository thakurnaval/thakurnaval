import type { PlanBook, PillarPlan } from '../../components/PillarPlans';

const p = (now: string, actions: string[], next: string, resource?: [string, string]): PillarPlan =>
  ({ now, actions, next, resource: resource ? { label: resource[0], to: resource[1] } : undefined });

/** Per-pillar, per-layer next steps for the DevOps assessment (Reactive → Elite). */
export const DEVOPS_PLANS: PlanBook = {
  'Delivery Pipeline': {
    1: p('Builds and releases depend on a few people and manual steps; every release is an event.',
      ['Put every service under one CI pipeline that builds and runs unit tests on each commit to main.', 'Write the release steps down, then script the first three of them. Pick the steps that cause the most failed releases.'],
      'every change to main is built and tested automatically, and anyone on the team can release.', ['DevOps Maturity Roadmap', '/devops/roadmap-guide']),
    2: p('CI exists, but deploying to production is still a separate, partly manual process.',
      ['Extend the pipeline to deploy to a test environment automatically, then promote the same artifact to production.', 'Start measuring lead time and deployment frequency, the first two DORA metrics, from pipeline data.'],
      'one artifact flows from commit to production through the pipeline, with lead time measured in days, not weeks.', ['DevOps practices', '/devops/practices']),
    3: p('Continuous delivery works; releases are frequent but still carry risk when they go wrong.',
      ['Introduce progressive delivery for your riskiest service: feature flags or canary releases with automatic rollback.', 'Make rollback a single, rehearsed command and test it monthly in staging.'],
      'releases are routine, small and reversible, and change failure rate stays under 15%.', ['AI-Native SDLC Field Guide', '/ai-sdlc/field-guide']),
    4: p('Deploying on demand is normal and the pipeline is a product with its own owners.',
      ['Add AI-assisted steps where judgement is needed: build-failure triage, changelog drafting, first-pass PR review.', 'Publish pipeline health metrics (queue time, flaky-test rate) and treat regressions as incidents.'],
      'let agents prepare releases end to end up to a human-authorised production gate.', ['AI-Native SDLC Field Guide', '/ai-sdlc/field-guide']),
  },
  'Infrastructure & Platform': {
    1: p('Environments are built by hand and drift apart; nobody is sure production matches staging.',
      ['Capture one environment in Terraform or Bicep, starting with the network and the most-changed resources.', 'Store state remotely with locking and stop all manual changes to that environment.'],
      'a new environment can be created from code in hours, and drift is the exception.', ['Platform engineering', '/devops/platform-engineering']),
    2: p('Infrastructure is mostly in code, but each team writes its own and reviews are inconsistent.',
      ['Extract shared modules (network, compute, database) with sensible, secure defaults.', 'Run plan output and policy checks (cost, tagging, security) on every infrastructure pull request.'],
      'teams compose infrastructure from shared modules and policy failures block merges.', ['Platform engineering', '/devops/platform-engineering']),
    3: p('Shared modules and pipelines exist; teams still wait on a platform team for new services.',
      ['Build a golden path: a template that creates a repo, pipeline, environment and dashboards in one step.', 'Measure time from "new service" request to first production deploy, and make it a platform-team goal.'],
      'a team can launch a production-ready service on its own in under a day.', ['Platform engineering', '/devops/platform-engineering']),
    4: p('A self-service internal platform exists and is treated as a product.',
      ['Survey platform users quarterly and publish a roadmap driven by their friction points.', 'Add drift detection and automated, policy-checked remediation for low-risk resources.'],
      'let developers describe intent ("a queue with a dead-letter topic") and have the platform generate reviewed IaC.', ['Terraform/Bicep starter templates', '/architecture/iac-templates']),
  },
  'Observability & Reliability': {
    1: p('You find out about outages from users; logs are scattered and alerts are noise.',
      ['Centralise logs and basic metrics for your most important service.', 'Add a synthetic check on the main user journey and route its alert to whoever is on call.'],
      'the team usually knows about an incident before customers report it.', ['SRE practices', '/devops/sre']),
    2: p('Dashboards and alerts exist, but alerting is threshold-based and on-call is tiring.',
      ['Define two or three SLOs per critical service (availability, latency) with an error budget.', 'Delete or downgrade any alert nobody acted on in the last month.'],
      'paging is driven by SLO burn rate and most pages need action.', ['SRE practices', '/devops/sre']),
    3: p('SLOs and tracing are in place; incidents are handled well but lessons do not always stick.',
      ['Run blameless post-mortems for every SEV1/SEV2 and track actions to completion.', 'Use error budgets in planning: when a budget is spent, reliability work comes first.'],
      'repeat incidents of the same class are rare and error budgets shape the roadmap.', ['Chaos engineering', '/devops/chaos-engineering']),
    4: p('Reliability is engineered and measured; incidents are rare and recoveries fast.',
      ['Run game days and controlled chaos experiments on critical paths each quarter.', 'Let an agent diagnose read-only when an SLO breaches and draft the post-mortem for review.'],
      'turn every incident into a regression check so the same failure cannot ship twice.', ['AI-Native SDLC Field Guide', '/ai-sdlc/field-guide']),
  },
  'Culture & Collaboration': {
    1: p('Dev and Ops work in separate queues and hand work over through tickets.',
      ['Put one operations engineer in a product team for a quarter and share the on-call rota.', 'Hold a monthly blameless review of one failed release with both groups in the room.'],
      'teams that build a service also share responsibility for running it.', ['The 7 Cs of DevOps', '/devops/7cs']),
    2: p('Collaboration happens, but it depends on goodwill rather than shared goals.',
      ['Give product teams shared outcome metrics: DORA plus one customer metric.', 'Make post-mortems and design docs open by default across teams.'],
      'teams plan against shared metrics and learning moves between teams without being pushed.', ['The 7 Cs of DevOps', '/devops/7cs']),
    3: p('Teams own their services end to end and improve continuously.',
      ['Fund a community of practice with time, not just a Slack channel: one afternoon a fortnight.', 'Track developer experience (survey plus cycle time) and act on the worst friction point each quarter.'],
      'improvement is part of every team\'s plan, not a side project.', ['Seven habits of DevOps teams', '/talks/seven-habits-devops-teams']),
    4: p('High-trust, learning culture; teams experiment freely and share what they learn.',
      ['Coach other parts of the organisation (security, finance, data) using the same practices.', 'Pair engineers with AI agents deliberately: agree team norms for plan-first work and review.'],
      'extend DevOps ways of working into FinOps, SecOps and GenAI: the CognitiveOps model.', ['CognitiveOps Model', '/cognitiveops']),
  },
};
