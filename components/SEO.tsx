import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  type?: 'website' | 'article';
  structuredData?: Record<string, any>;
  image?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, type = 'website', structuredData, image }) => {
  const location = useLocation();
  const siteUrl = 'https://nthakur.com';
  const fullUrl = `${siteUrl}${location.pathname}${location.hash}`;

  useEffect(() => {
    // Update Title
    document.title = title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Handle Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // Update Open Graph tags
    const updateMeta = (property: string, content: string, attrName: string = 'property') => {
      let element = document.querySelector(`meta[${attrName}="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('og:title', title);
    updateMeta('og:description', description);
    updateMeta('og:url', fullUrl);
    updateMeta('og:type', type);
    if (image) updateMeta('og:image', image);
    
    // Twitter Specifics
    updateMeta('twitter:card', 'summary_large_image', 'name');
    updateMeta('twitter:title', title, 'name');
    updateMeta('twitter:description', description, 'name');

    // Handle JSON-LD Structured Data
    let script: HTMLScriptElement | null = null;
    
    if (structuredData) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.id = 'json-ld-schema';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      if (script && document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };

  }, [title, description, type, location, structuredData, image, fullUrl]);

  return null;
};

export default SEO;