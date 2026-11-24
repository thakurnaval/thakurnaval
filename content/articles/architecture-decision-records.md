---
title: Making Better Architecture Decisions, and Writing Them Down
subtitle: A practical method for framing, comparing and recording architecture decisions, with a ready-to-use ADR template.
slug: architecture-decision-records
tag: Architecture
date: 2026-11-24
image: 1454165804606-c3d57bc86b40
keywords: architecture decision records, ADR, software architecture, technical decisions, one-way door decisions, pre-mortem, system design
---

## Why architecture decisions go wrong
Most painful architecture problems were not caused by a lack of skill. They were caused by decisions made implicitly: a database chosen because one engineer knew it, a service split because microservices were fashionable, or a non-functional requirement nobody wrote down until the system was in production. Months later, nobody remembers why things are the way they are, and every change starts with an argument about history.

Good architecture decisions have three things in common. The real need is understood before options are compared. Several options are considered, including doing nothing. And the decision is recorded, with its reasons, so people who join later can understand it, challenge it and change it when circumstances change.

The [Architecture Decisions Toolkit](/explore/toolkits/architecture-decisions) gives a five-step method and a template. This article explains why each step matters.

## The five steps {grid}
- **Frame the decision:** Write down the decision in one sentence and decide whether it is a one-way door, hard to reverse, or a two-way door that can be changed cheaply. One-way doors deserve care; two-way doors deserve speed.
- **Understand the real need:** Ask what problem this solves, for whom, and how you will know it worked. Capture the non-functional requirements, such as load, latency, availability, security and cost, as numbers where possible.
- **Generate options:** List at least three options, including the simplest one that could work and doing nothing. Compare them against weighted criteria so the trade-offs are visible.
- **Stress-test the favourite:** Run a short pre-mortem: imagine the decision failed a year from now and ask why. Look at second-order effects, such as new skills needed, new things to operate and new costs.
- **Record and revisit:** Write an Architecture Decision Record with the context, options, decision and consequences. Set a review date or a trigger that would make you revisit it.

## One-way and two-way doors
Not every decision deserves the same effort. Choosing a logging library is easy to change later; choosing a primary database or a cloud provider is not. Treating every decision as a one-way door slows teams down and pushes decisions up to committees. Treating every decision as a two-way door leads to expensive surprises.

Ask one question early: what would it cost to reverse this in a year? If the answer is "a few days", decide quickly, record it briefly and move on. If the answer is "a migration project", slow down, involve more people and do the full process. Many decisions can also be made more reversible, for example by putting an interface in front of a vendor or running a time-boxed trial before committing.

## Making trade-offs visible
Most architecture debates are really disagreements about priorities that nobody has said out loud. One person cares most about speed of delivery, another about operational simplicity, a third about cost. A weighted decision matrix makes those priorities explicit: list the criteria, agree weights, then score each option.

The scores are less important than the conversation they force. Arguing about whether security should weigh five or three is more productive than arguing about whether option A or B is "better". And when the decision is recorded, the weights explain why it made sense at the time.

## What a good ADR contains {checklist}
- **Clear Title:** A short statement of the decision, numbered so it can be referenced.
- **Context:** The problem, the constraints and the forces at play, including non-functional requirements.
- **Options Considered:** At least three, with honest pros and cons for each.
- **Decision:** What was chosen, by whom, and on what date.
- **Consequences:** What becomes easier, what becomes harder, and what new risks or costs appear.
- **Review Trigger:** A date or condition that would prompt the team to revisit the decision.

## Common pitfalls {callout}
These patterns undermine even well-intentioned decision processes:
- **Solution First:** Starting with a technology and working backwards to justify it.
- **Only One Option:** A "decision" with no alternatives is a proposal, not a decision.
- **Missing Numbers:** Non-functional requirements written as "fast" or "highly available" instead of measurable targets.
- **Write-only ADRs:** Records that nobody reads because they are stored far from the code.
- **Never Revisiting:** Treating past decisions as permanent even after the context has changed.

## Keeping ADRs useful
Store ADRs in the repository next to the code they affect, in plain text, so they are versioned and reviewed like any other change. Keep them short: one or two pages is enough. When a decision is replaced, don't delete the old record; mark it as superseded and link to the new one. The history of why things changed is often as useful as the current state.

ADRs also help AI coding assistants. When decisions and their reasons are in the repository, assistants can follow them instead of suggesting patterns the team has already rejected.

## FAQ {faq}
Q: What is an Architecture Decision Record?
A: A short document that records an important architecture decision: the context, the options considered, the decision made and its consequences. It helps future team members understand why the system is built the way it is.

Q: Which decisions need an ADR?
A: Decisions that are hard to reverse, affect several teams, or will be questioned later, such as choosing a database, splitting a service or adopting a new platform. Small, easily reversed choices usually don't need one.

Q: Where should ADRs be stored?
A: In the repository alongside the code, usually in a docs/adr folder, so they are versioned, reviewed and easy to find.

Q: How long should an ADR be?
A: One to two pages. The goal is to capture the reasoning, not to write a full design document.

> The best architecture decision is one the next engineer can understand, challenge and change.
