import React from 'react';
import SimplePage from '../../components/SimplePage';

const DevOpsMaturity: React.FC = () => {
  return (
    <SimplePage 
      title="DevOps Maturity Model" 
      subtitle="From chaotic manual processes to optimized, self-healing systems."
    >
      <h3 className="text-2xl font-bold text-primary dark:text-white mb-6">The 5 Stages of Maturity</h3>
      
      <div className="space-y-6 relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 pl-8">
        {[
          { title: "1. Initial (Chaotic)", desc: "Manual processes, siloed teams, 'hero' culture, frequent fires." },
          { title: "2. Managed", desc: "Project-based automation, some CI, beginning to track metrics." },
          { title: "3. Defined", desc: "Organization-wide standards, CI/CD pipelines, IaC adoption, proactive monitoring." },
          { title: "4. Measured", desc: "Data-driven improvement, automated security (DevSecOps), strong feedback loops." },
          { title: "5. Optimized", desc: "Self-healing systems, chaos engineering, focus on innovation over operations." }
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

export default DevOpsMaturity;