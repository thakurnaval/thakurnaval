import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, TrendingUp, BrainCircuit, CheckCircle2, Terminal, Users, Lightbulb, Layers, GraduationCap, FileText, MessageSquare, Cpu } from 'lucide-react';
import Section from '../components/Section';
import NewsletterSignup from '../components/NewsletterSignup';
import SEO from '../components/SEO';
import { FEATURED_ARTICLES, RECENT_TALKS, PROFILE_IMAGE_URL } from '../constants';

const Home: React.FC = () => {
  const ARTICLE_IMAGES = [
    "1607799276041-8054e2dc6981", 
    "1555949963-ff9fe0c870eb", 
    "1551288049-bebda4e38f71", 
  ];

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Naval Thakur Portfolio",
    "url": "https://nthakur.com",
    "author": {
      "@type": "Person",
      "name": "Naval Thakur",
      "jobTitle": "DevOps & FinOps Coach"
    }
  };

  return (
    <>
      <SEO 
        title="Naval Thakur | DevOps, FinOps & GenAI Transformation Consultant"
        description="Naval Thakur provides enterprise-grade coaching in DevSecOps, FinOps, GenAI strategy, and System Architecture. Explore 18+ years of engineering leadership expertise."
        structuredData={homeSchema}
      />
      
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white pt-24 pb-24 md:pt-32 md:pb-32 overflow-hidden min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=60&auto=format&w=1920&fit=crop"
            alt="Abstract digital network representing cloud infrastructure and global DevOps connectivity" 
            className="w-full h-full object-cover opacity-70"
            // @ts-ignore
            fetchpriority="high"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/30"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full border border-slate-500 bg-slate-800/50 backdrop-blur-sm text-sm font-medium text-highlight">
                Technologist & Transformation Coach
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white shadow-sm">
                Naval Thakur
              </h1>
              <h2 className="text-xl md:text-2xl text-slate-100 font-medium leading-normal drop-shadow-md">
                DevOps <span className="text-highlight">•</span> SecOps <span className="text-highlight">•</span> FinOps <span className="text-highlight">•</span> GenAI <span className="text-highlight">•</span> Architecture
              </h2>
              <p className="text-lg text-slate-100 max-w-xl leading-relaxed drop-shadow-md">
                Empowering enterprises with 18+ years of expertise in <Link to="/devops/sre" className="hover:text-secondary underline decoration-secondary/30">Site Reliability Engineering</Link>, <Link to="/finops" className="hover:text-secondary underline decoration-secondary/30">FinOps leadership</Link>, and AIOps strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/contact?topic=Workshop / Training" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-md text-primary bg-secondary hover:bg-secondary-hover transition-all shadow-lg hover:shadow-secondary/25" aria-label="Book a talk or workshop with Naval">
                  Book a Talk / Workshop
                </Link>
                <Link to="/devops" className="inline-flex items-center justify-center px-6 py-3 border border-white/30 bg-white/10 backdrop-blur-sm text-base font-medium rounded-md text-white hover:bg-white/20 transition-all" aria-label="Explore DevOps expertise">
                  Explore Expertise
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <img
                  src={PROFILE_IMAGE_URL}
                  alt="Professional headshot of Naval Thakur, DevOps and FinOps Leader"
                  className="w-64 h-64 md:w-80 md:h-80 object-cover object-top rounded-full shadow-2xl border-2 border-highlight"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expertise Pillars */}
      <Section bg="gray">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl mb-4">Core Areas of Expertise</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">Driving holistic transformation across the software delivery lifecycle from <Link to="/architecture" className="text-primary dark:text-secondary hover:underline">Design</Link> to <Link to="/finops" className="text-primary dark:text-secondary hover:underline">Value Realization</Link>.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {[
            { title: 'DevOps', icon: Terminal, desc: 'Accelerating delivery with CI/CD and automation.', link: '/devops' },
            { title: 'SecOps', icon: ShieldCheck, desc: 'Embedding security into every phase of the pipeline.', link: '/secops' },
            { title: 'FinOps', icon: TrendingUp, desc: 'Optimizing cloud costs and maximizing business value.', link: '/finops' },
            { title: 'GenAI', icon: BrainCircuit, desc: 'Operationalizing AI for smarter, faster CloudOps.', link: '/genai' },
            { title: 'Architecture', icon: Layers, desc: 'Designing resilient, scalable, cloud-native systems.', link: '/architecture' },
          ].map((item) => (
            <Link key={item.title} to={item.link} className="group bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-700 hover:border-primary dark:hover:border-secondary transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
              <div className="w-12 h-12 bg-primary/5 dark:bg-slate-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/10 dark:group-hover:bg-secondary/20 transition-colors flex-shrink-0">
                <item.icon className="w-6 h-6 text-primary dark:text-slate-200 group-hover:text-primary dark:group-hover:text-secondary transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-secondary transition-colors">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm flex-grow">{item.desc}</p>
              <div className="flex items-center text-sm font-semibold text-primary dark:text-slate-300 group-hover:text-primary dark:group-hover:text-secondary mt-auto">
                Learn more <ArrowRight size={16} className="ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Why Work With Naval */}
      <Section bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Why Partner with Naval?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Naval brings a rare combination of technical depth in <Link to="/architecture/design-patterns" className="text-primary dark:text-secondary hover:underline">System Architecture</Link> and SRE, combined with strategic insight in <Link to="/finops/framework" className="text-primary dark:text-secondary hover:underline">FinOps Frameworks</Link>. He helps implement practical, scalable solutions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { text: 'End-to-end DevSecOps Transformations', icon: CheckCircle2 },
                { text: 'Cloud Cost Optimization (FinOps)', icon: CheckCircle2 },
                { text: 'Operationalizing GenAI for Ops', icon: CheckCircle2 },
                { text: 'Resilient System Architecture Design', icon: CheckCircle2 },
                { text: 'Leadership Coaching & Mentoring', icon: Users },
              ].map((prop, idx) => (
                <div key={idx} className="flex items-start">
                  <prop.icon className="w-5 h-5 text-primary dark:text-secondary mt-1 mr-3 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{prop.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link to="/about" className="text-primary dark:text-secondary font-semibold hover:text-primary/80 dark:hover:text-secondary-hover flex items-center">
                 More about Naval's background <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-secondary/10 rounded-full"></div>
            <div className="absolute bottom-0 left-0 -ml-4 -mb-4 w-32 h-32 bg-primary/5 rounded-full"></div>
            <div className="relative bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-lg">
              <div className="flex items-start space-x-4 mb-6">
                <Lightbulb className="w-8 h-8 text-primary dark:text-secondary" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">Thought Leadership</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Regular speaker at international conferences and author of <Link to="/articles" className="text-secondary hover:underline">technical deep-dives</Link>.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 mb-6">
                <Cpu className="w-8 h-8 text-primary dark:text-secondary" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">Technical & Strategic</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Able to bridge the gap between C-suite strategy and engineering execution.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Users className="w-8 h-8 text-primary dark:text-secondary" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">Community Builder</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Active mentor and coach for the next generation of DevOps engineers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Talks & Webinars Teaser */}
      <Section bg="gray">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Recent Talks & Webinars</h2>
            <p className="text-slate-600 dark:text-slate-400">Sharing knowledge with the global tech community via <Link to="/talks" className="text-secondary hover:underline">keynotes and workshops</Link>.</p>
          </div>
          <Link to="/talks" className="hidden md:flex items-center font-medium text-primary dark:text-secondary hover:text-primary/80 dark:hover:text-secondary-hover">
            View all talks <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RECENT_TALKS.map((talk, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="flex flex-wrap gap-2 mb-4">
                {talk.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded">{tag}</span>
                ))}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{talk.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow">{talk.description}</p>
              <div className="text-xs text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-4 mt-auto">
                Audience: {talk.audience} • {talk.duration}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Articles Teaser */}
      <Section bg="white">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Latest Insights</h2>
          <p className="text-slate-600 dark:text-slate-400">Deep dives into tools, culture, and methodology. Explore our <Link to="/articles" className="text-secondary hover:underline">article archives</Link>.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_ARTICLES.map((article, idx) => (
            <Link key={idx} to={article.link} className="group block">
               <div className="bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700">
                 <div className="h-48 bg-slate-200 dark:bg-slate-700 w-full object-cover relative">
                    <img 
                      src={`https://images.unsplash.com/photo-${ARTICLE_IMAGES[idx % ARTICLE_IMAGES.length]}?q=80&w=600&auto=format&fit=crop`}
                      alt={`Article cover for: ${article.title}`} 
                      className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 text-xs font-bold text-primary dark:text-white rounded shadow-sm">
                      {article.tag}
                    </div>
                 </div>
                 <div className="p-6">
                   <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                   <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3">{article.summary}</p>
                   <div className="mt-4 text-sm font-medium text-primary dark:text-primary flex items-center">
                     Read Article <ArrowRight size={14} className="ml-1" />
                   </div>
                 </div>
               </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Career Guidance Section */}
      <Section bg="gray">
        <div className="text-center max-w-3xl mx-auto mb-12">
           <div className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-primary dark:text-secondary text-xs font-bold uppercase tracking-wider mb-4">
             Giving Back
           </div>
           <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Career Guidance & Mentorship</h2>
           <p className="text-slate-600 dark:text-slate-400">
             I offer limited free slots to help aspiring engineers and architects navigate their <Link to="/devops/roadmap" className="text-secondary hover:underline">DevOps careers</Link>.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Mentoring */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center text-center">
             <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                <GraduationCap size={32} />
             </div>
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Free Mentoring</h3>
             <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow">
               1-on-1 guidance on career pathing, transitioning to Cloud/DevOps, or handling leadership challenges.
             </p>
             <Link to="/contact?topic=Mentorship" className="text-sm font-bold text-primary dark:text-blue-400 hover:underline">
               Request Mentoring &rarr;
             </Link>
          </div>

          {/* Resume Review */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center text-center">
             <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                <FileText size={32} />
             </div>
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Resume Review</h3>
             <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow">
               Constructive feedback on your CV to highlight your impact, skills, and readiness for your dream role.
             </p>
             <Link to="/contact?topic=Resume Review" className="text-sm font-bold text-primary dark:text-purple-400 hover:underline">
               Submit Resume &rarr;
             </Link>
          </div>

          {/* Interview Prep */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center text-center">
             <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6">
                <MessageSquare size={32} />
             </div>
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Interview Prep</h3>
             <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow">
               Mock interviews for <Link to="/architecture/system-design-process" className="text-secondary hover:underline">System Design</Link> or Behavioral rounds with actionable feedback.
             </p>
             <Link to="/contact?topic=Interview Prep" className="text-sm font-bold text-primary dark:text-teal-400 hover:underline">
               Schedule Mock Interview &rarr;
             </Link>
          </div>
        </div>
      </Section>

      {/* Maturity Assessment Callout */}
      <Section className="py-12 bg-slate-900 dark:bg-slate-950 border-y border-slate-800">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 shadow-2xl border border-slate-700 relative overflow-hidden">
           <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="text-white md:w-2/3">
               <h2 className="text-2xl md:text-3xl font-bold mb-4">Where do you stand?</h2>
               <p className="text-slate-100 text-lg mb-0">
                 Take the <Link to="/devops/assessment" className="text-secondary font-bold hover:underline">DevOps Maturity Assessment</Link>. A decision-tree style evaluation to identify bottlenecks.
               </p>
             </div>
             <div className="md:w-1/3 flex justify-center md:justify-end">
               <Link to="/devops/assessment" className="inline-block px-8 py-4 bg-secondary hover:bg-secondary-hover text-primary font-bold rounded-lg transition-colors shadow-lg">
                 Start Assessment
               </Link>
             </div>
           </div>
        </div>
      </Section>
      
      {/* Newsletter Signup */}
      <Section bg="white">
        <div className="container mx-auto px-4">
          <NewsletterSignup />
        </div>
      </Section>
    </>
  );
};

export default Home;