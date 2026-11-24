import type { TopicContent } from '../../components/TopicArticle';

export const parent = { label: 'Architecture', to: '/architecture' };
export const mm = (anchor: string, label: string) => ({ label: `Mental model: ${label}`, to: `/explore/mental-models#${anchor}` });
export const assess = { label: 'Well-Architected Assessment', to: '/architecture/assessment' };
export const adr = { label: 'Architecture Decisions Toolkit', to: '/explore/toolkits/architecture-decisions' };

export const ARCHITECTURE_TOPICS_A: Record<string, TopicContent> = {
  'system-design-process': {
    path: '/architecture/system-design-process',
    title: 'The System Design Process',
    subtitle: 'A structured way to design systems that meet real requirements, from first questions to a reviewed design.',
    description: 'A step-by-step system design process: clarifying requirements, estimating scale, high-level design, deep dives, trade-offs, reviews and decision records.',
    parent,
    intro: [
      'Good system design starts with questions, not boxes and arrows. The most common design failures come from solving the wrong problem, or from ignoring the non-functional requirements (scale, latency, availability, security, cost) until they become expensive to change.',
      'A simple, repeatable process helps teams design consistently, explain their reasoning, and catch problems while they are still cheap to fix.',
    ],
    sections: [
      {
        heading: 'Step 1: Clarify requirements',
        body: ['Spend real time here. Ambiguity at this stage multiplies later.'],
        terms: [
          ['Functional requirements', 'What the system must do: the key user journeys and operations.'],
          ['Non-functional requirements', 'How well it must do it: scale, latency, availability, durability, security, compliance and cost.'],
          ['Constraints', 'Existing systems, regulations, skills, budget and deadlines that limit the options.'],
        ],
      },
      {
        heading: 'Step 2: Estimate scale',
        body: [
          'Back-of-the-envelope estimates turn vague expectations into numbers: requests per second at peak, data stored per year, read-to-write ratio, bandwidth. They don\'t need to be precise; they need to be in the right order of magnitude, because a design for 100 requests a second differs greatly from one for 100,000.',
        ],
      },
      {
        heading: 'Step 3: High-level design',
        body: [
          'Sketch the main components and data flows: clients, APIs, services, data stores, queues and external dependencies. Walk each key user journey through the diagram to check it works end to end. Identify the parts that carry the most risk or load.',
        ],
      },
      {
        heading: 'Step 4: Deep dives and trade-offs',
        body: [
          'Go deeper on the risky parts: the data model, caching strategy, consistency needs, failure handling, scaling approach and security controls. Every choice involves trade-offs, such as consistency versus availability or simplicity versus flexibility. Make them explicit, with the reasons.',
        ],
      },
      {
        heading: 'Step 5: Review and record',
        body: [
          'Review the design with peers, security and the people who will operate it. A short pre-mortem ("it\'s a year later and this failed; why?") surfaces risks quickly. Record the important decisions in Architecture Decision Records next to the code, with the options considered and when to revisit them.',
          'AI assistants can help draft designs, estimate capacity and list risks. Treat their output as a starting point for the team\'s discussion, not the final answer.',
        ],
      },
      {
        heading: "Scaling the process to the decision",
        body: [
          "Not every change needs the full process. A small change inside one service might need only a short note in the pull request. A new service, a new data store or a change to a critical flow deserves the full steps and a review. A one-way-door decision, such as choosing a core platform, deserves the most care of all.",
          "Agree simple criteria for which changes need a design review, so teams don't over-engineer small changes or under-prepare big ones.",
        ],
      },
    ],
    practice: [
      'Use a design template with sections for requirements, estimates, design, trade-offs and risks.',
      'Write down non-functional requirements with numbers, not adjectives.',
      'Do a quick capacity estimate before choosing technologies.',
      'Walk every key user journey through the high-level design.',
      'Hold a 30-minute design review with a pre-mortem for significant changes.',
      'Record decisions as ADRs and set a revisit trigger.',
    ],
    mistakes: [
      'Jumping straight to technology choices before understanding the problem.',
      'Designing for imagined scale far beyond real needs.',
      'Ignoring operations, security and cost until after launch.',
      'Decisions that live only in a meeting and get re-debated later.',
    ],
    measures: [
      'Share of significant changes with a design review and ADR.',
      'Design-related incidents and rework after launch.',
      'Accuracy of capacity estimates versus reality.',
      'Time from design start to an agreed decision.',
    ],
    related: [adr, assess, { label: 'Cloud Architecture', to: '/architecture/cloud-architecture' }, mm('arguing-from-first-principles', 'First Principles'), mm('pre-mortem', 'Pre-mortem'), mm('reversible-vs-irreversible-decisions', 'Reversible vs Irreversible Decisions')],
  },

  'api-design': {
    path: '/architecture/api-design',
    title: 'API Design and Management',
    subtitle: 'Designing interfaces that are intuitive, stable, secure and easy to evolve.',
    description: 'API design for engineering teams: REST, GraphQL, gRPC and events, design-first with OpenAPI, versioning, security, gateways, documentation and APIs for AI agents.',
    parent,
    intro: [
      'APIs are contracts. Once other teams, partners or customers depend on them, every change carries a cost. Good API design makes interfaces easy to understand and hard to misuse, and makes it possible to evolve them without breaking the people who rely on them.',
      'With AI agents increasingly calling APIs as tools, clear naming, consistent behaviour and good documentation matter more than ever.',
    ],
    sections: [
      {
        heading: 'Choosing a style',
        body: ['Each style suits different needs; many organisations use more than one.'],
        terms: [
          ['REST', 'Resource-oriented, stateless, using standard HTTP methods. The default for most public and internal APIs.'],
          ['GraphQL', 'Clients ask for exactly the data they need through a single endpoint. Useful for varied front-end needs.'],
          ['gRPC', 'Efficient, strongly typed calls between services, well suited to internal, high-volume communication.'],
          ['Events', 'Asynchronous messages through a broker, decoupling producers from consumers.'],
        ],
      },
      {
        heading: 'Design first',
        body: [
          'Write the API specification (OpenAPI for REST, a schema for GraphQL, protobuf for gRPC) before writing code, and review it with the people who will use it. A shared specification lets teams work in parallel, generates documentation and clients, and allows contract tests that catch breaking changes automatically.',
        ],
      },
      {
        heading: 'Consistency and evolution',
        body: [
          'Agree organisation-wide conventions for naming, errors, pagination, filtering and dates, and apply them everywhere. Evolve APIs by adding, not changing: new optional fields and new endpoints are safe; removing or renaming things is not. When breaking changes are unavoidable, version the API and give consumers a clear deprecation timeline.',
        ],
      },
      {
        heading: 'Security and gateways',
        body: [
          'Every API needs authentication and authorisation, input validation against the schema, rate limiting and audit logging for important actions. API gateways centralise many of these concerns, along with routing and analytics. Never expose sensitive fields in errors or logs.',
        ],
      },
      {
        heading: 'APIs for AI agents',
        body: [
          'AI agents use APIs through tool definitions, often via the Model Context Protocol. Clear operation names, precise descriptions, predictable errors and safe defaults help agents use them correctly. Scope agent access tightly and require confirmation for destructive operations.',
        ],
      },
      {
        heading: "Documentation and developer experience",
        body: [
          "An API is only as good as its documentation. Publish reference documentation generated from the specification, plus short guides for common tasks, working examples and a sandbox where developers can try calls safely.",
          "Measure developer experience directly: how long it takes a new consumer to make a first successful call, and what questions they ask. Every repeated question is a gap in the documentation or the design.",
        ],
      },
      {
        heading: "Internal versus public APIs",
        body: [
          "Internal APIs can evolve faster because you know every consumer and can coordinate changes. Public and partner APIs need more stability, longer deprecation periods, stricter versioning and stronger security. Decide early which kind each API is, because moving from internal to public later usually means redesigning it.",
        ],
      },
    ],
    practice: [
      'Publish API conventions for naming, errors, pagination and versioning.',
      'Adopt design-first: specification reviewed before implementation.',
      'Generate documentation and client libraries from the specification.',
      'Add contract tests to catch breaking changes in CI.',
      'Put external APIs behind a gateway with authentication and rate limits.',
      'Write clear descriptions for APIs that AI agents will call as tools.',
    ],
    mistakes: [
      'Breaking existing consumers with "small" changes.',
      'Inconsistent conventions across teams, so every API feels different.',
      'Exposing internal data models directly as the API.',
      'Documentation that drifts out of date with the code.',
    ],
    measures: [
      'Breaking changes released without a version change (aim for zero).',
      'Time for a new consumer to make a first successful call.',
      'Error rates and latency per endpoint.',
      'Share of APIs with a reviewed specification and contract tests.',
    ],
    related: [{ label: 'Microservices', to: '/architecture/microservices' }, { label: 'Security in System Design', to: '/architecture/system-security' }, adr, mm('abstraction', 'Abstraction'), mm('kiss-principle', 'KISS Principle'), mm('switching-costs', 'Switching Costs')],
  },

  microservices: {
    path: '/architecture/microservices',
    title: 'Microservices Architecture',
    subtitle: 'Splitting systems into independently deployable services, and knowing when not to.',
    description: 'Microservices explained: domain boundaries, independence, communication, data ownership, the operational cost, when a modular monolith is better, and migrating safely.',
    parent,
    intro: [
      'Microservices structure a system as a set of small services, each owning a business capability, running independently and communicating through APIs or events. Done well, they let teams build, deploy and scale their parts without waiting for each other.',
      'They also bring real costs: distributed systems are harder to test, debug and operate. Many teams would be better served by a well-structured modular monolith, at least to start.',
    ],
    sections: [
      {
        heading: 'Core principles',
        body: [],
        terms: [
          ['Modelled around business domains', 'Service boundaries follow business capabilities, often found through domain-driven design.'],
          ['Independent deployment', 'Each service can be released without coordinating with others.'],
          ['Own your data', 'Each service owns its data store; others access it only through its API or events.'],
          ['Automation culture', 'CI/CD, infrastructure as code and observability are prerequisites, not extras.'],
          ['Hide implementation details', 'Stable interfaces, often behind an API gateway, let internals change freely.'],
        ],
      },
      {
        heading: 'Communication',
        body: [
          'Services talk synchronously (REST, gRPC) or asynchronously (events, queues). Synchronous calls are simple but create runtime coupling: if one service is slow, its callers are too. Asynchronous events decouple services but make flows harder to follow. Use timeouts, retries with backoff and circuit breakers for every remote call.',
        ],
      },
      {
        heading: 'The cost of distribution',
        body: [
          'Every network call can fail or be slow. Data consistency across services needs patterns such as sagas and the outbox pattern. Debugging requires distributed tracing. Each service needs its own pipeline, monitoring and on-call ownership. These costs are worth paying only when the benefits of independence are real.',
        ],
      },
      {
        heading: 'Modular monolith first',
        body: [
          'A modular monolith keeps one deployable unit but enforces clear internal module boundaries. It gives much of the design clarity of microservices with far less operational overhead, and modules can be extracted into services later when there is a clear reason, such as different scaling needs or a separate team.',
        ],
      },
      {
        heading: 'Teams and boundaries',
        body: [
          'Conway\'s Law applies strongly here: service boundaries tend to mirror team boundaries. Align each service with one owning team, keep teams small, and avoid services that several teams must change together, which is a sign the boundary is in the wrong place.',
        ],
      },
      {
        heading: "Migrating from a monolith",
        body: [
          "The strangler fig pattern is the safest route: put a routing layer in front of the monolith, build new capabilities as services, and move existing features out one at a time, starting with those that change most often or need different scaling.",
          "Move data carefully. Split the database only after the service boundary is proven, and keep the old and new paths running side by side until you are confident.",
        ],
      },
      {
        heading: "Observability is not optional",
        body: [
          "In a distributed system, a single user request can pass through many services. Distributed tracing, correlated logs and consistent metrics are what make it possible to find where time is lost or where an error started. Build them in from the first service, using OpenTelemetry so the instrumentation isn't tied to one vendor.",
        ],
      },
    ],
    practice: [
      'Start with a modular monolith unless you have clear reasons not to.',
      'Map business domains and draw service boundaries around them.',
      'Give each service one owning team and its own data store.',
      'Put CI/CD, tracing and centralised logging in place before splitting services out.',
      'Extract services gradually using the strangler fig pattern.',
      'Review boundaries when changes regularly span several services.',
    ],
    mistakes: [
      'Splitting into too many tiny services too early.',
      'Shared databases between services, which recreate the monolith\'s coupling.',
      'Chains of synchronous calls that make the whole system as fragile as its weakest link.',
      'Adopting microservices without the automation and observability they need.',
    ],
    measures: [
      'Share of changes deployable by one team without coordination.',
      'Deployment frequency per service.',
      'Cross-service incidents and their recovery time.',
      'Changes that required updating several services together.',
    ],
    related: [{ label: 'API Design', to: '/architecture/api-design' }, { label: 'Twelve-Factor App', to: '/architecture/twelve-factor' }, { label: 'Platform Engineering', to: '/devops/platform-engineering' }, mm('conways-law', "Conway's Law"), mm('divide-and-conquer', 'Divide and Conquer'), mm('emergence', 'Emergence')],
  },

  'data-architecture': {
    path: '/architecture/data-architecture',
    title: 'Data Architecture',
    subtitle: 'Designing how data is captured, stored, processed and used across the organisation.',
    description: 'Data architecture essentials: CAP and consistency trade-offs, choosing databases, lakes, warehouses and lakehouses, data mesh, governance, and data for AI.',
    parent,
    intro: [
      'Data architecture is the blueprint for how data moves through an organisation: where it is created, how it is stored and processed, who can use it, and how its quality is maintained. Good data architecture makes reliable reporting, analytics and AI possible; poor data architecture makes every new use case a painful integration project.',
      'Generative AI has raised the stakes. Models and AI assistants are only as useful as the data they can reach, and only as safe as the controls around it.',
    ],
    sections: [
      {
        heading: 'Consistency trade-offs',
        body: [
          'The CAP theorem says that when a network partition occurs, a distributed system must choose between consistency and availability. In practice, this means deciding, per use case, whether users must always see the latest data or whether slightly stale data is acceptable in exchange for availability and speed.',
        ],
        terms: [
          ['ACID', 'Strong guarantees for transactions, typical of relational databases.'],
          ['BASE', 'Basically available, eventually consistent; typical of many NoSQL systems that favour scale and availability.'],
        ],
      },
      {
        heading: 'Choosing data stores',
        body: [
          'Relational databases remain the right default for most transactional data. Document, key-value, wide-column and graph databases suit specific access patterns. Distributed SQL databases offer relational semantics at large scale. Choose based on access patterns, consistency needs, scale and the team\'s skills, and avoid adding a new database type without a clear need.',
        ],
      },
      {
        heading: 'Analytics platforms',
        body: [],
        terms: [
          ['Data warehouse', 'Structured, modelled data optimised for reporting and analysis.'],
          ['Data lake', 'Raw data of any format stored cheaply for later processing.'],
          ['Lakehouse', 'Combines lake storage with warehouse-style management and query performance.'],
          ['Data mesh', 'Domain teams own and publish their data as products, with shared standards and a self-service platform.'],
        ],
      },
      {
        heading: 'Governance and quality',
        body: [
          'Data governance defines ownership, classification, quality standards, retention and access. A data catalogue makes data discoverable; lineage shows where it came from and what depends on it. Quality checks in pipelines catch problems before they reach dashboards or models.',
        ],
      },
      {
        heading: 'Data for AI',
        body: [
          'AI use cases need data that is discoverable, well described, classified and accessible with the right permissions. Retrieval-augmented generation depends on clean, current documents; fine-tuning and evaluation depend on representative, well-labelled examples. Make new data products AI-ready by default rather than retrofitting them later.',
        ],
      },
      {
        heading: "Data contracts",
        body: [
          "As more teams publish and consume data, agreements about structure and quality become essential. A data contract defines the schema, meaning, freshness and quality guarantees of a dataset, and who owns it. Checks in the producer's pipeline enforce the contract, so consumers aren't surprised by breaking changes.",
          "Contracts turn data from a by-product of applications into a product with clear expectations.",
        ],
      },
    ],
    practice: [
      'Name an owner for each important data domain.',
      'Classify data by sensitivity and enforce access accordingly.',
      'Standardise on a small set of supported data stores.',
      'Add data-quality checks to pipelines and alert on failures.',
      'Build a catalogue with ownership, descriptions and lineage.',
      'Treat key datasets as products with clear consumers and service levels.',
    ],
    mistakes: [
      'Adding new database technologies for every project.',
      'Data lakes that become swamps: no ownership, no quality, no catalogue.',
      'Ignoring classification until an AI tool exposes sensitive data.',
      'Centralising all data work in one team that becomes a bottleneck.',
    ],
    measures: [
      'Share of critical datasets with an owner, classification and quality checks.',
      'Data incidents reaching reports or models.',
      'Time to provide a new team with the data it needs.',
      'Data platform cost per domain or per query.',
    ],
    related: [{ label: 'RAG Architecture', to: '/genai/rag' }, { label: 'GenAI Adoption Framework', to: '/genai/adoption-framework' }, assess, mm('the-map-is-not-the-territory', 'The Map Is Not the Territory'), mm('tragedy-of-the-commons', 'Tragedy of the Commons'), mm('simpsons-paradox', "Simpson's Paradox")],
  },

  'cloud-architecture': {
    path: '/architecture/cloud-architecture',
    title: 'Cloud Architecture',
    subtitle: 'Designing for elasticity, managed services and failure, with cost as a first-class concern.',
    description: 'Cloud architecture principles: the Well-Architected pillars, managed services and serverless, designing for failure, multi-region, landing zones and cost-aware design.',
    parent,
    intro: [
      'The cloud changes the economics and the failure model of architecture. Capacity can grow and shrink in minutes, managed services take over undifferentiated work, and you pay for what you use. At the same time, everything is a network call away, and individual components fail regularly.',
      'Good cloud architecture embraces both: it uses elasticity and managed services to move faster, and designs for failure so the system keeps working when parts of it don\'t.',
    ],
    sections: [
      {
        heading: 'The Well-Architected pillars',
        body: ['AWS, Azure and Google Cloud all publish well-architected frameworks built around similar pillars. They make a useful checklist for any design.'],
        terms: [
          ['Operational excellence', 'Automation, observability and continuous improvement of operations.'],
          ['Security', 'Identity, data protection, detection and response.'],
          ['Reliability', 'Recovering from failure and meeting demand.'],
          ['Performance efficiency', 'Using resources efficiently as demand changes.'],
          ['Cost optimisation', 'Delivering value at the lowest sensible price.'],
          ['Sustainability', 'Minimising the environmental impact of workloads.'],
        ],
      },
      {
        heading: 'Managed services and serverless',
        body: [
          'Managed databases, queues, container platforms and serverless functions shift operational work to the provider. Services that scale to zero, such as Cloud Run or Lambda, are ideal for spiky or low-traffic workloads. Use managed services for commodity capabilities and focus your own effort on what differentiates you.',
        ],
      },
      {
        heading: 'Designing for failure',
        body: [
          'Assume instances, zones and dependencies will fail. Spread workloads across availability zones, make services stateless where possible, use health checks and automatic replacement, and set timeouts and retries on every call. Decide each workload\'s recovery targets (RTO and RPO) and design to meet them, including multi-region only where the business case justifies it.',
        ],
      },
      {
        heading: 'Landing zones and governance',
        body: [
          'A landing zone provides a secure, consistent foundation for every account or subscription: identity, networking, logging and guardrail policies. With it, teams can create environments quickly without reinventing security and governance each time.',
        ],
      },
      {
        heading: 'Cost-aware design',
        body: [
          'In the cloud, architecture choices are cost choices. Data transfer between regions, always-on capacity and oversized databases often cost more than compute. Include cost estimates in design reviews, tag resources from day one, and use autoscaling and lifecycle policies so costs follow demand.',
        ],
      },
      {
        heading: "Multi-cloud and portability",
        body: [
          "Many organisations use more than one cloud, often because of acquisitions, specific services or regulatory needs. Running the same workload across clouds for portability is rarely worth the cost. A more practical approach is to standardise on principles, tooling such as Terraform and Kubernetes where it helps, and identity, while using each cloud's strengths for the workloads placed there.",
          "Keep exit plans realistic: know how you would move a critical workload if you had to, and what it would cost.",
        ],
      },
      {
        heading: "Reference architectures",
        body: [
          "Publish a small set of approved reference architectures for common needs, such as a web application, an event-driven service or a data pipeline, each with infrastructure templates and security built in. Teams start faster, designs are more consistent, and reviews can focus on what is genuinely new.",
        ],
      },
    ],
    practice: [
      'Review each significant design against the Well-Architected pillars.',
      'Prefer managed services for databases, queues, secrets and CI.',
      'Deploy across multiple zones and test failover.',
      'Set RTO and RPO per workload and test backups and restores.',
      'Adopt a landing zone for new environments.',
      'Include a cost estimate and tags in every design.',
    ],
    mistakes: [
      'Lifting and shifting without redesigning for the cloud\'s strengths.',
      'Running self-managed versions of services the provider offers managed.',
      'Single-zone deployments for critical workloads.',
      'Discovering data-transfer costs after launch.',
    ],
    measures: [
      'Well-Architected review scores per workload.',
      'Availability against SLOs, and recovery time in tests.',
      'Share of workloads on managed services and the landing zone.',
      'Unit cost per workload.',
    ],
    related: [assess, { label: 'Terraform & Bicep templates', to: '/architecture/iac-templates' }, { label: 'Cloud Security', to: '/secops/cloud-security' }, mm('margin-of-safety', 'Margin of Safety'), mm('core-competency', 'Core Competency'), mm('murphys-law', "Murphy's Law")],
  },

  'system-security': {
    path: '/architecture/system-security',
    title: 'Security in System Design',
    subtitle: 'Security by design: protection built into every layer, not bolted on at the end.',
    description: 'Security in system design: least privilege, defence in depth, zero trust, threat modelling, secure defaults, identity, data protection, logging and designing AI features safely.',
    parent,
    intro: [
      'Security is not a feature you add at the end. It is an architectural property that comes from many design decisions: how identities work, how data flows, where trust boundaries sit, and what happens when something fails. Decisions made early are far cheaper to get right than fixes after launch.',
      'Architects don\'t need to be security specialists, but they do need to design with security principles in mind and involve specialists at the right moments.',
    ],
    sections: [
      {
        heading: 'Key principles',
        body: [],
        terms: [
          ['Least privilege', 'Each component and identity has only the permissions it needs.'],
          ['Defence in depth', 'Several independent layers of control: network, identity, application, data.'],
          ['Zero trust', 'Authenticate and authorise every request, whatever its network location.'],
          ['Secure by default', 'Safe configuration out of the box; risky options require deliberate choice.'],
          ['Fail securely', 'When something breaks, it should deny access rather than allow it.'],
        ],
      },
      {
        heading: 'Threat modelling in design',
        body: [
          'For each new system or major change, sketch data flows and trust boundaries and ask what could go wrong, using a structure such as STRIDE. Record the main threats and mitigations in the design document. An hour here prevents expensive flaws later.',
        ],
      },
      {
        heading: 'Identity and data protection',
        body: [
          'Centralise authentication, use standards such as OAuth 2.0 and OpenID Connect, and give services and pipelines their own identities with short-lived credentials. Encrypt data in transit and at rest, classify it by sensitivity, minimise what you collect, and keep secrets in a managed secret store.',
        ],
      },
      {
        heading: 'Observability for security',
        body: [
          'Design logging for investigation from the start: who did what, when, from where, on which resource. Protect logs from tampering, never log secrets or sensitive personal data, and make sure security events reach a team that will act on them.',
        ],
      },
      {
        heading: 'Designing AI features safely',
        body: [
          'Features that use language models or agents introduce new trust boundaries. Treat user prompts and retrieved documents as untrusted input, filter outputs for sensitive data, give agents scoped permissions, and keep humans in the loop for consequential actions.',
        ],
      },
      {
        heading: "Working with security teams",
        body: [
          "Bring security specialists in early, when the design is still flexible, rather than at the end for approval. Share the design document and threat model ahead of the review so the conversation focuses on real risks.",
          "Over time, turn repeated advice into reusable patterns, such as a standard authentication approach or a reference architecture for handling personal data, so most teams can design securely without waiting for a review.",
        ],
      },
      {
        heading: "Security requirements in the spec",
        body: [
          "Write security requirements down like any other requirement: who can access what, what data is sensitive, what must be logged and retained, and what compliance rules apply. Requirements that are written down get designed, built and tested; requirements that are assumed often get missed.",
        ],
      },
    ],
    practice: [
      'Add a security and threat-model section to the design template.',
      'Use a central identity provider and workload identity for services.',
      'Classify data and choose controls by sensitivity.',
      'Store secrets only in a managed secret store.',
      'Define security logging requirements in every design.',
      'Involve a security champion or specialist in reviews of high-risk designs.',
    ],
    mistakes: [
      'Treating security as a review at the end of the project.',
      'Relying on a network perimeter instead of strong identity.',
      'Logging sensitive data, or not logging enough to investigate incidents.',
      'Designing AI features without considering prompt injection and data leakage.',
    ],
    measures: [
      'Share of designs with a threat model.',
      'Security findings in design versus after release.',
      'Long-lived credentials remaining, trending to zero.',
      'Time to investigate security events using available logs.',
    ],
    related: [{ label: 'Security Principles', to: '/secops/principles' }, { label: 'Threat Modelling', to: '/secops/threat-modeling' }, { label: 'DevSecOps Playbook', to: '/secops/devsecops-playbook' }, mm('swiss-cheese-model', 'Swiss Cheese Model'), mm('inversion', 'Inversion'), mm('default-status', 'Default Status')],
  },
};
