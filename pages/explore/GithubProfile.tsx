
import React, { useState } from 'react';
import SimplePage from '../../components/SimplePage';
import { Github, Copy, Check, Download, FileCode } from 'lucide-react';

const GithubProfile: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const mainReadme = `<p align="center">
  <img src="assets/img/profile.jpg" width="120" style="border-radius: 50%; border: 3px solid #00f1d4;" alt="Naval Thakur">
</p>

<h1 align="center">Naval Thakur</h1>
<p align="center">
  <strong>DevOps • SecOps • FinOps • GenAI • Architecture</strong><br>
  <em>Technologist & Transformation Coach | 18+ Years of Engineering Excellence</em>
</p>

<p align="center">
  <a href="#-about">About</a> • 
  <a href="#-expertise">Expertise</a> • 
  <a href="#-talks--articles">Talks</a> • 
  <a href="#-certifications">Credentials</a> • 
  <a href="mailto:contact@nthakur.com">Contact</a>
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/navalthakur"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="https://x.com/nthakur_dot_com"><img src="https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white" alt="X"></a>
  <a href="https://nthakur.com"><img src="https://img.shields.io/badge/Portfolio-271789?style=for-the-badge&logo=react&logoColor=00f1d4" alt="Website"></a>
</p>

---

### 🚀 Professional Bio
I help enterprises build resilient, secure, and cost-effective cloud ecosystems. With over 18 years of experience, I've led large-scale **DevSecOps** transformations, established **FinOps** frameworks at global firms like SLB, and am currently operationalizing **GenAI** for intelligent CloudOps.

### 🛠️ Expertise Pillars
<table width="100%">
  <tr>
    <td width="33%" align="center" valign="top">
      <img src="https://img.icons8.com/fluency/48/000000/layers.png" width="32"/><br>
      <strong>Architecture</strong><br>
      Cloud-Native, SOLID, DDD<br>
      <a href="./docs/ARCHITECTURE.md">View Deep-Dive</a>
    </td>
    <td width="33%" align="center" valign="top">
      <img src="https://img.icons8.com/fluency/48/000000/infinity.png" width="32"/><br>
      <strong>DevOps</strong><br>
      CI/CD, SRE, Platform Eng.<br>
      <a href="./docs/DEVOPS.md">View Deep-Dive</a>
    </td>
    <td width="33%" align="center" valign="top">
      <img src="https://img.icons8.com/fluency/48/000000/security-shield.png" width="32"/><br>
      <strong>SecOps</strong><br>
      Cognitive Security, STRIDE<br>
      <a href="./docs/SECOPS.md">View Deep-Dive</a>
    </td>
  </tr>
  <tr>
    <td width="33%" align="center" valign="top">
      <img src="https://img.icons8.com/fluency/48/000000/sales-performance.png" width="32"/><br>
      <strong>FinOps</strong><br>
      Cost Opt, Unit Economics<br>
      <a href="./docs/FINOPS.md">View Deep-Dive</a>
    </td>
    <td width="33%" align="center" valign="top">
      <img src="https://img.icons8.com/fluency/48/000000/artificial-intelligence.png" width="32"/><br>
      <strong>GenAI</strong><br>
      LLMOps, RAG, AI Agents<br>
      <a href="./docs/GENAI.md">View Deep-Dive</a>
    </td>
    <td width="33%" align="center" valign="top">
      <img src="https://img.icons8.com/fluency/48/000000/conference-call.png" width="32"/><br>
      <strong>Mentorship</strong><br>
      Career, Resume, Coaching<br>
      <a href="mailto:contact@nthakur.com">Get in Touch</a>
    </td>
  </tr>
</table>

---

### 📊 Tech Ecosystem
![Tools](https://img.shields.io/badge/Ecosystem-AWS%20|%20Azure%20|%20GCP%20|%20K8s%20|%20Terraform%20|%20LangChain-271789?style=for-the-badge&labelColor=00f1d4&color=271789)

---

### 🏆 Credentials
- **Google Cloud:** GenAI Leader, Cloud Digital Leader
- **Microsoft:** Azure DevOps Solutions (AZ-400), AI Fundamentals
- **FinOps:** Certified Practitioner (Linux Foundation)
- **Agile:** PSM I, PSPO I, SAFe 5 Agilist

---

### 📫 Let's Connect
I'm always open to discussing cloud transformation, speaking at events, or helping the community through mentorship.

<p align="left">
  <img src="https://github-readme-stats.vercel.app/api?username=thakurnaval&show_icons=true&theme=tokyonight" height="150" alt="GitHub Stats">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=thakurnaval&layout=compact&theme=tokyonight" height="150" alt="Top Langs">
</p>

<p align="center">
  <em>&copy; 2025 Naval Thakur | Hand-crafted for Engineering Excellence</em>
</p>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(mainReadme);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadAll = () => {
    const download = (filename: string, text: string) => {
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/markdown;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    };
    download('README.md', mainReadme);
  };

  return (
    <SimplePage 
      title="GitHub Profile Export" 
      subtitle="The layout below is designed to mirror your website's architecture for a unified professional brand."
    >
      <div className="space-y-8">
        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <Github className="text-primary dark:text-white" />
            <h2 className="text-xl font-bold text-primary dark:text-white">Unified Branding Setup</h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            By using HTML tables and custom badges, your GitHub profile will now feature the same "Expertise Pillars" grid as your homepage.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>Copy the code block below.</li>
            <li>Go to your <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">your-username/your-username</code> repo.</li>
            <li>Paste it into <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">README.md</code> and enjoy the unified look!</li>
          </ol>
        </div>

        <div className="relative group">
          <div className="absolute right-4 top-4 flex gap-2 z-10">
            <button 
              onClick={handleCopy}
              className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 text-xs font-bold text-primary dark:text-white"
            >
              {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy Markdown'}
            </button>
            <button 
              onClick={handleDownloadAll}
              className="p-2 bg-primary text-white rounded-lg shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2 text-xs font-bold"
            >
              <Download size={14} />
              Download .md
            </button>
          </div>
          
          <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800">
            <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">README.md (Unified Design)</span>
            </div>
            <pre className="p-6 overflow-auto max-h-[500px] text-xs font-mono text-slate-300 leading-relaxed scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
              {mainReadme}
            </pre>
          </div>
        </div>
      </div>
    </SimplePage>
  );
};

export default GithubProfile;
