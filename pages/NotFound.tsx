import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Compass } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';

/** Popular destinations offered when a URL doesn't exist. */
const SUGGESTIONS = [
  { label: 'The CognitiveOps Model', to: '/cognitiveops' },
  { label: 'Maturity assessments', to: '/assessments' },
  { label: 'Articles', to: '/articles' },
  { label: 'Mental models', to: '/explore/mental-models' },
  { label: 'Free resources', to: '/resources' },
  { label: 'Contact Naval', to: '/contact' },
];

/**
 * Catch-all route. Prerendered to dist/404.html, which nginx serves with a real 404 status
 * for any URL that has no page (see nginx.conf `error_page 404`).
 */
const NotFound: React.FC = () => (
  <>
    <SEO title="Page not found | Naval Thakur" description="The page you were looking for doesn't exist. Try one of these instead." />
    <Helmet>
      <meta name="robots" content="noindex" />
    </Helmet>
    <Section bg="white">
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/5 dark:bg-slate-800 flex items-center justify-center">
          <Compass className="w-8 h-8 text-primary dark:text-secondary" />
        </div>
        <p className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">404</p>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Page not found</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
          This page doesn't exist, or it has moved. One of these may be what you were after.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-10">
          {SUGGESTIONS.map(s => (
            <li key={s.to}>
              <Link to={s.to} className="flex items-center justify-between px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 text-primary dark:text-slate-200 font-medium hover:border-primary dark:hover:border-secondary transition-colors">
                {s.label} <ArrowRight size={16} />
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/" className="inline-flex items-center px-6 py-3 rounded-md font-bold text-white bg-primary hover:bg-primary/90 transition-colors">
          Back to the home page
        </Link>
      </div>
    </Section>
  </>
);

export default NotFound;
