import { util } from "@prismatic-io/spectral";


export const toOptionalString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const toOptionalNumber = (value: unknown) =>
  value ? util.types.toNumber(value) : undefined;


export const toObjectOrEmpty = (value: unknown): Record<string, unknown> =>
  value ? (util.types.toObject(value) as Record<string, unknown>) : {};


export const toOptionalArray = (value: unknown): unknown[] | undefined => {
  if (!value) return undefined;
  const parsed = util.types.toObject(value);
  return Array.isArray(parsed) && parsed.length ? parsed : undefined;
};


export const toOptionalObject = (
  value: unknown,
): Record<string, unknown> | undefined => {
  if (!value) return undefined;
  const parsed = util.types.toObject(value) as Record<string, unknown>;
  return parsed && Object.keys(parsed).length ? parsed : undefined;
};
