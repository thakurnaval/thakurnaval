import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  bg?: 'white' | 'gray' | 'navy';
}

const Section: React.FC<SectionProps> = ({ id, className = '', children, bg = 'white' }) => {
  const bgClasses = {
    white: 'bg-white dark:bg-slate-950',
    gray: 'bg-slate-50 dark:bg-slate-900',
    navy: 'bg-primary text-white', // Primary matches dark theme well
  };

  return (
    <section id={id} className={`py-16 md:py-24 transition-colors duration-300 ${bgClasses[bg]} ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default Section;