import React from 'react';
import SimplePage from '../../components/SimplePage';

const MentalModels: React.FC = () => {
  return (
    <SimplePage 
      title="Mental Models for Engineering Leaders" 
      subtitle="Frameworks for thinking, decision making, and problem solving."
    >
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold text-primary dark:text-white mb-2">First Principles Thinking</h3>
          <p>Breaking a problem down to its basic elements and building up from there, rather than reasoning by analogy.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Second-Order Thinking</h3>
          <p>Considering not just the immediate consequences of a decision, but the consequences of those consequences. "And then what?"</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-primary dark:text-white mb-2">The Map is Not the Territory</h3>
          <p>Acknowledging that our models and abstractions (architectural diagrams) are just simplifications of reality, not reality itself.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Inversion</h3>
          <p>Avoiding stupidity is easier than seeking brilliance. Instead of asking "how do I make this project succeed?", ask "what would cause this project to fail?" and mitigate those risks.</p>
        </div>
      </div>
    </SimplePage>
  );
};

export default MentalModels;