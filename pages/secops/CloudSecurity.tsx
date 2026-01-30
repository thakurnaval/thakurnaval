import React from 'react';
import SimplePage from '../../components/SimplePage';
import { Cloud, Lock, UserCheck } from 'lucide-react';

const CloudSecurity: React.FC = () => {
  return (
    <SimplePage 
      title="Cloud Security" 
      subtitle="Securing infrastructure, data, and access in public cloud environments."
    >
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Shared Responsibility Model</h3>
        <p className="text-slate-700 dark:text-slate-300 text-sm">
          The cloud provider is responsible for security <strong>of</strong> the cloud (hardware, physical network). You are responsible for security <strong>in</strong> the cloud (data, OS, firewall config).
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start">
           <UserCheck className="w-6 h-6 text-secondary mr-4 flex-shrink-0" />
           <div>
             <h4 className="font-bold text-primary dark:text-white">Identity & Access Management (IAM)</h4>
             <p className="text-slate-600 dark:text-slate-400">Granular permissions, MFA enforcement, and separating duties to prevent unauthorized access.</p>
           </div>
        </div>
        <div className="flex items-start">
           <Cloud className="w-6 h-6 text-secondary mr-4 flex-shrink-0" />
           <div>
             <h4 className="font-bold text-primary dark:text-white">Network Security</h4>
             <p className="text-slate-600 dark:text-slate-400">VPCs, Subnets, Security Groups, and WAF (Web Application Firewalls) to control traffic flow.</p>
           </div>
        </div>
        <div className="flex items-start">
           <Lock className="w-6 h-6 text-secondary mr-4 flex-shrink-0" />
           <div>
             <h4 className="font-bold text-primary dark:text-white">Data Protection</h4>
             <p className="text-slate-600 dark:text-slate-400">Encryption at rest (KMS) and in transit (TLS). Tokenization of sensitive PII data.</p>
           </div>
        </div>
      </div>
    </SimplePage>
  );
};

export default CloudSecurity;