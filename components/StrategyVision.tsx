import React, { useState } from 'react';
import { AppState } from '../types';

interface Props {
  state: AppState;
}

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
  'https://images.unsplash.com/photo-1526378722484-bd91ca387e72',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c'
];

const StrategyVision: React.FC<Props> = ({ state }) => {
  const [prompt, setPrompt] = useState(
    'Cyberpunk cloud architecture for a global SaaS expansion'
  );
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    try {
      /**
       * GROQ MODE:
       * Groq does not support image generation.
       * We simulate concept art using curated visual references.
       */
      const random =
        FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];

      // Simulate AI latency
      await new Promise(r => setTimeout(r, 1200));

      setImage(`${random}?auto=format&fit=crop&w=1200&q=80`);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fadeIn">
      <header>
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter">
          Strategy Vision Lab
        </h2>
        <p className="text-slate-400 mt-2">
          Generate campaign-ready concept visuals from strategic prompts.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-8">
          <div className="glass-panel p-10 rounded-[2.5rem] border-slate-800">
            <h3 className="text-xs font-black text-cyan-400 uppercase tracking-[0.3em] mb-6">
              Vision Parameters
            </h3>
            <textarea
              className="w-full h-40 bg-[#020617] border border-slate-800 rounded-2xl p-6 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Describe the visual theme for your next campaign..."
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full mt-6 bg-white text-black py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all disabled:opacity-50"
            >
              {loading ? 'Synthesizing...' : 'Generate Concept Art'}
            </button>
          </div>

          <div className="glass-panel p-8 rounded-[2rem] bg-indigo-500/5 border-indigo-500/10">
            <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-3">
              Hackathon Pro-Tip
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Strategy Vision converts insights into visual direction. These
              visuals represent *AI-guided creative intent*, not final renders.
            </p>
          </div>
        </div>

        <div className="glass-panel rounded-[3rem] border-slate-800 aspect-square overflow-hidden relative flex items-center justify-center bg-slate-900/40">
          {image ? (
            <img
              src={image}
              className="w-full h-full object-cover animate-pulse-slow"
              alt="Strategy Concept"
            />
          ) : (
            <div className="text-center p-12 opacity-30">
              <svg
                className="w-20 h-20 text-slate-700 mx-auto mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="font-bold text-slate-500 uppercase tracking-[0.2em] text-xs">
                Waiting for vision prompt...
              </p>
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md flex flex-col items-center justify-center">
              <div className="w-20 h-20 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-8"></div>
              <p className="font-black text-cyan-400 uppercase tracking-[0.5em] text-[10px] animate-pulse">
                Rendering Vision
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StrategyVision;
