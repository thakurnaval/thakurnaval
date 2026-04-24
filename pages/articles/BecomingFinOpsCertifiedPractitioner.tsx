import React from 'react';
import { Link } from 'react-router-dom';
import SimplePage from '../../components/SimplePage';
import { DollarSign, BookOpen, CheckCircle2, Calendar, Target, Award, ArrowRight, TrendingDown, BarChart3, Users } from 'lucide-react';

const BecomingFinOpsCertifiedPractitioner: React.FC = () => {
  return (
    <SimplePage
      title="Becoming a FinOps Certified Practitioner"
      subtitle="A practitioner's guide to the FOCP exam — what to study, what actually matters in the real world, and how to pass it in under 8 weeks."
    >
      <div className="space-y-10">

        <section className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/40 rounded-xl p-6">
          <p className="text-base italic text-emerald-900 dark:text-emerald-300 leading-relaxed">
            "I passed the FOCP in 2022. What surprised me most was that the hardest part wasn't the exam — it was unlearning the assumption that cloud cost is IT's problem. FinOps is fundamentally a business culture shift, and that's what the certification is really testing."
          </p>
          <p className="mt-3 text-sm font-semibold text-emerald-800 dark:text-emerald-400">— Naval Thakur, FinOps Certified Practitioner (FOCP), Linux Foundation</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Why FinOps Certification Matters Now</h2>
          <p className="leading-relaxed">
            Cloud spend is now the fastest-growing cost line in most enterprise P&Ls. According to Gartner, organizations that implement FinOps practices reduce cloud waste by 20–30% within the first year. Yet fewer than 15% of organizations have a formal FinOps function — which means the skill is both high-demand and undersupplied.
          </p>
          <p className="mt-4 leading-relaxed">
            The <strong>FinOps Certified Practitioner (FOCP)</strong> credential, offered through the FinOps Foundation and administered by the Linux Foundation, is the industry's de facto certification. It validates that you understand the FinOps Framework — not just the tools, but the operating model, the team structures, and the financial vocabulary needed to have credible conversations with Finance, Engineering, and the C-suite simultaneously.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">What the Exam Actually Tests</h2>
          <p className="mb-4 leading-relaxed">
            The FOCP exam is 50 questions, 90 minutes, open book. Do not let "open book" lull you — the questions are scenario-based and require genuine conceptual understanding, not lookup speed. The exam is organized around the FinOps Framework's three domains:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: BarChart3, title: 'Understanding Cloud Usage & Cost', weight: '~35%', topics: ['Cost allocation & tagging', 'Chargeback vs showback', 'Cloud pricing models', 'Cost visibility tooling'] },
              { icon: TrendingDown, title: 'Performance Tracking & Benchmarking', weight: '~30%', topics: ['KPIs and unit economics', 'Forecast vs actuals', 'Anomaly detection', 'DORA + FinOps metrics'] },
              { icon: Users, title: 'Real-time Decision Making', weight: '~35%', topics: ['FinOps team structure', 'Optimization strategies', 'Commitment discounts (RIs, CUDs)', 'Stakeholder alignment'] },
            ].map(({ icon: Icon, title, weight, topics }) => (
              <div key={title} className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <Icon className="w-8 h-8 text-secondary-dark dark:text-secondary mb-3" />
                <h3 className="font-bold text-primary dark:text-white mb-1">{title}</h3>
                <span className="text-xs font-bold text-secondary-dark dark:text-secondary">{weight} of exam</span>
                <ul className="mt-3 space-y-1">
                  {topics.map(t => (
                    <li key={t} className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">The 8-Week Study Plan</h2>
          <p className="mb-6 leading-relaxed">
            This is the plan I would follow if I were starting from scratch today. It assumes 3–4 hours per week of study time — realistic for a practicing engineer or architect.
          </p>
          <div className="space-y-4">
            {[
              { week: 'Weeks 1–2', focus: 'Framework Foundations', tasks: ['Read the FinOps Framework at finops.org cover-to-cover', 'Understand the Inform → Optimize → Operate lifecycle', 'Learn the FinOps team personas: Practitioner, Engineering, Finance, Business, Executive', 'Flashcard: all FinOps terminology in the glossary'] },
              { week: 'Weeks 3–4', focus: 'Cloud Pricing & Cost Models', tasks: ['Deep-dive AWS/Azure/GCP pricing pages — understand On-Demand vs Reserved vs Spot/Spot', 'Practice calculating Reserved Instance savings scenarios', 'Understand committed use discounts (CUDs) on GCP', 'Study tagging strategies and cost allocation logic'] },
              { week: 'Weeks 5–6', focus: 'Unit Economics & KPIs', tasks: ['Study unit economics: cost per customer, cost per transaction, cost per API call', 'Understand showback vs chargeback models and when each is appropriate', 'Learn the FOCUS (FinOps Open Cost and Usage Specification) standard', 'Practice scenario questions: given a spend pattern, what\'s the correct FinOps response?'] },
              { week: 'Weeks 7–8', focus: 'Practice Exams & Gap Closing', tasks: ['Take the Linux Foundation practice exam at least twice', 'Review every wrong answer until you understand the principle, not just the correct answer', 'Focus on the "organizational" questions — these trip up engineers who know the tech but not the culture', 'Review real-world case studies on finops.org'] },
            ].map(({ week, focus, tasks }) => (
              <div key={week} className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-secondary/10 text-secondary-dark dark:text-secondary text-xs font-bold rounded-full">{week}</span>
                  <h3 className="font-bold text-primary dark:text-white">{focus}</h3>
                </div>
                <ul className="space-y-2 ml-2">
                  {tasks.map(t => (
                    <li key={t} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-secondary-dark dark:text-secondary shrink-0 mt-0.5" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">The Concepts That Trip People Up</h2>
          <p className="mb-4 leading-relaxed">
            After speaking with dozens of practitioners who've taken the exam, these are the areas that consistently catch people off guard:
          </p>
          <div className="space-y-4 pl-4 border-l-4 border-amber-400 dark:border-amber-600">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">The "Crawl, Walk, Run" model</h4>
              <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">The FinOps Framework describes maturity across three stages. Many exam questions ask what the right action is "at each stage." Know which practices belong at which maturity level — don't assume your org's practices are the standard.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Shared cost allocation</h4>
              <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">How do you allocate the cost of a shared Kubernetes cluster to individual business units? The exam has multiple scenarios on this. Know the proportional, fixed, and even-split methodologies and when each is appropriate.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">The FinOps team's role</h4>
              <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">The FinOps team does not own cloud costs — Engineering does. The FinOps team enables the decision-making, provides visibility, and facilitates collaboration. Many candidates get questions wrong because they assign cost ownership to FinOps.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Anomaly detection vs. forecasting</h4>
              <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">These are related but distinct capabilities. Anomaly detection is reactive (what's wrong right now?). Forecasting is proactive (what will we spend next quarter?). Know the tools and processes for each.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">After the Certification: What Actually Matters</h2>
          <p className="leading-relaxed">
            The FOCP will get you the vocabulary and framework. What actually moves the needle in an enterprise is applying it. In my experience at SLB, the three highest-impact FinOps moves after certification were:
          </p>
          <ol className="mt-4 space-y-3 list-decimal list-inside">
            <li className="text-sm leading-relaxed"><strong>Stand up a tagging governance policy first.</strong> You cannot optimize what you cannot attribute. Before any optimization work, every resource must be tagged to a business unit, product, and environment.</li>
            <li className="text-sm leading-relaxed"><strong>Run showback before chargeback.</strong> Show teams what they're spending before you charge them for it. This builds the habit of looking at cloud cost as a first-class engineering metric — without creating political resistance.</li>
            <li className="text-sm leading-relaxed"><strong>Find one reserved instance win and make it visible.</strong> A single well-publicized RI purchase that saves $X/month builds enormous credibility for the FinOps program — far more than a comprehensive but abstract cost report.</li>
          </ol>
        </section>

        <section className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-4">
            <Award className="w-8 h-8 text-secondary-dark dark:text-secondary shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-primary dark:text-white mb-2">FinOps Study Group & Coaching</h3>
              <p className="text-sm leading-relaxed">
                I run occasional FinOps certification study groups for small cohorts of practitioners, architects, and finance leaders. We cover the framework together, work through real-world scenarios, and do exam prep in the final week. If you're preparing for your FOCP, reach out.
              </p>
              <Link to="/contact?topic=Mentorship" className="inline-flex items-center mt-4 text-sm font-bold text-secondary-dark dark:text-secondary hover:underline">
                Join the Study Group <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </SimplePage>
  );
};

export default BecomingFinOpsCertifiedPractitioner;
