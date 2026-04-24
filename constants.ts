
import { NavItem, TalkProps, ArticleProps, FinOpsChartData, GalleryImage, ProjectProps, SpeakingAppearance } from './types';

export const PROFILE_IMAGE_URL = "/assets/img/profile.jpg";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'The Model', path: '/cognitiveops' },
  {
    label: 'Expertise',
    children: [
      { label: 'DevOps', path: '/devops' },
      { label: 'SecOps', path: '/secops' },
      { label: 'FinOps', path: '/finops' },
      { label: 'GenAI', path: '/genai' },
      { label: 'AI in SDLC', path: '/ai-sdlc' },
      { label: 'Architecture', path: '/architecture' },
    ]
  },
  {
    label: 'Insights',
    path: '/articles',
    children: [
      { label: 'Articles & Blog', path: '/articles' },
      { label: 'Talks & Webinars', path: '/talks' },
    ]
  },
  { label: 'Speaking', path: '/talks' },
  {
    label: 'About',
    children: [
      { label: 'About Naval', path: '/about' },
      { label: 'Case Studies', path: '/case-studies' },
      { label: 'Projects', path: '/projects' },
      { label: 'Photo Gallery', path: '/gallery' },
      { label: 'Book Summaries', path: '/explore/books' },
      { label: 'Certifications', path: '/explore/certifications' },
      { label: 'Mental Models', path: '/explore/mental-models' },
    ]
  },
  {
    label: 'Work With Me',
    children: [
      { label: 'Community & Mentoring', path: '/community' },
      { label: 'Speaking & Consulting', path: '/work-with-me' },
    ]
  },
];

export const RECENT_TALKS: TalkProps[] = [
  {
    title: "Scaling DevSecOps in Enterprise",
    description: "Strategies for implementing security at speed in large organizations.",
    tags: ["DevOps", "SecOps"],
    audience: "CTOs, Engineering Managers",
    duration: "45 min",
    link: "/talks/scaling-devsecops-enterprise"
  },
  {
    title: "The Financial Impact of Cloud Native",
    description: "How FinOps practices can reduce cloud spend by 30%.",
    tags: ["FinOps", "CloudOps"],
    audience: "Finance, Ops Leads",
    duration: "30 min",
    link: "/talks/financial-impact-cloud-native"
  },
  {
    title: "GenAI: The New Team Member",
    description: "Operationalizing LLMs within your SRE workflows.",
    tags: ["GenAI", "AIOps"],
    audience: "Developers, SREs",
    duration: "60 min",
    link: "/talks/genai-new-team-member"
  },
  {
    title: "Cultural Transformation in DevOps",
    description: "Moving beyond tools to address the human factor in technical change.",
    tags: ["Culture", "Management"],
    audience: "Leaders, HR",
    duration: "45 min",
    link: "/talks/cultural-transformation-devops"
  },
  {
    title: "Zero Trust Security for Cloud Native",
    description: "Implementing strict identity and network policies in K8s environments.",
    tags: ["SecOps", "Kubernetes"],
    audience: "Security Engineers",
    duration: "50 min",
    link: "/talks/zero-trust-cloud-native"
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
    summary: "How to increase team engagement and reduce build failures using the principles of game design — leaderboards, streaks, and fast feedback loops.",
    tag: "DevOps",
    link: "/articles/gamifying-devops-pipeline"
  },
  {
    title: "SecOps: Bridging the Gap",
    summary: "Practical steps to align your security team with your agile delivery cycle — closing the timing, language, and tooling gaps that create risk.",
    tag: "SecOps",
    link: "/articles/secops-bridging-the-gap"
  },
  {
    title: "Becoming a FinOps Certified Practitioner",
    summary: "A practitioner's 8-week study guide and real-world advice for passing the FOCP exam — from someone who has done it.",
    tag: "FinOps",
    link: "/articles/finops-certified-practitioner"
  }
];

export const SPEAKING_APPEARANCES: SpeakingAppearance[] = [
  {
    event: 'Software Engineering Bootcamp',
    topic: 'Agile, DevOps, Architecture & Coding Practices',
    year: '2024',
    location: 'Pune, India',
    type: 'Workshop',
    photoUrl: 'assets/img/gallery/Software-Engineering-Bootcamp-Pune-1.jpeg',
  },
  {
    event: 'SLB Cloud Computing SIG',
    topic: 'GenAI Adoption in Enterprise Engineering',
    year: '2022–2023',
    location: 'Pune, India (Internal Webinar Series)',
    type: 'Webinar',
  },
  {
    event: 'SLB Cloud Computing SIG',
    topic: 'Cloud Cost Optimisation & FinOps Practices',
    year: '2022–2023',
    location: 'Pune, India (Internal Webinar Series)',
    type: 'Webinar',
  },
  {
    event: 'FinOps Foundation Community',
    topic: 'Cloud Financial Management & Tagging Strategy',
    year: '2022–2025',
    location: 'Virtual (FinOps Foundation)',
    type: 'Webinar',
  },
  {
    event: 'SLB Open Source SIG',
    topic: 'Open Source Standards & Community-Led Innovation',
    year: '2021',
    location: 'Pune, India (Internal Webinar Series)',
    type: 'Webinar',
  },
  {
    event: '7 Habits of Highly Effective DevOps Teams',
    topic: '7 Habits of Highly Effective DevOps Teams',
    year: '2020',
    location: 'Pune, India',
    type: 'Workshop',
    photoUrl: 'assets/img/gallery/Session-7-habits-of-highly-effective-devops-teams.jpg',
  },
  {
    event: 'Pune DevCon 2019',
    topic: 'Automating Infrastructure (as Code) with Azure Pipelines — Terraform & SaltStack',
    year: '2019',
    location: 'MCCIA Trade Towers, Pune, India',
    type: 'Conference',
    photoUrl: 'assets/img/gallery/Session-DevCon-2019.jpg',
    flyerUrl: 'assets/img/gallery/DevCon.jpg',
  },
  {
    event: 'Global Azure Bootcamp 2019',
    topic: 'Creating Trust Economies using Blockchain Apps on Azure',
    year: '2019',
    location: 'MCCIA Trade Tower, Pune, India (Pune User Group)',
    type: 'Conference',
    photoUrl: 'assets/img/gallery/Session-Global-Azure-Bootcamp-2019.jpg',
    flyerUrl: 'assets/img/gallery/GAB2019.jpg',
  },
  {
    event: 'APGI 2019 Conference',
    topic: 'Achieving Enterprise-wide Agility using Technology Stack',
    year: '2019',
    location: 'Four Points by Sheraton, Pune, India',
    type: 'Conference',
    photoUrl: 'assets/img/gallery/Session-APGI-2019.jpg',
    flyerUrl: 'assets/img/gallery/APGI-2019.jpg',
  },
  {
    event: 'Microsoft DevCon Pune',
    topic: 'DevOps @ Microsoft — Tools & Practices',
    year: '2019',
    location: 'Pune, India',
    type: 'Conference',
    photoUrl: 'assets/img/gallery/Microsoft-DevCon-Pune.jpg',
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1,  title: 'Software Engineering Bootcamp',           location: 'Pune, India',                src: 'assets/img/gallery/Software-Engineering-Bootcamp-Pune-1.jpeg' },
  { id: 2,  title: 'Software Engineering Bootcamp',           location: 'Pune, India',                src: 'assets/img/gallery/Software-Engineering-Bootcamp-Pune-2.jpeg' },
  { id: 3,  title: 'Software Engineering Bootcamp',           location: 'Pune, India',                src: 'assets/img/gallery/Software-Engineering-Bootcamp-Pune-3.jpeg' },
  { id: 4,  title: 'APGI 2019 Conference',                    location: 'Pune, India',                src: 'assets/img/gallery/Session-APGI-2019.jpg' },
  { id: 5,  title: 'Global Azure Bootcamp 2019',              location: 'Pune, India',                src: 'assets/img/gallery/Session-Global-Azure-Bootcamp-2019.jpg' },
  { id: 6,  title: 'Microsoft DevCon Pune',                   location: 'Pune, India',                src: 'assets/img/gallery/Microsoft-DevCon-Pune.jpg' },
  { id: 7,  title: '7 Habits of Effective DevOps Teams',      location: 'Pune, India',                src: 'assets/img/gallery/Session-7-habits-of-highly-effective-devops-teams.jpg' },
  { id: 8,  title: 'Pune DevCon 2019',                        location: 'Pune, India',                src: 'assets/img/gallery/Session-DevCon-2019.jpg' },
  { id: 9,  title: 'MBA Convocation, MDI Gurgaon',            location: 'Gurgaon, India',             src: 'assets/img/gallery/naval-convocation.jpg' },
  { id: 10, title: 'Software Engineering Bootcamp',           location: 'Pune, India',                src: 'assets/img/gallery/Software-Engineering-Bootcamp-Pune-4.jpeg' },
  { id: 11, title: 'Software Engineering Bootcamp',           location: 'Pune, India',                src: 'assets/img/gallery/Software-Engineering-Bootcamp-Pune-5.jpeg' },
  { id: 12, title: 'APGI 2019 Conference',                    location: 'Pune, India',                src: 'assets/img/gallery/Session-APGI-2019-2.jpg' },
];

export const FINOPS_DATA: FinOpsChartData[] = [
  { name: 'Q1', cost: 12000, savings: 2000 },
  { name: 'Q2', cost: 11500, savings: 3500 },
  { name: 'Q3', cost: 9800, savings: 5200 },
  { name: 'Q4', cost: 8500, savings: 6500 },
];

export const PROJECTS: ProjectProps[] = [
  {
    title: "TrueNorth",
    description: "Enterprise-grade OKR management platform — the world's best OKR solution. Features full OKR hierarchy across all organisational levels, real-time progress analytics & forecasting, and cascading alignment with full dependency mapping. Built to move everyone in one direction.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "REST APIs", "Analytics"],
  },
  {
    title: "BookEx",
    description: "A community-driven book exchange platform built for parents, by parents in Pune. Enables families to share, lend, and discover books for children — reducing waste, cutting costs, and building neighbourhood community around reading.",
    technologies: ["React", "Node.js", "MongoDB", "Firebase"],
  },
  {
    title: "Generative AI for Beginners",
    description: "A comprehensive 21-lesson course to get started building with Generative AI. Covers fundamentals to advanced topics like RAG and AI Agents.",
    technologies: ["Python", "OpenAI", "Azure AI", "LangChain"],
    githubUrl: "https://github.com/thakurnaval/NT-generative-ai-for-beginners",
    liveUrl: "https://microsoft.github.io/generative-ai-for-beginners/"
  },
  {
    title: "AI Agents for Beginners",
    description: "11 Lessons to get started building AI Agents. Learn how to create autonomous agents that can perform complex tasks.",
    technologies: ["Python", "Semantic Kernel", "AutoGen", "LLMs"],
    githubUrl: "https://github.com/thakurnaval/NT-ai-agents-for-beginners"
  },
  {
    title: "90 Days Of DevOps",
    description: "A structured 90-day learning journey covering the entire DevOps landscape, from Linux fundamentals to advanced Kubernetes and CloudOps.",
    technologies: ["Linux", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    githubUrl: "https://github.com/thakurnaval/NT-90DaysOfDevOps"
  },
  {
    title: "30 Days Of FinOps",
    description: "A deep dive into Cloud Financial Management (FinOps). Documenting strategies for cloud cost optimization and visibility.",
    technologies: ["Azure", "AWS", "GCP", "FinOps Framework"],
    githubUrl: "https://github.com/thakurnaval/NT-30DaysOfFinOps"
  },
  {
    title: "Azure Orphan Resources",
    description: "A toolset to identify and centralize orphan resources in Azure environments, helping organizations reduce waste and improve security.",
    technologies: ["Azure", "PowerShell", "KQL", "Azure Resource Graph"],
    githubUrl: "https://github.com/thakurnaval/SoDi-azure-orphan-resources"
  },
  {
    title: "ML For Beginners",
    description: "A 12-week, 26-lesson curriculum focused on classic Machine Learning. Includes hands-on labs and quizzes.",
    technologies: ["Python", "Scikit-Learn", "Jupyter", "Data Science"],
    githubUrl: "https://github.com/thakurnaval/NT-ML-For-Beginners"
  }
];
