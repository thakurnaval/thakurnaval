import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowLeft, Download, Mail, Loader2, CheckCircle2,
  Eye, Users, TrendingDown, BarChart2, AlertCircle, BarChart3,
} from 'lucide-react';
import Section from '../../components/Section';
import SEO from '../../components/SEO';

interface Option { label: string; value: number; }
interface Question { q: string; options: Option[]; }
interface PillarDef { key: string; icon: React.ElementType; colorClass: string; bgClass: string; borderClass: string; questions: Question[]; }
type Answers = Record<string, number>;

const PILLARS: PillarDef[] = [
  {
    key: 'Visibility & Tagging',
    icon: Eye,
    colorClass: 'text-green-600 dark:text-green-400',
    bgClass: 'bg-green-50 dark:bg-green-900/20',
    borderClass: 'border-green-300 dark:border-green-700',
    questions: [
      {
        q: 'How are cloud resources tagged in your organisation?',
        options: [
          { label: 'Tagging is minimal or absent — resources are unidentifiable by team or product', value: 1 },
          { label: 'Some tagging exists but coverage is inconsistent and not enforced', value: 2 },
          { label: 'A tagging taxonomy is defined, enforced via policy, and coverage exceeds 90%', value: 3 },
          { label: 'Tagging is fully automated at resource creation, validated in real time, and tied to cost allocation models', value: 4 },
        ],
      },
      {
        q: 'How visible is cloud spend to engineering teams?',
        options: [
          { label: 'Only finance sees the bill — engineers have no insight into what their code costs to run', value: 1 },
          { label: 'Monthly showback reports exist but are not reviewed or acted upon by teams', value: 2 },
          { label: 'Real-time dashboards per team and workload with cost trends and budget tracking', value: 3 },
          { label: 'Cost is a live engineering signal alongside latency and error rate; anomalies alert automatically', value: 4 },
        ],
      },
      {
        q: 'How granular is your cost allocation?',
        options: [
          { label: 'Costs are visible at the account or subscription level only — no product or team granularity', value: 1 },
          { label: 'Costs allocated by department, not by individual product or service', value: 2 },
          { label: 'Unit-level cost allocation: cost per service, per feature, per environment', value: 3 },
          { label: 'Continuous cost attribution to business outcomes — cost per transaction, per user, per value unit', value: 4 },
        ],
      },
      {
        q: 'How well do you understand shared service costs?',
        options: [
          { label: 'Shared infrastructure costs are not allocated — they sit in a central unattributed bucket', value: 1 },
          { label: 'Shared costs are allocated using simple splits, often by headcount or team size', value: 2 },
          { label: 'Activity-based shared cost allocation using actual resource consumption metrics', value: 3 },
          { label: 'AI-driven dynamic shared cost allocation updated in real time based on actual usage patterns', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'Accountability & Culture',
    icon: Users,
    colorClass: 'text-blue-600 dark:text-blue-400',
    bgClass: 'bg-blue-50 dark:bg-blue-900/20',
    borderClass: 'border-blue-300 dark:border-blue-700',
    questions: [
      {
        q: 'How is cloud cost ownership structured in your organisation?',
        options: [
          { label: 'Finance owns the cloud bill — engineering teams are not accountable for spend', value: 1 },
          { label: 'Teams have some visibility but no formal ownership of cloud budgets', value: 2 },
          { label: 'Engineering teams own their cloud budgets and are accountable for variances', value: 3 },
          { label: 'Distributed ownership with real-time alerts, budget approval workflows, and self-service dashboards', value: 4 },
        ],
      },
      {
        q: 'How well do engineers understand the cost impact of their architecture decisions?',
        options: [
          { label: 'Cost is not considered in design or code review — it is someone else\'s problem', value: 1 },
          { label: 'Cost awareness exists informally but is not part of any formal review process', value: 2 },
          { label: 'Cost estimates are part of architecture review; engineers use cost calculators before building', value: 3 },
          { label: 'Real-time cost impact predictions are embedded in the IDE and CI/CD pipeline', value: 4 },
        ],
      },
      {
        q: 'How mature is FinOps as a practice in your organisation?',
        options: [
          { label: 'No dedicated FinOps capability — spend management happens reactively in finance', value: 1 },
          { label: 'A FinOps function exists but lacks executive sponsorship and engineering engagement', value: 2 },
          { label: 'A mature FinOps practice with a cross-functional team, regular reviews, and a roadmap', value: 3 },
          { label: 'FinOps is embedded into SDLC processes, OKRs, and financial planning cycles', value: 4 },
        ],
      },
      {
        q: 'How are FinOps wins communicated across the organisation?',
        options: [
          { label: 'Savings are not tracked or communicated — the work is invisible to most of the organisation', value: 1 },
          { label: 'Finance reports savings but engineering teams are not credited or motivated by the results', value: 2 },
          { label: 'Regular FinOps updates at all-hands and team level that recognise team contributions', value: 3 },
          { label: 'AI-generated savings summaries distributed automatically with team attribution and benchmarking', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'Optimisation',
    icon: TrendingDown,
    colorClass: 'text-orange-600 dark:text-orange-400',
    bgClass: 'bg-orange-50 dark:bg-orange-900/20',
    borderClass: 'border-orange-300 dark:border-orange-700',
    questions: [
      {
        q: 'How do you manage reserved instance and savings plan coverage?',
        options: [
          { label: 'All workloads run on-demand — no commitments or savings plans in place', value: 1 },
          { label: 'Some reservations exist but coverage analysis and renewal are ad hoc', value: 2 },
          { label: 'A formal commitment strategy with regular coverage reviews tied to forecast', value: 3 },
          { label: 'AI continuously optimises commitment coverage, balancing flexibility and maximum savings', value: 4 },
        ],
      },
      {
        q: 'How are idle and underutilised resources managed?',
        options: [
          { label: 'Idle resources accumulate indefinitely — there is no cleanup process', value: 1 },
          { label: 'Periodic manual reviews, typically triggered by a spike in the monthly bill', value: 2 },
          { label: 'Automated detection and scheduled cleanup policies for idle and orphaned resources', value: 3 },
          { label: 'AI continuously identifies waste and executes approved cleanup actions automatically', value: 4 },
        ],
      },
      {
        q: 'How mature is your workload rightsizing practice?',
        options: [
          { label: 'Resources are provisioned once at initial size and never reviewed', value: 1 },
          { label: 'Annual rightsizing reviews, applied manually with significant delay', value: 2 },
          { label: 'Regular rightsizing with automated recommendations tracked through to implementation', value: 3 },
          { label: 'Continuous ML-driven rightsizing and instance family optimisation in real time', value: 4 },
        ],
      },
      {
        q: 'How do you optimise data transfer and egress costs?',
        options: [
          { label: 'Egress costs are not tracked — they appear as unexpected charges on the monthly bill', value: 1 },
          { label: 'Egress is monitored but optimisation is reactive after surprises appear', value: 2 },
          { label: 'Egress patterns are analysed; CDN, region co-location, and compression strategies applied', value: 3 },
          { label: 'AI models egress cost by architecture decision and recommends the lowest-cost data flow path', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'Forecasting & Planning',
    icon: BarChart2,
    colorClass: 'text-purple-600 dark:text-purple-400',
    bgClass: 'bg-purple-50 dark:bg-purple-900/20',
    borderClass: 'border-purple-300 dark:border-purple-700',
    questions: [
      {
        q: 'How do you forecast future cloud spend?',
        options: [
          { label: 'Next month\'s forecast is last month\'s bill plus a buffer — no model behind it', value: 1 },
          { label: 'Trend-based projections from 3–6 months of historical spend data', value: 2 },
          { label: 'Workload-level forecasts with business driver input (user growth, transaction volume)', value: 3 },
          { label: 'ML-driven forecasting by team and feature, calibrated continuously against actuals', value: 4 },
        ],
      },
      {
        q: 'How is the cloud budget set and managed?',
        options: [
          { label: 'Budget is set top-down by finance with no engineering input or bottom-up validation', value: 1 },
          { label: 'Engineering provides rough estimates but the process is disconnected from delivery plans', value: 2 },
          { label: 'Bottom-up budgeting based on workload plans with regular reforecasting through the year', value: 3 },
          { label: 'Dynamic budgets that adjust automatically based on business signals and AI-generated scenarios', value: 4 },
        ],
      },
      {
        q: 'How do you account for cloud cost in product pricing and unit economics?',
        options: [
          { label: 'Cloud cost is not factored into product pricing — contribution margins are unknown', value: 1 },
          { label: 'Rough cloud cost included in pricing, reviewed annually at best', value: 2 },
          { label: 'Unit economics model: cloud cost per transaction, per user, per revenue unit tracked monthly', value: 3 },
          { label: 'Real-time unit economics dashboard driving pricing decisions and architecture investment', value: 4 },
        ],
      },
      {
        q: 'How mature is your FinOps tooling and automation?',
        options: [
          { label: 'Using the native billing console only — no third-party tooling or automation', value: 1 },
          { label: 'Some automation or tooling in place but coverage is patchy and not integrated into workflows', value: 2 },
          { label: 'Full FinOps tooling stack integrated with engineering workflows and regular reviews', value: 3 },
          { label: 'AI-powered FinOps platform with anomaly detection, automated actions, and executive reporting', value: 4 },
        ],
      },
    ],
  },
];

const LAYER_NAMES: Record<number, string> = { 1: 'Crawl', 2: 'Walk', 3: 'Run', 4: 'Fly' };

const LAYER_META: Record<number, { label: string; description: string; color: string; bg: string }> = {
  1: {
    label: 'Layer 1 — Crawl',
    description: 'Cloud spend is not well understood. The highest-leverage move is tagging discipline and showback — you cannot optimise what you cannot see, and untagged resources are the #1 reason FinOps programmes fail.',
    color: 'text-slate-700 dark:text-slate-200',
    bg: 'bg-slate-100 dark:bg-slate-700',
  },
  2: {
    label: 'Layer 2 — Walk',
    description: 'Visibility is in place. The next step is accountability — moving from showback to chargeback, from awareness to engineering ownership of cloud cost.',
    color: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-100 dark:bg-blue-900/40',
  },
  3: {
    label: 'Layer 3 — Run',
    description: 'You have a mature FinOps practice. The frontier is real-time unit economics and ML-driven forecasting that ties cloud spend directly to business outcomes.',
    color: 'text-purple-700 dark:text-purple-300',
    bg: 'bg-purple-100 dark:bg-purple-900/40',
  },
  4: {
    label: 'Layer 4 — Fly',
    description: 'FinOps is embedded in how your organisation makes investment decisions. The focus is continuous self-optimisation and governance as workload complexity and team size scale.',
    color: 'text-teal-700 dark:text-teal-300',
    bg: 'bg-teal-100 dark:bg-teal-900/40',
  },
};

const RECOMMENDATIONS: Record<number, string[]> = {
  1: [
    'Define a tagging taxonomy today: team, environment, product, cost-centre. Enforce it with a policy that rejects untagged resource creation — manual compliance never reaches 90%.',
    'Build a showback dashboard for your top 5 engineering teams. Visibility alone changes behaviour — teams that can see their costs consistently spend less.',
    'Identify your top 3 cloud cost drivers from the last 3 months. 80% of your bill comes from 20% of your services. Start optimisation there, not at the edges.',
    'Set up a monthly FinOps review meeting with at least one engineer and one finance representative. The conversation itself creates the alignment that enables every other improvement.',
  ],
  2: [
    'Move from showback to chargeback. When engineering teams own cloud budgets, spend optimisation becomes self-reinforcing — you no longer need to push it from the centre.',
    'Buy your first Reserved Instance or Savings Plan for your steadiest baseline workload. Commit to 1 year — the ROI is typically 30–40% savings versus on-demand pricing.',
    'Define unit economics for your top product: cost per active user or cost per transaction. This metric tells you whether growth is improving or degrading your margins.',
    'Schedule quarterly rightsizing reviews. AWS Trusted Advisor, Azure Advisor, and GCP Recommender surface high-confidence recommendations — the implementation effort is usually days, not weeks.',
  ],
  3: [
    'Implement ML-based cost anomaly detection. Rule-based alerting misses the gradual patterns that cause the most expensive cost surprises — the ones that compound over weeks.',
    'Build a FinOps champions network across engineering teams. The practice scales through distributed influence, not central mandates.',
    'Connect cloud cost forecasts to your OKR planning cycle. FinOps should inform product investment decisions, not just report on past spend.',
    'Pilot AI-driven commitment optimisation. At this maturity level, the marginal gains from manual management are small — automation multiplies the impact with less effort.',
  ],
  4: [
    'Audit your automated optimisation actions regularly. The risk at this layer is AI making cost-savings decisions that compromise reliability, performance, or developer experience.',
    'Build cross-team unit economics benchmarking. Comparing cost-per-unit across similar workloads surfaces efficiency opportunities that are invisible to individual teams.',
    'Publish your FinOps practices as an internal playbook or FinOps Foundation case study. Your approach is a benchmark and the community benefits from the specifics.',
    'Ensure your AI actions have a clear human escalation path and an audit trail. Automated FinOps at scale requires governance, not just guardrails.',
  ],
};

const NUM_PILLARS = PILLARS.length;
const EMAIL_STEP = NUM_PILLARS + 1;
const RESULTS_STEP = NUM_PILLARS + 2;
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx03K6mwLMtq6X5q8JIAHKQ4qSxCk9LEavNeO0IWo1jg9IxhzFoxvZM0DwKtgMegKDz1Q/exec';
const TOTAL_QUESTIONS = PILLARS.reduce((n, p) => n + p.questions.length, 0);

interface PillarScore { key: string; score: number; layer: number; }

const computeScores = (answers: Answers): PillarScore[] =>
  PILLARS.map((p, pIdx) => {
    const vals = p.questions.map((_, qIdx) => answers[`${pIdx}-${qIdx}`]).filter((v): v is number => v !== undefined);
    const score = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 1;
    const layer = score < 1.5 ? 1 : score < 2.5 ? 2 : score < 3.5 ? 3 : 4;
    return { key: p.key, score, layer };
  });

const generateReportHTML = (overallLayer: number, scores: PillarScore[], email: string): string => {
  const meta = LAYER_META[overallLayer];
  const recs = RECOMMENDATIONS[overallLayer];
  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const weakest = [...scores].sort((a, b) => a.score - b.score)[0];
  const pillarRows = scores.map(p => {
    const pct = Math.max(3, Math.round(((p.score - 1) / 3) * 100));
    return `<tr><td style="padding:10px 0;font-weight:600;color:#271789;width:160px;font-size:14px">${p.key}</td><td style="padding:10px 12px 10px 0;"><div style="background:#e2e8f0;border-radius:6px;height:10px;overflow:hidden"><div style="width:${pct}%;background:#271789;height:100%;border-radius:6px"></div></div></td><td style="padding:10px 0;white-space:nowrap;font-size:13px;font-weight:700;color:#271789;width:120px">Layer ${p.layer} — ${LAYER_NAMES[p.layer]}</td></tr>`;
  }).join('');
  const recItems = recs.map((r, i) => `<li style="margin-bottom:14px;color:#374151;line-height:1.65;font-size:13px"><strong style="color:#271789">${i + 1}.</strong> ${r}</li>`).join('');
  const weakestNote = weakest.layer < overallLayer ? `<div style="margin-top:14px;padding:12px 16px;background:#fef9c3;border-left:4px solid #f59e0b;border-radius:4px;font-size:13px;color:#78350f"><strong>Constraint pillar: ${weakest.key} (Layer ${weakest.layer})</strong> — This is your weakest area. Prioritise it to unlock overall FinOps maturity.</div>` : '';
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>FinOps Maturity Report — nthakur.com</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;background:#fff;max-width:800px;margin:0 auto}@page{margin:15mm 18mm}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style></head><body>
<div style="background:#271789;color:#fff;padding:32px 40px;border-radius:10px 10px 0 0"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:20px"><div><div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#00f1d4;margin-bottom:10px">FinOps Maturity Assessment</div><h1 style="font-size:26px;font-weight:800;line-height:1.2;margin-bottom:8px">Your Maturity Report</h1><div style="font-size:13px;color:#cbd5e1">Generated ${date} · nthakur.com</div></div><div style="text-align:right;flex-shrink:0"><div style="font-size:11px;color:#94a3b8;margin-bottom:4px">Prepared for</div><div style="font-size:13px;font-weight:600;color:#e2e8f0">${email}</div></div></div></div>
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-top:none;padding:28px 40px"><div style="display:flex;align-items:center;gap:24px"><div style="text-align:center;background:#271789;color:#fff;border-radius:10px;padding:18px 24px;min-width:100px;flex-shrink:0"><div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#00f1d4;margin-bottom:6px">Overall</div><div style="font-size:40px;font-weight:900;line-height:1">L${overallLayer}</div><div style="font-size:12px;font-weight:600;color:#e2e8f0;margin-top:5px">${LAYER_NAMES[overallLayer]}</div></div><div><h2 style="font-size:19px;font-weight:700;color:#271789;margin-bottom:8px">${meta.label}</h2><p style="font-size:13px;color:#475569;line-height:1.7;max-width:500px">${meta.description}</p></div></div></div>
<div style="border:1px solid #e2e8f0;border-top:none;padding:28px 40px"><h2 style="font-size:13px;font-weight:700;color:#271789;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:18px">Score by Pillar</h2><table style="width:100%;border-collapse:collapse">${pillarRows}</table>${weakestNote}</div>
<div style="border:1px solid #e2e8f0;border-top:none;padding:28px 40px"><h2 style="font-size:13px;font-weight:700;color:#271789;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:16px">Recommended Next Steps</h2><ol style="list-style:none;padding:0">${recItems}</ol></div>
<div style="background:#271789;color:#fff;padding:28px 40px;border-radius:0 0 10px 10px"><h2 style="font-size:17px;font-weight:700;margin-bottom:8px">Want a FinOps transformation roadmap for your organisation?</h2><p style="font-size:13px;color:#e2e8f0;line-height:1.65;margin-bottom:12px">Naval offers FinOps advisory engagements and workshops built around your actual maturity level — from initial tagging strategy through to ML-driven cost intelligence.</p><div style="font-size:13px;color:#00f1d4;font-weight:700">Book at nthakur.com/work-with-me</div></div>
<div style="padding:18px 40px;text-align:center"><p style="font-size:11px;color:#94a3b8">© ${new Date().getFullYear()} Naval Thakur · nthakur.com · Results are based on self-reported responses and are indicative, not prescriptive.</p></div>
</body></html>`;
};

const FinOpsAssessment: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'submitting' | 'error'>('idle');

  const pillarIdx = step - 1;
  const currentPillar = step >= 1 && step <= NUM_PILLARS ? PILLARS[pillarIdx] : null;
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);
  const pillarComplete = currentPillar ? currentPillar.questions.every((_, qIdx) => answers[`${pillarIdx}-${qIdx}`] !== undefined) : false;
  const pillarScores = computeScores(answers);
  const overallScore = pillarScores.reduce((s, p) => s + p.score, 0) / pillarScores.length;
  const overallLayer = overallScore < 1.5 ? 1 : overallScore < 2.5 ? 2 : overallScore < 3.5 ? 3 : 4;
  const overallMeta = LAYER_META[overallLayer];
  const weakest = [...pillarScores].sort((a, b) => a.score - b.score)[0];
  const setAnswer = (pIdx: number, qIdx: number, value: number) => setAnswers(prev => ({ ...prev, [`${pIdx}-${qIdx}`]: value }));

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setEmailStatus('submitting');
    try {
      const form = new FormData();
      form.append('email', email); form.append('name', name || 'Assessment Respondent');
      form.append('topic', 'FinOps Maturity Assessment');
      form.append('message', `FinOps assessment complete. Overall: Layer ${overallLayer} (${LAYER_NAMES[overallLayer]}). ` + pillarScores.map(p => `${p.key}=L${p.layer}`).join(', '));
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: form, mode: 'no-cors' });
      setStep(RESULTS_STEP);
    } catch { setEmailStatus('error'); }
  };

  const handleDownloadPDF = () => {
    const html = generateReportHTML(overallLayer, pillarScores, email);
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(html); win.document.close(); win.focus();
    setTimeout(() => win.print(), 400);
  };

  const reset = () => { setStep(0); setAnswers({}); setEmail(''); setName(''); setEmailStatus('idle'); };

  if (step === 0) return (
    <>
      <SEO title="FinOps Maturity Assessment | Naval Thakur" description={`${TOTAL_QUESTIONS} questions across Visibility, Accountability, Optimisation, and Forecasting. Find your FinOps maturity stage and download a personalised report.`} />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 text-secondary-dark dark:text-secondary text-sm font-bold mb-6">FinOps Maturity Assessment</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Where does your organisation sit on the FinOps curve?</h1>
          <p className="text-xl text-slate-200 max-w-2xl leading-relaxed">{TOTAL_QUESTIONS} questions across four pillars. About 4 minutes. Receive your FinOps maturity stage, a per-pillar breakdown, and a downloadable PDF report.</p>
        </div>
      </div>
      <Section bg="white">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {PILLARS.map(p => (<div key={p.key} className={`rounded-xl border p-4 text-center ${p.bgClass} ${p.borderClass}`}><p.icon className={`w-7 h-7 mx-auto mb-2 ${p.colorClass}`} /><div className="text-sm font-bold text-slate-700 dark:text-slate-200">{p.key}</div><div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{p.questions.length} questions</div></div>))}
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">What you will get</h3>
            <ul className="space-y-2">{['Your FinOps maturity stage (Crawl → Walk → Run → Fly)', 'Per-pillar scores with a visual breakdown', 'Prioritised recommendations for your next stage', 'A downloadable PDF report for your records'].map(item => (<li key={item} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-4 h-4 text-secondary-dark dark:text-secondary shrink-0" />{item}</li>))}</ul>
          </div>
          <button onClick={() => setStep(1)} className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors text-lg shadow-lg">Start Assessment <ArrowRight size={20} className="ml-2" /></button>
        </div>
      </Section>
    </>
  );

  if (step >= 1 && step <= NUM_PILLARS && currentPillar) {
    const PIcon = currentPillar.icon;
    return (
      <>
        <SEO title="FinOps Maturity Assessment | Naval Thakur" description="FinOps Maturity Assessment in progress." />
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-3 flex items-center gap-4">
            <span className="text-xs font-bold text-slate-500 shrink-0">Pillar {step} of {NUM_PILLARS}</span>
            <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden"><div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} /></div>
            <span className="text-xs font-bold text-primary dark:text-secondary shrink-0">{progress}%</span>
          </div>
        </div>
        <Section bg="white">
          <div className="max-w-3xl mx-auto">
            <div className={`rounded-xl border p-5 mb-8 flex items-center gap-4 ${currentPillar.bgClass} ${currentPillar.borderClass}`}>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-900"><PIcon className={`w-6 h-6 ${currentPillar.colorClass}`} /></div>
              <div><div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Pillar {step} of {NUM_PILLARS}</div><div className="text-xl font-bold text-slate-900 dark:text-white">{currentPillar.key}</div></div>
            </div>
            <div className="space-y-6">
              {currentPillar.questions.map((q, qIdx) => {
                const selected = answers[`${pillarIdx}-${qIdx}`];
                return (
                  <div key={qIdx} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                    <p className="font-semibold text-slate-900 dark:text-white mb-4 leading-snug"><span className="text-primary dark:text-secondary font-bold mr-2">Q{qIdx + 1}.</span>{q.q}</p>
                    <div className="space-y-2">{q.options.map(opt => (<button key={opt.value} onClick={() => setAnswer(pillarIdx, qIdx, opt.value)} className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${selected === opt.value ? 'border-primary bg-primary/5 dark:bg-primary/20 text-primary dark:text-white font-semibold' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary/40 hover:bg-slate-50 dark:hover:bg-slate-700'}`}><span className="inline-flex items-center gap-3"><span className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${selected === opt.value ? 'border-primary bg-primary' : 'border-slate-300 dark:border-slate-600'}`}>{selected === opt.value && <span className="w-2 h-2 rounded-full bg-white block" />}</span>{opt.label}</span></button>))}</div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button onClick={() => setStep(s => s - 1)} className="inline-flex items-center gap-2 px-5 py-2.5 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white font-medium text-sm transition-colors"><ArrowLeft size={16} /> Back</button>
              <button onClick={() => setStep(s => s + 1)} disabled={!pillarComplete} className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm shadow-md">{step === NUM_PILLARS ? 'Get My Results' : 'Next Pillar'} <ArrowRight size={16} /></button>
            </div>
          </div>
        </Section>
      </>
    );
  }

  if (step === EMAIL_STEP) return (
    <>
      <SEO title="FinOps Maturity Assessment | Naval Thakur" description="Assessment complete — unlock your results." />
      <div className="bg-primary text-white py-20"><div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center"><CheckCircle2 className="w-12 h-12 text-secondary mx-auto mb-4" /><h1 className="text-4xl font-bold mb-4">Assessment complete.</h1><p className="text-xl text-slate-200 leading-relaxed">Enter your email to unlock your full results and download your personalised PDF report.</p></div></div>
      <Section bg="white">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleEmailSubmit} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-lg space-y-4">
            <div><label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Name</label><input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm transition" /></div>
            <div><label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Work email <span className="text-red-500">*</span></label><input type="email" placeholder="you@company.com" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm transition" /></div>
            {emailStatus === 'error' && (<div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"><AlertCircle size={16} />Something went wrong.{' '}<button type="button" onClick={() => setStep(RESULTS_STEP)} className="underline font-semibold">Skip and view results</button></div>)}
            <button type="submit" disabled={emailStatus === 'submitting'} className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60 shadow-md">{emailStatus === 'submitting' ? <Loader2 className="animate-spin" size={18} /> : <><Mail size={18} /> View My Results</>}</button>
            <p className="text-xs text-slate-400 text-center">No spam. Unsubscribe anytime.</p>
          </form>
        </div>
      </Section>
    </>
  );

  return (
    <>
      <SEO title={`FinOps Results: ${LAYER_NAMES[overallLayer]} | Naval Thakur`} description={`Your organisation is at FinOps Layer ${overallLayer}: ${LAYER_NAMES[overallLayer]}.`} />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 text-secondary-dark dark:text-secondary text-sm font-bold mb-6">Your Results</div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="bg-secondary/10 border-2 border-secondary/40 rounded-2xl px-8 py-5 text-center shrink-0"><div className="text-xs font-bold uppercase tracking-widest text-secondary mb-1">Overall</div><div className="text-5xl font-black text-white leading-none">L{overallLayer}</div><div className="text-sm font-bold text-slate-200 mt-2">{LAYER_NAMES[overallLayer]}</div></div>
            <div><h1 className="text-3xl md:text-4xl font-bold mb-2">{overallMeta.label}</h1><p className="text-lg text-slate-200 leading-relaxed">{overallMeta.description}</p></div>
          </div>
        </div>
      </div>
      <Section bg="gray">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-secondary-dark dark:text-secondary" /> Score by Pillar</h2>
            <div className="space-y-5">{pillarScores.map(p => { const pd = PILLARS.find(x => x.key === p.key)!; const PIcon = pd.icon; const pct = Math.max(4, Math.round(((p.score - 1) / 3) * 100)); const lm = LAYER_META[p.layer]; return (<div key={p.key}><div className="flex items-center justify-between mb-2"><div className="flex items-center gap-2"><PIcon className={`w-4 h-4 ${pd.colorClass}`} /><span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{p.key}</span></div><span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${lm.bg} ${lm.color}`}>Layer {p.layer} — {LAYER_NAMES[p.layer]}</span></div><div className="bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden"><div className="h-3 rounded-full bg-primary transition-all duration-700" style={{ width: `${pct}%` }} /></div></div>); })}</div>
            {weakest.layer < overallLayer && (<div className="mt-5 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg"><p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed"><strong>Constraint pillar: {weakest.key}</strong> — This is your lowest score and the bottleneck limiting overall FinOps maturity. Prioritise improvements here first.</p></div>)}
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-5">Recommended Next Steps</h2>
            <ol className="space-y-4">{RECOMMENDATIONS[overallLayer].map((rec, i) => (<li key={i} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed"><span className="shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>{rec}</li>))}</ol>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={handleDownloadPDF} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-md"><Download size={18} /> Download PDF Report</button>
            <Link to="/contact?topic=FinOps Advisory" className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary dark:text-white dark:border-white font-bold rounded-xl hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary transition-colors">Book FinOps Advisory <ArrowRight size={16} /></Link>
          </div>
          <div className="text-center pt-2"><button onClick={reset} className="text-sm text-slate-400 hover:text-primary dark:hover:text-secondary transition-colors underline">Retake assessment</button></div>
        </div>
      </Section>
    </>
  );
};

export default FinOpsAssessment;
