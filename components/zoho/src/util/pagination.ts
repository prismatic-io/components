import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { ClientType } from "../client";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PER_PAGE } from "../constants";
import type { paginationParams } from "../types";
export const fetchAllPages = async (
  client: HttpClient,
  url: string,
  params: paginationParams,
  dataKey: string,
  fetchAll: boolean,
  opts: {
    modifiedSince?: string;
    clientType?: ClientType;
  } = {},
) => {
  const results = [];
  let lastResponse: Record<string, unknown> = {};
  const headers: Record<string, string> = {};
  const isModifiedSince = Boolean(opts.modifiedSince);
  if (isModifiedSince && opts.clientType === ClientType.CRM) {
    headers["If-Modified-Since"] = opts.modifiedSince as string;
  } else if (isModifiedSince && opts.clientType === ClientType.BOOKS) {
    params.last_modified_time = opts.modifiedSince;
  }
  if (fetchAll) {
    params.page_token = undefined;
    params.page = DEFAULT_PAGE_NUMBER;
    params.per_page = DEFAULT_PER_PAGE;
  } else {
    params.page = params.page_token
      ? undefined
      : params.page || DEFAULT_PAGE_NUMBER;
    params.per_page = params.page_token
      ? undefined
      : params.per_page || DEFAULT_PER_PAGE;
  }
  do {
    let data: Record<string, unknown>;
    try {
      ({ data } = await client.get(url, { params, headers }));
    } catch (err) {
      const status = (
        err as {
          response?: {
            status?: number;
          };
        }
      )?.response?.status;
      if (isModifiedSince && status === 304) {
        return { [dataKey]: [] };
      }
      throw err;
    }
    const pageRecords = data[dataKey];
    const info = data.info as
      | {
          next_page_token?: string;
        }
      | undefined;
    const pageContext = data.page_context as
      | {
          has_more_page?: boolean;
        }
      | undefined;
    const nextPageToken = info?.next_page_token;
    const hasMorePages = pageContext?.has_more_page;
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
