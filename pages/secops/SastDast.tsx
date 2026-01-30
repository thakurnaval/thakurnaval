import React from 'react';
import SimplePage from '../../components/SimplePage';

const SastDast: React.FC = () => {
  return (
    <SimplePage 
      title="SAST & DAST Tooling" 
      subtitle="Static and Dynamic analysis techniques for vulnerability detection."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-slate-200 dark:border-slate-700 p-6 rounded-xl">
           <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">SAST (Static Application Security Testing)</h3>
           <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
             Analyzing source code, byte code, or binaries for security vulnerabilities without executing the application.
           </p>
           <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 font-medium">
             <li>White-box testing</li>
             <li>Finds bugs early (Shift Left)</li>
             <li>High false positives usually</li>
             <li>Tools: SonarQube, Checkmarx, Fortify</li>
           </ul>
        </div>

        <div className="border border-slate-200 dark:border-slate-700 p-6 rounded-xl">
           <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">DAST (Dynamic Application Security Testing)</h3>
           <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
             Analyzing a running application by simulating attacks from the outside to find runtime vulnerabilities.
           </p>
           <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 font-medium">
             <li>Black-box testing</li>
             <li>Finds configuration/runtime issues</li>
             <li>Requires a running environment</li>
             <li>Tools: OWASP ZAP, Burp Suite</li>
           </ul>
        </div>
      </div>
    </SimplePage>
  );
};

export default SastDast;