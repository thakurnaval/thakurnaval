import React from 'react';
import SimplePage from '../../components/SimplePage';

const FinOpsCulture: React.FC = () => {
  return (
    <SimplePage 
      title="FinOps Culture" 
      subtitle="Bridging the gap between Engineering, Finance, and Product."
    >
      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">The Cloud Center of Excellence (CCoE)</h3>
      <p className="mb-6">
        A central team that governs the cloud strategy. It should include representatives from:
      </p>
      <ul className="list-disc list-inside space-y-1 mb-8 text-slate-700 dark:text-slate-300">
        <li><strong>Engineering:</strong> To understand technical feasibility.</li>
        <li><strong>Finance:</strong> To handle budgeting and accounting.</li>
        <li><strong>Product:</strong> To ensure spend aligns with business value.</li>
        <li><strong>Executive Sponsor:</strong> To break ties and enforce policy.</li>
      </ul>

      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Gamification</h3>
      <p>
        How do you get engineers to care about cost?
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
        <li>Leaderboards for "Most Optimized Team".</li>
        <li>Hackathons focused on cost reduction.</li>
        <li>Celebrating savings wins in all-hands meetings.</li>
      </ul>
    </SimplePage>
  );
};

export default FinOpsCulture;