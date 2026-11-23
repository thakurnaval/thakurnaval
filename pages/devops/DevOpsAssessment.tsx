import React, { useState } from 'react';
import { trackLead, trackDownload } from '../../src/services/analytics';
import PrivacyNote from '../../components/PrivacyNote';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowLeft, Download, Mail, Loader2, CheckCircle2,
  GitBranch, Server, Activity, Users, AlertCircle, BarChart3,
} from 'lucide-react';
import Section from '../../components/Section';
import SEO from '../../components/SEO';
import { PillarPlans, pillarPlansHTML } from '../../components/PillarPlans';
import { DEVOPS_PLANS } from './devopsPlans';

interface Option { label: string; value: number; }
interface Question { q: string; options: Option[]; }
interface PillarDef {
  key: string;
  icon: React.ElementType;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  questions: Question[];
}
type Answers = Record<string, number>;

const PILLARS: PillarDef[] = [
  {
    key: 'Delivery Pipeline',
    icon: GitBranch,
    colorClass: 'text-blue-600 dark:text-blue-400',
    bgClass: 'bg-blue-50 dark:bg-blue-900/20',
    borderClass: 'border-blue-300 dark:border-blue-700',
    questions: [
      {
        q: 'How often does your team deploy to production?',
        options: [
          { label: 'Monthly or less — deployments are planned events with change windows', value: 1 },
          { label: 'Weekly — structured releases with manual approval gates', value: 2 },
          { label: 'Daily or on-demand — automated CI/CD, any engineer can deploy', value: 3 },
          { label: 'Multiple times per day — trunk-based development, deployment is routine', value: 4 },
        ],
      },
      {
        q: 'How automated is your build and test pipeline?',
        options: [
          { label: 'Manual — builds triggered and verified by hand', value: 1 },
          { label: 'Partially automated — CI runs but tests are patchy or frequently flaky', value: 2 },
          { label: 'Fully automated — build, test, and quality gates run on every commit', value: 3 },
          { label: 'Optimised — parallel execution, incremental builds; feedback under 5 minutes', value: 4 },
        ],
      },
      {
        q: 'How is your change failure rate managed?',
        options: [
          { label: 'Unknown — we find out about failures from customers or downstream teams', value: 1 },
          { label: 'Tracked — post-incident reviews happen but there is no systematic prevention', value: 2 },
          { label: 'Gated — quality and security gates in the pipeline prevent high-risk merges', value: 3 },
          { label: 'Predictive — historical patterns flag risky changes before they reach main', value: 4 },
        ],
      },
      {
        q: 'How long does it take to restore service after a deployment failure?',
        options: [
          { label: 'Hours to days — rollback is manual and requires tribal knowledge', value: 1 },
          { label: 'Under an hour — an automated rollback or hotfix process exists', value: 2 },
          { label: 'Under 15 minutes — automated rollback triggers on SLO breach', value: 3 },
          { label: 'Near-instant — blue/green or canary deployments make rollback a traffic switch', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'Infrastructure & Platform',
    icon: Server,
    colorClass: 'text-violet-600 dark:text-violet-400',
    bgClass: 'bg-violet-50 dark:bg-violet-900/20',
    borderClass: 'border-violet-300 dark:border-violet-700',
    questions: [
      {
        q: 'How is your infrastructure managed?',
        options: [
          { label: 'Manually — consoles, runbooks, and support tickets', value: 1 },
          { label: 'Partially — scripts exist but configuration drift is common', value: 2 },
          { label: 'Fully as code — Terraform/Pulumi/Bicep, drift detection in place', value: 3 },
          { label: 'Policy-driven — desired state enforced automatically; humans define policy not resources', value: 4 },
        ],
      },
      {
        q: 'How self-service is your developer platform?',
        options: [
          { label: 'Ticket-based — developers raise requests to get environments and access', value: 1 },
          { label: 'Partial — standard environments available; custom requests still need ops', value: 2 },
          { label: 'Self-service — developers provision and configure their own environments via portal or CLI', value: 3 },
          { label: 'Platform-as-a-product — an IDP team owns a catalogue that teams adopt and contribute to', value: 4 },
        ],
      },
      {
        q: 'How are configuration and secrets managed?',
        options: [
          { label: 'Hardcoded in code or stored in shared spreadsheets', value: 1 },
          { label: 'Centralised config store — environment variables, some vault usage', value: 2 },
          { label: 'Secrets manager in use — no secrets in code, rotation is automated', value: 3 },
          { label: 'Zero-trust — short-lived credentials, just-in-time access, all access audited', value: 4 },
        ],
      },
      {
        q: 'How is environment parity maintained between dev, staging, and production?',
        options: [
          { label: 'Significant drift — "works on my machine" is a common phrase', value: 1 },
          { label: 'Best-effort — teams try to keep environments aligned but drift occurs', value: 2 },
          { label: 'IaC-driven — all environments built from the same code with per-env config', value: 3 },
          { label: 'Ephemeral — every PR gets a disposable, production-equivalent environment', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'Observability & Reliability',
    icon: Activity,
    colorClass: 'text-emerald-600 dark:text-emerald-400',
    bgClass: 'bg-emerald-50 dark:bg-emerald-900/20',
    borderClass: 'border-emerald-300 dark:border-emerald-700',
    questions: [
      {
        q: 'How mature is your observability?',
        options: [
          { label: 'Basic logging — we find out about problems from users', value: 1 },
          { label: 'Metrics and dashboards — SLOs defined, alerting is reactive', value: 2 },
          { label: 'Distributed tracing — error budget burn rates tracked, automated escalation', value: 3 },
          { label: 'Predictive — ML detects leading indicators of degradation before SLOs are breached', value: 4 },
        ],
      },
      {
        q: 'How does your team respond to production incidents?',
        options: [
          { label: 'Heroics — whoever knows the system is called, tribal knowledge required', value: 1 },
          { label: 'Runbooks — documented response procedures, manually executed', value: 2 },
          { label: 'Automated runbooks — known patterns trigger automated remediation steps', value: 3 },
          { label: 'Autonomous — defined classes of incidents are resolved without human intervention', value: 4 },
        ],
      },
      {
        q: 'How are SLOs defined and enforced?',
        options: [
          { label: 'Not defined — uptime is monitored but no formal SLOs exist', value: 1 },
          { label: 'Defined — SLOs exist but are rarely reviewed or actioned', value: 2 },
          { label: 'Enforced — error budget burn rate drives prioritisation decisions in planning', value: 3 },
          { label: 'Business-aligned — SLOs are tied to user journeys and business outcomes', value: 4 },
        ],
      },
      {
        q: 'How is on-call structured?',
        options: [
          { label: 'Ad hoc — whoever is available responds', value: 1 },
          { label: 'Rostered — formal on-call rotation, runbooks are inconsistent', value: 2 },
          { label: 'SRE practice — on-call paired with error budgets and blameless post-mortems', value: 3 },
          { label: 'Continuous improvement — on-call burden metrics drive platform investment decisions', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'Culture & Collaboration',
    icon: Users,
    colorClass: 'text-amber-600 dark:text-amber-400',
    bgClass: 'bg-amber-50 dark:bg-amber-900/20',
    borderClass: 'border-amber-300 dark:border-amber-700',
    questions: [
      {
        q: 'How does your organisation handle post-incident reviews?',
        options: [
          { label: 'Blame — root cause is assigned to a person or team', value: 1 },
          { label: 'Reviews happen — but inconsistently and vary in quality', value: 2 },
          { label: 'Blameless — structured post-mortems, findings tracked, action items owned', value: 3 },
          { label: 'Learning system — findings feed back into platform investment and prevention priorities', value: 4 },
        ],
      },
      {
        q: 'How are development and operations teams structured?',
        options: [
          { label: 'Siloed — Dev throws releases over the wall to Ops', value: 1 },
          { label: 'Collaborative — Dev and Ops work together but are separate teams', value: 2 },
          { label: 'Embedded SRE — SREs work within product teams, production ownership is shared', value: 3 },
          { label: 'You-build-it-you-run-it — product teams own the full lifecycle from dev to production', value: 4 },
        ],
      },
      {
        q: 'How is technical debt managed?',
        options: [
          { label: 'Ignored until it causes an incident', value: 1 },
          { label: 'Tracked — a tech debt backlog exists but is rarely prioritised', value: 2 },
          { label: 'Allocated — tech debt has a dedicated capacity allocation in sprint planning', value: 3 },
          { label: 'Investment-driven — debt reduction is tracked as a business metric with measurable outcomes', value: 4 },
        ],
      },
      {
        q: 'How does engineering knowledge spread across your organisation?',
        options: [
          { label: 'Ad hoc — knowledge lives in individuals; no systematic sharing', value: 1 },
          { label: 'Documented — wikis and runbooks exist but are inconsistently maintained', value: 2 },
          { label: 'Active — communities of practice, brown bags, internal tech blog', value: 3 },
          { label: 'Platform-encoded — best practices are golden paths and templates in the developer platform', value: 4 },
        ],
      },
    ],
  },
];

const NUM_PILLARS = PILLARS.length;
const EMAIL_STEP = NUM_PILLARS + 1;
const RESULTS_STEP = NUM_PILLARS + 2;

const LAYER_NAMES: Record<number, string> = { 1: 'Reactive', 2: 'Repeatable', 3: 'Accelerating', 4: 'Elite' };

const LAYER_META: Record<number, { label: string; description: string; color: string; bg: string; }> = {
  1: {
    label: 'Layer 1 — Reactive',
    description: 'Deployments are manual events, incidents are resolved by heroics, and infrastructure is managed by hand. The highest-leverage move is establishing a CI/CD pipeline and treating infrastructure as code — these two foundations unlock everything above.',
    color: 'text-slate-700 dark:text-slate-200',
    bg: 'bg-slate-100 dark:bg-slate-700',
  },
  2: {
    label: 'Layer 2 — Repeatable',
    description: 'You have the automation foundation that most enterprises are still building. Pipelines run, runbooks exist, and infrastructure is partially codified. The next step is consistency: trunk-based development, self-service platforms, and SLO-driven operations.',
    color: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-100 dark:bg-blue-900/40',
  },
  3: {
    label: 'Layer 3 — Accelerating',
    description: 'You are operating above industry average. Deployments are frequent, incidents are detected early, and engineers own production. The frontier is self-service platforms, ephemeral environments, and predictive observability.',
    color: 'text-emerald-700 dark:text-emerald-300',
    bg: 'bg-emerald-100 dark:bg-emerald-900/40',
  },
  4: {
    label: 'Layer 4 — Elite',
    description: 'You are in the top tier of engineering organisations. Deployments are invisible, incidents are often self-healing, and the developer experience is a product. The focus now is governance, continuous improvement of your platform, and sharing what you have learned.',
    color: 'text-violet-700 dark:text-violet-300',
    bg: 'bg-violet-100 dark:bg-violet-900/40',
  },
};

const RECOMMENDATIONS: Record<number, string[]> = {
  1: [
    'Start with CI — get every code change running a build and a test suite automatically. Even a basic pipeline that runs tests on PR is a step-change from nothing.',
    'Write your first IaC module this sprint. Pick one repeatable resource type (a VM, a storage account, a VPC) and codify it. The habit matters more than the scope.',
    'Define one SLO for your most important service. It does not have to be correct yet — just having a number to look at changes how the team prioritises.',
    'Run one blameless post-mortem on the next incident. Write up what happened, why, and what will prevent it. The format matters less than the habit.',
  ],
  2: [
    'Move to trunk-based development with short-lived feature branches. Long-lived branches are the single biggest cause of integration pain at this maturity level.',
    'Build a self-service mechanism for your most common ops request — environment provisioning, access requests, or config changes. Ticket elimination is the platform team\'s primary metric.',
    'Adopt error budgets alongside your SLOs. When reliability work competes with feature work, error budget burn rate is the objective arbitrator.',
    'Invest in on-call health — measure alert volume, false positive rate, and time-to-acknowledge. Toil that is not measured is not reduced.',
  ],
  3: [
    'Build ephemeral environments for every PR. The feedback loop from "code looks right" to "code behaves right in production-like conditions" is the single biggest quality accelerator.',
    'Implement distributed tracing if you have not. Logs tell you what happened; traces tell you why — especially in service meshes.',
    'Move toward platform-as-a-product. Survey your engineers on their biggest friction points; the top three items are your IDP roadmap.',
    'Implement progressive delivery — canary or blue/green deployments. Deployment risk drops dramatically when traffic shifts are separable from code deploys.',
  ],
  4: [
    'Audit your developer experience against your stated golden paths. At this layer, the gap between what the platform offers and what teams actually use is your primary bottleneck.',
    'Measure and publish your DORA metrics externally or within your organisation. Benchmarking against industry state-of-DevOps data keeps elite teams from optimising the wrong things.',
    'Build a formal knowledge-sharing programme. Communities of practice, internal talks, and engineering blogs create the org-wide learning loop that sustains elite performance.',
    'Contribute back — open-source a tool, speak at a conference, write up your practices. The teams doing the most interesting work at this level are visible about it.',
  ],
};

interface PillarScore { key: string; score: number; layer: number; }

const generateReportHTML = (overallLayer: number, scores: PillarScore[], email: string): string => {
  const meta = LAYER_META[overallLayer];
  const recs = RECOMMENDATIONS[overallLayer];
  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const weakest = [...scores].sort((a, b) => a.score - b.score)[0];

  const pillarRows = scores.map(p => {
    const pct = Math.max(3, Math.round(((p.score - 1) / 3) * 100));
    return `
      <tr>
        <td style="padding:10px 0;font-weight:600;color:#271789;width:160px;font-size:13px">${p.key}</td>
        <td style="padding:10px 12px 10px 0;">
          <div style="background:#e2e8f0;border-radius:6px;height:10px;overflow:hidden">
            <div style="width:${pct}%;background:#271789;height:100%;border-radius:6px"></div>
          </div>
        </td>
        <td style="padding:10px 0;white-space:nowrap;font-size:13px;font-weight:700;color:#271789;width:140px">
          Layer ${p.layer} — ${LAYER_NAMES[p.layer]}
        </td>
      </tr>`;
  }).join('');

  const recItems = recs.map((r, i) => `
    <li style="margin-bottom:14px;color:#374151;line-height:1.65;font-size:13px">
      <strong style="color:#271789">${i + 1}.</strong> ${r}
    </li>`).join('');

  const weakestNote = weakest.layer < overallLayer
    ? `<div style="margin-top:14px;padding:12px 16px;background:#fef9c3;border-left:4px solid #f59e0b;border-radius:4px;font-size:13px;color:#78350f">
        <strong>Constraint pillar: ${weakest.key} (Layer ${weakest.layer})</strong> — This is your weakest area and the bottleneck limiting overall progression. Prioritise it first.
      </div>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>DevOps Maturity Report — nthakur.com</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;background:#fff;max-width:800px;margin:0 auto;padding:0}
  @page{margin:15mm 18mm}
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style>
</head>
<body>
  <div style="background:#271789;color:#fff;padding:32px 40px;border-radius:10px 10px 0 0">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:20px">
      <div>
        <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#00f1d4;margin-bottom:10px">DevOps Maturity Assessment</div>
        <h1 style="font-size:26px;font-weight:800;line-height:1.2;margin-bottom:8px">Your Maturity Report</h1>
        <div style="font-size:13px;color:#cbd5e1">Generated ${date} &nbsp;·&nbsp; nthakur.com</div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-size:11px;color:#94a3b8;margin-bottom:4px">Prepared for</div>
        <div style="font-size:13px;font-weight:600;color:#e2e8f0">${email}</div>
      </div>
    </div>
  </div>
  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-top:none;padding:28px 40px">
    <div style="display:flex;align-items:center;gap:24px">
      <div style="text-align:center;background:#271789;color:#fff;border-radius:10px;padding:18px 24px;min-width:100px;flex-shrink:0">
        <div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#00f1d4;margin-bottom:6px">Overall</div>
        <div style="font-size:40px;font-weight:900;line-height:1">L${overallLayer}</div>
        <div style="font-size:12px;font-weight:600;color:#e2e8f0;margin-top:5px">${LAYER_NAMES[overallLayer]}</div>
      </div>
      <div>
        <h2 style="font-size:19px;font-weight:700;color:#271789;margin-bottom:8px">${meta.label}</h2>
        <p style="font-size:13px;color:#475569;line-height:1.7;max-width:500px">${meta.description}</p>
      </div>
    </div>
  </div>
  <div style="border:1px solid #e2e8f0;border-top:none;padding:28px 40px">
    <h2 style="font-size:13px;font-weight:700;color:#271789;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:18px">Score by Pillar</h2>
    <table style="width:100%;border-collapse:collapse">${pillarRows}</table>
    ${weakestNote}
  </div>
  <div style="border:1px solid #e2e8f0;border-top:none;padding:28px 40px">
    <h2 style="font-size:13px;font-weight:700;color:#271789;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:16px">Recommended Next Steps</h2>
    <ol style="list-style:none;padding:0">${recItems}</ol>
  </div>
  ${pillarPlansHTML(scores, DEVOPS_PLANS, LAYER_NAMES)}
  <div style="background:#271789;color:#fff;padding:28px 40px;border-radius:0 0 10px 10px">
    <h2 style="font-size:17px;font-weight:700;margin-bottom:8px">Want a deeper DevOps assessment for your team?</h2>
    <p style="font-size:13px;color:#e2e8f0;line-height:1.65;margin-bottom:12px">Naval runs structured DevOps advisory engagements — scored findings per pillar, a gap analysis, and a prioritised 90-day roadmap your team can act on immediately.</p>
    <div style="font-size:13px;color:#00f1d4;font-weight:700">Book at nthakur.com/work-with-me</div>
  </div>
  <div style="padding:18px 40px;text-align:center">
    <p style="font-size:11px;color:#94a3b8">© ${new Date().getFullYear()} Naval Thakur · nthakur.com · Results are based on self-reported responses and are indicative, not prescriptive.</p>
  </div>
</body></html>`;
};

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx03K6mwLMtq6X5q8JIAHKQ4qSxCk9LEavNeO0IWo1jg9IxhzFoxvZM0DwKtgMegKDz1Q/exec';
const TOTAL_QUESTIONS = PILLARS.reduce((n, p) => n + p.questions.length, 0);

const computeScores = (answers: Answers): PillarScore[] =>
  PILLARS.map((p, pIdx) => {
    const vals = p.questions
      .map((_, qIdx) => answers[`${pIdx}-${qIdx}`])
      .filter((v): v is number => v !== undefined);
    const score = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 1;
    const layer = score < 1.5 ? 1 : score < 2.5 ? 2 : score < 3.5 ? 3 : 4;
    return { key: p.key, score, layer };
  });

const DevOpsAssessment: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'submitting' | 'error'>('idle');

  const pillarIdx = step - 1;
  const currentPillar = step >= 1 && step <= NUM_PILLARS ? PILLARS[pillarIdx] : null;
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);

  const pillarComplete = currentPillar
    ? currentPillar.questions.every((_, qIdx) => answers[`${pillarIdx}-${qIdx}`] !== undefined)
    : false;

  const pillarScores = computeScores(answers);
  const overallScore = pillarScores.reduce((s, p) => s + p.score, 0) / pillarScores.length;
  const overallLayer = overallScore < 1.5 ? 1 : overallScore < 2.5 ? 2 : overallScore < 3.5 ? 3 : 4;
  const overallMeta = LAYER_META[overallLayer];
  const weakest = [...pillarScores].sort((a, b) => a.score - b.score)[0];

  const setAnswer = (pIdx: number, qIdx: number, value: number) =>
    setAnswers(prev => ({ ...prev, [`${pIdx}-${qIdx}`]: value }));

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailStatus('submitting');
    try {
      const form = new FormData();
      form.append('email', email);
      form.append('name', name || 'Assessment Respondent');
      form.append('topic', 'DevOps Maturity Assessment');
      form.append('message',
        `Assessment complete. Overall: Layer ${overallLayer} (${LAYER_NAMES[overallLayer]}). ` +
        pillarScores.map(p => `${p.key}=L${p.layer}`).join(', ')
      );
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: form, mode: 'no-cors' });
      trackLead('devops-assessment');
      setStep(RESULTS_STEP);
    } catch {
      setEmailStatus('error');
    }
  };

  const handleDownloadPDF = () => {
    const html = generateReportHTML(overallLayer, pillarScores, email);
    const win = window.open('', '_blank');
    trackDownload('DevOps assessment report');
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 400);
  };

  const reset = () => {
    setStep(0); setAnswers({}); setEmail(''); setName(''); setEmailStatus('idle');
  };

  if (step === 0) return (
    <>
      <SEO
        title="DevOps Maturity Assessment | Naval Thakur"
        description="16 questions across Delivery Pipeline, Infrastructure & Platform, Observability, and Culture. Find your DevOps maturity layer and get a personalised PDF report."
      />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 text-secondary-dark dark:text-secondary text-sm font-bold mb-6">
            DevOps Maturity Assessment
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How mature is your DevOps practice?</h1>
          <p className="text-xl text-slate-200 max-w-2xl leading-relaxed">
            {TOTAL_QUESTIONS} questions across four pillars. About 4 minutes. You will receive your
            maturity layer, a per-pillar breakdown, and a downloadable PDF report with prioritised next steps.
          </p>
        </div>
      </div>
      <Section bg="white">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {PILLARS.map(p => (
              <div key={p.key} className={`rounded-xl border p-4 text-center ${p.bgClass} ${p.borderClass}`}>
                <p.icon className={`w-7 h-7 mx-auto mb-2 ${p.colorClass}`} />
                <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{p.key}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{p.questions.length} questions</div>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">What you will get</h3>
            <ul className="space-y-2">
              {[
                'Your DevOps maturity layer (Reactive → Repeatable → Accelerating → Elite)',
                'Per-pillar scores across Delivery, Infrastructure, Observability, and Culture',
                'Personalised recommendations for your next layer',
                'A downloadable PDF report for your records',
              ].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-secondary-dark dark:text-secondary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => setStep(1)}
            className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors text-lg shadow-lg"
          >
            Start Assessment <ArrowRight size={20} className="ml-2" />
          </button>
        </div>
      </Section>
    </>
  );

  if (step >= 1 && step <= NUM_PILLARS && currentPillar) {
    const PIcon = currentPillar.icon;
    return (
      <>
        <SEO title="DevOps Assessment | Naval Thakur" description="DevOps Maturity Assessment in progress." />
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-3 flex items-center gap-4">
            <span className="text-xs font-bold text-slate-500 shrink-0">Pillar {step} of {NUM_PILLARS}</span>
            <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-xs font-bold text-primary dark:text-secondary shrink-0">{progress}%</span>
          </div>
        </div>
        <Section bg="white">
          <div className="max-w-3xl mx-auto">
            <div className={`rounded-xl border p-5 mb-8 flex items-center gap-4 ${currentPillar.bgClass} ${currentPillar.borderClass}`}>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-900">
                <PIcon className={`w-6 h-6 ${currentPillar.colorClass}`} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Pillar {step} of {NUM_PILLARS}</div>
                <div className="text-xl font-bold text-slate-900 dark:text-white">{currentPillar.key}</div>
              </div>
            </div>
            <div className="space-y-6">
              {currentPillar.questions.map((q, qIdx) => {
                const selected = answers[`${pillarIdx}-${qIdx}`];
                return (
                  <div key={qIdx} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                    <p className="font-semibold text-slate-900 dark:text-white mb-4 leading-snug">
                      <span className="text-primary dark:text-secondary font-bold mr-2">Q{qIdx + 1}.</span>
                      {q.q}
                    </p>
                    <div className="space-y-2">
                      {q.options.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => setAnswer(pillarIdx, qIdx, opt.value)}
                          className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${
                            selected === opt.value
                              ? 'border-primary bg-primary/5 dark:bg-primary/20 text-primary dark:text-white font-semibold'
                              : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary/40 hover:bg-slate-50 dark:hover:bg-slate-700'
                          }`}
                        >
                          <span className="inline-flex items-center gap-3">
                            <span className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                              selected === opt.value ? 'border-primary bg-primary' : 'border-slate-300 dark:border-slate-600'
                            }`}>
                              {selected === opt.value && <span className="w-2 h-2 rounded-full bg-white block" />}
                            </span>
                            {opt.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button onClick={() => setStep(s => s - 1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white font-medium text-sm transition-colors">
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!pillarComplete}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm shadow-md"
              >
                {step === NUM_PILLARS ? 'Get My Results' : 'Next Pillar'} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      </>
    );
  }

  if (step === EMAIL_STEP) return (
    <>
      <SEO title="DevOps Assessment | Naval Thakur" description="Assessment complete — unlock your results." />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
          <CheckCircle2 className="w-12 h-12 text-secondary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Assessment complete.</h1>
          <p className="text-xl text-slate-200 leading-relaxed">
            Enter your email to unlock your full results and download your personalised PDF report.
          </p>
        </div>
      </div>
      <Section bg="white">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleEmailSubmit}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-lg space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Name</label>
              <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Work email <span className="text-red-500">*</span>
              </label>
              <input type="email" placeholder="you@company.com" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm transition" />
            </div>
            {emailStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle size={16} />
                Something went wrong.{' '}
                <button type="button" onClick={() => setStep(RESULTS_STEP)} className="underline font-semibold">
                  Skip and view results
                </button>
              </div>
            )}
            <button type="submit" disabled={emailStatus === 'submitting'}
              className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60 shadow-md">
              {emailStatus === 'submitting' ? <Loader2 className="animate-spin" size={18} /> : <><Mail size={18} /> View My Results</>}
            </button>
            <p className="text-xs text-slate-400 text-center">No spam. Unsubscribe anytime.</p>
          </form>
<PrivacyNote />
        </div>
      </Section>
    </>
  );

  return (
    <>
      <SEO
        title={`DevOps Results: ${LAYER_NAMES[overallLayer]} | Naval Thakur`}
        description={`Your team is at DevOps Layer ${overallLayer}: ${LAYER_NAMES[overallLayer]}.`}
      />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 text-secondary-dark dark:text-secondary text-sm font-bold mb-6">
            Your Results
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="bg-secondary/10 border-2 border-secondary/40 rounded-2xl px-8 py-5 text-center shrink-0">
              <div className="text-xs font-bold uppercase tracking-widest text-secondary mb-1">Overall</div>
              <div className="text-5xl font-black text-white leading-none">L{overallLayer}</div>
              <div className="text-sm font-bold text-slate-200 mt-2">{LAYER_NAMES[overallLayer]}</div>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{overallMeta.label}</h1>
              <p className="text-lg text-slate-200 leading-relaxed">{overallMeta.description}</p>
            </div>
          </div>
        </div>
      </div>
      <Section bg="gray">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-secondary-dark dark:text-secondary" /> Score by Pillar
            </h2>
            <div className="space-y-5">
              {pillarScores.map(p => {
                const pillarDef = PILLARS.find(pd => pd.key === p.key)!;
                const PIcon = pillarDef.icon;
                const pct = Math.max(4, Math.round(((p.score - 1) / 3) * 100));
                const layerMeta = LAYER_META[p.layer];
                return (
                  <div key={p.key}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <PIcon className={`w-4 h-4 ${pillarDef.colorClass}`} />
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{p.key}</span>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${layerMeta.bg} ${layerMeta.color}`}>
                        Layer {p.layer} — {LAYER_NAMES[p.layer]}
                      </span>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div className="h-3 rounded-full bg-primary transition-all duration-700" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            {weakest.layer < overallLayer && (
              <div className="mt-5 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg">
                <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                  <strong>Constraint pillar: {weakest.key}</strong> — This is your lowest score and the bottleneck limiting overall progression. Prioritise improvements here first.
                </p>
              </div>
            )}
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-5">Recommended Next Steps</h2>
            <ol className="space-y-4">
              {RECOMMENDATIONS[overallLayer].map((rec, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                  {rec}
                </li>
              ))}
            </ol>
          </div>
          <PillarPlans scores={pillarScores} plans={DEVOPS_PLANS} layerNames={LAYER_NAMES} />
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={handleDownloadPDF}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-md">
              <Download size={18} /> Download PDF Report
            </button>
            <Link to="/contact?topic=DevOps Advisory"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary dark:text-white dark:border-white font-bold rounded-xl hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary transition-colors">
              Book an Advisory <ArrowRight size={16} />
            </Link>
          </div>
          <div className="text-center pt-2">
            <button onClick={reset} className="text-sm text-slate-400 hover:text-primary dark:hover:text-secondary transition-colors underline">
              Retake assessment
            </button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default DevOpsAssessment;
