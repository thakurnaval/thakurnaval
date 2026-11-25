import React from 'react';
import { Link } from 'react-router-dom';

/** One-line consent notice shown under every form that collects personal data. */
const PrivacyNote: React.FC<{ className?: string; onDark?: boolean }> = ({ className = '', onDark = false }) => (
  <p className={`text-xs ${onDark ? 'text-slate-200' : 'text-slate-600 dark:text-slate-400'} mt-3 ${className}`}>
    By submitting, you agree that I can use these details to reply and send what you asked for.
    You can ask me to delete them at any time. See the{' '}
    <Link to="/privacy" className={`underline ${onDark ? 'hover:text-secondary' : 'hover:text-primary dark:hover:text-secondary'}`}>Privacy Policy</Link>.
  </p>
);

export default PrivacyNote;
