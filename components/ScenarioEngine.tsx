import React, { useState } from 'react';
import { AppState } from '../types';
import { runWhatIfSimulation } from '../services/groqService';

interface Props {
  state: AppState;
}

const ScenarioEngine: React.FC<Props> = ({ state }) => {
  const [priceMod, setPriceMod] = useState(0);
  const [budgetMod, setBudgetMod] = useState(0);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSimulate = async () => {
    setLoading(true);
    setError(null);
    try {
      // Ensure the latest CSV state is used for simulation
      const sim = await runWhatIfSimulation(
        state.rawCsv,
        priceMod,
        budgetMod
      );
      setResult(sim);
    } catch (e: any) {
      console.error("Simulation Failure:", e);
      let errorMsg = "Strategic modeling failed. Check neural link.";
      if (e.message?.includes("API_KEY_MISSING"))
        errorMsg = "API Key selection required for complex modelling.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      <header>
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-2 leading-none">
          Scenario Engine
        </h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
          AI-Driven Strategic Modeling & Prediction
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-8">
          <div className="glass-panel p-10 rounded-[3rem] border-slate-800 space-y-10">
            {/* Pricing */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Pricing Delta
                </label>
                <span
                  className={`font-black text-sm ${
                    priceMod > 0
                      ? 'text-emerald-400'
                      : priceMod < 0
                      ? 'text-rose-400'
                      : 'text-cyan-400'
                  }`}
                >
                  {priceMod > 0 ? '+' : ''}
                  {priceMod}%
                </span>
              </div>
              <input
                type="range"
                min="-30"
                max="30"
                step="5"
                value={priceMod}
                onChange={(e) => setPriceMod(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[8px] text-slate-600 font-bold uppercase">
                <span>Aggressive Discount</span>
                <span>Premium Hike</span>
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Ad Spend Modulator
                </label>
                <span
                  className={`font-black text-sm ${
                    budgetMod > 0 ? 'text-emerald-400' : 'text-magenta-400'
                  }`}
                >
                  {budgetMod > 0 ? '+' : ''}
                  {budgetMod}%
                </span>
              </div>
              <input
                type="range"
                min="-50"
                max="100"
                step="10"
                value={budgetMod}
                onChange={(e) => setBudgetMod(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-magenta-500"
              />
              <div className="flex justify-between text-[8px] text-slate-600 font-bold uppercase">
                <span>Budget Cut</span>
                <span>Hyper-Growth</span>
              </div>
            </div>

            <button
              onClick={handleSimulate}
              disabled={loading}
              className="w-full py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all disabled:opacity-50 shadow-xl active:scale-95"
            >
              {loading ? "Projecting Outcomes..." : "Initiate Simulation"}
            </button>

            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                <p className="text-[9px] text-rose-500 font-black uppercase tracking-widest">
                  {error}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RESULT */}
        <div className="lg:col-span-8">
          <div className="glass-panel p-12 rounded-[3.5rem] border-slate-800 min-h-[500px] flex flex-col relative overflow-hidden bg-slate-900/30">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

            {result ? (
              <div className="prose prose-invert max-w-none animate-fadeIn">
                <div className="flex items-center gap-3 mb-8">
                  <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                    Simulation Report #MM-SIM-
                    {(Math.random() * 1000).toFixed(0)}
                  </div>
                </div>
                <div className="text-slate-300 leading-[2.2] text-sm whitespace-pre-wrap italic border-l-2 border-cyan-500/20 pl-8 font-medium">
                  {result}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-20">
                <div className="w-24 h-24 mb-6 border-2 border-slate-800 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="text-2xl font-black uppercase tracking-[0.2em]">
                  Awaiting Simulation Vectors
                </p>
                <p className="mt-4 text-xs max-w-xs leading-relaxed">
                  Adjust pricing and marketing spend to calculate predicted
                  revenue trajectories grounded in your current data context.
                </p>
              </div>
            )}

            {loading && (
              <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md flex flex-col items-center justify-center z-20">
                <div className="relative">
                  <div className="w-20 h-20 border-2 border-cyan-500/10 border-t-cyan-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-2 border-magenta-500/10 border-b-magenta-500 rounded-full animate-reverse-spin"></div>
                  </div>
                </div>
                <p className="mt-10 text-[10px] font-black text-cyan-400 uppercase tracking-[0.6em] animate-pulse">
                  Modeling Potential Realities
                </p>
                <div className="mt-6 w-48 h-1 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 animate-progress"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioEngine;
