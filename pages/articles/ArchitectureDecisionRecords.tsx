
import React from 'react';
import { Link } from 'react-router-dom';
import SimplePage from '../../components/SimplePage';
import { MessageSquare, Sparkles } from 'lucide-react';

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Making Better Architecture Decisions, and Writing Them Down",
      "description": "A practical method for framing, comparing and recording architecture decisions, with a ready-to-use ADR template.",
      "author": {
        "@type": "Person",
        "name": "Naval Thakur",
        "url": "https://nthakur.com/about",
        "jobTitle": "Practice Manager, SLB"
      },
      "publisher": {
        "@type": "Person",
        "name": "Naval Thakur",
        "url": "https://nthakur.com"
      },
      "datePublished": "2026-11-24",
      "dateModified": "2026-11-24",
      "url": "https://nthakur.com/articles/architecture-decision-records",
      "image": "https://nthakur.com/assets/img/profile.jpg",
      "keywords": "architecture decision records, ADR, software architecture, technical decisions, one-way door decisions, pre-mortem, system design",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://nthakur.com/articles/architecture-decision-records"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://nthakur.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Articles",
          "item": "https://nthakur.com/articles"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Making Better Architecture Decisions, and Writing Them Down",
          "item": "https://nthakur.com/articles/architecture-decision-records"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is an Architecture Decision Record?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A short document that records an important architecture decision: the context, the options considered, the decision made and its consequences. It helps future team members understand why the system is built the way it is."
          }
        },
        {
          "@type": "Question",
          "name": "Which decisions need an ADR?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Decisions that are hard to reverse, affect several teams, or will be questioned later, such as choosing a database, splitting a service or adopting a new platform. Small, easily reversed choices usually don't need one."
          }
        },
        {
          "@type": "Question",
          "name": "Where should ADRs be stored?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In the repository alongside the code, usually in a docs/adr folder, so they are versioned, reviewed and easy to find."
          }
        },
        {
          "@type": "Question",
          "name": "How long should an ADR be?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "One to two pages. The goal is to capture the reasoning, not to write a full design document."
          }
        }
      ]
    }
  ]
};

const ArchitectureDecisionRecords: React.FC = () => {
  return (
    <SimplePage
      title="Making Better Architecture Decisions, and Writing Them Down"
      subtitle="A practical method for framing, comparing and recording architecture decisions, with a ready-to-use ADR template."
      structuredData={SCHEMA}
    >
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Why architecture decisions go wrong</h2>
          <p className="leading-relaxed">Most painful architecture problems were not caused by a lack of skill. They were caused by decisions made implicitly: a database chosen because one engineer knew it, a service split because microservices were fashionable, or a non-functional requirement nobody wrote down until the system was in production. Months later, nobody remembers why things are the way they are, and every change starts with an argument about history.</p>
          <p className="leading-relaxed">Good architecture decisions have three things in common. The real need is understood before options are compared. Several options are considered, including doing nothing. And the decision is recorded, with its reasons, so people who join later can understand it, challenge it and change it when circumstances change.</p>
          <p className="leading-relaxed">The <Link to="/explore/toolkits/architecture-decisions" className="text-primary dark:text-secondary hover:underline">Architecture Decisions Toolkit</Link> gives a five-step method and a template. This article explains why each step matters.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">The five steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Frame the decision</h3>
              <p className="text-sm">Write down the decision in one sentence and decide whether it is a one-way door, hard to reverse, or a two-way door that can be changed cheaply. One-way doors deserve care; two-way doors deserve speed.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Understand the real need</h3>
              <p className="text-sm">Ask what problem this solves, for whom, and how you will know it worked. Capture the non-functional requirements, such as load, latency, availability, security and cost, as numbers where possible.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Generate options</h3>
              <p className="text-sm">List at least three options, including the simplest one that could work and doing nothing. Compare them against weighted criteria so the trade-offs are visible.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Stress-test the favourite</h3>
              <p className="text-sm">Run a short pre-mortem: imagine the decision failed a year from now and ask why. Look at second-order effects, such as new skills needed, new things to operate and new costs.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Record and revisit</h3>
              <p className="text-sm">Write an Architecture Decision Record with the context, options, decision and consequences. Set a review date or a trigger that would make you revisit it.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">One-way and two-way doors</h2>
          <p className="leading-relaxed">Not every decision deserves the same effort. Choosing a logging library is easy to change later; choosing a primary database or a cloud provider is not. Treating every decision as a one-way door slows teams down and pushes decisions up to committees. Treating every decision as a two-way door leads to expensive surprises.</p>
          <p className="leading-relaxed">Ask one question early: what would it cost to reverse this in a year? If the answer is "a few days", decide quickly, record it briefly and move on. If the answer is "a migration project", slow down, involve more people and do the full process. Many decisions can also be made more reversible, for example by putting an interface in front of a vendor or running a time-boxed trial before committing.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Making trade-offs visible</h2>
          <p className="leading-relaxed">Most architecture debates are really disagreements about priorities that nobody has said out loud. One person cares most about speed of delivery, another about operational simplicity, a third about cost. A weighted decision matrix makes those priorities explicit: list the criteria, agree weights, then score each option.</p>
          <p className="leading-relaxed">The scores are less important than the conversation they force. Arguing about whether security should weigh five or three is more productive than arguing about whether option A or B is "better". And when the decision is recorded, the weights explain why it made sense at the time.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">What a good ADR contains</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Clear Title</h4>
                <p className="text-sm">A short statement of the decision, numbered so it can be referenced.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Context</h4>
                <p className="text-sm">The problem, the constraints and the forces at play, including non-functional requirements.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Options Considered</h4>
                <p className="text-sm">At least three, with honest pros and cons for each.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Decision</h4>
                <p className="text-sm">What was chosen, by whom, and on what date.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Consequences</h4>
                <p className="text-sm">What becomes easier, what becomes harder, and what new risks or costs appear.</p>
              </div>
            </div>
            <div className="flex items-start">
              <MessageSquare className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Review Trigger</h4>
                <p className="text-sm">A date or condition that would prompt the team to revisit the decision.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Common pitfalls</h2>
          <div className="space-y-4">
            <p>These patterns undermine even well-intentioned decision processes:</p>
            <ul className="list-disc list-inside space-y-3">
              <li><strong>Solution First:</strong> Starting with a technology and working backwards to justify it.</li>
              <li><strong>Only One Option:</strong> A "decision" with no alternatives is a proposal, not a decision.</li>
              <li><strong>Missing Numbers:</strong> Non-functional requirements written as "fast" or "highly available" instead of measurable targets.</li>
              <li><strong>Write-only ADRs:</strong> Records that nobody reads because they are stored far from the code.</li>
              <li><strong>Never Revisiting:</strong> Treating past decisions as permanent even after the context has changed.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Keeping ADRs useful</h2>
          <p className="leading-relaxed">Store ADRs in the repository next to the code they affect, in plain text, so they are versioned and reviewed like any other change. Keep them short: one or two pages is enough. When a decision is replaced, don't delete the old record; mark it as superseded and link to the new one. The history of why things changed is often as useful as the current state.</p>
          <p className="leading-relaxed">ADRs also help AI coding assistants. When decisions and their reasons are in the repository, assistants can follow them instead of suggesting patterns the team has already rejected.</p>
        </section>

        <section className="border-t border-slate-200 dark:border-slate-800 pt-8">
          <p className="italic">The best architecture decision is one the next engineer can understand, challenge and change.</p>
        </section>
      </div>
    </SimplePage>
  );
};

export default ArchitectureDecisionRecords;
