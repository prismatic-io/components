import { util } from "@prismatic-io/spectral";

export const cleanString = (value: unknown): string | undefined => {
  const str = util.types.toString(value);
  return str ? str : undefined;
};

export const jsonInputClean = (value: unknown) => {
  
  if (typeof value === "string") {
    if (value.trim() !== "") {
      return JSON.parse(value);
    }
    return undefined;
  }
  
  if (value !== null && value !== undefined) {
    return value;
  }
  return undefined;
};

export const valueListInputClean = (value: unknown) => {
  if (Array.isArray(value) && value.length >= 1 && value[0] !== "000xxx") {
    return value as string[];
  }
  return undefined;
};
