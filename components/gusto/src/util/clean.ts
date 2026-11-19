import { util } from "@prismatic-io/spectral";

export const toObject = (value: unknown) =>
  value ? util.types.toObject(value) : {};

export const toOptionalString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;
