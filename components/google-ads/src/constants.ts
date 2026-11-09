import type {
  ChangeHistoryBatchItem,
  ChangeStatusEntityFields,
  ChangeStatusResourceStatus,
} from "./types";

export const GET_ACCOUNT_HIERARCHY_QUERY = `SELECT
          customer_client.client_customer,
          customer_client.level,
          customer_client.manager,
          customer_client.descriptive_name,
          customer_client.id
        FROM customer_client
        WHERE customer_client.level <= `;

export const DEFAULT_CUSTOMER_CLIENT_LEVEL = "1";

export const DEFAULT_ALERT_THRESHOLD = 80;

export const CRITICAL_ALERT_THRESHOLD = 95;

export const MAX_CONSECUTIVE_POLLING_ERRORS = 3;

export const GOOGLE_ADS_MAX_RETRIES = 3;
export const GOOGLE_ADS_RETRY_BASE_DELAY_MS = 2000;
export const GOOGLE_ADS_RETRY_MAX_JITTER_MS = 1000;
export const RETRYABLE_READ_ERROR_CODES = [
  "RESOURCE_TEMPORARILY_EXHAUSTED",
  "TRANSIENT_ERROR",
  "INTERNAL_ERROR",
];
export const RETRYABLE_WRITE_ERROR_CODES = ["RESOURCE_TEMPORARILY_EXHAUSTED"];
export const READ_REQUEST_PATH_SUFFIXES = [":search", ":searchStream"];
export const GOOGLE_ADS_ERROR_GUIDANCE: Record<string, string> = {
  CLOUD_PROJECT_NOT_APPROVED_FOR_PRODUCTION:
    "The Google Cloud project that owns this connection's OAuth client only has Test Account access. Apply for Explorer or Basic access on the project's Google Ads API Overview page in the Google Cloud Console, then retry.",
};

export const MICROS_TO_DOLLARS_CONVERSION_FACTOR = 1000000;

export const BUDGET_SEVERITY = {
  INFO: "info",
  WARNING: "warning",
  CRITICAL: "critical",
} as const;

export const NO_DESCRIPTIVE_NAME = "(No descriptive name)";

export const DESCRIPTIVE_NAME_UNAVAILABLE = "No Description";

export const GOOGLE_ADS_OAUTH_SCOPE = "https://www.googleapis.com/auth/adwords";
export const GOOGLE_DATA_MANAGER_OAUTH_SCOPE =
  "https://www.googleapis.com/auth/datamanager";

export const GOOGLE_ADS_BASE_URL = "https://googleads.googleapis.com";

export const GOOGLE_DATA_MANAGER_BASE_URL =
  "https://datamanager.googleapis.com";

export const GOOGLE_LOCAL_SERVICES_BASE_URL =
  "https://localservices.googleapis.com";

export const GOOGLE_ADS_API_VERSION = "v26";

export const GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION = "v23";

export const GOOGLE_ADS_VERSION_SUNSETS: Record<string, string> = {
  v23: "2027-02",
  v24: "2027-05",
  v25: "2027-08",
  v26: "2027-11",
};

export const GOOGLE_DATA_MANAGER_API_VERSION = "v1";

export const GOOGLE_DATA_MANAGER_MINIMUM_SUPPORTED_API_VERSION = "v1";

export const GOOGLE_LOCAL_SERVICES_API_VERSION = "v1";

export const googleAdsSearchPath = (customerId: string): string =>
  `/customers/${customerId}/googleAds:search`;

export const CHANGE_TYPE = {
  STATUS: "status",
  BUDGET: "budget",
  BIDDING: "bidding",
  SETTINGS: "settings",
  ALL: "all",
} as const;

export const CHANGE_EVENT_ROW_LIMIT = 10000;
export const CHANGE_EVENT_MAX_WINDOW_DAYS = 30;

export const CHANGE_EVENT_SETTLE_MINUTES = 5;

export const CHANGE_STATUS_MAX_WINDOW_DAYS = 90;

export const BATCHED_CHANGE_EVENT_ROW_LIMIT = 1000;

export const TRIGGER_BATCH_SIZE = 50;

export const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export const LOOK_BACK_DATE_START_TIME = "00:00:00";

export const DEFAULT_INITIAL_LOOK_BACK_HOURS = 1;

export const OPERATION_TO_CHANGE_TYPE: Record<
  string,
  ChangeHistoryBatchItem["changeType"]
> = {
  CREATE: "created",
  UPDATE: "updated",
  REMOVE: "removed",
};

export const CAMPAIGN_CHANGE_RESOURCE_TYPE = {
  CAMPAIGN: "CAMPAIGN",
  CAMPAIGN_BUDGET: "CAMPAIGN_BUDGET",
} as const;

export const CHANGE_HISTORY_RESOURCE_TYPE_QUERY_VALUE: Record<string, string> =
  {
    KEYWORD: "AD_GROUP_CRITERION",
  };

export const CHANGE_TYPES_MODEL = [
  { label: "Status Changes", value: CHANGE_TYPE.STATUS },
  { label: "Budget Changes", value: CHANGE_TYPE.BUDGET },
  { label: "Bid Strategy Changes", value: CHANGE_TYPE.BIDDING },
  { label: "Campaign Settings", value: CHANGE_TYPE.SETTINGS },
  { label: "All Changes", value: CHANGE_TYPE.ALL },
];

export const CHANGE_STATUS_RESOURCE_TYPES_MODEL = [
  { label: "Ad Groups", value: "AD_GROUP" },
  { label: "Ad Group Ads", value: "AD_GROUP_AD" },
  { label: "Ad Group Criteria", value: "AD_GROUP_CRITERION" },
  { label: "Campaigns", value: "CAMPAIGN" },
  { label: "Campaign Criteria", value: "CAMPAIGN_CRITERION" },
  { label: "Campaign Budgets", value: "CAMPAIGN_BUDGET" },
  { label: "Ad Group Bid Modifiers", value: "AD_GROUP_BID_MODIFIER" },
  { label: "Shared Sets", value: "SHARED_SET" },
  { label: "Campaign Shared Sets", value: "CAMPAIGN_SHARED_SET" },
  { label: "Assets", value: "ASSET" },
  { label: "Customer Assets", value: "CUSTOMER_ASSET" },
  { label: "Campaign Assets", value: "CAMPAIGN_ASSET" },
  { label: "Ad Group Assets", value: "AD_GROUP_ASSET" },
  { label: "Combined Audiences", value: "COMBINED_AUDIENCE" },
  { label: "Asset Groups", value: "ASSET_GROUP" },
  { label: "Asset Sets", value: "ASSET_SET" },
  { label: "Campaign Asset Sets", value: "CAMPAIGN_ASSET_SET" },
];

export const CHANGE_STATUS_RESOURCE_FIELD: Record<
  string,
  keyof ChangeStatusEntityFields
> = {
  AD_GROUP: "adGroup",
  AD_GROUP_AD: "adGroupAd",
  AD_GROUP_CRITERION: "adGroupCriterion",
  CAMPAIGN: "campaign",
  CAMPAIGN_CRITERION: "campaignCriterion",
  CAMPAIGN_BUDGET: "campaignBudget",
  AD_GROUP_BID_MODIFIER: "adGroupBidModifier",
  SHARED_SET: "sharedSet",
  CAMPAIGN_SHARED_SET: "campaignSharedSet",
  ASSET: "asset",
  CUSTOMER_ASSET: "customerAsset",
  CAMPAIGN_ASSET: "campaignAsset",
  AD_GROUP_ASSET: "adGroupAsset",
  COMBINED_AUDIENCE: "combinedAudience",
  ASSET_GROUP: "assetGroup",
  ASSET_SET: "assetSet",
  CAMPAIGN_ASSET_SET: "campaignAssetSet",
};

export const CHANGE_STATUS_TO_CHANGE_TYPE: Partial<
  Record<ChangeStatusResourceStatus, ChangeHistoryBatchItem["changeType"]>
> = {
  ADDED: "created",
  CHANGED: "updated",
  REMOVED: "removed",
};

export const CHANGE_STATUS_FIELDS = [
  "change_status.resource_name",
  "change_status.last_change_date_time",
  "change_status.resource_type",
  "change_status.resource_status",
  "change_status.campaign",
  "change_status.ad_group",
  "change_status.ad_group_ad",
  "change_status.ad_group_criterion",
  "change_status.campaign_criterion",
  "change_status.ad_group_bid_modifier",
  "change_status.campaign_budget",
  "change_status.shared_set",
  "change_status.campaign_shared_set",
  "change_status.asset",
  "change_status.customer_asset",
  "change_status.campaign_asset",
  "change_status.ad_group_asset",
  "change_status.combined_audience",
  "change_status.asset_group",
  "change_status.asset_set",
  "change_status.campaign_asset_set",
];

export const LOCAL_SERVICES_LEAD_FIELDS = [
  "local_services_lead.resource_name",
  "local_services_lead.id",
  "local_services_lead.campaign",
  "local_services_lead.category_id",
  "local_services_lead.service_id",
  "local_services_lead.lead_type",
  "local_services_lead.lead_status",
  "local_services_lead.creation_date_time",
  "local_services_lead.locale",
  "local_services_lead.contact_details",
  "local_services_lead.lead_charged",
  "local_services_lead.lead_feedback_submitted",
  "local_services_lead.credit_details.credit_state",
  "local_services_lead.credit_details.credit_state_last_update_date_time",
  "local_services_lead.note.description",
  "local_services_lead.note.edit_date_time",
];

export const LOCAL_SERVICES_LEAD_CONVERSATION_FIELDS = [
  "local_services_lead_conversation.resource_name",
  "local_services_lead_conversation.id",
  "local_services_lead_conversation.lead",
  "local_services_lead_conversation.conversation_channel",
  "local_services_lead_conversation.participant_type",
  "local_services_lead_conversation.event_date_time",
  "local_services_lead_conversation.phone_call_details.call_duration_millis",
  "local_services_lead_conversation.phone_call_details.call_recording_url",
  "local_services_lead_conversation.message_details.text",
  "local_services_lead_conversation.message_details.attachment_urls",
];

export const INPUT_DATE_REGEX = /^(\d{2})-(\d{2})-(\d{4})$/;
export const LEAD_ID_REGEX = /^\d+$/;

export const SATISFIED_SURVEY_ANSWERS = ["VERY_SATISFIED", "SATISFIED"];
export const DISSATISFIED_SURVEY_ANSWERS = [
  "DISSATISFIED",
  "VERY_DISSATISFIED",
];
export const OTHER_FEEDBACK_REASONS = [
  "OTHER_SATISFIED_REASON",
  "OTHER_DISSATISFIED_REASON",
];

export const SURVEY_ANSWER_MODEL = [
  { label: "Very Satisfied", value: "VERY_SATISFIED" },
  { label: "Satisfied", value: "SATISFIED" },
  { label: "Neutral", value: "NEUTRAL" },
  { label: "Dissatisfied", value: "DISSATISFIED" },
  { label: "Very Dissatisfied", value: "VERY_DISSATISFIED" },
];

export const SURVEY_SATISFIED_REASON_MODEL = [
  { label: "Booked Customer", value: "BOOKED_CUSTOMER" },
  { label: "Likely Booked Customer", value: "LIKELY_BOOKED_CUSTOMER" },
  { label: "Service Related", value: "SERVICE_RELATED" },
  { label: "High Value Service", value: "HIGH_VALUE_SERVICE" },
  { label: "Other", value: "OTHER_SATISFIED_REASON" },
];

export const SURVEY_DISSATISFIED_REASON_MODEL = [
  { label: "Geo Mismatch", value: "GEO_MISMATCH" },
  { label: "Job Type Mismatch", value: "JOB_TYPE_MISMATCH" },
  { label: "Not Ready to Book", value: "NOT_READY_TO_BOOK" },
  { label: "Spam", value: "SPAM" },
  { label: "Duplicate", value: "DUPLICATE" },
  { label: "Solicitation", value: "SOLICITATION" },
  { label: "Other", value: "OTHER_DISSATISFIED_REASON" },
];

export const GOOGLE_ADS_ACCOUNT_TYPE = "GOOGLE_ADS";

export const TERMS_OF_SERVICE_STATUS_MODEL = [
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Rejected", value: "REJECTED" },
];

export const CONSENT_STATUS_MODEL = [
  { label: "Granted", value: "CONSENT_GRANTED" },
  { label: "Denied", value: "CONSENT_DENIED" },
];

export const RESPONSE_CONTENT_TYPE_MODEL = [
  { label: "Resource Name Only", value: "RESOURCE_NAME_ONLY" },
  { label: "Mutable Resource", value: "MUTABLE_RESOURCE" },
];

export const GOOGLE_OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";
export const JWT_BEARER_GRANT_TYPE =
  "urn:ietf:params:oauth:grant-type:jwt-bearer";
export const SERVICE_ACCOUNT_TOKEN_LIFETIME_SECONDS = 3600;
export const SERVICE_ACCOUNT_TOKEN_REFRESH_MARGIN_SECONDS = 60;
