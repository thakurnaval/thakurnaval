const GA_MEASUREMENT_ID = "G-2T36Y7QSN6";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const initGA = () => {
  // Already initialized in index.html
  console.log("GA4 Initialized via script tag");
};

export const trackPageView = (path: string) => {
  if (typeof window.gtag === "function") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }
};

export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
