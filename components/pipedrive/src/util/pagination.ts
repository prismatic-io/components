import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type {
  GenericCursorPaginationData,
  GenericPaginationData,
} from "../types";
import { PAGINATION_LIMIT } from "../constants";

const fetchData = async <T>(
  client: HttpClient,
  path: string,
  params: Record<string, unknown>,
): Promise<T> => {
  const { data } = await client.get<T>(path, { params });
  return data;
};

export const paginateRecordsWithLimit = async <T>(
  client: HttpClient,
  path: string,
  params: Record<string, unknown>,
  fetchAll = false,
): Promise<GenericPaginationData<T>> => {
  if (!fetchAll) {
    const { additional_data, data } = await fetchData<GenericPaginationData<T>>(
      client,
      path,
      params,
    );
    return {
      data,
      additional_data,
    };
  }
  const records: T[] = [];
  let next_start = 0;
  do {
    const {
      data,
      additional_data: {
        pagination: { more_items_in_collection },
      },
    } = await fetchData<GenericPaginationData<T>>(client, path, {
      ...params,
      limit: PAGINATION_LIMIT,
      start: next_start,
    });
    if (!data) {
      break;
    }
    records.push(...data);
    if (more_items_in_collection) {
      next_start += PAGINATION_LIMIT;
    } else {
      break;
    }
  } while (next_start);
  return {
    data: records,
    additional_data: {
      pagination: {
        start: null,
        limit: PAGINATION_LIMIT,
        more_items_in_collection: false,
        next_start: null,
      },
    },
  };
};

export const paginateRecordsWithCursor = async <T>(
  client: HttpClient,
  path: string,
  params: Record<string, unknown>,
  fetchAll = false,
): Promise<GenericCursorPaginationData<T>> => {
  if (!fetchAll) {
    const { additional_data, data } = await fetchData<
      GenericCursorPaginationData<T>
    >(client, path, params);
    return {
      data,
      additional_data,
    };
  }
  const records: T[] = [];
  let next_page: string | undefined;
  do {
    const { data, additional_data } = await fetchData<
      GenericCursorPaginationData<T>
    >(client, path, {
      ...params,
      limit: PAGINATION_LIMIT,
      cursor: next_page,
    });
    if (!data) {
      break;
    }
    records.push(...data);
    if (additional_data?.next_cursor) {
      next_page = additional_data.next_cursor;
    } else {
      break;
    }
  } while (next_page);
  return {
    data: records,
    additional_data: {
      next_cursor: null,
    },
  };
};

export const sortRecords = <T>(array: T[], key: keyof T) => {
  return array.sort((a, b) => {
    if (a[key] === b[key]) {
      return 0;
    }
    return a[key] > b[key] ? 1 : -1;
  });
};
