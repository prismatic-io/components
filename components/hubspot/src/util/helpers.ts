import type { URLSearchParams } from "node:url";
import { util } from "@prismatic-io/spectral";
export const toStringList = (array: unknown[]) => {
  return array.map((item) => util.types.toString(item));
};
export const getProps = (baseProps: unknown[], additionalProps: unknown[]) => {
  const properties = toStringList([
    ...new Set([...baseProps, ...(additionalProps || [])]),
  ]).join(",");
  return {
    properties,
  };
};
export const addUrlSearchParamsFromStringArray = (
  searchParams: URLSearchParams,
  array: string[],
  attributeName: string,
): URLSearchParams => {
  for (const item of array) {
    searchParams.append(attributeName, item);
  }
  return searchParams;
};
export const getArrayOfObjectsWithKey = (
  array: string[],
  key: string,
): Record<string, string>[] => array.map((item) => ({ [key]: item }));
