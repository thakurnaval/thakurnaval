import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, ClipboardCheck, Wrench, Brain } from 'lucide-react';
import Section from './Section';

type Topic = 'devops' | 'secops' | 'finops' | 'genai' | 'ai-sdlc' | 'architecture' | 'cognitiveops';

interface Item { label: string; to: string }
interface Block { guides: Item[]; assessment: Item; toolkit: Item; models: Item[] }

const mm = (anchor: string, label: string): Item => ({ label, to: `/explore/mental-models#${anchor}` });

/** The next steps offered at the bottom of each topic page. */
const BLOCKS: Record<Topic, Block> = {
  devops: {
    guides: [{ label: 'DevOps Maturity Roadmap', to: '/devops/roadmap-guide' }, { label: 'The 7 Cs of DevOps', to: '/devops/7cs' }, { label: 'Terraform & Bicep templates', to: '/architecture/iac-templates' }],
    assessment: { label: 'DevOps Maturity Assessment', to: '/devops/assessment' },
    toolkit: { label: 'Platform Strategy Toolkit', to: '/explore/toolkits/platform-strategy' },
    models: [mm('theory-of-constraints', 'Theory of Constraints'), mm('value-stream-mapping', 'Value Stream Mapping'), mm('feedback-loops', 'Feedback Loops')],
  },
  secops: {
    guides: [{ label: 'The DevSecOps Playbook', to: '/secops/devsecops-playbook' }],
    assessment: { label: 'Cloud Security Assessment', to: '/secops/assessment' },
    toolkit: { label: 'Incident Review Toolkit', to: '/explore/toolkits/incident-review' },
    models: [mm('swiss-cheese-model', 'Swiss Cheese Model'), mm('fmea', 'FMEA'), mm('blameless-post-mortem', 'Blameless Post-mortem')],
  },
  finops: {
    guides: [{ label: '30 Days of FinOps', to: '/finops/30-day-guide' }, { label: 'FinOps Certification Prep', to: '/finops/cert-prep' }],
    assessment: { label: 'FinOps Maturity Assessment', to: '/finops/assessment' },
    toolkit: { label: 'FinOps Cost Review Toolkit', to: '/explore/toolkits/finops-cost-review' },
    models: [mm('pareto-principle', 'Pareto Principle'), mm('tragedy-of-the-commons', 'Tragedy of the Commons'), mm('goodharts-law', "Goodhart's Law")],
  },
  genai: {
    guides: [{ label: 'The GenAI Adoption Framework', to: '/genai/adoption-framework' }, { label: 'The AI-Native SDLC Field Guide', to: '/ai-sdlc/field-guide' }],
    assessment: { label: 'GenAI Readiness Assessment', to: '/genai/assessment' },
    toolkit: { label: 'AI Use-Case Selection Toolkit', to: '/explore/toolkits/ai-use-case-selection' },
    models: [mm('minimum-viable-product', 'Minimum Viable Product'), mm('cynefin-framework', 'Cynefin Framework'), mm('second-order-thinking', 'Second-Order Thinking')],
  },
  'ai-sdlc': {
    guides: [{ label: 'The AI-Native SDLC Field Guide', to: '/ai-sdlc/field-guide' }, { label: 'The GenAI Adoption Framework', to: '/genai/adoption-framework' }],
    assessment: { label: 'GenAI Readiness Assessment', to: '/genai/assessment' },
    toolkit: { label: 'Incident Review Toolkit', to: '/explore/toolkits/incident-review' },
    models: [mm('theory-of-constraints', 'Theory of Constraints'), mm('goodharts-law', "Goodhart's Law"), mm('swiss-cheese-model', 'Swiss Cheese Model')],
  },
  architecture: {
    guides: [{ label: 'Terraform & Bicep templates', to: '/architecture/iac-templates' }, { label: 'The DevSecOps Playbook', to: '/secops/devsecops-playbook' }],
    assessment: { label: 'Well-Architected Assessment', to: '/architecture/assessment' },
    toolkit: { label: 'Architecture Decisions Toolkit', to: '/explore/toolkits/architecture-decisions' },
    models: [mm('conways-law', "Conway's Law"), mm('reversible-vs-irreversible-decisions', 'Reversible vs Irreversible Decisions'), mm('wardley-mapping', 'Wardley Mapping')],
  },
  cognitiveops: {
    guides: [{ label: 'The CognitiveOps Playbook', to: '/cognitiveops/playbook' }, { label: 'The AI-Native SDLC Field Guide', to: '/ai-sdlc/field-guide' }],
    assessment: { label: 'CognitiveOps Maturity Assessment', to: '/cognitiveops/assessment' },
    toolkit: { label: 'Platform Strategy Toolkit', to: '/explore/toolkits/platform-strategy' },
    models: [mm('systems-thinking', 'Systems Thinking'), mm('flywheel-effect', 'Flywheel Effect'), mm('okrs', 'OKRs')],
  },
};

const Column: React.FC<{ icon: React.ElementType; title: string; items: Item[] }> = ({ icon: Icon, title, items }) => (
  <div className="min-w-0">
    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
      <Icon size={15} className="text-primary dark:text-secondary" /> {title}
    </h3>
    <ul className="space-y-2">
      {items.map(i => (
        <li key={i.to}>
          <Link to={i.to} className="inline-flex items-center gap-1 text-primary dark:text-secondary font-medium hover:underline">
            {i.label} <ArrowRight size={13} />
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

/** "Keep going" block at the bottom of a topic page: guide, assessment, toolkit, models. */
const RelatedResources: React.FC<{ topic: Topic }> = ({ topic }) => {
  const b = BLOCKS[topic];
  return (
    <Section bg="gray">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Keep going</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Free guides, a scored assessment, a step-by-step toolkit and the thinking tools behind them.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Column icon={FileText} title="Free guides" items={b.guides} />
          <Column icon={ClipboardCheck} title="Assess yourself" items={[b.assessment]} />
          <Column icon={Wrench} title="Toolkit" items={[b.toolkit]} />
          <Column icon={Brain} title="Mental models" items={b.models} />
        </div>
        <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
          Everything free is in one place: <Link to="/resources" className="underline hover:text-primary dark:hover:text-secondary">Free Resources</Link>.
        </p>
      </div>
    </Section>
  );
};

export default RelatedResources;
