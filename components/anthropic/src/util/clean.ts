import { util } from "@prismatic-io/spectral";
export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const cleanNumberInput = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;
export const cleanNumberWithDefault =
  (defaultValue: number): ((value: unknown) => number) =>
  (value: unknown): number =>
    value ? util.types.toNumber(value) : defaultValue;
