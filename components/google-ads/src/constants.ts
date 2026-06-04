export const GET_ACCOUNT_HIERARCHY_QUERY = `SELECT
          customer_client.client_customer,
          customer_client.level,
          customer_client.manager,
          customer_client.descriptive_name,
          customer_client.id
        FROM customer_client
        WHERE customer_client.level <= `;

export const DEFAULT_ALERT_THRESHOLD = 80;

export const MICROS_TO_DOLLARS_CONVERSION_FACTOR = 1000000;

export enum BUDGET_SEVERITY {
  INFO = "info",
  WARNING = "warning",
  CRITICAL = "critical",
}

export const GOOGLE_ADS_API_VERSION = "v23";

export const GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION = "v21";

export const GOOGLE_DATA_MANAGER_API_VERSION = "v1";

export const GOOGLE_DATA_MANAGER_MINIMUM_SUPPORTED_API_VERSION = "v1";

export const CHANGE_TYPES_MODEL = [
  { label: "Status Changes", value: "status" },
  { label: "Budget Changes", value: "budget" },
  { label: "Bid Strategy Changes", value: "bidding" },
  { label: "Campaign Settings", value: "settings" },
  { label: "All Changes", value: "all" },
];
