import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { DEFAULT_PAGE_SIZE } from "../constants";
const stripUndefined = (
  obj: Record<string, unknown>,
): Record<string, unknown> =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
export const fetchAllTableRecords = async (
  client: HttpClient,
  url: string,
  query?: Record<string, unknown>,
  pageSize = DEFAULT_PAGE_SIZE,
): Promise<unknown[]> => {
  const baseParams = query ? stripUndefined(query) : {};
  const allRecords: unknown[] = [];
  let offset = 0;
  let hasMore = true;
  do {
    const params = {
      ...baseParams,
      sysparm_limit: util.types.toString(pageSize),
      sysparm_offset: util.types.toString(offset),
    };
    const { data } = await client.get(url, { params });
    const records: unknown[] = data?.result || [];
    allRecords.push(...records);
    hasMore = records.length >= pageSize;
    offset += pageSize;
  } while (hasMore);
  return allRecords;
};
export const fetchAllKnowledgeRecords = async (
  client: HttpClient,
  url: string,
  query?: Record<string, unknown>,
  pageSize = DEFAULT_PAGE_SIZE,
): Promise<unknown[]> => {
  const baseParams = query ? stripUndefined(query) : {};
  const allRecords: unknown[] = [];
  let offset = 0;
  let hasMore = true;
  do {
    const params = {
      ...baseParams,
      limit: pageSize,
      offset,
    };
    const { data } = await client.get(url, { params });
    const articles: unknown[] = data?.result?.articles || [];
    allRecords.push(...articles);
    hasMore = articles.length >= pageSize;
    offset += pageSize;
  } while (hasMore);
  return allRecords;
};
