import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ListOrdered, AlertTriangle, Gauge, BookOpen } from 'lucide-react';
import Section from './Section';
import SEO from './SEO';
import { FollowBox } from './SocialLinks';

export interface TopicSection {
  heading: string;
  body: string[];
  /** Optional key terms: [term, explanation]. */
  terms?: [string, string][];
}

export interface TopicContent {
  /** Page path, e.g. /devops/sre */
  path: string;
  title: string;
  subtitle: string;
  /** Meta description, under ~160 characters. */
  description: string;
  parent: { label: string; to: string };
  quote?: { text: string; by: string };
  intro: string[];
  sections: TopicSection[];
  /** Numbered steps for "How to put it into practice". */
  practice: string[];
  mistakes: string[];
  measures: string[];
  related: { label: string; to: string }[];
}

const SITE = 'https://nthakur.com';

/** Long-form topic page used by the DevOps, SecOps, FinOps, GenAI, AI in SDLC and Architecture sub-pages. */
const TopicArticle: React.FC<{ content: TopicContent }> = ({ content: c }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: c.title,
        description: c.description,
        author: { '@type': 'Person', name: 'Naval Thakur', url: `${SITE}/about` },
        url: `${SITE}${c.path}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          { '@type': 'ListItem', position: 2, name: c.parent.label, item: `${SITE}${c.parent.to}` },
          { '@type': 'ListItem', position: 3, name: c.title, item: `${SITE}${c.path}` },
        ],
      },
    ],
  };

  return (
    <>
      <SEO title={`${c.title} | Naval Thakur`} description={c.description} type="article" structuredData={schema} />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-300 mb-4">
            <Link to="/" className="hover:underline">Home</Link> <span aria-hidden="true">/</span>{' '}
            <Link to={c.parent.to} className="hover:underline">{c.parent.label}</Link>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{c.title}</h1>
          <p className="text-xl text-slate-100 max-w-3xl">{c.subtitle}</p>
        </div>
      </div>

      <Section bg="white">
        <article className="max-w-3xl mx-auto text-slate-700 dark:text-slate-300 leading-relaxed">
          {c.quote ? (
            <blockquote className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg mb-8 italic border-l-4 border-primary dark:border-secondary">
              "{c.quote.text}" <span className="not-italic text-sm text-slate-600 dark:text-slate-400">— {c.quote.by}</span>
            </blockquote>
          ) : null}

          {c.intro.map(p => <p key={p.slice(0, 40)} className="text-lg mb-5">{p}</p>)}

          {c.sections.map(s => (
            <section key={s.heading} className="mt-10">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">{s.heading}</h2>
              {s.body.map(p => <p key={p.slice(0, 40)} className="mb-4">{p}</p>)}
              {s.terms ? (
                <dl className="mt-4 space-y-3">
                  {s.terms.map(([term, def]) => (
                    <div key={term} className="pl-4 border-l-2 border-primary/30 dark:border-secondary/40">
                      <dt className="font-semibold text-slate-900 dark:text-white">{term}</dt>
                      <dd>{def}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </section>
          ))}

          <section className="mt-12 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 flex items-center gap-2">
              <ListOrdered className="w-6 h-6 text-primary dark:text-secondary" /> How to put it into practice
            </h2>
            <ol className="list-decimal pl-6 space-y-3">
              {c.practice.map(step => <li key={step.slice(0, 40)}>{step}</li>)}
            </ol>
          </section>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" /> Common mistakes
              </h2>
              <ul className="space-y-3">
                {c.mistakes.map(m => <li key={m.slice(0, 40)} className="pl-4 border-l-2 border-amber-300 dark:border-amber-700">{m}</li>)}
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-primary dark:text-secondary" /> How to measure progress
              </h2>
              <ul className="space-y-3">
                {c.measures.map(m => <li key={m.slice(0, 40)} className="pl-4 border-l-2 border-primary/30 dark:border-secondary/40">{m}</li>)}
              </ul>
            </section>
          </div>

          <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary dark:text-secondary" /> Go further
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {c.related.map(r => (
                <li key={r.to}>
                  <Link to={r.to} className="inline-flex items-center gap-1 text-primary dark:text-secondary font-medium hover:underline">
                    {r.label} <ArrowRight size={14} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <FollowBox placement="topic-end" />
        </article>
      </Section>
    </>
  );
};

export default TopicArticle;
