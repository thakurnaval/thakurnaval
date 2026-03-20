import React from 'react';
import { Code } from 'lucide-react';
import SDLCPhasePage from '../../components/SDLCPhasePage';

const Coding: React.FC = () => {
  return (
    <SDLCPhasePage 
      title="AI-Powered Coding"
      subtitle="Accelerating development with intelligent code generation and refactoring."
      icon={Code}
      content="AI-powered coding tools like GitHub Copilot, Amazon CodeWhisperer, and custom LLM-based agents are transforming the developer experience. These tools go beyond simple autocomplete, offering full function generation, automated refactoring, and intelligent documentation."
      benefits={[
        "Increased developer productivity (up to 50% for routine tasks)",
        "Reduced boilerplate code and manual repetition",
        "Faster onboarding for new developers on complex codebases",
        "Automated unit test generation alongside code",
        "Improved code quality through real-time refactoring suggestions"
      ]}
    />
  );
};

export default Coding;
