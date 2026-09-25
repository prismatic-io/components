import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { DATA_SOURCE_PAGE_SIZE } from "../constants";
import type { PaginatedResponse } from "../types";
export const paginateResults = async <T>(
  client: HttpClient,
  url: string,
  resultsArray: T[],
  key: string,
  pageSize = DATA_SOURCE_PAGE_SIZE,
): Promise<T[]> => {
  let nextUrl = url;
  const shouldPaginate = true;
  do {
    const { data } = await client.get<PaginatedResponse<T>>(nextUrl, {
      params: {
        "page[size]": pageSize,
      },
    });
    resultsArray.push(...data[key]);
    if (!data?.meta?.has_more) {
      break;
    } else {
      const nextLink = new URL(data.links.next);
      nextLink.searchParams.delete("page[size]");
      nextUrl = `${nextLink.pathname.replace(/^\/api\/v2/, "")}${nextLink.search}`;
    }
  } while (shouldPaginate);
  return resultsArray;
};
