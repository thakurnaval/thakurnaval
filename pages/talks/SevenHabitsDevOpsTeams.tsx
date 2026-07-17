import React from 'react';
import SimplePage from '../../components/SimplePage';
import SEO from '../../components/SEO';
import { ShieldOff, MessageCircleOff, Gauge, ClipboardCheck, Zap, GraduationCap, Anchor } from 'lucide-react';

const SevenHabitsDevOpsTeams: React.FC = () => {
  return (
    <>
      <SEO
        title="Seven Habits of Highly Effective DevOps Teams | Naval Thakur"
        description="The seven behavioural patterns that consistently separate DevOps teams that ship reliably from those perpetually firefighting — grounded in real enterprise examples."
      />
      <SimplePage
        title="Seven Habits of Highly Effective DevOps Teams"
        subtitle="The difference is rarely the tools. It's the habits available to every team, regardless of stack or budget."
      >
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert lg:prose-lg">
          <p className="lead text-xl text-slate-600 dark:text-slate-300 mb-8">
            Tools don't transform teams — habits do. The difference between high-performing and perpetually-firefighting DevOps teams is rarely the tools they use. In this session Naval distils the seven behavioural and cultural habits that consistently separate effective teams, grounded in real examples from enterprise environments. This is not theory — it is a practical, transferable checklist any team lead or engineering manager can begin applying in their next sprint.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border-l-4 border-secondary">
              <ShieldOff className="w-8 h-8 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-lg font-bold mb-2">Behaviour, Not Budget</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Every habit here is available to a team regardless of stack, headcount, or tooling spend.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border-l-4 border-secondary">
              <ClipboardCheck className="w-8 h-8 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-lg font-bold mb-2">A Sprint-Ready Checklist</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Not a maturity model to score against — a set of habits to start next sprint.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">The Seven Habits</h2>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <ShieldOff className="w-6 h-6 text-secondary-dark dark:text-secondary" /> 1. Psychological Safety in Post-Mortems
          </h3>
          <p>
            The teams that recover fastest are the ones where the engineer who caused an outage writes the post-mortem themselves, without fear it will be used against them. If people are managing their reputation during an incident review instead of surfacing what actually happened, the review produces a document, not a fix.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <MessageCircleOff className="w-6 h-6 text-secondary-dark dark:text-secondary" /> 2. A No-Blame, Blameless Culture
          </h3>
          <p>
            Distinct from Habit 1 in an important way: blameless culture isn't just how post-mortems are run, it's the everyday default assumption that a mistake is a system gap, not a person failing. That assumption has to be modelled by leadership consistently, or it collapses the first time a high-visibility incident happens and someone goes looking for who to blame.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <Gauge className="w-6 h-6 text-secondary-dark dark:text-secondary" /> 3. Metrics That Matter — DORA, Not Vanity
          </h3>
          <p>
            High-performing teams track deployment frequency, lead time for changes, change failure rate, and time to restore — not story points completed or lines of code shipped. Vanity metrics reward activity. DORA metrics reward outcomes, which is why they correlate with actual organisational performance and vanity metrics don't.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <ClipboardCheck className="w-6 h-6 text-secondary-dark dark:text-secondary" /> 4. A Shared Definition of Done That Includes Security and Cost
          </h3>
          <p>
            If "done" means the feature works but says nothing about whether it passed a security scan or what it costs to run, security and cost become someone else's problem discovered after the fact. Effective teams put both in the same definition of done as functional correctness, so they're checked at the same time, not bolted on afterward.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <Zap className="w-6 h-6 text-secondary-dark dark:text-secondary" /> 5. Fast Feedback at Every Stage
          </h3>
          <p>
            Not just fast CI — fast feedback from code review, fast feedback from staging, fast feedback from production monitoring. Every stage where feedback is slow is a stage where problems compound silently before anyone notices. The habit is treating feedback latency itself as a metric worth improving, at every stage, not only the pipeline.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-secondary-dark dark:text-secondary" /> 6. Continuous Learning Embedded in Sprint Rhythm
          </h3>
          <p>
            Learning that happens only at an annual conference budget doesn't compound. Effective teams build a small, recurring learning ritual directly into their sprint cadence — a rotating deep-dive, a shared postmortem review, time explicitly protected for it — so improvement is a habit of the team's rhythm, not an event that competes with delivery for calendar space.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <Anchor className="w-6 h-6 text-secondary-dark dark:text-secondary" /> 7. Ownership That Doesn't Stop at Deployment
          </h3>
          <p>
            "You build it, you run it" is a cliché precisely because it's right and rarely actually practiced. Teams that own their code through production — carrying the pager, watching the dashboards, fixing their own incidents — write measurably more operable code than teams who hand off to a separate ops function at deploy time.
          </p>

          <div className="my-12 p-8 bg-primary text-white rounded-2xl not-prose">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <ClipboardCheck className="mr-3 text-secondary-dark dark:text-secondary" />
              Starting Next Sprint
            </h3>
            <p className="text-slate-200 mb-6">
              None of these seven habits require a re-org or a new budget line. They require a team lead deciding to model one of them starting Monday.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 border border-white/10 rounded-lg">
                <div className="text-secondary-dark dark:text-secondary font-bold text-2xl mb-1">Pick One</div>
                <div className="text-xs uppercase tracking-wider">Not all seven at once</div>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <div className="text-secondary-dark dark:text-secondary font-bold text-2xl mb-1">Model It</div>
                <div className="text-xs uppercase tracking-wider">Leadership behaviour, not a memo</div>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <div className="text-secondary-dark dark:text-secondary font-bold text-2xl mb-1">Repeat</div>
                <div className="text-xs uppercase tracking-wider">Habits compound; announcements don't</div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Conclusion</h2>
          <p>
            None of these habits show up on a procurement list, which is exactly why they're underrated. A team with a modest toolchain and all seven habits will consistently outperform a team with a best-in-class platform and none of them. The tools amplify what the habits already produce — they don't substitute for them.
          </p>

          <div className="mt-16 p-8 bg-slate-100 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 text-center not-prose">
            <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Want this for your team leads?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Naval Thakur delivers this as a talk or a working session for engineering managers looking to build these habits deliberately.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/contact?topic=Workshop / Training" className="px-8 py-3 bg-secondary text-primary font-bold rounded-lg hover:bg-secondary-hover transition-all">
                Book This Session
              </a>
              <a href="/talks" className="px-8 py-3 bg-white dark:bg-slate-700 text-primary dark:text-white font-bold rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all">
                Back to Talks
              </a>
            </div>
          </div>
        </div>
      </SimplePage>
    </>
  );
};

export default SevenHabitsDevOpsTeams;
