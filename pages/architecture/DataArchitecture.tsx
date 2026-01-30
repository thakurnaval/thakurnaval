import React from 'react';
import SimplePage from '../../components/SimplePage';

const DataArchitecture: React.FC = () => {
  return (
    <SimplePage 
      title="Data Architecture & Design" 
      subtitle="Managing the flow, storage, and consumption of data across the enterprise."
    >
      <p>
        Data architecture defines how data is acquired, stored, processed, distributed, and consumed. It is the blueprint for managing data assets.
      </p>
      
      <h3 className="text-xl font-bold text-primary dark:text-white mt-8 mb-4">Topics</h3>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>CAP Theorem:</strong> Understanding trade-offs between Consistency, Availability, and Partition Tolerance.</li>
        <li><strong>Database Selection:</strong> Relational (ACID) vs. NoSQL (BASE) vs. NewSQL.</li>
        <li><strong>Data Lakes vs. Data Warehouses vs. Data Mesh:</strong> Modern approaches to analytics storage.</li>
        <li><strong>Event Sourcing & CQRS:</strong> Decoupling write and read models for performance.</li>
      </ul>
    </SimplePage>
  );
};

export default DataArchitecture;