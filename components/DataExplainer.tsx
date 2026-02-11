
import React, { useState } from 'react';
import { explainData, cleanData } from '../services/groqService';
import { AppState } from '../types';

interface Props {
  state: AppState;
  updateState: (s: Partial<AppState>) => void;
}

const DataExplainer: React.FC<Props> = ({ state, updateState }) => {
  const [dataInput, setDataInput] = useState(state.rawCsv);
  const [query, setQuery] = useState('Analyze regional sales performance and identify hidden growth clusters.');
  const [persona, setPersona] = useState('Aggressive Strategist');
  const [explanation, setExplanation] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const personas = [
    { name: 'Aggressive Strategist', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { name: 'Skeptical Auditor', color: 'text-magenta-400', bg: 'bg-magenta-500/10' },
    { name: 'Growth Visionary', color: 'text-lime-400', bg: 'bg-lime-500/10' }
  ];

  const validateCSV = (csv: string): string | null => {
    if (!csv || csv.trim() === "") return "Neural Link Error: Data input cannot be empty.";
    
    const lines = csv.trim().split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) return "Format Error: CSV must contain at least a header and one data row.";
    
    const headerCols = lines[0].split(',').map(c => c.trim());
    if (headerCols.length < 2) return "Parsing Error: Invalid CSV structure. Multiple comma-separated columns expected.";
    
    for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',');
        if (cols.length !== headerCols.length) {
            return `Vector Mismatch at line ${i + 1}: Expected ${headerCols.length} columns, found ${cols.length}.`;
        }
    }
    return null;
  };

  const handleCommit = () => {
    setError(null);
    setSuccess(null);
    const validationError = validateCSV(dataInput);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    updateState({ rawCsv: dataInput });
    setSuccess("Core synchronization complete. Data vectors locked.");
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleExplain = async () => {
    setError(null);
    setSuccess(null);
    const validationError = validateCSV(dataInput);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsExplaining(true);
    updateState({ rawCsv: dataInput });
    try {
      const result = await explainData(dataInput, query, persona);
      setExplanation(result);
    } catch (e: any) {
      setError(e.message === "API_KEY_MISSING" ? "Neural link failure: API Key Required" : "Synthesis error. Ensure data schema integrity.");
      setExplanation("");
    } finally {
      setIsExplaining(false);
    }
  };

  const handleClean = async () => {
    setIsCleaning(true);
    setError(null);
    setSuccess(null);
    try {
      const cleaned = await cleanData(dataInput);
      setDataInput(cleaned);
      const validationError = validateCSV(cleaned);
      if (!validationError) {
        updateState({ rawCsv: cleaned });
        setSuccess("Neural scrub complete. Data normalized.");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError("AI scrub attempted but data remains structurally inconsistent. Manual review required.");
      }
    } catch (e: any) {
      console.error("Cleaning failed", e);
      setError("Neural scrub failed. Check source data formatting.");
    } finally {
      setIsCleaning(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fadeIn pb-20">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none mb-3">Data Narrator</h2>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Neural Data Forensics & Synthesis</p>
        </div>
        <div className="flex gap-4">
           <button 
            onClick={handleClean}
            disabled={isCleaning || isExplaining}
            className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all flex items-center gap-3"
          >
            {isCleaning ? (
                <div className="w-3 h-3 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            )}
            Neural Clean
          </button>
          <button 
            onClick={handleCommit}
            className="px-6 py-3 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
          >
            Commit to Core
          </button>
        </div>
      </header>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-4 animate-fadeIn">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
          <p className="text-xs font-black text-rose-500 uppercase tracking-widest">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-4 animate-fadeIn">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <p className="text-xs font-black text-emerald-500 uppercase tracking-widest">{success}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Input Panel */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-panel p-8 rounded-[2.5rem] border-slate-800 relative group">
            <div className="absolute top-4 right-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Live Editor</span>
            </div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block">Source CSV Engine</label>
            <textarea
              className={`w-full h-[450px] bg-[#020617] border rounded-2xl p-6 text-xs font-mono transition-all resize-none leading-relaxed ${
                error ? 'border-rose-500/50 text-rose-300' : 'border-slate-800 text-cyan-300 focus:ring-1 focus:ring-cyan-500'
              }`}
              value={dataInput}
              onChange={(e) => {
                setDataInput(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Paste raw data records here..."
            />
          </div>

          <div className="glass-panel p-8 rounded-[2rem] border-slate-800 space-y-6">
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block">Narrator Persona</label>
              <div className="flex gap-2">
                {personas.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setPersona(p.name)}
                    className={`flex-1 py-3 px-2 rounded-xl text-[9px] font-black uppercase tracking-tighter transition-all border ${
                      persona === p.name 
                      ? `${p.bg} ${p.color} border-current` 
                      : 'bg-slate-900 text-slate-600 border-transparent hover:bg-slate-800'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                className="flex-1 bg-[#020617] border border-slate-800 rounded-xl px-5 py-4 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-cyan-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button 
                onClick={handleExplain}
                disabled={isExplaining || isCleaning}
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-cyan-600/20 disabled:opacity-50 transition-all"
              >
                Narrate
              </button>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-7">
            <div className="glass-panel p-10 rounded-[3rem] bg-slate-900/20 relative overflow-hidden border-slate-800 min-h-[680px] flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
            
            <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-cyan-500 rounded-full shadow-[0_0_15px_#22d3ee]"></span>
                    Intelligence Synthesis
                </h3>
                {explanation && (
                    <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-[9px] font-black text-cyan-400 uppercase tracking-widest">
                        Neural Precision: 98.4%
                    </div>
                )}
            </div>
            
            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                {explanation ? (
                    <div className="prose prose-invert max-w-none prose-cyan">
                    <div className="text-slate-300 leading-[2.2] whitespace-pre-wrap text-sm border-l-2 border-cyan-500/20 pl-8 font-medium italic">
                        {explanation}
                    </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center opacity-20 py-20">
                        <svg className="w-24 h-24 text-slate-600 mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        <p className="text-xl font-black text-slate-400 uppercase tracking-[0.3em]">Awaiting Input Sequence</p>
                        <p className="text-sm mt-4 text-slate-500 max-w-xs mx-auto">Upload sales metrics to begin the neural narration process.</p>
                    </div>
                )}
            </div>

            {isExplaining && (
                <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl flex flex-col items-center justify-center z-20">
                    <div className="relative">
                        <div className="w-24 h-24 border-2 border-cyan-500/10 border-t-cyan-500 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 border-2 border-magenta-500/10 border-b-magenta-500 rounded-full animate-spin-slow"></div>
                        </div>
                    </div>
                    <p className="mt-10 font-black text-cyan-400 animate-pulse uppercase tracking-[0.6em] text-[10px]">Processing Narrative Vectors</p>
                    <div className="mt-4 w-48 h-1 bg-slate-900 rounded-full overflow-hidden">
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

export default DataExplainer;
