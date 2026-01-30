import React from 'react';
import SimplePage from '../../components/SimplePage';
import { Box, Layers, Zap, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const DesignPatterns: React.FC = () => {
  return (
    <SimplePage 
      title="Design Patterns" 
      subtitle="Proven solutions for common software design challenges, curated for scalability and maintainability."
    >
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Why Architecture Patterns Matter</h2>
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Design patterns provide a shared language for developers. Instead of reinventing the wheel, we use battle-tested templates like <Link to="/architecture/solid-principles" className="text-secondary hover:underline">SOLID principles</Link> to build systems that are easy to test, maintain, and extend.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <Box className="w-10 h-10 text-secondary mb-4" />
            <h3 className="text-xl font-bold text-primary dark:text-white mb-3">Creational Patterns</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Focus on object creation mechanisms that increase flexibility and reuse of existing code.
            </p>
            <ul className="space-y-2 text-xs font-medium text-slate-500">
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-secondary"></span> <strong>Singleton:</strong> Ensuring a class has only one instance.</li>
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-secondary"></span> <strong>Factory Method:</strong> Creating objects without specifying the exact class.</li>
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-secondary"></span> <strong>Builder:</strong> Constructing complex objects step by step.</li>
            </ul>
          </div>

          <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <Layers className="w-10 h-10 text-secondary mb-4" />
            <h3 className="text-xl font-bold text-primary dark:text-white mb-3">Structural Patterns</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Explaining how to assemble objects and classes into larger structures while keeping them flexible.
            </p>
            <ul className="space-y-2 text-xs font-medium text-slate-500">
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-secondary"></span> <strong>Adapter:</strong> Allowing incompatible interfaces to work together.</li>
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-secondary"></span> <strong>Facade:</strong> Providing a simplified interface to a library or framework.</li>
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-secondary"></span> <strong>Proxy:</strong> Controlling access to an object.</li>
            </ul>
          </div>

          <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <Zap className="w-10 h-10 text-secondary mb-4" />
            <h3 className="text-xl font-bold text-primary dark:text-white mb-3">Behavioral Patterns</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Concerned with algorithms and the assignment of responsibilities between objects.
            </p>
            <ul className="space-y-2 text-xs font-medium text-slate-500">
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-secondary"></span> <strong>Strategy:</strong> Defining a family of algorithms and making them interchangeable.</li>
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-secondary"></span> <strong>Observer:</strong> A subscription mechanism to notify multiple objects about events.</li>
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-secondary"></span> <strong>Command:</strong> Turning a request into a stand-alone object.</li>
            </ul>
          </div>

          <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <Share2 className="w-10 h-10 text-secondary mb-4" />
            <h3 className="text-xl font-bold text-primary dark:text-white mb-3">Cloud Patterns</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Patterns essential for modern <Link to="/architecture/cloud-architecture" className="text-secondary hover:underline">cloud-native development</Link>.
            </p>
            <ul className="space-y-2 text-xs font-medium text-slate-500">
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-secondary"></span> <strong>Circuit Breaker:</strong> Preventing cascading failures in microservices.</li>
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-secondary"></span> <strong>Saga Pattern:</strong> Managing distributed transactions in <Link to="/architecture/microservices" className="text-secondary hover:underline">microservices</Link>.</li>
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-secondary"></span> <strong>CQRS:</strong> Separating read and write operations for performance.</li>
            </ul>
          </div>
        </div>

        <div className="bg-primary text-white p-10 rounded-3xl">
          <h2 className="text-2xl font-bold mb-6">Implementing Patterns in Your Organization</h2>
          <p className="mb-6 opacity-90">
            The goal isn't to use as many patterns as possible, but to apply the right pattern to the right problem. Over-engineering with patterns can lead to accidental complexity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
             <Link to="/contact?topic=Architecture Review" className="inline-block px-6 py-3 bg-secondary text-primary font-bold rounded-lg hover:bg-secondary-hover transition-colors">
               Book Architecture Review
             </Link>
             <Link to="/architecture/system-design-process" className="inline-block px-6 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-lg hover:bg-white/20 transition-colors">
               Explore System Design Process
             </Link>
          </div>
        </div>
      </div>
    </SimplePage>
  );
};

export default DesignPatterns;