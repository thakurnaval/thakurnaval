
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingDown, Zap, BrainCircuit, Layers, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';

interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  tag: string;
  tagColor: string;
  icon: React.ElementType;
  title: string;
  tagline: string;
  outcome: string;
  outcomeLabel: string;
  challenge: string[];
  approach: string[];
  results: string[];
  technologies: string[];
  engagementType: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'genpact-alm',
    client: 'Genpact',
    industry: 'Global Delivery',
    tag: 'DevOps',
    tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    icon: TrendingDown,
    title: '$600K Saved via ALM Modernisation',
    tagline: 'Migrating a legacy incident management system to TFS to eliminate licensing cost and consolidate the application lifecycle.',
    outcome: '$600K',
    outcomeLabel: 'Cost Savings Delivered',
    challenge: [
      'The organisation was running a costly, fragmented incident management system with high licensing overhead and poor integration with the delivery pipeline.',
      'Multiple teams operated in silos with no unified Application Lifecycle Management (ALM) toolchain, leading to duplicated effort and audit risk.',
      'Leadership was sceptical about migrating critical ITSM workflows to a developer-centric platform like TFS.',
    ],
    approach: [
      'Conducted a full current-state assessment of incident management workflows, licensing costs, and integration points.',
      'Built a business case quantifying the total cost of ownership gap between the legacy system and TFS, presenting it directly to senior leadership.',
      'Designed and led the phased migration: process template customisation, source code integration, and build/release pipeline consolidation.',
      'Ran change management sessions to bring sceptical stakeholders on board before go-live.',
    ],
    results: [
      '$600K in direct cost savings through licence elimination and tool consolidation.',
      'Unified ALM platform across development, operations, and support teams.',
      'Reduced mean time to resolve incidents through tighter pipeline integration.',
      'Foundation laid for subsequent DevOps maturity improvements.',
    ],
    technologies: ['Azure DevOps (TFS)', 'ALM', 'ITSM', 'Process Template Customisation', 'CI/CD'],
    engagementType: 'Internal Transformation',
  },
  {
    id: 'slb-finops',
    client: 'SLB',
    industry: 'Energy',
    tag: 'FinOps',
    tagColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
    icon: TrendingDown,
    title: '30% Cloud Spend Reduction via FinOps Practice',
    tagline: 'Building a Cloud Economics function and cost model that gave SLB full visibility and control over its hybrid cloud portfolio.',
    outcome: '30%',
    outcomeLabel: 'Average Cloud Cost Reduction',
    challenge: [
      'Cloud spend across Azure, AWS, and GCP had grown rapidly with no centralised visibility or chargeback mechanism — budgets were being exceeded without accountability.',
      'Reserved Instance purchasing was ad-hoc, rightsizing was manual, and there was no tagging strategy, making cost allocation to business units impossible.',
      'Finance and engineering teams operated with completely different views of cloud cost, making forecasting unreliable.',
    ],
    approach: [
      'Established the Cloud Economics function as part of the Cloud Centre of Excellence — defining roles, processes, and tooling from scratch.',
      'Designed and product-managed COSMO (Hosting Cost Model), a cost attribution and allocation platform giving real-time charge-back to each business unit.',
      'Implemented a comprehensive tagging strategy across 3 cloud providers as the foundational data layer for allocation.',
      'Ran structured Reserved Instance and Savings Plans purchasing cycles, rightsizing campaigns, and spot/preemptible instance adoption.',
      'Introduced FinOps KPIs and a monthly cloud cost review cadence with both engineering and finance stakeholders.',
    ],
    results: [
      '30% average reduction in cloud spend across the portfolio.',
      'Full cost attribution to business units enabled accurate chargeback and accountability.',
      'Reserved Instance coverage increased significantly, reducing on-demand spend for stable workloads.',
      'Forecasting accuracy improved materially, reducing budget overruns.',
      'FinOps practice embedded as a sustainable capability within the organisation.',
    ],
    technologies: ['Azure', 'AWS', 'GCP', 'FinOps Framework', 'Reserved Instances', 'Cost Tagging', 'KQL', 'Azure Resource Graph'],
    engagementType: 'Practice Build',
  },
  {
    id: 'slb-devops-platform',
    client: 'SLB',
    industry: 'Energy',
    tag: 'DevOps',
    tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    icon: Zap,
    title: 'Legacy Platform Decommission & DevOps Transformation',
    tagline: 'Retiring a Serena-based toolchain and 20+ servers to migrate 100+ teams onto a modern, cloud-native delivery platform.',
    outcome: '20+',
    outcomeLabel: 'Legacy Servers Decommissioned',
    challenge: [
      'SLB\'s delivery organisation was running on a legacy Serena tools suite — a costly, unmaintainable system with poor developer experience and no CI/CD capability.',
      'Over 100 cross-functional, distributed teams needed to migrate without disrupting active delivery programmes.',
      'The organisation lacked an Agile ways-of-working baseline, meaning tooling change had to be accompanied by culture and process change.',
    ],
    approach: [
      'Led a full obsolescence and modernisation programme: mapping all Serena dependencies, sequencing migrations to minimise risk, and managing stakeholder communication across geographies.',
      'Migrated teams to Azure DevOps and GitHub Enterprise, establishing standard pipeline templates and branching strategies.',
      'Introduced DevOps maturity assessments as a diagnostic tool — teams were assessed before and after migration to track progress.',
      'Ran Agile transformation workshops in parallel, enabling teams to adopt sprint cadences, retrospectives, and cross-functional collaboration.',
      'Decommissioned the Serena toolchain and 20+ physical servers, reclaiming infrastructure cost and reducing operational risk.',
    ],
    results: [
      '20+ legacy servers decommissioned, reducing infrastructure and licensing overhead.',
      '100+ teams migrated to a modern, standardised delivery platform.',
      'CI/CD capability introduced across the portfolio — reducing lead time for changes from weeks to days.',
      'Measurable improvement in DevOps maturity scores post-migration.',
      'Foundation for subsequent GenAI and Cognitive DevSecOps initiatives.',
    ],
    technologies: ['Azure DevOps', 'GitHub Enterprise', 'CI/CD', 'Agile', 'DORA Metrics', 'Platform Engineering'],
    engagementType: 'Platform Modernisation',
  },
  {
    id: 'slb-cognitive-devsecops',
    client: 'SLB',
    industry: 'Energy',
    tag: 'GenAI',
    tagColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    icon: BrainCircuit,
    title: 'Enabling Cognitive DevSecOps via GenAI Integration',
    tagline: 'Embedding GenAI tooling across all phases of the DevOps lifecycle to move from automated pipelines to intelligent, self-improving delivery systems.',
    outcome: 'AI-Native',
    outcomeLabel: 'DevOps Lifecycle Achieved',
    challenge: [
      'Despite a modern CI/CD platform, the delivery lifecycle was still largely reactive — security gates, quality checks, and incident response all required significant manual intervention.',
      'Teams were experimenting with individual AI coding tools in an uncoordinated way, creating governance and IP risk.',
      'Leadership needed a coherent strategy for GenAI adoption across the SDLC — not point tools, but a unified capability.',
    ],
    approach: [
      'Defined a Cognitive DevSecOps framework mapping GenAI use cases to each phase: requirements, coding, testing, security scanning, deployment, and incident response.',
      'Evaluated and onboarded AI-assisted coding tools (GitHub Copilot, etc.) with appropriate governance guardrails for IP and data privacy.',
      'Integrated AI-powered security analysis into the CI pipeline — reducing false positives and accelerating triage.',
      'Aligned the initiative to i3PM (Integrated Project, Program and Portfolio Management) and DORA framework KPIs to ensure measurability.',
      'Accountable for the toolchain: Planisware, Azure DevOps, GitHub Enterprise, and SonarQube — ensuring AI tooling augmented, not bypassed, existing controls.',
    ],
    results: [
      'GenAI embedded across all phases of the DevOps lifecycle — from requirements to monitoring.',
      'AI-assisted code review reduced time spent on routine review comments, freeing senior engineers for architecture decisions.',
      'Security signal-to-noise ratio improved through AI-assisted triage, reducing alert fatigue.',
      'Coherent governance model for AI tool adoption adopted organisation-wide.',
      'Platform positioned to progress from Automated to Intelligent maturity on the CognitiveOps model.',
    ],
    technologies: ['GitHub Copilot', 'Azure DevOps', 'GitHub Enterprise', 'SonarQube', 'LLMs', 'DORA', 'i3PM', 'Planisware'],
    engagementType: 'AI Transformation',
  },
];

const tagBorderMap: Record<string, string> = {
  DevOps: 'border-blue-200 dark:border-blue-800/40',
  FinOps: 'border-teal-200 dark:border-teal-800/40',
  GenAI: 'border-purple-200 dark:border-purple-800/40',
};

const CaseStudies: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) => setExpanded(prev => prev === id ? null : id);

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Naval Thakur Case Studies",
    "description": "Real-world transformation case studies in DevOps, FinOps, and GenAI by Naval Thakur.",
    "numberOfItems": CASE_STUDIES.length,
  };

  return (
    <>
      <SEO
        title="Case Studies | Naval Thakur — DevOps, FinOps & GenAI Transformations"
        description="Real-world transformation outcomes: $600K cost savings, 30% cloud spend reduction, legacy platform decommissions, and AI-native DevOps at enterprise scale."
        structuredData={pageSchema}
      />

      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary-dark dark:text-secondary text-xs font-bold uppercase tracking-wider mb-6">
            Proof of Work
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Case Studies</h1>
          <p className="text-xl text-slate-200 max-w-2xl leading-relaxed">
            Real transformations. Real numbers. Drawn from 18+ years of enterprise cloud, DevOps, and FinOps engagements.
          </p>
        </div>
      </div>

      {/* Outcome summary bar */}
      <div className="bg-secondary/10 dark:bg-secondary/5 border-b border-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-secondary/20">
            {[
              { value: '$600K+', label: 'Cost saved (single engagement)' },
              { value: '30%', label: 'Avg cloud spend reduction' },
              { value: '20+', label: 'Legacy servers decommissioned' },
              { value: '100+', label: 'Teams migrated to modern platform' },
            ].map(({ value, label }) => (
              <div key={label} className="py-4 px-6 text-center">
                <p className="text-2xl font-bold text-primary dark:text-white">{value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto space-y-6">
          {CASE_STUDIES.map((cs) => {
            const Icon = cs.icon;
            const isOpen = expanded === cs.id;
            const borderColor = tagBorderMap[cs.tag] ?? 'border-slate-200 dark:border-slate-700';

            return (
              <div key={cs.id} className={`rounded-2xl border ${borderColor} bg-white dark:bg-slate-800 overflow-hidden transition-shadow ${isOpen ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}`}>
                {/* Card header — always visible */}
                <button
                  onClick={() => toggle(cs.id)}
                  className="w-full text-left p-8 flex items-start gap-5"
                  aria-expanded={isOpen}
                >
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl shrink-0 mt-0.5">
                    <Icon className="w-6 h-6 text-primary dark:text-secondary" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded ${cs.tagColor}`}>{cs.tag}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{cs.client} · {cs.industry}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">{cs.engagementType}</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{cs.title}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{cs.tagline}</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-3xl font-bold text-primary dark:text-secondary leading-none">{cs.outcome}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[100px]">{cs.outcomeLabel}</p>
                    <div className="mt-3 text-slate-400 dark:text-slate-500">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="px-8 pb-8 pt-0 border-t border-slate-100 dark:border-slate-700 animate-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">The Challenge</h3>
                        <ul className="space-y-2">
                          {cs.challenge.map((point, i) => (
                            <li key={i} className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 mt-2 shrink-0"></span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">The Approach</h3>
                        <ul className="space-y-2">
                          {cs.approach.map((point, i) => (
                            <li key={i} className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 mt-2 shrink-0"></span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">The Results</h3>
                        <ul className="space-y-2">
                          {cs.results.map((point, i) => (
                            <li key={i} className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-secondary-dark dark:text-secondary shrink-0 mt-0.5" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {cs.technologies.map(t => (
                          <span key={t} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium rounded">{t}</span>
                        ))}
                      </div>
                      <Link
                        to={`/contact?topic=Consulting`}
                        className="text-sm font-bold text-secondary-dark dark:text-secondary hover:underline flex items-center gap-1 shrink-0"
                      >
                        Discuss a similar engagement <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto mt-12 p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
          <Layers className="w-8 h-8 text-secondary-dark dark:text-secondary mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Facing a similar challenge?</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-xl mx-auto">
            These case studies represent the kind of work Naval does in fractional advisory and consulting engagements. If your organisation is tackling a DevOps, FinOps, or GenAI transformation, let's talk.
          </p>
          <Link
            to="/work-with-me"
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
          >
            See how to engage <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </Section>
    </>
  );
};

export default CaseStudies;
