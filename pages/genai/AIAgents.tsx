import React from 'react';
import SimplePage from '../../components/SimplePage';

const AIAgents: React.FC = () => {
  return (
    <SimplePage 
      title="AI Agents" 
      subtitle="From Chatbots to Autonomous Actors."
    >
      <p className="mb-6">
        A chatbot answers questions. An Agent takes action. Agents use LLMs as a "reasoning engine" to decide which tools to use to complete a goal.
      </p>

      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">ReAct Pattern</h3>
      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg font-mono text-sm space-y-2 mb-8 border-l-4 border-secondary">
        <p><span className="text-blue-600 dark:text-blue-400">Thought:</span> The user wants to find the weather in Tokyo.</p>
        <p><span className="text-green-600 dark:text-green-400">Action:</span> Call tool `weather_api("Tokyo")`.</p>
        <p><span className="text-purple-600 dark:text-purple-400">Observation:</span> API returned "22°C, Cloudy".</p>
        <p><span className="text-blue-600 dark:text-blue-400">Thought:</span> I have the answer.</p>
        <p><span className="text-slate-900 dark:text-white">Final Answer:</span> It is currently 22°C and cloudy in Tokyo.</p>
      </div>

      <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Capabilities</h3>
      <ul className="list-disc list-inside space-y-2">
        <li>Browsing the web.</li>
        <li>Querying a SQL database.</li>
        <li>Calling internal APIs (e.g., Jira, Slack).</li>
        <li>Writing and executing Python code.</li>
      </ul>
    </SimplePage>
  );
};

export default AIAgents;