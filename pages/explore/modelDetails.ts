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
  // ── Wave 3 (part 1): thinking, bias, systems and risk ───────────────────
  'the-map-is-not-the-territory': {
    whenToUse: 'When decisions are being made from dashboards, architecture diagrams, plans or AI-generated summaries rather than from the running system.',
    howTo: [
      'Ask what the map leaves out: what does this dashboard, diagram or summary not show?',
      'Check it against the territory: logs, real traffic, a walk through the actual pipeline.',
      'Update the map when reality differs, rather than explaining reality away.',
    ],
    watchOut: 'Every useful map simplifies. The aim is not a perfect map but knowing where yours is likely to be wrong.',
    related: ['gemba', 'proxy', 'abstraction'],
  },
  'occams-razor': {
    whenToUse: 'Debugging, incident triage, and choosing between designs, when complicated explanations or solutions are competing with simple ones.',
    howTo: [
      'List the possible explanations or designs.',
      'Start with the one that needs the fewest assumptions: the recent deploy, the expired certificate, the config change.',
      'Test it quickly; move to more complex explanations only when the simple one is ruled out.',
    ],
    watchOut: 'Simple is the best first guess, not proof. Distributed systems do fail in complex ways; follow the evidence.',
    related: ['kiss-principle', 'hanlons-razor', 'root-cause-analysis'],
  },
  'falsification-confirmation-bias': {
    whenToUse: 'Reviewing your own design, a vendor evaluation, an incident hypothesis, or results from an AI pilot you championed.',
    howTo: [
      'Write down what you believe and what evidence would prove it wrong.',
      'Look actively for that evidence, or ask someone sceptical to look for it.',
      'Run the test that could fail, not the demo that is sure to succeed.',
    ],
    watchOut: 'Teams naturally share evidence that supports the plan. Invite and reward people who bring disconfirming data.',
    related: ['scientific-method', 'survivorship-bias', 'pre-mortem'],
  },
  'expected-value': {
    whenToUse: 'Deciding whether to invest in reliability work, a migration, or an experiment where outcomes are uncertain.',
    howTo: [
      'List the possible outcomes, each with a rough probability and value or cost.',
      'Multiply and add them up for each option.',
      'Compare options, and also look at the worst case: some downsides are unacceptable whatever the average.',
    ],
    watchOut: 'Averages hide ruin. A small chance of losing customer data can outweigh a large expected saving.',
    related: ['cost-benefit-analysis', 'black-swan', 'scenario-analysis'],
  },
  'compounding': {
    whenToUse: 'Making the case for small, steady improvements: build time, test reliability, documentation, learning, or paying down debt.',
    howTo: [
      'Estimate the small gain or loss per week or per change.',
      'Project it over a year across everyone affected.',
      'Invest in improvements that compound early; they repay many times over.',
    ],
    watchOut: 'Compounding works against you too: flaky tests, tech debt and alert fatigue grow quietly in the same way.',
    related: ['kaizen', 'technical-debt', 'flywheel-effect'],
  },
  'incentives': {
    whenToUse: 'Designing goals, metrics, on-call arrangements or reward schemes, or when people behave in ways that seem irrational.',
    howTo: [
      'Ask what behaviour the current setup actually rewards, not what it intends to reward.',
      'Look for conflicts, such as feature teams rewarded for speed while ops teams carry the outages.',
      'Align incentives with outcomes: shared ownership, paired metrics, recognition for prevention.',
    ],
    watchOut: 'People respond to incentives you didn\'t intend. Review metrics and rewards whenever behaviour drifts.',
    related: ['goodharts-law', 'okrs', 'own-your-outcomes'],
  },
  'social-proof': {
    whenToUse: 'Driving adoption of a platform, practice or AI tool, or when evaluating a technology because "everyone is using it".',
    howTo: [
      'For adoption: show real teams succeeding with the practice, with their own words and numbers.',
      'For evaluation: ask whether others\' context matches yours before following them.',
      'Separate popularity from fit with a small trial against your own criteria.',
    ],
    watchOut: 'Hype cycles are social proof at scale. "Big tech uses it" is a reason to look, not a reason to adopt.',
    related: ['availability-bias', 'flywheel-effect', 'authority-bias'],
  },
  'availability-bias': {
    whenToUse: 'Prioritising risks, incidents or investments, especially just after a memorable outage or a widely discussed AI failure.',
    howTo: [
      'Notice when a recent or vivid event dominates the discussion.',
      'Bring the data: incident frequency, impact and trends over a longer period.',
      'Prioritise by evidence, not by how easily examples come to mind.',
    ],
    watchOut: 'The last incident is rarely the next one. Avoid building elaborate defences for a one-off while chronic issues continue.',
    related: ['pareto-principle', 'survivorship-bias', 'representativeness-heuristic'],
  },
  'survivorship-bias': {
    whenToUse: 'Learning from success stories, case studies, conference talks or the tools that "worked for us".',
    howTo: [
      'Ask who tried the same approach and failed, and why you don\'t hear about them.',
      'Look for the complete data set, including abandoned projects and churned users.',
      'Weigh lessons from failures as heavily as lessons from successes.',
    ],
    watchOut: 'Post-mortems of successes are rare and rosy. A practice that worked for one famous company may have failed quietly at many others.',
    related: ['selection-bias', 'falsification-confirmation-bias', 'social-proof'],
  },
  'hindsight-bias': {
    whenToUse: 'Incident reviews and project retrospectives, where the outcome is known and the decisions now look obviously wrong.',
    howTo: [
      'Reconstruct what people knew at the time, using the timeline rather than memory.',
      'Ask whether the decision was reasonable given that information.',
      'Focus improvements on what would have made the risk visible earlier.',
    ],
    watchOut: '"It was obvious" is almost always hindsight. Saying so in a review shuts down honesty.',
    related: ['blameless-post-mortem', 'narrative-instinct', 'hanlons-razor'],
  },
  'dunning-kruger-effect': {
    whenToUse: 'Assessing skills, estimating work in an unfamiliar area, or evaluating confident claims about new technology such as AI.',
    howTo: [
      'Treat early confidence in a new domain as a signal to check, not to trust.',
      'Ask experts what they find hard; the difficult parts are often invisible to beginners.',
      'Build feedback into learning so people can see their real level.',
    ],
    watchOut: 'Use it to check yourself, not to label others. Everyone is a beginner in something.',
    related: ['circle-of-competence', 'growth-mindset', 'deliberate-practice'],
  },
  'loss-aversion': {
    whenToUse: 'Change management: decommissioning tools, changing processes, or moving teams to a new platform.',
    howTo: [
      'Recognise that people feel losses about twice as strongly as equivalent gains.',
      'Name what people will lose, and what you will do to soften it.',
      'Frame change in terms of risks avoided as well as benefits gained, and offer a trial or a way back.',
    ],
    watchOut: 'Loss aversion also keeps leaders in failing projects. Pair it with a sunk-cost check.',
    related: ['sunk-cost-fallacy', 'default-status', 'reversible-vs-irreversible-decisions'],
  },
  'local-vs-global-optimum': {
    whenToUse: 'When a team optimises its own metric at the expense of the whole system, or when incremental tuning has stopped producing gains.',
    howTo: [
      'Look at the end-to-end outcome, not just your step.',
      'Check whether local improvements are moving the bottleneck or creating queues elsewhere.',
      'When tuning stalls, consider a different design rather than more of the same tweaks.',
    ],
    watchOut: 'A global redesign is expensive and risky. Make sure the local optimum really is limiting you before starting one.',
    related: ['theory-of-constraints', 'systems-thinking', 'value-stream-mapping'],
  },
  'unintended-consequences': {
    whenToUse: 'Introducing policies, controls, metrics or automation that change how people and systems behave.',
    howTo: [
      'Ask how people might work around the change, and what it makes harder.',
      'Pilot it with a small group and watch for side effects.',
      'Set a review date to check the effects you didn\'t plan for.',
    ],
    watchOut: 'Strict controls often push work into the shadows, such as personal AI accounts or unofficial scripts. Make the approved path the easy path.',
    related: ['second-order-thinking', 'goodharts-law', 'incentives'],
  },
  'emergence': {
    whenToUse: 'Understanding behaviour that no single component explains: cascading failures, team culture, traffic patterns, multi-agent AI systems.',
    howTo: [
      'Look at interactions between parts, not just the parts themselves.',
      'Test the system as a whole: load tests, chaos experiments, end-to-end evaluations.',
      'Expect surprises and build the observability to see them.',
    ],
    watchOut: 'Testing every component in isolation can still miss emergent failures. Leave room for whole-system tests.',
    related: ['complex-adaptive-systems', 'systems-thinking', 'chaos-dynamics'],
  },
  'black-swan': {
    whenToUse: 'Risk planning, disaster recovery and capacity planning, where rare, high-impact events matter more than averages.',
    howTo: [
      'Accept that you cannot predict the specific event.',
      'Reduce exposure: limit blast radius, avoid single points of failure, keep rollbacks and backups tested.',
      'Build the ability to respond quickly rather than trying to forecast everything.',
    ],
    watchOut: 'After a black swan, people build defences against that exact event. The next one will be different; invest in general resilience.',
    related: ['antifragility', 'fat-tailed-processes', 'unknown-unknowns'],
  },
  'unknown-unknowns': {
    whenToUse: 'Starting work in a new domain, adopting new technology, or planning large migrations.',
    howTo: [
      'Spend early time exploring: spikes, prototypes, conversations with people who have done it.',
      'Ask "what are we not asking?" in planning sessions.',
      'Keep a buffer in plans and revisit the risk list as you learn.',
    ],
    watchOut: 'Exploration feels unproductive, so teams skip it. A few days of spikes can save months of rework.',
    related: ['black-swan', 'margin-of-safety', 'minimum-viable-product'],
  },
  'murphys-law': {
    whenToUse: 'Designing deployments, migrations, runbooks and automation that will be used under pressure.',
    howTo: [
      'Assume anything that can go wrong eventually will, at the worst time.',
      'Design for failure: timeouts, retries with limits, idempotent operations, safe defaults.',
      'Test the unhappy paths, including rollback, restore and failover.',
    ],
    watchOut: 'Murphy\'s Law is a design principle, not pessimism. Use it to prepare, not to avoid change.',
    related: ['redundancy', 'fmea', 'inversion'],
  },
  'redundancy': {
    whenToUse: 'Critical services, data and people: anywhere a single failure would cause unacceptable impact.',
    howTo: [
      'Identify single points of failure in systems, data and knowledge.',
      'Add redundancy where the impact justifies the cost: replicas, backups, multi-zone, a second person who knows the system.',
      'Test that the redundant path actually works.',
    ],
    watchOut: 'Untested redundancy is false comfort. Backups that have never been restored and failovers never exercised often fail when needed.',
    related: ['margin-of-safety', 'fault-tree-analysis', 'swiss-cheese-model'],
  },
  'abstraction': {
    whenToUse: 'Designing platforms, APIs, internal tools and AI agent tools, where you want to hide complexity without hiding control.',
    howTo: [
      'Decide what users need to control and what they never want to see.',
      'Expose a simple interface for the common path, with an escape hatch for advanced cases.',
      'Keep the abstraction honest: surface errors and costs clearly.',
    ],
    watchOut: 'All abstractions leak. When the hidden layer fails, users need enough visibility to debug it.',
    related: ['kiss-principle', 'the-map-is-not-the-territory', 'jobs-to-be-done'],
  },
  'kiss-principle': {
    whenToUse: 'Design reviews, pipeline design, runbooks, and AI solutions where a simpler approach might work.',
    howTo: [
      'Ask what the simplest thing that could work would be.',
      'Add complexity only when a real requirement demands it.',
      'Prefer boring, proven technology for things that are not your differentiator.',
    ],
    watchOut: 'Simple is not the same as simplistic. Don\'t remove the complexity the problem genuinely needs, such as security or recovery.',
    related: ['occams-razor', 'abstraction', 'via-negativa'],
  },
  'use-checklists': {
    whenToUse: 'High-stakes, repeatable tasks: production changes, releases, incident response, onboarding, access reviews.',
    howTo: [
      'List the steps that are easy to forget and costly to miss.',
      'Keep the checklist short and in the tool where the work happens.',
      'Automate items over time, and update the list after every incident it could have prevented.',
    ],
    watchOut: 'A long checklist gets skimmed. Keep only the items that matter, and automate the rest.',
    related: ['forcing-function', 'murphys-law', 'kaizen'],
  },
  'forcing-function': {
    whenToUse: 'When a good practice keeps getting skipped: tests, reviews, documentation, cost tags, security scans.',
    howTo: [
      'Identify the step people skip and why.',
      'Make the right behaviour the only path, or the easiest one: a required check, a template, a policy.',
      'Explain why it exists, and give a clear route for exceptions.',
    ],
    watchOut: 'Forcing functions without explanation breed workarounds. Pair the constraint with the reason.',
    related: ['use-checklists', 'incentives', 'unintended-consequences'],
  },
  'parkinsons-law': {
    whenToUse: 'Planning, estimating and running meetings, when work expands to fill the time available.',
    howTo: [
      'Set time-boxes for meetings, spikes and design phases.',
      'Agree the smallest valuable outcome for the time-box.',
      'Review at the end of the box: decide, extend deliberately, or stop.',
    ],
    watchOut: 'Time-boxes that are too tight produce rushed, risky work. Use them for exploration and decisions, not for safety-critical steps.',
    related: ['eisenhower-matrix', 'makers-vs-managers-schedule', 'time-value-of-shipping'],
  },
  'peter-principle': {
    whenToUse: 'Promotion decisions and career paths, especially when moving great engineers into management.',
    howTo: [
      'Promote on evidence of the next role\'s skills, not just success in the current one.',
      'Offer parallel tracks for technical and people leadership.',
      'Support new managers with coaching and an easy way back if the role isn\'t right.',
    ],
    watchOut: 'Losing a great engineer to become an unhappy manager is a double loss. Make the technical path equally respected.',
    related: ['generalist-vs-specialist', 'growth-mindset', 'evaluate-accurately-not-kindly'],
  },

  // ── Wave 3 (part 2): leadership, product, strategy and decisions ────────
  'working-backwards': {
    whenToUse: 'Starting a new product, platform capability or AI feature, before any design or code.',
    howTo: [
      'Write the announcement or a short FAQ as if the feature has launched.',
      'Describe the customer, their problem and why this solution is better, in plain words.',
      'Test it with real users and stakeholders; only then plan the work.',
    ],
    watchOut: 'If the announcement is hard to write or unconvincing, the idea needs more work. That is a cheap and useful result.',
    related: ['jobs-to-be-done', 'minimum-viable-product', 'okrs'],
  },
  'smart-formula': {
    whenToUse: 'Writing goals, action items from reviews, and team commitments.',
    howTo: [
      'Make each goal Specific, Measurable, Achievable, Relevant and Time-bound.',
      'Check that someone outside the team could tell whether it was met.',
      'Pair it with an owner.',
    ],
    watchOut: 'SMART goals can become small and safe. Use OKRs for ambitious objectives and SMART for concrete actions.',
    related: ['okrs', 'directly-responsible-individual', 'goodharts-law'],
  },
  'organizational-debt': {
    whenToUse: 'When processes, roles and structures that made sense earlier are now slowing the organisation down.',
    howTo: [
      'List the approvals, meetings, reports and roles people work around.',
      'Ask what each was created for and whether that need remains.',
      'Remove, simplify or automate, with the people affected.',
    ],
    watchOut: 'Like technical debt, organisational debt accumulates silently. Review it every year, not only during re-orgs.',
    related: ['technical-debt', 'via-negativa', 'arguing-from-first-principles'],
  },
  'growth-mindset': {
    whenToUse: 'Coaching, learning new technology such as AI, and building a culture where mistakes become learning.',
    howTo: [
      'Praise effort, strategy and learning, not only results.',
      'Frame skills as learnable: "not yet" rather than "can\'t".',
      'Share your own learning and mistakes as a leader.',
    ],
    watchOut: 'Growth mindset is not just positive talk. It needs real time, support and safety to learn.',
    related: ['deliberate-practice', 'culture-of-lifelong-learning', 'making-mistakes'],
  },
  'deliberate-practice': {
    whenToUse: 'Building real skill: incident command, system design, prompt and agent design, public speaking.',
    howTo: [
      'Pick a specific skill just beyond your current level.',
      'Practise it in focused sessions with immediate feedback, such as game days or design katas.',
      'Reflect on each session and adjust the next one.',
    ],
    watchOut: 'Years of experience are not the same as deliberate practice. Repeating what you already know doesn\'t build new skill.',
    related: ['growth-mindset', 'feedback-loops', 'dunning-kruger-effect'],
  },
  'radical-transparency': {
    whenToUse: 'Building trust in a team, sharing incidents and decisions openly, or making the reasoning behind priorities visible.',
    howTo: [
      'Default to sharing: decision records, incident write-ups, metrics, roadmaps.',
      'Explain the reasoning, not just the outcome.',
      'Be clear about what cannot be shared, such as personal or legally sensitive matters, and why.',
    ],
    watchOut: 'Transparency without psychological safety feels like exposure. Build safety first, then open up.',
    related: ['trust', 'blameless-post-mortem', 'idea-meritocracy'],
  },
  'trust': {
    whenToUse: 'Leading teams through change, working across teams, and deciding how much autonomy to give people and agents.',
    howTo: [
      'Build trust through consistency: do what you said, explain when you can\'t.',
      'Extend trust in small, reversible steps and increase it with evidence.',
      'Repair quickly and openly when trust is broken.',
    ],
    watchOut: 'Trust is slow to build and quick to lose. One blame-filled review can undo months of work.',
    related: ['radical-transparency', 'hanlons-razor', 'reversible-vs-irreversible-decisions'],
  },
  'own-your-outcomes': {
    whenToUse: 'Setting expectations for teams and leaders, especially for services that are built by one team and run by another.',
    howTo: [
      'Make ownership explicit: who owns the outcome, not just the task.',
      'Give owners the authority and information to act.',
      'Review outcomes, not just activity, and celebrate prevention as well as rescue.',
    ],
    watchOut: 'Ownership without authority is just blame. Make sure owners can actually change what they own.',
    related: ['directly-responsible-individual', 'incentives', 'think-like-an-owner'],
  },
  'network-effects': {
    whenToUse: 'Internal platforms, developer communities, shared libraries and data products, where value grows with each user.',
    howTo: [
      'Identify how each new user makes the platform more valuable for others: shared templates, answers, integrations.',
      'Seed early value so the first users succeed.',
      'Make contributing easy so users add value, not just consume it.',
    ],
    watchOut: 'Network effects take time to start. Early adopters need support before the network carries itself.',
    related: ['flywheel-effect', 'metcalfes-law', 'critical-mass'],
  },
  'economies-of-scale': {
    whenToUse: 'Deciding what to centralise (platform, security tooling, cloud commitments) and what to leave to teams.',
    howTo: [
      'Identify costs that fall per unit as volume grows: commitments, shared tooling, expertise.',
      'Centralise where scale clearly reduces cost or risk.',
      'Keep decisions local where speed and context matter more than scale.',
    ],
    watchOut: 'Centralisation can create bottlenecks and distance from users. Scale helps cost but can hurt flow.',
    related: ['wardley-mapping', 'theory-of-constraints', 'core-competency'],
  },
  'switching-costs': {
    whenToUse: 'Choosing vendors, cloud services, AI models and frameworks, and planning exits.',
    howTo: [
      'Estimate the cost of leaving: data migration, retraining, rewrites, contracts.',
      'Reduce lock-in where it matters with open standards, abstractions and data export.',
      'Revisit switching costs as usage grows; they rise quietly.',
    ],
    watchOut: 'Avoiding all lock-in is expensive too. Accept it where the value is high, and keep an exit plan.',
    related: ['reversible-vs-irreversible-decisions', 'preserving-optionality', 'exit-strategy'],
  },
  'preserving-optionality': {
    whenToUse: 'Uncertain futures: fast-moving AI technology, new markets, or early-stage platform choices.',
    howTo: [
      'Prefer choices that keep future options open, such as standard interfaces and modular designs.',
      'Delay irreversible commitments until you know more, as long as delay is cheap.',
      'Pay a small premium for flexibility where uncertainty is high.',
    ],
    watchOut: 'Keeping every option open forever means never committing. Decide when the information you need has arrived.',
    related: ['reversible-vs-irreversible-decisions', 'switching-costs', 'unknown-unknowns'],
  },
  'via-negativa': {
    whenToUse: 'Improving systems, processes and products by removing rather than adding.',
    howTo: [
      'List what could be removed: alerts, meetings, features, dependencies, approval steps.',
      'Remove the items with the least value and most cost first.',
      'Measure the effect; often quality and speed both improve.',
    ],
    watchOut: 'Some things look useless but protect against rare events. Check why something exists before deleting it.',
    related: ['kiss-principle', 'organizational-debt', '5s'],
  },
  'the-lindy-effect': {
    whenToUse: 'Choosing technologies, practices and dependencies for systems that need to last.',
    howTo: [
      'Prefer tools and ideas that have survived a long time for long-lived, critical systems.',
      'Use newer technology where the benefit is clear and the blast radius is small.',
      'Revisit choices as new technology proves itself over time.',
    ],
    watchOut: 'Lindy favours the old, but it isn\'t a reason to ignore genuine shifts like cloud and AI. Adopt new things deliberately, not reflexively.',
    related: ['kiss-principle', 'preserving-optionality', 'social-proof'],
  },
  'product-market-fit': {
    whenToUse: 'Internal platforms and AI products: deciding whether to scale, iterate or stop.',
    howTo: [
      'Define what fit looks like: voluntary adoption, retention, users who would be upset if it disappeared.',
      'Measure it regularly with real usage data and user conversations.',
      'Scale only once fit is clear; until then, iterate quickly.',
    ],
    watchOut: 'Mandated adoption of an internal tool can fake fit. Look for teams choosing it freely.',
    related: ['minimum-viable-product', 'jobs-to-be-done', 'flywheel-effect'],
  },
  'time-value-of-shipping': {
    whenToUse: 'Deciding whether to ship now or polish further, and prioritising small releases over big ones.',
    howTo: [
      'Estimate the value delivered per week once the change is live.',
      'Compare it with the risk and cost of shipping a smaller version now.',
      'Ship the smallest safe slice, and improve it with real feedback.',
    ],
    watchOut: 'Shipping fast is not shipping carelessly. Keep the quality bar for security, reliability and data.',
    related: ['minimum-viable-product', 'velocity-vs-speed', 'parkinsons-law'],
  },
  'version-two-is-a-lie': {
    whenToUse: 'When a team plans to ship a rough version 1 and "fix it in version 2".',
    howTo: [
      'Assume version 2 may never be funded.',
      'Decide what version 1 must get right: security, data model, operability.',
      'Cut scope rather than quality on the parts that are hard to change later.',
    ],
    watchOut: 'This is not an argument against MVPs. Keep v1 small, but solid where it counts.',
    related: ['technical-debt', 'minimum-viable-product', 'reversible-vs-irreversible-decisions'],
  },
  'velocity-vs-speed': {
    whenToUse: 'When a team is busy and moving fast but not getting closer to its goal.',
    howTo: [
      'Check direction: does the work map to the outcome you care about?',
      'Measure outcomes delivered, not tickets closed or story points.',
      'Cut work that adds speed but not direction.',
    ],
    watchOut: 'AI tools can raise output dramatically without changing outcomes. Watch direction as well as volume.',
    related: ['okrs', 'goodharts-law', 'theory-of-constraints'],
  },
  'tragedy-of-the-commons': {
    whenToUse: 'Shared resources: cloud accounts, shared clusters, CI capacity, shared budgets, on-call rotas.',
    howTo: [
      'Make usage visible per team through tagging, quotas and dashboards.',
      'Give each team ownership of its share, and a cost when it overuses.',
      'Agree community rules for the shared parts and review them together.',
    ],
    watchOut: 'Heavy-handed quotas can block legitimate work. Combine visibility and ownership before adding hard limits.',
    related: ['incentives', 'externalities', 'own-your-outcomes'],
  },
  'swot-analysis': {
    whenToUse: 'Annual planning for a team or platform, or assessing a strategic option such as adopting AI agents.',
    howTo: [
      'List internal Strengths and Weaknesses, and external Opportunities and Threats.',
      'Back each item with evidence, not opinion.',
      'Turn it into actions: use strengths for opportunities, fix weaknesses that expose you to threats.',
    ],
    watchOut: 'A SWOT that ends as a list is wasted. The value is in the actions you take from it.',
    related: ['wardley-mapping', 'scenario-analysis', 'core-competency'],
  },
  'kepner-tregoe-decision-analysis': {
    whenToUse: 'High-stakes choices with several options and stakeholders: vendor selection, platform choice, AI model choice.',
    howTo: [
      'Write the decision statement and split criteria into MUSTs and weighted WANTs.',
      'Drop any option that fails a MUST.',
      'Score the rest against the WANTs, then assess the risks of the leading option before deciding.',
    ],
    watchOut: 'It can feel heavy for small decisions. Save it for one-way doors.',
    related: ['weighted-decision-matrix', 'reversible-vs-irreversible-decisions', 'pre-mortem'],
  },
  'scenario-analysis': {
    whenToUse: 'Planning under uncertainty: capacity, budgets, AI adoption, vendor risk, or regulatory change.',
    howTo: [
      'Pick the two or three uncertainties that matter most.',
      'Describe a few plausible scenarios: optimistic, expected, pessimistic, or distinctly different futures.',
      'Check how your plan holds up in each and prepare actions for the triggers.',
    ],
    watchOut: 'Scenarios are not predictions. Their job is to make your plan robust, not to pick the right future.',
    related: ['expected-value', 'sensitivity-analysis', 'preserving-optionality'],
  },
  'cost-benefit-analysis': {
    whenToUse: 'Justifying investments in tooling, reliability, platform work or AI initiatives.',
    howTo: [
      'List costs: build, run, people\'s time, licences, risk.',
      'List benefits: time saved, incidents avoided, revenue enabled, risk reduced.',
      'Compare over a realistic time horizon, with conservative assumptions.',
    ],
    watchOut: 'Benefits are usually overestimated and costs underestimated, especially running costs. Use conservative numbers.',
    related: ['expected-value', 'opportunity-costs', 'margin-of-safety-in-investing'],
  },
  'regression-to-the-mean': {
    whenToUse: 'Interpreting metrics after an unusually good or bad period, or judging whether an intervention worked.',
    howTo: [
      'Expect extreme results to be followed by more average ones, whatever you do.',
      'Compare with a baseline or control group before crediting your change.',
      'Look at trends over several periods, not one.',
    ],
    watchOut: 'A new process introduced right after a terrible month will often look like it worked. Check before celebrating.',
    related: ['scientific-method', 'falsification-confirmation-bias', 'law-of-large-numbers'],
  },
  'scientific-method': {
    whenToUse: 'Debugging, performance tuning, evaluating AI prompts and models, and testing process changes.',
    howTo: [
      'Form a clear hypothesis you could prove wrong.',
      'Change one thing at a time and measure the result against a baseline.',
      'Keep notes, and accept the result even when it disappoints.',
    ],
    watchOut: 'Changing several things at once makes it impossible to know what worked. Be patient and isolate variables.',
    related: ['falsification-confirmation-bias', 'pdca', 'regression-to-the-mean'],
  },
  // ── Wave 4 (part 1): probability, strategy and economics ────────────────
  'bayesian-updating': {
    whenToUse: 'Incident diagnosis, capacity forecasting, evaluating AI models, and any belief that should change as evidence arrives.',
    howTo: [
      'Start with a prior: your best estimate based on what you know ("the last deploy is the likeliest cause").',
      'Gather evidence and ask how much more likely it is if your belief is true than if it is false.',
      'Update in proportion to the strength of the evidence, then repeat as new data arrives.',
    ],
    watchOut: 'Strong priors can make you dismiss real evidence; weak priors can make you overreact to noise. Write both down so the update is visible.',
    related: ['scientific-method', 'falsification-confirmation-bias', 'expected-value'],
  },
  'power-laws': {
    whenToUse: 'Analysing incidents, cloud spend, traffic, bugs or customer usage, where a few items dominate the total.',
    howTo: [
      'Plot the data sorted by size; a power law shows a few huge items and a long tail.',
      'Focus effort on the head: the biggest services, customers or failure causes.',
      'Design for the extremes, such as the largest tenant or the busiest hour, not the average.',
    ],
    watchOut: 'Averages are misleading under power laws. "Average request size" can hide the requests that break your system.',
    related: ['pareto-principle', 'fat-tailed-processes', 'black-swan'],
  },
  'fat-tailed-processes': {
    whenToUse: 'Capacity planning, latency targets, budget forecasting and risk, where extreme values are far more common than a bell curve suggests.',
    howTo: [
      'Look at the tail, not the mean: p99 and p99.9 latency, the worst month of spend, the largest outage.',
      'Plan headroom and limits for the tail.',
      'Cap exposure: rate limits, budgets, circuit breakers, blast-radius limits.',
    ],
    watchOut: 'Models that assume normal distributions underestimate rare events. Many operational metrics are fat-tailed.',
    related: ['power-laws', 'black-swan', 'margin-of-safety'],
  },
  'law-of-large-numbers': {
    whenToUse: 'Judging experiments, A/B tests, AI evaluations and early metrics, where small samples can mislead.',
    howTo: [
      'Check the sample size before trusting a result.',
      'Run evaluations on enough cases for the result to stabilise, often hundreds rather than tens.',
      'Watch how a metric moves as data accumulates; early swings usually settle.',
    ],
    watchOut: 'A great result from ten test prompts or one pilot team is an anecdote. Scale up the sample before scaling up the rollout.',
    related: ['regression-to-the-mean', 'scientific-method', 'selection-bias'],
  },
  'leverage': {
    whenToUse: 'Deciding where a leader, platform team or AI investment can have the most impact per hour or per pound spent.',
    howTo: [
      'Look for work that multiplies others\' output: shared tooling, templates, automation, coaching.',
      'Estimate how many people or changes benefit from each hour invested.',
      'Prioritise high-leverage work, and protect time for it.',
    ],
    watchOut: 'Leverage amplifies mistakes too. A bad template or a flawed automation spreads just as fast as a good one.',
    related: ['flywheel-effect', 'compounding', 'theory-of-constraints'],
  },
  'critical-mass': {
    whenToUse: 'Launching a platform, community of practice, inner-source project or AI champions network.',
    howTo: [
      'Estimate how many users or contributors are needed before the thing sustains itself.',
      'Concentrate early effort on reaching that point in one area, rather than spreading thinly.',
      'Track progress towards it and celebrate when it\'s reached.',
    ],
    watchOut: 'Below critical mass, effort can feel wasted and leaders give up just before the tipping point.',
    related: ['network-effects', 'flywheel-effect', 'activation-energy'],
  },
  'activation-energy': {
    whenToUse: 'When a better practice exists but nobody starts: adopting tests, a new platform, an AI assistant, or documentation.',
    howTo: [
      'Find the first-step friction: setup time, access requests, unclear instructions.',
      'Lower it with templates, one-command setup, defaults and pairing sessions.',
      'Measure time to first success, and keep reducing it.',
    ],
    watchOut: 'Lowering activation energy gets people started; it doesn\'t keep them. Pair it with ongoing value.',
    related: ['catalysts', 'default-status', 'forcing-function'],
  },
  'inertia': {
    whenToUse: 'Planning change in organisations and systems that resist it: legacy platforms, long-standing processes, established habits.',
    howTo: [
      'Expect resistance proportional to how long and widely something has been used.',
      'Apply steady, consistent force rather than one big push.',
      'Use inertia in your favour once change starts: make the new way the default.',
    ],
    watchOut: 'Inertia also protects what works. Not every old process is wrong; check before forcing change.',
    related: ['default-status', 'loss-aversion', 'activation-energy'],
  },
  'game-theory': {
    whenToUse: 'Negotiations with vendors, cross-team agreements, shared budgets and on-call arrangements, where everyone\'s best move depends on others.',
    howTo: [
      'Map the players, their options and what each gains or loses.',
      'Ask what each player will do if they act in their own interest.',
      'Change the rules or incentives so the individually best move is also good for the whole.',
    ],
    watchOut: 'Real people value fairness, reputation and relationships, not just payoffs. Use game theory to understand, not to manipulate.',
    related: ['prisoners-dilemma', 'zero-sum-vs-non-zero-sum', 'incentives'],
  },
  'prisoners-dilemma': {
    whenToUse: 'Shared resources and cross-team cooperation: cloud quotas, shared clusters, code ownership, incident response across teams.',
    howTo: [
      'Notice when each team gains by acting selfishly but everyone loses if all do.',
      'Make cooperation visible and rewarded, and defection visible and costly.',
      'Build repeated interactions and trust; cooperation grows when teams expect to work together again.',
    ],
    watchOut: 'Blaming teams for "selfish" behaviour misses the point. Fix the structure that makes it rational.',
    related: ['game-theory', 'tragedy-of-the-commons', 'trust'],
  },
  'zero-sum-vs-non-zero-sum': {
    whenToUse: 'Budget discussions, platform-versus-product debates, vendor negotiations and team boundaries.',
    howTo: [
      'Ask whether one side\'s gain really is the other\'s loss.',
      'Look for ways to grow the pie: shared tooling, reuse, automation, better outcomes for both.',
      'Frame proposals in terms of the shared outcome, not who wins.',
    ],
    watchOut: 'Some situations are genuinely zero-sum, such as a fixed headcount. Be honest about those rather than pretending otherwise.',
    related: ['win-win-game', 'game-theory', 'comparative-advantage'],
  },
  'core-competency': {
    whenToUse: 'Build-versus-buy decisions, outsourcing, and deciding where your best engineers should spend their time.',
    howTo: [
      'Identify what you do better than anyone else and what customers value you for.',
      'Invest deeply in those capabilities.',
      'Buy, rent or outsource the rest, even if you could build it.',
    ],
    watchOut: 'Core competencies change. What differentiated you five years ago, such as running your own data centre, may now be a commodity.',
    related: ['wardley-mapping', 'comparative-advantage', 'opportunity-costs'],
  },
  'comparative-advantage': {
    whenToUse: 'Splitting work between teams, between people and AI, or between your organisation and vendors.',
    howTo: [
      'For each party, compare their relative strength, not absolute skill.',
      'Assign work to whoever gives up the least by doing it.',
      'Let your strongest people focus on the work only they can do.',
    ],
    watchOut: 'Specialising too narrowly creates single points of failure. Balance specialisation with redundancy.',
    related: ['core-competency', 'opportunity-costs', 'generalist-vs-specialist'],
  },
  'strategy-vs-tactics': {
    whenToUse: 'Planning sessions where the team jumps straight to tools and tasks, or when lots of activity isn\'t adding up.',
    howTo: [
      'State the strategy first: where you will play, how you will win, what you will not do.',
      'Check every initiative against it.',
      'Let tactics change freely as long as they serve the strategy.',
    ],
    watchOut: 'A tool adoption ("we\'ll use Kubernetes", "we\'ll use AI agents") is a tactic, not a strategy. Ask what outcome it serves.',
    related: ['okrs', 'wardley-mapping', 'velocity-vs-speed'],
  },
  'first-mover-advantage': {
    whenToUse: 'Deciding whether to adopt new technology early, such as a new AI capability, or wait for it to mature.',
    howTo: [
      'Ask what you actually gain by being first: learning, talent, market position.',
      'Weigh it against the cost of early adoption: immature tools, rework, risk.',
      'Move early on small, reversible experiments; commit heavily only once value is proven.',
    ],
    watchOut: 'Being first is often less valuable than being best. Many fast followers learn from the pioneers\' mistakes.',
    related: ['second-mover-advantage', 'preserving-optionality', 'minimum-viable-product'],
  },
  'information-asymmetry': {
    whenToUse: 'Vendor negotiations, estimating, hiring, and any situation where one side knows much more than the other.',
    howTo: [
      'Identify what the other side knows that you don\'t, and the reverse.',
      'Reduce the gap: references, proofs of concept, trial periods, independent benchmarks.',
      'Inside the organisation, share information openly to avoid decisions made in the dark.',
    ],
    watchOut: 'Leaders often have less information than the engineers closest to the work. Ask before deciding.',
    related: ['radical-transparency', 'circle-of-competence', 'trust'],
  },
  'externalities': {
    whenToUse: 'Spotting costs that one team creates but others pay: noisy alerts, shared-cluster load, technical debt, cloud waste.',
    howTo: [
      'Trace who bears the cost of each decision.',
      'Make externalities visible: showback, shared dashboards, impact reports.',
      'Bring the cost back to whoever creates it, through ownership or chargeback.',
    ],
    watchOut: 'Charging back every cost can create bureaucracy. Start with visibility; often that alone changes behaviour.',
    related: ['tragedy-of-the-commons', 'incentives', 'own-your-outcomes'],
  },
  'return-on-investment': {
    whenToUse: 'Prioritising platform, reliability and AI initiatives, and reporting their value to leadership.',
    howTo: [
      'Estimate the gain (time saved, incidents avoided, revenue enabled) and the full cost (build, run, people).',
      'Calculate ROI over a realistic horizon, with conservative assumptions.',
      'Measure the actual return after delivery and learn from the gap.',
    ],
    watchOut: 'ROI favours easily measured benefits. Risk reduction and developer experience are real returns even when hard to quantify.',
    related: ['cost-benefit-analysis', 'opportunity-costs', 'expected-value'],
  },
  'sensitivity-analysis': {
    whenToUse: 'Business cases, cost forecasts, capacity plans and decision matrices that depend on uncertain assumptions.',
    howTo: [
      'List the key assumptions behind the result.',
      'Change each one up and down by a realistic amount and see how the result moves.',
      'Focus validation effort on the assumptions that change the answer most.',
    ],
    watchOut: 'If small changes flip the decision, the decision is fragile. Seek more data or choose the more robust option.',
    related: ['scenario-analysis', 'weighted-decision-matrix', 'margin-of-safety'],
  },
  'false-positives-and-false-negatives': {
    whenToUse: 'Tuning alerts, security scanners, AI guardrails and classifiers, where every threshold trades one error for the other.',
    howTo: [
      'Decide which error is more costly: a missed incident or a false page; a blocked good request or an allowed bad one.',
      'Measure both rates, not just one.',
      'Set thresholds based on that cost, and review them as the system changes.',
    ],
    watchOut: 'Too many false positives train people to ignore alerts, which turns them into false negatives. Alert fatigue is a reliability risk.',
    related: ['proxy', 'feedback-loops', 'confidence-interval'],
  },
  'proxy': {
    whenToUse: 'Choosing metrics for things that are hard to measure directly: developer productivity, quality, AI usefulness, customer happiness.',
    howTo: [
      'Name the real outcome and the proxy you will measure instead.',
      'Check that the proxy moves when the outcome moves.',
      'Use several proxies together, and revisit them when they stop tracking reality.',
    ],
    watchOut: 'Once a proxy becomes a target, people optimise the proxy. This is Goodhart\'s Law in action.',
    related: ['goodharts-law', 'the-map-is-not-the-territory', 'okrs'],
  },
  'selection-bias': {
    whenToUse: 'Reading surveys, pilot results, AI evaluations or incident data, where the sample may not represent the whole.',
    howTo: [
      'Ask how the data was selected and who is missing.',
      'Compare the sample with the full population on key traits.',
      'Use random or representative samples for evaluations that drive big decisions.',
    ],
    watchOut: 'Pilots run by enthusiastic volunteers almost always look better than the eventual rollout.',
    related: ['survivorship-bias', 'law-of-large-numbers', 'response-bias'],
  },
  'ikigai': {
    whenToUse: 'Career conversations, mentoring, and choosing what to focus on as a leader or engineer.',
    howTo: [
      'List what you love, what you\'re good at, what the world needs, and what you can be paid for.',
      'Look for the overlap, and notice which circle is weakest today.',
      'Choose one step that strengthens the weakest circle, such as a new skill, a project or a mentor.',
    ],
    watchOut: 'Ikigai is a direction, not a destination. It shifts over a career, so revisit it every year or two.',
    related: ['regret-minimization-framework', 'deliberate-practice', 'circle-of-competence'],
  },
  'complex-adaptive-systems': {
    whenToUse: 'Leading organisations, markets, platforms with many users, and multi-agent AI systems, where agents adapt to each other.',
    howTo: [
      'Accept that you cannot fully predict or control the system.',
      'Set simple rules and boundaries, then observe how behaviour emerges.',
      'Run small experiments, amplify what works and dampen what doesn\'t.',
    ],
    watchOut: 'Detailed top-down plans tend to fail in complex adaptive systems. Steer with feedback rather than blueprints.',
    related: ['emergence', 'cynefin-framework', 'feedback-loops'],
  },
  'dunbars-number': {
    whenToUse: 'Designing team and organisation size, communities of practice, and on-call rotations.',
    howTo: [
      'Keep close working teams small (often 5–9 people) and groups that need personal trust under about 150.',
      'When a group grows past these limits, split it along natural boundaries.',
      'Add explicit communication structures between groups as they split.',
    ],
    watchOut: 'The numbers are rough guides, not rules. What matters is noticing when people no longer know who to ask.',
    related: ['conways-law', 'trust', 'high-context-vs-low-context-culture'],
  },

  // ── Wave 4 (part 2): ideas, problem solving, agile at scale, people ─────
  'scamper': {
    whenToUse: 'Improving an existing process, product or platform when the team is stuck for new ideas.',
    howTo: [
      'Take one thing to improve, such as the release process.',
      'Run through each prompt: Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, Reverse.',
      'Capture every idea, then pick two or three to try.',
    ],
    watchOut: 'SCAMPER produces many ideas, most of them weak. Its value is in widening the options before you choose.',
    related: ['lateral-thinking', 'divergent-vs-convergent-thinking', 'via-negativa'],
  },
  'lateral-thinking': {
    whenToUse: 'When logical, step-by-step thinking keeps producing the same solutions to a stubborn problem.',
    howTo: [
      'Challenge an assumption deliberately ("what if we didn\'t need this service at all?").',
      'Borrow an idea from an unrelated field, such as aviation checklists or manufacturing flow.',
      'Use random prompts or reversals to break the usual pattern, then evaluate ideas logically.',
    ],
    watchOut: 'Lateral ideas still need testing. Keep creativity and critique as separate steps.',
    related: ['scamper', 'six-thinking-hats', 'arguing-from-first-principles'],
  },
  'mind-mapping': {
    whenToUse: 'Exploring a new domain, planning a programme, preparing a talk, or mapping a system\'s dependencies.',
    howTo: [
      'Put the central topic in the middle.',
      'Branch out into main themes, then sub-ideas, without editing as you go.',
      'Look for gaps, overlaps and links, then turn the map into a plan.',
    ],
    watchOut: 'A mind map is a thinking tool, not a deliverable. Don\'t spend time making it pretty.',
    related: ['divide-and-conquer', 'systems-thinking', 'divergent-vs-convergent-thinking'],
  },
  'brainstorming': {
    whenToUse: 'When a team needs a wide range of options before choosing, such as ways to reduce toil, improve onboarding or cut cloud costs.',
    howTo: [
      'Write the question where everyone can see it, phrased as a problem to solve.',
      'Give people a few minutes to write ideas silently first, so the loudest voice does not set the direction.',
      'Share and build on each other\'s ideas without judging them, aiming for quantity.',
      'Group similar ideas, then use dot voting or impact and effort to pick a few to try.',
    ],
    watchOut: 'Open, shout-out brainstorming often produces fewer and safer ideas, because people anchor on the first suggestions. Silent writing first, and a separate step for judging, fix most of this.',
    related: ['how-might-we', 'crazy-8s', 'divergent-vs-convergent-thinking'],
  },
  'crazy-8s': {
    whenToUse: 'Exploring the design of a screen, report, dashboard, workflow or API when the team is anchored on one idea.',
    howTo: [
      'Fold a sheet of paper into eight panels, or use eight boxes on a digital whiteboard.',
      'Set a timer for eight minutes and sketch one idea per panel, one minute each.',
      'Share sketches briefly, then mark the parts you like with dots.',
      'Combine the strongest parts into one or two concepts to prototype.',
    ],
    watchOut: 'Sketches are for thinking, not presenting. Reassure people that rough drawings are the point, or the less confident will hold back.',
    related: ['brainstorming', 'design-thinking', 'scamper'],
  },
  'how-might-we': {
    whenToUse: 'Turning research findings, complaints or retrospective themes into questions a team can generate ideas for.',
    howTo: [
      'Start from a specific problem or insight, such as "new joiners take three weeks to ship their first change".',
      'Rewrite it as a "How might we...?" question focused on the outcome you want.',
      'Check the scope: too broad gives vague ideas, too narrow already contains the answer.',
      'Write a few versions, pick the most useful, and use it to frame brainstorming.',
    ],
    watchOut: 'A question that names the solution ("How might we adopt tool X?") closes off other options. Keep the question about the outcome.',
    related: ['brainstorming', 'design-thinking', 'jobs-to-be-done'],
  },
  'design-thinking': {
    whenToUse: 'Building something for people whose needs are not yet clear, such as an internal developer platform, a new AI assistant or a customer-facing feature.',
    howTo: [
      'Empathise: talk to and watch the people affected before deciding what to build.',
      'Define: write the problem in their terms, often as a "How might we" question.',
      'Ideate and prototype: generate many options, then build the cheapest version that can be tested.',
      'Test with real users, learn and loop back to whichever stage the evidence points to.',
    ],
    watchOut: 'Design thinking can become workshops and sticky notes with no follow-through. It only works if prototypes reach real users and the findings change what gets built.',
    related: ['how-might-we', 'crazy-8s', 'minimum-viable-product'],
  },
  'divergent-vs-convergent-thinking': {
    whenToUse: 'Design sessions, retrospectives, planning and problem solving, where generating ideas and choosing between them get mixed up.',
    howTo: [
      'Diverge first: generate many options without judging them.',
      'Then converge: group, evaluate and choose against agreed criteria.',
      'Make the switch explicit so people know which mode they are in.',
    ],
    watchOut: 'Criticising ideas during the divergent phase shuts down creativity. Converging too late leaves the meeting without a decision.',
    related: ['six-thinking-hats', 'scamper', 'weighted-decision-matrix'],
  },
  'binary-search': {
    whenToUse: 'Finding which change, commit, config or dependency caused a regression.',
    howTo: [
      'Identify a known good point and a known bad point.',
      'Test the midpoint, and keep halving the range towards the bad side.',
      'Automate it where possible, for example with git bisect and a test script.',
    ],
    watchOut: 'Binary search assumes one change caused the problem. If several changes interact, isolate them carefully.',
    related: ['divide-and-conquer', 'scientific-method', 'root-cause-analysis'],
  },
  'divide-and-conquer': {
    whenToUse: 'Large migrations, complex debugging, big programmes and anything too large to tackle in one piece.',
    howTo: [
      'Break the problem into smaller parts that can be solved independently.',
      'Solve, test and deliver each part separately.',
      'Plan how the parts fit back together, and test the integration.',
    ],
    watchOut: 'The integration is where divided work most often fails. Integrate early and often.',
    related: ['binary-search', 'minimum-viable-product', 'conways-law'],
  },
  'rubber-duck-debugging': {
    whenToUse: 'When you are stuck on a bug, a design or a failing pipeline and going round in circles.',
    howTo: [
      'Explain the problem out loud, line by line, to someone or something that knows nothing about it.',
      'State every assumption explicitly as you go.',
      'Notice where your explanation hesitates; that is often where the bug is.',
    ],
    watchOut: 'An AI assistant can be a good rubber duck, but ask it to question your assumptions, not just agree with you.',
    related: ['the-map-is-not-the-territory', 'scientific-method', 'binary-search'],
  },
  'six-sigma': {
    whenToUse: 'Stable, repeatable processes where reducing variation matters: build pipelines, deployments, support workflows, data quality.',
    howTo: [
      'Define the defect and measure how often it happens.',
      'Find the sources of variation with data.',
      'Reduce them and put controls in place to keep the process stable.',
    ],
    watchOut: 'Six Sigma suits stable processes, not creative or exploratory work. Don\'t apply it to product discovery.',
    related: ['dmaic', 'pdca', 'kaizen'],
  },
  'dmaic': {
    whenToUse: 'A measurable process problem that needs a disciplined fix, such as a high change-failure rate or slow ticket resolution.',
    howTo: [
      'Define the problem and the goal; Measure the current state.',
      'Analyse the root causes with data.',
      'Improve the process and Control it with monitoring so gains last.',
    ],
    watchOut: 'Skipping Measure and jumping to Improve is common, and it leads to fixing the wrong thing.',
    related: ['six-sigma', 'pdca', 'root-cause-analysis'],
  },
  'lean-software-development': {
    whenToUse: 'Improving how software teams deliver, especially when there is a lot of waiting, rework or unused features.',
    howTo: [
      'Eliminate waste: partially done work, handoffs, extra features, task switching.',
      'Build quality in with tests and CI, and deliver in small batches.',
      'Defer irreversible decisions, respect people, and optimise the whole value stream.',
    ],
    watchOut: 'Lean is not about doing more with fewer people. Used as a cost-cutting slogan, it destroys the trust it depends on.',
    related: ['muda', 'value-stream-mapping', 'kanban'],
  },
  'scrumban': {
    whenToUse: 'Teams mixing planned features with interrupt-driven work, such as platform, SRE or data teams.',
    howTo: [
      'Keep Scrum\'s rhythm: planning, review and retrospective.',
      'Replace fixed sprint commitments with a pull-based board and WIP limits.',
      'Reserve explicit capacity for interrupts and measure lead time.',
    ],
    watchOut: 'Scrumban can become "no rules". Keep WIP limits and regular reviews, or it drifts into chaos.',
    related: ['kanban', 'scrum', 'theory-of-constraints'],
  },
  'less': {
    whenToUse: 'Several teams working on one product who want to scale Scrum without adding layers of roles.',
    howTo: [
      'Keep one Product Backlog and one Product Owner for the whole product.',
      'Organise feature teams that can deliver end to end.',
      'Run one shared sprint with joint planning and review.',
    ],
    watchOut: 'LeSS asks for real organisational change: fewer roles, feature teams. Adopting the name without the change rarely works.',
    related: ['scrum', 'safe', 'conways-law'],
  },
  'disciplined-agile': {
    whenToUse: 'Large organisations with very different teams, where one framework won\'t fit everyone.',
    howTo: [
      'Start from each team\'s context: size, regulation, product type.',
      'Choose a lifecycle and practices that fit, from the toolkit\'s options.',
      'Revisit the way of working as the context changes.',
    ],
    watchOut: 'Flexibility can become inconsistency. Agree a few organisation-wide guardrails, such as security and release standards.',
    related: ['cynefin-framework', 'scrum', 'kanban'],
  },
  'prioritize-by-value-of-information': {
    whenToUse: 'Choosing which spike, experiment, prototype or research question to do first.',
    howTo: [
      'List the uncertainties that could change your decision.',
      'Estimate how much each would change the outcome if resolved.',
      'Investigate the high-value, cheap-to-answer questions first.',
    ],
    watchOut: 'Research that wouldn\'t change the decision is waste, however interesting.',
    related: ['expected-value', 'unknown-unknowns', 'sensitivity-analysis'],
  },
  'default-status': {
    whenToUse: 'Designing platforms, policies and tools, where most people will accept the default setting.',
    howTo: [
      'Identify the decisions people make by not deciding.',
      'Make the safest, most efficient choice the default: secure configs, cost tags, auto-shutdown for dev environments.',
      'Make changing the default possible but deliberate.',
    ],
    watchOut: 'Defaults shape behaviour powerfully. Review them as needs change, or yesterday\'s good default becomes today\'s waste.',
    related: ['forcing-function', 'activation-energy', 'inertia'],
  },
  'regret-minimization-framework': {
    whenToUse: 'Big personal and career decisions, and major organisational bets where analysis alone can\'t decide.',
    howTo: [
      'Imagine yourself years from now looking back.',
      'Ask which choice you would regret more: trying and failing, or never trying.',
      'Use that alongside the analysis, not instead of it.',
    ],
    watchOut: 'It favours bold choices. Combine it with a check on whether you can afford the downside.',
    related: ['ikigai', 'reversible-vs-irreversible-decisions', 'expected-value'],
  },
  'authority-bias': {
    whenToUse: 'Design reviews, incident calls and planning, where the most senior person\'s view may carry too much weight.',
    howTo: [
      'Let the most senior people speak last.',
      'Collect views independently before discussion, for example in writing.',
      'Judge ideas on evidence, not on who proposed them.',
    ],
    watchOut: 'Leaders often don\'t realise how much their opinions anchor the room. Ask for disagreement explicitly.',
    related: ['idea-meritocracy', 'six-thinking-hats', 'social-proof'],
  },
  'commitment-consistency-bias': {
    whenToUse: 'Reviewing long-running projects, public commitments, or architectural choices you once championed.',
    howTo: [
      'Notice when you defend a choice because you made it, not because it still works.',
      'Ask what you would decide if you were new to the situation.',
      'Make it safe, for yourself and others, to change your mind publicly.',
    ],
    watchOut: 'Changing your mind on evidence is a strength. Leaders who model it make it easier for everyone.',
    related: ['sunk-cost-fallacy', 'falsification-confirmation-bias', 'loss-aversion'],
  },
  'idea-meritocracy': {
    whenToUse: 'Building a team culture where the best ideas win, regardless of seniority.',
    howTo: [
      'Encourage everyone to share views openly, including disagreement.',
      'Evaluate ideas on evidence and reasoning.',
      'Explain decisions, especially when a popular idea is not chosen.',
    ],
    watchOut: 'A meritocracy of ideas needs psychological safety. Without it, only the confident speak.',
    related: ['believability-weighting', 'authority-bias', 'radical-transparency'],
  },
  'evaluate-accurately-not-kindly': {
    whenToUse: 'Performance conversations, design reviews and project assessments.',
    howTo: [
      'Give specific, evidence-based feedback, delivered with care.',
      'Separate the work from the person.',
      'Follow up with support to improve.',
    ],
    watchOut: 'Accurate does not mean harsh. Kindness in delivery and honesty in content work together.',
    related: ['radical-transparency', 'trust', 'growth-mindset'],
  },
  'think-like-an-owner': {
    whenToUse: 'Setting expectations for engineers and leaders, especially on cost, reliability and long-term maintenance.',
    howTo: [
      'Ask: if this were my money, my service, my customers, what would I do?',
      'Consider the long-term cost of decisions, not just the short-term win.',
      'Act on problems you see, even if they are not strictly yours.',
    ],
    watchOut: 'Owner thinking needs owner information and authority. Share cost and business context with the team.',
    related: ['own-your-outcomes', 'second-order-thinking', 'incentives'],
  },
  'appreciate-the-art-of-thoughtful-disagreement': {
    whenToUse: 'Architecture debates, planning disagreements and cross-team conflicts.',
    howTo: [
      'Aim to understand the other view well enough to explain it back.',
      'Disagree with the idea, not the person, using evidence.',
      'Agree how the decision will be made, then commit even if you disagreed.',
    ],
    watchOut: 'Disagreement without a way to decide becomes endless debate. Set the decision rule first.',
    related: ['six-thinking-hats', 'idea-meritocracy', 'trust'],
  },
  'generalist-vs-specialist': {
    whenToUse: 'Hiring, team design, career development, and deciding who should work on cross-cutting problems.',
    howTo: [
      'Use specialists for deep, high-risk areas such as security, databases and ML.',
      'Use generalists to connect areas and move work across boundaries.',
      'Build T-shaped people: depth in one area, breadth across several.',
    ],
    watchOut: 'Teams of pure specialists create handoffs; teams of pure generalists struggle with depth. Most teams need a mix.',
    related: ['comparative-advantage', 'circle-of-competence', 'conways-law'],
  },
  'high-context-vs-low-context-culture': {
    whenToUse: 'Leading global and distributed teams, writing for mixed audiences, and onboarding.',
    howTo: [
      'Notice whether your team relies on shared, unspoken context or on explicit communication.',
      'For distributed and diverse teams, lean towards low-context: write things down explicitly.',
      'Make implicit norms visible in team agreements and documentation.',
    ],
    watchOut: 'What feels obvious to long-standing team members is invisible to newcomers. Write it down.',
    related: ['dunbars-number', 'trust', 'radical-transparency'],
  },
  'imposter-syndrome': {
    whenToUse: 'Mentoring, onboarding and supporting people stepping into new roles or technologies such as AI.',
    howTo: [
      'Normalise it: share that most capable people feel it at times.',
      'Point to evidence of the person\'s real contributions.',
      'Encourage asking questions as a sign of strength.',
    ],
    watchOut: 'Imposter feelings can make people stay quiet in reviews and incidents. Create space for them to speak.',
    related: ['growth-mindset', 'dunning-kruger-effect', 'trust'],
  },
  // ── Wave 5 (part 1): systems, science and strategy ──────────────────────
  'adaptation': {
    whenToUse: 'When the environment shifts, such as new cloud pricing, AI capabilities or regulation, and the team must change how it works to stay effective.',
    howTo: [
      'Watch the environment deliberately: vendor changes, new tools, customer behaviour.',
      'Run small experiments to test new ways of working.',
      'Keep what works and retire practices that no longer fit.',
    ],
    watchOut: 'Adapting to every trend creates churn. Adapt to lasting shifts, and test before rolling out widely.',
    related: ['red-queen-effect', 'pdca', 'complex-adaptive-systems'],
  },
  'red-queen-effect': {
    whenToUse: 'Security, platform and AI work where standing still means falling behind: attackers, dependencies and competitors keep moving.',
    howTo: [
      'Identify where you must keep improving just to stay level: patching, dependency updates, security controls, skills.',
      'Budget regular capacity for this "keeping up" work.',
      'Automate it where you can, such as dependency bots and scheduled upgrades.',
    ],
    watchOut: 'Keeping up can consume all capacity. Automate the treadmill so people can work on what moves you ahead.',
    related: ['adaptation', 'technical-debt', 'compounding'],
  },
  'ecosystems': {
    whenToUse: 'Designing platforms, partner integrations and developer communities where many parties depend on each other.',
    howTo: [
      'Map the participants and how value flows between them.',
      'Make it easy and rewarding to contribute: clear APIs, documentation, recognition.',
      'Watch the health of the whole ecosystem, not just your part.',
    ],
    watchOut: 'An ecosystem that depends on one critical participant is fragile. Avoid single points of dependency.',
    related: ['network-effects', 'flywheel-effect', 'complex-adaptive-systems'],
  },
  'boiling-frog-symbol': {
    whenToUse: 'Slow drifts that nobody notices: creeping cloud cost, rising build times, growing alert noise, gradual latency increases.',
    howTo: [
      'Track trends over months, not just day-to-day values.',
      'Set alerts on trend and budget thresholds, not only on spikes.',
      'Review long-term charts in regular operations reviews.',
    ],
    watchOut: 'Each small increase looks harmless on its own. Compare with a fixed baseline from months ago.',
    related: ['compounding', 'feedback-loops', 'technical-debt'],
  },
  'chaos-dynamics': {
    whenToUse: 'Systems where small changes can have large, unpredictable effects: distributed systems, markets, large organisations.',
    howTo: [
      'Accept that long-range prediction is unreliable.',
      'Limit blast radius so small disturbances stay small.',
      'Use short planning horizons and frequent feedback.',
    ],
    watchOut: 'Chaos is not a reason to stop planning. Plan more often, in smaller steps.',
    related: ['emergence', 'black-swan', 'complex-adaptive-systems'],
  },
  'laws-of-thermodynamics': {
    whenToUse: 'Explaining why systems decay without effort: code rot, documentation drift, configuration sprawl, eroding team practices.',
    howTo: [
      'Assume disorder will increase unless energy is spent to reduce it.',
      'Budget regular maintenance time, like a tax on everything you build.',
      'Automate the effort where possible: linters, policy checks, scheduled clean-ups.',
    ],
    watchOut: 'Maintenance that only happens when something breaks is always too late. Make it routine.',
    related: ['technical-debt', '5s', 'organizational-debt'],
  },
  'catalysts': {
    whenToUse: 'Speeding up change without doing all the work yourself: champions, templates, enabling teams, good defaults.',
    howTo: [
      'Find what would make a desired change happen faster: a champion, a demo, a working example.',
      'Introduce it into the teams that are ready.',
      'Step back once the change is self-sustaining.',
    ],
    watchOut: 'A catalyst speeds up a reaction that is already possible. If the conditions aren\'t there, no champion will make it work.',
    related: ['activation-energy', 'critical-mass', 'leverage'],
  },
  'observer-effect': {
    whenToUse: 'Measuring systems and teams: profiling, tracing, productivity metrics, surveys.',
    howTo: [
      'Ask how the act of measuring might change what you measure.',
      'Use low-overhead measurement for production systems, such as sampling.',
      'For people metrics, explain the purpose and use them for learning, not judgement.',
    ],
    watchOut: 'Heavy instrumentation can slow the system you are trying to understand, and visible scorecards change behaviour.',
    related: ['goodharts-law', 'proxy', 'response-bias'],
  },
  'normal-distribution': {
    whenToUse: 'Recognising when averages and standard deviations are meaningful, and when they are not.',
    howTo: [
      'Plot the data before summarising it.',
      'If it is roughly bell-shaped, means and standard deviations are useful.',
      'If it is skewed or fat-tailed (latency, cost, incident impact), use percentiles instead.',
    ],
    watchOut: 'Most operational data is not normally distributed. Reporting the mean latency hides the slow requests users feel.',
    related: ['fat-tailed-processes', 'power-laws', 'confidence-interval'],
  },
  'confidence-interval': {
    whenToUse: 'Reporting the results of experiments, AI evaluations, performance tests or forecasts.',
    howTo: [
      'Report a range, not a single number: "pass rate 82% (78–86%)".',
      'Widen the sample if the range is too wide to decide.',
      'Compare options by whether their ranges overlap, not just their point estimates.',
    ],
    watchOut: 'A single precise-looking number hides uncertainty. Ranges make better decisions possible.',
    related: ['law-of-large-numbers', 'normal-distribution', 'sensitivity-analysis'],
  },
  'simpsons-paradox': {
    whenToUse: 'Comparing teams, services or AI models using aggregated metrics.',
    howTo: [
      'Break the data down by relevant groups: team size, service type, request type.',
      'Check whether the trend holds within each group.',
      'Report results at the level where the decision is made.',
    ],
    watchOut: 'A model or team can look worse overall while being better in every segment, because it handles a harder mix of work.',
    related: ['selection-bias', 'the-map-is-not-the-territory', 'proxy'],
  },
  'simulation': {
    whenToUse: 'Testing capacity plans, failure scenarios, cost models and AI agent behaviour before facing them in production.',
    howTo: [
      'Build a simple model of the system or scenario.',
      'Run it many times with varied inputs: load spikes, failures, price changes.',
      'Use the results to set limits, buffers and runbooks, then validate against reality.',
    ],
    watchOut: 'A simulation is only as good as its assumptions. Compare it with real incidents and data regularly.',
    related: ['scenario-analysis', 'sensitivity-analysis', 'the-map-is-not-the-territory'],
  },
  'thought-experiments': {
    whenToUse: 'Exploring designs, risks and strategies before building anything.',
    howTo: [
      'Pose a "what if" question: what if traffic grew tenfold, or this region disappeared, or an agent had admin rights?',
      'Reason through the consequences step by step.',
      'Turn the insights into tests, limits or design changes.',
    ],
    watchOut: 'Thought experiments can mislead if they ignore real constraints. Confirm the important conclusions with data or a prototype.',
    related: ['inversion', 'pre-mortem', 'second-order-thinking'],
  },
  'reductio-ad-absurdum': {
    whenToUse: 'Testing arguments, policies and requirements by following them to their logical extreme.',
    howTo: [
      'Take the rule or claim and apply it consistently to more extreme cases.',
      'If it leads to an absurd result, the rule needs limits or refinement.',
      'Use the finding to write a better, bounded rule.',
    ],
    watchOut: 'Use it to improve ideas, not to ridicule people. Pair it with Rapoport\'s rules in discussions.',
    related: ['rapoports-rules', 'falsification-confirmation-bias', 'thought-experiments'],
  },
  'rapoports-rules': {
    whenToUse: 'Critiquing a design, proposal or someone else\'s argument in a review.',
    howTo: [
      'Restate the other person\'s position so clearly they say "I wish I\'d put it that way".',
      'List the points you agree with, and anything you learned.',
      'Only then offer your critique.',
    ],
    watchOut: 'It feels slow, but it makes people far more open to your critique. It is how good reviews stay constructive.',
    related: ['appreciate-the-art-of-thoughtful-disagreement', 'six-thinking-hats', 'trust'],
  },
  'sturgeons-law': {
    whenToUse: 'Curating tools, ideas, AI outputs, backlog items or content, where most of what you see will not be valuable.',
    howTo: [
      'Expect most options to be mediocre, and screen quickly.',
      'Spend your time on the small fraction that is genuinely good.',
      'Set clear quality criteria so screening is fast and fair.',
    ],
    watchOut: 'Don\'t use it to dismiss a whole category. The good 10% is often excellent and easy to miss in the noise.',
    related: ['pareto-principle', 'power-laws', 'via-negativa'],
  },
  'simplify': {
    whenToUse: 'When a system, process or plan has grown too complex for people to understand or operate safely.',
    howTo: [
      'Identify the essential purpose of the system or process.',
      'Remove or merge the parts that don\'t serve it.',
      'Check that people can explain the result in a few sentences.',
    ],
    watchOut: 'Simplifying the interface can hide complexity rather than remove it. Make sure operators can still see what is happening.',
    related: ['kiss-principle', 'via-negativa', 'abstraction'],
  },
  'confidence-determines-speed-vs-quality': {
    whenToUse: 'Deciding how carefully to work on a change, release or decision.',
    howTo: [
      'Assess how confident you are in the approach and how well the area is understood.',
      'High confidence and low risk: move fast with light review.',
      'Low confidence or high risk: slow down, test more, release gradually.',
    ],
    watchOut: 'Confidence is not the same as familiarity. Check it against evidence, especially with new AI-generated code.',
    related: ['reversible-vs-irreversible-decisions', 'cynefin-framework', 'margin-of-safety'],
  },
  'creative-destruction': {
    whenToUse: 'Planning for technology shifts that make existing products, skills or platforms obsolete, such as cloud and AI.',
    howTo: [
      'Ask which of your systems or skills a new technology could replace.',
      'Invest early in learning and small experiments with the new approach.',
      'Plan graceful retirement of what is being replaced.',
    ],
    watchOut: 'Not every new technology destroys the old. Separate durable shifts from hype before restructuring around them.',
    related: ['red-queen-effect', 'the-lindy-effect', 'adaptation'],
  },
  'supply-and-demand': {
    whenToUse: 'Capacity planning, cloud pricing, internal platform demand and hiring markets.',
    howTo: [
      'Measure demand: requests, usage, tickets, hiring needs.',
      'Compare it with supply: capacity, people, budget.',
      'Adjust with pricing, prioritisation or investment, and watch how demand responds.',
    ],
    watchOut: 'Free internal services face unlimited demand. Showback or quotas help reveal real demand.',
    related: ['scarcity', 'price-elasticity', 'tragedy-of-the-commons'],
  },
  'scarcity': {
    whenToUse: 'Prioritising when people, budget, GPUs or senior attention are limited.',
    howTo: [
      'Name the scarce resource explicitly.',
      'Allocate it to the highest-value work first.',
      'Look for ways to increase supply or reduce demand for it over time.',
    ],
    watchOut: 'Scarcity narrows thinking and pushes people to short-term fixes. Protect some time for longer-term work.',
    related: ['opportunity-costs', 'theory-of-constraints', 'supply-and-demand'],
  },
  'price-elasticity': {
    whenToUse: 'Setting internal chargeback, choosing cloud pricing models, or estimating how usage will respond to cost changes.',
    howTo: [
      'Estimate how much usage changes when the price changes.',
      'Use showback or chargeback where usage is elastic and waste is high.',
      'Watch for teams shifting to cheaper but riskier options.',
    ],
    watchOut: 'Some usage is not elastic, such as critical production workloads. Price changes there just move cost around.',
    related: ['supply-and-demand', 'incentives', 'externalities'],
  },
  'barriers-to-entry': {
    whenToUse: 'Assessing competitive position, or deciding how hard it should be for teams to adopt or leave an internal platform.',
    howTo: [
      'Identify what makes it hard for others to enter: data, expertise, scale, integrations.',
      'Strengthen the barriers that come from real value, such as quality and integrations.',
      'For internal platforms, lower the barriers to adoption deliberately.',
    ],
    watchOut: 'Barriers built on lock-in rather than value breed resentment and eventual escape.',
    related: ['switching-costs', 'economies-of-scale', 'network-effects'],
  },
  'second-mover-advantage': {
    whenToUse: 'Deciding to wait for a technology to mature, such as a new AI framework or cloud service, rather than adopting it first.',
    howTo: [
      'Watch early adopters and learn from their problems.',
      'Prepare: skills, small experiments, an evaluation plan.',
      'Move decisively once the technology and patterns have stabilised.',
    ],
    watchOut: 'Waiting too long means catching up under pressure. Second movers still need to be learning while they wait.',
    related: ['first-mover-advantage', 'the-lindy-effect', 'preserving-optionality'],
  },
  'arbitrage': {
    whenToUse: 'Finding cost or value gaps: cloud pricing differences, spot capacity, regional costs, underused skills.',
    howTo: [
      'Look for the same resource priced differently in different places or times.',
      'Shift tolerant workloads to the cheaper option: spot instances, off-peak, cheaper regions.',
      'Account for the hidden costs of switching, such as latency, data transfer and risk.',
    ],
    watchOut: 'Arbitrage gaps close as others find them. Build flexibility rather than depending on one gap.',
    related: ['price-elasticity', 'opportunity-costs', 'preserving-optionality'],
  },

  // ── Wave 5 (part 2): markets, frameworks and people ─────────────────────
  'winner-take-all-market': {
    whenToUse: 'Choosing platforms and vendors in markets that tend to consolidate around one leader.',
    howTo: [
      'Assess whether network effects or scale make the market likely to consolidate.',
      'Favour likely winners for long-lived dependencies, or keep switching costs low.',
      'Watch for consolidation signs: acquisitions, pricing changes, ecosystem shifts.',
    ],
    watchOut: 'Betting on the eventual winner too early is hard. Abstractions and exit plans reduce the cost of betting wrong.',
    related: ['network-effects', 'switching-costs', 'barriers-to-entry'],
  },
  'win-win-game': {
    whenToUse: 'Cross-team agreements, vendor relationships and negotiations where long-term cooperation matters.',
    howTo: [
      'Understand what the other side really needs, not just what they ask for.',
      'Look for options that create value for both sides.',
      'Agree terms that both can keep over time.',
    ],
    watchOut: 'Win-win requires honesty about your own needs too. Agreeing to everything isn\'t win-win; it\'s just losing slowly.',
    related: ['zero-sum-vs-non-zero-sum', 'game-theory', 'trust'],
  },
  'exit-strategy': {
    whenToUse: 'Starting a vendor contract, pilot, migration or project, before you need to leave.',
    howTo: [
      'Decide in advance what would make you stop or switch.',
      'Plan the practical exit: data export, contract terms, rollback, replacement.',
      'Review the exit plan when the situation changes.',
    ],
    watchOut: 'An exit plan written but never tested may not work. Check data export and rollback for critical services.',
    related: ['switching-costs', 'reversible-vs-irreversible-decisions', 'sunk-cost-fallacy'],
  },
  'the-idea-maze': {
    whenToUse: 'Planning a new product, platform or AI initiative in a space others have already explored.',
    howTo: [
      'Map the paths others have taken, including the ones that failed.',
      'Understand why they failed: timing, technology, market, execution.',
      'Choose your path with those lessons in mind.',
    ],
    watchOut: 'A path that failed before may work now because the technology has changed. Ask why it failed, not just whether.',
    related: ['survivorship-bias', 'second-mover-advantage', 'wardley-mapping'],
  },
  'paradigm-shift': {
    whenToUse: 'Recognising when a fundamental change, like cloud, DevOps or generative AI, makes old assumptions invalid.',
    howTo: [
      'Notice when old rules keep failing in new situations.',
      'Question the assumptions behind your current practices.',
      'Experiment with the new model before rebuilding around it.',
    ],
    watchOut: 'Calling every new trend a paradigm shift creates fatigue. Look for evidence that the old model really no longer works.',
    related: ['creative-destruction', 'arguing-from-first-principles', 'adaptation'],
  },
  'metcalfes-law': {
    whenToUse: 'Estimating the value of connecting more people or systems: shared platforms, internal communities, integration hubs.',
    howTo: [
      'Recognise that potential connections grow much faster than the number of participants.',
      'Invest in making connections useful, not just possible.',
      'Measure active connections and real usage, not just sign-ups.',
    ],
    watchOut: 'More connections also mean more coordination and noise. Value comes from useful connections, not all of them.',
    related: ['network-effects', 'critical-mass', 'dunbars-number'],
  },
  'crystal': {
    whenToUse: 'Choosing how much process a team needs, based on its size and how critical its system is.',
    howTo: [
      'Assess team size and the cost of failure for the system.',
      'Use light process for small teams on low-risk systems.',
      'Add rigour as size and criticality grow, without losing frequent delivery and close communication.',
    ],
    watchOut: 'Process should match risk. Heavy process on a small, low-risk team slows it down for no benefit.',
    related: ['disciplined-agile', 'cynefin-framework', 'scrum'],
  },
  'dsdm-agilepm': {
    whenToUse: 'Projects with a fixed deadline and budget, such as compliance work, where scope must flex.',
    howTo: [
      'Fix time, cost and quality up front.',
      'Prioritise scope with MoSCoW: Must, Should, Could, Won\'t have.',
      'Deliver in timeboxes and drop Coulds first if time runs short.',
    ],
    watchOut: 'If everything is a Must, MoSCoW stops working. Keep Musts to around 60% of the effort.',
    related: ['minimum-viable-product', 'eisenhower-matrix', 'scrum'],
  },
  'feature-driven-development': {
    whenToUse: 'Large systems where delivery is best organised around small, client-valued features.',
    howTo: [
      'Build an overall domain model first.',
      'List features in "action-result-object" form, such as "calculate the total of a sale".',
      'Plan, design and build feature by feature, each within about two weeks.',
    ],
    watchOut: 'Class ownership can create bottlenecks. Combine FDD with collective code ownership where possible.',
    related: ['divide-and-conquer', 'scrum', 'extreme-programming'],
  },
  'nexus': {
    whenToUse: 'Three to nine Scrum teams working on one product, struggling with integration.',
    howTo: [
      'Form a Nexus Integration Team responsible for integration across teams.',
      'Hold Nexus Sprint Planning and a shared Nexus Sprint Review.',
      'Make cross-team dependencies visible and resolve them early in each sprint.',
    ],
    watchOut: 'The integration team supports integration; it shouldn\'t become a separate team doing everyone\'s merging.',
    related: ['scrum', 'less', 'safe'],
  },
  'scrum-scale': {
    whenToUse: 'Scaling Scrum across an organisation while keeping structures lightweight.',
    howTo: [
      'Group teams into a Scrum of Scrums for coordination.',
      'Create an Executive Action Team to remove impediments the teams can\'t solve.',
      'Run a parallel Product Owner cycle to align priorities across teams.',
    ],
    watchOut: 'Scaling structures only help if impediments actually get removed. Track how quickly escalations are resolved.',
    related: ['scrum', 'safe', 'less'],
  },
  'margin-of-safety-in-investing': {
    whenToUse: 'Business cases for platform, cloud or AI investments where the benefits are uncertain.',
    howTo: [
      'Estimate the benefits conservatively.',
      'Approve the investment only if the conservative case still justifies it.',
      'Track actual benefits against the estimate.',
    ],
    watchOut: 'An optimistic business case that only works if everything goes right is a warning sign.',
    related: ['margin-of-safety', 'cost-benefit-analysis', 'expected-value'],
  },
  'representativeness-heuristic': {
    whenToUse: 'Judging people, projects and technologies by how much they resemble a familiar type.',
    howTo: [
      'Notice when you judge something by its similarity to a stereotype.',
      'Check the base rate: how often does this type of thing actually succeed?',
      'Look for evidence specific to this case.',
    ],
    watchOut: 'A candidate or project that "looks like" past successes may still be a poor fit. Base rates matter more than resemblance.',
    related: ['availability-bias', 'bayesian-updating', 'narrative-instinct'],
  },
  'narrative-instinct': {
    whenToUse: 'Incident reviews, strategy discussions and executive updates, where a compelling story may outrun the evidence.',
    howTo: [
      'Notice when an explanation feels satisfying because it is a good story.',
      'Ask what evidence supports each part of it.',
      'Consider alternative stories that fit the same facts.',
    ],
    watchOut: 'Stories persuade more than data. Use them to communicate evidence, not to replace it.',
    related: ['hindsight-bias', 'falsification-confirmation-bias', 'representativeness-heuristic'],
  },
  'lollapalooza-tendency': {
    whenToUse: 'Understanding extreme outcomes, such as a runaway project, an over-hyped technology bet or a major incident, where several biases combined.',
    howTo: [
      'List the biases and incentives that pushed in the same direction.',
      'Identify which ones you can break: independent review, devil\'s advocate, staged commitments.',
      'Build those checks into big decisions.',
    ],
    watchOut: 'When everything points the same way and everyone agrees quickly, slow down and check.',
    related: ['incentives', 'social-proof', 'commitment-consistency-bias'],
  },
  'denial': {
    whenToUse: 'When warning signs are being explained away: slipping projects, rising incidents, a failing technology bet.',
    howTo: [
      'Look at the trend data honestly, ideally with someone outside the project.',
      'Ask what you would advise another team in the same situation.',
      'Make it safe to raise bad news early.',
    ],
    watchOut: 'Denial is often collective. Teams protect each other from uncomfortable truths, so invite outside views.',
    related: ['sunk-cost-fallacy', 'commitment-consistency-bias', 'boiling-frog-symbol'],
  },
  'envy-jealousy': {
    whenToUse: 'Team dynamics around promotions, high-profile projects and recognition.',
    howTo: [
      'Notice comparison and resentment in yourself and the team.',
      'Make recognition and opportunities fair and transparent.',
      'Celebrate collective wins as well as individual ones.',
    ],
    watchOut: 'Unaddressed envy damages trust and collaboration. Transparency about how decisions are made helps a lot.',
    related: ['trust', 'radical-transparency', 'incentives'],
  },
  'maslows-hierarchy-of-needs': {
    whenToUse: 'Understanding team motivation, especially during uncertainty, re-organisations or heavy on-call load.',
    howTo: [
      'Check the foundations first: job security, sustainable workload, psychological safety.',
      'Then build belonging and recognition.',
      'Only then expect people to focus on growth and mastery.',
    ],
    watchOut: 'Talking about purpose and innovation while people worry about their jobs or burn out on call doesn\'t work.',
    related: ['trust', 'meaningful-relationships-and-meaningful-work-are-mutually-reinforcing', 'ikigai'],
  },
  'paradox-of-choice': {
    whenToUse: 'Designing internal platforms, tool catalogues and self-service options, where too many choices slow people down.',
    howTo: [
      'Offer a small number of well-supported default options, such as golden paths.',
      'Make the recommended option obvious.',
      'Allow alternatives for special cases, with clear guidance.',
    ],
    watchOut: 'Too few choices frustrate advanced users. Curate the defaults, but don\'t block justified exceptions.',
    related: ['default-status', 'simplify', 'kiss-principle'],
  },
  'response-bias': {
    whenToUse: 'Running engineering surveys, developer experience surveys and feedback forms.',
    howTo: [
      'Keep surveys anonymous where honesty matters.',
      'Ask neutral, specific questions rather than leading ones.',
      'Compare survey results with behavioural data, such as usage and lead time.',
    ],
    watchOut: 'People tell leaders what they think leaders want to hear. Combine surveys with observation.',
    related: ['selection-bias', 'observer-effect', 'gemba'],
  },
  'making-mistakes': {
    whenToUse: 'Building a culture where people experiment, report problems early and learn from failure.',
    howTo: [
      'Distinguish between careless mistakes and intelligent failures from sensible experiments.',
      'Share your own mistakes and what you learned.',
      'Make small, cheap mistakes possible: feature flags, sandboxes, staged rollouts.',
    ],
    watchOut: 'Accepting mistakes doesn\'t mean accepting repeated ones. Expect learning to show in what happens next.',
    related: ['blameless-post-mortem', 'growth-mindset', 'pain-reflection-progress'],
  },
  'pain-reflection-progress': {
    whenToUse: 'After setbacks: failed launches, major incidents, missed goals, difficult feedback.',
    howTo: [
      'Acknowledge the pain rather than rushing past it.',
      'Reflect on what happened and why, honestly and specifically.',
      'Turn the reflection into one or two concrete changes.',
    ],
    watchOut: 'Pain without reflection just repeats. Reflection without action is just discussion.',
    related: ['blameless-post-mortem', 'making-mistakes', 'kaizen'],
  },
  'believability-weighting': {
    whenToUse: 'Decisions where expertise varies widely: architecture choices, security calls, AI model selection.',
    howTo: [
      'Identify who has a strong track record in this specific area.',
      'Give their views more weight, while still hearing everyone.',
      'Explain the weighting openly so it feels fair.',
    ],
    watchOut: 'Track records in one area don\'t transfer to another. Weight by relevant expertise, not by seniority.',
    related: ['idea-meritocracy', 'circle-of-competence', 'authority-bias'],
  },
  'culture-of-lifelong-learning': {
    whenToUse: 'Keeping teams current in fast-moving fields like cloud, security and AI.',
    howTo: [
      'Give people protected time to learn, and treat it as real work.',
      'Share learning through demos, guilds, write-ups and pairing.',
      'Recognise learning in reviews and career conversations.',
    ],
    watchOut: 'Learning budgets that nobody has time to use send the wrong message. Time matters more than money.',
    related: ['deliberate-practice', 'growth-mindset', 'compounding'],
  },
  'meaningful-relationships-and-meaningful-work-are-mutually-reinforcing': {
    whenToUse: 'Building engaged, resilient teams, especially through demanding periods such as major incidents or migrations.',
    howTo: [
      'Connect each person\'s work to outcomes that matter to customers and the business.',
      'Invest in relationships: one-to-ones, pairing, time together that isn\'t only about tasks.',
      'Notice when either is missing and act early.',
    ],
    watchOut: 'Neither can be forced. Create the conditions and let them grow.',
    related: ['trust', 'ikigai', 'maslows-hierarchy-of-needs'],
  },
  // ── Wave 6: the remaining academic models, made practical ──────────────
  'mr-market': {
    whenToUse: 'When hype and fear swing opinions about a technology, vendor or AI trend, and you need to decide calmly.',
    howTo: [
      'Treat market mood, whether excitement or panic, as information about people, not about value.',
      'Judge the technology on your own criteria and evidence.',
      'Act when the mood offers an opportunity, such as better pricing or talent, not because of the mood itself.',
    ],
    watchOut: 'Ignoring the market entirely is also risky. Mood can change vendor support, hiring and ecosystem health.',
    related: ['social-proof', 'margin-of-safety-in-investing', 'the-lindy-effect'],
  },
  'markov-models': {
    whenToUse: 'Modelling systems that move between states, such as incident lifecycles, user journeys, retry behaviour or agent workflows.',
    howTo: [
      'List the states (healthy, degraded, down; or new, active, churned).',
      'Estimate the probability of moving between them from real data.',
      'Use the model to find where systems or users get stuck and to predict long-run behaviour.',
    ],
    watchOut: 'Markov models assume the next state depends only on the current one. Real systems often have memory, so validate against data.',
    related: ['simulation', 'feedback-loops', 'randomness'],
  },
  'heisenberg-uncertainty-principle': {
    whenToUse: 'As a reminder that precise measurement of one property can come at the cost of another, as with debugging, profiling and tracing in production.',
    howTo: [
      'Decide which property matters most for the question you are asking.',
      'Measure it with the lightest tool that answers the question.',
      'Accept some uncertainty elsewhere rather than disturbing the system heavily.',
    ],
    watchOut: 'In software this is an analogy, not physics. The practical lesson is the observer effect: measurement has a cost.',
    related: ['observer-effect', 'the-map-is-not-the-territory', 'confidence-interval'],
  },
  'exaptation': {
    whenToUse: 'Finding new uses for existing tools, data and skills, such as reusing a deployment pipeline for ML models or logs for AI training data.',
    howTo: [
      'List capabilities you already have: tools, data, platforms, people\'s skills.',
      'Ask what else each could be used for.',
      'Try the most promising reuse on a small scale before building something new.',
    ],
    watchOut: 'Repurposed tools can be stretched too far. Check that the reuse doesn\'t compromise the original purpose or security.',
    related: ['scamper', 'lateral-thinking', 'core-competency'],
  },
  'niches': {
    whenToUse: 'Choosing where a team, product, consultancy or career can stand out, rather than competing everywhere.',
    howTo: [
      'Look for underserved needs where your strengths are rare.',
      'Focus deeply on that niche and become known for it.',
      'Expand to neighbouring niches once you are established.',
    ],
    watchOut: 'Niches can shrink or disappear as markets change. Keep an eye on adjacent areas you could move into.',
    related: ['core-competency', 'comparative-advantage', 'ikigai'],
  },
  'central-limit-theorem': {
    whenToUse: 'Interpreting averages from many samples, such as average build time across runs or average eval score across many prompts.',
    howTo: [
      'Remember that averages of many independent samples tend towards a normal distribution, even if individual values don\'t.',
      'Use this to estimate how reliable an average is from its sample size.',
      'Still look at the underlying distribution for tail behaviour.',
    ],
    watchOut: 'A well-behaved average can hide a dangerous tail. Report percentiles for anything users feel directly.',
    related: ['normal-distribution', 'law-of-large-numbers', 'confidence-interval'],
  },
  'randomness': {
    whenToUse: 'Interpreting short-term ups and downs in metrics, sprint results, incident counts or AI outputs.',
    howTo: [
      'Expect natural variation and estimate how large it usually is.',
      'React to sustained trends or clear outliers, not to every fluctuation.',
      'Use randomness deliberately: random sampling for reviews, jitter in retries, randomised experiments.',
    ],
    watchOut: 'People see patterns in noise. Before acting on a "trend", check it is bigger than normal variation.',
    related: ['regression-to-the-mean', 'law-of-large-numbers', 'confidence-interval'],
  },
  'pareto-efficiency': {
    whenToUse: 'Trade-off decisions with several goals, such as cost, latency, reliability and model quality, where no option is best on all.',
    howTo: [
      'Plot the options against the competing goals.',
      'Discard options that are worse on every goal than another option.',
      'Choose among the remaining "efficient" options based on priorities.',
    ],
    watchOut: 'Pareto efficiency tells you which options are sensible, not which one to pick. The final choice still needs judgement.',
    related: ['weighted-decision-matrix', 'opportunity-costs', 'pareto-principle'],
  },
  'half-life': {
    whenToUse: 'Understanding how quickly knowledge, skills, documentation, dependencies or AI models become outdated.',
    howTo: [
      'Estimate how long it takes for half of something to become obsolete: a framework skill, a runbook, a model.',
      'Set review and refresh cycles to match.',
      'Invest more in knowledge with a long half-life, such as fundamentals and principles.',
    ],
    watchOut: 'Fast-moving fields like AI have short half-lives. Plan for continuous refresh rather than one-off training.',
    related: ['culture-of-lifelong-learning', 'the-lindy-effect', 'laws-of-thermodynamics'],
  },
  'asymmetric-warfare': {
    whenToUse: 'Competing against much larger organisations, or defending against attackers who only need to succeed once.',
    howTo: [
      'Identify where a smaller player has the advantage: speed, focus, closeness to customers.',
      'Compete there rather than head-on.',
      'In security, assume attackers have the advantage and invest in detection and response, not just prevention.',
    ],
    watchOut: 'Advantages of size, such as scale and resources, are real. Asymmetric strategies work best when you stay focused.',
    related: ['niches', 'red-queen-effect', 'swiss-cheese-model'],
  },
};
