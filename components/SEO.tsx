import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  type?: 'website' | 'article';
  structuredData?: Record<string, any>;
  image?: string;
}

const SITE_URL = 'https://nthakur.com';
const DEFAULT_IMAGE = `${SITE_URL}/assets/img/profile.jpg`;
const TWITTER_HANDLE = '@nthakur_dot_com';

const SEO: React.FC<SEOProps> = ({ title, description, type = 'website', structuredData, image }) => {
  const location = useLocation();
  const canonical = `${SITE_URL}${location.pathname}`;
  const ogImage = image || DEFAULT_IMAGE;

  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrVal] = selector.match(/\[(.+?)="(.+?)"\]/)!.slice(1);
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Core
    setMeta('meta[name="description"]', 'content', description);
    setLink('canonical', canonical);

    // Open Graph
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[property="og:type"]', 'content', type);
    setMeta('meta[property="og:image"]', 'content', ogImage);
    setMeta('meta[property="og:site_name"]', 'content', 'Naval Thakur');

    // Twitter Card
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:site"]', 'content', TWITTER_HANDLE);
    setMeta('meta[name="twitter:creator"]', 'content', TWITTER_HANDLE);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', ogImage);

    // JSON-LD structured data
    let script: HTMLScriptElement | null = null;
    if (structuredData) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.id = 'json-ld-schema';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      if (script && document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [title, description, type, canonical, ogImage, structuredData]);

  return null;
};

export default SEO;
