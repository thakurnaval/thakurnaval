import React from 'react';
import SimplePage from '../../components/SimplePage';
import { BookOpen } from 'lucide-react';

const BookSummaries: React.FC = () => {
  return (
    <SimplePage 
      title="Book Summaries & Reading List" 
      subtitle="Curated notes from influential books in tech, leadership, and business."
    >
      <div className="space-y-6">
         {[
           { title: "The Phoenix Project", author: "Gene Kim et al.", desc: "A novel about IT, DevOps, and helping your business win." },
           { title: "Team Topologies", author: "Matthew Skelton & Manuel Pais", desc: "Organizing business and technology teams for fast flow." },
           { title: "Accelerate", author: "Nicole Forsgren et al.", desc: "The science of lean software and devops: building and scaling high performing technology organizations." },
           { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", desc: "The big ideas behind reliable, scalable, and maintainable systems." }
         ].map((book, i) => (
           <div key={i} className="flex gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-secondary transition-colors bg-white dark:bg-slate-800">
              <div className="flex-shrink-0">
                <BookOpen className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary dark:text-white">{book.title}</h3>
                <p className="text-xs text-slate-500 mb-2">by {book.author}</p>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{book.desc}</p>
              </div>
           </div>
         ))}
      </div>
    </SimplePage>
  );
};

export default BookSummaries;