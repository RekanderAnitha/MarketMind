
import { AppState } from './types';

export const INITIAL_STATE: AppState = {
  insights: [
    { id: '1', title: "Net Revenue (ARR)", value: "$4.18M", trend: 'up', percentage: "+24.2%" },
    { id: '2', title: "Avg. CAC", value: "$310", trend: 'down', percentage: "-14.5%" },
    { id: '3', title: "ROAS (Blended)", value: "5.2x", trend: 'up', percentage: "+1.2x" },
    { id: '4', title: "LTV:CAC Ratio", value: "4.1:1", trend: 'up', percentage: "+0.9" }
  ],
  salesData: [
    { name: "Jan '24", value: 210000, prevValue: 189000 },
    { name: "Feb '24", value: 178000, prevValue: 210000 },
    { name: "Mar '24", value: 195000, prevValue: 178000 },
    { name: "Apr '24", value: 202000, prevValue: 195000 },
    { name: "May '24", value: 225000, prevValue: 202000 },
    { name: "Jun '24", value: 310000, prevValue: 225000 },
    { name: "Jul '24 (Est)", value: 0, prevValue: 310000, forecast: 345000 },
    { name: "Aug '24 (Est)", value: 0, prevValue: 310000, forecast: 398000 }
  ],
  rawCsv: `ID,Date,Region,Segment,Product,Channel,Cost,Revenue,Leads,Status,ChurnRisk
TX9001,2024-06-01,North,Enterprise,CloudSync v2,Direct,5000,45000,88,Closed,0.01
TX9002,2024-06-02,West,SMB,NetBoost Pro,PPC,1200,3100,22,At Risk,0.88
TX9003,2024-06-05,South,Mid-Market,SecureFlow,Organic,0,12000,54,Stable,0.04
TX9004,2024-06-08,East,Enterprise,CloudSync v2,Direct,4500,52000,102,Closed,0.01
TX9005,2024-06-10,West,SMB,DataGuard Lite,Social,2500,1800,215,Critical,0.99
TX9006,2024-06-12,North,Enterprise,SecureFlow,Direct,3100,28500,67,Closed,0.02
TX9007,2024-06-15,Central,SMB,NetBoost Pro,PPC,1800,1900,14,Churn Warning,0.94
TX9008,2024-06-18,East,Mid-Market,CloudSync v2,Organic,0,14800,41,Stable,0.08
TX9009,2024-06-20,West,Enterprise,DataGuard Lite,Direct,8500,75000,184,Closed,0.01
TX9010,2024-06-22,South,SMB,SecureFlow,Social,3200,2400,190,Critical,0.96
TX9011,2024-06-25,North,Mid-Market,NetBoost Pro,Direct,2100,9800,38,Closed,0.11
TX9012,2024-06-28,East,SMB,DataGuard Lite,PPC,900,1200,9,Churn Warning,0.98`,
  riskAlerts: [],
  campaigns: [],
  segments: [],
  // Fix: Added missing productAnalysis property required by AppState interface
  productAnalysis: []
};
