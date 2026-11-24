import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CONSENT_KEY } from '../src/services/analytics';

/** Dispatch this window event to reopen the banner (footer "Cookie settings"). */
export const OPEN_CONSENT_EVENT = 'nthakur:open-consent';

type Choice = 'granted' | 'denied';

const readChoice = (): Choice | null => {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
};

const apply = (choice: Choice) => {
  try { window.localStorage.setItem(CONSENT_KEY, choice); } catch { /* storage unavailable */ }
  if (typeof window.gtag === 'function') window.gtag('consent', 'update', { analytics_storage: choice });
  if (choice === 'granted') {
    window.__loadGA?.();
    if (typeof window.gtag === 'function') window.gtag('config', 'G-GGLY5JH35C', { page_path: window.location.pathname });
  }
};

/**
 * Analytics consent banner. Google Analytics loads only after "Accept analytics"
 * (see the consent-mode snippet in index.html). Shown until the visitor chooses;
 * reopened from the footer's "Cookie settings" link or the Privacy page.
 */
const ConsentBanner: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (readChoice() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (choice: Choice) => {
    apply(choice);
    setOpen(false);
  };

  return (
    <div role="dialog" aria-label="Cookie and analytics consent"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6 pointer-events-none">
      <div className="pointer-events-auto max-w-3xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl p-5 sm:flex sm:items-center sm:gap-6">
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4 sm:mb-0">
          I use Google Analytics to see which pages and guides are useful. It sets cookies only if you accept.
          Forms and downloads work either way. <Link to="/privacy" className="underline text-primary dark:text-secondary">Privacy Policy</Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button type="button" onClick={() => choose('denied')}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-primary dark:hover:border-secondary">
            Decline
          </button>
          <button type="button" onClick={() => choose('granted')}
            className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 dark:bg-secondary dark:text-primary">
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
