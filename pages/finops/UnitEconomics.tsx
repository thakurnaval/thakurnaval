import React from 'react';
import SimplePage from '../../components/SimplePage';
import { TrendingUp, TrendingDown } from 'lucide-react';

const UnitEconomics: React.FC = () => {
  return (
    <SimplePage 
      title="Unit Economics" 
      subtitle="Moving from 'Total Cost' to 'Cost Per X'."
    >
      <p className="mb-6">
        Just because your cloud bill went up doesn't mean you are doing a bad job. If your user base doubled, your bill <em>should</em> go up. Unit economics measures efficiency relative to business value.
      </p>

      <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-8">
         <h3 className="text-xl font-bold text-primary dark:text-white mb-4 text-center">The Golden Metric</h3>
         <div className="flex justify-center items-center text-2xl font-bold font-mono text-secondary">
            Cost per Transaction / Customer / Order
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-green-200 bg-green-50 dark:bg-green-900/10 p-4 rounded">
           <div className="flex items-center gap-2 font-bold text-green-700 dark:text-green-400 mb-2">
             <TrendingUp /> Healthy Growth
           </div>
           <p className="text-sm">Total Spend is UP, but Cost Per Customer is FLAT or DOWN. This means you are scaling efficiently.</p>
        </div>
        <div className="border border-red-200 bg-red-50 dark:bg-red-900/10 p-4 rounded">
           <div className="flex items-center gap-2 font-bold text-red-700 dark:text-red-400 mb-2">
             <TrendingDown /> Unhealthy Growth
           </div>
           <p className="text-sm">Total Spend is UP, and Cost Per Customer is UP. Economies of scale are working against you.</p>
        </div>
      </div>
    </SimplePage>
  );
};

export default UnitEconomics;