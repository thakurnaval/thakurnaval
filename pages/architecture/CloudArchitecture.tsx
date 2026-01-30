import React from 'react';
import SimplePage from '../../components/SimplePage';

const CloudArchitecture: React.FC = () => {
  return (
    <SimplePage 
      title="Cloud Architecture" 
      subtitle="Designing for the elasticity and managed services of the cloud."
    >
      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Key Concepts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h4 className="font-bold mb-2">Well-Architected Framework</h4>
          <p className="text-sm">Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h4 className="font-bold mb-2">Serverless</h4>
          <p className="text-sm">Shift operational responsibility to the cloud provider (Lambda, Fargate, Cloud Run).</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h4 className="font-bold mb-2">Multi-Region Strategy</h4>
          <p className="text-sm">Active-Active vs Active-Passive setups for global availability.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h4 className="font-bold mb-2">Hybrid Cloud</h4>
          <p className="text-sm">Connecting on-premise legacy systems with modern cloud infrastructure.</p>
        </div>
      </div>
    </SimplePage>
  );
};

export default CloudArchitecture;