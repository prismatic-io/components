import { util } from "@prismatic-io/spectral";
import {
  CUSTOM_RECORD_TYPE_PATTERN,
  LOOK_BACK_DATE_PATTERN,
  QUERY_SERVICE,
  RECORD_SERVICE,
  RECORDS_PAGE_SIZE,
  recordTypes,
} from "../constants";
import type { RecordType, RestServiceType } from "../types";

export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const suiteQlParametersClean = (value: unknown): unknown[] => {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return [];
  }
  const parameters = Array.isArray(value) ? value : util.types.toObject(value);
  if (!Array.isArray(parameters)) {
    throw new Error(
      'Query Parameters must be a JSON array of values, such as ["-7", "0"].',
    );
  }
  return parameters;
};

export const recordIdClean = (value: unknown): string => {
  const recordId = util.types.toString(value).trim();
  if (recordId === "") {
    throw new Error("Record ID is required.");
  }
  return recordId;
};

export const standardRecordTypeClean = (value: unknown): string => {
  const recordType = util.types.toString(value).trim();
  if (!recordTypes.includes(recordType as RecordType)) {
    throw new Error(
      `Unexpected Record Type: ${recordType}. New and Updated Records supports only the standard record types in the dropdown, not custom record or custom transaction types.`,
    );
  }
  return recordType;
};

export const recordTypeClean = (value: unknown): string => {
  const recordType = util.types.toString(value).trim();
  if (
    !recordTypes.includes(recordType as RecordType) &&
    !CUSTOM_RECORD_TYPE_PATTERN.test(recordType)
  ) {
    throw new Error(`Unexpected Record Type: ${recordType}`);
  }
  return recordType;
};

export const toNumberWithDefault1000 = (value: unknown): number =>
  util.types.toNumber(value, RECORDS_PAGE_SIZE);

export const lookBackDateClean = (value: unknown): string => {
  const raw = util.types.toString(value).trim();
  if (raw === "") {
    return "";
  }

  const parsed = new Date(`${raw}T00:00:00Z`);
  if (
    !LOOK_BACK_DATE_PATTERN.test(raw) ||
    Number.isNaN(parsed.getTime()) ||
    !parsed.toISOString().startsWith(raw)
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

export const toCommaSeparatedList = (value: unknown): unknown =>
  Array.isArray(value)
    ? value.map((item) => util.types.toString(item)).join(",")
    : value;

export const restServiceTypeClean = (value: unknown): RestServiceType => {
  const serviceType = util.types.toString(value).trim();
  if (serviceType !== RECORD_SERVICE && serviceType !== QUERY_SERVICE) {
    throw new Error(
      `Unexpected Service Type: ${serviceType}. Expected "${RECORD_SERVICE}" or "${QUERY_SERVICE}".`,
    );
  }
  return serviceType;
};
