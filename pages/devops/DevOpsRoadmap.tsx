import React from 'react';
import SimplePage from '../../components/SimplePage';
import { ArrowDown } from 'lucide-react';

const DevOpsRoadmap: React.FC = () => {
  return (
    <SimplePage 
      title="DevOps Engineer Roadmap" 
      subtitle="A step-by-step guide to mastering the DevOps landscape."
    >
      <div className="flex flex-col items-center space-y-4 max-w-lg mx-auto">
        {[
          "1. Learn a Programming Language (Python, Go, JS)",
          "2. Understand OS Concepts (Linux, Terminal, Bash Scripting)",
          "3. Networking & Security (DNS, HTTP, SSL, Firewalls)",
          "4. Infrastructure as Code (Terraform, Ansible)",
          "5. CI/CD Tools (Jenkins, GitHub Actions)",
          "6. Containers & Orchestration (Docker, Kubernetes)",
          "7. Cloud Providers (AWS/Azure/GCP)",
          "8. Observability (Prometheus, Grafana, ELK)"
        ].map((step, i) => (
          <React.Fragment key={i}>
            <div className="w-full p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-center font-bold text-primary dark:text-white shadow-sm">
              {step}
            </div>
            {i < 7 && <ArrowDown className="text-secondary" size={24} />}
          </React.Fragment>
        ))}
      </div>
    </SimplePage>
  );
};

export default DevOpsRoadmap;