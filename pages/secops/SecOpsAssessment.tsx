import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowLeft, Download, Mail, Loader2, CheckCircle2,
  Lock, Eye, FileCheck, Bell, AlertCircle, BarChart3,
} from 'lucide-react';
import Section from '../../components/Section';
import SEO from '../../components/SEO';

interface Option { label: string; value: number; }
interface Question { q: string; options: Option[]; }
interface PillarDef { key: string; icon: React.ElementType; colorClass: string; bgClass: string; borderClass: string; questions: Question[]; }
type Answers = Record<string, number>;

const PILLARS: PillarDef[] = [
  {
    key: 'Identity & Access',
    icon: Lock,
    colorClass: 'text-blue-600 dark:text-blue-400',
    bgClass: 'bg-blue-50 dark:bg-blue-900/20',
    borderClass: 'border-blue-300 dark:border-blue-700',
    questions: [
      {
        q: 'How is identity and access governed across your cloud environment?',
        options: [
          { label: 'Access is broadly granted and rarely revoked — shared accounts are common', value: 1 },
          { label: 'IAM roles exist but are overly permissive and reviewed infrequently', value: 2 },
          { label: 'Least privilege enforced, quarterly access reviews, MFA on all human identities', value: 3 },
          { label: 'Just-in-time access with AI-monitored identity behaviour and automated anomaly response', value: 4 },
        ],
      },
      {
        q: 'How mature is your privileged access management?',
        options: [
          { label: 'Admin accounts are shared and used routinely for everyday tasks', value: 1 },
          { label: 'Privileged accounts exist but are not vaulted or regularly audited', value: 2 },
          { label: 'PAM solution in place: vaulted credentials, session recording, and regular attestation', value: 3 },
          { label: 'Zero-standing privilege — elevated access is provisioned on demand and time-bound by policy', value: 4 },
        ],
      },
      {
        q: 'How is service-to-service authentication handled?',
        options: [
          { label: 'Hardcoded credentials or shared secrets used between services', value: 1 },
          { label: 'API keys used, rotated manually on a schedule', value: 2 },
          { label: 'Short-lived tokens and managed identities with automated rotation', value: 3 },
          { label: 'Policy-enforced service mesh with AI-monitored lateral movement detection', value: 4 },
        ],
      },
      {
        q: 'How do you manage third-party and supply chain access?',
        options: [
          { label: 'Third-party access is managed informally with persistent, broad credentials', value: 1 },
          { label: 'Third-party access is tracked but not regularly reviewed or revoked', value: 2 },
          { label: 'Third-party access inventory with periodic attestation and scoped permissions', value: 3 },
          { label: 'Automated supply chain risk scoring with continuous monitoring and anomaly alerting', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'Threat Detection',
    icon: Eye,
    colorClass: 'text-red-600 dark:text-red-400',
    bgClass: 'bg-red-50 dark:bg-red-900/20',
    borderClass: 'border-red-300 dark:border-red-700',
    questions: [
      {
        q: 'How are security threats detected in your environment?',
        options: [
          { label: 'Threats are discovered reactively — from user reports or news of an incident', value: 1 },
          { label: 'Basic logging and alerting via cloud-native tools with manual review', value: 2 },
          { label: 'SIEM in place with curated detection rules, anomaly detection, and alert correlation', value: 3 },
          { label: 'AI-powered threat hunting that identifies novel attack patterns without pre-defined rules', value: 4 },
        ],
      },
      {
        q: 'How mature is your vulnerability management?',
        options: [
          { label: 'Vulnerabilities are discovered during breaches or annual penetration tests', value: 1 },
          { label: 'Periodic scans exist but remediation prioritisation and tracking are manual', value: 2 },
          { label: 'Continuous scanning with CVSS-based prioritisation and SLA-tracked remediation', value: 3 },
          { label: 'AI-driven risk-based prioritisation correlating exploitability, asset criticality, and business context', value: 4 },
        ],
      },
      {
        q: 'How do you handle container and workload security?',
        options: [
          { label: 'Container images are not scanned — runtime security is absent', value: 1 },
          { label: 'Some image scanning exists but runtime protection and policy enforcement are limited', value: 2 },
          { label: 'Image scanning in CI/CD, network policies enforced, runtime threat detection active', value: 3 },
          { label: 'Policy-as-code with AI-monitored runtime behaviour and automated quarantine of anomalous workloads', value: 4 },
        ],
      },
      {
        q: 'How is cloud security posture continuously managed?',
        options: [
          { label: 'Cloud security defaults used — no dedicated cloud security posture management', value: 1 },
          { label: 'Some CSPM tooling in place but the findings backlog is large and unmanaged', value: 2 },
          { label: 'CSPM integrated with ticketing; critical findings resolved within defined SLA', value: 3 },
          { label: 'Continuous posture management with AI that contextualises risk against business impact', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'Compliance & Policy',
    icon: FileCheck,
    colorClass: 'text-orange-600 dark:text-orange-400',
    bgClass: 'bg-orange-50 dark:bg-orange-900/20',
    borderClass: 'border-orange-300 dark:border-orange-700',
    questions: [
      {
        q: 'How are security policies defined and enforced?',
        options: [
          { label: 'No formal security policies — controls are informal and inconsistently applied', value: 1 },
          { label: 'Policies documented but compliance relies on manual audit processes', value: 2 },
          { label: 'Policy-as-code enforced via IaC templates, OPA, or cloud-native policy engines', value: 3 },
          { label: 'AI-maintained policy library with automated compliance checking and drift remediation', value: 4 },
        ],
      },
      {
        q: 'How is regulatory compliance managed?',
        options: [
          { label: 'Compliance is addressed reactively — typically just before an external audit', value: 1 },
          { label: 'A compliance checklist exists but evidence collection is manual and point-in-time', value: 2 },
          { label: 'Continuous compliance monitoring with automated evidence collection and audit-ready reporting', value: 3 },
          { label: 'AI correlates control implementation with regulatory requirements and generates real-time posture', value: 4 },
        ],
      },
      {
        q: 'How mature is your data privacy and protection practice?',
        options: [
          { label: 'Data privacy is not formally addressed in engineering or delivery processes', value: 1 },
          { label: 'Privacy policies exist but data mapping and consent management are manual', value: 2 },
          { label: 'Data classification, automated discovery, and privacy controls built into delivery processes', value: 3 },
          { label: 'AI continuously discovers and classifies sensitive data across the estate with automated remediation', value: 4 },
        ],
      },
      {
        q: 'How do you manage open source and third-party dependency risk?',
        options: [
          { label: 'Third-party and OSS dependencies are not tracked for known vulnerabilities', value: 1 },
          { label: 'Some dependency scanning in place but coverage and remediation are inconsistent', value: 2 },
          { label: 'Full software composition analysis in CI/CD with SLA-governed remediation workflows', value: 3 },
          { label: 'AI-driven supply chain risk scoring with predictive analysis of emerging CVEs in your stack', value: 4 },
        ],
      },
    ],
  },
  {
    key: 'Incident Response',
    icon: Bell,
    colorClass: 'text-green-600 dark:text-green-400',
    bgClass: 'bg-green-50 dark:bg-green-900/20',
    borderClass: 'border-green-300 dark:border-green-700',
    questions: [
      {
        q: 'How are security incidents detected and triaged?',
        options: [
          { label: 'Incidents are discovered from external reports — internal detection is minimal', value: 1 },
          { label: 'Basic alerting exists but false positive rates are high and triage is entirely manual', value: 2 },
          { label: 'Tuned detection with response playbooks for common incident types and defined SLAs', value: 3 },
          { label: 'AI-powered triage that classifies, prioritises, and routes incidents with automated initial containment', value: 4 },
        ],
      },
      {
        q: 'How mature is your incident response process?',
        options: [
          { label: 'Incident response is ad hoc — the best available person handles it', value: 1 },
          { label: 'An incident response plan exists but is not regularly tested or rehearsed', value: 2 },
          { label: 'Documented, rehearsed IR with defined roles, communication plans, and escalation paths', value: 3 },
          { label: 'AI-assisted response with automated playbook execution for known incident classes', value: 4 },
        ],
      },
      {
        q: 'How quickly can you detect, contain, and recover from a security incident?',
        options: [
          { label: 'Detection could take days or weeks — recovery is unplanned and chaotic', value: 1 },
          { label: 'Detection within hours but containment and recovery are manual and slow', value: 2 },
          { label: 'Defined MTTD/MTTR targets achieved consistently; automated containment steps in place', value: 3 },
          { label: 'Sub-minute automated containment for known patterns; AI coordinates cross-service recovery', value: 4 },
        ],
      },
      {
        q: 'How are lessons learned from incidents applied to prevention?',
        options: [
          { label: 'No post-incident analysis — the same attack vectors are exploited repeatedly', value: 1 },
          { label: 'Post-mortems are written but action items are rarely implemented', value: 2 },
          { label: 'Structured blameless post-mortems with RCA and actions tracked through to closure', value: 3 },
          { label: 'AI identifies patterns across incidents and proactively updates detection rules and playbooks', value: 4 },
        ],
      },
    ],
  },
];

const LAYER_NAMES: Record<number, string> = { 1: 'Reactive', 2: 'Proactive', 3: 'Predictive', 4: 'Autonomous' };

const LAYER_META: Record<number, { label: string; description: string; color: string; bg: string }> = {
  1: {
    label: 'Layer 1 — Reactive',
    description: 'Security is a gate, not a practice. The most impactful immediate steps are shifting left — SAST in the pipeline, IAM least-privilege reviews, and basic cloud security posture tooling.',
    color: 'text-slate-700 dark:text-slate-200',
    bg: 'bg-slate-100 dark:bg-slate-700',
  },
  2: {
    label: 'Layer 2 — Proactive',
    description: 'Controls are in place. The next step is automation — making your security posture continuous rather than periodic and reducing the manual burden on a small security team.',
    color: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-100 dark:bg-blue-900/40',
  },
  3: {
    label: 'Layer 3 — Predictive',
    description: 'You are above the industry average. The gap is closing the loop between detection and action — moving from alerting humans to AI taking bounded, automated responses within policy.',
    color: 'text-purple-700 dark:text-purple-300',
    bg: 'bg-purple-100 dark:bg-purple-900/40',
  },
  4: {
    label: 'Layer 4 — Autonomous',
    description: 'Security is embedded at every layer and largely self-healing within defined guardrails. The focus is governance — ensuring autonomous security actions stay within policy-defined boundaries.',
    color: 'text-teal-700 dark:text-teal-300',
    bg: 'bg-teal-100 dark:bg-teal-900/40',
  },
};

const RECOMMENDATIONS: Record<number, string[]> = {
  1: [
    'Add SAST scanning to every pull request today. SonarCloud is free for public repos; Semgrep has a generous free tier for private repositories. This single change shifts security left.',
    'Audit your IAM policies and remove all wildcard permissions. Every over-permissioned role is a blast radius waiting to be exploited — start with the highest-privilege roles.',
    'Enable your cloud provider\'s native security hub (AWS Security Hub, Microsoft Defender for Cloud, or Google Security Command Center). The default findings are high-signal and low cost.',
    'Document an incident response plan — even a one-page version. Who gets called, in what order, with what authority. Documented before you need it.',
  ],
  2: [
    'Implement a SIEM or centralised log management. Splunk, Elastic SIEM, and Microsoft Sentinel all have entry-level tiers. Centralised logging is the foundation of detection capability.',
    'Move from annual penetration tests to continuous vulnerability scanning. GitHub Dependabot, Snyk, or Trivy in your pipeline covers the basics and catches regressions automatically.',
    'Enforce MFA on every human identity — no exceptions — then move to managed identities for service accounts. These two steps eliminate the most common entry points in cloud incidents.',
    'Build threat modelling into architecture reviews. STRIDE takes 2 hours per design session and catches more than most SAST tools combined, especially in complex cloud architectures.',
  ],
  3: [
    'Pilot AI-powered threat hunting. Darktrace, Vectra AI, and Microsoft Sentinel AI surface novel attack patterns that rule-based detections reliably miss.',
    'Move to zero-standing privilege for all privileged access. Just-in-time access eliminates the attack surface during the 99% of time when elevated access is not actively needed.',
    'Implement policy-as-code for cloud security controls. OPA/Rego or cloud-native Service Control Policies ensure your security standards survive every deployment without manual gates.',
    'Run a red team exercise annually with an external team. Internal assumptions about your detection capability are almost always more optimistic than reality.',
  ],
  4: [
    'Audit your autonomous response actions regularly. At this layer the risk shifts from under-detection to AI taking actions with unintended business consequences at scale.',
    'Build a feedback loop between security findings and developer training. Teams generating the most findings should receive the most targeted security education — proactively.',
    'Ensure every autonomous security action has a clear human escalation path and an audit trail that satisfies your compliance and regulatory requirements.',
    'Publish your DevSecOps practices as internal standards or an external community contribution. Your approach is a benchmark and the field benefits from your specifics.',
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
  const weakestNote = weakest.layer < overallLayer ? `<div style="margin-top:14px;padding:12px 16px;background:#fef9c3;border-left:4px solid #f59e0b;border-radius:4px;font-size:13px;color:#78350f"><strong>Constraint pillar: ${weakest.key} (Layer ${weakest.layer})</strong> — This is your weakest area and the bottleneck in your security maturity. Prioritise it first.</div>` : '';
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Cloud Security Maturity Report — nthakur.com</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;background:#fff;max-width:800px;margin:0 auto}@page{margin:15mm 18mm}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style></head><body>
<div style="background:#271789;color:#fff;padding:32px 40px;border-radius:10px 10px 0 0"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:20px"><div><div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#00f1d4;margin-bottom:10px">Cloud Security Maturity Assessment</div><h1 style="font-size:26px;font-weight:800;line-height:1.2;margin-bottom:8px">Your Maturity Report</h1><div style="font-size:13px;color:#cbd5e1">Generated ${date} · nthakur.com</div></div><div style="text-align:right;flex-shrink:0"><div style="font-size:11px;color:#94a3b8;margin-bottom:4px">Prepared for</div><div style="font-size:13px;font-weight:600;color:#e2e8f0">${email}</div></div></div></div>
<div style="background:#f8fafc;border:1px solid #e2e8f0;border-top:none;padding:28px 40px"><div style="display:flex;align-items:center;gap:24px"><div style="text-align:center;background:#271789;color:#fff;border-radius:10px;padding:18px 24px;min-width:100px;flex-shrink:0"><div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#00f1d4;margin-bottom:6px">Overall</div><div style="font-size:40px;font-weight:900;line-height:1">L${overallLayer}</div><div style="font-size:12px;font-weight:600;color:#e2e8f0;margin-top:5px">${LAYER_NAMES[overallLayer]}</div></div><div><h2 style="font-size:19px;font-weight:700;color:#271789;margin-bottom:8px">${meta.label}</h2><p style="font-size:13px;color:#475569;line-height:1.7;max-width:500px">${meta.description}</p></div></div></div>
<div style="border:1px solid #e2e8f0;border-top:none;padding:28px 40px"><h2 style="font-size:13px;font-weight:700;color:#271789;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:18px">Score by Pillar</h2><table style="width:100%;border-collapse:collapse">${pillarRows}</table>${weakestNote}</div>
<div style="border:1px solid #e2e8f0;border-top:none;padding:28px 40px"><h2 style="font-size:13px;font-weight:700;color:#271789;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:16px">Recommended Next Steps</h2><ol style="list-style:none;padding:0">${recItems}</ol></div>
<div style="background:#271789;color:#fff;padding:28px 40px;border-radius:0 0 10px 10px"><h2 style="font-size:17px;font-weight:700;margin-bottom:8px">Want a cloud security roadmap tailored to your organisation?</h2><p style="font-size:13px;color:#e2e8f0;line-height:1.65;margin-bottom:12px">Naval offers DevSecOps workshops and advisory engagements that meet teams at their actual maturity level — from pipeline security basics through to autonomous security operations.</p><div style="font-size:13px;color:#00f1d4;font-weight:700">Book at nthakur.com/work-with-me</div></div>
<div style="padding:18px 40px;text-align:center"><p style="font-size:11px;color:#94a3b8">© ${new Date().getFullYear()} Naval Thakur · nthakur.com · Results are based on self-reported responses and are indicative, not prescriptive.</p></div>
</body></html>`;
};

const SecOpsAssessment: React.FC = () => {
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
      form.append('topic', 'Cloud Security Maturity Assessment');
      form.append('message', `SecOps assessment complete. Overall: Layer ${overallLayer} (${LAYER_NAMES[overallLayer]}). ` + pillarScores.map(p => `${p.key}=L${p.layer}`).join(', '));
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
      <SEO title="Cloud Security Maturity Assessment | Naval Thakur" description={`${TOTAL_QUESTIONS} questions across Identity & Access, Threat Detection, Compliance, and Incident Response. Find your security maturity layer.`} />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 text-secondary-dark dark:text-secondary text-sm font-bold mb-6">Cloud Security Maturity Assessment</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How secure is your cloud operations posture?</h1>
          <p className="text-xl text-slate-200 max-w-2xl leading-relaxed">{TOTAL_QUESTIONS} questions across four pillars. About 4 minutes. Receive your security maturity layer, a per-pillar breakdown, and a downloadable PDF report.</p>
        </div>
      </div>
      <Section bg="white">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">{PILLARS.map(p => (<div key={p.key} className={`rounded-xl border p-4 text-center ${p.bgClass} ${p.borderClass}`}><p.icon className={`w-7 h-7 mx-auto mb-2 ${p.colorClass}`} /><div className="text-sm font-bold text-slate-700 dark:text-slate-200">{p.key}</div><div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{p.questions.length} questions</div></div>))}</div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8"><h3 className="font-bold text-slate-900 dark:text-white mb-3">What you will get</h3><ul className="space-y-2">{['Your security maturity layer (Reactive → Proactive → Predictive → Autonomous)', 'Per-pillar scores with a visual breakdown', 'Prioritised recommendations for your next layer', 'A downloadable PDF report for your records'].map(item => (<li key={item} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-4 h-4 text-secondary-dark dark:text-secondary shrink-0" />{item}</li>))}</ul></div>
          <button onClick={() => setStep(1)} className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors text-lg shadow-lg">Start Assessment <ArrowRight size={20} className="ml-2" /></button>
        </div>
      </Section>
    </>
  );

  if (step >= 1 && step <= NUM_PILLARS && currentPillar) {
    const PIcon = currentPillar.icon;
    return (
      <>
        <SEO title="Cloud Security Assessment | Naval Thakur" description="Cloud Security Maturity Assessment in progress." />
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
      <SEO title="Cloud Security Assessment | Naval Thakur" description="Assessment complete — unlock your results." />
      <div className="bg-primary text-white py-20"><div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center"><CheckCircle2 className="w-12 h-12 text-secondary mx-auto mb-4" /><h1 className="text-4xl font-bold mb-4">Assessment complete.</h1><p className="text-xl text-slate-200 leading-relaxed">Enter your email to unlock your full results and download your personalised PDF report.</p></div></div>
      <Section bg="white"><div className="max-w-md mx-auto"><form onSubmit={handleEmailSubmit} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-lg space-y-4"><div><label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Name</label><input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm transition" /></div><div><label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Work email <span className="text-red-500">*</span></label><input type="email" placeholder="you@company.com" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm transition" /></div>{emailStatus === 'error' && (<div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"><AlertCircle size={16} />Something went wrong.{' '}<button type="button" onClick={() => setStep(RESULTS_STEP)} className="underline font-semibold">Skip and view results</button></div>)}<button type="submit" disabled={emailStatus === 'submitting'} className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60 shadow-md">{emailStatus === 'submitting' ? <Loader2 className="animate-spin" size={18} /> : <><Mail size={18} /> View My Results</>}</button><p className="text-xs text-slate-400 text-center">No spam. Unsubscribe anytime.</p></form></div></Section>
    </>
  );

  return (
    <>
      <SEO title={`Security Results: ${LAYER_NAMES[overallLayer]} | Naval Thakur`} description={`Your organisation is at Security Layer ${overallLayer}: ${LAYER_NAMES[overallLayer]}.`} />
      <div className="bg-primary text-white py-20"><div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl"><div className="inline-block px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 text-secondary-dark dark:text-secondary text-sm font-bold mb-6">Your Results</div><div className="flex flex-col sm:flex-row items-start sm:items-center gap-6"><div className="bg-secondary/10 border-2 border-secondary/40 rounded-2xl px-8 py-5 text-center shrink-0"><div className="text-xs font-bold uppercase tracking-widest text-secondary mb-1">Overall</div><div className="text-5xl font-black text-white leading-none">L{overallLayer}</div><div className="text-sm font-bold text-slate-200 mt-2">{LAYER_NAMES[overallLayer]}</div></div><div><h1 className="text-3xl md:text-4xl font-bold mb-2">{overallMeta.label}</h1><p className="text-lg text-slate-200 leading-relaxed">{overallMeta.description}</p></div></div></div></div>
      <Section bg="gray"><div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm"><h2 className="text-base font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-secondary-dark dark:text-secondary" /> Score by Pillar</h2><div className="space-y-5">{pillarScores.map(p => { const pd = PILLARS.find(x => x.key === p.key)!; const PIcon = pd.icon; const pct = Math.max(4, Math.round(((p.score - 1) / 3) * 100)); const lm = LAYER_META[p.layer]; return (<div key={p.key}><div className="flex items-center justify-between mb-2"><div className="flex items-center gap-2"><PIcon className={`w-4 h-4 ${pd.colorClass}`} /><span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{p.key}</span></div><span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${lm.bg} ${lm.color}`}>Layer {p.layer} — {LAYER_NAMES[p.layer]}</span></div><div className="bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden"><div className="h-3 rounded-full bg-primary transition-all duration-700" style={{ width: `${pct}%` }} /></div></div>); })}</div>{weakest.layer < overallLayer && (<div className="mt-5 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg"><p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed"><strong>Constraint pillar: {weakest.key}</strong> — This is your lowest score and the bottleneck in your security posture. Prioritise improvements here first.</p></div>)}</div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm"><h2 className="text-base font-bold text-slate-900 dark:text-white mb-5">Recommended Next Steps</h2><ol className="space-y-4">{RECOMMENDATIONS[overallLayer].map((rec, i) => (<li key={i} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed"><span className="shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>{rec}</li>))}</ol></div>
        <div className="flex flex-col sm:flex-row gap-4"><button onClick={handleDownloadPDF} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-md"><Download size={18} /> Download PDF Report</button><Link to="/contact?topic=DevSecOps Advisory" className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary dark:text-white dark:border-white font-bold rounded-xl hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary transition-colors">Book DevSecOps Advisory <ArrowRight size={16} /></Link></div>
        <div className="text-center pt-2"><button onClick={reset} className="text-sm text-slate-400 hover:text-primary dark:hover:text-secondary transition-colors underline">Retake assessment</button></div>
      </div></Section>
    </>
  );
};

export default SecOpsAssessment;
