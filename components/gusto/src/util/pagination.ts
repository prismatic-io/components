import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/http";

export const fetchAllPages = async <T = unknown>(
  client: HttpClient,
  url: string,
): Promise<T[]> => {
  const allRecords: T[] = [];
  let page = 1;
  let hasMorePages = true;

  do {
    const { data, headers } = await client.get<T[]>(url, {
      params: { page },
    });
    allRecords.push(...data);
    hasMorePages =
      util.types.toNumber(headers["x-total-pages"]) >
      util.types.toNumber(headers["x-page"]);
    page += 1;
  } while (hasMorePages);

  return allRecords;
};

export interface CursorEventItem {
  uuid: string;
  [key: string]: unknown;
}

export const fetchAllCursorEvents = async (
  client: HttpClient,
  url: string,
  params?: Record<string, unknown>,
): Promise<CursorEventItem[]> => {
  const allEvents: CursorEventItem[] = [];
  let startingAfterUuid: string | undefined;
  const pageSize = 100;
  let hasNextPage = true;

  do {
    const queryParams: Record<string, unknown> = {
      ...params,
      limit: util.types.toString(pageSize),
    };
    if (startingAfterUuid) {
      queryParams.starting_after_uuid = startingAfterUuid;
    }

    const { data, headers } = await client.get<CursorEventItem[]>(url, {
      params: queryParams,
    });
    allEvents.push(...data);

    hasNextPage =
      util.types.toString(headers["x-has-next-page"]) === "true" &&
      data.length > 0;

    if (hasNextPage) {
      startingAfterUuid = data[data.length - 1].uuid;
    }
  } while (hasNextPage);

  return allEvents;
};
