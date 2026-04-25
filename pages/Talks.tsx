import React from 'react';
import { Link } from 'react-router-dom';
import { Mic2, Download, ExternalLink, MapPin, Calendar, Users } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { RECENT_TALKS, SPEAKING_APPEARANCES, PROFILE_IMAGE_URL } from '../constants';

const Talks: React.FC = () => {
  const handleDownloadKit = () => {
    const content = `# Naval Thakur — Speaker Kit
*Updated April 2026 · nthakur.com · contact@nthakur.com*

---

## Profile

| | |
|---|---|
| **Role** | Practice Manager, SLB |
| **Location** | Pune, India |
| **Experience** | 18+ years enterprise cloud transformation |
| **Website** | https://nthakur.com |
| **Sessionize** | https://sessionize.com/nthakur/ |
| **LinkedIn** | https://linkedin.com/in/navalthakur |
| **Twitter/X** | @nthakur_dot_com |
| **GitHub** | https://github.com/thakurnaval |

---

## Short Bio (under 100 words)

Naval Thakur is a Practice Manager at SLB with 18+ years of enterprise cloud transformation experience across DevSecOps, FinOps, and Generative AI. He created the CognitiveOps Maturity Model — a four-layer framework helping organisations move from manual operations to AI-autonomous engineering. Naval holds 39+ professional certifications including FinOps Certified Practitioner, Google Cloud GenAI Leader, CKA, and AWS Solutions Architect. MBA Gold Medalist from MDI Gurgaon. Practitioner-first speaker — every session is built on real transformation lessons, not vendor narratives.

---

## Full Bio

Naval Thakur is an enterprise cloud and DevOps leader with 18+ years of hands-on experience transforming engineering organisations at scale. As Practice Manager at SLB, one of the world's largest energy technology companies, he has led DevSecOps, FinOps, and GenAI adoption programmes spanning global delivery teams, saving over $600K in cloud costs and accelerating delivery cycles across dozens of projects.

Naval is the creator of the CognitiveOps Maturity Model — a four-layer framework that maps an organisation's journey from manual, reactive operations through automation and intelligent tooling, to AI-autonomous engineering at scale. The model is freely available at nthakur.com and used to assess and guide engineering teams worldwide.

He holds 39+ professional certifications — including FinOps Certified Practitioner, Google Cloud GenAI Leader, Certified Kubernetes Administrator (CKA), AWS Solutions Architect, and TOGAF 9. MBA Gold Medalist from MDI Gurgaon. Naval speaks, trains, and writes at the intersection of cloud operations, financial accountability, and AI adoption — always practitioner-first.

---

## Sessions Catalogue

### 1. From DevOps to CognitiveOps: The Next Five Years
**Tags:** DevOps, AI, Future of Engineering, Leadership
**Format:** Keynote or conference talk (30–45 min)
**Audience:** Engineering leaders, architects, CTOs, DevOps practitioners

Most organisations are still celebrating the fact that they have a CI/CD pipeline. But the frontier has already moved. In this talk, Naval maps the next five years of enterprise engineering — from the automation we have now to the AI-orchestrated, self-healing, policy-driven systems that forward-thinking organisations are already piloting. Drawing on the CognitiveOps Maturity Model, Naval shows audiences exactly where they sit today, what Layer 4 looks like in practice, and the specific decisions that separate organisations that will lead this transition from those that will follow. Practitioner-first, no vendor slides, genuinely actionable.

---

### 2. GenAI in Enterprise Operations: Patterns That Actually Work
**Tags:** GenAI, AIOps, Enterprise AI, LLMOps, Productivity
**Format:** Conference talk or workshop (45–60 min)
**Audience:** Engineering managers, SREs, platform engineers, AI leads

The enterprise GenAI conversation has been dominated by demos and vendor promises. This talk cuts through it. Naval shares the patterns that have actually delivered measurable ROI in large engineering organisations — and the patterns that look great in a pilot but fail at scale. Topics: how to operationalise LLMs without unacceptable latency or cost, governance structures that prevent compliance risk, and how to measure GenAI ROI in a way that finance and leadership will accept.

---

### 3. Cloud Financial Intelligence: What FinOps Practitioners Get Wrong
**Tags:** FinOps, Cloud Cost, Cloud Financial Management
**Format:** Conference talk (30–45 min)
**Audience:** FinOps practitioners, engineering managers, finance leads, CTOs

An honest practitioner's post-mortem: the tagging strategies that created unmanageable overhead, the chargeback models that caused conflict rather than eliminating it, and the forecasting approaches that didn't survive a product launch. Naval shares what he has learned from the failures alongside the patterns that actually moved the needle — and the things the FinOps Foundation curriculum doesn't always tell you.

---

### 4. Achieving Enterprise-wide Agility: Beyond the Technology Stack
**Tags:** Agile, Transformation, Culture, Leadership, Change Management
**Format:** Keynote or conference talk (45–60 min)
**Audience:** Engineering directors, transformation leads, senior leadership

Most enterprise agile transformations fail not because teams lack skills, but because the organisation's structure, incentives, and culture contradict agile principles at every level above the team. Naval maps the specific structural and cultural blockers that prevent enterprise agility from spreading beyond pilot teams, and the interventions that have actually worked.

---

### 5. Infrastructure as Code with Azure Pipelines: Terraform + SaltStack in Production
**Tags:** IaC, Terraform, Azure Pipelines, DevOps, Cloud Infrastructure
**Format:** Technical talk or workshop (45–75 min)
**Audience:** DevOps engineers, platform engineers, cloud architects, SREs

Hard-won lessons from running Terraform and SaltStack deployments through Azure Pipelines at enterprise scale — drift detection strategies, state management approaches that don't create operational risk, and pipeline design decisions that separate maintainable IaC from slowly accumulating technical debt. Includes practical patterns you can apply immediately.

---

### 6. The 7 Cs of DevOps: A Framework That Actually Sticks
**Tags:** DevOps, Continuous Delivery, CI/CD, Platform Engineering
**Format:** Conference talk or workshop (45–60 min)
**Audience:** DevOps practitioners, engineering managers, developers, SREs

Naval's 7 Cs framework — Continuous Integration, Delivery, Deployment, Quality, Compliance, Monitoring, and Feedback — gives engineering teams a structured lens for diagnosing gaps and sequencing improvements. This talk shows how to use it to identify your single highest-leverage next step, regardless of where your team currently sits on the maturity curve.

---

### 7. Seven Habits of Highly Effective DevOps Teams
**Tags:** DevOps, Culture, Team Effectiveness, Engineering Excellence
**Format:** Conference talk (30–45 min)
**Audience:** Engineering managers, DevOps practitioners, team leads

The difference between high-performing and perpetually-firefighting DevOps teams is rarely the tools they use. Naval distils the seven habits that consistently separate effective teams — behavioural and cultural habits, not tooling choices — meaning they are available to every team regardless of stack or budget.

---

### 8. Building Trust Economies: Blockchain, Smart Contracts & DApps on Azure
**Tags:** Blockchain, Smart Contracts, DApps, Azure, Web3
**Format:** Conference talk (45–60 min)
**Audience:** Architects, developers, enterprise innovation leads

An honest assessment of where distributed ledger technology actually delivers enterprise value. Naval built and presented blockchain solutions on Azure at Global Azure Bootcamp and APGI. Covers governance models for smart contract lifecycle management, the trust assumptions DApps actually require, and the use cases where blockchain's tamper-evidence properties are genuinely valuable versus where a traditional database serves better.

---

## Selected Past Appearances

| Event | Topic | Year | Type |
|-------|-------|------|------|
| Software Engineering Bootcamp, Pune | Agile, DevOps, Architecture & Coding Practices | 2024 | Workshop |
| FinOps Foundation Community | Cloud Financial Management & Tagging Strategy | 2022–2025 | Webinar |
| SLB Cloud Computing SIG | GenAI Adoption in Enterprise Engineering | 2022–2023 | Webinar |
| SLB Cloud Computing SIG | Cloud Cost Optimisation & FinOps Practices | 2022–2023 | Webinar |
| Pune DevCon 2019 | Infrastructure as Code with Azure Pipelines | 2019 | Conference |
| Global Azure Bootcamp 2019 | Building Trust Economies using Blockchain Apps on Azure | 2019 | Conference |
| APGI 2019 | Achieving Enterprise-wide Agility using Technology Stack | 2019 | Conference |
| Microsoft DevCon Pune | DevOps @ Microsoft — Tools & Practices | 2019 | Conference |

---

## Speaker Requirements

- **AV:** Clicker, HDMI/USB-C adaptor, lapel mic preferred for keynotes
- **Slides:** Shared 5 business days before event
- **Remote:** Available for virtual events (Zoom, Teams, Google Meet)
- **Travel:** Available for on-site India events; international by arrangement
- **Lead time:** 4–6 weeks for new talks; existing sessions available with 2 weeks notice

---

## Contact

**Email:** contact@nthakur.com
**Website:** https://nthakur.com/work-with-me
**Sessionize:** https://sessionize.com/nthakur/
`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Naval_Thakur_Speaker_Kit.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEO 
        title="Talks & Webinars | Naval Thakur"
        description="Keynote speaker on DevOps culture, Cloud Native Security, and FinOps strategies. Watch recent talks and download speaker kit."
      />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Talks & Webinars</h1>
          <p className="text-xl text-slate-100 max-w-2xl">
            Keynotes, workshops, and technical deep-dives for conferences and corporate events.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-6 flex items-center">
                <Mic2 className="mr-3 text-secondary-dark dark:text-secondary" /> Speaking Topics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {RECENT_TALKS.map((talk, idx) => (
                  <div key={idx} className="flex flex-col bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {talk.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded uppercase tracking-wider">{tag}</span>
                        ))}
                      </div>
                      <h3 className="text-lg font-bold text-primary dark:text-white mb-2 group-hover:text-secondary-dark dark:group-hover:text-secondary transition-colors leading-snug">
                        {talk.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-grow line-clamp-3">
                        {talk.description}
                      </p>
                      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex flex-wrap gap-3">
                          {talk.audience && <span><strong className="text-slate-700 dark:text-slate-300">Audience:</strong> {talk.audience}</span>}
                          {talk.duration && <span><strong className="text-slate-700 dark:text-slate-300">Duration:</strong> {talk.duration}</span>}
                        </div>
                        {talk.link && (
                          <Link
                            to={talk.link}
                            className="shrink-0 flex items-center gap-1 font-bold text-secondary-dark dark:text-secondary hover:underline"
                          >
                            Read more <ExternalLink size={12} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past appearances */}
            <div>
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-6 flex items-center">
                <Calendar className="mr-3 text-secondary-dark dark:text-secondary" /> Past Appearances
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SPEAKING_APPEARANCES.map((appearance, idx) => (
                  <div key={idx} className="flex flex-col bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-all">
                    {appearance.photoUrl && (
                      <div className="h-36 overflow-hidden shrink-0">
                        <img
                          src={appearance.photoUrl}
                          alt={`${appearance.event} — ${appearance.topic}`}
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded">
                          {appearance.type}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{appearance.year}</span>
                      </div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm leading-snug">{appearance.event}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 flex-grow">{appearance.topic}</p>
                      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center text-xs text-slate-400">
                            <MapPin size={11} className="mr-1 shrink-0" /> {appearance.location}
                          </div>
                          {appearance.audience && (
                            <div className="flex items-center text-xs text-slate-400">
                              <Users size={11} className="mr-1 shrink-0" /> {appearance.audience}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 shrink-0">
                          {appearance.flyerUrl && (
                            <a
                              href={appearance.flyerUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-400 hover:text-secondary transition-colors"
                              aria-label="View event flier"
                              title="View event flier"
                            >
                              <ExternalLink size={15} />
                            </a>
                          )}
                          {appearance.recordingUrl && (
                            <a
                              href={appearance.recordingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-secondary-dark dark:text-secondary hover:text-secondary/80"
                              aria-label="Watch recording"
                              title="Watch recording"
                            >
                              <ExternalLink size={15} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
             <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 sticky top-24">
               <div className="w-24 h-24 mx-auto bg-slate-200 dark:bg-slate-700 rounded-full mb-4 overflow-hidden">
                 <img 
                   src={PROFILE_IMAGE_URL}
                   alt="Speaker Profile" 
                   className="w-full h-full object-cover object-top" 
                   width="100"
                   height="100"
                 />
               </div>
               <h3 className="text-xl font-bold text-center text-primary dark:text-white mb-2">Speaker Bio</h3>
               <p className="text-sm text-center text-slate-600 dark:text-slate-400 mb-6">
                 Naval is an engaging speaker who translates complex technical concepts into actionable business strategies.
               </p>
               
               <button
                onClick={handleDownloadKit}
                className="w-full flex items-center justify-center py-2 border border-slate-300 dark:border-slate-600 rounded text-slate-700 dark:text-slate-300 font-medium hover:bg-white dark:hover:bg-slate-700 hover:text-primary dark:hover:text-white transition-colors mb-3"
               >
                 <Download size={16} className="mr-2" /> Download Speaker Kit
               </button>

               <a
                 href="https://sessionize.com/nthakur/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-full flex items-center justify-center py-2 border border-slate-300 dark:border-slate-600 rounded text-slate-700 dark:text-slate-300 font-medium hover:bg-white dark:hover:bg-slate-700 hover:text-primary dark:hover:text-white transition-colors mb-4"
               >
                 <ExternalLink size={16} className="mr-2" /> View on Sessionize
               </a>

               <div className="text-center">
                 <p className="text-xs text-slate-400 uppercase tracking-wide font-bold mb-2">Book for your event</p>
                 <Link to="/contact?topic=Speaking Engagement" className="block w-full py-3 bg-secondary text-primary font-bold rounded hover:bg-secondary-hover transition-colors">
                   Contact Naval
                 </Link>
               </div>
             </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Talks;