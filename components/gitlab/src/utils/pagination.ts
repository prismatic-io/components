import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { MAX_PER_PAGE } from "../constants";
import type { KeysetOrder, PageOptions } from "../types";
export const fetchAllPages = async <T>(
  client: HttpClient,
  path: string,
  params: Record<string, unknown> = {},
  isDone?: (records: T[]) => boolean,
): Promise<T[]> => {
  const records: T[] = [];
  let page: number | undefined = 1;
  while (page !== undefined) {
    const current: number = page;
    const response = await client.get<T[]>(path, {
      params: { ...params, per_page: MAX_PER_PAGE, page: current },
    });
    records.push(...expectArray<T>(response.data, path));
    if (isDone?.(records)) {
      break;
    }
    const next = nextPageNumber(response.headers["x-next-page"]);
    page = next !== undefined && next > current ? next : undefined;
  }
  return records;
};
export const fetchAllKeysetPages = async <T>(
  client: HttpClient,
  path: string,
  order: KeysetOrder,
  params: Record<string, unknown> = {},
): Promise<T[]> => {
  const records: T[] = [];
  let query: Record<string, unknown> | undefined = {
    ...params,
    ...order,
    pagination: "keyset",
    per_page: MAX_PER_PAGE,
  };
  while (query !== undefined) {
    const response = await client.get<T[]>(path, { params: query });
    records.push(...expectArray<T>(response.data, path));
    query = nextLinkParams(response.headers.link);
  }
  return records;
};
export const listRecords = async <T>(
  client: HttpClient,
  path: string,
  { fetchAll, perPage, page }: PageOptions,
  params: Record<string, unknown> = {},
  keysetOrder?: KeysetOrder,
): Promise<T[]> => {
  if (fetchAll) {
    return keysetOrder
      ? fetchAllKeysetPages<T>(client, path, keysetOrder, params)
      : fetchAllPages<T>(client, path, params);
  }
  const { data } = await client.get<T[]>(path, {
    params: {
      ...params,
      per_page: perPage || undefined,
      page: page || undefined,
    },
  });
  return expectArray<T>(data, path);
};
export const expectArray = <T>(data: unknown, path: string): T[] => {
  if (!Array.isArray(data)) {
    throw new Error(
      `Expected a JSON array from GitLab at ${path} but received ${typeof data}. Check the GitLab URL on the connection.`,
    );
  }
  return data as T[];
};
const nextPageNumber = (header: unknown): number | undefined => {
  const value = util.types.toString(header).trim();
  if (!/^\d+$/.test(value)) {
    return undefined;
  }
  return util.types.toNumber(value);
};
const nextLinkParams = (
  header: unknown,
): Record<string, string> | undefined => {
  for (const part of util.types.toString(header).split(",")) {
    const match = part.match(/<([^>]+)>\s*;\s*rel="?next"?/);
    if (match) {
      return Object.fromEntries(new URL(match[1]).searchParams);
    }
  }
  return undefined;
};
