import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowLeft, Download, Mail, Loader2, CheckCircle2,
  Database, GraduationCap, Scale, Rocket, AlertCircle, BarChart3,
} from 'lucide-react';
import Section from '../../components/Section';
import SEO from '../../components/SEO';

interface Option { label: string; value: number; }
interface Question { q: string; options: Option[]; }
interface PillarDef { key: string; icon: React.ElementType; colorClass: string; bgClass: string; borderClass: string; questions: Question[]; }
type Answers = Record<string, number>;

const PILLARS: PillarDef[] = [
  {
    key: 'Foundation & Data',
    icon: Database,
    colorClass: 'text-blue-600 dark:text-blue-400',
    bgClass: 'bg-blue-50 dark:bg-blue-900/20',
    borderClass: 'border-blue-300 dark:border-blue-700',
    questions: [
      {
        q: 'How ready is your data infrastructure for AI workloads?',
        options: [
          { label: 'Data is siloed in multiple systems with no unified access layer or catalogue', value: 1 },
          { label: 'Some data centralisation exists but quality, lineage, and access controls are inconsistent', value: 2 },
          { label: 'A governed data platform with quality SLAs, documented lineage, and controlled access', value: 3 },
          { label: 'AI-ready data mesh with automated quality gates, vector stores, and real-time feature pipelines', value: 4 },
        ],
      },
      {
        q: 'How do you manage the AI models and APIs your teams use?',
        options: [
          { label: 'Teams access AI models independently with no central catalogue or governance', value: 1 },
          { label: 'An approved tool list exists but usage, cost, and output quality are not monitored', value: 2 },
          { label: 'A model registry with version control, usage tracking, cost attribution, and quality benchmarks', value: 3 },
          { label: 'AI platform that routes requests optimally across models based on cost, latency, and task type', value: 4 },
        ],
      },
      {
        q: 'How is sensitive data protected when using AI tools and services?',
        options: [
          { label: 'No data handling policy for AI — teams use whatever data is convenient', value: 1 },
          { label: 'Some guidance exists but it is not enforced and exceptions are common', value: 2 },
          { label: 'Enforced data classification with AI use restricted based on data sensitivity level', value: 3 },
          { label: 'Automated data masking, synthetic data generation, and real-time policy enforcement for AI inputs', value: 4 },
        ],
      },
      {
        q: 'How mature is your AI/ML infrastructure?',
        options: [
          { label: 'No dedicated AI infrastructure — models run ad hoc via consumer APIs or developer machines', value: 1 },
          { label: 'Cloud AI services used (Azure OpenAI, Bedrock, Vertex AI) but with no operational standards', value: 2 },
          { label: 'Standardised AI platform with MLOps practices: versioning, monitoring, and rollback capability', value: 3 },
          { label: 'Full LLMOps stack: experiment tracking, evaluation pipelines, canary deployments, and cost guardrails', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'Team & Skills',
    icon: GraduationCap,
    colorClass: 'text-green-600 dark:text-green-400',
    bgClass: 'bg-green-50 dark:bg-green-900/20',
    borderClass: 'border-green-300 dark:border-green-700',
    questions: [
      {
        q: 'How AI-literate is your engineering organisation?',
        options: [
          { label: 'AI is understood conceptually by a few enthusiasts but has not reached mainstream engineering', value: 1 },
          { label: 'Most engineers have used AI coding tools but understand little about prompting, RAG, or agents', value: 2 },
          { label: 'Cross-functional AI literacy: engineers, PMs, and architects can design and evaluate AI-powered solutions', value: 3 },
          { label: 'Embedded AI fluency at every level — teams design, build, and operate AI systems as a core competency', value: 4 },
        ],
      },
      {
        q: 'Do you have dedicated AI/ML engineering capability?',
        options: [
          { label: 'No dedicated AI capability — all work is outsourced or done by occasional contributors', value: 1 },
          { label: 'One or two AI-capable individuals, typically data scientists without engineering support', value: 2 },
          { label: 'A cross-functional AI team with ML engineers, data engineers, and product ownership', value: 3 },
          { label: 'AI capability embedded in every product team, supported by a central AI platform team', value: 4 },
        ],
      },
      {
        q: 'How are AI skills developed and maintained?',
        options: [
          { label: 'Learning is self-directed with no structured programme or organisational support', value: 1 },
          { label: 'Training budget allocated but not tied to specific AI delivery goals or skills gaps', value: 2 },
          { label: 'Structured AI learning paths, communities of practice, and regular internal showcases', value: 3 },
          { label: 'AI identifies skill gaps from project signals and surfaces targeted learning at the point of need', value: 4 },
        ],
      },
      {
        q: 'How does leadership understand and engage with AI strategy?',
        options: [
          { label: 'AI is seen as an IT initiative — business leadership is not actively engaged', value: 1 },
          { label: 'Leadership is interested but AI strategy is not connected to business outcomes or OKRs', value: 2 },
          { label: 'Defined AI strategy with executive sponsorship, linked OKRs, and board-level visibility', value: 3 },
          { label: 'Leadership makes product and investment decisions using AI-generated business intelligence', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'Governance & Risk',
    icon: Scale,
    colorClass: 'text-orange-600 dark:text-orange-400',
    bgClass: 'bg-orange-50 dark:bg-orange-900/20',
    borderClass: 'border-orange-300 dark:border-orange-700',
    questions: [
      {
        q: 'How do you govern AI use across the organisation?',
        options: [
          { label: 'No AI policy — teams decide independently what tools to use and how', value: 1 },
          { label: 'A basic AI policy exists: approved tools list and broad data handling guidance', value: 2 },
          { label: 'Formal AI governance framework: use case review, risk classification, and model approval process', value: 3 },
          { label: 'Automated governance with real-time usage auditing, cost guardrails, and policy enforcement', value: 4 },
        ],
      },
      {
        q: 'How do you manage AI risk, bias, and output quality?',
        options: [
          { label: 'AI risk is not formally assessed — risks are assumed acceptable', value: 1 },
          { label: 'Risk is considered informally but there is no structured assessment or documented mitigations', value: 2 },
          { label: 'AI risk assessments per use case with documented mitigations and ongoing review', value: 3 },
          { label: 'Continuous model monitoring for drift, bias, and quality with automated rollback triggers', value: 4 },
        ],
      },
      {
        q: 'How do you ensure AI outputs are accurate and trustworthy?',
        options: [
          { label: 'Outputs are accepted at face value — no validation or human review process exists', value: 1 },
          { label: 'Human review of AI outputs is required but inconsistently applied in practice', value: 2 },
          { label: 'Structured human-in-the-loop processes for high-stakes decisions; output quality tracked over time', value: 3 },
          { label: 'Automated evaluation pipelines assess output quality continuously; confidence scoring gates AI actions', value: 4 },
        ],
      },
      {
        q: 'How is AI spend tracked and governed?',
        options: [
          { label: 'AI costs are unknown — they appear on the cloud bill without attribution or context', value: 1 },
          { label: 'AI costs tracked at account level but not by team, use case, or value delivered', value: 2 },
          { label: 'Per-use-case cost attribution with budget approval required for new AI workloads', value: 3 },
          { label: 'Real-time AI FinOps: cost per AI interaction, per business outcome, optimised automatically', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'Adoption & Value',
    icon: Rocket,
    colorClass: 'text-purple-600 dark:text-purple-400',
    bgClass: 'bg-purple-50 dark:bg-purple-900/20',
    borderClass: 'border-purple-300 dark:border-purple-700',
    questions: [
      {
        q: 'Which AI use cases have moved to production in your organisation?',
        options: [
          { label: 'No AI in production — pilots running or still in planning stage', value: 1 },
          { label: 'One or two AI-assisted features in production, primarily developer tooling such as Copilot', value: 2 },
          { label: 'Multiple AI use cases in production across different functions: code, ops, support, analytics', value: 3 },
          { label: 'AI embedded across the value chain — from ideation and development to operations and customer experience', value: 4 },
        ],
      },
      {
        q: 'How do you measure the value and ROI of AI investments?',
        options: [
          { label: 'Value is not measured — ROI is assumed to be positive', value: 1 },
          { label: 'Qualitative measures only: developer satisfaction and perceived speed improvements', value: 2 },
          { label: 'Quantitative metrics: DORA improvement, cost reduction, support deflection, time saved per task', value: 3 },
          { label: 'Full ROI model: AI spend vs. business outcome per use case, continuously monitored and optimised', value: 4 },
        ],
      },
      {
        q: 'How do you scale successful AI pilots to production?',
        options: [
          { label: 'No path from pilot to production — pilots succeed then stall indefinitely', value: 1 },
          { label: 'Some pilots have scaled but the process is ad hoc and depends on individual champions', value: 2 },
          { label: 'Defined scaling playbook: productionisation checklist, monitoring standards, and support model', value: 3 },
          { label: 'AI-assisted production readiness assessment that predicts scaling risks and recommends mitigations', value: 4 },
        ],
      },
      {
        q: 'How do you foster AI innovation across the organisation?',
        options: [
          { label: 'Innovation is limited to dedicated R&D or isolated passion projects', value: 1 },
          { label: 'Hackathons or innovation days occur but ideas rarely reach production', value: 2 },
          { label: 'Structured innovation programme: ideation, PoC, value assessment, and production pathway', value: 3 },
          { label: 'Embedded innovation culture with AI-assisted idea screening, fast-fail funding, and cross-team scaling', value: 4 },
        ],
      },
    ],
  },
];

const LAYER_NAMES: Record<number, string> = { 1: 'Exploring', 2: 'Experimenting', 3: 'Scaling', 4: 'Leading' };

const LAYER_META: Record<number, { label: string; description: string; color: string; bg: string }> = {
  1: {
    label: 'Layer 1 — Exploring',
    description: 'AI is on the agenda but not yet delivering value. The highest-leverage move is identifying one high-value, low-risk use case and running a structured pilot with clear success criteria.',
    color: 'text-slate-700 dark:text-slate-200',
    bg: 'bg-slate-100 dark:bg-slate-700',
  },
  2: {
    label: 'Layer 2 — Experimenting',
    description: 'You have working AI applications. The next step is moving from pilots to platforms — standardising how AI is built, deployed, and measured so the learning compounds across teams.',
    color: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-100 dark:bg-blue-900/40',
  },
  3: {
    label: 'Layer 3 — Scaling',
    description: 'AI is delivering real value. The frontier is governance at scale — ensuring AI usage remains safe, cost-effective, and aligned with business outcomes as the footprint grows.',
    color: 'text-purple-700 dark:text-purple-300',
    bg: 'bg-purple-100 dark:bg-purple-900/40',
  },
  4: {
    label: 'Layer 4 — Leading',
    description: 'AI is a core operational and competitive capability. The focus is continuous improvement of the AI system itself — models, governance frameworks, and the feedback loops that keep AI aligned and effective.',
    color: 'text-teal-700 dark:text-teal-300',
    bg: 'bg-teal-100 dark:bg-teal-900/40',
  },
};

const RECOMMENDATIONS: Record<number, string[]> = {
  1: [
    'Pick one high-value, low-risk use case and run a structured 4-week pilot. Code assistance for developers is the fastest win — GitHub Copilot or Cursor, measured by DORA metrics before and after.',
    'Define a minimal AI policy before expanding adoption: approved models, data classification rules, and a short list of prohibited use cases. Three pages is enough to start.',
    'Build AI literacy through practical exposure, not just training. Teams learn faster by doing than by watching demos — pair someone with experience with someone building their first AI feature.',
    'Identify your AI champion: someone with both technical credibility and business context who can bridge the gap between experimentation and production.',
  ],
  2: [
    'Build an internal AI platform, even a minimal one: a model registry, a cost dashboard, and a set of approved API wrappers. Without this, every team reinvents the same infrastructure.',
    'Implement AI output logging from day one. You cannot improve what you cannot measure, and model behaviour changes over time in ways that are invisible without logging.',
    'Define your risk classification for AI use cases. Not all AI decisions carry the same risk — a clear framework tells teams where human oversight is required versus where autonomy is acceptable.',
    'Run a team AI showcase monthly. The most effective driver of adoption is engineers seeing peers succeed with AI, not leadership mandates from above.',
  ],
  3: [
    'Implement continuous model evaluation. Models degrade — business context changes, user behaviour shifts, and the model you shipped is not the model running 6 months later.',
    'Move AI governance from policy documents to code. OPA, Guardrails AI, or custom evaluation pipelines enforce policy at runtime, not at review time when it is too late.',
    'Build an AI ROI model per use case. Connect AI investment to business outcomes — cost per support ticket resolved, revenue per AI-assisted interaction, DORA delta per tool.',
    'Expand AI into operations, not just development. AI-assisted incident triage, cost anomaly analysis, and capacity forecasting multiply the value of your existing DevOps investment.',
  ],
  4: [
    'Audit your autonomous AI actions regularly. The risk shifts from under-adoption to AI acting in ways that have unintended consequences at scale — with no human in the loop to catch them.',
    'Build a model lifecycle management practice. Deprecating and replacing models is as important as deploying new ones — your governance must handle both directions.',
    'Publish your AI operating model as an internal case study or external community contribution. You are operating at the frontier and the community benefits from your specifics.',
    'Focus leadership attention on AI ethics and trust. The organisations that sustain competitive advantage at this layer are those that earn user and regulatory trust, not just those that deploy the most models.',
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
  const meta = LAYER_META[overallLayer]; const recs = RECOMMENDATIONS[overallLayer];
  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const weakest = [...scores].sort((a, b) => a.score - b.score)[0];
  const pillarRows = scores.map(p => { const pct = Math.max(3, Math.round(((p.score - 1) / 3) * 100)); return `<tr><td style="padding:10px 0;font-weight:600;color:#271789;width:160px;font-size:14px">${p.key}</td><td style="padding:10px 12px 10px 0;"><div style="background:#e2e8f0;border-radius:6px;height:10px;overflow:hidden"><div style="width:${pct}%;background:#271789;height:100%;border-radius:6px"></div></div></td><td style="padding:10px 0;white-space:nowrap;font-size:13px;font-weight:700;color:#271789;width:140px">Layer ${p.layer} — ${LAYER_NAMES[p.layer]}</td></tr>`; }).join('');
  const recItems = recs.map((r, i) => `<li style="margin-bottom:14px;color:#374151;line-height:1.65;font-size:13px"><strong style="color:#271789">${i + 1}.</strong> ${r}</li>`).join('');
  const weakestNote = weakest.layer < overallLayer ? `<div style="margin-top:14px;padding:12px 16px;background:#fef9c3;border-left:4px solid #f59e0b;border-radius:4px;font-size:13px;color:#78350f"><strong>Constraint pillar: ${weakest.key} (Layer ${weakest.layer})</strong> — This area is limiting your overall GenAI readiness. Prioritise it to unblock broader adoption.</div>` : '';
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>GenAI Readiness Report — nthakur.com</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;background:#fff;max-width:800px;margin:0 auto}@page{margin:15mm 18mm}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style></head><body>
<div style="background:#271789;color:#fff;padding:32px 40px;border-radius:10px 10px 0 0"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:20px"><div><div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#00f1d4;margin-bottom:10px">GenAI Readiness Assessment</div><h1 style="font-size:26px;font-weight:800;line-height:1.2;margin-bottom:8px">Your Readiness Report</h1><div style="font-size:13px;color:#cbd5e1">Generated ${date} · nthakur.com</div></div><div style="text-align:right;flex-shrink:0"><div style="font-size:11px;color:#94a3b8;margin-bottom:4px">Prepared for</div><div style="font-size:13px;font-weight:600;color:#e2e8f0">${email}</div></div></div></div>
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-top:none;padding:28px 40px"><div style="display:flex;align-items:center;gap:24px"><div style="text-align:center;background:#271789;color:#fff;border-radius:10px;padding:18px 24px;min-width:100px;flex-shrink:0"><div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#00f1d4;margin-bottom:6px">Overall</div><div style="font-size:40px;font-weight:900;line-height:1">L${overallLayer}</div><div style="font-size:12px;font-weight:600;color:#e2e8f0;margin-top:5px">${LAYER_NAMES[overallLayer]}</div></div><div><h2 style="font-size:19px;font-weight:700;color:#271789;margin-bottom:8px">${meta.label}</h2><p style="font-size:13px;color:#475569;line-height:1.7;max-width:500px">${meta.description}</p></div></div></div>
<div style="border:1px solid #e2e8f0;border-top:none;padding:28px 40px"><h2 style="font-size:13px;font-weight:700;color:#271789;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:18px">Score by Pillar</h2><table style="width:100%;border-collapse:collapse">${pillarRows}</table>${weakestNote}</div>
<div style="border:1px solid #e2e8f0;border-top:none;padding:28px 40px"><h2 style="font-size:13px;font-weight:700;color:#271789;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:16px">Recommended Next Steps</h2><ol style="list-style:none;padding:0">${recItems}</ol></div>
<div style="background:#271789;color:#fff;padding:28px 40px;border-radius:0 0 10px 10px"><h2 style="font-size:17px;font-weight:700;margin-bottom:8px">Want a GenAI adoption roadmap for your organisation?</h2><p style="font-size:13px;color:#e2e8f0;line-height:1.65;margin-bottom:12px">Naval offers GenAI advisory engagements and workshops built around your actual readiness level — from first pilot through to enterprise-scale AI operations.</p><div style="font-size:13px;color:#00f1d4;font-weight:700">Book at nthakur.com/work-with-me</div></div>
<div style="padding:18px 40px;text-align:center"><p style="font-size:11px;color:#94a3b8">© ${new Date().getFullYear()} Naval Thakur · nthakur.com · Results are based on self-reported responses and are indicative, not prescriptive.</p></div>
</body></html>`;
};

const GenAIAssessment: React.FC = () => {
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
      form.append('topic', 'GenAI Readiness Assessment');
      form.append('message', `GenAI assessment complete. Overall: Layer ${overallLayer} (${LAYER_NAMES[overallLayer]}). ` + pillarScores.map(p => `${p.key}=L${p.layer}`).join(', '));
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
      <SEO title="GenAI Readiness Assessment | Naval Thakur" description={`${TOTAL_QUESTIONS} questions across Foundation, Team & Skills, Governance, and Adoption. Find your GenAI readiness level and download a personalised report.`} />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 text-secondary-dark dark:text-secondary text-sm font-bold mb-6">GenAI Readiness Assessment</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Is your organisation ready to operationalise AI?</h1>
          <p className="text-xl text-slate-200 max-w-2xl leading-relaxed">{TOTAL_QUESTIONS} questions across four pillars. About 4 minutes. Receive your GenAI readiness level, a per-pillar breakdown, and a downloadable PDF report.</p>
        </div>
      </div>
      <Section bg="white">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">{PILLARS.map(p => (<div key={p.key} className={`rounded-xl border p-4 text-center ${p.bgClass} ${p.borderClass}`}><p.icon className={`w-7 h-7 mx-auto mb-2 ${p.colorClass}`} /><div className="text-sm font-bold text-slate-700 dark:text-slate-200">{p.key}</div><div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{p.questions.length} questions</div></div>))}</div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8"><h3 className="font-bold text-slate-900 dark:text-white mb-3">What you will get</h3><ul className="space-y-2">{['Your GenAI readiness level (Exploring → Experimenting → Scaling → Leading)', 'Per-pillar scores with a visual breakdown', 'Actionable recommendations for your next level', 'A downloadable PDF report for your records'].map(item => (<li key={item} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-4 h-4 text-secondary-dark dark:text-secondary shrink-0" />{item}</li>))}</ul></div>
          <button onClick={() => setStep(1)} className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors text-lg shadow-lg">Start Assessment <ArrowRight size={20} className="ml-2" /></button>
        </div>
      </Section>
    </>
  );

  if (step >= 1 && step <= NUM_PILLARS && currentPillar) {
    const PIcon = currentPillar.icon;
    return (
      <>
        <SEO title="GenAI Readiness Assessment | Naval Thakur" description="GenAI Readiness Assessment in progress." />
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-3 flex items-center gap-4">
            <span className="text-xs font-bold text-slate-500 shrink-0">Pillar {step} of {NUM_PILLARS}</span>
            <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden"><div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} /></div>
            <span className="text-xs font-bold text-primary dark:text-secondary shrink-0">{progress}%</span>
          </div>
        </div>
        <Section bg="white">
          <div className="max-w-3xl mx-auto">
            <div className={`rounded-xl border p-5 mb-8 flex items-center gap-4 ${currentPillar.bgClass} ${currentPillar.borderClass}`}><div className="p-2 rounded-lg bg-white dark:bg-slate-900"><PIcon className={`w-6 h-6 ${currentPillar.colorClass}`} /></div><div><div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Pillar {step} of {NUM_PILLARS}</div><div className="text-xl font-bold text-slate-900 dark:text-white">{currentPillar.key}</div></div></div>
            <div className="space-y-6">{currentPillar.questions.map((q, qIdx) => { const selected = answers[`${pillarIdx}-${qIdx}`]; return (<div key={qIdx} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm"><p className="font-semibold text-slate-900 dark:text-white mb-4 leading-snug"><span className="text-primary dark:text-secondary font-bold mr-2">Q{qIdx + 1}.</span>{q.q}</p><div className="space-y-2">{q.options.map(opt => (<button key={opt.value} onClick={() => setAnswer(pillarIdx, qIdx, opt.value)} className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${selected === opt.value ? 'border-primary bg-primary/5 dark:bg-primary/20 text-primary dark:text-white font-semibold' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary/40 hover:bg-slate-50 dark:hover:bg-slate-700'}`}><span className="inline-flex items-center gap-3"><span className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${selected === opt.value ? 'border-primary bg-primary' : 'border-slate-300 dark:border-slate-600'}`}>{selected === opt.value && <span className="w-2 h-2 rounded-full bg-white block" />}</span>{opt.label}</span></button>))}</div></div>); })}</div>
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
      <SEO title="GenAI Readiness Assessment | Naval Thakur" description="Assessment complete — unlock your results." />
      <div className="bg-primary text-white py-20"><div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center"><CheckCircle2 className="w-12 h-12 text-secondary mx-auto mb-4" /><h1 className="text-4xl font-bold mb-4">Assessment complete.</h1><p className="text-xl text-slate-200 leading-relaxed">Enter your email to unlock your full results and download your personalised PDF report.</p></div></div>
      <Section bg="white"><div className="max-w-md mx-auto"><form onSubmit={handleEmailSubmit} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-lg space-y-4"><div><label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Name</label><input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm transition" /></div><div><label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Work email <span className="text-red-500">*</span></label><input type="email" placeholder="you@company.com" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm transition" /></div>{emailStatus === 'error' && (<div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"><AlertCircle size={16} />Something went wrong.{' '}<button type="button" onClick={() => setStep(RESULTS_STEP)} className="underline font-semibold">Skip and view results</button></div>)}<button type="submit" disabled={emailStatus === 'submitting'} className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60 shadow-md">{emailStatus === 'submitting' ? <Loader2 className="animate-spin" size={18} /> : <><Mail size={18} /> View My Results</>}</button><p className="text-xs text-slate-400 text-center">No spam. Unsubscribe anytime.</p></form></div></Section>
    </>
  );

  return (
    <>
      <SEO title={`GenAI Results: ${LAYER_NAMES[overallLayer]} | Naval Thakur`} description={`Your organisation is at GenAI Layer ${overallLayer}: ${LAYER_NAMES[overallLayer]}.`} />
      <div className="bg-primary text-white py-20"><div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl"><div className="inline-block px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 text-secondary-dark dark:text-secondary text-sm font-bold mb-6">Your Results</div><div className="flex flex-col sm:flex-row items-start sm:items-center gap-6"><div className="bg-secondary/10 border-2 border-secondary/40 rounded-2xl px-8 py-5 text-center shrink-0"><div className="text-xs font-bold uppercase tracking-widest text-secondary mb-1">Overall</div><div className="text-5xl font-black text-white leading-none">L{overallLayer}</div><div className="text-sm font-bold text-slate-200 mt-2">{LAYER_NAMES[overallLayer]}</div></div><div><h1 className="text-3xl md:text-4xl font-bold mb-2">{overallMeta.label}</h1><p className="text-lg text-slate-200 leading-relaxed">{overallMeta.description}</p></div></div></div></div>
      <Section bg="gray"><div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm"><h2 className="text-base font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-secondary-dark dark:text-secondary" /> Score by Pillar</h2><div className="space-y-5">{pillarScores.map(p => { const pd = PILLARS.find(x => x.key === p.key)!; const PIcon = pd.icon; const pct = Math.max(4, Math.round(((p.score - 1) / 3) * 100)); const lm = LAYER_META[p.layer]; return (<div key={p.key}><div className="flex items-center justify-between mb-2"><div className="flex items-center gap-2"><PIcon className={`w-4 h-4 ${pd.colorClass}`} /><span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{p.key}</span></div><span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${lm.bg} ${lm.color}`}>Layer {p.layer} — {LAYER_NAMES[p.layer]}</span></div><div className="bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden"><div className="h-3 rounded-full bg-primary transition-all duration-700" style={{ width: `${pct}%` }} /></div></div>); })}</div>{weakest.layer < overallLayer && (<div className="mt-5 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg"><p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed"><strong>Constraint pillar: {weakest.key}</strong> — This area is limiting your overall GenAI readiness. Prioritise it to unblock broader adoption.</p></div>)}</div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm"><h2 className="text-base font-bold text-slate-900 dark:text-white mb-5">Recommended Next Steps</h2><ol className="space-y-4">{RECOMMENDATIONS[overallLayer].map((rec, i) => (<li key={i} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed"><span className="shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>{rec}</li>))}</ol></div>
        <div className="flex flex-col sm:flex-row gap-4"><button onClick={handleDownloadPDF} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-md"><Download size={18} /> Download PDF Report</button><Link to="/contact?topic=GenAI Advisory" className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary dark:text-white dark:border-white font-bold rounded-xl hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary transition-colors">Book GenAI Advisory <ArrowRight size={16} /></Link></div>
        <div className="text-center pt-2"><button onClick={reset} className="text-sm text-slate-400 hover:text-primary dark:hover:text-secondary transition-colors underline">Retake assessment</button></div>
      </div></Section>
    </>
  );
};

export default GenAIAssessment;
