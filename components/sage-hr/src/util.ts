import FormData from "form-data";
import type { createClient } from "./client";
import type { SageHRRecord } from "./types";

export const fetchAllRecords = async (
  client: ReturnType<typeof createClient>,
  endpoint: string,
  params?: Record<string, unknown>,
): Promise<SageHRRecord[]> => {
  const allRecords: SageHRRecord[] = [];
  let page = 1;
  let hasMore = true;

  do {
    const { data } = await client.get(endpoint, {
      params: { ...params, page },
    });
    const records: SageHRRecord[] = data?.data || [];
    allRecords.push(...records);

    hasMore = !!data?.meta?.next_page;
    if (hasMore) {
      page = data.meta.next_page;
    }
  } while (hasMore);

  return allRecords;
};

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
      } else if (
        value !== null &&
        Object.keys(value as Record<string, unknown>).length > 0
      ) {
        return true; 
      }
      return false;
    default:
      return false;
  }
};

export const generateForm = (data: Record<string, unknown>) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (validateDataType(value)) {
      formData.append(key, value as string);
    }
  }

  return formData;
};
