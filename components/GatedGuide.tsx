import React, { useState } from 'react';
import { CheckCircle2, Download, Lock, Mail, Unlock, Loader2, AlertCircle } from 'lucide-react';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx03K6mwLMtq6X5q8JIAHKQ4qSxCk9LEavNeO0IWo1jg9IxhzFoxvZM0DwKtgMegKDz1Q/exec';

/** Escape text for the printable HTML guides. */
export const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Open a printable HTML document in a new window and trigger the print dialog. */
export function openPrintable(html: string) {
  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(html.replace('</body>', '<script>setTimeout(() => window.print(), 400);</script></body>'));
  win.document.close();
}

interface Props {
  /** Small label above the title, e.g. "Free PDF · Playbook". */
  badge: string;
  badgeIcon?: React.ReactNode;
  title: string;
  intro: string;
  bullets: string[];
  /** Lead record sent to the Google Apps Script, e.g. "DevSecOps Playbook PDF Download". */
  topic: string;
  /** Text on the unlock button, e.g. "Download the Playbook". */
  cta: string;
  /** Heading after unlocking (default "Unlocked"). */
  readyTitle?: string;
  /** Shown after unlocking, e.g. "Your 6-page playbook is ready." */
  readyText: string;
  /** Opens the PDF (or reveals content) for this email. */
  onOpen: (email: string) => void;
  /** Label for the button shown after unlocking. */
  openLabel?: string;
  /** Called once the email is recorded, for pages that reveal content in place. */
  onUnlocked?: (email: string) => void;
  /** Tailwind gradient for the hero, e.g. "from-slate-950 via-rose-950 to-rose-900/40". */
  gradient: string;
  /** Accent colour family for buttons and icons: one of the Tailwind palette names used below. */
  accent: 'rose' | 'violet' | 'emerald' | 'teal' | 'blue';
}

const ACCENTS = {
  rose: { btn: 'bg-rose-700 hover:bg-rose-800', soft: 'bg-rose-100 dark:bg-rose-900/30', icon: 'text-rose-700 dark:text-rose-400', tick: 'text-rose-400', ring: 'focus:ring-rose-500', badge: 'border-rose-400/40 bg-rose-400/10 text-rose-300' },
  violet: { btn: 'bg-violet-700 hover:bg-violet-800', soft: 'bg-violet-100 dark:bg-violet-900/30', icon: 'text-violet-700 dark:text-violet-400', tick: 'text-violet-400', ring: 'focus:ring-violet-500', badge: 'border-violet-400/40 bg-violet-400/10 text-violet-300' },
  emerald: { btn: 'bg-emerald-700 hover:bg-emerald-800', soft: 'bg-emerald-100 dark:bg-emerald-900/30', icon: 'text-emerald-700 dark:text-emerald-400', tick: 'text-emerald-400', ring: 'focus:ring-emerald-500', badge: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300' },
  teal: { btn: 'bg-teal-700 hover:bg-teal-800', soft: 'bg-teal-100 dark:bg-teal-900/30', icon: 'text-teal-700 dark:text-teal-400', tick: 'text-teal-400', ring: 'focus:ring-teal-500', badge: 'border-teal-400/40 bg-teal-400/10 text-teal-300' },
  blue: { btn: 'bg-blue-700 hover:bg-blue-800', soft: 'bg-blue-100 dark:bg-blue-900/30', icon: 'text-blue-700 dark:text-blue-400', tick: 'text-blue-400', ring: 'focus:ring-blue-500', badge: 'border-blue-400/40 bg-blue-400/10 text-blue-300' },
};

/** Hero with an email gate, shared by the free guides. */
export const GatedGuideHero: React.FC<Props> = (p) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const a = ACCENTS[p.accent];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const form = new FormData();
      form.append('email', email);
      form.append('name', p.topic);
      form.append('topic', p.topic);
      form.append('message', `User requested: ${p.title}.`);
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: form, mode: 'no-cors' });
      setStatus('success');
      p.onUnlocked?.(email);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="relative bg-primary text-white py-24 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`}></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-bold mb-6 ${a.badge}`}>
              {p.badgeIcon} {p.badge}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{p.title}</h1>
            <p className="text-xl text-slate-200 leading-relaxed mb-6">{p.intro}</p>
            <div className="space-y-2">
              {p.bullets.map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 size={14} className={`${a.tick} shrink-0`} /> {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-200/20">
            {status === 'success' ? (
              <div className="text-center py-4">
                <div className={`w-14 h-14 ${a.soft} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Unlock className={`w-7 h-7 ${a.icon}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{p.readyTitle ?? 'Unlocked'}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">{p.readyText}</p>
                <button onClick={() => p.onOpen(email)} className={`w-full flex items-center justify-center gap-2 px-6 py-3 text-white font-bold rounded-xl transition-colors ${a.btn}`}>
                  <Download size={16} /> {p.openLabel ?? 'Open & Save PDF'}
                </button>
                {p.openLabel ? null : <p className="text-xs text-slate-400 mt-3">Use "Save as PDF" in the print dialog.</p>}
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 ${a.soft} rounded-lg flex items-center justify-center`}>
                    <Lock className={`w-5 h-5 ${a.icon}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Get it free</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Enter your email to unlock instant access</p>
                  </div>
                </div>
                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <label htmlFor="gate-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Work email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        id="gate-email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="you@company.com" disabled={status === 'submitting'}
                        className={`w-full pl-9 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${a.ring} focus:border-transparent text-sm disabled:opacity-50`}
                      />
                    </div>
                    {status === 'error' && (
                      <div className="flex items-center gap-1 mt-2 text-red-600 dark:text-red-400 text-xs">
                        <AlertCircle size={12} /> Something went wrong. Please try again.
                      </div>
                    )}
                  </div>
                  <button type="submit" disabled={status === 'submitting'} className={`w-full flex items-center justify-center gap-2 py-3 text-white font-bold rounded-xl transition-colors disabled:opacity-70 ${a.btn}`}>
                    {status === 'submitting' ? <><Loader2 className="animate-spin" size={16} /> Unlocking…</> : <><Download size={16} /> {p.cta}</>}
                  </button>
                </form>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 text-center">No spam. Unsubscribe from The CognitiveOps Brief anytime.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/** Shared print styles for the guides, parameterised by an accent colour. */
export const printStyles = (accent: string, dark: string) => `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; font-size: 11.5px; line-height: 1.55; }
  .page { padding: 44px 52px; page-break-after: always; }
  .cover { background: linear-gradient(135deg, #0f172a 0%, ${dark} 60%, ${accent} 100%); color: #fff; min-height: 100vh; padding: 80px 64px; display: flex; flex-direction: column; justify-content: center; page-break-after: always; }
  .tag { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; opacity: .8; font-weight: 700; margin-bottom: 22px; }
  .cover h1 { font-size: 48px; line-height: 1.05; font-weight: 800; margin-bottom: 18px; }
  .cover p { font-size: 17px; opacity: .9; max-width: 500px; }
  .rule { width: 60px; height: 4px; background: #fff; opacity: .6; margin: 40px 0; }
  .by { font-size: 13px; opacity: .85; }
  h2 { font-size: 23px; color: ${accent}; font-weight: 800; margin-bottom: 8px; }
  h3 { font-size: 14px; color: #0f172a; margin: 16px 0 6px; }
  p { color: #475569; margin-bottom: 9px; }
  table { width: 100%; border-collapse: collapse; margin: 8px 0 12px; }
  th { background: #0f172a; color: #fff; padding: 6px 8px; font-size: 10.5px; text-align: left; }
  td { padding: 6px 8px; border: 1px solid #e2e8f0; font-size: 10.5px; color: #475569; vertical-align: top; }
  td.k { font-weight: 700; color: #0f172a; background: #f8fafc; width: 22%; }
  .box { border: 1px solid #e2e8f0; border-left: 4px solid ${accent}; border-radius: 6px; padding: 9px 12px; margin: 8px 0; page-break-inside: avoid; }
  .box b { color: #0f172a; }
  ul { padding-left: 16px; } li { color: #475569; margin: 3px 0; font-size: 10.5px; }
  pre { background: #0f172a; color: #e2e8f0; padding: 10px 12px; border-radius: 6px; font-size: 9.5px; line-height: 1.45; white-space: pre-wrap; margin: 6px 0 12px; }
  .cta { margin-top: 22px; background: #0f172a; color: #fff; border-radius: 10px; padding: 16px; }
  .footer { margin-top: 26px; padding-top: 10px; border-top: 1px solid #e2e8f0; font-size: 9.5px; color: #94a3b8; display: flex; justify-content: space-between; }
`;
