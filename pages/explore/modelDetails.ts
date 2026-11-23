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
  // ── Wave 2 ──────────────────────────────────────────────────────────────
  'fishbone-diagram': {
    whenToUse: 'Complex incidents or chronic problems with several contributing causes, where a single 5 Whys chain would oversimplify.',
    howTo: [
      'Write the problem as the fish\'s head, stated as an observable effect ("p95 latency doubled after Tuesday\'s release").',
      'Draw the bones as categories: People, Process, Technology, Tooling, Environment, Dependencies.',
      'Brainstorm causes under each bone with the people closest to the work, then mark the ones supported by evidence.',
      'Pick the two or three best-supported causes and dig into each with 5 Whys.',
    ],
    watchOut: 'A fishbone full of guesses looks thorough but proves nothing. Separate what the data shows from what people suspect.',
    related: ['5-whys', 'root-cause-analysis', 'blameless-post-mortem'],
  },
  'root-cause-analysis': {
    whenToUse: 'After significant incidents, repeat failures, or any time a quick fix has been applied twice to the same problem.',
    howTo: [
      'Stabilise first, then gather evidence: timeline, logs, metrics, changes, chat history.',
      'Use the right tool for the shape of the problem: 5 Whys for a simple chain, a fishbone for many causes, a fault tree for combinations.',
      'Separate the trigger (what started it) from the root and contributing causes (why it could happen and spread).',
      'Fix at the level of the system: guardrails, tests, alerts, ownership, and verify the fix later.',
    ],
    watchOut: 'Complex systems rarely have a single root cause. Look for several contributing factors rather than stopping at the first satisfying answer.',
    related: ['5-whys', 'fishbone-diagram', 'swiss-cheese-model'],
  },
  'fault-tree-analysis': {
    whenToUse: 'Designing for reliability on critical paths, or analysing an outage caused by a combination of failures.',
    howTo: [
      'Put the unwanted event at the top ("checkout unavailable").',
      'Break it into the conditions that could cause it, joined by AND (all needed) or OR (any one is enough) gates.',
      'Continue until you reach basic events you can measure or control.',
      'Focus on OR gates near the top: each is a single point of failure worth removing.',
    ],
    watchOut: 'Trees grow fast. Keep to the paths that matter for the event you care about, and update the tree when the architecture changes.',
    related: ['fmea', 'redundancy', 'swiss-cheese-model'],
  },
  'fmea': {
    whenToUse: 'Before launching a critical service, a major migration, or an AI feature that customers will rely on.',
    howTo: [
      'List the components or steps, and for each, the ways it could fail.',
      'Score each failure mode for severity, likelihood and how hard it is to detect (1–10 each).',
      'Multiply for a Risk Priority Number and sort; work from the top.',
      'Add mitigations (retries, timeouts, fallbacks, alerts, evals) and re-score.',
    ],
    watchOut: 'The scores are judgement, not science. Use them to start the conversation and rank roughly, not to argue about a 6 versus a 7.',
    related: ['pre-mortem', 'fault-tree-analysis', 'margin-of-safety'],
  },
  'pdca': {
    whenToUse: 'Any improvement you are not sure will work: a new on-call rota, WIP limits, an AI coding assistant pilot.',
    howTo: [
      'Plan: state the change, the expected result and how you will measure it.',
      'Do: try it at small scale, with one team or for a few weeks.',
      'Check: compare the results with the expectation, honestly.',
      'Act: adopt, adapt or abandon, then start the next cycle.',
    ],
    watchOut: 'Skipping Check is the classic failure: the pilot quietly becomes the standard without anyone confirming it worked.',
    related: ['kaizen', 'scientific-method', 'a3-problem-solving'],
  },
  'a3-problem-solving': {
    whenToUse: 'A problem worth a structured look that has to be explained to leadership or other teams, such as rising cloud cost or slow releases.',
    howTo: [
      'On one page, write the background and why it matters.',
      'Describe the current state with data, and the target state.',
      'Show the root-cause analysis and the countermeasures with owners and dates.',
      'Review it with stakeholders, and add a follow-up section on whether it worked.',
    ],
    watchOut: 'The point is the thinking, not the template. A beautifully formatted A3 with no data is just a slide.',
    related: ['pdca', 'root-cause-analysis', 'dmaic'],
  },
  'kanban': {
    whenToUse: 'Teams with unpredictable, interrupt-driven work: SRE, platform support, security operations, data and AI ops.',
    howTo: [
      'Visualise every step work goes through on a board.',
      'Set work-in-progress limits per column or per person, and respect them.',
      'Measure lead time and throughput, and review blocked items daily.',
      'Make policies explicit (what "ready" and "done" mean) and improve them in regular reviews.',
    ],
    watchOut: 'A board without WIP limits is just a to-do list. The limits are what create flow and expose bottlenecks.',
    related: ['theory-of-constraints', 'scrumban', 'value-stream-mapping'],
  },
  'scrum': {
    whenToUse: 'Product teams building something new where requirements will change and regular stakeholder feedback is valuable.',
    howTo: [
      'Keep one ordered Product Backlog owned by one Product Owner.',
      'Plan a sprint goal, not just a list of tickets, and deliver a usable increment every sprint.',
      'Use the review for real feedback from users and stakeholders, not a status presentation.',
      'End every sprint with a retrospective and one improvement.',
    ],
    watchOut: 'Scrum ceremonies without engineering practices (CI, tests, small releases) produce the same slow, risky delivery in two-week slices.',
    related: ['extreme-programming', 'kanban', 'the-agile-manifesto'],
  },
  'extreme-programming': {
    whenToUse: 'When change is risky or slow because the code is hard to change safely, regardless of which planning framework you use.',
    howTo: [
      'Start with continuous integration on trunk and a fast, reliable test suite.',
      'Introduce test-driven development for new code and for every bug fix.',
      'Pair or mob on complex or risky changes; review smaller changes more often.',
      'Refactor continuously and release in small increments.',
    ],
    watchOut: 'Adopting practices piecemeal without the safety net of tests and CI can make things worse. Build the safety net first.',
    related: ['scrum', 'feedback-loops', 'technical-debt'],
  },
  'the-agile-manifesto': {
    whenToUse: 'When agile has turned into ceremonies and tooling, and a team needs to reconnect with why it is working this way.',
    howTo: [
      'Read the four values and twelve principles with the team.',
      'For each value, ask where your current way of working favours the right-hand side.',
      'Pick one principle you are furthest from and run a small experiment to close the gap.',
      'Revisit it periodically, especially when adding process.',
    ],
    watchOut: '"We value working software over documentation" doesn\'t mean no documentation. The manifesto is about emphasis, not elimination.',
    related: ['scrum', 'extreme-programming', 'lean-software-development'],
  },
  'lean-portfolio-management': {
    whenToUse: 'When annual project budgets and stage gates slow down delivery, or when a portfolio of DevOps, platform and AI initiatives needs prioritising.',
    howTo: [
      'Fund long-lived value streams or products rather than individual projects.',
      'Run big initiatives as epics through a Portfolio Kanban with a lean business case and an MVP.',
      'Review outcomes regularly and shift funding between value streams based on evidence.',
      'Replace phase-gate governance with lightweight guardrails: budgets, WIP limits, compliance checks.',
    ],
    watchOut: 'LPM needs finance and leadership on board. Changing the engineering side alone just recreates projects under new names.',
    related: ['safe', 'okrs', 'minimum-viable-product'],
  },
  'safe': {
    whenToUse: 'Large programmes with many teams building one solution and heavy cross-team dependencies, often in regulated enterprises.',
    howTo: [
      'Form Agile Release Trains around value streams, not around existing departments.',
      'Hold PI Planning every 8–12 weeks with all teams in the room (or on the call) together.',
      'Make dependencies visible on a shared programme board and manage them weekly.',
      'Add Lean Portfolio Management only when the train level works well.',
    ],
    watchOut: 'SAFe can add layers of roles and ceremony. Start with the smallest configuration that solves your coordination problem, and keep engineering practices strong.',
    related: ['lean-portfolio-management', 'less', 'conways-law'],
  },
  'muda': {
    whenToUse: 'When a team is busy but delivery is slow, or when cloud and tooling spend keeps growing without clear value.',
    howTo: [
      'Walk through a value stream and tag waste using DOWNTIME or the software list: partially done work, extra features, relearning, handoffs, delays, task switching, defects.',
      'Estimate the cost of each waste in time or money.',
      'Remove the biggest one first, often waiting and handoffs.',
      'Repeat regularly; waste returns as systems grow.',
    ],
    watchOut: 'Some "waste" is necessary, such as compliance checks. Ask whether it can be automated or made cheaper before trying to remove it.',
    related: ['value-stream-mapping', 'lean-software-development', '5s'],
  },
  'gemba': {
    whenToUse: 'Before deciding how to fix a team\'s delivery or operations problem from a dashboard or a status report.',
    howTo: [
      'Go to where the work happens: sit with on-call, watch a release, pair on a pipeline fix.',
      'Observe and ask questions; resist the urge to solve on the spot.',
      'Note where people wait, work around tools, or repeat manual steps.',
      'Bring what you saw back into planning, with the team.',
    ],
    watchOut: 'A Gemba walk that feels like an inspection teaches people to perform. Go to learn, and say so.',
    related: ['the-map-is-not-the-territory', 'value-stream-mapping', 'muda'],
  },
  '5s': {
    whenToUse: 'Cluttered cloud accounts, repositories, pipelines, dashboards or backlogs that slow everyone down.',
    howTo: [
      'Sort: remove what is unused (stale resources, dead dashboards, abandoned branches).',
      'Set in order: name, tag and group what remains so it is easy to find.',
      'Shine: fix what is noisy or broken, such as flaky tests and false alerts.',
      'Standardise and Sustain: codify the rules as policy and review them on a schedule.',
    ],
    watchOut: 'A one-off clean-up decays within months. The last two S\'s, standardising and sustaining, are what make it stick.',
    related: ['muda', 'kaizen', 'technical-debt'],
  },
  'minimum-viable-product': {
    whenToUse: 'Testing a new product idea, platform capability or AI feature before investing heavily in it.',
    howTo: [
      'Write down the riskiest assumption: will people use it, will it work, will it pay off?',
      'Design the smallest thing that tests that assumption with real users.',
      'Define success criteria before you launch it.',
      'Decide to persevere, pivot or stop based on the evidence.',
    ],
    watchOut: 'An MVP is not a low-quality version 1. It should be small, but still reliable and secure enough for the people using it.',
    related: ['jobs-to-be-done', 'pdca', 'time-value-of-shipping'],
  },
  'jobs-to-be-done': {
    whenToUse: 'Designing internal platforms, developer tools and AI assistants, where it is easy to build features nobody asked for.',
    howTo: [
      'Interview users about the job they are trying to get done, not the feature they want.',
      'Write it as "When [situation], I want to [motivation], so I can [outcome]".',
      'Look at how they do it today and what they find frustrating.',
      'Design and measure against the job, not the feature list.',
    ],
    watchOut: 'Asking "what do you want?" gets feature requests. Asking "tell me about the last time you…" gets the real job.',
    related: ['minimum-viable-product', 'working-backwards', 'wardley-mapping'],
  },
  'flywheel-effect': {
    whenToUse: 'Building momentum for a platform, a community of practice, or adoption of DevOps or AI practices.',
    howTo: [
      'Map the reinforcing loop: better platform → more teams adopt → more feedback and contribution → better platform.',
      'Find the step that is weakest today and invest there.',
      'Measure the loop, not just one step, such as adoption and contributions together.',
      'Keep pushing consistently; flywheels reward persistence over big launches.',
    ],
    watchOut: 'A loop can also spin the wrong way: a poor platform loses users, gets less feedback and gets worse. Watch for the reverse flywheel.',
    related: ['feedback-loops', 'network-effects', 'compounding'],
  },
  'antifragility': {
    whenToUse: 'Designing systems, teams and practices that should get stronger from stress, such as chaos engineering and incident learning.',
    howTo: [
      'Introduce small, controlled stresses: game days, chaos experiments, fire drills.',
      'Learn from each one and feed the lessons into design and runbooks.',
      'Avoid optimising so tightly that there is no slack left to absorb shocks.',
      'Reward people for surfacing problems early.',
    ],
    watchOut: 'Stressing a system with no safety net just breaks it. Build observability and rollback before running chaos experiments.',
    related: ['margin-of-safety', 'black-swan', 'blameless-post-mortem'],
  },
  'directly-responsible-individual': {
    whenToUse: 'Any piece of work owned by "the team" or "everyone": incident follow-ups, cross-team initiatives, platform migrations.',
    howTo: [
      'Name one person accountable for each outcome, even when many contribute.',
      'Make the DRI visible on the ticket, the board and in meetings.',
      'Give them the authority and time to drive it, not just the blame if it slips.',
      'Rotate DRIs to grow leadership across the team.',
    ],
    watchOut: 'A DRI owns the outcome, not all the work. If they end up doing everything alone, the role becomes a burnout route.',
    related: ['own-your-outcomes', 'conways-law', 'okrs'],
  },
  'makers-vs-managers-schedule': {
    whenToUse: 'When engineers struggle to find focus time, or when leaders schedule meetings across the team\'s day.',
    howTo: [
      'Agree protected focus blocks for the team, such as no-meeting mornings.',
      'Cluster meetings into a few predictable windows.',
      'Use asynchronous updates for status and keep meetings for decisions and discussion.',
      'Leaders: check your calendar habits against the team\'s focus blocks.',
    ],
    watchOut: 'On-call and incident duty break any schedule. Plan rotations so the same people aren\'t always interrupted.',
    related: ['eisenhower-matrix', 'parkinsons-law', 'deliberate-practice'],
  },
  'hanlons-razor': {
    whenToUse: 'When another team\'s change breaks something, a deadline is missed, or a message reads as hostile.',
    howTo: [
      'Pause before assuming intent.',
      'Look for the simpler explanation: missing information, unclear ownership, time pressure, a bad tool.',
      'Ask a curious question rather than making an accusation.',
      'Fix the system that made the mistake easy.',
    ],
    watchOut: 'Hanlon\'s Razor is a default, not a blindfold. Security incidents and repeated patterns deserve a proper look at intent too.',
    related: ['blameless-post-mortem', 'trust', 'occams-razor'],
  },
  'opportunity-costs': {
    whenToUse: 'Choosing between investments: a migration versus new features, building a platform versus buying one, or which AI use case to fund first.',
    howTo: [
      'List the realistic alternatives, including "do nothing".',
      'Estimate the value of the best alternative you would give up.',
      'Include people\'s time, the scarcest resource, not just money.',
      'Make the trade-off explicit in the decision record.',
    ],
    watchOut: 'Opportunity cost is easy to ignore because it is invisible. If a proposal never mentions what it displaces, ask.',
    related: ['weighted-decision-matrix', 'sunk-cost-fallacy', 'pareto-principle'],
  },
  'sunk-cost-fallacy': {
    whenToUse: 'Deciding whether to continue a struggling migration, platform build, vendor contract or AI project.',
    howTo: [
      'Set aside what has already been spent; it cannot be recovered either way.',
      'Ask: knowing what we know now, would we start this today?',
      'Compare the remaining cost and value of continuing with the alternatives.',
      'Make stopping safe: celebrate learning, not just completion.',
    ],
    watchOut: 'Stopping too early is also a mistake. The question is about future value, not about giving up when things get hard.',
    related: ['opportunity-costs', 'loss-aversion', 'commitment-consistency-bias'],
  },
  'weighted-decision-matrix': {
    whenToUse: 'Comparing tools, vendors, architectures or cloud services where several criteria matter.',
    howTo: [
      'Agree the criteria and their weights before scoring any option.',
      'Score each option against each criterion on the same scale.',
      'Multiply by the weights and total the scores.',
      'Discuss surprises and sensitivity: would a small change in weights flip the result?',
    ],
    watchOut: 'Weights can be tuned to justify a favourite. Agree them first, ideally with someone who doesn\'t have a preferred option.',
    related: ['kepner-tregoe-decision-analysis', 'opportunity-costs', 'sensitivity-analysis'],
  },
};
