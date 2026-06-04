import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { POLL_RESOURCE_CONFIG } from "./constants";
import type { PaginatedFunction } from "./types";

export const toOptionalString = (input: unknown) => {
  return input ? util.types.toString(input) : undefined;
};

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(([value, { label }]) => ({
  label,
  value,
}));

export const paginateRecords = async <T, K extends string>(
  client: HttpClient,
  url: string,
  params: Record<string, unknown>,
  fetchAll: boolean,
  propertyKey: K,
) => {
  const records: PaginatedFunction<T> = {
    [propertyKey]: [],
  };
  const pageSize = params.pageSize ? util.types.toNumber(params.pageSize) : 200;

  const { data } = await client.get<PaginatedFunction<T, K>>(url, {
    params: {
      ...params,
      pageSize,
    },
  });
  records[propertyKey] = data[propertyKey];

  let nextPageToken = data.nextPageToken || "";

  if (fetchAll && nextPageToken) {
    while (nextPageToken) {
      const response = await client.get<PaginatedFunction<T, K>>(url, {
        params: {
          pageSize,
          pageToken: nextPageToken,
        },
      });
      records[propertyKey] = records[propertyKey].concat(response.data[propertyKey]);
      nextPageToken = response.data.nextPageToken || "";
    }
    return records;
  }
  return data;
};
