export interface CampaignQueryRow {
  campaign: {
    resourceName: string;
    id: string; 
    name: string;
    status: string;

    
    biddingStrategyType?: string;
    targetCpa?: {
      targetCpaMicros?: string; 
    };
    targetRoas?: {
      targetRoas?: number; 
    };

    
    startDate?: string; 
    endDate?: string; 
    advertisingChannelType?: string;
    networkSettings?: {
      targetGoogleSearch?: boolean;
      targetSearchNetwork?: boolean;
    };
  };

  
  campaignBudget?: {
    amountMicros?: string;
    period?: string;
  };

  
  metrics?: {
    costMicros: string;
  };
}
