import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Sparkles, Database, Lock } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';

const GenAI: React.FC = () => {
  return (
    <>
      <SEO 
        title="GenAI Strategy & LLMOps Consulting | Enterprise AI Governance"
        description="Operationalize Generative AI. LLM security, cost governance, RAG architecture, and AI Agents for enterprise adoption."
      />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">GenAI & Ops</h1>
          <p className="text-xl text-slate-100 max-w-2xl">
            Operationalizing Artificial Intelligence for the modern enterprise.
          </p>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-primary dark:text-white mb-6">The Intersection of AI and Ops</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Generative AI is transforming how we write code, manage incidents, and optimize costs. But implementing LLMs introduces new challenges in security (<Link to="/genai/governance" className="text-secondary hover:underline">LLM Security</Link>), cost governance (Tokenomics), and operations (<Link to="/genai/llmops" className="text-secondary hover:underline">LLMOps</Link>).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                icon: Bot, 
                title: 'AI Copilots for SRE', 
                desc: 'Using GenAI to analyze logs, summarize incidents, and suggest remediation steps in real-time.',
                link: '/genai/agents'
              },
              { 
                icon: Sparkles, 
                title: 'CI/CD Insights', 
                desc: 'Predictive analytics for build failures and intelligent test case generation.',
                link: '/devops/practices'
              },
              { 
                icon: Database, 
                title: 'Token & Cost Governance', 
                desc: 'Applying FinOps principles to AI consumption. Managing API costs and model inference spend.',
                link: '/finops/unit-economics'
              },
              { 
                icon: Lock, 
                title: 'Security for GenAI', 
                desc: 'Protecting against prompt injection, data leakage, and ensuring compliance in AI outputs.',
                link: '/genai/governance'
              }
            ].map((item, idx) => (
              <Link key={idx} to={item.link} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-secondary dark:hover:border-secondary transition-colors block group">
                <item.icon className="w-8 h-8 text-secondary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-primary dark:text-white mb-2 group-hover:text-secondary">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
              </Link>
            ))}
          </div>
          
          <div className="pt-4">
             <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Learn GenAI</h2>
             <div className="flex flex-wrap gap-3">
               <Link to="/genai/fundamentals" className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-primary dark:text-slate-300 hover:bg-secondary hover:text-white transition-colors">Fundamentals</Link>
               <Link to="/genai/prompt-engineering" className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-primary dark:text-slate-300 hover:bg-secondary hover:text-white transition-colors">Prompt Engineering</Link>
               <Link to="/genai/rag" className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-primary dark:text-slate-300 hover:bg-secondary hover:text-white transition-colors">RAG Architecture</Link>
             </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl text-center border border-transparent dark:border-slate-700">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Ready to adopt GenAI safely?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Naval helps organizations build the "Ops" around their AI initiatives, ensuring they are scalable, secure, and cost-efficient.
            </p>
            <Link to="/contact?topic=Consulting" className="inline-block px-8 py-3 bg-secondary text-primary font-bold rounded-lg hover:bg-secondary-hover shadow-lg transition-all">
              Discuss GenAIOps Strategy
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
};

export default GenAI;