import React from 'react';
import SimplePage from '../../components/SimplePage';
import { ShieldAlert, Activity, Users } from 'lucide-react';

const SecOpsPractices: React.FC = () => {
  return (
    <SimplePage 
      title="SecOps Practices" 
      subtitle="Operationalizing security for the modern enterprise."
    >
      <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Core Operational Practices</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <ShieldAlert className="w-8 h-8 text-secondary mb-3" />
          <h3 className="font-bold text-primary dark:text-white mb-2">Incident Response</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Structured workflows for detecting, analyzing, and recovering from security incidents.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <Activity className="w-8 h-8 text-secondary mb-3" />
          <h3 className="font-bold text-primary dark:text-white mb-2">Continuous Monitoring</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Real-time observability into network traffic, access logs, and system anomalies.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <Users className="w-8 h-8 text-secondary mb-3" />
          <h3 className="font-bold text-primary dark:text-white mb-2">Red & Blue Teaming</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Simulating attacks to test defense capabilities and improve readiness.</p>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-primary dark:text-white mb-2">The SOC Evolution</h2>
      <p className="mb-4">
        Traditional Security Operations Centers (SOC) were often isolated. Modern SecOps integrates the SOC with DevOps teams to share context and accelerate remediation.
      </p>
    </SimplePage>
  );
};

export default SecOpsPractices;