import React from 'react';
import { Linkedin, Twitter, Youtube, Github, type LucideIcon } from 'lucide-react';
import { SOCIAL_LINKS, type SocialName } from '../constants';
import { trackEvent } from '../src/services/analytics';

const ICONS: Record<SocialName, LucideIcon> = {
  LinkedIn: Linkedin,
  X: Twitter,
  YouTube: Youtube,
  GitHub: Github,
};

const STYLES = {
  /** Site header: quiet icons next to search and theme. */
  header: 'p-2 rounded-full text-primary dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors',
  /** Dark backgrounds: footer and home hero. */
  dark: 'p-2 bg-slate-800 text-slate-200 rounded-full hover:bg-secondary hover:text-primary transition-colors',
  /** Light cards, e.g. the follow box at the end of an article. */
  light: 'p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full text-primary dark:text-slate-200 hover:border-primary dark:hover:border-secondary hover:text-primary dark:hover:text-secondary transition-colors',
};

interface SocialIconsProps {
  variant?: keyof typeof STYLES;
  /** Show only these networks, in this order. Defaults to all. */
  only?: SocialName[];
  size?: number;
  /** Where the click happened, sent with the analytics event. */
  placement: string;
  className?: string;
}

/** Row of social profile icons. Every placement uses the same list from constants.ts. */
export const SocialIcons: React.FC<SocialIconsProps> = ({ variant = 'dark', only, size = 20, placement, className = 'flex items-center gap-3' }) => {
  const links = only ? only.map(n => SOCIAL_LINKS.find(l => l.name === n)!) : SOCIAL_LINKS;
  return (
    <div className={className}>
      {links.map(({ name, url, label }) => {
        const Icon = ICONS[name];
        return (
          <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} title={name}
            className={STYLES[variant]} onClick={() => trackEvent('Social', 'Click', `${name} (${placement})`)}>
            <Icon size={size} />
          </a>
        );
      })}
    </div>
  );
};

/** "Follow along" box for the end of articles and topic pages. */
export const FollowBox: React.FC<{ placement: string }> = ({ placement }) => (
  <aside aria-label="Follow Naval" className="not-prose mt-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
    <div>
      <p className="font-bold text-slate-900 dark:text-white">Found this useful?</p>
      <p className="text-sm text-slate-600 dark:text-slate-400">Follow Naval for practical notes on DevOps, FinOps, SecOps and GenAI.</p>
    </div>
    <SocialIcons variant="light" placement={placement} className="flex items-center gap-2 flex-shrink-0" />
  </aside>
);
