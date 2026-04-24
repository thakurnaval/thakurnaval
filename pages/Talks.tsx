import React from 'react';
import { Link } from 'react-router-dom';
import { Mic2, Download, ExternalLink, MapPin, Calendar } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { RECENT_TALKS, SPEAKING_APPEARANCES, PROFILE_IMAGE_URL } from '../constants';

const Talks: React.FC = () => {
  const handleDownloadKit = () => {
    // Construct the Speaker Kit content dynamically
    const bio = `
# Naval Thakur - Speaker Kit

## Short Bio
Naval Thakur is a seasoned technologist and transformation leader with over 18 years of experience helping enterprises scale their software delivery and operations. He specializes in DevSecOps, FinOps, and GenAI.

## Social Links
- LinkedIn: https://www.linkedin.com/in/navalthakur
- Twitter/X: https://x.com/nthakur_dot_com
- GitHub: https://github.com/thakurnaval
- Website: https://nthakur.com

## Signature Talks & Topics
${RECENT_TALKS.concat([
  {
    title: "Cultural Transformation in DevOps",
    description: "Moving beyond tools to address the human factor in technical change.",
    tags: ["Culture", "Management"],
    audience: "Leaders, HR",
    duration: "45 min"
  },
  {
    title: "Zero Trust Security for Cloud Native",
    description: "Implementing strict identity and network policies in K8s environments.",
    tags: ["SecOps", "Kubernetes"],
    audience: "Security Engineers",
    duration: "50 min"
  }
]).map(talk => `
### ${talk.title}
- **Abstract:** ${talk.description}
- **Audience:** ${talk.audience}
- **Duration:** ${talk.duration}
- **Tags:** ${talk.tags.join(', ')}
`).join('\n')}

## Contact
Email: contact@nthakur.com
    `;

    // Create a Blob and trigger download
    const blob = new Blob([bio], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Naval_Thakur_Speaker_Kit.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEO 
        title="Talks & Webinars | Naval Thakur"
        description="Keynote speaker on DevOps culture, Cloud Native Security, and FinOps strategies. Watch recent talks and download speaker kit."
      />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Talks & Webinars</h1>
          <p className="text-xl text-slate-100 max-w-2xl">
            Keynotes, workshops, and technical deep-dives for conferences and corporate events.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="mb-12">
               <h2 className="text-2xl font-bold text-primary dark:text-white mb-6 flex items-center">
                 <Mic2 className="mr-3 text-secondary-dark dark:text-secondary" /> Speaking Topics
               </h2>
                <div className="space-y-6">
                  {RECENT_TALKS.map((talk, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                      <div className="flex flex-wrap gap-2 mb-3">
                         {talk.tags.map(tag => (
                           <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded uppercase tracking-wider">{tag}</span>
                         ))}
                      </div>
                      <h3 className="text-xl font-bold text-primary dark:text-white mb-2">{talk.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4">{talk.description}</p>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap text-sm text-slate-500 dark:text-slate-400 gap-4">
                          <span><strong>Audience:</strong> {talk.audience}</span>
                          <span><strong>Duration:</strong> {talk.duration}</span>
                        </div>
                        {talk.link && (
                          <Link 
                            to={talk.link} 
                            className="text-secondary-dark dark:text-secondary font-bold text-sm hover:underline flex items-center"
                          >
                            Read Article &rarr;
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
            </div>

            {/* Past appearances */}
            <div>
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-6 flex items-center">
                <Calendar className="mr-3 text-secondary-dark dark:text-secondary" /> Past Appearances
              </h2>
              <div className="space-y-3">
                {SPEAKING_APPEARANCES.map((appearance, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                    {/* Event photo — full width banner when present */}
                    {appearance.photoUrl && (
                      <div className="h-36 overflow-hidden">
                        <img
                          src={appearance.photoUrl}
                          alt={`${appearance.event} — ${appearance.topic}`}
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-5 flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded">
                            {appearance.type}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">{appearance.year}</span>
                        </div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">{appearance.event}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{appearance.topic}</p>
                        <div className="flex items-center text-xs text-slate-400 mt-1">
                          <MapPin size={11} className="mr-1 shrink-0" /> {appearance.location}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        {appearance.flyerUrl && (
                          <a
                            href={appearance.flyerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-secondary transition-colors"
                            aria-label="View event flier"
                            title="View event flier"
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                        {appearance.recordingUrl && (
                          <a
                            href={appearance.recordingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary-dark dark:text-secondary hover:text-secondary/80"
                            aria-label="Watch recording"
                            title="Watch recording"
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
             <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 sticky top-24">
               <div className="w-24 h-24 mx-auto bg-slate-200 dark:bg-slate-700 rounded-full mb-4 overflow-hidden">
                 <img 
                   src={PROFILE_IMAGE_URL}
                   alt="Speaker Profile" 
                   className="w-full h-full object-cover object-top" 
                   width="100"
                   height="100"
                 />
               </div>
               <h3 className="text-xl font-bold text-center text-primary dark:text-white mb-2">Speaker Bio</h3>
               <p className="text-sm text-center text-slate-600 dark:text-slate-400 mb-6">
                 Naval is an engaging speaker who translates complex technical concepts into actionable business strategies.
               </p>
               
               <button 
                onClick={handleDownloadKit}
                className="w-full flex items-center justify-center py-2 border border-slate-300 dark:border-slate-600 rounded text-slate-700 dark:text-slate-300 font-medium hover:bg-white dark:hover:bg-slate-700 hover:text-primary dark:hover:text-white transition-colors mb-4"
               >
                 <Download size={16} className="mr-2" /> Download Speaker Kit
               </button>
               
               <div className="text-center">
                 <p className="text-xs text-slate-400 uppercase tracking-wide font-bold mb-2">Book for your event</p>
                 <Link to="/contact?topic=Speaking Engagement" className="block w-full py-3 bg-secondary text-primary font-bold rounded hover:bg-secondary-hover transition-colors">
                   Contact Naval
                 </Link>
               </div>
             </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Talks;