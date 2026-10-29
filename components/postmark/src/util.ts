import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

export const fetchAllServers = async (
  client: HttpClient,
  params?: Record<string, unknown>,
  pageSize = 500,
): Promise<unknown[]> => {
  const allServers: unknown[] = [];
  let currentOffset = 0;
  let hasMore = true;

  do {
    const { data } = await client.get("/servers", {
      params: {
        count: pageSize,
        offset: currentOffset,
        ...params,
      },
    });
    const servers: unknown[] = data?.Servers || [];
    allServers.push(...servers);

    hasMore = allServers.length < data.TotalCount && servers.length >= pageSize;
    currentOffset += pageSize;
  } while (hasMore);

  return allServers;
};
