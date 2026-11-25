
import React from 'react';
import { Link } from 'react-router-dom';
import SimplePage from '../../components/SimplePage';
import { Sparkles } from 'lucide-react';

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "The Quarterly Team Health Check: A Simple Way to See How Your Team Is Really Doing",
      "description": "How to run an honest team health check, read the patterns and choose one or two improvements that stick.",
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
      "url": "https://nthakur.com/articles/team-health-check",
      "image": "https://nthakur.com/assets/img/gallery/profile.jpg",
      "keywords": "team health check, engineering team health, retrospectives, psychological safety, engineering management, developer experience, team improvement",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://nthakur.com/articles/team-health-check"
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
          "name": "The Quarterly Team Health Check: A Simple Way to See How Your Team Is Really Doing",
          "item": "https://nthakur.com/articles/team-health-check"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How often should a team health check be run?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every quarter works well for most teams. It is frequent enough to spot trends and infrequent enough that people don't get tired of it."
          }
        },
        {
          "@type": "Question",
          "name": "Should managers see the results of team health checks?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The team should decide what to share. Sharing themes and requests works better than sharing raw scores, which risks turning the check into a performance measure."
          }
        },
        {
          "@type": "Question",
          "name": "What dimensions should a team health check include?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Common dimensions include purpose, delivering value, speed and flow, tools and release, learning, support, workload, and fun and trust. Choose six to ten that matter to the team."
          }
        },
        {
          "@type": "Question",
          "name": "How is a health check different from a retrospective?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A retrospective usually looks back at a recent sprint or project. A health check looks at the team's overall state across several dimensions and tracks the trend over quarters."
          }
        }
      ]
    }
  ]
};

const TeamHealthCheck: React.FC = () => {
  return (
    <SimplePage
      title="The Quarterly Team Health Check: A Simple Way to See How Your Team Is Really Doing"
      subtitle="How to run an honest team health check, read the patterns and choose one or two improvements that stick."
      structuredData={SCHEMA}
    >
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">When the metrics look fine but something feels wrong</h2>
          <p className="leading-relaxed">Delivery metrics tell you a lot about a team: how often it ships, how long changes take and how often they fail. They tell you much less about whether the team is sustainable. A team can hit every target while people are exhausted, frustrated with their tools, or unsure what their work is for. By the time that shows up in the metrics, someone has usually already left.</p>
          <p className="leading-relaxed">A team health check is a short, regular conversation that makes these things visible. The team rates itself on a handful of dimensions, discusses the patterns and chooses one or two improvements. Done well, it takes an hour a quarter and catches problems while they are still small.</p>
          <p className="leading-relaxed">The <Link to="/explore/toolkits/team-health-check" className="text-primary dark:text-secondary hover:underline">Team Health Check Toolkit</Link> gives the steps and a ready-made board. This article explains how to make it work.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">The five steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Make It Safe</h3>
              <p className="text-sm">The health check belongs to the team. Agree up front that results are for the team's own improvement, not for comparing or ranking teams, and use a neutral facilitator.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Rate Independently</h3>
              <p className="text-sm">Each person privately rates six to ten dimensions as green, amber or red, such as purpose, delivering value, speed, tools and release, learning, support, workload, and fun and trust.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Discuss Patterns</h3>
              <p className="text-sm">Reveal the ratings together. Spend time where views differ or where things have got worse. Look for causes in the system, such as process, tools and workload, before anything personal.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Pick One or Two</h3>
              <p className="text-sm">Choose the improvements that would help most and that the team can influence. Give each an owner and a check-in date. Escalate anything outside the team's control with a clear request.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Follow Up</h3>
              <p className="text-sm">Start the next health check by reviewing last quarter's improvements. Over time, the trend matters more than any single result.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Safety comes first</h2>
          <p className="leading-relaxed">A health check only works if people answer honestly, and people only answer honestly if they trust what will happen with the answers. The fastest way to destroy that trust is to use the results to compare teams or judge managers. Once people suspect that a red rating will be held against them, every rating turns green.</p>
          <p className="leading-relaxed">This is Goodhart's law in action: when a measure becomes a target, it stops being a good measure. Keep health check results with the team. If leaders want a view across teams, ask each team to share the themes and requests they choose to share, not the raw scores.</p>
          <p className="leading-relaxed">Rating privately before revealing also matters. If people rate one at a time, aloud, they anchor on the first answers they hear, and the most confident voice sets the tone.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Reading the results</h2>
          <p className="leading-relaxed">The most useful information is usually in the disagreements. If half the team rates workload green and half rates it red, that is worth a conversation: perhaps work is unevenly spread, or some people are carrying on-call or support load that others don't see.</p>
          <p className="leading-relaxed">Trends matter more than snapshots. A dimension that moved from green to amber since last quarter deserves attention even if it isn't red yet. Ask what changed. Often the answer points to something specific, such as a reorganisation, a new process or a growing backlog of technical debt.</p>
          <p className="leading-relaxed">When you find a problem, ask "why" a few times before deciding what to do. Low ratings for speed might come from slow pipelines, unclear priorities or too many dependencies on other teams, and each needs a different fix.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Running a good session</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Clear Purpose</h4>
                <p className="text-sm">Everyone knows the results stay with the team.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Neutral Facilitator</h4>
                <p className="text-sm">Someone who can guide the conversation without steering it.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Defined Dimensions</h4>
                <p className="text-sm">Each dimension has a short description of what green looks like.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Private Ratings</h4>
                <p className="text-sm">People vote before seeing anyone else's ratings.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Previous Actions</h4>
                <p className="text-sm">Last quarter's improvements reviewed at the start.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Few Commitments</h4>
                <p className="text-sm">One or two improvements, each with an owner and date.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Common pitfalls</h2>
          <div className="space-y-4">
            <p>These patterns turn a useful practice into a box-ticking exercise:</p>
            <ul className="list-disc list-inside space-y-3">
              <li><strong>Ranking Teams:</strong> Comparing scores across teams, which guarantees less honest answers next time.</li>
              <li><strong>No Action:</strong> Running the check but never acting on the results.</li>
              <li><strong>Too Many Fixes:</strong> Committing to more improvements than the team can deliver.</li>
              <li><strong>Blaming People:</strong> Treating a red rating as a complaint about an individual rather than a signal about the system.</li>
              <li><strong>Skipping Quarters:</strong> Running it irregularly, so trends are impossible to see.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Connecting health to delivery</h2>
          <p className="leading-relaxed">Team health and delivery performance reinforce each other. Teams with clear purpose, good tools and a sustainable pace tend to deliver more reliably, and teams that deliver reliably tend to feel better about their work. Looking at the health check alongside delivery metrics, such as the DORA measures, gives a fuller picture than either alone.</p>
          <p className="leading-relaxed">For managers, the health check is also a regular prompt to ask what the team needs. The requests that come out of it, such as fewer interruptions, time to fix a flaky test suite or clearer priorities, are often among the highest-value things a manager can act on.</p>
        </section>

        <section className="border-t border-slate-200 dark:border-slate-800 pt-8">
          <p className="italic">Healthy teams are not the ones with no red ratings. They are the ones that talk about them.</p>
        </section>
      </div>
    </SimplePage>
  );
};

export default TeamHealthCheck;
