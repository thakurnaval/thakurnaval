---
title: How to Choose AI Use Cases That Make It to Production
subtitle: A five-step method for picking the AI ideas worth building, measuring them properly and stopping the rest early.
slug: choosing-ai-use-cases
tag: GenAI
date: 2026-11-24
image: 1677442136019-21780ecad995
keywords: AI use cases, generative AI adoption, AI pilots, GenAI strategy, AI governance, AI ROI, LLM use case selection
---

## The pilot problem
Most organisations have no shortage of AI ideas. The harder problem is choosing which ones to build, and getting them from pilot into production. Many companies have a long list of experiments, a few impressive demos and very little measurable value. Pilots run for months without a clear success measure, governance arrives late and blocks launch, and running costs appear only when usage grows.

The cause is usually the selection process, not the technology. Ideas are chosen because a tool is available or a leader is enthusiastic, rather than because they solve an important problem in a way AI is well suited to. Without a baseline, nobody can prove whether the pilot worked.

The [AI Use-Case Selection Toolkit](/explore/toolkits/ai-use-case-selection) gives a five-step method and a one-page use-case card. This article explains each step.

## The five steps {grid}
- **Start from Problems:** Collect ideas as problems people actually have: slow, repetitive, error-prone or expensive work. Phrase each as a question about the outcome, such as "How might we cut the time to answer support tickets?", not about a tool.
- **Check AI Fits:** Many problems are better solved with a rule, a form or a better process. AI suits tasks involving language, summarising or judgement, where a mostly-right answer that a person checks is still valuable.
- **Score Value and Risk:** Score each idea on business value, feasibility (data, integration and skills) and risk (data sensitivity, customer impact and regulation). Start with high value and feasibility, and manageable risk.
- **Measure the Baseline:** Before building, measure how the work performs today: time, error rate, cost and satisfaction. Agree the target and the result that would make you stop.
- **Pilot Small:** Release to a small group with evaluation in place, compare with the baseline, then scale, adjust or stop. Share the result either way.

## Is AI the right tool?
It is tempting to apply AI to every problem. But generative AI is probabilistic: it can be confidently wrong, its output varies, and it costs money every time it runs. For tasks with clear rules and structured data, traditional automation is usually cheaper, faster and more reliable.

AI earns its place where the work involves reading, writing, summarising, classifying or reasoning over text and images, and where a person can check the output or the cost of an occasional error is low. Drafting a reply that an agent reviews is a good fit. Making a final decision about a customer's loan without review usually isn't, at least not without strong controls.

A useful inversion is to ask: what would make this use case fail? Poor data, unclear ownership, users who don't trust the output, or a cost that grows faster than the value. If you can't address those, the idea is not ready.

## Baselines make value visible
The single most common reason pilots stall is that nobody measured the starting point. Without a baseline, "people like it" is the only evidence, and that rarely survives a budget review.

Measure the current process before you build: how long a task takes, how often it happens, how often it goes wrong, and what it costs. Then agree a target and a date. This doesn't need to be elaborate; a sample of fifty tasks timed by hand is often enough. It turns the pilot into an experiment with a clear answer.

## The use-case card {checklist}
- **Problem:** Who has it, how often, and what it costs today.
- **AI Role:** What the model does, and what a person still does.
- **Owner:** One named person accountable for the outcome.
- **Baseline and Target:** Today's measure, the target and the date.
- **Data and Risk:** Data sources, sensitivity, permission and the AI policy risk tier.
- **Cost and Stop Rule:** Expected running cost at full scale, and the result that would stop the work.

## Common pitfalls {callout}
These are the patterns that keep AI programmes stuck between pilot and production:
- **Tool First:** Choosing a model or vendor and then searching for a problem.
- **No Baseline:** Pilots that can never prove they worked.
- **Late Governance:** Legal and security review at the end, where it blocks launch.
- **Hidden Running Cost:** Ignoring cost per request until usage grows.
- **Sunk Cost:** Keeping a failing pilot alive because of the effort already spent.

## Governance that helps
Governance works best when it is part of selection rather than a gate at the end. A simple risk tiering, where low-risk internal tools can move quickly and customer-facing or high-impact uses get more controls, lets most teams proceed while protecting what matters. Including the risk tier on the use-case card makes the conversation happen early, when the design can still change.

Once a few use cases have reached production, the shared pieces, such as evaluation tooling, prompt management, guardrails and cost tracking, become a platform that makes the next ones faster.

## FAQ {faq}
Q: How do you choose which AI use cases to pursue first?
A: Score ideas on business value, feasibility and risk. Start with use cases that solve a real, measurable problem, have the data they need, and carry manageable risk.

Q: Why do so many AI pilots fail to reach production?
A: Common reasons are missing baselines, unclear ownership, governance arriving too late, unexpected running costs and users who don't trust the output.

Q: What should be measured in an AI pilot?
A: The same measures as the baseline: time per task, error rate, cost and user satisfaction, plus model-specific measures such as answer quality and the share of output people accept without changes.

Q: When should an AI pilot be stopped?
A: When it fails to beat the baseline on the agreed measure, when running costs exceed the value, or when risks cannot be controlled. Agreeing the stop rule up front makes this decision easier.

> Pick the problem first, measure where you start, and let the evidence decide what scales.
