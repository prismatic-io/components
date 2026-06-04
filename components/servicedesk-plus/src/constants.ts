import type { MapModel } from "./interfaces";

export const DATA_CENTERS: MapModel[] = [
  {
    label: "United States",
    value: "https://sdpondemand.manageengine.com",
  },
  {
    label: "Europe",
    value: "https://sdpondemand.manageengine.eu",
  },
  {
    label: "India",
    value: "https://sdpondemand.manageengine.in",
  },
  {
    label: "China",
    value: "https://servicedeskplus.cn",
  },
  {
    label: "Australia",
    value: "https://servicedeskplus.net.au",
  },
  {
    label: "Japan",
    value: "https://servicedeskplus.jp",
  },
  {
    label: "Canada",
    value: "https://servicedeskplus.ca",
  },
  {
    label: "United Kingdom",
    value: "https://servicedeskplus.uk",
  },
];

export const UNSUPPORTED_CONNECTION_TYPE = "Unsupported connection type";
export const MISSING_CONNECTION_FIELD = "Connection is not fully configured.";
export const MISSING_AUTHENTICATION = "Connection is not authenticated.";

export const POLL_RESOURCE_CONFIG: Record<string, { label: string }> = {
  requests: { label: "Requests" },
  problems: { label: "Problems" },
  assets: { label: "Assets" },
};

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({ label, value }),
);

export const SUPPORTED_CONDITIONS = [
  {
    label: "Equals",
    value: "is",
  },
  {
    label: "Not Equals",
    value: "is not",
  },
  {
    label: "Greater than",
    value: "greater than",
  },
  {
    label: "Greater than or Equal",
    value: "greater or equal",
  },
  {
    label: "Less than",
    value: "lesser than",
  },
  {
    label: "Less than or Equal",
    value: "lesser or equal",
  },
  {
    label: "Range",
    value: "between",
  },
  {
    label: "Not in Range",
    value: "not between",
  },
  {
    label: "Starts with",
    value: "starts with",
  },
  {
    label: "Ends with",
    value: "ends with",
  },
  {
    label: "Contains",
    value: "contains",
  },
  {
    label: "Not Contains",
    value: "not contains",
  },
];

export const CRITERIA_TYPES = [
  {
    label: "String",
    value: "string",
  },
  {
    label: "Long",
    value: "number",
  },
  {
    label: "Double",
    value: "number",
  },
  {
    label: "Number",
    value: "number",
  },
  {
    label: "Boolean",
    value: "boolean",
  },
  {
    label: "Object",
    value: "object",
  },
  {
    label: "Array",
    value: "array",
  },
];
