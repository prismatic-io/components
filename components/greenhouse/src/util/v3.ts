import { ConnectionError, type Connection, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  V3_BASE_URL,
  V3_DEFAULT_RETRY_AFTER_SECONDS,
  V3_MAX_PER_PAGE,
  V3_MAX_RETRY_AFTER_SECONDS,
} from "../constants";
import { generatePayload, parseNextLink } from "./index";
export const getV3Token = (connection: Connection): string => {
  const token = util.types.toString(connection.token?.access_token);
  if (!token) {
    throw new ConnectionError(
      connection,
      "The connection does not contain a valid access token.",
    );
  }
  return token;
};
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const getRateLimitedPage = async <T>(
  client: HttpClient,
  url: string,
  params?: Record<string, unknown>,
) => {
  try {
    return await client.get<T[]>(url, { params });
  } catch (error) {
    const status = (
      error as {
        response?: {
          status?: number;
        };
      }
    ).response?.status;
    if (status !== 429) {
      throw error;
    }
    const retryAfterHeader = (
      error as {
        response?: {
          headers?: Record<string, unknown>;
        };
      }
    ).response?.headers?.["retry-after"];
    let retryAfterSeconds: number;
    try {
      retryAfterSeconds = retryAfterHeader
        ? util.types.toNumber(retryAfterHeader)
        : V3_DEFAULT_RETRY_AFTER_SECONDS;
    } catch {
      retryAfterSeconds = V3_DEFAULT_RETRY_AFTER_SECONDS;
    }
    await sleep(Math.min(retryAfterSeconds, V3_MAX_RETRY_AFTER_SECONDS) * 1000);
    return await client.get<T[]>(url, { params });
  }
};
export const fetchAllV3 = async <T>(
  client: HttpClient,
  path: string,
  params: Record<string, unknown> = {},
): Promise<T[]> => {
  const results: T[] = [];
  let nextUrl: string | null = path;
  let currentParams: Record<string, unknown> | undefined = {
    per_page: V3_MAX_PER_PAGE,
    ...params,
  };
  while (nextUrl) {
    const response = await getRateLimitedPage<T>(
      client,
      nextUrl,
      currentParams,
    );
    if (Array.isArray(response.data)) {
      results.push(...response.data);
    }
    nextUrl = parseNextLink(response.headers?.link as string | undefined);
    currentParams = undefined;
  }
  return results;
};
const cursorFromNextLink = (linkHeader: string | undefined): string | null => {
  const nextUrl = parseNextLink(linkHeader);
  if (!nextUrl) {
    return null;
  }
  const cursor = new URL(nextUrl, V3_BASE_URL).searchParams.get("cursor");
  if (!cursor) {
    throw new Error(
      `Greenhouse returned a next page link without a cursor: ${nextUrl}`,
    );
  }
  return cursor;
};
export const fetchV3Window = async <T>(
  client: HttpClient,
  path: string,
  {
    after,
    params = {},
    perPage,
    maxPages,
  }: {
    after?: string;
    params?: Record<string, unknown>;
    perPage: number;
    maxPages: number;
  },
): Promise<{
  records: T[];
  after: string | null;
}> => {
  const records: T[] = [];
  let requestParams: Record<string, unknown> = after
    ? { cursor: after }
    : { per_page: perPage, ...params };
  let next: string | null = null;
  for (let page = 0; page < maxPages; page++) {
    const response = await getRateLimitedPage<T>(client, path, requestParams);
    if (Array.isArray(response.data)) {
      records.push(...response.data);
    }
    next = cursorFromNextLink(response.headers?.link as string | undefined);
    if (!next) {
      break;
    }
    requestParams = { cursor: next };
  }
  return { records, after: next };
};
export const paginateV3 = async <T>(
  client: HttpClient,
  path: string,
  fetchAll = false,
  {
    perPage,
    cursor,
    params = {},
  }: {
    perPage?: number;
    cursor?: string;
    params?: Record<string, unknown>;
  } = {},
): Promise<T[]> => {
  if (fetchAll) {
    return fetchAllV3<T>(client, path, params);
  }
  const requestParams = cursor ? { cursor } : { ...params, per_page: perPage };
  const response = await getRateLimitedPage<T>(
    client,
    path,
    generatePayload(requestParams),
  );
  return Array.isArray(response.data) ? response.data : [];
};
