import React, { useEffect, useMemo, useState } from 'react';
import SimplePage from '../../components/SimplePage';
import { Search, Brain, Zap, Target, Layers, Shield, Users, BarChart, Workflow, Compass, Wrench, Lightbulb } from 'lucide-react';

interface MentalModel {
  name: string;
  category: string;
  description: string;
  example?: string;
}

const MENTAL_MODELS: MentalModel[] = [
  // General Thinking
  { name: "Inversion", category: "Core Thinking", description: "Approaching a problem from the opposite end. Instead of asking how to achieve a goal, ask what would guarantee failure and avoid those things.", example: "To ensure a successful project, list everything that could kill it (poor communication, lack of tests) and focus on preventing those." },
  { name: "Arguing from First Principles", category: "Core Thinking", description: "Breaking a problem down to its fundamental truths and building up from there, rather than reasoning by analogy.", example: "Elon Musk's approach to battery costs: breaking down the cost of raw materials rather than accepting current market prices for battery packs." },
  { name: "Second-Order Thinking", category: "Core Thinking", description: "Considering not just the immediate consequences of a decision (first-order), but the consequences of those consequences (second-order).", example: "Adding a new feature might increase user engagement (1st order) but also increase maintenance burden and technical debt (2nd order)." },
  { name: "The Map Is Not the Territory", category: "Core Thinking", description: "Recognizing that a model or abstraction is a simplification of reality, not reality itself.", example: "An architectural diagram is a map; the actual running code and infrastructure are the territory." },
  { name: "Thought Experiments", category: "Core Thinking", description: "Mental exercises to explore the potential consequences of a hypothesis or decision.", example: "Schrödinger's cat or Einstein's imagining riding a beam of light." },
  
  // Logic & Decision Making
  { name: "Occam’s Razor (Principle of Parsimony)", category: "Logic", description: "The simplest explanation is usually the correct one. Avoid unnecessary complexity.", example: "If a system fails after a small config change, the change is likely the cause, not a sudden hardware failure." },
  { name: "Hanlon's Razor", category: "Logic", description: "Never attribute to malice that which is adequately explained by stupidity or neglect.", example: "A colleague missing a deadline is likely overwhelmed, not trying to sabotage your project." },
  { name: "Falsification / Confirmation Bias", category: "Logic", description: "The tendency to search for information that confirms our beliefs. Falsification is the act of trying to prove your own hypothesis wrong.", example: "Instead of looking for reasons why your architecture is good, try to find the scenarios where it breaks." },
  { name: "Circle of Competence", category: "Decision Making", description: "Knowing the limits of your knowledge and staying within them to avoid costly mistakes.", example: "A backend engineer should be cautious when making critical UI/UX decisions without consulting experts." },
  { name: "Expected Value", category: "Decision Making", description: "Calculating the average outcome of a decision by weighing all possible outcomes by their probability.", example: "Deciding whether to invest in a new tool based on the probability of it saving X hours vs the cost of implementation." },
  
  // Systems & Complexity
  { name: "Systems Thinking", category: "Systems", description: "Understanding how different parts of a system interact and influence each other as a whole.", example: "Recognizing that changing a database schema affects not just the DB, but APIs, frontend, and reporting tools." },
  { name: "Feedback Loops", category: "Systems", description: "Processes where the output of a system is circled back as input. Can be reinforcing (positive) or balancing (negative).", example: "CI/CD pipelines provide a balancing feedback loop by catching errors early." },
  { name: "Pareto Principle (80/20 Rule)", category: "Systems", description: "80% of consequences come from 20% of causes.", example: "80% of software bugs are often found in 20% of the code." },
  { name: "Antifragility", category: "Systems", description: "Systems that get stronger when subjected to stress, volatility, or disorder.", example: "Chaos Engineering: intentionally breaking things to make the system more resilient." },
  { name: "Tragedy of the Commons", category: "Systems", description: "When individuals acting in their own self-interest deplete a shared resource, even if it's not in anyone's long-term interest.", example: "Multiple teams over-utilizing a shared staging environment until it becomes unusable for everyone." },

  // Math & Probability
  { name: "Compounding", category: "Math", description: "The process where the value of an investment increases because the earnings on an investment, both capital gains and interest, earn interest as time passes.", example: "Small, consistent improvements in code quality lead to massive productivity gains over years." },
  { name: "Bayesian Updating", category: "Probability", description: "Updating the probability of a hypothesis as more evidence or information becomes available.", example: "Adjusting your confidence in a release as more test results and canary metrics come in." },
  { name: "Regression to the Mean", category: "Probability", description: "The phenomenon that if a variable is extreme on its first measurement, it will tend to be closer to the average on its second measurement.", example: "A week of unusually high server traffic is likely to be followed by a week closer to the average." },
  { name: "Law of Large Numbers", category: "Math", description: "As a sample size grows, its mean gets closer to the average of the whole population.", example: "A single user's feedback might be an outlier, but 10,000 users' feedback represents the true sentiment." },

  // Psychology
  { name: "Incentives", category: "Psychology", description: "Understanding that people respond to rewards and punishments. 'Show me the incentive and I will show you the outcome.'", example: "If developers are measured solely on story points, they may prioritize quantity over quality." },
  { name: "Social Proof", category: "Psychology", description: "The tendency to follow the actions of others in an attempt to reflect correct behavior.", example: "Adopting a technology just because 'everyone else is using it' (Hype Driven Development)." },
  { name: "Availability Bias", category: "Psychology", description: "Overestimating the importance of information that is most available or recent in our minds.", example: "Thinking a specific type of bug is common just because it happened yesterday." },
  { name: "Sunk Cost Fallacy", category: "Psychology", description: "Continuing an endeavor as a result of previously invested resources (time, money), even if it's no longer the best option.", example: "Refusing to switch to a better framework because you've already spent 6 months on the current one." },

  // Business & Strategy
  { name: "Opportunity Costs", category: "Strategy", description: "The value of the next best alternative foregone as a result of making a decision.", example: "Spending 2 weeks on a minor UI tweak means you can't spend those 2 weeks on a critical security patch." },
  { name: "Creative Destruction", category: "Strategy", description: "The process of industrial mutation that incessantly revolutionizes the economic structure from within, incessantly destroying the old one, incessantly creating a new one.", example: "Cloud computing destroying the traditional on-premise server market." },
  { name: "Comparative Advantage", category: "Strategy", description: "The ability of an individual or group to carry out a particular economic activity more efficiently than another activity.", example: "A senior dev focusing on architecture while a junior dev handles bug fixes, even if the senior dev is faster at both." },
  { name: "Network Effects", category: "Strategy", description: "When a product or service becomes more valuable as more people use it.", example: "GitHub is valuable because that's where all the open-source projects and developers are." },

  // Engineering Specific
  { name: "Technical Debt", category: "Engineering", description: "The implied cost of additional rework caused by choosing an easy but limited solution now instead of using a better approach that would take longer.", example: "Skipping unit tests to meet a deadline creates debt that must be paid back later with interest (bugs, slow dev)." },
  { name: "Redundancy / Backup Systems", category: "Engineering", description: "The inclusion of extra components which are not strictly necessary to functioning, in case of failure in other components.", example: "Running multiple instances of a service across different availability zones." },
  { name: "Margin of Safety", category: "Engineering", description: "Building in extra capacity or tolerance to handle unexpected loads or failures.", example: "Provisioning 50% more server capacity than peak expected load." },
  { name: "Abstraction", category: "Engineering", description: "Hiding complex implementation details behind a simple interface.", example: "Using an ORM instead of writing raw SQL queries." },
  
  // Logic & Reasoning (Extended)
  { name: "Reductio ad Absurdum", category: "Logic", description: "Proving a statement true by showing that its opposite leads to an absurd or impossible conclusion.", example: "If we assume that adding 100 developers to a project will make it 100x faster, we ignore the communication overhead which eventually makes progress negative (absurd)." },
  { name: "Rapoport’s Rules", category: "Logic", description: "A set of rules for critical commentary: 1. Re-express the target's position clearly. 2. List points of agreement. 3. Mention what you've learned. 4. Only then rebut.", example: "Using these rules in a code review to ensure constructive feedback." },
  { name: "Sturgeon’s Law", category: "Logic", description: "The adage that 'ninety percent of everything is crap.'", example: "Filtering through 90% of low-quality libraries to find the 10% that are actually reliable." },
  { name: "Occam’s Broom", category: "Logic", description: "The tendency to sweep inconvenient facts under the rug.", example: "Ignoring performance bottlenecks in a new feature because the UI looks great." },
  
  // Scientific Thinking
  { name: "Scientific Method", category: "Scientific", description: "A systematic way of learning about the world through observation, hypothesis, experimentation, and refinement.", example: "A/B testing a new feature to see if it actually improves user conversion." },
  { name: "Observer Effect", category: "Scientific", description: "The act of observing a system inevitably changes that system.", example: "Adding heavy logging to debug a performance issue might change the timing enough that the issue disappears (Heisenbug)." },
  { name: "Selection Bias", category: "Scientific", description: "When the data collected is not representative of the whole population due to the way it was selected.", example: "Surveying only active users about a feature, ignoring those who quit because of it." },
  
  // Systems & Complexity (Extended)
  { name: "Chaos Dynamics (Butterfly Effect)", category: "Systems", description: "The idea that small changes in initial conditions can lead to vast differences in outcomes in complex systems.", example: "A single line of code change in a core library causing a cascading failure across an entire microservices architecture." },
  { name: "Emergence", category: "Systems", description: "Complex patterns or behaviors that arise from the interaction of simple parts, which are not present in the parts themselves.", example: "The 'culture' of a company emerging from the daily interactions of its employees." },
  { name: "Fragility – Robustness – Antifragility", category: "Systems", description: "Fragile things break under stress; robust things resist it; antifragile things get better from it.", example: "A monolith is often fragile; a well-designed microservices architecture with circuit breakers is robust; a system with automated chaos testing is antifragile." },
  
  // Math & Statistics (Extended)
  { name: "Normal Distribution (Bell Curve)", category: "Math", description: "A probability distribution that is symmetric about the mean, showing that data near the mean are more frequent in occurrence than data far from the mean.", example: "The distribution of heights in a population or response times for a stable API." },
  { name: "Power Laws", category: "Math", description: "A functional relationship between two quantities, where a relative change in one quantity results in a proportional relative change in the other.", example: "The distribution of wealth, city sizes, or the number of links to websites." },
  { name: "Fat-Tailed Processes (Extremistan)", category: "Math", description: "Processes where extreme events (black swans) are more likely than a normal distribution would predict.", example: "Financial market crashes or major security breaches." },

  // Economics & Markets
  { name: "Mr. Market", category: "Economics", description: "An allegory for the stock market, portraying it as a manic-depressive partner who offers to buy or sell at different prices every day.", example: "Ignoring the daily 'hype' or 'doom' in tech news and focusing on long-term value." },
  { name: "Prisoner’s Dilemma", category: "Economics", description: "A standard example of a game analyzed in game theory that shows why two completely rational individuals might not cooperate, even if it appears that it is in their best interests to do so.", example: "Two companies in a price war where both would be better off keeping prices high, but both lower them to avoid losing market share." },

  // Biology & Evolution
  { name: "Adaptation", category: "Biology", description: "The process by which a species becomes better suited to its environment.", example: "A company adapting its business model to survive in a remote-first world." },
  { name: "Red Queen Effect", category: "Biology", description: "An evolutionary strategy where one must constantly evolve, evolve, and proliferate just to maintain relative fitness.", example: "The constant arms race between security researchers and hackers." },
  { name: "Ecosystems", category: "Biology", description: "A biological community of interacting organisms and their physical environment.", example: "The 'Apple Ecosystem' where hardware, software, and services work together to create value." },
  
  // Military & Strategy
  { name: "Asymmetric Warfare", category: "Strategy", description: "Warfare in which the relative military power of belligerents differs significantly.", example: "A small startup using agility and niche focus to compete with a massive incumbent." },
  { name: "Trojan Horse", category: "Strategy", description: "A person or thing intended to undermine or secretly overthrow an enemy or opponent.", example: "A free tool offered by a company to gain access to a competitor's customer data." },
  { name: "Black Swan", category: "Strategy", description: "An unpredictable event that is beyond what is normally expected of a situation and has potentially severe consequences.", example: "The 2008 financial crisis or the COVID-19 pandemic." },
  { name: "Margin of Safety in Investing", category: "Strategy", description: "The difference between the intrinsic value of an asset and the price you pay. Buying well below your estimate of value leaves room for your estimate to be wrong.", example: "Approving a platform investment only if the conservative-case savings still cover its cost, so the business case survives optimistic assumptions turning out wrong." },
  
  // Cognitive & Communication
  { name: "The “Surely” Operator", category: "Cognitive", description: "A mental block where using the word 'surely' signals a leap in logic that hasn't been proven.", example: "'Surely, the users will love this feature'—this often masks a lack of user research." },
  { name: "Deepity", category: "Cognitive", description: "A statement that is true but trivial on one level, and false but seemingly profound on another.", example: "'Love is just a four-letter word'—technically true, but misses the profound complexity of the emotion." },
  { name: "Jootsing", category: "Cognitive", description: "Jumping Out Of The System. A way of thinking that involves stepping outside the rules of a system to see it from a new perspective.", example: "Instead of optimizing a legacy system, questioning if the system is even needed anymore." },
  { name: "Rhetorical Questions", category: "Communication", description: "A question asked in order to create a dramatic effect or to make a point rather than to get an answer.", example: "'Do you want our servers to crash on Black Friday?'—used to emphasize the importance of scalability." },
  
  // Leadership & Management (Dalio / Munger)
  { name: "Radical Transparency", category: "Leadership", description: "The practice of being completely open and honest about everything within an organization.", example: "Recording all meetings and making them available to everyone in the company (Ray Dalio's approach)." },
  { name: "Idea Meritocracy", category: "Leadership", description: "A system where the best ideas win, regardless of who they come from.", example: "A junior developer's architectural suggestion being chosen over a senior's because it's objectively better." },
  { name: "Believability Weighting", category: "Leadership", description: "Giving more weight to the opinions of people who have a proven track record of success in a specific area.", example: "When deciding on a DB migration, weighing the lead DBA's opinion more heavily than the product manager's." },
  { name: "Pain + Reflection = Progress", category: "Leadership", description: "The idea that growth comes from experiencing pain (failure) and then reflecting on it to learn and improve.", example: "Conducting a blameless post-mortem after a major outage to ensure it doesn't happen again." },

  // Model Thinking (Scott Page)
  { name: "Markov Models", category: "Model Thinking", description: "A stochastic model used to describe a sequence of possible events in which the probability of each event depends only on the state attained in the previous event.", example: "Predicting user behavior on a website based on their current page." },
  { name: "Lyapunov Functions", category: "Model Thinking", description: "A scalar function used to prove the stability of an equilibrium point of a dynamical system.", example: "Ensuring that a load-balancing algorithm will eventually reach a stable state." },
  { name: "Schelling's Segregation Model", category: "Model Thinking", description: "An agent-based model that illustrates how individual incentives can lead to unintended collective outcomes (like segregation).", example: "Understanding how small preferences for similar neighbors can lead to highly segregated neighborhoods." },
  { name: "Standing Ovation Model", category: "Model Thinking", description: "A model that explores how a collective behavior (like a standing ovation) can be triggered by a few individuals.", example: "How a few early adopters can trigger a massive trend in technology adoption." },

  // Physics & Science (Extended)
  { name: "Laws of Thermodynamics", category: "Physics", description: "Fundamental principles governing energy and entropy. The second law states that entropy (disorder) in an isolated system always increases.", example: "Software systems naturally tend toward technical debt and complexity (entropy) unless energy is actively spent to refactor them." },
  { name: "Activation Energy", category: "Physics", description: "The minimum amount of energy required to initiate a chemical reaction or process.", example: "The initial effort required to set up a new CI/CD pipeline or adopt a new team habit." },
  { name: "Catalysts", category: "Physics", description: "Substances that increase the rate of a reaction without being consumed themselves.", example: "A great developer tool or a clear documentation site that speeds up the entire team's delivery." },
  { name: "Leverage", category: "Physics", description: "Using a small force to move a large object via a mechanical advantage.", example: "Automating a repetitive task provides massive leverage by freeing up human time for higher-value work." },
  { name: "Inertia", category: "Physics", description: "The tendency of an object to resist changes in its state of motion.", example: "The difficulty of changing a large organization's culture or a legacy codebase's architecture." },
  { name: "Critical Mass", category: "Physics", description: "The minimum amount of fissile material needed to maintain a nuclear chain reaction.", example: "The point where a new internal tool has enough users that it becomes the de facto standard and self-sustaining." },
  { name: "Half-life", category: "Physics", description: "The time required for a quantity to reduce to half of its initial value.", example: "The half-life of technical knowledge in a fast-moving field like frontend development." },
  { name: "Heisenberg Uncertainty Principle", category: "Physics", description: "The more precisely the position of some particle is determined, the less precisely its momentum can be known, and vice versa.", example: "In management, the more you measure a specific metric, the more you might unintentionally distort the behavior you're trying to measure (Goodhart's Law)." },

  // Biology & Evolution (Extended)
  { name: "Dunbar’s Number", category: "Biology", description: "A suggested cognitive limit to the number of people with whom one can maintain stable social relationships (roughly 150).", example: "Structuring engineering organizations into 'tribes' or 'guilds' that don't exceed this size to maintain cohesion." },
  { name: "Exaptation", category: "Biology", description: "A trait that evolved for one function but is later co-opted for another.", example: "A tool built for internal debugging that becomes a successful external product (e.g., Slack or PagerDuty)." },
  { name: "Niches", category: "Biology", description: "The specific role or position an organism has within its environment.", example: "A startup finding a specific, underserved market segment to dominate before expanding." },

  // Economics (Extended)
  { name: "Supply and Demand", category: "Economics", description: "The relationship between the availability of a product and the desire for it, which determines its price.", example: "The high salaries of specialized AI engineers due to low supply and high demand." },
  { name: "Scarcity", category: "Economics", description: "The limited availability of a commodity, which may be in demand in the market.", example: "Time is the scarcest resource in a software project; choosing what NOT to build is as important as choosing what to build." },
  { name: "Winner Take All Market", category: "Economics", description: "A market where the top performers capture a disproportionately large share of the rewards.", example: "Search engines (Google) or social networks (Facebook) where network effects create a dominant player." },
  { name: "Barriers to Entry", category: "Economics", description: "Factors that prevent new competitors from easily entering an industry.", example: "High R&D costs, proprietary data, or strong brand loyalty." },

  // Military & Strategy (Extended)
  { name: "Exit Strategy", category: "Strategy", description: "A pre-planned means of leaving a situation that is either going bad or has reached its goal.", example: "Having a plan to migrate away from a third-party vendor if their service quality drops or prices spike." },
  { name: "Boots on the Ground", category: "Strategy", description: "The use of physical presence to achieve a goal, rather than remote or automated means.", example: "A leader spending time 'in the trenches' with developers to understand their daily friction points." },
  { name: "Winning Hearts and Minds", category: "Strategy", description: "Gaining emotional and intellectual support rather than just compliance.", example: "Convincing a team of the value of a new process rather than just mandating it." },
  { name: "Containment", category: "Strategy", description: "A policy of preventing the expansion of a hostile power or influence.", example: "Isolating a legacy system with a 'strangler fig' pattern to prevent its complexity from leaking into new services." },
  { name: "Appeasement", category: "Strategy", description: "Making concessions to an aggressive power to avoid conflict.", example: "Continuously adding 'one more small feature' for a demanding client instead of setting firm boundaries." },

  // Statistics & Probability (Extended)
  { name: "Central Limit Theorem", category: "Math", description: "The theory that the distribution of sample means will be normal, regardless of the population distribution, given a large enough sample size.", example: "Using this to justify the use of normal distribution models in large-scale system monitoring." },
  { name: "Six Sigma", category: "Math", description: "A set of techniques and tools for process improvement, aiming for near-perfection (3.4 defects per million opportunities).", example: "Applying rigorous quality controls to a high-stakes financial transaction system." },
  { name: "Bayes’ Theorem", category: "Probability", description: "A mathematical formula for determining conditional probability, helping to update beliefs based on new evidence.", example: "Spam filters use Bayesian logic to calculate the probability a message is spam based on the words it contains." },
  { name: "Simpson’s Paradox", category: "Math", description: "A phenomenon in which a trend appears in several groups of data but disappears or reverses when these groups are combined.", example: "A feature appearing to improve conversion in every individual country but showing a decrease when looking at global data due to varying sample sizes." },

  // Decision Making (Extended)
  { name: "Loss Aversion", category: "Decision Making", description: "The tendency to prefer avoiding losses to acquiring equivalent gains.", example: "Being more afraid of losing 10% of users due to a bug than excited about gaining 10% from a new feature." },
  { name: "Prioritize by Value of Information", category: "Decision Making", description: "Deciding whether to gather more data based on how much that data would actually change your decision.", example: "Running a 1-day spike to see if a technology is viable before committing to a 3-month project." },
  { name: "Simplify!", category: "Decision Making", description: "The act of reducing a problem or system to its most essential parts.", example: "Removing unused features to reduce the cognitive load and maintenance surface of a product." },

  // Psychology (Extended)
  { name: "Denial", category: "Psychology", description: "Refusing to acknowledge a painful or inconvenient reality.", example: "Ignoring the fact that a project is 3 months behind schedule and hoping 'it will just work out'." },
  { name: "Representativeness Heuristic", category: "Psychology", description: "Estimating the likelihood of an event by comparing it to an existing prototype in our minds.", example: "Hiring a candidate because they 'look and act like a great engineer' rather than based on their actual skills." },
  { name: "Narrative Instinct", category: "Psychology", description: "The human tendency to turn random events into a cohesive story.", example: "Creating a post-hoc explanation for why a marketing campaign failed, even if it was just bad luck." },
  { name: "Hindsight Bias", category: "Psychology", description: "The tendency to see past events as being predictable at the time they happened.", example: "Saying 'I knew that server would crash' after it happens, even if you didn't raise any concerns beforehand." },
  { name: "Survivorship Bias", category: "Psychology", description: "Focusing on the people or things that made it past some selection process and overlooking those that did not.", example: "Studying only successful startups to learn 'how to succeed' while ignoring the thousands that failed doing the exact same things." },

  // Productivity & Management
  { name: "Eisenhower Matrix", category: "Management", description: "A tool for prioritizing tasks by urgency and importance.", example: "Focusing on 'Important but Not Urgent' tasks (like refactoring) to prevent them from becoming 'Important and Urgent' (like outages)." },
  { name: "SMART Formula", category: "Management", description: "A framework for setting goals: Specific, Measurable, Achievable, Relevant, and Time-bound.", example: "Instead of 'Improve performance,' set a goal to 'Reduce API latency by 20% within 30 days'." },
  { name: "KISS Principle", category: "Management", description: "Keep It Simple, Stupid. Most systems work best if they are kept simple rather than made complicated.", example: "Choosing a simple, well-understood database over a complex, experimental one for a critical project." },
  { name: "Working Backwards", category: "Management", description: "Starting with the customer's needs and working backwards to the technology.", example: "Writing the press release and FAQ for a product before writing a single line of code (Amazon's method)." },
  { name: "Peter Principle", category: "Management", description: "The observation that people in a hierarchy tend to rise to their 'level of incompetence'.", example: "Promoting a great individual contributor to a manager role where they lack the necessary skills." },
  { name: "Reversible vs Irreversible Decisions", category: "Management", description: "One-way doors (irreversible) vs two-way doors (reversible).", example: "Choosing a cloud provider is a one-way door; choosing a library for a small utility is a two-way door." },

  // Advanced Frameworks & Tendencies
  { name: "Lollapalooza Tendency", category: "Psychology", description: "The confluence of multiple mental biases acting in the same direction, leading to extreme outcomes.", example: "A high-pressure sales environment combining social proof, authority influence, and scarcity to drive impulsive purchases." },
  { name: "Game Theory", category: "Strategy", description: "The study of mathematical models of strategic interaction among rational decision-makers.", example: "Analyzing how two competing companies might set prices or release features based on each other's likely actions." },
  { name: "Zero-sum vs Non-zero-sum", category: "Strategy", description: "Zero-sum: one person's gain is another's loss. Non-zero-sum: both can win (win-win) or both can lose.", example: "A salary negotiation is often seen as zero-sum, but a collaborative project is non-zero-sum." },
  { name: "Unintended Consequences", category: "Systems", description: "Outcomes of a purposeful action that are not intended or foreseen.", example: "Implementing a strict bug-count quota that leads developers to hide bugs or stop reporting them." },
  { name: "Preserving Optionality", category: "Strategy", description: "Making decisions that keep future paths open rather than locking into a single course of action.", example: "Building a modular architecture that allows for switching databases or cloud providers later if needed." },
  { name: "Paradigm Shift", category: "Core Thinking", description: "A fundamental change in the basic concepts and experimental practices of a scientific discipline or industry.", example: "The shift from monolithic architectures to microservices or from manual deployments to DevOps." },
  { name: "Lateral Thinking", category: "Core Thinking", description: "Solving problems through an indirect and creative approach, using reasoning that is not immediately obvious.", example: "Instead of making a slow elevator faster, installing mirrors in the lobby to make the wait feel shorter." },
  { name: "Divergent vs Convergent Thinking", category: "Core Thinking", description: "Divergent: generating many possible solutions. Convergent: narrowing down to the best solution.", example: "A brainstorming session (divergent) followed by a prioritization workshop (convergent)." },
  { name: "The Idea Maze", category: "Strategy", description: "The process of exploring all the different paths, dead ends, and competitors in a specific market or technology space.", example: "A founder thoroughly researching why previous attempts at a similar product failed before starting their own." },
  { name: "Product-Market Fit", category: "Strategy", description: "The degree to which a product satisfies a strong market demand.", example: "When a product's growth becomes organic and users are actively recommending it to others." },
  { name: "Flywheel Effect", category: "Systems", description: "A reinforcing feedback loop where small wins build momentum over time, eventually leading to massive breakthroughs.", example: "Better code quality leads to faster delivery, which leads to more user feedback, which leads to better products, and so on." },

  // Statistics & Data
  { name: "Response Bias", category: "Scientific", description: "The tendency of a person to answer questions on a survey untruthfully or misleadingly.", example: "Users saying they want a feature because it sounds good, but never actually using it in reality." },
  { name: "Proxy", category: "Scientific", description: "A variable that is used to stand in for another variable that is difficult to measure directly.", example: "Using 'lines of code' as a proxy for 'productivity' (often a poor proxy)." },
  { name: "False Positives and False Negatives", category: "Scientific", description: "Type I error (false alarm) and Type II error (missed detection).", example: "A security tool flagging a legitimate request as an attack (false positive) or missing a real attack (false negative)." },
  { name: "Confidence Interval", category: "Scientific", description: "A range of values so defined that there is a specified probability that the value of a parameter lies within it.", example: "Saying 'we are 95% confident that the new feature will improve conversion by 2-5%'." },

  // Systems & Strategy (Extended)
  { name: "Via Negativa", category: "Strategy", description: "Improvement by subtraction or avoidance of harm, rather than by addition.", example: "Removing complex features to make a system more reliable instead of adding more monitoring." },
  { name: "The Lindy Effect", category: "Strategy", description: "The idea that the future life expectancy of some non-perishable things (like ideas or technology) is proportional to their current age.", example: "SQL has been around for 50 years, so it's likely to be around for another 50, unlike a new JS framework." },
  { name: "Complex Adaptive Systems", category: "Systems", description: "Systems that are complex in that they are diverse and made up of multiple interconnected elements and adaptive in that they have the capacity to change and learn from experience.", example: "The stock market, the internet, or a large software engineering organization." },
  { name: "Velocity vs Speed", category: "Strategy", description: "Speed is how fast you are moving; velocity is speed in a specific direction.", example: "A team can be 'fast' at shipping features, but if they are the wrong features, their velocity is zero." },
  { name: "Redundancy", category: "Engineering", description: "The inclusion of extra components which are not strictly necessary to functioning, in case of failure in other components.", example: "Running multiple instances of a service across different availability zones." },

  // Economics & Markets (Extended)
  { name: "Arbitrage", category: "Economics", description: "The simultaneous purchase and sale of an asset to profit from a difference in the price.", example: "Buying a product in a low-cost market and selling it in a high-cost market." },
  { name: "Price Elasticity", category: "Economics", description: "The measure of the responsiveness of the quantity demanded or supplied of a good to a change in its price.", example: "A small increase in subscription price leading to a massive drop in users (high elasticity)." },
  { name: "Information Asymmetry", category: "Economics", description: "When one party in a transaction has more or better information than the other.", example: "A developer knowing a codebase is a mess while the manager thinks it's high quality." },
  { name: "Externalities", category: "Economics", description: "A consequence of an industrial or commercial activity which affects other parties without this being reflected in market prices.", example: "A team shipping a feature quickly but leaving technical debt for another team to maintain." },
  { name: "Sunk Cost", category: "Economics", description: "A cost that has already been incurred and cannot be recovered.", example: "Continuing to use a failing tool just because you spent $10k on the license." },

  // Psychology & Behavior (Extended)
  { name: "Authority Bias", category: "Psychology", description: "The tendency to attribute greater accuracy to the opinion of an authority figure.", example: "Agreeing with a CTO's technical choice even if you know it's wrong because of their title." },
  { name: "Commitment & Consistency Bias", category: "Psychology", description: "The tendency to be consistent with what we have previously said or done.", example: "Refusing to admit a project is failing because you publicly championed it." },
  { name: "Envy & Jealousy", category: "Psychology", description: "The tendency to want what others have or to feel resentful of their success.", example: "A team being reluctant to adopt a tool built by another team due to 'Not Invented Here' syndrome." },
  { name: "Availability Heuristic", category: "Psychology", description: "Overestimating the importance of information that is most available or recent in our minds.", example: "Thinking a specific type of bug is common just because it happened yesterday." },

  // Management & Leadership (Extended)
  { name: "Directly Responsible Individual (DRI)", category: "Management", description: "A single person who is ultimately responsible for the success or failure of a project or task.", example: "Apple's management style where every task has one owner." },
  { name: "Forcing Function", category: "Management", description: "A task, activity, or event that forces you to take action and produce a result.", example: "A hard deadline like a product launch or a conference talk." },
  { name: "Growth Mindset", category: "Management", description: "The belief that abilities and intelligence can be developed through dedication and hard work.", example: "A developer seeing a difficult bug as an opportunity to learn rather than a sign of failure." },
  { name: "Organizational Debt", category: "Management", description: "The interest paid when people and structure are not aligned with the goals of the organization.", example: "Having too many layers of management that slow down decision-making." },

  // Strategy (Extended)
  { name: "First-mover Advantage", category: "Strategy", description: "The advantage gained by the initial significant occupant of a market segment.", example: "Amazon being the first major online bookstore." },
  { name: "Second-mover Advantage", category: "Strategy", description: "The advantage gained by a company that enters a market after the first mover has already established it.", example: "Google entering the search market after Altavista and Yahoo." },
  { name: "Unknown Unknowns", category: "Strategy", description: "Things we don't know we don't know.", example: "A sudden global pandemic affecting your supply chain when you only planned for local weather events." },
  { name: "Switching Costs", category: "Strategy", description: "The costs that a consumer incurs as a result of changing brands, suppliers, or products.", example: "The difficulty of moving all your data from one cloud provider to another." },
  { name: "Economies of Scale", category: "Strategy", description: "The cost advantages that enterprises obtain due to their scale of operation.", example: "AWS being able to offer lower prices because they buy hardware in massive quantities." },

  // Leadership & Culture (Extended)
  { name: "Local vs Global Optimum", category: "Decision Making", description: "A local optimum is the best solution within a small neighborhood; a global optimum is the best solution overall.", example: "Optimizing a single team's performance (local) at the expense of the entire company's goals (global)." },
  { name: "Trust", category: "Leadership", description: "The firm belief in the reliability, truth, ability, or strength of someone or something.", example: "Building a high-trust environment where developers feel safe to admit mistakes and ask for help." },
  { name: "Generalist vs Specialist", category: "Leadership", description: "The trade-off between having a broad range of skills (generalist) vs deep expertise in one area (specialist).", example: "Hiring 'T-shaped' engineers who have deep expertise in one area but a broad understanding of the entire stack." },
  { name: "High-context vs Low-context Culture", category: "Leadership", description: "High-context cultures rely on implicit communication and shared understanding; low-context cultures rely on explicit, direct communication.", example: "A remote-first company needing to move toward low-context (explicit) communication to avoid misunderstandings." },
  { name: "Maslow’s Hierarchy of Needs", category: "Psychology", description: "A theory of human motivation that prioritizes needs from basic physiological needs to self-actualization.", example: "Ensuring developers have psychological safety and clear goals before expecting them to innovate at a high level." },
  { name: "Binary Search (Mental Model)", category: "Core Thinking", description: "A way of finding an item in a sorted list by repeatedly dividing the search interval in half.", example: "Debugging a production issue by disabling half of the new features to see if the issue persists, then repeating." },
  { name: "Divide and Conquer (Mental Model)", category: "Core Thinking", description: "Breaking a complex problem into smaller, more manageable sub-problems.", example: "Decomposing a massive monolithic application into smaller, independent microservices." },
  { name: "Metcalfe’s Law", category: "Systems", description: "The value of a network is proportional to the square of the number of connected users.", example: "The value of a company's internal Slack or documentation increases exponentially as more employees contribute to it." },
  { name: "Paradigm of Choice", category: "Psychology", description: "The idea that having too many choices can lead to anxiety and indecision.", example: "Limiting the number of approved technologies in a company to reduce decision fatigue for engineers." },
  { name: "Jobs To Be Done", category: "Strategy", description: "A framework for understanding why customers 'hire' a product to do a specific job.", example: "Realizing that users 'hire' a dashboard not to see data, but to feel in control of their infrastructure." },
  { name: "Core Competency", category: "Strategy", description: "A defining capability or advantage that distinguishes an enterprise from its competitors.", example: "A tech company's core competency might be its unique data processing algorithm, not its UI." },
  { name: "Strategy vs Tactics", category: "Strategy", description: "Strategy is the long-term plan; tactics are the specific actions taken to achieve that plan.", example: "Strategy: Move to the cloud. Tactics: Migrate the user database to RDS this week." },
  { name: "Deliberate Practice", category: "Psychology", description: "Purposeful and systematic practice aimed at improving performance.", example: "A developer spending time specifically on learning a new language or framework through focused projects." },
  { name: "Imposter Syndrome", category: "Psychology", description: "The persistent inability to believe that one's success is deserved or has been legitimately achieved.", example: "A senior engineer feeling like they don't belong in their role despite a track record of success." },
  { name: "Dunning-Kruger Effect", category: "Psychology", description: "A cognitive bias where people with low ability at a task overestimate their ability.", example: "A junior developer thinking they can rewrite the entire core engine in a weekend." },
  { name: "Makers vs Manager’s Schedule", category: "Management", description: "Makers need long blocks of uninterrupted time; managers work in 30-60 minute intervals.", example: "Ensuring developers have 'no-meeting days' to allow for deep work." },
  { name: "Murphy’s Law", category: "Engineering", description: "Anything that can go wrong will go wrong.", example: "Designing systems with the assumption that every component will eventually fail." },
  { name: "Parkinson’s Law", category: "Management", description: "Work expands so as to fill the time available for its completion.", example: "Setting tight but realistic deadlines to prevent a project from dragging on indefinitely." },
  { name: "Regret Minimization Framework", category: "Decision Making", description: "Making decisions by imagining yourself at age 80 and looking back on your life.", example: "Deciding to start a new company because you'd regret not trying more than you'd regret failing." },
  { name: "Minimum Viable Product (MVP)", category: "Strategy", description: "A version of a new product which allows a team to collect the maximum amount of validated learning about customers with the least effort.", example: "Launching a simple landing page to test interest in a feature before building it." },
  { name: "Own your outcomes", category: "Leadership", description: "Taking full responsibility for the results of your actions and decisions.", example: "A leader taking responsibility for a failed release instead of blaming the team." },
  { name: "Appreciate the art of thoughtful disagreement", category: "Leadership", description: "The ability to disagree with someone while remaining respectful and open-minded.", example: "Encouraging a culture where team members can challenge each other's ideas without it becoming personal." },
  { name: "Meaningful relationships and meaningful work are mutually reinforcing", category: "Leadership", description: "The idea that people are most productive and happy when they are doing work they care about with people they respect.", example: "Focusing on team building as a way to improve long-term productivity and retention." },
  { name: "Evaluate accurately, not kindly", category: "Leadership", description: "Providing honest, objective feedback even when it's difficult.", example: "Telling a team member their performance is below expectations so they have a chance to improve." },
  { name: "Think like an owner", category: "Leadership", description: "Approaching problems and decisions with the mindset of someone who has a personal stake in the outcome.", example: "A developer considering the long-term maintenance cost of a library they are choosing." },
  { name: "Use checklists", category: "Management", description: "A simple tool to ensure that all necessary steps in a process are completed.", example: "Having a deployment checklist to prevent common mistakes during a release." },
  { name: "Return On Investment (ROI)", category: "Decision Making", description: "A measure used to evaluate the efficiency of an investment.", example: "Deciding to automate a task because the time saved will pay for the development cost in 3 months." },
  { name: "Time Value Of Shipping", category: "Strategy", description: "The idea that shipping a feature now is often more valuable than shipping a 'perfect' version later.", example: "Releasing a basic version of a tool to get user feedback early." },
  { name: "Confidence determines Speed vs. Quality", category: "Decision Making", description: "When confidence is high, move fast; when confidence is low, prioritize quality and learning.", example: "Moving fast on a minor UI tweak but being extremely cautious with a database migration." },
  { name: "Version two is a lie", category: "Strategy", description: "The tendency to defer important features to 'version two', which often never happens.", example: "Ensuring that the most critical features are included in the initial release." },
  { name: "Culture of Lifelong Learning", category: "Leadership", description: "An organizational commitment to continuous education and improvement.", example: "Providing a budget for books, courses, and conferences for all employees." },
  { name: "Win-Win Game", category: "Strategy", description: "A situation where all parties can benefit from a specific outcome.", example: "A partnership between two companies that allows both to reach new customers." },
  { name: "Boiling Frog Symbol", category: "Systems", description: "The idea that a gradual change can go unnoticed until it's too late.", example: "Technical debt slowly accumulating until the system becomes impossible to maintain." },

  // Final Specific Models
  { name: "Default Status", category: "Decision Making", description: "The tendency to stick with the pre-set option because it's the path of least resistance.", example: "Users rarely changing the default settings of an application, making those defaults incredibly powerful." },
  { name: "Making Mistakes", category: "Core Thinking", description: "Recognizing that mistakes are an essential part of the learning and evolution process.", example: "A team that celebrates 'smart failures' as opportunities to learn and improve their systems." },
  { name: "Using Lay Audiences as Decoys", category: "Communication", description: "Explaining a complex topic to a non-expert as a way to clarify your own understanding and find gaps in your logic.", example: "Explaining a new system architecture to a product manager to see if the core logic holds up." },
  { name: "Three Species of Goulding", category: "Logic", description: "A framework for identifying different types of flawed arguments: Rathering, Piling On, and the Gould Two-Step.", example: "Identifying when a debate has shifted from facts to 'piling on' emotional arguments." },
  { name: "Scenario Analysis", category: "Strategy", description: "A process of analyzing possible future events by considering alternative possible outcomes.", example: "Planning for three different scenarios: high growth, steady state, and market downturn." },
  { name: "Sensitivity Analysis", category: "Math", description: "The study of how the uncertainty in the output of a mathematical model or system can be apportioned to different sources of uncertainty in its inputs.", example: "Determining which variable (e.g., server cost vs. user growth) has the biggest impact on a project's budget." },
  { name: "Cost-benefit Analysis", category: "Decision Making", description: "A systematic approach to estimating the strengths and weaknesses of alternatives.", example: "Comparing the cost of building a custom tool vs. the benefit of buying a third-party solution." },
  { name: "Simulation", category: "Systems", description: "The imitation of the operation of a real-world process or system over time.", example: "Running a load test simulation to see how a system behaves under 10x normal traffic." },
  { name: "Pareto Efficiency", category: "Economics", description: "A state where no individual can be made better off without making at least one individual worse off.", example: "Reaching a point in a resource allocation where any further change would hurt one team's productivity." },
  { name: "Permutations and Combinations", category: "Math", description: "The study of the different ways in which objects from a set may be selected and arranged.", example: "Calculating the number of possible ways a feature could be configured by a user." },
  { name: "Algebraic Equivalence", category: "Math", description: "The idea that two expressions can look different but represent the same underlying value or logic.", example: "Refactoring code to be more readable while ensuring the underlying logic remains identical." },
  { name: "Randomness", category: "Probability", description: "The lack of pattern or predictability in events.", example: "Recognizing that a sudden spike in errors might just be a random cluster rather than a systemic issue." },
  { name: "Stochastic Processes", category: "Probability", description: "A collection of random variables representing the evolution of some system of values over time.", example: "Modeling user arrival times at an API using a Poisson process." },
  // Agile & Lean
  { name: "The Agile Manifesto", category: "Agile & Lean", description: "Four values and twelve principles (2001) that favour individuals and interactions, working software, customer collaboration and responding to change over processes, documentation, contracts and following a plan. The items on the right still matter; the ones on the left matter more.", example: "When a team argues about a missing requirements document, the manifesto asks a better question: what would a working increment and a conversation with the customer tell us today?" },
  { name: "Scrum", category: "Agile & Lean", description: "A lightweight framework for complex work: a Product Owner, a Scrum Master and Developers deliver a usable increment every sprint (one month or less), using Sprint Planning, Daily Scrum, Sprint Review and Retrospective, and three artifacts: Product Backlog, Sprint Backlog and Increment.", example: "A platform team runs two-week sprints with a single Product Owner prioritising internal-customer requests, and demos a working golden-path template at every review." },
  { name: "Extreme Programming (XP)", category: "Agile & Lean", description: "Engineering practices that make change cheap: pair programming, test-driven development, continuous integration, small releases, refactoring, simple design and collective code ownership. Much of modern DevOps engineering discipline comes from XP.", example: "A team with a high change-failure rate adopts TDD and trunk-based CI from XP before changing anything about its process; failures fall because the code is safer to change." },
  { name: "Kanban", category: "Agile & Lean", description: "A flow method: visualise the work, limit work in progress, manage flow, make policies explicit, and improve continuously. No fixed iterations or roles; improvement comes from reducing WIP and measuring lead time and throughput.", example: "An SRE team handling unpredictable requests uses a Kanban board with a WIP limit of three per person, and lead time drops because work stops waiting in half-finished states." },
  { name: "Scrumban", category: "Agile & Lean", description: "A hybrid that keeps Scrum's cadence (planning, review, retrospective) and adds Kanban's WIP limits and pull-based flow. Often used by teams that mix planned features with interrupt-driven work.", example: "A product team keeps fortnightly reviews for stakeholders but pulls work continuously from a WIP-limited board instead of committing to a fixed sprint scope." },
  { name: "Lean Software Development", category: "Agile & Lean", description: "Mary and Tom Poppendieck's translation of Lean manufacturing into seven principles: eliminate waste, build quality in, create knowledge, defer commitment, deliver fast, respect people, and optimise the whole.", example: "Optimise the whole: speeding up coding means nothing if releases still wait three weeks for a change board, so the team targets the release queue first." },
  { name: "SAFe (Scaled Agile Framework)", category: "Agile & Lean", description: "A framework for running agile across many teams. Teams of teams form Agile Release Trains (ARTs) aligned to value streams and plan together in Program Increment (PI) Planning, usually every 8–12 weeks. Configurations range from Essential to Large Solution, Portfolio and Full SAFe.", example: "Ten teams building one banking platform hold two-day PI Planning to agree objectives and surface cross-team dependencies on a shared programme board." },
  { name: "Lean Portfolio Management (LPM)", category: "Agile & Lean", description: "Funding and governing value streams instead of projects. LPM covers strategy and investment funding, agile portfolio operations and lean governance. Large initiatives (epics) move through a Portfolio Kanban with a lean business case and a minimum viable product to test the hypothesis.", example: "Instead of approving a two-year project budget up front, leadership funds a payments value stream quarterly and lets it decide which epics to build, reviewing outcomes rather than plans." },
  { name: "LeSS (Large-Scale Scrum)", category: "Agile & Lean", description: "Scaling by de-scaling: many teams work on one product with one Product Backlog, one Product Owner and one shared sprint. It removes roles and layers rather than adding them.", example: "Six feature teams share a single backlog and sprint review for one product, avoiding a separate integration team and a programme-management layer." },
  { name: "Nexus", category: "Agile & Lean", description: "Scrum.org's scaling framework for 3–9 Scrum teams working on one product. A Nexus Integration Team owns the integration of everyone's work into one increment each sprint.", example: "Four teams on a mobile app add Nexus Sprint Planning and a Nexus Integration Team, so integration problems surface every sprint instead of at release." },
  { name: "Scrum@Scale", category: "Agile & Lean", description: "Jeff Sutherland's approach to scaling Scrum through a scale-free architecture: teams form a Scrum of Scrums, coordinated by a Scrum of Scrums Master and an Executive Action Team, with a parallel Product Owner cycle for prioritisation.", example: "Five teams form a Scrum of Scrums; impediments they cannot solve go to an Executive Action Team that meets weekly to remove organisational blockers." },
  { name: "Disciplined Agile (DA)", category: "Agile & Lean", description: "A PMI toolkit that helps teams choose their way of working (WoW) from options drawn from Scrum, Kanban, XP, SAFe and others, based on context, rather than prescribing one framework.", example: "A regulated team picks a Kanban-based lifecycle with stronger documentation gates, while a start-up-style team in the same company uses a lean lifecycle." },
  { name: "DSDM / AgilePM", category: "Agile & Lean", description: "An agile project framework that fixes time, cost and quality and flexes scope, using MoSCoW prioritisation (Must, Should, Could, Won't have) and timeboxes. Popular where governance expects project structure.", example: "A compliance deadline is fixed, so the team agrees which features are Musts and lets the Coulds drop if the timebox runs short." },
  { name: "Feature-Driven Development (FDD)", category: "Agile & Lean", description: "A model-driven, short-iteration process built around client-valued features. It starts with an overall domain model, then plans, designs and builds feature by feature, with class ownership and chief programmers.", example: "A large enterprise system is delivered as a list of features such as 'calculate the total of a sale', each designed and built within two weeks." },
  { name: "Crystal", category: "Agile & Lean", description: "Alistair Cockburn's family of methods (Crystal Clear, Yellow, Orange and more) scaled by team size and how critical the system is. It emphasises people, frequent delivery, close communication and reflective improvement over fixed process.", example: "A three-person team in one room uses Crystal Clear's light process; a 40-person safety-critical programme needs a heavier Crystal variant." },
  { name: "5S", category: "Agile & Lean", description: "A Lean workplace-organisation method: Sort (Seiri), Set in order (Seiton), Shine (Seiso), Standardise (Seiketsu) and Sustain (Shitsuke). In software it applies to repositories, pipelines, dashboards and backlogs as much as to physical spaces.", example: "Applying 5S to a cloud account: delete unused resources (Sort), tag and group the rest (Set in order), fix noisy alerts (Shine), codify standards as policy (Standardise), and review monthly (Sustain)." },
  { name: "Kaizen", category: "Agile & Lean", description: "Continuous improvement through many small, frequent changes made by the people doing the work, rather than occasional large transformations.", example: "Every retrospective produces one small, owned improvement, such as cutting two minutes from the build, and the gains compound over a year." },
  { name: "Muda (the Eight Wastes)", category: "Agile & Lean", description: "Lean's categories of waste, often remembered as DOWNTIME: Defects, Overproduction, Waiting, Non-utilised talent, Transportation, Inventory, Motion and Extra-processing. Software equivalents include partially done work, handoffs, task switching and unused features.", example: "A value-stream map shows a change spends 90% of its lead time waiting for review and approval, which faster coding will never fix." },
  { name: "Gemba", category: "Agile & Lean", description: "The real place: go to where the work happens to understand it, instead of managing from reports.", example: "A leader sits with the on-call engineer for a shift and learns more about operational pain than a month of dashboards showed." },

  // Purpose
  { name: "Ikigai", category: "Purpose", description: "A Japanese idea of a reason for being, often drawn as the overlap of four circles: what you love, what you are good at, what the world needs, and what you can be paid for. The pairwise overlaps are passion, mission, vocation and profession.", example: "An engineer who loves teaching, is good at cloud architecture and sees teams struggling with cloud costs finds their ikigai in mentoring and building practical FinOps guidance." },
  // Problem Solving
  { name: "Root Cause Analysis (RCA)", category: "Problem Solving", description: "A structured search for the underlying cause of a problem, so you fix the system that produced it rather than the symptom. Usually combines evidence gathering (timelines, logs, data) with tools such as the 5 Whys, fishbone diagrams and fault trees.", example: "An outage is 'fixed' by restarting a service; RCA finds the real cause was a missing connection-pool limit, and the fix is a config change plus an alert." },
  { name: "5 Whys", category: "Problem Solving", description: "Ask 'why?' repeatedly (about five times) until you reach a cause you can act on. Simple and fast, but it follows a single chain, so use it with evidence and check for several contributing causes.", example: "Deploy failed → test timed out → test environment was slow → shared database was overloaded → nightly batch job runs at the same time. Fix: move the batch job or isolate the test database." },
  { name: "Fishbone (Ishikawa) Diagram", category: "Problem Solving", description: "A cause-and-effect diagram: the problem is the fish's head, and the bones are categories of possible causes, classically the 6 Ms (Methods, Machines, Materials, Measurements, Mother Nature/Environment, Manpower/People). In software, People, Process, Technology, Tooling, Environment and Dependencies work well.", example: "A team maps causes of slow releases across Process (manual approvals), Tooling (flaky tests), Environment (shared staging) and People (one release owner), then targets the two biggest bones first." },
  { name: "Fault Tree Analysis (FTA)", category: "Problem Solving", description: "A top-down, logic-based analysis: start from an unwanted event and break it into the combinations of lower-level failures (joined by AND/OR gates) that could cause it.", example: "Checkout down = (payment API fails AND no fallback) OR (database unavailable). The AND gate shows that adding a fallback removes a whole branch of risk." },
  { name: "FMEA (Failure Mode and Effects Analysis)", category: "Problem Solving", description: "A bottom-up, proactive review of how each component can fail, the effect of each failure, and how likely and detectable it is. Scoring severity, occurrence and detection gives a Risk Priority Number to rank fixes.", example: "Before launch, a team lists failure modes for each service in a payment flow and adds retries, timeouts and alerts to the three highest-scoring ones." },
  { name: "Pre-mortem", category: "Problem Solving", description: "Before starting, imagine the project has already failed, and ask everyone to write down why. It makes it safe to voice concerns and surfaces risks that optimism hides.", example: "A migration team imagines the cut-over failed and lists reasons: untested rollback, DNS TTLs, a forgotten batch job. Each becomes a task in the plan." },
  { name: "Blameless Post-mortem", category: "Problem Solving", description: "An incident review that focuses on how the system and process allowed a failure, not on who made the mistake. People share what really happened when they are not afraid of blame, which is the only way to find real causes.", example: "Instead of 'engineer ran the wrong command', the review finds the runbook was ambiguous and production and staging terminals looked identical, and fixes both." },
  { name: "Swiss Cheese Model", category: "Problem Solving", description: "James Reason's model of accidents: every layer of defence has holes, and a failure happens when the holes in several layers line up. Safety comes from multiple imperfect layers, not one perfect one.", example: "A bad config reached production because code review, automated tests and canary analysis each had a gap at the same time. Closing any one would have stopped it." },
  { name: "PDCA (Deming Cycle)", category: "Problem Solving", description: "Plan, Do, Check, Act: a loop for continuous improvement. Plan a change, try it on a small scale, check the results against the expectation, then adopt, adapt or abandon it.", example: "Plan: add WIP limits to reduce lead time. Do: trial with one team for a month. Check: lead time fell 30%. Act: roll out to other teams." },
  { name: "DMAIC", category: "Problem Solving", description: "Six Sigma's improvement cycle: Define the problem, Measure current performance, Analyse root causes, Improve the process, Control to sustain the gains.", example: "A team defines high change-failure rate as the problem, measures it per service, analyses the causes, adds contract tests, then controls it with a dashboard and alert." },
  { name: "A3 Problem Solving", category: "Problem Solving", description: "Toyota's practice of fitting the whole problem-solving story on one A3 sheet: background, current state, goal, root-cause analysis, countermeasures, plan and follow-up. The constraint forces clear thinking and makes it easy to share.", example: "A one-page A3 on rising cloud costs shows the trend, the three drivers, the agreed countermeasures and owners, and is reviewed in ten minutes at the monthly ops review." },
  { name: "Rubber Duck Debugging", category: "Problem Solving", description: "Explain the problem, line by line, to someone (or something) that knows nothing about it. Putting it into words often exposes the faulty assumption.", example: "Halfway through explaining a failing pipeline step to a colleague, an engineer realises the variable is set in a different job's scope." },

  // Creative Thinking
  { name: "Six Thinking Hats", category: "Creative Thinking", description: "Edward de Bono's method for parallel thinking: the group looks at a problem through one lens at a time. White: facts and data. Red: feelings and intuition. Black: risks and caution. Yellow: benefits and optimism. Green: creativity and alternatives. Blue: process and control of the discussion.", example: "An architecture review spends ten minutes per hat, so the risk-focused Black hat cannot drown out Green hat ideas, and everyone looks at the same angle together." },
  { name: "SCAMPER", category: "Creative Thinking", description: "A checklist of prompts for generating ideas from something that exists: Substitute, Combine, Adapt, Modify (magnify/minify), Put to another use, Eliminate, Reverse (rearrange).", example: "Applied to an on-call rota: Eliminate pages with no action; Combine two low-traffic services into one rota; Reverse the escalation so the service owner is paged first." },
  { name: "Mind Mapping", category: "Creative Thinking", description: "A visual way to explore a topic: start with a central idea and branch out into related ideas, sub-ideas and connections. It mirrors how associations form and helps spot gaps and links.", example: "Planning a FinOps programme as a mind map: visibility, optimisation, culture and forecasting branches show that culture has no owner yet." },

  // Decision Making
  { name: "Cynefin Framework", category: "Decision Making", description: "Dave Snowden's sense-making model with five domains. Clear: best practice applies (sense, categorise, respond). Complicated: experts analyse (sense, analyse, respond). Complex: cause and effect only clear in hindsight (probe, sense, respond). Chaotic: act first to stabilise (act, sense, respond). Confusion: you do not yet know which domain you are in.", example: "Patching a server is Clear; designing a database schema is Complicated; changing team culture is Complex and needs safe-to-fail experiments; a major outage is Chaotic, so stabilise first." },
  { name: "OODA Loop", category: "Decision Making", description: "John Boyd's cycle: Observe, Orient, Decide, Act. Whoever cycles through it faster, and orients better, outmanoeuvres the other. Orientation (your mental models and context) is the part that matters most.", example: "During an incident, the team that quickly observes metrics, orients on recent changes, decides to roll back and acts, recovers faster than one debating root cause first." },
  { name: "SWOT Analysis", category: "Decision Making", description: "A structured look at internal Strengths and Weaknesses and external Opportunities and Threats, to inform strategy.", example: "A platform team's SWOT: strong automation (S), thin documentation (W), demand for self-service AI tooling (O), vendor price rises (T)." },
  { name: "Kepner-Tregoe Decision Analysis", category: "Decision Making", description: "A rational process: state the decision, split criteria into MUSTs (non-negotiable) and WANTs (weighted), score options against them, then assess the risks of the best option before choosing.", example: "Choosing an observability platform: options that fail the MUST 'data stays in-region' are dropped; the rest are scored on weighted WANTs like cost and OpenTelemetry support." },
  { name: "Weighted Decision Matrix", category: "Decision Making", description: "List options as rows and criteria as columns, weight each criterion by importance, score each option, and compare weighted totals. It makes trade-offs explicit and arguments about weights more useful than arguments about answers.", example: "Comparing three CI tools on cost (weight 3), security (5), ease of use (2) and ecosystem (4) shows the cheapest option ranks last." },

  // Agile & Lean (additional)
  { name: "Value Stream Mapping", category: "Agile & Lean", description: "Draw every step from request to customer value, with process time and wait time for each. The map shows where work waits, which is usually where most of the lead time goes.", example: "Mapping idea-to-production shows 2 days of work inside a 31-day lead time; most of the rest is waiting for approvals and environments." },
  { name: "Theory of Constraints", category: "Agile & Lean", description: "Eliyahu Goldratt's idea that every system has one constraint that limits its output. Identify it, exploit it, subordinate everything else to it, elevate it, then repeat; improving anything else does not help.", example: "If code review is the bottleneck, more developers just lengthen the review queue; adding AI first-pass review and pairing raises throughput." },
  // Strategy, management and systems laws
  { name: "OKRs (Objectives and Key Results)", category: "Management", description: "A goal-setting method popularised by Andy Grove at Intel and John Doerr at Google. An Objective is a qualitative, inspiring goal; three to five Key Results are measurable outcomes that show it was achieved. OKRs work best when they describe outcomes, not tasks, and are set at least partly bottom-up.", example: "Objective: make releases boring. Key results: deployment frequency from weekly to daily; change failure rate below 10%; time to restore under one hour." },
  { name: "Wardley Mapping", category: "Strategy", description: "Simon Wardley's strategy maps: plot the components of a value chain by visibility to the user (vertical) and by evolution from Genesis through Custom-built and Product to Commodity (horizontal). Everything moves right over time, which shows what to build, buy, rent or outsource.", example: "Mapping a platform shows compute and databases are commodities (use the cloud), while a domain-specific risk engine is still custom and is where engineering effort should go." },
  { name: "Conway's Law", category: "Systems", description: "Organisations design systems that mirror their own communication structures (Melvin Conway, 1967). The Inverse Conway Manoeuvre deliberately shapes teams to get the architecture you want.", example: "Three teams that rarely talk produce three loosely integrated services with a messy shared database; organising teams around business domains leads to cleaner, domain-aligned services." },
  { name: "Goodhart's Law", category: "Economics", description: "When a measure becomes a target, it ceases to be a good measure. People optimise the number instead of the outcome it was meant to reflect.", example: "Targeting 90% code coverage produces tests that execute lines without checking behaviour; tracking change failure rate alongside coverage keeps the measure honest." },
];

/** Situations a reader arrives with; the primary way to browse the library. */
const SITUATIONS = [
  'Diagnose a problem',
  'Make a decision',
  'Plan and prioritise',
  'Improve flow and delivery',
  'Lead and influence people',
  'Think strategically',
  'Understand systems and risk',
  'Understand people and bias',
  'Think clearly',
  'Generate ideas',
  'Grow yourself',
] as const;
type Situation = typeof SITUATIONS[number];

/** Default situation for each discipline category. */
const SITUATION_BY_CATEGORY: Record<string, Situation> = {
  'Agile & Lean': 'Improve flow and delivery',
  'Biology': 'Understand systems and risk',
  'Cognitive': 'Think clearly',
  'Communication': 'Lead and influence people',
  'Core Thinking': 'Think clearly',
  'Creative Thinking': 'Generate ideas',
  'Decision Making': 'Make a decision',
  'Economics': 'Think strategically',
  'Engineering': 'Understand systems and risk',
  'Leadership': 'Lead and influence people',
  'Logic': 'Think clearly',
  'Management': 'Plan and prioritise',
  'Math': 'Think clearly',
  'Model Thinking': 'Understand systems and risk',
  'Physics': 'Think strategically',
  'Probability': 'Make a decision',
  'Problem Solving': 'Diagnose a problem',
  'Psychology': 'Understand people and bias',
  'Purpose': 'Grow yourself',
  'Scientific': 'Think clearly',
  'Strategy': 'Think strategically',
  'Systems': 'Understand systems and risk',
};

/** Models whose best-fit situation differs from their category default (matched by name prefix). */
const SITUATION_OVERRIDES: [string, Situation][] = [
  ['Lateral Thinking', 'Generate ideas'],
  ['Divergent vs Convergent', 'Generate ideas'],
  ['Binary Search', 'Diagnose a problem'],
  ['Divide and Conquer', 'Diagnose a problem'],
  ['Making Mistakes', 'Grow yourself'],
  ['Circle of Competence', 'Grow yourself'],
  ['Regret Minimization', 'Grow yourself'],
  ['Growth Mindset', 'Grow yourself'],
  ['Deliberate Practice', 'Grow yourself'],
  ['Imposter Syndrome', 'Grow yourself'],
  ['Culture of Lifelong Learning', 'Grow yourself'],
  ['Pain + Reflection', 'Grow yourself'],
  ['Pareto Principle', 'Plan and prioritise'],
  ['Technical Debt', 'Plan and prioritise'],
  ['Reversible vs Irreversible', 'Make a decision'],
  ['Sunk Cost', 'Make a decision'],
  ['Scenario Analysis', 'Make a decision'],
  ['Peter Principle', 'Lead and influence people'],
  ['Directly Responsible Individual', 'Lead and influence people'],
  ['Makers vs Manager', 'Lead and influence people'],
  ['Incentives', 'Lead and influence people'],
  ["Goodhart's Law", 'Lead and influence people'],
  ['Six Sigma', 'Improve flow and delivery'],
  ['PDCA', 'Improve flow and delivery'],
  ['DMAIC', 'Improve flow and delivery'],
  ['Minimum Viable Product', 'Improve flow and delivery'],
  ['Time Value Of Shipping', 'Improve flow and delivery'],
  ['Version two is a lie', 'Improve flow and delivery'],
  ['Velocity vs Speed', 'Improve flow and delivery'],
  ['Use checklists', 'Improve flow and delivery'],
  ['Black Swan', 'Understand systems and risk'],
  ['Unknown Unknowns', 'Understand systems and risk'],
  ['Laws of Thermodynamics', 'Understand systems and risk'],
  ['Half-life', 'Understand systems and risk'],
  ['Heisenberg', 'Understand systems and risk'],
  ['Pre-mortem', 'Understand systems and risk'],
  ['FMEA', 'Understand systems and risk'],
  ['Swiss Cheese', 'Understand systems and risk'],
];

const situationOf = (m: MentalModel): Situation =>
  SITUATION_OVERRIDES.find(([prefix, s]) => m.name.startsWith(prefix) && !(prefix === 'Sunk Cost' && m.category === 'Psychology'))?.[1]
  ?? SITUATION_BY_CATEGORY[m.category] ?? 'Think clearly';

/** Stable anchor id for linking to one model, e.g. #six-thinking-hats. */
const slugOf = (name: string) => name.toLowerCase()
  .replace(/[’']/g, '')
  .replace(/\(.*?\)/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const situationIcon = (s: Situation) => {
  switch (s) {
    case 'Diagnose a problem': return <Wrench className="w-5 h-5" />;
    case 'Make a decision': return <Target className="w-5 h-5" />;
    case 'Plan and prioritise': return <BarChart className="w-5 h-5" />;
    case 'Improve flow and delivery': return <Workflow className="w-5 h-5" />;
    case 'Lead and influence people': return <Users className="w-5 h-5" />;
    case 'Think strategically': return <Zap className="w-5 h-5" />;
    case 'Understand systems and risk': return <Layers className="w-5 h-5" />;
    case 'Understand people and bias': return <Shield className="w-5 h-5" />;
    case 'Think clearly': return <Brain className="w-5 h-5" />;
    case 'Generate ideas': return <Lightbulb className="w-5 h-5" />;
    case 'Grow yourself': return <Compass className="w-5 h-5" />;
  }
};

const MODELS = MENTAL_MODELS.map(m => ({ ...m, situation: situationOf(m), slug: slugOf(m.name) }));

const MentalModels: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<'All' | Situation>('All');
  const [highlight, setHighlight] = useState<string | null>(null);

  // Opening /explore/mental-models#six-thinking-hats scrolls to and highlights that card.
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id || !MODELS.some(m => m.slug === id)) return;
      setSelected('All');
      setSearchTerm('');
      setHighlight(id);
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    };
    open();
    window.addEventListener('hashchange', open);
    return () => window.removeEventListener('hashchange', open);
  }, []);

  const counts = useMemo(() => {
    const c = new Map<string, number>();
    MODELS.forEach(m => c.set(m.situation, (c.get(m.situation) ?? 0) + 1));
    return c;
  }, []);

  const q = searchTerm.toLowerCase();
  const filteredModels = MODELS.filter(model =>
    (selected === 'All' || model.situation === selected) &&
    (!q || model.name.toLowerCase().includes(q) || model.description.toLowerCase().includes(q) || model.category.toLowerCase().includes(q)));

  const chip = (label: string, active: boolean, onClick: () => void, count: number) => (
    <button key={label} type="button" onClick={onClick} aria-pressed={active}
      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${active
        ? 'bg-primary text-white border-primary dark:bg-secondary dark:text-primary dark:border-secondary'
        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-secondary'}`}>
      {label} <span className="opacity-60">{count}</span>
    </button>
  );

  return (
    <SimplePage
      title="Mental Models for Engineering Leaders"
      subtitle="A library of frameworks for thinking, deciding and solving problems, organised by the situation you are in."
    >
      <div className="mb-12 space-y-6">
        {/* Search and situation filter */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            id="model-search"
            type="search"
            aria-label="Search mental models"
            placeholder="Search mental models…"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-secondary outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">What are you trying to do?</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by situation">
            {chip('All', selected === 'All', () => setSelected('All'), MODELS.length)}
            {SITUATIONS.map(s => chip(s, selected === s, () => setSelected(s), counts.get(s) ?? 0))}
          </div>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
          Showing {filteredModels.length} of {MODELS.length} models
        </p>

        {/* Grid of models */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map(model => (
            <article
              key={model.slug}
              id={model.slug}
              className={`scroll-mt-24 p-6 rounded-2xl border bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all group ${highlight === model.slug
                ? 'border-secondary ring-2 ring-secondary'
                : 'border-slate-100 dark:border-slate-800'}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-secondary-dark dark:text-secondary group-hover:bg-secondary group-hover:text-primary transition-colors">
                  {situationIcon(model.situation)}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-primary dark:text-white leading-tight">
                    <a href={`#${model.slug}`} className="hover:underline focus-visible:underline">{model.name}</a>
                  </h3>
                  <div className="flex flex-wrap gap-x-2 text-xs font-semibold mt-1">
                    <span className="text-secondary-dark dark:text-secondary">{model.situation}</span>
                    <span className="text-slate-400 uppercase tracking-wider">· {model.category}</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                {model.description}
              </p>
              {model.example && (
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border-l-4 border-secondary">
                  <p className="text-xs italic text-slate-500 dark:text-slate-400">
                    <span className="font-bold not-italic text-secondary-dark dark:text-secondary mr-1">Example:</span>
                    {model.example}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>

        {filteredModels.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500">No mental models match. Try another word, or choose All.</p>
          </div>
        )}
      </div>

      <div className="mt-12 p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4">Why Mental Models?</h2>
          <p className="text-slate-300 max-w-2xl leading-relaxed">
            Mental models are chunks of knowledge from various disciplines that help us understand how the world works.
            By building a "latticework" of these models, we can make better decisions, solve complex problems, and
            avoid common cognitive traps. As Charlie Munger said, "You've got to have models in your head... and you've
            got to array your experience both vicarious and direct on this latticework of models."
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      </div>
    </SimplePage>
  );
};

export default MentalModels;
