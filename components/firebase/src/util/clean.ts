import { type KeyValuePair, util } from "@prismatic-io/spectral";
export const cleanString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const keyValuePairsToObject = (
  values: unknown,
): Record<string, unknown> =>
  util.types.keyValPairListToObject(values as KeyValuePair<unknown>[]);
export function validateJSON(json: unknown): unknown {
  try {
    return JSON.parse(util.types.toString(json));
  } catch (_err) {
    throw new Error("Invalid JSON format.");
  }
}
