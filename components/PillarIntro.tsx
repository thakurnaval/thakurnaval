import React from 'react';
import { Link } from 'react-router-dom';
import Section from './Section';

type Pillar = 'devops' | 'secops' | 'finops' | 'genai' | 'ai-sdlc' | 'architecture';

interface Intro {
  heading: string;
  paragraphs: string[];
  startHere: { label: string; to: string }[];
}

/** Long-form introduction for each main topic page: what it is, why now, where to start. */
const INTROS: Record<Pillar, Intro> = {
  devops: {
    heading: 'What DevOps really means',
    paragraphs: [
      'DevOps is a way of working in which the people who build software and the people who run it share responsibility for the whole journey from idea to production. It grew out of a simple observation: when development and operations work in separate silos with separate goals, releases become slow, risky events and problems bounce between teams.',
      'At its heart, DevOps is about shortening feedback loops. Small changes, merged often, tested automatically and released through a reliable pipeline, tell a team quickly whether something works. Observability and blameless reviews close the loop from production back to design. The DORA research programme has shown for years that teams working this way deploy more often and recover faster, while also breaking things less.',
      'Tools matter, but they come second. Organisations that buy a pipeline product without changing how teams collaborate usually get faster deployments of the same problems. The lasting gains come from culture, automation, lean flow, measurement and sharing, all together.',
      'Today DevOps is evolving in two directions. Platform engineering gives teams self-service paths so they don\'t each have to master every tool. And AI coding assistants and agents are making code cheaper to produce, which raises the value of everything that keeps change safe: tests, small batches, strong review and good observability.',
      'A useful way to begin is to measure where you are. The four DORA metrics (deployment frequency, lead time for changes, change failure rate and time to restore service) give a balanced picture of speed and stability. Measure them for one team, share the results without blame, and choose one constraint to improve each quarter.',
      'Change also needs leadership. Teams adopt new ways of working when leaders make time for improvement, reward learning from failure and stay patient while new habits form. Most successful DevOps journeys start small, with one willing team whose results persuade others.',
      'If you are new to this section, start with the practices and the maturity model to see where you are, then explore SRE, platform engineering and chaos engineering as your foundations strengthen.',
    ],
    startHere: [
      { label: 'Key DevOps practices', to: '/devops/practices' },
      { label: 'DevOps maturity model', to: '/devops/maturity' },
      { label: 'Site Reliability Engineering', to: '/devops/sre' },
    ],
  },
  secops: {
    heading: 'Security as part of everyday engineering',
    paragraphs: [
      'SecOps brings security and operations together so that protecting systems is part of how they are built and run every day, rather than a separate review at the end. Combined with DevSecOps practices in the delivery pipeline, it means vulnerabilities are found when they are cheap to fix, and attacks are detected and contained quickly when they happen.',
      'The threat landscape keeps shifting. Most cloud breaches still come from simple causes, such as leaked credentials, misconfigured storage and unpatched dependencies, which makes strong basics the most valuable investment: identity and least privilege, secure defaults, automated scanning, protected logs and a rehearsed incident response.',
      'Security teams are almost always outnumbered by the systems and changes they protect, so scale comes from automation and partnership. Policy as code, golden pipelines and security champions in product teams spread good practice far further than any central team could on its own.',
      'AI adds both help and new risks. It can triage alerts, explain findings and suggest fixes; it also introduces prompt injection, data leakage and agents that need careful permissions. The principles stay the same: least privilege, defence in depth, verification and a clear audit trail.',
      'Measurement keeps security honest. Track how long critical vulnerabilities stay open, what share of systems meet your baseline configuration, how quickly incidents are detected and contained, and how many findings developers fix without escalation. Trends matter more than single numbers.',
      'Culture matters as much as tools. When security is seen as a partner who helps teams ship safely, people report mistakes early and ask for advice before building. When it is seen as a gatekeeper, problems stay hidden until they become incidents. Clear guidance, fast answers and blameless reviews build the first kind of relationship.',
      'Compliance fits into the same picture. Frameworks such as ISO 27001, SOC 2 and PCI DSS are far easier to satisfy when controls are automated and evidence is collected continuously by pipelines and cloud platforms, rather than gathered by hand before each audit. Good security practice and compliance then reinforce each other instead of competing for time.',
      'If you are starting out, read the security principles and cloud security pages, then the DevSecOps practices and continuous security pages to see how checks fit into delivery.',
    ],
    startHere: [
      { label: 'Security principles', to: '/secops/principles' },
      { label: 'Cloud security', to: '/secops/cloud-security' },
      { label: 'DevSecOps practices', to: '/secops/devsecops-practices' },
    ],
  },
  finops: {
    heading: 'Why FinOps matters',
    paragraphs: [
      'In the cloud, every engineer can spend money with a line of code. That speed is the point of the cloud, but it breaks the old model of procurement approving spend months in advance. FinOps is the operating model that replaces it: engineering, finance and product working together, with near real-time data, to make good trade-offs between speed, cost and quality.',
      'FinOps is not cost-cutting. The goal is value: spending where it helps customers and the business, and nowhere else. Sometimes that means spending more, for example to launch faster or improve reliability. What matters is that the decision is deliberate and informed.',
      'The practice moves through three repeating phases. Inform gives teams visibility of their own costs and unit economics. Optimise removes waste and improves rates through rightsizing, scheduling and commitments. Operate builds the processes, automation and culture that keep it going.',
      'The scope keeps growing. SaaS licences, data platforms and AI services, where GPU capacity and token pricing can rise quickly, now belong in the same conversation as cloud infrastructure. The same principles apply: make cost visible, give teams ownership, and measure it against value.',
      'Ownership is the heart of it. When each team can see what its services cost, in its own dashboards and in terms it understands, people make better choices without being told. Central FinOps teams then focus on what teams can\'t do alone: negotiating commitments, setting policy, building tooling and sharing good practice.',
      'Progress is usually described as crawl, walk and run. You don\'t need to be mature everywhere at once. Most organisations start by getting allocation right, then tackle the largest sources of waste, and only later automate and forecast in depth.',
      'Forecasting and budgeting change too. Instead of a fixed annual number, teams forecast from usage trends and business drivers, set budgets with alerts, and explain variances quickly. Finance gains predictability, and engineers keep the freedom to move fast within agreed limits.',
      'If you are new to FinOps, start with the framework and cost visibility, then move to optimisation and unit economics as your allocation matures.',
    ],
    startHere: [
      { label: 'The FinOps Framework', to: '/finops/framework' },
      { label: 'Cost visibility and allocation', to: '/finops/cost-visibility' },
      { label: 'Unit economics', to: '/finops/unit-economics' },
    ],
  },
  genai: {
    heading: 'Generative AI for engineering leaders',
    paragraphs: [
      'Generative AI has moved from experiment to everyday tool in a remarkably short time. Language models now draft documents, write and review code, answer questions over internal knowledge, and increasingly act as agents that use tools to complete multi-step tasks. For engineering leaders, the question is no longer whether to adopt it, but how to do so safely and with measurable value.',
      'Value comes from use cases with a clear baseline and owner, built on governed data and evaluated properly. Many organisations get stuck between pilot and production: pilots without baselines can\'t prove value, governance arrives late and blocks launches, and every team rebuilds the same plumbing.',
      'The technical foundations are becoming clearer. Retrieval-augmented generation grounds answers in trusted data. LLMOps brings evaluation, versioning and monitoring to probabilistic systems. Agents add the ability to act, which makes permissions, guardrails and human oversight essential.',
      'Governance doesn\'t have to slow things down. A short acceptable-use policy, risk tiers with proportionate controls, and technical enforcement for the high-risk cases let most teams move quickly while protecting what matters.',
      'It helps to understand what these models are good and bad at. They are excellent at drafting, summarising, translating between formats and reasoning over text they are given. They can be confidently wrong, especially about facts outside their context, and their output varies from run to run. Good systems are designed around both: they give the model the right context, check its output, and keep people involved where errors are costly.',
      'Measurement is what separates successful programmes from expensive experiments. Set a baseline before you start, track a small number of outcome measures such as time saved, quality and customer satisfaction, and watch cost per task as usage grows. Retire use cases that don\'t deliver, and scale the ones that do.',
      'People matter as much as technology. Training, clear guidance on what is allowed, and a community where teams share prompts, patterns and lessons do more for adoption than any single tool. Leaders who use the tools themselves, and talk openly about what works and what doesn\'t, set the tone for everyone else.',
      'Cost deserves attention from the start, because usage grows quickly once a feature succeeds. Choosing the right model size for each task, caching common answers and tracking cost per task keep AI economics healthy.',
      'If you are getting started, read the fundamentals and prompt engineering pages, then RAG and LLMOps for building features, and governance and agents as adoption grows.',
    ],
    startHere: [
      { label: 'GenAI fundamentals', to: '/genai/fundamentals' },
      { label: 'RAG architecture', to: '/genai/rag' },
      { label: 'AI governance', to: '/genai/governance' },
    ],
  },
  'ai-sdlc': {
    heading: 'From AI-assisted to AI-native delivery',
    paragraphs: [
      'AI can now turn a clear plan into working, tested code in hours. Yet in most organisations the steps around coding, such as requirements, review, approvals and release, still run at the speed of meetings and handoffs. The bottleneck has moved from writing code to deciding, reviewing and releasing it.',
      'An AI-native software lifecycle keeps the controls organisations rely on (traceability, separation of duties, quality gates) and changes how they are enforced. Each stage leaves an artifact the next stage can act on: an intent document, a spec, a plan, the change and its tests, the review record, and the incident that starts the next loop. People move from doing every step to making the decisions that need judgement.',
      'Controls come in three kinds. Instructions and skills make the right behaviour likely; hooks, policy as code and permissions make the wrong behaviour impossible; and named people approve the decisions that need accountability. Agents can act up to the production gate, but not past it.',
      'The pages in this section walk through each stage, from requirements to monitoring, with practical steps, common mistakes and how to measure progress.',
    ],
    startHere: [
      { label: 'AI-Native SDLC Field Guide', to: '/ai-sdlc/field-guide' },
      { label: 'AI-powered coding', to: '/ai-sdlc/coding' },
      { label: 'AI in code review', to: '/ai-sdlc/code-review' },
    ],
  },
  architecture: {
    heading: 'Architecture that supports change',
    paragraphs: [
      'Software architecture is the set of decisions that are hard to change later: how a system is divided, how its parts communicate, where data lives, and how it handles failure, security and growth. Good architecture doesn\'t try to predict every future need. It keeps the important decisions explicit and makes the rest easy to change.',
      'Most architecture problems come from decisions made implicitly: technology chosen before requirements are clear, non-functional needs discovered after launch, or boundaries that don\'t match the teams who own them. A simple, repeatable design process, decision records and lightweight reviews prevent most of them.',
      'Cloud platforms have changed the economics. Managed services, elasticity and pay-as-you-go pricing make some designs far cheaper and others far more expensive than before, which is why cost now belongs in architecture reviews alongside reliability and security.',
      'AI is changing architecture too. Systems increasingly include models, retrieval pipelines and agents, each with new trust boundaries and failure modes. At the same time, AI assistants can help draft designs and spot risks, as long as people stay accountable for the decisions.',
      'Architects add the most value when they work alongside delivery teams rather than above them. Pairing on designs, reviewing early and turning repeated advice into reference architectures and paved paths spreads good decisions faster than any approval board.',
      'Good architecture is also measurable. Watch how long important decisions take, how often incidents trace back to design flaws, how much work is duplicated across teams, and how easily systems absorb new requirements. These signals show whether the architecture is helping or getting in the way.',
      'Documentation should stay light and current. A short design document, a few diagrams at the right level and a log of decision records explain a system far better than a large document nobody updates.',
      'If you are starting out, read the system design process and cloud architecture pages, then explore patterns, APIs, data and security as your designs grow.',
    ],
    startHere: [
      { label: 'The system design process', to: '/architecture/system-design-process' },
      { label: 'Cloud architecture', to: '/architecture/cloud-architecture' },
      { label: 'Security in system design', to: '/architecture/system-security' },
    ],
  },
};

const PillarIntro: React.FC<{ pillar: Pillar }> = ({ pillar }) => {
  const c = INTROS[pillar];
  return (
    <Section bg="white">
      <article className="max-w-3xl mx-auto text-slate-700 dark:text-slate-300 leading-relaxed">
        <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-white mb-5">{c.heading}</h2>
        {c.paragraphs.map(p => <p key={p.slice(0, 40)} className="mb-4">{p}</p>)}
        <p className="mt-6 font-semibold text-slate-900 dark:text-white">Start here:</p>
        <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
          {c.startHere.map(s => (
            <li key={s.to}><Link to={s.to} className="text-primary dark:text-secondary font-medium hover:underline">{s.label} →</Link></li>
          ))}
        </ul>
      </article>
    </Section>
  );
};

export default PillarIntro;
