import FormData from "form-data";
import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { DEFAULT_PAGE_LIMIT } from "../constants";
import type {
  PageRecordChange,
  PagesChangesObject,
  Pageable,
  Space,
  SpaceRecordChange,
} from "../types";
export const jsonInputClean = (value: unknown) => {
  if (typeof value === "string") {
    if (value !== null && value.trim() !== "") {
      return JSON.parse(value);
    }
  }
  return undefined;
};
export const valueListInputClean = (value: unknown) => {
  if (Array.isArray(value) && value.length >= 1 && value[0] !== "000xxx") {
    return value as string[];
  }
  return undefined;
};
const validateDataType = (value: unknown) => {
  const type = typeof value;
  switch (type) {
    case "string":
      if (value === "" || value === null) {
        return false;
      }
      return true;
    case "number":
      if (value === "" || Number.isNaN(value as number)) {
        return false;
      }
      return true;
    case "boolean":
      if (value === "" || value === null) {
        return false;
      }
      return true;
    case "object":
      if (Array.isArray(value)) {
        return true;
      }
      if (value !== null && Object.keys(value).length > 0) {
        return true;
      }
      return false;
    default:
      return false;
  }
};
export const generateForm = (data: unknown) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (validateDataType(value)) {
      formData.append(key, value);
    }
  }
  return formData;
};
export const cleanKeyValList = (
  keyvaluelist: unknown,
): Record<string, string> => {
  if (keyvaluelist && Array.isArray(keyvaluelist)) {
    return util.types.keyValPairListToObject(keyvaluelist);
  }
  return undefined;
};
export const cleanNumberInput = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;
export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const cleanBooleanInput = (value: unknown): boolean | undefined => {
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  return undefined;
};
export const extractNextUrlGivenRegex = (
  regex: RegExp,
  nextUrl: string,
): string | null => {
  const match = regex.exec(nextUrl);
  return match ? match[0] : null;
};
export const paginateResults = async <T>(
  client: HttpClient,
  startUrl: string,
  nextUrlRegex: RegExp,
  limit: number = DEFAULT_PAGE_LIMIT,
): Promise<T[]> => {
  const results: T[] = [];
  let next: string | null = startUrl;
  let isFirstRequest = true;
  do {
    const params = isFirstRequest ? { limit } : {};
    isFirstRequest = false;
    const { data } = await client.get<Pageable<T>>(next, { params });
    if (data.results?.length) {
      results.push(...data.results);
    }
    const nextUrl = data._links?.next;
    next = nextUrl ? extractNextUrlGivenRegex(nextUrlRegex, nextUrl) : null;
  } while (next);
  return results;
};
export const cleanKeyValPairInput = (value: unknown) => {
  if (Array.isArray(value) && value.length) {
    return util.types.keyValPairListToObject(value);
  }
  return undefined;
};
export const resolvePageRecordChanges = (
  data: PagesChangesObject | undefined,
): PageRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.createdRecords ?? []).map(
      (record): PageRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updatedRecords ?? []).map(
      (record): PageRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
export const resolveSpaceRecordChanges = (
  data: Space[] | undefined,
): SpaceRecordChange[] =>
  (data ?? []).map(
    (record): SpaceRecordChange => ({ changeType: "created", record }),
  );
