import { type KeyValuePair, util } from "@prismatic-io/spectral";
import {
  DATE_PATTERN,
  POLL_RESOURCE_CONFIG,
  WEBHOOK_EVENTS,
} from "../constants";
import type { PollResourceType, WebhookEventFlag } from "../types";
import { requireRelativePath } from "./validation";

export const cleanString = (value: unknown): string | undefined =>
  isBlank(value) ? undefined : util.types.toString(value).trim();

const REQUIRED_VALUE_MESSAGE = "A value is required for this input.";

export const toRequiredString = (value: unknown): string => {
  const text = cleanString(value);
  if (text === undefined) {
    throw new Error(REQUIRED_VALUE_MESSAGE);
  }
  return text;
};

export const toRequiredVerbatimString = (value: unknown): string => {
  if (isBlank(value)) {
    throw new Error(REQUIRED_VALUE_MESSAGE);
  }
  return util.types.toString(value);
};

export const toOptionalBoolean = (value: unknown): boolean | undefined =>
  isBlank(value) ? undefined : util.types.toBool(value);

export const toOptionalId = (value: unknown): number | undefined => {
  if (!value) {
    return undefined;
  }
  const text = util.types.toString(value).trim();
  return text === "" ? undefined : requireNumericId(text);
};

export const toRequiredId = (value: unknown): number => {
  const id = toOptionalId(value);
  if (id === undefined) {
    throw new Error("Expected a numeric ID. Received an empty value.");
  }
  return id;
};

export const toOptionalIdList = (value: unknown): number[] | undefined => {
  if (!Array.isArray(value) && util.types.toString(value).trim() === "") {
    return undefined;
  }
  const ids = toList(value).map((item) => toRequiredId(item));
  return ids.length > 0 ? ids : undefined;
};

export const toOptionalLabelList = (value: unknown): string | undefined => {
  if (!Array.isArray(value) && util.types.toString(value).trim() === "") {
    return undefined;
  }
  const labels = toList(value);
  return labels.length > 0 ? labels.join(",") : undefined;
};

export const toOptionalTimestamp = (value: unknown): string | undefined => {
  if (!value) {
    return undefined;
  }
  const text = util.types.toString(value).trim();
  return text === "" ? undefined : requireTimestamp(text);
};

export const toOptionalDate = (value: unknown): string | undefined => {
  if (!value) {
    return undefined;
  }
  const text = util.types.toString(value).trim();
  return text === "" ? undefined : requireCalendarDate(text);
};

export const lookBackDateClean = (value: unknown): string => {
  const raw = util.types.toString(value).trim();
  if (raw === "") {
    return "";
  }
  if (!isCalendarDate(raw)) {
    throw new Error(
      `Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`,
    );
  }
  if (new Date(`${raw}T00:00:00.000Z`).getTime() > Date.now()) {
    throw new Error(`Look-back Date cannot be a future date. Received: ${raw}`);
  }
  return raw;
};

export const toEventList = (value: unknown): WebhookEventFlag[] => {
  const flags = toList(value);
  if (flags.length === 0) {
    throw new Error("Select at least one event.");
  }
  const known = new Set<string>(WEBHOOK_EVENTS.map((event) => event.value));
  for (const flag of flags) {
    if (!known.has(flag)) {
      throw new Error(`Unknown event: ${flag}`);
    }
  }
  return flags as WebhookEventFlag[];
};

export const toPollResourceType = (value: unknown): PollResourceType => {
  const text = toRequiredString(value);
  if (!Object.hasOwn(POLL_RESOURCE_CONFIG, text)) {
    const known = Object.keys(POLL_RESOURCE_CONFIG).join(", ");
    throw new Error(`Unknown resource type: ${text}. Use one of: ${known}.`);
  }
  return text as PollResourceType;
};

export const toPathOrId = (value: unknown): string => {
  let raw = util.types.toString(value).trim();
  if (/^\d+$/.test(raw)) {
    return raw;
  }
  if (/^https?:\/\//i.test(raw)) {
    raw = new URL(raw).pathname.split("/-/")[0].replace(/^\/groups\//i, "/");
  }
  const path = safeDecode(raw)
    .replace(/^\/+|\/+$/g, "")
    .replace(/\.git$/i, "");
  if (path === "") {
    throw new Error(
      "Enter a numeric ID or path (for example, my-group/my-project).",
    );
  }
  return encodePathSegment(path);
};

export const toPathOrIdList = (value: unknown): string[] => {
  const entries = toList(value);
  if (entries.length === 0) {
    throw new Error("Select at least one project.");
  }
  return entries.map(toPathOrId);
};

export const toIid = (value: unknown): number => {
  const raw = util.types.toString(value).trim().replace(/^[#!]/, "");
  if (!/^\d+$/.test(raw) || util.types.toNumber(raw) < 1) {
    throw new Error(
      `Expected the IID shown in GitLab, a positive whole number such as 42. Received: ${util.types.toString(value)}`,
    );
  }
  return util.types.toNumber(raw);
};

export const toPathSegment = (value: unknown): string => {
  const raw = util.types.toString(value).trim();
  if (raw === "") {
    throw new Error("A value is required for this input.");
  }
  return encodePathSegment(safeDecode(raw));
};

export const toFilePathSegment = (value: unknown): string =>
  toPathSegment(util.types.toString(value).trim().replace(/^\/+/, ""));

export const toRelativeApiPath = (value: unknown): string =>
  requireRelativePath(toRequiredString(value));

export const toKeyValueObject = (value: unknown): Record<string, unknown> =>
  util.types.keyValPairListToObject((value ?? []) as KeyValuePair[]);

export const toHeaderObject = (value: unknown): Record<string, string> =>
  util.types.keyValPairListToObject(
    (value ?? []) as KeyValuePair[],
    util.types.toString,
  );

export const toOptionalPositiveNumber = (value: unknown): number | undefined =>
  util.types.toNumber(value) || undefined;

const isCalendarDate = (raw: string): boolean => {
  const match = raw.match(DATE_PATTERN);
  if (!match) {
    return false;
  }
  const [, year, month, day] = match.map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
};

const isBlank = (value: unknown): boolean =>
  value === undefined ||
  value === null ||
  util.types.toString(value).trim() === "";

const toList = (value: unknown): string[] =>
  (Array.isArray(value) ? value : [value])
    .map((item) => util.types.toString(item).trim())
    .filter((item) => item !== "");

const requireNumericId = (text: string): number => {
  if (!/^\d+$/.test(text)) {
    throw new Error(`Expected a numeric ID. Received: ${text}`);
  }
  return util.types.toNumber(text);
};

const requireTimestamp = (text: string): string => {
  const ms = Date.parse(text);
  if (Number.isNaN(ms)) {
    throw new Error(
      `Expected an ISO 8601 date or date-time, such as 2026-09-01T00:00:00Z. Received: ${text}`,
    );
  }
  return new Date(ms).toISOString();
};

const requireCalendarDate = (text: string): string => {
  if (!isCalendarDate(text)) {
    throw new Error(`Expected a date in YYYY-MM-DD format. Received: ${text}`);
  }
  return text;
};

const safeDecode = (value: string): string => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

export const encodePathSegment = (value: string): string =>
  encodeURIComponent(value).replace(/\./g, "%2E");
