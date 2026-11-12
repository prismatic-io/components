import { util } from "@prismatic-io/spectral";
import type { AnyObject } from "../types";

export const cleanObject = (obj: AnyObject): AnyObject => {
  const cleanedObject: AnyObject = {};

  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      if (value.length > 0) {
        cleanedObject[key] = value.map((item) =>
          typeof item === "object" && !Array.isArray(item)
            ? cleanObject(item)
            : item,
        );
      }
    } else if (value && typeof value === "object") {
      const cleanedNestedObject = cleanObject(value as AnyObject);
      if (Object.keys(cleanedNestedObject).length > 0) {
        cleanedObject[key] = cleanedNestedObject;
      }
    } else {
      if (value !== undefined && value !== null && value !== "") {
        cleanedObject[key] = value;
      }
    }
  }

  return cleanedObject;
};

export const jsonCheck = (json: unknown) => {
  if (typeof json === "string" && json.length) {
    return JSON.parse(json);
  } else return {};
};

export const getDocumentIds = (ids: unknown) => {
  return Array.isArray(ids)
    ? ids.map((id: string) => {
        return {
          documentId: id,
        };
      })
    : [];
};

export const getUserIds = (ids: unknown) => {
  return Array.isArray(ids)
    ? ids.map((id: unknown) => {
        return {
          userId: id,
        };
      })
    : [];
};

export const toStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.map((item) => util.types.toString(item)) : [];

export const cleanString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
