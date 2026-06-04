import { util } from "@prismatic-io/spectral";

export const toOptionalString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const asStringArray = (value: unknown) => value as string[];

export const asKeyValueList = (value: unknown) =>
  value as { key: string; value: string }[];
