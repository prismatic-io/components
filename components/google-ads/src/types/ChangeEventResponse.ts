type ChangeResourceType =
  | "AD"
  | "AD_GROUP"
  | "AD_GROUP_AD"
  | "AD_GROUP_ASSET"
  | "AD_GROUP_BID_MODIFIER"
  | "AD_GROUP_CRITERION"
  | "AD_GROUP_FEED"
  | "ASSET"
  | "ASSET_SET"
  | "ASSET_SET_ASSET"
  | "CAMPAIGN"
  | "CAMPAIGN_ASSET"
  | "CAMPAIGN_ASSET_SET"
  | "CAMPAIGN_BUDGET"
  | "CAMPAIGN_CRITERION"
  | "CAMPAIGN_FEED"
  | "CUSTOMER_ASSET"
  | "FEED"
  | "FEED_ITEM"
  | "UNKNOWN"
  | "UNSPECIFIED";
type ClientType =
  | "UNKNOWN"
  | "UNSPECIFIED"
  | "GOOGLE_ADS_WEB_CLIENT"
  | "GOOGLE_ADS_EDITOR"
  | "GOOGLE_ADS_MOBILE_APP"
  | "AUTOMATED_BIDDING_SYSTEM"
  | "EXTERNAL_API";
type ResourceChangeOperation = "CREATE" | "UPDATE" | "REMOVE";
interface NetworkSettings {
  targetGoogleSearch?: boolean;
  targetSearchNetwork?: boolean;
  targetContentNetwork?: boolean;
  targetPartnerSearchNetwork?: boolean;
  targetYoutube?: boolean;
  targetGoogleTvNetwork?: boolean;
}
interface TargetRestriction {
  targetingDimension: string;
  bidOnly: boolean;
}
interface TargetingSetting {
  targetRestrictions?: TargetRestriction[];
}
interface GeoTargetTypeSetting {
  positiveGeoTargetType: string;
  negativeGeoTargetType: string;
}
interface AssetAutomationSetting {
  assetAutomationType: string;
  assetAutomationStatus: string;
}
export interface CampaignResource {
  resourceName: string;
  status?: string;
  biddingStrategyType?: string;
  adServingOptimizationStatus?: string;
  advertisingChannelType?: string;
  networkSettings?: NetworkSettings;
  targetingSetting?: TargetingSetting;
  geoTargetTypeSetting?: GeoTargetTypeSetting;
  name?: string;
  id?: string;
  campaignBudget?: string;
  assetAutomationSettings?: AssetAutomationSetting[];
  containsEuPoliticalAdvertising?: string;
}
interface CampaignBudgetResource {
  resourceName?: string;
  amountMicros?: string;
  totalAmountMicros?: string;
  period?: string;
  name?: string;
}
interface ChangeEventResourceWrapper {
  campaign?: CampaignResource;
  campaignBudget?: CampaignBudgetResource;
}
interface ChangeEvent {
  resourceName: string;
  changeDateTime: string;
  changeResourceType: ChangeResourceType;
  changeResourceName: string;
  clientType: ClientType;
  oldResource: ChangeEventResourceWrapper;
  newResource: ChangeEventResourceWrapper;
  resourceChangeOperation: ResourceChangeOperation;
  userEmail?: string;
}
export interface ChangeEventResponse {
  changeEvent: ChangeEvent;
}
export interface CampaignChangeEventRow {
  changeEvent: ChangeEvent;
  campaign?: {
    resourceName?: string;
    id?: string;
    name?: string;
  };
}
