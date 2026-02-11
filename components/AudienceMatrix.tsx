import React, { useEffect, useState } from "react";
import { AppState } from "../types";
import { segmentAudience } from "../services/groqService";

interface Props {
  state: AppState;
  updateState: (s: Partial<AppState>) => void;
}

const AudienceMatrix: React.FC<Props> = ({ state, updateState }) => {
  const [loading, setLoading] = useState(false);

  const handleSegment = async () => {
    setLoading(true);
    try {
      const segments = await segmentAudience(state.rawCsv);

      updateState({
        segments: segments && segments.length > 0 ? segments : []
      });
    } catch (e) {
      console.error("Segmentation failed:", e);
      updateState({ segments: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.segments.length === 0) {
      handleSegment();
    }
  }, []);

  return (
    <div className="space-y-10 text-slate-200">
      <div className="flex justify-between items-center">
        <h2 className="text-5xl font-black text-white uppercase">
          Audience Matrix
        </h2>
        <button
          onClick={handleSegment}
          className="px-6 py-3 bg-cyan-500 text-black font-black rounded-lg"
        >
          {loading ? "Training..." : "Retrain Clusters"}
        </button>
      </div>

      {state.segments.length === 0 && !loading && (
        <div className="p-10 border border-slate-700 rounded-lg text-center text-slate-400">
          No segments available.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {state.segments.map((s, i) => (
          <div
            key={i}
            className="p-6 bg-slate-900 border border-slate-700 rounded-xl"
          >
            <h3 className="text-xl font-black text-white mb-2">
              {s.name}
            </h3>

            <p className="text-xs text-slate-400 mb-3">
              Cohort Size: {s.size}
            </p>

            <p
              className={`text-xs font-black uppercase mb-3 ${
                s.risk === "high"
                  ? "text-rose-400"
                  : s.risk === "med"
                  ? "text-amber-400"
                  : "text-emerald-400"
              }`}
            >
              Risk: {s.risk}
            </p>

            <p className="text-xs text-slate-300 italic">
              {s.strategy}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudienceMatrix;
