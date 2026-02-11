
import React from 'react';
import Logo from './Logo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const navItems = [
    { id: 'dashboard', label: 'Intelligence', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { id: 'products', label: 'Product Lab', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14v4m0 0l8 4m-8-4l-8 4m8 4l8-4m0 0v-4m-8 4L4 11m8 4v10' },
    { id: 'forecast', label: 'Growth Forecast', icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z' },
    { id: 'campaigns', label: 'Campaign Factory', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
    { id: 'segments', label: 'Audience Matrix', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { id: 'market', label: 'Market Intel', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' },
    { id: 'vision', label: 'Strategy Vision', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'simulator', label: 'Scenario Engine', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
    { id: 'synexia', label: 'Decision Hub', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: 'explainer', label: 'Data Narrator', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { id: 'risk', label: 'Risk Radar', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' }
  ];

  return (
    <div className="w-72 bg-slate-950 border-r border-slate-900 flex flex-col z-50">
      <div className="p-8 pb-4">
        <button 
          onClick={() => setActiveTab('hub')}
          className="flex items-center gap-4 mb-10 group text-left w-full hover:bg-white/5 p-2 rounded-2xl transition-all"
        >
          <Logo size={42} />
          <div>
            <span className="text-xl font-black tracking-tighter text-white block leading-none transition-colors group-hover:text-cyan-400">MARKETMIND</span>
            <span className="text-[9px] font-bold text-cyan-500 tracking-[0.3em] uppercase opacity-80">Neural Intelligence</span>
          </div>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-2">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
                activeTab === item.id 
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-500/5' 
                : 'text-slate-500 hover:bg-slate-900/50 hover:text-slate-200 border border-transparent'
              }`}
            >
              <svg className={`w-4 h-4 transition-transform group-hover:scale-110 ${activeTab === item.id ? 'neon-text-cyan' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span className="font-bold text-[11px] uppercase tracking-wider">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t border-slate-900 bg-slate-950/50">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full border-2 border-cyan-500/30 p-0.5">
                 <img src="https://picsum.photos/80/80" className="rounded-full w-full h-full object-cover grayscale brightness-125" alt="User" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full"></div>
            </div>
            <div>
              <p className="text-xs font-black text-white uppercase tracking-tight">FOUNDER_X</p>
              <p className="text-[8px] text-slate-500 font-bold tracking-widest uppercase">Verified</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="p-2 text-slate-600 hover:text-rose-500 transition-colors group"
            title="Deauthorize Link"
          >
            <svg className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
        
        <button 
          onClick={onLogout}
          className="w-full py-2 px-4 rounded-xl border border-slate-800 hover:border-rose-500/30 hover:bg-rose-500/5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-rose-500 transition-all flex items-center justify-center gap-2"
        >
          <div className="w-1 h-1 rounded-full bg-current"></div>
          Terminate Session
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
