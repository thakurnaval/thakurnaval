import React from 'react';
import SimplePage from '../../components/SimplePage';

const ChaosEngineering: React.FC = () => {
  return (
    <SimplePage 
      title="Chaos Engineering" 
      subtitle="Experimenting on a system to build confidence in its capability to withstand turbulent conditions."
    >
      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Principles of Chaos</h3>
      <ul className="list-disc list-inside space-y-3 text-slate-700 dark:text-slate-300">
        <li><strong>Define Steady State:</strong> Know what "normal" looks like via metrics.</li>
        <li><strong>Hypothesize:</strong> "If I kill one database node, the system should failover in 2 seconds."</li>
        <li><strong>Inject Faults:</strong> Network latency, packet loss, server crashes.</li>
        <li><strong>Verify:</strong> Did the system behave as expected?</li>
      </ul>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Tools</h3>
        <p>Chaos Monkey, Gremlin, LitmusChaos, AWS Fault Injection Simulator.</p>
      </div>
    </SimplePage>
  );
};

export default ChaosEngineering;