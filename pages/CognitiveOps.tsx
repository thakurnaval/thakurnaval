import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Layers, ShieldCheck, TrendingUp, Terminal, Cpu, CheckCircle2, ChevronRight, Lightbulb, GitMerge, BarChart3, Users } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import NewsletterSignup from '../components/NewsletterSignup';

interface MaturityLayer {
  level: number;
  name: string;
  label: string;
  description: string;
  characteristics: string[];
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  pillars: { name: string; link: string }[];
}

const MATURITY_LAYERS: MaturityLayer[] = [
  {
    level: 1,
    name: 'Manual',
    label: 'Layer 1 — Manual Ops',
    description: 'Traditional IT operations. Deployments are manual events, security is a gate at the end, and cloud costs are a surprise on the monthly bill.',
    characteristics: [
      'Deployments require manual steps and approvals',
      'Security reviews happen after code is written',
      'No visibility into cloud cost by team or product',
      'Incidents are handled reactively, post-failure',
      'Knowledge lives in people, not systems',
    ],
    icon: GitMerge,
    color: 'text-slate-500',
    bgColor: 'bg-slate-100 dark:bg-slate-800',
    borderColor: 'border-slate-300 dark:border-slate-600',
    pillars: [],
  },
  {
    level: 2,
    name: 'Automated',
    label: 'Layer 2 — Automated DevSecOps',
    description: 'CI/CD pipelines are running. Security scans are in the pipeline. Cloud costs are tagged and visible. This is where most mature enterprises sit today.',
    characteristics: [
      'CI/CD pipelines deploy on every merge to main',
      'SAST, DAST, and dependency scanning in every PR',
      'Cloud resources are tagged; showback is in place',
      'SLOs are defined; on-call is structured',
      'Infrastructure is code (Terraform, Pulumi, Bicep)',
    ],
    icon: Terminal,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-300 dark:border-blue-700',
    pillars: [
      { name: 'DevOps Practices', link: '/devops/practices' },
      { name: 'DevSecOps', link: '/secops/devsecops-practices' },
      { name: 'FinOps Framework', link: '/finops/framework' },
    ],
  },
  {
    level: 3,
    name: 'Intelligent',
    label: 'Layer 3 — Intelligent Operations',
    description: 'AI and ML are augmenting decisions. AIOps flags anomalies before they become incidents. GenAI accelerates development. FinOps forecasting is predictive, not reactive.',
    characteristics: [
      'AIOps: anomaly detection and incident correlation',
      'GenAI-assisted code review, test generation, and documentation',
      'Predictive cost forecasting with ML models',
      'Automated security triage using LLMs',
      'Platform teams enable self-service via AI assistants',
    ],
    icon: Cpu,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-300 dark:border-purple-700',
    pillars: [
      { name: 'GenAI Fundamentals', link: '/genai/fundamentals' },
      { name: 'LLMOps', link: '/genai/llmops' },
      { name: 'AI in SDLC', link: '/ai-sdlc' },
    ],
  },
  {
    level: 4,
    name: 'Cognitive',
    label: 'Layer 4 — Cognitive (AI-Native Ops)',
    description: 'The frontier. AI agents operate autonomously within defined guardrails. The system heals itself, optimizes spend in real-time, and surfaces decisions that humans need to make — rather than waiting for humans to look.',
    characteristics: [
      'AI agents remediate known incident patterns without human intervention',
      'Self-optimizing cloud spend: reserved capacity purchased and released by policy',
      'Security policy enforced as autonomous agents, not periodic audits',
      'RAG-powered knowledge bases replace human runbooks',
      'Engineering teams set intent; AI executes and reports exceptions',
    ],
    icon: BrainCircuit,
    color: 'text-secondary-dark dark:text-secondary',
    bgColor: 'bg-secondary/10 dark:bg-secondary/5',
    borderColor: 'border-secondary dark:border-secondary/60',
    pillars: [
      { name: 'AI Agents', link: '/genai/agents' },
      { name: 'RAG Architecture', link: '/genai/rag' },
      { name: 'AI Governance', link: '/genai/governance' },
      { name: 'Cognitive DevSecOps', link: '/secops/cognitive-devsecops' },
    ],
  },
];

const PILLARS = [
  { icon: Terminal, title: 'DevOps', link: '/devops', desc: 'The delivery engine. CI/CD, SRE, Platform Engineering, and Chaos Engineering form the foundation every higher layer depends on.' },
  { icon: ShieldCheck, title: 'SecOps', link: '/secops', desc: 'Security embedded at every layer — from SAST in PRs at Layer 2 to autonomous policy enforcement at Layer 4.' },
  { icon: TrendingUp, title: 'FinOps', link: '/finops', desc: 'Financial accountability across the stack — from cost tagging at Layer 2 to AI-native spend optimization at Layer 4.' },
  { icon: BrainCircuit, title: 'GenAI', link: '/genai', desc: 'The catalyst for Layers 3 and 4. LLMOps, RAG, and AI Agents transform operations from reactive to self-directed.' },
];

const CognitiveOps: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(2);

  const active = MATURITY_LAYERS.find(l => l.level === activeLayer)!;

  const cognitiveOpsSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "The CognitiveOps Model — From Automated DevSecOps to AI-Native Operations",
    "author": { "@type": "Person", "name": "Naval Thakur" },
    "description": "A four-layer maturity model for enterprise cloud operations, from Manual through Automated DevSecOps, Intelligent AIOps, to fully Cognitive AI-native operations.",
    "url": "https://nthakur.com/#/cognitiveops",
  };

  return (
    <>
      <SEO
        title="The CognitiveOps Model | Naval Thakur"
        description="A four-layer framework for enterprise cloud operations maturity — from manual pipelines through automated DevSecOps to AI-native, self-optimizing operations."
        structuredData={cognitiveOpsSchema}
      />

      {/* Hero */}
      <div className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-primary/80"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="w-full h-full bg-gradient-to-l from-secondary to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
          <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 text-secondary-dark dark:text-secondary text-sm font-bold mb-6">
            Original Framework by Naval Thakur
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
            The CognitiveOps Model
          </h1>
          <p className="text-xl text-slate-200 max-w-3xl leading-relaxed mb-8">
            A four-layer maturity model for enterprise cloud operations — from manual, reactive IT through automated DevSecOps pipelines to fully AI-native, self-optimizing operations.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/cognitiveops/assessment"
              className="inline-flex items-center px-6 py-3 bg-secondary text-primary font-bold rounded-lg hover:bg-secondary-hover transition-colors"
            >
              Take the Maturity Assessment <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link
              to="/cognitiveops/playbook"
              className="inline-flex items-center px-6 py-3 border border-white/30 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
            >
              Download the Playbook
            </Link>
          </div>
        </div>
      </div>

      {/* The Core Insight */}
      <Section bg="white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary dark:text-white mb-6">The Insight Behind the Model</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                After 18 years of leading DevOps transformations across energy, technology, and global delivery — one pattern repeats: <strong>organizations that automate everything still aren't operating intelligently.</strong>
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                They have pipelines that deploy automatically. Security scans that run on every PR. Dashboards showing cloud spend by team. And yet — incidents still surprise them. Cloud costs still spike unexpectedly. Security vulnerabilities still hide in plain sight until an audit finds them.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                The CognitiveOps Model exists to name the gap between <em>automated</em> and <em>intelligent</em> — and show the path from one to the other.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
              <div className="flex items-start gap-4 mb-6">
                <Lightbulb className="w-8 h-8 text-secondary-dark dark:text-secondary shrink-0" />
                <div>
                  <h3 className="font-bold text-primary dark:text-white text-lg mb-1">The Core Claim</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Automation reduces manual effort. Intelligence reduces the need for human decisions altogether — because the system makes the right call automatically, within guardrails humans set.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 mb-6">
                <BarChart3 className="w-8 h-8 text-secondary-dark dark:text-secondary shrink-0" />
                <div>
                  <h3 className="font-bold text-primary dark:text-white text-lg mb-1">Where Most Orgs Are</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Most enterprise engineering organizations are between Layer 1 and Layer 2. A subset of high-performing teams are at Layer 2. Fewer than 5% of organizations have reached Layer 3.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-secondary-dark dark:text-secondary shrink-0" />
                <div>
                  <h3 className="font-bold text-primary dark:text-white text-lg mb-1">Who This Is For</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    CTOs, Engineering Directors, Platform Leads, and DevOps practitioners in organizations with 50+ engineers who have automated pipelines and want to know what comes next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Interactive Maturity Model */}
      <Section bg="gray">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">The Four Layers</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Each layer builds on the one below it. You cannot reach Layer 3 without Layer 2 being solid. Select a layer to explore.
            </p>
          </div>

          {/* Layer selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {MATURITY_LAYERS.map(layer => (
              <button
                key={layer.level}
                onClick={() => setActiveLayer(layer.level)}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  activeLayer === layer.level
                    ? `${layer.bgColor} ${layer.borderColor} shadow-md`
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <layer.icon className={`w-6 h-6 mb-2 ${activeLayer === layer.level ? layer.color : 'text-slate-400'}`} />
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Layer {layer.level}</div>
                <div className={`text-sm font-bold ${activeLayer === layer.level ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                  {layer.name}
                </div>
              </button>
            ))}
          </div>

          {/* Active layer detail */}
          <div className={`rounded-2xl border-2 p-8 ${active.bgColor} ${active.borderColor} transition-all duration-300`}>
            <div className="flex items-start gap-4 mb-6">
              <div className={`p-3 rounded-xl bg-white dark:bg-slate-900 shadow-sm`}>
                <active.icon className={`w-8 h-8 ${active.color}`} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{active.label}</h3>
                <p className="text-slate-600 dark:text-slate-400 mt-2 leading-relaxed max-w-3xl">{active.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Characteristics at this layer</h4>
                <ul className="space-y-3">
                  {active.characteristics.map(c => (
                    <li key={c} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-secondary-dark dark:text-secondary shrink-0 mt-0.5" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              {active.pillars.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Explore the relevant pillars</h4>
                  <div className="space-y-2">
                    {active.pillars.map(p => (
                      <Link
                        key={p.link}
                        to={p.link}
                        className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-secondary dark:hover:border-secondary text-sm font-medium text-primary dark:text-white group transition-colors"
                      >
                        {p.name}
                        <ChevronRight size={16} className="text-slate-400 group-hover:text-secondary transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* The Four Pillars */}
      <Section bg="white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">The Four Pillars</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              CognitiveOps spans four domains. Maturity in all four is required to progress up the layers — you cannot have AI-native operations without strong FinOps governance underneath them.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.map(({ icon: Icon, title, link, desc }) => (
              <Link
                key={title}
                to={link}
                className="group flex items-start gap-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:border-secondary dark:hover:border-secondary hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 group-hover:border-secondary/40 transition-colors shrink-0">
                  <Icon className="w-6 h-6 text-primary dark:text-slate-300 group-hover:text-secondary transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-secondary transition-colors">{title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
                  <div className="mt-3 flex items-center text-sm font-semibold text-secondary-dark dark:text-secondary">
                    Explore <ArrowRight size={14} className="ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Where Are You? CTA */}
      <Section className="py-12 bg-slate-900 dark:bg-slate-950 border-y border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 shadow-2xl border border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-white md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Which layer is your organization at?</h2>
                <p className="text-slate-200 text-lg">
                  Take the <Link to="/cognitiveops/assessment" className="text-secondary-dark dark:text-secondary font-bold hover:underline">CognitiveOps Maturity Assessment</Link> to find out — and get a prioritized roadmap for your next layer.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end gap-3 flex-wrap">
                <Link to="/cognitiveops/assessment" className="inline-block px-6 py-3 bg-secondary hover:bg-secondary-hover text-primary font-bold rounded-lg transition-colors shadow-lg">
                  Take the Assessment
                </Link>
                <Link to="/contact?topic=Workshop / Training" className="inline-block px-6 py-3 border border-white/30 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors">
                  Book a Workshop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Newsletter */}
      <Section bg="white">
        <div className="max-w-4xl mx-auto">
          <NewsletterSignup />
        </div>
      </Section>
    </>
  );
};

export default CognitiveOps;
