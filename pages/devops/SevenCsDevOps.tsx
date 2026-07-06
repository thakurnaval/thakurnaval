import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download, Mail, CheckCircle2, Loader2, AlertCircle,
  Lock, Unlock, GitBranch, Users, Shield, Layers, ArrowRight,
} from 'lucide-react';
import Section from '../../components/Section';
import SEO from '../../components/SEO';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx03K6mwLMtq6X5q8JIAHKQ4qSxCk9LEavNeO0IWo1jg9IxhzFoxvZM0DwKtgMegKDz1Q/exec';

const SEVEN_CS = [
  { c: 'Culture', icon: '🌱', tagline: 'The foundation before the pipeline', color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800', accentColor: 'text-green-700 dark:text-green-400', desc: 'DevOps without a culture change is automation theatre. The shift from "Dev throws code over the wall to Ops" to "everyone owns the product end-to-end" is a people transformation, not a tool purchase.' },
  { c: 'Collaboration', icon: '🤝', tagline: 'Breaking the silo by design', color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800', accentColor: 'text-blue-700 dark:text-blue-400', desc: 'Cross-functional teams, shared on-call, shared post-mortems, shared OKRs. Collaboration is not a value statement — it\'s a structural decision. If your org chart separates Dev and Ops, the collaboration will be limited regardless of tooling.' },
  { c: 'Continuous Integration', icon: '⚡', tagline: 'Integrate early. Fail fast. Learn faster.', color: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800', accentColor: 'text-amber-700 dark:text-amber-400', desc: 'Every commit triggers a build and test cycle. Broken builds are fixed immediately — they\'re not left for tomorrow. CI is the feedback loop that prevents "integration hell" at the end of a sprint.' },
  { c: 'Continuous Delivery', icon: '🚀', tagline: 'Every build is deployable. Always.', color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800', accentColor: 'text-purple-700 dark:text-purple-400', desc: 'CD extends CI through to a deployment-ready artefact. The decision to deploy is a business decision, not a technical risk. CD removes the fear from "when can we deploy?" — the answer becomes "whenever we want."' },
  { c: 'Continuous Testing', icon: '✅', tagline: 'Quality as a pipeline gate, not an afterthought', color: 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800', accentColor: 'text-rose-700 dark:text-rose-400', desc: 'Testing at every stage of the pipeline: unit, integration, contract, performance, security. The later a bug is found, the more expensive it is to fix. Continuous testing shifts that cost to the left — where it\'s cheapest.' },
  { c: 'Continuous Monitoring', icon: '📊', tagline: 'You can\'t own what you can\'t see', color: 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800', accentColor: 'text-cyan-700 dark:text-cyan-400', desc: 'Metrics, logs, and traces from production feed back into development decisions. SLOs define what "working" means. Error budgets make reliability a negotiation, not a constraint. Observability is the engineering practice; monitoring is the output.' },
  { c: 'Continuous Learning', icon: '🔄', tagline: 'The loop that sustains everything else', color: 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700', accentColor: 'text-slate-700 dark:text-slate-400', desc: 'Blameless post-mortems, retrospectives, DORA metric reviews, and psychological safety to surface problems. Without continuous learning, the other six Cs plateau. Teams repeat the same incidents because they don\'t have the culture to learn from them.' },
];

const generateSevenCsPDF = (email: string) => {
  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>The 7 Cs of DevOps — Naval Thakur</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; background: #fff; font-size: 12px; line-height: 1.6; }
  .page { padding: 48px 56px; min-height: 100vh; page-break-after: always; }
  .cover { background: linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #334155 100%); color: white; display: flex; flex-direction: column; justify-content: center; min-height: 100vh; padding: 72px 64px; page-break-after: always; }
  .cover-tag { font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #94a3b8; margin-bottom: 24px; }
  .cover-title { font-size: 52px; font-weight: 800; line-height: 1.05; color: white; margin-bottom: 16px; }
  .cover-subtitle { font-size: 18px; color: #cbd5e1; margin-bottom: 48px; max-width: 480px; line-height: 1.5; }
  .cover-author { font-size: 13px; color: #94a3b8; }
  .cover-author strong { color: #e2e8f0; }
  .cover-line { width: 60px; height: 4px; background: #3b82f6; margin: 40px 0; }
  .cover-origin { margin-top: 32px; padding: 14px 18px; background: rgba(255,255,255,0.07); border-radius: 8px; border: 1px solid rgba(255,255,255,0.12); }
  .cover-origin-label { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8; font-weight: 700; margin-bottom: 4px; }
  .cover-origin-text { font-size: 12px; color: #cbd5e1; }
  h1 { font-size: 26px; font-weight: 800; color: #1e293b; margin-bottom: 8px; }
  h2 { font-size: 17px; font-weight: 700; color: #1e293b; margin: 28px 0 10px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
  h3 { font-size: 13px; font-weight: 700; color: #1e293b; margin: 16px 0 5px; }
  p { margin-bottom: 10px; color: #475569; font-size: 12px; }
  .c-card { border-radius: 10px; margin: 14px 0; overflow: hidden; }
  .c-header { padding: 12px 16px; display: flex; align-items: center; gap: 12px; }
  .c-number { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8; }
  .c-icon { font-size: 22px; }
  .c-title-block { flex: 1; }
  .c-title { font-size: 18px; font-weight: 800; color: #1e293b; }
  .c-tagline { font-size: 11px; color: #64748b; font-style: italic; }
  .c-body { padding: 12px 16px 14px; }
  .c-desc { font-size: 12px; color: #374151; margin-bottom: 10px; }
  .c-action-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin-bottom: 4px; }
  .c-action { font-size: 11px; color: #374151; padding: 6px 10px; border-radius: 4px; margin-bottom: 3px; display: flex; gap: 6px; }
  .green-card { background: #f0fdf4; border: 1px solid #bbf7d0; }
  .green-header { background: #dcfce7; }
  .blue-card { background: #eff6ff; border: 1px solid #bfdbfe; }
  .blue-header { background: #dbeafe; }
  .amber-card { background: #fffbeb; border: 1px solid #fde68a; }
  .amber-header { background: #fef3c7; }
  .purple-card { background: #faf5ff; border: 1px solid #e9d5ff; }
  .purple-header { background: #f3e8ff; }
  .rose-card { background: #fff1f2; border: 1px solid #fecdd3; }
  .rose-header { background: #ffe4e6; }
  .cyan-card { background: #ecfeff; border: 1px solid #a5f3fc; }
  .cyan-header { background: #cffafe; }
  .slate-card { background: #f8fafc; border: 1px solid #e2e8f0; }
  .slate-header { background: #f1f5f9; }
  .callout { padding: 14px 18px; border-radius: 8px; margin: 16px 0; }
  .callout-blue { background: #eff6ff; border: 1px solid #bfdbfe; }
  .callout-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #1d4ed8; margin-bottom: 4px; }
  .table { width: 100%; border-collapse: collapse; margin: 12px 0; }
  .table th { background: #1e293b; color: white; padding: 8px 10px; text-align: left; font-size: 11px; }
  .table td { padding: 7px 10px; border-bottom: 1px solid #f1f5f9; font-size: 11px; color: #475569; }
  .table tr:nth-child(even) td { background: #f8fafc; }
  ul { padding-left: 18px; margin-bottom: 10px; }
  li { margin-bottom: 4px; color: #475569; font-size: 11px; }
  .footer { margin-top: 40px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 10px; color: #94a3b8; display: flex; justify-content: space-between; }
  @media print { .no-print { display: none; } }
</style>
</head>
<body>

<!-- Cover -->
<div class="cover">
  <div class="cover-tag">DevOps Mini-Guide · 7-Part Framework</div>
  <div class="cover-title">The 7 Cs of DevOps</div>
  <div class="cover-subtitle">A concise, shareable framework for understanding — and explaining — DevOps as a complete practice: from culture to continuous learning.</div>
  <div class="cover-line"></div>
  <div class="cover-author">By <strong>Naval Thakur</strong> · nthakur.com</div>
  <div class="cover-author" style="margin-top:8px">Prepared for: <strong>${email}</strong></div>
  <div class="cover-origin">
    <div class="cover-origin-label">Origin</div>
    <div class="cover-origin-text">This framework was originally presented by Naval Thakur in an internal DevOps session in 2018. The 7 Cs structure was designed to give engineering teams a memorable, complete picture of what DevOps transformation actually involves — beyond CI/CD tooling.</div>
  </div>
</div>

<!-- Page 2: The Framework intro + C1 & C2 -->
<div class="page">
  <h1>The 7 Cs of DevOps</h1>
  <p>DevOps is three things at once: a culture, a set of practices, and a feedback loop. Most teams adopt the practices (CI/CD, automation) without the culture, and wonder why their deployments are still painful. The 7 Cs framework addresses all three dimensions — and puts them in the right order.</p>

  <div class="callout callout-blue">
    <div class="callout-title">Why "7 Cs"?</div>
    <p style="font-size:11px; margin:0; color:#1e40af">The framework is structured as a progression. C1 (Culture) and C2 (Collaboration) are preconditions — not starting points for a sprint. Without them, the technical Cs (CI, CD, CT, CM) produce local efficiency but not systemic transformation. C7 (Continuous Learning) is what keeps all the others from degrading over time.</p>
  </div>

  <div class="c-card green-card">
    <div class="c-header green-header">
      <div class="c-number">C1</div>
      <div class="c-icon">🌱</div>
      <div class="c-title-block">
        <div class="c-title">Culture</div>
        <div class="c-tagline">The foundation before the pipeline</div>
      </div>
    </div>
    <div class="c-body">
      <div class="c-desc">DevOps without culture change is automation theatre. You can deploy ten times a day and still have a toxic, blame-heavy, siloed organisation. The shift from "Dev throws code over the wall to Ops" to "everyone owns the product end-to-end" is a people transformation, not a tool purchase.</div>
      <div class="c-action-title">What good looks like</div>
      <div class="c-action"><span>→</span> Blameless post-mortems: incidents are system failures, not human failures</div>
      <div class="c-action"><span>→</span> Psychological safety: engineers surface problems without fear of consequence</div>
      <div class="c-action"><span>→</span> Shared ownership: "the service" belongs to a product team, not a department</div>
      <div class="c-action"><span>→</span> Leadership models the behaviour: no executive exemption from the principles</div>
    </div>
  </div>

  <div class="c-card blue-card">
    <div class="c-header blue-header">
      <div class="c-number">C2</div>
      <div class="c-icon">🤝</div>
      <div class="c-title-block">
        <div class="c-title">Collaboration</div>
        <div class="c-tagline">Breaking the silo by design</div>
      </div>
    </div>
    <div class="c-body">
      <div class="c-desc">Collaboration is not a value statement — it's a structural decision. If your org chart places Dev and Ops in separate reporting lines with different performance metrics, the collaboration will be superficial regardless of tooling or values posters.</div>
      <div class="c-action-title">What good looks like</div>
      <div class="c-action"><span>→</span> Cross-functional product teams: devs and ops engineers own the same outcome</div>
      <div class="c-action"><span>→</span> Shared on-call: everyone feels the pain of what they ship</div>
      <div class="c-action"><span>→</span> Shared OKRs: aligned incentives prevent the classic "Dev wants velocity, Ops wants stability" standoff</div>
      <div class="c-action"><span>→</span> Collaborative incident review: not "who broke it" but "how do we prevent the next one"</div>
    </div>
  </div>

  <div class="footer"><span>The 7 Cs of DevOps · nthakur.com · © Naval Thakur</span><span>Page 2</span></div>
</div>

<!-- Page 3: C3 & C4 -->
<div class="page">
  <div class="c-card amber-card">
    <div class="c-header amber-header">
      <div class="c-number">C3</div>
      <div class="c-icon">⚡</div>
      <div class="c-title-block">
        <div class="c-title">Continuous Integration</div>
        <div class="c-tagline">Integrate early. Fail fast. Learn faster.</div>
      </div>
    </div>
    <div class="c-body">
      <div class="c-desc">CI is the practice of every developer merging code to a shared branch multiple times per day, with each merge triggering an automated build and test cycle. The goal is to find integration problems when they are cheap to fix — in minutes, not weeks.</div>
      <div class="c-action-title">What good looks like</div>
      <div class="c-action"><span>→</span> Trunk-based development: short-lived feature branches, merged to main daily</div>
      <div class="c-action"><span>→</span> Build time under 10 minutes: slow builds get skipped, defeating the purpose</div>
      <div class="c-action"><span>→</span> Broken build = highest priority: the team stops and fixes before moving on</div>
      <div class="c-action"><span>→</span> Test suite that developers trust: tests that are slow or flaky don't get run — write fast, deterministic tests</div>
      <div class="c-action-title" style="margin-top:10px">Common anti-patterns</div>
      <div class="c-action"><span>✗</span> Long-lived feature branches merged at sprint end (integration hell)</div>
      <div class="c-action"><span>✗</span> CI "optional" — engineers skip the pipeline for urgent fixes</div>
      <div class="c-action"><span>✗</span> Green build treated as proof of production-readiness (CI is not CD)</div>
    </div>
  </div>

  <div class="c-card purple-card">
    <div class="c-header purple-header">
      <div class="c-number">C4</div>
      <div class="c-icon">🚀</div>
      <div class="c-title-block">
        <div class="c-title">Continuous Delivery</div>
        <div class="c-tagline">Every build is deployable. Always.</div>
      </div>
    </div>
    <div class="c-body">
      <div class="c-desc">Continuous Delivery extends CI through deployment to a production-like environment, producing an artefact that is always ready to release. The decision to deploy is a business decision; the technical risk is managed by the pipeline. Continuous Deployment goes one further — every passing build deploys automatically.</div>
      <div class="c-action-title">The CD Pipeline stages</div>
      <div class="c-action"><span>1.</span> Build: compile, package, create container image</div>
      <div class="c-action"><span>2.</span> Unit + integration test: automated quality gates</div>
      <div class="c-action"><span>3.</span> Security scan: SAST, dependency vulnerabilities, secrets detection</div>
      <div class="c-action"><span>4.</span> Deploy to staging: production-identical environment</div>
      <div class="c-action"><span>5.</span> Smoke + acceptance tests: validate the deployed build</div>
      <div class="c-action"><span>6.</span> Deploy to production: manual approval gate (CD) or automatic (Continuous Deployment)</div>
      <div class="c-action-title" style="margin-top:10px">Deployment patterns at L4 maturity</div>
      <div class="c-action"><span>→</span> Blue/green: two identical environments, instant traffic switch, instant rollback</div>
      <div class="c-action"><span>→</span> Canary: gradual traffic shift — 1% → 10% → 100%, monitoring at each stage</div>
      <div class="c-action"><span>→</span> Feature flags: decouple deploy from release — code in production, feature off until ready</div>
    </div>
  </div>

  <div class="footer"><span>The 7 Cs of DevOps · nthakur.com · © Naval Thakur</span><span>Page 3</span></div>
</div>

<!-- Page 4: C5, C6, C7 -->
<div class="page">
  <div class="c-card rose-card">
    <div class="c-header rose-header">
      <div class="c-number">C5</div>
      <div class="c-icon">✅</div>
      <div class="c-title-block">
        <div class="c-title">Continuous Testing</div>
        <div class="c-tagline">Quality as a pipeline gate, not an afterthought</div>
      </div>
    </div>
    <div class="c-body">
      <div class="c-desc">Testing is not a phase at the end of a sprint. It's a continuous activity woven into every stage of the pipeline. The test pyramid defines the right balance: many fast unit tests at the base, fewer integration tests in the middle, and a small number of slow e2e tests at the top.</div>
      <div class="c-action-title">The test pyramid</div>
      <div class="c-action"><span>▲ Top:</span> End-to-end tests (slow, expensive, test full user journeys) — 5–10%</div>
      <div class="c-action"><span>▲ Mid:</span> Integration tests (test component interfaces, DB queries) — 20–30%</div>
      <div class="c-action"><span>▲ Base:</span> Unit tests (fast, isolated, test individual functions) — 60–70%</div>
      <div class="c-action-title" style="margin-top:10px">Beyond the pyramid</div>
      <div class="c-action"><span>→</span> Contract testing: verify API consumer/provider contracts independently (Pact)</div>
      <div class="c-action"><span>→</span> Performance testing: automated regression on p99 latency and throughput</div>
      <div class="c-action"><span>→</span> Chaos engineering: deliberate failure injection in staging/production to find resilience gaps</div>
    </div>
  </div>

  <div class="c-card cyan-card">
    <div class="c-header cyan-header">
      <div class="c-number">C6</div>
      <div class="c-icon">📊</div>
      <div class="c-title-block">
        <div class="c-title">Continuous Monitoring</div>
        <div class="c-tagline">You can't own what you can't see</div>
      </div>
    </div>
    <div class="c-body">
      <div class="c-desc">Monitoring is the output. Observability is the engineering practice that makes monitoring meaningful. Three pillars: metrics (what is happening), logs (what happened), traces (where did it happen in the request path). Production data should feed back into development decisions.</div>
      <div class="c-action-title">The observability stack</div>
      <div class="c-action"><span>→</span> Metrics: time-series data, dashboards, threshold alerts (Prometheus, Datadog, CloudWatch)</div>
      <div class="c-action"><span>→</span> Logs: structured, correlated, searchable (ELK, Loki, Splunk)</div>
      <div class="c-action"><span>→</span> Traces: distributed request tracing across services (Jaeger, Tempo, X-Ray)</div>
      <div class="c-action"><span>→</span> SLOs: define "working" as a target, not a binary. SLI measures it. Error budget governs it.</div>
      <div class="c-action-title" style="margin-top:10px">The DORA signal from monitoring</div>
      <div class="c-action"><span>→</span> Mean Time to Restore (MTTR) is a monitoring maturity metric — low MTTR requires fast anomaly detection</div>
    </div>
  </div>

  <div class="c-card slate-card">
    <div class="c-header slate-header">
      <div class="c-number">C7</div>
      <div class="c-icon">🔄</div>
      <div class="c-title-block">
        <div class="c-title">Continuous Learning</div>
        <div class="c-tagline">The loop that sustains everything else</div>
      </div>
    </div>
    <div class="c-body">
      <div class="c-desc">Without continuous learning, DevOps plateaus. Teams repeat the same incidents because they don't have the culture or the process to extract and act on lessons. C7 is not a tool — it's a commitment to improving the system based on what the system teaches you.</div>
      <div class="c-action-title">What continuous learning requires</div>
      <div class="c-action"><span>→</span> Blameless post-mortems: timeline + contributing factors + action items. No finger-pointing.</div>
      <div class="c-action"><span>→</span> Retrospectives: regular, structured team reflection (not just complaints)</div>
      <div class="c-action"><span>→</span> DORA metric reviews: monthly, with leadership visibility</div>
      <div class="c-action"><span>→</span> GameDays: simulated incidents to practice response before the real thing</div>
      <div class="c-action"><span>→</span> Learning budget: time and funding for certifications, courses, conference attendance</div>
    </div>
  </div>

  <div class="footer"><span>The 7 Cs of DevOps · nthakur.com · © Naval Thakur</span><span>Page 4</span></div>
</div>

<!-- Page 5: Quick Reference + CTA -->
<div class="page">
  <h1>The 7 Cs — Quick Reference</h1>

  <table class="table">
    <tr><th>C</th><th>Name</th><th>Core Principle</th><th>Most Common Gap</th></tr>
    <tr><td><strong>C1</strong></td><td>Culture</td><td>Everyone owns the outcome</td><td>Blame culture; no psychological safety</td></tr>
    <tr><td><strong>C2</strong></td><td>Collaboration</td><td>Aligned incentives, shared teams</td><td>Separate Dev/Ops orgs with conflicting KPIs</td></tr>
    <tr><td><strong>C3</strong></td><td>Continuous Integration</td><td>Merge and test many times a day</td><td>Long-lived branches; slow or skipped CI</td></tr>
    <tr><td><strong>C4</strong></td><td>Continuous Delivery</td><td>Every build is deployable</td><td>Manual deployment steps; staging != production</td></tr>
    <tr><td><strong>C5</strong></td><td>Continuous Testing</td><td>Quality gates at every stage</td><td>Test pyramid inverted; slow, flaky tests skipped</td></tr>
    <tr><td><strong>C6</strong></td><td>Continuous Monitoring</td><td>Production feeds back into development</td><td>Reactive monitoring; no SLOs defined</td></tr>
    <tr><td><strong>C7</strong></td><td>Continuous Learning</td><td>Every incident is a learning opportunity</td><td>Post-mortems skip action items; no retrospectives</td></tr>
  </table>

  <h2>Applying the 7 Cs: Where to Start</h2>
  <p>The 7 Cs are ordered intentionally — but you don't have to start at C1 and work sequentially. Most organisations benefit from assessing all seven and finding the biggest gap. Common entry points:</p>
  <ul>
    <li><strong>Start at C3 (CI)</strong> if your team has no automated build pipeline — the feedback loop will accelerate everything else.</li>
    <li><strong>Start at C1 (Culture)</strong> if your team has tooling but deployments are still painful, risky, and political. The tools aren't the bottleneck.</li>
    <li><strong>Start at C6 (Monitoring)</strong> if your MTTR is high and you find out about incidents from users rather than alerts. You can't improve what you can't see.</li>
    <li><strong>Start at C7 (Learning)</strong> if your team keeps seeing the same incidents repeat and retros feel performative. The problem is the learning loop, not the tools.</li>
  </ul>

  <div class="callout callout-blue">
    <div class="callout-title">The 7 Cs and the CognitiveOps Model</div>
    <p style="font-size:11px; margin:0; color:#1e40af">The 7 Cs framework predates the CognitiveOps Model — but the two are complementary. CognitiveOps adds an eighth dimension: the integration of AI into each of the 7 Cs. AI-assisted code review enhances C3. AI-generated test cases accelerate C5. AI anomaly detection upgrades C6. AI-driven retrospective analysis deepens C7. The 7 Cs give you the foundation; CognitiveOps tells you where AI augments it.</p>
  </div>

  <h2>The DevOps Assessment</h2>
  <p>The free DevOps maturity assessment at nthakur.com/devops/assessment scores you across all 7 Cs dimensions (mapped to the six domain domains) and gives you a prioritised set of next steps. It takes 8 minutes and produces a personalised report you can share with your team or leadership.</p>

  <div style="margin-top:28px; padding:18px; background:#1e293b; border-radius:10px; color:white">
    <div style="font-size:10px; text-transform:uppercase; letter-spacing:2px; color:#94a3b8; font-weight:700; margin-bottom:6px">Take the Assessment</div>
    <div style="font-size:13px; font-weight:700; margin-bottom:6px">Know your DevOps maturity across all 7 Cs</div>
    <div style="font-size:11px; color:#cbd5e1">nthakur.com/devops/assessment · Free · 8 minutes · Personalised maturity report</div>
  </div>

  <div class="footer"><span>The 7 Cs of DevOps · nthakur.com · © Naval Thakur 2026 · All rights reserved</span><span>Page 5</span></div>
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
      "headline": "The 7 Cs of DevOps — Free Mini-Guide PDF",
      "description": "A concise, shareable 7-part DevOps framework: Culture, Collaboration, Continuous Integration, Continuous Delivery, Continuous Testing, Continuous Monitoring, and Continuous Learning.",
      "author": { "@type": "Person", "name": "Naval Thakur", "url": "https://nthakur.com/about" },
      "url": "https://nthakur.com/devops/7cs",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nthakur.com" },
        { "@type": "ListItem", "position": 2, "name": "DevOps", "item": "https://nthakur.com/devops" },
        { "@type": "ListItem", "position": 3, "name": "7 Cs of DevOps", "item": "https://nthakur.com/devops/7cs" },
      ]
    }
  ]
};

const SevenCsDevOps: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const form = new FormData();
      form.append('email', email);
      form.append('name', '7 Cs of DevOps Download');
      form.append('topic', '7 Cs of DevOps Mini-Guide Download');
      form.append('message', 'User requested 7 Cs of DevOps Mini-Guide.');
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: form, mode: 'no-cors' });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <SEO
        title="The 7 Cs of DevOps — Free Mini-Guide | Naval Thakur"
        description="A concise, shareable DevOps framework: Culture, Collaboration, Continuous Integration, Continuous Delivery, Continuous Testing, Continuous Monitoring, and Continuous Learning. First presented in 2018."
        structuredData={SCHEMA}
      />

      {/* Hero */}
      <div className="relative bg-primary text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-400/40 bg-slate-400/10 text-slate-300 text-sm font-bold mb-6">
                <GitBranch size={14} /> DevOps Framework · Mini-Guide PDF
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">The 7 Cs of DevOps</h1>
              <p className="text-xl text-slate-200 leading-relaxed mb-3">
                A concise, memorable framework for understanding DevOps as a complete practice — not just a CI/CD pipeline. From culture to continuous learning.
              </p>
              <p className="text-sm text-slate-400 mb-6">Originally presented in an internal DevOps session in 2018. Shared here for the first time.</p>
              <div className="space-y-2">
                {SEVEN_CS.map(c => (
                  <div key={c.c} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-base">{c.icon}</span>
                    <span className="font-medium">{c.c}</span>
                    <span className="text-slate-500">—</span>
                    <span className="text-slate-400 text-xs">{c.tagline}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Email gate */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-200/20">
              {status === 'success' ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Unlock className="w-7 h-7 text-slate-700 dark:text-slate-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Guide unlocked</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Your 7 Cs mini-guide is ready. Open and save as PDF.</p>
                  <button
                    onClick={() => generateSevenCsPDF(email)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-colors"
                  >
                    <Download size={16} /> Open &amp; Save PDF
                  </button>
                  <p className="text-xs text-slate-400 mt-3">Use "Save as PDF" in the print dialog.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                      <Lock className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">Get the free guide</h3>
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
                          className="w-full pl-9 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm disabled:opacity-50"
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
                      className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-colors disabled:opacity-70"
                    >
                      {status === 'submitting' ? <><Loader2 className="animate-spin" size={16} /> Unlocking…</> : <><Download size={16} /> Download Free Guide</>}
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

      {/* The 7 Cs */}
      <Section bg="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">The 7 Cs — framework overview</h2>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-10">The Cs are ordered intentionally. Culture and Collaboration are preconditions. Continuous Learning sustains everything.</p>
          <div className="space-y-4">
            {SEVEN_CS.map((c, idx) => (
              <div key={c.c} className={`rounded-xl border p-5 ${c.color}`}>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{c.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-black text-slate-400">C{idx + 1}</span>
                      <h3 className={`font-bold text-base ${c.accentColor}`}>{c.c}</h3>
                      <span className="text-xs text-slate-400 italic">{c.tagline}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{c.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section bg="gray">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-primary rounded-2xl p-8 text-white">
            <Users className="w-10 h-10 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">Score your team across all 7 Cs</h2>
            <p className="text-slate-200 mb-6">The DevOps assessment identifies which Cs are your biggest gaps — and gives you a prioritised action plan. 8 minutes, free.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/devops/assessment" className="inline-flex items-center gap-2 px-7 py-3 bg-slate-100 text-slate-900 font-bold rounded-xl hover:bg-white transition-colors">
                Take the DevOps Assessment <ArrowRight size={15} />
              </Link>
              <Link to="/cognitiveops" className="inline-flex items-center gap-2 px-7 py-3 border border-white/30 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">
                The CognitiveOps Model <Shield size={15} />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section bg="white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-center">
            <Layers className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">More digital resources</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">The 7 Cs is one of four free practitioner guides. Explore the others.</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <Link to="/devops/roadmap-guide" className="text-blue-600 dark:text-blue-400 hover:underline">DevOps Maturity Roadmap</Link>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <Link to="/finops/30-day-guide" className="text-green-600 dark:text-green-400 hover:underline">30 Days of FinOps</Link>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <Link to="/finops/cert-prep" className="text-purple-600 dark:text-purple-400 hover:underline">FinOps Cert Prep</Link>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <Link to="/cognitiveops/playbook" className="text-slate-600 dark:text-slate-400 hover:underline">CognitiveOps Playbook</Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default SevenCsDevOps;
