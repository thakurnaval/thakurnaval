import type { PlanBook, PillarPlan } from '../../components/PillarPlans';

const p = (now: string, actions: string[], next: string, resource?: [string, string]): PillarPlan =>
  ({ now, actions, next, resource: resource ? { label: resource[0], to: resource[1] } : undefined });

/** Per-pillar, per-layer next steps for the GenAI readiness assessment (Exploring → Leading). */
export const GENAI_PLANS: PlanBook = {
  'Foundation & Data': {
    1: p('There is no approved way to use AI models, and data is not ready for AI use.',
      ['Provide one approved, enterprise-grade AI tool with data-protection terms, so people stop using personal accounts.', 'Identify one high-value document set (policies, runbooks, product docs) and check its quality and ownership.'],
      'staff have a sanctioned tool and you know which data is usable for AI.', ['GenAI fundamentals', '/genai/fundamentals']),
    2: p('Approved tools exist; data for AI use cases is gathered by hand for each project.',
      ['Build one retrieval (RAG) service over a curated document set with access controls carried through.', 'Set up an evaluation set of 30–50 real questions with expected answers.'],
      'one production AI use case runs on governed data with measured answer quality.', ['RAG architecture', '/genai/rag']),
    3: p('A reusable AI platform (models, retrieval, evaluation) supports several use cases.',
      ['Add LLMOps basics: prompt and model versioning, cost tracking per use case, regression evals on change.', 'Classify data for AI use and enforce it in the retrieval layer.'],
      'new use cases launch on the shared platform in weeks, with cost and quality visible.', ['LLMOps', '/genai/llmops']),
    4: p('The AI platform is mature and governed, and data is AI-ready by design.',
      ['Expose platform capabilities to agents through managed tools (MCP or similar) with allowlists.', 'Track model and provider choices against cost, latency and quality, and switch when it pays.'],
      'make new data products AI-ready by default: documented, classified and retrievable.', ['AI agents', '/genai/agents']),
  },
  'Team & Skills': {
    1: p('Interest is high but skills are uneven and learning is self-directed.',
      ['Run hands-on sessions on prompting and the approved tool, with examples from each function.', 'Find 5–10 enthusiasts and give them time to build and share use cases.'],
      'most people have used the approved tool on real work, and champions exist.', ['Prompt engineering', '/genai/prompt-engineering']),
    2: p('Champions exist and individuals are productive, but teams have not changed how they work.',
      ['Pick one team and redesign one workflow end to end with AI, measuring before and after.', 'Create a shared library of prompts and patterns that work, owned by the champions.'],
      'at least one team has measurably changed a workflow, not just sped up individuals.', ['GenAI as a new team member', '/talks/genai-new-team-member']),
    3: p('Several teams work AI-first; engineering uses agents for real delivery work.',
      ['Train engineers in plan-first agent workflows, review of AI output and context files.', 'Add AI fluency to role expectations and onboarding.'],
      'AI-assisted work is the default way teams operate, with agreed norms.', ['AI-Native SDLC Field Guide', '/ai-sdlc/field-guide']),
    4: p('AI fluency is widespread and teams design workflows around agents.',
      ['Develop agent-orchestration skills: building, evaluating and monitoring AI workflows.', 'Share what works externally to attract talent.'],
      'people spend their time on judgement and orchestration while agents do the routine work.', ['AI agents', '/genai/agents']),
  },
  'Governance & Risk': {
    1: p('No AI policy; usage is invisible to risk and security.',
      ['Publish a one-page acceptable-use policy: approved tools, data that must not be shared, human review required.', 'Inventory current AI use, including shadow use.'],
      'people know the rules and you know where AI is being used.', ['AI governance', '/genai/governance']),
    2: p('A policy exists, but enforcement and review are informal.',
      ['Create a lightweight review for new AI use cases: data, risk tier, human oversight, evaluation.', 'Log prompts and outputs for production use cases, with retention rules.'],
      'every production AI use case has a risk tier, an owner and logs.', ['AI governance', '/genai/governance']),
    3: p('Use cases are reviewed and tiered; controls are partly technical.',
      ['Enforce guardrails technically: data-loss prevention, output filters, tool allowlists for agents.', 'Run red-team tests on high-risk use cases before launch and after major changes.'],
      'controls for high-risk AI are enforced by systems, not just policy.', ['AI governance', '/genai/governance']),
    4: p('AI governance is embedded, technical and proportionate to risk.',
      ['Align with emerging regulation (EU AI Act, ISO/IEC 42001) using your existing evidence.', 'Monitor production AI continuously for drift, abuse and quality regressions.'],
      'let agents act autonomously only inside tiered, auditable limits that you can tighten in config.', ['AI-Native SDLC Field Guide', '/ai-sdlc/field-guide']),
  },
  'Adoption & Value': {
    1: p('Pilots are driven by curiosity; value is anecdotal.',
      ['Choose three use cases with a clear baseline (time, cost, quality) and a named business owner.', 'Define success criteria before starting each pilot.'],
      'each pilot ends with a measured result and a go/no-go decision.', ['GenAI in enterprise operations', '/talks/genai-enterprise-operations-patterns']),
    2: p('Some pilots show value, but few reach production.',
      ['Create a path to production for pilots: platform, security review, support model.', 'Kill pilots that miss their success criteria and reinvest.'],
      'at least two use cases run in production with measured benefit.', ['LLMOps', '/genai/llmops']),
    3: p('A portfolio of AI use cases delivers measured value.',
      ['Manage AI as a portfolio: value, cost and risk per use case, reviewed quarterly.', 'Redesign whole processes around AI, not just individual tasks.'],
      'AI value is reported to leadership like any other investment.', ['CognitiveOps Model', '/cognitiveops']),
    4: p('AI is a core capability that shapes products and operations.',
      ['Look for AI-native products and services, not only efficiency gains.', 'Measure customer outcomes from AI features, not just usage.'],
      'build products that would not be possible without AI.', ['CognitiveOps Playbook', '/cognitiveops/playbook']),
  },
};
