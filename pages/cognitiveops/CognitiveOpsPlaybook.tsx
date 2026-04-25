import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Download, Mail, CheckCircle2, Loader2, AlertCircle,
  BookOpen, BrainCircuit, Terminal, ShieldCheck, TrendingUp, Layers,
  GitMerge, Cpu, Lock, Unlock,
} from 'lucide-react';
import Section from '../../components/Section';
import SEO from '../../components/SEO';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx03K6mwLMtq6X5q8JIAHKQ4qSxCk9LEavNeO0IWo1jg9IxhzFoxvZM0DwKtgMegKDz1Q/exec';

const CHAPTERS = [
  { num: '01', title: 'The Problem with "Automated"', desc: 'Why hitting Layer 2 is necessary but not sufficient — and what organisations mistake for transformation.' },
  { num: '02', title: 'The Four Layers Explained', desc: 'Manual → Automated → Intelligent → Cognitive. What each layer actually looks like in production, not on a slide.' },
  { num: '03', title: 'The Four Pillars', desc: 'DevOps, SecOps, FinOps, and GenAI — why all four must mature in parallel and what breaks when they don\'t.' },
  { num: '04', title: 'Layer 2 Checklist', desc: 'The 20 capabilities an organisation must have before calling itself "automated." Most are missing at least five.' },
  { num: '05', title: 'The Path to Layer 3', desc: 'Practical moves from Automated to Intelligent: AIOps, GenAI-assisted workflows, predictive FinOps, and policy-as-code.' },
  { num: '06', title: 'The 90-Day Roadmap Template', desc: 'A structured template for moving one layer up — with phases, milestones, and the stakeholders required at each step.' },
  { num: '07', title: 'Measuring Progress', desc: 'The metrics that actually matter at each layer — and the vanity metrics that make Layer 1 organisations look like Layer 3.' },
  { num: '08', title: 'Common Failure Modes', desc: 'The five most common reasons CognitiveOps transformations stall, and what the teams that succeed do differently.' },
];

const INCLUDES = [
  '20-page practitioner playbook (PDF)',
  'Four-layer maturity model with detailed characteristics',
  'Layer 2 capability checklist (20 items)',
  '90-day roadmap template',
  'Progress metrics for each layer',
  'Common failure modes and how to avoid them',
];

const generatePlaybookPDF = (email: string) => {
  const win = window.open('', '_blank');
  if (!win) return;

  win.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>CognitiveOps Playbook — Naval Thakur</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; background: #fff; font-size: 12px; line-height: 1.6; }
  .page { padding: 48px 56px; min-height: 100vh; }
  .cover { background: #271789; color: white; display: flex; flex-direction: column; justify-content: center; min-height: 100vh; padding: 72px 64px; }
  .cover-tag { font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #00f1d4; margin-bottom: 24px; }
  .cover-title { font-size: 48px; font-weight: 800; line-height: 1.1; color: white; margin-bottom: 16px; }
  .cover-subtitle { font-size: 18px; color: #cbd5e1; margin-bottom: 48px; max-width: 480px; line-height: 1.5; }
  .cover-author { font-size: 13px; color: #94a3b8; }
  .cover-author strong { color: #e2e8f0; }
  .cover-line { width: 60px; height: 4px; background: #00f1d4; margin: 40px 0; }
  h1 { font-size: 28px; font-weight: 800; color: #271789; margin-bottom: 8px; }
  h2 { font-size: 20px; font-weight: 700; color: #271789; margin: 32px 0 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
  h3 { font-size: 15px; font-weight: 700; color: #1e293b; margin: 20px 0 8px; }
  p { margin-bottom: 12px; color: #475569; }
  .tag { display: inline-block; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 3px 8px; border-radius: 4px; background: #e0f2fe; color: #0369a1; margin-bottom: 12px; }
  .layer-card { border-left: 4px solid #271789; padding: 16px 20px; margin: 16px 0; background: #f8fafc; border-radius: 0 8px 8px 0; }
  .layer-card.l1 { border-color: #94a3b8; }
  .layer-card.l2 { border-color: #3b82f6; }
  .layer-card.l3 { border-color: #9333ea; }
  .layer-card.l4 { border-color: #00f1d4; }
  .layer-num { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #64748b; margin-bottom: 4px; }
  .layer-name { font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 6px; }
  .layer-desc { font-size: 12px; color: #475569; }
  ul { padding-left: 20px; margin-bottom: 16px; }
  li { margin-bottom: 6px; color: #475569; }
  .checklist li { list-style: none; padding-left: 0; display: flex; align-items: flex-start; gap: 8px; }
  .checklist li::before { content: '☐'; font-size: 14px; color: #3b82f6; flex-shrink: 0; margin-top: -1px; }
  .pillar-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0; }
  .pillar { border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; }
  .pillar-title { font-weight: 700; font-size: 14px; color: #271789; margin-bottom: 6px; }
  .metric-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
  .metric-name { font-weight: 600; color: #1e293b; font-size: 12px; }
  .metric-target { font-size: 11px; color: #0369a1; font-weight: 700; }
  .roadmap-phase { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px 20px; margin: 12px 0; }
  .phase-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #64748b; margin-bottom: 4px; }
  .phase-title { font-size: 15px; font-weight: 700; color: #271789; margin-bottom: 8px; }
  .failure { border-left: 3px solid #ef4444; padding: 12px 16px; background: #fef2f2; margin: 12px 0; border-radius: 0 6px 6px 0; }
  .failure-title { font-weight: 700; color: #991b1b; margin-bottom: 4px; }
  .footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 10px; color: #94a3b8; }
  @media print { .no-print { display: none; } }
</style>
</head>
<body>

<!-- Cover -->
<div class="cover">
  <div class="cover-tag">Free Practitioner Playbook</div>
  <div class="cover-title">The CognitiveOps Playbook</div>
  <div class="cover-subtitle">From Automated DevSecOps to AI-Native Operations — a practitioner's guide to the four-layer maturity model.</div>
  <div class="cover-line"></div>
  <div class="cover-author">By <strong>Naval Thakur</strong> · Practice Manager, SLB · nthakur.com</div>
  <div class="cover-author" style="margin-top:8px">Prepared for: <strong>${email}</strong></div>
</div>

<!-- Page 2: Introduction -->
<div class="page">
  <div class="tag">Introduction</div>
  <h1>Why This Playbook Exists</h1>
  <p>After 18 years of leading DevOps and cloud transformations across energy, technology, and global delivery — one pattern repeats with almost clockwork regularity:</p>
  <p style="font-style:italic; color:#271789; font-size:14px; padding:16px; border-left:4px solid #00f1d4; background:#f0fdf4; margin:16px 0">
    "Organisations that automate everything still aren't operating intelligently."
  </p>
  <p>They have pipelines that deploy automatically. Security scans on every PR. Dashboards showing cloud spend by team. And yet — incidents still surprise them. Cloud costs still spike unexpectedly. Security vulnerabilities hide in plain sight until an audit finds them.</p>
  <p>The CognitiveOps Model exists to name the gap between <em>automated</em> and <em>intelligent</em> — and show the path from one to the other.</p>
  <p>This playbook is the practitioner's field guide to that journey. It is not a framework deck. It is not a vendor pitch. It is a direct account of what the layers look like, what they require, and what makes the difference between organisations that move up and organisations that stay stuck.</p>

  <h2>Who This Is For</h2>
  <ul>
    <li><strong>Engineering Directors and VPs</strong> who have automated pipelines and want to understand what Layer 3 actually requires</li>
    <li><strong>Platform and DevOps leads</strong> who are building the next phase of their organisation's cloud maturity</li>
    <li><strong>CTOs</strong> evaluating whether their organisation is genuinely at Layer 2 or performing it</li>
    <li><strong>Practitioners</strong> who want a vocabulary and framework for the conversations their org needs to have</li>
  </ul>

  <h2>How to Use This Playbook</h2>
  <p>Read it once for orientation. Then return to the chapter most relevant to your current challenge. The 90-day roadmap template in Chapter 6 is designed to be used immediately — print it, fill it in, and share it with your leadership team.</p>

  <div class="footer">CognitiveOps Playbook · nthakur.com · © Naval Thakur · Page 2</div>
</div>

<!-- Page 3: The Four Layers -->
<div class="page">
  <div class="tag">Chapter 02</div>
  <h1>The Four Layers of CognitiveOps</h1>
  <p>Each layer describes a distinct operating state — not a milestone to be achieved once and forgotten, but a stable configuration your organisation operates from day-to-day. The layers are cumulative: you cannot sustain Layer 3 without Layer 2 being solid underneath it.</p>

  <div class="layer-card l1">
    <div class="layer-num">Layer 1</div>
    <div class="layer-name">Manual Ops</div>
    <div class="layer-desc">Traditional IT operations. Deployments are planned events. Security is a gate at release time. Cloud costs are a monthly surprise. Most organisations were here in 2015; more than 40% still are today.</div>
  </div>

  <div class="layer-card l2">
    <div class="layer-num">Layer 2</div>
    <div class="layer-name">Automated DevSecOps</div>
    <div class="layer-desc">CI/CD pipelines deploy on every merge. SAST and dependency scanning run in every PR. Cloud resources are tagged and costs are visible. SLOs are defined and monitored. Infrastructure is code. This is where most mature enterprises operate today.</div>
  </div>

  <div class="layer-card l3">
    <div class="layer-num">Layer 3</div>
    <div class="layer-name">Intelligent Operations</div>
    <div class="layer-desc">AI and ML augment decisions. AIOps flags anomalies before they become incidents. GenAI accelerates development workflows. FinOps forecasting is predictive, not reactive. Platform teams enable self-service via AI assistants. Fewer than 10% of enterprise engineering organisations have reached this layer.</div>
  </div>

  <div class="layer-card l4">
    <div class="layer-num">Layer 4</div>
    <div class="layer-name">Cognitive — AI-Native Ops</div>
    <div class="layer-desc">The frontier. AI agents operate autonomously within defined guardrails. The system heals itself, optimises spend in real-time, and surfaces only the decisions that require human judgement. Engineering teams set intent; AI executes and reports exceptions. Currently the province of the most advanced cloud-native organisations globally.</div>
  </div>

  <h2>The Key Insight</h2>
  <p>The gap most organisations underestimate is not between Layer 1 and Layer 2. That gap is painful but well-understood. The gap that surprises people is between Layer 2 and Layer 3.</p>
  <p>Moving from manual to automated is primarily a <em>tooling problem</em>. Moving from automated to intelligent is primarily a <em>data, model, and culture problem</em>. The tools for Layer 3 exist. The organisational readiness rarely does.</p>

  <div class="footer">CognitiveOps Playbook · nthakur.com · © Naval Thakur · Page 3</div>
</div>

<!-- Page 4: The Four Pillars -->
<div class="page">
  <div class="tag">Chapter 03</div>
  <h1>The Four Pillars</h1>
  <p>CognitiveOps maturity is not a single dimension. It spans four domains that must mature in parallel. Organisations that advance one pillar while neglecting others create structural risks — a Layer 3 DevOps practice with Layer 1 FinOps governance will generate cloud cost crises faster than it resolves incidents.</p>

  <div class="pillar-grid">
    <div class="pillar">
      <div class="pillar-title">DevOps</div>
      <p style="font-size:11px; color:#475569">The delivery engine. CI/CD, SRE, Platform Engineering, and Chaos Engineering form the foundation every higher layer depends on. Without solid DevOps at Layer 2, AI-native operations are impossible at Layer 4.</p>
      <p style="font-size:11px; color:#0369a1; font-weight:600">Key measure: Deployment frequency + change failure rate</p>
    </div>
    <div class="pillar">
      <div class="pillar-title">SecOps</div>
      <p style="font-size:11px; color:#475569">Security embedded at every layer — from SAST in PRs at Layer 2 to autonomous policy enforcement at Layer 4. The shift from security-as-auditor to security-as-code is the defining move between layers 2 and 3.</p>
      <p style="font-size:11px; color:#0369a1; font-weight:600">Key measure: Mean time to remediate critical CVEs</p>
    </div>
    <div class="pillar">
      <div class="pillar-title">FinOps</div>
      <p style="font-size:11px; color:#475569">Financial accountability across the stack — from cost tagging at Layer 2 to AI-native spend optimisation at Layer 4. FinOps is the most commonly under-invested pillar, and the most commonly cited root cause of cloud transformation failure.</p>
      <p style="font-size:11px; color:#0369a1; font-weight:600">Key measure: Cost per unit of business value delivered</p>
    </div>
    <div class="pillar">
      <div class="pillar-title">GenAI</div>
      <p style="font-size:11px; color:#475569">The catalyst for Layers 3 and 4. LLMOps, RAG architectures, and AI Agents transform operations from reactive to self-directed. GenAI maturity without DevOps/SecOps/FinOps foundations creates intelligent chaos, not intelligent operations.</p>
      <p style="font-size:11px; color:#0369a1; font-weight:600">Key measure: % of operational decisions augmented by AI</p>
    </div>
  </div>

  <h2>Why All Four Must Move Together</h2>
  <p>The failure mode is common: an organisation gets excited about GenAI, invests heavily in Layer 3 GenAI capabilities, and discovers that without Layer 2 SecOps, their AI-assisted pipelines are introducing vulnerabilities faster than the security team can process them. Or without Layer 2 FinOps, their AI inference costs spiral to 3× their compute budget within a quarter.</p>
  <p>The rule of thumb: your overall CognitiveOps layer is the <em>minimum</em> across all four pillars. A Layer 3 DevOps team with Layer 1 FinOps is, at the organisational level, a Layer 1 operation.</p>

  <div class="footer">CognitiveOps Playbook · nthakur.com · © Naval Thakur · Page 4</div>
</div>

<!-- Page 5: Layer 2 Checklist -->
<div class="page">
  <div class="tag">Chapter 04</div>
  <h1>Layer 2 Readiness Checklist</h1>
  <p>Before planning the move to Layer 3, verify that Layer 2 is actually solid. Most organisations that think they are at Layer 2 are missing between 4 and 8 of the following capabilities.</p>

  <h3>DevOps (5 items)</h3>
  <ul class="checklist">
    <li>CI/CD pipeline deploys to production on every merge to main — no manual steps required</li>
    <li>Infrastructure is fully managed as code (Terraform, Pulumi, Bicep, or equivalent)</li>
    <li>SLOs are defined and monitored; error budget burn rate alerts are active</li>
    <li>On-call rotation is structured, documented, and supported by runbooks</li>
    <li>Deployment rollback is automated and takes under 5 minutes</li>
  </ul>

  <h3>SecOps (5 items)</h3>
  <ul class="checklist">
    <li>SAST and dependency scanning run on every pull request — not nightly</li>
    <li>Secrets scanning is active in the pipeline; no credentials committed to repos</li>
    <li>Cloud IAM follows least privilege; access reviews happen quarterly</li>
    <li>Incident response playbooks exist and are tested at least annually</li>
    <li>Container images are scanned before deployment; base image rotation is automated</li>
  </ul>

  <h3>FinOps (5 items)</h3>
  <ul class="checklist">
    <li>All cloud resources are tagged by team, environment, and product</li>
    <li>Showback or chargeback reports are produced and shared monthly with engineering teams</li>
    <li>Budget alerts exist at team and environment level</li>
    <li>Reserved Instances or Savings Plans cover at least 60% of predictable compute</li>
    <li>Unused and orphaned resources are identified and reviewed weekly</li>
  </ul>

  <h3>GenAI / Platform (5 items)</h3>
  <ul class="checklist">
    <li>Developers have access to AI-assisted coding tools (GitHub Copilot or equivalent)</li>
    <li>Internal developer platform exists with self-service provisioning for common infrastructure patterns</li>
    <li>Knowledge base or documentation is searchable and kept current</li>
    <li>Experiment → production pathway for new AI tools is defined and under 4 weeks</li>
    <li>AI usage policies and data handling guidelines are published and understood by engineers</li>
  </ul>

  <p style="margin-top:16px; padding:12px 16px; background:#f0fdf4; border-radius:8px; font-size:11px; color:#166534">
    <strong>Scoring:</strong> 18–20 checked = solid Layer 2. 14–17 = functional but with gaps that will constrain Layer 3. Under 14 = Layer 2 work is the priority before any Layer 3 investment.
  </p>

  <div class="footer">CognitiveOps Playbook · nthakur.com · © Naval Thakur · Page 5</div>
</div>

<!-- Page 6: 90-Day Roadmap -->
<div class="page">
  <div class="tag">Chapter 06</div>
  <h1>The 90-Day Roadmap Template</h1>
  <p>Use this template to plan a single-layer move. Do not attempt to move multiple pillars to a new layer simultaneously — sequence instead. Choose the pillar with the most business impact and move it first.</p>

  <div class="roadmap-phase">
    <div class="phase-label">Days 1–30 · Phase 1</div>
    <div class="phase-title">Assess and Baseline</div>
    <ul style="margin:0; padding-left:20px">
      <li>Run the CognitiveOps Maturity Assessment for your team (nthakur.com/cognitiveops/assessment)</li>
      <li>Score each pillar individually — identify the minimum layer (this is your actual level)</li>
      <li>Complete the Layer 2 checklist — identify which items are not yet in place</li>
      <li>Identify the one pillar where moving up will have the greatest business impact</li>
      <li>Secure sponsorship from a Director or VP — Layer transitions require leadership cover</li>
    </ul>
  </div>

  <div class="roadmap-phase">
    <div class="phase-label">Days 31–60 · Phase 2</div>
    <div class="phase-title">Close the Gaps</div>
    <ul style="margin:0; padding-left:20px">
      <li>Address all Layer 2 checklist gaps in your target pillar before beginning Layer 3 work</li>
      <li>Instrument the baseline: establish the 2–3 metrics you will use to measure the transition</li>
      <li>Identify the first Layer 3 capability to introduce (start with the smallest viable change)</li>
      <li>Run a proof of concept — one team, one use case, one quarter</li>
      <li>Document what breaks — failure modes at Layer 2/3 boundaries are predictable; capture them</li>
    </ul>
  </div>

  <div class="roadmap-phase">
    <div class="phase-label">Days 61–90 · Phase 3</div>
    <div class="phase-title">Scale and Standardise</div>
    <ul style="margin:0; padding-left:20px">
      <li>If the PoC succeeded, define the pattern — make the new Layer 3 capability a platform feature</li>
      <li>Socialise the result: one internal talk, one post, one documented case study</li>
      <li>Run the assessment again — measure the layer change in the target pillar</li>
      <li>Begin the same cycle for the next pillar</li>
      <li>Update your 90-day roadmap: the cycle repeats until all four pillars are at the target layer</li>
    </ul>
  </div>

  <h2>What Determines Success</h2>
  <p>In every Layer 2 → 3 transition I have led or advised, the decisive factor was not the tooling choice. It was whether engineering leadership could hold the organisation in the productive discomfort of "the new way doesn't feel as fast yet" for long enough to let the new way compound.</p>
  <p>The teams that succeed commit to a 90-day minimum before evaluating whether the transition is working. The teams that fail abort at week 6.</p>

  <div class="footer">CognitiveOps Playbook · nthakur.com · © Naval Thakur · Page 6</div>
</div>

<!-- Page 7: Metrics -->
<div class="page">
  <div class="tag">Chapter 07</div>
  <h1>Measuring Progress</h1>
  <p>The right metrics change as you move up the layers. Layer 2 metrics measure <em>consistency</em>. Layer 3 metrics measure <em>intelligence</em>. Layer 4 metrics measure <em>autonomy</em>. Using Layer 2 metrics to validate Layer 3 progress is one of the most common measurement errors in enterprise transformation.</p>

  <h3>Layer 2 Metrics — Are we consistent?</h3>
  <div class="metric-row"><span class="metric-name">Deployment Frequency</span><span class="metric-target">Target: Daily or on-demand</span></div>
  <div class="metric-row"><span class="metric-name">Change Failure Rate</span><span class="metric-target">Target: &lt; 5%</span></div>
  <div class="metric-row"><span class="metric-name">Mean Time to Restore (MTTR)</span><span class="metric-target">Target: &lt; 1 hour</span></div>
  <div class="metric-row"><span class="metric-name">Security Pipeline Coverage</span><span class="metric-target">Target: 100% of pipelines have SAST + dep scan</span></div>
  <div class="metric-row"><span class="metric-name">Cloud Tagging Coverage</span><span class="metric-target">Target: &gt; 95% of resources tagged</span></div>

  <h3 style="margin-top:20px">Layer 3 Metrics — Is AI augmenting decisions?</h3>
  <div class="metric-row"><span class="metric-name">Incidents auto-correlated by AIOps</span><span class="metric-target">Target: &gt; 70% of P1/P2 incidents</span></div>
  <div class="metric-row"><span class="metric-name">Mean Time to Detect (MTTD)</span><span class="metric-target">Target: &lt; 5 minutes (ML-assisted)</span></div>
  <div class="metric-row"><span class="metric-name">FinOps forecast accuracy</span><span class="metric-target">Target: Within 10% of actual spend (ML model)</span></div>
  <div class="metric-row"><span class="metric-name">Security CVE MTTR</span><span class="metric-target">Target: &lt; 7 days for critical CVEs</span></div>
  <div class="metric-row"><span class="metric-name">AI-augmented code review coverage</span><span class="metric-target">Target: &gt; 80% of PRs</span></div>

  <h3 style="margin-top:20px">Layer 4 Metrics — Are systems self-directing?</h3>
  <div class="metric-row"><span class="metric-name">Incidents auto-remediated without human action</span><span class="metric-target">Target: &gt; 60% of known failure patterns</span></div>
  <div class="metric-row"><span class="metric-name">Cloud spend decisions made autonomously</span><span class="metric-target">Target: &gt; 40% of optimisation actions</span></div>
  <div class="metric-row"><span class="metric-name">Policy violations blocked autonomously</span><span class="metric-target">Target: 100% at infrastructure layer</span></div>

  <h2>The Vanity Metrics Warning</h2>
  <p>Deployment frequency is the most gamed metric in DevOps. Teams that optimise for the metric without changing the underlying delivery system create the appearance of Layer 2 maturity while operating at Layer 1. If deployment frequency went up but MTTR didn't come down, you are measuring ceremony, not capability.</p>

  <div class="footer">CognitiveOps Playbook · nthakur.com · © Naval Thakur · Page 7</div>
</div>

<!-- Page 8: Failure Modes -->
<div class="page">
  <div class="tag">Chapter 08</div>
  <h1>Common Failure Modes</h1>
  <p>These are the five patterns I see most frequently when CognitiveOps transitions stall. Each one is predictable and preventable.</p>

  <div class="failure">
    <div class="failure-title">1. Declaring Layer 2 before closing the checklist</div>
    <p style="font-size:11px; margin:0; color:#7f1d1d">The organisation has CI/CD but hasn't addressed SecOps or FinOps. Leadership declares "we're automated" and tries to move to Layer 3. The result is intelligent chaos — faster pipelines introducing more vulnerabilities and higher costs simultaneously.</p>
  </div>

  <div class="failure">
    <div class="failure-title">2. Buying tools instead of building capabilities</div>
    <p style="font-size:11px; margin:0; color:#7f1d1d">An AIOps platform gets purchased. Nobody on the team has the data engineering skills to feed it properly. Eighteen months later, it is generating noise rather than signal, and the initiative is quietly abandoned. Layer 3 is a capability problem, not a tooling problem.</p>
  </div>

  <div class="failure">
    <div class="failure-title">3. Moving one pillar and ignoring the others</div>
    <p style="font-size:11px; margin:0; color:#7f1d1d">The DevOps practice reaches Layer 3. FinOps is still at Layer 1. AI-assisted deployments run 40× more frequently, and cloud costs triple within two quarters. The four pillars must move together — or close enough together that the gaps don't compound.</p>
  </div>

  <div class="failure">
    <div class="failure-title">4. Abandoning the transition at the productivity dip</div>
    <p style="font-size:11px; margin:0; color:#7f1d1d">Every layer transition has a 4–8 week window where the new way is slower than the old way. This is where most transformations fail. The teams that succeed have leadership sponsorship that explicitly protects the team from "why is delivery slowing down?" questions during this window.</p>
  </div>

  <div class="failure">
    <div class="failure-title">5. Mistaking GenAI adoption for Layer 3 maturity</div>
    <p style="font-size:11px; margin:0; color:#7f1d1d">Giving every developer GitHub Copilot is not Layer 3. It is Layer 2.5 at best. Layer 3 intelligence means AI is making operational decisions — not just helping developers write code faster. The distinction matters because the investment required is fundamentally different.</p>
  </div>

  <h2>What the Teams That Succeed Do Differently</h2>
  <ul>
    <li>They close Layer 2 gaps before starting Layer 3 work — without exception</li>
    <li>They start small: one team, one use case, one quarter</li>
    <li>They measure the right things — capability metrics, not vanity metrics</li>
    <li>They have explicit leadership sponsorship for the transition period</li>
    <li>They move all four pillars — they may sequence them, but they don't neglect them</li>
  </ul>

  <div class="footer">CognitiveOps Playbook · nthakur.com · © Naval Thakur · Page 8</div>
</div>

<!-- Final Page: Next Steps -->
<div class="page">
  <div class="tag">Next Steps</div>
  <h1>Your Next Steps</h1>

  <h2>1. Take the CognitiveOps Maturity Assessment</h2>
  <p>The free 13-question assessment at <strong>nthakur.com/cognitiveops/assessment</strong> will score your organisation across all four pillars and tell you your current layer. Takes 5 minutes. Gives you a personalised PDF report with prioritised recommendations.</p>

  <h2>2. Complete the Layer 2 Checklist</h2>
  <p>Work through the 20-item checklist in Chapter 4. Be honest. Most teams find 4–8 gaps they didn't know they had. These gaps are the work before the next layer — not optional extras.</p>

  <h2>3. Download the Domain-Specific Assessment Reports</h2>
  <p>For deeper analysis of a specific pillar, take the standalone assessments at:</p>
  <ul>
    <li><strong>DevOps:</strong> nthakur.com/devops/assessment (16 questions, Reactive → Elite)</li>
    <li><strong>SecOps:</strong> nthakur.com/secops/assessment</li>
    <li><strong>FinOps:</strong> nthakur.com/finops/assessment</li>
    <li><strong>GenAI:</strong> nthakur.com/genai/assessment</li>
  </ul>

  <h2>4. Read the Articles</h2>
  <p>Four practitioner deep-dives are available at nthakur.com/articles, covering cloud computing fundamentals, DevOps pipeline gamification, SecOps alignment with agile delivery, and FinOps certification.</p>

  <h2>5. Work With Naval Directly</h2>
  <p>If your organisation is planning a CognitiveOps transition and needs structured advisory support — gap analysis, scored findings per pillar, and a 90-day roadmap — Naval runs structured engagements for engineering leadership teams. Contact via <strong>nthakur.com/contact</strong>.</p>

  <div style="margin-top:40px; padding:20px; background:#271789; border-radius:12px; color:white">
    <div style="font-size:11px; text-transform:uppercase; letter-spacing:2px; color:#00f1d4; margin-bottom:8px; font-weight:700">Subscribe</div>
    <div style="font-size:14px; font-weight:700; margin-bottom:8px">The CognitiveOps Brief</div>
    <div style="font-size:12px; color:#cbd5e1">Every two weeks: one real-world lesson, one tool worth knowing, one GenAI pattern to try. nthakur.com/newsletter</div>
  </div>

  <div class="footer" style="margin-top:32px">
    CognitiveOps Playbook · nthakur.com · © Naval Thakur 2026 · All rights reserved · Not for redistribution without permission
  </div>
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
      "headline": "The CognitiveOps Playbook — From Automated DevSecOps to AI-Native Operations",
      "description": "A free 20-page practitioner playbook covering the CognitiveOps four-layer maturity model. Includes Layer 2 checklist, 90-day roadmap template, metrics by layer, and common failure modes.",
      "author": { "@type": "Person", "name": "Naval Thakur", "url": "https://nthakur.com/about" },
      "publisher": { "@type": "Person", "name": "Naval Thakur", "url": "https://nthakur.com" },
      "url": "https://nthakur.com/cognitiveops/playbook",
      "keywords": "CognitiveOps, DevOps maturity, DevSecOps, FinOps, GenAI, AIOps, cloud operations maturity model",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nthakur.com" },
        { "@type": "ListItem", "position": 2, "name": "CognitiveOps", "item": "https://nthakur.com/cognitiveops" },
        { "@type": "ListItem", "position": 3, "name": "Playbook", "item": "https://nthakur.com/cognitiveops/playbook" },
      ]
    }
  ]
};

const CognitiveOpsPlaybook: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const form = new FormData();
      form.append('email', email);
      form.append('name', 'Playbook Download');
      form.append('topic', 'CognitiveOps Playbook Download');
      form.append('message', 'User requested CognitiveOps Playbook download.');
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: form, mode: 'no-cors' });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <SEO
        title="CognitiveOps Playbook — Free Download | Naval Thakur"
        description="Free 20-page practitioner playbook: the CognitiveOps four-layer maturity model, Layer 2 checklist, 90-day roadmap template, and common failure modes. Download instantly."
        structuredData={SCHEMA}
      />

      {/* Hero */}
      <div className="relative bg-primary text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-primary to-secondary/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 text-secondary text-sm font-bold mb-6">
                <BookOpen size={14} /> Free Download · PDF · 20 pages
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">The CognitiveOps Playbook</h1>
              <p className="text-xl text-slate-200 leading-relaxed mb-6">
                From Automated DevSecOps to AI-Native Operations. The practitioner's field guide to the four-layer maturity model — with a Layer 2 checklist, 90-day roadmap, and the failure modes nobody warns you about.
              </p>
              <div className="flex flex-wrap gap-3">
                {INCLUDES.slice(0, 3).map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 size={14} className="text-secondary shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Email gate card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-200/20">
              {status === 'success' ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Unlock className="w-7 h-7 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Playbook unlocked</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                    Your copy is ready. Click below to open and save as PDF.
                  </p>
                  <button
                    onClick={() => generatePlaybookPDF(email)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    <Download size={16} /> Open & Save Playbook PDF
                  </button>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
                    Use your browser's "Save as PDF" option when the print dialog opens.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                      <Lock className="w-5 h-5 text-primary dark:text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">Get the free playbook</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Enter your email to unlock instant access</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Work email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          disabled={status === 'submitting'}
                          className="w-full pl-9 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-sm disabled:opacity-50"
                        />
                      </div>
                      {status === 'error' && (
                        <div className="flex items-center gap-1 mt-2 text-red-600 dark:text-red-400 text-xs">
                          <AlertCircle size={12} /> Something went wrong — please try again.
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-70"
                    >
                      {status === 'submitting' ? (
                        <><Loader2 className="animate-spin" size={16} /> Unlocking…</>
                      ) : (
                        <><Download size={16} /> Download Free Playbook</>
                      )}
                    </button>
                  </form>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 text-center">
                    No spam. You'll also receive The CognitiveOps Brief newsletter — unsubscribe anytime.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* What's inside */}
      <Section bg="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">What's inside</h2>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-10">8 chapters · 20 pages · Printable PDF</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHAPTERS.map(ch => (
              <div key={ch.num} className="flex items-start gap-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
                <div className="text-sm font-bold text-slate-400 dark:text-slate-500 shrink-0 font-mono w-6 pt-0.5">{ch.num}</div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{ch.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{ch.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Four layers preview */}
      <Section bg="gray">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">The Four Layers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: GitMerge, num: 'L1', name: 'Manual', color: 'text-slate-500', bg: 'bg-slate-100 dark:bg-slate-800', border: 'border-slate-300 dark:border-slate-600', desc: 'Manual deployments, reactive incidents, monthly cost surprises.' },
              { icon: Terminal, num: 'L2', name: 'Automated', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-300 dark:border-blue-700', desc: 'CI/CD, IaC, SAST in pipelines, tagged cloud costs, defined SLOs.' },
              { icon: Cpu, num: 'L3', name: 'Intelligent', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-300 dark:border-purple-700', desc: 'AIOps, predictive FinOps, GenAI-assisted workflows, policy-as-code.' },
              { icon: BrainCircuit, num: 'L4', name: 'Cognitive', color: 'text-secondary-dark dark:text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/40', desc: 'Autonomous remediation, self-optimising spend, AI-native operations.' },
            ].map(({ icon: Icon, num, name, color, bg, border, desc }) => (
              <div key={num} className={`rounded-xl border-2 ${border} ${bg} p-5`}>
                <Icon className={`w-6 h-6 mb-3 ${color}`} />
                <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">{num}</div>
                <div className="font-bold text-slate-900 dark:text-white mb-2">{name}</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Four pillars */}
      <Section bg="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">Four pillars. All must move.</h2>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            Your overall CognitiveOps layer is the minimum across all four pillars. A Layer 3 DevOps team with Layer 1 FinOps is, at the organisational level, a Layer 1 operation.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Terminal, label: 'DevOps', link: '/devops', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              { icon: ShieldCheck, label: 'SecOps', link: '/secops', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
              { icon: TrendingUp, label: 'FinOps', link: '/finops', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
              { icon: BrainCircuit, label: 'GenAI', link: '/genai', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
            ].map(({ icon: Icon, label, link, color, bg }) => (
              <Link key={label} to={link} className={`${bg} rounded-xl p-5 flex flex-col items-center text-center border border-transparent hover:border-secondary/40 transition-colors group`}>
                <Icon className={`w-8 h-8 mb-3 ${color}`} />
                <span className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-secondary transition-colors">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section bg="gray">
        <div className="max-w-3xl mx-auto">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-white">
            <Layers className="w-10 h-10 text-secondary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">Take the free maturity assessment</h2>
            <p className="text-slate-200 mb-6">13 questions across all four pillars. Find your layer, get a personalised PDF report, and see exactly where to focus next.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/cognitiveops/assessment"
                className="inline-flex items-center gap-2 px-7 py-3 bg-secondary text-primary font-bold rounded-xl hover:bg-secondary/90 transition-colors"
              >
                Take the Assessment <ArrowRight size={15} />
              </Link>
              <Link
                to="/contact?topic=Consulting"
                className="inline-flex items-center gap-2 px-7 py-3 border border-white/30 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors"
              >
                Book an Advisory Session
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default CognitiveOpsPlaybook;
