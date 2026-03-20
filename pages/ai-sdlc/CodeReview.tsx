import React from 'react';
import { CheckCircle } from 'lucide-react';
import SDLCPhasePage from '../../components/SDLCPhasePage';

const CodeReview: React.FC = () => {
  return (
    <SDLCPhasePage 
      title="AI in Code Review"
      subtitle="Automating the review process for faster, more secure releases."
      icon={CheckCircle}
      content="AI-powered code review agents can perform the initial heavy lifting of a PR review. They check for security vulnerabilities, performance bottlenecks, and adherence to internal coding standards, allowing senior engineers to focus on architectural concerns."
      benefits={[
        "Reduced human review time by up to 60%",
        "Consistent enforcement of coding standards and best practices",
        "Early detection of security vulnerabilities and performance issues",
        "Automated documentation and change summary generation",
        "Faster feedback loops for developers"
      ]}
    />
  );
};

export default CodeReview;
