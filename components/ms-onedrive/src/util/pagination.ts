import type { HttpClient } from "@prismatic-io/spectral/http";
import type { GraphPageResponse } from "../types";

export const fetchAllPages = async <T>(
  client: HttpClient,
  path: string,
  params?: Record<string, string>,
): Promise<T[]> => {
  const items: T[] = [];
  let nextLink: string | undefined = path;
  let requestParams = params;

  while (nextLink !== undefined) {
    const { data }: { data: GraphPageResponse<T> } = await client.get(
      nextLink,
      {
        params: requestParams,
      },
    );
    items.push(...(data.value ?? []));
    nextLink = data["@odata.nextLink"];
    requestParams = undefined;
  }
  return items;
};
