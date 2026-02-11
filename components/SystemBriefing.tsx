import React, { useState, useEffect } from 'react';
import Logo from './Logo';

interface Props {
  setActiveTab: (tab: string) => void;
}

const FALLBACK_TRAILER =
  'https://www.w3schools.com/html/mov_bbb.mp4';

const MISSION_BRIEF = `
MarketMind is a Generative AI–powered Sales and Marketing Intelligence Platform
designed to transform raw business data into decisive strategic action.

At its core, MarketMind functions as a neural command center for growth teams.

• Synexia Copilot — AI-driven decision support for executives  
• Risk Radar — Real-time anomaly and churn detection  
• Scenario Engine — What-if simulations for pricing and budget strategy  
• Campaign Factory — Automated marketing asset generation  

MarketMind does not replace human intuition — it augments it.
Every insight is grounded, explainable, and aligned with revenue impact.

System Status: OPERATIONAL  
Neural Confidence: HIGH  
Mission Directive: SCALE WITH PRECISION
`;

const SystemBriefing: React.FC<Props> = ({ setActiveTab }) => {
  const [briefingText, setBriefingText] = useState('');
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(false);

  useEffect(() => {
    // Simulate AI briefing load
    const timer = setTimeout(() => {
      setBriefingText(MISSION_BRIEF);
      setLoading(false);

      // Browser-native voice briefing (NO API)
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(
          'MarketMind systems online. Strategic intelligence is now active.'
        );
        utterance.rate = 0.9;
        utterance.pitch = 0.9;
        utterance.volume = 0.8;
        window.speechSynthesis.speak(utterance);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleLaunchTrailer = async () => {
    setVideoLoading(true);

    // Simulate video generation delay
    await new Promise(r => setTimeout(r, 1500));

    setTrailerUrl(FALLBACK_TRAILER);
    setVideoLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-16 animate-fadeIn pb-32">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="flex-1 space-y-10">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
            <span className="text-[11px] font-black text-cyan-400 uppercase tracking-[0.3em]">
              System Mission Profile
            </span>
          </div>

          <h1 className="text-7xl lg:text-9xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            Market<span className="text-cyan-400">Mind</span> <br />
            Intelligence
          </h1>

          <div className="glass-panel p-10 rounded-[3rem] border-slate-800 bg-slate-900/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

            {loading ? (
              <div className="space-y-4">
                <div className="h-4 bg-slate-800 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-slate-800 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-slate-800 rounded w-1/2 animate-pulse"></div>
              </div>
            ) : (
              <div className="text-lg text-slate-300 leading-relaxed font-medium italic border-l-4 border-cyan-500/20 pl-8 whitespace-pre-wrap">
                {briefingText}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-6 items-center">
            <button
              onClick={() => setActiveTab('hub')}
              className="px-12 py-6 bg-white text-black rounded-3xl font-black text-xs uppercase tracking-[0.3em] hover:bg-cyan-400 transition-all hover:scale-105 active:scale-95 shadow-2xl"
            >
              Enter Command Hub
            </button>

            <button
              onClick={handleLaunchTrailer}
              disabled={videoLoading}
              className="px-12 py-6 bg-slate-900 border border-slate-800 text-white rounded-3xl font-black text-xs uppercase tracking-[0.3em] hover:border-cyan-500 transition-all"
            >
              {videoLoading ? 'Initializing Visuals…' : 'Play Mission Trailer'}
            </button>
          </div>
        </div>

        <div className="w-full lg:w-[500px] space-y-6">
          <div className="aspect-[9/16] glass-panel rounded-[3rem] border-slate-800 overflow-hidden relative bg-slate-950 flex items-center justify-center shadow-2xl">
            {trailerUrl ? (
              <video
                src={trailerUrl}
                autoPlay
                loop
                muted
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-12">
                <Logo size={120} className="mx-auto mb-8" />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2">
                  Visual Systems Idle
                </p>
                <p className="text-xs text-slate-600 max-w-[250px] mx-auto leading-relaxed">
                  Launch the mission trailer to visualize MarketMind’s strategic
                  intelligence flow.
                </p>
              </div>
            )}

            {videoLoading && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-2 border-cyan-500/10 border-t-cyan-500 rounded-full animate-spin mb-6"></div>
                <p className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.5em] animate-pulse text-center px-8">
                  Initializing Visual Systems
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemBriefing;
