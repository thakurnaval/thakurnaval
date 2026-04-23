import React from 'react';
import { Link } from 'react-router-dom';
import SimplePage from '../../components/SimplePage';
import { Gamepad2, Trophy, Zap, TrendingUp, Users, BarChart3, Star, GitMerge } from 'lucide-react';

const GamifyingDevOpsPipeline: React.FC = () => {
  return (
    <SimplePage
      title="Fun with DevOps: Gamifying the Pipeline"
      subtitle="How to increase team engagement, reduce build failures, and make continuous delivery genuinely enjoyable — through the principles of game design."
    >
      <div className="space-y-10">

        <section className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 rounded-xl p-6">
          <p className="text-base italic text-amber-900 dark:text-amber-300 leading-relaxed">
            "The best DevOps transformations I've seen weren't driven by better tooling — they were driven by teams that actually wanted to ship. Gamification is one of the most underrated levers for creating that culture."
          </p>
          <p className="mt-3 text-sm font-semibold text-amber-800 dark:text-amber-400">— Naval Thakur, Practice Manager, SLB</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">The Problem: DevOps as a Chore</h2>
          <p className="leading-relaxed">
            Most organizations treat CI/CD pipelines as infrastructure — something engineers work around rather than with. Pipeline failures get ignored until they cause an outage. Test coverage stays at 40% because nobody tracks it. Deployment frequency is a metric on a dashboard nobody opens.
          </p>
          <p className="mt-4 leading-relaxed">
            The root cause isn't laziness. It's that the feedback loops in most DevOps setups are too slow, too impersonal, and too abstract to trigger the intrinsic motivation engineers need to care about quality. Games have solved this problem for decades. We just haven't borrowed enough from them.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">The Four Game Mechanics That Work in Engineering</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Trophy,
                title: 'Leaderboards — But Team-First',
                body: 'Track metrics like deployment frequency, mean time to recovery (MTTR), and test coverage at team level. Individual leaderboards breed gaming the system. Team boards build shared ownership. Rotate the "metric of the sprint" to avoid fixation on a single number.',
              },
              {
                icon: Star,
                title: 'Streaks and Achievements',
                body: 'Award achievements for sustained behavior: "Green Pipeline" badge for 10 consecutive clean builds, "Zero-Downtime" badge for 30 days without a prod incident, "Shift-Left Champion" for teams that catch bugs before integration. Slack bots are perfect for announcing these.',
              },
              {
                icon: BarChart3,
                title: 'Visible Progress Bars',
                body: 'Nothing motivates engineers more than a percentage that isn\'t 100%. Put test coverage, DORA metrics, and security scan scores on a visible dashboard — a physical TV screen in the team area if possible. Progress that is visible gets worked on.',
              },
              {
                icon: Zap,
                title: 'Fast Feedback Loops',
                body: 'Games give you feedback in seconds. Most CI pipelines give you feedback in 20 minutes. Invest in parallel test execution and incremental builds to get pipeline feedback under 5 minutes. Speed of feedback is the single biggest driver of pipeline engagement.',
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <Icon className="w-8 h-8 text-secondary mb-4" />
                <h3 className="text-lg font-bold text-primary dark:text-white mb-2">{title}</h3>
                <p className="text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">A Real Pattern: The Deployment League</h2>
          <p className="leading-relaxed">
            One of the patterns I've used successfully with enterprise teams is what I call the <strong>Deployment League</strong>. It works like this:
          </p>
          <div className="mt-6 space-y-4 pl-4 border-l-4 border-secondary">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Week 1 — Baseline</h4>
              <p className="text-sm mt-1">Capture current DORA metrics across all squads: deployment frequency, lead time for changes, MTTR, change failure rate. Display them on a shared dashboard — no judgment, just truth.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Week 2–3 — The Sprint</h4>
              <p className="text-sm mt-1">Teams compete to improve their own baseline (not each other's) over a 2-week sprint. Each team picks one metric to focus on and commits to a target. Daily bot updates in Slack show progress.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">Week 4 — Show & Tell</h4>
              <p className="text-sm mt-1">Every team presents what they tried, what moved, what didn't, and why. The team with the most improved metric wins a (genuinely valued) prize — e.g., the team leads gets to choose the next tech spike topic.</p>
            </div>
          </div>
          <p className="mt-6 leading-relaxed">
            The point isn't the competition. It's the <em>language shift</em> — teams start talking about pipeline metrics the same way they talk about sprint velocity. It becomes part of the team's identity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">What to Track — and What to Avoid</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-200 dark:border-green-800/40">
              <h3 className="font-bold text-green-800 dark:text-green-300 mb-3 flex items-center"><TrendingUp className="mr-2" size={18}/> Track These</h3>
              <ul className="space-y-2 text-sm text-green-900 dark:text-green-200">
                <li>Deployment frequency (per team, per week)</li>
                <li>Build success rate (consecutive green runs)</li>
                <li>Time-to-first-green (how fast a PR gets a passing build)</li>
                <li>Test coverage delta (trending up or down?)</li>
                <li>MTTR after an incident</li>
              </ul>
            </div>
            <div className="p-6 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-800/40">
              <h3 className="font-bold text-red-800 dark:text-red-300 mb-3 flex items-center"><GitMerge className="mr-2" size={18}/> Avoid These</h3>
              <ul className="space-y-2 text-sm text-red-900 dark:text-red-200">
                <li>Lines of code committed (invites padding)</li>
                <li>Number of PRs merged (invites tiny, meaningless PRs)</li>
                <li>Individual bug counts (creates blame culture)</li>
                <li>Any metric that rewards speed over quality</li>
                <li>Metrics that a single engineer can manipulate alone</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">The Underlying Principle</h2>
          <p className="leading-relaxed">
            Gamification doesn't make a bad process good — it makes a good process visible. If your pipeline is genuinely broken, leaderboards will surface the pain faster but won't fix the root cause. The prerequisite is a pipeline that, when people actually run it, produces results they can be proud of.
          </p>
          <p className="mt-4 leading-relaxed">
            Start there. Then add the game mechanics. In my experience, a well-run "Deployment League" sprint will do more for pipeline quality than any tool purchase.
          </p>
        </section>

        <section className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-4">
            <Users className="w-8 h-8 text-secondary shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-primary dark:text-white mb-2">Want to Run a Deployment League with Your Team?</h3>
              <p className="text-sm leading-relaxed">
                I run hands-on DevOps gamification workshops for engineering teams and leadership groups. We design the metric framework, set up the tooling, and run the first sprint together. If this resonates, let's talk.
              </p>
              <Link to="/contact?topic=Workshop / Training" className="inline-block mt-4 text-sm font-bold text-secondary hover:underline">Book a Workshop &rarr;</Link>
            </div>
          </div>
        </section>

      </div>
    </SimplePage>
  );
};

export default GamifyingDevOpsPipeline;
