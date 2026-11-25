import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, ChevronDown, Search, ArrowRight, FileText, Hash } from 'lucide-react';
import { NAV_ITEMS, FEATURED_ARTICLES, LOGO_URL } from '../constants';
import { NavItem } from '../types';
import { trackPageView, trackEvent } from '../src/services/analytics';
import ConsentBanner, { OPEN_CONSENT_EVENT } from './ConsentBanner';
import { SocialIcons } from './SocialLinks';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Theme: unknown (null) until mounted, so the first client render matches the prerendered
  // HTML and React can hydrate it instead of re-rendering the page.
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    setTheme(saved === 'dark' || saved === 'light'
      ? saved
      : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }, []);

  // Apply Theme
  useEffect(() => {
    if (!theme) return;
    window.document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    trackEvent('Theme', 'Toggle', next);
  };

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    window.scrollTo(0, 0);
    trackPageView(location.pathname);
  }, [location]);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSearchQuery('');
    }
    
    // Keyboard shortcut (Cmd/Ctrl + K) to open search
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Flatten Navigation Items for Search
  const searchableItems = useMemo(() => {
    const items: { label: string; path: string; type: 'Page' | 'Article'; category?: string }[] = [];

    const traverse = (nodes: NavItem[], category?: string) => {
      nodes.forEach(node => {
        if (node.path) {
          items.push({ 
            label: node.label, 
            path: node.path, 
            type: 'Page',
            category: category || 'General' 
          });
        }
        if (node.children) {
          traverse(node.children, node.label);
        }
      });
    };

    traverse(NAV_ITEMS);

    FEATURED_ARTICLES.forEach(article => {
      items.push({
        label: article.title,
        path: article.link,
        type: 'Article',
        category: article.tag
      });
    });

    return items;
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return searchableItems.filter(item => 
      item.label.toLowerCase().includes(query) || 
      item.category?.toLowerCase().includes(query)
    ).slice(0, 8);
  }, [searchQuery, searchableItems]);

  // Ignore a trailing slash (/devops/sre/ is the same page as /devops/sre).
  const currentPath = location.pathname.length > 1 ? location.pathname.replace(/\/+$/, '') : location.pathname;
  const isActive = (path?: string) => !!path && currentPath === path;

  const isChildActive = (children?: NavItem[]) => {
    return children?.some(child => isActive(child.path));
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* Search Overlay/Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsSearchOpen(false)}
          ></div>
          
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex items-center px-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input
                ref={searchInputRef}
                type="text"
                className="flex-grow bg-transparent text-lg text-slate-900 dark:text-white placeholder-slate-400 outline-none"
                placeholder="Search pages, articles, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-medium uppercase px-2"
              >
                ESC
              </button>
            </div>
            
            <div className="max-h-[60vh] overflow-y-auto">
              {searchQuery === '' ? (
                <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                  <p className="text-sm">Type to search across pages and engineering insights.</p>
                </div>
              ) : filteredItems.length > 0 ? (
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Results</div>
                  {filteredItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        navigate(item.path);
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 flex items-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                    >
                      <div className={`p-2 rounded-lg mr-4 ${item.type === 'Article' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                        {item.type === 'Article' ? <FileText size={18} /> : <Hash size={18} />}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-secondary">
                          {item.label}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center">
                          {item.type} • {item.category}
                        </div>
                      </div>
                      <ArrowRight size={16} className="ml-auto text-slate-300 group-hover:text-primary dark:group-hover:text-secondary opacity-0 group-hover:opacity-100 transition-all" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                  <p>No results found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={LOGO_URL}
                alt="Naval Thakur logo"
                className="w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:rotate-12"
                width="48"
                height="48"
              />
              <span className="text-2xl font-bold tracking-tight text-primary dark:text-white group-hover:text-primary/80 transition-colors">Naval Thakur</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center space-x-6">
              <nav className="flex space-x-6">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label} className="relative group">
                    {item.path ? (
                      <Link
                        to={item.path}
                        className={`flex items-center text-sm font-medium transition-colors hover:text-primary dark:hover:text-white focus:outline-none ${
                          isActive(item.path) || isChildActive(item.children) 
                            ? 'text-primary dark:text-white font-bold' 
                            : 'text-primary dark:text-slate-300'
                        }`}
                      >
                        {item.label}
                        {item.children && (
                          <ChevronDown size={14} className="ml-1 group-hover:rotate-180 transition-transform duration-200" />
                        )}
                      </Link>
                    ) : (
                      <button
                        className={`flex items-center text-sm font-medium transition-colors hover:text-primary dark:hover:text-white focus:outline-none ${
                          isChildActive(item.children) ? 'text-primary dark:text-white font-bold' : 'text-primary dark:text-slate-300'
                        }`}
                      >
                        {item.label}
                        {item.children && (
                           <ChevronDown size={14} className="ml-1 group-hover:rotate-180 transition-transform duration-200" />
                        )}
                      </button>
                    )}
                    
                    {item.children && (
                      <div className="absolute top-full left-0 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden py-2 max-h-[70vh] overflow-y-auto">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.path || '#'}
                              className={`block px-4 py-2 text-sm transition-colors ${
                                isActive(child.path)
                                  ? 'text-primary dark:text-white bg-slate-100 dark:bg-slate-800 font-bold'
                                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-white'
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              
              <div className="flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-700">
                <SocialIcons variant="header" only={['LinkedIn', 'X', 'YouTube']} size={18} placement="header" className="flex items-center gap-1 pr-2 mr-1 border-r border-slate-200 dark:border-slate-700" />
                <button
                  onClick={() => {
                    setIsSearchOpen(true);
                    trackEvent('Search', 'Open');
                  }}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-primary dark:text-slate-300 transition-colors"
                  aria-label="Open global site search"
                >
                  <Search size={20} />
                </button>

                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-primary dark:text-slate-300 transition-colors"
                  aria-label="Toggle between dark and light mode"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="xl:hidden flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-primary dark:text-slate-300 transition-colors"
                aria-label="Open search"
              >
                <Search size={20} />
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-primary dark:text-slate-300 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                className="p-2 rounded-md text-primary dark:text-slate-300 hover:text-primary dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {isMenuOpen && (
          <div className="xl:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-lg py-4 px-4 flex flex-col space-y-2 animate-in slide-in-from-top-2 max-h-[80vh] overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <React.Fragment key={item.label}>
                {item.children ? (
                  <div className="space-y-1">
                     {item.path ? (
                        <Link 
                          to={item.path}
                          className="block px-4 py-2 text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider hover:text-primary dark:hover:text-white"
                        >
                          {item.label}
                        </Link>
                     ) : (
                        <div className="px-4 py-2 text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          {item.label}
                        </div>
                     )}
                    {item.children.map(child => (
                      <Link
                        key={child.label}
                        to={child.path || '#'}
                        className={`block pl-8 pr-4 py-2 rounded-md text-base font-medium ${
                          isActive(child.path)
                            ? 'bg-slate-100 dark:bg-slate-800 text-primary dark:text-white'
                            : 'text-primary dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-white'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    to={item.path || '#'}
                    className={`block px-4 py-2 rounded-md text-base font-medium ${
                      isActive(item.path)
                        ? 'bg-slate-100 dark:bg-slate-800 text-primary dark:text-white'
                        : 'text-primary dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
            <div className="px-4 pt-4 mt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Follow Naval</div>
              <SocialIcons variant="header" placement="mobile-menu" className="flex items-center gap-2" />
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>
      <ConsentBanner />

      <footer className="bg-primary text-slate-200 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                 <img
                   src={LOGO_URL}
                   alt="Naval Thakur logo"
                   className="w-8 h-8"
                   width="32"
                   height="32"
                   loading="lazy"
                 />
                 <h3 className="text-white text-lg font-bold">Naval Thakur</h3>
              </div>
              <p className="text-sm leading-relaxed mb-6 text-slate-200">
                Helping organizations build resilient, secure, and cost-effective cloud ecosystems through DevOps, SecOps, FinOps, and GenAI coaching.
              </p>
              <SocialIcons variant="dark" placement="footer" className="flex space-x-4" />
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Expertise</h4>
              <ul className="space-y-2 text-sm text-slate-200">
                <li><Link to="/devops" className="hover:text-secondary transition-colors">DevOps Transformation</Link></li>
                <li><Link to="/secops" className="hover:text-secondary transition-colors">SecOps Implementation</Link></li>
                <li><Link to="/finops" className="hover:text-secondary transition-colors">FinOps & Cost Opt.</Link></li>
                <li><Link to="/genai" className="hover:text-secondary transition-colors">GenAI Operations</Link></li>
                <li><Link to="/architecture" className="hover:text-secondary transition-colors">System Architecture</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-200">
                <li><Link to="/assessments" className="hover:text-secondary transition-colors">Maturity Assessments</Link></li>
                <li><Link to="/newsletter" className="hover:text-secondary transition-colors">Newsletter</Link></li>
                <li><Link to="/devopsism" className="hover:text-secondary transition-colors">DevOpsism (book)</Link></li>
                <li><Link to="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link></li>
                <li><button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))} className="hover:text-secondary transition-colors">Cookie settings</button></li>
                <li><Link to="/about" className="hover:text-secondary transition-colors">About Naval</Link></li>
                <li><Link to="/projects" className="hover:text-secondary transition-colors">Projects</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-200">
                <li><Link to="/cognitiveops" className="hover:text-secondary transition-colors">The CognitiveOps Model</Link></li>
                <li><Link to="/articles" className="hover:text-secondary transition-colors">Articles & Blog</Link></li>
                <li><Link to="/talks" className="hover:text-secondary transition-colors">Speaking</Link></li>
                <li><Link to="/case-studies" className="hover:text-secondary transition-colors">Case Studies</Link></li>
                <li><Link to="/work-with-me" className="hover:text-secondary transition-colors">Work With Me</Link></li>
                <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex justify-center items-center text-xs text-slate-200 text-center">
            <p>
              &copy; {new Date().getFullYear()} <a href="https://nthakur.com" className="hover:text-secondary transition-colors">Naval Thakur</a> - All Rights reserved | Designed for Engineering Excellence | Hand-Crafted in India
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;