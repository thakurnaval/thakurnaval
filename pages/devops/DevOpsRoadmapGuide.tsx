import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download, Mail, CheckCircle2, Loader2, AlertCircle,
  Lock, Unlock, Map, ArrowRight, Layers, GitBranch,
} from 'lucide-react';
import Section from '../../components/Section';
import SEO from '../../components/SEO';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx03K6mwLMtq6X5q8JIAHKQ4qSxCk9LEavNeO0IWo1jg9IxhzFoxvZM0DwKtgMegKDz1Q/exec';

const MATURITY_LEVELS = [
  { level: 'L1', name: 'Ad Hoc', color: 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700', desc: 'Manual processes, siloed teams, heroic deployments. Every release is a risk event.' },
  { level: 'L2', name: 'Defined', color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800', desc: 'Documented processes, basic CI, some automation. Reproducible but not yet continuous.' },
  { level: 'L3', name: 'Measured', color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800', desc: 'Full CI/CD pipeline, automated testing, DORA metrics tracked, culture shift underway.' },
  { level: 'L4', name: 'Optimised', color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800', desc: 'Platform engineering, self-service, SRE practices, FinOps integrated. DevOps is invisible — it\'s just how you work.' },
  { level: 'L5', name: 'AI-Native', color: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800', desc: 'AI-assisted code review, automated incident triage, intelligent capacity planning. Cognitive DevOps.' },
];

const DOMAINS = [
  { name: 'CI/CD Pipelines', icon: '⚡', desc: 'Build → test → deploy automation', l1: 'Manual builds', l2: 'Basic CI (build + unit test)', l3: 'Full pipeline + environments', l4: 'Blue-green, canary, feature flags', l5: 'AI-optimised release decisions' },
  { name: 'Test Automation', icon: '✅', desc: 'Quality gates at every stage', l1: 'Manual QA only', l2: 'Unit tests in CI', l3: 'Unit + integration + e2e, &gt;80% coverage', l4: 'Contract testing, chaos injection', l5: 'AI-generated test coverage' },
  { name: 'Infrastructure as Code', icon: '🏗️', desc: 'Reproducible, auditable infra', l1: 'Click-ops / manual', l2: 'Basic scripts', l3: 'Terraform/Pulumi, modular', l4: 'Policy-as-code, drift detection', l5: 'AI-generated IaC from intent' },
  { name: 'Observability', icon: '📊', desc: 'Know what your system is doing', l1: 'Reactive / alert when broken', l2: 'Basic logs + uptime alerts', l3: 'Metrics + logs + traces (OTel)', l4: 'SLO-driven alerting, correlation', l5: 'AI anomaly detection, auto-runbooks' },
  { name: 'Security (DevSecOps)', icon: '🔒', desc: 'Shift security left', l1: 'Security after deployment', l2: 'Vulnerability scans in CI', l3: 'SAST + DAST + container scanning', l4: 'Policy enforcement, SBOM, zero-trust', l5: 'AI threat modelling in SDLC' },
  { name: 'Platform Engineering', icon: '🛠️', desc: 'Internal developer platform', l1: 'No platform — raw cloud', l2: 'Shared scripts + Slack ops', l3: 'Golden paths, self-service templates', l4: 'IDP with service catalogue', l5: 'AI-powered developer portal' },
];

const generateDevOpsRoadmapPDF = (email: string) => {
  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>DevOps Maturity Roadmap — Naval Thakur</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; background: #fff; font-size: 12px; line-height: 1.6; }
  .page { padding: 48px 56px; min-height: 100vh; page-break-after: always; }
  .cover { background: linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 60%, #2563eb 100%); color: white; display: flex; flex-direction: column; justify-content: center; min-height: 100vh; padding: 72px 64px; page-break-after: always; }
  .cover-tag { font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #bfdbfe; margin-bottom: 24px; }
  .cover-title { font-size: 52px; font-weight: 800; line-height: 1.05; color: white; margin-bottom: 16px; }
  .cover-subtitle { font-size: 18px; color: #dbeafe; margin-bottom: 48px; max-width: 480px; line-height: 1.5; }
  .cover-author { font-size: 13px; color: #93c5fd; }
  .cover-author strong { color: #dbeafe; }
  .cover-line { width: 60px; height: 4px; background: #60a5fa; margin: 40px 0; }
  h1 { font-size: 28px; font-weight: 800; color: #1d4ed8; margin-bottom: 8px; }
  h2 { font-size: 18px; font-weight: 700; color: #1d4ed8; margin: 28px 0 10px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
  h3 { font-size: 14px; font-weight: 700; color: #1e293b; margin: 18px 0 6px; }
  p { margin-bottom: 10px; color: #475569; }
  .level-card { display: flex; gap: 16px; align-items: flex-start; padding: 12px 16px; border-radius: 8px; margin: 8px 0; }
  .level-badge { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; min-width: 60px; padding: 4px 8px; border-radius: 4px; text-align: center; }
  .l1-badge { background: #e2e8f0; color: #475569; }
  .l2-badge { background: #dbeafe; color: #1e40af; }
  .l3-badge { background: #dcfce7; color: #166534; }
  .l4-badge { background: #f3e8ff; color: #6d28d9; }
  .l5-badge { background: #fef3c7; color: #92400e; }
  .l1-card { background: #f8fafc; border: 1px solid #e2e8f0; }
  .l2-card { background: #eff6ff; border: 1px solid #bfdbfe; }
  .l3-card { background: #f0fdf4; border: 1px solid #bbf7d0; }
  .l4-card { background: #faf5ff; border: 1px solid #e9d5ff; }
  .l5-card { background: #fffbeb; border: 1px solid #fde68a; }
  .level-name { font-weight: 700; color: #1e293b; margin-bottom: 2px; }
  .level-desc { font-size: 11px; color: #64748b; }
  .domain-section { margin: 24px 0; }
  .domain-header { background: #1e3a5f; color: white; padding: 10px 16px; border-radius: 8px 8px 0 0; font-weight: 700; font-size: 13px; }
  .domain-grid { display: grid; grid-template-columns: repeat(5, 1fr); border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; overflow: hidden; }
  .domain-cell { padding: 8px 10px; border-right: 1px solid #e2e8f0; }
  .domain-cell:last-child { border-right: none; }
  .domain-cell-header { background: #f1f5f9; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; }
  .cell-l2 { background: #eff6ff; }
  .cell-l3 { background: #f0fdf4; }
  .cell-l4 { background: #faf5ff; }
  .cell-l5 { background: #fffbeb; }
  .cell-text { font-size: 10px; color: #475569; }
  .callout { padding: 14px 18px; border-radius: 8px; margin: 16px 0; }
  .callout-blue { background: #eff6ff; border: 1px solid #bfdbfe; }
  .callout-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #1d4ed8; margin-bottom: 4px; }
  .dora-table { width: 100%; border-collapse: collapse; margin: 12px 0; }
  .dora-table th { background: #1e3a5f; color: white; padding: 8px 10px; text-align: left; font-size: 11px; }
  .dora-table td { padding: 7px 10px; border-bottom: 1px solid #f1f5f9; font-size: 11px; color: #475569; }
  .dora-table tr:nth-child(even) td { background: #f8fafc; }
  .elite { color: #166534; font-weight: 700; }
  .high { color: #1d4ed8; font-weight: 600; }
  .med { color: #d97706; font-weight: 600; }
  .low { color: #dc2626; }
  ul { padding-left: 18px; margin-bottom: 12px; }
  li { margin-bottom: 5px; color: #475569; font-size: 11px; }
  .footer { margin-top: 40px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 10px; color: #94a3b8; display: flex; justify-content: space-between; }
  @media print { .no-print { display: none; } }
</style>
</head>
<body>

<!-- Cover -->
<div class="cover">
  <div class="cover-tag">DevOps Maturity Roadmap</div>
  <div class="cover-title">DevOps Roadmap</div>
  <div class="cover-subtitle">A one-page visual roadmap across 5 maturity levels and 6 DevOps capability domains. Know where you are, and know exactly where to go next.</div>
  <div class="cover-line"></div>
  <div class="cover-author">By <strong>Naval Thakur</strong> · nthakur.com</div>
  <div class="cover-author" style="margin-top:8px">Prepared for: <strong>${email}</strong></div>
</div>

<!-- Page 2: The 5 Levels -->
<div class="page">
  <h1>The 5 DevOps Maturity Levels</h1>
  <p>DevOps maturity is not a binary. It's a progression — and most organisations sit between levels, strong in some domains, lagging in others. The key is knowing where you are in each domain so you can target the right level of investment.</p>

  <div class="level-card l1-card">
    <div class="level-badge l1-badge">L1</div>
    <div><div class="level-name">Ad Hoc</div><div class="level-desc">Manual processes, siloed teams, heroic deployments. Every release is a risk event. Knowledge is tribal. Deployment frequency is measured in months, not days. DORA metrics are unknown or not tracked.</div></div>
  </div>
  <div class="level-card l2-card">
    <div class="level-badge l2-badge">L2</div>
    <div><div class="level-name">Defined</div><div class="level-desc">Documented processes exist. Basic CI is in place (build + unit test). Some automation reduces the most painful manual steps. Release cadence is weekly or fortnightly. Teams are beginning to collaborate across the Dev/Ops boundary.</div></div>
  </div>
  <div class="level-card l3-card">
    <div class="level-badge l3-badge">L3</div>
    <div><div class="level-name">Measured</div><div class="level-desc">Full CI/CD pipeline. Automated testing at multiple levels. DORA metrics tracked and reviewed. Culture is shifting — engineers own their deployments. Deployments are daily. Observability is in place and alerts are actionable, not noisy.</div></div>
  </div>
  <div class="level-card l4-card">
    <div class="level-badge l4-badge">L4</div>
    <div><div class="level-name">Optimised</div><div class="level-desc">Platform engineering provides a self-service IDP. SRE practices (SLOs, error budgets) govern reliability. FinOps is integrated into the engineering workflow. DevOps is invisible — it's just how the organisation ships software.</div></div>
  </div>
  <div class="level-card l5-card">
    <div class="level-badge l5-badge">L5</div>
    <div><div class="level-name">AI-Native (Cognitive DevOps)</div><div class="level-desc">AI assistants in the SDLC (code review, test generation, incident triage). Intelligent capacity planning and deployment decisions. Feedback loops between production data and development tooling. The CognitiveOps Model in practice.</div></div>
  </div>

  <h2>The DORA Four — Your Baseline Metrics</h2>
  <p>The DORA Research Program identifies four metrics that predict software delivery performance and, by extension, organisational performance. Know your numbers — they tell you your level more accurately than any self-assessment.</p>

  <table class="dora-table">
    <tr><th>Metric</th><th class="elite">Elite</th><th class="high">High</th><th class="med">Medium</th><th class="low">Low</th></tr>
    <tr><td><strong>Deployment Frequency</strong></td><td class="elite">On demand (many/day)</td><td class="high">Daily to weekly</td><td class="med">Weekly to monthly</td><td class="low">Monthly to 6 months</td></tr>
    <tr><td><strong>Lead Time for Changes</strong></td><td class="elite">&lt;1 hour</td><td class="high">1 day to 1 week</td><td class="med">1 week to 1 month</td><td class="low">1–6 months</td></tr>
    <tr><td><strong>Mean Time to Restore (MTTR)</strong></td><td class="elite">&lt;1 hour</td><td class="high">&lt;1 day</td><td class="med">1 day to 1 week</td><td class="low">1 week to 1 month</td></tr>
    <tr><td><strong>Change Failure Rate</strong></td><td class="elite">0–5%</td><td class="high">5–10%</td><td class="med">11–15%</td><td class="low">&gt;15%</td></tr>
  </table>

  <div class="callout callout-blue">
    <div class="callout-title">How to use DORA</div>
    <p style="font-size:11px; margin:0; color:#1e40af">Measure these four metrics for the last 90 days. Your weakest metric reveals your most important DevOps investment. High MTTR with low deployment frequency usually means observability is the gap. High change failure rate with high deployment frequency usually means test automation or feature flags are the gap.</p>
  </div>

  <div class="footer"><span>DevOps Maturity Roadmap · nthakur.com · © Naval Thakur</span><span>Page 2</span></div>
</div>

<!-- Page 3: Domain Roadmap Matrix -->
<div class="page">
  <h1>The DevOps Domain Roadmap</h1>
  <p>This is the core of the guide: a maturity view across 6 DevOps capability domains. For each domain, understand where L1 ends and L3 begins — that gap is almost always your highest-leverage investment.</p>

  <div class="domain-section">
    <div class="domain-header">⚡ CI/CD Pipelines — Build → Test → Deploy Automation</div>
    <div class="domain-grid">
      <div class="domain-cell domain-cell-header cell-text">L1: Ad Hoc</div>
      <div class="domain-cell domain-cell-header cell-l2 cell-text">L2: Defined</div>
      <div class="domain-cell domain-cell-header cell-l3 cell-text">L3: Measured</div>
      <div class="domain-cell domain-cell-header cell-l4 cell-text">L4: Optimised</div>
      <div class="domain-cell domain-cell-header cell-l5 cell-text">L5: AI-Native</div>
      <div class="domain-cell cell-text">Manual builds. Scripts on developer machines.</div>
      <div class="domain-cell cell-l2 cell-text">CI on main branch. Build + unit test. Shared artifact registry.</div>
      <div class="domain-cell cell-l3 cell-text">Full pipeline: build, test, security scan, deploy to all envs. Automated rollback.</div>
      <div class="domain-cell cell-l4 cell-text">Blue/green, canary, feature flags. Progressive delivery as standard.</div>
      <div class="domain-cell cell-l5 cell-text">AI analyses deployment patterns and suggests optimal release windows. Auto-rollback on anomaly detection.</div>
    </div>
  </div>

  <div class="domain-section">
    <div class="domain-header">✅ Test Automation — Quality Gates at Every Stage</div>
    <div class="domain-grid">
      <div class="domain-cell cell-text">Manual QA team. Testing as a phase, not a gate.</div>
      <div class="domain-cell cell-l2 cell-text">Unit tests in CI. Some smoke tests. Coverage tracked but not enforced.</div>
      <div class="domain-cell cell-l3 cell-text">Unit + integration + e2e automated. &gt;80% coverage enforced as pipeline gate.</div>
      <div class="domain-cell cell-l4 cell-text">Contract testing. Chaos injection. Performance regression gates.</div>
      <div class="domain-cell cell-l5 cell-text">AI generates missing test cases from production failure patterns. Coverage recommendations per commit.</div>
    </div>
  </div>

  <div class="domain-section">
    <div class="domain-header">🏗️ Infrastructure as Code — Reproducible, Auditable Infrastructure</div>
    <div class="domain-grid">
      <div class="domain-cell cell-text">Click-ops. Manual runbooks. Snowflake servers. Knowledge in Confluence.</div>
      <div class="domain-cell cell-l2 cell-text">Basic Terraform or ARM. Not modular. Environments diverge over time.</div>
      <div class="domain-cell cell-l3 cell-text">Modular Terraform/Pulumi. State managed centrally. Environments are identical.</div>
      <div class="domain-cell cell-l4 cell-text">Policy-as-code (OPA, Sentinel). Drift detection. Infra changes reviewed like code.</div>
      <div class="domain-cell cell-l5 cell-text">AI generates IaC from architecture diagrams or natural-language intent. Cost estimated on PR.</div>
    </div>
  </div>

  <div class="domain-section">
    <div class="domain-header">📊 Observability — Know What Your System is Doing</div>
    <div class="domain-grid">
      <div class="domain-cell cell-text">Reactive. You find out from users. Basic uptime check.</div>
      <div class="domain-cell cell-l2 cell-text">Logs + basic metric alerts. Dashboards exist but aren't maintained.</div>
      <div class="domain-cell cell-l3 cell-text">Metrics + logs + distributed traces (OpenTelemetry). SLOs defined per service.</div>
      <div class="domain-cell cell-l4 cell-text">SLO-driven alerting. Error budgets. Correlation across signals. On-call is sustainable.</div>
      <div class="domain-cell cell-l5 cell-text">AI anomaly detection. Auto-generated runbooks from incident history. Predictive paging.</div>
    </div>
  </div>

  <div class="domain-section">
    <div class="domain-header">🔒 Security (DevSecOps) — Shift Security Left</div>
    <div class="domain-grid">
      <div class="domain-cell cell-text">Security as a gate after deployment. Pen test once a year.</div>
      <div class="domain-cell cell-l2 cell-text">Dependency scanning in CI. Secrets management started.</div>
      <div class="domain-cell cell-l3 cell-text">SAST + DAST + container image scanning. Secrets never in code. SBOM generated.</div>
      <div class="domain-cell cell-l4 cell-text">Policy enforcement via OPA. Zero-trust networking. Supply chain integrity (SLSA L3+).</div>
      <div class="domain-cell cell-l5 cell-text">AI threat modelling integrated into design phase. Auto-remediation of known CVEs in low-risk paths.</div>
    </div>
  </div>

  <div class="domain-section">
    <div class="domain-header">🛠️ Platform Engineering — Internal Developer Platform</div>
    <div class="domain-grid">
      <div class="domain-cell cell-text">No platform. Raw cloud access. Every team reinvents build scripts.</div>
      <div class="domain-cell cell-l2 cell-text">Shared scripts. Some golden paths exist but aren't official.</div>
      <div class="domain-cell cell-l3 cell-text">Self-service templates. Golden paths for common patterns. Platform team exists.</div>
      <div class="domain-cell cell-l4 cell-text">Full IDP with service catalogue (Backstage etc.). Onboarding is minutes not days.</div>
      <div class="domain-cell cell-l5 cell-text">AI-powered portal interprets intent, scaffolds services, and recommends architecture patterns.</div>
    </div>
  </div>

  <div class="footer"><span>DevOps Maturity Roadmap · nthakur.com · © Naval Thakur</span><span>Page 3</span></div>
</div>

<!-- Page 4: Your Roadmap + Action Plan -->
<div class="page">
  <h1>Building Your DevOps Roadmap</h1>

  <h2>Step 1: Score yourself per domain (1–5)</h2>
  <table class="dora-table">
    <tr><th>Domain</th><th>Your Level (1–5)</th><th>Target Level (90 days)</th><th>Key Gap</th></tr>
    <tr><td>CI/CD Pipelines</td><td></td><td></td><td></td></tr>
    <tr><td>Test Automation</td><td></td><td></td><td></td></tr>
    <tr><td>Infrastructure as Code</td><td></td><td></td><td></td></tr>
    <tr><td>Observability</td><td></td><td></td><td></td></tr>
    <tr><td>Security (DevSecOps)</td><td></td><td></td><td></td></tr>
    <tr><td>Platform Engineering</td><td></td><td></td><td></td></tr>
  </table>

  <h2>Step 2: Identify your chokepoint domain</h2>
  <p>The domain with the biggest gap between your current level and the level that limits your DORA metrics is your chokepoint. This is where to invest first. Common patterns:</p>
  <ul>
    <li>High change failure rate → Test automation gap at L2→L3</li>
    <li>High MTTR → Observability gap at L2→L3 (SLOs not defined)</li>
    <li>Low deployment frequency → CI/CD pipeline incomplete at L1→L2</li>
    <li>Long lead time → Platform engineering gap; too much friction in self-service</li>
  </ul>

  <h2>Step 3: Your 90-day DevOps plan</h2>
  <div class="callout callout-blue">
    <div class="callout-title">30-Day Quick Win</div>
    <p style="font-size:11px; margin:0; color:#1e40af">Pick one domain at L1. Define what L2 looks like in your context. Implement it in one team as a pilot. Measure the before/after DORA metric. Socialise the result. The data will justify the next investment.</p>
  </div>
  <div class="callout" style="background:#f0fdf4; border:1px solid #bbf7d0;">
    <div class="callout-title" style="color:#166534">60-Day Expansion</div>
    <p style="font-size:11px; margin:0; color:#166534">Roll the L1→L2 improvement to all teams. Begin the L2→L3 transition in the same domain. Start tracking DORA metrics formally — monthly review with engineering leadership.</p>
  </div>
  <div class="callout" style="background:#faf5ff; border:1px solid #e9d5ff;">
    <div class="callout-title" style="color:#6d28d9">90-Day Platform View</div>
    <p style="font-size:11px; margin:0; color:#6d28d9">Begin your second domain. Share your DORA baseline publicly with the team. Define what L4 looks like for your organisation. This is when DevOps becomes a practice, not a project.</p>
  </div>

  <h2>The DevOps North Star</h2>
  <p>The goal of DevOps is not speed for speed's sake. It's to reduce the cost of change — the effort, risk, and lead time required to safely deliver business value. When the cost of change is low, experiments are cheap, learning is fast, and innovation is sustainable.</p>
  <p>Measure your progress against DORA metrics. Your DevOps investment is justified when your deployment frequency increases and your change failure rate decreases simultaneously — that's the signal that you've built real capability, not just velocity.</p>

  <div style="margin-top:32px; padding:18px; background:#1e3a5f; border-radius:10px; color:white">
    <div style="font-size:10px; text-transform:uppercase; letter-spacing:2px; color:#93c5fd; font-weight:700; margin-bottom:6px">Take the DevOps Assessment</div>
    <div style="font-size:13px; font-weight:700; margin-bottom:6px">Get your scored DevOps maturity report</div>
    <div style="font-size:11px; color:#dbeafe">The free DevOps maturity assessment at nthakur.com/devops/assessment scores you across all six domains and gives you a prioritised set of recommendations. Takes 8 minutes.</div>
  </div>

  <div class="footer"><span>DevOps Maturity Roadmap · nthakur.com · © Naval Thakur 2026 · All rights reserved</span><span>Page 4</span></div>
</div>

<script>setTimeout(() => window.print(), 400);</script>
</body></html>`);
  win.document.close();
};

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "DevOps Maturity Roadmap PDF — Free Download",
      "description": "A visual one-page DevOps maturity roadmap across 5 levels and 6 domains: CI/CD, testing, IaC, observability, DevSecOps, and platform engineering.",
      "author": { "@type": "Person", "name": "Naval Thakur", "url": "https://nthakur.com/about" },
      "url": "https://nthakur.com/devops/roadmap-guide",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nthakur.com" },
        { "@type": "ListItem", "position": 2, "name": "DevOps", "item": "https://nthakur.com/devops" },
        { "@type": "ListItem", "position": 3, "name": "Roadmap Guide", "item": "https://nthakur.com/devops/roadmap-guide" },
      ]
    }
  ]
};

const DevOpsRoadmapGuide: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const form = new FormData();
      form.append('email', email);
      form.append('name', 'DevOps Roadmap Download');
      form.append('topic', 'DevOps Maturity Roadmap PDF Download');
      form.append('message', 'User requested DevOps Maturity Roadmap PDF.');
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: form, mode: 'no-cors' });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <SEO
        title="DevOps Maturity Roadmap PDF — Free Download | Naval Thakur"
        description="A visual DevOps maturity roadmap across 5 levels and 6 domains: CI/CD pipelines, test automation, IaC, observability, DevSecOps, and platform engineering. Free PDF — email gate."
        structuredData={SCHEMA}
      />

      {/* Hero */}
      <div className="relative bg-primary text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900/30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-400/40 bg-blue-400/10 text-blue-300 text-sm font-bold mb-6">
                <Map size={14} /> Free PDF · Visual Roadmap
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">DevOps Maturity Roadmap</h1>
              <p className="text-xl text-slate-200 leading-relaxed mb-6">
                5 maturity levels. 6 capability domains. One visual roadmap so you know exactly where you are, and exactly where to go next. Built for practitioners, not slideware.
              </p>
              <div className="space-y-2">
                {['5-level maturity framework (Ad Hoc → AI-Native)', 'DORA metrics benchmark table', 'Domain matrix: CI/CD, testing, IaC, observability, DevSecOps, platform', '90-day action plan template'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 size={14} className="text-blue-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Email gate */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-200/20">
              {status === 'success' ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Unlock className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Roadmap unlocked</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Your DevOps roadmap is ready. Open and save as PDF.</p>
                  <button
                    onClick={() => generateDevOpsRoadmapPDF(email)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors"
                  >
                    <Download size={16} /> Open &amp; Save PDF
                  </button>
                  <p className="text-xs text-slate-400 mt-3">Use "Save as PDF" in the print dialog.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Lock className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">Get the free roadmap</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Enter your email to unlock instant access</p>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Work email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                          type="email" required value={email} onChange={e => setEmail(e.target.value)}
                          placeholder="you@company.com" disabled={status === 'submitting'}
                          className="w-full pl-9 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:opacity-50"
                        />
                      </div>
                      {status === 'error' && (
                        <div className="flex items-center gap-1 mt-2 text-red-600 dark:text-red-400 text-xs">
                          <AlertCircle size={12} /> Something went wrong — please try again.
                        </div>
                      )}
                    </div>
                    <button
                      type="submit" disabled={status === 'submitting'}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors disabled:opacity-70"
                    >
                      {status === 'submitting' ? <><Loader2 className="animate-spin" size={16} /> Unlocking…</> : <><Download size={16} /> Download Free Roadmap</>}
                    </button>
                  </form>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 text-center">
                    No spam. Unsubscribe from The CognitiveOps Brief anytime.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Maturity levels */}
      <Section bg="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">5 levels of DevOps maturity</h2>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-10">Most teams sit between levels — strong in one domain, lagging in another. That's normal. The roadmap helps you see the full picture.</p>
          <div className="space-y-3">
            {MATURITY_LEVELS.map(lvl => (
              <div key={lvl.level} className={`rounded-xl border p-5 flex items-start gap-4 ${lvl.color}`}>
                <span className="text-xs font-black text-slate-400 min-w-[36px] mt-0.5">{lvl.level}</span>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">{lvl.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{lvl.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Domains */}
      <Section bg="gray">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">6 DevOps capability domains</h2>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-10">The PDF maps all 6 domains across all 5 levels — your complete visual reference.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DOMAINS.map(d => (
              <div key={d.name} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{d.icon}</span>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{d.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{d.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400 mt-3">
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">{d.l1}</span>
                  <ArrowRight size={10} />
                  <span className="px-2 py-0.5 bg-green-50 dark:bg-green-900/20 rounded text-green-700 dark:text-green-400 font-medium">{d.l3}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-primary rounded-2xl p-8 text-white">
            <GitBranch className="w-10 h-10 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">Take the DevOps Assessment</h2>
            <p className="text-slate-200 mb-6">The free DevOps maturity assessment gives you a scored report across all 6 domains and a personalised set of next steps.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/devops/assessment" className="inline-flex items-center gap-2 px-7 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400 transition-colors">
                Take the Assessment <ArrowRight size={15} />
              </Link>
              <Link to="/devops" className="inline-flex items-center gap-2 px-7 py-3 border border-white/30 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">
                Explore DevOps <Layers size={15} />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default DevOpsRoadmapGuide;
