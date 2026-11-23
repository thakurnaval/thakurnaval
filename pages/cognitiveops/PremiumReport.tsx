import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Users, BarChart3, FileText, MessageSquare, ArrowRight } from 'lucide-react';
import Section from '../../components/Section';
import SEO from '../../components/SEO';
import { GatedGuideHero } from '../../components/GatedGuide';

const FEATURES = [
  { icon: Users, title: 'Team scoring', body: 'Everyone on the leadership team takes the assessment; you see where you agree, and where you don\'t.' },
  { icon: BarChart3, title: 'Domain deep-dive', body: 'DevOps, SecOps, FinOps and GenAI scored in detail, with the constraint that holds the others back.' },
  { icon: FileText, title: 'Detailed report', body: 'A prioritised 90-day roadmap for your organisation, not a generic one.' },
  { icon: MessageSquare, title: 'Review call', body: 'A walkthrough of the findings with Naval, and answers to your team\'s questions.' },
];

/**
 * Interest capture for the premium CognitiveOps report. The product is built
 * when the first customer asks for it; until then this page records demand.
 */
const PremiumReport: React.FC = () => (
  <>
    <SEO title="Premium CognitiveOps Report — Register Interest | Naval Thakur"
      description="A team-level CognitiveOps maturity report: team scoring, domain deep-dive, a tailored 90-day roadmap and a review call. Register your interest."
    />
    <GatedGuideHero
      badge="Coming soon · Premium report" badgeIcon={<Crown size={14} />}
      title="The Premium CognitiveOps Report"
      intro="The free assessment tells you where you stand. The premium report tells your whole leadership team, in detail, and turns it into a roadmap you can act on."
      bullets={['Team scoring across your leadership group', 'Detailed DevOps, SecOps, FinOps and GenAI analysis', 'Tailored 90-day roadmap', 'Review call with Naval']}
      topic="Premium CognitiveOps Report Interest" cta="Register my interest"
      readyTitle="Thanks, you're on the list" readyText="Naval will be in touch personally about timing and pricing."
      openLabel="Take the free assessment meanwhile"
      onOpen={() => { window.location.href = '/cognitiveops/assessment'; }}
      gradient="from-slate-950 via-blue-950 to-blue-900/30" accent="blue" />

    <Section bg="white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">What's in the premium report</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURES.map(f => (
            <div key={f.title} className="rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex gap-4">
              <f.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{f.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
          Not ready for a full report? The <Link to="/cognitiveops/assessment" className="text-primary dark:text-secondary underline">free CognitiveOps assessment</Link> gives you an instant, pillar-by-pillar plan.
        </p>
      </div>
    </Section>
  </>
);

/** Card shown under the free CognitiveOps results. */
export const PremiumReportTeaser: React.FC = () => (
  <Link to="/cognitiveops/premium-report" className="block rounded-xl border-2 border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-300 mb-1"><Crown size={13} /> Coming soon</div>
    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Want this for your whole leadership team?</h3>
    <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">The premium report adds team scoring, a detailed domain analysis, a tailored 90-day roadmap and a review call.</p>
    <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-800 dark:text-blue-300">Register your interest <ArrowRight size={14} /></span>
  </Link>
);

export default PremiumReport;
