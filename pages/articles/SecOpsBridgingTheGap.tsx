import React from 'react';
import { Link } from 'react-router-dom';
import SimplePage from '../../components/SimplePage';
import { ShieldCheck, AlertTriangle, GitMerge, CheckCircle2, Clock, Users, Layers, ArrowRight } from 'lucide-react';

const SecOpsBridgingTheGap: React.FC = () => {
  return (
    <SimplePage
      title="SecOps: Bridging the Gap"
      subtitle="Practical steps to align your security team with your agile delivery cycle — without slowing either side down."
    >
      <div className="space-y-10">

        <section className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/40 rounded-xl p-6">
          <p className="text-base italic text-red-900 dark:text-red-300 leading-relaxed">
            "The most dangerous gap in enterprise security isn't a missing tool. It's the 3-week lag between a vulnerability being discovered in a sprint and the security team being told about it."
          </p>
          <p className="mt-3 text-sm font-semibold text-red-800 dark:text-red-400">— Naval Thakur, Practice Manager, SLB</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">The Root of the Conflict</h2>
          <p className="leading-relaxed">
            Security teams and development teams are not adversaries — they just operate on incompatible timelines. A typical dev team ships every two weeks. A typical security review cycle runs quarterly. When these two rhythms collide, one of two things happens: security becomes a rubber stamp that adds no real value, or it becomes a hard blocker that earns a reputation for killing delivery speed.
          </p>
          <p className="mt-4 leading-relaxed">
            Neither outcome is acceptable. The solution is not to make security "faster" or development "slower." It's to redesign where in the lifecycle security thinking actually happens.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">The Three Gaps — and How to Close Them</h2>
          <div className="space-y-6">
            {[
              {
                icon: Clock,
                color: 'blue',
                title: 'Gap 1: The Timing Gap',
                problem: 'Security reviews happen at the end of a release cycle, when all architectural decisions are already locked in.',
                fix: 'Embed a "Security Story" into every sprint backlog. Not a task — a conversation. At the start of each sprint, the security champion (not the full security team) reviews the sprint scope for threat surface changes. This takes 30 minutes, not 3 weeks.',
              },
              {
                icon: Users,
                color: 'amber',
                title: 'Gap 2: The Language Gap',
                problem: 'Security teams speak CVEs and compliance frameworks. Dev teams speak user stories and acceptance criteria. Neither side can efficiently translate.',
                fix: 'Train at least one engineer per squad as a Security Champion — someone who speaks both languages. They own the translation layer between the security team\'s policies and the development team\'s day-to-day decisions. This is a role, not a certification.',
              },
              {
                icon: Layers,
                color: 'green',
                title: 'Gap 3: The Tooling Gap',
                problem: 'Security scans run on a schedule (nightly, weekly) rather than on every code change. By the time a result surfaces, the context is gone.',
                fix: 'Shift SAST, dependency scanning, and secrets detection into the PR pipeline. Every pull request triggers a scan. Results land as PR comments, not emailed reports. The developer who introduced the issue sees it within minutes, while the context is still fresh.',
              },
            ].map(({ icon: Icon, color, title, problem, fix }) => (
              <div key={title} className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-2 rounded-lg bg-${color}-100 dark:bg-${color}-900/20 shrink-0`}>
                    <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`} />
                  </div>
                  <h3 className="text-lg font-bold text-primary dark:text-white mt-1">{title}</h3>
                </div>
                <div className="ml-14 space-y-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-600 dark:text-slate-400"><strong>The problem:</strong> {problem}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700 dark:text-slate-300"><strong>The fix:</strong> {fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">The Security-as-Code Shift</h2>
          <p className="leading-relaxed">
            The most durable fix for the SecOps gap is treating security policy as code — stored in version control, reviewed like any other change, and enforced automatically at pipeline time. This means:
          </p>
          <ul className="mt-4 space-y-3 pl-4 border-l-4 border-secondary">
            <li className="text-sm leading-relaxed"><strong>Policy as code:</strong> OPA (Open Policy Agent) or Kyverno rules that enforce security standards at the infrastructure layer, not the review layer.</li>
            <li className="text-sm leading-relaxed"><strong>Threat models in the repo:</strong> A lightweight STRIDE threat model for each service, stored alongside the code, updated when the architecture changes.</li>
            <li className="text-sm leading-relaxed"><strong>Security gates in the pipeline:</strong> A "security quality gate" (similar to SonarQube's quality gate) that blocks a merge if critical findings are present — not as a human bottleneck, but as an automated check.</li>
          </ul>
          <p className="mt-6 leading-relaxed">
            When security policy lives in the same repo as the application, the gap between security and development is no longer organizational — it's just a PR conversation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Measuring the Bridge</h2>
          <p className="mb-4 leading-relaxed">
            You can't manage what you don't measure. These three metrics tell you whether the SecOps gap is closing:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { metric: 'Mean Time to Remediate (MTTR-Sec)', target: '< 7 days for Critical CVEs', desc: 'From vulnerability discovery to confirmed fix in production.' },
              { metric: 'Security Coverage', target: '100% of pipelines', desc: 'Percentage of CI pipelines with at least SAST + dependency scan.' },
              { metric: 'Security Debt Ratio', target: 'Trending down', desc: 'Open critical/high findings vs. total code surface. Track the trend, not the absolute number.' },
            ].map(({ metric, target, desc }) => (
              <div key={metric} className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-2">{metric}</p>
                <p className="text-lg font-bold text-primary dark:text-white mb-2">{target}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">The Honest Truth</h2>
          <p className="leading-relaxed">
            Bridging the SecOps gap is as much a culture problem as a tooling problem. The best pipeline-integrated security scanning in the world fails if developers learn to bypass findings or security teams lose credibility by flagging false positives at scale.
          </p>
          <p className="mt-4 leading-relaxed">
            The cultural fix is simple to describe and hard to execute: <strong>security teams need to help developers fix issues, not just report them.</strong> When a SAST scan flags a SQL injection risk, the most valuable thing a security engineer can do is pair with the developer for 20 minutes to fix it — not send a 15-page remediation report.
          </p>
          <p className="mt-4 leading-relaxed">
            That shift — from security-as-auditor to security-as-partner — is what actually closes the gap.
          </p>
        </section>

        <section className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-secondary shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-primary dark:text-white mb-2">Run a DevSecOps Readiness Assessment</h3>
              <p className="text-sm leading-relaxed">
                I run SecOps gap analyses for enterprise engineering organizations — mapping current pipeline security coverage, identifying the highest-risk gaps, and designing a phased remediation roadmap. Typically a 2-day engagement with the engineering and security leads.
              </p>
              <Link to="/contact?topic=Workshop / Training" className="inline-flex items-center mt-4 text-sm font-bold text-secondary hover:underline">
                Request an Assessment <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </SimplePage>
  );
};

export default SecOpsBridgingTheGap;
