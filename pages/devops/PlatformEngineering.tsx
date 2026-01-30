import React from 'react';
import SimplePage from '../../components/SimplePage';

const PlatformEngineering: React.FC = () => {
  return (
    <SimplePage 
      title="Platform Engineering" 
      subtitle="Building Internal Developer Platforms (IDP) to reduce cognitive load."
    >
      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Why Platform Engineering?</h3>
      <p className="mb-6">
        DevOps shifted "Ops" responsibilities to developers, but often overwhelmed them with complexity. Platform Engineering solves this by treating the internal platform as a product and developers as customers.
      </p>

      <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Golden Paths</h3>
      <p className="mb-6">
        Creating paved roads (templates, standardized pipelines) that make doing the right thing the easiest thing.
      </p>

      <h3 className="text-xl font-bold text-primary dark:text-white mb-2">IDP (Internal Developer Portal)</h3>
      <p className="mb-6">
        Using tools like <strong>Backstage</strong> to provide a unified interface for creating services, viewing documentation, and managing resources without needing to be a Kubernetes expert.
      </p>
    </SimplePage>
  );
};

export default PlatformEngineering;