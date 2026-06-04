import { util } from "@prismatic-io/spectral";

export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const toOptionalInt = (value: unknown): number | undefined =>
  value ? util.types.toInt(value) : undefined;
