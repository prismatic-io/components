import { util } from "@prismatic-io/spectral";
export const toOptionalString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;
export const toOptionalNumber = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;
export const toOptionalObject = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;
export const toOptionalBoolean = (value: unknown) =>
  value === "true" ? true : value === "false" ? false : undefined;
export const toKeyValueListArray = (value: unknown) =>
  Array.isArray(value) ? value : undefined;
export const keyValueListToRecord = (list: unknown): Record<string, string> => {
  if (!Array.isArray(list)) {
    return {};
  }
  const record: Record<string, string> = {};
  for (const entry of list as unknown[]) {
    if (!entry || typeof entry !== "object") {
      continue;
    }
    const { key, value } = entry as {
      key?: unknown;
      value?: unknown;
    };
    const trimmedKey = toOptionalString(key)?.trim();
    if (!trimmedKey) {
      continue;
    }
    record[trimmedKey] = toOptionalString(value) ?? "";
  }
  return record;
};
