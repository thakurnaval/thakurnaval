import React from 'react';
import SimplePage from '../../components/SimplePage';

const ThreatModelling: React.FC = () => {
  return (
    <SimplePage 
      title="Threat Modelling & Risk Management" 
      subtitle="Identifying potential threats before writing a single line of code."
    >
      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">STRIDE Methodology</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {[
          { t: "Spoofing", d: "Pretending to be something/someone else." },
          { t: "Tampering", d: "Modifying data or code." },
          { t: "Repudiation", d: "Claiming not to have performed an action." },
          { t: "Information Disclosure", d: "Exposing data to unauthorized users." },
          { t: "Denial of Service", d: "Preventing valid access to resources." },
          { t: "Elevation of Privilege", d: "Gaining higher access rights than authorized." },
        ].map((item, i) => (
          <div key={i} className="p-4 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800">
            <h4 className="font-bold text-secondary">{item.t}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">{item.d}</p>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Risk Management</h3>
      <p>
        Not all vulnerabilities need to be fixed immediately. Risk management involves assessing the <strong>Likelihood</strong> and <strong>Impact</strong> of a threat to prioritize remediation efforts based on business context.
      </p>
    </SimplePage>
  );
};

export default ThreatModelling;