import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { PAGINATION_DEFAULT_LIMIT } from "../constants";
import type { ActionResults, ListActionResults } from "../types";

export const paginateData = async (
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  params: Record<string, unknown>,
) => {
  if (!fetchAll) {
    const {
      data: {
        d: { results },
      },
    }: {
      data: ListActionResults;
    } = await client.get(url, {
      params,
    });
    return results;
  }
  let records: Record<string, unknown>[] = [];
  let keepPaginating = true;
  do {
    const {
      data: {
        d: { results },
      },
    }: {
      data: ListActionResults;
    } = await client.get(url, {
      params: {
        ...params,
        $top: PAGINATION_DEFAULT_LIMIT,
        $skip: records.length,
      },
    });
    records = [...records, ...(results as Record<string, unknown>[])];
    keepPaginating = results.length === PAGINATION_DEFAULT_LIMIT;
  } while (keepPaginating);
  return records;
};

export const cleanResultFromResponse = (response: ActionResults) => {
  return response.d;
};
