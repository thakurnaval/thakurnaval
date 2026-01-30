import React from 'react';
import SimplePage from '../../components/SimplePage';

const SecOpsPrinciples: React.FC = () => {
  return (
    <SimplePage 
      title="SecOps Principles" 
      subtitle="Foundational concepts for secure systems."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold text-primary dark:text-white mb-2">CIA Triad</h3>
          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
            <li><strong>Confidentiality:</strong> Only authorized access.</li>
            <li><strong>Integrity:</strong> Data is accurate and trustworthy.</li>
            <li><strong>Availability:</strong> Systems are up and running.</li>
          </ul>
        </div>

        <div>
           <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Defense in Depth</h3>
           <p className="text-slate-600 dark:text-slate-300">
             Layering multiple security controls (physical, network, application, data) so that if one fails, others are in place.
           </p>
        </div>

        <div>
           <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Least Privilege</h3>
           <p className="text-slate-600 dark:text-slate-300">
             Users and services should only have the bare minimum permissions necessary to perform their function.
           </p>
        </div>

        <div>
           <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Zero Trust</h3>
           <p className="text-slate-600 dark:text-slate-300">
             "Never trust, always verify." Assume breach and verify identity and intent for every request, regardless of network location.
           </p>
        </div>
      </div>
    </SimplePage>
  );
};

export default SecOpsPrinciples;