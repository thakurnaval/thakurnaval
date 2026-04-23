import React from 'react';
import { Link } from 'react-router-dom';
import { Mic2, Users, Briefcase, CheckCircle2, ArrowRight, GraduationCap, Clock, Building2, Globe } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import NewsletterSignup from '../components/NewsletterSignup';

interface Offer {
  icon: React.ElementType;
  tag: string;
  title: string;
  tagline: string;
  description: string;
  includes: string[];
  formats: string[];
  cta: string;
  topic: string;
  accent: string;
}

const OFFERS: Offer[] = [
  {
    icon: Mic2,
    tag: 'Speaking',
    title: 'Conference & Keynote Speaking',
    tagline: 'For conference organisers, community events, and corporate all-hands.',
    description:
      'Naval delivers talks that translate complex cloud operations topics into strategic narratives your audience can act on. Every session is practitioner-first — real lessons from real transformations, not vendor slides.',
    includes: [
      'Customised talk abstract and slide deck',
      'Pre-event briefing call with the organiser',
      'Q&A session (in-person or virtual)',
      'Downloadable speaker kit (bio, headshot, technical requirements)',
      'Follow-up resource pack for attendees',
    ],
    formats: ['Keynote (30–60 min)', 'Panel discussion', 'Fireside chat', 'Virtual webinar'],
    cta: 'Enquire About Speaking',
    topic: 'Speaking Engagement',
    accent: 'blue',
  },
  {
    icon: Users,
    tag: 'Workshop',
    title: 'Corporate Workshops & Training',
    tagline: 'For engineering teams, DevOps guilds, and leadership cohorts.',
    description:
      'Hands-on, half or full-day sessions designed around your team\'s actual stack and maturity level. Naval\'s workshops use the CognitiveOps Maturity Model as a shared diagnostic — teams leave with a concrete action plan, not just slides.',
    includes: [
      'Pre-workshop maturity assessment (team survey)',
      'Custom session design based on your stack and goals',
      'Hands-on labs or working sessions',
      'Printed or digital takeaway workbook',
      'Post-workshop summary and 30-day action plan',
      '2-week follow-up check-in call included',
    ],
    formats: ['Half-day (4h)', 'Full-day (8h)', 'Multi-day bootcamp', 'Remote or on-site'],
    cta: 'Book a Workshop',
    topic: 'Workshop / Training',
    accent: 'teal',
  },
  {
    icon: Briefcase,
    tag: 'Advisory',
    title: 'Fractional Advisory & Consulting',
    tagline: 'For CTOs, Engineering Directors, and transformation leads.',
    description:
      'A structured advisory engagement where Naval works alongside your leadership team to design, pressure-test, and accelerate a DevOps, FinOps, or GenAI transformation. Ideal for organisations that need senior expertise without a full-time hire.',
    includes: [
      'Current-state architecture and process review',
      'CognitiveOps Maturity Assessment (full team)',
      'Transformation roadmap with phased milestones',
      'Bi-weekly advisory calls (async updates between calls)',
      'Vendor and tooling evaluation support',
      'Access to Naval\'s network of specialists if needed',
    ],
    formats: ['3-month engagement', '6-month engagement', 'Project-based scope', 'Retainer (ongoing)'],
    cta: 'Start a Conversation',
    topic: 'Consulting',
    accent: 'purple',
  },
];

const FREE_OFFERS = [
  {
    icon: GraduationCap,
    title: 'Free Mentoring',
    desc: '1-on-1 career guidance for engineers transitioning to cloud, DevOps, or leadership roles. Limited slots each month.',
    cta: 'Request Mentoring',
    topic: 'Mentorship',
  },
  {
    icon: Clock,
    title: 'Resume Review',
    desc: 'Constructive feedback on your CV to highlight impact, skills, and readiness for the role you want.',
    cta: 'Submit Your Resume',
    topic: 'Resume Review',
  },
];

const accentClasses: Record<string, { border: string; bg: string; badge: string }> = {
  blue:   { border: 'border-blue-200 dark:border-blue-800/40',   bg: 'bg-blue-50 dark:bg-blue-900/10',   badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  teal:   { border: 'border-teal-200 dark:border-teal-800/40',   bg: 'bg-teal-50 dark:bg-teal-900/10',   badge: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300' },
  purple: { border: 'border-purple-200 dark:border-purple-800/40', bg: 'bg-purple-50 dark:bg-purple-900/10', badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
};

const WorkWithMe: React.FC = () => {
  return (
    <>
      <SEO
        title="Work With Naval Thakur | Speaking, Workshops & Advisory"
        description="Engage Naval Thakur for keynote speaking, corporate DevOps/FinOps/GenAI workshops, or a fractional advisory engagement. Practitioner-first. Results-driven."
      />

      {/* Hero */}
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider mb-6">
            Engagements
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Work With Naval</h1>
          <p className="text-xl text-slate-200 max-w-2xl leading-relaxed">
            Three ways to bring Naval's 18+ years of enterprise cloud experience into your organisation — from a single keynote to a six-month transformation engagement.
          </p>
        </div>
      </div>

      {/* Availability signal */}
      <div className="bg-secondary/10 dark:bg-secondary/5 border-b border-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 max-w-4xl">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0"></span>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <strong>Currently accepting engagements for Q3 2026 onwards.</strong> For urgent requests, reach out directly at <a href="mailto:contact@nthakur.com" className="text-secondary hover:underline font-semibold">contact@nthakur.com</a>.
          </p>
        </div>
      </div>

      {/* Paid Offers */}
      <Section bg="white">
        <div className="max-w-5xl mx-auto space-y-10">
          {OFFERS.map(({ icon: Icon, tag, title, tagline, description, includes, formats, cta, topic, accent }) => {
            const cls = accentClasses[accent];
            return (
              <div key={tag} className={`rounded-2xl border ${cls.border} ${cls.bg} overflow-hidden`}>
                <div className="p-8 md:p-10">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm shrink-0">
                      <Icon className="w-7 h-7 text-primary dark:text-secondary" />
                    </div>
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded ${cls.badge}`}>{tag}</span>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{title}</h2>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{tagline}</p>
                    </div>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8">{description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">What's included</h3>
                      <ul className="space-y-2">
                        {includes.map(item => (
                          <li key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">Available formats</h3>
                      <ul className="space-y-2">
                        {formats.map(f => (
                          <li key={f} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0"></span>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6">
                        <Link
                          to={`/contact?topic=${encodeURIComponent(topic)}`}
                          className="inline-flex items-center px-6 py-3 bg-primary dark:bg-secondary text-white dark:text-primary font-bold rounded-lg hover:opacity-90 transition-opacity"
                        >
                          {cta} <ArrowRight size={16} className="ml-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Free tier */}
      <Section bg="gray">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-primary dark:text-secondary text-xs font-bold uppercase tracking-wider mb-3">
              Giving Back
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Free Community Offerings</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto">
              Naval sets aside limited slots each month for engineers and practitioners at any stage of their career.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FREE_OFFERS.map(({ icon: Icon, title, desc, cta, topic }) => (
              <div key={title} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 flex flex-col">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-primary dark:text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-grow">{desc}</p>
                <Link
                  to={`/contact?topic=${encodeURIComponent(topic)}`}
                  className="mt-6 inline-flex items-center text-sm font-bold text-secondary hover:underline"
                >
                  {cta} <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Trust signals */}
      <Section bg="white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-12">
            {[
              { icon: Building2, label: 'Clients include', value: 'Energy, Tech & Global Delivery firms' },
              { icon: Globe, label: 'Available', value: 'Remote globally · On-site India & travel' },
              { icon: Clock, label: 'Lead time', value: '4–6 weeks for workshops · 2 weeks for talks' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-100 dark:border-slate-800">
                <Icon className="w-6 h-6 text-secondary mx-auto mb-3" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{value}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Not sure which engagement fits? Start a conversation and we'll figure it out together.</p>
            <Link to="/contact" className="inline-flex items-center px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-slate-800 transition-colors">
              Get in Touch <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </Section>

      <Section bg="gray">
        <div className="max-w-4xl mx-auto">
          <NewsletterSignup />
        </div>
      </Section>
    </>
  );
};

export default WorkWithMe;
