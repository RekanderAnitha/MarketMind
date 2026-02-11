
import React from 'react';
import { AppState } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface Props {
  state: AppState;
}

const ForecastLab: React.FC<Props> = ({ state }) => {
  return (
    <div className="space-y-10 animate-fadeIn">
      <header>
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-2">Growth Forecast</h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">AI-Predicted Revenue Trajectory & Confidence Intervals</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-10 rounded-[3rem] border-slate-800">
          <div className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={state.salesData}>
                <defs>
                  <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a3e635" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="#a3e635" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#020617', border: '1px solid #a3e635', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={3} fillOpacity={0} />
                <Area type="monotone" dataKey="forecast" stroke="#a3e635" strokeWidth={4} strokeDasharray="8 8" fill="url(#forecastGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 flex justify-center gap-12 text-[10px] font-black uppercase tracking-widest">
            <div className="flex items-center gap-2 text-cyan-400">
               <div className="w-4 h-1 bg-cyan-400"></div> Historical Data
            </div>
            <div className="flex items-center gap-2 text-lime-400">
               <div className="w-4 h-1 bg-lime-400 border-dashed border-t-2"></div> AI Neural Forecast
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-8 rounded-[2rem] border-slate-800">
            <h3 className="text-xs font-black text-lime-400 uppercase tracking-widest mb-6">Forecast Insights</h3>
            <div className="space-y-6">
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Expected Q3 Growth</p>
                <p className="text-2xl font-black text-white">+18.2%</p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Neural Confidence</p>
                <p className="text-2xl font-black text-white">94.8%</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed italic">
                "Based on seasonal velocity and recent high-potential leads in the West region, we expect a major revenue spike in August."
              </p>
            </div>
          </div>
          
          <div className="glass-panel p-8 rounded-[2rem] border-lime-500/20 bg-lime-500/5">
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-2">Demand Signal</h4>
            <p className="text-[11px] text-slate-400">Supply chain logistics should be optimized for a 20% increase in CloudSync demand by mid-Q3.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastLab;
