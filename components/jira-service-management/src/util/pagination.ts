import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { DEFAULT_PAGE_SIZE } from "../constants";
import type {
  AssetsPagedResponse,
  OpsPagedResponse,
  PagedResponse,
} from "../types";


export const getPaginatedData = async <T>(
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  config: AxiosRequestConfig = {},
): Promise<AxiosResponse> => {
  if (!fetchAll) {
    return client.get(url, config);
  }

  const mergedParams = { ...(config.params ?? {}), limit: DEFAULT_PAGE_SIZE };
  const allValues: T[] = [];
  let firstResponse: AxiosResponse<PagedResponse<T>> | undefined;
  let currentStart = 0;
  let isLastPage = false;

  while (!isLastPage) {
    const response = await client.get<PagedResponse<T>>(url, {
      ...config,
      params: { ...mergedParams, start: currentStart },
    });
    firstResponse ??= response;
    allValues.push(...response.data.values);
    isLastPage = response.data.isLastPage;
    currentStart += DEFAULT_PAGE_SIZE;
  }

  const first = firstResponse as AxiosResponse<PagedResponse<T>>;
  return {
    ...first,
    data: {
      ...first.data,
      values: allValues,
      size: allValues.length,
      isLastPage: true,
      start: 0,
      limit: DEFAULT_PAGE_SIZE,
    },
  };
};




export const getOpsPaginatedData = async <T>(
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  config: AxiosRequestConfig = {},
): Promise<AxiosResponse> => {
  if (!fetchAll) {
    return client.get(url, config);
  }
  const mergedParams = {
    ...(config.params ?? {}),
    size: DEFAULT_PAGE_SIZE,
    offset: 0,
  };
  const allValues: T[] = [];
  let firstResponse: AxiosResponse<OpsPagedResponse<T>> | undefined;
  let nextUrl: string | undefined = url;
  let firstCall = true;

  while (nextUrl) {
    
    
    const response: AxiosResponse<OpsPagedResponse<T>> = firstCall
      ? await client.get<OpsPagedResponse<T>>(url, {
          ...config,
          params: mergedParams,
        })
      : await client.get<OpsPagedResponse<T>>(nextUrl);
    firstCall = false;
    firstResponse ??= response;
    allValues.push(...(response.data.values ?? []));
    nextUrl = response.data.links?.next;
  }

  const first = firstResponse as AxiosResponse<OpsPagedResponse<T>>;
  return {
    ...first,
    data: {
      ...first.data,
      values: allValues,
      count: allValues.length,
      links: undefined,
    },
  };
};





export const getAssetsPaginatedData = async <T>(
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  config: AxiosRequestConfig = {},
): Promise<AxiosResponse> => {
  if (!fetchAll) {
    return client.get(url, config);
  }

  const mergedParams = {
    ...(config.params ?? {}),
    maxResults: DEFAULT_PAGE_SIZE,
  };
  const allValues: T[] = [];
  let firstResponse: AxiosResponse<AssetsPagedResponse<T>> | undefined;
  let currentStart = 0;
  let isLast = false;

  while (!isLast) {
    const response = await client.get<AssetsPagedResponse<T>>(url, {
      ...config,
      params: { ...mergedParams, startAt: currentStart },
    });
    firstResponse ??= response;
    allValues.push(...(response.data.values ?? []));
    isLast = response.data.isLast;
    currentStart += DEFAULT_PAGE_SIZE;
  }

  const first = firstResponse as AxiosResponse<AssetsPagedResponse<T>>;
  return {
    ...first,
    data: {
      ...first.data,
      values: allValues,
      total: allValues.length,
      isLast: true,
      startAt: 0,
      maxResults: DEFAULT_PAGE_SIZE,
    },
  };
};
