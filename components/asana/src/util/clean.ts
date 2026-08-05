import { util } from "@prismatic-io/spectral";
export const cleanString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const validateId = (value: unknown) => {
  const strValue = util.types.toString(value).trim();
  if (/[0-9]*/.test(strValue)) {
    return strValue;
  } else {
    throw new Error(
      `Asana global IDs are numbers. "${strValue}" is not a valid Asana global ID.`,
    );
  }
};
export const cleanCommaSeparatedList = (value: unknown): string => {
  const str = util.types.toString(value);
  return str
    .split(",")
    .map((field) => field.trim())
    .filter(Boolean)
    .join(",");
};
