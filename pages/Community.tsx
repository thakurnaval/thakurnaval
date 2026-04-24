import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap, FileText, MessageSquare, Users, Calendar, ArrowRight,
  CheckCircle2, Globe, Award, Heart
} from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import NewsletterSignup from '../components/NewsletterSignup';

const MENTORING_OFFERINGS = [
  {
    icon: GraduationCap,
    color: 'blue',
    title: 'Free 1-on-1 Mentoring',
    description:
      'Career path guidance for engineers looking to break into Cloud, DevOps, or engineering leadership. Sessions are 30–45 minutes via video call. Naval has helped engineers transition from on-prem ops to cloud-native roles, from individual contributor to architect, and from technical specialist to engineering manager.',
    goodFor: [
      'Engineers transitioning into Cloud / DevOps',
      'ICs targeting an architect or lead role',
      'Professionals preparing for FinOps or DevOps certifications',
      'Anyone feeling stuck and needing an outside perspective',
    ],
    cta: 'Request a Mentoring Slot',
    topic: 'Mentorship',
  },
  {
    icon: FileText,
    color: 'purple',
    title: 'Resume & LinkedIn Review',
    description:
      'A focused review of your CV and LinkedIn profile with written feedback. Naval looks at how you present your impact, whether your skills section matches current hiring signals, and how a hiring manager or recruiter in the cloud/DevOps space will read your profile.',
    goodFor: [
      'Developers writing their first DevOps or cloud CV',
      'Engineers applying for senior or staff roles',
      'Professionals returning to the market after a gap',
      'Anyone whose applications are not converting to interviews',
    ],
    cta: 'Submit for Review',
    topic: 'Resume Review',
  },
  {
    icon: MessageSquare,
    color: 'teal',
    title: 'Mock Interview Prep',
    description:
      'A simulated interview for System Design or Behavioural rounds, followed by structured written feedback on what to sharpen. Naval has been on both sides of the interview table for senior cloud and DevOps roles at enterprise organisations.',
    goodFor: [
      'Engineers preparing for senior / staff / principal interviews',
      'Candidates targeting FAANG or large enterprise cloud roles',
      'Professionals preparing for architecture-level system design rounds',
      'Anyone who wants an honest, senior-level read on their answers',
    ],
    cta: 'Schedule a Mock Interview',
    topic: 'Interview Prep',
  },
];

const PARTNER_COMMUNITIES = [
  {
    name: 'FinOps Foundation',
    description: 'The practitioner community advancing cloud financial management. Naval is an active community contributor.',
    url: 'https://www.finops.org',
    icon: Award,
  },
  {
    name: 'DevOps Institute',
    description: 'Professional community advancing the human side of DevOps — skills, culture, and continuous learning.',
    url: 'https://www.devopsinstitute.com',
    icon: Users,
  },
  {
    name: 'CNCF Community',
    description: 'The Cloud Native Computing Foundation — home of Kubernetes, Prometheus, and the open-source cloud-native ecosystem.',
    url: 'https://www.cncf.io/community',
    icon: Globe,
  },
];

const Community: React.FC = () => {
  return (
    <>
      <SEO
        title="Community & Free Mentoring | Naval Thakur"
        description="Free 1-on-1 mentoring, resume reviews, mock interviews, and monthly office hours from Naval Thakur — 18+ years of DevOps, FinOps, and cloud leadership."
      />

      {/* Hero */}
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider mb-4">
            Giving Back
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Community & Free Mentoring</h1>
          <p className="text-xl text-slate-100 max-w-2xl leading-relaxed">
            Most of what Naval knows came from generous people who shared their time. This is how he pays that forward.
          </p>
        </div>
      </div>

      {/* Opening statement */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto text-center">
          <Heart className="w-10 h-10 text-secondary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Access is free. The time is limited.
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Naval keeps a small number of free mentoring slots open each month for engineers at any career stage. There's no catch — just a genuine commitment to helping people grow faster than he did.
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            If you're navigating a career decision, preparing for a big interview, or just need an honest second opinion from someone who's been in the room — reach out.
          </p>
        </div>
      </Section>

      {/* 3 offerings */}
      <Section bg="gray">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">What's Available</h2>
          <p className="text-slate-600 dark:text-slate-400">Three ways to get support — all free, all practitioner-led.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {MENTORING_OFFERINGS.map((offer) => {
            const colorMap: Record<string, string> = {
              blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
              purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
              teal: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
            };
            return (
              <div
                key={offer.title}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 flex flex-col"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${colorMap[offer.color]}`}>
                  <offer.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{offer.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">{offer.description}</p>
                <div className="mb-6 flex-grow">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Good for</p>
                  <ul className="space-y-2">
                    {offer.goodFor.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle2 size={15} className="text-secondary mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to={`/contact?topic=${encodeURIComponent(offer.topic)}`}
                  className="inline-flex items-center justify-center w-full py-3 px-4 bg-primary dark:bg-slate-700 text-white font-semibold rounded-lg hover:bg-primary/90 dark:hover:bg-slate-600 transition-colors text-sm"
                >
                  {offer.cta} <ArrowRight size={15} className="ml-2" />
                </Link>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Monthly Office Hours */}
      <Section bg="white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-secondary/10 rounded-full blur-2xl" />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center shrink-0">
                <Calendar size={30} className="text-secondary" />
              </div>
              <div className="flex-grow">
                <div className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider mb-3">
                  Coming Soon
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Monthly Office Hours</h2>
                <p className="text-slate-100 leading-relaxed mb-4">
                  A monthly open Zoom session for the community — bring your questions on DevOps, FinOps, GenAI, career growth, or anything you're working through. No agenda, no slides. Just an honest conversation.
                </p>
                <p className="text-slate-300 text-sm mb-6">
                  Office hours will be announced exclusively through the CognitiveOps Brief newsletter. Subscribe below to be first in the room.
                </p>
                <Link
                  to="/contact?topic=Office Hours"
                  className="inline-flex items-center px-6 py-3 bg-secondary hover:bg-secondary-hover text-primary font-bold rounded-lg transition-colors text-sm"
                >
                  Register Interest <ArrowRight size={15} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Partner Communities */}
      <Section bg="gray">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Communities Naval Is Part Of</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Beyond this site, Naval contributes to several practitioner communities worth joining.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {PARTNER_COMMUNITIES.map((community) => (
            <a
              key={community.name}
              href={community.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 hover:border-primary dark:hover:border-secondary hover:shadow-md transition-all flex flex-col"
            >
              <div className="w-10 h-10 bg-primary/5 dark:bg-slate-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <community.icon size={20} className="text-primary dark:text-secondary" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                {community.name}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed flex-grow">{community.description}</p>
              <div className="mt-4 text-xs font-semibold text-primary dark:text-secondary flex items-center">
                Visit community <ArrowRight size={12} className="ml-1" />
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* Mentorship Alumni — placeholder for future testimonials */}
      <Section bg="white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-primary dark:text-secondary text-xs font-bold uppercase tracking-wider mb-4">
            Alumni Stories
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">What Mentees Say</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-10">
            [ Replace this section with real mentee testimonials once collected. Even 2–3 short outcomes — "landed at X", "got promoted to Y" — carry enormous weight here. ]
          </p>
          <Link
            to="/contact?topic=Mentorship"
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Apply for a Free Session <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </Section>

      {/* Newsletter */}
      <Section bg="gray">
        <NewsletterSignup />
      </Section>
    </>
  );
};

export default Community;
