
import { NavItem, TalkProps, ArticleProps, FinOpsChartData, GalleryImage } from './types';

export const PROFILE_IMAGE_URL = "https://media.licdn.com/dms/image/v2/D4D03AQFU1owfBTxUYw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1715523762536?e=1770854400&v=beta&t=0-jG3iMJ0s4UpL732iWLRQFrJA5-OeYnQTK2IRBR-Sk";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { 
    label: 'DevOps', 
    path: '/devops',
    children: [
      { label: 'DevOps Frameworks', path: '/devops/frameworks' },
      { label: 'Assessment', path: '/devops/assessment' },
      { label: 'Maturity Model', path: '/devops/maturity' },
      { label: 'Practices', path: '/devops/practices' },
      { label: 'Tool-stack', path: '/devops/tools' },
      { label: 'SRE', path: '/devops/sre' },
      { label: 'Platform Engineering', path: '/devops/platform-engineering' },
      { label: 'Chaos Engineering', path: '/devops/chaos-engineering' },
      { label: 'Engineer Roadmap', path: '/devops/roadmap' },
    ]
  },
  { 
    label: 'SecOps', 
    path: '/secops',
    children: [
      { label: 'Cognitive DevSecOps', path: '/secops/cognitive-devsecops' },
      { label: 'SecOps Practices', path: '/secops/practices' },
      { label: 'DevSecOps Practices', path: '/secops/devsecops-practices' },
      { label: 'Principles', path: '/secops/principles' },
      { label: 'Automation & Tooling', path: '/secops/automation' },
      { label: 'Threat Modelling', path: '/secops/threat-modeling' },
      { label: 'Continuous Security', path: '/secops/continuous-security' },
      { label: 'Cloud Security', path: '/secops/cloud-security' },
      { label: 'SAST & DAST Tooling', path: '/secops/sast-dast' },
      { label: 'Container Security', path: '/secops/container-security' },
    ]
  },
  { 
    label: 'FinOps', 
    path: '/finops',
    children: [
      { label: 'FinOps Framework', path: '/finops/framework' },
      { label: 'Cost Visibility & Allocation', path: '/finops/cost-visibility' },
      { label: 'Optimization Strategies', path: '/finops/optimization' },
      { label: 'Unit Economics', path: '/finops/unit-economics' },
      { label: 'Forecasting & Budgeting', path: '/finops/forecasting' },
      { label: 'FinOps Culture', path: '/finops/culture' },
    ]
  },
  { 
    label: 'GenAI', 
    path: '/genai',
    children: [
      { label: 'GenAI Fundamentals', path: '/genai/fundamentals' },
      { label: 'LLMOps', path: '/genai/llmops' },
      { label: 'RAG Architecture', path: '/genai/rag' },
      { label: 'AI Agents', path: '/genai/agents' },
      { label: 'Governance & Ethics', path: '/genai/governance' },
      { label: 'Prompt Engineering', path: '/genai/prompt-engineering' },
    ]
  },
  { 
    label: 'Architecture', 
    path: '/architecture',
    children: [
      { label: 'Design Patterns', path: '/architecture/design-patterns' },
      { label: 'SOLID Principles', path: '/architecture/solid-principles' },
      { label: 'System Design Process', path: '/architecture/system-design-process' },
      { label: 'Cloud Architecture', path: '/architecture/cloud-architecture' },
      { label: 'Data Architecture', path: '/architecture/data-architecture' },
      { label: 'Microservices', path: '/architecture/microservices' },
      { label: 'API Design', path: '/architecture/api-design' },
      { label: 'Security in Design', path: '/architecture/system-security' },
      { label: 'Twelve-Factor App', path: '/architecture/twelve-factor' },
      { label: 'Coding Standards', path: '/architecture/coding-standards' },
      { label: 'TOGAF', path: '/architecture/togaf' },
      { label: 'IT Governance', path: '/architecture/it-governance' },
      { label: 'Software Engineering', path: '/architecture/software-engineering' },
    ]
  },
  { 
    label: 'Explore', 
    children: [
      { label: 'Talks & Webinars', path: '/talks' },
      { label: 'Articles & Blog', path: '/articles' },
      { label: 'Photo Gallery', path: '/gallery' },
      { label: 'GitHub Profile Export', path: '/explore/github-profile' },
      { label: 'Book Summaries', path: '/explore/books' },
      { label: 'Certifications', path: '/explore/certifications' },
      { label: 'Mental Models', path: '/explore/mental-models' },
    ]
  },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const RECENT_TALKS: TalkProps[] = [
  {
    title: "Scaling DevSecOps in Enterprise",
    description: "Strategies for implementing security at speed in large organizations.",
    tags: ["DevOps", "SecOps"],
    audience: "CTOs, Engineering Managers",
    duration: "45 min"
  },
  {
    title: "The Financial Impact of Cloud Native",
    description: "How FinOps practices can reduce cloud spend by 30%.",
    tags: ["FinOps", "CloudOps"],
    audience: "Finance, Ops Leads",
    duration: "30 min"
  },
  {
    title: "GenAI: The New Team Member",
    description: "Operationalizing LLMs within your SRE workflows.",
    tags: ["GenAI", "AIOps"],
    audience: "Developers, SREs",
    duration: "60 min"
  }
];

export const FEATURED_ARTICLES: ArticleProps[] = [
  {
    title: "Cognitive DevSecOps: The Next Frontier",
    summary: "How Generative AI is transforming traditional DevSecOps into an intelligent, self-healing ecosystem.",
    tag: "GenAI",
    link: "/secops/cognitive-devsecops"
  },
  {
    title: "Fun with DevOps: Gamifying the Pipeline",
    summary: "How to increase engagement and reduce build failures through gamification strategies.",
    tag: "DevOps",
    link: "#"
  },
  {
    title: "SecOps: Bridging the Gap",
    summary: "Practical steps to align your security team with your agile delivery cycle.",
    tag: "SecOps",
    link: "#"
  },
  {
    title: "Becoming a FinOps Certified Practitioner",
    summary: "A study guide and roadmap for achieving your FinOps certification this year.",
    tag: "FinOps",
    link: "#"
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 101, title: 'Keynote at DevOps World', location: 'San Francisco', imgId: '1544531586-fde5298cdd40' },
  { id: 102, title: 'Workshop Session', location: 'London', imgId: '1531482615713-2afd69097998' },
  { id: 103, title: 'Team Brainstorming', location: 'Bangalore', imgId: '1552664730-d307ca884978' },
  { id: 104, title: 'Panel Discussion', location: 'Singapore', imgId: '1558403190-c7505d02f743' },
  { id: 105, title: 'Cloud Summit', location: 'New York', imgId: '1515187029135-18ee286d815b' },
  { id: 106, title: 'Mentoring Session', location: 'Remote', imgId: '1551836022-d5d88e9218df' },
  { id: 107, title: 'Hackathon Judge', location: 'Berlin', imgId: '1504384308090-c54be385e8ff' },
  { id: 108, title: 'Community Meetup', location: 'Mumbai', imgId: '1528605248644-14dd04022da1' },
];

export const FINOPS_DATA: FinOpsChartData[] = [
  { name: 'Q1', cost: 12000, savings: 2000 },
  { name: 'Q2', cost: 11500, savings: 3500 },
  { name: 'Q3', cost: 9800, savings: 5200 },
  { name: 'Q4', cost: 8500, savings: 6500 },
];
