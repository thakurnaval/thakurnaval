import React from 'react';
import SimplePage from '../../components/SimplePage';
import { Box, Layers, ShieldCheck } from 'lucide-react';

const ContainerSecurity: React.FC = () => {
  return (
    <SimplePage 
      title="Container Security & Orchestration" 
      subtitle="Securing Docker and Kubernetes environments throughout their lifecycle."
    >
      <h3 className="text-2xl font-bold text-primary dark:text-white mb-6">The Lifecycle</h3>
      
      <div className="space-y-8">
        <div className="flex items-start">
           <Box className="w-8 h-8 text-secondary mr-4 flex-shrink-0" />
           <div>
             <h4 className="text-lg font-bold text-primary dark:text-white">Build: Image Scanning</h4>
             <p className="text-slate-600 dark:text-slate-400">
               Scanning base images and layers for CVEs. Using minimal base images (Distroless, Alpine) to reduce attack surface.
             </p>
           </div>
        </div>

        <div className="flex items-start">
           <Layers className="w-8 h-8 text-secondary mr-4 flex-shrink-0" />
           <div>
             <h4 className="text-lg font-bold text-primary dark:text-white">Deploy: Admission Controllers</h4>
             <p className="text-slate-600 dark:text-slate-400">
               Using Kubernetes Admission Controllers (e.g., OPA Gatekeeper, Kyverno) to prevent insecure workloads from being deployed (e.g., preventing root users).
             </p>
           </div>
        </div>

        <div className="flex items-start">
           <ShieldCheck className="w-8 h-8 text-secondary mr-4 flex-shrink-0" />
           <div>
             <h4 className="text-lg font-bold text-primary dark:text-white">Runtime: Threat Detection</h4>
             <p className="text-slate-600 dark:text-slate-400">
               Monitoring system calls and process activity in containers to detect anomalies like shell spawning or file system modification (Tools: Falco).
             </p>
           </div>
        </div>
      </div>
    </SimplePage>
  );
};

export default ContainerSecurity;