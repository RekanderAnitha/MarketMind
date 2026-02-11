// services/groqService.ts

import {
  Message,
  RiskAlert,
  GroundingSource,
  CampaignMaterial,
  Segment,
  ProductPerformance
} from "../types";

/* ========================
   SIMULATION DELAY
======================== */
const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

/* ========================
   PRODUCT LAB
======================== */
export const analyzeProductPerformance = async (
  _csvData: string
): Promise<ProductPerformance[]> => {
  await sleep(800);

  return [
    {
      name: "CloudSync",
      revenue: 120000,
      forecast: 160000,
      growth: "+33%",
      status: "trending",
      recommendation: "Invest",
      reasoning: "Enterprise ARR expanding rapidly with low churn.",
      rank: 1
    },
    {
      name: "AdIntel",
      revenue: 70000,
      forecast: 92000,
      growth: "+18%",
      status: "stable",
      recommendation: "Scale",
      reasoning: "Healthy mid-market demand with growth potential.",
      rank: 2
    },
    {
      name: "DataPulse",
      revenue: 90000,
      forecast: 85000,
      growth: "-6%",
      status: "declining",
      recommendation: "Discontinue",
      reasoning: "Declining engagement and rising CAC.",
      rank: 3
    }
  ];
};

/* ========================
   CAMPAIGN FACTORY
======================== */
export const generateCampaignFactory = async (
  _context: string,
  goal: string
): Promise<CampaignMaterial[]> => {
  await sleep(1000);

  return [
    {
      channel: "Email",
      copy: `Subject: Limited Offer 🚀\n\n${goal}\nClaim your 20% discount before it expires.`,
      strategy: "Urgency-driven retention funnel."
    },
    {
      channel: "LinkedIn",
      copy: `We’re helping modern SaaS companies scale smarter. ${goal}`,
      strategy: "Authority positioning + thought leadership."
    },
    {
      channel: "Google Ads",
      copy: `Scale Faster with CloudSync — ${goal}`,
      strategy: "High-intent keyword targeting campaign."
    }
  ];
};

/* ========================
   AUDIENCE MATRIX
======================== */
export const segmentAudience = async (
  _data: string
): Promise<Segment[]> => {
  await sleep(900);

  return [
    {
      name: "Enterprise Titans",
      size: "24 Accounts",
      risk: "low",
      strategy: "Upsell premium integrations."
    },
    {
      name: "SMB Growth Seekers",
      size: "83 Accounts",
      risk: "med",
      strategy: "Offer loyalty incentives."
    },
    {
      name: "At-Risk Customers",
      size: "41 Accounts",
      risk: "high",
      strategy: "Deploy urgent retention campaign."
    }
  ];
};

/* ========================
   RISK RADAR
======================== */
export const fetchRiskAlerts = async (
  _data?: string
): Promise<RiskAlert[]> => {
  await sleep(700);

  return [
    {
      id: "R1",
      severity: "critical",
      title: "Churn Spike",
      description: "SMB churn rising in West region.",
      category: "churn",
      recommendation: "Launch immediate retention campaign."
    },
    {
      id: "R2",
      severity: "medium",
      title: "Ad Spend Inefficiency",
      description: "Paid acquisition CAC rising 12%.",
      category: "sales",
      recommendation: "Reallocate budget to high-intent segments."
    }
  ];
};

/* ========================
   DASHBOARD + MARKET INTEL
   FIXED (OPTIONAL TOPIC)
======================== */
export const getMarketIntelligence = async (
  topic?: string
): Promise<{
  text: string;
  sources: GroundingSource[];
}> => {
  await sleep(600);

  // Dashboard default pulse
  if (!topic) {
    return {
      text:
        "AI-native SaaS demand accelerating in enterprise markets. Cloud infrastructure spend up 18% YoY. Retention strategies outperform acquisition in Q3.",
      sources: []
    };
  }

  // MarketIntel page topic search
  return {
    text: `Market Intelligence Report on "${topic}":

• Competitive activity increasing.
• Pricing shifting toward usage-based models.
• Enterprise demand rising faster than SMB.
• Retention > acquisition efficiency in current cycle.

Strategic Signal:
Focus on capital efficiency and lifecycle expansion.`,
    sources: []
  };
};

/* ========================
   SMART COPILOT (DYNAMIC)
======================== */
export const chatWithCopilot = async (
  messages: Message[],
  _dataContext: string
): Promise<string> => {
  await sleep(900);

  const lastMessage =
    messages[messages.length - 1]?.content.toLowerCase() || "";

  if (lastMessage.includes("roi") || lastMessage.includes("best product")) {
    return `
📊 ROI Intelligence Report:

CloudSync currently delivers the highest ROI.

• Revenue: $120,000
• Forecast: $160,000
• Growth: +33%

Recommendation:
Increase capital allocation and expand enterprise partnerships.
    `;
  }

  if (lastMessage.includes("churn")) {
    return `
⚠️ Churn Risk Assessment:

High-risk cluster identified:
→ At-Risk Customers

Strategic Action:
Deploy 14-day retention campaign with targeted incentives.
    `;
  }

  if (lastMessage.includes("correlation")) {
    return `
📈 Marketing vs Revenue Correlation:

Strong positive correlation detected.
Revenue increases approximately 30 days after marketing scale.

Recommendation:
Scale only high-performing channels.
    `;
  }

  return `
🧠 Strategic Overview:

• Strongest product: CloudSync
• Primary risk: SMB churn
• Fastest growing segment: Enterprise
• Key opportunity: Retention optimization
  `;
};

/* ========================
   WHAT-IF SIMULATION
======================== */
export const runWhatIfSimulation = async (
  _base: string,
  pricing: number,
  budget: number
): Promise<string> => {
  await sleep(800);

  const impact = pricing * 0.7 + budget * 0.5;
  return `Projected revenue impact ≈ ${impact.toFixed(2)}%.`;
};

/* ========================
   DATA EXPLAINER
======================== */
export const explainData = async (
  _data: string,
  _query: string,
  persona: string
): Promise<string> => {
  await sleep(600);

  return `[${persona}] Insight: Funnel inefficiency detected in mid-market segment. Optimize mid-funnel messaging to unlock hidden revenue.`;
};

/* ========================
   UNUSED / PLACEHOLDERS
======================== */
export const connectLiveCopilot = async () => ({
  sendRealtimeInput: () => {},
  sendToolResponse: () => {},
  close: () => {}
});

export const generateBriefingAudio = async () => "";
export const generateProjectTrailer = async () => "";
export const generateStrategyVisual = async () => "";
export const cleanData = async (d: string) => d;
