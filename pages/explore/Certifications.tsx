import React from 'react';
import SimplePage from '../../components/SimplePage';
import { Award } from 'lucide-react';

const Certifications: React.FC = () => {
  return (
    <SimplePage 
      title="Certifications & Roadmaps" 
      subtitle="Guides on achieving key industry credentials."
    >
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {[
           "AWS Certified Solutions Architect Professional",
           "Certified Kubernetes Administrator (CKA)",
           "FinOps Certified Practitioner",
           "Google Cloud Professional Architect",
           "HashiCorp Terraform Associate",
           "Certified Information Systems Security Professional (CISSP)"
         ].map((cert, i) => (
           <div key={i} className="flex items-center p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
             <Award className="w-6 h-6 text-secondary mr-3" />
             <span className="font-medium text-slate-700 dark:text-slate-200">{cert}</span>
           </div>
         ))}
       </div>
    </SimplePage>
  );
};

export default Certifications;