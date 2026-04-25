
import React from 'react';
import { motion } from 'motion/react';
import { Code, Github, ExternalLink, Search, Filter } from 'lucide-react';
import { PROJECTS } from '../constants';
import ProjectCard from '../components/ProjectCard';
import SEO from '../components/SEO';

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedTech, setSelectedTech] = React.useState<string | null>(null);

  // Extract all unique technologies
  const allTechnologies = Array.from(
    new Set(PROJECTS.flatMap(p => p.technologies))
  ).sort();

  const filteredProjects = PROJECTS.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech = selectedTech ? project.technologies.includes(selectedTech) : true;
    return matchesSearch && matchesTech;
  });

  const projectsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "name": "Engineering Projects — Naval Thakur",
        "description": "Open-source contributions, educational curricula, and technical implementations in DevOps, SecOps, FinOps, and Generative AI by Naval Thakur.",
        "url": "https://nthakur.com/projects",
        "author": { "@type": "Person", "name": "Naval Thakur", "url": "https://nthakur.com/about" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nthakur.com" },
          { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://nthakur.com/projects" }
        ]
      }
    ]
  };

  return (
    <>
      <SEO
        title="Engineering Projects | DevOps, FinOps & GenAI | Naval Thakur"
        description="Open-source tools, educational curricula, and technical implementations across DevOps, SecOps, FinOps, and GenAI — built and maintained by Naval Thakur."
        structuredData={projectsSchema}
      />
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-primary dark:text-white mb-6">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary dark:from-secondary dark:to-blue-400">Projects</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              A collection of open-source contributions, educational curricula, and technical implementations focused on DevOps, SecOps, FinOps, and GenAI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-secondary outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2 mr-2">
              <Filter size={16} /> Filter by:
            </span>
            <button 
              onClick={() => setSelectedTech(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                selectedTech === null 
                  ? 'bg-primary text-white dark:bg-secondary dark:text-primary' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-secondary'
              }`}
            >
              All
            </button>
            {allTechnologies.map(tech => (
              <button 
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedTech === tech 
                    ? 'bg-primary text-white dark:bg-secondary dark:text-primary' 
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-secondary'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mb-4">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No projects found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </section>

      {/* GitHub CTA */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-primary dark:bg-slate-900 rounded-3xl p-8 md:p-12 text-center border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Want to see more?</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              I'm constantly working on new technical guides, open-source tools, and research in the DevOps and AI space. Check out my full profile on GitHub.
            </p>
            <a 
              href="https://github.com/thakurnaval" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary text-primary font-bold px-8 py-4 rounded-full hover:bg-white transition-all transform hover:scale-105"
            >
              <Github size={20} />
              View GitHub Profile
            </a>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Projects;
