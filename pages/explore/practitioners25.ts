/**
 * The Practitioner's 25: the mental models pinned at the top of /explore/mental-models,
 * in order, with Naval's "How I use it" note. Keys are the model anchors (see slugOf in
 * MentalModels.tsx). Source and history: Requirements/PRACTITIONERS_25.md.
 */
export const PRACTITIONERS_25: { slug: string; howIUse: string }[] = [
  { slug: 'arguing-from-first-principles', howIUse: "When a team tells me a change approval board is non-negotiable, I gently ask what risk it was created to catch. More often than not, automated tests and a canary release catch that risk better, and much faster." },
  { slug: 'second-order-thinking', howIUse: "Before we adopt a new observability platform or AI tool, I ask who will be on call for it in two years, and what it will cost them. The licence is rarely the expensive part." },
  { slug: 'inversion', howIUse: "I start reliability planning by asking, \"How could we take production down next month?\" The answers become our first set of guardrails." },
  { slug: 'systems-thinking', howIUse: "When on-call is burning people out, I look at the system first: alert design, release cadence, service ownership. Heroics are usually a symptom, not the fix." },
  { slug: 'feedback-loops', howIUse: "I judge an engineering practice by how quickly it tells a team they were wrong. A pipeline that fails in five minutes teaches far more than one that fails in an hour." },
  { slug: 'conways-law', howIUse: "Before any re-platforming, I sketch the team structure next to the target architecture. If the two don't match, the architecture quietly drifts back to the org chart." },
  { slug: 'theory-of-constraints', howIUse: "When delivery feels slow, I look for where work waits longest. Increasingly it's code review rather than coding, especially once AI assistants speed up writing the code." },
  { slug: 'value-stream-mapping', howIUse: "My first workshop with a new team maps idea-to-production with the wait time on every step. Seeing weeks of waiting around a couple of days of real work changes the conversation." },
  { slug: 'pareto-principle', howIUse: "I sort incidents and cloud spend by size and start with the top handful. A few noisy alerts or oversized clusters usually account for most of the pain." },
  { slug: 'goodharts-law', howIUse: "I always pair a speed metric with a stability one, such as deployment frequency with change failure rate, so improving one can't quietly hurt the other." },
  { slug: 'okrs', howIUse: "I encourage teams to write key results as outcomes, like \"time to restore under an hour\", rather than tasks like \"set up dashboards\". The outcome keeps everyone honest." },
  { slug: 'cynefin-framework', howIUse: "It helps me choose how to act: a familiar outage pattern gets a runbook, a new AI use case gets a small safe-to-fail experiment, and a major incident gets stabilised first." },
  { slug: 'reversible-vs-irreversible-decisions', howIUse: "Teams can decide reversible things on their own, like a feature flag or a config change. We slow down together for the one-way doors: data migrations, vendor lock-in, public APIs." },
  { slug: 'ooda-loop', howIUse: "During incidents I encourage a quick observe, orient, decide, act rhythm. Rolling back in ten minutes beats a perfect diagnosis in two hours." },
  { slug: 'wardley-mapping', howIUse: "I map a platform before deciding where our engineers should spend their time. Compute and CI are commodities to buy; the parts that make us different deserve our best people." },
  { slug: '5-whys', howIUse: "In post-incident reviews I keep asking \"why?\" until we reach something the team can actually change, usually a process or a missing guardrail rather than a person." },
  { slug: 'blameless-post-mortem', howIUse: "My first question in every review is, \"What made this easy to get wrong?\" People share far more when they know the goal is learning, not blame." },
  { slug: 'pre-mortem', howIUse: "Before a big migration, the team writes the story of how it failed. Every cause on that list becomes a task, a test or a rollback step." },
  { slug: 'swiss-cheese-model', howIUse: "When something slips through, I ask which other layer could have caught it (review, tests, canary analysis, alerting), not just how to patch the one that missed." },
  { slug: 'technical-debt', howIUse: "I describe debt as the interest the business is already paying: slower features, more incidents, longer onboarding. Framed that way, the work gets funded." },
  { slug: 'kaizen', howIUse: "Every retrospective ends with one small improvement and a named owner. Shaving a few minutes off a build each sprint adds up to days over a year." },
  { slug: 'six-thinking-hats', howIUse: "In architecture and AI-adoption reviews, we take one hat at a time so the cautious voices and the creative ones each get a fair hearing." },
  { slug: 'circle-of-competence', howIUse: "I'm open with teams about where my experience ends and theirs begins. The best calls usually come from asking the engineer closest to the problem." },
  { slug: 'eisenhower-matrix', howIUse: "I protect time each week for important, non-urgent work such as platform improvements and reliability debt, before the urgent requests fill the calendar." },
  { slug: 'margin-of-safety', howIUse: "We plan capacity, error budgets and delivery dates with deliberate headroom. Systems, and people, need room to absorb the unexpected." },
];
