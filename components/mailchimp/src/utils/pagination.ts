import { MAX_PAGE_SIZE } from "../constants";
import type { PaginatedRequestParams, PaginatedResponse } from "../types";

export const paginatedRequest = async <T = unknown>({
  client,
  endpoint,
  dataKey,
  fetchAll = false,
  count,
  offset: initialOffset,
  params = {},
}: PaginatedRequestParams): Promise<{ data: Record<string, unknown> }> => {
  if (!fetchAll) {
    const { data } = await client.get<PaginatedResponse<T>>(endpoint, {
      params: {
        ...params,
        count,
        offset: initialOffset,
      },
    });
    return { data };
  }

  const allRecords: T[] = [];
  let offset = 0;
  let totalItems = 0;
  let firstResponse: PaginatedResponse<T> | null = null;

  do {
    const { data } = await client.get<PaginatedResponse<T>>(endpoint, {
      params: {
        ...params,
        count: MAX_PAGE_SIZE,
        offset,
      },
    });

    if (!firstResponse) {
      firstResponse = data;
    }

    const records = data[dataKey] as T[];
    if (Array.isArray(records)) {
      allRecords.push(...records);
    }

    totalItems = data.total_items || 0;
    offset += MAX_PAGE_SIZE;

    if (!records || records.length === 0) {
      break;
    }
  } while (offset < totalItems);

  return {
    data: {
      ...firstResponse,
      [dataKey]: allRecords,
      total_items: allRecords.length,
    },
  };
};
