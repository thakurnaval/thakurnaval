import React from 'react';
import SimplePage from '../../components/SimplePage';

const PromptEngineering: React.FC = () => {
  return (
    <SimplePage 
      title="Prompt Engineering" 
      subtitle="The art of talking to the machine."
    >
      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Techniques</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-primary dark:text-white">Zero-Shot</h4>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Asking the model to do something without examples. <br/><em>"Classify this text as positive or negative."</em></p>
        </div>
        <div>
          <h4 className="font-bold text-primary dark:text-white">Few-Shot</h4>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Providing examples to guide the output format. <br/><em>"Input: Great job. Output: Positive. Input: This is bad. Output: Negative. Input: Not bad. Output: "</em></p>
        </div>
        <div>
          <h4 className="font-bold text-primary dark:text-white">Chain of Thought (CoT)</h4>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Asking the model to explain its reasoning step-by-step. Greatly improves math and logic performance. <br/><em>"Let's think step by step."</em></p>
        </div>
        <div>
          <h4 className="font-bold text-primary dark:text-white">System Prompting</h4>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Setting the persona and constraints at the beginning of the conversation. <br/><em>"You are a helpful Python coding assistant. Only answer with code."</em></p>
        </div>
      </div>
    </SimplePage>
  );
};

export default PromptEngineering;