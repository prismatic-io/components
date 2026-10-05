import type {
  ObjectAttributes,
  ObjectCannedACL,
  ObjectIdentifier,
  ObjectLockRetentionMode,
  Part,
} from "@aws-sdk/client-s3";
import { type KeyValuePair, util } from "@prismatic-io/spectral";
import { LOOK_BACK_DATE_PATTERN } from "../constants";
export const cleanString = (value: unknown): string | undefined => {
  const str = util.types.toString(value).trim();
  return str ? str : undefined;
};
export const toPositiveInt = (value: unknown, fallback: number): number => {
  const str = cleanString(value);
  if (str === undefined) return fallback;
  if (!/^\d+$/.test(str) || Number(str) < 1) {
    throw new Error(`"${str}" must be a whole number greater than 0.`);
  }
  return Number(str);
};
export const toOptionalInt = (value: unknown): number | undefined =>
  cleanString(value) === undefined
    ? undefined
    : util.types.toInt(value) || undefined;
export const toTrimmedStringArray = (value: unknown): string[] =>
  (value as unknown[]).map((item) => util.types.toString(item).trim());
export const toObjectCannedACL = (value: unknown): ObjectCannedACL =>
  util.types.toString(value) as ObjectCannedACL;
export const toObjectLockRetentionMode = (
  value: unknown,
): ObjectLockRetentionMode =>
  util.types.toString(value) as ObjectLockRetentionMode;
export const toBufferFromData = (value: unknown): Buffer =>
  util.types.isBufferDataPayload(value) ? value.data : (value as Buffer);
export const toKeyValuePairList = (value: unknown): KeyValuePair[] =>
  value as KeyValuePair[];
export const toPartList = (value: unknown): Part[] => value as Part[];
export const getObjectIdentifiers = (
  objectKeys: unknown,
): ObjectIdentifier[] => {
  if (Array.isArray(objectKeys)) {
    return objectKeys.map((key) => ({ Key: key }));
  }
  return [];
};
export const getObjectAttributes = (
  attributes: unknown,
): ObjectAttributes[] => {
  if (Array.isArray(attributes)) {
    if (attributes.length === 0) {
      throw new Error("Object Attributes must contain at least one attribute");
    }
    return attributes as ObjectAttributes[];
  }
};
export const lookBackDateClean = (value: unknown): string => {
  const raw = cleanString(value);
  if (raw === undefined) {
    return "";
  }
  const match =
    typeof value === "string" ? raw.match(LOOK_BACK_DATE_PATTERN) : null;
  if (!match) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  const [, yearStr, monthStr, dayStr] = match;
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
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
