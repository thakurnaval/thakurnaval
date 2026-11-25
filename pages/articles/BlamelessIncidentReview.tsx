
import React from 'react';
import { Link } from 'react-router-dom';
import SimplePage from '../../components/SimplePage';
import { Clock, Sparkles, Users } from 'lucide-react';

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "How to Run a Blameless Incident Review That Actually Prevents the Next Outage",
      "description": "A five-step method for turning outages into lasting improvements, with an agenda you can use at your next review.",
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
      "url": "https://nthakur.com/articles/blameless-incident-review",
      "image": "https://nthakur.com/assets/img/gallery/profile.jpg",
      "keywords": "incident review, blameless post-mortem, SRE, root cause analysis, incident management, 5 whys, fishbone diagram",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://nthakur.com/articles/blameless-incident-review"
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
          "name": "How to Run a Blameless Incident Review That Actually Prevents the Next Outage",
          "item": "https://nthakur.com/articles/blameless-incident-review"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How soon after an incident should the review happen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Within five working days, while memories are fresh. For major incidents, a short initial review within a day or two can capture the timeline, followed by a fuller review once the data is gathered."
          }
        },
        {
          "@type": "Question",
          "name": "Who should facilitate an incident review?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ideally someone who was not directly involved in the incident, so they can ask neutral questions and keep the discussion focused on the system rather than individuals."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between a root cause and contributing causes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A single root cause suggests one thing went wrong. In complex systems, incidents usually need several conditions at once. Looking for contributing causes across people, process and technology finds more useful improvements."
          }
        },
        {
          "@type": "Question",
          "name": "Should near misses be reviewed?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Near misses show the same weaknesses as real incidents, without the customer impact. A short review of a near miss is one of the cheapest ways to prevent a future outage."
          }
        }
      ]
    }
  ]
};

const BlamelessIncidentReview: React.FC = () => {
  return (
    <SimplePage
      title="How to Run a Blameless Incident Review That Actually Prevents the Next Outage"
      subtitle="A five-step method for turning outages into lasting improvements, with an agenda you can use at your next review."
      structuredData={SCHEMA}
    >
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Why most incident reviews don't change anything</h2>
          <p className="leading-relaxed">Most teams hold some kind of review after a serious outage. Far fewer can point to a review that stopped the same failure happening again. The usual pattern is familiar: a meeting a week or two later, a hunt for the change that triggered it, a long list of actions, and a document nobody reads. Three months later a slightly different version of the same failure takes the service down again.</p>
          <p className="leading-relaxed">The problem is rarely effort. It is method. Reviews that stop at the trigger ("a bad config was pushed") miss the more useful questions: why was it possible to push it, why did it spread so far, and why did it take so long to notice? Reviews that name individuals guarantee that people share less next time. And reviews that produce twenty actions usually deliver none of them.</p>
          <p className="leading-relaxed">A good incident review is a small, repeatable practice. It starts from facts, looks for several contributing causes rather than one culprit, picks a few actions that matter, and checks later that they worked. The <Link to="/explore/toolkits/incident-review" className="text-primary dark:text-secondary hover:underline">Incident Review Toolkit</Link> sets this out step by step; this article explains the thinking behind each step.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">The five steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Stabilise first</h3>
              <p className="text-sm">During the incident, act in short loops of observe, orient, decide and act. Restore service before diagnosing, and keep a scribe so the notes from the incident channel become the raw material for the review.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Clock className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Timeline before the meeting</h3>
              <p className="text-sm">The facilitator builds a timeline from alerts, logs, deployments and chat before anyone meets. The meeting starts from shared facts rather than competing memories, which saves time and reduces defensiveness.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Contributing causes</h3>
              <p className="text-sm">Map possible causes across people, process, tools and environment with a fishbone diagram, use 5 Whys on the strongest branches, and ask which defences, such as review, tests, canaries and alerts, failed to catch the problem.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">A few owned actions</h3>
              <p className="text-sm">Rank candidate actions by impact and effort and keep three to five. Each has one owner, a date and a way to check it worked. Fewer actions that happen beat a long list that doesn't.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Close the loop</h3>
              <p className="text-sm">Turn the lesson into something the system remembers: a test, an alert, a guardrail, a runbook entry, or an evaluation for an AI feature. Check the actions a month later and share what you learned with other teams.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">What "blameless" really means</h2>
          <p className="leading-relaxed">Blameless does not mean nobody is accountable. It means the review asks how the system allowed a reasonable person to make that mistake, rather than who made it. People act on the information, tools and pressures they have at the time. If a single engineer could take down production with one command, the problem is the system that made that possible.</p>
          <p className="leading-relaxed">A useful test is the substitution test: would another competent engineer, in the same situation with the same information, plausibly have done the same thing? If the answer is yes, blaming the individual teaches the organisation nothing. It also teaches everyone else to share less in the next review, which makes the next incident harder to learn from.</p>
          <p className="leading-relaxed">In practice, this means keeping names out of the write-up, describing decisions in terms of what people knew at the time, and treating "human error" as the start of the analysis rather than the conclusion.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Look for several causes, not one root</h2>
          <p className="leading-relaxed">Complex systems rarely fail for a single reason. An outage usually needs several things to go wrong at once: a risky change, a gap in testing, an alert that didn't fire, a runbook that was out of date. The Swiss cheese model is a helpful picture: each defence has holes, and an incident happens when the holes line up.</p>
          <p className="leading-relaxed">That is why the review should ask about every layer that could have caught the problem, not only the one that failed first. Strengthening any one of those layers makes the whole system more resilient, and often the cheapest fix is not at the point where the failure started. Faster detection, for example, can shrink the impact of a whole class of failures.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Before the review</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex items-start">
              <Clock className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Timeline Ready</h4>
                <p className="text-sm">Timestamps for impact start, detection, mitigation and resolution, built from logs and chat.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Users className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Right People</h4>
                <p className="text-sm">The responders, the owners of affected services and a neutral facilitator.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Data Shared</h4>
                <p className="text-sm">Dashboards, deployment history and customer impact shared ahead of the meeting.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Ground Rules</h4>
                <p className="text-sm">Everyone knows the review is blameless and focused on the system.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Time Boxed</h4>
                <p className="text-sm">Sixty to ninety minutes, within five working days of the incident.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Write-up Owner</h4>
                <p className="text-sm">One person owns the write-up and the follow-up on actions.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Common pitfalls</h2>
          <div className="space-y-4">
            <p>These are the patterns that make reviews feel busy but change nothing:</p>
            <ul className="list-disc list-inside space-y-3">
              <li><strong>Stopping at the Trigger:</strong> Naming the change that broke things, without asking why it was possible or why it spread.</li>
              <li><strong>Too Many Actions:</strong> A long list of actions without owners or dates, most of which never happen.</li>
              <li><strong>Naming People:</strong> Blame in the write-up, which guarantees less honesty in the next review.</li>
              <li><strong>No Follow-up:</strong> Never checking whether the actions were completed or whether they worked.</li>
              <li><strong>Reviewing Only Big Outages:</strong> Near misses are cheaper lessons. Review them too, more briefly.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Measuring whether reviews are working</h2>
          <p className="leading-relaxed">Track a small set of signals over time: how quickly incidents are detected and resolved, how many incidents repeat a known pattern, and what share of review actions are completed on time. If repeat incidents are falling and detection is getting faster, the practice is working. If actions are routinely overdue, reduce how many you commit to.</p>
          <p className="leading-relaxed">For teams running AI features, add one more measure: whether each AI-related incident produced a new evaluation case, so the same failure is caught before release next time.</p>
        </section>

        <section className="border-t border-slate-200 dark:border-slate-800 pt-8">
          <p className="italic">An incident review is worth holding only if the system is harder to break afterwards.</p>
        </section>
      </div>
    </SimplePage>
  );
};

export default BlamelessIncidentReview;
