import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { MAX_PAGES } from "../constants";
import type { GraphCollectionResponse } from "../types";
import { newestCreatedDateTime } from "./polling";

export const fetchAllPlanner = async <T>(
  client: HttpClient,
  endpoint: string,
): Promise<GraphCollectionResponse<T> & { truncated: boolean }> => {
  const results: T[] = [];
  let nextLink: string | undefined;
  let context: string | undefined;
  let pages = 0;

  do {
    const { data } = await client.get<GraphCollectionResponse<T>>(
      nextLink || endpoint,
    );
    context ??= data["@odata.context"];
    results.push(...(data.value ?? []));
    nextLink = data["@odata.nextLink"];
    pages += 1;
  } while (nextLink && pages < MAX_PAGES);

  return {
    "@odata.context": context,
    value: results,
    truncated: Boolean(nextLink),
  };
};

export const fetchAllDirectory = async <T>(
  client: HttpClient,
  endpoint: string,
  params: Record<string, unknown> = {},
): Promise<GraphCollectionResponse<T>> => {
  const results: T[] = [];
  let nextLink: string | undefined;
  let context: string | undefined;
  let pages = 0;

  do {
    const { data } = await client.get<GraphCollectionResponse<T>>(
      nextLink || endpoint,
      nextLink ? undefined : { params },
    );
    context ??= data["@odata.context"];
    results.push(...(data.value ?? []));
    nextLink = data["@odata.nextLink"];
    pages += 1;
  } while (nextLink && pages < MAX_PAGES);

  return { "@odata.context": context, value: results };
};

export const fetchTasksCreatedSince = async <
  T extends { createdDateTime?: string | null },
>(
  client: HttpClient,
  endpoint: string,
  since?: string,
): Promise<{
  fetched: number;
  created: T[];
  newestCreatedDateTime: string | undefined;
  truncated: boolean;
}> => {
  const { value, truncated } = await fetchAllPlanner<T>(client, endpoint);
  const sinceDate = since ? new Date(since) : undefined;

  const created = value.filter((record) => {
    if (!sinceDate || !record.createdDateTime) return false;
    return new Date(record.createdDateTime) > sinceDate;
  });

  return {
    fetched: value.length,
    created,
    newestCreatedDateTime: newestCreatedDateTime(value),
    truncated,
  };
};
