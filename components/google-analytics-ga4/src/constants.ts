export const DEFAULT_BATCH_SIZE = 50;
export const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
export const ANALYTICS_ENDPOINTS = {
  adminv1beta: "https://analyticsadmin.googleapis.com/v1beta",
  datav1beta: "https://analyticsdata.googleapis.com/v1beta",
};
export const POLL_RESOURCE_CONFIG = {
  accounts: { label: "Accounts" },
  properties: { label: "Properties" },
} as const;
export const POLL_RESOURCE_KEYS = {
  ACCOUNTS: "accounts",
  PROPERTIES: "properties",
} as const;
