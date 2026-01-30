import React from 'react';
import SimplePage from '../../components/SimplePage';

const SystemSecurity: React.FC = () => {
  return (
    <SimplePage 
      title="Security in System Design" 
      subtitle="Security by Design: Integrating protection from the ground up."
    >
      <p>
        Security is not a feature you add at the end. It must be an architectural concern addressed at every layer of the stack.
      </p>

      <h3 className="text-xl font-bold text-primary dark:text-white mt-8 mb-4">Key Principles</h3>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Least Privilege:</strong> Components should operate with minimum necessary permissions.</li>
        <li><strong>Defense in Depth:</strong> Multiple layers of security controls (Network, Identity, App, Data).</li>
        <li><strong>Zero Trust:</strong> Never trust, always verify. Authenticate and authorize every request.</li>
        <li><strong>Data Protection:</strong> Encryption at Rest (KMS) and in Transit (TLS).</li>
      </ul>
    </SimplePage>
  );
};

export default SystemSecurity;