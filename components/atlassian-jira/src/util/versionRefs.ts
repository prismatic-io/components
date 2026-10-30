import { util } from "@prismatic-io/spectral";

export const toVersionRefs = (
  value: unknown,
): Array<{ id: string }> | undefined => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }
  const parsed = util.types.toObject(value);
  if (typeof parsed !== "object") {
    throw new Error(
      `Version references must be a JSON object or array. Received: ${parsed}`,
    );
  }
  const refs = Array.isArray(parsed) ? parsed : [parsed];
  return refs as Array<{ id: string }>;
};
