import { util } from "@prismatic-io/spectral";


export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;


export const toOptionalNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;


export const toNumberArray = (value: unknown): number[] | undefined => {
  if (!value) return undefined;
  const str = util.types.toString(value);
  return str
    .split(",")
    .map((v) => util.types.toNumber(v.trim()))
    .filter((n) => !Number.isNaN(n));
};
