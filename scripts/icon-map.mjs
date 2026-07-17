// Keyword -> lucide-react icon name, used by generate-article.mjs to pick an icon
// for each `- **Label:** text` bullet without a human having to choose one.
// Vocabulary is drawn from icons already used across pages/articles/*.tsx and
// pages/Home.tsx so generated articles stay visually consistent with hand-built ones.
export const ICON_KEYWORDS = [
  [['cost', 'saving', 'budget', 'spend', 'price'], 'DollarSign'],
  [['scale', 'scalability', 'elastic'], 'Zap'],
  [['flexible', 'flexibility', 'anywhere'], 'Globe'],
  [['reliab', 'uptime', 'redundan'], 'RefreshCw'],
  [['secur', 'protect', 'compliance', 'risk'], 'Shield'],
  [['zero trust', 'identity', 'access control'], 'ShieldCheck'],
  [['alert', 'warning', 'pitfall', 'trap', 'danger'], 'AlertTriangle'],
  [['merge', 'pipeline', 'integrat'], 'GitMerge'],
  [['branch', 'version'], 'GitBranch'],
  [['done', 'complete', 'checklist', 'best practice'], 'CheckCircle2'],
  [['time', 'speed', 'fast', 'latency'], 'Clock'],
  [['team', 'people', 'collaborat', 'community'], 'Users'],
  [['layer', 'architecture', 'structure'], 'Layers'],
  [['cloud'], 'Cloud'],
  [['server', 'infrastructure', 'infra'], 'Server'],
  [['database', 'data store', 'storage'], 'Database'],
  [['game', 'gamif', 'engagement'], 'Gamepad2'],
  [['trophy', 'win', 'leaderboard'], 'Trophy'],
  [['growth', 'increase', 'improve'], 'TrendingUp'],
  [['decrease', 'reduce', 'decline'], 'TrendingDown'],
  [['metric', 'chart', 'analytics', 'measure'], 'BarChart3'],
  [['star', 'quality', 'excellen'], 'Star'],
  [['book', 'learn', 'study', 'guide', 'course'], 'BookOpen'],
  [['calendar', 'schedule', 'plan', 'timeline'], 'Calendar'],
  [['target', 'goal', 'objective'], 'Target'],
  [['award', 'certif', 'credential'], 'Award'],
  [['automat', 'workflow'], 'Workflow'],
  [['network', 'connect'], 'Network'],
  [['package', 'deploy', 'release', 'ship'], 'Package'],
  [['activity', 'monitor', 'observ'], 'Activity'],
  [['rocket', 'launch', 'accelerat'], 'Rocket'],
  [['setting', 'config', 'tuning'], 'Settings'],
  [['lock', 'encrypt', 'key', 'secret'], 'Lock'],
  [['idea', 'insight', 'innovat'], 'Lightbulb'],
  [['ai', 'genai', 'intelligen', 'agent', 'llm', 'model'], 'BrainCircuit'],
  [['cpu', 'compute', 'processing'], 'Cpu'],
  [['ownership', 'accountab', 'responsib'], 'Target'],
  [['document', 'report', 'file'], 'FileText'],
  [['feedback', 'review', 'communicat'], 'MessageSquare'],
  [['code', 'develop', 'engineer'], 'Code'],
  [['search', 'discover', 'find'], 'Search'],
  [['filter', 'sort'], 'Filter'],
  [['puzzle', 'complex', 'challenge'], 'Puzzle'],
  [['tool', 'wrench', 'fix', 'maintain'], 'Wrench'],
  [['notif', 'bell', 'remind'], 'Bell'],
  [['view', 'visib', 'transparen'], 'Eye'],
  [['forecast', 'predict', 'project'], 'LineChart'],
  [['map', 'roadmap', 'journey'], 'Compass'],
];

const GENERIC_ICON = 'Sparkles';

export function pickIcon(label) {
  const lower = label.toLowerCase();
  for (const [keywords, icon] of ICON_KEYWORDS) {
    if (keywords.some(kw => lower.includes(kw))) return icon;
  }
  return GENERIC_ICON;
}
