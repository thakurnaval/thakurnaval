
import React from 'react';
import { motion } from 'motion/react';
import { Users, Heart, MessageSquare, ShieldCheck, ArrowLeft, Lightbulb, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const CulturalTransformationDevOps: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/talks" 
          className="inline-flex items-center text-secondary-dark dark:text-secondary hover:underline mb-8 font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Talks
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-secondary/10 text-secondary-dark dark:text-secondary text-xs font-bold rounded-full uppercase tracking-widest">
              Cultural Transformation
            </span>
            <span className="text-slate-400 text-sm">12 Min Read</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-6 leading-tight">
            Cultural Transformation in DevOps: Moving Beyond Tools
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed italic border-l-4 border-secondary pl-6">
            "DevOps is 80% culture and 20% tools. Yet, we spend 95% of our budget on the tools." This article explores how to address the human factor in technical change.
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 flex items-center">
                <Users className="mr-3 text-secondary-dark dark:text-secondary" /> The Illusion of the Toolchain
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                In the early days of the DevOps movement, the focus was revolutionary: breaking down the silos between development and operations. We promised faster deployments, higher stability, and happier teams. However, as the movement matured, it became increasingly commoditized. Organizations began to believe that "doing DevOps" simply meant buying a CI/CD platform, containerizing applications, and hiring a few "DevOps Engineers."
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                But tools don't communicate; people do. Tools don't share responsibility; people do. A state-of-the-art Jenkins pipeline or a complex Kubernetes cluster will not fix a culture of finger-pointing, fear of failure, or misaligned incentives. In fact, adding sophisticated tools to a broken culture often accelerates the chaos rather than resolving it.
              </p>
            </section>

            <section className="mb-12 bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 flex items-center">
                <ShieldCheck className="mr-3 text-secondary-dark dark:text-secondary" /> Psychological Safety: The Foundation
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                The most critical component of a successful DevOps transformation is psychological safety. Coined by Amy Edmondson and popularized by Google's Project Aristotle, psychological safety is the belief that one will not be punished or humiliated for speaking up with ideas, questions, concerns, or mistakes.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-primary dark:text-white mb-2 flex items-center">
                    <Zap className="mr-2 h-4 w-4 text-secondary-dark dark:text-secondary" /> Blameless Post-Mortems
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Focus on the "how" and "what" rather than the "who." Treat every incident as a learning opportunity for the system, not a trial for the individual.
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-primary dark:text-white mb-2 flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4 text-secondary-dark dark:text-secondary" /> Radical Candor
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Encourage honest feedback that is delivered with personal care. High-performing teams challenge each other directly because they trust each other.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 flex items-center">
                <Target className="mr-3 text-secondary-dark dark:text-secondary" /> Aligning Incentives
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                Historically, Developers were incentivized for "velocity" (shipping features), while Operations were incentivized for "stability" (keeping things running). These goals are inherently in conflict. If I get a bonus for shipping code and you get fired if the site goes down, we are natural enemies.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                Cultural transformation requires a shift to shared outcomes. When both Dev and Ops are measured by the same North Star metrics—such as Lead Time for Changes, Deployment Frequency, Mean Time to Recovery (MTTR), and Change Failure Rate—the silos begin to melt away.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 flex items-center">
                <Lightbulb className="mr-3 text-secondary-dark dark:text-secondary" /> The Role of Leadership
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                Culture is not something you "install." It is the shadow cast by leadership. If executives demand DevOps results but continue to manage via command-and-control, the transformation will fail. Leaders must transition from "Gatekeepers" to "Enablers."
              </p>
              <ul className="list-none space-y-4 mt-6">
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-secondary/20 text-secondary-dark dark:text-secondary flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                  <span className="text-slate-600 dark:text-slate-300"><strong>Model Vulnerability:</strong> When leaders admit their own mistakes, they give permission for others to do the same.</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-secondary/20 text-secondary-dark dark:text-secondary flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                  <span className="text-slate-600 dark:text-slate-300"><strong>Invest in Learning:</strong> Allocate real time (not just "after hours") for experimentation, training, and cross-pollination of skills.</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-secondary/20 text-secondary-dark dark:text-secondary flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                  <span className="text-slate-600 dark:text-slate-300"><strong>Celebrate the "Unseen" Work:</strong> Recognize the engineers who prevent fires, not just the "heroes" who put them out.</span>
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 flex items-center">
                <Heart className="mr-3 text-secondary-dark dark:text-secondary" /> Conclusion: The Human API
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Technical change is relatively easy; human change is hard. As we move into an era of even greater automation and AI-driven operations, the "human factor" becomes our most valuable asset. Empathy, communication, and shared purpose are the true drivers of high-performing technology organizations.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                If you want to transform your organization, start by listening to your people. Understand their friction points, remove their fear, and align their goals. The tools will follow, and they will finally work the way they were intended.
              </p>
            </section>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" 
                alt="Naval Thakur" 
                className="w-16 h-16 rounded-full border-2 border-secondary"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="font-bold text-primary dark:text-white">Naval Thakur</h4>
                <p className="text-sm text-slate-500">SRE Leader & Cultural Transformation Advocate</p>
              </div>
            </div>
            <Link 
              to="/contact" 
              className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Discuss Your Transformation
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CulturalTransformationDevOps;
