export type ChangeStatusResourceStatus =
  | "ADDED"
  | "CHANGED"
  | "REMOVED"
  | "UNSPECIFIED"
  | "UNKNOWN";

export interface ChangeStatusEntityFields {
  campaign?: string;
  adGroup?: string;
  adGroupAd?: string;
  adGroupCriterion?: string;
  campaignCriterion?: string;
  adGroupBidModifier?: string;
  campaignBudget?: string;
  sharedSet?: string;
  campaignSharedSet?: string;
  asset?: string;
  customerAsset?: string;
  campaignAsset?: string;
  adGroupAsset?: string;
  combinedAudience?: string;
  assetGroup?: string;
  assetSet?: string;
  campaignAssetSet?: string;
}

export interface ChangeStatusRecord extends ChangeStatusEntityFields {
  resourceName: string;
  lastChangeDateTime: string;
  resourceType: string;
  resourceStatus: ChangeStatusResourceStatus;
}

export interface ChangeStatusRow {
  changeStatus: ChangeStatusRecord;
}
