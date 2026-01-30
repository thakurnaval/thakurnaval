import React from 'react';
import SimplePage from '../../components/SimplePage';

const DevSecOpsPractices: React.FC = () => {
  return (
    <SimplePage 
      title="DevSecOps Practices" 
      subtitle="Integrating security into the software development lifecycle."
    >
      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Shift Left</h3>
      <p className="mb-6">
        The fundamental principle of DevSecOps is moving security checks earlier in the process—from the "deploy" phase to the "design" and "build" phases.
      </p>

      <div className="space-y-6 mb-12">
        {[
          { title: "Pre-Commit Hooks", desc: "Scan for secrets (API keys, passwords) before code even leaves the developer's machine." },
          { title: "IDE Integration", desc: "Real-time feedback on vulnerabilities within the code editor." },
          { title: "Dependency Scanning", desc: "Automated checks for known vulnerabilities in open-source libraries (SCA)." },
          { title: "Security Champions", desc: "Embedding security-savvy developers within product teams to scale knowledge." }
        ].map((item, i) => (
          <div key={i} className="flex flex-col border-l-4 border-secondary pl-4">
            <h4 className="font-bold text-primary dark:text-white">{item.title}</h4>
            <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-primary dark:text-white mb-6">DevSecOps Maturity Model</h3>
      
      <div className="space-y-6 relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 pl-8">
        {[
          { title: "1. Traditional (Siloed)", desc: "Security is a gatekeeper at the end. Manual reviews, long delays, 'Department of No'." },
          { title: "2. Ad-hoc (Scripted)", desc: "Basic automated scanning (SAST) in place, but often ignored. Security and Dev teams still siloed." },
          { title: "3. Integrated (Defined)", desc: "Security tools integrated into CI/CD. Breaking builds on critical vulnerabilities. Policies defined." },
          { title: "4. Systematic (Measured)", desc: "Threat modeling part of design. Security as Code. Comprehensive coverage (SAST, DAST, SCA, Container)." },
          { title: "5. Optimized (Self-Healing)", desc: "Zero Trust defaults. Automated remediation. Security is invisible and enables speed." }
        ].map((stage, i) => (
          <div key={i} className="relative">
            <span className="absolute -left-[41px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold ring-4 ring-white dark:ring-slate-900">
              {i + 1}
            </span>
            <h4 className="text-lg font-bold text-primary dark:text-white">{stage.title}</h4>
            <p className="text-slate-600 dark:text-slate-400">{stage.desc}</p>
          </div>
        ))}
      </div>
    </SimplePage>
  );
};

export default DevSecOpsPractices;