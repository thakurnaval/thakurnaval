import React from 'react';
import SimplePage from '../../components/SimplePage';

const ContinuousSecurity: React.FC = () => {
  return (
    <SimplePage 
      title="Continuous Security & Integration" 
      subtitle="Embedding security validation into the CI/CD pipeline."
    >
      <p className="mb-6">
        Continuous Security ensures that every code change is automatically validated against security policies. If a check fails, the build breaks.
      </p>

      <div className="relative border-l-2 border-slate-300 dark:border-slate-700 ml-4 space-y-8 py-4">
         <div className="ml-6 relative">
           <span className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-secondary border-4 border-white dark:border-slate-900"></span>
           <h4 className="font-bold text-primary dark:text-white">Commit</h4>
           <p className="text-sm text-slate-600 dark:text-slate-400">Secret scanning, linting.</p>
         </div>
         <div className="ml-6 relative">
           <span className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-secondary border-4 border-white dark:border-slate-900"></span>
           <h4 className="font-bold text-primary dark:text-white">Build</h4>
           <p className="text-sm text-slate-600 dark:text-slate-400">SAST, SCA (Software Composition Analysis).</p>
         </div>
         <div className="ml-6 relative">
           <span className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-secondary border-4 border-white dark:border-slate-900"></span>
           <h4 className="font-bold text-primary dark:text-white">Test/Staging</h4>
           <p className="text-sm text-slate-600 dark:text-slate-400">DAST, Container scanning.</p>
         </div>
         <div className="ml-6 relative">
           <span className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-secondary border-4 border-white dark:border-slate-900"></span>
           <h4 className="font-bold text-primary dark:text-white">Deploy/Runtime</h4>
           <p className="text-sm text-slate-600 dark:text-slate-400">RASP (Runtime Application Self-Protection), Configuration monitoring.</p>
         </div>
      </div>
    </SimplePage>
  );
};

export default ContinuousSecurity;