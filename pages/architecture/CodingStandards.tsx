import React from 'react';
import SimplePage from '../../components/SimplePage';

const CodingStandards: React.FC = () => {
  return (
    <SimplePage 
      title="Coding Standards & Best Practices" 
      subtitle="Writing code that is readable, maintainable, and testable."
    >
      <h3 className="text-xl font-bold text-primary dark:text-white mb-4">Why Standards Matter</h3>
      <p>
        Code is read much more often than it is written. Standards ensure that a team can work cohesively, reducing cognitive load when context switching between modules.
      </p>

      <h3 className="text-xl font-bold text-primary dark:text-white mt-8 mb-4">Common Practices</h3>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>DRY (Don't Repeat Yourself):</strong> Abstraction of common logic.</li>
        <li><strong>KISS (Keep It Simple, Stupid):</strong> Avoid over-engineering.</li>
        <li><strong>YAGNI (You Aren't Gonna Need It):</strong> Do not add functionality until it is necessary.</li>
        <li><strong>Clean Code:</strong> Meaningful naming, small functions, handling errors gracefully.</li>
        <li><strong>Code Reviews:</strong> A mechanism for knowledge sharing and quality assurance.</li>
      </ul>
    </SimplePage>
  );
};

export default CodingStandards;