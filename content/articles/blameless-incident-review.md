---
title: How to Run a Blameless Incident Review That Actually Prevents the Next Outage
subtitle: A five-step method for turning outages into lasting improvements, with an agenda you can use at your next review.
slug: blameless-incident-review
tag: DevOps
date: 2026-11-24
image: 1558494949-ef010cbdcc31
keywords: incident review, blameless post-mortem, SRE, root cause analysis, incident management, 5 whys, fishbone diagram
---

## Why most incident reviews don't change anything
Most teams hold some kind of review after a serious outage. Far fewer can point to a review that stopped the same failure happening again. The usual pattern is familiar: a meeting a week or two later, a hunt for the change that triggered it, a long list of actions, and a document nobody reads. Three months later a slightly different version of the same failure takes the service down again.

The problem is rarely effort. It is method. Reviews that stop at the trigger ("a bad config was pushed") miss the more useful questions: why was it possible to push it, why did it spread so far, and why did it take so long to notice? Reviews that name individuals guarantee that people share less next time. And reviews that produce twenty actions usually deliver none of them.

A good incident review is a small, repeatable practice. It starts from facts, looks for several contributing causes rather than one culprit, picks a few actions that matter, and checks later that they worked. The [Incident Review Toolkit](/explore/toolkits/incident-review) sets this out step by step; this article explains the thinking behind each step.

## The five steps {grid}
- **Stabilise first:** During the incident, act in short loops of observe, orient, decide and act. Restore service before diagnosing, and keep a scribe so the notes from the incident channel become the raw material for the review.
- **Timeline before the meeting:** The facilitator builds a timeline from alerts, logs, deployments and chat before anyone meets. The meeting starts from shared facts rather than competing memories, which saves time and reduces defensiveness.
- **Contributing causes:** Map possible causes across people, process, tools and environment with a fishbone diagram, use 5 Whys on the strongest branches, and ask which defences, such as review, tests, canaries and alerts, failed to catch the problem.
- **A few owned actions:** Rank candidate actions by impact and effort and keep three to five. Each has one owner, a date and a way to check it worked. Fewer actions that happen beat a long list that doesn't.
- **Close the loop:** Turn the lesson into something the system remembers: a test, an alert, a guardrail, a runbook entry, or an evaluation for an AI feature. Check the actions a month later and share what you learned with other teams.

## What "blameless" really means
Blameless does not mean nobody is accountable. It means the review asks how the system allowed a reasonable person to make that mistake, rather than who made it. People act on the information, tools and pressures they have at the time. If a single engineer could take down production with one command, the problem is the system that made that possible.

A useful test is the substitution test: would another competent engineer, in the same situation with the same information, plausibly have done the same thing? If the answer is yes, blaming the individual teaches the organisation nothing. It also teaches everyone else to share less in the next review, which makes the next incident harder to learn from.

In practice, this means keeping names out of the write-up, describing decisions in terms of what people knew at the time, and treating "human error" as the start of the analysis rather than the conclusion.

## Look for several causes, not one root
Complex systems rarely fail for a single reason. An outage usually needs several things to go wrong at once: a risky change, a gap in testing, an alert that didn't fire, a runbook that was out of date. The Swiss cheese model is a helpful picture: each defence has holes, and an incident happens when the holes line up.

That is why the review should ask about every layer that could have caught the problem, not only the one that failed first. Strengthening any one of those layers makes the whole system more resilient, and often the cheapest fix is not at the point where the failure started. Faster detection, for example, can shrink the impact of a whole class of failures.

## Before the review {checklist}
- **Timeline Ready:** Timestamps for impact start, detection, mitigation and resolution, built from logs and chat.
- **Right People:** The responders, the owners of affected services and a neutral facilitator.
- **Data Shared:** Dashboards, deployment history and customer impact shared ahead of the meeting.
- **Ground Rules:** Everyone knows the review is blameless and focused on the system.
- **Time Boxed:** Sixty to ninety minutes, within five working days of the incident.
- **Write-up Owner:** One person owns the write-up and the follow-up on actions.

## Common pitfalls {callout}
These are the patterns that make reviews feel busy but change nothing:
- **Stopping at the Trigger:** Naming the change that broke things, without asking why it was possible or why it spread.
- **Too Many Actions:** A long list of actions without owners or dates, most of which never happen.
- **Naming People:** Blame in the write-up, which guarantees less honesty in the next review.
- **No Follow-up:** Never checking whether the actions were completed or whether they worked.
- **Reviewing Only Big Outages:** Near misses are cheaper lessons. Review them too, more briefly.

## Measuring whether reviews are working
Track a small set of signals over time: how quickly incidents are detected and resolved, how many incidents repeat a known pattern, and what share of review actions are completed on time. If repeat incidents are falling and detection is getting faster, the practice is working. If actions are routinely overdue, reduce how many you commit to.

For teams running AI features, add one more measure: whether each AI-related incident produced a new evaluation case, so the same failure is caught before release next time.

## FAQ {faq}
Q: How soon after an incident should the review happen?
A: Within five working days, while memories are fresh. For major incidents, a short initial review within a day or two can capture the timeline, followed by a fuller review once the data is gathered.

Q: Who should facilitate an incident review?
A: Ideally someone who was not directly involved in the incident, so they can ask neutral questions and keep the discussion focused on the system rather than individuals.

Q: What is the difference between a root cause and contributing causes?
A: A single root cause suggests one thing went wrong. In complex systems, incidents usually need several conditions at once. Looking for contributing causes across people, process and technology finds more useful improvements.

Q: Should near misses be reviewed?
A: Yes. Near misses show the same weaknesses as real incidents, without the customer impact. A short review of a near miss is one of the cheapest ways to prevent a future outage.

> An incident review is worth holding only if the system is harder to break afterwards.
