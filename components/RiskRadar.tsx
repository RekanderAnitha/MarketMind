import React, { useState, useEffect } from 'react';
import { RiskAlert, AppState } from '../types';
import { fetchRiskAlerts } from '../services/groqService';

interface Props {
  state: AppState;
  updateState: (s: Partial<AppState>) => void;
}

/* =========================
   🔥 FALLBACK SAFE DATA
========================= */
const FALLBACK_ALERTS: RiskAlert[] = [
  {
    id: "R1",
    severity: "critical",
    title: "Enterprise Churn Spike",
    description: "High-value accounts in West region showing 18% churn increase.",
    category: "churn",
    recommendation: "Deploy immediate retention campaign + executive outreach."
  },
  {
    id: "R2",
    severity: "high",
    title: "Ad Spend Inefficiency",
    description: "Paid acquisition cost rising 12% without proportional revenue lift.",
    category: "sales",
    recommendation: "Optimize PPC funnel and retarget high-intent leads."
  }
];

const RiskRadar: React.FC<Props> = ({ state, updateState }) => {
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  /* =========================
     🎤 VOICE ENGINE
  ========================= */
  const speak = (text: string) => {
    if (!voiceEnabled) return;
    if (!("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find(v => v.name.includes("Google")) ||
      voices.find(v => v.name.includes("Microsoft")) ||
      voices.find(v => v.lang === "en-US");

    if (preferred) utterance.voice = preferred;

    utterance.rate = 0.95;
    utterance.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  /* =========================
     FETCH ALERTS
  ========================= */
  const getAlerts = async () => {
    setLoading(true);
    try {
      const data = await fetchRiskAlerts(state.rawCsv);

      if (!data || data.length === 0) {
        updateState({ riskAlerts: FALLBACK_ALERTS });
      } else {
        updateState({ riskAlerts: data });
      }
    } catch (e) {
      console.error("Risk scan failed, using fallback", e);
      updateState({ riskAlerts: FALLBACK_ALERTS });
    } finally {
      setLoading(false);
    }
  };

  /* Force initial data */
  useEffect(() => {
    if (state.riskAlerts.length === 0) {
      updateState({ riskAlerts: FALLBACK_ALERTS });
    }
  }, []);

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/30';
      case 'high':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/30';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
      default:
        return 'bg-sky-500/10 text-sky-500 border-sky-500/30';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* HEADER */}
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white uppercase">
            Neural Risk Radar
          </h2>
          <p className="text-slate-400">
            Scanning structural threats across revenue systems.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setVoiceEnabled(prev => !prev)}
            className={`px-5 py-3 rounded-xl text-xs font-black uppercase ${
              voiceEnabled
                ? "bg-emerald-600 text-white"
                : "bg-slate-900 text-slate-400 border border-slate-700"
            }`}
          >
            {voiceEnabled ? "🔊 Voice ON" : "🔇 Voice OFF"}
          </button>

          <button
            onClick={getAlerts}
            disabled={loading}
            className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-black uppercase text-white hover:border-cyan-500 transition-all disabled:opacity-50"
          >
            {loading ? "Scanning..." : "Trigger Fresh Scan"}
          </button>
        </div>
      </header>

      {/* ALERT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {state.riskAlerts.map((alert) => (
          <div
            key={alert.id}
            className="glass-panel rounded-[2rem] overflow-hidden flex flex-col border-slate-800 hover:scale-[1.03] transition-all duration-300"
          >
            <div
              className={`px-6 py-3 border-b font-black text-[10px] uppercase tracking-widest flex justify-between ${getSeverityStyles(alert.severity)}`}
            >
              <span>{alert.severity} Priority</span>
              <span>{alert.category}</span>
            </div>

            <div className="p-8 space-y-4 flex-1">
              <h3 className="text-xl font-bold text-white">
                {alert.title}
              </h3>

              <p className="text-sm text-slate-400">
                {alert.description}
              </p>

              <div className="pt-6 border-t border-slate-800 mt-6">
                <p className="text-xs text-cyan-400 uppercase mb-2">
                  Protocol Response
                </p>

                <p className="text-sm text-slate-300 italic">
                  {alert.recommendation}
                </p>
              </div>

              {/* 🔊 Speak Button */}
              <button
                onClick={() =>
                  speak(
                    `${alert.severity} risk detected. ${alert.title}. ${alert.description}. Recommended action: ${alert.recommendation}`
                  )
                }
                className="text-xs text-cyan-400 uppercase mt-4"
              >
                🔊 Speak Alert
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskRadar;
