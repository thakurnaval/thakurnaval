import React from 'react';
import SimplePage from '../../components/SimplePage';

const LLMOps: React.FC = () => {
  return (
    <SimplePage 
      title="LLMOps (Large Language Model Operations)" 
      subtitle="Adapting MLOps practices for the generative age."
    >
      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">The New Stack</h3>
      <ul className="list-disc list-inside space-y-3 text-slate-700 dark:text-slate-300 mb-8">
        <li><strong>Model Selection:</strong> Choosing between closed (GPT-4, Claude) vs open (Llama 3, Mistral) models.</li>
        <li><strong>Vector Databases:</strong> Pinecone, Weaviate, or pgvector for storing embeddings.</li>
        <li><strong>Orchestration:</strong> LangChain or LlamaIndex for chaining calls together.</li>
        <li><strong>Evaluation:</strong> How do you test a non-deterministic output? Using "LLM-as-a-Judge" or RAGAS scores.</li>
      </ul>

      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Fine-tuning vs RAG</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded">
           <h4 className="font-bold text-secondary">RAG (Context)</h4>
           <p className="text-sm mt-2">Giving the model a textbook. Best for adding new knowledge or reducing hallucinations.</p>
        </div>
        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded">
           <h4 className="font-bold text-secondary">Fine-tuning (Behavior)</h4>
           <p className="text-sm mt-2">Sending the model to school. Best for changing the format, tone, or style of response.</p>
        </div>
      </div>
    </SimplePage>
  );
};

export default LLMOps;