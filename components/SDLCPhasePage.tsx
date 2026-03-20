import React from 'react';
import SimplePage from './SimplePage';
import { LucideIcon } from 'lucide-react';

interface SDLCPhaseProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  content: string;
  benefits: string[];
}

const SDLCPhasePage: React.FC<SDLCPhaseProps> = ({ title, subtitle, icon: Icon, content, benefits }) => {
  return (
    <SimplePage title={title} subtitle={subtitle}>
      <div className="max-w-4xl space-y-12">
        <div className="flex items-start gap-6">
          <div className="p-4 rounded-2xl bg-secondary/10 text-secondary">
            <Icon className="w-12 h-12" />
          </div>
          <div className="flex-grow">
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {content}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-bold text-primary dark:text-white mb-6">Key Benefits</h3>
            <ul className="space-y-4">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-primary text-white p-8 rounded-2xl flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4">Ready to Implement?</h3>
            <p className="text-slate-300 mb-6 text-sm">
              Naval provides strategic consulting to help you integrate AI tools into your specific development environment.
            </p>
            <a href="/contact" className="inline-block px-6 py-3 bg-secondary text-primary font-bold rounded-lg hover:bg-secondary-hover transition-all text-center">
              Schedule a Consultation
            </a>
          </div>
        </div>
      </div>
    </SimplePage>
  );
};

export default SDLCPhasePage;
