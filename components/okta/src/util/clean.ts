import { util } from "@prismatic-io/spectral";

export const cleanString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const cleanObject = (value: unknown) => (value ? util.types.toObject(value) : undefined);
