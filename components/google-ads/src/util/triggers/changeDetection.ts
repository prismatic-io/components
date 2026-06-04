import type { CampaignChange, CampaignQueryRow } from "../../types";

export const detectCampaignChanges = (
  currentCampaigns: CampaignQueryRow[],
  previousCampaigns: CampaignQueryRow[],
  changeTypes: string[],
): CampaignChange[] => {
  let localPreviousCampaigns = previousCampaigns;
  const changes: CampaignChange[] = [];
  const changedAt = new Date().toISOString();

  if (!localPreviousCampaigns || !Array.isArray(localPreviousCampaigns)) {
    localPreviousCampaigns = [];
  }

  for (const current of currentCampaigns) {
    const previous = localPreviousCampaigns.find(
      (p) => p.campaign?.id === current.campaign?.id,
    );

    if (!previous) {
      
      changes.push({
        changeType: "created",
        campaignId: current.campaign.id,
        campaignName: current.campaign.name,
        field: "campaign",
        oldValue: null,
        newValue: current,
        changedAt,
      });
      continue;
    }

    
    if (
      (changeTypes.includes("status") || changeTypes.includes("all")) &&
      current.campaign.status !== previous.campaign.status
    ) {
      changes.push({
        changeType: "status",
        campaignId: current.campaign.id,
        campaignName: current.campaign.name,
        field: "status",
        oldValue: previous.campaign.status,
        newValue: current.campaign.status,
        changedAt,
      });
    }

    
    if (
      (changeTypes.includes("budget") || changeTypes.includes("all")) &&
      current.campaignBudget?.amountMicros !==
        previous.campaignBudget?.amountMicros
    ) {
      changes.push({
        changeType: "budget",
        campaignId: current.campaign.id,
        campaignName: current.campaign.name,
        field: "budget_amount_micros",
        oldValue: previous.campaignBudget?.amountMicros,
        newValue: current.campaignBudget?.amountMicros,
        changedAt,
      });
    }

    
    if (
      (changeTypes.includes("bidding") || changeTypes.includes("all")) &&
      current.campaign?.biddingStrategyType !==
        previous.campaign?.biddingStrategyType
    ) {
      changes.push({
        changeType: "bidding",
        campaignId: current.campaign.id,
        campaignName: current.campaign.name,
        field: "bidding_strategy_type",
        oldValue: previous.campaign?.biddingStrategyType,
        newValue: current.campaign?.biddingStrategyType,
        changedAt,
      });
    }
  }

  
  for (const previous of localPreviousCampaigns) {
    const current = currentCampaigns.find(
      (c) => c.campaign?.id === previous.campaign?.id,
    );

    if (!current) {
      changes.push({
        changeType: "deleted",
        campaignId: previous.campaign.id,
        campaignName: previous.campaign.name,
        field: "campaign",
        oldValue: previous,
        newValue: null,
        changedAt,
      });
    }
  }

  return changes;
};
