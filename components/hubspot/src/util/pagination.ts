import type {
  ClientProps,
  HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import type { Paging } from "../types";
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
  let nextUrl = url;
  let nextConfig = config;
  do {
    const { data } = await client.get(nextUrl, nextConfig);
    finalObject.paging = data.paging;
    finalObject.results = finalObject.results.concat(data.results);
    if (finalObject.paging?.next) {
      nextUrl = data.paging.next.link;
      nextConfig = undefined;
    }
    if (!fetchAll) break;
  } while (finalObject.paging?.next);
  return returnOnlyResults ? finalObject.results : finalObject;
};
