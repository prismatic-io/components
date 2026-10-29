import { util } from "@prismatic-io/spectral";

export const toStr = (value: unknown) => {
  return value ? util.types.toString(value) : undefined;
};
