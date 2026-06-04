import { util } from "@prismatic-io/spectral";

export const cleanVariablesInput = (value: unknown): Record<string, string> => {
  if (Array.isArray(value)) {
    return util.types.keyValPairListToObject(value);
  }
  return {};
};
