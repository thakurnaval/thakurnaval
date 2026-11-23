/**
 * Toolkits: mental models combined into a method for a recurring situation.
 * Model references are [anchor, display name]; anchors must exist on /explore/mental-models.
 */
export interface ToolkitStep {
  title: string;
  what: string;
  /** Questions or prompts to use in this step. */
  prompts: string[];
  models: [string, string][];
}

export interface Toolkit {
  slug: string;
  title: string;
  tagline: string;
  whenToUse: string;
  outcome: string;
  time: string;
  steps: ToolkitStep[];
  template: { title: string; intro: string; lines: string[] };
  pitfalls: string[];
  resources: { label: string; to: string }[];
}

export const TOOLKITS: Toolkit[] = [
  {
    slug: 'incident-review',
    title: 'Incident Review Toolkit',
    tagline: 'Turn an outage into lasting improvement, without blame.',
    whenToUse: 'After any SEV1 or SEV2 incident, a near miss, a failed release, or an AI feature misbehaving in production. Hold the review within five working days, while memories are fresh.',
    outcome: 'A shared, factual timeline; the contributing causes across people, process and technology; and a short list of owned actions that make the same failure much less likely.',
    time: '60–90 minutes, plus an hour of preparation',
    steps: [
      {
        title: 'Stabilise first, capture as you go',
        what: 'During the incident, act in short loops and keep a scribe. The notes from the incident channel are the raw material for the review.',
        prompts: ['What are we seeing, and what changed recently?', 'What is the smallest safe action, such as a rollback or failover?', 'Who is writing down what we tried and when?'],
        models: [['ooda-loop', 'OODA Loop'], ['cynefin-framework', 'Cynefin Framework']],
      },
      {
        title: 'Build the timeline before the meeting',
        what: 'The facilitator assembles a timeline from alerts, logs, deploys and chat. The meeting starts from facts, not memories.',
        prompts: ['When did impact start, when was it detected, and when was it resolved?', 'What did people know at each point, and what did they decide?'],
        models: [['blameless-post-mortem', 'Blameless Post-mortem'], ['hanlons-razor', "Hanlon's Razor"]],
      },
      {
        title: 'Find the contributing causes',
        what: 'Look for several causes, not one culprit. Use a fishbone to map categories, 5 Whys to dig into the strongest ones, and the Swiss cheese model to see which defences missed.',
        prompts: ['What made this easy to get wrong?', 'Which other layer (review, tests, canary, alerting) could have caught it?', 'Why did detection take as long as it did?'],
        models: [['fishbone-diagram', 'Fishbone (Ishikawa) Diagram'], ['5-whys', '5 Whys'], ['swiss-cheese-model', 'Swiss Cheese Model'], ['root-cause-analysis', 'Root Cause Analysis']],
      },
      {
        title: 'Choose a few actions that matter',
        what: 'Rank the candidate actions by impact and effort and keep three to five. Each gets one owner and a date.',
        prompts: ['Which action removes the most risk for the least effort?', 'Who owns it, and when will we check it worked?'],
        models: [['pareto-principle', 'Pareto Principle (80/20 Rule)'], ['directly-responsible-individual', 'Directly Responsible Individual (DRI)']],
      },
      {
        title: 'Close the loop',
        what: 'Turn the lesson into something the system remembers: a test, an alert, a guardrail, a runbook, or an evaluation for an AI feature. Check the actions a month later.',
        prompts: ['How will we know this failure cannot recur silently?', 'What will we share with other teams?'],
        models: [['pdca', 'PDCA (Deming Cycle)'], ['kaizen', 'Kaizen']],
      },
    ],
    template: {
      title: 'Review agenda and write-up',
      intro: 'Use this as the agenda for the meeting and the headings for the write-up.',
      lines: [
        '1. Summary (5 min): what happened, customer impact, duration, severity.',
        '2. Timeline (15 min): detection, response, mitigation, resolution, with timestamps.',
        '3. What went well (5 min): what helped us detect, respond or recover.',
        '4. Contributing causes (20 min): fishbone categories, 5 Whys on the top causes, defences that missed.',
        '5. Actions (15 min): three to five actions, each with an owner, a date and how we will verify it.',
        '6. Lessons to share (5 min): what other teams should know.',
        'Ground rule: we discuss how the system allowed this, never who is to blame.',
      ],
    },
    pitfalls: [
      'Stopping at the trigger ("a bad config was pushed") instead of asking why it was possible and why it spread.',
      'Twenty actions that never happen. Fewer, owned actions beat a long wish list.',
      'Naming individuals in the write-up. It guarantees less honesty next time.',
      'Never checking whether the actions worked.',
    ],
    resources: [
      { label: 'SRE practices', to: '/devops/sre' },
      { label: 'DevSecOps Playbook', to: '/secops/devsecops-playbook' },
      { label: 'AI-Native SDLC Field Guide', to: '/ai-sdlc/field-guide' },
    ],
  },
  {
    slug: 'architecture-decisions',
    title: 'Architecture Decisions Toolkit',
    tagline: 'Make important technical decisions deliberately, and the rest quickly.',
    whenToUse: 'Choosing a database, cloud service, framework, vendor or AI model; splitting or merging services; or any decision that will be expensive to reverse.',
    outcome: 'A decision made at the right speed, with options compared openly, risks surfaced, and the reasoning recorded so future teams understand why.',
    time: '30 minutes for a two-way door; a few short sessions over a week or two for a one-way door',
    steps: [
      {
        title: 'Frame the decision and its door type',
        what: 'State the decision in one sentence and decide how reversible it is. Two-way doors get a quick decision close to the work; one-way doors get the full process.',
        prompts: ['If this turns out wrong, how quickly and cheaply can we undo it?', 'Is the problem clear, complicated or complex?'],
        models: [['reversible-vs-irreversible-decisions', 'Reversible vs Irreversible Decisions'], ['cynefin-framework', 'Cynefin Framework']],
      },
      {
        title: 'Understand the real need',
        what: 'Go back to the job the system has to do and the constraints that genuinely apply. Check how the decision fits the teams who will build and run it.',
        prompts: ['What job are users and teams trying to get done?', 'Which constraints are real, and which are habits?', 'Which team will own this, and does the design fit their boundaries?'],
        models: [['jobs-to-be-done', 'Jobs To Be Done'], ['arguing-from-first-principles', 'Arguing from First Principles'], ['conways-law', "Conway's Law"]],
      },
      {
        title: 'Generate and compare options',
        what: 'Always consider at least three options, including "do nothing" and "buy". Agree the criteria and weights before scoring anything.',
        prompts: ['What would we give up by choosing each option?', 'What happens in two years: on-call, upgrades, cost, skills?'],
        models: [['weighted-decision-matrix', 'Weighted Decision Matrix'], ['opportunity-costs', 'Opportunity Costs'], ['second-order-thinking', 'Second-Order Thinking']],
      },
      {
        title: 'Stress-test the favourite',
        what: 'Before committing, imagine it failed and ask why. Check failure modes and how much headroom the design has.',
        prompts: ['It is a year from now and this decision was a mistake. What happened?', 'What are the worst failure modes, and how would we detect them?'],
        models: [['pre-mortem', 'Pre-mortem'], ['fmea', 'FMEA (Failure Mode and Effects Analysis)'], ['margin-of-safety', 'Margin of Safety']],
      },
      {
        title: 'Record it and revisit it',
        what: 'Write a short Architecture Decision Record next to the code. Set a date or a trigger to revisit, and be willing to change course.',
        prompts: ['What would make us revisit this decision?', 'Knowing what we know now, would we choose it again?'],
        models: [['sunk-cost-fallacy', 'Sunk Cost Fallacy'], ['technical-debt', 'Technical Debt']],
      },
    ],
    template: {
      title: 'Architecture Decision Record (ADR)',
      intro: 'Keep it to one page, stored in the repo (for example docs/adr/0007-choose-event-bus.md).',
      lines: [
        'Title: ADR-NNNN: <decision in a few words>',
        'Status: proposed | accepted | superseded by ADR-NNNN. Date. Decision owner.',
        'Context: the problem, the job to be done, and the constraints that genuinely apply.',
        'Door type: two-way or one-way, and why.',
        'Options considered: at least three, including do nothing / buy.',
        'Criteria and weights, and how each option scored.',
        'Decision: what we chose and the main reasons.',
        'Consequences: what gets easier, what gets harder, new risks, cost.',
        'Revisit when: a date or a trigger (load, cost, team change).',
      ],
    },
    pitfalls: [
      'Running every decision through the heavy process. Most decisions are two-way doors.',
      'Comparing one favoured option against straw men.',
      'Choosing weights after scoring to justify a favourite.',
      'Decisions that live only in a meeting. Without a record, the same debate happens again in a year.',
    ],
    resources: [
      { label: 'Architecture', to: '/architecture' },
      { label: 'Well-Architected Assessment', to: '/architecture/assessment' },
      { label: 'Terraform & Bicep Starter Templates', to: '/architecture/iac-templates' },
    ],
  },
  {
    slug: 'platform-strategy',
    title: 'Platform Strategy Toolkit',
    tagline: 'Decide what your platform team builds, buys and stops doing.',
    whenToUse: 'Starting or resetting a platform, DevOps enablement or internal AI platform team; annual planning; or when the platform feels busy but teams still wait.',
    outcome: 'A one-page strategy: who the platform serves, where the constraint is, what to build versus buy, how to start small, and how you will measure success.',
    time: 'Two or three half-day workshops with the platform team and a few of its users',
    steps: [
      {
        title: 'Map the landscape',
        what: 'Map the value chain from user need to infrastructure, and map how work flows from idea to production today.',
        prompts: ['Which components are commodities, and which make us different?', 'Where does work wait the longest?'],
        models: [['wardley-mapping', 'Wardley Mapping'], ['value-stream-mapping', 'Value Stream Mapping']],
      },
      {
        title: 'Find the constraint',
        what: 'Pick the one bottleneck that limits delivery or reliability most. Everything else waits.',
        prompts: ['If we fixed one thing this quarter, what would unlock the most?', 'Which few causes account for most of the pain?'],
        models: [['theory-of-constraints', 'Theory of Constraints'], ['pareto-principle', 'Pareto Principle (80/20 Rule)']],
      },
      {
        title: 'Decide build, buy or rent, and how teams fit',
        what: 'Buy or rent commodities; build only what differentiates you. Shape team boundaries to match the platform you want.',
        prompts: ['What are we not going to do?', 'What else could this team be doing with the same time?', 'Does the team structure match the architecture we want?'],
        models: [['core-competency', 'Core Competency'], ['opportunity-costs', 'Opportunity Costs'], ['conways-law', "Conway's Law"]],
      },
      {
        title: 'Start with a thin, valuable slice',
        what: 'Treat the platform as a product. Find the job developers need done and ship the smallest golden path that does it well.',
        prompts: ['When a developer starts a new service, what do they actually need?', 'What would prove this is worth more investment?'],
        models: [['jobs-to-be-done', 'Jobs To Be Done'], ['minimum-viable-product', 'Minimum Viable Product (MVP)']],
      },
      {
        title: 'Build momentum and measure outcomes',
        what: 'Set a few outcome-based goals, pair metrics so they cannot be gamed, and grow adoption through a reinforcing loop of value, use and feedback.',
        prompts: ['How will we know teams are better off: lead time, onboarding time, incidents?', 'What would make teams choose the platform rather than be told to use it?'],
        models: [['okrs', 'OKRs (Objectives and Key Results)'], ['goodharts-law', "Goodhart's Law"], ['flywheel-effect', 'Flywheel Effect']],
      },
    ],
    template: {
      title: 'One-page platform strategy',
      intro: 'Fill this in together; revisit it every quarter.',
      lines: [
        'Users: which teams the platform serves, and the top three jobs they need done.',
        'Constraint: the one bottleneck we are attacking this quarter, with the evidence.',
        'Build: the capabilities that differentiate us and that we will own.',
        'Buy / rent: commodity capabilities we will use from vendors or the cloud.',
        'Stop: what we will no longer do.',
        'First slice: the golden path or capability we ship first, and its success criteria.',
        'Outcomes: two or three OKRs, each paired with a guard metric.',
        'Team shape: ownership boundaries and how teams request help.',
      ],
    },
    pitfalls: [
      'Building a platform nobody asked for. Start from developers\' jobs, not from a tooling wish list.',
      'Rebuilding commodities (CI, secrets, observability) instead of buying them.',
      'Measuring adoption by mandate. If teams are forced onto the platform, adoption tells you nothing.',
      'Trying to fix everything at once rather than the current constraint.',
    ],
    resources: [
      { label: 'Platform engineering', to: '/devops/platform-engineering' },
      { label: 'DevOps Maturity Roadmap', to: '/devops/roadmap-guide' },
      { label: 'DevOps Assessment', to: '/devops/assessment' },
    ],
  },
  {
    slug: 'reviews-and-meetings',
    title: 'Better Reviews and Meetings Toolkit',
    tagline: 'Fewer, shorter meetings that end in decisions.',
    whenToUse: 'Design reviews, architecture boards, AI-adoption discussions, quarterly planning, or any recurring meeting that runs long without deciding much.',
    outcome: 'Meetings with a clear purpose and owner, where every voice is heard, risks surface early, and decisions are recorded.',
    time: 'Most reviews fit in 45 minutes with this structure',
    steps: [
      {
        title: 'Decide whether it needs to be a meeting',
        what: 'Status updates and FYIs work better asynchronously. Protect engineers\' focus time and keep meetings for discussion and decisions.',
        prompts: ['Could this be a written update with comments?', 'Is this important, urgent, both, or neither?'],
        models: [['makers-vs-managers-schedule', "Makers vs Manager's Schedule"], ['eisenhower-matrix', 'Eisenhower Matrix']],
      },
      {
        title: 'Set the purpose, owner and pre-read',
        what: 'Every review has one decision owner and a short pre-read sent a day ahead, so the meeting starts from shared context.',
        prompts: ['What decision should we leave with?', 'Who owns that decision?'],
        models: [['directly-responsible-individual', 'Directly Responsible Individual (DRI)'], ['working-backwards', 'Working Backwards']],
      },
      {
        title: 'Run the discussion in parallel, not as a debate',
        what: 'Look at the proposal through one lens at a time so cautious and creative views each get a fair hearing. Separate generating ideas from choosing between them.',
        prompts: ['What are the facts? What do we feel? What could go wrong? What are the benefits? What else could we try?'],
        models: [['six-thinking-hats', 'Six Thinking Hats'], ['divergent-vs-convergent-thinking', 'Divergent vs Convergent Thinking'], ['appreciate-the-art-of-thoughtful-disagreement', 'Appreciate the art of thoughtful disagreement']],
      },
      {
        title: 'Surface risks before they surface you',
        what: 'Spend five minutes imagining the decision has failed. Quieter people often name the most important risks here.',
        prompts: ['It is six months later and this went badly. Why?', 'What would guarantee failure?'],
        models: [['pre-mortem', 'Pre-mortem'], ['inversion', 'Inversion']],
      },
      {
        title: 'Decide, record and improve the meeting',
        what: 'Decide at the speed the door type allows, write the decision down in the meeting, and check every few weeks whether the meeting itself is still worth having.',
        prompts: ['Is this reversible? Then decide now.', 'What will we change about this meeting next time?'],
        models: [['reversible-vs-irreversible-decisions', 'Reversible vs Irreversible Decisions'], ['weighted-decision-matrix', 'Weighted Decision Matrix'], ['kaizen', 'Kaizen']],
      },
    ],
    template: {
      title: '45-minute review agenda',
      intro: 'Works for design reviews, architecture boards and adoption decisions.',
      lines: [
        'Before: one-page pre-read sent a day ahead, with the decision needed and the owner.',
        '0–5 min (Blue hat): purpose, decision owner, how we will decide.',
        '5–10 min (White hat): facts and data; clarifying questions only.',
        '10–20 min (Green and Yellow hats): alternatives and benefits.',
        '20–30 min (Black hat and pre-mortem): risks and failure stories.',
        '30–35 min (Red hat): gut feel, one sentence each.',
        '35–43 min (Blue hat): decide or agree what is needed to decide; record it.',
        '43–45 min: actions, owners, and one improvement to this meeting.',
      ],
    },
    pitfalls: [
      'Meetings without a decision owner, which end with "let\'s take it offline".',
      'The most senior person speaking first and anchoring everyone else.',
      'Debating, rather than exploring one perspective at a time.',
      'Decisions that are not written down, so the same meeting happens again.',
    ],
    resources: [
      { label: 'Community & mentoring', to: '/community' },
      { label: 'Mental Models library', to: '/explore/mental-models' },
    ],
  },
];
