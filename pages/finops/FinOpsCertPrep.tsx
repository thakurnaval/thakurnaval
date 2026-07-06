import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download, Mail, CheckCircle2, Loader2, AlertCircle,
  Lock, Unlock, Award, BookOpen, Target, TrendingUp,
} from 'lucide-react';
import Section from '../../components/Section';
import SEO from '../../components/SEO';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx03K6mwLMtq6X5q8JIAHKQ4qSxCk9LEavNeO0IWo1jg9IxhzFoxvZM0DwKtgMegKDz1Q/exec';

const DOMAINS = [
  { domain: 'Understanding Cloud Usage and Cost', weight: '15–20%', icon: '📊', topics: ['CSP pricing models (on-demand, RI, SP, Spot)', 'Cost drivers: compute, storage, data transfer, managed services', 'How billing works: usage-based vs subscription'] },
  { domain: 'Performance Tracking and Benchmarking', weight: '15–20%', icon: '📈', topics: ['DORA for FinOps: unit economics, cost-per-unit', 'Budget vs actual variance analysis', 'Forecasting and anomaly detection'] },
  { domain: 'Real-Time Decision Making', weight: '15–20%', icon: '⚡', topics: ['Engineering teams making cost-aware decisions', 'Showback vs chargeback models', 'FinOps culture: shared ownership, not blame'] },
  { domain: 'Cloud Rate Optimization', weight: '15–20%', icon: '💡', topics: ['Reserved Instances: 1-year vs 3-year, convertible vs standard', 'Savings Plans: compute vs EC2, flexibility trade-offs', 'Committed Use Discounts (GCP) and Azure Reservations'] },
  { domain: 'Cloud Usage Optimization', weight: '15–20%', icon: '⚙️', topics: ['Rightsizing: over-provisioned compute identification', 'Spot/Preemptible instances: use cases and interruption handling', 'Storage lifecycle policies and object tiering'] },
  { domain: 'Organizational Alignment', weight: '15–20%', icon: '🏢', topics: ['The FinOps team: roles of engineering, finance, product, exec', 'FinOps maturity model: Crawl, Walk, Run', 'Cross-functional budgeting and cost governance'] },
];

const EXAM_TIPS = [
  { tip: 'Focus on the "why" not the "how"', detail: 'The FinOps Practitioner exam tests concepts and principles, not tool-specific commands. Understand why showback works before chargeback, not which tool to use for it.' },
  { tip: 'Know the Inform → Optimize → Operate cycle cold', detail: 'Every exam scenario maps to one of these three phases. Before answering any question, identify which phase the scenario is in — it narrows the correct answer set significantly.' },
  { tip: 'Understand trade-offs, not absolutes', detail: 'FinOps is about trade-offs between cost, performance, reliability, and speed. "It depends" is often the right framing — the exam rewards nuanced understanding.' },
  { tip: 'Reserved Instances vs Savings Plans distinction', detail: 'This is the most commonly tested and most commonly confused area. RI = instance-level commitment. SP = spend-level commitment with flexibility. Know when each is appropriate.' },
];

const generateFinOpsCertPrepPDF = (email: string) => {
  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>FinOps Certified Practitioner — Exam Prep Pack — Naval Thakur</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; background: #fff; font-size: 12px; line-height: 1.6; }
  .page { padding: 48px 56px; min-height: 100vh; page-break-after: always; }
  .cover { background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 60%, #5b21b6 100%); color: white; display: flex; flex-direction: column; justify-content: center; min-height: 100vh; padding: 72px 64px; page-break-after: always; }
  .cover-tag { font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #ddd6fe; margin-bottom: 24px; }
  .cover-title { font-size: 48px; font-weight: 800; line-height: 1.05; color: white; margin-bottom: 16px; }
  .cover-subtitle { font-size: 18px; color: #ede9fe; margin-bottom: 48px; max-width: 480px; line-height: 1.5; }
  .cover-author { font-size: 13px; color: #c4b5fd; }
  .cover-author strong { color: #ede9fe; }
  .cover-line { width: 60px; height: 4px; background: #a78bfa; margin: 40px 0; }
  h1 { font-size: 26px; font-weight: 800; color: #6d28d9; margin-bottom: 8px; }
  h2 { font-size: 17px; font-weight: 700; color: #6d28d9; margin: 28px 0 10px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
  h3 { font-size: 13px; font-weight: 700; color: #1e293b; margin: 16px 0 5px; }
  p { margin-bottom: 10px; color: #475569; font-size: 12px; }
  .domain-card { border: 1px solid #e9d5ff; border-radius: 8px; margin: 12px 0; overflow: hidden; }
  .domain-header { background: #f5f3ff; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; }
  .domain-name { font-weight: 700; color: #4c1d95; font-size: 12px; }
  .domain-weight { font-size: 11px; background: #ddd6fe; color: #4c1d95; padding: 2px 8px; border-radius: 99px; font-weight: 700; }
  .domain-body { padding: 10px 14px; }
  .topic-item { display: flex; gap: 6px; margin: 4px 0; }
  .topic-dot { color: #7c3aed; font-weight: 700; }
  .topic-text { font-size: 11px; color: #374151; }
  .concept-box { background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 6px; padding: 12px 14px; margin: 8px 0; }
  .concept-title { font-weight: 700; color: #4c1d95; font-size: 12px; margin-bottom: 4px; }
  .concept-body { font-size: 11px; color: #374151; }
  .callout { padding: 12px 16px; border-radius: 8px; margin: 14px 0; }
  .callout-purple { background: #f5f3ff; border: 1px solid #ddd6fe; }
  .callout-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #6d28d9; margin-bottom: 4px; }
  .q-card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; margin: 10px 0; }
  .q-text { font-size: 11px; font-weight: 700; color: #1e293b; margin-bottom: 8px; }
  .q-option { font-size: 11px; color: #475569; margin: 3px 0; padding-left: 8px; }
  .q-correct { color: #166534; font-weight: 700; }
  .q-explain { font-size: 10px; color: #64748b; margin-top: 8px; padding-top: 8px; border-top: 1px solid #f1f5f9; }
  .tip-card { border-left: 3px solid #7c3aed; padding: 10px 14px; margin: 8px 0; background: #faf5ff; }
  .tip-title { font-weight: 700; color: #4c1d95; font-size: 12px; margin-bottom: 3px; }
  .tip-body { font-size: 11px; color: #374151; }
  table { width: 100%; border-collapse: collapse; margin: 12px 0; }
  th { background: #6d28d9; color: white; padding: 8px 10px; text-align: left; font-size: 11px; }
  td { padding: 7px 10px; border-bottom: 1px solid #f1f5f9; font-size: 11px; color: #475569; }
  tr:nth-child(even) td { background: #f8fafc; }
  ul { padding-left: 18px; margin-bottom: 10px; }
  li { margin-bottom: 4px; color: #475569; font-size: 11px; }
  .footer { margin-top: 40px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 10px; color: #94a3b8; display: flex; justify-content: space-between; }
  @media print { .no-print { display: none; } }
</style>
</head>
<body>

<!-- Cover -->
<div class="cover">
  <div class="cover-tag">FinOps Certified Practitioner (FOCP) · Exam Prep Pack</div>
  <div class="cover-title">FinOps Cert Prep Pack</div>
  <div class="cover-subtitle">A concise, exam-focused study pack covering all six FinOps Practitioner exam domains. Core concepts, key distinctions, practice questions, and exam technique — from a practitioner who has taken and passed the cert.</div>
  <div class="cover-line"></div>
  <div class="cover-author">By <strong>Naval Thakur</strong> · FinOps Certified Practitioner · nthakur.com</div>
  <div class="cover-author" style="margin-top:8px">Prepared for: <strong>${email}</strong></div>
</div>

<!-- Page 2: Exam Overview + Domains -->
<div class="page">
  <h1>The FinOps Practitioner Exam at a Glance</h1>
  <table>
    <tr><th>Detail</th><th>Value</th></tr>
    <tr><td>Certification body</td><td>FinOps Foundation</td></tr>
    <tr><td>Exam name</td><td>FinOps Certified Practitioner (FOCP)</td></tr>
    <tr><td>Format</td><td>50 multiple-choice questions, online proctored</td></tr>
    <tr><td>Duration</td><td>60 minutes</td></tr>
    <tr><td>Pass mark</td><td>75% (37/50 questions)</td></tr>
    <tr><td>Validity</td><td>2 years — renewal via CPD points or re-exam</td></tr>
    <tr><td>Prerequisites</td><td>None formal — but hands-on cloud experience is strongly recommended</td></tr>
  </table>

  <div class="callout callout-purple">
    <div class="callout-title">Naval's study recommendation</div>
    <p style="font-size:11px; margin:0; color:#4c1d95">The FOCP is a practitioner-level exam, not a theory exam. If you have 12+ months of hands-on cloud cost work, the concepts will feel familiar. The preparation gap is usually the FinOps-specific vocabulary and the structured framework (Inform → Optimize → Operate). Focus on that.</p>
  </div>

  <h2>The Six Exam Domains</h2>

  <div class="domain-card">
    <div class="domain-header"><span class="domain-name">📊 Understanding Cloud Usage and Cost</span><span class="domain-weight">15–20%</span></div>
    <div class="domain-body">
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">CSP pricing models: on-demand, Reserved Instances, Savings Plans, Spot/Preemptible, sustained-use discounts</span></div>
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">Primary cost drivers: compute, storage, egress/data transfer, managed services, support tiers</span></div>
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">How usage translates to cost: metering granularity (per-second, per-hour), blended vs unblended rates</span></div>
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">Cost allocation: tagging taxonomies, shared cost handling, amortisation of upfront RI payments</span></div>
    </div>
  </div>

  <div class="domain-card">
    <div class="domain-header"><span class="domain-name">📈 Performance Tracking and Benchmarking</span><span class="domain-weight">15–20%</span></div>
    <div class="domain-body">
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">Unit economics: cost per API call, per active user, per transaction — the north star FinOps metric</span></div>
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">Budget vs actual variance: threshold alerts, anomaly detection, trend analysis</span></div>
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">Forecasting methods: trend-based, driver-based, bottoms-up modelling</span></div>
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">Benchmarking: against industry peers, against prior period, against commitment coverage targets</span></div>
    </div>
  </div>

  <div class="domain-card">
    <div class="domain-header"><span class="domain-name">⚡ Real-Time Decision Making</span><span class="domain-weight">15–20%</span></div>
    <div class="domain-body">
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">The FinOps principle: everyone is accountable for their cloud spend</span></div>
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">Showback: here is your team's spend. Chargeback: your team owes this. Showback first — always.</span></div>
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">FinOps culture: moving from "ops owns cost" to "engineering owns cost with finance as partner"</span></div>
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">Cost-aware architecture: cost as a non-functional requirement at design time, not deployment time</span></div>
    </div>
  </div>

  <div class="domain-card">
    <div class="domain-header"><span class="domain-name">💡 Cloud Rate Optimization</span><span class="domain-weight">15–20%</span></div>
    <div class="domain-body">
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">Reserved Instances (AWS): Standard (no exchange) vs Convertible (exchangeable); 1-year vs 3-year</span></div>
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">Savings Plans (AWS): Compute SP (most flexible) vs EC2 Instance SP (highest discount)</span></div>
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">GCP Committed Use Discounts, Azure Reservations — same principle, CSP-specific naming</span></div>
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">Commitment coverage: how much of your on-demand baseline to commit. Rule of thumb: 60–80%.</span></div>
    </div>
  </div>

  <div class="domain-card">
    <div class="domain-header"><span class="domain-name">⚙️ Cloud Usage Optimization</span><span class="domain-weight">15–20%</span></div>
    <div class="domain-body">
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">Rightsizing: matching instance size to actual CPU/memory utilisation (&lt;20% avg = over-provisioned)</span></div>
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">Spot/Preemptible: 70–90% savings, can be reclaimed. Suitable for stateless, fault-tolerant workloads.</span></div>
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">Storage optimisation: S3 lifecycle policies, object tiering (Standard → IA → Glacier), EBS snapshot audit</span></div>
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">Waste elimination: zombie resources (unattached disks, idle LBs, stopped VMs), orphaned snapshots</span></div>
    </div>
  </div>

  <div class="domain-card">
    <div class="domain-header"><span class="domain-name">🏢 Organizational Alignment</span><span class="domain-weight">15–20%</span></div>
    <div class="domain-body">
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">FinOps team composition: FinOps practitioner, engineer champion, finance business partner, exec sponsor</span></div>
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">Maturity model: Crawl (awareness), Walk (optimisation), Run (automation and governance)</span></div>
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">Cross-functional budgeting: engineering teams own budgets, not just consume from a central IT pool</span></div>
      <div class="topic-item"><span class="topic-dot">→</span><span class="topic-text">KPIs: tagging coverage %, commitment coverage %, unit cost trend, anomaly detection SLA, savings realised</span></div>
    </div>
  </div>

  <div class="footer"><span>FinOps Cert Prep Pack · nthakur.com · © Naval Thakur</span><span>Page 2</span></div>
</div>

<!-- Page 3: Key Concepts + Practice Questions -->
<div class="page">
  <h1>Key Distinctions — The Exam Tests These</h1>

  <div class="concept-box">
    <div class="concept-title">RI vs Savings Plans — The Most Tested Distinction</div>
    <div class="concept-body">
      <strong>Reserved Instance:</strong> Commitment at the instance level (family, size, region, OS). Higher discount than SP for the same workload. Not flexible — switching instance type requires a new RI or conversion (Convertible only).<br><br>
      <strong>Savings Plan:</strong> Commitment at the spend level ($X/hour). Works across any instance type within scope. Compute SP: broadest (EC2 + Fargate + Lambda). EC2 Instance SP: deepest discount, one instance family in one region.<br><br>
      <strong>When to use RI:</strong> Steady-state workloads where you're confident about instance type and size (databases are the classic case).<br>
      <strong>When to use SP:</strong> Compute workloads with variable sizing, or where you want flexibility across instance types.
    </div>
  </div>

  <div class="concept-box">
    <div class="concept-title">Blended vs Unblended Rates</div>
    <div class="concept-body">
      <strong>Unblended:</strong> The actual rate charged for each resource — RI rate for reserved resources, on-demand rate for the rest. Accurate per-resource cost but makes cost allocation harder for teams that share commitments.<br><br>
      <strong>Blended:</strong> A weighted average across on-demand and reserved usage. Makes shared-commitment cost allocation fairer across teams. The exam may ask which is better for chargeback (blended — more equitable) vs for audit (unblended — more precise).
    </div>
  </div>

  <div class="concept-box">
    <div class="concept-title">Showback vs Chargeback</div>
    <div class="concept-body">
      <strong>Showback:</strong> Show teams their cloud spend without financial consequences. Best for early FinOps maturity — builds awareness without triggering politics.<br><br>
      <strong>Chargeback:</strong> Teams are financially accountable for their cloud spend, charged back to their P&amp;L. Requires mature allocation methodology and engineering buy-in. The exam will ask: which to use when maturity is low? Showback. The objective is identical: make teams cost-aware.
    </div>
  </div>

  <div class="concept-box">
    <div class="concept-title">The Inform → Optimize → Operate Cycle</div>
    <div class="concept-body">
      These phases are not sequential — they run concurrently and reinforce each other:<br>
      <strong>Inform:</strong> Allocation, visibility, forecasting, unit economics. You cannot optimise without this.<br>
      <strong>Optimize:</strong> Rightsizing, commitments, waste elimination. Actionable only when Inform is solid.<br>
      <strong>Operate:</strong> Culture, process, governance, KPIs. Sustains the gains from the other two phases.<br><br>
      The exam often presents scenarios where a team has skipped a phase — identify which phase is missing and why it matters.
    </div>
  </div>

  <h2>Practice Questions</h2>

  <div class="q-card">
    <div class="q-text">1. A company has a steady-state PostgreSQL database on AWS running on an r5.2xlarge instance. What discount mechanism provides the highest savings?</div>
    <div class="q-option">A. Compute Savings Plan (1-year, no upfront)</div>
    <div class="q-option">B. EC2 Instance Savings Plan (3-year, no upfront)</div>
    <div class="q-option q-correct">C. Standard Reserved Instance for r5.2xlarge (3-year, all upfront) ✓</div>
    <div class="q-option">D. Spot Instance</div>
    <div class="q-explain">Correct: C. Standard RI with all upfront payment provides the deepest discount (~72%). Spot is unsuitable for a database (can be reclaimed). Savings Plans provide less discount than a matching RI for a stable, predictable workload.</div>
  </div>

  <div class="q-card">
    <div class="q-text">2. An organisation is at early FinOps maturity (Crawl). Engineering teams are unaware of their cloud spend. What is the most appropriate first step?</div>
    <div class="q-option q-correct">A. Implement showback reporting to make teams aware of their spend ✓</div>
    <div class="q-option">B. Implement chargeback to financially hold teams accountable</div>
    <div class="q-option">C. Purchase Reserved Instances to reduce the overall bill</div>
    <div class="q-option">D. Hire a dedicated FinOps team</div>
    <div class="q-explain">Correct: A. At Crawl maturity, the priority is visibility and awareness (Inform phase). Showback is the right starting point — chargeback without allocation maturity and cultural buy-in creates conflict, not accountability.</div>
  </div>

  <div class="q-card">
    <div class="q-text">3. Which FinOps metric best represents the relationship between cloud spend and business value delivered?</div>
    <div class="q-option">A. Total cloud spend</div>
    <div class="q-option">B. Month-over-month spend growth</div>
    <div class="q-option q-correct">C. Cost per unit of business output (unit economics) ✓</div>
    <div class="q-option">D. RI coverage percentage</div>
    <div class="q-explain">Correct: C. Unit economics (cost per transaction, per active user, per API call) is the north star FinOps metric because it connects spend to value. Total spend and growth rate alone cannot tell you if the spend is justified by the business outcome.</div>
  </div>

  <div class="q-card">
    <div class="q-text">4. A team uses Spot Instances for their CI/CD build agents. Which workload characteristic makes this appropriate?</div>
    <div class="q-option">A. The agents run long, multi-hour jobs with no checkpointing</div>
    <div class="q-option q-correct">B. The agents are stateless and can be relaunched if interrupted ✓</div>
    <div class="q-option">C. The agents run the production API layer</div>
    <div class="q-option">D. The agents must complete within a guaranteed 5-minute window</div>
    <div class="q-explain">Correct: B. Spot instances can be reclaimed with 2 minutes' notice. Stateless, interruptible workloads (CI runners, batch jobs, ML training with checkpoints) are ideal. Never use Spot for stateful production workloads or those with hard latency SLAs.</div>
  </div>

  <div class="footer"><span>FinOps Cert Prep Pack · nthakur.com · © Naval Thakur</span><span>Page 3</span></div>
</div>

<!-- Page 4: Exam Strategy + Study Plan -->
<div class="page">
  <h1>Exam Strategy &amp; 3-Week Study Plan</h1>

  <h2>Four Exam Technique Tips</h2>

  <div class="tip-card">
    <div class="tip-title">Focus on the "why" not the "how"</div>
    <div class="tip-body">The FOCP tests concepts and principles, not tool-specific commands. Understand why showback works before chargeback — not which AWS console screen to use. Conceptual understanding scores higher than tool familiarity.</div>
  </div>
  <div class="tip-card">
    <div class="tip-title">Map every scenario to a lifecycle phase first</div>
    <div class="tip-body">Before answering, identify: is this an Inform, Optimize, or Operate scenario? This narrows the answer space to 1–2 plausible options in most cases. The exam is structured around the lifecycle.</div>
  </div>
  <div class="tip-card">
    <div class="tip-title">RI vs Savings Plans — know the decision tree</div>
    <div class="tip-body">Stable workload, known instance type → RI. Variable compute, need flexibility → Savings Plan. Database → RI (unless multi-region multi-type). This single distinction accounts for ~10–15% of the exam.</div>
  </div>
  <div class="tip-card">
    <div class="tip-title">When unsure: eliminate, then choose the most conservative FinOps answer</div>
    <div class="tip-body">FinOps is conservative about cost commitment without data. If a question asks what to do first, the answer is almost always "get visibility" (Inform) before taking action (Optimize). Eliminate any answer that jumps to purchasing commitments without a baseline.</div>
  </div>

  <h2>3-Week Study Plan</h2>
  <table>
    <tr><th>Week</th><th>Focus</th><th>Daily Time</th><th>Activity</th></tr>
    <tr><td><strong>Week 1</strong></td><td>Foundation: Domains 1–3</td><td>30–45 min</td><td>Read the FinOps Foundation open resource. Study domain notes in this pack. Flashcard key definitions.</td></tr>
    <tr><td><strong>Week 2</strong></td><td>Optimization: Domains 4–6</td><td>30–45 min</td><td>Deep dive RI vs SP. Work through the practice questions in this pack. Identify your weak domain.</td></tr>
    <tr><td><strong>Week 3</strong></td><td>Practice + Review</td><td>60 min</td><td>Full practice exam under timed conditions. Review every wrong answer against the domain notes. Re-read the key distinctions page the night before.</td></tr>
  </table>

  <div class="callout callout-purple">
    <div class="callout-title">The most important thing to know before sitting the exam</div>
    <p style="font-size:11px; margin:0; color:#4c1d95">The FinOps Foundation publishes an open-source study curriculum at finops.org. Read it end-to-end at least once — the exam is drawn directly from it. This prep pack accelerates your understanding of the concepts that trip up first-time takers, but the Foundation's materials are the canonical source. Use both.</p>
  </div>

  <h2>Key Vocabulary — Learn These Cold</h2>
  <table>
    <tr><th>Term</th><th>Definition</th></tr>
    <tr><td><strong>Unit Economics</strong></td><td>Cloud cost expressed per unit of business output (per user, per transaction, per request)</td></tr>
    <tr><td><strong>Showback</strong></td><td>Visibility into team-level spend without financial consequences</td></tr>
    <tr><td><strong>Chargeback</strong></td><td>Financial accountability for cloud spend charged back to the consuming team's budget</td></tr>
    <tr><td><strong>Amortisation</strong></td><td>Spreading upfront RI/SP payments across the commitment period for cost allocation</td></tr>
    <tr><td><strong>Blended Rate</strong></td><td>Average rate across on-demand and reserved usage; used for equitable shared-resource allocation</td></tr>
    <tr><td><strong>Commitment Coverage</strong></td><td>% of on-demand baseline covered by RIs/SPs. Target: 60–80% of stable compute.</td></tr>
    <tr><td><strong>Error Budget</strong></td><td>SRE concept adopted by FinOps: allowable cost overrun before governance escalation is triggered</td></tr>
    <tr><td><strong>Rightsizing</strong></td><td>Adjusting resource capacity to match actual utilisation; primary usage optimisation lever</td></tr>
    <tr><td><strong>Zombie Resource</strong></td><td>Provisioned resource no longer serving an active workload; pure waste</td></tr>
    <tr><td><strong>FinOps Maturity</strong></td><td>Three-phase model: Crawl (awareness), Walk (action), Run (automation + governance)</td></tr>
  </table>

  <div style="margin-top:28px; padding:18px; background:#4c1d95; border-radius:10px; color:white">
    <div style="font-size:10px; text-transform:uppercase; letter-spacing:2px; color:#c4b5fd; font-weight:700; margin-bottom:6px">Practice Makes Passing</div>
    <div style="font-size:13px; font-weight:700; margin-bottom:6px">Test your FinOps knowledge interactively</div>
    <div style="font-size:11px; color:#ede9fe">Take the free FinOps assessment at nthakur.com/finops/assessment. It's structured around the same six domains as the exam — and gives you a scored gap analysis that tells you exactly where to focus your last week of prep.</div>
  </div>

  <div class="footer"><span>FinOps Cert Prep Pack · nthakur.com · © Naval Thakur 2026 · All rights reserved</span><span>Page 4</span></div>
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
      "headline": "FinOps Certified Practitioner — Exam Prep Pack",
      "description": "A concise exam-focused study pack for the FinOps Certified Practitioner (FOCP) exam covering all six domains, key distinctions, practice questions, and exam technique.",
      "author": { "@type": "Person", "name": "Naval Thakur", "url": "https://nthakur.com/about" },
      "url": "https://nthakur.com/finops/cert-prep",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nthakur.com" },
        { "@type": "ListItem", "position": 2, "name": "FinOps", "item": "https://nthakur.com/finops" },
        { "@type": "ListItem", "position": 3, "name": "Cert Prep", "item": "https://nthakur.com/finops/cert-prep" },
      ]
    }
  ]
};

const FinOpsCertPrep: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const form = new FormData();
      form.append('email', email);
      form.append('name', 'FinOps Cert Prep Download');
      form.append('topic', 'FinOps Certified Practitioner Exam Prep Pack Download');
      form.append('message', 'User requested FinOps Cert Prep Pack.');
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: form, mode: 'no-cors' });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <SEO
        title="FinOps Certified Practitioner Exam Prep Pack — Free | Naval Thakur"
        description="Free exam prep pack for the FinOps Certified Practitioner (FOCP) certification. Covers all 6 exam domains, key distinctions (RI vs Savings Plans), practice questions, and a 3-week study plan."
        structuredData={SCHEMA}
      />

      {/* Hero */}
      <div className="relative bg-primary text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-violet-950 to-purple-900/30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-400/40 bg-purple-400/10 text-purple-300 text-sm font-bold mb-6">
                <Award size={14} /> FinOps Foundation Cert · FOCP
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">FinOps Cert Prep Pack</h1>
              <p className="text-xl text-slate-200 leading-relaxed mb-6">
                Everything you need to pass the FinOps Certified Practitioner exam — from a practitioner who has taken and passed it. Six domains, key distinctions, practice questions, 3-week study plan.
              </p>
              <div className="space-y-2">
                {['All 6 FOCP exam domains covered', 'RI vs Savings Plans distinction (most-tested topic)', '4 practice questions with explained answers', '3-week study plan', 'Key FinOps vocabulary — 10 terms to know cold', 'Exam technique tips from a certified practitioner'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 size={14} className="text-purple-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Email gate */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-200/20">
              {status === 'success' ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Unlock className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Pack unlocked</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Your cert prep pack is ready. Open and save as PDF.</p>
                  <button
                    onClick={() => generateFinOpsCertPrepPDF(email)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-700 text-white font-bold rounded-xl hover:bg-purple-800 transition-colors"
                  >
                    <Download size={16} /> Open &amp; Save PDF
                  </button>
                  <p className="text-xs text-slate-400 mt-3">Use "Save as PDF" in the print dialog.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Lock className="w-5 h-5 text-purple-700 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">Get the free prep pack</h3>
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
                          className="w-full pl-9 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm disabled:opacity-50"
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
                      className="w-full flex items-center justify-center gap-2 py-3 bg-purple-700 text-white font-bold rounded-xl hover:bg-purple-800 transition-colors disabled:opacity-70"
                    >
                      {status === 'submitting' ? <><Loader2 className="animate-spin" size={16} /> Unlocking…</> : <><Download size={16} /> Download Free Pack</>}
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

      {/* Domains preview */}
      <Section bg="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">Six exam domains covered</h2>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-10">Each domain is equally weighted at 15–20% of the exam. The pack covers all six in depth.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DOMAINS.map(d => (
              <div key={d.domain} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-xl mr-2">{d.icon}</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{d.domain}</span>
                  </div>
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-2 py-0.5 rounded-full shrink-0">{d.weight}</span>
                </div>
                <div className="space-y-1">
                  {d.topics.map(t => (
                    <div key={t} className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <CheckCircle2 size={11} className="text-purple-500 shrink-0 mt-0.5" /> {t}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Exam tips */}
      <Section bg="gray">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">Exam technique</h2>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-10">The pack includes four exam technique tips. Here's a preview.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EXAM_TIPS.map(t => (
              <div key={t.tip} className="bg-white dark:bg-slate-800 rounded-xl border border-purple-100 dark:border-purple-900/30 border-l-4 border-l-purple-500 p-5">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">{t.tip}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-primary rounded-2xl p-8 text-white">
            <BookOpen className="w-10 h-10 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">Practice before the real thing</h2>
            <p className="text-slate-200 mb-6">The FinOps assessment covers the same six domains as the exam. Use it to identify your weakest area before you sit.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/finops/assessment" className="inline-flex items-center gap-2 px-7 py-3 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-400 transition-colors">
                Take the FinOps Assessment <Target size={15} />
              </Link>
              <Link to="/finops" className="inline-flex items-center gap-2 px-7 py-3 border border-white/30 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">
                Explore FinOps <TrendingUp size={15} />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default FinOpsCertPrep;
