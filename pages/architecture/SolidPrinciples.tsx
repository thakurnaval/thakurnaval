import React from 'react';
import SimplePage from '../../components/SimplePage';

const SolidPrinciples: React.FC = () => {
  return (
    <SimplePage 
      title="SOLID Design Principles" 
      subtitle="The foundation of maintainable and scalable object-oriented software."
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-primary dark:text-white mb-2">S - Single Responsibility Principle</h3>
          <p>A class should have one, and only one, reason to change.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-primary dark:text-white mb-2">O - Open/Closed Principle</h3>
          <p>Software entities should be open for extension, but closed for modification.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-primary dark:text-white mb-2">L - Liskov Substitution Principle</h3>
          <p>Objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-primary dark:text-white mb-2">I - Interface Segregation Principle</h3>
          <p>Many client-specific interfaces are better than one general-purpose interface.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-primary dark:text-white mb-2">D - Dependency Inversion Principle</h3>
          <p>Depend upon abstractions, [not] concretions.</p>
        </div>
      </div>
    </SimplePage>
  );
};

export default SolidPrinciples;