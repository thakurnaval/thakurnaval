import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { TrendingDown, Target, Percent, DollarSign } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { FINOPS_DATA } from '../constants';

const FinOps: React.FC = () => {
  return (
    <>
      <SEO 
        title="FinOps Consulting & Cloud Cost Optimization Services"
        description="Maximize business value from cloud. Cost visibility, forecasting, and rate optimization strategies for AWS, Azure, and GCP."
      />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">FinOps & Cost Optimization</h1>
          <p className="text-xl text-slate-100 max-w-2xl">
            Bringing financial accountability to the variable spend model of cloud.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-primary dark:text-white">What is FinOps?</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              FinOps is an evolving cloud financial management discipline and cultural practice that enables organizations to get maximum business value by helping engineering, finance, technology, and business teams to collaborate on data-driven spending decisions.
            </p>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
               <h3 className="text-lg font-bold text-primary dark:text-white mb-4">The Optimization Impact</h3>
               <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Hypothetical quarterly cloud spend reduction after implementing FinOps practices.</p>
               <div className="h-64 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={FINOPS_DATA}>
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} stroke="#94a3b8" />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} stroke="#94a3b8" />
                      <Tooltip 
                        formatter={(value: number) => [`$${value}`, undefined]}
                        contentStyle={{ 
                          backgroundColor: 'var(--tw-prose-body, #fff)',
                          borderRadius: '8px', 
                          border: 'none', 
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                          color: '#271789'
                        }} 
                        itemStyle={{ color: '#271789' }}
                      />
                      <Legend />
                      <Bar dataKey="cost" name="Cloud Spend" fill="#271789" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="savings" name="Savings Realized" fill="#00f1d4" radius={[4, 4, 0, 0]} />
                    </BarChart>
                 </ResponsiveContainer>
               </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Key Principles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {[
                   { title: 'Inform', desc: 'Visibility & Allocation. You cannot fix what you cannot see.', link: '/finops/cost-visibility' },
                   { title: 'Optimize', desc: 'Rate & Usage reduction. Rightsizing and Reserved Instances.', link: '/finops/optimization' },
                   { title: 'Operate', desc: 'Continuous improvement & automation of cost policies.', link: '/finops/culture' }
                 ].map((p, i) => (
                   <Link key={i} to={p.link} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-transparent dark:border-slate-700 hover:border-secondary transition-colors group">
                     <div className="font-bold text-primary dark:text-secondary mb-1 group-hover:underline">{p.title}</div>
                     <div className="text-sm text-slate-600 dark:text-slate-400">{p.desc}</div>
                   </Link>
                 ))}
              </div>
            </div>

            {/* KPI Section */}
            <div>
               <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Critical FinOps KPIs</h2>
               <p className="text-slate-600 dark:text-slate-300 mb-6">
                 To ensure your FinOps practice is delivering value, track these core metrics regularly.
               </p>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-slate-700 dark:text-slate-200">Cost Savings</h3>
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                        <DollarSign size={20} />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-primary dark:text-white mb-1">$125k</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Annualized savings realized</p>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-slate-700 dark:text-slate-200">Unit Efficiency</h3>
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                        <TrendingDown size={20} />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-primary dark:text-white mb-1">$0.04</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Avg. cost per transaction</p>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-slate-700 dark:text-slate-200">Budget Variance</h3>
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400">
                        <Target size={20} />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-primary dark:text-white mb-1">+2.4%</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Deviation from forecast</p>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-slate-700 dark:text-slate-200">RI/SP Coverage</h3>
                      <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-600 dark:text-orange-400">
                        <Percent size={20} />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-primary dark:text-white mb-1">84%</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Compute on commitment</p>
                  </div>
               </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">GenAI in FinOps</h2>
              <p className="text-slate-600 dark:text-slate-300">
                Leveraging Generative AI to analyze billing data, <Link to="/finops/forecasting" className="text-secondary hover:underline">forecast anomalies</Link>, and suggest architectural changes for cost efficiency.
              </p>
            </div>
            
            <div className="pt-4">
              <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Explore More</h2>
              <div className="flex flex-wrap gap-3">
                <Link to="/finops/unit-economics" className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-primary dark:text-slate-300 hover:bg-secondary hover:text-white transition-colors">Unit Economics</Link>
                <Link to="/finops/forecasting" className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-primary dark:text-slate-300 hover:bg-secondary hover:text-white transition-colors">Forecasting & Budgeting</Link>
                <Link to="/finops/framework" className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-primary dark:text-slate-300 hover:bg-secondary hover:text-white transition-colors">FinOps Framework</Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
             <div className="bg-secondary/10 p-8 rounded-xl border border-secondary/20 sticky top-24">
               <h3 className="text-xl font-bold text-primary dark:text-white mb-2">FinOps Certification</h3>
               <p className="text-slate-700 dark:text-slate-300 text-sm mb-6">
                 Naval helps teams prepare for the FinOps Certified Practitioner exam and build their Cloud Center of Excellence (CCoE).
               </p>
               <div className="space-y-3">
                 <Link to="/contact?topic=Workshop / Training" className="block w-full py-3 bg-secondary text-primary text-center font-bold rounded hover:bg-secondary-hover transition-colors">
                   Request Strategy Workshop
                 </Link>
                 <Link to="/articles" className="block w-full py-3 bg-white dark:bg-slate-800 border border-secondary text-primary dark:text-white text-center font-bold rounded hover:bg-secondary/10 transition-colors">
                   Read FinOps Guide
                 </Link>
               </div>
             </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default FinOps;