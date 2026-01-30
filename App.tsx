
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Loading Component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary dark:border-secondary"></div>
  </div>
);

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const DevOps = lazy(() => import('./pages/DevOps'));
const SecOps = lazy(() => import('./pages/SecOps'));
const FinOps = lazy(() => import('./pages/FinOps'));
const GenAI = lazy(() => import('./pages/GenAI'));
const Architecture = lazy(() => import('./pages/Architecture'));
const Talks = lazy(() => import('./pages/Talks'));
const Articles = lazy(() => import('./pages/Articles'));
const Gallery = lazy(() => import('./pages/Gallery'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

// DevOps Subpages
const DevOpsFrameworks = lazy(() => import('./pages/devops/DevOpsFrameworks'));
const DevOpsAssessment = lazy(() => import('./pages/devops/DevOpsAssessment'));
const DevOpsMaturity = lazy(() => import('./pages/devops/DevOpsMaturity'));
const DevOpsPractices = lazy(() => import('./pages/devops/DevOpsPractices'));
const DevOpsTools = lazy(() => import('./pages/devops/DevOpsTools'));
const SRE = lazy(() => import('./pages/devops/SRE'));
const PlatformEngineering = lazy(() => import('./pages/devops/PlatformEngineering'));
const ChaosEngineering = lazy(() => import('./pages/devops/ChaosEngineering'));
const DevOpsRoadmap = lazy(() => import('./pages/devops/DevOpsRoadmap'));

// SecOps Subpages
const CognitiveDevSecOps = lazy(() => import('./pages/secops/CognitiveDevSecOps'));
const SecOpsPractices = lazy(() => import('./pages/secops/SecOpsPractices'));
const DevSecOpsPractices = lazy(() => import('./pages/secops/DevSecOpsPractices'));
const SecOpsPrinciples = lazy(() => import('./pages/secops/SecOpsPrinciples'));
const SecOpsAutomation = lazy(() => import('./pages/secops/SecOpsAutomation'));
const ThreatModelling = lazy(() => import('./pages/secops/ThreatModelling'));
const ContinuousSecurity = lazy(() => import('./pages/secops/ContinuousSecurity'));
const CloudSecurity = lazy(() => import('./pages/secops/CloudSecurity'));
const SastDast = lazy(() => import('./pages/secops/SastDast'));
const ContainerSecurity = lazy(() => import('./pages/secops/ContainerSecurity'));

// FinOps Subpages
const FinOpsFramework = lazy(() => import('./pages/finops/FinOpsFramework'));
const CostVisibility = lazy(() => import('./pages/finops/CostVisibility'));
const OptimizationStrategies = lazy(() => import('./pages/finops/OptimizationStrategies'));
const UnitEconomics = lazy(() => import('./pages/finops/UnitEconomics'));
const Forecasting = lazy(() => import('./pages/finops/Forecasting'));
const FinOpsCulture = lazy(() => import('./pages/finops/FinOpsCulture'));

// GenAI Subpages
const GenAIFundamentals = lazy(() => import('./pages/genai/GenAIFundamentals'));
const LLMOps = lazy(() => import('./pages/genai/LLMOps'));
const RAGArchitecture = lazy(() => import('./pages/genai/RAGArchitecture'));
const AIAgents = lazy(() => import('./pages/genai/AIAgents'));
const AIGovernance = lazy(() => import('./pages/genai/AIGovernance'));
const PromptEngineering = lazy(() => import('./pages/genai/PromptEngineering'));

// Architecture Subpages
const DesignPatterns = lazy(() => import('./pages/architecture/DesignPatterns'));
const SolidPrinciples = lazy(() => import('./pages/architecture/SolidPrinciples'));
const SystemDesignProcess = lazy(() => import('./pages/architecture/SystemDesignProcess'));
const CloudArchitecture = lazy(() => import('./pages/architecture/CloudArchitecture'));
const DataArchitecture = lazy(() => import('./pages/architecture/DataArchitecture'));
const Microservices = lazy(() => import('./pages/architecture/Microservices'));
const ApiDesign = lazy(() => import('./pages/architecture/ApiDesign'));
const SystemSecurity = lazy(() => import('./pages/architecture/SystemSecurity'));
const TwelveFactor = lazy(() => import('./pages/architecture/TwelveFactor'));
const CodingStandards = lazy(() => import('./pages/architecture/CodingStandards'));
const TOGAF = lazy(() => import('./pages/architecture/TOGAF'));
const ITGovernance = lazy(() => import('./pages/architecture/ITGovernance'));
const SoftwareEngineering = lazy(() => import('./pages/architecture/SoftwareEngineering'));

// Explore Subpages
const BookSummaries = lazy(() => import('./pages/explore/BookSummaries'));
const Certifications = lazy(() => import('./pages/explore/Certifications'));
const MentalModels = lazy(() => import('./pages/explore/MentalModels'));
const GithubProfile = lazy(() => import('./pages/explore/GithubProfile'));

// Scroll handling is managed by Layout.tsx using useLocation hook

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Main Pillars */}
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/devops" element={<DevOps />} />
            <Route path="/secops" element={<SecOps />} />
            <Route path="/finops" element={<FinOps />} />
            <Route path="/genai" element={<GenAI />} />
            
            {/* DevOps Subpages */}
            <Route path="/devops/frameworks" element={<DevOpsFrameworks />} />
            <Route path="/devops/assessment" element={<DevOpsAssessment />} />
            <Route path="/devops/maturity" element={<DevOpsMaturity />} />
            <Route path="/devops/practices" element={<DevOpsPractices />} />
            <Route path="/devops/tools" element={<DevOpsTools />} />
            <Route path="/devops/sre" element={<SRE />} />
            <Route path="/devops/platform-engineering" element={<PlatformEngineering />} />
            <Route path="/devops/chaos-engineering" element={<ChaosEngineering />} />
            <Route path="/devops/roadmap" element={<DevOpsRoadmap />} />

            {/* SecOps Subpages */}
            <Route path="/secops/cognitive-devsecops" element={<CognitiveDevSecOps />} />
            <Route path="/secops/practices" element={<SecOpsPractices />} />
            <Route path="/secops/devsecops-practices" element={<DevSecOpsPractices />} />
            <Route path="/secops/principles" element={<SecOpsPrinciples />} />
            <Route path="/secops/automation" element={<SecOpsAutomation />} />
            <Route path="/secops/threat-modeling" element={<ThreatModelling />} />
            <Route path="/secops/continuous-security" element={<ContinuousSecurity />} />
            <Route path="/secops/cloud-security" element={<CloudSecurity />} />
            <Route path="/secops/sast-dast" element={<SastDast />} />
            <Route path="/secops/container-security" element={<ContainerSecurity />} />

            {/* FinOps Subpages */}
            <Route path="/finops/framework" element={<FinOpsFramework />} />
            <Route path="/finops/cost-visibility" element={<CostVisibility />} />
            <Route path="/finops/optimization" element={<OptimizationStrategies />} />
            <Route path="/finops/unit-economics" element={<UnitEconomics />} />
            <Route path="/finops/forecasting" element={<Forecasting />} />
            <Route path="/finops/culture" element={<FinOpsCulture />} />

            {/* GenAI Subpages */}
            <Route path="/genai/fundamentals" element={<GenAIFundamentals />} />
            <Route path="/genai/llmops" element={<LLMOps />} />
            <Route path="/genai/rag" element={<RAGArchitecture />} />
            <Route path="/genai/agents" element={<AIAgents />} />
            <Route path="/genai/governance" element={<AIGovernance />} />
            <Route path="/genai/prompt-engineering" element={<PromptEngineering />} />

            {/* Architecture Subpages */}
            <Route path="/architecture/design-patterns" element={<DesignPatterns />} />
            <Route path="/architecture/solid-principles" element={<SolidPrinciples />} />
            <Route path="/architecture/system-design-process" element={<SystemDesignProcess />} />
            <Route path="/architecture/cloud-architecture" element={<CloudArchitecture />} />
            <Route path="/architecture/data-architecture" element={<DataArchitecture />} />
            <Route path="/architecture/microservices" element={<Microservices />} />
            <Route path="/architecture/api-design" element={<ApiDesign />} />
            <Route path="/architecture/system-security" element={<SystemSecurity />} />
            <Route path="/architecture/twelve-factor" element={<TwelveFactor />} />
            <Route path="/architecture/coding-standards" element={<CodingStandards />} />
            <Route path="/architecture/togaf" element={<TOGAF />} />
            <Route path="/architecture/it-governance" element={<ITGovernance />} />
            <Route path="/architecture/software-engineering" element={<SoftwareEngineering />} />

            {/* Explore Subpages */}
            <Route path="/talks" element={<Talks />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/explore/books" element={<BookSummaries />} />
            <Route path="/explore/certifications" element={<Certifications />} />
            <Route path="/explore/mental-models" element={<MentalModels />} />
            <Route path="/explore/github-profile" element={<GithubProfile />} />

            {/* Core Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;
