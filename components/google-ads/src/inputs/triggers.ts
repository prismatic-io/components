import { input, util } from "@prismatic-io/spectral";
import { CHANGE_TYPES_MODEL, DEFAULT_ALERT_THRESHOLD } from "../constants";
import { toOptionalInt, toOptionalString, toStringList } from "../util";
import {
  connectionInput,
  customerIdInput,
  managerCustomerIdInput,
} from "./common";

const changeTypes = input({
  label: "Change Types to Monitor",
  type: "string",
  collection: "valuelist",
  required: false,
  model: CHANGE_TYPES_MODEL,
  comments:
    "Types of campaign changes to detect. Leave empty to detect all change types.",
  placeholder: "Enter change types",
  clean: toStringList,
});

export const campaignChangesTriggerInputs = {
  connection: connectionInput,
  customerId: customerIdInput,
  managerCustomerId: {
    ...managerCustomerIdInput,
    required: false,
    clean: toOptionalString,
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
  customerId: customerIdInput,
  managerCustomerId: {
    ...managerCustomerIdInput,
    required: false,
    clean: toOptionalString,
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
  managerCustomerId: {
    ...managerCustomerIdInput,
    required: false,
    clean: toOptionalString,
  },
  resourceTypes,
  includeUserInfo,
};
