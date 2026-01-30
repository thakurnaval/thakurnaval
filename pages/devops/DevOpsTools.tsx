import React from 'react';
import SimplePage from '../../components/SimplePage';

const DevOpsTools: React.FC = () => {
  return (
    <SimplePage 
      title="DevOps Tool-stack" 
      subtitle="Navigating the CNCF landscape and selecting the right tools."
    >
      <p className="mb-8">
        Tools don't solve problems; people do. However, the right tools enable people to solve problems faster. Here is a standard enterprise-grade stack:
      </p>

      <div className="space-y-6">
        {[
          { cat: "Version Control", tools: "Git, GitHub, GitLab, Bitbucket" },
          { cat: "CI/CD", tools: "Jenkins, GitHub Actions, Azure DevOps, CircleCI, ArgoCD" },
          { cat: "Infrastructure as Code", tools: "Terraform, Ansible, Pulumi, CloudFormation" },
          { cat: "Containerization", tools: "Docker, Kubernetes, Helm, OpenShift" },
          { cat: "Monitoring & Observability", tools: "Prometheus, Grafana, ELK Stack, Datadog, Dynatrace" },
          { cat: "Security", tools: "SonarQube, Snyk, HashiCorp Vault, Aqua Security" },
          { cat: "Cloud Providers", tools: "AWS, Azure, Google Cloud Platform" }
        ].map((row, i) => (
          <div key={i} className="flex flex-col md:flex-row border-b border-slate-200 dark:border-slate-700 pb-4 last:border-0">
             <div className="md:w-1/3 font-bold text-primary dark:text-white">{row.cat}</div>
             <div className="md:w-2/3 text-slate-600 dark:text-slate-300">{row.tools}</div>
          </div>
        ))}
      </div>
    </SimplePage>
  );
};

export default DevOpsTools;