import type {
  ClientProps,
  HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import type { Paging } from "../types";

const withAfter = (params: unknown, after: string) => {
  if (params instanceof URLSearchParams) {
    const next = new URLSearchParams(params);
    next.set("after", after);
    return next;
  }
  return { ...(params as Record<string, unknown>), after };
};

export const getAllPaginatedData = async <T>(
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  returnOnlyResults = true,
  config?: ClientProps,
) => {
  const finalObject: {
    results: T[];
    paging: Paging;
  } = {
    results: [],
    paging: null,
  };

  let nextConfig = config;
  do {
    const { data } = await client.get(url, nextConfig);
    finalObject.paging = data.paging;
    finalObject.results = finalObject.results.concat(data.results);
    if (finalObject.paging?.next) {
      nextConfig = {
        ...config,
        params: withAfter(config?.params, finalObject.paging.next.after),
      };
    }
    if (!fetchAll) break;
  } while (finalObject.paging?.next);

  return returnOnlyResults ? finalObject.results : finalObject;
};
