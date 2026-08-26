import { parseStringPromise } from "xml2js";
export const parseXml = async <T>(xmlString: string): Promise<T> =>
  parseStringPromise(xmlString, {
    explicitArray: false,
    ignoreAttrs: false,
    trim: true,
  }) as Promise<T>;
export const ensureArray = <T>(value: T | T[] | undefined): T[] => {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
};
