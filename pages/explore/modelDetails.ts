/**
 * Fuller detail for mental models, shown under "More detail" on each card.
 * Keys are model anchors (see slugOf in MentalModels.tsx); `related` holds anchors too.
 * Written for the Practitioner's 25 first; add more models here over time.
 */
export interface ModelDetail {
  /** The situation that calls for this model. */
  whenToUse: string;
  /** Three or four practical steps. */
  howTo: string[];
  /** The common ways it gets misused. */
  watchOut: string;
  /** Anchors of closely related models. */
  related: string[];
}

export const MODEL_DETAILS: Record<string, ModelDetail> = {
  'arguing-from-first-principles': {
    whenToUse: 'When a process, standard or "best practice" is slowing a team down and nobody can say why it exists, or when an AI or cloud shift changes the economics everyone assumed.',
    howTo: [
      'Write down the current practice and the outcome it is supposed to protect.',
      'Strip it back to facts you can verify: the risk, the cost, the constraint.',
      'Ask what the cheapest, fastest way to protect that outcome would be if you designed it today.',
      'Compare the two openly with the people who own the original process.',
    ],
    watchOut: 'First principles can sound like dismissing experience. Many old rules encode a lesson from an incident; find that story before you remove the rule.',
    related: ['second-order-thinking', 'inversion', 'the-map-is-not-the-territory'],
  },
  'second-order-thinking': {
    whenToUse: 'Before adopting a tool, platform or policy that looks like an obvious win, especially anything that adds something new to operate.',
    howTo: [
      'State the first-order benefit you expect.',
      'Ask "and then what?" three times: for the team running it, the teams depending on it, and the budget.',
      'Look a year or two ahead: on-call load, upgrades, skills, licence growth, data gravity.',
      'Decide with those effects on the table, and plan mitigations for the worst one.',
    ],
    watchOut: 'It can turn into analysis paralysis. For reversible choices, a quick pass is enough; save the deep look for one-way doors.',
    related: ['reversible-vs-irreversible-decisions', 'unintended-consequences', 'technical-debt'],
  },
  'inversion': {
    whenToUse: 'At the start of a programme, migration or reliability plan, or whenever a team is too optimistic to see the risks.',
    howTo: [
      'Ask the opposite question: "How would we guarantee this fails?" or "How could we take production down?"',
      'Collect every answer without debate; quantity matters more than polish.',
      'Group the answers and pick the few that are most likely or most damaging.',
      'Turn each into a guardrail, test, alert or checklist item.',
    ],
    watchOut: 'Inversion finds what to avoid, not what to do. Pair it with a positive goal so the team does not end up only defending.',
    related: ['pre-mortem', 'via-negativa', 'murphys-law'],
  },
  'systems-thinking': {
    whenToUse: 'When the same problem keeps coming back despite fixes: recurring incidents, on-call burnout, delivery that slows every quarter.',
    howTo: [
      'Draw the parts involved (teams, tools, policies, incentives) and how they influence each other.',
      'Look for loops: what makes the problem grow, and what is supposed to keep it in check.',
      'Find the structure producing the behaviour, such as alert rules, release cadence or ownership gaps.',
      'Change the structure, then watch the behaviour over weeks rather than days.',
    ],
    watchOut: 'Systems thinking is not a reason to avoid accountability. Use it to fix the environment, and still agree who owns each change.',
    related: ['feedback-loops', 'conways-law', 'emergence'],
  },
  'feedback-loops': {
    whenToUse: 'Designing pipelines, alerting, FinOps reporting or AI evaluation: anywhere a team needs to learn whether a change worked.',
    howTo: [
      'Identify the question the loop answers ("did this break anything?", "did this cost more?").',
      'Measure how long it currently takes to get the answer.',
      'Shorten it: faster tests, earlier checks, smaller changes, daily cost data, automated evals.',
      'Make the signal reach the person who can act on it, not a shared inbox.',
    ],
    watchOut: 'A fast but noisy loop teaches people to ignore it. Flaky tests and false-alarm alerts are worse than slower, trustworthy signals.',
    related: ['systems-thinking', 'ooda-loop', 'kaizen'],
  },
  'conways-law': {
    whenToUse: 'Before a re-organisation, a re-platforming, a move to microservices, or setting up a platform or AI team.',
    howTo: [
      'Sketch the current team structure and how teams actually communicate.',
      'Sketch the target architecture next to it.',
      'Where they differ, decide whether to change the design or the teams (the Inverse Conway Manoeuvre).',
      'Give each team clear ownership of the components it builds and runs.',
    ],
    watchOut: 'Reshuffling teams is disruptive; don\'t do it for every architectural idea. Change team boundaries when the architecture is a long-term commitment.',
    related: ['systems-thinking', 'theory-of-constraints', 'directly-responsible-individual'],
  },
  'theory-of-constraints': {
    whenToUse: 'When delivery feels slow and everyone is busy, or when adding people or AI tools has not increased throughput.',
    howTo: [
      'Identify the constraint: where does work wait the longest?',
      'Exploit it: make sure the constraint never waits for work and never does unnecessary work.',
      'Subordinate everything else: don\'t start more work than the constraint can finish.',
      'Elevate it (automation, AI first-pass review, more people), then look for the next constraint.',
    ],
    watchOut: 'Speeding up a step that is not the constraint just builds a bigger queue. AI coding assistants often move the bottleneck to review and testing.',
    related: ['value-stream-mapping', 'kanban', 'local-vs-global-optimum'],
  },
  'value-stream-mapping': {
    whenToUse: 'Starting work with a new team, justifying investment in delivery, or finding out where lead time really goes.',
    howTo: [
      'Pick one type of work, such as a small feature, and follow it from idea to production.',
      'List every step with the time spent working on it and the time spent waiting.',
      'Calculate flow efficiency: working time divided by total lead time.',
      'Target the biggest waits first, usually approvals, handoffs and environments.',
    ],
    watchOut: 'Map how work actually flows, not how the process document says it flows. Walk the real path with the people who do it.',
    related: ['theory-of-constraints', 'muda', 'gemba'],
  },
  'pareto-principle': {
    whenToUse: 'Prioritising cloud cost reduction, alert clean-up, bug fixing or incident follow-ups when there is more to do than time.',
    howTo: [
      'Gather the data: spend by service, incidents by cause, alerts by rule.',
      'Sort it from largest to smallest and look at the cumulative total.',
      'Work the top items until the curve flattens.',
      'Re-sort regularly; the top items change as you fix them.',
    ],
    watchOut: 'The rarest items can still be the most important, such as a security risk or a once-a-year outage. Don\'t let the long tail hide high-severity issues.',
    related: ['eisenhower-matrix', 'power-laws', 'opportunity-costs'],
  },
  'goodharts-law': {
    whenToUse: 'Setting targets or OKRs, introducing DORA metrics, or measuring AI adoption and productivity.',
    howTo: [
      'For every metric, write down the outcome it is meant to reflect.',
      'Pair opposing metrics, such as speed with stability or cost with performance.',
      'Use metrics for learning and conversation, not individual performance ratings.',
      'Review whether the numbers still move with the outcome; retire metrics that no longer do.',
    ],
    watchOut: 'Measuring "AI usage" or "lines of code generated" invites gaming immediately. Measure outcomes like lead time and change failure rate instead.',
    related: ['okrs', 'incentives', 'proxy'],
  },
  'okrs': {
    whenToUse: 'Aligning teams on a quarter\'s priorities, especially across a DevOps, SRE or AI transformation where outcomes matter more than activity.',
    howTo: [
      'Write one inspiring objective in plain words ("Make releases boring").',
      'Add three to five measurable key results that prove the objective was met.',
      'Let teams propose how to achieve them; the initiatives are not the key results.',
      'Check progress every few weeks and score honestly at the end; 70% is often a good result.',
    ],
    watchOut: 'Task lists dressed as key results ("set up dashboards") tell you nothing about impact. Too many OKRs mean no priorities at all.',
    related: ['goodharts-law', 'smart-formula', 'working-backwards'],
  },
  'cynefin-framework': {
    whenToUse: 'Deciding how to approach a problem: whether to follow a runbook, bring in experts, run experiments, or act immediately.',
    howTo: [
      'Ask whether cause and effect are obvious (Clear), knowable with expertise (Complicated), only clear in hindsight (Complex) or absent (Chaotic).',
      'Clear: apply the known practice. Complicated: analyse with experts.',
      'Complex: run small, safe-to-fail experiments and amplify what works.',
      'Chaotic: act to stabilise first, then move the problem into another domain.',
    ],
    watchOut: 'Treating a complex problem, such as culture change or AI adoption, as complicated leads to big plans that reality ignores.',
    related: ['ooda-loop', 'reversible-vs-irreversible-decisions', 'scientific-method'],
  },
  'reversible-vs-irreversible-decisions': {
    whenToUse: 'Whenever a decision is stuck in review, or when deciding how much process a change really needs.',
    howTo: [
      'Ask: if this turns out wrong, how quickly and cheaply can we undo it?',
      'Two-way doors (feature flags, config, most tooling trials): decide quickly, close to the work.',
      'One-way doors (data migrations, vendor contracts, public APIs): slow down and involve the right people.',
      'Where you can, turn one-way doors into two-way doors: flags, dual-running, exit plans.',
    ],
    watchOut: 'Some decisions look reversible but build lock-in over time. Revisit tool choices before the switching cost becomes too high.',
    related: ['second-order-thinking', 'preserving-optionality', 'switching-costs'],
  },
  'ooda-loop': {
    whenToUse: 'During incidents and other fast-moving situations where waiting for perfect information costs more than acting.',
    howTo: [
      'Observe: gather signals quickly, such as dashboards, recent changes and customer reports.',
      'Orient: make sense of them against what you know about the system.',
      'Decide on the smallest safe action, such as rolling back or failing over.',
      'Act, then observe again; keep cycling until the situation is stable.',
    ],
    watchOut: 'Speed without orientation is just thrashing. Keep a scribe so the team does not repeat actions or lose track of what was tried.',
    related: ['cynefin-framework', 'feedback-loops', 'blameless-post-mortem'],
  },
  'wardley-mapping': {
    whenToUse: 'Platform strategy, build-versus-buy decisions, and deciding where engineering and AI investment should go.',
    howTo: [
      'Start with the user and their need, then list the components that meet it.',
      'Place components vertically by how visible they are to the user.',
      'Place them horizontally by evolution: Genesis, Custom-built, Product, Commodity.',
      'Buy or rent commodities; invest your best people in the custom parts that differentiate you.',
    ],
    watchOut: 'A map is a conversation tool, not a precise model. Its value comes from the team debating where things sit.',
    related: ['core-competency', 'the-map-is-not-the-territory', 'jobs-to-be-done'],
  },
  '5-whys': {
    whenToUse: 'Post-incident reviews, recurring build failures, or any problem where the obvious fix feels too shallow.',
    howTo: [
      'State the problem precisely, with evidence: what happened, when and to whom.',
      'Ask why it happened, and check the answer against data, not opinion.',
      'Repeat until you reach a cause the team can change, often four to six times.',
      'Agree an action for that cause, with an owner and a date.',
    ],
    watchOut: 'A single chain of whys can miss contributing causes, and it can drift towards blaming a person. Use a fishbone diagram for complex incidents.',
    related: ['root-cause-analysis', 'fishbone-diagram', 'blameless-post-mortem'],
  },
  'blameless-post-mortem': {
    whenToUse: 'After any significant incident, near miss, failed release, or AI system behaving badly in production.',
    howTo: [
      'Build a timeline from logs, chat and alerts before the meeting.',
      'Ask what made the failure possible and easy, not who caused it.',
      'Identify contributing factors across people, process and technology.',
      'Agree a small number of tracked actions, and share the write-up widely.',
    ],
    watchOut: 'Blameless does not mean actionless. A review without owned follow-ups teaches people that reviews don\'t matter.',
    related: ['5-whys', 'swiss-cheese-model', 'pre-mortem'],
  },
  'pre-mortem': {
    whenToUse: 'Before a migration, launch, major release or AI rollout, ideally once the plan exists but before work starts.',
    howTo: [
      'Ask the team to imagine it is three months later and the project has failed badly.',
      'Everyone writes down, independently, the reasons it failed.',
      'Share and group the reasons; vote on the most likely and most damaging.',
      'Turn the top risks into tasks, tests, rollback steps or decision points in the plan.',
    ],
    watchOut: 'If people don\'t feel safe naming risks, the pre-mortem becomes a formality. Leaders should go last so they don\'t anchor the group.',
    related: ['inversion', 'fmea', 'blameless-post-mortem'],
  },
  'swiss-cheese-model': {
    whenToUse: 'Designing layered controls (review, tests, canaries, alerts, guardrails for AI agents) or analysing how a failure got through.',
    howTo: [
      'List the layers of defence between a mistake and a customer impact.',
      'For an incident, mark which layers it passed through and why each one missed.',
      'Strengthen the cheapest layers to improve, not only the last one that failed.',
      'Check that layers are independent and don\'t share the same blind spot.',
    ],
    watchOut: 'Adding layers adds friction. Each layer should catch something the others cannot, or it is just ceremony.',
    related: ['blameless-post-mortem', 'margin-of-safety', 'redundancy'],
  },
  'technical-debt': {
    whenToUse: 'Making the case for platform, reliability or refactoring work, or deciding whether to take a shortcut to hit a date.',
    howTo: [
      'Name the debt specifically: the shortcut, where it lives and why it was taken.',
      'Estimate the interest: extra time per change, incidents, onboarding friction, security exposure.',
      'Decide to pay it down, refinance it (contain it behind an interface) or accept it consciously.',
      'Reserve regular capacity for paying it down rather than waiting for a rewrite.',
    ],
    watchOut: '"Technical debt" can become a label for any code people dislike. Prioritise debt by the interest the business actually pays.',
    related: ['second-order-thinking', 'compounding', 'version-two-is-a-lie'],
  },
  'kaizen': {
    whenToUse: 'Sustaining improvement after a transformation programme ends, or in teams that feel too busy to improve.',
    howTo: [
      'End every retrospective with one small improvement, not a list.',
      'Give it an owner and make it visible on the team board.',
      'Check at the next retrospective whether it helped, and keep or drop it.',
      'Celebrate the accumulated gains every quarter.',
    ],
    watchOut: 'Small improvements cannot fix a broken system. Combine kaizen with occasional bigger changes when the constraint demands it.',
    related: ['pdca', 'compounding', 'theory-of-constraints'],
  },
  'six-thinking-hats': {
    whenToUse: 'Architecture reviews, AI-adoption decisions, or any discussion where a few strong voices dominate.',
    howTo: [
      'Explain the six hats briefly and agree an order (often Blue, White, Green, Yellow, Black, Red, Blue).',
      'Spend a few minutes per hat, with everyone using the same hat at the same time.',
      'Capture the output of each hat separately.',
      'Finish with the Blue hat to summarise and agree next steps.',
    ],
    watchOut: 'It can feel artificial at first. Keep the timing tight and explain that it gives cautious and creative views each a fair hearing.',
    related: ['lateral-thinking', 'divergent-vs-convergent-thinking', 'appreciate-the-art-of-thoughtful-disagreement'],
  },
  'circle-of-competence': {
    whenToUse: 'Making decisions in an unfamiliar domain, such as a new cloud service, an AI technique or a regulated area.',
    howTo: [
      'Be honest about which parts of the decision you understand deeply and which you don\'t.',
      'Inside your circle, decide with confidence.',
      'Outside it, ask the people closest to the problem and seek out someone who disagrees.',
      'Grow the circle deliberately through hands-on work, not just reading.',
    ],
    watchOut: 'Senior leaders are especially prone to overestimating their circle. Saying "I don\'t know, who does?" builds trust rather than losing it.',
    related: ['dunning-kruger-effect', 'believability-weighting', 'generalist-vs-specialist'],
  },
  'eisenhower-matrix': {
    whenToUse: 'Weekly planning, especially when urgent requests and incidents crowd out platform, reliability or learning work.',
    howTo: [
      'Sort your work into four boxes: urgent and important, important but not urgent, urgent but not important, neither.',
      'Do the urgent and important; schedule the important but not urgent.',
      'Delegate or batch the urgent but not important.',
      'Drop the rest, and protect time for the second box before the week fills up.',
    ],
    watchOut: 'Everything feels urgent in operations. If most work lands in the first box, the system needs fixing, not just better personal planning.',
    related: ['pareto-principle', 'makers-vs-managers-schedule', 'parkinsons-law'],
  },
  'margin-of-safety': {
    whenToUse: 'Capacity planning, setting SLOs and error budgets, estimating delivery dates, and planning team workload.',
    howTo: [
      'Estimate the expected load, duration or demand.',
      'Add explicit headroom based on how uncertain the estimate is and how costly a shortfall would be.',
      'Make the headroom visible so it isn\'t quietly consumed.',
      'Review it against reality and adjust over time.',
    ],
    watchOut: 'Too much margin wastes money, especially in the cloud. Use autoscaling and good forecasting to keep the margin right-sized.',
    related: ['redundancy', 'swiss-cheese-model', 'antifragility'],
  },
};
