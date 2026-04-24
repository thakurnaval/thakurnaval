import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowLeft, Download, Mail, Loader2, CheckCircle2,
  AlertCircle, BarChart3, Briefcase, Calendar, AlertTriangle, MessageSquare,
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
    key: 'Scope & Planning',
    icon: Briefcase,
    colorClass: 'text-blue-600 dark:text-blue-400',
    bgClass: 'bg-blue-50 dark:bg-blue-900/20',
    borderClass: 'border-blue-300 dark:border-blue-700',
    questions: [
      {
        q: 'How are project requirements and scope defined?',
        options: [
          { label: 'Ad hoc — requirements emerge during delivery with no formal baseline', value: 1 },
          { label: 'Documented upfront but scope changes happen without formal control', value: 2 },
          { label: 'Formal scope baseline with change control; impact analysis performed for all changes', value: 3 },
          { label: 'AI-assisted scope modelling predicts change impact before decisions are made', value: 4 },
        ],
      },
      {
        q: 'How are project plans and timelines created?',
        options: [
          { label: 'No formal plan — work is driven by urgency and stakeholder requests', value: 1 },
          { label: 'High-level plans with milestones; estimates are based on gut feel', value: 2 },
          { label: 'Detailed plans using historical velocity data, broken into manageable deliverables', value: 3 },
          { label: 'Data-driven planning with AI-generated estimates calibrated from team and industry benchmarks', value: 4 },
        ],
      },
      {
        q: 'How are dependencies between projects and teams managed?',
        options: [
          { label: 'Dependencies discovered only when they block delivery', value: 1 },
          { label: 'Dependencies tracked in a log but managed reactively', value: 2 },
          { label: 'Dependency mapping embedded in planning; owners assigned and risks flagged proactively', value: 3 },
          { label: 'Automated dependency graph with AI-triggered alerts when changes propagate risk', value: 4 },
        ],
      },
      {
        q: 'How is resource allocation and capacity planned?',
        options: [
          { label: 'Resources allocated based on availability — no formal capacity model', value: 1 },
          { label: 'Capacity planned per project but not aggregated across the portfolio', value: 2 },
          { label: 'Portfolio-level capacity model with skills-based allocation and demand forecasting', value: 3 },
          { label: 'AI continuously rebalances capacity across the portfolio based on priority and throughput signals', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'Execution & Delivery',
    icon: Calendar,
    colorClass: 'text-orange-600 dark:text-orange-400',
    bgClass: 'bg-orange-50 dark:bg-orange-900/20',
    borderClass: 'border-orange-300 dark:border-orange-700',
    questions: [
      {
        q: 'How is project progress tracked and reported?',
        options: [
          { label: 'Status updates via email or meetings — no consistent tracking tool', value: 1 },
          { label: 'Project tracked in a tool (Jira, Azure DevOps) but status reporting is manual', value: 2 },
          { label: 'Real-time dashboards showing progress against plan; earned value metrics used', value: 3 },
          { label: 'AI synthesises progress signals across tools and surfaces risks before they become blockers', value: 4 },
        ],
      },
      {
        q: 'How are project blockers and impediments resolved?',
        options: [
          { label: 'Escalated informally — whoever shouts loudest gets attention', value: 1 },
          { label: 'Blockers tracked but resolution depends on individual initiative', value: 2 },
          { label: 'Impediment backlog owned by the PM; escalation paths documented and SLAs in place', value: 3 },
          { label: 'AI detects impediment patterns and suggests resolution actions based on historical data', value: 4 },
        ],
      },
      {
        q: 'How is quality managed during delivery?',
        options: [
          { label: 'Testing happens at the end — defects surface in production', value: 1 },
          { label: 'Testing integrated into delivery but quality gates are inconsistently applied', value: 2 },
          { label: 'Definition of Done includes quality criteria; automated testing gates progression', value: 3 },
          { label: 'AI-driven test coverage analysis and predictive defect detection built into CI/CD', value: 4 },
        ],
      },
      {
        q: 'How are deliverables reviewed and accepted?',
        options: [
          { label: 'Informal sign-off via email or verbal agreement', value: 1 },
          { label: 'Review meetings scheduled but acceptance criteria are vague', value: 2 },
          { label: 'Formal acceptance testing against documented criteria; sign-off recorded', value: 3 },
          { label: 'Automated acceptance validation against predefined measurable outcomes', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'Risk & Governance',
    icon: AlertTriangle,
    colorClass: 'text-red-600 dark:text-red-400',
    bgClass: 'bg-red-50 dark:bg-red-900/20',
    borderClass: 'border-red-300 dark:border-red-700',
    questions: [
      {
        q: 'How are project risks identified and managed?',
        options: [
          { label: 'Risks identified reactively — after they become issues', value: 1 },
          { label: 'Risk register maintained but reviewed infrequently', value: 2 },
          { label: 'Regular risk reviews with probability/impact scoring and mitigation owners', value: 3 },
          { label: 'AI scans project signals to predict emerging risks before they materialise', value: 4 },
        ],
      },
      {
        q: 'How is project governance structured?',
        options: [
          { label: 'No formal governance — projects run independently', value: 1 },
          { label: 'Steering committees exist but meet infrequently with no clear decision framework', value: 2 },
          { label: 'Governance framework with defined decision rights, escalation paths, and tollgates', value: 3 },
          { label: 'Automated governance dashboards surface portfolio health; AI flags exceptions', value: 4 },
        ],
      },
      {
        q: 'How are project decisions documented?',
        options: [
          { label: 'Decisions made verbally — no audit trail', value: 1 },
          { label: 'Key decisions recorded in meeting notes but not centralised or searchable', value: 2 },
          { label: 'Decision log maintained with context, alternatives considered, and owners', value: 3 },
          { label: 'AI-assisted decision documentation with linkage to outcomes for continuous improvement', value: 4 },
        ],
      },
      {
        q: 'How is compliance with organisational standards ensured?',
        options: [
          { label: 'Compliance checked at the end, if at all', value: 1 },
          { label: 'Compliance requirements listed but verification is manual', value: 2 },
          { label: 'Compliance checkpoints embedded in the project lifecycle with evidence collected automatically', value: 3 },
          { label: 'Continuous compliance monitoring with AI flagging deviations in real time', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'Stakeholder Management',
    icon: MessageSquare,
    colorClass: 'text-green-600 dark:text-green-400',
    bgClass: 'bg-green-50 dark:bg-green-900/20',
    borderClass: 'border-green-300 dark:border-green-700',
    questions: [
      {
        q: 'How are stakeholders identified and engaged?',
        options: [
          { label: 'Identified informally — the list is often incomplete or late', value: 1 },
          { label: 'Stakeholder list maintained but engagement is reactive', value: 2 },
          { label: 'Stakeholder map with engagement plans, communication cadences, and influence/interest analysis', value: 3 },
          { label: 'AI-assisted stakeholder sentiment tracking drives adaptive engagement strategies', value: 4 },
        ],
      },
      {
        q: 'How is project communication managed?',
        options: [
          { label: 'Ad hoc emails and meetings — no structured communication plan', value: 1 },
          { label: 'Regular status updates sent but format and frequency vary', value: 2 },
          { label: 'Communication plan with tailored messages by stakeholder group and defined channels', value: 3 },
          { label: 'Automated stakeholder reporting with personalised summaries generated from live project data', value: 4 },
        ],
      },
      {
        q: 'How are conflicting stakeholder priorities resolved?',
        options: [
          { label: 'Escalated ad hoc — resolution depends on political influence', value: 1 },
          { label: 'Conflicts escalated to the sponsor but resolution criteria are unclear', value: 2 },
          { label: 'Prioritisation framework with defined criteria; decisions documented and communicated', value: 3 },
          { label: 'AI models priority conflicts and scenario impacts to support faster, evidence-based decisions', value: 4 },
        ],
      },
      {
        q: 'How are lessons learned captured and reused?',
        options: [
          { label: 'No formal retrospectives — lessons repeat across projects', value: 1 },
          { label: 'Lessons captured at project close but rarely referenced for new projects', value: 2 },
          { label: 'Structured retrospectives with action items tracked; lessons inform project standards', value: 3 },
          { label: 'AI aggregates lessons across the portfolio and proactively surfaces insights at project start', value: 4 },
        ],
      },
    ],
  },
];

// ─── Scoring & Metadata ───────────────────────────────────────────────────────

const NUM_PILLARS = PILLARS.length;
const EMAIL_STEP = NUM_PILLARS + 1;
const RESULTS_STEP = NUM_PILLARS + 2;

const LAYER_NAMES: Record<number, string> = { 1: 'Initial', 2: 'Managed', 3: 'Defined', 4: 'Optimised' };

const LAYER_META: Record<number, { label: string; description: string; color: string; bg: string; }> = {
  1: {
    label: 'Layer 1 — Initial',
    description: 'Your project management practices are largely reactive and informal. The highest-impact first step is establishing basic controls: a written scope, a risk register, and a simple tracking tool. These three things alone will change delivery predictability.',
    color: 'text-slate-700 dark:text-slate-200',
    bg: 'bg-slate-100 dark:bg-slate-700',
  },
  2: {
    label: 'Layer 2 — Managed',
    description: 'You have the building blocks most delivery teams are still working toward. The next step is consistency — applying your existing good practices to every project, not just the visible ones. Formalising change control and risk reviews will move you to Defined.',
    color: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-100 dark:bg-blue-900/40',
  },
  3: {
    label: 'Layer 3 — Defined',
    description: 'You are in the top tier of project delivery maturity. Your practices are documented, consistently applied, and measurable. The next frontier is adding intelligence — using data and AI to make your process predictive rather than merely descriptive.',
    color: 'text-purple-700 dark:text-purple-300',
    bg: 'bg-purple-100 dark:bg-purple-900/40',
  },
  4: {
    label: 'Layer 4 — Optimised',
    description: 'You are operating a genuinely optimised delivery function. AI-assisted forecasting, automated governance, and portfolio-wide learning distinguish your organisation. Focus now shifts to responsible autonomy and scaling what works.',
    color: 'text-teal-700 dark:text-teal-300',
    bg: 'bg-teal-100 dark:bg-teal-900/40',
  },
};

const RECOMMENDATIONS: Record<number, string[]> = {
  1: [
    'Start with a written scope and acceptance criteria for every project — even a one-pager. Scope ambiguity is the single largest driver of cost and schedule overruns.',
    'Create a simple risk register. A shared spreadsheet with Probability, Impact, and Owner columns will immediately surface conversations that currently happen too late.',
    'Pick one tracking tool and use it consistently. The discipline of recording actual progress against planned progress is the foundation every higher maturity level requires.',
    'Schedule a 30-minute lessons learned session at the end of every project. Even if nothing is actioned, the habit of reflection breaks the cycle of repeated mistakes.',
  ],
  2: [
    'Formalise change control. Even a lightweight process — log the change, assess the impact on scope/schedule/cost, get written approval — removes the biggest source of stakeholder conflict.',
    'Move to stakeholder-specific communication. A single status email sent to everyone is read by almost no one. Two or three tailored formats, each with a clear audience, dramatically improve engagement.',
    'Hold regular risk reviews, not just risk registration. A risk register reviewed monthly is far more valuable than one written at project kick-off and never touched again.',
    'Define "done" explicitly before work starts. Vague acceptance criteria are the root cause of most late-stage rework and difficult sign-offs.',
  ],
  3: [
    'Introduce portfolio-level capacity planning. Most delivery problems at this maturity level are caused by over-commitment, not under-performance. A capacity model makes the problem visible before it becomes a crisis.',
    'Pilot AI-assisted risk prediction. Several project management tools now offer ML-based risk flags — even basic adoption of these signals adds a detection layer humans reliably miss.',
    'Build a decision log as a first-class artefact. At this maturity level, the institutional knowledge embedded in project decisions is a strategic asset that is currently walking out the door.',
    'Start measuring delivery predictability — the ratio of what was committed to what was actually delivered. This single metric drives more improvement conversations than any other.',
  ],
  4: [
    'Build a feedback loop between AI-generated insights and human judgement. At this layer, the risk shifts from insufficient data to over-reliance on automated signals — human context remains essential.',
    'Formalise your portfolio intelligence capability. An AI that surfaces lessons from past projects at project start is extremely valuable; make it a reliable product, not a one-off experiment.',
    'Document and share your maturity journey. Organisations at this level often underestimate how differentiated their practices are — thought leadership and community contribution are natural next steps.',
    'Focus governance energy on outcomes, not process compliance. At Layer 4, your governance framework is mature enough to shift the conversation from "did we follow the process?" to "did we achieve the outcome?"',
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
<title>PM Maturity Assessment Report — nthakur.com</title>
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
        <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#00f1d4;margin-bottom:10px">Project Management Maturity Assessment</div>
        <h1 style="font-size:26px;font-weight:800;line-height:1.2;margin-bottom:8px">Your PM Maturity Report</h1>
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
    <h2 style="font-size:17px;font-weight:700;margin-bottom:8px">Want a tailored PM transformation roadmap?</h2>
    <p style="font-size:13px;color:#e2e8f0;line-height:1.65;margin-bottom:12px">Naval offers structured advisory engagements to help delivery teams move from Initial to Optimised — scored findings per pillar, a gap analysis, and a prioritised 90-day action plan your organisation can act on immediately.</p>
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

const PMAssessment: React.FC = () => {
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
      form.append('topic', 'Project Management Maturity Assessment');
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
        title="Project Management Maturity Assessment | Naval Thakur"
        description="16 questions across four PM pillars. Find your delivery maturity layer and download a personalised PDF report."
      />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 text-secondary-dark dark:text-secondary text-sm font-bold mb-6">
            PM Maturity Assessment
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How mature is your project delivery?</h1>
          <p className="text-xl text-slate-200 max-w-2xl leading-relaxed">
            {TOTAL_QUESTIONS} questions across four pillars. About 4 minutes. You will receive a maturity
            layer per pillar, an overall score, and a downloadable PDF report with prioritised next steps.
          </p>
        </div>
      </div>
      <Section bg="white">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
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
                'Your PM maturity layer across four delivery pillars (Initial → Optimised)',
                'A visual breakdown of your strongest and weakest areas',
                'Prioritised recommendations to reach the next layer',
                'A downloadable PDF report to share with your team or leadership',
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
        <SEO title="PM Maturity Assessment | Naval Thakur" description="PM Maturity Assessment in progress." />

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
      <SEO title="PM Maturity Assessment | Naval Thakur" description="Assessment complete — unlock your results." />
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
        title={`PM Maturity Results: Layer ${overallLayer} | Naval Thakur`}
        description={`Your project delivery is at Layer ${overallLayer}: ${LAYER_NAMES[overallLayer]}.`}
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
              to="/contact?topic=PM+Advisory"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary dark:text-white dark:border-white font-bold rounded-xl hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary transition-colors"
            >
              Book PM Advisory <ArrowRight size={16} />
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

export default PMAssessment;
