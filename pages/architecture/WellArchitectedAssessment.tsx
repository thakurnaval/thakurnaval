import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowLeft, Download, Mail, Loader2, CheckCircle2,
  AlertCircle, BarChart3, Settings2, Lock, Shield, Zap, DollarSign,
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
type Answers = Record<string, number>;

// ─── Assessment Data ──────────────────────────────────────────────────────────

const PILLARS: PillarDef[] = [
  {
    key: 'Operational Excellence',
    icon: Settings2,
    colorClass: 'text-purple-600 dark:text-purple-400',
    bgClass: 'bg-purple-50 dark:bg-purple-900/20',
    borderClass: 'border-purple-300 dark:border-purple-700',
    questions: [
      {
        q: 'How does your team manage operational runbooks and procedures?',
        options: [
          { label: 'Ad hoc — we rely on tribal knowledge and individual expertise', value: 1 },
          { label: 'Documented — runbooks exist but are updated inconsistently', value: 2 },
          { label: 'Codified — operations are defined as code with automated remediation procedures', value: 3 },
          { label: 'Continuously improved — operational events feed back into automated procedure refinement', value: 4 },
        ],
      },
      {
        q: 'How are application and infrastructure changes deployed?',
        options: [
          { label: 'Manual deployments with undocumented steps', value: 1 },
          { label: 'Scripted deployments with some automation and documented rollback', value: 2 },
          { label: 'Fully automated CI/CD with deployment validation gates and canary releases', value: 3 },
          { label: 'AI-orchestrated deployments that auto-rollback based on SLO signals', value: 4 },
        ],
      },
      {
        q: 'How are operational failures learned from?',
        options: [
          { label: 'Post-incident reviews rarely happen or are not documented', value: 1 },
          { label: 'Post-mortems written for major incidents but improvements are not tracked', value: 2 },
          { label: 'Blameless post-mortems feed into a tracked improvement backlog', value: 3 },
          { label: 'AI-assisted pattern detection drives proactive improvements before incidents recur', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'Security',
    icon: Lock,
    colorClass: 'text-red-600 dark:text-red-400',
    bgClass: 'bg-red-50 dark:bg-red-900/20',
    borderClass: 'border-red-300 dark:border-red-700',
    questions: [
      {
        q: 'How is identity and access management handled across your cloud environment?',
        options: [
          { label: 'Shared credentials and broad permissions — minimal access controls', value: 1 },
          { label: 'IAM roles defined but reviewed only periodically; some over-provisioning', value: 2 },
          { label: 'Least-privilege enforced, just-in-time access for privileged operations', value: 3 },
          { label: 'AI continuously right-sizes permissions based on actual usage patterns', value: 4 },
        ],
      },
      {
        q: 'How is your data protected at rest and in transit?',
        options: [
          { label: 'No consistent encryption policy — some services encrypted, others not', value: 1 },
          { label: 'Encryption enforced for regulated data, inconsistent elsewhere', value: 2 },
          { label: 'All data encrypted at rest and in transit; key management and rotation automated', value: 3 },
          { label: 'Data classification drives dynamic policy — AI detects and responds to policy drift', value: 4 },
        ],
      },
      {
        q: 'How are security incidents detected and responded to?',
        options: [
          { label: 'Reactive — we learn about breaches from users or third parties', value: 1 },
          { label: 'Basic alerting on known threat signatures', value: 2 },
          { label: 'Behavioural anomaly detection with automated containment for known patterns', value: 3 },
          { label: 'AI threat hunting with autonomous response within governance guardrails', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'Reliability',
    icon: Shield,
    colorClass: 'text-blue-600 dark:text-blue-400',
    bgClass: 'bg-blue-50 dark:bg-blue-900/20',
    borderClass: 'border-blue-300 dark:border-blue-700',
    questions: [
      {
        q: 'How does your architecture handle component failures?',
        options: [
          { label: 'Single points of failure — one component down affects the whole system', value: 1 },
          { label: 'Some redundancy, but manual failover is required', value: 2 },
          { label: 'Automated failover with multi-region or multi-AZ deployment', value: 3 },
          { label: 'Chaos engineering validates resilience continuously; self-healing is the default', value: 4 },
        ],
      },
      {
        q: 'How are recovery objectives (RTO/RPO) defined and tested?',
        options: [
          { label: 'No defined RTO/RPO — we just try to recover as fast as possible', value: 1 },
          { label: 'RTO/RPO defined for critical systems but rarely tested', value: 2 },
          { label: 'Regular DR exercises with documented results and improvement plans', value: 3 },
          { label: 'Continuous automated resilience testing with SLO-linked targets', value: 4 },
        ],
      },
      {
        q: 'How are workload demands handled during traffic spikes?',
        options: [
          { label: 'Fixed capacity — spikes cause degradation or outages', value: 1 },
          { label: 'Manual scaling — someone adds capacity when alerted to high load', value: 2 },
          { label: 'Auto-scaling based on metrics with pre-defined scaling policies', value: 3 },
          { label: 'Predictive AI-driven scaling that anticipates demand before it arrives', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'Performance Efficiency',
    icon: Zap,
    colorClass: 'text-amber-600 dark:text-amber-400',
    bgClass: 'bg-amber-50 dark:bg-amber-900/20',
    borderClass: 'border-amber-300 dark:border-amber-700',
    questions: [
      {
        q: 'How are compute resources selected and sized for workloads?',
        options: [
          { label: 'Default instance types, manually chosen and rarely reviewed', value: 1 },
          { label: 'Periodic rightsizing reviews based on utilisation reports', value: 2 },
          { label: 'Continuous rightsizing recommendations applied on a defined cadence', value: 3 },
          { label: 'AI automatically selects optimal instance families based on real-time workload profiles', value: 4 },
        ],
      },
      {
        q: 'How is application performance monitored and optimised?',
        options: [
          { label: 'No performance monitoring — we learn about slowness from users', value: 1 },
          { label: 'Basic APM with dashboards; performance investigated reactively', value: 2 },
          { label: 'Distributed tracing, SLO-based alerting, and performance budgets per service', value: 3 },
          { label: 'AI identifies performance regressions in CI/CD and suggests optimisations before deployment', value: 4 },
        ],
      },
      {
        q: 'How are new technologies evaluated for adoption?',
        options: [
          { label: 'Ad hoc — teams adopt tools independently without a review process', value: 1 },
          { label: 'Technology radar exists but is updated infrequently', value: 2 },
          { label: 'Structured evaluation with proof-of-concept gates and performance benchmarks', value: 3 },
          { label: 'Continuous benchmarking feeds an AI-assisted technology selection framework', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'Cost Optimisation',
    icon: DollarSign,
    colorClass: 'text-green-600 dark:text-green-400',
    bgClass: 'bg-green-50 dark:bg-green-900/20',
    borderClass: 'border-green-300 dark:border-green-700',
    questions: [
      {
        q: 'How is cloud spend visibility managed?',
        options: [
          { label: 'Finance reviews the monthly bill — engineers have no visibility', value: 1 },
          { label: 'Cost dashboards exist but are not tied to individual teams or services', value: 2 },
          { label: 'Full showback/chargeback — every team sees and owns their cloud spend', value: 3 },
          { label: 'Real-time cost telemetry alongside operational metrics; anomaly alerts fire before budgets are breached', value: 4 },
        ],
      },
      {
        q: 'How are idle and underutilised resources managed?',
        options: [
          { label: 'Rarely cleaned up — we do not know what is unused', value: 1 },
          { label: 'Periodic reviews identify waste; cleanup is manual and ad hoc', value: 2 },
          { label: 'Automated policies enforce resource lifecycle — unused assets are flagged and terminated on a schedule', value: 3 },
          { label: 'AI continuously optimises utilisation, rightsizing and terminating in real time', value: 4 },
        ],
      },
      {
        q: 'How are cloud purchase commitments managed?',
        options: [
          { label: 'Pay-as-you-go only — no reserved instances or savings plans', value: 1 },
          { label: 'Some reserved instances purchased manually, reviewed annually', value: 2 },
          { label: 'Commitment coverage targets set with automated purchase recommendations', value: 3 },
          { label: 'AI dynamically manages the commitment portfolio as workload patterns evolve', value: 4 },
        ],
      },
    ],
  },
];

// ─── Scoring & Metadata ───────────────────────────────────────────────────────

const NUM_PILLARS = PILLARS.length;
const EMAIL_STEP = NUM_PILLARS + 1;
const RESULTS_STEP = NUM_PILLARS + 2;

const LAYER_NAMES: Record<number, string> = { 1: 'Foundational', 2: 'Structured', 3: 'Advanced', 4: 'Exemplary' };

const LAYER_META: Record<number, { label: string; description: string; color: string; bg: string; }> = {
  1: {
    label: 'Layer 1 — Foundational',
    description: 'Your architecture has significant gaps against Well-Architected principles. The highest-impact first step is addressing security and reliability fundamentals — these protect revenue and reputation before efficiency improvements compound.',
    color: 'text-slate-700 dark:text-slate-200',
    bg: 'bg-slate-100 dark:bg-slate-700',
  },
  2: {
    label: 'Layer 2 — Structured',
    description: 'You have established the building blocks most organisations are still working toward. The next layer is consistency — applying your existing good practices across all workloads, not just the most visible ones.',
    color: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-100 dark:bg-blue-900/40',
  },
  3: {
    label: 'Layer 3 — Advanced',
    description: 'You are in the top tier of enterprise cloud architecture. Automation is the norm and you have strong hygiene across all five pillars. The frontier is adding intelligence — making your architecture self-optimising.',
    color: 'text-purple-700 dark:text-purple-300',
    bg: 'bg-purple-100 dark:bg-purple-900/40',
  },
  4: {
    label: 'Layer 4 — Exemplary',
    description: 'You are operating a genuinely exemplary cloud architecture. AI-assisted optimisation, predictive scaling, and automated governance place you at the frontier. Focus now shifts to responsible autonomy and knowledge sharing.',
    color: 'text-teal-700 dark:text-teal-300',
    bg: 'bg-teal-100 dark:bg-teal-900/40',
  },
};

const RECOMMENDATIONS: Record<number, string[]> = {
  1: [
    'Start with Security and Reliability — failing in either pillar can make progress on the other three irrelevant. Enforce MFA, encrypt all data at rest, and deploy across at least two availability zones.',
    'Define RTO and RPO for every critical workload this quarter. Even informal targets give engineering teams a target to design toward.',
    'Enable cloud cost dashboards and assign a cost owner to each major service. You cannot optimise what you cannot see.',
    'Introduce infrastructure-as-code for new workloads immediately. Migrating existing resources can wait; stopping the growth of manual debt cannot.',
  ],
  2: [
    'Apply just-in-time access and enforce least-privilege across all cloud roles. Excessive permissions are the most common root cause of cloud security incidents.',
    'Build automated scaling policies for your highest-traffic workloads. The ROI on preventing a single capacity-related outage typically justifies the engineering effort.',
    'Move from showback to chargeback for cloud costs. When engineering teams own budgets, cost efficiency becomes self-reinforcing.',
    'Run a formal DR exercise against your documented RTO/RPO targets. Most teams that define objectives never validate them — and discover gaps in production.',
  ],
  3: [
    'Pilot AI-assisted rightsizing and commitment management. At this maturity level, the marginal gains from automation outpace what any human process can achieve.',
    'Introduce chaos engineering on a small blast-radius workload first. The discipline of designing for failure proactively is the cultural bridge to Layer 4.',
    'Implement data classification-driven policy enforcement. Automated guardrails are the most scalable security control at this layer.',
    'Build a performance budget into your CI/CD pipeline for key user journeys. Catching regressions at merge time is orders of magnitude cheaper than post-deployment.',
  ],
  4: [
    'Audit your AI-driven automation guardrails rigorously. At this layer, the risk shifts from insufficient automation to automation acting incorrectly at scale.',
    'Formalise your Well-Architected review cadence as a product-level ritual. Even exemplary architectures drift — treat architectural health like an SLO.',
    'Contribute back. Document your patterns, present at architecture communities, and raise the floor for the industry.',
    'Build a feedback loop between architectural decisions and business outcomes — cost per transaction, availability as an NPS driver, performance as a conversion signal.',
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
        <td style="padding:10px 0;font-weight:600;color:#271789;width:160px;font-size:13px">${p.key}</td>
        <td style="padding:10px 12px 10px 0;">
          <div style="background:#e2e8f0;border-radius:6px;height:10px;overflow:hidden">
            <div style="width:${pct}%;background:#271789;height:100%;border-radius:6px"></div>
          </div>
        </td>
        <td style="padding:10px 0;white-space:nowrap;font-size:13px;font-weight:700;color:#271789;width:160px">
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
<title>Well-Architected Assessment Report — nthakur.com</title>
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
        <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#00f1d4;margin-bottom:10px">Well-Architected Assessment</div>
        <h1 style="font-size:26px;font-weight:800;line-height:1.2;margin-bottom:8px">Your Architecture Maturity Report</h1>
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
    <h2 style="font-size:17px;font-weight:700;margin-bottom:8px">Want a full architecture review engagement?</h2>
    <p style="font-size:13px;color:#e2e8f0;line-height:1.65;margin-bottom:12px">Naval runs structured Well-Architected review engagements — workload-level findings across all five pillars, a gap analysis, and a prioritised remediation roadmap your team can act on immediately.</p>
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

const WellArchitectedAssessment: React.FC = () => {
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
      form.append('topic', 'Well-Architected Assessment');
      form.append('message',
        `Assessment complete. Overall: Layer ${overallLayer} (${LAYER_NAMES[overallLayer]}). ` +
        pillarScores.map(p => `${p.key}=L${p.layer}`).join(', ')
      );
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: form, mode: 'no-cors' });
      setStep(RESULTS_STEP);
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
        title="Well-Architected Assessment | Naval Thakur"
        description="15 questions across the five Well-Architected pillars. Find your architecture maturity layer and download a personalised PDF report."
      />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 text-secondary-dark dark:text-secondary text-sm font-bold mb-6">
            Well-Architected Assessment
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How well-architected is your cloud?</h1>
          <p className="text-xl text-slate-200 max-w-2xl leading-relaxed">
            {TOTAL_QUESTIONS} questions across five pillars. About 5 minutes. You will receive a maturity
            layer per pillar, an overall score, and a downloadable PDF report with prioritised next steps.
          </p>
        </div>
      </div>
      <Section bg="white">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            {PILLARS.map(p => (
              <div key={p.key} className={`rounded-xl border p-4 text-center ${p.bgClass} ${p.borderClass}`}>
                <p.icon className={`w-7 h-7 mx-auto mb-2 ${p.colorClass}`} />
                <div className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-tight">{p.key}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{p.questions.length} questions</div>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">What you will get</h3>
            <ul className="space-y-2">
              {[
                'Your maturity layer across all five Well-Architected pillars',
                'A visual breakdown of your strongest and weakest areas',
                'Prioritised recommendations to reach the next layer',
                'A downloadable PDF report to share with your team',
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

  // ── Pillar steps ──────────────────────────────────────────────────────────────
  if (step >= 1 && step <= NUM_PILLARS && currentPillar) {
    const PIcon = currentPillar.icon;
    return (
      <>
        <SEO title="Well-Architected Assessment | Naval Thakur" description="Well-Architected Assessment in progress." />

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
                {step === NUM_PILLARS ? 'Get My Results' : 'Next Pillar'} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Section>
      </>
    );
  }

  // ── Email gate ────────────────────────────────────────────────────────────────
  if (step === EMAIL_STEP) return (
    <>
      <SEO title="Well-Architected Assessment | Naval Thakur" description="Assessment complete — unlock your results." />
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
                <button type="button" onClick={() => setStep(RESULTS_STEP)} className="underline font-semibold">
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

  // ── Results ───────────────────────────────────────────────────────────────────
  return (
    <>
      <SEO
        title={`Well-Architected Results: Layer ${overallLayer} | Naval Thakur`}
        description={`Your architecture is at Layer ${overallLayer}: ${LAYER_NAMES[overallLayer]}.`}
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

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleDownloadPDF}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-md"
            >
              <Download size={18} /> Download PDF Report
            </button>
            <Link
              to="/contact?topic=Architecture+Review"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary dark:text-white dark:border-white font-bold rounded-xl hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary transition-colors"
            >
              Book an Architecture Review <ArrowRight size={16} />
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

export default WellArchitectedAssessment;
