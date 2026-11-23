import type { PlanBook, PillarPlan } from '../../components/PillarPlans';

const p = (now: string, actions: string[], next: string, resource?: [string, string]): PillarPlan =>
  ({ now, actions, next, resource: resource ? { label: resource[0], to: resource[1] } : undefined });

/** Per-pillar, per-layer next steps for the Cloud Security / SecOps assessment (Reactive → Autonomous). */
export const SECOPS_PLANS: PlanBook = {
  'Identity & Access': {
    1: p('Shared accounts, long-lived keys and broad admin rights are common.',
      ['Enforce MFA for every human identity and remove shared admin accounts.', 'Find and rotate long-lived access keys; replace pipeline secrets with workload identity (OIDC) where possible.'],
      'every action traces to a named identity, and no human uses standing admin rights day to day.', ['Cloud security', '/secops/cloud-security']),
    2: p('MFA and SSO are in place, but permissions are broad and rarely reviewed.',
      ['Run a quarterly access review for privileged roles, with owners attesting.', 'Introduce just-in-time elevation for production admin access.'],
      'privileged access is time-bound and reviewed, and unused permissions are removed.', ['Security principles', '/secops/principles']),
    3: p('Least privilege is the norm and privileged access is controlled.',
      ['Use access analysers to right-size roles automatically from actual usage.', 'Apply zero-trust policies: device posture and context in access decisions.'],
      'permissions shrink continuously to what is used, without manual effort.', ['Zero trust for cloud native', '/talks/zero-trust-cloud-native']),
    4: p('Identity is the perimeter; access is contextual and continuously verified.',
      ['Give AI agents their own identities with scoped, short-lived credentials and no self-approval.', 'Detect anomalous identity behaviour and revoke sessions automatically.'],
      'treat every non-human identity (pipelines, agents, services) with the same rigour as people.', ['AI-Native SDLC Field Guide', '/ai-sdlc/field-guide']),
  },
  'Threat Detection': {
    1: p('Logs are not centralised; attacks would likely be found by accident.',
      ['Turn on cloud-native threat detection (GuardDuty, Defender for Cloud, Security Command Center) in every account.', 'Centralise audit logs in an account nobody can tamper with.'],
      'security alerts reach a named team, and audit logs are complete and protected.', ['Continuous security', '/secops/continuous-security']),
    2: p('Detection tools run, but alerts are noisy and triage is manual.',
      ['Tune the top 20 alert rules by volume and suppress known-benign patterns.', 'Write runbooks for your five most common alert types.'],
      'most alerts are actionable and triaged within agreed times.', ['Security automation', '/secops/automation']),
    3: p('Detection is tuned and triage is consistent.',
      ['Map detections to MITRE ATT&CK and close coverage gaps for your threat model.', 'Automate enrichment (asset owner, exposure, recent changes) on every alert.'],
      'coverage is measured against known techniques and enrichment is automatic.', ['Threat modelling', '/secops/threat-modeling']),
    4: p('Detection is broad, enriched and partly automated.',
      ['Use AI to correlate weak signals across sources into incidents, with analysts confirming.', 'Run purple-team exercises quarterly to test detections.'],
      'let an agent produce the first investigation summary for every high-severity alert.', ['Security automation', '/secops/automation']),
  },
  'Compliance & Policy': {
    1: p('Compliance is a yearly audit scramble; policies live in documents.',
      ['Pick one framework (CIS benchmark, ISO 27001 or SOC 2) and baseline your cloud against it with a posture tool.', 'Fix the critical findings and record exceptions with owners and expiry dates.'],
      'you know your posture score and every exception has an owner.', ['Cloud security', '/secops/cloud-security']),
    2: p('Posture is measured, but fixes depend on people chasing teams.',
      ['Express your top policies as code (Azure Policy, OPA, Sentinel) and enforce them in pipelines.', 'Scan IaC and container images in CI and block critical findings.'],
      'violations are blocked before deployment, not found afterwards.', ['DevSecOps practices', '/secops/devsecops-practices']),
    3: p('Policy-as-code is enforced and evidence is mostly automatic.',
      ['Generate audit evidence continuously from pipelines and posture tools.', 'Produce an SBOM for every build and track vulnerable dependencies to fix.'],
      'audits use continuously collected evidence instead of a scramble.', ['SAST and DAST', '/secops/sast-dast']),
    4: p('Compliance is continuous and largely automated.',
      ['Map controls across frameworks once and reuse the evidence for each audit.', 'Encode security standards as agent skills so AI-written code follows them by default.'],
      'auto-remediate low-risk policy drift and route the rest to owners with a proposed fix.', ['DevSecOps Playbook', '/secops/devsecops-playbook']),
  },
  'Incident Response': {
    1: p('There is no tested incident plan; response depends on who is available.',
      ['Write a one-page incident response plan: roles, severity levels, contacts, first steps.', 'Run a tabletop exercise for a credential-leak scenario.'],
      'everyone knows their role in an incident and the plan has been rehearsed once.', ['Continuous security', '/secops/continuous-security']),
    2: p('A plan exists and has been tested, but containment is slow and manual.',
      ['Automate the first containment steps (disable keys, isolate instance, snapshot disk) as runbooks.', 'Hold blameless post-incident reviews with tracked actions.'],
      'containment for common incidents starts within minutes.', ['Security automation', '/secops/automation']),
    3: p('Response is practised, measured and partly automated.',
      ['Measure time to detect and time to contain, and set targets for both.', 'Run quarterly exercises covering cloud, identity and supply-chain scenarios.'],
      'detection and containment times are tracked and improving.', ['Container security', '/secops/container-security']),
    4: p('Response is fast, automated where safe and continuously improved.',
      ['Let an agent assemble the incident timeline and draft the report while responders act.', 'Feed every incident back into detections, policies and training.'],
      'pre-approved automated containment for well-understood incident types, with humans approving the rest.', ['Cognitive DevSecOps', '/secops/cognitive-devsecops']),
  },
};
