import React from 'react';
import SimplePage from '../../components/SimplePage';

const SRE: React.FC = () => {
  return (
    <SimplePage 
      title="Site Reliability Engineering (SRE)" 
      subtitle="Applying software engineering principles to operations problems."
    >
      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg mb-8 italic text-slate-700 dark:text-slate-300 border-l-4 border-primary dark:border-secondary">
        "SRE is what happens when you ask a software engineer to design an operations team." — Ben Treynor Sloss, Google
      </div>

      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Core Concepts</h3>
      <ul className="space-y-4">
        <li>
          <strong className="text-primary dark:text-white block mb-1">SLAs, SLOs, and SLIs:</strong>
          Defining reliability targets. Service Level Indicators (metrics), Objectives (goals), and Agreements (contracts).
        </li>
        <li>
          <strong className="text-primary dark:text-white block mb-1">Error Budgets:</strong>
          The allowable threshold for failure. If you burn your budget, innovation stops to focus on stability.
        </li>
        <li>
          <strong className="text-primary dark:text-white block mb-1">Toil Reduction:</strong>
          Automating repetitive, manual work. SREs should spend 50% of time on engineering, not tickets.
        </li>
      </ul>
    </SimplePage>
  );
};

export default SRE;