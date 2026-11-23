# The Practitioner's 25 (draft for review)

A pinned shortlist for the top of [/explore/mental-models](https://nthakur.com/explore/mental-models): the 25 models an engineering leader reaches for most, each with a one-line **How I use it** in Naval's own words.

**Status:** draft. The shortlist and the "why" column are suggestions. The **How I use it** lines are placeholders written to show the tone; please replace each one with a real line from your own experience (one or two sentences, first person). Once you're happy with it, the list gets pinned at the top of the page.

**How to edit:** change the table below, delete rows you don't want, add any you do (the link is the model's name in lower case with hyphens). Aim for 25.

| # | Model | Why it's in the 25 | How I use it (placeholder: rewrite) |
| --- | --- | --- | --- |
| 1 | [Arguing from First Principles](https://nthakur.com/explore/mental-models#arguing-from-first-principles) | Cuts through "we've always done it this way" in transformations. | When a team says a process can't change, I ask what problem the step was originally solving, and whether that problem still exists. |
| 2 | [Second-Order Thinking](https://nthakur.com/explore/mental-models#second-order-thinking) | Most platform and tooling decisions fail on their second-order effects. | Before approving a new tool, I ask who will run it in two years and what it will cost them. |
| 3 | [Inversion](https://nthakur.com/explore/mental-models#inversion) | The fastest way to find risks nobody wants to say out loud. | I start programme kick-offs by listing everything that would guarantee failure. |
| 4 | [Systems Thinking](https://nthakur.com/explore/mental-models#systems-thinking) | DevOps, FinOps and SecOps problems are system problems, not people problems. | When a metric goes wrong, I look for the structure producing it before looking for someone to fix it. |
| 5 | [Feedback Loops](https://nthakur.com/explore/mental-models#feedback-loops) | The core of CI/CD, SRE and FinOps alike. | I judge a practice by how fast it tells a team they were wrong. |
| 6 | [Conway's Law](https://nthakur.com/explore/mental-models#conways-law) | Architecture and org design are the same decision. | I sketch the team structure next to the target architecture before any re-org or re-platform. |
| 7 | [Theory of Constraints](https://nthakur.com/explore/mental-models#theory-of-constraints) | Stops teams optimising the wrong step. | I find the one queue that work waits in longest and fix that first. |
| 8 | [Value Stream Mapping](https://nthakur.com/explore/mental-models#value-stream-mapping) | Makes waiting time visible to executives. | My first workshop with a new team maps idea-to-production with wait times on every step. |
| 9 | [Pareto Principle (80/20 Rule)](https://nthakur.com/explore/mental-models#pareto-principle) | Most cloud cost and most incidents come from a few sources. | I sort cloud spend and incident causes by size and work the top five first. |
| 10 | [Goodhart's Law](https://nthakur.com/explore/mental-models#goodharts-law) | Protects metric programmes like DORA from gaming. | I always pair a speed metric with a quality metric so neither can be gamed alone. |
| 11 | [OKRs (Objectives and Key Results)](https://nthakur.com/explore/mental-models#okrs) | Turns transformation goals into measurable outcomes. | I reject key results that are tasks; each one has to be an outcome we could measure. |
| 12 | [Cynefin Framework](https://nthakur.com/explore/mental-models#cynefin-framework) | Tells you whether to plan, analyse or experiment. | I use it to decide whether a problem needs an expert, a pilot or an immediate fix. |
| 13 | [Reversible vs Irreversible Decisions](https://nthakur.com/explore/mental-models#reversible-vs-irreversible-decisions) | Speeds up most decisions without adding risk. | I let teams decide reversible things on their own and slow down only for one-way doors. |
| 14 | [OODA Loop](https://nthakur.com/explore/mental-models#ooda-loop) | How good incident response actually works. | In incidents I push for a fast observe-orient-act cycle over a perfect diagnosis. |
| 15 | [Wardley Mapping](https://nthakur.com/explore/mental-models#wardley-mapping) | Shows what to build, buy or rent. | I map a platform before deciding where engineering time should go. |
| 16 | [5 Whys](https://nthakur.com/explore/mental-models#5-whys) | The simplest root-cause tool there is. | I keep asking why until the answer is something a team can change. |
| 17 | [Blameless Post-mortem](https://nthakur.com/explore/mental-models#blameless-post-mortem) | Without it, nobody tells you what really happened. | My first question in every review is "what made this easy to get wrong?" |
| 18 | [Pre-mortem](https://nthakur.com/explore/mental-models#pre-mortem) | Cheapest risk management available. | Before a migration, the team writes the failure story and turns each cause into a task. |
| 19 | [Swiss Cheese Model](https://nthakur.com/explore/mental-models#swiss-cheese-model) | Explains why layered controls beat one perfect gate. | I ask which other layer would have caught a failure, not just how to fix the one that missed it. |
| 20 | [Technical Debt](https://nthakur.com/explore/mental-models#technical-debt) | The language that gets engineering work funded. | I describe debt in terms of the interest the business pays: slower features, more incidents. |
| 21 | [Kaizen](https://nthakur.com/explore/mental-models#kaizen) | Sustains change after the transformation programme ends. | Every retrospective ends with one small improvement and an owner. |
| 22 | [Six Thinking Hats](https://nthakur.com/explore/mental-models#six-thinking-hats) | Keeps architecture reviews from becoming debates. | I run reviews one hat at a time so risk and ideas each get their turn. |
| 23 | [Circle of Competence](https://nthakur.com/explore/mental-models#circle-of-competence) | Knowing when to bring in an expert. | I'm explicit with teams about where my experience ends and theirs begins. |
| 24 | [Eisenhower Matrix](https://nthakur.com/explore/mental-models#eisenhower-matrix) | Protects important, non-urgent work like platform investment. | I block time weekly for one important, non-urgent item before the urgent ones arrive. |
| 25 | [Margin of Safety](https://nthakur.com/explore/mental-models#margin-of-safety) | Capacity, budgets and timelines all need headroom. | I plan capacity and delivery dates with explicit headroom instead of hoping nothing goes wrong. |

## Candidates if you want to swap any out

Kanban · Scrum · Lean Portfolio Management · Fishbone (Ishikawa) Diagram · Cost-benefit Analysis · Opportunity Costs · Sunk Cost Fallacy · Jobs To Be Done · Minimum Viable Product · Flywheel Effect · Antifragility · Directly Responsible Individual · Makers vs Manager's Schedule · Hanlon's Razor · Occam's Razor · Ikigai

## Next steps once this is final

1. Pin the 25 at the top of the mental models page, with your "How I use it" line on each card.
2. Write the fuller detail (when to use, how to apply, watch out for, related models) for these 25 first, then for the next ~15.
3. Group them into toolkit pages: incident review, architecture decisions, platform strategy, better reviews and meetings.
