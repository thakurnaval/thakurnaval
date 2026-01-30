import React from 'react';
import SimplePage from '../../components/SimplePage';

const Forecasting: React.FC = () => {
  return (
    <SimplePage 
      title="Forecasting & Budgeting" 
      subtitle="Predicting future spend to avoid bill shock."
    >
      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Why Forecast?</h3>
      <p className="mb-6">
        Finance teams hate variance. Cloud spend is variable (OpEx), which makes it hard to predict compared to traditional data centers (CapEx). Accurate forecasting builds trust between Engineering and Finance.
      </p>

      <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Methodologies</h3>
      <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
        <li><strong>Trend-based:</strong> "We grew 5% last month, assume 5% growth next month." Simple but misses seasonality.</li>
        <li><strong>Driver-based:</strong> "We expect 10,000 new users, and each user costs $0.05." More accurate but requires knowing unit economics.</li>
        <li><strong>Rolling Forecasts:</strong> Updating the budget every month/quarter based on actuals, rather than setting a rigid annual budget.</li>
      </ul>

      <div className="mt-8 p-4 border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20">
         <h4 className="font-bold text-yellow-800 dark:text-yellow-200">Alerting</h4>
         <p className="text-sm text-yellow-800 dark:text-yellow-200">
           Set up budget alerts at 50%, 80%, and 100% of forecast. Don't wait until the invoice arrives to know you overspent.
         </p>
      </div>
    </SimplePage>
  );
};

export default Forecasting;