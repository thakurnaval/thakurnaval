import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download, Mail, CheckCircle2, Loader2, AlertCircle,
  TrendingUp, Lock, Unlock, Calendar, Target, BarChart3, Layers,
} from 'lucide-react';
import Section from '../../components/Section';
import SEO from '../../components/SEO';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx03K6mwLMtq6X5q8JIAHKQ4qSxCk9LEavNeO0IWo1jg9IxhzFoxvZM0DwKtgMegKDz1Q/exec';

const WEEKS = [
  { week: 'Week 1', theme: 'FinOps Foundations', color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800', days: 'Days 1–7', desc: 'The mindset shift, lifecycle phases, and mapping where you are today.' },
  { week: 'Week 2', theme: 'Inform — Visibility', color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800', days: 'Days 8–14', desc: 'Cost allocation, tagging, unit economics, anomaly detection, dashboards.' },
  { week: 'Week 3', theme: 'Optimize — Action', color: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800', days: 'Days 15–21', desc: 'Rightsizing, Reserved Instances, Spot, storage, zombie audits, licensing.' },
  { week: 'Week 4', theme: 'Operate — Sustain', color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800', days: 'Days 22–28', desc: 'Team structure, KPIs, culture, governance, tooling, multi-cloud.' },
  { week: 'Days 29–30', theme: 'Assess & Plan', color: 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700', days: 'Days 29–30', desc: 'FinOps maturity self-assessment and your 90-day action plan.' },
];

const INCLUDES = [
  '30 daily challenge cards with actions and reflection prompts',
  'FinOps Lifecycle deep-dive (Inform → Optimize → Operate)',
  'Tagging taxonomy template you can use immediately',
  'Rightsizing and zombie resource audit checklist',
  'FinOps KPI dashboard template',
  '90-day FinOps action plan template',
];

const generateFinOps30DayPDF = (email: string) => {
  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>30 Days of FinOps — Naval Thakur</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; background: #fff; font-size: 12px; line-height: 1.6; }
  .page { padding: 48px 56px; min-height: 100vh; page-break-after: always; }
  .cover { background: linear-gradient(135deg, #166534 0%, #15803d 60%, #16a34a 100%); color: white; display: flex; flex-direction: column; justify-content: center; min-height: 100vh; padding: 72px 64px; page-break-after: always; }
  .cover-tag { font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #bbf7d0; margin-bottom: 24px; }
  .cover-title { font-size: 52px; font-weight: 800; line-height: 1.05; color: white; margin-bottom: 16px; }
  .cover-subtitle { font-size: 18px; color: #dcfce7; margin-bottom: 48px; max-width: 480px; line-height: 1.5; }
  .cover-author { font-size: 13px; color: #86efac; }
  .cover-author strong { color: #dcfce7; }
  .cover-line { width: 60px; height: 4px; background: #4ade80; margin: 40px 0; }
  h1 { font-size: 28px; font-weight: 800; color: #166534; margin-bottom: 8px; }
  h2 { font-size: 18px; font-weight: 700; color: #166534; margin: 28px 0 10px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
  h3 { font-size: 14px; font-weight: 700; color: #1e293b; margin: 18px 0 6px; }
  p { margin-bottom: 10px; color: #475569; }
  .week-header { background: #f0fdf4; border-left: 4px solid #16a34a; padding: 12px 16px; margin: 20px 0 12px; border-radius: 0 6px 6px 0; }
  .week-title { font-size: 13px; font-weight: 800; color: #166534; text-transform: uppercase; letter-spacing: 1px; }
  .week-sub { font-size: 11px; color: #4b5563; margin-top: 2px; }
  .day-card { display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
  .day-num { font-size: 11px; font-weight: 800; color: #16a34a; min-width: 40px; padding-top: 2px; }
  .day-title { font-size: 12px; font-weight: 700; color: #1e293b; margin-bottom: 3px; }
  .day-action { font-size: 11px; color: #475569; }
  .callout { padding: 14px 18px; border-radius: 8px; margin: 16px 0; }
  .callout-green { background: #f0fdf4; border: 1px solid #bbf7d0; }
  .callout-blue { background: #eff6ff; border: 1px solid #bfdbfe; }
  .callout-amber { background: #fffbeb; border: 1px solid #fde68a; }
  .callout-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #166534; margin-bottom: 4px; }
  .kpi-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
  .kpi-name { font-weight: 600; color: #1e293b; font-size: 12px; }
  .kpi-target { font-size: 11px; color: #16a34a; font-weight: 700; }
  .tag-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 12px 0; }
  .tag-item { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 12px; }
  .tag-key { font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 2px; }
  .tag-val { font-size: 11px; color: #1e293b; }
  ul { padding-left: 18px; margin-bottom: 12px; }
  li { margin-bottom: 5px; color: #475569; font-size: 12px; }
  .footer { margin-top: 40px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 10px; color: #94a3b8; display: flex; justify-content: space-between; }
  @media print { .no-print { display: none; } }
</style>
</head>
<body>

<!-- Cover -->
<div class="cover">
  <div class="cover-tag">30-Day Practitioner Challenge</div>
  <div class="cover-title">30 Days of FinOps</div>
  <div class="cover-subtitle">A daily challenge guide to building real cloud financial accountability — from cost visibility to predictive optimisation. One action per day. 30 days to fluency.</div>
  <div class="cover-line"></div>
  <div class="cover-author">By <strong>Naval Thakur</strong> · FinOps Certified Practitioner · nthakur.com</div>
  <div class="cover-author" style="margin-top:8px">Prepared for: <strong>${email}</strong></div>
</div>

<!-- Page 2: How to use -->
<div class="page">
  <div class="callout callout-green">
    <div class="callout-title">How to use this guide</div>
    <p style="font-size:11px; margin:0; color:#166534">Do one day per working day. Each day has a concept, an action, and a reflection. The actions are sized for 30–60 minutes. The goal is not to read this — it's to do it. By Day 30, you will have a functioning FinOps baseline, a tagging strategy, an optimisation backlog, and a 90-day plan ready to present to your leadership.</p>
  </div>

  <h1>Why FinOps Fails Without a Practice</h1>
  <p>Most organisations discover FinOps when they get a cloud bill that surprises them. They react: tag more resources, turn off some instances, buy Reserved Capacity. Costs drop for one quarter. Then they rise again.</p>
  <p>The reason is not the tools. The reason is that cloud cost management without a continuous practice reverts to the mean within two quarters — every time. This guide is designed to build the practice, not just the knowledge.</p>

  <h2>The FinOps Lifecycle</h2>
  <p>The FinOps Foundation defines three phases that cycle continuously. This guide follows the same structure:</p>
  <ul>
    <li><strong>Inform:</strong> Make cloud costs visible. Allocate accurately. Understand the unit economics. You cannot optimise what you cannot see.</li>
    <li><strong>Optimize:</strong> Take action on what the data shows. Rightsizing. Commitment-based discounts. Eliminating waste. The most tangible phase, and the most tempting to jump to without completing Inform first.</li>
    <li><strong>Operate:</strong> Build the process, culture, and governance that sustains the gains from Inform and Optimize. The phase most organisations skip — and why savings don't last.</li>
  </ul>

  <h2>The Three Phases of Maturity</h2>
  <div class="tag-row">
    <div class="tag-item"><div class="tag-key">Crawl</div><div class="tag-val">Basic cost visibility. Tagging started. First showback reports. Team awareness growing.</div></div>
    <div class="tag-item"><div class="tag-key">Walk</div><div class="tag-val">Full allocation. Anomaly alerts. Rightsizing in progress. Budget governance in place.</div></div>
    <div class="tag-item"><div class="tag-key">Run</div><div class="tag-val">Predictive forecasting. Policy-as-code enforcement. Unit economics driving product decisions.</div></div>
    <div class="tag-item"><div class="tag-key">Fly (Layer 4)</div><div class="tag-val">AI-native spend optimisation. Autonomous right-sizing. Real-time cost-to-value feedback loops.</div></div>
  </div>
  <p>This guide takes you from wherever you are to a solid Walk posture by Day 30.</p>

  <div class="footer"><span>30 Days of FinOps · nthakur.com · © Naval Thakur</span><span>Page 2</span></div>
</div>

<!-- Page 3: Week 1 -->
<div class="page">
  <div class="week-header">
    <div class="week-title">Week 1 — FinOps Foundations (Days 1–7)</div>
    <div class="week-sub">Mindset, lifecycle, and mapping your current state</div>
  </div>

  <div class="day-card">
    <div class="day-num">Day 1</div>
    <div><div class="day-title">What FinOps actually is</div><div class="day-action">Read the FinOps Foundation definition. Write down in your own words: what would "everyone is responsible for cloud cost" look like at your organisation? Identify who currently owns cloud cost decisions.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 2</div>
    <div><div class="day-title">The lifecycle: Inform → Optimize → Operate</div><div class="day-action">For each phase, write one sentence on where your org currently stands. This is your baseline. Save it — you will revisit it on Day 29.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 3</div>
    <div><div class="day-title">Your cloud estate — what do you actually have?</div><div class="day-action">Pull the last 3 months of cloud spend. Break it down by: compute, storage, network, data transfer, managed services. Note the top 5 line items. Most teams are surprised by #3 and #4.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 4</div>
    <div><div class="day-title">Tagging — the foundation of everything</div><div class="day-action">Document your current tagging policy. If you don't have one, draft the 5 mandatory tags: team, environment, product, cost-centre, owner. These 5 will unlock 80% of allocation accuracy.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 5</div>
    <div><div class="day-title">Anatomy of your cloud bill</div><div class="day-action">Find the 3 resources with the highest individual spend. For each: is it sized correctly? Is it running 24/7 when it shouldn't be? Is anyone responsible for it? Document findings.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 6</div>
    <div><div class="day-title">FinOps stakeholders — who needs to be in the room?</div><div class="day-action">Identify your FinOps stakeholders: Finance contact, engineering lead, product owner, and executive sponsor. Without these four, FinOps stays a tool exercise rather than a practice.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 7</div>
    <div><div class="day-title">Week 1 reflection</div><div class="day-action">What is your current maturity phase (Crawl/Walk/Run)? What is your biggest single gap? Write a 3-sentence summary you could share with your manager. This is the basis for your Day 30 plan.</div></div>
  </div>

  <div class="week-header" style="margin-top:28px">
    <div class="week-title">Week 2 — Inform: Visibility (Days 8–14)</div>
    <div class="week-sub">Cost allocation, unit economics, anomaly detection, dashboards</div>
  </div>

  <div class="day-card">
    <div class="day-num">Day 8</div>
    <div><div class="day-title">Showback vs chargeback</div><div class="day-action">Showback: here is what your team spent. Chargeback: here is what your team owes. Start with showback — it builds awareness without triggering defensiveness. Draft your first showback report format.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 9</div>
    <div><div class="day-title">Unit economics — cost per what?</div><div class="day-action">Define your unit of business value: cost per API request, per active user, per order processed, per GB ingested. Calculate your current cost-per-unit. This is your north star metric.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 10</div>
    <div><div class="day-title">Tagging deep dive — coverage audit</div><div class="day-action">Run a tagging coverage report. What % of resources have the 5 mandatory tags? Anything under 80% is a red flag. For untagged resources, identify the owner and create a 2-week remediation plan.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 11</div>
    <div><div class="day-title">Cloud cost anomaly detection</div><div class="day-action">Enable AWS Cost Anomaly Detection / Azure Cost Alerts / GCP Budget Alerts for the top 5 spend categories. Set thresholds at 15% above 4-week average. This is your early warning system.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 12</div>
    <div><div class="day-title">Forecasting basics</div><div class="day-action">Project next month's cloud spend using the last 3 months as a baseline. Identify any known upcoming projects that will spike spend. Share the forecast with your Finance contact — start the conversation.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 13</div>
    <div><div class="day-title">Dashboard design — what to show and to whom</div><div class="day-action">Design three views: (1) Executive: total spend + trend + forecast. (2) Engineering: team spend + per-service breakdown. (3) Finance: budget vs actual + variance. One dashboard cannot serve all three audiences.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 14</div>
    <div><div class="day-title">Week 2 reflection — your Inform capabilities</div><div class="day-action">Rate your Inform maturity 1–5 on: allocation accuracy, anomaly detection, unit economics, forecasting. Identify the one gap that is limiting your ability to optimise. That gap is next week's focus.</div></div>
  </div>

  <div class="footer"><span>30 Days of FinOps · nthakur.com · © Naval Thakur</span><span>Page 3</span></div>
</div>

<!-- Page 4: Weeks 3 & 4 -->
<div class="page">
  <div class="week-header">
    <div class="week-title">Week 3 — Optimize: Take Action (Days 15–21)</div>
    <div class="week-sub">Rightsizing, discounts, waste elimination, storage, licensing</div>
  </div>

  <div class="day-card">
    <div class="day-num">Day 15</div>
    <div><div class="day-title">Rightsizing — finding what's over-provisioned</div><div class="day-action">Pull CPU and memory utilisation data for your top 20 compute resources. Flag any with &lt;20% avg CPU over 30 days. These are rightsizing candidates. Start with dev/test — lower risk, still meaningful savings.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 16</div>
    <div><div class="day-title">Reserved Instances vs Savings Plans</div><div class="day-action">Reserved Instances: lock to a specific instance type. Savings Plans: lock to a spend level, flexible on instance type. For stable workloads: RIs for databases, Savings Plans for compute. Calculate your 1-year RI ROI on your top 3 steady-state workloads.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 17</div>
    <div><div class="day-title">Spot / Preemptible instances — where to use them</div><div class="day-action">Spot instances are 70–90% cheaper but can be reclaimed. Ideal for: batch jobs, CI/CD agents, stateless workers, ML training. Do not use for: databases, stateful services, anything with &lt;2 min shutdown tolerance. Identify 3 workloads suitable for Spot in your estate.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 18</div>
    <div><div class="day-title">Storage — the forgotten cost centre</div><div class="day-action">Object storage grows silently. Audit: old snapshots, unattached volumes, log buckets with no lifecycle policy, multi-region replication you set up once and forgot. Storage waste is typically 15–25% of total bill for teams that haven't audited in &gt;6 months.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 19</div>
    <div><div class="day-title">The zombie resource audit</div><div class="day-action">Identify resources that exist but serve no active workload: unattached EBS volumes, stopped VMs with persistent disks, idle load balancers, test environments running 24/7. Build a list. Estimate weekly cost. This is fast money — most teams find 8–15% of their bill here.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 20</div>
    <div><div class="day-title">Licensing optimisation</div><div class="day-action">Are you running SQL Server or Windows on cloud VMs when you could use managed services? Are you paying for enterprise database features on workloads that need standard? Audit your 3 most expensive licensed software services and their utilisation.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 21</div>
    <div><div class="day-title">Week 3 reflection — your optimisation backlog</div><div class="day-action">Compile all findings from Days 15–20 into a prioritised backlog. Estimate savings for each item. Rank by: (savings × confidence) ÷ effort. The top 3 items are your next sprint's FinOps work.</div></div>
  </div>

  <div class="week-header" style="margin-top:24px">
    <div class="week-title">Week 4 — Operate: Build the Practice (Days 22–28)</div>
    <div class="week-sub">Team structure, culture, governance, KPIs, tooling</div>
  </div>

  <div class="day-card">
    <div class="day-num">Day 22</div>
    <div><div class="day-title">Building the FinOps function</div><div class="day-action">FinOps doesn't need a dedicated team to start — it needs a FinOps champion per squad. Define the champion role: 20% of time, owns cost reviews, escalates anomalies, drives tagging compliance. Identify your first two champions.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 23</div>
    <div><div class="day-title">FinOps KPIs — what actually matters</div><div class="day-action">Track: (1) tagging coverage %, (2) RI/SP commitment coverage %, (3) unit cost trend, (4) % of spend reviewed by engineering monthly, (5) time to detect anomaly. Set a 90-day target for each.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 24</div>
    <div><div class="day-title">Getting engineers to care about cost</div><div class="day-action">Engineers care about cost when they can see their team's spend, when cost is part of the definition of done, and when they have the authority to act on it. Design one change to your sprint process that introduces cost as a review criterion.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 25</div>
    <div><div class="day-title">Budget governance — alerts, escalations, guardrails</div><div class="day-action">Define: (1) who gets alerted at 80% of monthly budget, (2) who approves spend beyond budget, (3) what happens if a team consistently over-runs. Governance without process is just intention. Write it down and share it.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 26</div>
    <div><div class="day-title">Multi-cloud FinOps — if applicable</div><div class="day-action">If you run on 2+ clouds: use a cloud management platform (Apptio Cloudability, CloudHealth, etc.) for unified visibility. If single-cloud: use native tooling first — it's free and usually sufficient for Walk maturity.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 27</div>
    <div><div class="day-title">FinOps tooling — native vs third-party</div><div class="day-action">Native tools (AWS Cost Explorer, Azure Cost Management, GCP Cost Analysis) are free and sufficient for Crawl and most of Walk. Third-party tools add value at Run maturity when you need cross-cloud views and advanced forecasting. Don't buy tooling before you've exhausted native.</div></div>
  </div>
  <div class="day-card">
    <div class="day-num">Day 28</div>
    <div><div class="day-title">Week 4 reflection — your Operate capabilities</div><div class="day-action">Rate your Operate maturity 1–5 on: governance, culture, tooling, process, KPI tracking. Where is your biggest gap? This gap is your top priority for your 90-day plan.</div></div>
  </div>

  <div class="footer"><span>30 Days of FinOps · nthakur.com · © Naval Thakur</span><span>Page 4</span></div>
</div>

<!-- Page 5: Days 29-30 + KPIs -->
<div class="page">
  <div class="week-header">
    <div class="week-title">Days 29–30 — Assess &amp; Plan</div>
    <div class="week-sub">Self-assessment and your 90-day FinOps action plan</div>
  </div>

  <div class="day-card">
    <div class="day-num">Day 29</div>
    <div><div class="day-title">FinOps maturity self-assessment</div><div class="day-action">Score yourself 1–5 on each of the six capability areas below. Compare with your Day 2 baseline. Any area still below 3 is a priority for your 90-day plan. Any area at 4+ is a strength to protect and leverage.</div></div>
  </div>

  <h3 style="margin-top:16px">Self-Assessment: Score 1–5</h3>
  <div class="kpi-row"><span class="kpi-name">Cost visibility &amp; allocation</span><span class="kpi-target">Score: __ / 5</span></div>
  <div class="kpi-row"><span class="kpi-name">Tagging coverage and governance</span><span class="kpi-target">Score: __ / 5</span></div>
  <div class="kpi-row"><span class="kpi-name">Rightsizing and waste elimination</span><span class="kpi-target">Score: __ / 5</span></div>
  <div class="kpi-row"><span class="kpi-name">Commitment-based discounts (RI/SP)</span><span class="kpi-target">Score: __ / 5</span></div>
  <div class="kpi-row"><span class="kpi-name">Budget governance and alerts</span><span class="kpi-target">Score: __ / 5</span></div>
  <div class="kpi-row"><span class="kpi-name">FinOps culture &amp; engineering ownership</span><span class="kpi-target">Score: __ / 5</span></div>

  <div class="day-card" style="margin-top:20px">
    <div class="day-num">Day 30</div>
    <div><div class="day-title">Your 90-day FinOps action plan</div><div class="day-action">Using the template below, define your top 3 FinOps initiatives for the next quarter. For each: what, why, who owns it, what success looks like, what the 30/60/90-day milestones are.</div></div>
  </div>

  <h3 style="margin-top:16px">90-Day FinOps Plan Template</h3>
  <div class="callout callout-blue">
    <div class="callout-title">Days 1–30: Inform</div>
    <p style="font-size:11px; margin:0; color:#1e40af">Goal: __________ · Owner: __________ · Success metric: __________</p>
    <p style="font-size:11px; margin:4px 0 0; color:#1e40af">Key actions: __________ · __________ · __________</p>
  </div>
  <div class="callout callout-amber">
    <div class="callout-title" style="color:#92400e">Days 31–60: Optimize</div>
    <p style="font-size:11px; margin:0; color:#92400e">Goal: __________ · Owner: __________ · Success metric: __________</p>
    <p style="font-size:11px; margin:4px 0 0; color:#92400e">Key actions: __________ · __________ · __________</p>
  </div>
  <div class="callout callout-green">
    <div class="callout-title">Days 61–90: Operate</div>
    <p style="font-size:11px; margin:0; color:#166534">Goal: __________ · Owner: __________ · Success metric: __________</p>
    <p style="font-size:11px; margin:4px 0 0; color:#166534">Key actions: __________ · __________ · __________</p>
  </div>

  <h2>FinOps KPI Dashboard — Target Values</h2>
  <div class="kpi-row"><span class="kpi-name">Cloud tagging coverage</span><span class="kpi-target">Target: &gt;95% of resources</span></div>
  <div class="kpi-row"><span class="kpi-name">RI/SP commitment coverage</span><span class="kpi-target">Target: &gt;60% of on-demand compute</span></div>
  <div class="kpi-row"><span class="kpi-name">Unit cost trend</span><span class="kpi-target">Target: Flat or declining QoQ</span></div>
  <div class="kpi-row"><span class="kpi-name">Engineering cost review participation</span><span class="kpi-target">Target: 100% of teams, monthly</span></div>
  <div class="kpi-row"><span class="kpi-name">Time to detect cost anomaly</span><span class="kpi-target">Target: &lt;24 hours</span></div>
  <div class="kpi-row"><span class="kpi-name">Unused resource identification cycle</span><span class="kpi-target">Target: Weekly automated scan</span></div>

  <div style="margin-top:32px; padding:18px; background:#166534; border-radius:10px; color:white">
    <div style="font-size:10px; text-transform:uppercase; letter-spacing:2px; color:#86efac; font-weight:700; margin-bottom:6px">Take the FinOps Assessment</div>
    <div style="font-size:13px; font-weight:700; margin-bottom:6px">Know your exact maturity level</div>
    <div style="font-size:11px; color:#dcfce7">The free FinOps maturity assessment at nthakur.com/finops/assessment gives you a scored maturity report across all FinOps capabilities — and tells you exactly where to focus next.</div>
  </div>

  <div class="footer"><span>30 Days of FinOps · nthakur.com · © Naval Thakur 2026 · All rights reserved</span><span>Page 5</span></div>
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
      "headline": "30 Days of FinOps — Free Practitioner Challenge Guide",
      "description": "A 30-day daily challenge guide to building real cloud financial accountability. One action per day across the full FinOps lifecycle: Inform, Optimize, Operate.",
      "author": { "@type": "Person", "name": "Naval Thakur", "url": "https://nthakur.com/about" },
      "url": "https://nthakur.com/finops/30-day-guide",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nthakur.com" },
        { "@type": "ListItem", "position": 2, "name": "FinOps", "item": "https://nthakur.com/finops" },
        { "@type": "ListItem", "position": 3, "name": "30-Day Guide", "item": "https://nthakur.com/finops/30-day-guide" },
      ]
    }
  ]
};

const FinOps30DayGuide: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const form = new FormData();
      form.append('email', email);
      form.append('name', '30 Days of FinOps Download');
      form.append('topic', '30 Days of FinOps Guide Download');
      form.append('message', 'User requested 30 Days of FinOps Guide.');
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: form, mode: 'no-cors' });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <SEO
        title="30 Days of FinOps — Free Challenge Guide | Naval Thakur"
        description="A 30-day daily challenge guide to building real cloud financial accountability. One action per day across Inform, Optimize, and Operate. Free download — email gate."
        structuredData={SCHEMA}
      />

      {/* Hero */}
      <div className="relative bg-primary text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-primary to-green-900/30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-400/40 bg-green-400/10 text-green-300 text-sm font-bold mb-6">
                <Calendar size={14} /> Free 30-Day Challenge · PDF Guide
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">30 Days of FinOps</h1>
              <p className="text-xl text-slate-200 leading-relaxed mb-6">
                One action per day. 30 days to build real cloud financial accountability — from cost visibility to a functioning FinOps practice. No fluff. Just daily actions that compound.
              </p>
              <div className="space-y-2">
                {INCLUDES.slice(0, 4).map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 size={14} className="text-green-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Email gate */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-200/20">
              {status === 'success' ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Unlock className="w-7 h-7 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Guide unlocked</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Your 30-day guide is ready. Open it and save as PDF.</p>
                  <button
                    onClick={() => generateFinOps30DayPDF(email)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition-colors"
                  >
                    <Download size={16} /> Open &amp; Save PDF
                  </button>
                  <p className="text-xs text-slate-400 mt-3">Use "Save as PDF" in your browser's print dialog.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <Lock className="w-5 h-5 text-green-700 dark:text-green-400" />
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
                          className="w-full pl-9 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm disabled:opacity-50"
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
                      className="w-full flex items-center justify-center gap-2 py-3 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition-colors disabled:opacity-70"
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

      {/* Week breakdown */}
      <Section bg="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">30 days. 4 weeks. One practice built.</h2>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-10">Each week targets one phase of the FinOps lifecycle. By Day 30 you'll have a baseline, an optimisation backlog, and a 90-day plan.</p>
          <div className="space-y-4">
            {WEEKS.map(w => (
              <div key={w.week} className={`rounded-xl border p-5 ${w.color}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{w.days}</div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">{w.week}: {w.theme}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{w.desc}</p>
                  </div>
                  <Calendar size={20} className="text-slate-400 shrink-0 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* What's inside */}
      <Section bg="gray">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">What's in the guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INCLUDES.map(item => (
              <div key={item} className="flex items-start gap-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                <CheckCircle2 size={18} className="text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-primary rounded-2xl p-8 text-white">
            <BarChart3 className="w-10 h-10 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">Know your FinOps maturity level</h2>
            <p className="text-slate-200 mb-6">The free FinOps assessment gives you a scored report and tells you exactly where to focus.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/finops/assessment" className="inline-flex items-center gap-2 px-7 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-400 transition-colors">
                Take the FinOps Assessment <Target size={15} />
              </Link>
              <Link to="/finops" className="inline-flex items-center gap-2 px-7 py-3 border border-white/30 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">
                Explore FinOps <Layers size={15} />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default FinOps30DayGuide;
