import type { HttpClient } from "@prismatic-io/spectral/http";
import { DEFAULT_PAGE_SIZE, DELTA_PREFER_HEADER } from "../constants";
import type { GraphCollectionResponse, PaginateOptions } from "../types";

export const paginateResults = async <T>(
  client: HttpClient,
  endpoint: string,
  { returnFullData = false, useTop = true, excludeParents = false }: PaginateOptions = {},
): Promise<T | Record<string, unknown>[]> => {
  const results: Record<string, unknown>[] = [];
  let nextLink = endpoint;
  let isFirstTime = true;
  let fullData: Record<string, unknown>;
  do {
    const { data } = await client.get(nextLink, {
      params: isFirstTime && useTop ? { $top: DEFAULT_PAGE_SIZE } : undefined,
      headers: {
        Prefer: excludeParents ? DELTA_PREFER_HEADER : undefined,
      },
    });

    const existent = results.map((r) => r.id);
    const toAdd = data.value.filter((r: Record<string, unknown>) => !existent.includes(r.id));

    results.push(...toAdd);
    nextLink = data["@odata.nextLink"];

    isFirstTime = false;
    fullData = data;
  } while (nextLink);

  if (returnFullData) {
    fullData.value = results;
    return fullData as T;
  }

  return results;
};

export const fetchAllPages = async <T>(
  client: HttpClient,
  path: string,
  params?: Record<string, string>,
): Promise<T[]> => {
  const items: T[] = [];
  let nextLink: string | undefined = path;
  let requestParams = params;

  while (nextLink !== undefined) {
    const { data }: { data: Partial<GraphCollectionResponse<T>> } = await client.get(nextLink, {
      params: requestParams,
    });
    items.push(...(data.value ?? []));
    nextLink = data["@odata.nextLink"];
    requestParams = undefined;
  }
  return items;
};

export const getSkipToken = (nextLink: string): string | null => {
  for (const [name, value] of new URL(nextLink).searchParams) {
    if (name.toLowerCase() === "$skiptoken") {
      return value;
    }
  }
  return null;
};
