import React from 'react';
import SimplePage from '../../components/SimplePage';

const SecOpsAutomation: React.FC = () => {
  return (
    <SimplePage 
      title="SecOps Automation & Tooling" 
      subtitle="Scaling security through code and orchestration."
    >
      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">SOAR (Security Orchestration, Automation and Response)</h3>
      <p className="mb-6">
        Automating the response to low-level alerts allows analysts to focus on complex threats. For example, automatically isolating an infected host or revoking a compromised token.
      </p>

      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Infrastructure as Code (IaC) Scanning</h3>
      <p className="mb-4">
        Tools like <strong>Checkov</strong>, <strong>tfsec</strong>, or <strong>Terrascan</strong> analyze Terraform/CloudFormation templates to ensure resources are secure by default (e.g., S3 buckets are private, Security Groups are restricted).
      </p>

      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Compliance as Code</h3>
      <p>
        Using tools like <strong>Open Policy Agent (OPA)</strong> to enforce governance policies programmatically across the stack.
      </p>
    </SimplePage>
  );
};

export default SecOpsAutomation;