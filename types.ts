// src/types.ts

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface RiskAlert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  category: 'churn' | 'market' | 'competitor' | 'sales';
  recommendation: string;
}

export interface Insight {
  id: string;
  title: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  percentage: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface DataMetric {
  name: string;
  value: number;
  prevValue: number;
  forecast?: number;
}

export interface CampaignMaterial {
  channel: string;
  copy: string;
  strategy: string;
}

export interface Segment {
  name: string;
  size: string;
  risk: 'low' | 'med' | 'high';
  strategy: string;
}

export interface ProductPerformance {
  name: string;
  revenue: number;
  forecast: number;
  growth: string;
  status: 'trending' | 'stable' | 'declining';
  recommendation?: 'Invest' | 'Scale' | 'Discontinue';
  reasoning?: string;
  rank?: number;
}

export interface AppState {
  insights: Insight[];
  salesData: DataMetric[];
  rawCsv: string;
  riskAlerts: RiskAlert[];
  campaigns: CampaignMaterial[];
  segments: Segment[];
  productAnalysis: ProductPerformance[];
}
