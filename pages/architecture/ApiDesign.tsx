import React from 'react';
import SimplePage from '../../components/SimplePage';

const ApiDesign: React.FC = () => {
  return (
    <SimplePage 
      title="API Design & Management" 
      subtitle="Creating intuitive, scalable, and secure interfaces for your services."
    >
      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Styles</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 border rounded">
          <h4 className="font-bold text-primary dark:text-white">REST</h4>
          <p className="text-sm mt-2">Resource-oriented, stateless, standard HTTP verbs.</p>
        </div>
        <div className="p-4 border rounded">
          <h4 className="font-bold text-primary dark:text-white">GraphQL</h4>
          <p className="text-sm mt-2">Client-driven queries, single endpoint, flexible response.</p>
        </div>
        <div className="p-4 border rounded">
          <h4 className="font-bold text-primary dark:text-white">gRPC</h4>
          <p className="text-sm mt-2">High performance, binary protocol (Protobuf), contract-first.</p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-primary dark:text-white mb-4">Best Practices</h3>
      <ul className="list-disc list-inside space-y-2">
        <li>Versioning strategies (URI vs Header).</li>
        <li>Pagination, Filtering, and Sorting.</li>
        <li>Idempotency keys for safe retries.</li>
        <li>Rate Limiting and Throttling.</li>
        <li>Comprehensive Documentation (OpenAPI/Swagger).</li>
      </ul>
    </SimplePage>
  );
};

export default ApiDesign;