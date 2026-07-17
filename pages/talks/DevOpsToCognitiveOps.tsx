import React from 'react';
import { Link } from 'react-router-dom';
import SimplePage from '../../components/SimplePage';
import SEO from '../../components/SEO';
import { Layers, GitCommitHorizontal, Bot, Compass, Gauge, ListChecks } from 'lucide-react';

const DevOpsToCognitiveOps: React.FC = () => {
  return (
    <>
      <SEO
        title="From DevOps to CognitiveOps: The Next Five Years | Naval Thakur"
        description="The CognitiveOps Model — a four-layer maturity framework mapping the journey from manual operations to AI-autonomous engineering, and a diagnostic for where your organisation sits today."
      />
      <SimplePage
        title="From DevOps to CognitiveOps: The Next Five Years"
        subtitle="Automation is not intelligence — and the gap between the two is where the next wave of transformation lives."
      >
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert lg:prose-lg">
          <p className="lead text-xl text-slate-600 dark:text-slate-300 mb-8">
            Most enterprises declare DevOps done when their pipelines are green and their deployments are automated. But automation is not intelligence — and the gap between the two is where the next wave of transformation lives. In this session, Naval Thakur introduces the <Link to="/cognitiveops">CognitiveOps Model</Link>: a four-layer maturity framework that maps the journey from manual operations through DevSecOps and FinOps, and into CognitiveOps — where AI agents monitor, reason, and respond without human intervention.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border-l-4 border-secondary">
              <Layers className="w-8 h-8 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-lg font-bold mb-2">Four Layers, Not a Cliff</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Each layer builds on the one below it — you cannot skip to Layer 4.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border-l-4 border-secondary">
              <Compass className="w-8 h-8 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-lg font-bold mb-2">A Concrete Diagnostic</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Attendees leave knowing which layer they're on and the one constraint holding them back.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Why "We Have CI/CD" Isn't the Finish Line</h2>
          <p>
            Eighteen years of enterprise transformation across SLB, Genpact, and Accenture has shown the same pattern repeatedly: an organisation automates its deployment pipeline, calls the DevOps transformation complete, and stalls. The pipeline is green, but every incident still needs a human to notice it, triage it, and decide what to do. That's automation. Intelligence is when the system itself starts doing some of that noticing, triaging, and deciding — and almost no enterprise has actually built toward that deliberately.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">The Four Layers</h2>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <GitCommitHorizontal className="w-6 h-6 text-secondary-dark dark:text-secondary" /> Layer 1 — Manual Ops
          </h3>
          <p>
            Deployments are manual or semi-scripted. Incidents are found by users before they're found by monitoring. Most of the world's engineering organisations spend years here without naming it, because "we have Jenkins" feels like progress even when every pipeline run still needs a human to babysit it.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <Layers className="w-6 h-6 text-secondary-dark dark:text-secondary" /> Layer 2 — Automated DevSecOps
          </h3>
          <p>
            CI/CD is real, security scanning is in the pipeline, and infrastructure is code. This is where most well-run enterprise engineering organisations sit today — and where most transformation budgets stop, because the pipeline being green feels like the goal was achieved.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <Gauge className="w-6 h-6 text-secondary-dark dark:text-secondary" /> Layer 3 — Intelligent Operations
          </h3>
          <p>
            Systems start correlating signals across telemetry sources, surfacing likely root causes, and recommending — not yet taking — action. FinOps discipline matures alongside this layer, because cost and reliability signals start feeding the same intelligence layer. Fewer than 5% of organisations Naval has assessed have genuinely reached this layer.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <Bot className="w-6 h-6 text-secondary-dark dark:text-secondary" /> Layer 4 — Cognitive (AI-Native Ops)
          </h3>
          <p>
            AI agents monitor, reason, and respond within defined guardrails, with humans supervising rather than executing. This is not "no humans" — it's humans operating at a different altitude, setting policy and reviewing exceptions instead of clicking through runbooks. The organisations already here are doing very specific, narrow things extremely well, not running fully autonomous operations end to end.
          </p>

          <div className="my-12 p-8 bg-primary text-white rounded-2xl not-prose">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Compass className="mr-3 text-secondary-dark dark:text-secondary" />
              What Breaks at Each Transition
            </h3>
            <p className="text-slate-200 mb-6">
              The session's core content: the specific failure each organisation hits moving from one layer to the next, and the decision that gets them through it.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 border border-white/10 rounded-lg">
                <div className="text-secondary-dark dark:text-secondary font-bold text-2xl mb-1">1 → 2</div>
                <div className="text-xs uppercase tracking-wider">Tooling investment without process change</div>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <div className="text-secondary-dark dark:text-secondary font-bold text-2xl mb-1">2 → 3</div>
                <div className="text-xs uppercase tracking-wider">Signal correlation without trusted data</div>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <div className="text-secondary-dark dark:text-secondary font-bold text-2xl mb-1">3 → 4</div>
                <div className="text-xs uppercase tracking-wider">Guardrails that make autonomy safe to grant</div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">What Layer 4 Organisations Are Doing Differently</h2>
          <p>
            They didn't get to Layer 4 by buying an AIOps platform. They got there by first making Layer 2 genuinely solid — trustworthy telemetry, consistent deployment practices, real security-as-code — because Layer 4 intelligence is only as good as the data and guardrails beneath it. The organisations skipping straight to "let's add an AI agent" without that foundation are the ones producing confident, wrong automated decisions.
          </p>

          <div className="my-12 p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 not-prose">
            <h3 className="text-xl font-bold text-primary dark:text-white mb-4 flex items-center gap-2">
              <ListChecks className="w-6 h-6 text-secondary-dark dark:text-secondary" /> The Diagnostic Attendees Leave With
            </h3>
            <ul className="list-disc list-inside space-y-3 text-slate-600 dark:text-slate-300">
              <li>Which of the four layers their organisation is actually on — not where leadership believes it is.</li>
              <li>The single highest-leverage constraint blocking the move to the next layer.</li>
              <li>What specifically breaks if that constraint is skipped rather than addressed.</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Conclusion</h2>
          <p>
            The next five years of enterprise engineering won't be won by whoever adopts AI first — they'll be won by whoever builds the layer beneath it solidly enough to trust it. The CognitiveOps Model exists to give organisations an honest answer to "where are we, really" so the next investment goes to the constraint that's actually holding them back, not the one that's easiest to buy a tool for.
          </p>

          <div className="mt-16 p-8 bg-slate-100 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 text-center not-prose">
            <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Want to know which layer you're on?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Explore the full CognitiveOps Model or bring this keynote to your next engineering offsite.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/cognitiveops" className="px-8 py-3 bg-secondary text-primary font-bold rounded-lg hover:bg-secondary-hover transition-all">
                Explore the CognitiveOps Model
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

export default DevOpsToCognitiveOps;
