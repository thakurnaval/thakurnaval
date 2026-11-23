import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { GatedGuideHero } from '../components/GatedGuide';

const CHAPTERS = [
  ['The Philosophy Before the Pipeline', 'DevOps is a culture first. Tools are the output, not the input.'],
  ['The 7 Cs in Practice', 'Continuous integration through continuous feedback, and what each C actually costs to do right.'],
  ['The CognitiveOps Maturity Model', 'Manual → Automated → Intelligent → Cognitive: where you are and how to move.'],
  ['Why Enterprise Agile Transformations Fail', 'The structural and incentive mismatches that guarantee failure above the team level.'],
  ['FinOps by Design', 'Cloud cost accountability built into engineering culture, not bolted on by finance.'],
  ['Security as a First-Class Concern', 'DevSecOps without the security theatre.'],
  ['GenAI in the Engineering Organisation', 'What actually changes, what stays the same, and how to avoid the hype traps.'],
  ['Seven Habits of Highly Effective DevOps Teams', 'The behaviours that separate high-performing teams from firefighting teams.'],
  ['The Honest Debrief', 'What doesn\'t work, what I got wrong, and what I\'d tell my earlier self.'],
  ['The Practitioner\'s Manifesto', 'A closing set of principles, written to be argued with, not followed blindly.'],
];

const AUDIENCE = [
  'Engineering managers and directors moving from tactical to strategic leadership',
  'Senior DevOps practitioners who want to lead transformation, not just build pipelines',
  'CTOs and VPs asking whether their organisation is genuinely agile or performing agility',
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: 'DevOpsism',
  alternateName: "The Practitioner's Manifesto for Modern Engineering Organisations",
  author: { '@type': 'Person', name: 'Naval Thakur', url: 'https://nthakur.com/about' },
  url: 'https://nthakur.com/devopsism',
};

const DevOpsism: React.FC = () => (
  <>
    <SEO title="DevOpsism — The Practitioner's Manifesto | Naval Thakur"
      description="DevOpsism, a book in progress by Naval Thakur: an honest practitioner's guide to what DevOps actually requires. See the outline and join the early-reader list."
      structuredData={SCHEMA} />
    <GatedGuideHero
      badge="Book in progress" badgeIcon={<BookOpen size={14} />}
      title="DevOpsism"
      intro="The Practitioner's Manifesto for Modern Engineering Organisations. Most organisations bought the DevOps tools without adopting the philosophy. This book is the honest guide to what it actually takes."
      bullets={['Ten chapters, from philosophy to manifesto', 'The CognitiveOps Maturity Model as its centrepiece', 'Practitioner-first: no consulting-speak, failures named', 'Early readers get draft chapters and a say in the final book']}
      topic="DevOpsism Early Reader List" cta="Join the early-reader list" readyTitle="You're on the list" readyText="Thank you. Draft chapters will come to your inbox as they're ready."
      openLabel="See the outline"
      onOpen={() => document.getElementById('outline')?.scrollIntoView({ behavior: 'smooth' })}
      gradient="from-slate-950 via-indigo-950 to-blue-900/40" accent="blue" />

    <Section bg="white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why this book</h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          DevOps is not a toolchain. It is not a job title. It is an operating philosophy, and most organisations have bought the tools without adopting the philosophy. <em>DevOpsism</em> is about what DevOps actually requires, what it looks like when it works, and how to get there without lying to yourself about where you are today.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
          It draws on two decades of building and leading engineering teams, the talks on <Link to="/talks" className="text-primary dark:text-secondary underline">this site</Link>, and the <Link to="/cognitiveops" className="text-primary dark:text-secondary underline">CognitiveOps Model</Link>.
        </p>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Written for</h3>
        <ul className="space-y-2 mb-4">
          {AUDIENCE.map(a => <li key={a} className="flex gap-2 text-slate-600 dark:text-slate-300"><ArrowRight size={16} className="mt-1 shrink-0 text-blue-600 dark:text-blue-400" />{a}</li>)}
        </ul>
      </div>
    </Section>

    <Section bg="gray">
      <div id="outline" className="max-w-3xl mx-auto scroll-mt-24">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Draft outline</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">Working draft; chapters will change as the writing does.</p>
        <ol className="space-y-3">
          {CHAPTERS.map(([title, idea], i) => (
            <li key={title} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex gap-4">
              <span className="text-2xl font-black text-blue-200 dark:text-blue-900 w-8 shrink-0">{i + 1}</span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{idea}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  </>
);

export default DevOpsism;
