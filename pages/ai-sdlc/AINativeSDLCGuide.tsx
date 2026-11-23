import React, { useMemo, useState } from 'react';
import PrivacyNote from '../../components/PrivacyNote';
import { Link } from 'react-router-dom';
import {
  Download, Mail, CheckCircle2, Loader2, AlertCircle, Lock, Unlock,
  Repeat, ArrowRight, ShieldCheck, Gauge, ClipboardCheck, Brain,
} from 'lucide-react';
import Section from '../../components/Section';
import SEO from '../../components/SEO';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx03K6mwLMtq6X5q8JIAHKQ4qSxCk9LEavNeO0IWo1jg9IxhzFoxvZM0DwKtgMegKDz1Q/exec';
const PAGE_URL = 'https://nthakur.com/ai-sdlc/field-guide';

// â”€â”€ Content (shared by the page and the PDF) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const PRINCIPLES = [
  { title: 'Move people to decisions, not keystrokes', body: 'When an agent writes most of the diff, line-by-line review stops scaling. Put human attention where judgement and accountability live: accepting intent, approving the plan, judging risk, authorising release.' },
  { title: 'Every stage leaves a file the next stage reads', body: 'Intent, spec, plan, change, review record, incident. Versioned next to the code, they are the hand-off between stages and the audit trail at the same time.' },
  { title: 'Plan before code', body: 'Ask the agent for a written plan (files, order, tests, risks) before it changes anything. Correcting a plan is cheap; correcting a finished diff is not.' },
  { title: 'Give the agent a way to check its own work', body: 'One command for build, one for tests, a screenshot for UI. Work that reaches a person should already have passed the checks a person would run first.' },
  { title: 'Advice needs an enforced backstop', body: 'Instructions make the right behaviour likely. Hooks, policy-as-code and permissions make the wrong behaviour impossible. Anything that must always hold needs both.' },
  { title: 'Agents act up to the production gate, never past it', body: 'Autonomy is tiered by environment. In dev the agent ships freely; in production it prepares the release and a named person authorises it.' },
  { title: 'Detection stays deterministic', body: 'SLO burn rates and control bands decide when something is wrong. The model is invoked to diagnose and propose, inside limits that config, not the model, sets.' },
];

const LEVELS = [
  { id: 'L1', name: 'Manual', desc: 'People do the work; AI is absent or ad hoc.' },
  { id: 'L2', name: 'Assisted', desc: 'Autocomplete and chat help individuals; nothing changes in the process.' },
  { id: 'L3', name: 'Augmented', desc: 'Agents do whole tasks; people still start and check every step.' },
  { id: 'L4', name: 'Orchestrated', desc: 'Artifacts, guardrails and gates are in place; agents run between them.' },
  { id: 'L5', name: 'Cognitive', desc: 'Production signals start the loop; people govern it from above.' },
];

interface Stage {
  name: string;
  shift: string;
  artifact: string;
  ai: string;
  human: string;
  advise: string;
  enforce: string;
  approve: string;
  metric: string;
  antiPattern: string;
  ladder: [string, string, string, string, string];
}

const STAGES: Stage[] = [
  {
    name: 'Plan',
    shift: 'Ideas stop waiting for someone to write them up.',
    artifact: 'intent.md: the problem, who it affects, the outcome wanted, constraints, open questions.',
    ai: 'Interviews the requester like an analyst would, then drafts the intent brief from their words, tickets or incident data.',
    human: 'The product owner corrects the brief and accepts or rejects it.',
    advise: 'An intent template the agent fills in.',
    enforce: 'CI checks every intent links a ticket or incident ID.',
    approve: 'Product owner acceptance, recorded as the merge.',
    metric: 'Idea to accepted intent (hours, not weeks); share of intents accepted.',
    antiPattern: 'AI-written requirement documents nobody reads. Length is not clarity.',
    ladder: ['Ideas live in meetings and email', 'Tickets with templates', 'AI drafts briefs on request', 'Intent files versioned in the repo, linked to tickets', 'Incidents and metrics draft intents for triage'],
  },
  {
    name: 'Design',
    shift: 'Requirements and design happen in one sitting, with policy applied while writing.',
    artifact: 'spec.md: behaviour, non-functional requirements, threat model, cost estimate, flagged concerns.',
    ai: 'Turns the accepted intent into a spec, applying your standards (security, API, UX, cost) and flagging where they conflict.',
    human: 'The product owner and architect resolve every flagged concern with its policy owner.',
    advise: 'Standards packaged as reusable agent instructions (skills).',
    enforce: 'A spec lint: no merge without threat-model and cost sections.',
    approve: 'Architecture sign-off for anything classed high risk.',
    metric: 'Intent to spec time; spec changes after build starts.',
    antiPattern: 'Specs with no non-functional requirements. Security and cost discovered at review.',
    ladder: ['Design in heads and whiteboards', 'Document templates and review boards', 'AI drafts the spec from the brief', 'Standards as machine-readable skills; spec beside the code', 'Spec generated on intent acceptance; conflicts flagged automatically'],
  },
  {
    name: 'Build',
    shift: 'Nothing is implemented without an accepted plan.',
    artifact: 'plan.md, the diff and its tests, plus a repo context file (CLAUDE.md, AGENTS.md or equivalent).',
    ai: 'Reads the codebase without changing it, proposes a plan, then implements it; several agents can run in parallel in isolated worktrees.',
    human: 'The engineer interrogates and approves the plan, then reviews outcomes instead of watching keystrokes.',
    advise: 'Repo context file: commands, conventions, the mistakes the agent keeps making.',
    enforce: 'Hooks block protected paths and secrets and run the formatter on every edit.',
    approve: 'Tech-lead approval of the plan for high-risk changes.',
    metric: 'Share of changes merged from the first pass; plan approval to merge time.',
    antiPattern: 'Prompt-and-pray: skipping the plan and reviewing a 2,000-line diff.',
    ladder: ['Hand-written code', 'Autocomplete copilots', 'Chat agents on tasks; plans in the PR description', 'Plan-first agents with repo context, hooks and parallel sessions', 'Agents implement accepted specs; people review plans and results'],
  },
  {
    name: 'Test',
    shift: 'Every session checks its own work before a person sees it.',
    artifact: 'Test and build output attached to the change; an eval suite for the agent configuration.',
    ai: 'Runs the checks in a loop and fixes its own failures; for bugs, writes the failing test first.',
    human: 'Defines "done" in terms a machine can check, and owns the eval suite.',
    advise: '"Run build, tests and lint before you say done, and paste the output."',
    enforce: 'Agents cannot edit tests during a fix; required checks in CI.',
    approve: 'Changes to agent instructions merge only if the eval pass rate holds.',
    metric: 'First-pass CI success for agent changes; defects that escape to production.',
    antiPattern: 'The agent "fixes" a failing test by weakening it.',
    ladder: ['Manual QA at the end', 'Unit tests in CI', 'Agent runs the tests before handing over', 'Test-first fixes, visual checks for UI, protected tests', 'Evals regression-test the agent setup; every incident becomes an eval'],
  },
  {
    name: 'Release',
    shift: 'Review runs in both directions and governance is enforced as the agent acts.',
    artifact: 'The pull request: review findings by severity, fixes, approvals, release authorisation.',
    ai: 'Reviews every PR in passes (bugs, security, compliance with spec and plan) and addresses comments on its own PRs.',
    human: 'Code owners judge intent and risk; a release manager authorises production.',
    advise: 'A review policy file: the passes, what counts as important, what to skip.',
    enforce: 'Branch protection; the agent identity can never approve its own work.',
    approve: 'A production gate that blocks deploys without a named authorisation.',
    metric: 'Time to first review; DORA lead time and change failure rate.',
    antiPattern: 'Rubber-stamping agent PRs because they look tidy.',
    ladder: ['Manual review and a weekly change board', 'Linters and SAST in CI', 'AI review comments on PRs', 'Layered agent review plus human review for risk; autonomy tiered by environment', 'Agent prepares releases end to end up to the gate; rollback rehearsed and agent-invokable'],
  },
  {
    name: 'Operate',
    shift: 'The loop closes: production findings come back as intent.',
    artifact: 'Incident record, lessons file, and a new intent.md for the fix.',
    ai: 'When a detector fires, diagnoses read-only, drafts the post-mortem and proposes the fix as an intent or a PR.',
    human: 'On-call triages the queue (fix now, schedule, dismiss) and approves runbook actions.',
    advise: 'Runbooks written as agent skills.',
    enforce: 'Deterministic detection (SLO burn, control bands); the agent is read-only by default.',
    approve: 'Only pre-approved runbooks, such as rollback, can run without a person.',
    metric: 'Breach to triaged finding; repeat incidents of the same class.',
    antiPattern: 'Letting the model decide what counts as an incident.',
    ladder: ['Users report outages', 'Alerts and dashboards', 'AI summarises alerts and logs', 'SLO breaches trigger agent diagnosis; findings land as intent', 'Closed loop with tiered autonomy; incidents feed the eval suite'],
  },
];

const CONTROL_LAYERS = [
  { name: 'Advise', what: 'Repo context files, skills, review policies, templates.', effect: 'Makes the right behaviour likely. Cheap to change, but nothing forces compliance.' },
  { name: 'Enforce', what: 'Hooks, policy-as-code, permissions, sandboxed network and credentials, branch protection.', effect: 'Makes the wrong behaviour impossible. Deterministic, logged, the same for everyone.' },
  { name: 'Approve', what: 'Named people at the decisions that need judgement: intent, high-risk plans, production release.', effect: 'Keeps accountability human. Use sparingly so people are not back on the critical path.' },
];

const METRICS = [
  ['Idea to accepted intent', 'Plan', 'Git timestamps on intent files'],
  ['Spec rework after build starts', 'Design', 'Spec commits after the first plan commit'],
  ['First-pass merge rate', 'Build', 'PR history'],
  ['First-pass CI success (agent PRs)', 'Test', 'CI system'],
  ['Time to first review', 'Release', 'PR metadata'],
  ['Lead time, deploy frequency, change failure, recovery (DORA)', 'Release / Operate', 'CI/CD and incident tracker'],
  ['Breach to triaged finding', 'Operate', 'Detector log and triage queue'],
  ['Repeat incidents of the same class', 'Operate', 'Incident tracker'],
];

const READINESS = [
  'Our top repositories have a context file that agents read (commands, conventions, known pitfalls).',
  'Build, test and lint each run with one command that fails loudly.',
  'Engineers ask agents for a written plan before letting them change code.',
  'Requests reach engineering as a written brief with outcome, constraints and open questions.',
  'Our security, API and cost standards are written down where an agent can apply them.',
  'Something deterministic blocks secrets, protected paths and test edits, whoever is typing.',
  'Every PR gets an automated first-pass review before a person looks at it.',
  'Agents have their own identity and cannot approve or merge their own work.',
  'Production deploys need a named human authorisation that tooling enforces.',
  'Rollback is one command, rehearsed regularly in staging.',
  'We alert on SLOs or control bands, not on raw thresholds someone guessed.',
  'We track DORA metrics and at least one AI-specific measure (e.g. first-pass merge rate).',
];

const ANSWERS = [
  { label: 'Yes', score: 2 },
  { label: 'Partly', score: 1 },
  { label: 'No', score: 0 },
];

function readinessBand(score: number): { level: string; text: string } {
  if (score >= 21) return { level: 'L4â€“L5 Â· Orchestrated', text: 'The foundations are in place. Your next step is closing the loop: let production signals start work, inside tiered autonomy.' };
  if (score >= 15) return { level: 'L3â€“L4 Â· Augmented', text: 'Agents are doing real work. Invest in enforced guardrails and gates so you can safely stop watching every step.' };
  if (score >= 8) return { level: 'L2â€“L3 Â· Assisted', text: 'Individuals are faster, but the process has not changed. Start with repo context files, plan-first and one-command tests.' };
  return { level: 'L1â€“L2 Â· Manual', text: 'Start small: one repo, one context file, one agent-reviewed PR a day. Measure before and after.' };
}

const NINETY_DAYS = [
  { days: 'Days 1â€“30 Â· Foundations', items: ['Context files in your three busiest repos', 'One command each for build, test, lint', 'Plan-first as a team norm', 'Automated first-pass review on one repo', 'Baseline DORA plus first-pass merge rate'] },
  { days: 'Days 31â€“60 Â· Guardrails', items: ['Intent and spec templates; standards written as skills', 'Hooks for secrets, protected paths and test edits', 'Agent identity, branch protection, no self-approval', 'Review policy file with severity and a nit cap'] },
  { days: 'Days 61â€“90 Â· Close one loop', items: ['Eval suite for the agent setup, run on every config change', 'Autonomy tiered by environment; production gate enforced', 'One deterministic detector (e.g. CI failure rate) that triggers diagnosis', 'Report the before/after numbers to leadership'] },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'The AI-Native SDLC Field Guide â€” Free PDF',
      description: 'How to run the software lifecycle with AI agents: a 5-level maturity model across Plan, Design, Build, Test, Release and Operate, a three-layer control model, metrics and a 90-day plan.',
      author: { '@type': 'Person', name: 'Naval Thakur', url: 'https://nthakur.com/about' },
      url: PAGE_URL,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nthakur.com' },
        { '@type': 'ListItem', position: 2, name: 'AI in SDLC', item: 'https://nthakur.com/ai-sdlc' },
        { '@type': 'ListItem', position: 3, name: 'AI-Native SDLC Field Guide', item: PAGE_URL },
      ],
    },
  ],
};

// â”€â”€ PDF â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function stageBlock(s: Stage, i: number): string {
  return `
  <div class="stage">
    <div class="stage-head"><span class="stage-num">0${i + 1}</span> ${esc(s.name)} <span class="stage-shift">${esc(s.shift)}</span></div>
    <table class="kv">
      <tr><th>Artifact</th><td>${esc(s.artifact)}</td></tr>
      <tr><th>What the agent does</th><td>${esc(s.ai)}</td></tr>
      <tr><th>Where people decide</th><td>${esc(s.human)}</td></tr>
      <tr><th>Advise</th><td>${esc(s.advise)}</td></tr>
      <tr><th>Enforce</th><td>${esc(s.enforce)}</td></tr>
      <tr><th>Approve</th><td>${esc(s.approve)}</td></tr>
      <tr><th>Measure</th><td>${esc(s.metric)}</td></tr>
      <tr><th>Watch out for</th><td>${esc(s.antiPattern)}</td></tr>
    </table>
  </div>`;
}

const footer = (n: number) => `<div class="footer"><span>The AI-Native SDLC Field Guide Â· nthakur.com Â· Â© Naval Thakur 2026</span><span>Page ${n}</span></div>`;

function generateFieldGuidePDF(email: string) {
  const win = window.open('', '_blank');
  if (!win) return;
  const ladderRows = STAGES.map(s => `<tr><td class="ladder-stage">${esc(s.name)}</td>${s.ladder.map((c, i) => `<td class="lv${i + 1}">${esc(c)}</td>`).join('')}</tr>`).join('');
  win.document.write(`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>The AI-Native SDLC Field Guide â€” Naval Thakur</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; font-size: 11.5px; line-height: 1.55; }
  .page { padding: 44px 52px; page-break-after: always; }
  .cover { background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #1d4ed8 100%); color: #fff; min-height: 100vh; padding: 80px 64px; display: flex; flex-direction: column; justify-content: center; page-break-after: always; }
  .tag { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #bfdbfe; font-weight: 700; margin-bottom: 22px; }
  .cover h1 { font-size: 50px; line-height: 1.05; font-weight: 800; margin-bottom: 18px; }
  .cover p { font-size: 17px; color: #dbeafe; max-width: 500px; }
  .rule { width: 60px; height: 4px; background: #93c5fd; margin: 40px 0; }
  .by { font-size: 13px; color: #bfdbfe; } .by strong { color: #eff6ff; }
  h2 { font-size: 24px; color: #1d4ed8; font-weight: 800; margin-bottom: 8px; }
  h3 { font-size: 14px; color: #0f172a; margin: 16px 0 6px; }
  p { color: #475569; margin-bottom: 9px; }
  .principle { border-left: 3px solid #3b82f6; padding: 6px 12px; margin: 8px 0; background: #eff6ff; }
  .principle b { color: #0f172a; display: block; margin-bottom: 2px; }
  .loop { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; margin: 12px 0 16px; }
  .chip { background: #1d4ed8; color: #fff; border-radius: 14px; padding: 4px 11px; font-size: 11px; font-weight: 700; }
  .arrow { color: #3b82f6; font-weight: 700; }
  .layers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 10px 0; }
  .layer { border: 1px solid #bfdbfe; border-radius: 8px; padding: 10px; }
  .layer b { color: #1d4ed8; font-size: 13px; }
  .stage { margin: 12px 0 18px; page-break-inside: avoid; }
  .stage-head { background: #0f172a; color: #fff; padding: 8px 12px; border-radius: 8px 8px 0 0; font-weight: 800; font-size: 13px; }
  .stage-num { color: #93c5fd; margin-right: 6px; }
  .stage-shift { font-weight: 400; color: #bfdbfe; font-size: 11px; margin-left: 8px; }
  table { width: 100%; border-collapse: collapse; }
  .kv th { text-align: left; width: 26%; background: #f1f5f9; color: #334155; font-size: 10.5px; padding: 5px 9px; border: 1px solid #e2e8f0; vertical-align: top; }
  .kv td { padding: 5px 9px; border: 1px solid #e2e8f0; color: #475569; font-size: 10.5px; }
  .ladder th { background: #0f172a; color: #fff; padding: 6px; font-size: 10px; text-align: left; }
  .ladder td { padding: 6px; border: 1px solid #e2e8f0; font-size: 9.5px; color: #475569; vertical-align: top; }
  .ladder-stage { font-weight: 800; color: #0f172a !important; background: #f8fafc; }
  .lv2 { background: #f0f9ff; } .lv3 { background: #f0fdf4; } .lv4 { background: #faf5ff; } .lv5 { background: #eff6ff; }
  .data th { background: #1d4ed8; color: #fff; padding: 6px 8px; font-size: 10.5px; text-align: left; }
  .data td { padding: 6px 8px; border-bottom: 1px solid #e2e8f0; font-size: 10.5px; color: #475569; }
  .check td { padding: 6px 8px; border-bottom: 1px solid #e2e8f0; font-size: 10.5px; color: #334155; }
  .box { width: 46px; text-align: center; color: #94a3b8; }
  .plan { border: 1px solid #bfdbfe; border-radius: 8px; padding: 10px 12px; margin: 8px 0; }
  .plan b { color: #1d4ed8; }
  ul { padding-left: 16px; } li { color: #475569; margin: 3px 0; font-size: 10.5px; }
  .cta { margin-top: 22px; background: #0f172a; color: #fff; border-radius: 10px; padding: 16px; }
  .cta small { color: #93c5fd; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; font-size: 9.5px; }
  .footer { margin-top: 26px; padding-top: 10px; border-top: 1px solid #e2e8f0; font-size: 9.5px; color: #94a3b8; display: flex; justify-content: space-between; }
</style></head><body>

<div class="cover">
  <div class="tag">Field guide Â· AI in the SDLC</div>
  <h1>The AI-Native<br>SDLC Field Guide</h1>
  <p>How to run Plan, Design, Build, Test, Release and Operate with AI agents, without losing control, quality or accountability.</p>
  <div class="rule"></div>
  <div class="by">By <strong>Naval Thakur</strong> Â· nthakur.com</div>
  <div class="by" style="margin-top:8px">Prepared for: <strong>${esc(email)}</strong></div>
</div>

<div class="page">
  <h2>Code is cheap now. Decisions are not.</h2>
  <p>Agents can turn a clear plan into working, tested code in hours. Most organisations have not changed anything around that step: requirements still pass through workshops, reviews still assume a person wrote every line, and change boards still meet weekly. The constraint has moved from writing code to deciding, reviewing and releasing it.</p>
  <p>An AI-native SDLC keeps the control objectives you already have (traceability, separation of duties, quality gates) and changes how they are enforced. The line becomes a loop, and each stage hands the next a file it can act on:</p>
  <div class="loop">
    <span class="chip">intent.md</span><span class="arrow">â†’</span><span class="chip">spec.md</span><span class="arrow">â†’</span><span class="chip">plan.md</span><span class="arrow">â†’</span><span class="chip">change + tests</span><span class="arrow">â†’</span><span class="chip">PR record</span><span class="arrow">â†’</span><span class="chip">incident</span><span class="arrow">â†º</span>
  </div>
  <h3>Seven principles</h3>
  ${PRINCIPLES.map((p, i) => `<div class="principle"><b>${i + 1}. ${esc(p.title)}</b>${esc(p.body)}</div>`).join('')}
  ${footer(2)}
</div>

<div class="page">
  <h2>The control model: advise, enforce, approve</h2>
  <p>Every control you put around an agent is one of three kinds. Most failed rollouts rely on the first alone.</p>
  <div class="layers">${CONTROL_LAYERS.map(l => `<div class="layer"><b>${esc(l.name)}</b><p style="margin:6px 0 4px">${esc(l.what)}</p><p style="margin:0;font-size:10.5px">${esc(l.effect)}</p></div>`).join('')}</div>
  <h3>The maturity ladder</h3>
  <p>Five levels, aligned with the CognitiveOps Model. Most teams sit at different levels in different stages; score each stage separately.</p>
  <table class="data"><tr><th>Level</th><th>Name</th><th>What it looks like</th></tr>${LEVELS.map(l => `<tr><td><b>${l.id}</b></td><td>${esc(l.name)}</td><td>${esc(l.desc)}</td></tr>`).join('')}</table>
  <h3>Stage by level</h3>
  <table class="ladder"><tr><th>Stage</th>${LEVELS.map(l => `<th>${l.id} ${esc(l.name)}</th>`).join('')}</tr>${ladderRows}</table>
  ${footer(3)}
</div>

<div class="page">
  <h2>The six stages</h2>
  <p>For each stage: the artifact it commits, what the agent does, where people decide, the controls at each layer, how to measure it, and the trap to avoid.</p>
  ${STAGES.slice(0, 3).map((s, i) => stageBlock(s, i)).join('')}
  ${footer(4)}
</div>

<div class="page">
  ${STAGES.slice(3).map((s, i) => stageBlock(s, i + 3)).join('')}
  ${footer(5)}
</div>

<div class="page">
  <h2>Measure it</h2>
  <p>Keep DORA as the outcome measure. Add a few leading indicators that show whether the AI-native practices are working. Almost all of them come from systems you already have.</p>
  <table class="data"><tr><th>Measure</th><th>Stage</th><th>Where the data is</th></tr>${METRICS.map(m => `<tr><td>${esc(m[0])}</td><td>${esc(m[1])}</td><td>${esc(m[2])}</td></tr>`).join('')}</table>
  <h3>For regulated organisations</h3>
  <ul>
    <li><b>Audit trail:</b> the chain of committed artifacts plus PR history and agent session logs answers who asked for what, what the agent produced and who approved it.</li>
    <li><b>Separation of duties:</b> the agent that wrote a change can never approve it; branch protection enforces a human code owner.</li>
    <li><b>Data classification first:</b> decide per repository what agents may read, which networks they may reach and which credentials they never see. Enforce it centrally, where individual engineers cannot switch it off.</li>
    <li><b>Systems of record:</b> if Jira, ServiceNow or a requirements tool is the record auditors accept, keep it, and link each artifact to its record ID (and the record to the commit). Decide one source of truth per artifact.</li>
  </ul>
  <h3>Readiness check</h3>
  <p>Score 2 for yes, 1 for partly, 0 for no. 21+ â‰ˆ L4â€“L5 Â· 15â€“20 â‰ˆ L3â€“L4 Â· 8â€“14 â‰ˆ L2â€“L3 Â· under 8 â‰ˆ L1â€“L2.</p>
  <table class="check">${READINESS.map((q, i) => `<tr><td>${i + 1}. ${esc(q)}</td><td class="box">â˜ 2</td><td class="box">â˜ 1</td><td class="box">â˜ 0</td></tr>`).join('')}</table>
  ${footer(6)}
</div>

<div class="page">
  <h2>Your first 90 days</h2>
  <p>Pick one product team and three repositories. Measure before you start; the numbers are what earn the next investment.</p>
  ${NINETY_DAYS.map(p => `<div class="plan"><b>${esc(p.days)}</b><ul>${p.items.map(it => `<li>${esc(it)}</li>`).join('')}</ul></div>`).join('')}
  <h3>Common traps</h3>
  <ul>${STAGES.map(s => `<li><b>${esc(s.name)}:</b> ${esc(s.antiPattern)}</li>`).join('')}</ul>
  <h3>Further reading</h3>
  <ul>
    <li>Louis Claxton, <i>The AI-Native SDLC Playbook</i> (Anthropic, 2026): stage-by-stage plays for adopting Claude Code across the SDLC, which inspired this guide.</li>
    <li>DORA, <i>Accelerate State of DevOps</i> reports: the delivery metrics used throughout.</li>
    <li>Naval Thakur, <i>The CognitiveOps Model</i>: nthakur.com/cognitiveops.</li>
  </ul>
  <div class="cta"><small>Next step</small><div style="font-size:13px;font-weight:700;margin:6px 0">Score your organisation for real</div><div style="font-size:11px;color:#dbeafe">Take the free GenAI Readiness and CognitiveOps Maturity assessments at nthakur.com/assessments, or book a session at nthakur.com/work-with-me.</div></div>
  ${footer(7)}
</div>

</body></html>`);
  win.document.close();
  // Print from this page: the new window inherits the site CSP, which blocks inline scripts.
  win.focus();
  setTimeout(() => win.print(), 400);
}

// â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const AINativeSDLCGuide: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [answers, setAnswers] = useState<(number | null)[]>(() => READINESS.map(() => null));
  const answered = answers.filter(a => a !== null).length;
  const score = useMemo(() => answers.reduce<number>((t, a) => t + (a ?? 0), 0), [answers]);
  const band = readinessBand(score);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const form = new FormData();
      form.append('email', email);
      form.append('name', 'AI-Native SDLC Field Guide Download');
      form.append('topic', 'AI-Native SDLC Field Guide PDF Download');
      form.append('message', `User requested the AI-Native SDLC Field Guide.${answered === READINESS.length ? ` Readiness score: ${score}/24 (${band.level}).` : ''}`);
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: form, mode: 'no-cors' });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <SEO
        title="The AI-Native SDLC Field Guide â€” Free PDF | Naval Thakur"
        description="Run Plan, Design, Build, Test, Release and Operate with AI agents without losing control: a 5-level maturity ladder, the advise-enforce-approve control model, metrics and a 90-day plan. Free PDF."
        structuredData={SCHEMA}
      />

      {/* Hero + gate */}
      <div className="relative bg-primary text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900/30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-400/40 bg-blue-400/10 text-blue-300 text-sm font-bold mb-6">
                <Repeat size={14} /> Free PDF Â· Field Guide
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">The AI-Native SDLC Field Guide</h1>
              <p className="text-xl text-slate-200 leading-relaxed mb-6">
                Code is cheap now. Decisions are not. A practical guide to running the whole software lifecycle with AI agents, and keeping control, quality and accountability while you do it.
              </p>
              <div className="space-y-2">
                {['5-level maturity ladder across all six SDLC stages', 'The advise Â· enforce Â· approve control model', 'Per-stage artifacts, controls, metrics and traps', 'Readiness checklist and a 90-day adoption plan'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 size={14} className="text-blue-400 shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-200/20">
              {status === 'success' ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Unlock className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Field guide unlocked</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Your 7-page guide is ready. Open it and save as PDF.</p>
                  <button onClick={() => generateFieldGuidePDF(email)} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors">
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
                      <h3 className="font-bold text-slate-900 dark:text-white">Get the free field guide</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Enter your email to unlock instant access</p>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="guide-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Work email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                          id="guide-email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
                          placeholder="you@company.com" disabled={status === 'submitting'}
                          className="w-full pl-9 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:opacity-50"
                        />
                      </div>
                      {status === 'error' && (
                        <div className="flex items-center gap-1 mt-2 text-red-600 dark:text-red-400 text-xs">
                          <AlertCircle size={12} /> Something went wrong. Please try again.
                        </div>
                      )}
                    </div>
                    <button type="submit" disabled={status === 'submitting'} className="w-full flex items-center justify-center gap-2 py-3 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors disabled:opacity-70">
                      {status === 'submitting' ? <><Loader2 className="animate-spin" size={16} /> Unlockingâ€¦</> : <><Download size={16} /> Download the Field Guide</>}
                    </button>
                  </form>
<PrivacyNote />
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 text-center">No spam. Unsubscribe from The CognitiveOps Brief anytime.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* The shift */}
      <Section bg="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 text-center">The bottleneck moved</h2>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-8 max-w-3xl mx-auto">
            Agents turn a clear plan into tested code in hours. The steps around them (requirements, review, release) still run at meeting speed. An AI-native SDLC keeps your control objectives and changes how they are enforced: each stage hands the next a file it can act on.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {['intent.md', 'spec.md', 'plan.md', 'change + tests', 'PR record', 'incident'].map((a, i, arr) => (
              <React.Fragment key={a}>
                <span className="px-3 py-1.5 rounded-full bg-blue-700 text-white text-xs font-bold font-mono">{a}</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">{i < arr.length - 1 ? 'â†’' : 'â†º'}</span>
              </React.Fragment>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} className="rounded-xl border border-slate-200 dark:border-slate-700 p-5 bg-slate-50 dark:bg-slate-800/50">
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{i + 1}. {p.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Control model */}
      <Section bg="gray">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 text-center flex items-center justify-center gap-2"><ShieldCheck className="text-blue-600 dark:text-blue-400" /> Advise Â· Enforce Â· Approve</h2>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-8">Every control around an agent is one of three kinds. Most failed rollouts rely on the first alone.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CONTROL_LAYERS.map(l => (
              <div key={l.name} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
                <h3 className="font-bold text-blue-700 dark:text-blue-400 text-lg mb-2">{l.name}</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">{l.what}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{l.effect}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Stages */}
      <Section bg="white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 text-center">Six stages, one loop</h2>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-8">The PDF covers each stage in full: artifact, agent role, human decision, controls, metric and the trap to avoid.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STAGES.map((s, i) => (
              <div key={s.name} className="rounded-xl border border-slate-200 dark:border-slate-700 p-5">
                <div className="text-xs font-black text-blue-600 dark:text-blue-400 mb-1">0{i + 1}</div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{s.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{s.shift}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400"><span className="font-semibold text-slate-700 dark:text-slate-300">Artifact: </span>{s.artifact}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Readiness check */}
      <Section bg="gray">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 text-center flex items-center justify-center gap-2"><Gauge className="text-blue-600 dark:text-blue-400" /> Two-minute readiness check</h2>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-8">Answer for your organisation, not your best team.</p>
          <ol className="space-y-3">
            {READINESS.map((q, i) => (
              <li key={q} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                <fieldset>
                  <legend className="text-sm text-slate-800 dark:text-slate-200 mb-3"><span className="font-bold text-blue-700 dark:text-blue-400 mr-1">{i + 1}.</span>{q}</legend>
                  <div className="flex gap-2">
                    {ANSWERS.map(a => {
                      const selected = answers[i] === a.score;
                      return (
                        <label key={a.label} className={`cursor-pointer px-4 py-1.5 rounded-lg border text-sm font-medium transition-colors ${selected ? 'bg-blue-700 border-blue-700 text-white' : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-blue-500'}`}>
                          <input type="radio" name={`q${i}`} className="sr-only" checked={selected} onChange={() => setAnswers(prev => prev.map((v, j) => (j === i ? a.score : v)))} />
                          {a.label}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              </li>
            ))}
          </ol>
          <div className="mt-6 rounded-2xl bg-primary text-white p-6" aria-live="polite">
            {answered < READINESS.length ? (
              <p className="text-sm text-slate-300"><ClipboardCheck className="inline mr-2" size={16} />{answered} of {READINESS.length} answered. Your result appears when you finish.</p>
            ) : (
              <>
                <div className="text-xs uppercase tracking-widest text-blue-300 font-bold mb-1">Your score: {score} / 24</div>
                <div className="text-2xl font-bold mb-2">{band.level}</div>
                <p className="text-slate-200 text-sm">{band.text}</p>
              </>
            )}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-primary rounded-2xl p-8 text-white">
            <Brain className="w-10 h-10 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">Go deeper than the checklist</h2>
            <p className="text-slate-200 mb-6">The GenAI Readiness and CognitiveOps Maturity assessments score you across every domain and give you a prioritised plan.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/genai/assessment" className="inline-flex items-center gap-2 px-7 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400 transition-colors">
                GenAI Readiness Assessment <ArrowRight size={15} />
              </Link>
              <Link to="/cognitiveops/assessment" className="inline-flex items-center gap-2 px-7 py-3 border border-white/30 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">
                CognitiveOps Assessment <ArrowRight size={15} />
              </Link>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-6">
            Inspired in part by <em>The AI-Native SDLC Playbook</em> by Louis Claxton (Anthropic, 2026). The maturity ladder, control model and checklist are the author's own.
          </p>
        </div>
      </Section>
    </>
  );
};

export default AINativeSDLCGuide;
