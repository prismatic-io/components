import { util } from "@prismatic-io/spectral";
import { LOOK_BACK_DATE_PATTERN } from "../constants";
import { toStringList } from "./helpers";
export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const toOptionalInt = (value: unknown): number | undefined =>
  value ? util.types.toInt(value) : undefined;
export const toKeyValueObject = (
  dynamicFields: unknown,
): Record<string, unknown> =>
  Array.isArray(dynamicFields)
    ? util.types.keyValPairListToObject(dynamicFields)
    : {};
export const toTrimmedStringList = (value: unknown): string[] =>
  util.types.isPicklist(value)
    ? (value as string[]).map((name) => name.trim())
    : [];
export const valueListInputClean = (value: unknown) => {
  if (Array.isArray(value) && value.length >= 1 && value[0] !== "000xxx") {
    return value as string[];
  }
  return undefined;
};
export const getDynamicValues = (dynamicValues: unknown) => {
  let dynamicValuesToUse = dynamicValues;
  if (dynamicValuesToUse) {
    if (typeof dynamicValuesToUse === "string")
      try {
        dynamicValuesToUse = JSON.parse(dynamicValuesToUse);
      } catch (_e) {
        throw new Error("Dynamic Fields should be a valid JSON string");
      }
    if (!Array.isArray(dynamicValuesToUse))
      throw new Error("Dynamic Fields should be an array");
    for (const pair of dynamicValuesToUse) {
      if (!("key" in pair) || !("value" in pair))
        throw new Error(
          "Each item in Dynamic Fields should be a key-value pair",
        );
    }
    return util.types.keyValPairListToObject(dynamicValuesToUse);
  }
  return {};
};
export const toCommaSeparatedList = (value: unknown): string | undefined => {
  const result = toStringList((value as unknown[]) || []).join(",");
  return result || undefined;
};
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
  const year = util.types.toNumber(yearStr);
  const month = util.types.toNumber(monthStr);
  const day = util.types.toNumber(dayStr);
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
