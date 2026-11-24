import React from 'react';
import { Link } from 'react-router-dom';

type AssessmentId = 'devops' | 'secops' | 'finops' | 'genai' | 'architecture' | 'agile' | 'pm' | 'cognitiveops';

interface Intro {
  /** Who should take it and what it looks at. */
  covers: string;
  /** What the areas mean and why they were chosen. */
  areas: string;
  learnMore: { label: string; to: string };
}

const INTROS: Record<AssessmentId, Intro> = {
  devops: {
    covers: 'This assessment is for engineering leaders, platform teams and delivery teams who want an honest view of how they build, release and run software. It looks at how changes flow from commit to production, how infrastructure is provisioned, how well you can see and recover from problems, and how teams work together.',
    areas: 'The four areas reflect what the DORA research and years of transformation work show matter most: a reliable delivery pipeline, infrastructure as code and self-service platforms, observability with clear reliability targets, and a culture of shared ownership and blameless learning. Weakness in any one of them tends to limit the others.',
    learnMore: { label: 'Explore DevOps practices', to: '/devops' },
  },
  secops: {
    covers: 'This assessment is for security leaders, engineering managers and platform teams who want to understand how well security is built into everyday operations. It looks at how access is controlled, how threats are detected, how policy and compliance are enforced, and how the organisation responds when something goes wrong.',
    areas: 'Identity is the new perimeter in the cloud, detection determines how long an attacker goes unnoticed, policy as code keeps compliance continuous rather than periodic, and a rehearsed incident response limits the damage when prevention fails. Together they give a balanced picture of security posture.',
    learnMore: { label: 'Explore SecOps practices', to: '/secops' },
  },
  finops: {
    covers: 'This assessment is for finance, engineering and product leaders who share responsibility for cloud spend. It looks at how well costs are visible and allocated, whether teams own their spend, how waste is found and removed, and how accurately you forecast and plan.',
    areas: 'The four areas follow the FinOps Framework: you can\'t optimise what you can\'t see, ownership turns visibility into action, optimisation turns action into savings, and forecasting gives the business the predictability it needs. The maturity levels mirror the crawl, walk, run journey most organisations follow.',
    learnMore: { label: 'Explore FinOps practices', to: '/finops' },
  },
  genai: {
    covers: 'This assessment is for technology and business leaders responsible for adopting generative AI. It looks at whether your data and platforms are ready, whether people have the skills and support they need, how well risk is governed, and whether use cases are delivering measurable value.',
    areas: 'Organisations that scale AI successfully tend to get all four right together. Strong technology with weak governance stalls at legal review; good governance without skills leaves tools unused; and adoption without measurement makes it hard to justify further investment.',
    learnMore: { label: 'Explore GenAI adoption', to: '/genai' },
  },
  architecture: {
    covers: 'This assessment is for architects, technical leads and engineering managers who want to review a system or portfolio against well-established principles. It covers operational excellence, security, reliability, performance efficiency and cost optimisation.',
    areas: 'These five areas are common to the major cloud providers\' well-architected frameworks. They pull in different directions (more reliability usually costs more, for example), so the aim is not a perfect score but deliberate, visible trade-offs that suit what the business needs.',
    learnMore: { label: 'Explore architecture topics', to: '/architecture' },
  },
  agile: {
    covers: 'This assessment is for delivery leads, Scrum Masters, product owners and engineering managers who want to understand how well agile ways of working are serving their teams. It looks at team practices, flow of work, planning and backlog health, and the culture of continuous improvement.',
    areas: 'Agile is not about ceremonies for their own sake. These areas focus on outcomes: whether teams deliver small increments often, whether work flows without long waits, whether plans adapt to learning, and whether retrospectives lead to real change.',
    learnMore: { label: 'Explore delivery mental models', to: '/explore/mental-models' },
  },
  pm: {
    covers: 'This assessment is for project and programme managers, PMO leads and delivery heads who want to strengthen how work is planned and delivered. It looks at scope and planning, execution, risk and governance, and how stakeholders are engaged and kept informed.',
    areas: 'Most troubled projects show early warning signs in one of these four areas: unclear scope, weak tracking of progress, risks that are recorded but not managed, or stakeholders who are surprised late. Spotting the weakest area early is usually the best investment you can make.',
    learnMore: { label: 'Explore all assessments', to: '/assessments' },
  },
  cognitiveops: {
    covers: 'This assessment is for leaders who want a single view across delivery, security, cost and AI. It looks at DevOps, SecOps, FinOps and GenAI maturity together, because in practice they depend on each other: fast delivery without security creates risk, and AI without cost control creates surprises.',
    areas: 'CognitiveOps describes the journey from manual operations towards systems that observe, learn and improve with AI support while people stay accountable for decisions. The result shows where you are on that journey overall and which discipline is holding the others back.',
    learnMore: { label: 'Explore CognitiveOps', to: '/cognitiveops' },
  },
};

const SHARED = [
  'Answer for how things work today, not how you would like them to work or how the process document says they should. If practice varies across teams, answer for the typical team, or take the assessment separately for different teams and compare the results. There are no trick questions, and a lower score is often more useful than an optimistic one because it points to where improvement will pay off most.',
  'Use the result as the start of a conversation, not a grade. Share it with your team, agree on the one or two areas that would make the biggest difference, and choose a small, concrete next step for each. Taking the assessment again in three to six months is a simple way to see whether things are moving.',
];

const AssessmentIntro: React.FC<{ id: AssessmentId }> = ({ id }) => {
  const c = INTROS[id];
  return (
    <div className="mt-12 text-slate-700 dark:text-slate-300 leading-relaxed">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">About this assessment</h2>
      <p className="mb-4">{c.covers}</p>
      <p className="mb-4">{c.areas}</p>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-3">How to get the most from it</h3>
      {SHARED.map(p => <p key={p.slice(0, 30)} className="mb-4">{p}</p>)}
      <p className="mt-6">
        <Link to={c.learnMore.to} className="text-primary dark:text-secondary font-medium hover:underline">{c.learnMore.label} →</Link>
      </p>
    </div>
  );
};

export default AssessmentIntro;
