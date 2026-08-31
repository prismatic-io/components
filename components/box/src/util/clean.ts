import { util } from "@prismatic-io/spectral";
export const cleanString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const cleanCommaSeparatedString = (
  value: unknown,
): string | undefined => {
  if (!value) return undefined;
  const str = util.types.toString(value);
  return str
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "")
    .join(",");
};
export const toStringList = (values: unknown): string[] =>
  ((values as string[]) || []).map((value) => util.types.toString(value));
export const humanizeEnumLabel = (value: string): string => {
  return value
    .replace(/_/g, " ")
    .replace(/\./g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
export const pathLeafName = (path: unknown): string =>
  util.types.toString(path).split("/").filter(Boolean).slice(-1)[0] ?? "";
export const sharedLinkVanityUrl = (vanityName: unknown): string | null => {
  const name = util.types.toString(vanityName);
  return name ? `https://app.box.com/v/${name}` : null;
};
