export type ChangeEventResponse = {
  changeEvent: ChangeEvent;
};

export type ChangeEvent = {
  resourceName: string;
  changeDateTime: string;
  changeResourceType: ChangeResourceType;
  changeResourceName: string;
  clientType: ClientType;
  userEmail?: string;
  oldResource: ChangeEventResourceWrapper;
  newResource: ChangeEventResourceWrapper;
  resourceChangeOperation: ResourceChangeOperation;
};

export type ChangeResourceType =
  | "AD"
  | "AD_GROUP"
  | "AD_GROUP_AD"
  | "AD_GROUP_BID_MODIFIER"
  | "AD_GROUP_CRITERION"
  | "AD_GROUP_FEED"
  | "AD_PARAMETER"
  | "ASSET"
  | "ASSET_SET"
  | "ASSET_SET_ASSET"
  | "BIDDING_STRATEGY"
  | "CAMPAIGN"
  | "CAMPAIGN_ASSET"
  | "CAMPAIGN_ASSET_SET"
  | "CAMPAIGN_BUDGET"
  | "CAMPAIGN_CRITERION"
  | "CAMPAIGN_FEED"
  | "CAMPAIGN_SHARED_SET"
  | "EXTENSION_FEED_ITEM"
  | "FEED"
  | "FEED_ITEM"
  | "FEED_ITEM_SET"
  | "FEED_ITEM_SET_LINK"
  | "FEED_MAPPING"
  | "KEYWORD_PLAN"
  | "LABEL"
  | "MAIN_ASSET"
  | "OFFLINE_USER_DATA_JOB"
  | "SHARED_SET"
  | "UNSPECIFIED";

export type ClientType =
  | "UNKNOWN"
  | "UNSPECIFIED"
  | "GOOGLE_ADS_WEB_CLIENT"
  | "GOOGLE_ADS_EDITOR"
  | "GOOGLE_ADS_MOBILE_APP"
  | "AUTOMATED_BIDDING_SYSTEM"
  | "EXTERNAL_API";

export type ResourceChangeOperation = "CREATE" | "UPDATE" | "REMOVE";



export interface ChangeEventResourceWrapper {
  campaign?: CampaignResource;
  
}



export interface CampaignResource {
  resourceName: string;
  status?: string;
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

export interface NetworkSettings {
  targetGoogleSearch?: boolean;
  targetSearchNetwork?: boolean;
  targetContentNetwork?: boolean;
  targetPartnerSearchNetwork?: boolean;
  targetYoutube?: boolean;
  targetGoogleTvNetwork?: boolean;
}

export interface TargetingSetting {
  targetRestrictions?: TargetRestriction[];
}

export interface TargetRestriction {
  targetingDimension: string;
  bidOnly: boolean;
}

export interface GeoTargetTypeSetting {
  positiveGeoTargetType: string;
  negativeGeoTargetType: string;
}

export interface AssetAutomationSetting {
  assetAutomationType: string;
  assetAutomationStatus: string;
}
