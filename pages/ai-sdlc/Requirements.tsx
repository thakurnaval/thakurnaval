import React from 'react';
import { FileText } from 'lucide-react';
import SDLCPhasePage from '../../components/SDLCPhasePage';

const Requirements: React.FC = () => {
  return (
    <SDLCPhasePage 
      title="AI in Requirements"
      subtitle="Streamlining the analysis and generation of software requirements."
      icon={FileText}
      content="AI tools can analyze natural language requirements to identify ambiguities, contradictions, and missing edge cases. They can also automatically generate user stories, acceptance criteria, and even initial design documents from high-level business goals."
      benefits={[
        "Detection of ambiguous or conflicting requirements early",
        "Automated generation of user stories and acceptance criteria",
        "Gap analysis between business goals and technical specifications",
        "Improved estimation accuracy through historical data analysis",
        "Faster alignment between business and engineering teams"
      ]}
    />
  );
};

export default Requirements;
