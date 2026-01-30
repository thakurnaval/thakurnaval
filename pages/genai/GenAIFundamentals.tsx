import React from 'react';
import SimplePage from '../../components/SimplePage';

const GenAIFundamentals: React.FC = () => {
  return (
    <SimplePage 
      title="GenAI Fundamentals" 
      subtitle="Understanding Large Language Models (LLMs) and their capabilities."
    >
      <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">How it Works</h2>
      <p className="mb-6">
        At its core, a Generative Pre-trained Transformer (GPT) is a prediction engine. Given a sequence of text (tokens), it predicts the most statistically likely next token.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white dark:bg-slate-800 p-6 rounded shadow-sm">
          <h3 className="font-bold text-primary dark:text-white mb-2">Tokens</h3>
          <p className="text-sm">The basic unit of text. 1,000 tokens is roughly 750 words. Models are billed and limited by token count.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded shadow-sm">
          <h3 className="font-bold text-primary dark:text-white mb-2">Context Window</h3>
          <p className="text-sm">The "short-term memory" of the model. How much text it can consider at once (e.g., 8k, 32k, 128k).</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded shadow-sm">
          <h3 className="font-bold text-primary dark:text-white mb-2">Temperature</h3>
          <p className="text-sm">A parameter controlling randomness. Low temp (0.2) = focused/deterministic. High temp (0.8) = creative/random.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded shadow-sm">
          <h3 className="font-bold text-primary dark:text-white mb-2">Embeddings</h3>
          <p className="text-sm">Converting text into numerical vectors so computers can understand semantic similarity.</p>
        </div>
      </div>
    </SimplePage>
  );
};

export default GenAIFundamentals;