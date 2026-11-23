import type { PlanBook, PillarPlan } from '../../components/PillarPlans';

const p = (now: string, actions: string[], next: string, resource?: [string, string]): PillarPlan =>
  ({ now, actions, next, resource: resource ? { label: resource[0], to: resource[1] } : undefined });

/** Per-pillar, per-layer next steps for the FinOps assessment (Crawl → Fly). */
export const FINOPS_PLANS: PlanBook = {
  'Visibility & Tagging': {
    1: p('You see one bill per account or subscription and cannot say which product or team spent what.',
      ['Agree a minimum tagging standard of four tags: owner, product, environment, cost centre.', 'Enforce it on new resources with policy (Azure Policy, AWS SCP/Tag Policies, GCP org policy), and report untagged spend weekly.'],
      'at least 80% of spend is allocated to an owner and a product.', ['Cost visibility', '/finops/cost-visibility']),
    2: p('Most spend is tagged; reports exist but are built by hand and arrive late.',
      ['Automate a daily cost dashboard per team from billing exports, with no spreadsheets in the loop.', 'Allocate shared costs (networking, platform, support) with a simple, published rule.'],
      'every team sees its own costs daily without asking finance.', ['Cost visibility', '/finops/cost-visibility']),
    3: p('Allocation is accurate and timely; costs are visible but not yet tied to business value.',
      ['Define one unit cost per product, such as cost per customer, transaction or GB processed.', 'Show unit cost next to the product\'s business KPIs in its regular review.'],
      'product decisions are discussed in unit-cost terms, not just total spend.', ['Unit economics', '/finops/unit-economics']),
    4: p('Unit economics are tracked and understood across products.',
      ['Add anomaly detection on unit cost, not just total spend, with alerts routed to owners.', 'Estimate the cost impact of architecture changes on the pull request.'],
      'make cost a design-time input: every significant spec carries a cost estimate.', ['AI-Native SDLC Field Guide', '/ai-sdlc/field-guide']),
  },
  'Accountability & Culture': {
    1: p('Cloud cost is "finance\'s problem"; engineers rarely see the bill.',
      ['Name a cost owner for every product and share a monthly one-page cost summary with them.', 'Run a 60-minute FinOps basics session for engineering leads.'],
      'every product has an owner who can explain its cost trend.', ['FinOps culture', '/finops/culture']),
    2: p('Owners exist, but cost conversations happen only when bills spike.',
      ['Hold a monthly cost review per product: trend, top three drivers, one action.', 'Celebrate savings publicly, credited to the team that made them.'],
      'teams act on cost without being asked, and savings are visible.', ['FinOps culture', '/finops/culture']),
    3: p('Teams manage their own cost; finance, engineering and product collaborate regularly.',
      ['Give teams budgets with forecasts they own, and review the variance together.', 'Include cost efficiency in engineering objectives alongside reliability and speed.'],
      'cost is one of the standard trade-offs teams weigh in planning.', ['30 Days of FinOps', '/finops/30-day-guide']),
    4: p('FinOps is part of how the organisation works, not a separate programme.',
      ['Train a FinOps champion in every engineering team; certification helps.', 'Share benchmarks and practices with peers in the FinOps community.'],
      'connect cost, carbon and value: report emissions per unit alongside cost per unit.', ['FinOps certification prep', '/finops/cert-prep']),
  },
  'Optimisation': {
    1: p('Resources are sized once and left running; idle and oversized resources are common.',
      ['Schedule non-production environments to shut down outside working hours.', 'Act on the top 10 rightsizing recommendations from your cloud provider\'s advisor.'],
      'obvious waste (idle, unattached, oversized) is cleaned up routinely.', ['Optimisation strategies', '/finops/optimization']),
    2: p('Waste is cleaned up periodically; commitments are bought ad hoc.',
      ['Build a commitment strategy (savings plans or reserved instances) based on steady-state usage, and review it monthly.', 'Track optimisation recommendations as tickets with owners and due dates.'],
      'commitment coverage and utilisation are measured and above 70%.', ['Optimisation strategies', '/finops/optimization']),
    3: p('Optimisation is continuous and commitments are well managed.',
      ['Move from resource tuning to architecture: storage tiering, autoscaling, managed services, spot for tolerant workloads.', 'Automate low-risk actions such as deleting unattached disks and old snapshots.'],
      'most savings now come from architecture and automation, not manual clean-ups.', ['Optimisation strategies', '/finops/optimization']),
    4: p('Optimisation is automated and engineered in.',
      ['Use ML-based commitment and rightsizing tools, with human approval for large changes.', 'Add cost and efficiency checks to the platform\'s golden paths so new services start optimised.'],
      'let agents propose optimisation PRs within guardrails you set.', ['CognitiveOps Model', '/cognitiveops']),
  },
  'Forecasting & Planning': {
    1: p('Budgets are set annually from last year\'s bill; forecasts are rare or absent.',
      ['Produce a simple monthly run-rate forecast per product from the last 90 days.', 'Agree budget alert thresholds (50/80/100%) with owners.'],
      'every product has a forecast and nobody is surprised by the monthly bill.', ['Forecasting', '/finops/forecasting']),
    2: p('Forecasts exist but are trend-based and miss business changes.',
      ['Add business drivers (users, transactions, launches) to the forecast for your top products.', 'Review forecast accuracy monthly and record why it missed.'],
      'forecasts land within 10–15% of actuals for the main products.', ['Forecasting', '/finops/forecasting']),
    3: p('Driver-based forecasts are accurate and used in planning.',
      ['Model scenarios for big decisions: a new region, a migration, a pricing change.', 'Tie commitments and capacity planning to the forecast, not to last month.'],
      'investment decisions include a cloud cost scenario as standard.', ['Unit economics', '/finops/unit-economics']),
    4: p('Forecasting is driver-based, continuous and trusted by finance.',
      ['Automate rolling forecasts with ML, keeping driver assumptions visible and editable.', 'Feed forecasts into pricing and margin discussions with product leadership.'],
      'forecast unit cost by feature so product can price new capabilities before building them.', ['Unit economics', '/finops/unit-economics']),
  },
};
