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
            "Generative AI Leader (Google Cloud)",
            "Cloud Digital Leader (Google Cloud)",
            "Microsoft Certified: Azure AI Fundamentals",
            "Microsoft Certified: Azure Data Fundamentals",
            "Microsoft Certified: Azure Fundamentals",
            "Microsoft Certified: Security, Compliance, and Identity",
            "FOCP: FinOps Certified Practitioner",
            "Professional Scrum Master™ I (PSM I)",
            "Professional Scrum Product Owner™ I (PSPO I)",
            "Certified Scrum@Scale Practitioner",
            "Certified SAFe® 5 Agilist",
            "IBM Blockchain Foundation Developer",
            "Oracle Cloud Infrastructure Foundations 2020 Certified Associate",
            "COBIT® 2019 Foundation Certificate"
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