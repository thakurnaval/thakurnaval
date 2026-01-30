import React from 'react';
import SimplePage from '../../components/SimplePage';

const ITGovernance: React.FC = () => {
  return (
    <SimplePage 
      title="IT Governance" 
      subtitle="Ensuring IT aligns with business goals and manages risk effectively."
    >
      <p>
        IT Governance is a formal framework that provides a structure for organizations to ensure that IT investments support business objectives. It involves decision-making rights and accountability frameworks.
      </p>

      <h3 className="text-xl font-bold text-primary dark:text-white mt-8 mb-4">Key Frameworks</h3>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>COBIT:</strong> Control Objectives for Information and Related Technologies. Focuses on risk management and governance.</li>
        <li><strong>ITIL:</strong> Focuses on IT Service Management (ITSM).</li>
        <li><strong>ISO/IEC 38500:</strong> International standard for corporate governance of IT.</li>
      </ul>

      <h3 className="text-xl font-bold text-primary dark:text-white mt-8 mb-4">Objectives</h3>
      <ul className="list-disc list-inside space-y-2">
        <li>Strategic Alignment</li>
        <li>Value Delivery</li>
        <li>Risk Management</li>
        <li>Resource Management</li>
        <li>Performance Measurement</li>
      </ul>
    </SimplePage>
  );
};

export default ITGovernance;