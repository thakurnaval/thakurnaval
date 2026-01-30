import React from 'react';
import SimplePage from '../../components/SimplePage';

const SoftwareEngineering: React.FC = () => {
  return (
    <SimplePage 
      title="Software Engineering Practices" 
      subtitle="Disciplined approaches to building high-quality software."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
           <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Process Models</h3>
           <ul className="list-disc list-inside text-sm space-y-1">
             <li>Agile & Scrum</li>
             <li>Kanban</li>
             <li>Extreme Programming (XP)</li>
             <li>Waterfall (Historical context)</li>
           </ul>
        </div>
        <div>
           <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Quality Assurance</h3>
           <ul className="list-disc list-inside text-sm space-y-1">
             <li>Unit Testing (TDD)</li>
             <li>Integration Testing</li>
             <li>Static Code Analysis</li>
             <li>Peer Code Review</li>
           </ul>
        </div>
        <div>
           <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Documentation</h3>
           <ul className="list-disc list-inside text-sm space-y-1">
             <li>Architecture Decision Records (ADR)</li>
             <li>RFCs for major changes</li>
             <li>Living documentation (MermaidJS in markdown)</li>
           </ul>
        </div>
        <div>
           <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Release Engineering</h3>
           <ul className="list-disc list-inside text-sm space-y-1">
             <li>Semantic Versioning</li>
             <li>Changelog management</li>
             <li>Feature Flags</li>
             <li>Canary Deployments</li>
           </ul>
        </div>
      </div>
    </SimplePage>
  );
};

export default SoftwareEngineering;