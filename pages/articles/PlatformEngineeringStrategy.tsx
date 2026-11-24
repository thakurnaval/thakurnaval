
import React from 'react';
import { Link } from 'react-router-dom';
import SimplePage from '../../components/SimplePage';
import { BarChart3, BrainCircuit, Compass, Sparkles, Star } from 'lucide-react';

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Building a Platform Strategy Developers Actually Want to Use",
      "description": "How to choose what your internal platform should do first, decide what to build or buy, and show it is working.",
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
      "url": "https://nthakur.com/articles/platform-engineering-strategy",
      "image": "https://nthakur.com/assets/img/profile.jpg",
      "keywords": "platform engineering, internal developer platform, golden paths, platform strategy, developer experience, Wardley mapping, build vs buy",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://nthakur.com/articles/platform-engineering-strategy"
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
          "name": "Building a Platform Strategy Developers Actually Want to Use",
          "item": "https://nthakur.com/articles/platform-engineering-strategy"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is an internal developer platform?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A set of self-service tools, templates and services that let product teams build, deploy and operate software without needing to master every underlying technology."
          }
        },
        {
          "@type": "Question",
          "name": "What is a golden path?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A supported, well-documented way to do a common task, such as creating and deploying a new service, with sensible defaults for security, observability and cost built in."
          }
        },
        {
          "@type": "Question",
          "name": "Should a platform be mandatory?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ideally not at first. A platform should earn adoption by being the easiest path. Mandates can come later for specific controls, such as security or compliance, once the platform is genuinely good."
          }
        },
        {
          "@type": "Question",
          "name": "How big should a platform team be?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Start small, often three to six people, and grow based on demand and results. A small team focused on the biggest constraint usually delivers more than a large team building everything at once."
          }
        }
      ]
    }
  ]
};

const PlatformEngineeringStrategy: React.FC = () => {
  return (
    <SimplePage
      title="Building a Platform Strategy Developers Actually Want to Use"
      subtitle="How to choose what your internal platform should do first, decide what to build or buy, and show it is working."
      structuredData={SCHEMA}
    >
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Why many internal platforms struggle</h2>
          <p className="leading-relaxed">Platform engineering promises a lot: self-service infrastructure, consistent security, faster onboarding and less cognitive load for product teams. Yet many internal platforms end up as expensive projects that developers work around. The platform team builds what it thinks is needed, adoption is slow, and leadership starts asking what the investment delivered.</p>
          <p className="leading-relaxed">The common thread is starting from technology rather than from the developers who will use it. A successful platform is a product. It has customers, a clear value proposition, a roadmap shaped by real pain points, and measures of success that reflect outcomes for those customers.</p>
          <p className="leading-relaxed">The <Link to="/explore/toolkits/platform-strategy" className="text-primary dark:text-secondary hover:underline">Platform Strategy Toolkit</Link> sets out a five-step method and a one-page strategy template. This article explains the reasoning behind it.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">The five steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Compass className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Map the landscape</h3>
              <p className="text-sm">Use a Wardley map or a simple value chain to see what developers need, which capabilities support those needs, and how mature each one is. Commodity capabilities should be bought or rented; differentiating ones may be worth building.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <BrainCircuit className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Find the constraint</h3>
              <p className="text-sm">Measure where developers lose the most time today, such as waiting for environments, fighting pipelines or chasing approvals. Improve the biggest bottleneck first; improving anything else will not speed up delivery.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Decide build, buy or rent</h3>
              <p className="text-sm">For each capability, compare building, buying and using a managed service. Consider total cost of ownership, not just licence fees, and how team boundaries will shape the platform.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Star className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Start with a thin slice</h3>
              <p className="text-sm">Deliver one golden path end to end, such as a new service from template to production, for one or two willing teams. A small thing that works beats a large thing that is half finished.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Build momentum</h3>
              <p className="text-sm">Measure adoption and outcomes, share results, and expand to the next most painful area. Keep the platform optional where you can, so it has to earn its users.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Treat the platform as a product</h2>
          <p className="leading-relaxed">A product mindset changes how a platform team works. It means talking to developers regularly, watching how they actually use the platform, and treating every support question as a sign of a gap in the product or the documentation. It means having a product owner who can say no to features that don't serve the main users.</p>
          <p className="leading-relaxed">It also means accepting that developers are customers who can choose. Mandating a platform before it is good enough breeds resentment and workarounds. Making it the easiest path, with good defaults, clear documentation and fast support, makes adoption follow naturally.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Team structure matters</h2>
          <p className="leading-relaxed">Conway's law says systems tend to mirror the communication structures of the organisations that build them. A platform designed without thinking about team boundaries will create friction where those boundaries meet. Team Topologies offers a useful vocabulary: stream-aligned teams deliver product value, and a platform team reduces their cognitive load by providing services they can consume without needing to understand every detail.</p>
          <p className="leading-relaxed">The key is the interaction mode. Early on, the platform team should collaborate closely with a few product teams to learn what they need. As capabilities mature, the interaction should shift to self-service, with clear interfaces and documentation, so the platform team is not a bottleneck.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">A one-page platform strategy</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Users and Needs</h4>
                <p className="text-sm">Who the platform serves and the top three problems it solves for them.</p>
              </div>
            </div>
            <div className="flex items-start">
              <BrainCircuit className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Current Constraint</h4>
                <p className="text-sm">The biggest source of lost developer time today, with evidence.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Scope</h4>
                <p className="text-sm">What the platform will and won't do in the next two quarters.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Build, Buy or Rent</h4>
                <p className="text-sm">The choice for each capability, with the reasoning.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">First Slice</h4>
                <p className="text-sm">The first golden path and the teams who will use it.</p>
              </div>
            </div>
            <div className="flex items-start">
              <BarChart3 className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Success Metrics</h4>
                <p className="text-sm">Adoption, lead time, onboarding time and developer satisfaction.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Common pitfalls</h2>
          <div className="space-y-4">
            <p>Watch for these patterns, which slow adoption and erode trust:</p>
            <ul className="list-disc list-inside space-y-3">
              <li><strong>Building Everything:</strong> Rebuilding commodity capabilities that a managed service already provides well.</li>
              <li><strong>Big Bang Launch:</strong> Months of work before any developer uses the platform.</li>
              <li><strong>Mandates First:</strong> Forcing adoption before the platform is genuinely easier than the alternative.</li>
              <li><strong>Measuring Output:</strong> Counting features shipped instead of developer outcomes.</li>
              <li><strong>No Product Owner:</strong> Every request accepted, so the platform grows wide and shallow.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">How to show the platform is working</h2>
          <p className="leading-relaxed">Measure what developers experience: time to create a new service, time from commit to production, time for a new joiner to ship a first change, and how many teams choose the golden path. Combine these with a short developer satisfaction survey every quarter. DORA metrics for teams on the platform, compared with teams not yet on it, make a strong case for further investment.</p>
          <p className="leading-relaxed">As AI coding assistants become common, the platform also becomes the place to provide them with safe context: templates, policies, approved patterns and guardrails that apply to code written by people and by agents alike.</p>
        </section>

        <section className="border-t border-slate-200 dark:border-slate-800 pt-8">
          <p className="italic">A platform succeeds when developers would choose it even if they didn't have to.</p>
        </section>
      </div>
    </SimplePage>
  );
};

export default PlatformEngineeringStrategy;
