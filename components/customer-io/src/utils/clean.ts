import { util } from "@prismatic-io/spectral";

export const cleanKeyValueList = (value: unknown): Record<string, unknown> =>
  util.types.keyValPairListToObject(
    value as Parameters<typeof util.types.keyValPairListToObject>[0],
  );

export const cleanOptionalKeyValueList = (
  value: unknown,
): Record<string, unknown> | undefined => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return undefined;
  }
  const result = cleanKeyValueList(value);
  return Object.keys(result).length > 0 ? result : undefined;
};
