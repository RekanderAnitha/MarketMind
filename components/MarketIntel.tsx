import React, { useState } from 'react';
import { getMarketIntelligence } from '../services/groqService';
import { GroundingSource } from '../types';

const MarketIntel: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    text: string;
    sources: GroundingSource[];
  } | null>(null);

  const handleSearch = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await getMarketIntelligence(topic);
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      <header className="text-center space-y-4">
        <h2 className="text-5xl font-black text-white tracking-tighter uppercase">
          Market Intel_
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto font-medium">
          Real-time competitor tracking and industry signals powered by AI
          intelligence.
        </p>
      </header>

      <div className="max-w-2xl mx-auto flex gap-4">
        <div className="relative flex-1 group">
          <input
            type="text"
            className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-5 pl-8 pr-14 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all group-hover:border-slate-700"
            placeholder="Interrogate market trends (e.g. AI SaaS pricing models 2024)..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || !topic.trim()}
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-cyan-600/20 disabled:opacity-50 transition-all active:scale-95"
        >
          {loading ? 'Syncing...' : 'Search'}
        </button>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-24 gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-2 border-cyan-500/10 border-t-cyan-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-2 border-magenta-500/10 border-b-magenta-500 rounded-full animate-reverse-spin"></div>
          </div>
          <p className="text-cyan-400 font-black animate-pulse text-[10px] uppercase tracking-[0.5em]">
            Establishing Neural Link
          </p>
        </div>
      )}

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel p-10 rounded-[3rem] border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-transparent to-transparent"></div>
              <div className="flex items-center gap-2 mb-8 text-cyan-400 font-black uppercase tracking-widest text-[10px]">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                Intelligence Report
              </div>
              <div className="text-slate-200 leading-[1.8] whitespace-pre-wrap text-sm font-medium italic pl-6 border-l-2 border-slate-800">
                {result.text}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-panel p-8 rounded-[2rem] border-slate-800">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">
                Sources
              </h3>
              <div className="space-y-4">
                {result.sources.length > 0 ? (
                  result.sources.map((src, idx) => (
                    <a
                      key={idx}
                      href={src.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 p-4 rounded-xl bg-slate-950/50 border border-slate-900 hover:border-cyan-500/30 transition-all group"
                    >
                      <div className="w-10 h-10 flex-shrink-0 bg-slate-900 rounded-lg flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
                        <svg
                          className="w-4 h-4 text-slate-600 group-hover:text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-200 line-clamp-2 leading-snug">
                          {src.title}
                        </p>
                        <p className="text-[9px] text-slate-600 mt-2 font-bold uppercase tracking-wider">
                          {new URL(src.uri).hostname}
                        </p>
                      </div>
                    </a>
                  ))
                ) : (
                  <p className="text-xs text-slate-600 italic">
                    No web citations provided by the model.
                  </p>
                )}
              </div>
            </div>

            <div className="glass-panel p-8 rounded-[2rem] bg-cyan-500/5 border-cyan-500/10">
              <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-3">
                Intelligence Mode
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                MarketIntel uses high-speed LLM inference to surface strategic
                insights. Live web grounding can be added later via a search
                backend.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketIntel;
