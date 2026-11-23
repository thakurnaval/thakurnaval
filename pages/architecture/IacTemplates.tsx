import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Boxes, Copy, Check, Download, Lock, ArrowRight } from 'lucide-react';
import Section from '../../components/Section';
import SEO from '../../components/SEO';
import { GatedGuideHero } from '../../components/GatedGuide';
import { trackDownload } from '../../src/services/analytics';
import { IAC_TEMPLATES, type IacTemplate } from './iacTemplateData';

const PAGE_URL = 'https://nthakur.com/architecture/iac-templates';
const UNLOCK_KEY = 'nthakur.iacTemplatesUnlocked';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Terraform and Bicep Starter Templates — Free',
  description: 'Production-minded starter templates: Cloud Run with keyless GitHub deploys, an Azure baseline with enforced tags, Terraform state on AWS, an Azure Container App in Bicep, and a Terraform plan pipeline.',
  author: { '@type': 'Person', name: 'Naval Thakur', url: 'https://nthakur.com/about' },
  url: PAGE_URL,
};

const readUnlocked = () => {
  try { return typeof window !== 'undefined' && window.localStorage.getItem(UNLOCK_KEY) === '1'; } catch { return false; }
};

function downloadFile(t: IacTemplate) {
  trackDownload(`IaC template: ${t.id}`);
  const blob = new Blob([t.code], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${t.id}-${t.filename.split('/').pop()}`;
  a.click();
  URL.revokeObjectURL(url);
}

const TemplateCard: React.FC<{ t: IacTemplate; unlocked: boolean }> = ({ t, unlocked }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(t.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard unavailable */ }
  };
  return (
    <article id={t.id} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">{t.tool}</span>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">{t.cloud}</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">{t.filename}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{t.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{t.summary}</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-slate-600 dark:text-slate-400 mb-4">
          {t.includes.map(i => <li key={i} className="flex gap-2"><Check size={14} className="text-blue-600 dark:text-blue-400 mt-1 shrink-0" />{i}</li>)}
        </ul>
        {unlocked ? (
          <div className="flex flex-wrap gap-2">
            <button onClick={copy} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-blue-500">
              {copied ? <><Check size={15} /> Copied</> : <><Copy size={15} /> Copy</>}
            </button>
            <button onClick={() => downloadFile(t)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800">
              <Download size={15} /> Download
            </button>
          </div>
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2"><Lock size={14} /> Enter your email above to unlock the code.</p>
        )}
      </div>
      {unlocked ? (
        <pre className="bg-slate-950 text-slate-200 text-xs leading-relaxed p-5 overflow-x-auto max-h-96"><code>{t.code}</code></pre>
      ) : null}
    </article>
  );
};

const IacTemplates: React.FC = () => {
  // Prerendered HTML is always locked; read the remembered unlock after mount to avoid a hydration mismatch.
  const [unlocked, setUnlocked] = useState(false);
  useEffect(() => { if (readUnlocked()) setUnlocked(true); }, []);
  const unlock = () => {
    setUnlocked(true);
    try { window.localStorage.setItem(UNLOCK_KEY, '1'); } catch { /* storage unavailable */ }
  };

  return (
    <>
      <SEO title="Terraform & Bicep Starter Templates — Free | Naval Thakur"
        description="Five production-minded IaC starters: Cloud Run with keyless GitHub deploys, an Azure baseline with enforced FinOps tags, Terraform state on AWS, an Azure Container App in Bicep, and a Terraform plan pipeline."
        structuredData={SCHEMA} />
      <GatedGuideHero
        badge="Free · IaC Starter Kit" badgeIcon={<Boxes size={14} />}
        title="Terraform & Bicep Starter Templates"
        intro="Five starters I reach for on real projects: secure defaults, scale-to-zero, keyless pipelines and FinOps tags built in. Copy, adapt, ship."
        bullets={IAC_TEMPLATES.map(t => `${t.tool} · ${t.title}`)}
        topic="IaC Starter Templates Download" cta="Unlock the Templates" readyText="All five templates are unlocked below."
        openLabel="Show the templates"
        onUnlocked={unlock}
        onOpen={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
        gradient="from-slate-950 via-blue-950 to-blue-900/30" accent="blue" />

      <Section bg="gray">
        <div id="templates" className="max-w-4xl mx-auto space-y-6 scroll-mt-24">
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">The templates</h2>
            <p className="text-slate-600 dark:text-slate-400">Starters, not finished platforms: review names, regions, sizes and access before you apply them. Each file lists its variables at the top.</p>
          </div>
          {IAC_TEMPLATES.map(t => <TemplateCard key={t.id} t={t} unlocked={unlocked} />)}
          <div className="rounded-2xl bg-primary text-white p-8 text-center">
            <h2 className="text-xl font-bold mb-2">Make infrastructure a golden path</h2>
            <p className="text-slate-200 mb-5">Templates help one team. A platform with policy-as-code helps every team. The DevOps assessment shows where your platform stands.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/devops/assessment" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500">DevOps Assessment <ArrowRight size={15} /></Link>
              <Link to="/secops/devsecops-playbook" className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 bg-white/10 font-bold rounded-xl hover:bg-white/20">DevSecOps Playbook <ArrowRight size={15} /></Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default IacTemplates;
