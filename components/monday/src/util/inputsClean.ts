import { util } from "@prismatic-io/spectral";


export const toOptionalString = (value: unknown): string | undefined => {
  const str = util.types.toString(value);
  return str ? str : undefined;
};


export const toOptionalNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;


export const toOptionalObject = (value: unknown): object | undefined =>
  value ? util.types.toObject(value) : undefined;
