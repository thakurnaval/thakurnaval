import React from 'react';
import SimplePage from '../../components/SimplePage';

const TOGAF: React.FC = () => {
  return (
    <SimplePage 
      title="TOGAF® Framework" 
      subtitle="The Open Group Architecture Framework for Enterprise Architecture."
    >
      <p>
        TOGAF provides a comprehensive approach to the design, planning, implementation, and governance of an enterprise information technology architecture.
      </p>

      <h3 className="text-xl font-bold text-primary dark:text-white mt-8 mb-4">Architecture Development Method (ADM)</h3>
      <p className="mb-4">The core of TOGAF is the ADM cycle:</p>
      <ul className="list-decimal list-inside space-y-2">
        <li>Preliminary Phase</li>
        <li>A. Architecture Vision</li>
        <li>B. Business Architecture</li>
        <li>C. Information Systems Architectures</li>
        <li>D. Technology Architecture</li>
        <li>E. Opportunities and Solutions</li>
        <li>F. Migration Planning</li>
        <li>G. Implementation Governance</li>
        <li>H. Architecture Change Management</li>
      </ul>
    </SimplePage>
  );
};

export default TOGAF;