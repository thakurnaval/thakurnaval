
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
  { label: 'Work With Me', path: '/work-with-me' },
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

// Add external conference, meetup, and webinar appearances here.
// Each entry needs: event, topic, year, location, type, and optional recordingUrl.
export const SPEAKING_APPEARANCES: SpeakingAppearance[] = [
  {
    event: 'SLB Cloud Computing SIG',
    topic: 'Cloud Cost Optimisation & FinOps Practices',
    year: '2022–2023',
    location: 'Pune, India (Internal Webinar Series)',
    type: 'Webinar',
  },
  {
    event: 'SLB Cloud Computing SIG',
    topic: 'GenAI Adoption in Enterprise Engineering',
    year: '2022–2023',
    location: 'Pune, India (Internal Webinar Series)',
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
    event: 'FinOps Foundation Community',
    topic: 'Cloud Financial Management & Tagging Strategy',
    year: '2022–2025',
    location: 'Virtual (FinOps Foundation)',
    type: 'Webinar',
  },
  // Add your external conference appearances below this line:
  // {
  //   event: 'Conference Name',
  //   topic: 'Talk Title',
  //   year: '2024',
  //   location: 'City, Country',
  //   type: 'Conference',
  //   recordingUrl: 'https://youtu.be/...',
  // },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  // Add real event photos here — each entry needs: title (event name), location, and src (local asset path e.g. 'assets/img/gallery/event-name.jpg')
  // Example: { id: 101, title: 'DevOps Community Meetup', location: 'Pune', src: 'assets/img/gallery/pune-meetup-2024.jpg' }
];

export const FINOPS_DATA: FinOpsChartData[] = [
  { name: 'Q1', cost: 12000, savings: 2000 },
  { name: 'Q2', cost: 11500, savings: 3500 },
  { name: 'Q3', cost: 9800, savings: 5200 },
  { name: 'Q4', cost: 8500, savings: 6500 },
];

export const PROJECTS: ProjectProps[] = [
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
