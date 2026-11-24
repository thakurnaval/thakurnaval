import type { TopicContent } from '../../components/TopicArticle';

const parent = { label: 'DevOps', to: '/devops' };
const mm = (anchor: string, label: string) => ({ label: `Mental model: ${label}`, to: `/explore/mental-models#${anchor}` });

export const DEVOPS_TOPICS: Record<string, TopicContent> = {
  sre: {
    path: '/devops/sre',
    title: 'Site Reliability Engineering (SRE)',
    subtitle: 'Applying software engineering to operations, so reliability is designed, measured and shared rather than heroic.',
    description: 'A practical guide to SRE: SLIs, SLOs and error budgets, toil reduction, incident response and how to introduce SRE practices in an enterprise.',
    parent,
    quote: { text: 'SRE is what happens when you ask a software engineer to design an operations team.', by: 'Ben Treynor Sloss, Google' },
    intro: [
      'Site Reliability Engineering treats reliability as an engineering problem with clear targets, rather than an aspiration that depends on a few people who know where the bodies are buried. It started at Google, but the ideas travel well: decide how reliable a service needs to be, measure it honestly, and use the gap between the two to decide what to work on next.',
      'For most enterprises, the value of SRE isn\'t a new team with a new title. It\'s a shared language between product and operations. When everyone agrees what "reliable enough" means, debates about whether to ship or stabilise become decisions based on data rather than on who argues loudest.',
    ],
    sections: [
      {
        heading: 'Reliability targets: SLIs, SLOs and SLAs',
        body: [
          'Start with what users experience. A Service Level Indicator is a measurement of that experience, such as the share of requests that succeed or the share served within 300 milliseconds. A Service Level Objective is the target for that indicator over a period, for example 99.9% of requests succeeding over 30 days.',
          'Service Level Agreements are contracts with consequences, usually set looser than the internal objective so you have room to react before a breach. Most teams need far fewer SLOs than they think: two or three per critical user journey is plenty.',
        ],
        terms: [
          ['SLI', 'A measured indicator of user experience: availability, latency, freshness or correctness.'],
          ['SLO', 'The target for an SLI over a time window. Internal, and owned jointly by product and engineering.'],
          ['SLA', 'An external commitment with penalties. Keep it looser than the SLO.'],
        ],
      },
      {
        heading: 'Error budgets: turning reliability into a decision',
        body: [
          'If the objective is 99.9%, the remaining 0.1% is the error budget: the amount of unreliability you can spend on change, experiments and the occasional incident. While budget remains, teams ship freely. When it is spent, reliability work comes first until the service recovers.',
          'Error budgets work because they replace opinion with an agreed rule. They also make the cost of risky releases visible. A team that burns its budget every month has a delivery or design problem worth fixing, not just a run of bad luck.',
        ],
      },
      {
        heading: 'Toil, on-call and incidents',
        body: [
          'Toil is manual, repetitive, automatable work that grows with the size of the service and adds no lasting value. SRE teams cap it, commonly at about half of their time, and spend the rest on engineering that removes it. Measuring toil is the first step; most teams underestimate it.',
          'On-call should be sustainable: a reasonable number of pages per shift, every page actionable, and a clear escalation path. Incidents end with a blameless review that asks what made the failure possible, and the lessons go back into code, alerts and runbooks.',
        ],
        terms: [
          ['Burn-rate alerting', 'Paging when the error budget is being consumed too fast, rather than on raw thresholds. Fewer, better pages.'],
          ['Toil budget', 'A cap on manual operational work, with the rest of the time reserved for automation and reliability engineering.'],
        ],
      },
      {
        heading: "SRE in the age of AI",
        body: [
          "AI is changing operations in two directions at once. It helps SRE teams: summarising alerts and logs, suggesting likely causes, drafting post-incident reviews and runbooks. It also creates new things to make reliable: model endpoints, retrieval pipelines and agents with their own failure modes and costs.",
          "The principles still hold. Define SLOs for AI features too, such as answer latency, groundedness or evaluation pass rate. Keep detection deterministic and let AI help with diagnosis, inside limits you control. And treat agents that act on production like any other change: scoped permissions, audit trails and a human approval for anything risky.",
        ],
      },
    ],
    practice: [
      'Pick one critical user journey, such as sign-in or checkout, and define two SLIs for it: success rate and latency.',
      'Set an SLO from current performance, not from ambition. You can tighten it later.',
      'Agree an error-budget policy with the product owner: what happens when the budget is spent, and who decides.',
      'Replace threshold alerts for that service with burn-rate alerts on the SLO, and delete alerts nobody acts on.',
      'Measure toil for a month, then automate the top three sources.',
      'Run a blameless review for every significant incident and track the actions to completion.',
    ],
    mistakes: [
      'Setting 99.99% targets because they sound good. Every extra nine costs far more than the last one.',
      'Renaming the operations team "SRE" without changing what they work on or how they are measured.',
      'Having dozens of SLOs that nobody reviews. A handful of meaningful ones is far more useful.',
      'Treating the error budget as a target to spend rather than a safety margin.',
    ],
    measures: [
      'SLO attainment per critical journey, reviewed monthly with product.',
      'Pages per on-call shift, and the share that needed action.',
      'Time spent on toil versus engineering work.',
      'Time to restore service, and repeat incidents of the same class.',
    ],
    related: [
      { label: 'DevOps Maturity Assessment', to: '/devops/assessment' },
      { label: 'Incident Review Toolkit', to: '/explore/toolkits/incident-review' },
      { label: 'Chaos Engineering', to: '/devops/chaos-engineering' },
      mm('ooda-loop', 'OODA Loop'),
      mm('margin-of-safety', 'Margin of Safety'),
      mm('blameless-post-mortem', 'Blameless Post-mortem'),
    ],
  },

  'chaos-engineering': {
    path: '/devops/chaos-engineering',
    title: 'Chaos Engineering',
    subtitle: 'Experimenting on a system to build confidence that it can withstand turbulent conditions in production.',
    description: 'How to start chaos engineering safely: steady state, hypotheses, blast radius, game days, tools, and how to measure whether resilience is improving.',
    parent,
    intro: [
      'Every distributed system fails in ways its designers didn\'t predict. Chaos engineering accepts that and goes looking for those failures deliberately, in controlled experiments, before customers find them at 3 a.m. It is less about breaking things and more about learning how the system really behaves.',
      'Done well, chaos engineering builds confidence: in failover, in autoscaling, in alerts and runbooks, and in the people who respond. Done badly, it is just an outage with extra steps. The difference is discipline: clear hypotheses, small blast radius, and the ability to stop immediately.',
    ],
    sections: [
      {
        heading: 'The scientific method, applied to resilience',
        body: [
          'Each experiment follows the same pattern. Define the steady state: the metrics that show the system is healthy, such as request success rate and latency. Form a hypothesis: "If one database replica fails, reads fail over within five seconds and the success rate stays above 99.9%." Then inject the failure and observe.',
          'If the hypothesis holds, confidence grows. If it doesn\'t, you have found a weakness on your own terms, with the right people watching, instead of during an incident.',
        ],
        terms: [
          ['Steady state', 'Measurable indicators of normal behaviour that the experiment must not degrade beyond agreed limits.'],
          ['Blast radius', 'How much of the system and how many users an experiment can affect. Start tiny.'],
          ['Abort condition', 'A pre-agreed signal that stops the experiment and rolls back automatically.'],
        ],
      },
      {
        heading: 'What to experiment with',
        body: [
          'Begin with failures you already expect: an instance or pod terminating, a dependency slowing down, a zone becoming unavailable, a certificate expiring, a disk filling up. These test the basics such as retries, timeouts, health checks, autoscaling and alerting.',
          'Later, test the human side. Game days simulate a realistic incident and let the team practise detection, communication and recovery. They often reveal stale runbooks, missing permissions and alerts that go to nobody.',
        ],
      },
      {
        heading: 'Tools and environments',
        body: [
          'Tooling ranges from Chaos Monkey and LitmusChaos for Kubernetes to managed services such as AWS Fault Injection Service and Azure Chaos Studio, and commercial platforms like Gremlin. The tool matters less than the practice: start with scripted experiments if that is what you have.',
          'Start in staging, but recognise that staging rarely behaves like production. Mature teams run carefully limited experiments in production, with strong observability, automatic abort conditions and the agreement of the service owner.',
        ],
      },
      {
        heading: "Building a chaos practice that lasts",
        body: [
          "Chaos engineering sticks when it becomes part of how teams work rather than an occasional event. Add one or two experiments to the definition of done for new critical services, keep a shared library of experiments, and review results in regular operations meetings.",
          "Leadership support matters, because the first experiments often find uncomfortable weaknesses. Celebrate those findings as wins: each one is an incident that will not happen to customers. Over time, track which failure modes have been tested and which remain untested, and use that list to plan the next quarter of experiments.",
        ],
      },
    ],
    practice: [
      'Make sure the basics are in place first: observability, alerting, and a tested rollback. Chaos without these is just risk.',
      'Pick one critical service and write down its steady state and its expected behaviour under one simple failure.',
      'Run the experiment in staging with the team watching, and record what happened.',
      'Fix what you find, then repeat the experiment to confirm the fix.',
      'Hold a quarterly game day on a realistic scenario, rotating who leads the response.',
      'Gradually move well-understood experiments into production with a small blast radius and automatic abort.',
    ],
    mistakes: [
      'Running experiments without a hypothesis, so nobody knows whether the result is good or bad.',
      'Starting in production with a large blast radius to prove a point.',
      'Finding weaknesses and not fixing them, which turns chaos engineering into theatre.',
      'Only testing technology and never the people, runbooks and communication.',
    ],
    measures: [
      'Number of hypotheses tested, and the share that held.',
      'Weaknesses found and fixed before they caused an incident.',
      'Time to detect and recover during game days, trending down.',
      'Incidents caused by failure modes that were already tested (should be near zero).',
    ],
    related: [
      { label: 'Site Reliability Engineering', to: '/devops/sre' },
      { label: 'Incident Review Toolkit', to: '/explore/toolkits/incident-review' },
      { label: 'DevOps Maturity Assessment', to: '/devops/assessment' },
      mm('antifragility', 'Antifragility'),
      mm('swiss-cheese-model', 'Swiss Cheese Model'),
      mm('scientific-method', 'Scientific Method'),
    ],
  },

  maturity: {
    path: '/devops/maturity',
    title: 'DevOps Maturity Model',
    subtitle: 'From manual, heroic delivery to measured, self-healing systems: five stages and how to move between them.',
    description: 'The five stages of DevOps maturity, what each looks like in practice, how to assess where you are, and how to move up without a big-bang transformation.',
    parent,
    intro: [
      'Most organisations are not at a single maturity level. A team might have excellent CI and terrible incident response, or great infrastructure as code and no measurement at all. A maturity model is useful because it makes those differences visible and helps you invest where the gap hurts most.',
      'The point is not to reach the top level everywhere. It is to understand where you are, decide where you need to be for your business, and close the most limiting gap first.',
    ],
    sections: [
      {
        heading: 'The five stages',
        body: [
          'Each stage builds on the one before. Skipping stages rarely works: self-healing systems on top of manual deployments just automate chaos.',
        ],
        terms: [
          ['1. Initial', 'Manual processes, siloed teams, hero culture and frequent firefighting. Releases are events.'],
          ['2. Managed', 'Project-based automation, some CI, the first metrics. Good practice depends on individual teams.'],
          ['3. Defined', 'Organisation-wide standards: CI/CD pipelines, infrastructure as code, proactive monitoring.'],
          ['4. Measured', 'Data-driven improvement with DORA metrics, automated security in pipelines, strong feedback loops.'],
          ['5. Optimised', 'Self-service platforms, self-healing systems, chaos engineering, and AI-assisted operations. Teams spend most of their time on value, not toil.'],
        ],
      },
      {
        heading: 'Assess by capability, not by team',
        body: [
          'Score each capability separately: delivery pipeline, infrastructure and platform, observability and reliability, security, and culture. The lowest-scoring capability is usually your constraint, and investment elsewhere will be wasted until it improves.',
          'Use evidence where you can. DORA metrics (deployment frequency, lead time for changes, change failure rate and time to restore) tell you more about delivery maturity than any questionnaire.',
        ],
      },
      {
        heading: 'Moving up a stage',
        body: [
          'Progress comes from small, visible improvements in the constraint area, proven with one team and then spread. Big-bang transformations with a tooling programme at the centre tend to stall, because they change tools faster than they change habits.',
          'Treat each step as an experiment: define what better looks like, try it, measure it, and share the result. The data from one successful team is the most persuasive argument for the next investment.',
        ],
      },
      {
        heading: "Maturity in the AI era",
        body: [
          "AI coding assistants and agents add a new dimension to maturity. A team can be highly mature in pipelines and still be at the beginning of using AI safely and effectively, or the other way round: fast AI-assisted coding on top of weak tests simply produces more broken code faster.",
          "The pattern that works is to strengthen the foundations first (fast tests, small changes, good observability, enforced guardrails) and then let AI raise throughput on top. The CognitiveOps Model extends this view across DevOps, SecOps, FinOps and GenAI, so you can see where AI can safely take on more of the work.",
        ],
      },
    ],
    practice: [
      'Take the DevOps Maturity Assessment with a few people from different roles and compare answers.',
      'Measure the four DORA metrics for the last 90 days to ground the discussion in data.',
      'Identify the lowest-scoring capability and agree what the next level would look like in your context.',
      'Pilot the improvement with one team for 30 days and measure the before and after.',
      'Roll out what worked, then repeat for the next constraint.',
      'Reassess every six months; maturity drifts back without attention.',
    ],
    mistakes: [
      'Treating maturity as a certificate to achieve rather than a tool for deciding what to improve.',
      'Averaging across capabilities, which hides the constraint.',
      'Buying tools to reach a level instead of changing practices.',
      'Aiming for the top level everywhere when the business only needs it in a few places.',
    ],
    measures: [
      'DORA metrics trend over time.',
      'Maturity score per capability, reassessed every six months.',
      'Share of teams using the standard pipeline and platform.',
      'Time spent on unplanned work versus planned work.',
    ],
    related: [{ label: 'Team Health Check Toolkit', to: '/explore/toolkits/team-health-check' }, 
      { label: 'DevOps Maturity Assessment', to: '/devops/assessment' },
      { label: 'DevOps Maturity Roadmap (free PDF)', to: '/devops/roadmap-guide' },
      { label: 'CognitiveOps Model', to: '/cognitiveops' },
      mm('theory-of-constraints', 'Theory of Constraints'),
      mm('kaizen', 'Kaizen'),
      mm('goodharts-law', "Goodhart's Law"),
    ],
  },

  tools: {
    path: '/devops/tools',
    title: 'DevOps Tool Stack',
    subtitle: 'Navigating the cloud-native landscape and choosing tools that fit your teams, not the other way round.',
    description: 'How to choose a DevOps tool stack: the main categories, enterprise-grade options, selection criteria, and how to avoid tool sprawl.',
    parent,
    intro: [
      'Tools don\'t solve problems; people do. But the right tools let people solve problems faster and more safely, and the wrong ones quietly add toil for years. The cloud-native landscape now lists well over a thousand projects and products, so the hardest part of tooling is usually choosing less.',
      'A good stack is boring in the best sense: well-supported, integrated, understood by the team, and easy to replace in the places where things change fastest.',
    ],
    sections: [
      {
        heading: 'The core categories',
        body: ['Most enterprise stacks cover the same categories. The specific products matter less than how well they integrate and how well your teams know them.'],
        terms: [
          ['Version control', 'Git with GitHub, GitLab, Bitbucket or Azure Repos. Everything, including infrastructure and policies, lives here.'],
          ['CI/CD', 'GitHub Actions, GitLab CI, Azure DevOps, Jenkins, CircleCI; Argo CD or Flux for GitOps deployments.'],
          ['Infrastructure as code', 'Terraform or OpenTofu, Pulumi, Bicep, CloudFormation; Ansible for configuration.'],
          ['Containers and orchestration', 'Docker, Kubernetes, Helm; managed services such as EKS, AKS, GKE or Cloud Run.'],
          ['Observability', 'OpenTelemetry for instrumentation; Prometheus and Grafana, Elastic, Datadog or Dynatrace for analysis.'],
          ['Security', 'Secret management (Vault, cloud key vaults), code and dependency scanning (SonarQube, Snyk, CodeQL), policy as code (OPA).'],
        ],
      },
      {
        heading: 'How to choose',
        body: [
          'Start from the problem and the job the tool must do, not from the feature list. Then weigh fit with your cloud and existing tools, the skills your teams already have, the cost of running it (not just licences), security and compliance needs, and how hard it would be to leave.',
          'Prefer managed services for commodity capabilities such as CI runners, container registries and secret stores. Invest your own engineering time in the parts that make your delivery different.',
        ],
      },
      {
        heading: 'Avoiding tool sprawl',
        body: [
          'Sprawl creeps in when every team picks its own tools. A small catalogue of supported choices, a golden path that uses them by default, and a clear process for exceptions keep variety where it adds value and remove it where it only adds cost.',
          'Review the catalogue every year. Retire tools nobody uses, and check whether newer managed services or AI-assisted tools have made something cheaper to buy than to run.',
        ],
      },
      {
        heading: "Where AI fits in the toolchain",
        body: [
          "AI is now part of most categories: coding assistants in the editor, first-pass review in pull requests, failure triage in pipelines, and anomaly detection in observability. Treat these like any other tool choice: start with a clear job to be done, run a time-boxed trial with real work, and measure the effect on lead time, quality and developer experience.",
          "Pay attention to data handling and access. Check what code and logs are sent to the AI service, where they are processed, and what permissions an agent has. Prefer enterprise plans with data-protection terms, and keep AI tools inside the same guardrails as the rest of the pipeline.",
        ],
      },
    ],
    practice: [
      'List the tools in use today by category and who owns each one.',
      'Identify duplicates and orphaned tools with no clear owner.',
      'Agree one default per category, with criteria for exceptions.',
      'Build the defaults into a golden-path template so teams get them without extra effort.',
      'Plan migrations off duplicate tools over a few quarters, starting with the most expensive or riskiest.',
      'Review the catalogue annually against cost, usage and team feedback.',
    ],
    mistakes: [
      'Choosing tools because a famous company uses them, without checking your context.',
      'Comparing licence prices but ignoring the people needed to run the tool.',
      'Mandating tools without a golden path, so teams work around them.',
      'Running several tools for the same job indefinitely after a merger or re-organisation.',
    ],
    measures: [
      'Number of tools per category, trending down to the agreed defaults.',
      'Share of services built on the golden path.',
      'Total cost of tooling, including support time.',
      'Developer satisfaction with the toolchain in regular surveys.',
    ],
    related: [
      { label: 'Platform Engineering', to: '/devops/platform-engineering' },
      { label: 'Terraform & Bicep templates', to: '/architecture/iac-templates' },
      { label: 'Architecture Decisions Toolkit', to: '/explore/toolkits/architecture-decisions' },
      mm('weighted-decision-matrix', 'Weighted Decision Matrix'),
      mm('switching-costs', 'Switching Costs'),
      mm('paradox-of-choice', 'Paradox of Choice'),
    ],
  },

  practices: {
    path: '/devops/practices',
    title: 'Key DevOps Practices',
    subtitle: 'The technical and cultural habits that high-performing teams share, and how to build them.',
    description: 'The technical and cultural DevOps practices behind high performance: CI, CD, infrastructure as code, observability, blameless reviews, shift-left and ownership.',
    parent,
    intro: [
      'Research from the DORA programme has shown for years that delivery performance comes from a set of practices, not from any single tool. Teams that deploy often, recover quickly and rarely break things share technical habits that make change safe, and cultural habits that make learning normal.',
      'Neither half works without the other. Pipelines without psychological safety produce fast, fragile delivery; a great culture without automation produces well-intentioned firefighting.',
    ],
    sections: [
      {
        heading: 'Technical practices',
        body: ['These make change cheap and safe. Each one shortens a feedback loop.'],
        terms: [
          ['Continuous integration', 'Merging small changes to the main branch at least daily, with fast automated tests on every change.'],
          ['Continuous delivery', 'Every change that passes the pipeline can be released at any time, using the same automated process.'],
          ['Infrastructure as code', 'Environments defined in version control and created by automation, so they are reproducible and reviewable.'],
          ['Loosely coupled architecture', 'Services that teams can change, test and deploy independently.'],
          ['Observability', 'Metrics, logs and traces that let teams understand behaviour in production and find problems quickly.'],
        ],
      },
      {
        heading: 'Cultural practices',
        body: ['These make it safe to learn and improve.'],
        terms: [
          ['Blameless reviews', 'Incidents are examined for how the system allowed them, not who to blame.'],
          ['Shift left', 'Testing, security and operability considered early, when change is cheap.'],
          ['You build it, you run it', 'Teams own their services in production, which brings operational feedback straight into design.'],
          ['Psychological safety', 'People can raise problems, admit mistakes and challenge ideas without fear.'],
        ],
      },
      {
        heading: 'Practices for the AI era',
        body: [
          'AI coding assistants and agents make writing code faster, which raises the value of every practice above. Fast tests, small changes and strong review are what keep higher output safe. Teams are adding a few new habits too: written plans before agents change code, repository context files that agents read, and guardrails that block unsafe actions automatically.',
        ],
      },
      {
        heading: "Making practices stick",
        body: [
          "Practices spread through example, not mandate. A single team that cuts its lead time from weeks to days, and can explain how, is more persuasive than any policy. Give that team a platform to share what they did, and give other teams time and support to try it.",
          "Leaders make or break the cultural practices. Run blameless reviews yourself, ask \"what made this easy to get wrong?\" rather than \"who did this?\", and protect time for improvement in every planning cycle. People watch what leaders do in the first incident after a policy changes, not what the policy says.",
        ],
      },
    ],
    practice: [
      'Measure your four DORA metrics to see where you stand.',
      'Pick the practice that addresses your weakest metric: CI for lead time, test automation for change failure rate, observability for recovery time.',
      'Introduce it with one team and make the result visible.',
      'Pair every technical practice with a cultural one, for example CI with shared ownership of a green build.',
      'Hold blameless reviews for every significant incident and share them openly.',
      'Revisit practices as AI tools change how code is written and reviewed.',
    ],
    mistakes: [
      'Adopting practices as rituals, such as daily merges with no automated tests behind them.',
      'Shifting security left by adding gates that slow everything down without helping developers.',
      'Saying "you build it, you run it" without giving teams the tools and time to run things well.',
      'Expecting culture to change from a memo rather than from leaders\' behaviour.',
    ],
    measures: [
      'Deployment frequency and lead time for changes.',
      'Change failure rate and time to restore service.',
      'Share of services with automated tests and pipelines.',
      'Team survey scores for psychological safety and ownership.',
    ],
    related: [{ label: 'Team Health Check Toolkit', to: '/explore/toolkits/team-health-check' }, 
      { label: 'The 7 Cs of DevOps (free guide)', to: '/devops/7cs' },
      { label: 'AI-Native SDLC Field Guide', to: '/ai-sdlc/field-guide' },
      { label: 'DevOps Frameworks', to: '/devops/frameworks' },
      mm('feedback-loops', 'Feedback Loops'),
      mm('extreme-programming', 'Extreme Programming'),
      mm('blameless-post-mortem', 'Blameless Post-mortem'),
    ],
  },

  'platform-engineering': {
    path: '/devops/platform-engineering',
    title: 'Platform Engineering',
    subtitle: 'Building internal developer platforms that reduce cognitive load and make the right way the easy way.',
    description: 'What platform engineering is, why it matters, golden paths, internal developer portals, treating the platform as a product, and how to measure success.',
    parent,
    intro: [
      'DevOps asked developers to own more of the lifecycle: infrastructure, pipelines, security, observability. In many organisations that turned into overload. Every team reinvented the same plumbing, and developers spent their time on YAML instead of features.',
      'Platform engineering answers that by building an internal platform that provides these capabilities as self-service products. Developers keep ownership and autonomy, but they no longer need to be experts in everything underneath.',
    ],
    sections: [
      {
        heading: 'Golden paths',
        body: [
          'A golden path is a supported, opinionated way to do something common, such as creating a new service, with security, observability and deployment built in. It should be the fastest way to get started, so teams choose it because it helps, not because they are told to.',
          'Golden paths are not cages. Teams can step off them when they have a good reason, but then they own the extra work. Most will stay on the path if it is genuinely good.',
        ],
      },
      {
        heading: 'Internal developer platforms and portals',
        body: [
          'The platform is the set of capabilities: infrastructure templates, pipelines, environments, secrets, observability, policy. A portal such as Backstage is the front door that makes them discoverable: a service catalogue, templates, documentation and ownership information in one place.',
          'Start with the platform, not the portal. A portal in front of weak capabilities is just a nicer way to find out that things are hard.',
        ],
      },
      {
        heading: 'Treating the platform as a product',
        body: [
          'The most successful platform teams behave like product teams. They know their users, interview them, publish a roadmap, measure adoption and satisfaction, and say no to features that don\'t serve the main jobs developers need done.',
          'Adoption should be earned. A platform that teams are forced to use tells you nothing about whether it is any good.',
        ],
        terms: [
          ['Platform as a product', 'A dedicated team with users, a roadmap and success measures, not a ticket queue.'],
          ['Thinnest viable platform', 'The smallest set of capabilities that removes the most friction. Grow from there.'],
        ],
      },
      {
        heading: "Organising the platform team",
        body: [
          "A platform team works best when its boundaries match the capabilities it owns: for example, a compute and runtime team, a delivery pipelines team and an observability team in a large organisation, or a single small team in a smaller one. Team Topologies calls this a platform team that serves stream-aligned teams, with enabling teams helping others adopt new capabilities.",
          "Keep the interaction mode explicit. Some capabilities are pure self-service; others start as collaboration with a few teams before they are ready to be self-service. Being clear about which is which avoids the platform team becoming an endless help desk.",
        ],
      },
    ],
    practice: [
      'Interview developers about where they lose time: onboarding, environments, pipelines, access, debugging.',
      'Choose the most painful journey and design a golden path for it.',
      'Build the thinnest version that works end to end, and launch it with one or two friendly teams.',
      'Measure time to first deploy and developer satisfaction before and after.',
      'Add capabilities based on demand, and publish the roadmap openly.',
      'Add a portal once there are enough capabilities worth discovering.',
    ],
    mistakes: [
      'Building a platform based on what the platform team finds interesting rather than what developers need.',
      'Rebuilding commodity capabilities that could be bought or used as managed services.',
      'Mandating the platform before it is good enough to choose.',
      'Treating the platform team as a ticket queue rather than a product team.',
    ],
    measures: [
      'Time for a new service to reach production.',
      'Share of services on the golden path, and voluntary adoption.',
      'Developer satisfaction and perceived cognitive load.',
      'Lead time and change failure rate for platform users versus others.',
    ],
    related: [
      { label: 'Platform Strategy Toolkit', to: '/explore/toolkits/platform-strategy' },
      { label: 'DevOps Tool Stack', to: '/devops/tools' },
      { label: 'Terraform & Bicep templates', to: '/architecture/iac-templates' },
      mm('jobs-to-be-done', 'Jobs To Be Done'),
      mm('wardley-mapping', 'Wardley Mapping'),
      mm('conways-law', "Conway's Law"),
    ],
  },

  frameworks: {
    path: '/devops/frameworks',
    title: 'DevOps Frameworks',
    subtitle: 'The guiding principles that give a DevOps transformation its shape: The Three Ways, CALMS and DORA.',
    description: 'The main DevOps frameworks explained: The Three Ways, CALMS and the DORA metrics, how they fit together, and how to use them to guide a transformation.',
    parent,
    intro: [
      'DevOps is not a single method with a rulebook. It is a set of principles, and a few frameworks have become the common way of describing them. They are most useful as lenses: ways of checking whether a transformation is addressing culture, flow and learning, or just buying tools.',
      'Used together, The Three Ways explain why DevOps works, CALMS gives you a checklist of what to change, and DORA tells you whether it is working.',
    ],
    sections: [
      {
        heading: 'The Three Ways',
        body: ['Popularised by The Phoenix Project and The DevOps Handbook, The Three Ways are the underlying principles behind most DevOps practices.'],
        terms: [
          ['First Way: Flow', 'Optimise the flow of work from development to operations to the customer. Small batches, limited work in progress, and systems thinking over local optimisation.'],
          ['Second Way: Feedback', 'Create fast feedback from right to left: from production and customers back to developers, so problems are found and fixed early.'],
          ['Third Way: Continual learning', 'Build a culture of experimentation and learning from failure, with time set aside for improvement.'],
        ],
      },
      {
        heading: 'CALMS',
        body: ['CALMS is a simple checklist for a transformation. If any letter is missing, the transformation is likely to stall.'],
        terms: [
          ['Culture', 'People and collaboration first; tools second.'],
          ['Automation', 'Remove manual toil to increase speed and consistency.'],
          ['Lean', 'Small batches, limited work in progress, and continuous removal of waste.'],
          ['Measurement', 'Decisions based on data, especially flow and reliability metrics.'],
          ['Sharing', 'Open knowledge, shared ownership and learning across teams.'],
        ],
      },
      {
        heading: 'DORA metrics',
        body: [
          'The DORA research programme identified four metrics that predict software delivery performance: deployment frequency, lead time for changes, change failure rate and time to restore service. More recent reports add reliability as a fifth dimension.',
          'The power of DORA is that speed and stability improve together in high performers. If a change improves one and harms the other, it isn\'t working.',
        ],
      },
      {
        heading: "Choosing a framework for your organisation",
        body: [
          "You don't need to pick one framework and reject the others. Use The Three Ways to explain the why to leadership, CALMS to check a transformation plan for gaps, and DORA to measure progress. If you run agile at scale, map these onto SAFe, LeSS or your own operating model rather than running them as a separate programme.",
          "Whatever you choose, keep it light. A framework earns its place by helping teams make better decisions. If it mostly produces reports and ceremonies, simplify it.",
          "A useful test is to ask a team what changed in their work because of the framework. If the honest answer is \"we now fill in a template\", it is not working. If the answer is \"we release smaller changes, see problems sooner and fix them together\", it is.",
        ],
      },
    ],
    practice: [
      'Use CALMS to run a quick self-assessment with a cross-functional group.',
      'Measure the four DORA metrics as your baseline.',
      'Map your delivery flow end to end to apply the First Way.',
      'Shorten one feedback loop at a time, for example faster tests or earlier security scans, to apply the Second Way.',
      'Protect time for improvement and celebrate learning from failure, to apply the Third Way.',
      'Review DORA metrics quarterly and adjust priorities based on the weakest one.',
    ],
    mistakes: [
      'Treating frameworks as compliance checklists rather than lenses for thinking.',
      'Focusing on Automation and ignoring Culture and Sharing.',
      'Using DORA metrics to compare or rank teams, which invites gaming.',
      'Measuring speed without stability, or the other way round.',
    ],
    measures: [
      'The four DORA metrics, tracked as trends.',
      'A CALMS self-assessment repeated every six months.',
      'Time spent on improvement work versus feature and unplanned work.',
      'Share of incidents with completed review actions.',
    ],
    related: [
      { label: 'DevOps Maturity Model', to: '/devops/maturity' },
      { label: 'The 7 Cs of DevOps (free guide)', to: '/devops/7cs' },
      { label: 'DevOps Maturity Assessment', to: '/devops/assessment' },
      mm('systems-thinking', 'Systems Thinking'),
      mm('lean-software-development', 'Lean Software Development'),
      mm('goodharts-law', "Goodhart's Law"),
    ],
  },

  roadmap: {
    path: '/devops/roadmap',
    title: 'DevOps Engineer Roadmap',
    subtitle: 'A step-by-step learning path for engineers moving into DevOps, platform and SRE roles.',
    description: 'A practical DevOps learning roadmap: programming, Linux, networking, infrastructure as code, CI/CD, containers, cloud and observability, plus how to build real experience.',
    parent,
    intro: [
      'DevOps is a broad field, and the list of things to learn can feel endless. The good news is that the foundations change slowly, and they matter far more than any particular tool. Learn them in a sensible order, build small real projects at each step, and the tools become much easier to pick up.',
      'This roadmap is the order I suggest to engineers I mentor. It is deliberately practical: each step should end with something you have built and can explain.',
    ],
    sections: [
      {
        heading: 'Foundations (months 1–3)',
        body: ['These skills underpin everything else. Rushing past them shows up later as confusion with every new tool.'],
        terms: [
          ['1. A programming language', 'Python or Go for automation and tooling; enough to write scripts, call APIs and read other people\'s code.'],
          ['2. Linux and the shell', 'Processes, files and permissions, package management, systemd, and Bash scripting.'],
          ['3. Networking and security basics', 'DNS, HTTP and TLS, load balancing, firewalls, and how requests actually travel.'],
        ],
      },
      {
        heading: 'Core DevOps skills (months 3–9)',
        body: ['This is where you learn to automate the path from code to production.'],
        terms: [
          ['4. Git and infrastructure as code', 'Git workflows, then Terraform or Bicep for infrastructure and Ansible for configuration.'],
          ['5. CI/CD', 'GitHub Actions, GitLab CI or Azure DevOps: build, test, scan and deploy automatically.'],
          ['6. Containers and orchestration', 'Docker first, then Kubernetes fundamentals, or a managed service such as Cloud Run.'],
          ['7. A cloud provider', 'AWS, Azure or Google Cloud in depth: identity, networking, compute, storage and cost.'],
          ['8. Observability', 'Metrics, logs and traces with Prometheus, Grafana and OpenTelemetry; alerting on what users feel.'],
        ],
      },
      {
        heading: 'Growing beyond the tools',
        body: [
          'Once the basics are in place, the most valuable skills are about systems and people: reliability engineering, security, cloud cost (FinOps), and working with AI coding assistants and agents safely. Communication, incident leadership and writing clear documentation matter as much as any technical skill.',
          'Certifications can help structure learning and open doors, but projects and real incidents teach more. Aim for both.',
        ],
      },
      {
        heading: "Learning with AI tools",
        body: [
          "AI assistants can speed up learning a great deal: explaining unfamiliar code, suggesting commands, drafting Terraform or pipeline files, and answering \"why\" questions at any hour. Use them as a tutor, not a substitute for understanding. Ask them to explain each line, then change something and predict what will happen before you run it.",
          "Be careful with generated infrastructure and security settings: always review them, run them in a sandbox account first, and check costs. The engineers who thrive are those who understand the fundamentals well enough to tell when the AI is wrong.",
        ],
      },
    ],
    practice: [
      'Build a small web app and deploy it to a cloud provider by hand, so you understand every step.',
      'Automate the same deployment with infrastructure as code and a CI/CD pipeline.',
      'Containerise it and run it on Kubernetes or a managed container service.',
      'Add metrics, logs, dashboards and an alert, then break something and practise recovering.',
      'Write up what you built and what you learned, publicly if you can.',
      'Contribute to an open-source project or an internal platform to learn from others\' code and reviews.',
    ],
    mistakes: [
      'Collecting tools and certificates without building anything end to end.',
      'Skipping Linux and networking fundamentals, then struggling to debug.',
      'Learning Kubernetes before understanding containers and the problems Kubernetes solves.',
      'Ignoring security and cost until they become a problem.',
    ],
    measures: [
      'Projects completed end to end, with infrastructure as code and a pipeline.',
      'Ability to explain and debug each part of your own stack.',
      'Incidents and on-call shifts handled with confidence.',
      'Feedback from code reviews and mentors over time.',
    ],
    related: [
      { label: 'DevOps Maturity Roadmap (free PDF)', to: '/devops/roadmap-guide' },
      { label: 'Community and mentoring', to: '/community' },
      { label: 'Certifications', to: '/explore/certifications' },
      mm('deliberate-practice', 'Deliberate Practice'),
      mm('growth-mindset', 'Growth Mindset'),
      mm('half-life', 'Half-life'),
    ],
  },
};
