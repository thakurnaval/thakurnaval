import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, RefreshCw, BarChart2, GitMerge } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';

const DevOps: React.FC = () => {
  return (
    <>
      <SEO 
        title="DevOps Transformation Services & Consulting | Naval Thakur"
        description="Accelerate software delivery with CI/CD, SRE, and Platform Engineering. Expert DevOps maturity assessments, roadmap planning, and cultural transformation coaching."
      />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">DevOps Transformation</h1>
          <p className="text-xl text-slate-100 max-w-2xl">
            Accelerating software delivery while improving quality, reliability, and culture.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">What is DevOps?</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                DevOps is not just Jenkins pipelines or Kubernetes clusters. It is a fundamental shift in how organizations build, deliver, and run software. It breaks down the silos between Development and Operations, fostering a culture of shared responsibility.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                By implementing <Link to="/devops/practices" className="text-secondary hover:underline font-medium">CI/CD</Link>, <Link to="/devops/tools" className="text-secondary hover:underline font-medium">Infrastructure as Code (IaC)</Link>, and automated testing, we reduce the "fear of release" and enable businesses to respond to market changes instantly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              {[
                { icon: RefreshCw, title: 'Automation', desc: 'Eliminate toil with CI/CD and IaC.', link: '/devops/tools' },
                { icon: GitMerge, title: 'Collaboration', desc: 'Unified goals for Dev and Ops.', link: '/devops/practices' },
                { icon: BarChart2, title: 'Monitoring', desc: 'Proactive observability loops.', link: '/devops/sre' },
                { icon: Settings, title: 'Process', desc: 'Agile methodologies applied to Ops.', link: '/devops/maturity' },
              ].map((item, idx) => (
                <Link key={idx} to={item.link} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg border border-slate-100 dark:border-slate-700 hover:border-secondary transition-colors group">
                  <item.icon className="w-8 h-8 text-secondary mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-primary dark:text-white mb-1 group-hover:text-secondary">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                </Link>
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">The Benefits</h2>
              <ul className="space-y-3">
                {[
                  "Faster Time-to-Market: Release features daily, not quarterly.",
                  "Improved Quality: Automated testing catches bugs early (Shift Left).",
                  "Efficiency: Developers spend more time coding, less time fixing env issues.",
                  "Reliability: Self-healing infrastructure and automated rollbacks."
                ].map((point, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-3 text-secondary font-bold">✓</span>
                    <span className="text-slate-700 dark:text-slate-300">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg mt-8">
              <h2 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-2">DevOps Maturity Assessment</h2>
              <p className="text-blue-800 dark:text-blue-300 mb-4">
                Are you "Doing DevOps" or just using tools? My structured decision-tree assessment helps identify where your organization stands on the maturity curve—from "Ad-hoc" to "Optimized".
              </p>
              <Link to="/contact?topic=Consulting" className="text-blue-700 dark:text-blue-400 font-bold hover:underline">
                Request an Assessment Session &rarr;
              </Link>
            </div>
            
            <div className="pt-8">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Related Topics</h2>
              <div className="flex flex-wrap gap-3">
                <Link to="/devops/sre" className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-primary dark:text-slate-300 hover:bg-secondary hover:text-white transition-colors">Site Reliability Engineering</Link>
                <Link to="/devops/platform-engineering" className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-primary dark:text-slate-300 hover:bg-secondary hover:text-white transition-colors">Platform Engineering</Link>
                <Link to="/devops/chaos-engineering" className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-primary dark:text-slate-300 hover:bg-secondary hover:text-white transition-colors">Chaos Engineering</Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 sticky top-24">
               <h3 className="text-xl font-bold text-primary dark:text-white mb-4">Work with Naval</h3>
               <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
                 Need help setting up your pipeline or training your team?
               </p>
               <Link to="/contact?topic=Consulting" className="block w-full py-3 bg-secondary text-primary text-center font-bold rounded hover:bg-secondary-hover transition-colors mb-4">
                 Book a Consultation
               </Link>
               <div className="border-t border-slate-100 dark:border-slate-700 pt-4 mt-4">
                 <h4 className="font-semibold text-sm text-slate-500 dark:text-slate-400 mb-2">Related Services</h4>
                 <ul className="space-y-2 text-sm">
                   <li><Link to="/secops" className="text-primary dark:text-slate-300 hover:text-primary/80 dark:hover:text-secondary">SecOps Implementation</Link></li>
                   <li><Link to="/finops" className="text-primary dark:text-slate-300 hover:text-primary/80 dark:hover:text-secondary">FinOps Strategy</Link></li>
                 </ul>
               </div>
             </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default DevOps;