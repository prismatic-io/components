import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { MAX_PAGE_SIZE_BY_ITEMS_KEY } from "../constants";
import type { PageInfo } from "../types";

export async function fetchAdobeSignResults<
  TResponse extends { page: PageInfo },
  K extends keyof TResponse,
  Fetch extends boolean,
>(
  client: HttpClient,
  path: string,
  fetchAll: Fetch,
  queryParams: Record<string, unknown> | undefined,
  itemsKey: K,
): Promise<Fetch extends true ? TResponse[K] : TResponse> {
  type Return = Fetch extends true ? TResponse[K] : TResponse;

  
  
  const baseParams = fetchAll
    ? {
        ...queryParams,
        pageSize: MAX_PAGE_SIZE_BY_ITEMS_KEY[itemsKey as string],
        cursor: undefined,
      }
    : queryParams;

  const accumulated: unknown[] = [];
  let nextCursor: string | undefined = fetchAll
    ? undefined
    : (queryParams?.cursor as string | undefined) || undefined;

  while (true) {
    const { data } = await client.get<TResponse>(path, {
      params: { ...baseParams, cursor: nextCursor || undefined },
    });

    if (!fetchAll) {
      return data as Return;
    }

    const pageItems = (data[itemsKey] as unknown[] | undefined) ?? [];
    accumulated.push(...pageItems);

    nextCursor = data.page?.nextCursor || undefined;
    if (!nextCursor) {
      return accumulated as Return;
    }
  }
}
