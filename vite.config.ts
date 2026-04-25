import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://nthakur.com'

interface SitemapRoute {
  path: string
  priority: number
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
}

const SITEMAP_ROUTES: SitemapRoute[] = [
  // Core Pages
  { path: '/',                    priority: 1.0,  changefreq: 'weekly'  },
  { path: '/cognitiveops',        priority: 0.95, changefreq: 'weekly'  },
  { path: '/assessments',         priority: 0.9,  changefreq: 'weekly'  },
  { path: '/newsletter',          priority: 0.8,  changefreq: 'weekly'  },
  { path: '/work-with-me',        priority: 0.7,  changefreq: 'monthly' },
  { path: '/community',           priority: 0.7,  changefreq: 'monthly' },
  { path: '/about',               priority: 0.6,  changefreq: 'monthly' },
  { path: '/projects',            priority: 0.7,  changefreq: 'monthly' },
  { path: '/case-studies',        priority: 0.7,  changefreq: 'monthly' },
  { path: '/contact',             priority: 0.6,  changefreq: 'monthly' },
  // Main Pillars
  { path: '/devops',              priority: 0.9,  changefreq: 'weekly'  },
  { path: '/secops',              priority: 0.9,  changefreq: 'weekly'  },
  { path: '/finops',              priority: 0.9,  changefreq: 'weekly'  },
  { path: '/genai',               priority: 0.9,  changefreq: 'weekly'  },
  { path: '/architecture',        priority: 0.9,  changefreq: 'weekly'  },
  { path: '/ai-sdlc',             priority: 0.9,  changefreq: 'weekly'  },
  // CognitiveOps Subpages
  { path: '/cognitiveops/assessment', priority: 0.9, changefreq: 'weekly'  },
  { path: '/cognitiveops/playbook',   priority: 0.8, changefreq: 'monthly' },
  // DevOps Subpages
  { path: '/devops/frameworks',            priority: 0.8, changefreq: 'monthly' },
  { path: '/devops/assessment',            priority: 0.8, changefreq: 'monthly' },
  { path: '/devops/maturity',              priority: 0.8, changefreq: 'monthly' },
  { path: '/devops/practices',             priority: 0.8, changefreq: 'monthly' },
  { path: '/devops/tools',                 priority: 0.8, changefreq: 'monthly' },
  { path: '/devops/sre',                   priority: 0.8, changefreq: 'monthly' },
  { path: '/devops/platform-engineering',  priority: 0.8, changefreq: 'monthly' },
  { path: '/devops/chaos-engineering',     priority: 0.8, changefreq: 'monthly' },
  { path: '/devops/roadmap',               priority: 0.8, changefreq: 'monthly' },
  // SecOps Subpages
  { path: '/secops/cognitive-devsecops',   priority: 0.8, changefreq: 'monthly' },
  { path: '/secops/practices',             priority: 0.8, changefreq: 'monthly' },
  { path: '/secops/devsecops-practices',   priority: 0.8, changefreq: 'monthly' },
  { path: '/secops/principles',            priority: 0.8, changefreq: 'monthly' },
  { path: '/secops/automation',            priority: 0.8, changefreq: 'monthly' },
  { path: '/secops/threat-modeling',       priority: 0.8, changefreq: 'monthly' },
  { path: '/secops/continuous-security',   priority: 0.8, changefreq: 'monthly' },
  { path: '/secops/cloud-security',        priority: 0.8, changefreq: 'monthly' },
  { path: '/secops/sast-dast',             priority: 0.8, changefreq: 'monthly' },
  { path: '/secops/container-security',    priority: 0.8, changefreq: 'monthly' },
  { path: '/secops/assessment',            priority: 0.8, changefreq: 'monthly' },
  // FinOps Subpages
  { path: '/finops/framework',             priority: 0.8, changefreq: 'monthly' },
  { path: '/finops/cost-visibility',       priority: 0.8, changefreq: 'monthly' },
  { path: '/finops/optimization',          priority: 0.8, changefreq: 'monthly' },
  { path: '/finops/unit-economics',        priority: 0.8, changefreq: 'monthly' },
  { path: '/finops/forecasting',           priority: 0.8, changefreq: 'monthly' },
  { path: '/finops/culture',               priority: 0.8, changefreq: 'monthly' },
  { path: '/finops/assessment',            priority: 0.8, changefreq: 'monthly' },
  // GenAI Subpages
  { path: '/genai/fundamentals',           priority: 0.8, changefreq: 'monthly' },
  { path: '/genai/llmops',                 priority: 0.8, changefreq: 'monthly' },
  { path: '/genai/rag',                    priority: 0.8, changefreq: 'monthly' },
  { path: '/genai/agents',                 priority: 0.8, changefreq: 'monthly' },
  { path: '/genai/governance',             priority: 0.8, changefreq: 'monthly' },
  { path: '/genai/prompt-engineering',     priority: 0.8, changefreq: 'monthly' },
  { path: '/genai/assessment',             priority: 0.8, changefreq: 'monthly' },
  // Architecture Subpages
  { path: '/architecture/design-patterns',      priority: 0.8, changefreq: 'monthly' },
  { path: '/architecture/solid-principles',     priority: 0.8, changefreq: 'monthly' },
  { path: '/architecture/system-design-process',priority: 0.8, changefreq: 'monthly' },
  { path: '/architecture/cloud-architecture',   priority: 0.8, changefreq: 'monthly' },
  { path: '/architecture/data-architecture',    priority: 0.8, changefreq: 'monthly' },
  { path: '/architecture/microservices',        priority: 0.8, changefreq: 'monthly' },
  { path: '/architecture/api-design',           priority: 0.8, changefreq: 'monthly' },
  { path: '/architecture/system-security',      priority: 0.8, changefreq: 'monthly' },
  { path: '/architecture/twelve-factor',        priority: 0.8, changefreq: 'monthly' },
  { path: '/architecture/coding-standards',     priority: 0.8, changefreq: 'monthly' },
  { path: '/architecture/togaf',                priority: 0.8, changefreq: 'monthly' },
  { path: '/architecture/it-governance',        priority: 0.8, changefreq: 'monthly' },
  { path: '/architecture/software-engineering', priority: 0.8, changefreq: 'monthly' },
  { path: '/architecture/assessment',           priority: 0.8, changefreq: 'monthly' },
  // AI in SDLC Subpages
  { path: '/ai-sdlc/coding',       priority: 0.8, changefreq: 'monthly' },
  { path: '/ai-sdlc/testing',      priority: 0.8, changefreq: 'monthly' },
  { path: '/ai-sdlc/requirements', priority: 0.8, changefreq: 'monthly' },
  { path: '/ai-sdlc/code-review',  priority: 0.8, changefreq: 'monthly' },
  { path: '/ai-sdlc/deployment',   priority: 0.8, changefreq: 'monthly' },
  { path: '/ai-sdlc/monitoring',   priority: 0.8, changefreq: 'monthly' },
  // Assessment Pages
  { path: '/agile/assessment', priority: 0.8, changefreq: 'monthly' },
  { path: '/pm/assessment',    priority: 0.8, changefreq: 'monthly' },
  // Explore & Resources
  { path: '/talks',                      priority: 0.7, changefreq: 'monthly' },
  { path: '/articles',                   priority: 0.7, changefreq: 'weekly'  },
  { path: '/gallery',                    priority: 0.7, changefreq: 'monthly' },
  { path: '/explore/books',              priority: 0.7, changefreq: 'monthly' },
  { path: '/explore/certifications',     priority: 0.7, changefreq: 'monthly' },
  { path: '/explore/mental-models',      priority: 0.7, changefreq: 'monthly' },
  // Article Pages
  { path: '/articles/cloud-computing-fundamentals',   priority: 0.8, changefreq: 'monthly' },
  { path: '/articles/gamifying-devops-pipeline',      priority: 0.8, changefreq: 'monthly' },
  { path: '/articles/secops-bridging-the-gap',        priority: 0.8, changefreq: 'monthly' },
  { path: '/articles/finops-certified-practitioner',  priority: 0.8, changefreq: 'monthly' },
  // Talk Pages
  { path: '/talks/scaling-devsecops-enterprise',     priority: 0.7, changefreq: 'monthly' },
  { path: '/talks/financial-impact-cloud-native',    priority: 0.7, changefreq: 'monthly' },
  { path: '/talks/genai-new-team-member',            priority: 0.7, changefreq: 'monthly' },
  { path: '/talks/cultural-transformation-devops',   priority: 0.7, changefreq: 'monthly' },
  { path: '/talks/zero-trust-cloud-native',          priority: 0.7, changefreq: 'monthly' },
]

function sitemapPlugin(): Plugin {
  return {
    name: 'generate-sitemap',
    buildStart() {
      const today = new Date().toISOString().split('T')[0]
      const urlEntries = SITEMAP_ROUTES.map(r =>
        `  <url>\n    <loc>${BASE_URL}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority.toFixed(1)}</priority>\n  </url>`
      ).join('\n')
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`
      fs.writeFileSync(path.resolve('public/sitemap.xml'), xml, 'utf-8')
      console.log(`\n  ✓ sitemap.xml — ${SITEMAP_ROUTES.length} URLs written`)
    },
  }
}

export default defineConfig({
  plugins: [react(), sitemapPlugin()],
  base: '/',
})
