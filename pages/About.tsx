import React, { useState } from 'react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { Award, Briefcase, Globe, Linkedin, Twitter, Github, Youtube, GraduationCap, Calendar, MapPin, Building2, ChevronDown, ChevronUp, Terminal, Layout, Users, Star, ChevronRight, CheckCircle2 } from 'lucide-react';
import { PROFILE_IMAGE_URL } from '../constants';

interface CollapsibleSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, icon: Icon, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
        aria-expanded={isOpen}
      >
        <h3 className="text-xl md:text-2xl font-bold text-primary dark:text-white flex items-center">
          <Icon className="mr-3 text-secondary shrink-0" /> {title}
        </h3>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-slate-400 shrink-0 ml-4" />
        ) : (
          <ChevronDown className="w-6 h-6 text-slate-400 shrink-0 ml-4" />
        )}
      </button>
      
      {isOpen && (
        <div className="p-6 md:p-8 border-t border-slate-200 dark:border-slate-700 animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};

const About: React.FC = () => {
  const education = [
    {
      school: "Management Development Institute (MDI)",
      degree: "MBA - Finance, Information Management (IT)",
      year: "2015 - 2017"
    },
    {
      school: "TERI University",
      degree: "PG Diploma, Renewable Energy",
      year: "2013 - 2015"
    },
    {
      school: "Landmark Education",
      degree: "Landmark Curriculum Graduate, Organizational Leadership",
      year: "2012 - 2013"
    },
    {
      school: "Maharshi Dayanand University",
      degree: "B.E, Computer Science & Engineering",
      year: "2002 - 2006"
    }
  ];

  const experience = [
    {
      company: "SLB",
      duration: "8 years 5 months (Total)",
      roles: [
        {
          title: "Practice Manager",
          date: "Dec 2024 - Present",
          location: "Pune, Maharashtra, India",
          desc: [
            "Establishing industry aligned best practices in the SDLC and DevOps areas.",
            "Evaluating and Maturing the DevOps best practices adhering to DORA, DOCA, and i3PM frameworks.",
            "Managing tools landscape and achieving cost leadership through tools rationalization."
          ]
        },
        {
          title: "Program Architect - IT Systems",
          date: "Jun 2023 - Jan 2025",
          location: "Pune, Maharashtra, India",
          desc: [
            "Accountable for Integrated Project, Program and Portfolio management systems including Planisware, Azure DevOps, GitHub Enterprise, and SonarQube.",
            "Enabling GenAI across all phases of DevOps lifecycle to achieve Cognitive DevSecOps."
          ]
        },
        {
          title: "Cloud Enablement Architect",
          date: "Jun 2021 - May 2023",
          location: "Pune, Maharashtra, India",
          desc: [
            "Consultant for Cloud Economics, Cloud CoE, Cost optimization and Capacity management.",
            "Product owner for Hosting Cost Model (COSMO) providing cost attribution/allocation.",
            "Led Hybrid Hosting Cost Optimization Initiatives including Reservations, commitments, and rightsizing."
          ]
        },
        {
          title: "Global Leader - Cloud Computing SIG",
          date: "Jan 2022 - Feb 2023",
          location: "Pune, Maharashtra, India",
          desc: [
            "Provided a forum for knowledge sharing on IaaS, PaaS, and SaaS across SLB.",
            "Organized webinars, workshops, published newsletters, and managed community channels."
          ]
        },
        {
          title: "Global Leader - Open Source SIG",
          date: "Jan 2021 - Dec 2021",
          location: "Pune",
          desc: [
            "Led community input into developing and adopting Open source standards.",
            "Managed community channels and moderated discussions to foster innovation."
          ]
        },
        {
          title: "DevOps Practice Lead",
          date: "Aug 2017 - May 2021",
          location: "Pune Area, India",
          desc: [
            "Driven DevOps transformations to Agile ways of working.",
            "Implemented strategies for Consolidation, obsolescence and modernization on Tools landscape.",
            "Enabling, empowering and scaling cross-functional, distributed teams.",
            "Modernized platform tools by decommissioning legacy Serena tools suite and 20+ servers."
          ]
        }
      ]
    },
    {
      company: "FinOps Foundation",
      duration: "2 years 7 months",
      roles: [
        {
          title: "FinOps Practitioner and Community Member",
          date: "Jul 2022 - Jan 2025",
          location: "Pune, Maharashtra, India",
          desc: [
            "Demonstrated working knowledge of Cloud Cost Optimization, Efficiency, and Financial Management.",
            "Executed Reserved Instance Purchasing, Rightsizing, Tagging Strategy, and Chargeback."
          ]
        }
      ]
    },
    {
      company: "GENPACT",
      duration: "2 years 1 month",
      roles: [
        {
          title: "TFS Admin and Project Manager",
          date: "Aug 2015 - Aug 2017",
          location: "Gurgaon, India",
          desc: [
            "Saved $600K by evangelising migration of existing incident management system to TFS.",
            "Performed role of Application Lifecycle Management architect.",
            "TFS Admin activities: Process template customization, Source code control, Build/Release management."
          ]
        }
      ]
    },
    {
      company: "Wipro",
      duration: "5 years",
      roles: [
        {
          title: "Project Lead",
          date: "Sep 2010 - Aug 2015",
          location: "Noida Area, India",
          desc: [
            "Managed Software configuration, Change and Release Management activities.",
            "Executed Source code administration (TFS, VSS, GIT, CVS) and Product installers packaging.",
            "Handled Project Management including Onsite-offshore coordination and stakeholder management."
          ]
        }
      ]
    },
    {
      company: "Vertex Data Science",
      duration: "2 years 9 months",
      roles: [
        {
          title: "Configuration Analyst",
          date: "Jan 2008 - Sep 2010",
          location: "",
          desc: [
            "End-to-end knowledge of Infrastructure migration and rehosting.",
            "Re-solutioning production systems architecture for High availability, fault tolerance, and load balancing.",
            "Monitoring utilizing Quest, PerfMon and SilkPerformer."
          ]
        }
      ]
    },
    {
      company: "Sapient UK",
      duration: "3 years 3 months",
      roles: [
        {
          title: "Infrastructure/Technology Associate",
          date: "Jan 2008 - Nov 2009",
          location: "",
          desc: [
            "Deployment and Implementation Activities for 'going-to-be' live environments.",
            "Monitoring, managing and tuning server/infrastructure performance.",
            "Project planning for HA, fault tolerance, and Disaster Recovery."
          ]
        },
        {
          title: "Associate Technology",
          date: "Sep 2006 - Dec 2007",
          location: "",
          desc: [
            "Web Application development using .NET technologies.",
            "Unit Testing, Integration Testing and Functional testing using Nunit and Testpartner.",
            "Maintained Continuous integration environments (Nant, Cruisecontrol.Net)."
          ]
        }
      ]
    }
  ];

  const certifications = [
    {
      category: "Cloud Certifications",
      items: [
        "Generative AI Leader Certification (Google Cloud, Expires Nov 25, 2028)",
        "Cloud Digital Leader Certification (Google Cloud, Expires Feb 13, 2027)",
        "Microsoft Certified: Azure AI Fundamentals (Microsoft, Jun 2022)",
        "Microsoft Certified: Azure Data Fundamentals (Microsoft, Jun 2022)",
        "Microsoft Certified: Azure Fundamentals (Microsoft, Feb 2020)",
        "Microsoft Certified: Security, Compliance, and Identity (Microsoft, Jun 2022)",
        "Associate Cloud Engineer Certification (Google Cloud, Expired Oct 21, 2022)",
        "AZ-400: Microsoft Azure DevOps Solutions (Microsoft, Nov 2019)"
      ]
    },
    {
      category: "FinOps",
      items: [
        "FOCP: FinOps Certified Practitioner (The Linux Foundation, Nov 2022)"
      ]
    },
    {
      category: "Scrum & Agile Leadership",
      items: [
        "Professional Scrum Master™ I (PSM I) (Scrum.org, Nov 2018)",
        "Professional Scrum Product Owner™ I (PSPO I) (Scrum.org, Jul 2019)",
        "Certified Scrum@Scale Practitioner (Scrum@Scale, Apr 2019)",
        "Certified SAFe® 5 Agilist (SAFe by Scaled Agile Inc., Expired Jan 12, 2022)"
      ]
    },
    {
      category: "Blockchain",
      items: [
        "IBM Blockchain Foundation Developer (IBM, Dec 2017)"
      ]
    },
    {
      category: "Infrastructure & Operations",
      items: [
        "Oracle Cloud Infrastructure Foundations 2020 Certified Associate (Oracle, Expired Jan 13, 2022)"
      ]
    },
    {
      category: "Business & Risk Management",
      items: [
        "COBIT® 2019 Foundation Certificate (ISACA, Dec 2019)",
        "Bloomberg Market Concepts (Bloomberg, Nov 2017)",
        "Six Sigma Green Belt (Genpact, Jul 2016)"
      ]
    },
    {
      category: "Legacy Professional Certifications",
      items: [
        "MCPS: Microsoft Certified Professional (Microsoft, Dec 2014)"
      ]
    }
  ];

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Naval Thakur",
    "url": "https://nthakur.com/about",
    "image": PROFILE_IMAGE_URL,
    "sameAs": [
      "https://www.linkedin.com/in/navalthakur",
      "https://x.com/nthakur_dot_com",
      "https://github.com/thakurnaval",
      "https://www.youtube.com/channel/UCNFBR2tvSzgZr481iyNaI7A"
    ],
    "jobTitle": "Practice Manager",
    "worksFor": {
      "@type": "Organization",
      "name": "SLB"
    },
    "description": "Technologist & Transformation Coach specializing in DevSecOps, FinOps, and GenAI with 18+ years of experience."
  };

  const getRoleIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('architect')) return Layout;
    if (t.includes('manager') || t.includes('lead') || t.includes('head')) return Users;
    if (t.includes('devops') || t.includes('engineer') || t.includes('developer')) return Terminal;
    if (t.includes('star') || t.includes('champion')) return Star;
    return Briefcase;
  };

  return (
    <>
      <SEO 
        title="About Naval Thakur | Technology Transformation Leader"
        description="Discover Naval Thakur's 18+ year journey in DevSecOps leadership, cloud architecture, and FinOps at global firms like SLB and Genpact."
        structuredData={personSchema}
      />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Naval</h1>
          <p className="text-xl text-slate-100 max-w-2xl">
             18+ Years in DevSecOps, CloudOps, and FinOps Leadership.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           {/* Sidebar */}
           <div className="lg:col-span-4">
             <div className="sticky top-24 space-y-8">
               {/* Profile Card */}
               <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden shrink-0">
                 <img 
                   src={PROFILE_IMAGE_URL}
                   alt="Naval Thakur - Technologist and DevOps Transformation Coach Profile Image" 
                   className="w-full aspect-square object-cover object-top" 
                 />
                 <div className="p-6">
                   <div className="flex gap-4 justify-center">
                      <a href="https://www.linkedin.com/in/navalthakur" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-700 dark:text-slate-300 hover:text-white hover:bg-[#0077b5] dark:hover:bg-[#0077b5] transition-colors" aria-label="LinkedIn">
                        <Linkedin size={20} />
                      </a>
                      <a href="https://x.com/nthakur_dot_com" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-700 dark:text-slate-300 hover:text-white hover:bg-black dark:hover:bg-black transition-colors" aria-label="X (Twitter)">
                        <Twitter size={20} />
                      </a>
                      <a href="https://github.com/thakurnaval" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-700 dark:text-slate-300 hover:text-white hover:bg-[#333] dark:hover:bg-[#333] transition-colors" aria-label="GitHub">
                        <Github size={20} />
                      </a>
                      <a href="https://www.youtube.com/channel/UCNFBR2tvSzgZr481iyNaI7A" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-700 dark:text-slate-300 hover:text-white hover:bg-[#FF0000] dark:hover:bg-[#FF0000] transition-colors" aria-label="YouTube">
                        <Youtube size={20} />
                      </a>
                   </div>
                 </div>
               </div>

               {/* Key Stats / Quick Info */}
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center border border-slate-100 dark:border-slate-700">
                    <Globe className="w-6 h-6 mx-auto text-secondary mb-2" />
                    <span className="block text-2xl font-bold text-primary dark:text-white">18+</span>
                    <span className="text-xs text-slate-500">Years Exp</span>
                 </div>
                 <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center border border-slate-100 dark:border-slate-700">
                    <Briefcase className="w-6 h-6 mx-auto text-secondary mb-2" />
                    <span className="block text-2xl font-bold text-primary dark:text-white">35+</span>
                    <span className="text-xs text-slate-500">Projects</span>
                 </div>
               </div>
             </div>
           </div>

           {/* Main Content */}
           <div className="lg:col-span-8">
             
             {/* Bio & Value Prop */}
             <div className="mb-12">
               <h2 className="text-3xl font-bold text-primary dark:text-white mb-6">Professional Bio</h2>
               <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                 Naval Thakur is a seasoned technologist and transformation leader with over 18 years of experience helping enterprises scale their software delivery and operations. He has successfully led large-scale DevSecOps initiatives, cloud migrations, and FinOps implementations in complex, regulated environments across Energy, Technology, and Global Delivery sectors.
               </p>
               
               <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-xl border-l-4 border-secondary shadow-sm">
                 <h3 className="text-lg font-bold text-primary dark:text-white mb-3">Value Proposition</h3>
                 <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed">
                   "Empowering enterprises with over 18 years of experience leading DevSecOps, FinOps, System Architecture, SRE, and AIOps initiatives across complex, cloud-native environments. Having guided multi-disciplinary teams and multi-million-dollar cloud portfolios, the focus is on aligning technical delivery with measurable business value. Through secure-by-design architectures, cost-optimized cloud operations, and resilient delivery pipelines, this work has helped organizations reduce risk, improve reliability, and significantly lower operational and cloud spend."
                 </p>
               </div>
             </div>

             {/* Work Experience Collapsible */}
             <CollapsibleSection title="Work Experience" icon={Briefcase}>
               <div className="space-y-12">
                 {experience.map((companyData, idx) => (
                   <div key={idx} className="relative border-l-2 border-slate-200 dark:border-slate-700 pl-8 ml-3 md:ml-4 pb-2">
                      <span className="absolute -left-[21px] top-0 flex items-center justify-center w-10 h-10 bg-white dark:bg-slate-900 border-2 border-secondary rounded-full shadow-sm z-10">
                        <Building2 size={20} className="text-secondary" />
                      </span>
                      
                      <div className="mb-8">
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                          {companyData.company}
                        </h4>
                        <span className="inline-block px-3 py-1 mt-2 text-xs font-bold text-primary dark:text-white bg-secondary/20 rounded-full">
                          {companyData.duration}
                        </span>
                      </div>

                      <div className="space-y-6">
                        {companyData.roles.map((role, rIdx) => {
                          const RoleIcon = getRoleIcon(role.title);
                          const isCurrent = role.date.includes('Present');
                          
                          return (
                            <div 
                              key={rIdx} 
                              className={`group relative bg-white dark:bg-slate-900 rounded-lg p-6 border transition-all duration-300 ${
                                isCurrent 
                                  ? 'border-secondary shadow-md dark:shadow-secondary/5' 
                                  : 'border-slate-200 dark:border-slate-800 hover:border-secondary/30'
                              }`}
                            >
                               <div className="absolute top-8 -left-[42px] w-6 h-[2px] bg-slate-200 dark:bg-slate-700 hidden md:block group-hover:bg-secondary transition-colors"></div>

                               <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                                 <div className="flex items-start gap-3">
                                   <div className={`p-2 rounded-lg shrink-0 mt-1 ${isCurrent ? 'bg-secondary/10 text-secondary' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                                      <RoleIcon size={20} />
                                   </div>
                                   <div>
                                     <h5 className="text-lg font-bold text-slate-900 dark:text-white flex items-center flex-wrap gap-2">
                                       {role.title}
                                       {isCurrent && (
                                         <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                                           Current
                                         </span>
                                       )}
                                     </h5>
                                     {role.location && (
                                       <div className="flex items-center text-xs text-slate-500 mt-1">
                                         <MapPin size={12} className="mr-1" /> {role.location}
                                       </div>
                                     )}
                                   </div>
                                 </div>
                                 <div className="flex items-center text-sm font-mono text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded border border-slate-200 dark:border-slate-700 shrink-0 self-start ml-11 md:ml-0">
                                   <Calendar size={14} className="mr-2" /> {role.date}
                                 </div>
                               </div>
                               <ul className="space-y-2 ml-11">
                                 {role.desc.map((point, pIdx) => (
                                   <li key={pIdx} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex items-start">
                                     <span className="mt-1.5 mr-2.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
                                     <span>{point}</span>
                                   </li>
                                 ))}
                               </ul>
                            </div>
                          );
                        })}
                      </div>
                   </div>
                 ))}
               </div>
             </CollapsibleSection>

             {/* Education Collapsible */}
             <CollapsibleSection title="Education" icon={GraduationCap}>
                 <div className="space-y-6">
                   {education.map((edu, idx) => (
                     <div key={idx} className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-700">
                        <span className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-secondary"></span>
                       <h4 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-2">{edu.school}</h4>
                       <p className="text-base text-slate-600 dark:text-slate-400 mb-2">{edu.degree}</p>
                       <p className="text-sm font-mono text-slate-500 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 inline-block px-2 py-1 rounded">{edu.year}</p>
                     </div>
                   ))}
                 </div>
             </CollapsibleSection>

             {/* Certifications Collapsible */}
             <CollapsibleSection title="Certifications & Recognition" icon={Award}>
               <div className="grid grid-cols-1 gap-8">
                 {certifications.map((group, idx) => (
                   <div key={idx}>
                     <h4 className="text-xs font-bold text-primary dark:text-secondary uppercase tracking-widest mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">
                       {group.category}
                     </h4>
                     <ul className="space-y-3">
                       {group.items.map((cert, i) => (
                         <li key={i} className="flex items-start text-sm text-slate-700 dark:text-slate-300 group">
                           <CheckCircle2 className="w-4 h-4 text-slate-400 group-hover:text-secondary mr-2 mt-0.5 flex-shrink-0 transition-colors" />
                           <span className="leading-relaxed">{cert}</span>
                         </li>
                       ))}
                     </ul>
                   </div>
                 ))}
               </div>
             </CollapsibleSection>

           </div>
        </div>
      </Section>
    </>
  );
};

export default About;