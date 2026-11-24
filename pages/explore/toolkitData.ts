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
  /** The long-form article that explains this toolkit. */
  article?: { title: string; to: string };
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
    article: { title: 'How to Run a Blameless Incident Review That Actually Prevents the Next Outage', to: '/articles/blameless-incident-review' },
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
    article: { title: 'Making Better Architecture Decisions, and Writing Them Down', to: '/articles/architecture-decision-records' },
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
    article: { title: 'Building a Platform Strategy Developers Actually Want to Use', to: '/articles/platform-engineering-strategy' },
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
    article: { title: 'Better Technical Reviews and Meetings: Decide More, Debate Less', to: '/articles/better-technical-reviews-and-meetings' },
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
  {
    slug: 'finops-cost-review',
    title: 'FinOps Cost Review Toolkit',
    tagline: 'A monthly cost review that changes decisions, not just dashboards.',
    article: { title: 'The Monthly FinOps Cost Review: Turning Cloud Bills Into Better Decisions', to: '/articles/monthly-finops-cost-review' },
    whenToUse: 'Once a month for each product or platform team, and whenever spend jumps unexpectedly. It works for cloud, SaaS and AI services alike, including GPU capacity and model API usage.',
    outcome: 'An explanation of what changed and why, cost tied to the value it produces, and three to five owned actions with expected savings, so the next review starts by checking what actually happened.',
    time: '45 minutes, plus 30 minutes of preparation',
    steps: [
      {
        title: 'Start from allocated, trusted numbers',
        what: 'Before anyone discusses savings, make sure the costs on the screen belong to the team in the room. Untagged or shared spend gets its own line, with an owner for fixing the allocation.',
        prompts: ['What share of this month\'s spend is allocated to an owner?', 'Which shared costs (networking, observability, platform) are split, and how?', 'Is anything in this report a surprise to the team that owns it?'],
        models: [['the-map-is-not-the-territory', 'The Map Is Not the Territory'], ['directly-responsible-individual', 'Directly Responsible Individual (DRI)']],
      },
      {
        title: 'Explain the change, not just the total',
        what: 'Break the month-on-month change into its drivers: more usage, new services, price or rate changes, and waste. Most of a change usually comes from a few services, so start there.',
        prompts: ['Which three services explain most of the change?', 'Was the change caused by growth, a design choice, a price change or waste?', 'What did we expect to spend, and why were we wrong?'],
        models: [['pareto-principle', 'Pareto Principle (80/20 Rule)'], ['root-cause-analysis', 'Root Cause Analysis'], ['regression-to-the-mean', 'Regression to the Mean']],
      },
      {
        title: 'Connect cost to value',
        what: 'Total spend rising is fine if the business is growing faster. Track a unit cost, such as cost per order, per active customer or per thousand AI requests, and discuss whether it is improving.',
        prompts: ['What is our unit cost this month, and how has it moved?', 'If usage doubled, would cost double, more than double, or less?', 'Is there spend here that no customer would notice if it stopped?'],
        models: [['return-on-investment', 'Return on Investment (ROI)'], ['economies-of-scale', 'Economies of Scale'], ['goodharts-law', 'Goodhart\'s Law']],
      },
      {
        title: 'Choose a few actions with clear owners',
        what: 'List the options (rightsizing, scheduling, storage tiers, commitments, architecture changes) and score them on savings, effort and risk. Keep three to five, each with an owner, a date and an expected saving.',
        prompts: ['Which action saves the most for the least effort and risk?', 'Is this a one-off clean-up, or a change that keeps saving money?', 'What could this action break, and how will we know?'],
        models: [['weighted-decision-matrix', 'Weighted Decision Matrix'], ['second-order-thinking', 'Second-Order Thinking'], ['opportunity-costs', 'Opportunity Costs']],
      },
      {
        title: 'Make the saving stick',
        what: 'Turn lessons into defaults: tagging policies in the pipeline, budgets and anomaly alerts, schedules for non-production environments and cost estimates in design reviews. Start the next review by checking last month\'s actions.',
        prompts: ['Which of last month\'s actions delivered the expected saving?', 'What guardrail would stop this waste from coming back?', 'What should other teams learn from this month?'],
        models: [['forcing-function', 'Forcing Function'], ['pdca', 'PDCA (Deming Cycle)'], ['kaizen', 'Kaizen']],
      },
    ],
    template: {
      title: 'Monthly cost review agenda',
      intro: 'Send the report a day before. Keep the meeting to decisions.',
      lines: [
        '1. Actions from last month (5 min): done, saving achieved, what we learned.',
        '2. The headline (5 min): total spend, change from last month, forecast for the quarter.',
        '3. Drivers (10 min): the three services behind most of the change, and why.',
        '4. Unit cost (5 min): cost per unit of value, and its trend.',
        '5. Options (10 min): candidate actions scored on saving, effort and risk.',
        '6. Decisions (8 min): three to five actions, each with an owner, a date and an expected saving.',
        '7. Close (2 min): anything to share with other teams or with finance.',
      ],
    },
    pitfalls: [
      'Reviewing spend nobody in the room owns, so no one can act on it.',
      'Celebrating a drop in total spend that came from lower usage, not better efficiency.',
      'Chasing small savings while one large design decision drives most of the bill.',
      'Cutting cost in a way that quietly harms reliability or security.',
      'Never checking whether last month\'s actions delivered.',
    ],
    resources: [
      { label: 'Cost visibility and allocation', to: '/finops/cost-visibility' },
      { label: 'Unit economics', to: '/finops/unit-economics' },
      { label: 'FinOps 30-Day Guide', to: '/finops/30-day-guide' },
      { label: 'FinOps Maturity Assessment', to: '/finops/assessment' },
    ],
  },
  {
    slug: 'ai-use-case-selection',
    title: 'AI Use-Case Selection Toolkit',
    tagline: 'Pick the AI use cases worth building, and drop the rest early.',
    article: { title: 'How to Choose AI Use Cases That Make It to Production', to: '/articles/choosing-ai-use-cases' },
    whenToUse: 'When a team or leadership group has a long list of possible AI ideas and needs to choose a few to pilot, or when pilots are running but none are reaching production.',
    outcome: 'A short list of two or three use cases, each with an owner, a measured baseline, a clear success measure, a known risk tier and a plan for a small first release.',
    time: 'A 90-minute workshop, plus a week to measure baselines',
    steps: [
      {
        title: 'Start from problems, not technology',
        what: 'Collect ideas as problems people actually have: slow, repetitive, error-prone or expensive work. Phrase each one as a question about the outcome, not about a tool.',
        prompts: ['Where do people spend time on repetitive reading, writing or searching?', 'What would change for the customer or the team if this problem went away?', 'Who owns this work today?'],
        models: [['how-might-we', 'How Might We'], ['jobs-to-be-done', 'Jobs To Be Done'], ['brainstorming', 'Brainstorming']],
      },
      {
        title: 'Check whether AI is the right tool',
        what: 'Many ideas are better solved with a rule, a form or a better process. AI suits tasks involving language or judgement where a mostly-right answer that a person checks is still valuable.',
        prompts: ['Could a simple rule, search or automation solve this?', 'How costly is a wrong answer, and who would catch it?', 'Do we have the data and permission to use it?'],
        models: [['arguing-from-first-principles', 'Arguing from First Principles'], ['inversion', 'Inversion'], ['kiss-principle', 'KISS Principle']],
      },
      {
        title: 'Score value, feasibility and risk',
        what: 'Score each remaining idea on business value, feasibility (data, integration, skills) and risk (data sensitivity, customer impact, regulation). High value and feasibility with manageable risk go first.',
        prompts: ['How much time or money would this save, and for how many people?', 'Is the data available, clean and allowed to be used?', 'Which risk tier does this fall into under our AI policy?'],
        models: [['weighted-decision-matrix', 'Weighted Decision Matrix'], ['expected-value', 'Expected Value'], ['cost-benefit-analysis', 'Cost-Benefit Analysis']],
      },
      {
        title: 'Measure the baseline before you build',
        what: 'For each chosen use case, measure how the work performs today: time taken, error rate, cost and satisfaction. Without a baseline, a pilot cannot prove value.',
        prompts: ['How long does this task take today, and how often does it happen?', 'What does success look like in numbers, and by when?', 'What would make us stop the pilot?'],
        models: [['minimum-viable-product', 'Minimum Viable Product (MVP)'], ['falsification-confirmation-bias', 'Falsification / Confirmation Bias']],
      },
      {
        title: 'Pilot small, then scale or stop',
        what: 'Release to a small group with evaluation in place, compare results with the baseline, and decide: scale, adjust or stop. Share the result either way.',
        prompts: ['Did the pilot beat the baseline on the measure we agreed?', 'What did users trust, and what did they check or ignore?', 'What would it cost to run this at full scale?'],
        models: [['pre-mortem', 'Pre-mortem'], ['reversible-vs-irreversible-decisions', 'Reversible vs Irreversible Decisions'], ['sunk-cost-fallacy', 'Sunk Cost Fallacy']],
      },
    ],
    template: {
      title: 'One-page use-case card',
      intro: 'Fill one card per shortlisted idea. If you cannot fill a line, the idea is not ready.',
      lines: [
        'Problem: who has it, how often, and what it costs today.',
        'Proposed AI help: what the model does, and what a person still does.',
        'Owner: one named person accountable for the outcome.',
        'Baseline and target: today\'s measure, the target, and the date.',
        'Data: sources, sensitivity, and permission to use them.',
        'Risk tier and controls: from the AI policy, with the checks needed.',
        'Cost estimate: build effort and running cost at full scale.',
        'Stop rule: the result that would make us stop.',
      ],
    },
    pitfalls: [
      'Starting with a model or vendor and searching for a problem to fit it.',
      'Pilots without baselines, which can never prove they worked.',
      'Ignoring running costs until usage grows and the bill arrives.',
      'Bringing in governance at the end, where it blocks launch instead of shaping the design.',
      'Keeping a failing pilot alive because of the effort already spent.',
    ],
    resources: [
      { label: 'GenAI Adoption Framework', to: '/genai/adoption-framework' },
      { label: 'AI governance', to: '/genai/governance' },
      { label: 'GenAI Readiness Assessment', to: '/genai/assessment' },
    ],
  },
  {
    slug: 'team-health-check',
    title: 'Team Health Check Toolkit',
    tagline: 'A regular, honest look at how a team is really doing.',
    article: { title: 'The Quarterly Team Health Check: A Simple Way to See How Your Team Is Really Doing', to: '/articles/team-health-check' },
    whenToUse: 'Every quarter for each team, after a reorganisation or a hard stretch, or when delivery metrics look fine but something feels wrong.',
    outcome: 'A shared picture of the team\'s health across a few dimensions, the trend since last time, and one or two improvements the team chooses and owns.',
    time: '60 minutes, every quarter',
    steps: [
      {
        title: 'Make it safe to be honest',
        what: 'The health check belongs to the team, not to management. Agree up front that results are for the team to improve, not for ranking teams, and that the facilitator is neutral.',
        prompts: ['Who will see the results, and what will they be used for?', 'What would make people hold back, and how do we remove that?'],
        models: [['trust', 'Trust'], ['radical-transparency', 'Radical Transparency'], ['goodharts-law', 'Goodhart\'s Law']],
      },
      {
        title: 'Rate a few dimensions independently',
        what: 'Pick six to ten dimensions, such as clear purpose, delivering value, speed, quality of code and tools, ease of release, learning, support, fun and workload. Each person rates them green, amber or red, privately first.',
        prompts: ['What does "green" look like for this dimension?', 'Which way is each dimension trending since last quarter?'],
        models: [['six-thinking-hats', 'Six Thinking Hats'], ['brainstorming', 'Brainstorming']],
      },
      {
        title: 'Discuss the patterns, not the scores',
        what: 'Reveal the ratings together. Spend time where views differ or where things have got worse. Look for causes in the system, such as process, tools and workload, before anything personal.',
        prompts: ['Where do we disagree most, and why?', 'What changed since last time?', 'Which of these is a symptom of something deeper?'],
        models: [['5-whys', '5 Whys'], ['systems-thinking', 'Systems Thinking'], ['hanlons-razor', 'Hanlon\'s Razor']],
      },
      {
        title: 'Choose one or two improvements',
        what: 'Pick the improvements that would help most and that the team can influence. Each gets an owner and a check-in date. Anything outside the team\'s control goes to the manager with a clear request.',
        prompts: ['Which change would make next quarter noticeably better?', 'What is in our control, and what do we need help with?'],
        models: [['eisenhower-matrix', 'Eisenhower Matrix'], ['pareto-principle', 'Pareto Principle (80/20 Rule)'], ['directly-responsible-individual', 'Directly Responsible Individual (DRI)']],
      },
      {
        title: 'Follow up and repeat',
        what: 'Start the next health check by reviewing the previous improvements. Over time, the trend matters more than any single result.',
        prompts: ['Did last quarter\'s improvements happen, and did they help?', 'What should we keep doing that is working?'],
        models: [['kaizen', 'Kaizen'], ['pdca', 'PDCA (Deming Cycle)'], ['feedback-loops', 'Feedback Loops']],
      },
    ],
    template: {
      title: 'Health check board',
      intro: 'One row per dimension. Each person votes green, amber or red, then the team adds a trend arrow and notes.',
      lines: [
        'Purpose: we know why our work matters and where we are heading.',
        'Delivering value: we ship things users actually benefit from.',
        'Speed and flow: work moves without long waits.',
        'Code, tools and release: our codebase and pipeline help rather than hinder.',
        'Learning: we have time to learn and improve.',
        'Support: we get help when we need it, inside and outside the team.',
        'Workload: the pace is sustainable.',
        'Fun and trust: we enjoy working together and can be honest.',
        'Agreed improvements: one or two, each with an owner and a check-in date.',
      ],
    },
    pitfalls: [
      'Using the results to compare or rank teams, which guarantees dishonest answers next time.',
      'Running the check and never acting on it.',
      'Choosing too many improvements, so none get done.',
      'Treating a red rating as a complaint about a person rather than a signal about the system.',
    ],
    resources: [
      { label: 'Agile Maturity Assessment', to: '/agile/assessment' },
      { label: 'DevOps Maturity Assessment', to: '/devops/assessment' },
      { label: 'Community & mentoring', to: '/community' },
    ],
  },
];
