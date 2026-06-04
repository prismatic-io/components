import { util } from "@prismatic-io/spectral";

export const toOptionalString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const toOptionalNumber = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;
