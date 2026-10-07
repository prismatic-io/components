import type { ChangeHistoryBatchItem } from "./types";
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
export const GOOGLE_ADS_API_VERSION = "v25";
export const GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION = "v22";
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
