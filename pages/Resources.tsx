import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ClipboardCheck, FileText, Boxes, Library } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';

interface Resource { title: string; to: string; format: string; desc: string }

const GROUPS: { title: string; intro: string; icon: React.ElementType; items: Resource[] }[] = [
  {
    title: 'Guides & playbooks',
    intro: 'Free PDFs. Enter your email once on each page and download instantly.',
    icon: FileText,
    items: [
      { title: 'The AI-Native SDLC Field Guide', to: '/ai-sdlc/field-guide', format: '7-page PDF', desc: 'Run Plan, Design, Build, Test, Release and Operate with AI agents without losing control. Includes a readiness check.' },
      { title: 'The CognitiveOps Playbook', to: '/cognitiveops/playbook', format: 'PDF', desc: 'The CognitiveOps Model in practice: moving DevOps, SecOps, FinOps and GenAI from manual to cognitive.' },
      { title: 'The DevSecOps Playbook', to: '/secops/devsecops-playbook', format: '6-page PDF', desc: 'Controls, tools, gates and metrics for every pipeline stage, and a 90-day rollout.' },
      { title: 'The GenAI Adoption Framework', to: '/genai/adoption-framework', format: '5-page PDF', desc: 'Five stages from Explore to Lead, use-case scoring, risk tiers and an operating model.' },
      { title: 'DevOps Maturity Roadmap', to: '/devops/roadmap-guide', format: '4-page PDF', desc: 'Five maturity levels across six capability domains, with DORA benchmarks and a 90-day plan.' },
      { title: 'The 7 Cs of DevOps', to: '/devops/7cs', format: 'PDF', desc: 'A short, shareable guide to the seven continuous practices behind DevOps.' },
      { title: '30 Days of FinOps', to: '/finops/30-day-guide', format: 'PDF', desc: 'A daily challenge to build cloud cost visibility, optimisation and culture in a month.' },
      { title: 'FinOps Certification Prep', to: '/finops/cert-prep', format: 'PDF', desc: 'Study pack for the FinOps Certified Practitioner exam.' },
    ],
  },
  {
    title: 'Templates',
    intro: 'Copy-paste starters for real projects.',
    icon: Boxes,
    items: [
      { title: 'Terraform & Bicep Starter Templates', to: '/architecture/iac-templates', format: '5 templates', desc: 'Cloud Run with keyless GitHub deploys, an Azure baseline with enforced tags, AWS state, a Bicep Container App and a Terraform plan pipeline.' },
    ],
  },
  {
    title: 'Maturity assessments',
    intro: '8–15 minutes each, with a scored report and a pillar-by-pillar plan.',
    icon: ClipboardCheck,
    items: [
      { title: 'CognitiveOps Maturity', to: '/cognitiveops/assessment', format: 'Assessment', desc: 'The flagship: DevOps, SecOps, FinOps and GenAI in one score.' },
      { title: 'DevOps Maturity', to: '/devops/assessment', format: 'Assessment', desc: 'Delivery, platform, reliability and culture.' },
      { title: 'FinOps Maturity', to: '/finops/assessment', format: 'Assessment', desc: 'Visibility, accountability, optimisation and forecasting.' },
      { title: 'Cloud Security', to: '/secops/assessment', format: 'Assessment', desc: 'Identity, detection, compliance and incident response.' },
      { title: 'GenAI Readiness', to: '/genai/assessment', format: 'Assessment', desc: 'Data, skills, governance and adoption.' },
      { title: 'All assessments', to: '/assessments', format: '8 assessments', desc: 'Including Agile, Well-Architected and Project Management.' },
    ],
  },
  {
    title: 'Reference',
    intro: 'Browse any time, no sign-up.',
    icon: Library,
    items: [
      { title: 'Mental Models', to: '/explore/mental-models', format: 'Library', desc: '214 thinking tools organised by the situation you are in, each with when to use it, how to apply it and what to watch out for.' },
      { title: 'Toolkits', to: '/explore/toolkits', format: '7 toolkits', desc: 'Step-by-step methods with templates: incident review, architecture decisions, platform strategy, better meetings, FinOps cost review, AI use-case selection and team health checks.' },
      { title: 'Book Summaries', to: '/explore/books', format: 'Library', desc: 'Key ideas from the books that shaped how I lead and build.' },
      { title: 'The CognitiveOps Brief', to: '/newsletter', format: 'Newsletter', desc: 'One practical lesson every two weeks.' },
    ],
  },
];

const Resources: React.FC = () => (
  <>
    <SEO
      title="Free Resources — Guides, Templates & Assessments | Naval Thakur"
      description="Free playbooks, PDF guides, Terraform and Bicep templates, maturity assessments and a mental-models library for engineering leaders working on DevOps, SecOps, FinOps and GenAI."
    />
    <div className="bg-primary text-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-400/40 bg-blue-400/10 text-blue-300 text-sm font-bold mb-6">
          <BookOpen size={14} /> Free resources
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Guides, templates and assessments</h1>
        <p className="text-xl text-slate-200 max-w-3xl">Everything I give away, in one place: practical playbooks, starter templates, maturity assessments and reference libraries for engineering leaders.</p>
      </div>
    </div>
    {GROUPS.map((g, gi) => (
      <Section key={g.title} bg={gi % 2 === 0 ? 'white' : 'gray'}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <g.icon className="w-6 h-6 text-blue-700 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{g.title}</h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mb-6">{g.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {g.items.map(r => (
              <Link key={r.to} to={r.to} className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 hover:border-blue-500 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400">{r.title}</h3>
                  <span className="shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">{r.format}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{r.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 dark:text-blue-400">Open <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    ))}
  </>
);

export default Resources;
