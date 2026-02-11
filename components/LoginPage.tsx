
import React, { useState, useEffect } from 'react';
import Logo from './Logo';

interface Props {
  onLogin: (userData: { name: string; email: string; avatar: string; isDemo?: boolean }) => void;
}

type AuthState = 'IDLE' | 'CONNECTING' | 'VERIFYING' | 'SCANNING';

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const [authState, setAuthState] = useState<AuthState>('IDLE');
  const [provider, setProvider] = useState<'Google' | 'Microsoft' | 'Direct' | 'Demo' | null>(null);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  
  const [name, setName] = useState('Chief Intelligence Officer');
  const [loginId, setLoginId] = useState('cio@marketmind.ai');

  const startAuthFlow = async (p: 'Google' | 'Microsoft' | 'Direct' | 'Demo') => {
    // Check for API key selection for Veo/Imagen models
    if (typeof (window as any).aistudio !== 'undefined') {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio.openSelectKey();
      }
    }
    
    setProvider(p);
    setAuthState('CONNECTING');
    setProgress(0);
    setStatusText(`Initiating Neural Handshake with ${p}...`);
  };

  useEffect(() => {
    if (authState === 'CONNECTING') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 30) setStatusText("Synchronizing Neural Model Contexts...");
          if (prev >= 60) setStatusText("Authenticating Sales Intelligence Vectors...");
          if (prev >= 90) setStatusText("Locking Command Deck Access...");
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setAuthState('SCANNING'), 400);
            return 100;
          }
          return prev + 5;
        });
      }, 50);
      return () => clearInterval(interval);
    }

    if (authState === 'SCANNING') {
      setProgress(0);
      setStatusText("Optimizing Interface for High-Performance Thinking...");
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              const userData = {
                name: provider === 'Demo' ? 'Elite Demo User' : name,
                email: provider === 'Demo' ? 'demo@marketmind.ai' : loginId,
                avatar: `https://i.pravatar.cc/150?u=${provider || 'direct'}`,
                isDemo: provider === 'Demo'
              };
              onLogin(userData);
            }, 500);
            return 100;
          }
          return prev + 4;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [authState, provider, name, loginId, onLogin]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#020617] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      <div className={`relative w-full max-w-[1000px] flex items-stretch transition-all duration-700 h-[650px] shadow-2xl rounded-[3rem] overflow-hidden ${authState !== 'IDLE' ? 'scale-110 opacity-0 blur-xl pointer-events-none' : 'scale-100 opacity-100'}`}>
        
        {/* Branding */}
        <div className="hidden lg:flex flex-1 flex-col justify-between p-16 bg-slate-900/40 backdrop-blur-md border-r border-slate-800/50">
          <div>
            <Logo size={64} className="mb-10" />
            <h1 className="text-5xl font-black text-white tracking-tighter leading-tight uppercase">
              Sales <br />
              <span className="text-cyan-400">Intelligence</span> <br />
              Redefined.
            </h1>
            <p className="mt-8 text-slate-400 text-lg max-w-sm leading-relaxed font-medium">
              MarketMind fuses high-fidelity generative AI with real-time sales dynamics for boardroom-ready results.
            </p>
          </div>
          <div className="space-y-4">
             <div className="px-5 py-3 border border-slate-800 rounded-2xl bg-slate-950/50 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981]"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Neural Core v3.0 Powered by Gemini</span>
             </div>
             <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                className="text-[9px] font-black text-slate-600 hover:text-cyan-400 uppercase tracking-widest block pl-2 transition-colors"
              >
                Requires Paid API Project for Veo Support
              </a>
          </div>
        </div>

        {/* Auth Interface */}
        <div className="flex-1 bg-slate-950/80 backdrop-blur-xl p-12 lg:p-16 border-l border-white/5 flex flex-col justify-center">
          <div className="animate-fadeIn">
            <h2 className="text-3xl font-black text-white tracking-tight uppercase mb-2">Neural Link established</h2>
            <p className="text-slate-500 mb-10 text-sm font-bold uppercase tracking-widest">Authorize Session Identity</p>

            <form onSubmit={(e) => { e.preventDefault(); startAuthFlow('Direct'); }} className="space-y-4 mb-8">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-4">Personnel ID</label>
                <input 
                  type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="Personnel Name"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-5 text-sm text-white focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all placeholder-slate-700" 
                />
              </div>
              <button type="submit" className="w-full py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all shadow-xl active:scale-95">
                Establish Direct Link
              </button>
            </form>

            <div className="relative flex items-center py-6">
              <div className="flex-grow border-t border-slate-900"></div>
              <span className="mx-6 text-[9px] font-black text-slate-700 uppercase tracking-widest">or</span>
              <div className="flex-grow border-t border-slate-900"></div>
            </div>

            <button onClick={() => startAuthFlow('Demo')} className="w-full py-5 bg-cyan-600/10 border border-cyan-500/30 text-cyan-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-cyan-500/20 transition-all shadow-[0_0_20px_rgba(34,211,238,0.1)]">
              Initialize Operations Demo
            </button>
          </div>
        </div>
      </div>

      {authState !== 'IDLE' && (
        <div className="absolute inset-0 z-[110] flex flex-col items-center justify-center animate-fadeIn bg-slate-950/90 backdrop-blur-2xl">
          <div className="relative z-10 flex flex-col items-center text-center px-12">
            <Logo size={160} className="mb-14" />
            <div className="flex flex-col items-center gap-10">
              <div className="relative">
                <div className="text-8xl font-black text-white tracking-tighter tabular-nums">{progress}%</div>
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                   <div className="h-full bg-cyan-500 transition-all duration-300 shadow-[0_0_20px_#22d3ee]" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
              <p className="text-[11px] font-black text-cyan-400 uppercase tracking-[0.6em] animate-pulse max-w-md leading-relaxed">{statusText}</p>
            </div>
          </div>
          <div className="fixed top-0 left-0 w-full h-1 bg-cyan-500/50 shadow-[0_0_40px_#22d3ee] animate-scan-line z-20"></div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
