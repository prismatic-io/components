import {
  type KeyValuePair,
  type ObjectFieldMap,
  type ObjectSelection,
  util,
} from "@prismatic-io/spectral";
import type {
  CleanSObject,
  FilterItem,
  SalesforceOutboundEnvelope,
} from "../types";
import { DEFAULT_SF_VERSION, DEFAULT_SORT_CRITERIA } from "../constants";

export const cleanSObject = (raw: Record<string, unknown>): CleanSObject => {
  if (!raw || !raw.sObject) {
    throw new Error("Invalid input, missing sObject");
  }

  const sObj = raw.sObject;
  const result: CleanSObject = {
    type: sObj["@_xsi:type"]?.split(":")[1] || "Unknown",
    Id: sObj["sf:Id"] || sObj.Id || "",
  };

  Object.keys(sObj).forEach((key) => {
    if (key.startsWith("sf:") && key !== "sf:Id") {
      result[key.replace("sf:", "")] = sObj[key];
    }
  });

  return result;
};

export const getNotificationsArray = (
  envelope: SalesforceOutboundEnvelope,
): CleanSObject[] => {
  const notification =
    envelope?.["soapenv:Envelope"]?.["soapenv:Body"]?.notifications
      ?.Notification;

  if (!notification) return [];
  const notifications = Array.isArray(notification)
    ? notification
    : [notification];
  return notifications.map((n) => cleanSObject(n));
};

export const sanitizePrefix = (value: unknown): string => {
  const prefix = util.types.toString(value);
  if (!prefix || typeof prefix !== "string") {
    throw new Error("Prefix must be a non-empty string.");
  }

  let sanitized = prefix.replace(/\s+/g, "_");

  if (!/^[A-Za-z]/.test(sanitized)) {
    sanitized = `A${sanitized}`;
  }

  if (sanitized.length > 15) {
    sanitized = sanitized.slice(0, 15);
  }

  return sanitized;
};

export const coerceObjectValues = (
  objectValues: Record<string, unknown>,
  objectTypes: Record<string, unknown>,
) => {
  const coerced = Object.entries(objectValues).map(([key, value]) => {
    const itemType = util.types.toString(objectTypes[key]);

    if (itemType === "") {
      throw new Error(
        `A type was not found for "${key}". Please use the 'Types' input to specify the type of each field. Type options are "Boolean", "Number", or "String".`,
      );
    }
    switch (itemType.toLowerCase()) {
      case "boolean":
        return [key, util.types.toBool(value)];

      case "number":
        return [key, util.types.toNumber(value)];

      case "string":
        return [key, util.types.toString(value)];

      default:
        return [key, value];
    }
  });

  return Object.fromEntries(coerced);
};

export const fieldsInputClean = (value: unknown): string[] | undefined => {
  if (!value) return undefined;
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && util.types.isJSON(value)) {
    const parsed = util.types.toObject(value);
    if (Array.isArray(parsed)) return parsed;
  }
  throw new Error("Fields must be an array of strings.");
};

export const recordsInputClean = (value: unknown) => {
  const ARRAY_ERROR_MESSAGE = "Records must be an array of objects";
  const EMPTY_INPUT_ERROR_MESSAGE = "JSON Records input must not be empty";
  const EMPTY_ARRAY_ERROR_MESSAGE = "Records array must not be empty";

  if (Array.isArray(value)) {
    return value as [];
  }
  if (typeof value === "string") {
    const recordsString = value.trim();
    if (recordsString === "") {
      throw new Error(EMPTY_INPUT_ERROR_MESSAGE);
    }
    const records = util.types.toObject(recordsString);
    if (!Array.isArray(records)) {
      throw new Error(ARRAY_ERROR_MESSAGE);
    }
    if (records.length === 0) {
      throw new Error(EMPTY_ARRAY_ERROR_MESSAGE);
    }
    return records;
  }
  throw new Error(ARRAY_ERROR_MESSAGE);
};

export const dynamicFieldsClean = (value: unknown): unknown => {
  if (value) {
    const data = recordsInputClean(value);
    for (const pair of data) {
      if (!("key" in pair) || !("value" in pair)) {
        throw new TypeError(
          "Each item in dynamicValues should be a key-value pair",
        );
      }
    }
  }
  return value;
};

export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const cleanNumberInput = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value, 10000) : undefined;

export const toOptionalInt = (value: unknown): number | undefined =>
  value ? util.types.toInt(value) : undefined;

export const cleanVersionInput = (version: unknown) => {
  if (version) {
    return util.types.toString(version, DEFAULT_SF_VERSION);
  }
  return DEFAULT_SF_VERSION;
};

export const capitalizeSalesforceObject = (value: unknown): string => {
  const name = util.types.toString(value);
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

export const cleanValueList = (value: unknown): string[] => {
  if (!value) return [];
  if (Array.isArray(value))
    return value.map((v) => util.types.toString(v)).filter(Boolean);
  return [];
};

export const cleanOptionalValueList = (
  value: unknown,
): string[] | undefined => {
  const list = cleanValueList(value);
  return list.length ? list : undefined;
};

export const cleanOptionalStringList = (
  value: unknown,
): string[] | undefined =>
  Array.isArray(value) ? value.map((v) => util.types.toString(v)) : undefined;

export const cleanPicklistNone = (value: unknown): string | undefined => {
  const text = util.types.toString(value).trim();
  return text && text.toLowerCase() !== "none" ? text : undefined;
};

export const toRequiredTrimmedString =
  (label: string): ((value: unknown) => string) =>
  (value: unknown): string => {
    const trimmed = util.types.toString(value).trim();
    if (!trimmed) {
      throw new Error(`Must specify a valid ${label}`);
    }
    return trimmed;
  };

export const cleanSortCriteria = (value: unknown): string =>
  util.types.toString(value).trim() || DEFAULT_SORT_CRITERIA;

export const cleanPositiveInt = (value: unknown): number | undefined => {
  const parsed = util.types.toInt(value);
  return Number.isNaN(parsed) || parsed <= 0 ? undefined : parsed;
};

export const cleanBoundedCount =
  (fallback: number, max: number): ((value: unknown) => number) =>
  (value: unknown): number =>
    util.types.isNumber(value) && util.types.toNumber(value) <= max
      ? util.types.toNumber(value)
      : fallback;

export const cleanPicklistValues = (value: unknown): string[] =>
  util.types.isPicklist(value) ? (value as string[]) : [];

export const cleanPicklistValuesLowercase = (value: unknown): string[] =>
  cleanPicklistValues(value).map((name) => name.trim().toLowerCase());

export const cleanObjectFieldMap = (value: unknown): ObjectFieldMap => {
  try {
    return util.types.toObjectFieldMap(value);
  } catch {
    throw new Error("Must specify valid value for Mapping Fields");
  }
};

export const cleanObjectSelection = (value: unknown): ObjectSelection => {
  try {
    return util.types.toObjectSelection(value);
  } catch {
    throw new Error("Must specify valid value for Selected Record Types");
  }
};

export const cleanSingleItemList = (value: unknown): string[] => [
  util.types.toString(value),
];

export const cleanStringArray = (value: unknown): string[] =>
  util.types.toObject(value) as string[];

export const cleanKeyValueListToObject = (
  value: unknown,
): Record<string, unknown> =>
  util.types.keyValPairListToObject((value || []) as KeyValuePair[]);

export const processFilterCriteria = (criteriaValue: unknown): FilterItem[] => {
  if (typeof criteriaValue === "undefined" || criteriaValue === "") {
    return [];
  }

  const criteria = util.types.toString(criteriaValue);

  if (!util.types.isJSON(criteria)) {
    throw new Error("Filter Criteria must be specified as JSON.");
  }

  const data = JSON.parse(criteria);

  if (!Array.isArray(data)) {
    throw new Error("Filter Criteria must be a list of objects.");
  }

  return data as FilterItem[];
};

export const validatePermissions = (
  value: unknown,
): Record<string, boolean> | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== "object") {
    throw new Error("Invalid permissions value provided.");
  }

  const hasInvalidKeyTypes = Object.keys(value).some(
    (k) => typeof k !== "string",
  );
  if (hasInvalidKeyTypes) {
    throw new Error("All permission keys must be strings.");
  }

  const hasInvalidValueTypes = Object.values(value).some(
    (v) => typeof v !== "boolean",
  );
  if (hasInvalidValueTypes) {
    throw new Error("All permission values must be booleans.");
  }

  return value as Record<string, boolean>;
};

const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export const lookBackDateClean = (value: unknown): string => {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return "";
  }

  const raw =
    typeof value === "string" ? value.trim() : util.types.toString(value);
  const match =
    typeof value === "string" ? raw.match(LOOK_BACK_DATE_PATTERN) : null;
  if (!match) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }

  const [, yearStr, monthStr, dayStr] = match;
  const year = util.types.toInt(yearStr);
  const month = util.types.toInt(monthStr);
  const day = util.types.toInt(dayStr);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }

  if (parsed.getTime() > Date.now()) {
    throw new Error(`Look-back Date cannot be a future date. Received: ${raw}`);
  }
  return parsed.toISOString();
};

export const convertEmptyObject = (
  value: Record<string, unknown> | undefined,
): Record<string, unknown> | undefined => {
  if (typeof value === "object" && Object.keys(value).length === 0) {
    return undefined;
  }
  return value;
};
