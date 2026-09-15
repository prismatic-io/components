import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { ListGeneric } from "../types";
export async function fetchAllRecords<T>(
  client: HttpClient,
  url: string,
  queryParams: Record<string, unknown>,
  maxRecords?: number,
): Promise<ListGeneric<T>> {
  let records: T[] = [];
  let hasMore = false;
  let page = 0;
  const pageSize = 500;
  do {
    page++;
    const {
      data,
    }: {
      data: {
        data: T[];
        hasMore: boolean;
      };
    } = await client.get(url, {
      params: {
        ...queryParams,
        page,
        pageSize,
      },
    });
    records = [...records, ...data.data];
    hasMore = data.hasMore;
  } while (
    hasMore &&
    (maxRecords === undefined || records.length < maxRecords)
  );
  const truncated = maxRecords !== undefined && records.length > maxRecords;
  const data = truncated ? records.slice(0, maxRecords) : records;
  return {
    page,
    pageSize: 500,
    hasMore: hasMore || truncated,
    totalCount: data.length,
    data,
  };
}
