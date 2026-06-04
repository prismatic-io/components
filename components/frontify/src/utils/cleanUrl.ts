import { util } from "@prismatic-io/spectral";


export const cleanUrl = (value: unknown, defaultValue = ""): string => {
  const stringValue = util.types.toString(value || defaultValue);
  return stringValue.endsWith("/") ? stringValue.slice(0, -1) : stringValue;
};
