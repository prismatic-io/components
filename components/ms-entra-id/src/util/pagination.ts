import type { HttpClient } from "@prismatic-io/spectral/http";
import type { GraphResponseData } from "../types";

export const getValues = async (
  getAllPaginatedResults: boolean,
  client: HttpClient,
  path: string,
  config: Record<string, unknown> & {
    params?: { $top?: number; $select?: string };
  },
): Promise<{ data: GraphResponseData }> => {
  if (getAllPaginatedResults) {
    if (config.params?.$top) {
      delete config.params.$top;
    }
  }

  const { data: ogData } = await client.get(path, config);
  let nextLink: string | undefined = ogData?.["@odata.nextLink"];

  if (getAllPaginatedResults) {
    while (nextLink) {
      const { data } = await client.get(nextLink);
      ogData.value.push(...data.value);
      nextLink = data?.["@odata.nextLink"];
    }
    delete ogData["@odata.nextLink"];
  }

  return { data: ogData };
};
