import type { TopicContent } from '../../components/TopicArticle';

const parent = { label: 'FinOps', to: '/finops' };
const mm = (anchor: string, label: string) => ({ label: `Mental model: ${label}`, to: `/explore/mental-models#${anchor}` });
const assess = { label: 'FinOps Maturity Assessment', to: '/finops/assessment' };
const thirtyDays = { label: '30 Days of FinOps (free guide)', to: '/finops/30-day-guide' };

export const FINOPS_TOPICS: Record<string, TopicContent> = {
  framework: {
    path: '/finops/framework',
    title: 'The FinOps Framework',
    subtitle: 'The operating model for the cloud: shared accountability for cost across engineering, finance and product.',
    description: 'The FinOps Framework explained: principles, the Inform, Optimise and Operate lifecycle, personas, maturity stages and how to start a FinOps practice.',
    parent,
    intro: [
      'In the cloud, every engineer can spend money with a line of code. That speed is the point of the cloud, but it breaks the old model where procurement approved spending months in advance. FinOps is the operating model that replaces it: engineering, finance and product working together, with near real-time data, to make good trade-offs between speed, cost and quality.',
      'The FinOps Foundation maintains the framework and the community around it. It is not a tool or a team; it is a set of principles, practices and roles that organisations adapt to their own context.',
    ],
    sections: [
      {
        heading: 'The principles',
        body: ['The framework rests on a handful of principles that are worth putting in front of every team.'],
        terms: [
          ['Teams collaborate', 'Finance, engineering and product work together, with shared goals and language.'],
          ['Business value drives decisions', 'Cost is judged against value, usually through unit economics, not in isolation.'],
          ['Everyone takes ownership', 'Engineers own the cost of what they build, just as they own its performance and reliability.'],
          ['Data is accessible and timely', 'Cost data is available to the people who make decisions, close to real time.'],
          ['A central team enables', 'A FinOps practice sets standards, negotiates rates and helps teams, but doesn\'t do everything for them.'],
          ['Take advantage of the variable cost model', 'Pay for what you use, and design to make use of that flexibility.'],
        ],
      },
      {
        heading: 'The lifecycle: Inform, Optimise, Operate',
        body: [
          'FinOps work moves through three phases, repeatedly. Inform gives teams visibility: allocated costs, budgets, forecasts and unit metrics. Optimise identifies and acts on savings: rightsizing, removing waste, and better rates through commitments. Operate builds the processes that keep it going: governance, automation, policies and regular reviews.',
          'Teams are often in different phases for different capabilities, and that\'s fine. The cycle is continuous, not a project with an end date.',
        ],
      },
      {
        heading: 'Maturity: Crawl, Walk, Run',
        body: [
          'The framework describes maturity for each capability as Crawl, Walk and Run. Crawl means the basics exist, with limited coverage and manual effort. Walk means processes are understood and widely adopted. Run means the capability is automated, measured and embedded in how teams work.',
          'Run is not always the goal. Invest in reaching Run where it creates the most value, and accept Walk elsewhere.',
        ],
      },
      {
        heading: 'Personas and roles',
        body: [
          'FinOps involves many roles: FinOps practitioners, engineering leaders and engineers, finance and procurement, product owners and executives. Each needs different information. Engineers need cost by service and the effect of their changes; finance needs accurate forecasts and allocation; executives need unit economics and trends.',
        ],
      },
      {
        heading: 'FinOps beyond the public cloud',
        body: [
          'The framework now covers more than cloud infrastructure: SaaS licences, data platforms, and AI services, where GPU capacity and token-based pricing can grow quickly and unpredictably. The same principles apply. Make the cost visible, give teams ownership, measure cost against value, and optimise continuously.',
        ],
      },
    ],
    practice: [
      'Name an executive sponsor and a FinOps lead, and form a small cross-functional group.',
      'Agree a tagging and allocation standard, and give every team a view of its own costs.',
      'Pick two or three quick optimisation wins to build momentum.',
      'Set up a monthly cost review per product with engineering, finance and product.',
      'Define one unit metric for your most important product.',
      'Assess maturity per capability and plan the next steps for the weakest.',
    ],
    mistakes: [
      'Treating FinOps as a cost-cutting project rather than an ongoing practice.',
      'Making the central team do all the optimisation instead of enabling teams.',
      'Focusing on total spend without connecting it to business value.',
      'Copying another company\'s framework without adapting it to your context.',
    ],
    measures: [
      'Share of spend allocated to an owner.',
      'Forecast accuracy against actuals.',
      'Savings realised, and commitment coverage and utilisation.',
      'Unit cost trends for key products.',
    ],
    related: [assess, thirtyDays, { label: 'FinOps Certification Prep', to: '/finops/cert-prep' }, mm('tragedy-of-the-commons', 'Tragedy of the Commons'), mm('incentives', 'Incentives'), mm('kaizen', 'Kaizen')],
  },

  'cost-visibility': {
    path: '/finops/cost-visibility',
    title: 'Cost Visibility and Allocation',
    subtitle: 'You can\'t optimise what you can\'t see: tagging, allocation and showback that teams actually use.',
    description: 'How to make cloud costs visible: tagging standards, allocation of shared costs, showback and chargeback, dashboards for each audience, and anomaly detection.',
    parent,
    intro: [
      'Most cloud cost problems start with visibility. When the bill is one large number per account, nobody can see which product, team or feature is driving it, so nobody can act. Visibility turns the bill into information that the right people see at the right time.',
      'It is also the foundation for everything else in FinOps. Forecasting, optimisation and unit economics all depend on knowing who spent what, and why.',
    ],
    sections: [
      {
        heading: 'A tagging standard',
        body: [
          'Tags (labels in some clouds) attach business meaning to resources. A small, enforced standard beats a long, optional one. Four tags cover most needs.',
        ],
        terms: [
          ['Owner', 'The team accountable for the resource, for example team-payments. Who do we contact?'],
          ['Product or application', 'The system it belongs to, for example checkout-service.'],
          ['Environment', 'Production, staging or development. Is it critical?'],
          ['Cost centre', 'Who pays, for finance and accounting purposes.'],
        ],
      },
      {
        heading: 'Enforcing tags',
        body: [
          'Tagging by hand doesn\'t last. Apply tags in infrastructure-as-code templates, enforce them with policy (Azure Policy, AWS tag policies and SCPs, GCP organisation policy), and report untagged spend every week. Some costs can\'t be tagged at all, such as support plans or shared networking; handle those with allocation rules.',
        ],
      },
      {
        heading: 'Allocating shared costs',
        body: [
          'Platform services, networking, security tooling and support are shared. Agree a simple, published rule for splitting them: evenly, by usage, or by share of direct cost. The exact rule matters less than everyone understanding and accepting it.',
          'Kubernetes clusters need extra work, because many teams share the same nodes. Tools such as OpenCost or the cloud providers\' own cost allocation for containers split costs by namespace or label.',
        ],
      },
      {
        heading: 'Showback, chargeback and dashboards',
        body: [
          'Showback reports costs to teams without moving money; chargeback bills them internally. Most organisations start with showback, which changes behaviour without the accounting overhead.',
          'Different audiences need different views: engineers want daily cost by service and the effect of recent changes; product owners want cost per feature or customer; finance wants allocation and forecasts; executives want trends and unit economics.',
        ],
      },
      {
        heading: 'Anomaly detection',
        body: [
          'Daily anomaly detection catches runaway costs, such as a misconfigured autoscaler, a forgotten load test or an expensive AI workload, within a day rather than at month end. Route alerts to the owning team, not just to a central FinOps inbox.',
        ],
      },
      {
        heading: "Visibility for AI and SaaS spend",
        body: [
          "AI services and SaaS licences often sit outside the cloud bill, on separate invoices or credit cards. Bring them into the same view: tag AI API keys and projects by team, track token or GPU usage per product, and record SaaS licences with an owner and a renewal date.",
          "The aim is one picture of technology spend that teams recognise as theirs, rather than several partial ones that never add up.",
        ],
      },
    ],
    practice: [
      'Agree a four-tag standard and publish it.',
      'Add the tags to all infrastructure-as-code modules and templates.',
      'Enforce tags on new resources with policy, and report untagged spend weekly.',
      'Agree and publish a rule for shared costs.',
      'Give every team a daily dashboard of its own costs.',
      'Turn on anomaly detection and route alerts to owners.',
    ],
    mistakes: [
      'A tagging standard with twenty tags that nobody follows.',
      'Reports that arrive a month late and are built by hand.',
      'Allocating shared costs with a complex formula nobody understands.',
      'Anomaly alerts that only a central team ever sees.',
    ],
    measures: [
      'Share of spend allocated to an owner (aim for 80–90% or more).',
      'Time from spend to visibility (aim for daily).',
      'Number of teams actively using their dashboards.',
      'Time to detect and resolve cost anomalies.',
    ],
    related: [{ label: 'FinOps Cost Review Toolkit', to: '/explore/toolkits/finops-cost-review' }, assess, thirtyDays, { label: 'Terraform & Bicep templates (with tag policy)', to: '/architecture/iac-templates' }, mm('the-map-is-not-the-territory', 'The Map Is Not the Territory'), mm('externalities', 'Externalities'), mm('boiling-frog-symbol', 'Boiling Frog')],
  },

  'unit-economics': {
    path: '/finops/unit-economics',
    title: 'Unit Economics',
    subtitle: 'Moving from total cost to cost per customer, transaction or outcome.',
    description: 'Cloud unit economics explained: choosing a unit metric, calculating it, healthy and unhealthy growth, using unit cost in decisions, and unit economics for AI.',
    parent,
    intro: [
      'A rising cloud bill isn\'t necessarily bad news. If your customer base doubled, your bill should go up. The question is whether you are spending efficiently relative to the value you create. Unit economics answers that by measuring cost per unit of business value: per customer, per order, per transaction, per gigabyte processed.',
      'It is also the bridge between engineering and the business. "Our cost per order fell from 4 pence to 3" means something to everyone in the room.',
    ],
    sections: [
      {
        heading: 'Healthy and unhealthy growth',
        body: ['Comparing total spend with unit cost tells you how you are scaling.'],
        terms: [
          ['Healthy growth', 'Total spend is up, but cost per customer is flat or down. You are scaling efficiently.'],
          ['Unhealthy growth', 'Total spend is up and cost per customer is up too. Economies of scale are working against you.'],
          ['Efficiency gain', 'Total spend is flat while volume grows. Optimisation is paying off.'],
        ],
      },
      {
        heading: 'Choosing a unit metric',
        body: [
          'A good unit metric reflects what customers pay for or value, is measurable from your own data, and changes when the product\'s cost efficiency changes. Start with one metric per product: cost per active customer for a SaaS product, cost per order for e-commerce, cost per thousand API calls for a platform.',
          'Avoid perfection at the start. A reasonable metric you review every month beats a perfect one you never finish defining.',
        ],
      },
      {
        heading: 'Calculating it',
        body: [
          'You need two numbers: the cost allocated to a product (which depends on good tagging and allocation) and the business volume from product analytics or billing data. Divide one by the other, track it monthly, and show it next to the product\'s business KPIs.',
          'Include shared costs in a consistent way, so improvements in shared platforms show up in every product\'s unit cost.',
        ],
      },
      {
        heading: 'Using unit cost in decisions',
        body: [
          'Unit cost becomes powerful when it shapes decisions: pricing new features, choosing architectures, deciding whether to optimise or grow. A feature that doubles unit cost might still be worth it, if it increases revenue per customer by more.',
          'Set targets for unit cost rather than total spend. That gives teams freedom to grow while keeping efficiency in view.',
        ],
      },
      {
        heading: 'Unit economics for AI',
        body: [
          'AI features have very visible unit costs: tokens per request, GPU time per inference, cost per conversation. Track them from the first prototype. Choices such as model size, caching, prompt length and retrieval design can change unit cost by an order of magnitude, often without any loss in quality.',
        ],
      },
      {
        heading: "Common unit metrics by business type",
        body: [
          "SaaS products usually measure cost per active customer or per seat. E-commerce uses cost per order or per session. Data platforms use cost per gigabyte processed or per query. Internal platforms use cost per deployment, per build minute or per service hosted.",
          "Whatever you choose, document how it is calculated, so the number means the same thing every month and to every audience.",
        ],
      },
    ],
    practice: [
      'Pick one product and agree a unit metric with its product owner.',
      'Make sure that product\'s costs are fully allocated, including a fair share of shared costs.',
      'Calculate the unit cost for the last six months to see the trend.',
      'Add it to the product\'s regular business review.',
      'Set a unit-cost target alongside growth targets.',
      'Repeat for the next most important product.',
    ],
    mistakes: [
      'Choosing a unit that customers don\'t care about, such as cost per server.',
      'Excluding shared costs, so unit cost looks better than it is.',
      'Reporting unit cost without explaining what changed it.',
      'Waiting for perfect allocation before starting.',
    ],
    measures: [
      'Unit cost per product, monthly, with the trend.',
      'Share of products with a defined unit metric.',
      'Decisions where unit cost was explicitly considered.',
      'Unit cost of AI features per request or conversation.',
    ],
    related: [{ label: 'FinOps Cost Review Toolkit', to: '/explore/toolkits/finops-cost-review' }, assess, { label: 'Cost Visibility and Allocation', to: '/finops/cost-visibility' }, { label: 'Forecasting', to: '/finops/forecasting' }, mm('economies-of-scale', 'Economies of Scale'), mm('proxy', 'Proxy'), mm('return-on-investment', 'Return on Investment')],
  },

  optimization: {
    path: '/finops/optimization',
    title: 'Cloud Cost Optimisation',
    subtitle: 'Reducing waste and paying less for what you use, continuously rather than in one-off clean-ups.',
    description: 'Cloud cost optimisation strategies: rightsizing, removing idle resources, scheduling, storage tiering, commitments, spot capacity, architecture choices and automation.',
    parent,
    intro: [
      'Cloud optimisation has two levers: use less (usage optimisation) and pay less for what you use (rate optimisation). Most organisations start with obvious waste, then move to commitments, and eventually to architecture, which is where the largest and most durable savings usually come from.',
      'The aim is not the lowest possible bill. It is the best value: spending where it creates value for customers, and nowhere else.',
    ],
    sections: [
      {
        heading: 'Usage optimisation: turn off the lights',
        body: ['Start with waste, which is common and easy to remove.'],
        terms: [
          ['Rightsizing', 'Moving to smaller instance types or database tiers when utilisation is consistently low.'],
          ['Idle and orphaned resources', 'Unattached disks, idle load balancers, old snapshots and forgotten test environments.'],
          ['Scheduling', 'Turning off development and test environments outside working hours, often saving around two thirds of their cost.'],
          ['Storage tiering', 'Moving infrequently accessed data to cheaper tiers, with lifecycle policies doing it automatically.'],
        ],
      },
      {
        heading: 'Rate optimisation: pay less',
        body: [
          'Commitments such as savings plans, reserved instances and committed-use discounts give large discounts for predictable usage. Base them on steady-state usage, review coverage and utilisation monthly, and stagger expiry dates to keep flexibility.',
          'Spot or preemptible capacity offers deep discounts for workloads that can tolerate interruption, such as batch jobs, CI runners and some data processing.',
        ],
      },
      {
        heading: 'Architecture: the biggest lever',
        body: [
          'Design choices often matter more than any discount: autoscaling instead of fixed capacity, serverless or scale-to-zero services for spiky workloads, managed services instead of self-run clusters, caching to reduce repeated work, and data placement that avoids expensive transfer between regions.',
          'Include cost in design reviews and specs, so efficiency is built in rather than retrofitted.',
        ],
      },
      {
        heading: 'Making it continuous',
        body: [
          'One-off clean-ups decay within months. Make optimisation routine: weekly or monthly reviews of recommendations, tracked as work items with owners, and automation for the safe, repetitive parts such as deleting unattached disks or scheduling non-production environments.',
          'Celebrate savings publicly and credit the teams that made them. It turns cost into a shared goal rather than a finance complaint.',
        ],
      },
      {
        heading: 'Optimising AI workloads',
        body: [
          'AI workloads have their own levers: choosing the smallest model that meets quality targets, caching responses, trimming prompts, batching requests, and using reserved or spot GPU capacity for training and batch inference. Measure quality alongside cost, so savings don\'t quietly degrade the product.',
        ],
      },
      {
        heading: "Who does what",
        body: [
          "A central FinOps team is best placed to handle rate optimisation: negotiating with providers, buying and managing commitments, and spotting organisation-wide patterns. Engineering teams are best placed to handle usage and architecture: rightsizing, scheduling and design choices for their own services.",
          "Make the split explicit, so nobody assumes the other side is taking care of it.",
        ],
      },
      {
        heading: "Prioritising opportunities",
        body: [
          "Rank opportunities by savings, effort and risk. Quick, safe wins such as idle resources and scheduling build momentum; larger architectural changes need a business case and a plan. Revisit the list every month, because the biggest opportunities change as you act on them.",
        ],
      },
    ],
    practice: [
      'Schedule non-production environments to stop outside working hours.',
      'Clean up idle and orphaned resources, then automate the clean-up.',
      'Act on the top ten rightsizing recommendations from your provider.',
      'Build a commitment plan from steady-state usage and review it monthly.',
      'Move tolerant workloads such as CI runners to spot capacity.',
      'Add cost to design reviews and track optimisation work in team backlogs.',
    ],
    mistakes: [
      'Buying commitments before cleaning up waste, locking in spend on resources you don\'t need.',
      'One-off clean-up drives that are never repeated.',
      'Rightsizing production without performance testing.',
      'Optimising cost at the expense of reliability or security.',
    ],
    measures: [
      'Savings realised per month, by lever.',
      'Commitment coverage and utilisation.',
      'Share of non-production running outside working hours.',
      'Unit cost trend after optimisation.',
    ],
    related: [{ label: 'FinOps Cost Review Toolkit', to: '/explore/toolkits/finops-cost-review' }, assess, thirtyDays, { label: 'Unit Economics', to: '/finops/unit-economics' }, mm('pareto-principle', 'Pareto Principle'), mm('via-negativa', 'Via Negativa'), mm('5s', '5S')],
  },

  forecasting: {
    path: '/finops/forecasting',
    title: 'Forecasting and Budgeting',
    subtitle: 'Predicting cloud spend accurately enough that nobody is surprised by the bill.',
    description: 'Cloud cost forecasting and budgeting: trend-based, driver-based and rolling forecasts, budget alerts, forecasting new workloads and AI, and measuring accuracy.',
    parent,
    intro: [
      'Finance teams dislike surprises. Cloud spend is variable and can change daily, which makes it harder to predict than the fixed costs of a data centre. Good forecasting builds trust between engineering and finance: it shows that teams understand what drives their costs and can plan for it.',
      'Forecasts don\'t need to be perfect. They need to be close enough, explained, and updated as reality changes.',
    ],
    sections: [
      {
        heading: 'Forecasting methods',
        body: ['Most organisations combine three approaches as they mature.'],
        terms: [
          ['Trend-based', '"We grew 5% last month, so assume 5% next month." Quick, but it misses seasonality and planned changes.'],
          ['Driver-based', '"We expect 10,000 new users, and each user costs 5 pence a month." More accurate, but it needs unit economics.'],
          ['Rolling forecasts', 'Updating the forecast every month or quarter from actuals, rather than fixing an annual budget once.'],
        ],
      },
      {
        heading: 'Budgets and alerts',
        body: [
          'Set budgets per product or team, not just per account, and alert at about 50%, 80% and 100% of the forecast so owners can act before the invoice arrives. Alerts should go to the team that can change the spend.',
          'Budgets work best as a conversation starter, not a hard cap. A team over budget because its product is growing fast may be doing exactly the right thing.',
        ],
      },
      {
        heading: 'Forecasting new workloads',
        body: [
          'New services, migrations and launches are where forecasts usually miss. Ask teams for a simple estimate at design time, built from expected volume and unit cost, and compare it with actuals after launch. Over time these comparisons make every estimate better.',
        ],
      },
      {
        heading: 'Forecasting AI spend',
        body: [
          'AI costs can grow quickly with adoption, and token or GPU pricing changes often. Forecast them from drivers: expected users, requests per user, tokens per request, and price per token or GPU hour. Revisit the forecast monthly while adoption is changing fast.',
        ],
      },
      {
        heading: 'Connecting forecasts to decisions',
        body: [
          'Forecasts are most valuable when they inform decisions: commitment purchases, capacity planning, pricing and investment. Scenario forecasts for big choices, such as a new region or a migration, show the cost implications before the decision is made.',
        ],
      },
      {
        heading: "Getting finance and engineering aligned",
        body: [
          "Forecasting works best as a shared process. Finance brings the budget calendar and accounting rules; engineering brings knowledge of planned launches, migrations and growth drivers; product brings expected demand.",
          "A short monthly forecast review with all three, built around a single shared dashboard, catches most surprises before they become problems.",
        ],
      },
      {
        heading: "Handling uncertainty",
        body: [
          "For uncertain workloads, give a range rather than a single number: a low, expected and high case. Explain what would push spend towards each end, and agree in advance what action will be taken if the high case starts to look likely.",
        ],
      },
    ],
    practice: [
      'Produce a simple run-rate forecast per product from the last 90 days.',
      'Set budget alerts at 50%, 80% and 100% and route them to owners.',
      'Add business drivers to the forecast for your top products.',
      'Ask for cost estimates in design documents for new services.',
      'Review forecast accuracy monthly and record why it missed.',
      'Use forecasts to plan commitments and capacity.',
    ],
    mistakes: [
      'A single annual budget that is never revisited.',
      'Forecasts made by finance without input from engineering.',
      'Budget alerts that go to a shared inbox nobody reads.',
      'Ignoring planned launches and migrations in the forecast.',
    ],
    measures: [
      'Forecast accuracy (aim for within 10–15% for major products).',
      'Number of budget overruns that surprised the owner.',
      'Share of new services with a cost estimate at design time.',
      'Variance explained in monthly reviews.',
    ],
    related: [assess, { label: 'Unit Economics', to: '/finops/unit-economics' }, thirtyDays, mm('scenario-analysis', 'Scenario Analysis'), mm('sensitivity-analysis', 'Sensitivity Analysis'), mm('regression-to-the-mean', 'Regression to the Mean')],
  },

  culture: {
    path: '/finops/culture',
    title: 'FinOps Culture',
    subtitle: 'Bridging engineering, finance and product so everyone owns the cost of what they build.',
    description: 'Building a FinOps culture: the cloud centre of excellence, engineering ownership, gamification and recognition, training, and making cost part of everyday decisions.',
    parent,
    intro: [
      'Tools can show cost and automate savings, but lasting change comes from culture: engineers who consider cost alongside performance and reliability, finance teams who understand the variable cloud model, and product owners who weigh cost against value.',
      'Culture changes slowly, through repeated habits and visible examples. The practices below help those habits form.',
    ],
    sections: [
      {
        heading: 'The cloud centre of excellence',
        body: ['A central team or community sets standards and helps everyone else succeed. It works best with a mix of perspectives.'],
        terms: [
          ['Engineering', 'Understands technical feasibility and the effect of changes.'],
          ['Finance', 'Handles budgeting, forecasting and accounting.'],
          ['Product', 'Makes sure spend aligns with business value.'],
          ['Executive sponsor', 'Sets priorities, breaks ties and backs the practice.'],
        ],
      },
      {
        heading: 'Making cost part of engineering',
        body: [
          'Engineers care about cost when they can see it and influence it. Put daily cost data where they already work, show the cost impact of changes in pull requests or dashboards, and include cost in design reviews and definitions of done.',
          'Treat cost like any other non-functional requirement: something to design for, measure and improve, not a finance problem that arrives after the fact.',
        ],
      },
      {
        heading: 'Gamification and recognition',
        body: [
          'Friendly competition can help: leaderboards for savings, recognition for the best optimisation of the quarter, or a "waste hunt" week. Keep it positive. Celebrate improvements and avoid shaming teams with high costs, which may simply reflect growth.',
        ],
      },
      {
        heading: 'Training and shared language',
        body: [
          'A short FinOps introduction for engineering leads and product owners goes a long way, as does finance training on how the cloud bills. FinOps certifications give champions a structured foundation. A shared glossary of terms such as allocation, showback, commitment and unit cost avoids many misunderstandings.',
        ],
      },
      {
        heading: 'Leadership behaviour',
        body: [
          'Leaders shape culture by what they ask about. If quarterly reviews include unit cost and efficiency next to delivery and reliability, teams will pay attention to it. If cost only comes up when the bill spikes, it will stay a crisis topic rather than a habit.',
        ],
      },
      {
        heading: "Common signs of progress",
        body: [
          "You will know the culture is shifting when engineers mention cost in design discussions without being asked, when teams fix anomalies before the FinOps team notices them, and when product owners talk about unit cost in roadmap reviews.",
          "These signals matter more than any single savings number, because they show that cost awareness is becoming part of how people work rather than a periodic campaign.",
        ],
      },
      {
        heading: "Keeping momentum",
        body: [
          "FinOps cultures fade when early enthusiasm meets competing priorities. Keep a steady rhythm of monthly reviews, quarterly recognition and yearly training refreshers, and connect cost work to goals people already care about, such as margins, sustainability and the freedom to invest in new ideas.",
        ],
      },
    ],
    practice: [
      'Form a small cross-functional FinOps group with an executive sponsor.',
      'Give every team visibility of its own costs.',
      'Add cost to design reviews and to the definition of done.',
      'Run a short FinOps basics session for engineering leads and product owners.',
      'Recognise savings publicly every month.',
      'Include unit cost and efficiency in quarterly business reviews.',
    ],
    mistakes: [
      'Making cost the central team\'s problem alone.',
      'Shaming teams with high spend instead of understanding why.',
      'Talking about cost only during budget crises.',
      'Training engineers without giving them data and authority to act.',
    ],
    measures: [
      'Number of teams acting on cost without being asked.',
      'Savings initiated by engineering teams.',
      'Participation in FinOps training and champions programme.',
      'Cost considered in design reviews (share of reviews).',
    ],
    related: [assess, { label: 'FinOps Certification Prep', to: '/finops/cert-prep' }, thirtyDays, mm('incentives', 'Incentives'), mm('own-your-outcomes', 'Own Your Outcomes'), mm('tragedy-of-the-commons', 'Tragedy of the Commons')],
  },
};
