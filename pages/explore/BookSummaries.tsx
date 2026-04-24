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
             desc: "A story of a fictional company struggling with IT problems — late projects, poor quality, and low morale. The IT manager discovers the DevOps movement and transforms his team. An engaging, practical introduction to DevOps principles including continuous delivery, automation, and collaboration.",
             cover: "/assets/img/gallery/The-Phoenix-Project.webp"
           },
           {
             title: "Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation",
             author: "Jez Humble and David Farley",
             desc: "A comprehensive guide to continuous delivery — the key DevOps practice that enables teams to release software rapidly and reliably. Covers the entire delivery pipeline from version control to deployment, and discusses the cultural, organizational, and technical challenges of getting there.",
             cover: "/assets/img/gallery/Continuous-Delivery.jpeg"
           },
           {
             title: "The DevOps Handbook: How to Create World-Class Agility, Reliability, and Security in Technology Organizations",
             author: "Gene Kim, Jez Humble, Patrick Debois, and John Willis",
             desc: "A comprehensive guide to DevOps covering principles, practices, and real-world case studies. Topics include continuous delivery, automation, monitoring, and culture change — with practical advice for implementing DevOps and achieving faster time to market and higher quality.",
             cover: "/assets/img/gallery/The-DevOps-Handbook.jpg"
           },
           {
             title: "Site Reliability Engineering: How Google Runs Production Systems",
             author: "Betsy Beyer, Chris Jones, Jennifer Petoff, and Niall Richard Murphy",
             desc: "Essays from Google's SRE team covering incident response, monitoring, automation, and capacity planning. Practical advice for running reliable, scalable systems and an inside look at the SRE culture that underpins Google's infrastructure.",
             cover: "/assets/img/gallery/SRE.jpg"
           },
           {
             title: "DevOps for Dummies",
             author: "Emily Freeman",
             desc: "A beginner's guide to DevOps — continuous integration, continuous delivery, infrastructure as code, and monitoring — in an accessible and engaging way. A good starting point for anyone new to DevOps or looking to refresh the fundamentals.",
             cover: "/assets/img/gallery/devops-for-dummies.jpg"
           },
           {
             title: "Effective DevOps: Building a Culture of Collaboration, Affinity, and Tooling at Scale",
             author: "Jennifer Davis and Ryn Daniels",
             desc: "Focuses on the cultural and organizational side of DevOps — communication, feedback, empathy, and team structure. Real-world examples and case studies for building a high-performing DevOps culture.",
             cover: "/assets/img/gallery/Effective-DevOps.jpg"
           },
           {
             title: "Release It!: Design and Deploy Production-Ready Software",
             author: "Michael T. Nygard",
             desc: "A guide to building and deploying production-ready software covering reliability, scalability, and fault tolerance. Practical advice for designing systems that survive network failures, database problems, and the chaos of real production environments.",
             cover: "/assets/img/gallery/release-it.jpg"
           },
           {
             title: "Accelerate: The Science of Lean Software and DevOps",
             author: "Nicole Forsgren, Jez Humble, and Gene Kim",
             desc: "Based on multi-year research into DevOps practices and organizational performance. Provides data-driven insights and practical advice for building high-performing technology organizations — covering continuous delivery, automation, culture change, and measurement.",
             cover: "/assets/img/gallery/accelerate-devops.jpg"
           },
           {
             title: "Docker Deep Dive",
             author: "Nigel Poulton",
             desc: "A comprehensive guide to Docker covering container fundamentals, architecture, networking, storage, and security. Practical examples for using Docker in production environments.",
             cover: "/assets/img/gallery/docker-deep-dive.webp"
           },
           {
             title: "Kubernetes: Up and Running: Dive into the Future of Infrastructure",
             author: "Kelsey Hightower, Brendan Burns, and Joe Beda",
             desc: "A comprehensive guide to Kubernetes covering architecture, deployment, scaling, networking, and security. Practical examples for using Kubernetes in production — from the people who built it.",
             cover: "/assets/img/gallery/Kubernetes-UpandRunning.jpg"
           },
           {
             title: "The Site Reliability Workbook: Practical Ways to Implement SRE",
             author: "Betsy Beyer, Niall Richard Murphy, David K. Rensin, Kent Kawahara, and Stephen Thorne",
             desc: "A hands-on companion to the original SRE book, providing practical examples and concrete ways to implement SRE principles across different organizational contexts.",
             cover: "/assets/img/gallery/SRE-WorkBook.jpg"
           },
           {
             title: "Seeking SRE: Conversations About Running Production Systems at Scale",
             author: "David N. Blank-Edelman",
             desc: "A diverse collection of perspectives on SRE — exploring how different organizations adapt and apply reliability engineering to their unique challenges.",
             cover: "/assets/img/gallery/seeking-sre.webp"
           },
           {
             title: "Chaos Engineering: System Resiliency in Practice",
             author: "Casey Rosenthal and Nora Jones",
             desc: "The definitive guide to Chaos Engineering — building resilient systems by proactively injecting failure to understand how systems actually behave under stress.",
             cover: "/assets/img/gallery/chaos-engineering.jpg"
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
                <p className="text-sm font-medium text-secondary-dark dark:text-secondary mb-3">by {book.author}</p>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{book.desc}</p>
              </div>
           </div>
         ))}
      </div>
    </SimplePage>
  );
};

export default BookSummaries;