import React from 'react';
import SimplePage from '../../components/SimplePage';
import SEO from '../../components/SEO';
import { Boxes, KeyRound, GitBranch, ShieldCheck, Layers, CheckSquare } from 'lucide-react';

const IacAzurePipelinesTerraformSaltStack: React.FC = () => {
  return (
    <>
      <SEO
        title="Infrastructure as Code with Azure Pipelines: Terraform + SaltStack in Production | Naval Thakur"
        description="A hands-on workshop on the Terraform and SaltStack stack delivered in production at Pune DevCon 2019 — module structure, state management, secrets, and policy gates."
      />
      <SimplePage
        title="Infrastructure as Code with Azure Pipelines: Terraform + SaltStack in Production"
        subtitle="From a working Azure DevOps project to a fully automated infrastructure pipeline."
      >
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert lg:prose-lg">
          <p className="lead text-xl text-slate-600 dark:text-slate-300 mb-8">
            This workshop takes engineers from a working Azure DevOps project to a fully automated infrastructure pipeline using Terraform for provisioning and SaltStack for configuration management — the exact stack delivered in production at Pune DevCon 2019. It assumes working Azure DevOps access and basic familiarity with cloud infrastructure concepts, and moves through five hands-on segments.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border-l-4 border-secondary">
              <Boxes className="w-8 h-8 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-lg font-bold mb-2">Real-World Modules</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Terraform structure that survives beyond a single tutorial repo.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border-l-4 border-secondary">
              <CheckSquare className="w-8 h-8 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-lg font-bold mb-2">Policy Gates</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Nothing reaches production without passing an enforced check.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">1. Structuring Terraform for Real-World Modules</h2>
          <p>
            Most Terraform tutorials teach you to write a single <code>main.tf</code> that provisions everything in one flat file. Production infrastructure needs the opposite: composable modules with clear input/output contracts, versioned independently, so a change to the networking module doesn't force a re-plan of every environment that consumes it. This segment covers module boundaries, variable design that avoids leaking implementation details to callers, and a repo layout that scales past the first three environments.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">2. Integrating State Management in Azure Pipelines</h2>
          <p>
            Remote state in Azure Storage with locking is the easy part. The harder part is pipeline design: separating <code>plan</code> from <code>apply</code> as distinct stages with a manual approval gate between them, scoping state files per environment so a mistake in staging can't touch production state, and handling drift detection as a scheduled pipeline run rather than discovering it during the next deploy.
          </p>
          <pre className="bg-slate-900 text-slate-100 p-6 rounded-lg overflow-x-auto text-sm mb-8">
{`# Two-stage pipeline: plan requires approval before apply runs
stages:
  - stage: Plan
    jobs:
      - job: TerraformPlan
        steps:
          - script: terraform plan -out=tfplan
  - stage: Apply
    dependsOn: Plan
    condition: succeeded()
    jobs:
      - deployment: TerraformApply
        environment: production  # manual approval gate lives here
        strategy:
          runOnce:
            deploy:
              steps:
                - script: terraform apply tfplan`}
          </pre>

          <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-2">
            <KeyRound className="w-7 h-7 text-secondary-dark dark:text-secondary" /> 3. Managing Secrets Without Putting Them in YAML
          </h2>
          <p>
            Pipeline YAML files end up in Git history forever, which makes them the wrong place for anything sensitive. This segment covers pulling secrets from Azure Key Vault at pipeline runtime via variable groups, scoping service connections to the minimum permissions each stage actually needs, and the specific mistake to avoid: passing secrets as plain pipeline variables, which shows up unmasked in the vast majority of custom task logs.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">4. SaltStack Configuration Runs as Pipeline Stages</h2>
          <p>
            Terraform provisions the infrastructure; SaltStack configures what runs on it. Treating a Salt highstate run as its own pipeline stage — with its own success criteria and rollback path — keeps provisioning and configuration failures distinguishable instead of tangled into one opaque "deployment failed" error. This segment walks through structuring Salt states alongside Terraform modules so the two stay in version-controlled lockstep.
          </p>

          <div className="my-12 p-8 bg-primary text-white rounded-2xl not-prose">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Layers className="mr-3 text-secondary-dark dark:text-secondary" />
              Provision, Configure, Gate
            </h3>
            <p className="text-slate-200 mb-6">
              The three-stage shape this workshop builds toward — each stage independently testable, independently rollback-able.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 border border-white/10 rounded-lg">
                <div className="text-secondary-dark dark:text-secondary font-bold text-2xl mb-1">Terraform</div>
                <div className="text-xs uppercase tracking-wider">Provision Infrastructure</div>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <div className="text-secondary-dark dark:text-secondary font-bold text-2xl mb-1">SaltStack</div>
                <div className="text-xs uppercase tracking-wider">Configure the Fleet</div>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <div className="text-secondary-dark dark:text-secondary font-bold text-2xl mb-1">Policy Gate</div>
                <div className="text-xs uppercase tracking-wider">Enforce Before Production</div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-secondary-dark dark:text-secondary" /> 5. Enforcing Policy Gates Before Production
          </h2>
          <p>
            The final segment covers policy-as-code checks that run between plan and apply — blocking changes that would create publicly exposed storage, remove encryption settings, or exceed a cost threshold — using pipeline-native policy evaluation rather than a manual reviewer reading a plan output line by line. This is the difference between infrastructure as code that's merely automated and infrastructure as code that's actually governed.
          </p>

          <div className="my-12 p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 not-prose">
            <h3 className="text-xl font-bold text-primary dark:text-white mb-4 flex items-center gap-2">
              <GitBranch className="w-6 h-6 text-secondary-dark dark:text-secondary" /> Drift, the Recurring Cost
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Drift detection is not a one-time setup task — it's a scheduled pipeline run (nightly or per-environment cadence) that compares live infrastructure against state and opens a ticket automatically when they diverge. Without this, "the pipeline is the source of truth" quietly stops being true within a few weeks of any team having console access.
            </p>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Conclusion</h2>
          <p>
            None of these five segments are exotic. What makes the stack production-grade isn't a clever Terraform trick — it's the discipline of separating plan from apply, keeping secrets out of YAML, treating configuration as its own gated stage, and catching drift before it becomes an incident. That discipline, delivered in production at Pune DevCon 2019, is what this workshop hands to participants directly.
          </p>

          <div className="mt-16 p-8 bg-slate-100 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 text-center not-prose">
            <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Bringing this workshop to your team?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Naval Thakur delivers this as a hands-on session for teams running Terraform and configuration management in Azure Pipelines.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/contact?topic=Workshop / Training" className="px-8 py-3 bg-secondary text-primary font-bold rounded-lg hover:bg-secondary-hover transition-all">
                Book This Workshop
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

export default IacAzurePipelinesTerraformSaltStack;
