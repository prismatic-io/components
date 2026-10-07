import { input, util } from "@prismatic-io/spectral";
import { CHANGE_TYPES_MODEL, DEFAULT_ALERT_THRESHOLD } from "../constants";
import {
  lookBackDateClean,
  toOptionalCustomerId,
  toOptionalInt,
  toStringList,
} from "../util";
import {
  connectionInput,
  customerIdInput,
  managerCustomerIdInput,
} from "./common";
const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync's change_event query starts from this date (clamped to Google's 30-day change_event window) instead of one hour before the first run.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
const changeTypes = input({
  label: "Change Types to Monitor",
  type: "string",
  collection: "valuelist",
  required: false,
  model: CHANGE_TYPES_MODEL,
  comments:
    "Types of campaign changes to detect. Leave empty to detect all change types. The Campaign Settings option is not yet implemented and currently has no effect; no settings fields are evaluated.",
  placeholder: "Enter change types",
  clean: toStringList,
});
export const campaignChangesTriggerInputs = {
  connection: connectionInput,
  customerId: customerIdInput,
  lookBackDate,
  managerCustomerId: {
    ...managerCustomerIdInput,
    required: false,
    clean: toOptionalCustomerId,
  },
  changeTypes: changeTypes,
};
const alertThreshold = input({
  label: "Alert Threshold (%)",
  type: "string",
  required: false,
  default: DEFAULT_ALERT_THRESHOLD.toString(),
  comments: "Budget spend percentage at which to trigger an alert.",
  example: DEFAULT_ALERT_THRESHOLD.toString(),
  placeholder: "Enter alert threshold percentage",
  clean: toOptionalInt,
});
const includeSharedBudgets = input({
  label: "Include Shared Budgets",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, shared budgets across multiple campaigns will be monitored.",
  clean: util.types.toBool,
});
export const budgetAlertTriggerInputs = {
  connection: connectionInput,
  customerId: {
    ...customerIdInput,
    comments:
      "The unique identifier for the Google Ads client account. Accepts hyphenated or number forms. Use a client account; manager accounts return no metrics. See [Customer ID documentation](https://developers.google.com/google-ads/api/docs/concepts/call-structure#cid).",
  },
  managerCustomerId: {
    ...managerCustomerIdInput,
    required: false,
    clean: toOptionalCustomerId,
  },
  alertThreshold,
  includeSharedBudgets,
};
const resourceTypes = input({
  label: "Resource Types",
  type: "string",
  collection: "valuelist",
  required: false,
  model: [
    { label: "Campaigns", value: "CAMPAIGN" },
    { label: "Ad Groups", value: "AD_GROUP" },
    { label: "Ads", value: "AD" },
    { label: "Keywords", value: "KEYWORD" },
  ],
  comments:
    "Types of resources to track changes for. Leave empty to track all resource types.",
  placeholder: "Enter resource types",
  clean: toStringList,
});
const includeUserInfo = input({
  label: "Include User Info",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, user email and client type will be included in change events.",
  clean: util.types.toBool,
});
export const changeHistoryTriggerInputs = {
  connection: connectionInput,
  customerId: customerIdInput,
  lookBackDate,
  managerCustomerId: {
    ...managerCustomerIdInput,
    required: false,
    clean: toOptionalCustomerId,
  },
  resourceTypes,
  includeUserInfo,
};
