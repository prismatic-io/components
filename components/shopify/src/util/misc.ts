import { util } from "@prismatic-io/spectral";
import type { UserError } from "../types";
export const validateMetafieldType = (value: unknown, type: string) => {
  if (type.toLocaleLowerCase().trim() === "single_line_text_field") {
    return util.types.toString(value);
  }
  if (type.toLocaleLowerCase().trim() === "number_integer") {
    return util.types.toInt(value);
  }
  if (type.toLocaleLowerCase().trim() === "boolean") {
    return util.types.toBool(value);
  }
};
export const generateModelFromSnakeCaseArray = (strings: string[]) =>
  strings.map((key) => ({
    label: key
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()),
    value: key,
  }));
export const findKeyByValue = (
  obj: Record<string, string>,
  value: string,
): string | undefined => {
  return Object.keys(obj).find((key) => obj[key] === value);
};
export const createTimezoneString = (
  timezoneOffset: string,
  ianaTimezone: string,
): string => {
  const gmtOffset = `GMT${timezoneOffset.substring(0, 3)}:${timezoneOffset.substring(3)}`;
  return `(${gmtOffset}) ${ianaTimezone}`;
};
const searchUserErrors = (obj): UserError[] | null => {
  if (obj && typeof obj === "object") {
    if (obj.userErrors) {
      return obj.userErrors;
    }
    for (const key in obj) {
      const result = searchUserErrors(obj[key]);
      if (result) return result;
    }
  }
  return null;
};
export const gqlErrorsCheck = (response): void => {
  const userErrors = searchUserErrors(response);
  if (userErrors && userErrors.length > 0) {
    throw new Error(userErrors.map((error) => error.message).join(", "));
  }
};
