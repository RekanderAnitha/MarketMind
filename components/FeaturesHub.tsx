
import React from 'react';
import Logo from './Logo';

interface FeatureCardProps {
  id: string;
  title: string;
  description: string;
  pitch: string;
  icon: string;
  color: string;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, pitch, icon, color, onClick }) => (
  <button 
    onClick={onClick}
    className="glass-panel p-8 rounded-[2.5rem] border-slate-800 hover:border-cyan-500/40 transition-all group text-left flex flex-col relative overflow-hidden h-full"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 group-hover:opacity-30 transition-opacity ${color}`}></div>
    <div className="mb-6 flex items-center justify-between">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-slate-800 group-hover:border-cyan-500/30 transition-colors`}>
        <svg className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
        </svg>
      </div>
      <div className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-[8px] font-black uppercase tracking-widest text-slate-500 group-hover:text-cyan-400">
        Operational
      </div>
    </div>
    <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight group-hover:text-cyan-400 transition-colors">{title}</h3>
    <p className="text-xs text-slate-400 mb-6 leading-relaxed flex-1">{description}</p>
    <div className="pt-6 border-t border-slate-800 mt-auto">
      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1 italic">The Pitch:</p>
      <p className="text-sm font-bold text-white leading-tight italic">"{pitch}"</p>
    </div>
    <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
  </button>
);

interface Props {
  setActiveTab: (tab: string) => void;
}

const FeaturesHub: React.FC<Props> = ({ setActiveTab }) => {
  const features = [
    { 
      id: 'synexia', 
      title: 'AI Decision Copilot', 
      description: 'Answer mission-critical questions about launches, budgets, and targeting.', 
      pitch: 'Acts like a virtual CMO + CFO.', 
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      color: 'bg-cyan-500'
    },
    { 
      id: 'explainer', 
      title: 'Explain My Data', 
      description: 'Transform raw CSVs into boardroom-ready insights in a single click.', 
      pitch: 'From raw data to boardroom insights in one click.', 
      icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
      color: 'bg-indigo-500'
    },
    { 
      id: 'risk', 
      title: 'AI Risk Radar', 
      description: 'Automatic detection of sales drops, marketing overspend, and instability.', 
      pitch: 'MarketMind doesn’t just analyze — it warns.', 
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      color: 'bg-rose-500'
    },
    { 
      id: 'forecast', 
      title: 'Growth Forecast Engine', 
      description: 'Neural prediction of monthly revenue and future product demand.', 
      pitch: 'See the future of your revenue stream.', 
      icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z',
      color: 'bg-emerald-500'
    },
    { 
      id: 'campaigns', 
      title: 'Campaign Factory', 
      description: 'AI-generated ad copies, email subjects, and hyper-targeted CTAs.', 
      pitch: 'Automated creativity at enterprise scale.', 
      icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
      color: 'bg-magenta-500'
    },
    { 
      id: 'segments', 
      title: 'Audience Matrix', 
      description: 'Auto-cluster customers into high-value, at-risk, and growth segments.', 
      pitch: 'Hyper-targeted marketing through neural clustering.', 
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      color: 'bg-amber-500'
    },
    { 
      id: 'simulator', 
      title: 'Scenario Engine', 
      description: 'Adjust budget and pricing modulators to see predicted neural outcomes.', 
      pitch: 'A laboratory for your most ambitious pivots.', 
      icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
      color: 'bg-indigo-400'
    },
    { 
      id: 'market', 
      title: 'Market Intel', 
      description: 'Search-grounded insights into trending niches and emerging competitors.', 
      pitch: 'Stay ahead of the market, not just in it.', 
      icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
      color: 'bg-sky-500'
    }
  ];

  return (
    <div className="space-y-16 animate-fadeIn pb-32">
      <div className="text-center space-y-6">
        <div className="flex justify-center mb-8">
          <Logo size={120} />
        </div>
        <h1 className="text-7xl font-black text-white tracking-tighter uppercase leading-none">Command Hub</h1>
        <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-xs">Total Neural Intelligence Overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f) => (
          <FeatureCard 
            key={f.id}
            {...f}
            onClick={() => setActiveTab(f.id)}
          />
        ))}
      </div>

      <div className="glass-panel p-12 rounded-[4rem] border-slate-800 bg-slate-900/10 flex items-center justify-between">
        <div className="space-y-4">
           <h4 className="text-2xl font-black text-white uppercase tracking-tight">System Status: Nominal</h4>
           <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Neural Link: Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Gemini Engine: v3.0</span>
              </div>
           </div>
        </div>
        <button 
          onClick={() => setActiveTab('dashboard')}
          className="px-10 py-5 bg-white text-black rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all active:scale-95 shadow-2xl shadow-white/5"
        >
          Return to Operations
        </button>
      </div>
    </div>
  );
};

export default FeaturesHub;
