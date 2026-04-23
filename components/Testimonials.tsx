import React from 'react';
import { Quote, Linkedin } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  relationship: string;
  linkedinUrl?: string;
}

// Replace these placeholders with real testimonials collected from LinkedIn recommendations
// or direct outreach to former colleagues, direct reports, and mentees.
// Aim for at least one C-suite/peer, one team member, and one mentee.
const TESTIMONIALS: Testimonial[] = [
  {
    quote: "[ Placeholder — add a real testimonial from a senior peer or C-suite colleague at SLB or Genpact. Ask for a LinkedIn recommendation and copy it here. ]",
    name: "Your Name Here",
    title: "CTO / VP Engineering",
    company: "Enterprise Org",
    relationship: "Worked together at SLB",
    linkedinUrl: undefined,
  },
  {
    quote: "[ Placeholder — add a real testimonial from a direct report or team member who experienced Naval's leadership first-hand. ]",
    name: "Your Name Here",
    title: "DevOps Engineer / Architect",
    company: "Enterprise Org",
    relationship: "Reported to Naval at SLB",
    linkedinUrl: undefined,
  },
  {
    quote: "[ Placeholder — add a real testimonial from someone Naval has mentored. Even one sentence about a career outcome carries enormous weight. ]",
    name: "Your Name Here",
    title: "Cloud Engineer",
    company: "Tech Company",
    relationship: "Mentee",
    linkedinUrl: undefined,
  },
];

const Testimonials: React.FC = () => {
  const hasRealTestimonials = TESTIMONIALS.some(t => !t.quote.startsWith('[ Placeholder'));

  if (!hasRealTestimonials) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {TESTIMONIALS.filter(t => !t.quote.startsWith('[ Placeholder')).map((t, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm p-8 flex flex-col"
        >
          <Quote className="w-8 h-8 text-secondary/40 mb-4 shrink-0" />
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic flex-grow">
            "{t.quote}"
          </p>
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700 flex items-start justify-between gap-3">
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm">{t.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.title}, {t.company}</p>
              <p className="text-xs text-secondary mt-1">{t.relationship}</p>
            </div>
            {t.linkedinUrl && (
              <a
                href={t.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-colors shrink-0"
                aria-label={`View ${t.name} on LinkedIn`}
              >
                <Linkedin size={16} />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export { TESTIMONIALS };
export default Testimonials;
