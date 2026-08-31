import { util } from "@prismatic-io/spectral";
export const cleanString = (value: unknown): string | undefined => {
  const str = util.types.toString(value);
  return str ? str : undefined;
};
export const cleanCustomerId = (value: unknown): string => {
  const id = util.types.toString(value);
  return id.replace("customers/", "").replace(/-/g, "");
};
export const valueListInputClean = (value: unknown): string | undefined => {
  if (Array.isArray(value) && value.length >= 1 && value[0] !== "000xxx") {
    return value
      .map((v) => `customer_id:${cleanCustomerId(v)}`)
      .toString()
      .replaceAll(",", ";");
  }
  return undefined;
};
export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const toOptionalInt = (value: unknown): number | undefined =>
  value ? util.types.toInt(value) : undefined;
export const toStringList = (value: unknown): string[] => {
  if (value && Array.isArray(value)) {
    return value as string[];
  }
  return [];
};
