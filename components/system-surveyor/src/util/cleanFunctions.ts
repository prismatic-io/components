import { util } from "@prismatic-io/spectral";

export const toOptionalString = (value: unknown): string | undefined => {
  const str = util.types.toString(value);
  return str ? str : undefined;
};

export const toOptionalObject = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;
