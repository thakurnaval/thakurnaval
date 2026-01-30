
import React from 'react';
import SimplePage from '../../components/SimplePage';
import { Brain, Shield, Zap, RefreshCw } from 'lucide-react';

const CognitiveDevSecOps: React.FC = () => {
  return (
    <SimplePage 
      title="Cognitive DevSecOps" 
      subtitle="Integrating Generative AI into the Security Lifecycle for Intelligent Transformation."
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Moving Beyond Traditional Automation</h2>
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Traditional DevSecOps relies on static rules and pre-defined signatures. While effective for known threats, it struggles with zero-day vulnerabilities and complex architectural flaws. <strong>Cognitive DevSecOps</strong> leverages Large Language Models (LLMs) and AIOps to bring reasoning and context to the security pipeline.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <Brain className="w-10 h-10 text-secondary mb-4" />
            <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Contextual Awareness</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              AI doesn't just see a code snippet; it understands the business logic and intent, allowing it to spot vulnerabilities that traditional scanners miss.
            </p>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <Shield className="w-10 h-10 text-secondary mb-4" />
            <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Auto-Remediation</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Generating suggested pull requests to fix vulnerabilities the moment they are detected, rather than just raising an alert.
            </p>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <Zap className="w-10 h-10 text-secondary mb-4" />
            <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Intelligent Triage</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Reducing alert fatigue by automatically filtering false positives and prioritizing risks based on actual exploitability.
            </p>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <RefreshCw className="w-10 h-10 text-secondary mb-4" />
            <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Feedback Loops</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Using production telemetry to train the AI on what "normal" looks like, creating a truly self-improving security ecosystem.
            </p>
          </div>
        </div>

        <section className="bg-primary text-white p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Naval's Approach</h2>
          <p className="mb-4">
            Naval assists organizations in defining the roadmap for GenAI adoption within their DevOps lifecycle. This involves:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-200">
            <li>Selecting the right LLMs for privacy-preserving code analysis.</li>
            <li>Implementing RAG (Retrieval-Augmented Generation) for organizational security standards.</li>
            <li>Building custom AI Agents to handle incident response and post-mortems.</li>
            <li>Establishing governance to prevent "AI Hallucination" in critical infrastructure.</li>
          </ul>
        </section>
      </div>
    </SimplePage>
  );
};

export default CognitiveDevSecOps;
