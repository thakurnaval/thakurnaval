import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Clock, BookOpen, Wrench, Sparkles, Calendar } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import NewsletterSignup from '../components/NewsletterSignup';

interface Issue {
  number: number;
  title: string;
  preview: string;
  tag: string;
  tagColor: string;
  date?: string;
  status: 'published' | 'coming-soon';
  link?: string;
}

const ISSUES: Issue[] = [
  {
    number: 1,
    title: 'From DevOps to CognitiveOps: What Changes, Really?',
    preview: 'Most organisations think upgrading their CI/CD pipeline gets them to the next level. It doesn\'t. Here\'s what actually has to change — and why culture is the last upgrade, not the first.',
    tag: 'DevOps',
    tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    status: 'coming-soon',
  },
  {
    number: 2,
    title: 'Why Most FinOps Efforts Fail After the First Savings Win',
    preview: 'Your team gets a 30% cost reduction in Q1. Six months later, spend is back. What happened? The answer is almost always the same — and it has nothing to do with tagging strategy.',
    tag: 'FinOps',
    tagColor: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    status: 'coming-soon',
  },
  {
    number: 3,
    title: 'How to Measure DevOps Maturity Without Gaming the Metrics',
    preview: 'Deployment frequency goes up. MTTR goes down. Incidents stay the same. Every team knows how to optimise for DORA metrics without actually improving. Here\'s how to measure what matters instead.',
    tag: 'DevOps',
    tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    status: 'coming-soon',
  },
  {
    number: 4,
    title: 'The Hidden Cost of "Good Enough" Cloud Architecture',
    preview: 'You built it to last. It\'s been running for 3 years. But now every new feature costs twice as much to build and three times as long to ship. This is what "good enough" architecture actually costs you.',
    tag: 'Architecture',
    tagColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    status: 'coming-soon',
  },
  {
    number: 5,
    title: 'What Enterprise Teams Get Wrong About GenAI in Operations',
    preview: 'The mistake isn\'t adopting GenAI too fast. The mistake is using it as a smarter search engine. Here\'s what the gap between Layer 2 and Layer 3 actually looks like in practice.',
    tag: 'GenAI',
    tagColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    status: 'coming-soon',
  },
  {
    number: 6,
    title: 'The Real ROI of Well-Architected Reviews',
    preview: 'Everyone agrees Well-Architected reviews are a good idea. Nobody does them. Here\'s what they actually surface, what they cost, and why the teams that run them quarterly outperform the ones that don\'t.',
    tag: 'Architecture',
    tagColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    status: 'coming-soon',
  },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "name": "The CognitiveOps Brief",
      "description": "A bi-weekly newsletter on enterprise cloud operations — DevOps, FinOps, SecOps, GenAI, and the CognitiveOps maturity model. One real-world lesson, one tool, one GenAI pattern. Under 5 minutes.",
      "author": { "@type": "Person", "name": "Naval Thakur", "url": "https://nthakur.com/about" },
      "url": "https://nthakur.com/newsletter",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nthakur.com" },
        { "@type": "ListItem", "position": 2, "name": "Newsletter", "item": "https://nthakur.com/newsletter" },
      ]
    }
  ]
};

const Newsletter: React.FC = () => {
  return (
    <>
      <SEO
        title="The CognitiveOps Brief | Newsletter | Naval Thakur"
        description="A bi-weekly newsletter on DevOps, FinOps, SecOps, and GenAI by Naval Thakur. One real-world lesson, one tool worth knowing, one GenAI pattern to try. Under 5 minutes."
        structuredData={SCHEMA}
      />

      {/* Hero */}
      <div className="relative bg-primary text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-primary to-secondary/20 opacity-80"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 text-secondary text-sm font-bold mb-6">
            <Mail size={14} /> Bi-weekly · Free
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">The CognitiveOps Brief</h1>
          <p className="text-xl text-slate-200 max-w-2xl leading-relaxed mb-8">
            Every two weeks: one real-world CloudOps lesson, one tool worth knowing, one GenAI pattern to try. From 18 years in the field. Under 5 minutes.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            {[
              { icon: BookOpen, text: 'One practitioner lesson' },
              { icon: Wrench, text: 'One tool worth knowing' },
              { icon: Sparkles, text: 'One GenAI pattern to try' },
              { icon: Clock, text: 'Under 5 minutes to read' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon size={15} className="text-secondary" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subscribe */}
      <Section bg="gray">
        <div className="max-w-2xl mx-auto">
          <NewsletterSignup />
        </div>
      </Section>

      {/* Upcoming Issues */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Upcoming Issues</h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
              First issue dropping soon
            </span>
          </div>

          <div className="space-y-4">
            {ISSUES.map((issue) => (
              <div
                key={issue.number}
                className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:border-secondary/50 dark:hover:border-secondary/40 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0 font-bold text-primary dark:text-white text-sm">
                    #{issue.number}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${issue.tagColor}`}>
                        {issue.tag}
                      </span>
                      {issue.status === 'coming-soon' && (
                        <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                          <Calendar size={11} /> Coming soon
                        </span>
                      )}
                      {issue.date && (
                        <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                          <Calendar size={11} /> {issue.date}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                      {issue.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {issue.preview}
                    </p>
                    {issue.link && (
                      <Link
                        to={issue.link}
                        className="inline-flex items-center mt-3 text-sm font-semibold text-secondary-dark dark:text-secondary hover:underline"
                      >
                        Read issue <ArrowRight size={13} className="ml-1" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Subscribe above to get each issue in your inbox the day it publishes.
          </p>
        </div>
      </Section>

      {/* What you get */}
      <Section bg="gray">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">Every issue includes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: 'One real-world lesson',
                desc: 'A pattern, failure mode, or hard-won insight from 18 years running DevOps and cloud transformations in enterprise organisations.',
                color: 'text-blue-600 dark:text-blue-400',
                bg: 'bg-blue-50 dark:bg-blue-900/20',
              },
              {
                icon: Wrench,
                title: 'One tool worth knowing',
                desc: 'Not a sponsored mention — a tool Naval or his team has actually used in production and would recommend to a colleague.',
                color: 'text-green-600 dark:text-green-400',
                bg: 'bg-green-50 dark:bg-green-900/20',
              },
              {
                icon: Sparkles,
                title: 'One GenAI pattern to try',
                desc: 'A practical prompt, workflow, or architecture pattern that applies to cloud operations, DevOps, or engineering leadership.',
                color: 'text-purple-600 dark:text-purple-400',
                bg: 'bg-purple-50 dark:bg-purple-900/20',
              },
            ].map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Free resources CTA */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">More free resources</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Take a free maturity assessment or download the CognitiveOps Playbook — no email gate on the assessments.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/assessments"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors"
            >
              Take a Maturity Assessment <ArrowRight size={15} />
            </Link>
            <Link
              to="/cognitiveops/playbook"
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Download the Playbook <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Newsletter;
