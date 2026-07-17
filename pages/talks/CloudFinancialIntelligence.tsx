import React from 'react';
import SimplePage from '../../components/SimplePage';
import SEO from '../../components/SEO';
import { DollarSign, Users, Theater, AlertTriangle, Tag, Building2, ClipboardCheck, TrendingDown } from 'lucide-react';

const CloudFinancialIntelligence: React.FC = () => {
  return (
    <>
      <SEO
        title="Cloud Financial Intelligence: What FinOps Practitioners Get Wrong | Naval Thakur"
        description="The five FinOps failure modes that kill momentum after the first savings win — and the operational model that prevents each one."
      />
      <SimplePage
        title="Cloud Financial Intelligence: What FinOps Practitioners Get Wrong"
        subtitle="An honest post-mortem of the patterns that stall FinOps programmes after the first win."
      >
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert lg:prose-lg">
          <p className="lead text-xl text-slate-600 dark:text-slate-300 mb-8">
            Most FinOps efforts follow the same arc: tagging campaign, showback report, one big savings win — then stagnation. The problem isn't the tooling. It's that teams optimise for visibility and miss accountability. Naval has run FinOps programmes at a $50B energy company and seen the patterns that kill momentum. This session is the honest post-mortem — five failure modes, and the operational model that prevents each one.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border-l-4 border-secondary">
              <TrendingDown className="w-8 h-8 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-lg font-bold mb-2">Visibility Isn't Accountability</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">A dashboard nobody owns doesn't change spending behaviour.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border-l-4 border-secondary">
              <ClipboardCheck className="w-8 h-8 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-lg font-bold mb-2">A Scored Diagnostic</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">The FinOps Maturity Assessment used in Naval's practice, walked through live.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Why the Arc Always Stalls</h2>
          <p>
            Every FinOps programme starts the same way: someone runs a tagging campaign, ships a showback dashboard, and finds one obviously wasteful line item — an idle cluster, an unattached volume, an oversized reserved instance commitment. Leadership celebrates the win. Then, six months later, spend is climbing again and nobody can explain why. The tooling didn't fail. The programme never built the operating model that makes cost discipline durable instead of a one-time cleanup.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">Five Failure Modes That Kill Momentum</h2>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <Users className="w-6 h-6 text-secondary-dark dark:text-secondary" /> 1. Diffuse Ownership
          </h3>
          <p>
            When a cost line item belongs to "the platform team" in general, it belongs to no one in particular. Every account, service, and environment needs a named owner — a person, not a team name — who sees their number every week and is expected to explain movement in it.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <Theater className="w-6 h-6 text-secondary-dark dark:text-secondary" /> 2. Savings Theatre
          </h3>
          <p>
            Reporting a one-time cleanup as an ongoing savings rate is the fastest way to lose leadership's trust the second spend ticks back up. Real FinOps maturity reports a run-rate trend, not a single deleted-resources headline.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-secondary-dark dark:text-secondary" /> 3. The RI Trap
          </h3>
          <p>
            Reserved Instance and Savings Plan commitments made once and never revisited become their own form of waste as workloads shift. A commitment portfolio needs the same quarterly review discipline as the workloads it covers — otherwise you're paying for capacity you no longer run.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <Tag className="w-6 h-6 text-secondary-dark dark:text-secondary" /> 4. Tagging as a Substitute for Governance
          </h3>
          <p>
            A tagging policy tells you where the money went. It does not stop the money from being spent badly in the first place. Teams that treat tagging completion as the finish line stop one step before the part that actually changes behaviour: policy gates that prevent non-compliant or oversized resources from being created at all.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-3 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-secondary-dark dark:text-secondary" /> 5. Treating FinOps as a Finance Function
          </h3>
          <p>
            If FinOps lives entirely inside finance, engineering treats it as an audit to survive rather than a practice to own. The programmes that stick embed cost awareness into the engineering workflow itself — cost estimates in PR reviews, budget alerts in the same channel as deploy notifications — so efficiency is a byproduct of how the team already works, not a separate report to react to.
          </p>

          <div className="my-12 p-8 bg-primary text-white rounded-2xl not-prose">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <DollarSign className="mr-3 text-secondary-dark dark:text-secondary" />
              The FinOps Maturity Assessment
            </h3>
            <p className="text-slate-200 mb-6">
              A scored diagnostic Naval uses in his own practice — it doesn't just tell you your FinOps maturity is "medium," it tells you exactly where the friction is.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 border border-white/10 rounded-lg">
                <div className="text-secondary-dark dark:text-secondary font-bold text-2xl mb-1">Inform</div>
                <div className="text-xs uppercase tracking-wider">Ownership & Visibility</div>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <div className="text-secondary-dark dark:text-secondary font-bold text-2xl mb-1">Optimise</div>
                <div className="text-xs uppercase tracking-wider">Commitment & Rightsizing Discipline</div>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <div className="text-secondary-dark dark:text-secondary font-bold text-2xl mb-1">Operate</div>
                <div className="text-xs uppercase tracking-wider">Governance Embedded in Workflow</div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Conclusion</h2>
          <p>
            None of these five failure modes are tooling problems, which is exactly why buying a better cost management platform doesn't fix them. They're operating model problems — ownership, cadence, and where governance actually lives in the workflow. Fix those, and the tagging campaign and the showback dashboard finally do what they were supposed to do in the first place.
          </p>

          <div className="mt-16 p-8 bg-slate-100 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 text-center not-prose">
            <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Ready for an honest FinOps diagnostic?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Naval Thakur helps organizations move past the first savings win into a FinOps operating model that actually holds.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/contact?topic=FinOps Consulting" className="px-8 py-3 bg-secondary text-primary font-bold rounded-lg hover:bg-secondary-hover transition-all">
                Start Your FinOps Journey
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

export default CloudFinancialIntelligence;
