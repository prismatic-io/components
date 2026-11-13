import { type KeyValuePair, util } from "@prismatic-io/spectral";
import { DEFAULT_SUBSCRIPTION_DAYS, MAX_SUBSCRIPTION_DAYS } from "../constants";
import type { ParentRef } from "../types";

export const toTrimmedString = (value: unknown): string =>
  util.types.toString(value).trim();

export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const toOptionalTrimmedString = (value: unknown): string | undefined => {
  const trimmed = util.types.toString(value).trim();
  return trimmed === "" ? undefined : trimmed;
};

export const toOptionalNumber = (value: unknown): number | undefined =>
  value === undefined || value === null || value === ""
    ? undefined
    : util.types.toNumber(value);

export const cleanKeyValueList = (
  value: unknown,
): Record<string, unknown> | undefined =>
  value
    ? util.types.keyValPairListToObject(value as KeyValuePair<unknown>[])
    : undefined;

const parseJsonList = (value: unknown): unknown => {
  if (!util.types.isString(value)) {
    return value;
  }
  const trimmed = value.trim();
  return trimmed.startsWith("[") && util.types.isJSON(trimmed)
    ? JSON.parse(trimmed)
    : trimmed;
};

const parentRefsOf = (parents: unknown): ParentRef[] => {
  if (!Array.isArray(parents)) {
    return [{ id: util.types.toString(parents).trim() }];
  }
  if (parents.length > 0 && util.types.isObjectSelection(parents)) {
    return parents.map(({ object: { key, label } }) => ({
      id: util.types.toString(key).trim(),
      label,
    }));
  }
  return parents.map((parent) => ({ id: util.types.toString(parent).trim() }));
};

export const toParentRefs = (value: unknown): ParentRef[] => {
  const unique = new Map<string, ParentRef>();
  for (const ref of parentRefsOf(parseJsonList(value))) {
    const seen = unique.get(ref.id);
    const addsLabel = seen?.label === undefined && ref.label !== undefined;
    if (ref.id !== "" && (seen === undefined || addsLabel)) {
      unique.set(ref.id, ref);
    }
  }
  return [...unique.values()];
};

export const cleanExpirationDays = (value: unknown): number => {
  const days = util.types.toNumber(value, DEFAULT_SUBSCRIPTION_DAYS);
  return days > 0
    ? Math.min(days, MAX_SUBSCRIPTION_DAYS)
    : DEFAULT_SUBSCRIPTION_DAYS;
};
