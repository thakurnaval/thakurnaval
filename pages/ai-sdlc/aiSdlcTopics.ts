import type { TopicContent } from '../../components/TopicArticle';

const parent = { label: 'AI in SDLC', to: '/ai-sdlc' };
const mm = (anchor: string, label: string) => ({ label: `Mental model: ${label}`, to: `/explore/mental-models#${anchor}` });
const guide = { label: 'AI-Native SDLC Field Guide (free PDF)', to: '/ai-sdlc/field-guide' };
const assess = { label: 'GenAI Readiness Assessment', to: '/genai/assessment' };

export const AI_SDLC_TOPICS: Record<string, TopicContent> = {
  requirements: {
    path: '/ai-sdlc/requirements',
    title: 'AI in Requirements',
    subtitle: 'Turning ideas into clear, testable requirements faster, with AI as an analyst and people as decision-makers.',
    description: 'How AI helps with requirements: interviewing stakeholders, drafting intent and specs, finding ambiguity and gaps, generating acceptance criteria, and the controls it needs.',
    parent,
    intro: [
      'When AI can turn a clear plan into working code in hours, the slowest part of delivery is often deciding what to build. Requirements pass through workshops, tickets and handoffs, and by the time they reach engineering they are several steps removed from what the person with the idea meant.',
      'AI can shorten that path. It can interview the person with the idea, draft a clear brief in their own words, spot ambiguity and missing cases, and turn the result into a spec the team can plan against. People still decide what is worth building.',
    ],
    sections: [
      {
        heading: 'Capturing intent',
        body: [
          'Instead of waiting for an analyst, the originator describes the problem to an AI assistant, which asks the questions an analyst would: who is affected, what better looks like, what is out of scope, what constraints apply. The result is a short intent document (problem, outcome, users, constraints, open questions) that the product owner reviews and accepts or rejects.',
        ],
        terms: [
          ['Intent document', 'A short, versioned brief in the originator\'s words: the problem, desired outcome, constraints and open questions.'],
          ['Spec', 'Requirements and design derived from the accepted intent, including non-functional needs and flagged concerns.'],
        ],
      },
      {
        heading: 'Finding ambiguity, conflicts and gaps',
        body: [
          'AI is good at reading a requirement and pointing out what is unclear: vague terms, contradictory rules, missing error cases, undefined roles. Asking it to list the questions a tester or security reviewer would ask is a quick way to strengthen a spec before anyone writes code.',
        ],
      },
      {
        heading: 'From requirements to acceptance criteria',
        body: [
          'AI can draft user stories, acceptance criteria and example test cases from an accepted spec. These drafts give testers and developers a head start and make "done" explicit, which in turn lets AI coding agents check their own work against clear targets.',
        ],
      },
      {
        heading: 'Applying standards automatically',
        body: [
          'Organisations can package their security, API, accessibility and cost standards as reusable instructions for AI assistants. The spec is then drafted with those standards applied, and conflicts are flagged early instead of being discovered in a review weeks later.',
        ],
      },
      {
        heading: 'Keeping people in charge',
        body: [
          'The product owner reviews and accepts every intent and spec. Version both alongside the code, so there is a clear trail from what was asked for to what was built and who approved it. That trail is valuable for audits and for anyone joining the team later.',
        ],
      },
      {
        heading: "Fitting into existing tools",
        body: [
          "Many organisations already keep requirements in Jira, Azure Boards or a regulated requirements tool. That is fine. Decide which system is the source of truth for each artifact, and link the two: the ticket references the intent and spec files, and the files reference the ticket ID. AI assistants connected to those tools can read and update records directly.",
        ],
      },
    ],
    practice: [
      'Agree a one-page intent template: problem, outcome, users, constraints, open questions.',
      'Let originators draft intents with an AI assistant, then have the product owner review them.',
      'Ask AI to list ambiguities and missing cases for every spec before planning.',
      'Generate draft acceptance criteria and review them with testers.',
      'Write your key standards as reusable AI instructions.',
      'Store intent and spec documents in version control next to the code.',
    ],
    mistakes: [
      'Long AI-written requirement documents that nobody reads. Length is not clarity.',
      'Skipping the product owner\'s review because the draft looks polished.',
      'Specs with no non-functional requirements, so security and cost surface late.',
      'Keeping requirements in a tool disconnected from the code that implements them.',
    ],
    measures: [
      'Time from idea to accepted intent.',
      'Share of intents accepted rather than rejected.',
      'Spec changes after build starts (rework).',
      'Defects traced back to unclear requirements.',
    ],
    related: [guide, assess, { label: 'Architecture Decisions Toolkit', to: '/explore/toolkits/architecture-decisions' }, mm('jobs-to-be-done', 'Jobs To Be Done'), mm('working-backwards', 'Working Backwards'), mm('inversion', 'Inversion')],
  },

  coding: {
    path: '/ai-sdlc/coding',
    title: 'AI-Powered Coding',
    subtitle: 'From autocomplete to coding agents: getting real productivity gains without losing quality or control.',
    description: 'AI-powered coding in practice: assistants and agents, plan-first workflows, repository context files, guardrails, parallel sessions, and measuring the real impact.',
    parent,
    intro: [
      'AI coding tools have moved quickly from autocomplete to agents that can read a codebase, plan a change, write the code and tests, and run them. Used well, they let engineers spend more time on design, review and problems that need judgement, and less on boilerplate.',
      'Used carelessly, they produce large amounts of plausible code that is hard to review and easy to break. The difference is mostly in how teams work with them, not which tool they choose.',
    ],
    sections: [
      {
        heading: 'Assistants and agents',
        body: [],
        terms: [
          ['Inline assistants', 'Suggest the next lines or functions as you type; helpful for routine code.'],
          ['Chat assistants', 'Explain code, answer questions and draft changes on request.'],
          ['Coding agents', 'Take a task, explore the repository, plan, edit files and run commands and tests, working for longer on their own.'],
        ],
      },
      {
        heading: 'Plan first, then build',
        body: [
          'The most reliable pattern for agents is plan-first. Ask for a written plan naming the files to change, the order of work, the tests that prove it and the risks, before any code is written. Review and correct the plan, then let the agent implement it. Correcting a plan is cheap; correcting a 2,000-line diff is not.',
        ],
      },
      {
        heading: 'Repository context',
        body: [
          'Agents work far better with a short context file in the repository (such as CLAUDE.md or AGENTS.md) listing build and test commands, conventions, architecture notes and the mistakes the agent keeps making. Keep it under a page and update it whenever a correction comes up twice.',
        ],
      },
      {
        heading: 'Guardrails',
        body: [
          'Instructions make good behaviour likely; automated guardrails make bad behaviour impossible. Use hooks and permissions to block edits to protected paths, keep secrets out of changes, run formatters automatically, and stop agents editing tests during a bug fix. The same CI checks and security scans apply to AI-written code as to any other code.',
        ],
      },
      {
        heading: 'Parallel work',
        body: [
          'Because agents work on their own, one engineer can run several on separate tasks, each in its own branch or worktree. The practical limit is how much the engineer can review properly. Add parallel sessions only while review quality keeps up.',
        ],
      },
      {
        heading: "Choosing tools and models",
        body: [
          "Most teams standardise on one or two coding tools so prompts, context files and lessons can be shared. Evaluate them on real tasks from your own codebase, with your own tests, rather than on public benchmarks. Check data-handling terms, enterprise controls such as single sign-on and audit logs, and how well the tool works with your repositories and pipelines.",
        ],
      },
      {
        heading: "Skills still matter",
        body: [
          "AI changes what engineers spend their time on, not whether they need deep skills. Engineers who understand architecture, testing and security are the ones who can write good plans, spot flawed generated code and design the guardrails. Invest in those skills alongside the tools.",
        ],
      },
    ],
    practice: [
      'Add a short context file to your busiest repositories.',
      'Make build, test and lint each a single command that agents can run.',
      'Adopt plan-first for any non-trivial change made by an agent.',
      'Add hooks that block secrets and protected-path edits.',
      'Pilot with one team and measure lead time, first-pass merge rate and change failure rate.',
      'Share prompts, context files and lessons across teams.',
    ],
    mistakes: [
      'Prompt-and-pray: skipping the plan and reviewing huge diffs.',
      'Measuring lines of code or "AI usage" instead of outcomes.',
      'Letting agents run with broad permissions and no guardrails.',
      'Adopting AI coding without fast, reliable tests to check its work.',
    ],
    measures: [
      'Lead time for changes and deployment frequency.',
      'First-pass merge rate for agent-written changes.',
      'Change failure rate, to make sure speed isn\'t costing quality.',
      'Developer satisfaction and time spent on review.',
    ],
    related: [guide, { label: 'AI in Code Review', to: '/ai-sdlc/code-review' }, { label: 'AI in Testing', to: '/ai-sdlc/testing' }, mm('theory-of-constraints', 'Theory of Constraints'), mm('velocity-vs-speed', 'Velocity vs Speed'), mm('forcing-function', 'Forcing Function')],
  },

  testing: {
    path: '/ai-sdlc/testing',
    title: 'AI in Testing',
    subtitle: 'Giving every change, human or AI, a fast way to prove it works.',
    description: 'AI in software testing: generating tests, test-first bug fixes, self-healing UI tests, visual checks, protecting tests from being weakened, and evaluating AI systems themselves.',
    parent,
    intro: [
      'As AI speeds up writing code, testing becomes the main safety net. The faster code is produced, the more important it is that every change can be checked automatically and quickly, before a person spends time reviewing it.',
      'AI helps on both sides: it can write and maintain tests, and it can use tests to check and fix its own work. The key is giving it a reliable feedback loop and making sure it can\'t weaken the checks that protect you.',
    ],
    sections: [
      {
        heading: 'Generating tests',
        body: [
          'AI can draft unit tests, edge cases and integration tests from code or from acceptance criteria. It is especially useful for legacy code with little coverage, where writing characterisation tests by hand is slow. Review generated tests as carefully as generated code: a test that asserts the wrong behaviour is worse than none.',
        ],
      },
      {
        heading: 'Test-first bug fixes',
        body: [
          'For bugs, ask the agent to reproduce the problem as a failing test first, confirm it fails for the right reason, then fix the code without changing the test. A test that existed before the fix, and that the agent couldn\'t edit, is the best evidence the bug is really gone.',
        ],
      },
      {
        heading: 'A feedback loop for every session',
        body: [
          'Give agents a way to check their own work: one command for the build, one for the tests, and for UI work a browser or screenshot tool to compare against a design. State "done" in checkable terms, such as "all tests in this module pass". The agent then iterates until the check passes, so what reaches a person has already passed it.',
        ],
      },
      {
        heading: 'UI and visual testing',
        body: [
          'Self-healing UI tests use AI to cope with small changes in page structure, reducing brittle test maintenance. Visual comparison against approved designs catches layout problems that functional tests miss. Both work best alongside, not instead of, well-designed test IDs and stable components.',
        ],
      },
      {
        heading: 'Testing AI features themselves',
        body: [
          'Features built on language models need evaluation sets: real inputs with expected outcomes, scored automatically and by people. Run them on every change to prompts, models or retrieval, and add every production failure as a new case. This is the AI-era equivalent of a regression suite.',
        ],
      },
      {
        heading: "Where AI testing pays off first",
        body: [
          "The quickest wins are usually raising coverage on critical but untested code, writing tests for bug fixes, and keeping brittle end-to-end tests working as the UI changes. Measure the effect on escaped defects and on time spent maintaining tests, and expand from there.",
        ],
      },
      {
        heading: "Keeping the suite fast",
        body: [
          "AI makes it easy to generate many tests, and a suite that grows without care becomes slow and flaky. Review generated tests for value, remove duplicates, and keep the fast tests that run on every change separate from slower suites that run less often.",
        ],
      },
    ],
    practice: [
      'Make sure tests run locally with one command and finish quickly.',
      'Add a "verify before done" instruction to your repository context file.',
      'Adopt test-first for bug fixes made by agents.',
      'Block agents from editing test files during fix tasks.',
      'Use AI to raise coverage on the riskiest untested code first.',
      'Build evaluation sets for every AI feature you ship.',
    ],
    mistakes: [
      'Letting an agent "fix" a failing test by weakening it.',
      'Accepting generated tests without reviewing what they assert.',
      'Slow, flaky test suites that agents and people learn to ignore.',
      'Shipping AI features with no evaluation set.',
    ],
    measures: [
      'First-pass CI success rate for agent-written changes.',
      'Defects escaping to production.',
      'Test suite run time and flaky-test rate.',
      'Evaluation pass rate for AI features over time.',
    ],
    related: [guide, { label: 'AI-Powered Coding', to: '/ai-sdlc/coding' }, { label: 'LLMOps', to: '/genai/llmops' }, mm('feedback-loops', 'Feedback Loops'), mm('scientific-method', 'Scientific Method'), mm('swiss-cheese-model', 'Swiss Cheese Model')],
  },

  'code-review': {
    path: '/ai-sdlc/code-review',
    title: 'AI in Code Review',
    subtitle: 'Layered review: AI catches the routine issues so people can focus on intent and risk.',
    description: 'AI in code review: first-pass reviews for bugs, security and standards, review policies, severity and nit caps, fixing review comments, and keeping human approval.',
    parent,
    intro: [
      'Code review was designed for a world where people wrote every line. When agents write much of the diff, reading every line by hand becomes a bottleneck, and review quality drops as reviewers tire. AI review helps by giving every pull request a consistent first pass within minutes.',
      'The goal is not to remove human review. It is to move human attention up a level: from spotting typos and missing null checks to judging whether the change does what was intended, and whether the risk is acceptable.',
    ],
    sections: [
      {
        heading: 'What AI review is good at',
        body: [
          'AI reviewers reliably catch logic errors, missing edge cases, security issues such as injection risks or secrets, performance problems, and departures from your coding standards. They also check whether a change matches its spec and plan, which human reviewers often skip under time pressure.',
        ],
      },
      {
        heading: 'A review policy',
        body: [
          'Write down what the AI reviewer should do, in a file in the repository: the passes to run, what counts as important versus a minor nit, how many nits to report at most, and what to skip, such as generated code or anything CI already checks.',
        ],
        terms: [
          ['Passes', 'Separate checks for bugs, security, and compliance with the spec, plan and design principles.'],
          ['Severity', 'Important means behaviour breaks, data leaks or a policy is breached. Style issues are nits.'],
          ['Nit cap', 'A limit on minor comments per review, so important findings aren\'t buried.'],
        ],
      },
      {
        heading: 'Fixing review comments',
        body: [
          'AI can also address review comments: a reviewer tags the assistant on a comment, and it pushes a fix to the branch. For changes an agent opened, the agent can keep working through unresolved comments and failing checks until the pull request is green and waiting only for human approval.',
        ],
      },
      {
        heading: 'Separation of duties',
        body: [
          'The agent that wrote a change must never approve it. Branch protection should require approval from a human code owner, informed by the AI findings. This preserves accountability and satisfies most audit requirements.',
        ],
      },
      {
        heading: 'Learning from reviews',
        body: [
          'When the same issue comes up twice, add the correction to the repository context file so coding agents stop making it. Review the AI reviewer itself every month: rate its findings, tune the policy, and remove noise.',
        ],
      },
      {
        heading: "Managed service or your own pipeline",
        body: [
          "There are two common ways to add AI review: a managed review service that an administrator enables for chosen repositories, or an action in your own CI pipeline that calls a model. The managed route is fastest; the pipeline route gives more control over prompts, data handling and which models are used. Many organisations start managed and move to their own pipeline as needs grow.",
        ],
      },
      {
        heading: "Human review, redesigned",
        body: [
          "With AI handling the first pass, human reviewers can work differently: read the plan and the AI findings first, then focus on intent, design and risk. For larger changes, a short call with the author is often faster than dozens of written comments.",
        ],
      },
    ],
    practice: [
      'Turn on AI first-pass review for one repository.',
      'Write a short review policy with passes, severity and a nit cap.',
      'Keep branch protection with required human code-owner approval.',
      'Let authors ask the assistant to address review comments.',
      'Feed repeated findings into the repository context file.',
      'Tune the policy monthly based on the usefulness of findings.',
    ],
    mistakes: [
      'Rubber-stamping agent pull requests because they look tidy.',
      'Letting AI findings approve or block merges on their own.',
      'Flooding reviews with minor comments until people ignore them.',
      'Never tuning the reviewer after the first week.',
    ],
    measures: [
      'Time to first review.',
      'Defects and vulnerabilities caught before merge versus after.',
      'Share of review comments resolved without manual edits.',
      'Reviewer satisfaction with the usefulness of AI findings.',
    ],
    related: [guide, { label: 'AI-Powered Coding', to: '/ai-sdlc/coding' }, { label: 'Better Reviews and Meetings Toolkit', to: '/explore/toolkits/reviews-and-meetings' }, mm('swiss-cheese-model', 'Swiss Cheese Model'), mm('false-positives-and-false-negatives', 'False Positives and Negatives'), mm('directly-responsible-individual', 'Directly Responsible Individual')],
  },

  deployment: {
    path: '/ai-sdlc/deployment',
    title: 'AI in Deployment',
    subtitle: 'Agents that prepare releases and triage failures, up to the production gate and never past it.',
    description: 'AI in deployment: pipeline triage, release preparation, risk signals, autonomy tiered by environment, approval gates, rehearsed rollback and governance.',
    parent,
    intro: [
      'Pipelines are good at running deterministic steps and poor at anything that needs judgement: working out why a build broke, summarising what changed in a release, or deciding whether a flaky test is really flaky. That is where AI helps most in deployment.',
      'The governing principle is simple: the agent may act up to the production gate, and cannot pass it. A named person authorises production releases, and tooling enforces that.',
    ],
    sections: [
      {
        heading: 'Judgement steps in the pipeline',
        body: [
          'AI can run non-interactively inside CI to triage a failed build and post a short explanation, decide whether a failure looks flaky or real, draft release notes and changelogs, and summarise risk for the approver. Start with these read-only steps; they save time without changing anything.',
        ],
      },
      {
        heading: 'Autonomy tiered by environment',
        body: [],
        terms: [
          ['Development', 'Agents deploy freely to test their own changes.'],
          ['Staging', 'Agents deploy and run checks, with automatic rollback on failure.'],
          ['Production', 'Agents prepare the release; a named release manager authorises it, enforced by an approval gate.'],
        ],
      },
      {
        heading: 'Risk signals',
        body: [
          'Signals such as the size of a change, the files it touches, test coverage of those files and the service\'s recent incident history help decide how carefully to release: a small, well-tested change might go straight to a canary; a risky one might need a slower rollout and extra review.',
        ],
      },
      {
        heading: 'Rollback as the most rehearsed path',
        body: [
          'Rollback should be a single command that is exercised regularly in staging, so it is trusted when needed. Automated rollback triggers, based on error rates or latency after a deploy, are among the safest forms of automation, because they return the system to a known good state.',
        ],
      },
      {
        heading: 'Governance and audit',
        body: [
          'Run agents in pipelines under their own identity, with short-lived credentials and no standing production access. Expose deployment actions as an allowlist of tools rather than shell scripts with credentials. Every action is logged and attributable, which keeps auditors comfortable.',
        ],
      },
      {
        heading: "Getting started safely",
        body: [
          "Begin with read-only help: build-failure explanations and release notes. Once teams trust those, add write steps behind existing gates, such as fixing lint errors or updating generated documentation, always arriving as a pull request rather than a direct change. Only then consider agents that run deployments, starting with development environments.",
          "Each step should be reversible and visible. If people can't see what the agent did and undo it easily, it isn't ready for more autonomy.",
        ],
      },
      {
        heading: "Measuring the effect",
        body: [
          "Track the four DORA metrics before and after introducing AI into the pipeline, together with the share of failures triaged automatically and the time spent waiting at approval gates. If lead time falls while change failure rate holds steady or improves, the automation is helping. If failures rise, slow down and strengthen tests and gates before adding more autonomy.",
        ],
      },
    ],
    practice: [
      'Add an AI step that triages failed builds and comments on the pull request.',
      'Generate release notes automatically from merged changes.',
      'Define autonomy per environment and enforce the production gate.',
      'Make rollback a single, rehearsed command with automatic triggers.',
      'Give pipeline agents their own scoped, short-lived identities.',
      'Review agent actions and gate decisions in regular operations reviews.',
    ],
    mistakes: [
      'Giving agents standing production credentials.',
      'Automating deployment before rollback is reliable.',
      'Using AI risk scores to skip human approval for production.',
      'Ignoring the audit trail until an auditor asks for it.',
    ],
    measures: [
      'Share of pipeline failures triaged without paging a person.',
      'Lead time and deployment frequency.',
      'Change failure rate and time to restore.',
      'Time waiting at the production approval gate.',
    ],
    related: [guide, { label: 'Site Reliability Engineering', to: '/devops/sre' }, { label: 'DevSecOps Playbook', to: '/secops/devsecops-playbook' }, mm('reversible-vs-irreversible-decisions', 'Reversible vs Irreversible Decisions'), mm('margin-of-safety', 'Margin of Safety'), mm('confidence-determines-speed-vs-quality', 'Confidence vs Speed')],
  },

  monitoring: {
    path: '/ai-sdlc/monitoring',
    title: 'AI in Monitoring',
    subtitle: 'Deterministic detection, AI-assisted diagnosis, and findings that flow back into the next change.',
    description: 'AI in monitoring and operations (AIOps): anomaly detection, control bands, AI diagnosis, incident summaries, closing the loop with new work, and keeping humans in charge.',
    parent,
    intro: [
      'Modern systems produce far more telemetry than people can read. AI helps operations teams make sense of it: noticing unusual patterns, correlating signals across services, and explaining what probably went wrong. Applied carefully, it shortens the time from "something is wrong" to "we know why".',
      'The pattern that works best keeps detection deterministic and uses AI for diagnosis and drafting. That keeps alerts predictable and auditable while still getting the benefit of AI\'s ability to reason over large amounts of data.',
    ],
    sections: [
      {
        heading: 'Detection: deterministic and tiered',
        body: [
          'Alert on SLO burn rates and statistical control bands rather than guessed thresholds. Bands based on a rolling baseline catch slow drift as well as sudden spikes. Define tiers in configuration: at the lowest level just log, at the next invoke AI read-only to diagnose, and at the highest allow pre-approved actions such as a rollback.',
        ],
      },
      {
        heading: 'Diagnosis with AI',
        body: [
          'When an alert fires, an AI assistant can gather the relevant logs, metrics, traces and recent changes, and propose the most likely cause and next step. It can also summarise long incident channels for people joining late, and draft the timeline for the post-incident review.',
        ],
      },
      {
        heading: 'Closing the loop',
        body: [
          'The most valuable step is turning findings into future work. A diagnosis can be written up as a short intent document for the fix, entering the normal planning and review process. Every incident that leads to a fix should also add a test or evaluation case, so the same failure can\'t recur silently.',
        ],
      },
      {
        heading: 'Anomaly detection and noise',
        body: [
          'Machine-learned anomaly detection can surface unusual behaviour that fixed rules miss, but it can also add noise. Start with it in a "suggest" mode, measure how many anomalies were useful, and promote only the reliable detectors to paging.',
        ],
      },
      {
        heading: 'Keeping humans in charge',
        body: [
          'On-call engineers triage findings: fix now, schedule, or dismiss. Dismissals tune the detectors. Runbooks the AI may trigger are approved in advance, and everything it does is logged. People decide; AI makes them faster and better informed.',
        ],
      },
      {
        heading: "AI on call in team channels",
        body: [
          "Incidents increasingly arrive through chat tools as well as alerts. An AI assistant that is a member of the incident channel can be the first responder: gathering evidence, proposing a cause and preparing a rollback for a person to approve. The channel becomes the audit trail, with the request, diagnosis, human authorisation and outcome all in one place.",
          "Write the post-incident lessons to a version-controlled file that future investigations can read, so the system gets better with every incident.",
        ],
      },
    ],
    practice: [
      'Define SLOs and burn-rate alerts for your critical services.',
      'Add control bands for one key metric, such as CI failure rate or post-deploy error rate.',
      'Let an AI assistant diagnose read-only when the band is breached.',
      'Have it write findings as short intent documents for triage.',
      'Allow only pre-approved, reversible actions such as rollback.',
      'Add every fixed incident to your tests or evaluation sets.',
    ],
    mistakes: [
      'Letting the model decide what counts as an incident.',
      'Paging people on every anomaly the model finds.',
      'Giving monitoring agents write access to production by default.',
      'Diagnosing incidents without feeding the lessons back into code.',
    ],
    measures: [
      'Time from alert to diagnosis.',
      'Share of AI diagnoses confirmed correct by responders.',
      'Pages per on-call shift and share that were actionable.',
      'Repeat incidents of the same class.',
    ],
    related: [guide, { label: 'Incident Review Toolkit', to: '/explore/toolkits/incident-review' }, { label: 'Site Reliability Engineering', to: '/devops/sre' }, mm('feedback-loops', 'Feedback Loops'), mm('ooda-loop', 'OODA Loop'), mm('false-positives-and-false-negatives', 'False Positives and Negatives')],
  },
};
