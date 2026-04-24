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

// SAMPLE testimonials — replace each quote, name, title, company, and relationship
// with the real words from a LinkedIn recommendation or direct outreach.
// Aim for: one C-suite/senior peer, one direct report, one mentee.
const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Naval has a rare ability to make complex cloud architecture feel approachable. During our FinOps transformation, he saved us over $600K in a single migration while keeping the whole team aligned. If you need someone who bridges C-suite strategy and engineering execution, Naval is that person.",
    name: "Prashant Jain",
    title: "VP Engineering",
    company: "Sapient Corporation",
    relationship: "Worked together at Sapient Corporation",
    linkedinUrl: undefined,
  },
  {
    quote: "Working under Naval's leadership was a turning point in my career. He doesn't just delegate — he coaches. Every architecture discussion came with context and reasoning that made me a better engineer. I left his team with a DevSecOps mindset I still use every day.",
    name: "Tushar Chhabra",
    title: "Senior DevOps Engineer",
    company: "Genpact",
    relationship: "Reported to Naval at Genpact",
    linkedinUrl: undefined,
  },
  {
    quote: "I came to Naval's mentoring session unsure whether to pursue DevOps or cloud architecture. After two sessions I had a clear 6-month roadmap — and three months later I landed a Cloud Engineer role. His guidance was practical, not generic. He knew exactly where I needed to focus.",
    name: "Harshit Mishra",
    title: "Cloud Engineer",
    company: "Wipro",
    relationship: "Mentee",
    linkedinUrl: undefined,
  },
];

const Testimonials: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {TESTIMONIALS.map((t, idx) => (
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
              <p className="text-xs text-secondary-dark dark:text-secondary mt-1">{t.relationship}</p>
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
