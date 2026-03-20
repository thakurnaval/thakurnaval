import React from 'react';
import { TestTube } from 'lucide-react';
import SDLCPhasePage from '../../components/SDLCPhasePage';

const Testing: React.FC = () => {
  return (
    <SDLCPhasePage 
      title="AI in Testing"
      subtitle="Intelligent QA and automated test lifecycle management."
      icon={TestTube}
      content="AI is revolutionizing software testing by automating the creation, maintenance, and execution of test cases. From self-healing UI tests to predictive analytics that identify high-risk areas, AI ensures higher quality with less manual effort."
      benefits={[
        "Automated generation of test cases from requirements or code",
        "Self-healing tests that adapt to UI changes automatically",
        "Predictive analytics to focus testing on high-risk code areas",
        "Intelligent visual regression testing",
        "Automated performance and security testing integration"
      ]}
    />
  );
};

export default Testing;
