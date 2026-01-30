import React from 'react';
import SimplePage from '../../components/SimplePage';

const FinOpsFramework: React.FC = () => {
  return (
    <SimplePage 
      title="FinOps Framework" 
      subtitle="The operating model for the cloud."
    >
      <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">The FinOps Lifecycle</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-bold text-secondary mb-2">1. Inform</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Visibility and allocation. Giving teams access to near real-time data so they can make intelligent trade-offs between speed, cost, and quality.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-bold text-secondary mb-2">2. Optimize</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Empowering teams to identify and take action on savings opportunities (Rightsizing, Zombie resources) and rate optimization (RIs, Savings Plans).
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-bold text-secondary mb-2">3. Operate</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Defining and executing processes that enable the goals of Technology, Finance, and Business to be achieved.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">The Iron Triangle</h2>
      <p>
        FinOps is not about "saving money". It is about <strong>making money</strong>. It is about balancing Speed, Cost, and Quality. Sometimes spending more is the right business decision if it leads to greater revenue or market share.
      </p>
    </SimplePage>
  );
};

export default FinOpsFramework;