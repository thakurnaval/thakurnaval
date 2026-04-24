import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowLeft, Download, Mail, Loader2, CheckCircle2,
  BrainCircuit, ShieldCheck, TrendingUp, Terminal, AlertCircle, BarChart3,
} from 'lucide-react';
import Section from '../../components/Section';
import SEO from '../../components/SEO';

// ─── Types ────────────────────────────────────────────────────────────────────

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
type Answers = Record<string, number>; // key: `${pillarIdx}-${qIdx}`

// ─── Assessment Data ──────────────────────────────────────────────────────────

const PILLARS: PillarDef[] = [
  {
    key: 'DevOps',
    icon: Terminal,
    colorClass: 'text-blue-600 dark:text-blue-400',
    bgClass: 'bg-blue-50 dark:bg-blue-900/20',
    borderClass: 'border-blue-300 dark:border-blue-700',
    questions: [
      {
        q: 'How often does your team deploy to production?',
        options: [
          { label: 'Monthly or less — it is a planned event with a change window', value: 1 },
          { label: 'Weekly — releases with manual approval gates', value: 2 },
          { label: 'Daily or on-demand — automated CI/CD pipeline', value: 3 },
          { label: 'Continuously — AI-triggered deployments based on signals and policy', value: 4 },
        ],
      },
      {
        q: 'How is your infrastructure managed?',
        options: [
          { label: 'Manually — consoles, runbooks, and tickets', value: 1 },
          { label: 'Partially automated — some scripts, some IaC', value: 2 },
          { label: 'Fully as code — Terraform/Pulumi, drift detection in place', value: 3 },
          { label: 'Policy-driven — AI maintains desired state within defined guardrails', value: 4 },
        ],
      },
      {
        q: 'How does your team respond to production incidents?',
        options: [
          { label: 'Heroics — whoever knows the system jumps on a call', value: 1 },
          { label: 'Runbooks — documented steps, manually executed', value: 2 },
          { label: 'AIOps-assisted — anomaly detection surfaces incidents early', value: 3 },
          { label: 'Autonomous — known patterns remediated without human intervention', value: 4 },
        ],
      },
      {
        q: 'How mature is your observability?',
        options: [
          { label: 'Basic logging — we find out about issues from users', value: 1 },
          { label: 'Metrics and dashboards — SLOs defined, alerting reactive', value: 2 },
          { label: 'SLO-driven — real-time error budget burn rate, automated escalation', value: 3 },
          { label: 'Predictive — ML forecasts degradation before SLOs are breached', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'SecOps',
    icon: ShieldCheck,
    colorClass: 'text-red-600 dark:text-red-400',
    bgClass: 'bg-red-50 dark:bg-red-900/20',
    borderClass: 'border-red-300 dark:border-red-700',
    questions: [
      {
        q: 'When does security review happen in your development lifecycle?',
        options: [
          { label: 'At the end — a security team manually gates releases', value: 1 },
          { label: 'In the pipeline — SAST/DAST scans on every PR', value: 2 },
          { label: 'Continuously — runtime monitoring and policy-as-code', value: 3 },
          { label: 'Autonomously — AI agents triage and remediate known vulnerability patterns', value: 4 },
        ],
      },
      {
        q: 'How is cloud compliance managed?',
        options: [
          { label: 'Manual audits — periodic reviews, spreadsheet evidence', value: 1 },
          { label: 'Automated checks — compliance gates in CI/CD', value: 2 },
          { label: 'Continuous monitoring — drift from policy triggers real-time alerts', value: 3 },
          { label: 'Policy-as-code agents — non-compliant resources are auto-remediated', value: 4 },
        ],
      },
      {
        q: 'How is security responsibility distributed across your teams?',
        options: [
          { label: 'Centralised — the security team owns it, developers hand off', value: 1 },
          { label: 'Shared — developers know OWASP Top 10, reviews are collaborative', value: 2 },
          { label: 'Embedded — security champions in every team, threat modelling in design', value: 3 },
          { label: 'Intrinsic — security posture is a live metric, not a periodic gate', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'FinOps',
    icon: TrendingUp,
    colorClass: 'text-green-600 dark:text-green-400',
    bgClass: 'bg-green-50 dark:bg-green-900/20',
    borderClass: 'border-green-300 dark:border-green-700',
    questions: [
      {
        q: 'How visible are your cloud costs to engineering teams?',
        options: [
          { label: 'Not visible — only finance sees the monthly bill', value: 1 },
          { label: 'Showback — teams can see spend tagged by service or team', value: 2 },
          { label: 'Chargeback — teams own budgets and are accountable for variances', value: 3 },
          { label: 'Real-time — cost is a live dashboard metric alongside latency and error rate', value: 4 },
        ],
      },
      {
        q: 'How does your organisation optimise cloud spend?',
        options: [
          { label: 'Reactive — we look at costs after they spike', value: 1 },
          { label: 'Periodic reviews — rightsizing recommendations on a schedule', value: 2 },
          { label: 'Automated commitments — reserved instances purchased on policy', value: 3 },
          { label: 'AI-driven — ML adjusts commitments and rightsizes in real time', value: 4 },
        ],
      },
      {
        q: 'How mature is your cloud cost forecasting?',
        options: [
          { label: 'Last month\'s bill plus a buffer', value: 1 },
          { label: 'Trend-based projections from historical data', value: 2 },
          { label: 'Unit economics — cost per transaction, per user, per feature', value: 3 },
          { label: 'Predictive ML — forecasts by workload and team before features are built', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'GenAI',
    icon: BrainCircuit,
    colorClass: 'text-purple-600 dark:text-purple-400',
    bgClass: 'bg-purple-50 dark:bg-purple-900/20',
    borderClass: 'border-purple-300 dark:border-purple-700',
    questions: [
      {
        q: 'Where is AI currently used in your engineering workflow?',
        options: [
          { label: 'Not yet — evaluating or running early pilots only', value: 1 },
          { label: 'Developer tooling — Copilot or similar for code assistance', value: 2 },
          { label: 'In the pipeline — AI-assisted code review, test generation, documentation', value: 3 },
          { label: 'Operational — AI agents handle incident routing, deployment decisions, cost actions', value: 4 },
        ],
      },
      {
        q: 'How does your organisation govern AI use?',
        options: [
          { label: 'No formal policy — teams decide individually', value: 1 },
          { label: 'Guidelines exist — approved tool list, basic data handling rules', value: 2 },
          { label: 'Formal policy — LLM use cases reviewed, data classification enforced', value: 3 },
          { label: 'Automated governance — AI outputs audited, cost limits and guardrails enforced by policy', value: 4 },
        ],
      },
      {
        q: 'How is AI return on investment measured?',
        options: [
          { label: 'It is not — we assume it saves time', value: 1 },
          { label: 'Qualitative — developer satisfaction and perceived speed', value: 2 },
          { label: 'Quantitative — DORA metrics before/after, velocity, test coverage delta', value: 3 },
          { label: 'Full ROI model — AI spend vs. business outcome, optimised continuously', value: 4 },
        ],
      },
    ],
  },
];

// ─── Scoring & Metadata ───────────────────────────────────────────────────────

const LAYER_NAMES: Record<number, string> = { 1: 'Manual', 2: 'Automated', 3: 'Intelligent', 4: 'Cognitive' };

const LAYER_META: Record<number, { label: string; description: string; color: string; bg: string; }> = {
  1: {
    label: 'Layer 1 — Manual',
    description: 'Your operations are largely manual. The biggest opportunity is establishing CI/CD fundamentals, basic cloud hygiene, and security in the pipeline — these unlock every higher layer.',
    color: 'text-slate-700 dark:text-slate-200',
    bg: 'bg-slate-100 dark:bg-slate-700',
  },
  2: {
    label: 'Layer 2 — Automated',
    description: 'You have the automation foundation most enterprises are still working toward. The next step is adding intelligence to what you have already built — making your systems observe, reason, and suggest.',
    color: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-100 dark:bg-blue-900/40',
  },
  3: {
    label: 'Layer 3 — Intelligent',
    description: 'You are in the top tier of enterprise engineering organisations. AI is actively augmenting your operations. The frontier is moving from AI-assisted decisions to AI-autonomous actions within guardrails.',
    color: 'text-purple-700 dark:text-purple-300',
    bg: 'bg-purple-100 dark:bg-purple-900/40',
  },
  4: {
    label: 'Layer 4 — Cognitive',
    description: 'You are operating at the frontier of enterprise engineering. AI agents act within guardrails you have defined. The focus now is governance, trust, and expanding the scope of autonomous operation responsibly.',
    color: 'text-teal-700 dark:text-teal-300',
    bg: 'bg-teal-100 dark:bg-teal-900/40',
  },
};

const RECOMMENDATIONS: Record<number, string[]> = {
  1: [
    'Establish a CI/CD pipeline first — GitHub Actions or Azure Pipelines are the fastest starts. Even a single automated deployment per week is a transformation.',
    'Tag all cloud resources by team and product immediately. You cannot govern what you cannot see, and untagged resources are the #1 reason FinOps fails.',
    'Add SAST scanning to every pull request. SonarCloud is free for public repos; Semgrep has a generous free tier for private ones.',
    'Write your first Terraform or Bicep module — even a small one. IaC discipline is the foundation every higher maturity level depends on.',
  ],
  2: [
    'Adopt AIOps-assisted incident detection. Datadog, Dynatrace, and New Relic all have AI tiers that surface anomalies humans reliably miss.',
    'Move from cost showback to chargeback. When engineering teams own cloud budgets, spend optimisation becomes self-reinforcing.',
    'Roll out GitHub Copilot or equivalent across engineering and measure DORA metrics before and after — the delta is compelling for leadership buy-in.',
    'Build threat modelling into your architecture review process, not just your security reviews.',
  ],
  3: [
    'Pilot AI agents for incident remediation on known, low-risk patterns first. A runbook that runs itself is the first step to autonomous operations.',
    'Implement ML-based cost forecasting with unit economics — tie cloud spend to business outcomes: cost per transaction, per user, per feature.',
    'Define your AI governance framework before it becomes urgent: approved use cases, data classification, output auditing, and cost guardrails.',
    'Move your team from approving individual AI actions to setting guardrails for AI autonomy. This is the cultural shift that unlocks Layer 4.',
  ],
  4: [
    'Audit your AI agent guardrails rigorously. At this layer the risk shifts from "AI not doing enough" to "AI doing the wrong thing at scale".',
    'Build a feedback loop between AI spend and AI ROI. The most advanced organisations at this layer have AI that continuously optimises its own operational cost.',
    'Document and share what you are doing. You are in the top 1% of enterprise engineering and the community benefits from your experience.',
    'Consider formalising your practices into an internal playbook or framework that leadership can reference and other teams can adopt.',
  ],
};

// ─── PDF Generation ───────────────────────────────────────────────────────────

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
        <td style="padding:10px 0;font-weight:600;color:#271789;width:100px;font-size:14px">${p.key}</td>
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
<title>CognitiveOps Maturity Report — nthakur.com</title>
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
        <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#00f1d4;margin-bottom:10px">CognitiveOps Maturity Assessment</div>
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

  <div style="background:#271789;color:#fff;padding:28px 40px;border-radius:0 0 10px 10px">
    <h2 style="font-size:17px;font-weight:700;margin-bottom:8px">Want a tailored roadmap for your organisation?</h2>
    <p style="font-size:13px;color:#e2e8f0;line-height:1.65;margin-bottom:12px">Naval offers a 2-week CognitiveOps Assessment engagement — scored findings per pillar, a gap analysis, and a prioritised 90-day roadmap your team can act on immediately.</p>
    <div style="font-size:13px;color:#00f1d4;font-weight:700">Book at nthakur.com/work-with-me</div>
  </div>

  <div style="padding:18px 40px;text-align:center">
    <p style="font-size:11px;color:#94a3b8">© ${new Date().getFullYear()} Naval Thakur · nthakur.com · Results are based on self-reported responses and are indicative, not prescriptive.</p>
  </div>

</body></html>`;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

// ─── Component ────────────────────────────────────────────────────────────────

const DevOpsAssessment: React.FC = () => {
  // step: 0=welcome, 1-4=pillars, 5=email gate, 6=results
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'submitting' | 'error'>('idle');

  const pillarIdx = step - 1;
  const currentPillar = step >= 1 && step <= 4 ? PILLARS[pillarIdx] : null;
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
      form.append('topic', 'CognitiveOps Assessment');
      form.append('message',
        `Assessment complete. Overall: Layer ${overallLayer} (${LAYER_NAMES[overallLayer]}). ` +
        pillarScores.map(p => `${p.key}=L${p.layer}`).join(', ')
      );
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: form, mode: 'no-cors' });
      setStep(6);
    } catch {
      setEmailStatus('error');
    }
  };

  const handleDownloadPDF = () => {
    const html = generateReportHTML(overallLayer, pillarScores, email);
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 400);
  };

  const reset = () => {
    setStep(0); setAnswers({}); setEmail(''); setName(''); setEmailStatus('idle');
  };

  // ── Welcome ──────────────────────────────────────────────────────────────────
  if (step === 0) return (
    <>
      <SEO
        title="CognitiveOps Maturity Assessment | Naval Thakur"
        description="13 questions across DevOps, SecOps, FinOps, and GenAI. Find your CognitiveOps maturity layer and download a personalised PDF report."
      />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 text-secondary-dark dark:text-secondary text-sm font-bold mb-6">
            CognitiveOps Maturity Assessment
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Where does your organisation stand?</h1>
          <p className="text-xl text-slate-200 max-w-2xl leading-relaxed">
            {TOTAL_QUESTIONS} questions across four pillars. About 4 minutes. You will receive your
            maturity layer, a per-pillar breakdown, and a downloadable PDF report.
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
                'Your CognitiveOps maturity layer (1–4)',
                'Per-pillar scores with a visual breakdown',
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

  // ── Pillar steps (1–4) ────────────────────────────────────────────────────────
  if (step >= 1 && step <= 4 && currentPillar) {
    const PIcon = currentPillar.icon;
    return (
      <>
        <SEO title="CognitiveOps Assessment | Naval Thakur" description="CognitiveOps Maturity Assessment in progress." />

        {/* Sticky progress bar */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-3 flex items-center gap-4">
            <span className="text-xs font-bold text-slate-500 shrink-0">Pillar {step} of 4</span>
            <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-xs font-bold text-primary dark:text-secondary shrink-0">{progress}%</span>
          </div>
        </div>

        <Section bg="white">
          <div className="max-w-3xl mx-auto">
            {/* Pillar header */}
            <div className={`rounded-xl border p-5 mb-8 flex items-center gap-4 ${currentPillar.bgClass} ${currentPillar.borderClass}`}>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-900">
                <PIcon className={`w-6 h-6 ${currentPillar.colorClass}`} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Pillar {step} of 4</div>
                <div className="text-xl font-bold text-slate-900 dark:text-white">{currentPillar.key}</div>
              </div>
            </div>

            {/* Questions */}
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

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setStep(s => s - 1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white font-medium text-sm transition-colors"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!pillarComplete}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm shadow-md"
              >
                {step === 4 ? 'Get My Results' : 'Next Pillar'} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      </>
    );
  }

  // ── Email gate (step 5) ───────────────────────────────────────────────────────
  if (step === 5) return (
    <>
      <SEO title="CognitiveOps Assessment | Naval Thakur" description="Assessment complete — unlock your results." />
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
          <form
            onSubmit={handleEmailSubmit}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-lg space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Work email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm transition"
              />
            </div>
            {emailStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle size={16} />
                Something went wrong.{' '}
                <button type="button" onClick={() => setStep(6)} className="underline font-semibold">
                  Skip and view results
                </button>
              </div>
            )}
            <button
              type="submit"
              disabled={emailStatus === 'submitting'}
              className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60 shadow-md"
            >
              {emailStatus === 'submitting'
                ? <Loader2 className="animate-spin" size={18} />
                : <><Mail size={18} /> View My Results</>}
            </button>
            <p className="text-xs text-slate-400 text-center">No spam. Unsubscribe anytime.</p>
          </form>
        </div>
      </Section>
    </>
  );

  // ── Results (step 6) ──────────────────────────────────────────────────────────
  return (
    <>
      <SEO
        title={`CognitiveOps Results: Layer ${overallLayer} | Naval Thakur`}
        description={`Your organisation is at CognitiveOps Layer ${overallLayer}: ${LAYER_NAMES[overallLayer]}.`}
      />

      {/* Results hero */}
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

          {/* Per-pillar scores */}
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

          {/* Recommendations */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-5">
              Recommended Next Steps
            </h2>
            <ol className="space-y-4">
              {RECOMMENDATIONS[overallLayer].map((rec, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  {rec}
                </li>
              ))}
            </ol>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleDownloadPDF}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-md"
            >
              <Download size={18} /> Download PDF Report
            </button>
            <Link
              to="/contact?topic=CognitiveOps Workshop"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary dark:text-white dark:border-white font-bold rounded-xl hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary transition-colors"
            >
              Book a Workshop <ArrowRight size={16} />
            </Link>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={reset}
              className="text-sm text-slate-400 hover:text-primary dark:hover:text-secondary transition-colors underline"
            >
              Retake assessment
            </button>
          </div>

        </div>
      </Section>
    </>
  );
};

export default DevOpsAssessment;
