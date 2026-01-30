import React from 'react';
import SimplePage from '../../components/SimplePage';
import { CheckSquare } from 'lucide-react';

const DevOpsAssessment: React.FC = () => {
  return (
    <SimplePage 
      title="DevOps Assessment" 
      subtitle="Evaluate your current state to chart a path forward."
    >
      <p>
        Before starting a transformation, you must know where you stand. An effective assessment evaluates People, Process, and Technology.
      </p>

      <h3 className="text-2xl font-bold text-primary dark:text-white mt-8 mb-4">Key Assessment Areas</h3>
      <div className="space-y-4">
        {[
          "Deployment Frequency: How often do you deploy to production?",
          "Lead Time for Changes: How long from code commit to code running in production?",
          "Mean Time to Restore (MTTR): How quickly can you recover from failure?",
          "Change Failure Rate: What percentage of changes result in degraded service?",
          "Cultural Health: Is there psychological safety? Do teams collaborate?",
          "Automation Level: Is infrastructure manual or defined as code?"
        ].map((area, i) => (
          <div key={i} className="flex items-start">
             <CheckSquare className="w-5 h-5 text-secondary mr-3 mt-1 flex-shrink-0" />
             <span className="text-slate-700 dark:text-slate-300">{area}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r">
        <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-2">Need a Professional Audit?</h4>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          I offer a comprehensive 2-week assessment package that delivers a scorecard and a prioritized roadmap for your organization.
        </p>
      </div>
    </SimplePage>
  );
};

export default DevOpsAssessment;