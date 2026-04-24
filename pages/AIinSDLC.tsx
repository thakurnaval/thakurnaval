import React from 'react';
import { Link } from 'react-router-dom';
import { Code, TestTube, FileText, CheckCircle, Rocket, Activity, Lightbulb, TrendingUp, AlertTriangle, Brain } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';

const AIinSDLC: React.FC = () => {
  const caseStudies = [
    {
      title: "AI-Driven Automated Test Generation",
      problem: "A large fintech company was struggling with slow release cycles due to manual test case creation and maintenance. Regression testing took 3 days for every minor release.",
      solution: "Implemented an AI-powered testing framework that analyzes code changes and automatically generates relevant unit and integration tests. Used LLMs to maintain test scripts by self-healing when UI elements changed.",
      impact: "Regression testing time reduced from 3 days to 4 hours. Test coverage increased by 40% without increasing QA headcount."
    },
    {
      title: "Intelligent Code Review Assistant",
      problem: "Senior engineers were spending 30% of their time on routine code reviews, focusing on style and basic logic errors instead of architectural concerns.",
      solution: "Deployed a custom AI agent integrated into the GitLab CI/CD pipeline. The agent performs initial reviews, checking for security vulnerabilities, performance bottlenecks, and adherence to internal coding standards.",
      impact: "Human review time reduced by 60%. Critical security vulnerabilities caught 4x faster during the development phase."
    },
    {
      title: "AI-Enhanced Requirement Analysis",
      problem: "Project delays often stemmed from ambiguous or conflicting requirements that were only discovered during the development or testing phases.",
      solution: "Introduced an AI tool that analyzes natural language requirement documents to identify ambiguities, contradictions, and missing edge cases before development begins.",
      impact: "Requirement-related rework reduced by 25%. Project estimation accuracy improved by 15%."
    }
  ];

  return (
    <>
      <SEO 
        title="AI in SDLC | Transforming Software Development Lifecycle with AI"
        description="Leverage Generative AI to accelerate every stage of the SDLC. From AI-powered coding to intelligent testing and automated deployment."
      />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI in SDLC</h1>
          <p className="text-xl text-slate-100 max-w-2xl">
            Accelerating software delivery through intelligent automation and Generative AI.
          </p>
        </div>
      </div>

      <Section>
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Overview Section */}
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-primary dark:text-white mb-6">The Future of Software Engineering</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Integrating Artificial Intelligence into the Software Development Lifecycle (SDLC) is no longer an option—it's a competitive necessity. By leveraging LLMs and machine learning, organizations can automate mundane tasks, enhance developer productivity, and significantly improve software quality.
            </p>
          </div>

          {/* SDLC Phases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Code, title: 'AI-Powered Coding', link: '/ai-sdlc/coding', desc: 'Copilots, automated refactoring, and intelligent code completion.' },
              { icon: TestTube, title: 'AI in Testing', link: '/ai-sdlc/testing', desc: 'Automated test generation, self-healing tests, and predictive QA.' },
              { icon: FileText, title: 'AI in Requirements', link: '/ai-sdlc/requirements', desc: 'Ambiguity detection, automated user story generation, and gap analysis.' },
              { icon: CheckCircle, title: 'AI in Code Review', link: '/ai-sdlc/code-review', desc: 'Automated PR reviews, security scanning, and style enforcement.' },
              { icon: Rocket, title: 'AI in Deployment', link: '/ai-sdlc/deployment', desc: 'Intelligent release orchestration and automated rollback triggers.' },
              { icon: Activity, title: 'AI in Monitoring', link: '/ai-sdlc/monitoring', desc: 'Anomaly detection, root cause analysis, and predictive alerting.' },
            ].map((item, idx) => (
              <Link key={idx} to={item.link} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-secondary dark:hover:border-secondary transition-all group">
                <item.icon className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-primary dark:text-white mb-2 group-hover:text-secondary">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>

          {/* Dedicated Case Studies Section */}
          <div id="case-studies" className="pt-8">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-8 h-8 text-secondary-dark dark:text-secondary" />
              <h2 className="text-3xl font-bold text-primary dark:text-white">AI in SDLC Case Studies</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-10">
              {caseStudies.map((study, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <h3 className="text-2xl font-bold text-primary dark:text-white mb-6 flex items-center gap-2">
                    <Lightbulb className="w-6 h-6 text-secondary-dark dark:text-secondary" />
                    {study.title}
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="space-y-3">
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        The Problem
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {study.problem}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <Brain className="w-4 h-4 text-secondary-dark dark:text-secondary" />
                        AI Solution
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {study.solution}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-secondary-dark dark:text-secondary" />
                        The Impact
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {study.impact}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-white p-10 rounded-3xl text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Transform Your SDLC with AI</h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
                Ready to integrate Generative AI into your development workflows? Let's discuss a tailored strategy for your engineering organization.
              </p>
              <Link to="/contact?topic=AI-SDLC" className="inline-block px-10 py-4 bg-secondary text-primary font-bold rounded-xl hover:bg-secondary-hover shadow-xl transition-all text-lg">
                Get Started with AI in SDLC
              </Link>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default AIinSDLC;
