import React from 'react';
import SimplePage from '../../components/SimplePage';

const TwelveFactor: React.FC = () => {
  const factors = [
    "Codebase: One codebase tracked in revision control, many deploys.",
    "Dependencies: Explicitly declare and isolate dependencies.",
    "Config: Store config in the environment.",
    "Backing services: Treat backing services as attached resources.",
    "Build, release, run: Strictly separate build and run stages.",
    "Processes: Execute the app as one or more stateless processes.",
    "Port binding: Export services via port binding.",
    "Concurrency: Scale out via the process model.",
    "Disposability: Maximize robustness with fast startup and graceful shutdown.",
    "Dev/prod parity: Keep development, staging, and production as similar as possible.",
    "Logs: Treat logs as event streams.",
    "Admin processes: Run admin/management tasks as one-off processes."
  ];

  return (
    <SimplePage 
      title="The Twelve-Factor App" 
      subtitle="A methodology for building modern, scalable, maintainable software-as-a-service apps."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {factors.map((factor, i) => (
          <div key={i} className="flex items-start">
             <div className="bg-secondary/20 text-primary dark:text-secondary font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
               {i + 1}
             </div>
             <p className="pt-1 text-sm font-medium">{factor}</p>
          </div>
        ))}
      </div>
    </SimplePage>
  );
};

export default TwelveFactor;