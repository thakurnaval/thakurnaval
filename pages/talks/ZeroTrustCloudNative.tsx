import { motion } from "motion/react";
import { Shield, Lock, Fingerprint, Network, ArrowLeft, ShieldAlert, Key, Activity, Eye, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";

const ZeroTrustCloudNativeArticle = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            to="/talks" 
            className="inline-flex items-center text-secondary hover:text-secondary/80 mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Talks
          </Link>

          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full uppercase tracking-wider">SecOps</span>
              <span className="px-3 py-1 bg-primary/10 text-primary dark:text-primary-light text-xs font-bold rounded-full uppercase tracking-wider">Kubernetes</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-6 leading-tight">
              Zero Trust Security for Cloud Native: Kubernetes Identity & Network Policies
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed italic">
              "Never trust, always verify." In the ephemeral world of Kubernetes, perimeter-based security is dead. Welcome to the era of micro-segmentation and strong identity.
            </p>
          </header>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-12">
              <h2 className="text-2xl font-bold text-primary dark:text-white mt-0 mb-4 flex items-center">
                <ShieldAlert className="mr-3 text-secondary" /> The Death of the Perimeter
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Traditional security models relied on a "castle and moat" approach: once you were inside the network perimeter, you were trusted. In a cloud-native environment, this model is fundamentally broken. Containers are ephemeral, IP addresses are reused, and the "perimeter" is now everywhere.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Zero Trust is not a single product; it's a strategic framework that assumes breach and verifies each request as though it originates from an open network. Regardless of where the request originates or what resource it accesses, Zero Trust teaches us to "never trust, always verify."
              </p>
            </div>

            <h2 className="text-3xl font-bold text-primary dark:text-white mb-6">The Three Pillars of K8s Zero Trust</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                <Fingerprint className="h-10 w-10 text-secondary mb-4" />
                <h3 className="text-lg font-bold mb-2">Strong Identity</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Workload-to-workload authentication using SPIFFE/mTLS.</p>
              </div>
              <div className="p-6 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                <Network className="h-10 w-10 text-secondary mb-4" />
                <h3 className="text-lg font-bold mb-2">Micro-segmentation</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">L3/L4 and L7 network policies to restrict lateral movement.</p>
              </div>
              <div className="p-6 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                <Eye className="h-10 w-10 text-secondary mb-4" />
                <h3 className="text-lg font-bold mb-2">Continuous Observability</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Real-time monitoring of traffic patterns and policy violations.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">1. Workload Identity: The Foundation</h2>
            <p>
              In Kubernetes, the fundamental unit of identity is the <strong>ServiceAccount</strong>. However, standard ServiceAccount tokens are often long-lived and broad in scope. To implement Zero Trust, we need <em>cryptographic identity</em>.
            </p>
            <p>
              This is where <strong>SPIFFE</strong> (Secure Production Identity Framework for Everyone) comes in. By using a service mesh like Istio or Linkerd, every pod is issued a short-lived X.509 certificate. This certificate serves as the pod's "passport," allowing it to prove its identity to other services via Mutual TLS (mTLS).
            </p>
            <div className="bg-secondary/5 border-l-4 border-secondary p-6 my-8">
              <p className="font-bold text-primary dark:text-white mb-2">Pro Tip: Token Request API</p>
              <p className="text-sm italic">
                Always use the <code>TokenRequest</code> API for ServiceAccount tokens. This ensures tokens are time-bound and audience-bound, significantly reducing the blast radius if a token is compromised.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">2. Network Policies: Enforcing Least Privilege</h2>
            <p>
              By default, Kubernetes allows all pods to talk to all other pods within a cluster. This is a security nightmare. Implementing <strong>NetworkPolicies</strong> is the first step toward micro-segmentation.
            </p>
            <p>
              A robust Zero Trust strategy starts with a <strong>Default Deny</strong> policy. You block all ingress and egress traffic for a namespace, and then explicitly whitelist only the connections that are strictly necessary.
            </p>
            <pre className="bg-slate-900 text-slate-100 p-6 rounded-lg overflow-x-auto text-sm mb-8">
{`# Default Deny All Ingress
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
spec:
  podSelector: {}
  policyTypes:
  - Ingress`}
            </pre>

            <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">3. Beyond L4: The Power of L7 Policies</h2>
            <p>
              Standard Kubernetes NetworkPolicies operate at Layer 3 and 4 (IPs and Ports). But modern attacks often happen at Layer 7 (HTTP). A Zero Trust architecture requires understanding <em>what</em> is being called, not just <em>who</em> is calling.
            </p>
            <p>
              With a Service Mesh, you can define authorization policies that say: "Service A can call Service B, but ONLY on the <code>/public</code> endpoint using a <code>GET</code> request." This level of granularity is essential for protecting sensitive data APIs.
            </p>

            <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">4. Admission Control and Policy as Code</h2>
            <p>
              How do you ensure that every new deployment follows these rules? You use <strong>Admission Controllers</strong> like OPA (Open Policy Agent) or Kyverno.
            </p>
            <p>
              Policy as Code allows you to define guardrails that prevent non-compliant resources from ever entering the cluster. For example, you can reject any Pod that doesn't have a specific security context or any Namespace that lacks a default-deny NetworkPolicy.
            </p>

            <div className="my-12 p-8 bg-primary text-white rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Shield className="h-32 w-32" />
              </div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">The Zero Trust Checklist</h3>
              <ul className="space-y-3 relative z-10">
                <li className="flex items-start">
                  <FileCheck className="h-5 w-5 mr-3 text-secondary shrink-0 mt-1" />
                  <span>Enable mTLS for all inter-service communication.</span>
                </li>
                <li className="flex items-start">
                  <FileCheck className="h-5 w-5 mr-3 text-secondary shrink-0 mt-1" />
                  <span>Implement Default Deny network policies in every namespace.</span>
                </li>
                <li className="flex items-start">
                  <FileCheck className="h-5 w-5 mr-3 text-secondary shrink-0 mt-1" />
                  <span>Rotate secrets and certificates automatically (e.g., using Cert-Manager).</span>
                </li>
                <li className="flex items-start">
                  <FileCheck className="h-5 w-5 mr-3 text-secondary shrink-0 mt-1" />
                  <span>Scan container images for vulnerabilities at build and runtime.</span>
                </li>
                <li className="flex items-start">
                  <FileCheck className="h-5 w-5 mr-3 text-secondary shrink-0 mt-1" />
                  <span>Use OIDC for human access to the Kubernetes API.</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Conclusion: A Journey, Not a Destination</h2>
            <p>
              Implementing Zero Trust in Kubernetes is a journey. It starts with visibility—understanding your traffic patterns—and moves toward strict enforcement. By focusing on strong identity, micro-segmentation, and continuous verification, you can build a cloud-native environment that is resilient to even the most sophisticated lateral movement attacks.
            </p>
            <p>
              The goal is simple: ensure that even if one component is compromised, the rest of your system remains secure. In the world of cloud-native, security is everyone's responsibility, and Zero Trust is the blueprint for success.
            </p>
          </div>

          <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-xl">
                  NT
                </div>
                <div>
                  <p className="font-bold text-primary dark:text-white">Naval Thakur</p>
                  <p className="text-sm text-slate-500">DevOps & Cloud Native Specialist</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <button className="px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors">
                  Share Article
                </button>
                <Link to="/talks" className="px-6 py-2 border border-slate-200 dark:border-slate-700 text-primary dark:text-white rounded-full font-semibold hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  More Talks
                </Link>
              </div>
            </div>
          </footer>
        </motion.div>
      </div>
    </div>
  );
};

export default ZeroTrustCloudNativeArticle;
