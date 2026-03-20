import React from 'react';
import { Activity } from 'lucide-react';
import SDLCPhasePage from '../../components/SDLCPhasePage';

const Monitoring: React.FC = () => {
  return (
    <SDLCPhasePage 
      title="AI in Monitoring"
      subtitle="Predictive observability and intelligent root cause analysis."
      icon={Activity}
      content="AI-driven monitoring (AIOps) moves beyond static alerts to intelligent anomaly detection and predictive alerting. By analyzing vast amounts of telemetry data, AI can identify the root cause of issues in seconds rather than hours."
      benefits={[
        "Real-time anomaly detection across complex systems",
        "Automated root cause analysis for faster incident resolution",
        "Predictive alerting before issues affect end-users",
        "Intelligent log summarization and noise reduction",
        "Optimized resource allocation based on predictive demand"
      ]}
    />
  );
};

export default Monitoring;
