
import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import DevOps from './pages/DevOps';
import SecOps from './pages/SecOps';
import FinOps from './pages/FinOps';
import GenAI from './pages/GenAI';
import Architecture from './pages/Architecture';
import Talks from './pages/Talks';
import Articles from './pages/Articles';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';

// DevOps Subpages
import DevOpsFrameworks from './pages/devops/DevOpsFrameworks';
import DevOpsAssessment from './pages/devops/DevOpsAssessment';
import DevOpsMaturity from './pages/devops/DevOpsMaturity';
import DevOpsPractices from './pages/devops/DevOpsPractices';
import DevOpsTools from './pages/devops/DevOpsTools';
import SRE from './pages/devops/SRE';
import PlatformEngineering from './pages/devops/PlatformEngineering';
import ChaosEngineering from './pages/devops/ChaosEngineering';
import DevOpsRoadmap from './pages/devops/DevOpsRoadmap';

// SecOps Subpages
import CognitiveDevSecOps from './pages/secops/CognitiveDevSecOps';
import SecOpsPractices from './pages/secops/SecOpsPractices';
import DevSecOpsPractices from './pages/secops/DevSecOpsPractices';
import SecOpsPrinciples from './pages/secops/SecOpsPrinciples';
import SecOpsAutomation from './pages/secops/SecOpsAutomation';
import ThreatModelling from './pages/secops/ThreatModelling';
import ContinuousSecurity from './pages/secops/ContinuousSecurity';
import CloudSecurity from './pages/secops/CloudSecurity';
import SastDast from './pages/secops/SastDast';
import ContainerSecurity from './pages/secops/ContainerSecurity';

// FinOps Subpages
import FinOpsFramework from './pages/finops/FinOpsFramework';
import CostVisibility from './pages/finops/CostVisibility';
import OptimizationStrategies from './pages/finops/OptimizationStrategies';
import UnitEconomics from './pages/finops/UnitEconomics';
import Forecasting from './pages/finops/Forecasting';
import FinOpsCulture from './pages/finops/FinOpsCulture';

// GenAI Subpages
import GenAIFundamentals from './pages/genai/GenAIFundamentals';
import LLMOps from './pages/genai/LLMOps';
import RAGArchitecture from './pages/genai/RAGArchitecture';
import AIAgents from './pages/genai/AIAgents';
import AIGovernance from './pages/genai/AIGovernance';
import PromptEngineering from './pages/genai/PromptEngineering';

// Architecture Subpages
import DesignPatterns from './pages/architecture/DesignPatterns';
import SolidPrinciples from './pages/architecture/SolidPrinciples';
import SystemDesignProcess from './pages/architecture/SystemDesignProcess';
import CloudArchitecture from './pages/architecture/CloudArchitecture';
import DataArchitecture from './pages/architecture/DataArchitecture';
import Microservices from './pages/architecture/Microservices';
import ApiDesign from './pages/architecture/ApiDesign';
import SystemSecurity from './pages/architecture/SystemSecurity';
import TwelveFactor from './pages/architecture/TwelveFactor';
import CodingStandards from './pages/architecture/CodingStandards';
import TOGAF from './pages/architecture/TOGAF';
import ITGovernance from './pages/architecture/ITGovernance';
import SoftwareEngineering from './pages/architecture/SoftwareEngineering';

// Explore Subpages
import BookSummaries from './pages/explore/BookSummaries';
import Certifications from './pages/explore/Certifications';
import MentalModels from './pages/explore/MentalModels';
import GithubProfile from './pages/explore/GithubProfile';

// Loading Component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary dark:border-secondary"></div>
  </div>
);

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
