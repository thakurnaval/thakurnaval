
import React from 'react';
import { Link } from 'react-router-dom';
import SimplePage from '../../components/SimplePage';
import { BarChart3, BrainCircuit, DollarSign, Shield, Sparkles, Star, Target } from 'lucide-react';

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "How to Choose AI Use Cases That Make It to Production",
      "description": "A five-step method for picking the AI ideas worth building, measuring them properly and stopping the rest early.",
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
      "url": "https://nthakur.com/articles/choosing-ai-use-cases",
      "image": "https://nthakur.com/assets/img/profile.jpg",
      "keywords": "AI use cases, generative AI adoption, AI pilots, GenAI strategy, AI governance, AI ROI, LLM use case selection",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://nthakur.com/articles/choosing-ai-use-cases"
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
          "name": "How to Choose AI Use Cases That Make It to Production",
          "item": "https://nthakur.com/articles/choosing-ai-use-cases"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do you choose which AI use cases to pursue first?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Score ideas on business value, feasibility and risk. Start with use cases that solve a real, measurable problem, have the data they need, and carry manageable risk."
          }
        },
        {
          "@type": "Question",
          "name": "Why do so many AI pilots fail to reach production?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Common reasons are missing baselines, unclear ownership, governance arriving too late, unexpected running costs and users who don't trust the output."
          }
        },
        {
          "@type": "Question",
          "name": "What should be measured in an AI pilot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The same measures as the baseline: time per task, error rate, cost and user satisfaction, plus model-specific measures such as answer quality and the share of output people accept without changes."
          }
        },
        {
          "@type": "Question",
          "name": "When should an AI pilot be stopped?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "When it fails to beat the baseline on the agreed measure, when running costs exceed the value, or when risks cannot be controlled. Agreeing the stop rule up front makes this decision easier."
          }
        }
      ]
    }
  ]
};

const ChoosingAiUseCases: React.FC = () => {
  return (
    <SimplePage
      title="How to Choose AI Use Cases That Make It to Production"
      subtitle="A five-step method for picking the AI ideas worth building, measuring them properly and stopping the rest early."
      structuredData={SCHEMA}
    >
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">The pilot problem</h2>
          <p className="leading-relaxed">Most organisations have no shortage of AI ideas. The harder problem is choosing which ones to build, and getting them from pilot into production. Many companies have a long list of experiments, a few impressive demos and very little measurable value. Pilots run for months without a clear success measure, governance arrives late and blocks launch, and running costs appear only when usage grows.</p>
          <p className="leading-relaxed">The cause is usually the selection process, not the technology. Ideas are chosen because a tool is available or a leader is enthusiastic, rather than because they solve an important problem in a way AI is well suited to. Without a baseline, nobody can prove whether the pilot worked.</p>
          <p className="leading-relaxed">The <Link to="/explore/toolkits/ai-use-case-selection" className="text-primary dark:text-secondary hover:underline">AI Use-Case Selection Toolkit</Link> gives a five-step method and a one-page use-case card. This article explains each step.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">The five steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Star className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Start from Problems</h3>
              <p className="text-sm">Collect ideas as problems people actually have: slow, repetitive, error-prone or expensive work. Phrase each as a question about the outcome, such as "How might we cut the time to answer support tickets?", not about a tool.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <BrainCircuit className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Check AI Fits</h3>
              <p className="text-sm">Many problems are better solved with a rule, a form or a better process. AI suits tasks involving language, summarising or judgement, where a mostly-right answer that a person checks is still valuable.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Shield className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Score Value and Risk</h3>
              <p className="text-sm">Score each idea on business value, feasibility (data, integration and skills) and risk (data sensitivity, customer impact and regulation). Start with high value and feasibility, and manageable risk.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <BarChart3 className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Measure the Baseline</h3>
              <p className="text-sm">Before building, measure how the work performs today: time, error rate, cost and satisfaction. Agree the target and the result that would make you stop.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Pilot Small</h3>
              <p className="text-sm">Release to a small group with evaluation in place, compare with the baseline, then scale, adjust or stop. Share the result either way.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Is AI the right tool?</h2>
          <p className="leading-relaxed">It is tempting to apply AI to every problem. But generative AI is probabilistic: it can be confidently wrong, its output varies, and it costs money every time it runs. For tasks with clear rules and structured data, traditional automation is usually cheaper, faster and more reliable.</p>
          <p className="leading-relaxed">AI earns its place where the work involves reading, writing, summarising, classifying or reasoning over text and images, and where a person can check the output or the cost of an occasional error is low. Drafting a reply that an agent reviews is a good fit. Making a final decision about a customer's loan without review usually isn't, at least not without strong controls.</p>
          <p className="leading-relaxed">A useful inversion is to ask: what would make this use case fail? Poor data, unclear ownership, users who don't trust the output, or a cost that grows faster than the value. If you can't address those, the idea is not ready.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Baselines make value visible</h2>
          <p className="leading-relaxed">The single most common reason pilots stall is that nobody measured the starting point. Without a baseline, "people like it" is the only evidence, and that rarely survives a budget review.</p>
          <p className="leading-relaxed">Measure the current process before you build: how long a task takes, how often it happens, how often it goes wrong, and what it costs. Then agree a target and a date. This doesn't need to be elaborate; a sample of fifty tasks timed by hand is often enough. It turns the pilot into an experiment with a clear answer.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">The use-case card</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Problem</h4>
                <p className="text-sm">Who has it, how often, and what it costs today.</p>
              </div>
            </div>
            <div className="flex items-start">
              <BrainCircuit className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">AI Role</h4>
                <p className="text-sm">What the model does, and what a person still does.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Owner</h4>
                <p className="text-sm">One named person accountable for the outcome.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Target className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Baseline and Target</h4>
                <p className="text-sm">Today's measure, the target and the date.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Shield className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Data and Risk</h4>
                <p className="text-sm">Data sources, sensitivity, permission and the AI policy risk tier.</p>
              </div>
            </div>
            <div className="flex items-start">
              <DollarSign className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Cost and Stop Rule</h4>
                <p className="text-sm">Expected running cost at full scale, and the result that would stop the work.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Common pitfalls</h2>
          <div className="space-y-4">
            <p>These are the patterns that keep AI programmes stuck between pilot and production:</p>
            <ul className="list-disc list-inside space-y-3">
              <li><strong>Tool First:</strong> Choosing a model or vendor and then searching for a problem.</li>
              <li><strong>No Baseline:</strong> Pilots that can never prove they worked.</li>
              <li><strong>Late Governance:</strong> Legal and security review at the end, where it blocks launch.</li>
              <li><strong>Hidden Running Cost:</strong> Ignoring cost per request until usage grows.</li>
              <li><strong>Sunk Cost:</strong> Keeping a failing pilot alive because of the effort already spent.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Governance that helps</h2>
          <p className="leading-relaxed">Governance works best when it is part of selection rather than a gate at the end. A simple risk tiering, where low-risk internal tools can move quickly and customer-facing or high-impact uses get more controls, lets most teams proceed while protecting what matters. Including the risk tier on the use-case card makes the conversation happen early, when the design can still change.</p>
          <p className="leading-relaxed">Once a few use cases have reached production, the shared pieces, such as evaluation tooling, prompt management, guardrails and cost tracking, become a platform that makes the next ones faster.</p>
        </section>

        <section className="border-t border-slate-200 dark:border-slate-800 pt-8">
          <p className="italic">Pick the problem first, measure where you start, and let the evidence decide what scales.</p>
        </section>
      </div>
    </SimplePage>
  );
};

export default ChoosingAiUseCases;
