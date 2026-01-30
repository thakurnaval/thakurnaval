import React from 'react';
import SimplePage from '../../components/SimplePage';

const DevOpsFrameworks: React.FC = () => {
  return (
    <SimplePage 
      title="DevOps Frameworks" 
      subtitle="Guiding principles to structure your transformation journey."
    >
      <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">The Three Ways</h2>
      <p>
        Popularized by "The Phoenix Project" and "The DevOps Handbook", these are the underpinning principles of DevOps:
      </p>
      <ul className="list-decimal list-inside space-y-2 mb-8">
        <li><strong>Flow (Systems Thinking):</strong> Optimizing the flow of work from Development to Operations to the Customer.</li>
        <li><strong>Feedback:</strong> Creating short feedback loops to enable continuous improvement (Right to Left).</li>
        <li><strong>Continuous Learning & Experimentation:</strong> Creating a culture that fosters risk-taking and learning from failure.</li>
      </ul>

      <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">CALMS Framework</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { l: 'C', t: 'Culture', d: 'Focus on people and process, not just tools.' },
          { l: 'A', t: 'Automation', d: 'Remove manual toil to increase speed and consistency.' },
          { l: 'L', t: 'Lean', d: 'Apply Lean manufacturing principles to software (small batches).' },
          { l: 'M', t: 'Measurement', d: 'Data-driven decisions using metrics.' },
          { l: 'S', t: 'Sharing', d: 'Open collaboration and knowledge transfer.' },
        ].map((item, i) => (
          <div key={i} className="flex items-start p-4 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
            <span className="text-2xl font-bold text-primary dark:text-secondary mr-3">{item.l}</span>
            <div>
              <h3 className="font-bold text-primary dark:text-white">{item.t}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{item.d}</p>
            </div>
          </div>
        ))}
      </div>
    </SimplePage>
  );
};

export default DevOpsFrameworks;