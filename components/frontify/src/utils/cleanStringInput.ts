import { util } from "@prismatic-io/spectral";

export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
