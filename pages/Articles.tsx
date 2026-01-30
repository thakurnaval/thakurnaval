import React from 'react';
import { ArrowRight, Search } from 'lucide-react';
import Section from '../components/Section';
import NewsletterSignup from '../components/NewsletterSignup';
import SEO from '../components/SEO';
import { FEATURED_ARTICLES } from '../constants';

const Articles: React.FC = () => {
  // Pool of tech-themed images to cycle through
  const TECH_IMAGES = [
    "1607799276041-8054e2dc6981", // Screen/Code
    "1550751827-4bd374c3f58b", // Cyberpunk city/Tech
    "1551288049-bebda4e38f71", // Charts/Data
    "1518770660439-4636190af475", // Chip/Circuit
    "1526374965328-7f61d4dc18c5", // Matrix Code
    "1451187580459-43490279c0fa", // Abstract Network
  ];

  return (
    <>
      <SEO 
        title="Insights & Articles | DevOps, FinOps, GenAI Blog"
        description="Deep dives into technology, leadership, and the future of ops. Articles on DevSecOps culture, cloud cost optimization, and AI governance."
      />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Insights & Resources</h1>
          <p className="text-xl text-slate-100 max-w-2xl">
             Thoughts on technology, leadership, and the future of ops.
          </p>
        </div>
      </div>

      <Section>
        <div className="max-w-5xl mx-auto">
          {/* Search/Filter Mockup */}
          <div className="mb-12 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent placeholder-slate-400"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
               {['All', 'DevOps', 'SecOps', 'FinOps', 'GenAI', 'Career'].map((cat, i) => (
                 <button key={i} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-secondary text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                   {cat}
                 </button>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
             {/* Repeat articles for visual density */}
             {[...FEATURED_ARTICLES, ...FEATURED_ARTICLES].map((article, idx) => (
                <div key={idx} className="flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
                  <div className="h-48 bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                     <img 
                       src={`https://images.unsplash.com/photo-${TECH_IMAGES[idx % TECH_IMAGES.length]}?q=80&w=600&auto=format&fit=crop`}
                       srcSet={`
                        https://images.unsplash.com/photo-${TECH_IMAGES[idx % TECH_IMAGES.length]}?q=80&w=400&auto=format&fit=crop 400w, 
                        https://images.unsplash.com/photo-${TECH_IMAGES[idx % TECH_IMAGES.length]}?q=80&w=600&auto=format&fit=crop 600w, 
                        https://images.unsplash.com/photo-${TECH_IMAGES[idx % TECH_IMAGES.length]}?q=80&w=800&auto=format&fit=crop 800w
                       `}
                       sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                       alt={article.title} 
                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                       loading="lazy"
                       width="600"
                       height="400"
                     />
                     <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 text-xs font-bold text-primary dark:text-white rounded">
                        {article.tag}
                     </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary transition-colors leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow line-clamp-3">
                      {article.summary}
                    </p>
                    <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                       <span>5 min read</span>
                       <span className="flex items-center text-primary dark:text-primary group-hover:underline">
                         Read More <ArrowRight size={12} className="ml-1" />
                       </span>
                    </div>
                  </div>
                </div>
             ))}
          </div>

          <NewsletterSignup />
        </div>
      </Section>
    </>
  );
};

export default Articles;