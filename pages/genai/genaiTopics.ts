import type { TopicContent } from '../../components/TopicArticle';

const parent = { label: 'GenAI', to: '/genai' };
const mm = (anchor: string, label: string) => ({ label: `Mental model: ${label}`, to: `/explore/mental-models#${anchor}` });
const assess = { label: 'GenAI Readiness Assessment', to: '/genai/assessment' };
const framework = { label: 'GenAI Adoption Framework (free PDF)', to: '/genai/adoption-framework' };

export const GENAI_TOPICS: Record<string, TopicContent> = {
  fundamentals: {
    path: '/genai/fundamentals',
    title: 'GenAI Fundamentals',
    subtitle: 'How large language models work, what they are good at, and where they fall short.',
    description: 'Generative AI fundamentals for engineering leaders: tokens, context windows, how LLMs generate text, strengths and limits, model choices and cost.',
    parent,
    intro: [
      'Large language models can draft code, summarise documents, answer questions and reason through problems in plain language. Understanding a few fundamentals makes it much easier to use them well: what they actually do, why they sometimes get things confidently wrong, and what drives their cost and speed.',
      'You don\'t need to be a machine-learning specialist to lead AI adoption. You do need a clear mental model of the technology, so you can ask good questions of vendors and teams.',
    ],
    sections: [
      {
        heading: 'How a language model works',
        body: [
          'At its core, a generative language model is a prediction engine. It has been trained on vast amounts of text to predict the most likely next piece of text, given everything before it. Repeating that prediction many times produces sentences, code and answers. Further training with human feedback teaches models to follow instructions and be helpful.',
        ],
        terms: [
          ['Tokens', 'The units of text a model reads and writes. Roughly, 1,000 tokens is about 750 English words. Models are priced and limited by tokens.'],
          ['Context window', 'How much text the model can consider at once, its working memory. Modern models handle hundreds of thousands of tokens.'],
          ['Temperature', 'How much randomness is used when choosing the next token. Lower is more predictable; higher is more varied.'],
        ],
      },
      {
        heading: 'What models are good at',
        body: [
          'Language models excel at transforming and generating text: drafting, summarising, translating, classifying, extracting structured data, writing and explaining code, and reasoning step by step through problems. They are especially useful where a good first draft saves time and a person reviews the result.',
        ],
      },
      {
        heading: 'Where they fall short',
        body: [
          'Models can produce fluent, confident answers that are wrong, often called hallucinations. They only know what was in their training data and what you put in the context, so they can be out of date or unaware of your organisation\'s specifics. Their output varies between runs, which makes testing different from traditional software.',
          'Most practical techniques, such as retrieval-augmented generation, evaluation sets and human review, exist to manage these limits.',
        ],
      },
      {
        heading: 'Choosing models',
        body: [
          'Options range from frontier models offered as services by providers such as Anthropic, OpenAI and Google, to open-weight models you can host yourself. Choose based on quality for your task, cost, speed, data-handling terms and where the model can run. Many teams use a capable model for complex tasks and a smaller, cheaper one for simple, high-volume work.',
        ],
      },
      {
        heading: 'Cost and speed',
        body: [
          'Cost is driven by tokens in and out, and by model size. Long prompts, large retrieved documents and verbose answers all add up. Caching repeated content, trimming prompts and choosing the smallest model that meets your quality bar can cut costs dramatically. Latency matters too: users notice the difference between one second and ten.',
        ],
      },
    ],
    practice: [
      'Give teams access to an approved enterprise AI tool with clear data-handling terms.',
      'Run hands-on sessions with real work examples from each function.',
      'Pick a few use cases where a draft plus human review saves real time.',
      'Build a small evaluation set of real examples for each use case.',
      'Compare two or three models on that set for quality, cost and speed.',
      'Share what works in a common library of prompts and patterns.',
    ],
    mistakes: [
      'Treating model output as fact without verification.',
      'Assuming the model knows your internal systems and data.',
      'Choosing the largest model for every task regardless of cost.',
      'Judging a model on a handful of impressive demos rather than a proper evaluation.',
    ],
    measures: [
      'Share of staff actively using approved AI tools.',
      'Time saved on target tasks, against a baseline.',
      'Quality on your evaluation sets per model.',
      'Cost per task or per user.',
    ],
    related: [assess, framework, { label: 'Prompt Engineering', to: '/genai/prompt-engineering' }, mm('the-map-is-not-the-territory', 'The Map Is Not the Territory'), mm('falsification-confirmation-bias', 'Confirmation Bias'), mm('circle-of-competence', 'Circle of Competence')],
  },

  'prompt-engineering': {
    path: '/genai/prompt-engineering',
    title: 'Prompt Engineering',
    subtitle: 'Writing instructions that get reliable, useful results from language models.',
    description: 'Practical prompt engineering: clear instructions, context, examples, chain of thought, structured output, system prompts, and testing prompts like code.',
    parent,
    intro: [
      'A prompt is the instruction and context you give a model. Small changes in wording, structure or examples can change the quality of the result a great deal. Prompt engineering is the practice of writing prompts that are clear, specific and reliable, and of testing them like any other part of a system.',
      'Good prompts look a lot like good briefs to a capable colleague: what you want, why, what good looks like, and what to avoid.',
    ],
    sections: [
      {
        heading: 'Core techniques',
        body: ['A few techniques cover most needs.'],
        terms: [
          ['Clear instructions', 'Say exactly what you want, the audience, the format and any constraints.'],
          ['Zero-shot', 'Asking for a task without examples: "Classify this ticket as bug, feature or question."'],
          ['Few-shot', 'Including a few examples of input and desired output to guide format and judgement.'],
          ['Step-by-step reasoning', 'Asking the model to think through a problem before answering, which helps on complex tasks.'],
        ],
      },
      {
        heading: 'Context is everything',
        body: [
          'Models only know what is in their training data and the prompt. Provide the relevant context: the document to summarise, the code to review, the policy to apply, the definitions your organisation uses. Clearly separate instructions from content, for example with headings or tags, so the model knows which is which.',
        ],
      },
      {
        heading: 'Structured output',
        body: [
          'When another system will use the result, ask for a defined structure such as JSON with specified fields, and validate it. Many model APIs now support structured output directly, which makes integration far more reliable than parsing free text.',
        ],
      },
      {
        heading: 'System prompts and roles',
        body: [
          'In applications, a system prompt sets the model\'s role, rules and boundaries for every conversation. Keep it focused: who the assistant is for, what it should and shouldn\'t do, the tone, and how to handle uncertainty, such as saying "I don\'t know" rather than guessing.',
        ],
      },
      {
        heading: 'Treat prompts like code',
        body: [
          'Prompts that run in production should be version-controlled, reviewed and tested against an evaluation set before changes go live. A wording change that improves one case can break another. Keep a record of which prompt version produced which results, so problems can be traced and rolled back.',
          'Prompts are also an attack surface. User input and retrieved documents can contain instructions that try to override yours, so never put secrets in prompts and treat external content as untrusted.',
        ],
      },
      {
        heading: "Prompts for coding agents",
        body: [
          "Coding assistants and agents respond to the same principles, applied to a repository. Give them a context file with build and test commands, conventions and known pitfalls; ask for a plan before they change code; and state a checkable definition of done, such as \"all tests in this folder pass\".",
          "The clearer the goal and the faster the agent can check its own work, the better the result, often in a single pass.",
        ],
      },
    ],
    practice: [
      'Write the prompt as a brief: task, audience, context, format, constraints.',
      'Add two or three examples for tasks that need a specific format or judgement.',
      'Separate instructions from content clearly.',
      'Ask for structured output when another system consumes the result.',
      'Build an evaluation set of 20–50 real cases and test every prompt change against it.',
      'Version prompts in source control alongside the code that uses them.',
    ],
    mistakes: [
      'Vague prompts that leave the model guessing what good looks like.',
      'Changing production prompts without testing.',
      'Putting secrets or sensitive data in prompts unnecessarily.',
      'Trying to fix every problem with longer prompts instead of better context or a different approach.',
    ],
    measures: [
      'Pass rate on the evaluation set for each prompt version.',
      'Share of outputs needing human correction.',
      'Tokens per request, as a cost and latency indicator.',
      'Incidents caused by prompt changes.',
    ],
    related: [framework, { label: 'LLMOps', to: '/genai/llmops' }, { label: 'AI-Native SDLC Field Guide', to: '/ai-sdlc/field-guide' }, mm('working-backwards', 'Working Backwards'), mm('scientific-method', 'Scientific Method'), mm('use-checklists', 'Use Checklists')],
  },

  rag: {
    path: '/genai/rag',
    title: 'RAG Architecture',
    subtitle: 'Retrieval-augmented generation: grounding AI answers in your own trusted data.',
    description: 'How retrieval-augmented generation works: ingestion, chunking, embeddings, retrieval, generation with citations, access control, evaluation and common pitfalls.',
    parent,
    intro: [
      'Language models don\'t know your internal documents, policies or data, and they can make things up when they don\'t know. Retrieval-augmented generation (RAG) solves this by finding the most relevant pieces of your trusted content and giving them to the model along with the question, so the answer is grounded in real sources.',
      'RAG is often the first serious enterprise AI pattern teams build, because it delivers value quickly without training a model.',
    ],
    sections: [
      {
        heading: 'The pipeline',
        body: ['A RAG system has two halves: preparing the knowledge, and answering questions with it.'],
        terms: [
          ['Ingestion', 'Collect documents from sources such as wikis, PDFs, tickets and databases, and keep them in sync.'],
          ['Chunking', 'Split documents into passages small enough to retrieve precisely, while keeping enough context.'],
          ['Embedding and indexing', 'Convert chunks into vectors that capture meaning, and store them in a vector index.'],
          ['Retrieval', 'Find the most relevant chunks for a question, often combining semantic and keyword search.'],
          ['Generation', 'Give the retrieved chunks and the question to the model, and ask it to answer with citations.'],
        ],
      },
      {
        heading: 'Quality comes from retrieval',
        body: [
          'Most RAG problems are retrieval problems: the right passage wasn\'t found, or too much irrelevant text was included. Improvements usually come from better chunking, hybrid search, reranking the results, adding metadata filters, and cleaning up the source content itself.',
        ],
      },
      {
        heading: 'Security and access control',
        body: [
          'A RAG system must never show someone content they aren\'t allowed to see. Carry permissions from the source systems into the index, and filter retrieval by the user\'s access. Classify sensitive data and decide whether it belongs in the index at all.',
          'Retrieved documents can contain text that tries to give the model instructions. Treat them as untrusted content, not as commands.',
        ],
      },
      {
        heading: 'Evaluating RAG',
        body: [
          'Build an evaluation set of real questions with expected answers and the sources that should support them. Measure retrieval (were the right passages found?) and generation (was the answer correct, complete and grounded in those passages?). Tools such as RAGAS help, and so does regular review by subject-matter experts.',
        ],
      },
      {
        heading: 'RAG, fine-tuning or long context?',
        body: [
          'RAG is best when knowledge changes often or must be cited. Fine-tuning helps when you need a specific style, format or domain behaviour. Very long context windows let you include whole documents for some tasks, at higher cost per request. Many systems combine these approaches.',
        ],
      },
      {
        heading: "Keeping the knowledge fresh",
        body: [
          "A RAG system is only as current as its index. Schedule re-ingestion, remove documents when they are retired at the source, and show the last-updated date with each citation so users can judge freshness.",
          "Give each knowledge domain an owner who reviews poor answers and fixes the underlying content. Often the best improvement to a RAG system is a better source document.",
        ],
      },
    ],
    practice: [
      'Choose one well-defined knowledge domain with an owner, such as IT policies or runbooks.',
      'Clean up and de-duplicate the source content before indexing it.',
      'Build the pipeline with permissions carried through from the source.',
      'Require citations in every answer so users can check the source.',
      'Create an evaluation set of 30–50 real questions and measure retrieval and answer quality.',
      'Add feedback buttons and review poor answers weekly.',
    ],
    mistakes: [
      'Indexing everything, including outdated and contradictory documents.',
      'Ignoring access control, so the assistant leaks restricted content.',
      'Blaming the model for answers that are really retrieval failures.',
      'Launching without an evaluation set, so quality can\'t be tracked.',
    ],
    measures: [
      'Retrieval hit rate: share of questions where the right source was found.',
      'Answer accuracy and groundedness on the evaluation set.',
      'User feedback and repeat usage.',
      'Cost and latency per answer.',
    ],
    related: [assess, framework, { label: 'LLMOps', to: '/genai/llmops' }, mm('the-map-is-not-the-territory', 'The Map Is Not the Territory'), mm('law-of-large-numbers', 'Law of Large Numbers'), mm('sturgeons-law', "Sturgeon's Law")],
  },

  llmops: {
    path: '/genai/llmops',
    title: 'LLMOps',
    subtitle: 'Operating language-model applications reliably: evaluation, monitoring, cost and change control.',
    description: 'LLMOps explained: the GenAI application stack, evaluation and regression testing, prompt and model versioning, observability, cost control and safe releases.',
    parent,
    intro: [
      'Building an impressive AI demo takes a day. Running an AI feature reliably for thousands of users, as models, prompts and data change, takes discipline. LLMOps adapts MLOps and DevOps practices to applications built on language models.',
      'The central challenge is that outputs are probabilistic. You can\'t test them with simple assertions, so evaluation and monitoring become the backbone of operations.',
    ],
    sections: [
      {
        heading: 'The application stack',
        body: ['A typical GenAI application has a handful of layers, each needing its own operational care.'],
        terms: [
          ['Models', 'Hosted frontier models or self-hosted open-weight models, chosen per task.'],
          ['Retrieval and data', 'Vector or hybrid indexes, document pipelines and access control.'],
          ['Orchestration', 'Code or frameworks that chain prompts, tools and retrieval together.'],
          ['Guardrails', 'Input and output checks for safety, data leakage and format.'],
          ['Evaluation and observability', 'Test sets, scoring, tracing and dashboards.'],
        ],
      },
      {
        heading: 'Evaluation as the safety net',
        body: [
          'Build evaluation sets from real cases with expected outcomes, and score every change to prompts, models, retrieval or code against them before release. Use a mix of automated checks (format, factual matching, model-graded scoring) and human review for the cases that matter most. Add every production failure as a new test case.',
        ],
      },
      {
        heading: 'Versioning and change control',
        body: [
          'Version prompts, model choices, retrieval settings and evaluation sets together, so any result can be traced to the exact configuration that produced it. Release changes gradually, for example to a small share of users first, and keep rollback simple.',
          'Model providers update and retire models regularly. Pin versions where you can, and re-run evaluations before switching.',
        ],
      },
      {
        heading: 'Observability in production',
        body: [
          'Trace each request through retrieval, prompts, model calls and tools, recording latency, token usage and cost. Sample conversations for quality review, collect user feedback, and watch for drift: changes in the kinds of questions users ask, or in answer quality over time.',
        ],
      },
      {
        heading: 'Cost control',
        body: [
          'Track cost per request and per user from day one. Use caching, shorter prompts, smaller models for simple steps, and limits on usage. Set budgets and anomaly alerts, because a loop in an agent or a viral feature can multiply costs overnight.',
        ],
      },
      {
        heading: "Choosing build or buy",
        body: [
          "Much of the LLMOps stack is now available as managed services from cloud providers and specialist vendors: model hosting, vector search, evaluation, tracing and guardrails. Use them for commodity capabilities, and invest your own effort in evaluation sets, prompts and integrations that reflect your business.",
          "Whatever you choose, make sure you can export your evaluation data and traces. They are among your most valuable AI assets.",
        ],
      },
      {
        heading: "Team responsibilities",
        body: [
          "LLMOps works best as a shared platform with product teams on top. The platform team provides model access, evaluation tooling, tracing and guardrails; product teams own their prompts, evaluation sets and quality targets. Clear ownership prevents both duplication and gaps.",
        ],
      },
    ],
    practice: [
      'Create an evaluation set for each AI feature before it launches.',
      'Run evaluations automatically on every change to prompts, models or retrieval.',
      'Version prompts and configuration in source control.',
      'Add tracing with latency, tokens and cost for every request.',
      'Release changes to a small share of users first and compare quality.',
      'Review sampled conversations and user feedback every week.',
    ],
    mistakes: [
      'Changing prompts or models in production without evaluation.',
      'Monitoring only uptime and latency, not answer quality.',
      'Discovering cost problems from the monthly invoice.',
      'Letting a provider\'s model update change behaviour without noticing.',
    ],
    measures: [
      'Evaluation pass rate per release.',
      'User satisfaction and feedback rates.',
      'Cost and latency per request.',
      'Incidents caused by AI changes, and time to roll back.',
    ],
    related: [assess, { label: 'RAG Architecture', to: '/genai/rag' }, { label: 'AI-Native SDLC Field Guide', to: '/ai-sdlc/field-guide' }, mm('feedback-loops', 'Feedback Loops'), mm('goodharts-law', "Goodhart's Law"), mm('regression-to-the-mean', 'Regression to the Mean')],
  },

  agents: {
    path: '/genai/agents',
    title: 'AI Agents',
    subtitle: 'From chatbots that answer to agents that act: how agents work and how to deploy them safely.',
    description: 'AI agents explained: the reasoning and tool-use loop, common patterns, where agents add value, guardrails, permissions, evaluation and human oversight.',
    parent,
    intro: [
      'A chatbot answers questions. An agent takes action. Agents use a language model as a reasoning engine that decides which tools to use, such as searching, calling an API, running code or editing a file, to reach a goal over several steps.',
      'Agents can save enormous amounts of time on multi-step work. They also need careful design, because a system that can act can also act wrongly.',
    ],
    sections: [
      {
        heading: 'The agent loop',
        body: ['Most agents follow a loop often described as reason and act (ReAct).'],
        terms: [
          ['Think', 'The model reasons about the goal and what to do next: "I need today\'s error rate for the checkout service."'],
          ['Act', 'It calls a tool: query the metrics API for checkout errors.'],
          ['Observe', 'It reads the result: "Error rate 4.2%, up from 0.3% after the 14:00 deploy."'],
          ['Repeat or finish', 'It decides whether it has enough to answer, or needs another step.'],
        ],
      },
      {
        heading: 'Where agents add value',
        body: [
          'Agents shine on tasks with clear goals, available tools and checkable results: coding tasks with tests to run, incident diagnosis using logs and metrics, research across many documents, and routine operational workflows. They struggle with vague goals, missing tools and work where mistakes are costly and hard to detect.',
        ],
      },
      {
        heading: 'Guardrails and permissions',
        body: [
          'Give each agent its own identity with the minimum permissions it needs, ideally short-lived. Expose tools through allowlists, such as managed MCP servers, rather than broad shell access. Require human approval for consequential or irreversible actions, and log every action for audit.',
          'Treat everything an agent reads, including web pages, documents and tickets, as untrusted input that might contain instructions.',
        ],
      },
      {
        heading: 'Planning and review',
        body: [
          'For complex work, ask the agent for a written plan before it acts, review the plan, then let it execute. This catches misunderstandings early, when they are cheap to fix, and gives you a record to check the result against.',
        ],
      },
      {
        heading: 'Evaluating agents',
        body: [
          'Evaluate agents on complete tasks, not single responses: did the task get done correctly, safely and at reasonable cost? Keep a suite of representative tasks and re-run it whenever prompts, tools or models change. Track how often humans need to intervene.',
        ],
      },
      {
        heading: "Multi-agent systems",
        body: [
          "Some workflows use several agents: one plans, others carry out sub-tasks, and another reviews the result. This can improve quality on complex work, but it multiplies cost, latency and the number of things that can go wrong.",
          "Start with a single agent and good tools. Add more agents only when a specific limitation, such as a separate reviewer with a fresh context, clearly justifies it.",
        ],
      },
      {
        heading: "Agents in operations",
        body: [
          "In SRE and platform work, agents are most valuable for diagnosis: reading logs, metrics and recent changes when an alert fires, and proposing a likely cause and next step. Keep detection deterministic, keep the agent read-only by default, and let it act only through pre-approved runbooks such as a rollback.",
        ],
      },
    ],
    practice: [
      'Start with a well-defined task that has tools and a way to check the result.',
      'Give the agent a scoped identity and an allowlist of tools.',
      'Require a plan before action for anything non-trivial.',
      'Add human approval for actions that are risky or hard to undo.',
      'Build a task-level evaluation suite and run it on every change.',
      'Expand autonomy gradually as accuracy and trust are proven.',
    ],
    mistakes: [
      'Giving agents broad permissions or a human\'s credentials.',
      'Letting agents act on production without approval gates.',
      'Evaluating only single answers rather than whole tasks.',
      'Expanding autonomy faster than monitoring and trust.',
    ],
    measures: [
      'Task success rate on the evaluation suite.',
      'Human intervention rate.',
      'Cost and time per completed task.',
      'Incidents or policy violations caused by agents.',
    ],
    related: [{ label: 'AI-Native SDLC Field Guide', to: '/ai-sdlc/field-guide' }, assess, { label: 'AI Governance', to: '/genai/governance' }, mm('ooda-loop', 'OODA Loop'), mm('reversible-vs-irreversible-decisions', 'Reversible vs Irreversible Decisions'), mm('swiss-cheese-model', 'Swiss Cheese Model')],
  },

  governance: {
    path: '/genai/governance',
    title: 'AI Governance',
    subtitle: 'Making AI safe, fair, secure and compliant, without making it impossible to use.',
    description: 'Practical AI governance: acceptable-use policy, risk tiers, data privacy, prompt injection and security, bias and fairness, regulation such as the EU AI Act, and monitoring.',
    parent,
    intro: [
      'AI governance is about using AI responsibly: protecting data, managing risk, treating people fairly and meeting regulation. Done well, it speeds adoption, because people know what is allowed and teams can launch with confidence. Done badly, it either blocks everything or exists only on paper while shadow AI spreads.',
      'The key is proportion: light controls for low-risk uses, strong controls for high-risk ones.',
    ],
    sections: [
      {
        heading: 'Policy and risk tiers',
        body: [
          'Start with a short acceptable-use policy: approved tools, data that must not be shared, and when human review is required. Then classify use cases into risk tiers, with controls that match.',
        ],
        terms: [
          ['Low risk', 'Internal productivity with human review of every output, such as drafting and summarising.'],
          ['Medium risk', 'Internal decisions, or customer-facing content reviewed by a person.'],
          ['High risk', 'Customer-facing without review, regulated data, or automated decisions about people.'],
        ],
      },
      {
        heading: 'Data privacy',
        body: [
          'Make sure personal and confidential data isn\'t sent to services without appropriate terms. Use enterprise agreements with data-protection commitments, or models hosted in your own environment for the most sensitive data. Classify data and enforce what each AI tool may access, technically rather than only by policy.',
        ],
      },
      {
        heading: 'Security threats',
        body: [
          'Prompt injection, where attackers trick a model into ignoring instructions or revealing data, is the signature AI threat. Others include data leakage through responses, insecure AI-generated code, and agents misusing their permissions. Defend with input and output filtering, least-privilege access for tools and agents, and red-team testing.',
        ],
      },
      {
        heading: 'Bias, fairness and transparency',
        body: [
          'Test models for unfair outcomes across groups, especially where AI influences decisions about people. Tell users when they are interacting with AI, explain how outputs are used, and give them a way to challenge decisions.',
        ],
      },
      {
        heading: 'Regulation and standards',
        body: [
          'Regulation is arriving quickly. The EU AI Act sets obligations by risk level, and standards such as ISO/IEC 42001 describe an AI management system. Map your risk tiers and controls to these frameworks once, and collect evidence as you go rather than at audit time.',
        ],
      },
      {
        heading: "Making governance fast",
        body: [
          "Governance earns support when it is quick. Publish clear criteria for each risk tier, give low-risk use cases a same-week approval, and provide pre-approved patterns, such as an approved RAG architecture, that teams can reuse without a fresh review.",
          "Measure how long approvals take, and treat a slow process as a risk in itself, because it pushes people towards unapproved tools.",
        ],
      },
      {
        heading: "Who is involved",
        body: [
          "Effective AI governance brings together technology, security, legal, privacy and the business. A small standing group with clear decision rights works better than a large committee that meets monthly. Name an owner for each production AI use case who is accountable for its outcomes.",
        ],
      },
    ],
    practice: [
      'Publish a one-page acceptable-use policy and an approved tools list.',
      'Inventory current AI use, including unofficial use.',
      'Introduce a lightweight review that assigns each use case a risk tier.',
      'Apply technical controls for high-risk uses: data filtering, logging, access limits.',
      'Red-team high-risk applications before launch and after major changes.',
      'Review the policy every six months as tools and regulation change.',
    ],
    mistakes: [
      'Banning AI outright, which drives usage to unapproved tools.',
      'Governance documents with no technical enforcement.',
      'Applying the same heavy process to every use case regardless of risk.',
      'Ignoring AI-specific threats such as prompt injection.',
    ],
    measures: [
      'Share of AI use cases inventoried and tiered.',
      'Time to approve a new use case, by tier.',
      'Policy violations and AI-related incidents.',
      'Coverage of high-risk use cases by testing and monitoring.',
    ],
    related: [assess, framework, { label: 'AI Agents', to: '/genai/agents' }, { label: 'Privacy Policy (how this site handles data)', to: '/privacy' }, mm('second-order-thinking', 'Second-Order Thinking'), mm('unintended-consequences', 'Unintended Consequences')],
  },
};
