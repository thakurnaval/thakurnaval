import React from 'react';
import { ExternalLink, Award } from 'lucide-react';
import Section from '../../components/Section';
import SEO from '../../components/SEO';

interface Cert {
  name: string;
  issuer: string;
  year: string;
  badge: string | null;
  credlyUrl?: string; // add Credly badge URL here when available
}

interface CertGroup {
  category: string;
  certs: Cert[];
}

const CERT_GROUPS: CertGroup[] = [
  {
    category: 'Microsoft',
    certs: [
      { name: 'DevOps Engineer Expert (AZ-400)', issuer: 'Microsoft', year: 'Nov 2019', badge: '/assets/img/gallery/az400.png', credlyUrl: 'https://www.youracclaim.com/users/naval-thakur/badges' },
      { name: 'Azure Fundamentals (AZ-900)', issuer: 'Microsoft', year: 'Feb 2020', badge: '/assets/img/gallery/az900.png' },
      { name: 'Azure AI Fundamentals', issuer: 'Microsoft', year: 'Jun 2022', badge: '/assets/img/gallery/azure-ai-fundamentals-600x600-1.png' },
      { name: 'Azure Data Fundamentals', issuer: 'Microsoft', year: 'Jun 2022', badge: '/assets/img/gallery/azure-data-fundamentals-600x600-1.png' },
      { name: 'Security, Compliance & Identity Fundamentals', issuer: 'Microsoft', year: 'Jun 2022', badge: '/assets/img/gallery/security-compliance-and-identity-fundamentals-600x600-1.png' },
      { name: 'MCP — 70-496: Administering Team Foundation Server', issuer: 'Microsoft', year: '2015', badge: null, credlyUrl: 'https://www.youracclaim.com/users/naval-thakur/badges' },
      { name: 'MCP — 70-497: Software Testing with Visual Studio', issuer: 'Microsoft', year: '2015', badge: null, credlyUrl: 'https://www.youracclaim.com/users/naval-thakur/badges' },
    ],
  },
  {
    category: 'Google Cloud',
    certs: [
      { name: 'Generative AI Leader', issuer: 'Google Cloud', year: 'Expires Nov 2028', badge: null },
      { name: 'Cloud Digital Leader', issuer: 'Google Cloud', year: 'Expires Feb 2027', badge: '/assets/img/gallery/GCP-CDL.png' },
      { name: 'Associate Cloud Engineer', issuer: 'Google Cloud', year: 'Expired Oct 2022', badge: '/assets/img/gallery/GCP-ACE.png', credlyUrl: 'https://www.credential.net/825411d0-b8ad-44ce-8783-e0571a75839f' },
    ],
  },
  {
    category: 'FinOps',
    certs: [
      { name: 'FinOps Certified Practitioner (FOCP)', issuer: 'FinOps Foundation / Linux Foundation', year: 'Nov 2022', badge: '/assets/img/gallery/finops-logo-square-300x300-1.png' },
    ],
  },
  {
    category: 'Scrum & Agile',
    certs: [
      { name: 'Professional Scrum Master™ I (PSM I)', issuer: 'Scrum.org', year: 'Nov 2018', badge: '/assets/img/gallery/psm-1.png', credlyUrl: 'https://www.scrum.org/user/422413' },
      { name: 'Professional Scrum Product Owner™ I (PSPO I)', issuer: 'Scrum.org', year: 'Jul 2019', badge: '/assets/img/gallery/pspo-1.png', credlyUrl: 'https://www.scrum.org/user/422413' },
      { name: 'Certified Scrum@Scale Practitioner', issuer: 'Scrum Alliance / Scrum@Scale', year: 'Apr 2019', badge: '/assets/img/gallery/Scrum-at-scale-prac.png', credlyUrl: 'https://www.scrumatscale.com/certificate-lookup/' },
      { name: 'Certified SAFe® 5 Agilist', issuer: 'Scaled Agile Inc.', year: 'Expired Jan 2022', badge: '/assets/img/gallery/cert_mark_SA_badge_large_300px.png' },
    ],
  },
  {
    category: 'Blockchain',
    certs: [
      { name: 'IBM Blockchain Foundation Developer', issuer: 'IBM', year: 'Dec 2017', badge: '/assets/img/gallery/Blockchain_Developer_Foundation.png', credlyUrl: 'https://www.youracclaim.com/users/naval-thakur/badges' },
      { name: 'IBM Blockchain Essentials', issuer: 'IBM', year: 'Dec 2017', badge: '/assets/img/gallery/Blockchain_Essentials.png', credlyUrl: 'https://www.youracclaim.com/users/naval-thakur/badges' },
    ],
  },
  {
    category: 'Cloud Infrastructure',
    certs: [
      { name: 'Oracle Cloud Infrastructure Foundations Associate', issuer: 'Oracle', year: 'Expired Jan 2022', badge: '/assets/img/gallery/03_Oracle_Cloud_Infrastructure_Foundations_Associate.png' },
    ],
  },
  {
    category: 'Governance & ITSM',
    certs: [
      { name: 'COBIT® 2019 Foundation Certificate', issuer: 'ISACA', year: 'Nov 2019', badge: '/assets/img/gallery/ISACA_COBIT.png', credlyUrl: 'https://www.youracclaim.com/users/naval-thakur/badges' },
      { name: 'ITIL v3 Foundation', issuer: 'AXELOS / EXIN-ISEB', year: '2009', badge: '/assets/img/gallery/itilv3.jpg' },
    ],
  },
  {
    category: 'Corporate Training & Curricula',
    certs: [
      { name: 'Project Manager Curriculum', issuer: 'Wipro', year: '2012', badge: null },
      { name: 'Six Sigma Green Belt Curriculum', issuer: 'Genpact', year: '2016', badge: null },
      { name: 'Lean Methodologies', issuer: 'Genpact', year: '2016', badge: null },
      { name: 'SOX Compliance', issuer: 'Genpact', year: '2016', badge: null },
    ],
  },
];

const CertCard: React.FC<{ cert: Cert }> = ({ cert }) => (
  <div className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex flex-col items-center text-center hover:border-secondary hover:shadow-md transition-all">
    <div className="w-20 h-20 mb-4 flex items-center justify-center">
      {cert.badge ? (
        <img
          src={cert.badge}
          alt={`${cert.name} badge`}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center">
          <Award className="w-10 h-10 text-secondary-dark dark:text-secondary" />
        </div>
      )}
    </div>
    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 leading-tight">{cert.name}</h3>
    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{cert.issuer}</p>
    {cert.year && <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">{cert.year}</p>}
    {cert.credlyUrl ? (
      <a
        href={cert.credlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs font-semibold text-secondary-dark dark:text-secondary hover:text-secondary/80 transition-colors"
      >
        Verify Certificate <ExternalLink size={11} />
      </a>
    ) : (
      <span className="text-xs text-slate-300 dark:text-slate-600 italic">Verification pending</span>
    )}
  </div>
);

const Certifications: React.FC = () => {
  return (
    <>
      <SEO
        title="Certifications | Naval Thakur"
        description="Naval Thakur's professional certifications across Microsoft Azure, Google Cloud, FinOps, Scrum, SAFe, IBM Blockchain, Oracle, and ISACA COBIT."
      />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Certifications</h1>
          <p className="text-xl text-slate-100 max-w-2xl">
            Verified credentials across cloud, FinOps, agile, security, and governance. Credly verification links will be added as badges are published.
          </p>
        </div>
      </div>

      <Section>
        <div className="space-y-14">
          {CERT_GROUPS.map((group) => (
            <div key={group.category}>
              <h2 className="text-lg font-bold text-primary dark:text-secondary uppercase tracking-widest mb-6 border-b border-slate-200 dark:border-slate-700 pb-3">
                {group.category}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {group.certs.map((cert) => (
                  <CertCard key={cert.name} cert={cert} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default Certifications;
