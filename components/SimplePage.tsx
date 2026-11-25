import React from 'react';
import Section from './Section';
import SEO from './SEO';
import { FollowBox } from './SocialLinks';

interface SimplePageProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  structuredData?: Record<string, any>;
  type?: 'website' | 'article';
  /** Show the "Follow Naval" social box after the content (default on). */
  follow?: boolean;
}

const SimplePage: React.FC<SimplePageProps> = ({ title, subtitle, children, structuredData, type = 'article', follow = true }) => {
  const seoTitle = `${title} | Naval Thakur`;
  const seoDesc = subtitle.length > 150 ? `${subtitle.substring(0, 150)}...` : subtitle;

  return (
    <>
      <SEO title={seoTitle} description={seoDesc} type={type} structuredData={structuredData} />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-slate-100 max-w-2xl">
            {subtitle}
          </p>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto text-slate-600 dark:text-slate-300 space-y-6 leading-relaxed">
          {children}
          {follow && <FollowBox placement="article-end" />}
        </div>
      </Section>
    </>
  );
};

export default SimplePage;