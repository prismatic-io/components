import { util } from "@prismatic-io/spectral";

export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const toOptionalNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;

export const toOptionalObject = (value: unknown): object | undefined =>
  value ? util.types.toObject(value) : undefined;

export const toObjectOrEmpty = (value: unknown): object =>
  value ? util.types.toObject(value) : {};
