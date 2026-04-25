
import React from 'react';
import SimplePage from '../../components/SimplePage';
import { Cloud, Server, Database, Shield, Zap, Layers, RefreshCw, DollarSign, Globe } from 'lucide-react';

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Cloud Computing Fundamentals",
      "description": "Understanding the model, service types, benefits, and challenges of modern cloud infrastructure — IaaS, PaaS, SaaS explained.",
      "author": { "@type": "Person", "name": "Naval Thakur", "url": "https://nthakur.com/about", "jobTitle": "Practice Manager, SLB" },
      "publisher": { "@type": "Person", "name": "Naval Thakur", "url": "https://nthakur.com" },
      "datePublished": "2023-12-01",
      "dateModified": "2025-01-01",
      "url": "https://nthakur.com/articles/cloud-computing-fundamentals",
      "image": "https://nthakur.com/assets/img/profile.jpg",
      "keywords": "cloud computing, IaaS, PaaS, SaaS, cloud infrastructure, cloud benefits, virtualization, cloud challenges",
      "mainEntityOfPage": { "@type": "WebPage", "@id": "https://nthakur.com/articles/cloud-computing-fundamentals" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nthakur.com" },
        { "@type": "ListItem", "position": 2, "name": "Articles", "item": "https://nthakur.com/articles" },
        { "@type": "ListItem", "position": 3, "name": "Cloud Computing Fundamentals", "item": "https://nthakur.com/articles/cloud-computing-fundamentals" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is cloud computing?",
          "acceptedAnswer": { "@type": "Answer", "text": "Cloud computing is a model of providing on-demand access to shared computing resources — servers, storage, databases, software, and applications — over the internet on a pay-as-you-go basis. It is based on virtualization, where a physical server is divided into multiple virtual servers that can be rapidly provisioned and de-provisioned as needed." }
        },
        {
          "@type": "Question",
          "name": "What is the difference between IaaS, PaaS, and SaaS?",
          "acceptedAnswer": { "@type": "Answer", "text": "IaaS (Infrastructure as a Service) provides virtualized computing resources where customers control the OS and applications. PaaS (Platform as a Service) provides a development and deployment platform so developers focus only on code without managing infrastructure. SaaS (Software as a Service) provides ready-to-use applications accessed via browser, managed entirely by a third-party provider." }
        },
        {
          "@type": "Question",
          "name": "What are the main benefits of cloud computing?",
          "acceptedAnswer": { "@type": "Answer", "text": "The main benefits are: Scalability (scale resources up or down without hardware investment), Cost Savings (pay-as-you-go eliminates upfront CapEx), Flexibility (access from anywhere on any device), Reliability (high uptime and redundancy from cloud providers), and Security (cloud providers invest heavily in security capabilities that most organisations cannot match internally)." }
        },
        {
          "@type": "Question",
          "name": "What are the main risks and challenges of cloud computing?",
          "acceptedAnswer": { "@type": "Answer", "text": "Key challenges include: Shared Responsibility (providers secure the infrastructure, but customers are responsible for their own data and applications), Compliance (data residency and access requirements can be complex in multi-region deployments), Vendor Lock-in (migrating between providers is costly), and Integration (connecting cloud systems with legacy on-premises applications requires specialist skills)." }
        }
      ]
    }
  ]
};

const CloudComputingFundamentals: React.FC = () => {
  return (
    <SimplePage
      title="Cloud Computing Fundamentals"
      subtitle="Understanding the model, service types, benefits, and challenges of modern cloud infrastructure."
      structuredData={SCHEMA}
    >
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">What is Cloud Computing?</h2>
          <p className="text-lg leading-relaxed">
            Cloud computing is a model of providing on-demand access to shared computing resources such as servers, storage, databases, software, and applications over the internet. It allows individuals and organizations to rent computing resources on a pay-as-you-go basis rather than investing in expensive on-premises hardware and infrastructure.
          </p>
          <p className="mt-4">
            The cloud computing model is based on the concept of <strong>virtualization</strong>, where a physical server is divided into multiple virtual servers, each running its own operating system and applications. These virtual servers can be rapidly provisioned and de-provisioned as needed, allowing for scalability and flexibility in resource allocation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Service Models: IaaS, PaaS, and SaaS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Server className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">IaaS</h3>
              <p className="text-sm">
                <strong>Infrastructure as a Service</strong> provides access to virtualized computing resources such as servers, storage, and networking. Customers have complete control over the operating systems and applications.
              </p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <Layers className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">PaaS</h3>
              <p className="text-sm">
                <strong>Platform as a Service</strong> provides a platform for developing, testing, and deploying applications without managing the underlying infrastructure. Developers can focus purely on writing code.
              </p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <RefreshCw className="w-10 h-10 text-secondary-dark dark:text-secondary mb-4" />
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">SaaS</h3>
              <p className="text-sm">
                <strong>Software as a Service</strong> provides access to applications hosted and managed by a third-party provider. Accessed via browser or mobile app, paying only for the software used.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Key Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex items-start">
              <Zap className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Scalability</h4>
                <p className="text-sm">Quickly scale resources up or down as needed without investing in new hardware.</p>
              </div>
            </div>
            <div className="flex items-start">
              <DollarSign className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Cost Savings</h4>
                <p className="text-sm">Eliminates expensive upfront hardware costs; pay only for the resources you actually use.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Globe className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Flexibility</h4>
                <p className="text-sm">Access computing resources from anywhere, at any time, and from any device.</p>
              </div>
            </div>
            <div className="flex items-start">
              <RefreshCw className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Reliability</h4>
                <p className="text-sm">High levels of uptime and redundancy ensure applications and data are always available.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Shield className="w-6 h-6 text-secondary-dark dark:text-secondary mr-4 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Security</h4>
                <p className="text-sm">Cloud providers invest heavily in security expertise and measures, often surpassing individual org capabilities.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Challenges and Risks</h2>
          <div className="space-y-4">
            <p>While the benefits are immense, organizations must navigate several hurdles:</p>
            <ul className="list-disc list-inside space-y-3">
              <li><strong>Shared Responsibility:</strong> While providers secure the infrastructure, customers are responsible for securing their own data and applications.</li>
              <li><strong>Compliance:</strong> Regulatory requirements regarding data residency and access can be complex to manage in a global cloud.</li>
              <li><strong>Vendor Lock-in:</strong> Moving data and applications between providers can be difficult and costly.</li>
              <li><strong>Integration:</strong> Connecting cloud-based systems with legacy on-premises applications requires specialized skills.</li>
            </ul>
          </div>
        </section>

        <section className="border-t border-slate-200 dark:border-slate-800 pt-8">
          <p className="italic">
            Overall, cloud computing has revolutionized the way organizations approach IT infrastructure and application development. However, organizations must carefully consider the benefits and risks before adopting it as part of their IT strategy.
          </p>
        </section>
      </div>
    </SimplePage>
  );
};

export default CloudComputingFundamentals;
