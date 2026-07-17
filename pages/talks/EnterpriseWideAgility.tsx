import React from 'react';
import SimplePage from '../../components/SimplePage';
import SEO from '../../components/SEO';
import { Compass, Globe2, Workflow, Heart, Layers3, Target, Handshake, Milestone } from 'lucide-react';

const EnterpriseWideAgility: React.FC = () => {
  return (
    <>
      <SEO
        title="Achieving Enterprise-wide Agility: Beyond the Technology Stack | Naval Thakur"
        description="What actually drives enterprise agility adoption at scale — the technical, process, and cultural layers that must align, and three case studies of what happens when one is missing."
      />
      <SimplePage
        title="Achieving Enterprise-wide Agility: Beyond the Technology Stack"
        subtitle="Getting 5,000 engineers across 12 time zones to behave like one team is not a tooling problem."
      >
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert lg:prose-lg">
          <p className="lead text-xl text-slate-600 dark:text-slate-300 mb-8">
            The technology is the easy part. The hard part is getting thousands of engineers across a dozen time zones to behave like one team. In this session, Naval draws on his experience leading enterprise-wide agility programmes at SLB to show what actually drives adoption — and what doesn't.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border-l-4 border-secondary">
              <Layers3 className="w-8 h-8 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-lg font-bold mb-2">Three Layers, Not One</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Technical, process, and cultural layers all have to align — not just the tools.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border-l-4 border-secondary">
              <Milestone className="w-8 h-8 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-lg font-bold mb-2">Three Case Studies</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Real transformations where one layer was missing — and what broke as a result.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Why Pilot Teams Never Look Like the Problem</h2>
          <p>
            Every enterprise agile transformation nails the pilot. A hand-picked team, a supportive sponsor, a low-stakes product — of course it works. The failure shows up two years later, when the transformation is supposed to have spread past the first ten teams and hasn't. That's not a training problem. It's a sign that the organisation's structure, incentives, and culture are quietly contradicting the agile principles the pilot demonstrated.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">The Three Layers That Must Align</h2>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <Workflow className="w-6 h-6 text-secondary-dark dark:text-secondary" /> The Technical Layer
          </h3>
          <p>
            Pipelines, platforms, and toolchains — the layer most transformations start with, and the one that's genuinely the easiest to fix. A shared platform and a consistent CI/CD toolchain remove friction, but they don't by themselves change how work gets prioritised or how teams are held accountable. Technology is necessary. It is nowhere near sufficient.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <Target className="w-6 h-6 text-secondary-dark dark:text-secondary" /> The Process Layer
          </h3>
          <p>
            Portfolio management, OKR alignment, and delivery governance. This is where most enterprise transformations quietly fail: teams run sprints, but funding and prioritisation still happen on an annual planning cycle designed for waterfall delivery. If the process layer above the team hasn't changed, the team-level agility is just theatre inside a system that's still fundamentally project-based.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <Heart className="w-6 h-6 text-secondary-dark dark:text-secondary" /> The Cultural Layer
          </h3>
          <p>
            Ownership, trust, and incentive design. This is the layer leadership talks about least and that determines everything else. If a team's incentives still reward individual output over shared delivery, or if failure is punished rather than treated as signal, no amount of process redesign will produce genuine agility — people will comply with the ceremonies and protect themselves everywhere else.
          </p>

          <div className="my-12 p-8 bg-primary text-white rounded-2xl not-prose">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Compass className="mr-3 text-secondary-dark dark:text-secondary" />
              The Enterprise Agility Readiness Model
            </h3>
            <p className="text-slate-200 mb-6">
              A diagnostic Naval introduces in this session to identify which of the three layers is the actual constraint in your organisation — not the one that's easiest to blame.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 border border-white/10 rounded-lg">
                <div className="text-secondary-dark dark:text-secondary font-bold text-2xl mb-1">Technical</div>
                <div className="text-xs uppercase tracking-wider">Pipelines & Platforms</div>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <div className="text-secondary-dark dark:text-secondary font-bold text-2xl mb-1">Process</div>
                <div className="text-xs uppercase tracking-wider">Portfolio & Governance</div>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <div className="text-secondary-dark dark:text-secondary font-bold text-2xl mb-1">Culture</div>
                <div className="text-xs uppercase tracking-wider">Ownership & Incentives</div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Three Case Studies</h2>
          <p>
            The session walks through three real transformation efforts, each missing a different layer: a team with excellent tooling and process discipline that stalled because incentives still rewarded individual heroics over collective delivery; a business unit with strong cultural buy-in and executive sponsorship that couldn't scale because the annual portfolio funding cycle never changed underneath it; and a platform rollout that delivered a shared toolchain to five hundred engineers without ever addressing the process layer, producing consistent tooling and inconsistent outcomes. In each case, fixing the missing layer — not adding more of what was already working — is what unlocked the next stage of adoption.
          </p>

          <div className="my-12 p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 not-prose">
            <h3 className="text-xl font-bold text-primary dark:text-white mb-4 flex items-center gap-2">
              <Handshake className="w-6 h-6 text-secondary-dark dark:text-secondary" /> Enterprise Agility, Beyond the Stack
            </h3>
            <ul className="list-disc list-inside space-y-3 text-slate-600 dark:text-slate-300">
              <li>Diagnose which of the three layers is your actual constraint before investing further in the layers that are already working.</li>
              <li>Portfolio and funding cycles are agility blockers as often as team-level process is.</li>
              <li>Incentive design is the quietest lever in a transformation — and often the most powerful.</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Conclusion</h2>
          <p>
            Enterprise-wide agility doesn't fail because teams lack Scrum training. It fails because the layers above and around the team — funding, governance, incentives — were never asked to change. Get the technical layer right, and you've made agility possible. Get the process and cultural layers right too, and you've made it durable past the pilot.
          </p>

          <div className="mt-16 p-8 bg-slate-100 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 text-center not-prose">
            <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Scaling agility past the pilot teams?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Naval Thakur helps enterprise leadership diagnose and address the structural blockers that stop agile transformation from spreading.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/contact?topic=Agile Transformation" className="px-8 py-3 bg-secondary text-primary font-bold rounded-lg hover:bg-secondary-hover transition-all">
                Discuss Your Transformation
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

export default EnterpriseWideAgility;
