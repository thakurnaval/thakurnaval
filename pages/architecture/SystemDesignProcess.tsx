import React from 'react';
import SimplePage from '../../components/SimplePage';

const SystemDesignProcess: React.FC = () => {
  return (
    <SimplePage 
      title="System Design Process" 
      subtitle="A structured approach to designing complex, scalable systems."
    >
      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Step-by-Step Approach</h3>
      <ol className="list-decimal list-inside space-y-4">
        <li>
          <strong>Requirements Clarification:</strong>
          <ul className="list-disc list-inside ml-6 mt-2 text-sm">
            <li>Functional Requirements (What does the system do?)</li>
            <li>Non-Functional Requirements (Scalability, Latency, Availability).</li>
          </ul>
        </li>
        <li>
          <strong>Back-of-the-envelope Estimations:</strong>
          <p className="ml-6 mt-1 text-sm">Traffic, Storage, Bandwidth, and Memory calculations.</p>
        </li>
        <li>
          <strong>System Interface Definition:</strong>
          <p className="ml-6 mt-1 text-sm">Define APIs and contract.</p>
        </li>
        <li>
          <strong>Defining Data Model:</strong>
          <p className="ml-6 mt-1 text-sm">Schema design, SQL vs NoSQL selection.</p>
        </li>
        <li>
          <strong>High-Level Design:</strong>
          <p className="ml-6 mt-1 text-sm">Draw the main components and how they interact.</p>
        </li>
        <li>
          <strong>Detailed Design:</strong>
          <p className="ml-6 mt-1 text-sm">Deep dive into critical components (Caching, Load Balancing, Partitioning).</p>
        </li>
        <li>
          <strong>Identifying Bottlenecks:</strong>
          <p className="ml-6 mt-1 text-sm">Single points of failure, data hotspots.</p>
        </li>
      </ol>
    </SimplePage>
  );
};

export default SystemDesignProcess;