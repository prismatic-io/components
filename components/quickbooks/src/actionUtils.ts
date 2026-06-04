import { util } from "@prismatic-io/spectral";






export const escapeString = (input: string): string => {
  return input.replace(/'/g, "\\'");
};

export const cleanCodeInput = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;

export const cleanBatchRequestItems = (
  value: unknown,
): Record<string, unknown>[] => {
  const jsonData = util.types.toObject(value);
  if (!Array.isArray(jsonData)) {
    throw new Error("Batch request items must be an array.");
  }

  for (const item of jsonData) {
    if (!item.bId) {
      throw new Error("Each batch request item must have a 'bId' property.");
    }
  }

  return jsonData;
};
