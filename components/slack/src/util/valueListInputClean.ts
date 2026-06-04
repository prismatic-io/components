import { util } from "@prismatic-io/spectral";
import type { SearchChannelType } from "../types";

export const isValidArrayNotEmpty = (value: unknown) => {
  if (!Array.isArray(value)) {
    return false;
  }
  return value.map((v) => util.types.toString(v)).filter((v) => v !== "");
};

export const valueListInputClean = (value: unknown) => {
  if (value) {
    const data = isValidArrayNotEmpty(value);
    if (data) {
      return data as SearchChannelType;
    }
    const isStringNotEmpty = util.types.toString(value).trim();
    const parsedValue = JSON.parse(isStringNotEmpty);
    const parsedData = isValidArrayNotEmpty(parsedValue);
    if (parsedData) {
      return parsedData as SearchChannelType;
    }
  }
  return undefined;
};
