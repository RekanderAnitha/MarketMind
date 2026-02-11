import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend
} from "recharts";

const PRODUCTS = [
  {
    name: "CloudSync",
    revenue: 120000,
    forecast: 155000,
    growth: "+29%",
    status: "Trending",
    recommendation: "Invest",
    reasoning: "High enterprise retention and strong ARR growth."
  },
  {
    name: "DataPulse",
    revenue: 90000,
    forecast: 82000,
    growth: "-8%",
    status: "Declining",
    recommendation: "Discontinue",
    reasoning: "Rising churn and falling upsell rate."
  },
  {
    name: "AdIntel",
    revenue: 60000,
    forecast: 90000,
    growth: "+18%",
    status: "Stable",
    recommendation: "Scale",
    reasoning: "Strong mid-market demand and healthy CAC."
  }
];

const ProductComparison: React.FC = () => {
  return (
    <div className="space-y-12 pb-24 text-slate-200">
      
      {/* HEADER */}
      <h2 className="text-5xl font-black text-white uppercase">
        Product Lab
      </h2>

      {/* PRODUCT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PRODUCTS.map(p => (
          <div
            key={p.name}
            className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50"
          >
            <div className="flex justify-between mb-2">
              <h3 className="text-2xl font-black text-white">
                {p.name}
              </h3>
              <span
                className={`text-xs uppercase font-black ${
                  p.recommendation === "Invest"
                    ? "text-emerald-400"
                    : p.recommendation === "Scale"
                    ? "text-cyan-400"
                    : "text-rose-400"
                }`}
              >
                {p.recommendation}
              </span>
            </div>

            <p className="text-xs text-slate-400">
              {p.status} · {p.growth}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-xs text-slate-500">Revenue</p>
                <p className="text-lg font-black text-white">
                  ${p.revenue.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Forecast</p>
                <p className="text-lg font-black text-cyan-400">
                  ${p.forecast.toLocaleString()}
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs italic text-slate-400">
              “{p.reasoning}”
            </p>
          </div>
        ))}
      </div>

      {/* CHART */}
      <div className="h-[420px] mt-12 bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={PRODUCTS} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" width={120} />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" name="Revenue" fill="#334155" />
            <Bar dataKey="forecast" name="Forecast">
              {PRODUCTS.map((p, i) => (
                <Cell
                  key={i}
                  fill={
                    p.recommendation === "Invest"
                      ? "#10b981"
                      : p.recommendation === "Scale"
                      ? "#06b6d4"
                      : "#f43f5e"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* TOP PRODUCT */}
      <div className="p-8 border border-cyan-500/30 rounded-2xl bg-cyan-500/5">
        <p className="text-xs uppercase text-cyan-400 font-black">
          Top Product
        </p>
        <h3 className="text-3xl font-black text-white">
          CloudSync
        </h3>
        <p className="text-slate-400 mt-2 italic">
          High enterprise retention and strong ARR growth.
        </p>
      </div>

    </div>
  );
};

export default ProductComparison;
