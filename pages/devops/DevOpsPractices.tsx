import React from 'react';
import SimplePage from '../../components/SimplePage';

const DevOpsPractices: React.FC = () => {
  return (
    <SimplePage 
      title="Key DevOps Practices" 
      subtitle="The technical and cultural habits of high-performing teams."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
           <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Technical Practices</h3>
           <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
             <li><strong>Continuous Integration (CI):</strong> Merging code daily, automated testing.</li>
             <li><strong>Continuous Delivery (CD):</strong> Automated release pipelines.</li>
             <li><strong>Infrastructure as Code (IaC):</strong> Managing infra via git (Terraform/Ansible).</li>
             <li><strong>Microservices:</strong> Loosely coupled architecture.</li>
             <li><strong>Observability:</strong> Logging, Metrics, and Tracing.</li>
           </ul>
        </div>
        <div>
           <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Cultural Practices</h3>
           <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
             <li><strong>Blameless Post-Mortems:</strong> Focus on process failure, not human error.</li>
             <li><strong>Shift Left:</strong> Testing and security early in the lifecycle.</li>
             <li><strong>You Build It, You Run It:</strong> Devs carry pagers for their services.</li>
             <li><strong>Psychological Safety:</strong> Safe to fail, safe to speak up.</li>
           </ul>
        </div>
      </div>
    </SimplePage>
  );
};

export default DevOpsPractices;