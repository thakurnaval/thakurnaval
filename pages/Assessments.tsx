import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Clock, Terminal, Users, TrendingUp, Lock,
  BrainCircuit, Building2, Briefcase, CheckCircle2,
} from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';

interface AssessmentCard {
  icon: React.ElementType;
  domain: string;
  title: string;
  description: string;
  layers: string;
  questions: number;
  minutes: number;
  route: string;
  accent: string;
}

const ASSESSMENTS: AssessmentCard[] = [
  {
    icon: BrainCircuit,
    domain: 'CognitiveOps',
    title: 'CognitiveOps Maturity',
    description: 'Measure your organisation across all four domains — DevOps, SecOps, FinOps, and GenAI — on the CognitiveOps maturity model. The flagship combined assessment.',
    layers: 'Manual → Automated → Intelligent → Cognitive',
    questions: 13,
    minutes: 4,
    route: '/cognitiveops/assessment',
    accent: 'cyan',
  },
  {
    icon: Terminal,
    domain: 'DevOps',
    title: 'DevOps Maturity',
    description: 'Assess your DevOps practice across Delivery Pipeline, Infrastructure & Platform, Observability & Reliability, and Culture & Collaboration.',
    layers: 'Reactive → Repeatable → Accelerating → Elite',
    questions: 16,
    minutes: 4,
    route: '/devops/assessment',
    accent: 'blue',
  },
  {
    icon: Users,
    domain: 'Agile',
    title: 'Agile Maturity',
    description: 'Assess your team\'s agile practices across delivery flow, planning, culture, and continuous improvement.',
    layers: 'Ad Hoc → Defined → Performing → Optimising',
    questions: 16,
    minutes: 4,
    route: '/agile/assessment',
    accent: 'indigo',
  },
  {
    icon: TrendingUp,
    domain: 'FinOps',
    title: 'FinOps Maturity',
    description: 'Evaluate your cloud financial management maturity from cost visibility and accountability through to AI-driven optimisation.',
    layers: 'Crawl → Walk → Run → Fly',
    questions: 16,
    minutes: 4,
    route: '/finops/assessment',
    accent: 'green',
  },
  {
    icon: Lock,
    domain: 'SecOps',
    title: 'Cloud Security Maturity',
    description: 'Score your security posture across identity, threat detection, compliance, and incident response capabilities.',
    layers: 'Reactive → Proactive → Predictive → Autonomous',
    questions: 16,
    minutes: 4,
    route: '/secops/assessment',
    accent: 'red',
  },
  {
    icon: BrainCircuit,
    domain: 'GenAI',
    title: 'GenAI Readiness',
    description: 'Assess your organisation\'s readiness to adopt and scale generative AI across data, skills, governance, and value delivery.',
    layers: 'Exploring → Experimenting → Scaling → Leading',
    questions: 16,
    minutes: 4,
    route: '/genai/assessment',
    accent: 'purple',
  },
  {
    icon: Building2,
    domain: 'Architecture',
    title: 'Well-Architected',
    description: 'Review your cloud architecture across all five pillars: Operational Excellence, Security, Reliability, Performance, and Cost.',
    layers: 'Foundational → Structured → Advanced → Exemplary',
    questions: 15,
    minutes: 5,
    route: '/architecture/assessment',
    accent: 'amber',
  },
  {
    icon: Briefcase,
    domain: 'Project Management',
    title: 'PM Maturity',
    description: 'Measure your project delivery maturity across scope planning, execution, risk governance, and stakeholder management.',
    layers: 'Initial → Managed → Defined → Optimised',
    questions: 16,
    minutes: 4,
    route: '/pm/assessment',
    accent: 'teal',
  },
];

const accentMap: Record<string, { badge: string; border: string; bg: string; iconBg: string; }> = {
  cyan:   { badge: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',       border: 'border-cyan-200 dark:border-cyan-800/40',     bg: 'bg-cyan-50/50 dark:bg-cyan-900/10',     iconBg: 'bg-cyan-100 dark:bg-cyan-900/30' },
  blue:   { badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',       border: 'border-blue-200 dark:border-blue-800/40',     bg: 'bg-blue-50/50 dark:bg-blue-900/10',     iconBg: 'bg-blue-100 dark:bg-blue-900/30' },
  indigo: { badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-800/40', bg: 'bg-indigo-50/50 dark:bg-indigo-900/10', iconBg: 'bg-indigo-100 dark:bg-indigo-900/30' },
  green:  { badge: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',   border: 'border-green-200 dark:border-green-800/40',   bg: 'bg-green-50/50 dark:bg-green-900/10',   iconBg: 'bg-green-100 dark:bg-green-900/30' },
  red:    { badge: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',           border: 'border-red-200 dark:border-red-800/40',       bg: 'bg-red-50/50 dark:bg-red-900/10',       iconBg: 'bg-red-100 dark:bg-red-900/30' },
  purple: { badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-800/40', bg: 'bg-purple-50/50 dark:bg-purple-900/10', iconBg: 'bg-purple-100 dark:bg-purple-900/30' },
  amber:  { badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',   border: 'border-amber-200 dark:border-amber-800/40',   bg: 'bg-amber-50/50 dark:bg-amber-900/10',   iconBg: 'bg-amber-100 dark:bg-amber-900/30' },
  teal:   { badge: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',       border: 'border-teal-200 dark:border-teal-800/40',     bg: 'bg-teal-50/50 dark:bg-teal-900/10',     iconBg: 'bg-teal-100 dark:bg-teal-900/30' },
};

const Assessments: React.FC = () => {
  return (
    <>
      <SEO
        title="Maturity Assessments | Naval Thakur"
        description="Free self-assessment tools across DevOps, Agile, FinOps, Cloud Security, GenAI, Well-Architected, and Project Management. Find your maturity layer and get a personalised PDF report."
      />

      {/* Hero */}
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary-dark dark:text-secondary text-xs font-bold uppercase tracking-wider mb-6">
            Free Tools
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Maturity Assessments</h1>
          <p className="text-xl text-slate-200 max-w-2xl leading-relaxed">
            Eight free self-assessment tools — one for each domain. Answer a set of practitioner-designed questions,
            get an instant maturity layer, and download a personalised PDF report with prioritised next steps.
          </p>
        </div>
      </div>

      {/* How it works strip */}
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            {[
              { label: 'Answer', detail: '13–16 questions per assessment' },
              { label: 'Get scored', detail: 'Instant maturity layer per pillar' },
              { label: 'Download', detail: 'Personalised PDF report' },
            ].map(({ label, detail }, i) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white text-sm">{label}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assessment cards */}
      <Section bg="white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ASSESSMENTS.map(({ icon: Icon, domain, title, description, layers, questions, minutes, route, accent }) => {
              const cls = accentMap[accent];
              return (
                <div
                  key={route}
                  className={`rounded-2xl border ${cls.border} ${cls.bg} p-6 flex flex-col`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-2.5 rounded-xl ${cls.iconBg} shrink-0`}>
                      <Icon className="w-5 h-5 text-primary dark:text-white" />
                    </div>
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded ${cls.badge}`}>
                        {domain}
                      </span>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{title}</h2>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-grow">
                    {description}
                  </p>

                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-5 bg-white/60 dark:bg-slate-900/40 rounded-lg px-3 py-2 border border-slate-200/60 dark:border-slate-700/40">
                    {layers}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {questions} questions
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> ~{minutes} min
                      </span>
                    </div>
                    <Link
                      to={route}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary dark:bg-secondary text-white dark:text-primary text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Start <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Bottom CTA */}
      <Section bg="gray">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Want a guided assessment for your team?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            The self-assessment gives you a directional score. Naval also runs structured advisory engagements
            — scored findings per pillar, a gap analysis, and a prioritised 90-day roadmap your team can act on immediately.
          </p>
          <Link
            to="/work-with-me"
            className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-md"
          >
            See Advisory Options <ArrowRight size={16} />
          </Link>
        </div>
      </Section>
    </>
  );
};

export default Assessments;
