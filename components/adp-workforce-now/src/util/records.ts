import type { AxiosInstance } from "axios";
import type { AdpListResponse, PaginatedResult } from "../types";
async function fetchData(
  client: AxiosInstance,
  url: string,
  params: Record<string, unknown>,
): Promise<AdpListResponse> {
  const { data } = await client.get<AdpListResponse>(url, {
    params,
  });
  return data;
}
export async function fetchAllRecords<T>(
  client: AxiosInstance,
  url: string,
  dataName: string,
  fetchAll: boolean,
  params: Record<string, unknown>,
): Promise<PaginatedResult<T>> {
  if ("$count" in params) {
    params.$count = undefined;
  }
  if (fetchAll) {
    const $top = 100;
    let records: T[] = [];
    const data = await fetchData(client, url, {
      count: true,
    });
    const totalNumber = data?.meta?.totalNumber;
    if (!totalNumber) {
      return {
        data: (data?.[dataName] ?? []) as T[],
        meta: data?.meta,
        confirmMessage: data?.confirmMessage,
      };
    }
    const amountOfPromises = Math.ceil(totalNumber / $top);
    const promises = Array.from({ length: amountOfPromises }, (_, i) =>
      fetchData(client, url, {
        ...params,
        $skip: i * $top,
        $top,
      }),
    );
    const responses = await Promise.all(promises);
    const recordsArray = responses.map((response) =>
      Array.isArray(response?.[dataName]) ? response[dataName] : [],
    );
    records = records.concat(...recordsArray);
    const { meta, confirmMessage } = responses[amountOfPromises - 1];
    return {
      meta,
      confirmMessage,
      data: records,
    };
  }
  const data = await fetchData(client, url, params);
  return {
    data: data[dataName] as T[],
    meta: data.meta,
    confirmMessage: data.confirmMessage,
  };
}
export async function fetchAllRecordsNoCount<T>(
  client: AxiosInstance,
  url: string,
  dataName: string,
  fetchAll: boolean,
  params: Record<string, unknown>,
): Promise<PaginatedResult<T>> {
  if (fetchAll) {
    const $top = 100;
    let records: T[] = [];
    let $skip = 0;
    let lastPage: Record<string, unknown> | undefined;
    while (true) {
      const data = await fetchData(client, url, {
        ...params,
        $skip,
        $top,
      });
      const page = (
        Array.isArray(data?.[dataName]) ? data[dataName] : []
      ) as T[];
      if (page.length === 0) {
        lastPage ??= data;
        break;
      }
      records = records.concat(page);
      $skip += page.length;
      lastPage = data;
    }
    const { meta, confirmMessage } = lastPage ?? {};
    return {
      meta,
      confirmMessage,
      data: records,
    };
  }
  const data = await fetchData(client, url, params);
  return {
    data: data[dataName] as T[],
    meta: data.meta,
    confirmMessage: data.confirmMessage,
  };
}
