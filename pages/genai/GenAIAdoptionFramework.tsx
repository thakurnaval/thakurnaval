import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import Section from '../../components/Section';
import SEO from '../../components/SEO';
import { GatedGuideHero, esc, openPrintable, printStyles } from '../../components/GatedGuide';

const PAGE_URL = 'https://nthakur.com/genai/adoption-framework';

const STAGES = [
  { name: 'Explore', aim: 'Make AI safe to try.', do: ['Approved enterprise tool with data protection', 'One-page acceptable-use policy', 'Hands-on sessions; find champions'], exit: 'Most staff have used the sanctioned tool on real work.' },
  { name: 'Experiment', aim: 'Prove value on a few use cases.', do: ['3–5 pilots with a baseline and a business owner', 'Success criteria agreed before starting', 'Risk tier assigned per use case'], exit: 'Each pilot ends with a measured go/no-go decision.' },
  { name: 'Embed', aim: 'Put the winners into production.', do: ['Shared platform: retrieval, evals, logging, cost tracking', 'Path to production with security review and support model', 'Workflows redesigned, not just tasks sped up'], exit: 'Two or more use cases in production with measured benefit.' },
  { name: 'Scale', aim: 'Make AI a repeatable capability.', do: ['Portfolio management of value, cost and risk', 'Technical guardrails; agents with tiered autonomy', 'AI fluency in roles and onboarding'], exit: 'New use cases launch on the platform in weeks.' },
  { name: 'Lead', aim: 'Compete on AI.', do: ['AI-native products and services', 'Continuous monitoring for drift, abuse and quality', 'Regulatory alignment (EU AI Act, ISO/IEC 42001)'], exit: 'Products exist that would not be possible without AI.' },
];

const DIMENSIONS = [
  ['Strategy & value', 'Which outcomes AI should move, and how you will know.'],
  ['Data & platform', 'Governed, AI-ready data and a shared platform for models, retrieval and evaluation.'],
  ['People & skills', 'Fluency for everyone, depth for builders, champions in every function.'],
  ['Governance & risk', 'Policy, risk tiering and controls proportionate to impact.'],
  ['Operating model', 'Who decides, who builds, who supports: centre of excellence to hub-and-spoke.'],
  ['Measurement', 'Baselines, value, cost and quality per use case, reported like any investment.'],
];

const SCORING = [
  ['Value', 'Hours saved, revenue, risk reduced, customer impact', '1 = marginal · 5 = material to a business KPI'],
  ['Feasibility', 'Data available, process clear, integration effort', '1 = major unknowns · 5 = ready now'],
  ['Risk', 'Customer-facing? Regulated data? Automated decisions?', '1 = high · 5 = low (internal, human in the loop)'],
  ['Reuse', 'Will the components serve other use cases?', '1 = one-off · 5 = platform building block'],
];

const RISK_TIERS = [
  ['Tier 1 · Low', 'Internal productivity, human reviews every output (drafting, summarising).', 'Approved tool, usage policy.'],
  ['Tier 2 · Medium', 'Internal decisions or customer-facing with human review (support drafts, code).', 'Use-case review, logging, evaluation set, named owner.'],
  ['Tier 3 · High', 'Customer-facing without review, regulated data, or automated decisions.', 'Red-teaming, technical guardrails, monitoring, sign-off by risk and legal.'],
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'GenAI Adoption Framework for Enterprise Teams — Free PDF',
  description: 'A five-stage framework for adopting generative AI across an enterprise: dimensions, use-case scoring, risk tiers, operating model and a 90-day plan.',
  author: { '@type': 'Person', name: 'Naval Thakur', url: 'https://nthakur.com/about' },
  url: PAGE_URL,
};

function openFramework(email: string) {
  const footer = (n: number) => `<div class="footer"><span>GenAI Adoption Framework · nthakur.com · © Naval Thakur 2026</span><span>Page ${n}</span></div>`;
  openPrintable(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>GenAI Adoption Framework — Naval Thakur</title><style>${printStyles('#6d28d9', '#2e1065')}</style></head><body>
<div class="cover"><div class="tag">Framework · Generative AI</div><h1>The GenAI<br>Adoption Framework</h1><p>For enterprise teams: from scattered experiments to a governed capability that delivers measured value.</p><div class="rule"></div><div class="by">By <strong>Naval Thakur</strong> · nthakur.com</div><div class="by" style="margin-top:8px">Prepared for: <strong>${esc(email)}</strong></div></div>
<div class="page"><h2>Why adoption stalls</h2>
<p>Most organisations are not short of AI ideas. They stall between the pilot and production: pilots without baselines cannot prove value, governance arrives late and blocks launches, and every team rebuilds the same plumbing. This framework gives you five stages to move through and six dimensions to keep in balance.</p>
<h3>Five stages</h3><table><tr><th>Stage</th><th>Aim</th><th>Key moves</th><th>You are ready to move on when…</th></tr>
${STAGES.map(s => `<tr><td class="k">${esc(s.name)}</td><td>${esc(s.aim)}</td><td><ul>${s.do.map(d => `<li>${esc(d)}</li>`).join('')}</ul></td><td>${esc(s.exit)}</td></tr>`).join('')}</table>
<h3>Six dimensions to keep in balance</h3><table>${DIMENSIONS.map(([d, t]) => `<tr><td class="k">${esc(d)}</td><td>${esc(t)}</td></tr>`).join('')}</table>
<p>Progress is limited by your weakest dimension. A strong platform without governance cannot launch; strong governance without skills has nothing to govern.</p>${footer(2)}</div>
<div class="page"><h2>Choosing use cases</h2>
<p>Score each candidate 1–5 on four criteria. Start with high-value, high-feasibility, low-risk use cases that build reusable components.</p>
<table><tr><th>Criterion</th><th>Questions</th><th>Scale</th></tr>${SCORING.map(([c, q, s]) => `<tr><td class="k">${esc(c)}</td><td>${esc(q)}</td><td>${esc(s)}</td></tr>`).join('')}</table>
<div class="box"><b>Priority score</b> = Value × Feasibility × Risk × Reuse (max 625). Treat anything under 80 as a "not yet", and anything over 250 as a strong first-wave candidate.</div>
<h3>Every pilot needs</h3><ul><li>A named business owner and a baseline measured before you start.</li><li>Success criteria and a decision date.</li><li>An evaluation set of 30–50 real examples with expected outputs.</li><li>A risk tier, set before data is touched.</li></ul>
<h3>Risk tiers</h3><table><tr><th>Tier</th><th>Typical use</th><th>Minimum controls</th></tr>${RISK_TIERS.map(([t, u, c]) => `<tr><td class="k">${esc(t)}</td><td>${esc(u)}</td><td>${esc(c)}</td></tr>`).join('')}</table>${footer(3)}</div>
<div class="page"><h2>Operating model</h2>
<div class="box"><b>Centre of excellence (Explore → Experiment).</b> A small central team sets policy, provides the approved tools and runs the first pilots with business owners.</div>
<div class="box"><b>Hub and spoke (Embed → Scale).</b> The hub owns the platform, guardrails and evaluation standards; spokes in each function own use cases and value. Champions connect the two.</div>
<div class="box"><b>Federated (Lead).</b> AI is part of every product and function; the hub becomes a platform team and a governance function.</div>
<h3>Measuring value</h3><ul><li><b>Efficiency:</b> hours saved, cycle time, cost per transaction, against the baseline.</li><li><b>Quality:</b> evaluation pass rate, error rate, customer satisfaction.</li><li><b>Adoption:</b> weekly active users of each use case, not just licences issued.</li><li><b>Cost:</b> model and platform cost per use case and per unit of work.</li><li><b>Risk:</b> incidents, policy violations and red-team findings by tier.</li></ul>
<h3>AI in software delivery</h3><p>Engineering is usually the fastest place to see value. Plan-first coding agents, AI first-pass code review and agent-driven test generation can change delivery speed materially, provided guardrails and review gates come first. The AI-Native SDLC Field Guide (nthakur.com/ai-sdlc/field-guide) covers this in depth.</p>${footer(4)}</div>
<div class="page"><h2>Your first 90 days</h2>
<div class="box"><b>Days 1–30 · Safe to try.</b><ul><li>Approved enterprise AI tool and a one-page usage policy.</li><li>Inventory current (including shadow) AI use.</li><li>Training sessions; recruit 10 champions across functions.</li><li>Long-list use cases and score them.</li></ul></div>
<div class="box"><b>Days 31–60 · Prove value.</b><ul><li>Run three pilots with baselines, owners and success criteria.</li><li>Lightweight use-case review with risk tiers.</li><li>Start the shared platform: retrieval, logging, evaluation, cost tracking.</li></ul></div>
<div class="box"><b>Days 61–90 · Decide and scale.</b><ul><li>Go/no-go on each pilot with measured results.</li><li>Take one or two winners to production on the platform.</li><li>Report value, cost and risk to leadership; fund the next wave.</li></ul></div>
<div class="cta"><div style="font-size:9.5px;letter-spacing:2px;text-transform:uppercase;color:#c4b5fd;font-weight:700">Next step</div><div style="font-size:13px;font-weight:700;margin:6px 0">Score your GenAI readiness</div><div style="font-size:11px;color:#ede9fe">Take the free GenAI Readiness Assessment at nthakur.com/genai/assessment for a pillar-by-pillar plan, or book a session at nthakur.com/work-with-me.</div></div>${footer(5)}</div>
</body></html>`);
}

const GenAIAdoptionFramework: React.FC = () => (
  <>
    <SEO title="GenAI Adoption Framework for Enterprise Teams — Free PDF | Naval Thakur"
      description="Five stages from Explore to Lead, six dimensions to balance, a use-case scoring model, risk tiers, an operating model and a 90-day plan for adopting generative AI. Free PDF."
      structuredData={SCHEMA} />
    <GatedGuideHero
      badge="Free PDF · Framework" badgeIcon={<Sparkles size={14} />}
      title="The GenAI Adoption Framework"
      intro="From scattered experiments to a governed capability that delivers measured value. Built for enterprise teams that are past the hype and stuck between pilot and production."
      bullets={['Five stages: Explore → Experiment → Embed → Scale → Lead', 'Six dimensions to keep in balance', 'Use-case scoring model and risk tiers', 'Operating model and value metrics', '90-day plan']}
      topic="GenAI Adoption Framework PDF Download" cta="Download the Framework" readyText="Your 5-page framework is ready."
      onOpen={openFramework} gradient="from-slate-950 via-violet-950 to-violet-900/40" accent="violet" />

    <Section bg="white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 text-center">Five stages</h2>
        <p className="text-slate-600 dark:text-slate-400 text-center mb-8">Each stage has an exit signal, so you know when you are ready to move on.</p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {STAGES.map((s, i) => (
            <div key={s.name} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <div className="text-xs font-black text-violet-600 dark:text-violet-400 mb-1">0{i + 1}</div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">{s.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{s.aim}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{s.exit}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>

    <Section bg="gray">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">Six dimensions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DIMENSIONS.map(([d, t]) => (
            <div key={d} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">{d}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{t}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/genai/assessment" className="inline-flex items-center gap-2 px-7 py-3 bg-violet-700 text-white font-bold rounded-xl hover:bg-violet-800 transition-colors">
            Take the GenAI Readiness Assessment <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </Section>
  </>
);

export default GenAIAdoptionFramework;
