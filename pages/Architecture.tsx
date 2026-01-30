import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Server, Network, Database, ArrowRight, Box } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';

const Architecture: React.FC = () => {
  return (
    <>
      <SEO 
        title="Cloud System Architecture & Design Patterns | Naval Thakur"
        description="Scalable, resilient cloud-native system design. Microservices, event-driven architecture, and legacy modernization consulting."
      />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">System Architecture</h1>
          <p className="text-xl text-slate-100 max-w-2xl">
            Designing resilient, scalable, and evolution-ready software systems for the cloud age.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">The Foundation of Success</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Architecture is about making the expensive decisions early and the reversible decisions late. It’s not just about drawing boxes and arrows; it’s about understanding trade-offs between consistency, availability, and partition tolerance (CAP), and aligning technical structure with business domains.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Whether migrating from a legacy monolith or designing a greenfield event-driven mesh, the goal remains the same: <strong>Velocity without chaos.</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Link to="/architecture/microservices" className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-secondary transition-colors group">
                 <Layers className="w-8 h-8 text-secondary mb-4 group-hover:scale-110 transition-transform" />
                 <h3 className="text-xl font-bold text-primary dark:text-white mb-2 group-hover:text-secondary">Microservices & Modularity</h3>
                 <p className="text-slate-600 dark:text-slate-400">
                   Decomposing complex domains into loosely coupled, independently deployable services using Domain-Driven Design (DDD).
                 </p>
               </Link>
               
               <Link to="/architecture/cloud-architecture" className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-secondary transition-colors group">
                 <Network className="w-8 h-8 text-secondary mb-4 group-hover:scale-110 transition-transform" />
                 <h3 className="text-xl font-bold text-primary dark:text-white mb-2 group-hover:text-secondary">Event-Driven Design</h3>
                 <p className="text-slate-600 dark:text-slate-400">
                   Building reactive systems that scale using asynchronous messaging patterns, Kafka, and EventBridge.
                 </p>
               </Link>

               <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-secondary transition-colors">
                 <Server className="w-8 h-8 text-secondary mb-4" />
                 <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Legacy Modernization</h3>
                 <p className="text-slate-600 dark:text-slate-400">
                   Strategies like the Strangler Fig pattern to incrementally refactor monoliths without stopping business delivery.
                 </p>
               </div>

               <Link to="/architecture/data-architecture" className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-secondary transition-colors group">
                 <Database className="w-8 h-8 text-secondary mb-4 group-hover:scale-110 transition-transform" />
                 <h3 className="text-xl font-bold text-primary dark:text-white mb-2 group-hover:text-secondary">Data Persistence Strategy</h3>
                 <p className="text-slate-600 dark:text-slate-400">
                   Choosing the right tool for the job: Polyglot persistence, caching strategies, and eventual consistency models.
                 </p>
               </Link>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Architectural Reviews</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Often teams get stuck in "Analysis Paralysis" or build "Resume Driven Development" architectures. I provide neutral, experience-backed architectural reviews to ensure your design matches your maturity and scale.
              </p>
              <ul className="space-y-3">
                 {[
                   "Scalability & Performance Bottleneck Analysis",
                   "Disaster Recovery & High Availability Planning",
                   "Cloud-Native Readiness Assessment",
                   "Cost-Aware Architecture (FinOps by Design)"
                 ].map((item, i) => (
                   <li key={i} className="flex items-start">
                     <Box className="w-5 h-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                     <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                   </li>
                 ))}
               </ul>
            </div>
            
            <div className="pt-4">
               <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Reference Patterns</h2>
               <div className="flex flex-wrap gap-3">
                 <Link to="/architecture/design-patterns" className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-primary dark:text-slate-300 hover:bg-secondary hover:text-white transition-colors">Design Patterns</Link>
                 <Link to="/architecture/solid-principles" className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-primary dark:text-slate-300 hover:bg-secondary hover:text-white transition-colors">SOLID Principles</Link>
                 <Link to="/architecture/system-design-process" className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-primary dark:text-slate-300 hover:bg-secondary hover:text-white transition-colors">System Design Process</Link>
                 <Link to="/architecture/api-design" className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-primary dark:text-slate-300 hover:bg-secondary hover:text-white transition-colors">API Design</Link>
               </div>
            </div>
          </div>

          <div className="lg:col-span-1">
             <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 sticky top-24">
               <h3 className="text-xl font-bold text-primary dark:text-white mb-4">Need a Blueprint?</h3>
               <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
                 Whether you are launching a startup or modernizing a legacy enterprise system, a solid architectural foundation is key.
               </p>
               <Link to="/contact?topic=Consulting" className="block w-full py-3 bg-secondary text-primary text-center font-bold rounded hover:bg-secondary-hover transition-colors mb-4">
                 Book an Architecture Review
               </Link>
               
               <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                 <h4 className="font-bold text-primary dark:text-white mb-2">Related Articles</h4>
                 <ul className="space-y-3">
                   <li>
                     <Link to="/articles" className="group flex items-start">
                       <ArrowRight className="w-4 h-4 text-secondary mt-1 mr-2 flex-shrink-0" />
                       <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                         Monolith to Microservices: A Survival Guide
                       </span>
                     </Link>
                   </li>
                   <li>
                     <Link to="/articles" className="group flex items-start">
                       <ArrowRight className="w-4 h-4 text-secondary mt-1 mr-2 flex-shrink-0" />
                       <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                         Designing for Failure in Distributed Systems
                       </span>
                     </Link>
                   </li>
                 </ul>
               </div>
             </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Architecture;