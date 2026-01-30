import React from 'react';
import SimplePage from '../../components/SimplePage';
import { Tag } from 'lucide-react';

const CostVisibility: React.FC = () => {
  return (
    <SimplePage 
      title="Cost Visibility & Allocation" 
      subtitle="You cannot optimize what you cannot measure."
    >
      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Tagging Strategy</h3>
      <p className="mb-6">
        A robust tagging strategy is the foundation of FinOps. Every resource (EC2, RDS, S3 Bucket) must have metadata indicating its owner and purpose.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {[
          { k: "CostCenter", v: "1024 (Marketing)", d: "Who pays for this?" },
          { k: "Environment", v: "Production", d: "Is this critical?" },
          { k: "Application", v: "CheckoutService", d: "What system is this?" },
          { k: "Owner", v: "team-alpha@company.com", d: "Who do I contact?" },
        ].map((tag, i) => (
          <div key={i} className="flex items-center p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
            <Tag className="w-5 h-5 text-secondary mr-3" />
            <div>
              <span className="font-mono text-xs font-bold text-primary dark:text-white bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded mr-2">{tag.k}</span>
              <span className="font-mono text-xs text-slate-600 dark:text-slate-300 mr-2">={tag.v}</span>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Showback vs. Chargeback</h3>
      <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
        <li><strong>Showback:</strong> Showing teams what they spent, for awareness and accountability, without actually moving budget. Good for early maturity.</li>
        <li><strong>Chargeback:</strong> Actually deducting the cloud spend from the team's P&L budget. Drives stronger behavior change but requires mature finance processes.</li>
      </ul>
    </SimplePage>
  );
};

export default CostVisibility;