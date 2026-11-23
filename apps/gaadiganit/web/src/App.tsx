import { lazy, Suspense } from 'react';
import { NavLink, Route, Routes } from 'react-router';
import { useT } from './i18n/index.ts';
import Home from './pages/Home.tsx';

const QuickEstimate = lazy(() => import('./pages/QuickEstimate.tsx'));
const ScenarioPage = lazy(() => import('./pages/ScenarioPage.tsx'));
const Settings = lazy(() => import('./pages/Settings.tsx'));

export default function App() {
  const { t } = useT();
  const nav = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-brand-50 text-brand-800 dark:bg-brand-900/40 dark:text-brand-100' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'}`;

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
          <NavLink to="/" className="flex items-center gap-2" aria-label={t('app.name')}>
            <img src="/icon.svg" alt="" className="size-8" />
            <span>
              <span className="block text-lg font-bold leading-tight">{t('app.name')}</span>
              <span className="hidden text-xs text-slate-500 sm:block dark:text-slate-400">{t('app.tagline')}</span>
            </span>
          </NavLink>
          <nav className="flex items-center gap-1" aria-label="Main">
            <NavLink to="/" end className={nav}>{t('nav.home')}</NavLink>
            <NavLink to="/new" className={nav}>{t('nav.new')}</NavLink>
            <NavLink to="/settings" className={nav}>{t('nav.settings')}</NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<QuickEstimate />} />
            <Route path="/s/:id" element={<ScenarioPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <footer className="px-4 py-6 text-center text-xs text-slate-500 dark:text-slate-400">{t('footer.disclaimer')}</footer>
    </div>
  );
}
