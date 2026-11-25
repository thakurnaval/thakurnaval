
import React from 'react';
import { Link } from 'react-router-dom';
import SimplePage from '../../components/SimplePage';
import { Lightbulb, Shield, Sparkles, TrendingUp } from 'lucide-react';

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Better Technical Reviews and Meetings: Decide More, Debate Less",
      "description": "A simple structure for design reviews, architecture boards and adoption decisions that ends with a decision, not another meeting.",
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
      "url": "https://nthakur.com/articles/better-technical-reviews-and-meetings",
      "image": "https://nthakur.com/assets/img/gallery/profile.jpg",
      "keywords": "technical reviews, design review, architecture review board, effective meetings, six thinking hats, decision making, pre-mortem",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://nthakur.com/articles/better-technical-reviews-and-meetings"
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
          "name": "Better Technical Reviews and Meetings: Decide More, Debate Less",
          "item": "https://nthakur.com/articles/better-technical-reviews-and-meetings"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How long should a technical review meeting be?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Usually 30 to 45 minutes. If a review regularly needs longer, the pre-read may not be clear enough, or the decision may need to be split into smaller parts."
          }
        },
        {
          "@type": "Question",
          "name": "What are the Six Thinking Hats?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A method by Edward de Bono where a group looks at a problem through one perspective at a time: facts, feelings, risks, benefits, creative alternatives and process. It replaces adversarial debate with parallel thinking."
          }
        },
        {
          "@type": "Question",
          "name": "What is a pre-mortem?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A short exercise where the team imagines a decision has failed in the future and lists the reasons why. It surfaces risks that people might otherwise not mention."
          }
        },
        {
          "@type": "Question",
          "name": "Who should own the decision in a design review?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "One named person, usually the technical lead or architect responsible for the system. Others advise; the owner decides and records the reasoning."
          }
        }
      ]
    }
  ]
};

const BetterTechnicalReviewsAndMeetings: React.FC = () => {
  return (
    <SimplePage
      title="Better Technical Reviews and Meetings: Decide More, Debate Less"
      subtitle="A simple structure for design reviews, architecture boards and adoption decisions that ends with a decision, not another meeting."
      structuredData={SCHEMA}
    >
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">The meeting that happens three times</h2>
          <p className="leading-relaxed">Most engineers know the meeting. A design is presented, a few senior people share strong opinions, the discussion goes in circles, and it ends with "let's take it offline". A week later the same group meets again. Meanwhile the team waits, or quietly builds what it was going to build anyway.</p>
          <p className="leading-relaxed">Technical reviews matter. They catch risks early, spread knowledge and improve decisions. But badly run reviews cost a great deal of time and can make teams avoid asking for input at all. The difference is rarely the people in the room; it is the structure of the conversation.</p>
          <p className="leading-relaxed">The <Link to="/explore/toolkits/reviews-and-meetings" className="text-primary dark:text-secondary hover:underline">Better Reviews and Meetings Toolkit</Link> gives a five-step method and a 45-minute agenda. This article explains why it works.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">The five steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Decide if it needs a meeting</h3>
              <p className="text-sm">Many reviews can happen asynchronously through a written document and comments. Meet only when a decision needs discussion, several perspectives must be reconciled, or the stakes are high.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Set purpose and owner</h3>
              <p className="text-sm">Every review has one decision owner and a clear question to answer. Send a one-page pre-read at least a day ahead, so the meeting starts from shared understanding.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Explore in parallel</h3>
              <p className="text-sm">Instead of debating, look at the proposal through one lens at a time: facts, benefits, alternatives, risks and gut feel. Everyone thinks in the same direction together, so the loudest voice doesn't dominate.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Shield className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Surface risks early</h3>
              <p className="text-sm">Run a short pre-mortem: imagine it is a year later and the decision failed. Ask why. This makes it safe to raise concerns that people might otherwise keep to themselves.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Decide and record</h3>
              <p className="text-sm">End with a decision, or with a clear list of what is needed to decide. Record it with the reasoning, and spend the last two minutes on one improvement to the meeting itself.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Why parallel thinking works</h2>
          <p className="leading-relaxed">In a typical debate, one person argues for an idea while another argues against it. Each defends a position, and the discussion becomes about winning rather than understanding. Edward de Bono's Six Thinking Hats offers an alternative: the whole group looks at the same aspect at the same time.</p>
          <p className="leading-relaxed">First, everyone shares facts and data. Then everyone looks for benefits. Then alternatives. Then risks. Then a quick round of gut feel. The person most worried about risk gets their turn, but so does the person with a creative alternative, and neither drowns out the other. In practice, this often makes reviews shorter, because the group isn't revisiting the same arguments.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Watch for anchoring and authority</h2>
          <p className="leading-relaxed">When the most senior person speaks first, everyone else tends to adjust their views towards that opinion. This is anchoring, combined with authority bias, and it quietly removes the value of having several perspectives in the room.</p>
          <p className="leading-relaxed">Two simple habits help. Ask people to write down their view before anyone speaks, then share in turn. And ask the most senior person to speak last. Both cost nothing and noticeably improve the quality of input, especially from newer or quieter team members.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">A 45-minute review</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Pre-read Sent</h4>
                <p className="text-sm">One page, a day ahead, with the decision needed and the owner.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Purpose First</h4>
                <p className="text-sm">Five minutes on the question, the owner and how the decision will be made.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Lightbulb className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Facts Then Ideas</h4>
                <p className="text-sm">Facts and clarifying questions first, then benefits and alternatives.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Shield className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Risks Named</h4>
                <p className="text-sm">A pre-mortem on the leading option before anyone commits.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Decision Recorded</h4>
                <p className="text-sm">The decision, the reasoning and the owner written down before people leave.</p>
              </div>
            </div>
            <div className="flex items-start">
              <TrendingUp className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Meeting Improved</h4>
                <p className="text-sm">One change to make the next review better.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Common pitfalls</h2>
          <div className="space-y-4">
            <p>These habits turn reviews into a drain on the team:</p>
            <ul className="list-disc list-inside space-y-3">
              <li><strong>No Decision Owner:</strong> Discussions that end with "let's take it offline" because nobody can decide.</li>
              <li><strong>Senior Voice First:</strong> Opinions anchored by the most senior person in the room.</li>
              <li><strong>Debate Mode:</strong> People defending positions instead of exploring the problem together.</li>
              <li><strong>Unwritten Decisions:</strong> Decisions that are not recorded, so the same meeting happens again.</li>
              <li><strong>Review as Gate:</strong> Reviews that only approve or block, rather than improving the design.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Async first, meetings second</h2>
          <p className="leading-relaxed">Many teams now default to written proposals with asynchronous comments, and meet only when the comments show real disagreement. This works especially well across time zones and gives people time to think. A short written decision record, such as an Architecture Decision Record, then captures the outcome.</p>
          <p className="leading-relaxed">AI assistants can help here too: summarising long comment threads, listing open questions, or drafting the decision record from the discussion. The decision itself should stay with the named owner.</p>
        </section>

        <section className="border-t border-slate-200 dark:border-slate-800 pt-8">
          <p className="italic">A good review ends with a decision and a reason, not with another meeting.</p>
        </section>
      </div>
    </SimplePage>
  );
};

export default BetterTechnicalReviewsAndMeetings;
