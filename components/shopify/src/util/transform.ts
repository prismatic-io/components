import { util } from "@prismatic-io/spectral";
import { METAFIELD_TYPE_CONVERTERS } from "../constants";

export const generateModelFromSnakeCaseArray = (
  strings: string[],
): { label: string; value: string }[] =>
  strings.map((key) => ({
    label: key
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()),
    value: key,
  }));

export const findKeyByValue = (obj: Record<string, string>, value: string): string | undefined => {
  return Object.keys(obj).find((key) => obj[key] === value);
};

export const createTimezoneString = (timezoneOffset: string, ianaTimezone: string): string => {
  const gmtOffset = `GMT${timezoneOffset.substring(0, 3)}:${timezoneOffset.substring(3)}`;
  return `(${gmtOffset}) ${ianaTimezone}`;
};

export const validateMetafieldType = (
  value: unknown,
  type: string,
): string | number | boolean | undefined => {
  const normalizedType = type.toLocaleLowerCase().trim();
  if (!Object.hasOwn(METAFIELD_TYPE_CONVERTERS, normalizedType)) {
    return undefined;
  }
  return util.types[METAFIELD_TYPE_CONVERTERS[normalizedType]](value);
};
