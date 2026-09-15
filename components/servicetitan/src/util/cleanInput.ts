import { type KeyValuePair, util } from "@prismatic-io/spectral";
import { LOOK_BACK_DATE_PATTERN } from "../constants";
export const cleanCodeInput = (value: unknown): object | undefined => {
  if (value) {
    return util.types.toObject(value);
  }
  return undefined;
};
export const cleanBooleanInput = (value: unknown): boolean | undefined =>
  value ? util.types.toBool(value) : undefined;
export const cleanNumberInput = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;
export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const cleanKeyValueListInput = (
  value: unknown,
): Record<string, unknown> | undefined =>
  value
    ? util.types.keyValPairListToObject(value as KeyValuePair[])
    : undefined;
export const cleanNumberValueListInput = (
  value: unknown,
): number[] | undefined => {
  if (value) {
    if (Array.isArray(value)) {
      return value.map((val) => util.types.toNumber(val));
    }
  }
  return undefined;
};
export const cleanStringValueListInput = (
  value: unknown,
): string[] | undefined => {
  if (value) {
    if (Array.isArray(value)) {
      return value.map((val) => util.types.toString(val));
    }
  }
  return undefined;
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
export const mapModelValues = (
  values: string[],
  addEmptyValue = false,
): {
  value: string;
  label: string;
}[] => {
  if (addEmptyValue) {
    return [
      {
        value: "",
        label: "Empty",
      },
      ...values.map((value) => {
        return {
          value,
          label: value,
        };
      }),
    ];
  }
  return values.map((value) => {
    return {
      value,
      label: value,
    };
  });
};
export const mapBooleanModelInput = mapModelValues(["true", "false"], true);
export const mapStatusModelInput = mapModelValues(
  ["Pending", "Posted", "Exported"],
  true,
);
