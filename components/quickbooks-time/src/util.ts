import queryString from "node:querystring";
import { type KeyValuePair, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { QBTimeRecord } from "./types";

export const injectQueryParams = (url: string, queryParams: KeyValuePair[]): string => {
  const paramObject = queryParams.reduce(
    (result, { key, value }) => ({ ...result, [key]: value }),
    {},
  );

  return `${url}?${queryString.stringify(paramObject)}`;
};

export const fetchRecords = async (
  client: HttpClient,
  object: string,
  queryParams: Record<string, string>,
): Promise<QBTimeRecord[]> => {
  const allRecords: QBTimeRecord[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const params = new URLSearchParams({
      ...queryParams,
      page: util.types.toString(page),
      per_page: "50",
    });
    const { data } = await client.get(`/${object}?${params.toString()}`);
    const results = data?.results ?? {};
    const items = Object.values(results) as QBTimeRecord[];
    allRecords.push(...items);
    hasMore = items.length >= 50;
    page++;
  }

  return allRecords;
};
