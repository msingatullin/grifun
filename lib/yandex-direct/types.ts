export type YandexDirectCampaign = {
  Id: number;
  Name: string;
  Status: 'ACCEPTED' | 'DRAFT' | 'MODERATION' | 'REJECTED' | 'PREACCEPTED';
  State: 'ARCHIVED' | 'SUSPENDED' | 'ENDED' | 'ON' | 'OFF';
  DailyBudget?: {
    Amount: number;
    Mode?: 'DISTRIBUTED' | 'DAILY';
  };
  WeeklyBudget?: {
    Amount: number;
  };
  Statistics?: {
    Impressions: number;
    Clicks: number;
    Cost: number;
  };
  Type?: string;
  BiddingStrategy?: {
    Search?: {
      BiddingStrategyType: string;
    };
    Network?: {
      BiddingStrategyType: string;
    };
  };
};

export type CampaignStats = {
  campaignId: number;
  impressions: number;
  clicks: number;
  cost: number;
  ctr: number;
  avgCpc: number;
  conversions?: number;
  conversionRate?: number;
};

export type CampaignOptimization = {
  campaignId: number;
  campaignName: string;
  score: number;
  summary: string;
  recommendations: string[];
  suggestedChanges: {
    type: 'bid' | 'keywords' | 'negative' | 'ad_text' | 'budget' | 'targeting';
    action: string;
    reason: string;
    priority: 'high' | 'medium' | 'low';
  }[];
};

export type YandexDirectApiResponse<T> = {
  result?: T;
  error?: {
    error_code: number;
    error_string: string;
    error_detail: string;
  };
};

