import { util } from "@prismatic-io/spectral";
export const asStringArray = (value: unknown): string[] => value as string[];
export const asKeyValueList = (
  value: unknown,
): {
  key: string;
  value: string;
}[] =>
  value as {
    key: string;
    value: string;
  }[];
export const toIntOrDefault =
  (fallback: number): ((value: unknown) => number) =>
  (value: unknown): number =>
    value === undefined || value === null || value === ""
      ? fallback
      : util.types.toInt(value);
export const toMaxMessages = (value: unknown): number => {
  const count = toIntOrDefault(100)(value);
  if (count < 1) {
    throw new Error("Max Messages must be at least 1.");
  }
  return count;
};
