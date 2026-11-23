import type { TopicContent } from '../../components/TopicArticle';

const parent = { label: 'SecOps', to: '/secops' };
const mm = (anchor: string, label: string) => ({ label: `Mental model: ${label}`, to: `/explore/mental-models#${anchor}` });
const playbook = { label: 'The DevSecOps Playbook (free PDF)', to: '/secops/devsecops-playbook' };
const assess = { label: 'Cloud Security Assessment', to: '/secops/assessment' };

export const SECOPS_TOPICS: Record<string, TopicContent> = {
  'continuous-security': {
    path: '/secops/continuous-security',
    title: 'Continuous Security',
    subtitle: 'Embedding security checks into every stage of the pipeline, so problems are found minutes after they are introduced.',
    description: 'How continuous security works: checks at commit, build, test and runtime, what to block versus track, and how to keep pipelines fast and trusted.',
    parent,
    intro: [
      'Continuous security means every change is checked automatically against your security standards as it moves through the pipeline. Instead of a review at the end of a release, developers get feedback while the code is still fresh in their minds, which is when fixes are cheapest.',
      'The aim is not to add as many scanners as possible. It is to put the right check at the right stage, keep the signal high, and block only on findings that genuinely matter. A pipeline that cries wolf gets bypassed.',
    ],
    sections: [
      {
        heading: 'Checks at each stage',
        body: ['Each stage catches a different class of problem. Together they form layered defence.'],
        terms: [
          ['Commit', 'Secret scanning and linting, ideally in a pre-commit hook and again on the server.'],
          ['Build', 'Static analysis (SAST) and software composition analysis (SCA) for vulnerable or badly licensed dependencies; an SBOM for every build.'],
          ['Test and staging', 'Dynamic testing (DAST), container image scanning, and infrastructure-as-code scanning.'],
          ['Deploy and runtime', 'Admission policies, configuration monitoring, runtime threat detection and cloud posture management.'],
        ],
      },
      {
        heading: 'Block, warn or track',
        body: [
          'Not every finding should break the build. A common, workable rule is to block on critical findings at merge, block on high findings at release, and track medium and low findings with agreed fix times. Exceptions are allowed, but each needs an owner, a reason and an expiry date.',
          'Publish these rules so developers know what to expect, and make sure every blocking finding explains how to fix it.',
        ],
      },
      {
        heading: 'Keeping pipelines fast and trusted',
        body: [
          'Slow scans that run on every commit frustrate developers and get turned off. Run fast checks on every change and heavier ones, such as full DAST, on a schedule or before release. Cache results, scan only what changed where tools allow, and tune rules to remove known false positives.',
          'Trust is the real currency. If developers believe the findings are accurate and actionable, they fix them. If not, they look for ways around the gate.',
        ],
      },
      {
        heading: 'Securing AI-assisted development',
        body: [
          'AI coding assistants can produce large amounts of code quickly, including insecure patterns and outdated dependencies. Continuous security is what keeps that safe: the same scanners and policies apply to AI-written code as to human code, with no exceptions.',
          'Give AI agents your secure-coding standards as instructions, and back them with hooks that block secrets and edits to protected paths. Instructions make the right behaviour likely; automated checks make the wrong behaviour impossible.',
        ],
      },
      {
        heading: "Where to begin",
        body: [
          "If you are starting from scratch, begin with the checks that catch the most damaging problems for the least friction: secret scanning and dependency updates. Then add SAST for critical repositories and IaC scanning for infrastructure, and only later DAST and runtime controls.",
          "At every step, ask developers what would make the findings more useful to them. Their answers usually point to the next improvement.",
        ],
      },
    ],
    practice: [
      'Turn on secret scanning for every repository, both pre-commit and server-side.',
      'Add dependency scanning with automated update pull requests (Dependabot or Renovate).',
      'Add SAST to the pull-request pipeline for your most critical repositories, and tune it for a month before blocking.',
      'Agree severity rules and fix times, and publish the exception process.',
      'Add IaC and container image scanning to the build.',
      'Review false-positive rates monthly and adjust rules.',
    ],
    mistakes: [
      'Blocking on every finding from day one, which leads to pressure to disable the checks.',
      'Running scanners whose results nobody reads.',
      'Letting exceptions live for ever without an expiry or owner.',
      'Treating the pipeline as the only control and ignoring runtime security.',
    ],
    measures: [
      'Mean time to fix critical and high findings, against your agreed targets.',
      'Vulnerabilities found in production versus in the pipeline.',
      'Share of repositories with secret, dependency and code scanning.',
      'Number of open exceptions, and how many are past expiry.',
    ],
    related: [playbook, assess, { label: 'SAST and DAST', to: '/secops/sast-dast' }, mm('feedback-loops', 'Feedback Loops'), mm('swiss-cheese-model', 'Swiss Cheese Model'), mm('false-positives-and-false-negatives', 'False Positives and Negatives')],
  },

  practices: {
    path: '/secops/practices',
    title: 'SecOps Practices',
    subtitle: 'Operating security every day: monitoring, detection, incident response and continuous testing of your defences.',
    description: 'Core SecOps practices for modern enterprises: continuous monitoring, detection engineering, incident response, red and blue teaming, and integrating the SOC with DevOps.',
    parent,
    intro: [
      'SecOps is where security strategy meets day-to-day reality. Policies and architectures matter, but attacks are detected, contained and learned from in operations. The best SecOps teams work closely with engineering, share context quickly and automate the routine so analysts can focus on what is genuinely suspicious.',
      'Traditional security operations centres were often isolated from the teams who built and ran the systems. Modern SecOps breaks that wall down, because the people who know a service best are usually the fastest to understand an alert about it.',
    ],
    sections: [
      {
        heading: 'Continuous monitoring and detection',
        body: [
          'Detection starts with complete, protected logs: cloud audit logs, identity events, network flows and application logs, collected centrally where attackers cannot tamper with them. On top of that sit detection rules, cloud-native threat detection services and, increasingly, behaviour analytics.',
          'Detection engineering treats rules like code: version-controlled, tested, reviewed and tuned. Mapping rules to MITRE ATT&CK techniques shows where coverage is strong and where it has gaps.',
        ],
      },
      {
        heading: 'Incident response',
        body: [
          'A clear, rehearsed response plan is what turns a breach from chaos into a managed event. Everyone should know the roles, severity levels, communication paths and first containment steps.',
        ],
        terms: [
          ['Prepare', 'Plans, roles, contact lists, access and tooling ready before you need them.'],
          ['Detect and analyse', 'Confirm the incident, its scope and its severity.'],
          ['Contain, eradicate, recover', 'Stop the spread, remove the cause and restore service safely.'],
          ['Learn', 'A blameless review, with actions fed back into detections, controls and training.'],
        ],
      },
      {
        heading: 'Testing your defences',
        body: [
          'Red teams simulate real attackers; blue teams defend. Purple teaming brings them together so each attack immediately improves detections and response. Even small organisations can run tabletop exercises and simple attack simulations against their own environment.',
          'Test against realistic scenarios for your business: stolen cloud credentials, a compromised dependency, ransomware on a file share, or an AI assistant leaking sensitive data.',
        ],
      },
      {
        heading: 'SecOps and DevOps together',
        body: [
          'Shared tooling and shared context are the foundation. Security alerts should carry the owning team, recent deployments and service context automatically, so analysts and engineers can act within minutes. Engineering teams, in turn, should be able to see security findings for their own services without asking.',
          'AI is helping on both sides: summarising alerts, assembling incident timelines and drafting reports, with analysts making the decisions.',
        ],
      },
      {
        heading: "Getting started in a small team",
        body: [
          "You don't need a 24/7 security operations centre to run good SecOps. A small team can get far with cloud-native detection services, a managed detection and response partner for out-of-hours cover, and clear on-call arrangements shared with engineering.",
          "Focus on the basics that catch most real attacks: protected audit logs, alerts on identity anomalies and privilege changes, and a rehearsed plan for credential leaks and ransomware. Add sophistication only when the basics run smoothly.",
        ],
      },
    ],
    practice: [
      'Centralise audit and identity logs in an account or project nobody can modify.',
      'Enable cloud-native threat detection in every account and route alerts to a named team.',
      'Write a one-page incident response plan and run a tabletop exercise this quarter.',
      'Tune the noisiest detection rules and write runbooks for the five most common alerts.',
      'Enrich alerts with owner, recent changes and exposure automatically.',
      'Run a purple-team exercise against your top threat scenario.',
    ],
    mistakes: [
      'Collecting every log but writing no useful detections.',
      'An incident plan that has never been rehearsed.',
      'Alert fatigue: so many low-value alerts that real ones are missed.',
      'Keeping security findings away from the engineers who could fix them.',
    ],
    measures: [
      'Mean time to detect and mean time to contain.',
      'Detection coverage mapped to MITRE ATT&CK techniques.',
      'Share of alerts that were actionable.',
      'Incident review actions completed on time.',
    ],
    related: [assess, playbook, { label: 'Incident Review Toolkit', to: '/explore/toolkits/incident-review' }, mm('ooda-loop', 'OODA Loop'), mm('blameless-post-mortem', 'Blameless Post-mortem'), mm('asymmetric-warfare', 'Asymmetric Warfare')],
  },

  'container-security': {
    path: '/secops/container-security',
    title: 'Container Security',
    subtitle: 'Securing Docker and Kubernetes workloads through build, deploy and runtime.',
    description: 'A practical guide to container and Kubernetes security: minimal images, scanning, signing, admission control, runtime detection and secure cluster configuration.',
    parent,
    intro: [
      'Containers make it easy to ship software consistently, and just as easy to ship vulnerabilities consistently. A single base image with an outdated library can end up in hundreds of services. Container security is about controlling what goes into images, what is allowed to run, and what it is allowed to do once running.',
      'Kubernetes adds its own layer: cluster configuration, permissions and network policies all affect how far an attacker could move if one workload were compromised.',
    ],
    sections: [
      {
        heading: 'Build: secure images',
        body: [
          'Start from minimal, trusted base images such as distroless or slim variants, and keep them up to date. Scan every image for known vulnerabilities at build time and again regularly, because new CVEs are published every day. Never bake secrets into images.',
          'Generate an SBOM for each image and sign images so the cluster can verify where they came from.',
        ],
        terms: [
          ['Minimal base image', 'Fewer packages means fewer vulnerabilities and less for an attacker to use.'],
          ['Image signing', 'Cryptographic proof that an image came from your pipeline, for example with Sigstore Cosign.'],
        ],
      },
      {
        heading: 'Deploy: admission control',
        body: [
          'Admission controllers such as OPA Gatekeeper or Kyverno check every workload before it runs. Typical rules: no containers running as root, no privileged containers, images only from approved registries, signatures required, and resource limits set.',
          'Start in audit mode to see what would be blocked, fix the existing workloads, then switch to enforcement.',
        ],
      },
      {
        heading: 'Runtime: detect and contain',
        body: [
          'Runtime tools such as Falco watch system calls and process activity for suspicious behaviour, like a shell spawned inside a container or unexpected writes to the file system. Network policies limit which pods can talk to each other, so a compromised workload can\'t reach everything.',
          'Combine runtime detection with fast response: the ability to isolate or kill a pod and redeploy a clean version within minutes.',
        ],
      },
      {
        heading: 'Cluster and supply-chain hygiene',
        body: [
          'Keep Kubernetes versions supported, restrict access to the API server, use role-based access control with least privilege, and prefer workload identity over long-lived credentials. Managed services such as EKS, AKS, GKE or Cloud Run take some of this burden off your team.',
          'Supply-chain frameworks such as SLSA describe levels of build integrity. Even reaching the first levels, with scripted builds and provenance, closes many common attack paths.',
        ],
      },
      {
        heading: "Who owns what",
        body: [
          "Container security works best when responsibilities are clear. The platform team owns base images, cluster configuration, admission policies and runtime detection. Application teams own their dependencies, their own image layers and fixing vulnerabilities in their services within agreed times.",
          "Make this visible on a simple dashboard per team: vulnerable images, policy violations and age of base images. Teams fix what they can see, and a little friendly comparison between teams often helps.",
        ],
      },
    ],
    practice: [
      'Standardise on a small set of minimal, regularly rebuilt base images.',
      'Scan images in the pipeline and on a schedule in your registry.',
      'Run an admission controller in audit mode, fix violations, then enforce the top rules.',
      'Add network policies, starting with deny-by-default in sensitive namespaces.',
      'Deploy runtime detection on production clusters and route alerts to the owning team.',
      'Sign images and verify signatures at admission.',
    ],
    mistakes: [
      'Scanning images once at build and never again.',
      'Running containers as root because it was the default.',
      'Flat cluster networking where every pod can reach every other pod.',
      'Storing secrets in images or environment files committed to Git.',
    ],
    measures: [
      'Critical vulnerabilities in running images, and time to patch.',
      'Share of workloads passing admission policies.',
      'Share of namespaces with network policies.',
      'Age of base images in production.',
    ],
    related: [playbook, { label: 'Cloud Security', to: '/secops/cloud-security' }, { label: 'Terraform & Bicep templates', to: '/architecture/iac-templates' }, mm('swiss-cheese-model', 'Swiss Cheese Model'), mm('default-status', 'Default Status'), mm('redundancy', 'Redundancy')],
  },

  'sast-dast': {
    path: '/secops/sast-dast',
    title: 'SAST and DAST',
    subtitle: 'Static and dynamic analysis: what each finds, where it fits in the pipeline, and how to make findings useful.',
    description: 'SAST, DAST, SCA and IAST compared: what each finds, strengths and limits, popular tools, where to run them and how to keep false positives under control.',
    parent,
    intro: [
      'Application security testing comes in several flavours, and each sees the code from a different angle. Static analysis reads the code; dynamic analysis attacks the running application; composition analysis checks the libraries you depend on. None of them is enough alone, and together they catch most common vulnerabilities before release.',
      'The hard part is rarely buying a scanner. It is tuning it so developers trust the results and fix them quickly.',
    ],
    sections: [
      {
        heading: 'Static analysis (SAST)',
        body: [
          'SAST examines source code, bytecode or binaries without running them, looking for patterns such as SQL injection, unsafe deserialisation or hard-coded secrets. Because it runs on code, it can give feedback in the IDE or on every pull request, which is the cheapest point to fix a flaw.',
          'Its weakness is false positives: SAST cannot always tell whether a risky path is reachable. Tuning rules and suppressing known-safe patterns is essential.',
        ],
        terms: [
          ['Strengths', 'Early feedback, points to the exact line, works before the app can run.'],
          ['Limits', 'False positives, blind to runtime configuration. Tools: Semgrep, CodeQL, SonarQube, Checkmarx, Fortify.'],
        ],
      },
      {
        heading: 'Dynamic analysis (DAST)',
        body: [
          'DAST tests a running application from the outside, as an attacker would: sending crafted requests, probing authentication and looking for misconfigurations. It finds issues that only appear at runtime, such as missing security headers, weak session handling or exposed endpoints.',
          'DAST needs a deployed environment and takes longer, so it usually runs against staging before release or on a schedule. Tools include OWASP ZAP, Burp Suite and commercial platforms.',
        ],
      },
      {
        heading: 'SCA and IAST',
        body: [
          'Most code in a modern application comes from open-source libraries. Software composition analysis checks those dependencies against vulnerability databases and licence rules, and tools like Dependabot or Renovate can raise update pull requests automatically.',
          'Interactive testing (IAST) instruments the application during functional tests, combining some benefits of SAST and DAST with fewer false positives, at the cost of more setup.',
        ],
      },
      {
        heading: 'Making findings actionable',
        body: [
          'Findings should land where developers work: as pull-request comments, not emailed reports. Each one should explain the risk and how to fix it. Prioritise by exploitability and exposure, not just severity scores: a critical issue in an internal tool may matter less than a high one on a public login page.',
          'AI can now suggest fixes for many common findings. Treat these suggestions like any other code change: reviewed, tested and scanned again.',
        ],
      },
      {
        heading: "Choosing tools",
        body: [
          "Start with what integrates well with your source control and pipelines, and what your developers will actually read. Many platforms now bundle SAST, SCA and secret scanning, such as GitHub Advanced Security or GitLab Ultimate, which reduces integration work.",
          "Run a short trial on two or three real repositories and judge tools on accuracy, speed, fix guidance and how well they fit the developer workflow, not on the length of their rule list.",
        ],
      },
    ],
    practice: [
      'Enable SCA and automated dependency updates on every repository.',
      'Add SAST to pull requests for critical services, running in report-only mode for a few weeks.',
      'Tune the rules, then block merges on critical findings.',
      'Run DAST against staging before each release, or nightly.',
      'Feed findings into the same backlog and fix-time targets as other defects.',
      'Review tool effectiveness every quarter: findings fixed, false-positive rate, developer feedback.',
    ],
    mistakes: [
      'Running every scanner at full sensitivity and drowning developers in noise.',
      'Sending findings to a security team inbox instead of to the owning developers.',
      'Ignoring dependency updates until a major vulnerability forces a rushed upgrade.',
      'Relying on DAST alone, which finds problems late.',
    ],
    measures: [
      'Time to fix findings by severity.',
      'False-positive rate as reported by developers.',
      'Share of dependencies on supported, patched versions.',
      'Vulnerabilities found in production that a scanner should have caught.',
    ],
    related: [playbook, { label: 'Continuous Security', to: '/secops/continuous-security' }, assess, mm('false-positives-and-false-negatives', 'False Positives and Negatives'), mm('pareto-principle', 'Pareto Principle'), mm('feedback-loops', 'Feedback Loops')],
  },

  principles: {
    path: '/secops/principles',
    title: 'Security Principles',
    subtitle: 'The foundational ideas behind every secure system: CIA, defence in depth, least privilege and zero trust.',
    description: 'Core security principles explained for engineering leaders: the CIA triad, defence in depth, least privilege, zero trust, secure by default and assume breach.',
    parent,
    intro: [
      'Tools and threats change constantly, but the principles of secure design have stayed remarkably stable. Teams that understand them make better decisions in situations no policy anticipated, which is most of the time in a fast-moving cloud environment.',
      'These principles are not just for security specialists. Every architect, engineer and product owner makes decisions that affect them.',
    ],
    sections: [
      {
        heading: 'The CIA triad',
        body: ['Every security control protects at least one of three properties. Naming which one helps you choose the right control and explain the trade-offs.'],
        terms: [
          ['Confidentiality', 'Only authorised people and systems can see the data.'],
          ['Integrity', 'Data and systems are accurate and haven\'t been tampered with.'],
          ['Availability', 'Systems and data are there when legitimate users need them.'],
        ],
      },
      {
        heading: 'Defence in depth and least privilege',
        body: [
          'No single control is perfect, so layer them: identity, network, application, data and monitoring. If one fails, others still stand between an attacker and what matters.',
          'Least privilege means every person, service and AI agent has only the access it needs, for only as long as it needs it. It limits the damage from mistakes and compromised accounts, and it is one of the most effective controls you can apply.',
        ],
      },
      {
        heading: 'Zero trust',
        body: [
          'Zero trust replaces "trusted inside, untrusted outside" with "never trust, always verify". Every request is authenticated, authorised and evaluated in context (who, what device, what resource, how sensitive) regardless of where it comes from.',
          'In practice, zero trust is a direction rather than a product: strong identity, device posture, fine-grained authorisation and good logging, introduced step by step.',
        ],
        terms: [
          ['Assume breach', 'Design as if an attacker is already inside: limit movement, detect quickly, recover fast.'],
          ['Secure by default', 'The default configuration is the secure one; insecure options require deliberate choice.'],
        ],
      },
      {
        heading: 'Principles in the AI era',
        body: [
          'AI assistants and agents need the same principles. Give them their own identities with scoped, short-lived permissions, keep a full audit trail of what they do, and never let an agent approve its own changes. Treat prompts and retrieved documents as untrusted input that could carry instructions.',
          'Data classification becomes even more important: decide what each AI tool may read, and enforce it technically.',
        ],
      },
      {
        heading: "Applying principles in everyday decisions",
        body: [
          "Principles are most useful in the small decisions teams make every day: whether a service needs write access to a database, whether a debug endpoint should exist in production, whether a new integration needs a shared key or its own identity.",
          "A simple habit helps. In design and code reviews, ask which principle a choice supports or weakens. Over time the principles become part of how the team thinks, rather than a page in a policy document.",
        ],
      },
    ],
    practice: [
      'Use the CIA triad in design reviews to name what each control protects.',
      'Map your layers of defence for a critical service and look for single points of failure.',
      'Review privileged access quarterly and remove what isn\'t used.',
      'Introduce just-in-time access for production administration.',
      'Make secure settings the defaults in templates and golden paths.',
      'Give every automated system and AI agent its own scoped identity.',
    ],
    mistakes: [
      'Relying on the network perimeter as the main control.',
      'Granting broad permissions "temporarily" and never removing them.',
      'Treating zero trust as a product to buy rather than a set of changes to make.',
      'Leaving AI agents running with a human administrator\'s credentials.',
    ],
    measures: [
      'Number of standing privileged accounts, trending down.',
      'Share of access that is just-in-time or time-limited.',
      'Share of services meeting secure-by-default baselines.',
      'Time to revoke access when someone leaves or a key leaks.',
    ],
    related: [assess, { label: 'Cloud Security', to: '/secops/cloud-security' }, { label: 'Threat Modelling', to: '/secops/threat-modeling' }, mm('swiss-cheese-model', 'Swiss Cheese Model'), mm('default-status', 'Default Status'), mm('inversion', 'Inversion')],
  },

  'cloud-security': {
    path: '/secops/cloud-security',
    title: 'Cloud Security',
    subtitle: 'Securing identity, networks, data and configuration in AWS, Azure and Google Cloud.',
    description: 'Cloud security essentials: the shared responsibility model, identity and access, network controls, data protection, posture management and landing zones.',
    parent,
    intro: [
      'Most cloud breaches don\'t involve clever exploits. They come from misconfiguration: a storage bucket left public, an overly broad role, a leaked access key, a database open to the internet. The good news is that these are preventable with sound defaults, automation and regular checks.',
      'Cloud security is also a shared effort. Your provider secures the platform; you secure what you build and configure on it.',
    ],
    sections: [
      {
        heading: 'The shared responsibility model',
        body: [
          'The provider is responsible for security of the cloud: data centres, hardware, the hypervisor and managed service internals. You are responsible for security in the cloud: identities, data, network configuration, operating systems you manage, and application code. The split shifts with the service type: you manage more with virtual machines and less with serverless.',
        ],
      },
      {
        heading: 'Identity is the new perimeter',
        body: [
          'In the cloud, whoever has the right credentials can reach almost anything. Enforce MFA and single sign-on for people, remove long-lived access keys in favour of workload identity, and apply least privilege to every role. Access analysers in each cloud can show which permissions are actually used.',
        ],
        terms: [
          ['Workload identity', 'Short-lived credentials issued to services and pipelines (for example GitHub OIDC to cloud roles) instead of stored keys.'],
          ['Break-glass access', 'A tightly controlled emergency account, monitored and rarely used.'],
        ],
      },
      {
        heading: 'Network and data protection',
        body: [
          'Segment networks with virtual networks, subnets and security groups, expose only what must be public, and put web applications behind a WAF. Prefer private endpoints for managed services.',
          'Encrypt data at rest and in transit by default, manage keys with a key management service, and classify data so the most sensitive information gets the strongest controls. Back up critical data and test restores.',
        ],
      },
      {
        heading: 'Posture management and landing zones',
        body: [
          'Cloud security posture management tools such as Defender for Cloud, Security Hub or Security Command Center continuously check your configuration against benchmarks like CIS. A landing zone gives every new account or subscription a secure baseline: logging, guardrail policies, network layout and identity set up from the start.',
          'Policy as code (Azure Policy, AWS SCPs, GCP organisation policies) turns key rules into preventive controls rather than findings to chase.',
        ],
      },
      {
        heading: "Multi-cloud and regulated environments",
        body: [
          "Many enterprises run more than one cloud, often for good reasons. Keep the principles and policies the same everywhere, but implement them with each provider's native controls. A central posture tool that covers all your clouds gives a single view of risk.",
          "In regulated industries, map cloud controls to your frameworks (ISO 27001, SOC 2, PCI DSS, or sector rules) once, and collect evidence automatically. Auditors increasingly accept continuous, automated evidence in place of screenshots and spreadsheets.",
        ],
      },
    ],
    practice: [
      'Enforce MFA and SSO for all human access, and remove shared accounts.',
      'Replace pipeline access keys with workload identity federation.',
      'Turn on posture management and fix the critical findings first.',
      'Apply preventive policies for the top risks: public storage, open management ports, missing encryption.',
      'Centralise audit logs in a protected account.',
      'Build or adopt a landing zone so new environments start secure.',
    ],
    mistakes: [
      'Assuming the provider handles security that is actually your responsibility.',
      'Long-lived access keys in CI systems and developer laptops.',
      'Fixing posture findings by hand without preventing them coming back.',
      'Allowing every team to create accounts without a secure baseline.',
    ],
    measures: [
      'Posture score against CIS or your chosen benchmark.',
      'Number of long-lived access keys, trending to zero.',
      'Critical misconfigurations open, and time to fix.',
      'Share of accounts or subscriptions on the landing-zone baseline.',
    ],
    related: [assess, playbook, { label: 'Terraform & Bicep templates', to: '/architecture/iac-templates' }, mm('default-status', 'Default Status'), mm('the-map-is-not-the-territory', 'The Map Is Not the Territory'), mm('forcing-function', 'Forcing Function')],
  },

  automation: {
    path: '/secops/automation',
    title: 'Security Automation',
    subtitle: 'Scaling security through code, orchestration and AI, so people can focus on judgement.',
    description: 'Security automation explained: SOAR, IaC scanning, policy and compliance as code, automated remediation, and how AI is changing security operations.',
    parent,
    intro: [
      'Security teams are almost always outnumbered by the systems and changes they need to protect. Automation is how they keep up: repetitive checks, enrichment and first responses happen in seconds, and people spend their time on investigation, design and decisions.',
      'The guiding idea is simple: automate the predictable, and give humans the context to handle the unpredictable.',
    ],
    sections: [
      {
        heading: 'SOAR: orchestration and response',
        body: [
          'Security orchestration, automation and response platforms run playbooks when alerts fire: enriching an alert with asset owner and recent changes, checking indicators against threat intelligence, or taking a first containment step such as disabling a key or isolating a host.',
          'Start with enrichment, which is low risk and saves analysts time on every alert. Add automated containment only for well-understood, high-confidence cases.',
        ],
      },
      {
        heading: 'Infrastructure and policy as code',
        body: [
          'Scanning Terraform, Bicep and CloudFormation before deployment (with tools like Checkov, tfsec or Trivy) catches insecure configurations such as public buckets or open security groups before they exist. Policy as code with Open Policy Agent, Sentinel or cloud-native policies enforces rules consistently across every environment.',
        ],
        terms: [
          ['Compliance as code', 'Controls expressed as executable rules, with evidence collected automatically for audits.'],
          ['Auto-remediation', 'Automatically fixing known, low-risk drift, such as re-enabling encryption, with a record of what changed.'],
        ],
      },
      {
        heading: 'AI in security operations',
        body: [
          'AI is now useful for summarising alerts, correlating weak signals into incidents, explaining unfamiliar log entries, and drafting investigation notes and reports. It can also suggest fixes for code and configuration findings.',
          'Keep humans in charge of consequential decisions. Let AI assist with diagnosis and drafting, keep detection rules deterministic, and allow automated actions only through pre-approved, reversible playbooks.',
        ],
      },
      {
        heading: 'Designing automation safely',
        body: [
          'Automation can amplify mistakes as quickly as it fixes problems. Test playbooks against realistic data, add rate limits and approval steps for destructive actions, log every automated action, and make it easy to roll back.',
          'Review automations regularly: retire those that no longer fire, and tune those that act on false positives.',
        ],
      },
      {
        heading: "Where to start",
        body: [
          "Pick work that is high volume, low risk and well understood. Alert enrichment, ticket creation, evidence collection and dependency updates are good first candidates. Measure the time spent on them before you automate, so you can show the benefit afterwards.",
          "Then move to preventive automation: policies and pipeline checks that stop problems from being created in the first place. Prevention scales better than any amount of response automation.",
        ],
      },
      {
        heading: "Building trust in automation",
        body: [
          "Security automation only helps if people trust it. Start in a mode where automations recommend and humans approve, and track how often the recommendation was right. Once the accuracy is high and the action is reversible, let it run on its own.",
          "Share the results openly with engineering teams, especially when automation catches something real. Visible wins build support for the next step.",
        ],
      },
    ],
    practice: [
      'Identify the five alert types analysts handle most often.',
      'Automate enrichment for those alerts first: owner, asset, recent deployments, exposure.',
      'Add IaC scanning to every infrastructure pipeline and block critical findings.',
      'Express your top ten cloud rules as policy as code.',
      'Automate one low-risk containment action with a clear rollback.',
      'Introduce AI summaries for high-severity alerts, with analysts confirming conclusions.',
    ],
    mistakes: [
      'Automating complex, high-impact responses before simple enrichment.',
      'Automations that nobody owns or monitors.',
      'Letting AI take containment actions without guardrails.',
      'Measuring the number of playbooks rather than time saved and incidents contained.',
    ],
    measures: [
      'Analyst time saved per alert type.',
      'Mean time to contain for automated versus manual cases.',
      'Share of infrastructure changes scanned before deployment.',
      'Automation errors or rollbacks, kept near zero.',
    ],
    related: [playbook, { label: 'Cognitive DevSecOps', to: '/secops/cognitive-devsecops' }, { label: 'AI-Native SDLC Field Guide', to: '/ai-sdlc/field-guide' }, mm('forcing-function', 'Forcing Function'), mm('use-checklists', 'Use Checklists'), mm('leverage', 'Leverage')],
  },

  'threat-modeling': {
    path: '/secops/threat-modeling',
    title: 'Threat Modelling',
    subtitle: 'Finding design flaws before writing a line of code, with STRIDE and a few good questions.',
    description: 'A practical guide to threat modelling: the four key questions, STRIDE, data-flow diagrams, prioritising risks, and making it a lightweight habit for every team.',
    parent,
    intro: [
      'Threat modelling is the cheapest security activity there is. An hour with a whiteboard during design can prevent a flaw that would cost weeks to fix after release, or a breach that costs far more. It doesn\'t require specialist tools or a security degree, just a structured way of thinking about what could go wrong.',
      'The best threat models are small, frequent and owned by the team building the system, with security specialists as coaches rather than gatekeepers.',
    ],
    sections: [
      {
        heading: 'Four questions',
        body: ['Most threat-modelling methods boil down to four questions, popularised by Adam Shostack.'],
        terms: [
          ['What are we working on?', 'Sketch the system: components, data flows and trust boundaries.'],
          ['What can go wrong?', 'Use a structure like STRIDE to find threats systematically.'],
          ['What are we going to do about it?', 'Mitigate, accept, transfer or avoid each threat.'],
          ['Did we do a good job?', 'Review the model as the design changes, and after incidents.'],
        ],
      },
      {
        heading: 'STRIDE',
        body: ['STRIDE is a checklist of six threat types. Walk each data flow and trust boundary through it.'],
        terms: [
          ['Spoofing', 'Pretending to be someone or something else. Countered by authentication.'],
          ['Tampering', 'Modifying data or code. Countered by integrity checks and access control.'],
          ['Repudiation', 'Denying an action took place. Countered by logging and audit trails.'],
          ['Information disclosure', 'Exposing data to the wrong people. Countered by encryption and authorisation.'],
          ['Denial of service', 'Making the system unavailable. Countered by rate limits, scaling and resilience.'],
          ['Elevation of privilege', 'Gaining more access than allowed. Countered by least privilege and input validation.'],
        ],
      },
      {
        heading: 'Prioritising what you find',
        body: [
          'Not every threat needs a fix. Rate each one by likelihood and impact, consider existing controls, and focus on the few that matter most. Record accepted risks with an owner and a review date so they don\'t quietly become permanent.',
        ],
      },
      {
        heading: 'Threat modelling for AI features',
        body: [
          'AI features bring new threats: prompt injection through user input or retrieved documents, data leakage through model responses, agents taking unintended actions, and over-reliance on unverified output. Add these to your checklist for any feature that uses a model or an agent.',
          'AI can also help with threat modelling itself, by drafting a first list of threats from a design document. Treat that as a starting point for the team\'s discussion, not the answer.',
        ],
      },
      {
        heading: "Making it a habit",
        body: [
          "Threat modelling sticks when it is quick and expected. Keep a standard template, timebox sessions to under an hour, and hold them whenever a design introduces a new data flow, a new external integration, or a new kind of user.",
          "Security champions are ideal facilitators. They know the system, can run the session without waiting for a specialist, and can escalate the genuinely difficult questions.",
        ],
      },
    ],
    practice: [
      'Add a short threat-model section to your design or spec template.',
      'For each new service or major change, sketch the data flows and trust boundaries in 15 minutes.',
      'Walk each boundary through STRIDE as a team.',
      'Record the top threats, their mitigations and owners in the spec.',
      'Turn key mitigations into tests or policy checks where possible.',
      'Revisit the model when the design changes significantly or after an incident.',
    ],
    mistakes: [
      'Treating threat modelling as a one-off document for a review board.',
      'Making models so detailed that nobody keeps them up to date.',
      'Leaving it to the security team alone.',
      'Ignoring new threat types introduced by AI features.',
    ],
    measures: [
      'Share of new services and major changes with a threat model.',
      'Design-level vulnerabilities found later in testing or production.',
      'Time from design to completed threat model.',
      'Accepted risks reviewed on schedule.',
    ],
    related: [playbook, { label: 'Architecture Decisions Toolkit', to: '/explore/toolkits/architecture-decisions' }, { label: 'Security Principles', to: '/secops/principles' }, mm('inversion', 'Inversion'), mm('pre-mortem', 'Pre-mortem'), mm('fmea', 'FMEA')],
  },

  'devsecops-practices': {
    path: '/secops/devsecops-practices',
    title: 'DevSecOps Practices',
    subtitle: 'Integrating security into every step of the software lifecycle, without slowing delivery down.',
    description: 'Practical DevSecOps practices: shift left, pre-commit hooks, IDE feedback, dependency scanning, security champions, paved roads and measuring security in delivery.',
    parent,
    intro: [
      'DevSecOps is the idea that security is everyone\'s job, built into how software is designed, written, tested and run, rather than checked at the end by a separate team. When it works, teams ship faster and more securely at the same time, because problems are found when they are small.',
      'The practices below are the ones that consistently make the biggest difference, roughly in the order most organisations adopt them.',
    ],
    sections: [
      {
        heading: 'Shift left, sensibly',
        body: [
          'Moving security earlier means feedback arrives while developers still have context. But shifting left should not mean shifting all the work onto developers. Give them fast, accurate tools and clear guidance, and keep specialists available for the hard problems.',
        ],
        terms: [
          ['Pre-commit hooks', 'Catch secrets and obvious mistakes before code leaves the developer\'s machine.'],
          ['IDE integration', 'Real-time feedback on vulnerable patterns while writing code.'],
          ['Dependency scanning', 'Automatic checks and update pull requests for vulnerable open-source libraries.'],
        ],
      },
      {
        heading: 'Security champions',
        body: [
          'A security champion is an engineer in a product team with an interest in security and some extra training. Champions translate security standards into everyday decisions, spot issues in reviews, and are the first point of contact for their team. A good programme gives them time, recognition and a community with other champions.',
        ],
      },
      {
        heading: 'Paved roads',
        body: [
          'The most effective security control is a secure default. Templates, golden pipelines and shared libraries with security built in mean teams get authentication, logging, scanning and safe configuration without having to think about it.',
          'When the paved road is the easiest way to build, most teams stay on it, and security improves without a single extra policy.',
        ],
      },
      {
        heading: 'Collaboration over gates',
        body: [
          'Security teams succeed when they act as partners: joining design reviews early, explaining risks in business terms, and helping teams fix issues rather than simply reporting them. Gates still matter for critical risks, but they should be few, predictable and automated.',
        ],
      },
      {
        heading: "Measuring DevSecOps",
        body: [
          "Measure security in the same conversations as delivery. Time to fix vulnerabilities, vulnerabilities escaping to production and coverage of scanning sit naturally alongside lead time and change failure rate.",
          "Watch for trade-offs. If security gates are adding days to lead time, look for ways to make them faster or move them earlier. If delivery is fast but vulnerabilities pile up, rebalance priorities. The aim is to improve both together.",
        ],
      },
      {
        heading: "Common starting points",
        body: [
          "Organisations at the start of DevSecOps get the most from three things: secret scanning everywhere, dependency updates automated, and security built into a golden pipeline for new services. Together they remove a large share of common risk with little friction.",
          "Once those are in place, threat modelling, policy as code and runtime security build on a solid base.",
        ],
      },
    ],
    practice: [
      'Turn on secret scanning and dependency updates across all repositories.',
      'Add security checks to the golden pipeline so new services get them by default.',
      'Recruit one security champion per team and give them time for the role.',
      'Add a threat-model section to design templates.',
      'Agree severity rules and fix times with engineering leadership.',
      'Review security metrics alongside delivery metrics every month.',
    ],
    mistakes: [
      'Buying tools before agreeing who will act on their findings.',
      'Champions in name only, with no time or support.',
      'Gates that block for minor issues and slow delivery.',
      'Measuring security separately from delivery, so trade-offs stay hidden.',
    ],
    measures: [
      'Time to fix vulnerabilities by severity.',
      'Share of services on the secure paved road.',
      'Vulnerabilities found in production versus earlier stages.',
      'Lead time and change failure rate alongside security metrics.',
    ],
    related: [playbook, { label: 'Continuous Security', to: '/secops/continuous-security' }, assess, mm('default-status', 'Default Status'), mm('incentives', 'Incentives'), mm('kaizen', 'Kaizen')],
  },

  'cognitive-devsecops': {
    path: '/secops/cognitive-devsecops',
    title: 'Cognitive DevSecOps',
    subtitle: 'Using generative AI to make the security lifecycle more intelligent, while keeping humans in charge of decisions.',
    description: 'Cognitive DevSecOps: how generative AI adds context-aware analysis, auto-remediation, intelligent triage and feedback loops to DevSecOps, and the guardrails it needs.',
    parent,
    intro: [
      'Traditional DevSecOps relies on static rules and known signatures. That works well for known problems, but struggles with novel vulnerabilities, complex architectural flaws and the sheer volume of findings modern pipelines produce. Cognitive DevSecOps adds AI that understands context: what the code is meant to do, how it is deployed, and which findings actually matter.',
      'It is the security strand of the CognitiveOps Model: moving from manual and automated security towards intelligent and, eventually, partly autonomous security, with humans governing above the loop.',
    ],
    sections: [
      {
        heading: 'What AI adds',
        body: ['Four capabilities make the biggest difference today.'],
        terms: [
          ['Contextual awareness', 'Understanding business logic and data flows, so it can spot flaws that pattern-matching scanners miss.'],
          ['Auto-remediation', 'Suggesting fixes as pull requests the moment a vulnerability is found, rather than just raising an alert.'],
          ['Intelligent triage', 'Filtering false positives and ranking findings by exploitability and exposure, reducing alert fatigue.'],
          ['Feedback loops', 'Learning from production telemetry and past incidents to improve detection and prioritisation over time.'],
        ],
      },
      {
        heading: 'From rules to reasoning, with guardrails',
        body: [
          'AI is probabilistic, so it needs deterministic guardrails around it. Keep detection thresholds and policy checks as code; use AI to explain, prioritise and propose. Every AI-suggested fix goes through the same review, tests and scans as human code.',
          'Give AI agents their own scoped identities, log everything they do, and never let them approve or merge their own changes.',
        ],
      },
      {
        heading: 'New risks to manage',
        body: [
          'AI tools themselves create risks: prompt injection, leakage of sensitive code or data to external services, insecure AI-generated code, and over-trust in confident but wrong answers. Address these with data-handling rules, enterprise AI services with appropriate terms, input and output filtering, and evaluation of AI behaviour over time.',
        ],
      },
      {
        heading: 'A practical maturity path',
        body: [
          'Most organisations move through stages: AI assists individuals (explaining findings, drafting fixes); AI is embedded in pipelines (triage, summarised reviews); AI acts within limits (pre-approved remediation of low-risk issues); and finally AI and humans run a closed loop where incidents automatically become improved controls.',
          'Move up only when the guardrails, measurement and trust from the previous stage are in place.',
        ],
      },
      {
        heading: "Where it fits in the CognitiveOps Model",
        body: [
          "The CognitiveOps Model describes four layers: manual, automated, intelligent and cognitive. Cognitive DevSecOps lives in the top two. It assumes the automated layer, with scanning, policy as code and pipelines, is already in place, and adds AI on top to reason about context and act within limits.",
          "That is why the basics matter so much: AI amplifies whatever foundations it sits on. Strong foundations become smarter; weak ones become faster at producing noise.",
        ],
      },
    ],
    practice: [
      'Start with AI explanations and fix suggestions for SAST and dependency findings.',
      'Add AI-assisted triage to rank findings, and measure how often analysts agree.',
      'Write your secure-coding standards as instructions for AI coding assistants.',
      'Back those instructions with hooks and policy checks that block unsafe changes.',
      'Pilot automated fixes for low-risk issues, such as dependency updates, with full review.',
      'Feed incident lessons back into detection rules and AI instructions.',
    ],
    mistakes: [
      'Letting AI close findings or approve fixes without human review.',
      'Sending sensitive code or data to AI services without checking data-handling terms.',
      'Measuring AI by volume of suggestions rather than vulnerabilities actually fixed.',
      'Skipping the basics, such as scanning and policy as code, in favour of AI.',
    ],
    measures: [
      'Time to fix vulnerabilities before and after AI assistance.',
      'Share of AI-suggested fixes accepted after review.',
      'False-positive rate after AI triage.',
      'Analyst time spent per high-severity alert.',
    ],
    related: [{ label: 'CognitiveOps Model', to: '/cognitiveops' }, { label: 'AI-Native SDLC Field Guide', to: '/ai-sdlc/field-guide' }, playbook, { label: 'CognitiveOps Assessment', to: '/cognitiveops/assessment' }, mm('swiss-cheese-model', 'Swiss Cheese Model'), mm('second-order-thinking', 'Second-Order Thinking')],
  },
};
