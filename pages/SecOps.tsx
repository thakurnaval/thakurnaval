import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, AlertTriangle, Eye } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';

const SecOps: React.FC = () => {
  return (
    <>
      <SEO 
        title="SecOps & DevSecOps Consulting | Security by Design Strategy"
        description="Shift left with DevSecOps. Automated security scanning, threat modeling, and cloud security governance to protect your infrastructure."
      />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">SecOps & DevSecOps</h1>
          <p className="text-xl text-slate-100 max-w-2xl">
            Bridging the gap between Development, Operations, and Security.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Security is no longer a gatekeeper at the end of the process. In a modern cloud environment, security must be integrated into every step of the SDLC—what we call "Shifting Left".
            </p>

            <h2 className="text-2xl font-bold text-primary dark:text-white">Why SecOps Matters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="flex flex-col gap-3">
                 <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                   <AlertTriangle size={20} />
                 </div>
                 <h3 className="text-xl font-bold text-primary dark:text-white">The Challenge</h3>
                 <p className="text-slate-600 dark:text-slate-400 text-sm">
                   Traditional security reviews slow down agility. Vulnerabilities are found too late, causing delays and expensive rework.
                 </p>
               </div>
               <div className="flex flex-col gap-3">
                 <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                   <Shield size={20} />
                 </div>
                 <h3 className="text-xl font-bold text-primary dark:text-white">The Solution</h3>
                 <p className="text-slate-600 dark:text-slate-400 text-sm">
                   Automated security scanning (<Link to="/secops/sast-dast" className="text-secondary hover:underline">SAST/DAST</Link>), policy-as-code, and <Link to="/secops/continuous-security" className="text-secondary hover:underline">continuous compliance</Link> monitoring within the pipeline.
                 </p>
               </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Core Concepts</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Lock className="w-6 h-6 text-secondary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg"><Link to="/secops/automation" className="hover:text-secondary">Security as Code</Link></h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Defining security policies in Git and enforcing them automatically during deployment.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Eye className="w-6 h-6 text-secondary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg"><Link to="/secops/continuous-security" className="hover:text-secondary">Continuous Monitoring</Link></h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Real-time threat detection and automated incident response workflows.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Enterprise Outcomes</h2>
              <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2 ml-2">
                <li><strong>Reduced Risk:</strong> Vulnerabilities are patched before they reach production.</li>
                <li><strong>Better Compliance:</strong> Audit trails are generated automatically by the pipeline.</li>
                <li><strong>Speed & Security:</strong> Developers can move fast without breaking security protocols.</li>
              </ul>
            </div>
            
            <div className="pt-8">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Deep Dive</h2>
              <div className="flex flex-wrap gap-3">
                <Link to="/secops/threat-modeling" className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-primary dark:text-slate-300 hover:bg-secondary hover:text-white transition-colors">Threat Modelling</Link>
                <Link to="/secops/cloud-security" className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-primary dark:text-slate-300 hover:bg-secondary hover:text-white transition-colors">Cloud Security</Link>
                <Link to="/secops/container-security" className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-primary dark:text-slate-300 hover:bg-secondary hover:text-white transition-colors">Container Security</Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
             <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
               <h3 className="text-lg font-bold text-primary dark:text-white mb-3">From the Blog</h3>
               <div className="space-y-4">
                 <Link to="/articles" className="block group">
                   <span className="text-xs font-semibold text-primary dark:text-secondary uppercase tracking-wide">Article</span>
                   <h4 className="font-medium text-slate-900 dark:text-white group-hover:underline">SecOps: Bridging the Gap</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Aligning security teams with Agile delivery.</p>
                 </Link>
                 <Link to="/articles" className="block group">
                   <span className="text-xs font-semibold text-primary dark:text-secondary uppercase tracking-wide">Article</span>
                   <h4 className="font-medium text-slate-900 dark:text-white group-hover:underline">Automating Compliance in AWS</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Using Config and Lambda for real-time checks.</p>
                 </Link>
               </div>
               <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <Link to="/contact?topic=Consulting" className="text-center block text-sm font-bold text-primary dark:text-secondary hover:text-primary/80 dark:hover:text-secondary-hover">
                    Get Security Coaching &rarr;
                  </Link>
               </div>
             </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default SecOps;