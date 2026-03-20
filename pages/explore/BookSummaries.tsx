import React from 'react';
import SimplePage from '../../components/SimplePage';
import { BookOpen } from 'lucide-react';

const BookSummaries: React.FC = () => {
  return (
    <SimplePage 
      title="Book Summaries & Reading List" 
      subtitle="Curated notes from influential books in tech, leadership, and business."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {[
           { 
             title: "The Phoenix Project: A Novel About IT, DevOps, and Helping Your Business Win", 
             author: "Gene Kim, Kevin Behr, and George Spafford", 
             desc: "This book is a story of a fictional company that is struggling with IT problems, including late projects, poor quality, and low morale. The story follows an IT manager as he learns about the DevOps movement and applies its principles to transform his team and the company. The book provides an engaging and practical introduction to DevOps principles and practices, including continuous delivery, automation, and collaboration.",
             cover: "https://picsum.photos/seed/phoenix/200/300"
           },
           { 
             title: "Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation", 
             author: "Jez Humble and David Farley", 
             desc: "This book provides a comprehensive guide to continuous delivery, which is a key DevOps practice that enables teams to release software rapidly and reliably. The book covers the entire delivery pipeline, from version control to deployment, and provides practical advice and examples for implementing continuous delivery in your organization. The book also discusses the cultural, organizational, and technical challenges of continuous delivery and how to overcome them.",
             cover: "https://picsum.photos/seed/delivery/200/300"
           },
           { 
             title: "The DevOps Handbook: How to Create World-Class Agility, Reliability, and Security in Technology Organizations", 
             author: "Gene Kim, Jez Humble, Patrick Debois, and John Willis", 
             desc: "This book is a comprehensive guide to DevOps, covering principles, practices, and case studies from real-world organizations. The book covers topics such as continuous delivery, automation, monitoring, and culture change, and provides practical advice for implementing DevOps in your organization. The book also discusses the benefits of DevOps, including faster time to market, higher quality, and greater customer satisfaction.",
             cover: "https://picsum.photos/seed/handbook/200/300"
           },
           { 
             title: "Site Reliability Engineering: How Google Runs Production Systems", 
             author: "Betsy Beyer, Chris Jones, Jennifer Petoff, and Niall Richard Murphy", 
             desc: "This book is a collection of essays from Google's Site Reliability Engineering (SRE) team, which is responsible for ensuring the reliability and availability of Google's services. The book covers topics such as incident response, monitoring, automation, and capacity planning, and provides practical advice for running reliable and scalable systems. The book also discusses the SRE culture and the role of SRE in DevOps organizations.",
             cover: "https://picsum.photos/seed/sre/200/300"
           },
           { 
             title: "DevOps for Dummies", 
             author: "Emily Freeman", 
             desc: "This book is a beginner's guide to DevOps, covering basic concepts and practices in an accessible and engaging way. The book covers topics such as continuous integration, continuous delivery, infrastructure as code, and monitoring, and provides practical examples and advice for implementing DevOps in your organization. The book is a good starting point for anyone new to DevOps or looking to refresh their knowledge.",
             cover: "https://picsum.photos/seed/dummies/200/300"
           },
           { 
             title: "Effective DevOps: Building a Culture of Collaboration, Affinity, and Tooling at Scale", 
             author: "Jennifer Davis and Ryn Daniels", 
             desc: "This book focuses on the cultural and organizational aspects of DevOps, providing practical advice for building a collaborative and effective DevOps culture. The book covers topics such as communication, feedback, empathy, and team structure, and provides real-world examples and case studies. The book is a good resource for anyone looking to build a high-performing DevOps team or improve their team's collaboration and communication.",
             cover: "https://picsum.photos/seed/effective/200/300"
           },
           { 
             title: "Release It!: Design and Deploy Production-Ready Software", 
             author: "Michael T. Nygard", 
             desc: "This book is a guide to building and deploying production-ready software, covering topics such as reliability, scalability, and fault tolerance. The book provides practical advice for designing and testing systems that can handle the challenges of production environments, such as network failures, database",
             cover: "https://picsum.photos/seed/release/200/300"
           },
           { 
             title: "Accelerate: The Science of Lean Software and DevOps: Building and Scaling High Performing Technology Organizations", 
             author: "Nicole Forsgren, Jez Humble, and Gene Kim", 
             desc: "This book is based on a multi-year research study that investigates the relationship between DevOps practices and organizational performance. The book provides data-driven insights and practical advice for building and scaling high-performing technology organizations. The book covers topics such as continuous delivery, automation, culture change, and measurement, and provides guidance for applying DevOps principles in different organizational contexts.",
             cover: "https://picsum.photos/seed/accelerate/200/300"
           },
           { 
             title: "Docker Deep Dive", 
             author: "Nigel Poulton", 
             desc: "This book is a comprehensive guide to Docker, which is a popular containerization technology that is widely used in DevOps environments. The book covers topics such as container fundamentals, Docker architecture, networking, storage, and security, and provides practical examples and advice for using Docker in production environments. The book is a good resource for anyone looking to learn Docker or improve their Docker skills.",
             cover: "https://picsum.photos/seed/docker/200/300"
           },
           { 
             title: "Kubernetes: Up and Running: Dive into the Future of Infrastructure", 
             author: "Kelsey Hightower, Brendan Burns, and Joe Beda", 
             desc: "This book is a comprehensive guide to Kubernetes, which is a popular container orchestration platform that is widely used in DevOps environments. The book covers topics such as Kubernetes architecture, deployment, scaling, networking, and security, and provides practical examples and advice for using Kubernetes in production environments. The book is a good resource for anyone looking to learn Kubernetes or improve their Kubernetes skills.",
             cover: "https://picsum.photos/seed/k8s/200/300"
           },
           { 
             title: "The Site Reliability Workbook: Practical Ways to Implement SRE", 
             author: "Betsy Beyer, Niall Richard Murphy, David K. Rensin, Kent Kawahara, and Stephen Thorne", 
             desc: "A hands-on companion to the original SRE book, providing practical examples and concrete ways to implement SRE principles in various organizational contexts.",
             cover: "https://picsum.photos/seed/sre-workbook/200/300"
           },
           { 
             title: "Site Reliability Engineering for Managers: Building and Leading High-Performance Teams", 
             author: "Jennifer Petoff and Chris Jones", 
             desc: "Focuses on the leadership and organizational aspects of SRE, helping managers build and sustain high-performing reliability teams.",
             cover: "https://picsum.photos/seed/sre-mgr/200/300"
           },
           { 
             title: "Seeking SRE: Conversations About Running Production Systems at Scale", 
             author: "David N. Blank-Edelman", 
             desc: "A diverse collection of perspectives on SRE, exploring how different organizations adapt and apply reliability engineering to their unique challenges.",
             cover: "https://picsum.photos/seed/seeking-sre/200/300"
           },
           { 
             title: "Chaos Engineering: System Resiliency in Practice", 
             author: "Casey Rosenthal and Nora Jones", 
             desc: "The definitive guide to Chaos Engineering, explaining how to build resilient systems by proactively injecting failure to understand system behavior.",
             cover: "https://picsum.photos/seed/chaos/200/300"
           }
         ].map((book, i) => (
           <div key={i} className="flex flex-col md:flex-row gap-6 p-6 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-secondary transition-all bg-white dark:bg-slate-800 shadow-sm hover:shadow-md">
              <div className="flex-shrink-0 w-full md:w-32 h-48 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
                {book.cover ? (
                  <img 
                    src={book.cover} 
                    alt={`Cover of ${book.title}`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <BookOpen className="w-12 h-12 text-slate-300" />
                )}
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-primary dark:text-white mb-1 leading-tight">{book.title}</h3>
                <p className="text-sm font-medium text-secondary mb-3">by {book.author}</p>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{book.desc}</p>
              </div>
           </div>
         ))}
      </div>
    </SimplePage>
  );
};

export default BookSummaries;