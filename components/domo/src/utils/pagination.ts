import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

const MAX_PAGES = 100;
const DEFAULT_LIMIT = 50;






export const paginateResults = async (
  client: HttpClient,
  endpoint: string,
  fetchAll: boolean,
  params: Record<string, string> = {},
  defaultLimit = DEFAULT_LIMIT,
): Promise<{ data: unknown }> => {
  if (!fetchAll) {
    const { data } = await client.get(endpoint, {
      params,
      headers: { Accept: "application/json" },
    });
    return { data };
  }

  const limit = params.limit ? util.types.toNumber(params.limit, 10) : defaultLimit;
  const allResults: unknown[] = [];
  let currentOffset = 0;
  let pagesFetched = 0;

  
  const { limit: _l, offset: _o, ...otherParams } = params;

  let hasMore = true;
  while (hasMore && pagesFetched < MAX_PAGES) {
    const { data } = await client.get(endpoint, {
      params: {
        ...otherParams,
        limit: util.types.toString(limit),
        offset: util.types.toString(currentOffset),
      },
      headers: { Accept: "application/json" },
    });

    pagesFetched++;

    if (!Array.isArray(data) || data.length === 0) {
      break;
    }

    allResults.push(...data);

    if (data.length < limit) {
      hasMore = false;
    } else {
      currentOffset += limit;
    }
  }

  return { data: allResults };
};
