import { util } from "@prismatic-io/spectral";

export const toOptionalString = (value: unknown): string => {
  return util.types.toString(value) || undefined;
};
