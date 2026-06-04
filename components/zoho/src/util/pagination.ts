import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PER_PAGE } from "../constants";
import type { paginationParams } from "../types";

export const fetchAllPages = async (
  client: HttpClient,
  url: string,
  params: paginationParams,
  dataKey: string,
  fetchAll: boolean,
) => {
  const results = [];
  let lastResponse: Record<string, unknown> = {};

  if (fetchAll) {
    params.page_token = undefined;
    params.page = DEFAULT_PAGE_NUMBER;
    params.per_page = DEFAULT_PER_PAGE;
  } else {
    params.page = params.page_token ? undefined : params.page || DEFAULT_PAGE_NUMBER;
    params.per_page = params.page_token ? undefined : params.per_page || DEFAULT_PER_PAGE;
  }

  do {
    const { data } = await client.get(url, {
      params,
    });

    const pageRecords = data[dataKey];
    const nextPageToken = data?.info?.next_page_token;
    const hasMorePages = data?.page_context?.has_more_page;

    if (Array.isArray(pageRecords)) {
      results.push(...pageRecords);
    }
    if (!fetchAll || (!nextPageToken && !hasMorePages)) {
      lastResponse = data;
      break;
    }
    if (params.page !== undefined) {
      params.page++;
    }
    if (nextPageToken) {
      params.page_token = nextPageToken;
      params.page = undefined;
      params.per_page = undefined;
    }
  } while (fetchAll);

  if (fetchAll) {
    
    if (lastResponse?.info) {
      const cleanedInfo = {
        ...lastResponse.info,
        per_page: results.length,
        count: results.length,
        page: 1,
        previous_page_token: undefined,
        page_token_expiry: undefined,
      };
      lastResponse.info = cleanedInfo;
    }
    if (lastResponse?.page_context) {
      const cleanedPageContext = {
        ...lastResponse.page_context,
        page: 1,
        per_page: results.length,
      };
      lastResponse.page_context = cleanedPageContext;
    }
  }

  return {
    ...lastResponse,
    [dataKey]: results,
  };
};
