import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Clock, Target, ListChecks, ClipboardList, AlertTriangle, BookOpen, Wrench } from 'lucide-react';
import Section from '../../components/Section';
import SEO from '../../components/SEO';
import { TOOLKITS, type Toolkit } from './toolkitData';

const BASE = 'https://nthakur.com/explore/toolkits';
const modelHref = (anchor: string) => `/explore/mental-models#${anchor}`;

const Hero: React.FC<{ eyebrow: string; title: string; intro: string; children?: React.ReactNode }> = ({ eyebrow, title, intro, children }) => (
  <div className="relative bg-primary text-white py-20 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900/30"></div>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-400/40 bg-blue-400/10 text-blue-300 text-sm font-bold mb-6">
        <Wrench size={14} /> {eyebrow}
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{title}</h1>
      <p className="text-xl text-slate-200 max-w-3xl leading-relaxed">{intro}</p>
      {children}
    </div>
  </div>
);

/** /explore/toolkits */
export const ToolkitsIndex: React.FC = () => (
  <>
    <SEO
      title="Toolkits — Mental Models Put to Work | Naval Thakur"
      description="Step-by-step methods for incident reviews, architecture decisions, platform strategy and better meetings, each combining proven mental models with a ready-to-use template."
    />
    <Hero eyebrow="Toolkits" title="Mental models, put to work"
      intro="Each toolkit combines a handful of mental models into a step-by-step method for a situation engineering leaders face again and again, with a template you can use tomorrow." />
    <Section bg="white">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {TOOLKITS.map(t => (
          <Link key={t.slug} to={`/explore/toolkits/${t.slug}`} className="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 hover:border-blue-500 transition-colors">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 mb-1">{t.title}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-3">{t.tagline}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              {t.steps.length} steps · {new Set(t.steps.flatMap(s => s.models.map(m => m[0]))).size} models · {t.template.title}
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 dark:text-blue-400">Open the toolkit <ArrowRight size={14} /></span>
          </Link>
        ))}
      </div>
      <p className="max-w-5xl mx-auto mt-8 text-sm text-slate-500 dark:text-slate-400">
        Every model in these toolkits is explained in the <Link to="/explore/mental-models" className="text-blue-700 dark:text-blue-400 underline">mental models library</Link>, with when to use it, how to apply it and what to watch out for.
      </p>
    </Section>
  </>
);

const howToSchema = (t: Toolkit) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: t.title,
  description: t.tagline + ' ' + t.outcome,
  url: `${BASE}/${t.slug}`,
  author: { '@type': 'Person', name: 'Naval Thakur', url: 'https://nthakur.com/about' },
  step: t.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.what })),
});

/** /explore/toolkits/:slug */
export const ToolkitPage: React.FC = () => {
  const { slug } = useParams();
  const t = TOOLKITS.find(x => x.slug === slug);
  if (!t) {
    return (
      <Section bg="white">
        <div className="max-w-3xl mx-auto text-center py-16">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Toolkit not found</h1>
          <Link to="/explore/toolkits" className="text-blue-700 dark:text-blue-400 underline">See all toolkits</Link>
        </div>
      </Section>
    );
  }
  const others = TOOLKITS.filter(x => x.slug !== t.slug);
  return (
    <>
      <SEO title={`${t.title} | Naval Thakur`} description={`${t.tagline} ${t.whenToUse}`} structuredData={howToSchema(t)} />
      <Hero eyebrow="Toolkit" title={t.title} intro={t.tagline}>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10"><Clock size={14} /> {t.time}</span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10"><ListChecks size={14} /> {t.steps.length} steps</span>
        </div>
      </Hero>

      <Section bg="white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">When to use it</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{t.whenToUse}</p>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-2"><Target size={14} /> What you'll come away with</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{t.outcome}</p>
          </div>
        </div>
        {t.article && (
          <div className="max-w-4xl mx-auto mt-6 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 flex items-start gap-3">
            <BookOpen size={18} className="shrink-0 mt-0.5 text-blue-700 dark:text-blue-400" />
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <span className="font-semibold">Read the article:</span>{' '}
              <Link to={t.article.to} className="text-blue-700 dark:text-blue-400 hover:underline">{t.article.title}</Link>
              {' '}explains the thinking behind each step.
            </p>
          </div>
        )}
      </Section>

      <Section bg="gray">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">The method</h2>
          <ol className="space-y-5">
            {t.steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
                <div className="flex gap-4">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-primary dark:bg-blue-700 text-white font-bold flex items-center justify-center" aria-hidden="true">{i + 1}</span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{s.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">{s.what}</p>
                    <ul className="space-y-1 mb-4">
                      {s.prompts.map(p => (
                        <li key={p} className="text-sm text-slate-700 dark:text-slate-300 pl-4 border-l-2 border-blue-300 dark:border-blue-700 italic">{p}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2" aria-label="Mental models used in this step">
                      {s.models.map(([anchor, name]) => (
                        <Link key={anchor} to={modelHref(anchor)} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50">
                          {name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section bg="white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2"><ClipboardList className="text-blue-700 dark:text-blue-400" /> {t.template.title}</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-4">{t.template.intro}</p>
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-5">
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 font-mono leading-relaxed">
                {t.template.lines.map(l => <li key={l}>{l}</li>)}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2"><AlertTriangle className="text-amber-600 dark:text-amber-400" /> Common traps</h2>
            <ul className="space-y-3">
              {t.pitfalls.map(p => <li key={p} className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-4 border-l-2 border-amber-300 dark:border-amber-700">{p}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      <Section bg="gray">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2"><BookOpen size={18} /> Go deeper</h2>
            <ul className="space-y-2">
              {t.resources.map(r => (
                <li key={r.to}><Link to={r.to} className="text-blue-700 dark:text-blue-400 hover:underline inline-flex items-center gap-1">{r.label} <ArrowRight size={13} /></Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Other toolkits</h2>
            <ul className="space-y-2">
              {others.map(o => (
                <li key={o.slug}><Link to={`/explore/toolkits/${o.slug}`} className="text-blue-700 dark:text-blue-400 hover:underline inline-flex items-center gap-1">{o.title} <ArrowRight size={13} /></Link></li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
};
