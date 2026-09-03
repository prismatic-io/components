import { util } from "@prismatic-io/spectral";
export const resolveRowCount = (value: unknown): number | undefined => {
  if (!value) return undefined;
  const count = util.types.toNumber(value);
  if (!Number.isInteger(count) || count < 1) {
    throw new Error(
      `Expected a whole number of records greater than zero, but got "${util.types.toString(value)}".`,
    );
  }
  return count;
};
