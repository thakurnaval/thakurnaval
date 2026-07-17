import React from 'react';
import { Link } from 'react-router-dom';
import SimplePage from '../../components/SimplePage';
import SEO from '../../components/SEO';
import { Users, Handshake, GitMerge, Rocket, FlaskConical, LineChart, RefreshCw, ListChecks } from 'lucide-react';

const SevenCsOfDevOps: React.FC = () => {
  return (
    <>
      <SEO
        title="The 7 Cs of DevOps: A Framework That Actually Sticks | Naval Thakur"
        description="Naval's 7 Cs framework for DevOps maturity — Culture, Collaboration, Continuous Integration, Delivery, Testing, Monitoring, and Learning — with real pipeline examples and honest benchmarks."
      />
      <SimplePage
        title="The 7 Cs of DevOps: A Framework That Actually Sticks"
        subtitle="Frameworks with ten pillars get forgotten by Tuesday. This one maps directly to daily work."
      >
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert lg:prose-lg">
          <p className="lead text-xl text-slate-600 dark:text-slate-300 mb-8">
            After years of delivering DevOps training, Naval found that frameworks with ten pillars get forgotten by Tuesday. The 7 Cs stick because they map directly to the daily work of an engineering team. This session unpacks each one with real pipeline examples, real failure modes, and honest benchmarks — built for teams that are somewhere in the middle: past the basics, not yet at the top.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border-l-4 border-secondary">
              <Users className="w-8 h-8 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-lg font-bold mb-2">Preconditions First</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Culture and Collaboration aren't a soft opener — the technical Cs don't hold without them.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border-l-4 border-secondary">
              <ListChecks className="w-8 h-8 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-lg font-bold mb-2">Sequenced, Not Simultaneous</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">The talk shows how to identify your single highest-leverage next step, wherever you sit today.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Why This Framework, Not a Bigger One</h2>
          <p>
            Most DevOps maturity frameworks fail for the same reason: they're comprehensive enough to be correct and complicated enough to be unusable. Nobody walks out of a workshop and applies a twelve-pillar model to Monday's sprint planning. The 7 Cs work because each one is a single word a team can check itself against without a scorecard — and because the order is intentional, not alphabetical.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">The 7 Cs</h2>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <Users className="w-6 h-6 text-secondary-dark dark:text-secondary" /> 1. Culture
          </h3>
          <p>
            Blameless by default, ownership that extends past deployment, and psychological safety to report a problem before it becomes an incident. This is a precondition, not a starting checkbox — the technical Cs below produce local efficiency without it, never systemic transformation.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <Handshake className="w-6 h-6 text-secondary-dark dark:text-secondary" /> 2. Collaboration
          </h3>
          <p>
            Dev, Ops, and Security working from the same backlog and the same incident channel, not three separate ticketing systems that sync badly. The honest benchmark: can a security finding become a prioritised engineering ticket in under a day, without a meeting to translate it?
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <GitMerge className="w-6 h-6 text-secondary-dark dark:text-secondary" /> 3. Continuous Integration
          </h3>
          <p>
            Every commit triggers build and test, and broken builds get fixed immediately rather than left for tomorrow. The failure mode to watch: a "green" pipeline that's actually skipping flaky tests rather than fixing them — a false signal that's worse than an honest red build.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <Rocket className="w-6 h-6 text-secondary-dark dark:text-secondary" /> 4. Continuous Delivery
          </h3>
          <p>
            Every build that passes CI is deployable — the decision to release becomes a business decision, not a technical risk assessment. Cutting corners here looks like a "deployable" build that still needs a manual smoke test before anyone trusts it.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-secondary-dark dark:text-secondary" /> 5. Continuous Testing
          </h3>
          <p>
            Quality as a pipeline gate at every stage — unit, integration, contract, security — not an afterthought bolted on before release. The test pyramid inverted, with a heavy, slow, flaky end-to-end suite standing in for real unit coverage, is the most common corner cut at this C.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <LineChart className="w-6 h-6 text-secondary-dark dark:text-secondary" /> 6. Continuous Monitoring
          </h3>
          <p>
            Production telemetry feeding back into development decisions, with SLOs defining what "working" actually means. Reactive monitoring — dashboards nobody watches until something's already broken — is what this C looks like when it's cut short.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-secondary-dark dark:text-secondary" /> 7. Continuous Learning
          </h3>
          <p>
            Blameless post-mortems with tracked action items, retrospectives that change something, and DORA metric reviews that inform the next quarter's priorities. Without this C, teams repeat the same incidents indefinitely — the other six Cs plateau because nothing is feeding improvement back into them.
          </p>

          <div className="my-12 p-8 bg-primary text-white rounded-2xl not-prose">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <ListChecks className="mr-3 text-secondary-dark dark:text-secondary" />
              Sequencing the Improvements
            </h3>
            <p className="text-slate-200 mb-6">
              The session's practical core: how to find your single highest-leverage next step without stopping delivery to fix everything at once.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 border border-white/10 rounded-lg">
                <div className="text-secondary-dark dark:text-secondary font-bold text-2xl mb-1">Diagnose</div>
                <div className="text-xs uppercase tracking-wider">Score all 7 Cs honestly</div>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <div className="text-secondary-dark dark:text-secondary font-bold text-2xl mb-1">Sequence</div>
                <div className="text-xs uppercase tracking-wider">Fix preconditions before technical Cs</div>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <div className="text-secondary-dark dark:text-secondary font-bold text-2xl mb-1">Sustain</div>
                <div className="text-xs uppercase tracking-wider">Continuous Learning keeps gains from decaying</div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Conclusion</h2>
          <p>
            The 7 Cs aren't a new idea dressed up in a mnemonic — they're the same DevOps fundamentals, sequenced honestly so a team can tell which one to work on next instead of trying to fix all seven simultaneously and making progress on none of them.
          </p>

          <div className="mt-16 p-8 bg-slate-100 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 text-center not-prose">
            <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Want the full 7 Cs framework?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Explore the complete, shareable 7 Cs of DevOps guide, or bring this talk to your next team offsite.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/devops/7cs" className="px-8 py-3 bg-secondary text-primary font-bold rounded-lg hover:bg-secondary-hover transition-all">
                Explore the 7 Cs Framework
              </Link>
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

export default SevenCsOfDevOps;
