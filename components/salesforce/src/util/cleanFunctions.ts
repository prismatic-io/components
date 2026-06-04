import { util } from "@prismatic-io/spectral";
import type { CleanSObject, SalesforceOutboundEnvelope } from "../types";
import { DEFAULT_SF_VERSION } from "../constants";

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

export const getNotificationsArray = (envelope: SalesforceOutboundEnvelope): CleanSObject[] => {
  const notification =
    envelope?.["soapenv:Envelope"]?.["soapenv:Body"]?.notifications?.Notification;

  if (!notification) return [];
  const notifications = Array.isArray(notification) ? notification : [notification];
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

export const fieldsInputClean = (value: unknown) => {
  if (value) {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === "string") {
      const array = JSON.parse(value);
      if (Array.isArray(array)) {
        return array;
      }
    }
    console.error("Fields must be an array of strings");
  }
  return undefined;
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
        throw new TypeError("Each item in dynamicValues should be a key-value pair");
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
  if (Array.isArray(value)) return value.map((v) => util.types.toString(v)).filter(Boolean);
  return [];
};

export const convertEmptyObject = (
  value: Record<string, unknown> | undefined,
): Record<string, unknown> | undefined => {
  if (typeof value === "object" && Object.keys(value).length === 0) {
    return undefined;
  }
  return value;
};
