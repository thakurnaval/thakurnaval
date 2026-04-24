import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import Section from '../components/Section';
import NewsletterSignup from '../components/NewsletterSignup';
import SEO from '../components/SEO';
import { FEATURED_ARTICLES } from '../constants';

const TECH_IMAGES = [
  "1607799276041-8054e2dc6981",
  "1550751827-4bd374c3f58b",
  "1551288049-bebda4e38f71",
  "1518770660439-4636190af475",
  "1526374965328-7f61d4dc18c5",
  "1451187580459-43490279c0fa",
];

const CATEGORIES = ['All', 'GenAI', 'DevOps', 'SecOps', 'FinOps', 'Career'];

const Articles: React.FC = () => {
  const [activeTag, setActiveTag] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return FEATURED_ARTICLES.filter(a => {
      const matchesTag = activeTag === 'All' || a.tag === activeTag;
      const matchesQuery = query.trim() === '' ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.summary.toLowerCase().includes(query.toLowerCase());
      return matchesTag && matchesQuery;
    });
  }, [activeTag, query]);

  return (
    <>
      <SEO
        title="Insights & Articles | DevOps, FinOps, GenAI Blog | Naval Thakur"
        description="Practitioner deep-dives on DevSecOps culture, cloud cost optimization, GenAI strategy, and engineering leadership by Naval Thakur."
      />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Insights & Articles</h1>
          <p className="text-xl text-slate-100 max-w-2xl">
            Practitioner perspectives on DevOps, SecOps, FinOps, and GenAI — from the field, not the whiteboard.
          </p>
        </div>
      </div>

      <Section>
        <div className="max-w-5xl mx-auto">
          {/* Search + Filter */}
          <div className="mb-12 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent placeholder-slate-400"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveTag(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTag === cat
                      ? 'bg-secondary text-primary'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Article Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filtered.map((article, idx) => (
                <Link
                  key={article.link}
                  to={article.link}
                  className="flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="h-48 bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-${TECH_IMAGES[idx % TECH_IMAGES.length]}?q=80&w=600&auto=format&fit=crop`}
                      alt={article.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      width="600"
                      height="400"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 text-xs font-bold text-primary dark:text-white rounded">
                      {article.tag}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-secondary transition-colors leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow line-clamp-3">
                      {article.summary}
                    </p>
                    <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <span>5 min read</span>
                      <span className="flex items-center text-primary dark:text-secondary group-hover:underline">
                        Read More <ArrowRight size={12} className="ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500 dark:text-slate-400 mb-16">
              <p className="text-lg font-medium">No articles match "{query}" {activeTag !== 'All' ? `in ${activeTag}` : ''}.</p>
              <button
                onClick={() => { setQuery(''); setActiveTag('All'); }}
                className="mt-4 text-sm font-semibold text-secondary-dark dark:text-secondary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

          <NewsletterSignup />
        </div>
      </Section>
    </>
  );
};

export default Articles;
