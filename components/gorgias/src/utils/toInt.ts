import { util } from "@prismatic-io/spectral";

export const toInt = (value: unknown) => {
  return value || typeof value === "number"
    ? util.types.toInt(value)
    : undefined;
};
