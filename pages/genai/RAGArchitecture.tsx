import React from 'react';
import SimplePage from '../../components/SimplePage';
import { Database, ArrowRight, Bot, FileText } from 'lucide-react';

const RAGArchitecture: React.FC = () => {
  return (
    <SimplePage 
      title="RAG Architecture" 
      subtitle="Retrieval-Augmented Generation: Grounding AI in your data."
    >
      <p className="mb-8">
        LLMs hallucinate. RAG solves this by retrieving relevant facts from your trusted data source and passing them to the LLM to generate an answer.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center mb-12">
        <div className="flex flex-col items-center">
          <FileText className="w-8 h-8 text-slate-400 mb-2" />
          <span className="text-sm font-bold">Documents</span>
        </div>
        <ArrowRight className="text-slate-300" />
        <div className="flex flex-col items-center p-3 bg-white dark:bg-slate-800 rounded border border-slate-200">
          <Database className="w-8 h-8 text-secondary mb-2" />
          <span className="text-sm font-bold">Vector DB</span>
        </div>
        <ArrowRight className="text-slate-300" />
        <div className="flex flex-col items-center">
          <Bot className="w-8 h-8 text-primary dark:text-white mb-2" />
          <span className="text-sm font-bold">LLM</span>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">The Pipeline</h3>
      <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300">
        <li><strong>Ingestion:</strong> Load PDFs, Docs, Databases.</li>
        <li><strong>Chunking:</strong> Split text into manageable pieces (e.g., 500 characters).</li>
        <li><strong>Embedding:</strong> Convert chunks into vectors (numbers).</li>
        <li><strong>Retrieval:</strong> When a user asks a question, search for the most similar vectors.</li>
        <li><strong>Generation:</strong> Send the user question + the retrieved chunks to the LLM.</li>
      </ol>
    </SimplePage>
  );
};

export default RAGArchitecture;