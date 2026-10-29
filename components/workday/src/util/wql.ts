import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  WQL_DEFAULT_FETCH_ALL_LIMIT,
  WQL_MAX_CACHED_ROWS,
  WQL_MAX_GET_QUERY_LENGTH,
} from "../constants";
import type { WqlPageParams, WqlResponse } from "../types";

const longQueryCannotPageError = (detail: string): Error =>
  new Error(
    `${detail} Queries over 2,047 characters cannot be paged because Workday's POST endpoint takes no limit or offset. Shorten the query to 2,047 characters or fewer so it runs with GET, or narrow it (WHERE or LIMIT) to one page of rows.`,
  );

export const queryWqlPage = async (
  client: HttpClient,
  path: string,
  query: string,
  params: WqlPageParams,
): Promise<WqlResponse> => {
  if (query.length <= WQL_MAX_GET_QUERY_LENGTH) {
    const { data } = await client.get<WqlResponse>(`${path}/data`, {
      params: { query, ...params },
    });
    return data;
  }
  if (params.limit !== undefined || params.offset) {
    throw longQueryCannotPageError(
      "The Limit or Offset cannot be applied to this query.",
    );
  }
  const { data } = await client.post<WqlResponse>(`${path}/data`, { query });
  if (typeof data.total === "number" && data.total > (data.data ?? []).length) {
    throw longQueryCannotPageError(
      `Workday returned ${(data.data ?? []).length} of ${data.total} rows.`,
    );
  }
  return data;
};

export const queryWqlAll = async (
  client: HttpClient,
  path: string,
  query: string,
  pageLimit: number = WQL_DEFAULT_FETCH_ALL_LIMIT,
): Promise<WqlResponse> => {
  if (query.length > WQL_MAX_GET_QUERY_LENGTH) {
    return queryWqlPage(client, path, query, {});
  }
  const rows: unknown[] = [];
  let total: number | undefined;
  let offset = 0;
  do {
    const page = await queryWqlPage(client, path, query, {
      limit: pageLimit,
      offset,
    });
    total = page.total;
    const pageRows = page.data ?? [];
    rows.push(...pageRows);
    const reachedTotal =
      typeof total === "number"
        ? rows.length >= total
        : pageRows.length < pageLimit;
    if (pageRows.length === 0 || reachedTotal) break;
    offset += pageRows.length;
  } while (
    rows.length < (total ?? WQL_MAX_CACHED_ROWS) &&
    offset < WQL_MAX_CACHED_ROWS
  );
  return { total: total ?? rows.length, data: rows };
};

export const assertWqlReadComplete = (response: WqlResponse): void => {
  if (response.total > response.data.length) {
    throw new Error(
      `Read ${response.data.length} of ${response.total} rows. Workday caches at most ${WQL_MAX_CACHED_ROWS.toLocaleString("en-US")} rows per query, so the rest cannot be paged. Narrow the query with a WHERE or LIMIT clause.`,
    );
  }
};
