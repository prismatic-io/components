import { CAMPAIGN_CHANGE_RESOURCE_TYPE, CHANGE_TYPE } from "../../constants";
import type { CampaignChange, CampaignChangeEventRow } from "../../types";
const isSelected = (changeTypes: string[], changeType: string): boolean =>
  changeTypes.includes(changeType) || changeTypes.includes(CHANGE_TYPE.ALL);
export const mapChangeEventsToCampaignChanges = (
  rows: CampaignChangeEventRow[],
  changeTypes: string[],
): CampaignChange[] => {
  const changes: CampaignChange[] = [];
  for (const row of rows) {
    const event = row.changeEvent;
    if (!event) {
      continue;
    }
    const campaignId = row.campaign?.id ?? "";
    const campaignName = row.campaign?.name ?? "";
    const changedAt = event.changeDateTime;
    const operation = event.resourceChangeOperation;
    const oldCampaign = event.oldResource?.campaign;
    const newCampaign = event.newResource?.campaign;
    if (event.changeResourceType === CAMPAIGN_CHANGE_RESOURCE_TYPE.CAMPAIGN) {
      if (operation === "CREATE") {
        changes.push({
          changeType: "created",
          campaignId,
          campaignName,
          field: "campaign",
          oldValue: null,
          newValue: newCampaign ?? null,
          changedAt,
        });
        continue;
      }
      if (operation === "REMOVE") {
        changes.push({
          changeType: "deleted",
          campaignId,
          campaignName,
          field: "campaign",
          oldValue: oldCampaign ?? null,
          newValue: null,
          changedAt,
        });
        continue;
      }
      if (
        isSelected(changeTypes, CHANGE_TYPE.STATUS) &&
        oldCampaign?.status !== newCampaign?.status
      ) {
        changes.push({
          changeType: "status",
          campaignId,
          campaignName,
          field: "status",
          oldValue: oldCampaign?.status,
          newValue: newCampaign?.status,
          changedAt,
        });
      }
      if (
        isSelected(changeTypes, CHANGE_TYPE.BIDDING) &&
        oldCampaign?.biddingStrategyType !== newCampaign?.biddingStrategyType
      ) {
        changes.push({
          changeType: "bidding",
          campaignId,
          campaignName,
          field: "bidding_strategy_type",
          oldValue: oldCampaign?.biddingStrategyType,
          newValue: newCampaign?.biddingStrategyType,
          changedAt,
        });
      }
      continue;
    }
    const oldAmount = event.oldResource?.campaignBudget?.amountMicros;
    const newAmount = event.newResource?.campaignBudget?.amountMicros;
    if (
      isSelected(changeTypes, CHANGE_TYPE.BUDGET) &&
      oldAmount !== newAmount
    ) {
      changes.push({
        changeType: "budget",
        campaignId,
        campaignName,
        field: "budget_amount_micros",
        oldValue: oldAmount,
        newValue: newAmount,
        changedAt,
      });
    }
  }
  return changes.reverse();
};
