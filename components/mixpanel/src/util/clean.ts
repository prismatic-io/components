import { util } from "@prismatic-io/spectral";
export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const jsonInputClean = (value: unknown) => {
  if (value !== null && value !== "") {
    return JSON.parse(value as string);
  }
  return undefined;
};
export const valueListInputClean = (value: unknown) => {
  if (Array.isArray(value) && value.length >= 1 && value[0] !== "000xxx") {
    return value as string[];
  }
  return undefined;
};
