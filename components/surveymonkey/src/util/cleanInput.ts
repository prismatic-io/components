import { util } from "@prismatic-io/spectral";

export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const toOptionalNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;

export const toArrayOfStrings = (value: unknown): string[] | undefined =>
  value ? (value as string[]) : undefined;










export const toSurveyMonkeyDate = (iso: string): string =>
  iso.replace(/\.\d+Z$/, "").replace(/Z$/, "");
