import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowLeft, Download, Mail, Loader2, CheckCircle2,
  Users, GitBranch, ListChecks, RefreshCw, AlertCircle, BarChart3,
} from 'lucide-react';
import Section from '../../components/Section';
import SEO from '../../components/SEO';

interface Option { label: string; value: number; }
interface Question { q: string; options: Option[]; }
interface PillarDef { key: string; icon: React.ElementType; colorClass: string; bgClass: string; borderClass: string; questions: Question[]; }
type Answers = Record<string, number>;

const PILLARS: PillarDef[] = [
  {
    key: 'Team Practices',
    icon: Users,
    colorClass: 'text-blue-600 dark:text-blue-400',
    bgClass: 'bg-blue-50 dark:bg-blue-900/20',
    borderClass: 'border-blue-300 dark:border-blue-700',
    questions: [
      {
        q: 'How does your team manage daily coordination?',
        options: [
          { label: 'No formal process — communication is ad hoc and reactive', value: 1 },
          { label: 'Daily standups run but are status reports, not outcome-focused', value: 2 },
          { label: 'Focused 15-minute standups; impediments raised and resolved within the sprint', value: 3 },
          { label: 'Async-first coordination with AI-summarised updates; standups are exception-driven', value: 4 },
        ],
      },
      {
        q: 'How are retrospectives used in your team?',
        options: [
          { label: 'Rarely or never held — there is no time or no one drives them', value: 1 },
          { label: 'Held occasionally, but action items rarely get implemented', value: 2 },
          { label: 'Consistent retros every sprint with tracked actions and measurable follow-through', value: 3 },
          { label: 'Data-driven retros using cycle time, defect trends, and team health metrics', value: 4 },
        ],
      },
      {
        q: 'How mature is cross-functional collaboration within your team?',
        options: [
          { label: 'Siloed — developers, QA, and ops work in sequence with handoffs', value: 1 },
          { label: 'Some collaboration but handoffs create delays and rework between functions', value: 2 },
          { label: 'Fully cross-functional teams with shared ownership from design to production', value: 3 },
          { label: 'Dynamic team composition adapted based on skill demand and delivery signals', value: 4 },
        ],
      },
      {
        q: 'How does the team manage technical debt?',
        options: [
          { label: 'Debt accumulates indefinitely — it is never formally addressed', value: 1 },
          { label: 'Recognised but only addressed during slack time or after a crisis', value: 2 },
          { label: 'A dedicated allocation each sprint (20% rule or equivalent) tracked on the backlog', value: 3 },
          { label: 'Automated detection and policy-driven prioritisation of technical debt items', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'Delivery & Flow',
    icon: GitBranch,
    colorClass: 'text-green-600 dark:text-green-400',
    bgClass: 'bg-green-50 dark:bg-green-900/20',
    borderClass: 'border-green-300 dark:border-green-700',
    questions: [
      {
        q: 'How predictable is your delivery cadence?',
        options: [
          { label: 'No regular cadence — work is assigned and delivered unpredictably', value: 1 },
          { label: 'Two-week sprints but scope changes mid-sprint are common', value: 2 },
          { label: 'Fixed cadence, stable velocity, and reliable sprint commitments', value: 3 },
          { label: 'Continuous flow with AI-predicted throughput and automated capacity balancing', value: 4 },
        ],
      },
      {
        q: 'How do you manage work in progress (WIP)?',
        options: [
          { label: 'No limits — everyone works on whatever they are assigned', value: 1 },
          { label: 'WIP is visible on a board but limits are not enforced', value: 2 },
          { label: 'Explicit WIP limits enforced; blocked work escalated and resolved immediately', value: 3 },
          { label: 'WIP dynamically optimised based on team capacity and value flow signals', value: 4 },
        ],
      },
      {
        q: 'What does your deployment pipeline look like?',
        options: [
          { label: 'Manual deployments, often performed out of hours with a change window', value: 1 },
          { label: 'CI is in place but CD requires manual approvals and handoffs between teams', value: 2 },
          { label: 'Fully automated CD with quality gates, automated tests, and rollback on failure', value: 3 },
          { label: 'AI-triggered deployments based on confidence scores and business signals', value: 4 },
        ],
      },
      {
        q: 'How do you measure team performance?',
        options: [
          { label: 'Not measured — velocity is tracked informally at best', value: 1 },
          { label: 'Story points and velocity tracked but used for reporting, not improvement', value: 2 },
          { label: 'DORA metrics: deployment frequency, lead time, MTTR, and change fail rate', value: 3 },
          { label: 'Full value stream metrics including customer outcomes and business value per sprint', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'Planning & Backlog',
    icon: ListChecks,
    colorClass: 'text-amber-600 dark:text-amber-400',
    bgClass: 'bg-amber-50 dark:bg-amber-900/20',
    borderClass: 'border-amber-300 dark:border-amber-700',
    questions: [
      {
        q: 'How is your product backlog maintained?',
        options: [
          { label: 'A static list of features, rarely refined or re-prioritised', value: 1 },
          { label: 'Regularly updated but prioritisation is unclear or driven by the loudest voice', value: 2 },
          { label: 'Continuously refined and prioritised by value and risk; INVEST criteria applied', value: 3 },
          { label: 'AI-assisted prioritisation based on customer signals, revenue impact, and effort', value: 4 },
        ],
      },
      {
        q: 'How is sprint planning conducted?',
        options: [
          { label: 'Top-down assignment — the manager decides what gets done', value: 1 },
          { label: 'Team reviews the backlog but estimation is rough and commitments slip', value: 2 },
          { label: 'Team-driven planning with capacity awareness and clear acceptance criteria', value: 3 },
          { label: 'AI forecasts sprint throughput and flags capacity mismatches before planning starts', value: 4 },
        ],
      },
      {
        q: 'How well are user stories written and refined?',
        options: [
          { label: 'Vague requirements — "build X" with no context, acceptance criteria, or definition of done', value: 1 },
          { label: 'Stories exist but lack testable acceptance criteria or a clear definition of done', value: 2 },
          { label: 'Well-structured stories with explicit DoD, acceptance criteria, and refinement sessions', value: 3 },
          { label: 'AI-assisted story generation, refinement scoring, and automated dependency detection', value: 4 },
        ],
      },
      {
        q: 'How is release planning managed beyond the sprint?',
        options: [
          { label: 'No release planning — delivery is ad hoc and dates are guessed', value: 1 },
          { label: 'Quarterly planning exists but is disconnected from sprint-level delivery data', value: 2 },
          { label: 'Programme increments with rolling forecasts anchored to actual throughput', value: 3 },
          { label: 'Dynamic roadmap with AI-simulated release scenarios and risk probability models', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'Culture & Improvement',
    icon: RefreshCw,
    colorClass: 'text-purple-600 dark:text-purple-400',
    bgClass: 'bg-purple-50 dark:bg-purple-900/20',
    borderClass: 'border-purple-300 dark:border-purple-700',
    questions: [
      {
        q: 'How does your team respond to failures and production incidents?',
        options: [
          { label: 'Blame is assigned — whoever caused the issue is held individually accountable', value: 1 },
          { label: 'Post-mortems happen but learning is not systematically captured or applied', value: 2 },
          { label: 'Blameless post-mortems with root cause analysis and action items tracked to closure', value: 3 },
          { label: 'AI-assisted pattern analysis identifies systemic causes across multiple incidents', value: 4 },
        ],
      },
      {
        q: 'How is continuous learning embedded in your team\'s workflow?',
        options: [
          { label: 'Learning is informal, self-directed, and happens outside work hours', value: 1 },
          { label: 'Training budget exists but is not tied to delivery gaps or team outcomes', value: 2 },
          { label: 'Structured guilds, communities of practice, and dedicated learning time each sprint', value: 3 },
          { label: 'AI identifies skill gaps from delivery data and surfaces targeted learning opportunities', value: 4 },
        ],
      },
      {
        q: 'How does leadership support agile ways of working?',
        options: [
          { label: 'Command and control — teams are given tasks, not problems to solve', value: 1 },
          { label: 'Leadership endorses agile in principle but frequently bypasses or overrides the process', value: 2 },
          { label: 'Leaders act as enablers, removing impediments and shielding the team from disruption', value: 3 },
          { label: 'Leadership uses OKRs and value stream data to make adaptive portfolio decisions', value: 4 },
        ],
      },
      {
        q: 'How mature is your use of agile metrics?',
        options: [
          { label: 'Metrics are not used — perception and gut feel drive decisions', value: 1 },
          { label: 'Velocity is tracked but used to pressure teams rather than understand flow', value: 2 },
          { label: 'Balanced scorecard: quality, delivery speed, team health, and customer satisfaction', value: 3 },
          { label: 'AI correlates team delivery metrics with business outcomes to drive investment decisions', value: 4 },
        ],
      },
    ],
  },
];

const LAYER_NAMES: Record<number, string> = { 1: 'Ad Hoc', 2: 'Defined', 3: 'Performing', 4: 'Optimising' };

const LAYER_META: Record<number, { label: string; description: string; color: string; bg: string }> = {
  1: {
    label: 'Layer 1 — Ad Hoc',
    description: 'Teams operate on instinct and individual heroics. The highest-leverage move is establishing a consistent cadence — even a lightweight Scrum framework will surface blockers that are currently invisible.',
    color: 'text-slate-700 dark:text-slate-200',
    bg: 'bg-slate-100 dark:bg-slate-700',
  },
  2: {
    label: 'Layer 2 — Defined',
    description: 'The framework is in place. The next step is discipline: making the rituals meaningful, enforcing WIP limits, and using delivery data to improve flow rather than just report on it.',
    color: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-100 dark:bg-blue-900/40',
  },
  3: {
    label: 'Layer 3 — Performing',
    description: 'You are in the top quartile of enterprise agile teams. The gap to close is prediction — using DORA metrics and value stream data to forecast and adapt before problems surface.',
    color: 'text-purple-700 dark:text-purple-300',
    bg: 'bg-purple-100 dark:bg-purple-900/40',
  },
  4: {
    label: 'Layer 4 — Optimising',
    description: 'Your agile system is self-improving. The focus is extending this capability across the full value stream — from initial idea through to measurable business outcome.',
    color: 'text-teal-700 dark:text-teal-300',
    bg: 'bg-teal-100 dark:bg-teal-900/40',
  },
};

const RECOMMENDATIONS: Record<number, string[]> = {
  1: [
    'Start with one team, one board, one 2-week sprint. Perfection later — consistency now. Even a rough cadence exposes the blockers that are currently invisible.',
    'Run a retrospective this sprint, even informally. Three questions: what went well, what did not, what one thing will we change. Track the one change to completion.',
    'Define a team Definition of Done. If "done" means different things to different people, quality is ungovernable.',
    'Agree on a WIP limit — even a rough one. Unfinished work is waste; WIP limits make the waste visible before it becomes a missed commitment.',
  ],
  2: [
    'Adopt DORA metrics. Deployment frequency and lead time tell you more about team health than velocity ever will — and they are harder to game.',
    'Start backlog refinement sessions separate from sprint planning. The team should never be surprised by what they pick up in a sprint.',
    'Run a blameless post-mortem after the next incident. Psychological safety is the single best predictor of high-performing teams.',
    'Move one impediment from awareness to action in the next sprint. Track it on the board as a first-class item, not in a parking lot.',
  ],
  3: [
    'Connect sprint metrics to business outcomes. What is the relationship between your deployment frequency and customer retention or product revenue?',
    'Build a communities-of-practice model. The teams at this level that stagnate are the ones where learning stays siloed inside sprint teams.',
    'Pilot AI-assisted backlog management — tools like Linear AI or Jira AI surface dependency risks that manual refinement reliably misses.',
    'Automate your retro insights. Pattern matching across 6–12 retrospectives identifies systemic issues that a single retro cannot surface.',
  ],
  4: [
    'Document and publish your operating model. You are in the top 5% of enterprise agile teams and the community benefits from your practices.',
    'Build the feedback loop between AI suggestions and team outcomes. Over-automation is the risk at this layer — humans must stay in the loop on culture and trust.',
    'Formalise your practices as an internal playbook that other teams can adopt. Your agile system is an organisational asset.',
    'Focus leadership development on the skills AI cannot replace: judgment, context-setting, and psychological safety.',
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
    return `<tr>
      <td style="padding:10px 0;font-weight:600;color:#271789;width:140px;font-size:14px">${p.key}</td>
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
        <strong>Constraint area: ${weakest.key} (Layer ${weakest.layer})</strong> — This is your weakest pillar and the bottleneck limiting overall agile maturity. Prioritise it first.
      </div>` : '';

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
<title>Agile Maturity Report — nthakur.com</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;background:#fff;max-width:800px;margin:0 auto;padding:0}@page{margin:15mm 18mm}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style>
</head><body>
<div style="background:#271789;color:#fff;padding:32px 40px;border-radius:10px 10px 0 0">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:20px">
    <div>
      <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#00f1d4;margin-bottom:10px">Agile Maturity Assessment</div>
      <h1 style="font-size:26px;font-weight:800;line-height:1.2;margin-bottom:8px">Your Maturity Report</h1>
      <div style="font-size:13px;color:#cbd5e1">Generated ${date} · nthakur.com</div>
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
  <h2 style="font-size:17px;font-weight:700;margin-bottom:8px">Want a tailored agile transformation roadmap?</h2>
  <p style="font-size:13px;color:#e2e8f0;line-height:1.65;margin-bottom:12px">Naval offers team workshops and advisory engagements designed around your actual maturity level — not a generic framework playbook.</p>
  <div style="font-size:13px;color:#00f1d4;font-weight:700">Book at nthakur.com/work-with-me</div>
</div>
<div style="padding:18px 40px;text-align:center">
  <p style="font-size:11px;color:#94a3b8">© ${new Date().getFullYear()} Naval Thakur · nthakur.com · Results are based on self-reported responses and are indicative, not prescriptive.</p>
</div>
</body></html>`;
};

const AgileAssessment: React.FC = () => {
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
      form.append('topic', 'Agile Maturity Assessment');
      form.append('message',
        `Agile assessment complete. Overall: Layer ${overallLayer} (${LAYER_NAMES[overallLayer]}). ` +
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

  const reset = () => { setStep(0); setAnswers({}); setEmail(''); setName(''); setEmailStatus('idle'); };

  if (step === 0) return (
    <>
      <SEO title="Agile Maturity Assessment | Naval Thakur" description={`${TOTAL_QUESTIONS} questions across Team Practices, Delivery Flow, Planning, and Culture. Find your agile maturity layer and download a personalised report.`} />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 text-secondary-dark dark:text-secondary text-sm font-bold mb-6">
            Agile Maturity Assessment
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How agile is your team — really?</h1>
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
              {['Your agile maturity layer (Ad Hoc → Defined → Performing → Optimising)', 'Per-pillar scores with a visual breakdown', 'Personalised recommendations for your next layer', 'A downloadable PDF report for your records'].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-secondary-dark dark:text-secondary shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={() => setStep(1)} className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors text-lg shadow-lg">
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
        <SEO title="Agile Maturity Assessment | Naval Thakur" description="Agile Maturity Assessment in progress." />
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
                      <span className="text-primary dark:text-secondary font-bold mr-2">Q{qIdx + 1}.</span>{q.q}
                    </p>
                    <div className="space-y-2">
                      {q.options.map(opt => (
                        <button key={opt.value} onClick={() => setAnswer(pillarIdx, qIdx, opt.value)}
                          className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${selected === opt.value ? 'border-primary bg-primary/5 dark:bg-primary/20 text-primary dark:text-white font-semibold' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary/40 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                          <span className="inline-flex items-center gap-3">
                            <span className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${selected === opt.value ? 'border-primary bg-primary' : 'border-slate-300 dark:border-slate-600'}`}>
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
              <button onClick={() => setStep(s => s - 1)} className="inline-flex items-center gap-2 px-5 py-2.5 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white font-medium text-sm transition-colors">
                <ArrowLeft size={16} /> Back
              </button>
              <button onClick={() => setStep(s => s + 1)} disabled={!pillarComplete}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm shadow-md">
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
      <SEO title="Agile Maturity Assessment | Naval Thakur" description="Assessment complete — unlock your results." />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
          <CheckCircle2 className="w-12 h-12 text-secondary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Assessment complete.</h1>
          <p className="text-xl text-slate-200 leading-relaxed">Enter your email to unlock your full results and download your personalised PDF report.</p>
        </div>
      </div>
      <Section bg="white">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleEmailSubmit} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-lg space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Name</label>
              <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Work email <span className="text-red-500">*</span></label>
              <input type="email" placeholder="you@company.com" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm transition" />
            </div>
            {emailStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle size={16} />
                Something went wrong.{' '}
                <button type="button" onClick={() => setStep(RESULTS_STEP)} className="underline font-semibold">Skip and view results</button>
              </div>
            )}
            <button type="submit" disabled={emailStatus === 'submitting'}
              className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60 shadow-md">
              {emailStatus === 'submitting' ? <Loader2 className="animate-spin" size={18} /> : <><Mail size={18} /> View My Results</>}
            </button>
            <p className="text-xs text-slate-400 text-center">No spam. Unsubscribe anytime.</p>
          </form>
        </div>
      </Section>
    </>
  );

  return (
    <>
      <SEO title={`Agile Results: ${LAYER_NAMES[overallLayer]} | Naval Thakur`} description={`Your team is at Agile Layer ${overallLayer}: ${LAYER_NAMES[overallLayer]}.`} />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 text-secondary-dark dark:text-secondary text-sm font-bold mb-6">Your Results</div>
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
                  <strong>Constraint area: {weakest.key}</strong> — This is your lowest score and the bottleneck limiting overall agile maturity. Prioritise improvements here first.
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
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={handleDownloadPDF} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-md">
              <Download size={18} /> Download PDF Report
            </button>
            <Link to="/contact?topic=Agile Workshop" className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary dark:text-white dark:border-white font-bold rounded-xl hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary transition-colors">
              Book a Workshop <ArrowRight size={16} />
            </Link>
          </div>
          <div className="text-center pt-2">
            <button onClick={reset} className="text-sm text-slate-400 hover:text-primary dark:hover:text-secondary transition-colors underline">Retake assessment</button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default AgileAssessment;
