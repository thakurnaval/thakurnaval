---
title: Better Technical Reviews and Meetings: Decide More, Debate Less
subtitle: A simple structure for design reviews, architecture boards and adoption decisions that ends with a decision, not another meeting.
slug: better-technical-reviews-and-meetings
tag: Leadership
date: 2026-11-24
image: 1517245386807-bb43f82c33c4
keywords: technical reviews, design review, architecture review board, effective meetings, six thinking hats, decision making, pre-mortem
---

## The meeting that happens three times
Most engineers know the meeting. A design is presented, a few senior people share strong opinions, the discussion goes in circles, and it ends with "let's take it offline". A week later the same group meets again. Meanwhile the team waits, or quietly builds what it was going to build anyway.

Technical reviews matter. They catch risks early, spread knowledge and improve decisions. But badly run reviews cost a great deal of time and can make teams avoid asking for input at all. The difference is rarely the people in the room; it is the structure of the conversation.

The [Better Reviews and Meetings Toolkit](/explore/toolkits/reviews-and-meetings) gives a five-step method and a 45-minute agenda. This article explains why it works.

## The five steps {grid}
- **Decide if it needs a meeting:** Many reviews can happen asynchronously through a written document and comments. Meet only when a decision needs discussion, several perspectives must be reconciled, or the stakes are high.
- **Set purpose and owner:** Every review has one decision owner and a clear question to answer. Send a one-page pre-read at least a day ahead, so the meeting starts from shared understanding.
- **Explore in parallel:** Instead of debating, look at the proposal through one lens at a time: facts, benefits, alternatives, risks and gut feel. Everyone thinks in the same direction together, so the loudest voice doesn't dominate.
- **Surface risks early:** Run a short pre-mortem: imagine it is a year later and the decision failed. Ask why. This makes it safe to raise concerns that people might otherwise keep to themselves.
- **Decide and record:** End with a decision, or with a clear list of what is needed to decide. Record it with the reasoning, and spend the last two minutes on one improvement to the meeting itself.

## Why parallel thinking works
In a typical debate, one person argues for an idea while another argues against it. Each defends a position, and the discussion becomes about winning rather than understanding. Edward de Bono's Six Thinking Hats offers an alternative: the whole group looks at the same aspect at the same time.

First, everyone shares facts and data. Then everyone looks for benefits. Then alternatives. Then risks. Then a quick round of gut feel. The person most worried about risk gets their turn, but so does the person with a creative alternative, and neither drowns out the other. In practice, this often makes reviews shorter, because the group isn't revisiting the same arguments.

## Watch for anchoring and authority
When the most senior person speaks first, everyone else tends to adjust their views towards that opinion. This is anchoring, combined with authority bias, and it quietly removes the value of having several perspectives in the room.

Two simple habits help. Ask people to write down their view before anyone speaks, then share in turn. And ask the most senior person to speak last. Both cost nothing and noticeably improve the quality of input, especially from newer or quieter team members.

## A 45-minute review {checklist}
- **Pre-read Sent:** One page, a day ahead, with the decision needed and the owner.
- **Purpose First:** Five minutes on the question, the owner and how the decision will be made.
- **Facts Then Ideas:** Facts and clarifying questions first, then benefits and alternatives.
- **Risks Named:** A pre-mortem on the leading option before anyone commits.
- **Decision Recorded:** The decision, the reasoning and the owner written down before people leave.
- **Meeting Improved:** One change to make the next review better.

## Common pitfalls {callout}
These habits turn reviews into a drain on the team:
- **No Decision Owner:** Discussions that end with "let's take it offline" because nobody can decide.
- **Senior Voice First:** Opinions anchored by the most senior person in the room.
- **Debate Mode:** People defending positions instead of exploring the problem together.
- **Unwritten Decisions:** Decisions that are not recorded, so the same meeting happens again.
- **Review as Gate:** Reviews that only approve or block, rather than improving the design.

## Async first, meetings second
Many teams now default to written proposals with asynchronous comments, and meet only when the comments show real disagreement. This works especially well across time zones and gives people time to think. A short written decision record, such as an Architecture Decision Record, then captures the outcome.

AI assistants can help here too: summarising long comment threads, listing open questions, or drafting the decision record from the discussion. The decision itself should stay with the named owner.

## FAQ {faq}
Q: How long should a technical review meeting be?
A: Usually 30 to 45 minutes. If a review regularly needs longer, the pre-read may not be clear enough, or the decision may need to be split into smaller parts.

Q: What are the Six Thinking Hats?
A: A method by Edward de Bono where a group looks at a problem through one perspective at a time: facts, feelings, risks, benefits, creative alternatives and process. It replaces adversarial debate with parallel thinking.

Q: What is a pre-mortem?
A: A short exercise where the team imagines a decision has failed in the future and lists the reasons why. It surfaces risks that people might otherwise not mention.

Q: Who should own the decision in a design review?
A: One named person, usually the technical lead or architect responsible for the system. Others advise; the owner decides and records the reasoning.

> A good review ends with a decision and a reason, not with another meeting.
