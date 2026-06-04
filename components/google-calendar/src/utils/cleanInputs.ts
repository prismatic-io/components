import { util } from "@prismatic-io/spectral";

export const toOptionalString = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const toOptionalInt = (value: unknown) =>
  value ? util.types.toInt(value) : undefined;

export const toOptionalObject = <T>(value: unknown): T | undefined =>
  value ? (util.types.toObject(value) as T) : undefined;
