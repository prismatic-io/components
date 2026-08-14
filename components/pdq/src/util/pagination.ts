import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { DEFAULT_PAGE_SIZE } from "../constants";
import type { ListResponse } from "../types";
export const fetchAllData = async (
  client: HttpClient,
  path: string,
  params: Record<string, unknown>,
  fetchAll = false,
): Promise<ListResponse> => {
  if (!fetchAll) {
    return await fetchData(client, path, params);
  }
  const records: unknown[] = [];
  const keepFetching = true;
  let page = 1;
  let lastResponse: Record<string, unknown> = {};
  do {
    const response = await fetchData(client, path, {
      ...params,
      pageSize: DEFAULT_PAGE_SIZE,
      page,
    });
    const { data, ...rest } = response;
    lastResponse = rest;
    if (!data || data.length === 0) {
      break;
    }
    records.push(...data);
    page++;
  } while (keepFetching);
  return { data: records, ...lastResponse };
};
export const fetchData = async (
  client: HttpClient,
  path: string,
  params: Record<string, unknown>,
): Promise<ListResponse> => {
  const { data } = await client.get(path, { params });
  return data;
};
