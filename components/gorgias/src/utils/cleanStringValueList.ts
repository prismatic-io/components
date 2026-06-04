import { util } from "@prismatic-io/spectral";

export const cleanStringValueList = (values: unknown): string[] => {
  if (Array.isArray(values)) {
    return values.reduce<string[]>((acc, value) => {
      if (value === undefined || value === null || value === "") {
        return acc;
      }

      return acc.concat(util.types.toString(value));
    }, []);
  }

  return [];
};
