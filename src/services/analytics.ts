const GA_MEASUREMENT_ID = "G-2T36Y7QSN6";

/** localStorage key holding the visitor's analytics choice: 'granted' or 'denied'. */
export const CONSENT_KEY = "nthakur.consent";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    /** Loads gtag.js; defined in index.html, called once analytics is accepted. */
    __loadGA?: () => void;
  }
}

/** True only when the visitor has accepted analytics in the consent banner. */
export const analyticsAllowed = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(CONSENT_KEY) === "granted";
  } catch {
    return false;
  }
};

const send = (...args: any[]) => {
  if (analyticsAllowed() && typeof window.gtag === "function") window.gtag(...args);
};

export const initGA = () => {
  // Configured in index.html; gtag.js loads only after consent.
};

export const trackPageView = (path: string) => {
  send("config", GA_MEASUREMENT_ID, { page_path: path });
};

export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  send("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

/**
 * A lead was captured: guide unlock, assessment report, newsletter, contact form,
 * waitlist or premium-report interest. Uses GA4's recommended `generate_lead` event;
 * mark it as a key event in GA4 to count conversions.
 */
export const trackLead = (source: string, detail?: Record<string, string | number>) => {
  send("event", "generate_lead", { lead_source: source, ...detail });
};

/** A guide PDF or template was opened or downloaded. */
export const trackDownload = (name: string) => {
  send("event", "file_download", { file_name: name });
};
