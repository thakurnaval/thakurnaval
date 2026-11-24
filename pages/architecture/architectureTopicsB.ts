import type { TopicContent } from '../../components/TopicArticle';
import { parent, mm, assess, adr } from './architectureTopicsA';

export const ARCHITECTURE_TOPICS_B: Record<string, TopicContent> = {
  'solid-principles': {
    path: '/architecture/solid-principles',
    title: 'SOLID Design Principles',
    subtitle: 'Five principles for code that stays easy to change as it grows.',
    description: 'The SOLID principles explained with practical examples: single responsibility, open/closed, Liskov substitution, interface segregation and dependency inversion.',
    parent,
    intro: [
      'SOLID is a set of five object-oriented design principles described by Robert C. Martin. Their shared goal is code that can change without breaking: small, focused pieces with clear boundaries and few surprising dependencies.',
      'The principles apply well beyond classes. The same ideas shape good modules, services and APIs, and they make code easier for both people and AI assistants to understand and modify safely.',
    ],
    sections: [
      {
        heading: 'The five principles',
        body: [],
        terms: [
          ['S: Single responsibility', 'A module should have one reason to change. Separate, for example, billing calculations from invoice formatting.'],
          ['O: Open/closed', 'Open for extension, closed for modification: add new behaviour by adding code, such as a new payment provider class, rather than editing existing logic.'],
          ['L: Liskov substitution', 'Subtypes must be usable wherever their parent type is expected, without surprises.'],
          ['I: Interface segregation', 'Prefer small, specific interfaces over large ones, so clients depend only on what they use.'],
          ['D: Dependency inversion', 'Depend on abstractions rather than concrete implementations, so details such as databases can change without rewriting business logic.'],
        ],
      },
      {
        heading: 'Why they matter',
        body: [
          'Code that follows SOLID tends to have smaller, more focused changes, fewer unexpected side effects, and tests that are easier to write because dependencies can be replaced with test doubles. That lowers the cost of change, which is the real goal of good design.',
        ],
      },
      {
        heading: 'Beyond object orientation',
        body: [
          'Single responsibility applies to services and teams: a service owned by one team, for one business capability. Interface segregation applies to APIs: smaller, purpose-built endpoints instead of one endpoint that does everything. Dependency inversion underpins hexagonal and clean architectures, which keep business logic independent of frameworks and infrastructure.',
        ],
      },
      {
        heading: 'Applying them pragmatically',
        body: [
          'Principles are guides, not laws. Applied dogmatically, they produce layers of interfaces and abstractions that make simple code hard to follow. Introduce abstractions when a second real use case appears or when testing needs them, not in anticipation of every possible future change.',
        ],
      },
      {
        heading: 'SOLID and AI-generated code',
        body: [
          'AI assistants generate code faster than people can review it, so structure matters more. Well-separated modules with clear interfaces let an assistant change one part without touching others, and make reviews easier. Including your design conventions in the repository\'s context file helps assistants follow them.',
        ],
      },
      {
        heading: "A quick example",
        body: [
          "Imagine an order service that calculates totals, applies discounts, charges a card and sends an email, all in one class. Every change to pricing, payment or notifications touches the same file, and testing any part means setting up all of them.",
          "Applying SOLID splits it into a pricing component, a payment port with provider adapters, and a notification component, connected through small interfaces. Adding a new payment provider now means adding one adapter, and each part can be tested on its own.",
        ],
      },
    ],
    practice: [
      'Use code reviews to ask "what is this module\'s one reason to change?"',
      'Extract interfaces at boundaries with external systems such as databases and APIs.',
      'Add new behaviour through extension points rather than growing conditional logic.',
      'Keep interfaces small and named after what clients need.',
      'Refactor towards SOLID when touching code, rather than in big rewrites.',
      'Document design conventions in the repository context file.',
    ],
    mistakes: [
      'Creating an interface for every class whether or not it is needed.',
      'Huge "manager" or "utility" classes that do everything.',
      'Subclasses that break the expectations of their parent type.',
      'Treating the principles as rules to win arguments rather than tools for clarity.',
    ],
    measures: [
      'Average size and change frequency of modules (hotspots).',
      'Changes that touch many unrelated files.',
      'Ease of writing unit tests for new code.',
      'Defects introduced by changes in unrelated areas.',
    ],
    related: [{ label: 'Design Patterns', to: '/architecture/design-patterns' }, { label: 'Coding Standards', to: '/architecture/coding-standards' }, adr, mm('abstraction', 'Abstraction'), mm('kiss-principle', 'KISS Principle'), mm('technical-debt', 'Technical Debt')],
  },

  'design-patterns': {
    path: '/architecture/design-patterns',
    title: 'Design Patterns',
    subtitle: 'Proven solutions to recurring design problems, and a shared language for discussing them.',
    description: 'Software design patterns explained: creational, structural and behavioural patterns, plus architectural and cloud patterns such as circuit breaker, saga and CQRS.',
    parent,
    intro: [
      'Design patterns are named, reusable solutions to problems that come up again and again. Their biggest value is often the shared vocabulary: saying "use a strategy here" or "add a circuit breaker" communicates a whole design in a few words.',
      'Patterns are tools, not goals. The best code uses them where they fit and avoids forcing them where a simpler solution works.',
    ],
    sections: [
      {
        heading: 'Creational patterns',
        body: ['These deal with how objects are created, adding flexibility and reuse.'],
        terms: [
          ['Factory', 'Create objects without specifying their exact class, for example choosing a payment provider at runtime.'],
          ['Builder', 'Construct complex objects step by step, keeping construction readable.'],
          ['Singleton', 'Ensure a single instance. Use sparingly: it often hides dependencies and complicates testing.'],
        ],
      },
      {
        heading: 'Structural patterns',
        body: ['These describe how pieces fit together.'],
        terms: [
          ['Adapter', 'Make an incompatible interface work with yours, such as wrapping a legacy API.'],
          ['Facade', 'Offer a simple interface over a complex subsystem.'],
          ['Decorator', 'Add behaviour, such as caching or logging, without changing the original code.'],
        ],
      },
      {
        heading: 'Behavioural patterns',
        body: ['These describe how objects interact and share responsibility.'],
        terms: [
          ['Strategy', 'Swap algorithms at runtime, such as different pricing rules.'],
          ['Observer', 'Notify subscribers when something changes; the basis of event-driven designs.'],
          ['Command', 'Represent actions as objects, enabling queues, undo and audit.'],
        ],
      },
      {
        heading: 'Architectural and cloud patterns',
        body: ['Larger-scale patterns shape how distributed systems behave.'],
        terms: [
          ['Circuit breaker', 'Stop calling a failing dependency for a while, so failures don\'t cascade.'],
          ['Retry with backoff', 'Retry transient failures with increasing delays and limits.'],
          ['Saga', 'Coordinate a business transaction across services with compensating actions.'],
          ['CQRS', 'Separate models for writing and reading data, each optimised for its job.'],
          ['Strangler fig', 'Replace a legacy system gradually by routing features to new components.'],
        ],
      },
      {
        heading: 'Using patterns well',
        body: [
          'Start from the problem, not the pattern. If a simple function solves it, use the simple function. Introduce a pattern when it removes duplication, makes change easier, or communicates intent clearly to the team. Name patterns in code and design documents so others recognise them.',
        ],
      },
      {
        heading: "Patterns and AI assistants",
        body: [
          "AI coding assistants know common patterns well and will often suggest them, sometimes where they aren't needed. Ask the assistant to explain why a pattern fits before accepting it, and include your team's preferred patterns and anti-patterns in the repository context file.",
          "Patterns also help when prompting: \"add a circuit breaker around the payment client\" is a precise instruction that an assistant can follow reliably.",
        ],
      },
      {
        heading: "Anti-patterns to watch for",
        body: [
          "Some recurring designs cause more harm than good: the god object that knows everything, the distributed monolith where services must be deployed together, and chatty interfaces that need many calls to do one thing. Naming these in reviews helps teams spot and fix them early.",
        ],
      },
    ],
    practice: [
      'Learn the most common patterns and their trade-offs as a team.',
      'Name patterns explicitly in code and ADRs where they are used.',
      'Apply resilience patterns such as timeouts, retries and circuit breakers to every remote call.',
      'Use the strangler fig pattern for legacy modernisation.',
      'Review pattern use in design reviews: does it simplify or complicate?',
      'Remove patterns that no longer earn their complexity.',
    ],
    mistakes: [
      'Applying patterns to show sophistication rather than to solve a problem.',
      'Overusing singletons, which hide dependencies.',
      'Retries without backoff or limits, which turn small failures into outages.',
      'Distributed transactions where a saga or a simpler design would do.',
    ],
    measures: [
      'Incidents caused by cascading failures between services.',
      'Time to add new variants of behaviour (for example a new provider).',
      'Code review comments about unnecessary complexity.',
      'Progress of legacy replacement using the strangler fig pattern.',
    ],
    related: [{ label: 'SOLID Principles', to: '/architecture/solid-principles' }, { label: 'Microservices', to: '/architecture/microservices' }, adr, mm('kiss-principle', 'KISS Principle'), mm('abstraction', 'Abstraction'), mm('redundancy', 'Redundancy')],
  },

  'coding-standards': {
    path: '/architecture/coding-standards',
    title: 'Coding Standards',
    subtitle: 'Writing code that is readable, consistent, testable and safe, by people and AI alike.',
    description: 'Coding standards that work: readability, DRY and KISS, naming, error handling, testing, automated linting and formatting, and standards for AI-assisted development.',
    parent,
    intro: [
      'Code is read far more often than it is written. Coding standards reduce the effort of reading it: consistent naming, structure and conventions mean anyone on the team, or an AI assistant, can find their way around and change things safely.',
      'The best standards are short, automated wherever possible, and agreed by the people who follow them.',
    ],
    sections: [
      {
        heading: 'Core practices',
        body: [],
        terms: [
          ['Clear naming', 'Names that say what something is or does, in the language of the business domain.'],
          ['DRY', 'Don\'t repeat yourself: share logic that represents the same knowledge, but don\'t merge code that only looks similar.'],
          ['KISS', 'Keep it simple: the simplest design that meets the need.'],
          ['YAGNI', 'You aren\'t gonna need it: don\'t build for imagined future requirements.'],
          ['Small functions', 'Functions that do one thing and fit on a screen are easier to test and review.'],
        ],
      },
      {
        heading: 'Error handling and logging',
        body: [
          'Handle errors explicitly, close to where they can be dealt with, and never swallow them silently. Log with structure and context, such as request IDs, but never log secrets or sensitive personal data. Consistent error formats in APIs make life easier for every consumer.',
        ],
      },
      {
        heading: 'Testing as a standard',
        body: [
          'Make tests part of the definition of done: new behaviour comes with tests, and bug fixes come with a test that reproduces the bug. Fast, reliable tests are what make refactoring and AI-assisted changes safe.',
        ],
      },
      {
        heading: 'Automate the standards',
        body: [
          'Formatters, linters and static analysis enforce most style rules automatically and end debates in code review. Run them in the editor, in pre-commit hooks and in CI. Reserve human review for design, logic and clarity, which tools can\'t judge.',
        ],
      },
      {
        heading: 'Standards for AI-assisted development',
        body: [
          'Write your key conventions into a repository context file so AI assistants follow them: commands, structure, naming, error handling, and things to avoid. Back them with the same automated checks, so AI-generated code meets the same bar as human code. When the assistant repeats a mistake, add the correction to the file.',
        ],
      },
      {
        heading: "Getting agreement",
        body: [
          "Standards work when the team owns them. Start from an established style guide for your language, discuss only the points that matter to the team, and record decisions briefly with the reason. Revisit them when new tools, such as AI assistants, change how code is written.",
          "Make the standards easy to follow: templates, editor settings and automated fixes do more than any document.",
        ],
      },
      {
        heading: "Readability as a team habit",
        body: [
          "A useful test is whether a new team member could understand a change without asking the author. Code reviews that ask \"is this clear?\" as well as \"is this correct?\" build readability into the team's habits over time.",
        ],
      },
    ],
    practice: [
      'Agree a short coding standard per language, written by the team.',
      'Adopt a formatter and linter, and run them automatically.',
      'Add static analysis and security scanning to CI.',
      'Make tests part of the definition of done.',
      'Write key conventions into the repository context file for AI assistants.',
      'Review and update the standard every six months.',
    ],
    mistakes: [
      'Long standards documents nobody reads.',
      'Arguing about formatting in code review instead of automating it.',
      'Applying DRY so aggressively that unrelated code becomes coupled.',
      'Letting AI-generated code bypass the usual checks.',
    ],
    measures: [
      'Share of repositories with automated formatting and linting.',
      'Review comments about style (should fall to near zero).',
      'Test coverage of critical code and time to onboard new engineers.',
      'Repeat review findings, which signal gaps in the standard.',
    ],
    related: [{ label: 'SOLID Principles', to: '/architecture/solid-principles' }, { label: 'AI-Powered Coding', to: '/ai-sdlc/coding' }, { label: 'AI in Code Review', to: '/ai-sdlc/code-review' }, mm('kiss-principle', 'KISS Principle'), mm('use-checklists', 'Use Checklists'), mm('forcing-function', 'Forcing Function')],
  },

  'twelve-factor': {
    path: '/architecture/twelve-factor',
    title: 'The Twelve-Factor App',
    subtitle: 'Twelve practices for building services that deploy, scale and run cleanly in the cloud.',
    description: 'The Twelve-Factor App methodology explained, factor by factor, with what each means for containers, Kubernetes, serverless and modern CI/CD.',
    parent,
    intro: [
      'The Twelve-Factor App methodology, published by engineers at Heroku, describes how to build software-as-a-service applications that are portable, scalable and easy to deploy continuously. More than a decade later, it still describes what makes a service a good citizen on containers, Kubernetes and serverless platforms.',
      'Most of the factors are now built into modern platforms, which makes them easy to follow, and easy to break if you are not aware of them.',
    ],
    sections: [
      {
        heading: 'Factors 1–4: code and configuration',
        body: [],
        terms: [
          ['1. Codebase', 'One codebase in version control, deployed to many environments.'],
          ['2. Dependencies', 'Declare and isolate all dependencies explicitly; never rely on what happens to be installed.'],
          ['3. Config', 'Store configuration in the environment, not in code, so the same build runs everywhere.'],
          ['4. Backing services', 'Treat databases, queues and caches as attached resources, swappable through configuration.'],
        ],
      },
      {
        heading: 'Factors 5–8: build and run',
        body: [],
        terms: [
          ['5. Build, release, run', 'Separate stages: build an artifact once, combine it with config to release, then run it.'],
          ['6. Processes', 'Run as stateless processes; keep state in backing services.'],
          ['7. Port binding', 'Export services by binding to a port, self-contained.'],
          ['8. Concurrency', 'Scale out by running more processes, not by making one process bigger.'],
        ],
      },
      {
        heading: 'Factors 9–12: operations',
        body: [],
        terms: [
          ['9. Disposability', 'Start fast and shut down gracefully, so instances can come and go freely.'],
          ['10. Dev/prod parity', 'Keep development, staging and production as similar as possible.'],
          ['11. Logs', 'Treat logs as event streams written to standard output, collected by the platform.'],
          ['12. Admin processes', 'Run one-off admin tasks, such as migrations, as separate processes with the same code and config.'],
        ],
      },
      {
        heading: 'Twelve factors on modern platforms',
        body: [
          'Containers make dependency isolation and port binding natural; Kubernetes and serverless platforms expect statelessness and disposability; CI/CD pipelines implement build, release, run. Secrets belong in a secret manager injected as environment variables rather than in plain config files.',
          'Commonly added practices include API-first design, telemetry with metrics and traces, and authentication built in from the start.',
        ],
      },
      {
        heading: 'Where teams slip',
        body: [
          'The most common breaks are configuration baked into images, local file storage that disappears when an instance restarts, long startup times that slow scaling, and development environments that differ so much from production that bugs only appear after release.',
        ],
      },
      {
        heading: "A quick self-check",
        body: [
          "Ask five questions of any service. Can the same artifact run in every environment with only configuration changing? Can any instance be killed without losing data? Does a new instance start in seconds? Do logs go to standard output? Are all dependencies declared? A \"no\" to any of these is a good place to start improving.",
        ],
      },
      {
        heading: "Beyond the twelve",
        body: [
          "Teams often add a few factors for modern systems: design APIs first, build in telemetry from the start, and handle authentication and authorisation as a core concern. These extend the original methodology without changing its spirit: services that are easy to deploy, scale and operate.",
        ],
      },
    ],
    practice: [
      'Check one service against all twelve factors and list the gaps.',
      'Move configuration and secrets out of code and images.',
      'Make services stateless; move sessions and files to backing services.',
      'Build once in CI and promote the same artifact through environments.',
      'Write logs to standard output in a structured format.',
      'Use containers or managed environments to keep dev and prod similar.',
    ],
    mistakes: [
      'Different builds for each environment.',
      'Storing uploaded files on the local disk of an instance.',
      'Secrets committed to repositories or baked into images.',
      'Slow startup that makes autoscaling ineffective.',
    ],
    measures: [
      'Share of services meeting all twelve factors.',
      'Time for a new instance to start and serve traffic.',
      'Incidents caused by environment differences.',
      'Secrets found in code or images (aim for zero).',
    ],
    related: [{ label: 'Cloud Architecture', to: '/architecture/cloud-architecture' }, { label: 'Microservices', to: '/architecture/microservices' }, { label: 'Terraform & Bicep templates', to: '/architecture/iac-templates' }, mm('kiss-principle', 'KISS Principle'), mm('the-lindy-effect', 'Lindy Effect'), mm('default-status', 'Default Status')],
  },

  'software-engineering': {
    path: '/architecture/software-engineering',
    title: 'Software Engineering Practices',
    subtitle: 'The disciplined habits that turn individual coding skill into reliable team delivery.',
    description: 'Software engineering practices for teams: process models, version control and trunk-based development, testing, code review, documentation and engineering in the AI era.',
    parent,
    intro: [
      'Software engineering is more than writing code. It is the set of habits that let a team deliver reliable software repeatedly: how work is planned, how code is shared and reviewed, how quality is checked, and how knowledge is kept.',
      'These practices have evolved from heavyweight process models towards lightweight, feedback-driven ways of working. AI is now changing them again, by making code cheaper to produce and judgement more valuable.',
    ],
    sections: [
      {
        heading: 'Process models',
        body: [],
        terms: [
          ['Waterfall', 'Sequential phases. Still useful context, and sometimes fitting for fixed, well-understood work.'],
          ['Scrum', 'Short iterations with regular review and improvement.'],
          ['Kanban', 'Continuous flow with work-in-progress limits.'],
          ['Extreme Programming', 'Engineering practices such as TDD, pairing and continuous integration that make change safe.'],
        ],
      },
      {
        heading: 'Version control and integration',
        body: [
          'Everything lives in version control: code, infrastructure, configuration, documentation. Trunk-based development with small, frequent merges and short-lived branches reduces painful merge conflicts and keeps the main branch releasable. Feature flags let unfinished work be merged safely.',
        ],
      },
      {
        heading: 'Quality practices',
        body: [
          'Automated testing at several levels, continuous integration, code review and static analysis together catch most problems before release. Pair or mob programming spreads knowledge and catches issues in real time for complex work.',
        ],
      },
      {
        heading: 'Documentation that helps',
        body: [
          'Good documentation is close to the code and kept up to date: a README that gets someone running quickly, architecture decision records that explain why, runbooks for operations, and a context file that AI assistants read. Prefer short, useful documents over comprehensive ones nobody maintains.',
        ],
      },
      {
        heading: 'Engineering in the AI era',
        body: [
          'AI assistants and agents change where engineers spend their time: less on writing routine code, more on clarifying requirements, reviewing plans and changes, designing guardrails and checking outcomes. The fundamentals of testing, review, small changes and clear design matter more, not less, because they are what keep higher output safe.',
        ],
      },
      {
        heading: "Building an engineering culture",
        body: [
          "Practices last when they are part of the culture: engineers who care about quality, review each other's work generously, and share what they learn. Leaders support this by protecting time for improvement, celebrating good engineering as much as feature delivery, and modelling curiosity and honesty about mistakes.",
          "Communities of practice, internal talks and pairing across teams spread good habits faster than any process document.",
        ],
      },
      {
        heading: "Measuring engineering effectiveness",
        body: [
          "Combine delivery metrics such as the DORA four with developer experience: survey how easy it is to get work done, how much time is lost to friction, and how confident people feel making changes. Use the results to choose the next improvement, not to rank teams.",
        ],
      },
      {
        heading: "Technical debt as a practice",
        body: [
          "Every codebase accumulates shortcuts. Make technical debt visible in the backlog, describe it in terms of the cost it imposes, and reserve regular capacity to pay it down. Teams that do this steadily avoid the large, risky rewrites that unmanaged debt eventually forces.",
        ],
      },
    ],
    practice: [
      'Adopt trunk-based development with small, frequent merges.',
      'Make CI fast and keep the main branch always releasable.',
      'Define "done" to include tests, review and documentation updates.',
      'Use ADRs for significant decisions.',
      'Pair on complex or risky work, and rotate pairs.',
      'Update team practices for AI tools: plan-first, context files, guardrails.',
    ],
    mistakes: [
      'Long-lived branches that turn every merge into a project.',
      'Treating process ceremonies as the goal rather than delivery outcomes.',
      'Documentation written once and never updated.',
      'Assuming AI tools remove the need for engineering discipline.',
    ],
    measures: [
      'Lead time, deployment frequency, change failure rate, time to restore.',
      'Branch age and merge frequency.',
      'Time for a new engineer to make a first production change.',
      'Rework and escaped defects.',
    ],
    related: [{ label: 'DevOps Practices', to: '/devops/practices' }, { label: 'AI-Native SDLC Field Guide', to: '/ai-sdlc/field-guide' }, { label: 'Coding Standards', to: '/architecture/coding-standards' }, mm('extreme-programming', 'Extreme Programming'), mm('kanban', 'Kanban'), mm('feedback-loops', 'Feedback Loops')],
  },

  togaf: {
    path: '/architecture/togaf',
    title: 'The TOGAF Framework',
    subtitle: 'The Open Group Architecture Framework: a structured approach to enterprise architecture.',
    description: 'TOGAF explained for practitioners: the Architecture Development Method, its phases, the architecture domains, governance, and using TOGAF in an agile organisation.',
    parent,
    intro: [
      'TOGAF®, The Open Group Architecture Framework, is one of the most widely used frameworks for enterprise architecture. It provides a method for designing, planning, implementing and governing an organisation\'s architecture, so that technology change supports business goals coherently rather than project by project.',
      'Used rigidly, TOGAF can become heavy documentation. Used pragmatically, it gives a shared structure for big decisions that span many teams.',
    ],
    sections: [
      {
        heading: 'The Architecture Development Method',
        body: ['At TOGAF\'s core is the Architecture Development Method (ADM), an iterative cycle.'],
        terms: [
          ['Preliminary', 'Establish the architecture capability, principles and governance.'],
          ['A. Architecture vision', 'Define scope, stakeholders and the target vision.'],
          ['B–D. Business, data, application and technology architectures', 'Describe current and target states in each domain.'],
          ['E. Opportunities and solutions', 'Identify work packages and transition architectures.'],
          ['F. Migration planning', 'Prioritise and plan the roadmap.'],
          ['G. Implementation governance', 'Make sure projects conform to the target architecture.'],
          ['H. Change management', 'Keep the architecture current as the business changes.'],
        ],
      },
      {
        heading: 'Architecture domains',
        body: [
          'TOGAF describes four connected domains: business architecture (capabilities, processes, organisation), data architecture, application architecture and technology architecture. Looking at all four together prevents technology decisions that don\'t fit how the business works.',
        ],
      },
      {
        heading: 'Governance and the repository',
        body: [
          'An architecture repository holds principles, standards, reference architectures and decisions. Architecture governance, often through a review board, checks that significant projects align with them. The most effective boards are fast, focus on high-risk decisions, and publish reusable patterns so most teams never need a review.',
        ],
      },
      {
        heading: 'TOGAF in an agile, cloud world',
        body: [
          'TOGAF can coexist with agile delivery when it is applied lightly: a clear vision and principles, a small set of reference architectures and golden paths, and governance focused on one-way-door decisions. Architects working alongside teams, rather than handing down documents, keep the architecture realistic.',
        ],
      },
      {
        heading: 'Certification and learning',
        body: [
          'TOGAF certification gives a common vocabulary and is valued by many employers. The real skill is applying the framework in proportion: knowing which parts to use for a given organisation and decision, and which to leave out.',
        ],
      },
      {
        heading: "Architecture roles",
        body: [
          "TOGAF describes several architecture roles: enterprise architects who look across the whole organisation, domain architects for business, data, application and technology, and solution architects who apply the architecture to specific initiatives. In smaller organisations one person often covers several roles.",
          "Whatever the structure, architects add the most value when they work closely with delivery teams and business leaders, translating strategy into practical choices and feeding real-world lessons back into the architecture.",
        ],
      },
      {
        heading: "Measuring architecture's impact",
        body: [
          "Architecture earns its place by making delivery faster and safer, not by producing documents. Track measures such as time to decision, reuse of reference architectures, reduction in duplicate systems and incidents caused by design flaws, and share them with the teams architecture serves.",
        ],
      },
    ],
    practice: [
      'Agree a short set of architecture principles with business and technology leaders.',
      'Map business capabilities and the applications that support them.',
      'Publish reference architectures and golden paths for common needs.',
      'Focus governance reviews on high-risk, hard-to-reverse decisions.',
      'Keep a lightweight repository of decisions (ADRs) and standards.',
      'Revisit the target architecture at least yearly.',
    ],
    mistakes: [
      'Producing extensive documentation that delivery teams never read.',
      'Architecture boards that slow every change instead of the risky few.',
      'Target architectures disconnected from business priorities.',
      'Treating TOGAF as a mandatory sequence rather than a toolkit.',
    ],
    measures: [
      'Time for an architecture decision on high-risk changes.',
      'Share of projects using reference architectures.',
      'Duplicate applications and capabilities, trending down.',
      'Stakeholder satisfaction with architecture support.',
    ],
    related: [{ label: 'IT Governance', to: '/architecture/it-governance' }, adr, assess, mm('wardley-mapping', 'Wardley Mapping'), mm('systems-thinking', 'Systems Thinking'), mm('strategy-vs-tactics', 'Strategy vs Tactics')],
  },

  'it-governance': {
    path: '/architecture/it-governance',
    title: 'IT Governance',
    subtitle: 'Making sure technology investments support business goals, manage risk and deliver value.',
    description: 'IT governance explained: purpose, frameworks such as COBIT, ITIL and ISO/IEC 38500, decision rights, risk and compliance, and lightweight governance for agile and AI.',
    parent,
    intro: [
      'IT governance is how an organisation makes sure its technology spending and decisions support business goals, manage risk and comply with regulation. It defines who decides what, how investments are prioritised, and how performance is measured.',
      'Good governance enables speed: clear decision rights and guardrails let teams move without asking permission for everything. Poor governance slows everything down while still missing the real risks.',
    ],
    sections: [
      {
        heading: 'Key frameworks',
        body: [],
        terms: [
          ['COBIT', 'A comprehensive framework for governance and management of enterprise IT, with a strong focus on control objectives and risk.'],
          ['ITIL', 'Good practice for IT service management: incidents, changes, problems and service levels.'],
          ['ISO/IEC 38500', 'An international standard setting out principles for directors governing IT.'],
          ['ISO/IEC 42001', 'A newer standard for managing AI systems responsibly.'],
        ],
      },
      {
        heading: 'Decision rights',
        body: [
          'Clear decision rights answer who decides on architecture standards, technology investments, risk acceptance and exceptions. Decisions should be made at the lowest level with the right knowledge and accountability, with escalation reserved for high-impact or cross-cutting choices.',
        ],
      },
      {
        heading: 'Risk and compliance',
        body: [
          'Governance connects technology to the organisation\'s risk management: security, resilience, regulatory compliance, vendor risk and, increasingly, AI risk. Continuous, automated evidence from pipelines and cloud platforms makes compliance far less painful than periodic manual audits.',
        ],
      },
      {
        heading: 'Value and portfolio',
        body: [
          'Governance also decides where to invest. Lean portfolio approaches fund long-lived products and value streams rather than individual projects, and review outcomes regularly, moving money towards what works. Unit economics and outcome metrics help compare investments fairly.',
        ],
      },
      {
        heading: 'Lightweight governance for agile and AI',
        body: [
          'In fast-moving organisations, governance works best as guardrails rather than gates: policy as code, golden paths, pre-approved patterns and automated evidence. Human review is reserved for high-risk, hard-to-reverse decisions. The same approach suits AI: a short policy, risk tiers, and technical controls in proportion to risk.',
        ],
      },
      {
        heading: "Governance in practice",
        body: [
          "A practical governance setup for a mid-sized organisation might include a quarterly portfolio review with business and technology leaders, an architecture forum for high-risk decisions, automated policy and compliance checks in pipelines and cloud platforms, and a clear exception process with expiry dates.",
          "Keep the overhead visible. If teams spend more time preparing governance documents than the risk justifies, simplify.",
        ],
      },
      {
        heading: "Governing AI and cloud spend",
        body: [
          "Two areas need particular attention today. AI introduces new risks around data, security and fairness that need clear policies and technical controls. Cloud and AI spend can grow quickly without oversight, so connect governance with FinOps practices such as allocation, budgets and unit economics.",
        ],
      },
      {
        heading: "The role of leadership",
        body: [
          "Governance reflects what leaders pay attention to. When executives ask about outcomes, risk and value in portfolio reviews, rather than only budgets and schedules, governance shifts from paperwork to decision-making that actually shapes the organisation.",
        ],
      },
    ],
    practice: [
      'Document decision rights for architecture, investment, risk and exceptions.',
      'Map your key regulatory obligations to concrete technical controls.',
      'Automate evidence collection from pipelines and cloud platforms.',
      'Move towards funding products and value streams rather than projects.',
      'Introduce risk tiers for changes and AI use cases, with matching controls.',
      'Review governance processes yearly for speed and effectiveness.',
    ],
    mistakes: [
      'Governance by committee for every decision, large or small.',
      'Compliance managed through screenshots and spreadsheets.',
      'Policies that exist only on paper, with no technical enforcement.',
      'Governance disconnected from business outcomes.',
    ],
    measures: [
      'Time to decision for changes requiring approval.',
      'Audit findings and time to close them.',
      'Share of controls with automated evidence.',
      'Investment outcomes against their business cases.',
    ],
    related: [{ label: 'TOGAF', to: '/architecture/togaf' }, { label: 'AI Governance', to: '/genai/governance' }, assess, mm('lean-portfolio-management', 'Lean Portfolio Management'), mm('directly-responsible-individual', 'Directly Responsible Individual'), mm('forcing-function', 'Forcing Function')],
  },
};
