import React from 'react';
import SimplePage from '../../components/SimplePage';

const Microservices: React.FC = () => {
  return (
    <SimplePage 
      title="Microservices Architecture" 
      subtitle="Decomposing monoliths into loosely coupled, independently deployable services."
    >
      <p>
        Microservices architecture styles a suite of small services, each running in its own process and communicating with lightweight mechanisms, often an HTTP resource API.
      </p>

      <h3 className="text-xl font-bold text-primary dark:text-white mt-8 mb-4">Core Principles</h3>
      <ul className="list-disc list-inside space-y-2">
        <li>Modeled around Business Domains (DDD).</li>
        <li>Culture of Automation (CI/CD is mandatory).</li>
        <li>Hide Implementation Details (API Gateways).</li>
        <li>Decentralize all things (Data governance, management).</li>
        <li>Design for Failure (Circuit Breakers, Bulkheads).</li>
      </ul>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mt-8">
        <h4 className="font-bold text-yellow-800 dark:text-yellow-200">Warning</h4>
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          "Don't even consider microservices unless you have a system that's too complex to manage as a monolith." - Martin Fowler
        </p>
      </div>
    </SimplePage>
  );
};

export default Microservices;