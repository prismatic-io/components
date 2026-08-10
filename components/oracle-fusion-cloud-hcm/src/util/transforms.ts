import { type Element, util } from "@prismatic-io/spectral";
export const toChildArray = <T extends Record<string, unknown>>(
  entry: T | undefined,
): [T] | undefined => {
  if (!entry || Object.values(entry).every((v) => v === undefined)) {
    return undefined;
  }
  return [entry];
};
export const dropEmptyRows = <T extends Record<string, unknown>>(
  rows: T[] | undefined,
): T[] | undefined => {
  const kept = (rows ?? []).filter((row) =>
    Object.values(row).some((v) => v !== undefined && v !== null && v !== ""),
  );
  return kept.length > 0 ? kept : undefined;
};
export const mapToElements = <T>(
  items: T[] | undefined,
  toLabel: (item: T) => string | null | undefined,
  toKey: (item: T) => string | number,
): Element[] =>
  (items ?? [])
    .map((item) => ({ label: toLabel(item) ?? "", key: String(toKey(item)) }))
    .sort((a, b) => (a.label < b.label ? -1 : 1));
export const cleanId = (value: unknown): string =>
  encodeURIComponent(util.types.toString(value));
export const cleanString = (value: unknown): string | undefined =>
  util.types.toString(value) || undefined;
export const cleanIncludeMetadataLinks = (
  value: unknown,
): string | undefined => (util.types.toBool(value) ? undefined : "true");
export const cleanOptionalObject = (value: unknown): object | undefined =>
  value ? util.types.toObject(value) : undefined;
export const cleanOptionalNumber = (value: unknown): number | undefined =>
  value === undefined || value === null || value === ""
    ? undefined
    : util.types.toNumber(value);
