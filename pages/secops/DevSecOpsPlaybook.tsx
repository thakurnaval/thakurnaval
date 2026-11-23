import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import Section from '../../components/Section';
import SEO from '../../components/SEO';
import { GatedGuideHero, esc, openPrintable, printStyles } from '../../components/GatedGuide';

const PAGE_URL = 'https://nthakur.com/secops/devsecops-playbook';

interface Stage { name: string; goal: string; controls: string[]; tools: string; gate: string; metric: string }

const STAGES: Stage[] = [
  { name: 'Plan & design', goal: 'Find design flaws while they cost a whiteboard, not a rewrite.',
    controls: ['Lightweight threat model (STRIDE) for every new service or major change', 'Security and data-classification requirements in the spec', 'Abuse cases alongside user stories'],
    tools: 'Threat Dragon, OWASP threat modelling cheat sheet, AI-assisted threat model drafts', gate: 'Spec cannot be accepted without a threat-model section', metric: 'Share of new services with a threat model' },
  { name: 'Code', goal: 'Stop secrets and known-bad patterns before they reach the repo.',
    controls: ['Pre-commit secret scanning', 'IDE security linting and secure-coding standards (also as AI agent instructions)', 'Branch protection with required reviews'],
    tools: 'Gitleaks, TruffleHog, Semgrep, IDE plugins', gate: 'Push blocked on detected secrets', metric: 'Secrets caught pre-commit vs found in history' },
  { name: 'Build', goal: 'Know what you ship and trust where it came from.',
    controls: ['SAST on every pull request', 'Dependency (SCA) scanning with licence checks', 'SBOM generated per build; signed artifacts'],
    tools: 'Semgrep, CodeQL, SonarQube, Dependabot, Renovate, Syft, Cosign', gate: 'Critical/high findings block merge (with time-boxed exceptions)', metric: 'Mean time to fix critical findings' },
  { name: 'Test', goal: 'Test the running system the way an attacker would.',
    controls: ['DAST against staging on each release candidate', 'IaC and container image scanning', 'API security tests for authn/authz and input validation'],
    tools: 'OWASP ZAP, Checkov, tfsec/Trivy, Trivy/Grype for images', gate: 'No release with open critical DAST or image findings', metric: 'Findings per release; escaped vulnerabilities' },
  { name: 'Release', goal: 'Only signed, policy-compliant artifacts reach production.',
    controls: ['Policy-as-code admission (signature, provenance, no root containers)', 'Separation of duties: authors cannot approve their own release', 'Change record generated from the pipeline'],
    tools: 'OPA/Gatekeeper, Kyverno, Azure Policy, Binary Authorization, SLSA provenance', gate: 'Admission controller rejects non-compliant artifacts', metric: 'Policy violations blocked at admission' },
  { name: 'Run & respond', goal: 'Detect, contain and learn quickly.',
    controls: ['Cloud-native threat detection and centralised audit logs', 'Runtime protection for containers', 'Automated containment runbooks; blameless post-incident reviews'],
    tools: 'Defender for Cloud, GuardDuty, Security Command Center, Falco, SIEM/SOAR', gate: 'SEV1/SEV2 incidents always produce tracked actions', metric: 'Time to detect and time to contain' },
];

const LEVELS = [
  ['L1 Reactive', 'Security reviews at the end; annual pen test; findings in spreadsheets.'],
  ['L2 Proactive', 'Scanners in CI; secrets management; critical findings tracked.'],
  ['L3 Predictive', 'Policy-as-code gates; SBOM and signing; threat models standard; metrics reviewed.'],
  ['L4 Autonomous', 'Continuous compliance evidence; AI-assisted triage and fixes; pre-approved automated containment.'],
];

const PRINCIPLES = [
  ['Pave the road, don\'t police it', 'Make the secure way the easy way: templates, golden pipelines and defaults that already pass the checks.'],
  ['Fail fast, fail cheap', 'Put each check where it is cheapest to fix: secrets pre-commit, SAST on the PR, DAST before release.'],
  ['Block on critical, track the rest', 'Gates that block everything get bypassed. Block critical and high; track lower findings with SLAs.'],
  ['Exceptions expire', 'Every risk acceptance has an owner, a reason and an end date.'],
  ['Machines enforce, people decide', 'Policy-as-code enforces the rules; security engineers spend their time on threat models and judgement calls.'],
  ['Treat agents like engineers', 'AI coding agents get scoped identities, follow the same standards (as instructions and hooks) and cannot approve their own work.'],
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The DevSecOps Playbook — Free PDF',
  description: 'Security controls, tools, gates and metrics for every pipeline stage, a 4-level maturity model and a 90-day rollout plan.',
  author: { '@type': 'Person', name: 'Naval Thakur', url: 'https://nthakur.com/about' },
  url: PAGE_URL,
};

function openPlaybook(email: string) {
  const footer = (n: number) => `<div class="footer"><span>The DevSecOps Playbook · nthakur.com · © Naval Thakur 2026</span><span>Page ${n}</span></div>`;
  const stage = (s: Stage, i: number) => `<div class="box"><b>${i + 1}. ${esc(s.name)}</b>: ${esc(s.goal)}
<table><tr><td class="k">Controls</td><td><ul>${s.controls.map(c => `<li>${esc(c)}</li>`).join('')}</ul></td></tr>
<tr><td class="k">Tools (examples)</td><td>${esc(s.tools)}</td></tr>
<tr><td class="k">Gate</td><td>${esc(s.gate)}</td></tr>
<tr><td class="k">Measure</td><td>${esc(s.metric)}</td></tr></table></div>`;
  openPrintable(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>The DevSecOps Playbook — Naval Thakur</title><style>${printStyles('#1d4ed8', '#1e3a8a')}</style></head><body>
<div class="cover"><div class="tag">Practitioner playbook · DevSecOps</div><h1>The DevSecOps<br>Playbook</h1><p>Security built into every stage of delivery: the controls, the gates, the metrics and a 90-day rollout.</p><div class="rule"></div><div class="by">By <strong>Naval Thakur</strong> · nthakur.com</div><div class="by" style="margin-top:8px">Prepared for: <strong>${esc(email)}</strong></div></div>
<div class="page"><h2>Security at the speed of delivery</h2>
<p>Teams now ship daily, and AI agents are multiplying the amount of code written. A security review at the end of the line cannot keep up: either the queue grows or code ships unreviewed. DevSecOps moves each check to the point where it is cheapest to fix, and turns policy into code that runs on every change.</p>
<h3>Six principles</h3>${PRINCIPLES.map(([t, b]) => `<div class="box"><b>${esc(t)}.</b> ${esc(b)}</div>`).join('')}
<h3>Maturity levels</h3><table><tr><th>Level</th><th>What it looks like</th></tr>${LEVELS.map(([l, d]) => `<tr><td class="k">${esc(l)}</td><td>${esc(d)}</td></tr>`).join('')}</table>${footer(2)}</div>
<div class="page"><h2>The secure pipeline, stage by stage</h2>${STAGES.slice(0, 3).map((s, i) => stage(s, i)).join('')}${footer(3)}</div>
<div class="page">${STAGES.slice(3).map((s, i) => stage(s, i + 3)).join('')}${footer(4)}</div>
<div class="page"><h2>Policy-as-code: a first rule</h2>
<p>Start with one rule everyone agrees on and enforce it in the pipeline. Example: no container may run as root (OPA / Gatekeeper Rego):</p>
<pre>package k8s.security

deny[msg] {
  input.request.kind.kind == "Pod"
  c := input.request.object.spec.containers[_]
  not c.securityContext.runAsNonRoot
  msg := sprintf("container %v must set runAsNonRoot: true", [c.name])
}</pre>
<h3>Finding SLAs (a sensible default)</h3>
<table><tr><th>Severity</th><th>Gate</th><th>Fix within</th></tr>
<tr><td class="k">Critical</td><td>Blocks merge and release</td><td>48 hours</td></tr>
<tr><td class="k">High</td><td>Blocks release</td><td>7 days</td></tr>
<tr><td class="k">Medium</td><td>Tracked</td><td>30 days</td></tr>
<tr><td class="k">Low</td><td>Tracked</td><td>Next planned work</td></tr></table>
<h3>Metrics that matter</h3><ul>
<li><b>Mean time to remediate</b> by severity, against the SLA.</li>
<li><b>Escaped vulnerabilities:</b> found in production vs found in the pipeline.</li>
<li><b>Coverage:</b> share of repos with SAST, SCA, secret scanning and SBOM.</li>
<li><b>Exception debt:</b> open risk acceptances and how many are past expiry.</li>
<li><b>Time to detect and contain</b> for security incidents.</li></ul>
<h3>Securing AI-assisted development</h3><ul>
<li>Write secure-coding standards as agent instructions, and back them with hooks that block secrets and protected-path edits.</li>
<li>Give agents scoped, short-lived credentials and their own identity; they never approve their own pull requests.</li>
<li>Run the same SAST, SCA and policy gates on agent-written code as on human code, with no exceptions.</li></ul>${footer(5)}</div>
<div class="page"><h2>Your 90-day rollout</h2>
<div class="box"><b>Days 1–30 · Baseline.</b><ul><li>Secret scanning pre-commit and in CI on all repos.</li><li>SCA (Dependabot or Renovate) everywhere.</li><li>SAST on your five most critical repos.</li><li>Agree severity SLAs and an exception process.</li></ul></div>
<div class="box"><b>Days 31–60 · Gates.</b><ul><li>Block critical findings on merge; block high on release.</li><li>IaC and container image scanning in pipelines.</li><li>Threat models for new services; one-page template.</li><li>Centralised audit logs and cloud threat detection.</li></ul></div>
<div class="box"><b>Days 61–90 · Policy & evidence.</b><ul><li>First policy-as-code rules at admission (non-root, signed images).</li><li>SBOM and artifact signing in the golden pipeline.</li><li>Security metrics dashboard reviewed monthly with engineering leads.</li><li>Tabletop exercise for a supply-chain incident.</li></ul></div>
<div class="cta"><div style="font-size:9.5px;letter-spacing:2px;text-transform:uppercase;color:#93c5fd;font-weight:700">Next step</div><div style="font-size:13px;font-weight:700;margin:6px 0">Score your security maturity</div><div style="font-size:11px;color:#dbeafe">Take the free Cloud Security assessment at nthakur.com/secops/assessment for a pillar-by-pillar plan, or book a session at nthakur.com/work-with-me.</div></div>${footer(6)}</div>
</body></html>`);
}

const DevSecOpsPlaybook: React.FC = () => (
  <>
    <SEO title="The DevSecOps Playbook — Free PDF | Naval Thakur"
      description="Security controls, tools, gates and metrics for every pipeline stage, from threat modelling to runtime response, plus a 4-level maturity model and a 90-day rollout plan. Free PDF."
      structuredData={SCHEMA} />
    <GatedGuideHero
      badge="Free PDF · Playbook" badgeIcon={<ShieldCheck size={14} />}
      title="The DevSecOps Playbook"
      intro="Security built into every stage of delivery, not bolted on at the end. Controls, gates, tools and metrics for each pipeline stage, and a 90-day plan to roll it out."
      bullets={['Six stages: plan, code, build, test, release, run', 'Controls, example tools, gates and a metric for each', 'Policy-as-code starter rule and finding SLAs', 'Securing AI-assisted development', '90-day rollout plan']}
      topic="DevSecOps Playbook PDF Download" cta="Download the Playbook" readyText="Your 6-page playbook is ready."
      onOpen={openPlaybook} gradient="from-slate-950 via-blue-950 to-blue-900/30" accent="blue" />

    <Section bg="white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 text-center">The secure pipeline</h2>
        <p className="text-slate-600 dark:text-slate-400 text-center mb-8">Each check sits where it is cheapest to fix. The PDF covers the controls, tools, gate and metric for every stage.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STAGES.map((s, i) => (
            <div key={s.name} className="rounded-xl border border-slate-200 dark:border-slate-700 p-5">
              <div className="text-xs font-black text-blue-600 dark:text-blue-400 mb-1">0{i + 1}</div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">{s.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{s.goal}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400"><span className="font-semibold text-slate-700 dark:text-slate-300">Gate: </span>{s.gate}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>

    <Section bg="gray">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">Six principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRINCIPLES.map(([t, b]) => (
            <div key={t} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">{t}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{b}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/secops/assessment" className="inline-flex items-center gap-2 px-7 py-3 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors">
            Take the Cloud Security Assessment <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </Section>
  </>
);

export default DevSecOpsPlaybook;
