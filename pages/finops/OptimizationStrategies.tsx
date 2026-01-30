import React from 'react';
import SimplePage from '../../components/SimplePage';

const OptimizationStrategies: React.FC = () => {
  return (
    <SimplePage 
      title="Optimization Strategies" 
      subtitle="Reducing waste and improving rate efficiency."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
           <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Usage Optimization</h3>
           <p className="text-sm text-slate-500 mb-4">Eliminating waste (Turning off the lights).</p>
           <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
             <li><strong>Rightsizing:</strong> Moving from `c5.2xlarge` to `c5.xlarge` if CPU utilization is low.</li>
             <li><strong>Zombie Resources:</strong> Deleting unattached EBS volumes, idle Load Balancers, and old Snapshots.</li>
             <li><strong>Scheduling:</strong> Turning off Dev/Test environments on nights and weekends.</li>
             <li><strong>Storage Tiering:</strong> Moving infrequent data to S3 Glacier/Archive.</li>
           </ul>
        </div>

        <div>
           <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Rate Optimization</h3>
           <p className="text-sm text-slate-500 mb-4">Paying less for what you use.</p>
           <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
             <li><strong>Reserved Instances (RIs):</strong> 1-3 year commitment for deep discounts.</li>
             <li><strong>Savings Plans:</strong> Flexible commitment to spend $X/hour.</li>
             <li><strong>Spot Instances:</strong> Bidding on spare capacity for fault-tolerant workloads (up to 90% off).</li>
             <li><strong>Enterprise Agreements:</strong> Negotiated discounts with the cloud provider (EDP).</li>
           </ul>
        </div>
      </div>
    </SimplePage>
  );
};

export default OptimizationStrategies;