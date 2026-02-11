import React, { useState } from "react";
import { AppState } from "../types";
import { generateCampaignFactory } from "../services/groqService";

interface Props {
  state: AppState;
  updateState: (s: Partial<AppState>) => void;
}

const CampaignFactory: React.FC<Props> = ({ state, updateState }) => {
  const [goal, setGoal] = useState(
    "Re-engage at-risk customers with a 20% discount offer"
  );
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const assets = await generateCampaignFactory(state.rawCsv, goal);

      updateState({
        campaigns: assets && assets.length > 0 ? assets : []
      });
    } catch (e) {
      console.error("Campaign Factory failed:", e);
      updateState({ campaigns: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 text-slate-200">
      <h2 className="text-5xl font-black text-white uppercase">
        Campaign Factory
      </h2>

      <div className="flex gap-4">
        <input
          type="text"
          value={goal}
          onChange={e => setGoal(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white"
        />
        <button
          onClick={handleGenerate}
          className="px-6 py-3 bg-cyan-500 text-black font-black rounded-lg"
        >
          {loading ? "Generating..." : "Launch Factory"}
        </button>
      </div>

      {state.campaigns.length === 0 && !loading && (
        <div className="p-10 border border-slate-700 rounded-lg text-center text-slate-400">
          No campaigns generated yet.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {state.campaigns.map((c, i) => (
          <div
            key={i}
            className="p-6 bg-slate-900 border border-slate-700 rounded-xl"
          >
            <p className="text-xs text-cyan-400 uppercase font-black mb-2">
              {c.channel}
            </p>
            <p className="text-white font-bold mb-3">{c.copy}</p>
            <p className="text-xs text-slate-400 italic">{c.strategy}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignFactory;
