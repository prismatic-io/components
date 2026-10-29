import { util } from "@prismatic-io/spectral";

export const toDate = (value: unknown) => {
  return value ? util.types.toDate(value) : undefined;
};
