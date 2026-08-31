interface CampaignTargetCpa {
  targetCpaMicros?: string;
}
interface CampaignTargetRoas {
  targetRoas?: number;
}
interface CampaignQueryNetworkSettings {
  targetGoogleSearch?: boolean;
  targetSearchNetwork?: boolean;
}
interface CampaignQueryBudget {
  amountMicros?: string;
  period?: string;
}
interface CampaignQueryMetrics {
  costMicros: string;
}
interface CampaignQueryCampaign {
  resourceName: string;
  id: string;
  name: string;
  status: string;
  biddingStrategyType?: string;
  targetCpa?: CampaignTargetCpa;
  targetRoas?: CampaignTargetRoas;
  startDateTime?: string;
  endDateTime?: string;
  startDate?: string;
  endDate?: string;
  advertisingChannelType?: string;
  networkSettings?: CampaignQueryNetworkSettings;
}
export interface CampaignQueryRow {
  campaign: CampaignQueryCampaign;
  campaignBudget?: CampaignQueryBudget;
  metrics?: CampaignQueryMetrics;
}
