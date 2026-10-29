import { util } from "@prismatic-io/spectral";

export const cleanIntegerValueList = (values: unknown): number[] => {
  if (Array.isArray(values)) {
    return values.reduce<number[]>((acc, value) => {
      if (value === undefined || value === null || value === "") {
        return acc;
      }

      return acc.concat(util.types.toInt(value));
    }, []);
  }

  return [];
};
